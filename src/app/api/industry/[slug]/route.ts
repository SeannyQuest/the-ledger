import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { INDUSTRY_MAP } from "../route";

/**
 * GET /api/industry/[slug]
 *
 * Returns industry-level aggregate data for a given industry slug.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const meta = INDUSTRY_MAP[slug];

  if (!meta) {
    return NextResponse.json({ error: "Industry not found" }, { status: 404 });
  }

  // ── Find entities in this industry ──
  const entities = await prisma.entity.findMany({
    where: {
      OR: [
        ...meta.keywords.map((kw) => ({
          industry: { contains: kw, mode: "insensitive" as const },
        })),
        ...meta.naicsPrefixes.map((prefix) => ({
          naicsCode: { startsWith: prefix },
        })),
      ],
      mergedIntoId: null,
    },
    select: {
      id: true,
      type: true,
      canonicalName: true,
      industry: true,
      totalLobbying: true,
      totalContracts: true,
      totalContributed: true,
      totalSpent: true,
      totalReceived: true,
    },
    orderBy: [{ totalContracts: "desc" }, { totalLobbying: "desc" }],
  });

  const entityIds = entities.map((e) => e.id);

  // ── Aggregate stats ──
  const totalLobbying = entities.reduce((s, e) => s + Number(e.totalLobbying), 0);
  const totalContracts = entities.reduce((s, e) => s + Number(e.totalContracts), 0);

  // PAC contributions from AggregateMoneyFlow
  const pacFlows = entityIds.length > 0
    ? await prisma.aggregateMoneyFlow.aggregate({
        where: {
          sourceEntityId: { in: entityIds },
          transactionType: { in: ["PAC_CONTRIBUTION", "CORPORATE_CONTRIBUTION"] },
        },
        _sum: { totalAmount: true },
      })
    : { _sum: { totalAmount: null } };
  const totalPacContributions = Number(pacFlows._sum.totalAmount ?? 0);

  const totalPoliticalSpend = totalLobbying + totalPacContributions;
  const avgRoi = totalPoliticalSpend > 0 ? totalContracts / totalPoliticalSpend : 0;

  // ── Top 10 entities ──
  const topEntities = entities.slice(0, 10).map((e) => {
    const lobbying = Number(e.totalLobbying);
    const contracts = Number(e.totalContracts);
    const contributed = Number(e.totalContributed);
    const spent = Number(e.totalSpent);
    const politicalSpend = lobbying + contributed + spent;
    const roi = politicalSpend > 0 ? contracts / politicalSpend : 0;

    return {
      id: e.id,
      name: e.canonicalName,
      entityType: e.type.toLowerCase(),
      industry: e.industry,
      totalLobbying: lobbying,
      totalContracts: contracts,
      totalContributed: contributed,
      roi: Math.round(roi),
    };
  });

  // ── Lobbying filings related to this industry ──
  const lobbyingFilings = entityIds.length > 0
    ? await prisma.lobbyingFiling.findMany({
        where: {
          OR: [
            { clientEntityId: { in: entityIds } },
            { registrantEntityId: { in: entityIds } },
          ],
        },
        include: {
          clientEntity: {
            select: { id: true, canonicalName: true, type: true },
          },
          registrantEntity: {
            select: { id: true, canonicalName: true, type: true },
          },
        },
        orderBy: { filingDate: "desc" },
        take: 20,
      })
    : [];

  const filings = lobbyingFilings.map((f) => ({
    id: f.id,
    filingId: f.filingId,
    amount: Number(f.amount ?? 0),
    filingDate: f.filingDate.toISOString().split("T")[0],
    filingYear: f.filingYear,
    issues: f.issues,
    specificIssues: f.specificIssues,
    client: {
      id: f.clientEntity.id,
      name: f.clientEntity.canonicalName,
      type: f.clientEntity.type.toLowerCase(),
    },
    registrant: {
      id: f.registrantEntity.id,
      name: f.registrantEntity.canonicalName,
      type: f.registrantEntity.type.toLowerCase(),
    },
  }));

  // ── Revolving door count ──
  const revolvingDoorCount = entityIds.length > 0
    ? await prisma.entityRelationship.count({
        where: {
          relationshipType: {
            in: ["EMPLOYMENT", "BOARD_MEMBER", "FORMER_EMPLOYEE", "CONSULTANT"],
          },
          OR: [
            {
              fromEntityId: { in: entityIds },
              toEntity: {
                type: { in: ["POLITICIAN", "GOVERNMENT_AGENCY"] },
              },
            },
            {
              toEntityId: { in: entityIds },
              fromEntity: {
                type: { in: ["POLITICIAN", "GOVERNMENT_AGENCY"] },
              },
            },
          ],
        },
      })
    : 0;

  // ── Related legislation (by policyArea or subjects matching industry keywords) ──
  const legislation = await prisma.legislation.findMany({
    where: {
      OR: meta.keywords.map((kw) => ({
        OR: [
          { policyArea: { contains: kw, mode: "insensitive" as const } },
          { title: { contains: kw, mode: "insensitive" as const } },
        ],
      })),
    },
    include: {
      sponsorEntity: {
        select: { id: true, canonicalName: true, party: true, state: true },
      },
    },
    orderBy: { introducedDate: "desc" },
    take: 10,
  });

  const bills = legislation.map((b) => ({
    id: b.id,
    billId: b.billId,
    billType: b.billType,
    billNumber: b.billNumber,
    congress: b.congress,
    title: b.title,
    summary: b.summary,
    introducedDate: b.introducedDate.toISOString().split("T")[0],
    status: b.status,
    policyArea: b.policyArea,
    sponsor: b.sponsorEntity
      ? {
          id: b.sponsorEntity.id,
          name: b.sponsorEntity.canonicalName,
          party: b.sponsorEntity.party,
          state: b.sponsorEntity.state,
        }
      : null,
  }));

  return NextResponse.json({
    slug,
    name: meta.name,
    description: meta.description,
    stats: {
      totalLobbying,
      totalContracts,
      totalPacContributions,
      entityCount: entities.length,
      avgRoi: Math.round(avgRoi),
      revolvingDoorCount,
    },
    topEntities,
    lobbyingFilings: filings,
    legislation: bills,
  });
}
