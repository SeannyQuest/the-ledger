import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const sourceId = request.nextUrl.searchParams.get("sourceId");
  const depth = Math.min(parseInt(request.nextUrl.searchParams.get("depth") ?? "2"), 5);
  const minAmount = parseInt(request.nextUrl.searchParams.get("minAmount") ?? "1000");
  const cycle = request.nextUrl.searchParams.get("cycle");
  const limit = Math.min(parseInt(request.nextUrl.searchParams.get("limit") ?? "200"), 500);

  // If no sourceId, return top money flows overall
  if (!sourceId) {
    return await getTopFlows(minAmount, cycle ? parseInt(cycle) : null, limit);
  }

  // BFS traversal of money flows from sourceId
  return await getEntityFlows(sourceId, depth, minAmount, cycle ? parseInt(cycle) : null, limit);
}

async function getTopFlows(minAmount: number, cycle: number | null, limit: number) {
  const where: Record<string, unknown> = {
    totalAmount: { gte: minAmount },
  };
  if (cycle) where.electionCycle = cycle;

  const flows = await prisma.aggregateMoneyFlow.findMany({
    where: where as any,
    orderBy: { totalAmount: "desc" },
    take: limit,
  });

  // Collect unique entity IDs
  const entityIds = new Set<string>();
  for (const f of flows) {
    entityIds.add(f.sourceEntityId);
    entityIds.add(f.targetEntityId);
  }

  const entities = await prisma.entity.findMany({
    where: { id: { in: [...entityIds] } },
    select: { id: true, type: true, canonicalName: true, totalReceived: true },
  });

  const entityMap = new Map(entities.map((e) => [e.id, e]));

  const nodes = entities.map((e) => ({
    id: e.id,
    entityId: e.id,
    entityType: e.type.toLowerCase(),
    name: e.canonicalName,
    totalAmount: Number(e.totalReceived),
  }));

  const links = flows.map((f) => ({
    source: f.sourceEntityId,
    target: f.targetEntityId,
    amount: Number(f.totalAmount),
    transactionCount: f.transactionCount,
    dateRange: {
      start: f.firstTransaction.toISOString().split("T")[0],
      end: f.lastTransaction.toISOString().split("T")[0],
    },
    flowType: f.transactionType.toLowerCase(),
  }));

  const totalAmount = flows.reduce((sum, f) => sum + Number(f.totalAmount), 0);

  return NextResponse.json({
    nodes,
    links,
    meta: {
      totalAmount,
      dateRange: { start: "", end: "" },
      truncated: flows.length >= limit,
    },
  });
}

async function getEntityFlows(
  sourceId: string,
  depth: number,
  minAmount: number,
  cycle: number | null,
  limit: number
) {
  const visitedEntities = new Set<string>([sourceId]);
  const allFlows: Array<{
    sourceEntityId: string;
    targetEntityId: string;
    totalAmount: number;
    transactionCount: number;
    transactionType: string;
    firstTransaction: Date;
    lastTransaction: Date;
  }> = [];

  let frontier = [sourceId];

  for (let d = 0; d < depth && frontier.length > 0; d++) {
    const where: Record<string, unknown> = {
      OR: [
        { sourceEntityId: { in: frontier } },
        { targetEntityId: { in: frontier } },
      ],
      totalAmount: { gte: minAmount },
    };
    if (cycle) where.electionCycle = cycle;

    const flows = await prisma.aggregateMoneyFlow.findMany({
      where: where as any,
      orderBy: { totalAmount: "desc" },
      take: Math.floor(limit / depth),
    });

    const nextFrontier = new Set<string>();
    for (const f of flows) {
      allFlows.push({
        sourceEntityId: f.sourceEntityId,
        targetEntityId: f.targetEntityId,
        totalAmount: Number(f.totalAmount),
        transactionCount: f.transactionCount,
        transactionType: f.transactionType,
        firstTransaction: f.firstTransaction,
        lastTransaction: f.lastTransaction,
      });

      if (!visitedEntities.has(f.sourceEntityId)) {
        nextFrontier.add(f.sourceEntityId);
        visitedEntities.add(f.sourceEntityId);
      }
      if (!visitedEntities.has(f.targetEntityId)) {
        nextFrontier.add(f.targetEntityId);
        visitedEntities.add(f.targetEntityId);
      }
    }

    frontier = [...nextFrontier];
  }

  // Fetch entities
  const entities = await prisma.entity.findMany({
    where: { id: { in: [...visitedEntities] } },
    select: { id: true, type: true, canonicalName: true, totalReceived: true },
  });

  const nodes = entities.map((e) => ({
    id: e.id,
    entityId: e.id,
    entityType: e.type.toLowerCase(),
    name: e.canonicalName,
    totalAmount: Number(e.totalReceived),
  }));

  // Deduplicate flows (same source-target may appear multiple times from different depths)
  const flowKey = (f: { sourceEntityId: string; targetEntityId: string; transactionType: string }) =>
    `${f.sourceEntityId}-${f.targetEntityId}-${f.transactionType}`;
  const uniqueFlows = new Map<string, (typeof allFlows)[0]>();
  for (const f of allFlows) {
    const key = flowKey(f);
    const existing = uniqueFlows.get(key);
    if (!existing || f.totalAmount > existing.totalAmount) {
      uniqueFlows.set(key, f);
    }
  }

  const links = [...uniqueFlows.values()].map((f) => ({
    source: f.sourceEntityId,
    target: f.targetEntityId,
    amount: f.totalAmount,
    transactionCount: f.transactionCount,
    dateRange: {
      start: f.firstTransaction.toISOString().split("T")[0],
      end: f.lastTransaction.toISOString().split("T")[0],
    },
    flowType: f.transactionType.toLowerCase(),
  }));

  const totalAmount = links.reduce((sum, l) => sum + l.amount, 0);

  return NextResponse.json({
    nodes,
    links,
    meta: {
      totalAmount,
      dateRange: { start: "", end: "" },
      truncated: allFlows.length >= limit,
    },
  });
}
