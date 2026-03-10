import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; id: string }> },
) {
  const { id } = await params;

  const entity = await prisma.entity.findUnique({
    where: { id },
    include: {
      aliases: { select: { alias: true, source: true } },
      sourceRecords: {
        select: { source: true, sourceId: true, sourceIdType: true },
      },
      relationshipsFrom: {
        include: {
          toEntity: { select: { id: true, type: true, canonicalName: true } },
        },
        where: { isActive: true },
        take: 20,
      },
      relationshipsTo: {
        include: {
          fromEntity: { select: { id: true, type: true, canonicalName: true } },
        },
        where: { isActive: true },
        take: 20,
      },
    },
  });

  if (!entity) {
    return NextResponse.json({ error: "Entity not found" }, { status: 404 });
  }

  // Get top inflow transactions
  const topDonors = await prisma.aggregateMoneyFlow.findMany({
    where: { targetEntityId: id },
    orderBy: { totalAmount: "desc" },
    take: 10,
  });

  // Get top outflow transactions
  const topRecipients = await prisma.aggregateMoneyFlow.findMany({
    where: { sourceEntityId: id },
    orderBy: { totalAmount: "desc" },
    take: 10,
  });

  // Resolve names for donors/recipients
  const relatedIds = new Set<string>();
  for (const d of topDonors) relatedIds.add(d.sourceEntityId);
  for (const r of topRecipients) relatedIds.add(r.targetEntityId);

  const relatedEntities = await prisma.entity.findMany({
    where: { id: { in: [...relatedIds] } },
    select: { id: true, type: true, canonicalName: true },
  });
  const nameMap = new Map(relatedEntities.map((e) => [e.id, e]));

  return NextResponse.json({
    entity: {
      id: entity.id,
      type: entity.type.toLowerCase(),
      name: entity.canonicalName,
      shortName: entity.shortName,
      description: entity.description,
      party: entity.party,
      state: entity.state,
      office: entity.office,
      officeLevel: entity.officeLevel,
      inOffice: entity.inOffice,
      ticker: entity.ticker,
      industry: entity.industry,
      photoUrl: entity.photoUrl,
      totalReceived: Number(entity.totalReceived),
      totalSpent: Number(entity.totalSpent),
      totalContributed: Number(entity.totalContributed),
      totalLobbying: Number(entity.totalLobbying),
      totalContracts: Number(entity.totalContracts),
    },
    aliases: entity.aliases,
    sourceRecords: entity.sourceRecords,
    relationships: [
      ...entity.relationshipsFrom.map((r) => ({
        type: r.relationshipType,
        direction: "outgoing",
        entity: r.toEntity,
        title: r.title,
      })),
      ...entity.relationshipsTo.map((r) => ({
        type: r.relationshipType,
        direction: "incoming",
        entity: r.fromEntity,
        title: r.title,
      })),
    ],
    topDonors: topDonors.map((d) => ({
      entityId: d.sourceEntityId,
      name: nameMap.get(d.sourceEntityId)?.canonicalName ?? "Unknown",
      type: nameMap.get(d.sourceEntityId)?.type.toLowerCase(),
      amount: Number(d.totalAmount),
      transactionCount: d.transactionCount,
    })),
    topRecipients: topRecipients.map((r) => ({
      entityId: r.targetEntityId,
      name: nameMap.get(r.targetEntityId)?.canonicalName ?? "Unknown",
      type: nameMap.get(r.targetEntityId)?.type.toLowerCase(),
      amount: Number(r.totalAmount),
      transactionCount: r.transactionCount,
    })),
  });
}
