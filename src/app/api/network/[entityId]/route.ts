import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ entityId: string }> },
) {
  const { entityId } = await params;
  const depth = Math.min(
    parseInt(request.nextUrl.searchParams.get("depth") ?? "2"),
    4,
  );
  const minWeight = parseInt(
    request.nextUrl.searchParams.get("minWeight") ?? "0",
  );

  const visitedEntities = new Set<string>([entityId]);
  const allLinks: Array<{
    sourceId: string;
    targetId: string;
    linkType: string;
    weight: number;
    label?: string;
  }> = [];

  let frontier = [entityId];

  for (let d = 0; d < depth && frontier.length > 0; d++) {
    // Get relationships
    const relationships = await prisma.entityRelationship.findMany({
      where: {
        OR: [
          { fromEntityId: { in: frontier } },
          { toEntityId: { in: frontier } },
        ],
      },
      take: 100,
    });

    // Get top money flows
    const flows = await prisma.aggregateMoneyFlow.findMany({
      where: {
        OR: [
          { sourceEntityId: { in: frontier } },
          { targetEntityId: { in: frontier } },
        ],
        totalAmount: { gte: minWeight || 10000 },
      },
      orderBy: { totalAmount: "desc" },
      take: 50,
    });

    const nextFrontier = new Set<string>();

    for (const rel of relationships) {
      allLinks.push({
        sourceId: rel.fromEntityId,
        targetId: rel.toEntityId,
        linkType: rel.relationshipType.toLowerCase().replace(/_/g, "_"),
        weight: 1,
        label: rel.title ?? undefined,
      });

      for (const id of [rel.fromEntityId, rel.toEntityId]) {
        if (!visitedEntities.has(id)) {
          nextFrontier.add(id);
          visitedEntities.add(id);
        }
      }
    }

    for (const flow of flows) {
      const donationTypes = [
        "INDIVIDUAL_CONTRIBUTION",
        "PAC_CONTRIBUTION",
        "PARTY_CONTRIBUTION",
        "CANDIDATE_CONTRIBUTION",
        "CORPORATE_CONTRIBUTION",
      ];
      const contractTypes = ["FEDERAL_CONTRACT", "FEDERAL_GRANT"];
      const tt = flow.transactionType as string;
      const flowLinkType = donationTypes.includes(tt)
        ? "donation"
        : tt === "LOBBYING_PAYMENT"
          ? "lobbying"
          : contractTypes.includes(tt)
            ? "contract"
            : "donation";

      allLinks.push({
        sourceId: flow.sourceEntityId,
        targetId: flow.targetEntityId,
        linkType: flowLinkType,
        weight: Number(flow.totalAmount),
      });

      for (const id of [flow.sourceEntityId, flow.targetEntityId]) {
        if (!visitedEntities.has(id)) {
          nextFrontier.add(id);
          visitedEntities.add(id);
        }
      }
    }

    frontier = [...nextFrontier];
  }

  // Fetch entities
  const entities = await prisma.entity.findMany({
    where: { id: { in: [...visitedEntities] } },
    select: {
      id: true,
      type: true,
      canonicalName: true,
      totalReceived: true,
      totalSpent: true,
    },
  });

  const nodes = entities.map((e) => ({
    id: e.id,
    entityId: e.id,
    entityType: e.type.toLowerCase(),
    name: e.canonicalName,
    weight: Number(e.totalReceived) + Number(e.totalSpent),
    expanded: e.id === entityId,
  }));

  // Deduplicate links
  const linkKey = (l: {
    sourceId: string;
    targetId: string;
    linkType: string;
  }) => `${l.sourceId}-${l.targetId}-${l.linkType}`;
  const uniqueLinks = new Map<string, (typeof allLinks)[0]>();
  for (const l of allLinks) {
    const key = linkKey(l);
    const existing = uniqueLinks.get(key);
    if (!existing || l.weight > existing.weight) {
      uniqueLinks.set(key, l);
    }
  }

  const links = [...uniqueLinks.values()].map((l) => ({
    source: l.sourceId,
    target: l.targetId,
    linkType: l.linkType,
    weight: l.weight,
    label: l.label,
  }));

  return NextResponse.json({
    nodes,
    links,
    centerNodeId: entityId,
  });
}
