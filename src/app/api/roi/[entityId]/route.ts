import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ entityId: string }> },
) {
  const { entityId } = await params;

  // ── Fetch entity ──
  const entity = await prisma.entity.findUnique({
    where: { id: entityId },
    select: {
      id: true,
      type: true,
      canonicalName: true,
      shortName: true,
      industry: true,
      ticker: true,
      totalReceived: true,
      totalSpent: true,
      totalContributed: true,
      totalLobbying: true,
      totalContracts: true,
    },
  });

  if (!entity) {
    return NextResponse.json({ error: "Entity not found" }, { status: 404 });
  }

  // ── Political spending: PAC donations + individual contributions ──
  const donationFlows = await prisma.aggregateMoneyFlow.findMany({
    where: {
      sourceEntityId: entityId,
      transactionType: {
        in: [
          "PAC_CONTRIBUTION",
          "CORPORATE_CONTRIBUTION",
          "INDIVIDUAL_CONTRIBUTION",
          "PARTY_CONTRIBUTION",
          "INDEPENDENT_EXPENDITURE",
        ],
      },
    },
    select: {
      transactionType: true,
      totalAmount: true,
      electionCycle: true,
      targetEntityId: true,
    },
  });

  const totalDonations = donationFlows.reduce(
    (sum, f) => sum + Number(f.totalAmount),
    0,
  );

  // ── Lobbying spend ──
  const lobbyingFilings = await prisma.lobbyingFiling.findMany({
    where: {
      OR: [
        { clientEntityId: entityId },
        { registrantEntityId: entityId },
      ],
    },
    select: {
      amount: true,
      filingYear: true,
    },
  });

  const totalLobbying = lobbyingFilings.reduce(
    (sum, f) => sum + Number(f.amount ?? 0),
    0,
  );

  // ── Government returns: federal contracts + grants ──
  const federalAwards = await prisma.federalAward.findMany({
    where: { recipientEntityId: entityId },
    select: {
      awardType: true,
      amount: true,
      dateAwarded: true,
      description: true,
      agencyEntityId: true,
      agencyEntity: {
        select: { canonicalName: true },
      },
    },
    orderBy: { amount: "desc" },
  });

  const totalContracts = federalAwards
    .filter((a) => a.awardType.toLowerCase().includes("contract"))
    .reduce((sum, a) => sum + Number(a.amount), 0);

  const totalGrants = federalAwards
    .filter((a) => !a.awardType.toLowerCase().includes("contract"))
    .reduce((sum, a) => sum + Number(a.amount), 0);

  const totalReturns = Number(entity.totalContracts) || totalContracts + totalGrants;
  const totalPoliticalSpend = totalDonations + totalLobbying;
  const roiMultiple = totalPoliticalSpend > 0 ? totalReturns / totalPoliticalSpend : 0;

  // ── Year-by-year breakdown ──
  const yearMap = new Map<number, { spending: number; returns: number }>();

  // Donations by election cycle
  for (const flow of donationFlows) {
    const year = flow.electionCycle;
    const entry = yearMap.get(year) ?? { spending: 0, returns: 0 };
    entry.spending += Number(flow.totalAmount);
    yearMap.set(year, entry);
  }

  // Lobbying by filing year
  for (const filing of lobbyingFilings) {
    const year = filing.filingYear;
    const entry = yearMap.get(year) ?? { spending: 0, returns: 0 };
    entry.spending += Number(filing.amount ?? 0);
    yearMap.set(year, entry);
  }

  // Awards by year
  for (const award of federalAwards) {
    const year = award.dateAwarded.getFullYear();
    const entry = yearMap.get(year) ?? { spending: 0, returns: 0 };
    entry.returns += Number(award.amount);
    yearMap.set(year, entry);
  }

  const yearlyBreakdown = Array.from(yearMap.entries())
    .map(([year, data]) => ({
      year,
      spending: Math.round(data.spending),
      returns: Math.round(data.returns),
    }))
    .sort((a, b) => a.year - b.year);

  // ── Top recipients of donations ──
  const recipientMap = new Map<string, { entityId: string; total: number }>();
  for (const flow of donationFlows) {
    const existing = recipientMap.get(flow.targetEntityId) ?? {
      entityId: flow.targetEntityId,
      total: 0,
    };
    existing.total += Number(flow.totalAmount);
    recipientMap.set(flow.targetEntityId, existing);
  }

  const topRecipientIds = Array.from(recipientMap.values())
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  let topRecipients: { entityId: string; name: string; type: string; total: number }[] = [];

  if (topRecipientIds.length > 0) {
    const recipientEntities = await prisma.entity.findMany({
      where: {
        id: { in: topRecipientIds.map((r) => r.entityId) },
      },
      select: {
        id: true,
        canonicalName: true,
        type: true,
      },
    });

    const entityNameMap = new Map(
      recipientEntities.map((e) => [e.id, { name: e.canonicalName, type: e.type }]),
    );

    topRecipients = topRecipientIds.map((r) => {
      const info = entityNameMap.get(r.entityId);
      return {
        entityId: r.entityId,
        name: info?.name ?? "Unknown",
        type: (info?.type ?? "UNKNOWN").toLowerCase(),
        total: Math.round(r.total),
      };
    });
  }

  // ── Top awarding agencies ──
  const agencyMap = new Map<string, { name: string; total: number }>();
  for (const award of federalAwards) {
    const key = award.agencyEntityId;
    const existing = agencyMap.get(key) ?? {
      name: award.agencyEntity.canonicalName,
      total: 0,
    };
    existing.total += Number(award.amount);
    agencyMap.set(key, existing);
  }

  const topAgencies = Array.from(agencyMap.values())
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)
    .map((a) => ({ name: a.name, total: Math.round(a.total) }));

  return NextResponse.json({
    entity: {
      id: entity.id,
      name: entity.canonicalName,
      shortName: entity.shortName,
      type: entity.type.toLowerCase(),
      industry: entity.industry,
      ticker: entity.ticker,
    },
    politicalSpending: {
      donations: Math.round(totalDonations),
      lobbying: Math.round(totalLobbying),
      total: Math.round(totalPoliticalSpend),
    },
    governmentReturns: {
      contracts: Math.round(totalContracts),
      grants: Math.round(totalGrants),
      totalFromEntity: Math.round(Number(entity.totalContracts)),
      total: Math.round(totalReturns),
    },
    roi: {
      multiple: Math.round(roiMultiple),
      raw: roiMultiple,
    },
    yearlyBreakdown,
    topRecipients,
    topAgencies,
  });
}
