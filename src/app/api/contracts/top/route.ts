import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // Get entities that have contracts (totalContracts > 0)
  const entities = await prisma.entity.findMany({
    where: {
      totalContracts: { gt: 0 },
      type: "CORPORATION",
    },
    orderBy: { totalContracts: "desc" },
    take: 20,
    select: {
      id: true,
      type: true,
      canonicalName: true,
      totalContracts: true,
      totalSpent: true,
      totalLobbying: true,
    },
  });

  // For each entity, get total donations (what they spent via PAC contributions)
  const entityIds = entities.map((e) => e.id);

  const donationFlows = await prisma.aggregateMoneyFlow.groupBy({
    by: ["sourceEntityId"],
    where: {
      sourceEntityId: { in: entityIds },
      transactionType: { in: ["CORPORATE_CONTRIBUTION", "PAC_CONTRIBUTION"] },
    },
    _sum: { totalAmount: true },
  });

  const donationMap = new Map(
    donationFlows.map((f) => [f.sourceEntityId, Number(f._sum.totalAmount ?? 0)]),
  );

  const contractors = entities.map((e) => {
    const totalContracts = Number(e.totalContracts);
    const totalDonated = donationMap.get(e.id) ?? Number(e.totalSpent);
    const totalLobbying = Number(e.totalLobbying);
    const politicalSpend = totalDonated + totalLobbying;
    const roi = politicalSpend > 0 ? totalContracts / politicalSpend : 0;

    return {
      entityId: e.id,
      name: e.canonicalName,
      entityType: e.type.toLowerCase(),
      totalContracts,
      totalDonated,
      totalLobbying,
      roi: Math.round(roi),
    };
  });

  return NextResponse.json({ contractors });
}
