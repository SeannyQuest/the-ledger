import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Returns money flow data structured as a 4-stage pipeline:
 *   Sources → Intermediaries → Recipients → Contracts
 *
 * Each stage has an aggregate total, top entities, and flow totals between stages.
 */

// Which entity types belong to which pipeline stage
const STAGE_MAP: Record<string, string> = {
  CORPORATION: "sources",
  INDIVIDUAL: "sources",
  UNION: "sources",
  PAC: "intermediaries",
  SUPER_PAC: "intermediaries",
  LOBBYING_FIRM: "intermediaries",
  LOBBYIST: "intermediaries",
  PARTY_COMMITTEE: "intermediaries",
  NONPROFIT: "intermediaries",
  POLITICIAN: "recipients",
  GOVERNMENT_AGENCY: "contracts",
  UNKNOWN: "sources",
};

export async function GET() {
  // Get all aggregate flows
  const flows = await prisma.aggregateMoneyFlow.findMany({
    where: { totalAmount: { gte: 1000 } },
    orderBy: { totalAmount: "desc" },
    take: 500,
  });

  // Get all entities involved
  const entityIds = new Set<string>();
  for (const f of flows) {
    entityIds.add(f.sourceEntityId);
    entityIds.add(f.targetEntityId);
  }

  const entities = await prisma.entity.findMany({
    where: { id: { in: [...entityIds] } },
    select: {
      id: true,
      type: true,
      canonicalName: true,
      totalReceived: true,
      totalSpent: true,
      totalContributed: true,
      totalLobbying: true,
      totalContracts: true,
      party: true,
      state: true,
    },
  });

  const entityMap = new Map(entities.map((e) => [e.id, e]));

  // Aggregate by stage
  const stageAggregates = {
    sources: 0,
    intermediaries: 0,
    recipients: 0,
    contracts: 0,
  };

  // Flow between stages
  const stageFlows: Record<string, number> = {};

  // Top entities per stage
  const stageEntities: Record<string, Array<{
    id: string;
    name: string;
    type: string;
    amount: number;
    party?: string | null;
    state?: string | null;
  }>> = {
    sources: [],
    intermediaries: [],
    recipients: [],
    contracts: [],
  };

  // Build entity stage lookup
  const entityStage = new Map<string, string>();
  for (const e of entities) {
    const stage = STAGE_MAP[e.type] ?? "sources";
    entityStage.set(e.id, stage);
  }

  // Compute stage-to-stage flow totals
  for (const f of flows) {
    const sourceStage = entityStage.get(f.sourceEntityId) ?? "sources";
    const targetStage = entityStage.get(f.targetEntityId) ?? "recipients";
    const key = `${sourceStage}→${targetStage}`;
    stageFlows[key] = (stageFlows[key] ?? 0) + Number(f.totalAmount);
  }

  // Compute entity totals per stage (outflows for sources, inflows for recipients)
  const entityTotals = new Map<string, number>();
  for (const f of flows) {
    // Source entity: add to their outflow total
    const srcCurrent = entityTotals.get(f.sourceEntityId) ?? 0;
    entityTotals.set(f.sourceEntityId, srcCurrent + Number(f.totalAmount));
    // Target entity: add to their inflow total
    const tgtCurrent = entityTotals.get(f.targetEntityId) ?? 0;
    entityTotals.set(f.targetEntityId, tgtCurrent + Number(f.totalAmount));
  }

  // Build top entities per stage
  const stageEntityMap: Record<string, Map<string, number>> = {
    sources: new Map(),
    intermediaries: new Map(),
    recipients: new Map(),
    contracts: new Map(),
  };

  for (const [entityId, total] of entityTotals) {
    const stage = entityStage.get(entityId);
    if (stage && stageEntityMap[stage]) {
      stageEntityMap[stage].set(entityId, total);
    }
  }

  for (const [stage, entMap] of Object.entries(stageEntityMap)) {
    const sorted = [...entMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    stageEntities[stage] = sorted.map(([id, amount]) => {
      const e = entityMap.get(id);
      return {
        id,
        name: e?.canonicalName ?? "Unknown",
        type: e?.type?.toLowerCase() ?? "unknown",
        amount,
        party: e?.party ?? null,
        state: e?.state ?? null,
      };
    });

    stageAggregates[stage as keyof typeof stageAggregates] = sorted.reduce(
      (sum, [, amt]) => sum + amt,
      0,
    );
  }

  // Build highlighted money trails — find circular paths (Source → PAC → Politician → Contract → Source)
  const trails: Array<{
    label: string;
    steps: Array<{ entity: string; entityId: string; type: string; amount: number }>;
    roiMultiple: number | null;
  }> = [];

  // Find corporations that both donate AND receive contracts
  const corpDonations = new Map<string, { totalDonated: number; recipients: Map<string, number> }>();
  const corpContracts = new Map<string, number>();

  for (const f of flows) {
    const sourceEntity = entityMap.get(f.sourceEntityId);
    const targetEntity = entityMap.get(f.targetEntityId);

    if (sourceEntity?.type === "CORPORATION" && targetEntity?.type !== "CORPORATION") {
      if (!corpDonations.has(f.sourceEntityId)) {
        corpDonations.set(f.sourceEntityId, { totalDonated: 0, recipients: new Map() });
      }
      const cd = corpDonations.get(f.sourceEntityId)!;
      cd.totalDonated += Number(f.totalAmount);
      const existing = cd.recipients.get(f.targetEntityId) ?? 0;
      cd.recipients.set(f.targetEntityId, existing + Number(f.totalAmount));
    }

    if (targetEntity?.type === "CORPORATION") {
      const existing = corpContracts.get(f.targetEntityId) ?? 0;
      corpContracts.set(f.targetEntityId, existing + Number(f.totalAmount));
    }
  }

  // Build trails for corps that both donate and receive
  for (const [corpId, { totalDonated, recipients }] of corpDonations) {
    const contractAmt = corpContracts.get(corpId);
    if (!contractAmt || contractAmt < 10000) continue;

    const corp = entityMap.get(corpId);
    if (!corp) continue;

    // Find the biggest recipient of this corp's money
    let topRecipientId = "";
    let topRecipientAmt = 0;
    for (const [rid, amt] of recipients) {
      if (amt > topRecipientAmt) {
        topRecipientId = rid;
        topRecipientAmt = amt;
      }
    }

    const topRecipient = entityMap.get(topRecipientId);

    trails.push({
      label: corp.canonicalName,
      steps: [
        { entity: corp.canonicalName, entityId: corpId, type: "corporation", amount: totalDonated },
        {
          entity: topRecipient?.canonicalName ?? "PAC/Politician",
          entityId: topRecipientId,
          type: topRecipient?.type?.toLowerCase() ?? "pac",
          amount: topRecipientAmt,
        },
        { entity: "Federal Contracts", entityId: corpId, type: "contract", amount: contractAmt },
      ],
      roiMultiple: totalDonated > 0 ? Math.round(contractAmt / totalDonated) : null,
    });
  }

  // Sort trails by ROI
  trails.sort((a, b) => (b.roiMultiple ?? 0) - (a.roiMultiple ?? 0));

  return NextResponse.json({
    stages: stageAggregates,
    stageFlows,
    topEntities: stageEntities,
    trails: trails.slice(0, 6),
    meta: {
      totalTracked: flows.reduce((s, f) => s + Number(f.totalAmount), 0),
      entityCount: entities.length,
      flowCount: flows.length,
    },
  });
}
