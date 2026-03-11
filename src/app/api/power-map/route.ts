import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/power-map
 *
 * Donor-vote correlation analysis.
 * For a given entity (corporation/PAC), finds politicians they fund
 * and how those politicians voted on relevant bills.
 *
 * Params: entityId (optional — if omitted, shows top donors and their influence)
 */
export async function GET(request: NextRequest) {
  const entityId = request.nextUrl.searchParams.get("entityId");

  if (entityId) {
    return getEntityPowerMap(entityId);
  }
  return getOverviewPowerMap();
}

async function getEntityPowerMap(entityId: string) {
  // Find the entity
  const entity = await prisma.entity.findUnique({
    where: { id: entityId },
    select: { id: true, canonicalName: true, type: true, industry: true },
  });
  if (!entity) {
    return NextResponse.json({ error: "Entity not found" }, { status: 404 });
  }

  // Find all politicians this entity has donated to
  const donations = await prisma.aggregateMoneyFlow.findMany({
    where: { sourceEntityId: entityId },
    orderBy: { totalAmount: "desc" },
    take: 20,
  });

  const politicianIds = donations.map((d) => d.targetEntityId);

  // Get politician details
  const politicians = await prisma.entity.findMany({
    where: { id: { in: politicianIds }, type: "POLITICIAN" },
    select: { id: true, canonicalName: true, party: true, state: true, office: true },
  });

  const politicianMap = new Map(politicians.map((p) => [p.id, p]));

  // Get voting records for these politicians
  const votes = await prisma.legislativeVote.findMany({
    where: { entityId: { in: politicianIds } },
    include: {
      legislation: {
        select: {
          id: true,
          billId: true,
          title: true,
          policyArea: true,
          sponsorEntityId: true,
        },
      },
    },
    orderBy: { voteDate: "desc" },
    take: 500,
  });

  // Build funded politicians with donation amounts and vote breakdown
  const fundedPoliticians = donations
    .filter((d) => politicianMap.has(d.targetEntityId))
    .map((d) => {
      const pol = politicianMap.get(d.targetEntityId)!;
      const polVotes = votes.filter((v) => v.entityId === d.targetEntityId);
      const yeaCount = polVotes.filter((v) => v.position === "YEA").length;
      const nayCount = polVotes.filter((v) => v.position === "NAY").length;

      return {
        id: pol.id,
        name: pol.canonicalName,
        party: pol.party,
        state: pol.state,
        office: pol.office,
        donationAmount: Number(d.totalAmount),
        votes: {
          total: polVotes.length,
          yea: yeaCount,
          nay: nayCount,
        },
      };
    });

  // Get relevant bills (from the same policy area as the entity's industry)
  const relevantBills = [...new Map(
    votes
      .filter((v) => v.legislation.policyArea)
      .map((v) => [v.legislation.id, v.legislation]),
  ).values()].slice(0, 10);

  return NextResponse.json({
    entity: {
      id: entity.id,
      name: entity.canonicalName,
      type: entity.type.toLowerCase(),
      industry: entity.industry,
    },
    fundedPoliticians,
    relevantBills: relevantBills.map((b) => ({
      id: b.id,
      billId: b.billId,
      title: b.title,
      policyArea: b.policyArea,
    })),
    stats: {
      totalDonated: donations.reduce((sum, d) => sum + Number(d.totalAmount), 0),
      politiciansFunded: fundedPoliticians.length,
      billsVotedOn: relevantBills.length,
    },
  });
}

async function getOverviewPowerMap() {
  // Get top donors (sources) that also have funded politicians with voting records
  const topDonors = await prisma.aggregateMoneyFlow.findMany({
    where: { totalAmount: { gte: 10000 } },
    orderBy: { totalAmount: "desc" },
    take: 100,
  });

  // Group by source entity
  const donorMap = new Map<string, { total: number; recipientCount: number }>();
  for (const flow of topDonors) {
    const existing = donorMap.get(flow.sourceEntityId) ?? { total: 0, recipientCount: 0 };
    existing.total += Number(flow.totalAmount);
    existing.recipientCount++;
    donorMap.set(flow.sourceEntityId, existing);
  }

  // Get entity details for top donors
  const topDonorIds = [...donorMap.entries()]
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 20)
    .map(([id]) => id);

  const entities = await prisma.entity.findMany({
    where: { id: { in: topDonorIds } },
    select: { id: true, canonicalName: true, type: true, industry: true },
  });

  const donors = entities.map((e) => {
    const stats = donorMap.get(e.id)!;
    return {
      id: e.id,
      name: e.canonicalName,
      type: e.type.toLowerCase(),
      industry: e.industry,
      totalDonated: stats.total,
      politiciansFunded: stats.recipientCount,
    };
  }).sort((a, b) => b.totalDonated - a.totalDonated);

  // Get vote summary stats
  const voteStats = await prisma.legislativeVote.groupBy({
    by: ["position"],
    _count: { position: true },
  });

  const billCount = await prisma.legislation.count();

  return NextResponse.json({
    donors,
    stats: {
      totalBills: billCount,
      totalVotes: voteStats.reduce((sum, v) => sum + v._count.position, 0),
      topDonorCount: donors.length,
    },
  });
}
