import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/legislation/[billId]/influence
 *
 * "Who Bought This Law?" — Returns the money trail behind a bill.
 *
 * Includes: bill info, lobbying filings on related issues, sponsor donors,
 * vote breakdown by party, and top PAC contributors.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ billId: string }> },
) {
  const { billId } = await params;

  // ── Find the bill ──────────────────────────────────────────
  const bill = await prisma.legislation.findUnique({
    where: { billId },
    include: {
      sponsorEntity: {
        select: {
          id: true,
          canonicalName: true,
          party: true,
          state: true,
          office: true,
          totalReceived: true,
          totalLobbying: true,
        },
      },
      _count: { select: { votes: true } },
    },
  });

  if (!bill) {
    return NextResponse.json({ error: "Bill not found" }, { status: 404 });
  }

  // ── Lobbying filings related to this bill's policyArea / subjects ──
  // Match on policyArea or issues JSON containing any of the bill's subjects
  const lobbyingWhere: Record<string, unknown>[] = [];

  if (bill.policyArea) {
    // issues is a JSON field — search for filings whose specificIssues text
    // or issues JSON references the bill's policy area
    lobbyingWhere.push({
      specificIssues: { contains: bill.policyArea, mode: "insensitive" },
    });
  }

  for (const subject of bill.subjects.slice(0, 5)) {
    lobbyingWhere.push({
      specificIssues: { contains: subject, mode: "insensitive" },
    });
  }

  let lobbyingFilings: Array<{
    id: string;
    filingId: string;
    amount: unknown;
    filingDate: Date;
    filingYear: number;
    specificIssues: string | null;
    registrantEntityId: string;
    clientEntityId: string;
  }> = [];
  let totalLobbyingSpend = 0;

  if (lobbyingWhere.length > 0) {
    lobbyingFilings = await prisma.lobbyingFiling.findMany({
      where: { OR: lobbyingWhere as any },
      orderBy: { amount: "desc" },
      take: 50,
      select: {
        id: true,
        filingId: true,
        amount: true,
        filingDate: true,
        filingYear: true,
        specificIssues: true,
        registrantEntityId: true,
        clientEntityId: true,
      },
    });

    // Compute total lobbying spend on related issues
    totalLobbyingSpend = lobbyingFilings.reduce(
      (sum, f) => sum + Number(f.amount ?? 0),
      0,
    );
  }

  // Resolve entity names for lobbying filings
  const lobbyingEntityIds = new Set<string>();
  for (const f of lobbyingFilings) {
    lobbyingEntityIds.add(f.registrantEntityId);
    lobbyingEntityIds.add(f.clientEntityId);
  }

  const lobbyingEntities = lobbyingEntityIds.size > 0
    ? await prisma.entity.findMany({
        where: { id: { in: [...lobbyingEntityIds] } },
        select: { id: true, canonicalName: true, type: true, industry: true },
      })
    : [];
  const lobbyingEntityMap = new Map(lobbyingEntities.map((e) => [e.id, e]));

  // ── Industry breakdown from lobbying clients ──────────────
  const industryMap = new Map<string, { amount: number; filingCount: number }>();
  for (const f of lobbyingFilings) {
    const client = lobbyingEntityMap.get(f.clientEntityId);
    const industry = client?.industry ?? client?.canonicalName ?? "Unknown";
    const entry = industryMap.get(industry) ?? { amount: 0, filingCount: 0 };
    entry.amount += Number(f.amount ?? 0);
    entry.filingCount += 1;
    industryMap.set(industry, entry);
  }

  const industryBreakdown = [...industryMap.entries()]
    .map(([industry, data]) => ({ industry, ...data }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 15);

  // ── Sponsor's top donors ──────────────────────────────────
  let sponsorDonors: Array<{
    sourceEntityId: string;
    sourceName: string;
    sourceType: string;
    sourceIndustry: string | null;
    amount: number;
    transactionCount: number;
  }> = [];

  if (bill.sponsorEntityId) {
    const donorFlows = await prisma.aggregateMoneyFlow.findMany({
      where: { targetEntityId: bill.sponsorEntityId },
      orderBy: { totalAmount: "desc" },
      take: 15,
    });

    const donorIds = donorFlows.map((d) => d.sourceEntityId);
    const donorEntities = donorIds.length > 0
      ? await prisma.entity.findMany({
          where: { id: { in: donorIds } },
          select: { id: true, canonicalName: true, type: true, industry: true },
        })
      : [];
    const donorMap = new Map(donorEntities.map((e) => [e.id, e]));

    sponsorDonors = donorFlows.map((d) => {
      const source = donorMap.get(d.sourceEntityId);
      return {
        sourceEntityId: d.sourceEntityId,
        sourceName: source?.canonicalName ?? "Unknown",
        sourceType: (source?.type ?? "UNKNOWN").toLowerCase(),
        sourceIndustry: source?.industry ?? null,
        amount: Number(d.totalAmount),
        transactionCount: d.transactionCount,
      };
    });
  }

  // ── Top PAC contributors (PAC/SUPER_PAC type donors) ──────
  const pacDonors = sponsorDonors.filter(
    (d) => d.sourceType === "pac" || d.sourceType === "super_pac",
  );

  // ── Vote breakdown by party ───────────────────────────────
  const votes = await prisma.legislativeVote.findMany({
    where: { legislationId: bill.id },
    include: {
      entity: {
        select: { id: true, canonicalName: true, party: true, state: true },
      },
    },
  });

  // Aggregate vote summary
  const voteSummary = {
    yea: votes.filter((v) => v.position === "YEA").length,
    nay: votes.filter((v) => v.position === "NAY").length,
    present: votes.filter((v) => v.position === "PRESENT").length,
    notVoting: votes.filter((v) => v.position === "NOT_VOTING").length,
  };

  // Vote breakdown by party
  const partyVoteMap = new Map<
    string,
    { yea: number; nay: number; present: number; notVoting: number }
  >();

  for (const vote of votes) {
    const party = vote.entity.party ?? "OTHER";
    const entry = partyVoteMap.get(party) ?? {
      yea: 0,
      nay: 0,
      present: 0,
      notVoting: 0,
    };

    if (vote.position === "YEA") entry.yea += 1;
    else if (vote.position === "NAY") entry.nay += 1;
    else if (vote.position === "PRESENT") entry.present += 1;
    else entry.notVoting += 1;

    partyVoteMap.set(party, entry);
  }

  const votesByParty = [...partyVoteMap.entries()]
    .map(([party, counts]) => ({ party, ...counts }))
    .sort((a, b) => (a.party === "DEMOCRAT" ? -1 : b.party === "DEMOCRAT" ? 1 : 0));

  // ── Serialize lobbying filings ────────────────────────────
  const serializedFilings = lobbyingFilings.map((f) => {
    const registrant = lobbyingEntityMap.get(f.registrantEntityId);
    const client = lobbyingEntityMap.get(f.clientEntityId);
    return {
      id: f.id,
      filingId: f.filingId,
      amount: Number(f.amount ?? 0),
      filingDate: f.filingDate.toISOString().split("T")[0],
      filingYear: f.filingYear,
      registrant: {
        id: f.registrantEntityId,
        name: registrant?.canonicalName ?? "Unknown",
        type: (registrant?.type ?? "UNKNOWN").toLowerCase(),
      },
      client: {
        id: f.clientEntityId,
        name: client?.canonicalName ?? "Unknown",
        type: (client?.type ?? "UNKNOWN").toLowerCase(),
        industry: client?.industry ?? null,
      },
      specificIssues: f.specificIssues,
    };
  });

  return NextResponse.json({
    bill: {
      id: bill.id,
      billId: bill.billId,
      billType: bill.billType,
      billNumber: bill.billNumber,
      congress: bill.congress,
      title: bill.title,
      summary: bill.summary,
      introducedDate: bill.introducedDate.toISOString().split("T")[0],
      lastActionDate: bill.lastActionDate?.toISOString().split("T")[0] ?? null,
      status: bill.status,
      policyArea: bill.policyArea,
      subjects: bill.subjects,
      sponsor: bill.sponsorEntity
        ? {
            id: bill.sponsorEntity.id,
            name: bill.sponsorEntity.canonicalName,
            party: bill.sponsorEntity.party,
            state: bill.sponsorEntity.state,
            office: bill.sponsorEntity.office,
            totalReceived: Number(bill.sponsorEntity.totalReceived),
            totalLobbying: Number(bill.sponsorEntity.totalLobbying),
          }
        : null,
      voteCount: bill._count.votes,
    },
    lobbying: {
      totalSpend: totalLobbyingSpend,
      filingCount: lobbyingFilings.length,
      filings: serializedFilings,
      industryBreakdown,
    },
    sponsorDonors,
    pacContributors: pacDonors,
    votes: {
      summary: voteSummary,
      byParty: votesByParty,
      totalVoters: votes.length,
    },
  });
}
