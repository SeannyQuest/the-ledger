import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/dark-money/trace?entityId=...
 *
 * Traces dark money flow chains:
 * Nonprofit 501(c)(4) -> Super PAC -> Independent Expenditures -> Elections
 *
 * Returns the full chain with amounts at each step.
 */
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const entityId = sp.get("entityId");

  if (!entityId) {
    return NextResponse.json(
      { error: "entityId query parameter is required" },
      { status: 400 },
    );
  }

  // ── Step 1: Get the nonprofit entity and its NonprofitFiling data ──
  const entity = await prisma.entity.findUnique({
    where: { id: entityId },
  });

  if (!entity) {
    return NextResponse.json({ error: "Entity not found" }, { status: 404 });
  }

  const nonprofitFilings = await prisma.nonprofitFiling.findMany({
    where: { entityId },
    orderBy: { filingYear: "desc" },
  });

  const totalPoliticalExpenses = nonprofitFilings.reduce(
    (sum, f) => sum + Number(f.politicalExpenses ?? 0),
    0,
  );

  // Collect grant recipients from filings
  const grantRecipients: Array<{ name: string; amount: number; purpose: string }> = [];
  for (const filing of nonprofitFilings) {
    if (filing.grantRecipients && Array.isArray(filing.grantRecipients)) {
      for (const grant of filing.grantRecipients as Array<{
        name: string;
        amount: number;
        purpose: string;
      }>) {
        grantRecipients.push(grant);
      }
    }
  }

  // ── Step 2: Find MoneyTransactions where source is this entity -> targets (Super PACs, PACs) ──
  const outboundTransactions = await prisma.moneyTransaction.findMany({
    where: { sourceEntityId: entityId },
    orderBy: { amount: "desc" },
  });

  // Collect unique target entity IDs
  const targetEntityIds = [
    ...new Set(
      outboundTransactions
        .map((t) => t.targetEntityId)
        .filter((id): id is string => id !== null),
    ),
  ];

  // Fetch target entities (Super PACs, PACs, etc.)
  const targetEntities = await prisma.entity.findMany({
    where: { id: { in: targetEntityIds } },
  });

  const targetEntityMap = new Map(targetEntities.map((e) => [e.id, e]));

  // Build intermediary nodes (grouped by target)
  const intermediaries: Array<{
    entityId: string;
    name: string;
    entityType: string;
    totalReceived: number;
    transactionCount: number;
  }> = [];

  const intermediaryAmounts = new Map<string, { total: number; count: number }>();
  for (const tx of outboundTransactions) {
    if (!tx.targetEntityId) continue;
    const existing = intermediaryAmounts.get(tx.targetEntityId) ?? {
      total: 0,
      count: 0,
    };
    existing.total += Number(tx.amount);
    existing.count += 1;
    intermediaryAmounts.set(tx.targetEntityId, existing);
  }

  for (const [id, amounts] of intermediaryAmounts) {
    const target = targetEntityMap.get(id);
    if (target) {
      intermediaries.push({
        entityId: id,
        name: target.canonicalName,
        entityType: target.type,
        totalReceived: amounts.total,
        transactionCount: amounts.count,
      });
    }
  }

  // ── Step 3: For those intermediaries, find their independent expenditures ──
  const independentExpenditures = await prisma.moneyTransaction.findMany({
    where: {
      sourceEntityId: { in: targetEntityIds },
      transactionType: "INDEPENDENT_EXPENDITURE",
    },
    orderBy: { amount: "desc" },
  });

  // Collect final recipient entity IDs
  const finalRecipientIds = [
    ...new Set(
      independentExpenditures
        .map((t) => t.targetEntityId)
        .filter((id): id is string => id !== null),
    ),
  ];

  const finalRecipientEntities = await prisma.entity.findMany({
    where: { id: { in: finalRecipientIds } },
  });

  const finalRecipientMap = new Map(
    finalRecipientEntities.map((e) => [e.id, e]),
  );

  // Build expenditure details grouped by intermediary
  const expendituresByIntermediary = new Map<
    string,
    Array<{
      targetEntityId: string | null;
      targetName: string;
      amount: number;
      supportOppose: string | null;
      electionYear: number | null;
      transactionDate: string;
    }>
  >();

  for (const ie of independentExpenditures) {
    const sourceId = ie.sourceEntityId!;
    const existing = expendituresByIntermediary.get(sourceId) ?? [];
    const target = ie.targetEntityId
      ? finalRecipientMap.get(ie.targetEntityId)
      : null;

    existing.push({
      targetEntityId: ie.targetEntityId,
      targetName: target?.canonicalName ?? ie.targetName ?? "Unknown",
      amount: Number(ie.amount),
      supportOppose: ie.supportOppose,
      electionYear: ie.electionYear,
      transactionDate: ie.transactionDate.toISOString(),
    });

    expendituresByIntermediary.set(sourceId, existing);
  }

  // ── Step 4: Also check AggregateMoneyFlow for pre-computed flows ──
  const aggregateFlows = await prisma.aggregateMoneyFlow.findMany({
    where: { sourceEntityId: entityId },
    orderBy: { totalAmount: "desc" },
  });

  // ── Step 5: Build the full chain ──
  const totalOutboundToIntermediaries = intermediaries.reduce(
    (sum, i) => sum + i.totalReceived,
    0,
  );

  const totalIndependentExpenditures = independentExpenditures.reduce(
    (sum, ie) => sum + Number(ie.amount),
    0,
  );

  const totalDarkMoney = Math.max(
    totalPoliticalExpenses,
    totalOutboundToIntermediaries,
    totalIndependentExpenditures,
  );

  // Build final recipients summary
  const finalRecipientSummary = new Map<
    string,
    { name: string; entityType: string; total: number; supportCount: number; opposeCount: number }
  >();

  for (const ie of independentExpenditures) {
    const key = ie.targetEntityId ?? ie.targetName ?? "unknown";
    const target = ie.targetEntityId
      ? finalRecipientMap.get(ie.targetEntityId)
      : null;
    const existing = finalRecipientSummary.get(key) ?? {
      name: target?.canonicalName ?? ie.targetName ?? "Unknown",
      entityType: target?.type ?? "UNKNOWN",
      total: 0,
      supportCount: 0,
      opposeCount: 0,
    };
    existing.total += Number(ie.amount);
    if (ie.supportOppose === "S") existing.supportCount++;
    if (ie.supportOppose === "O") existing.opposeCount++;
    finalRecipientSummary.set(key, existing);
  }

  return NextResponse.json({
    source: {
      entityId: entity.id,
      name: entity.canonicalName,
      entityType: entity.type,
      totalPoliticalExpenses,
      totalRevenue: Number(entity.totalReceived),
      filingCount: nonprofitFilings.length,
      latestFilingYear: nonprofitFilings[0]?.filingYear ?? null,
      grantRecipients: grantRecipients.slice(0, 20),
    },
    intermediaries: intermediaries
      .sort((a, b) => b.totalReceived - a.totalReceived)
      .map((i) => ({
        ...i,
        expenditures: (expendituresByIntermediary.get(i.entityId) ?? []).slice(
          0,
          20,
        ),
        totalExpenditures: (expendituresByIntermediary.get(i.entityId) ?? []).reduce(
          (sum, e) => sum + e.amount,
          0,
        ),
      })),
    finalRecipients: [...finalRecipientSummary.values()]
      .sort((a, b) => b.total - a.total)
      .slice(0, 30),
    aggregateFlows: aggregateFlows.map((f) => ({
      targetEntityId: f.targetEntityId,
      transactionType: f.transactionType,
      electionCycle: f.electionCycle,
      totalAmount: Number(f.totalAmount),
      transactionCount: f.transactionCount,
    })),
    summary: {
      totalDarkMoney,
      totalPoliticalExpenses,
      totalOutboundToIntermediaries,
      totalIndependentExpenditures,
      intermediaryCount: intermediaries.length,
      finalRecipientCount: finalRecipientSummary.size,
      chainDepth: intermediaries.length > 0 ? (independentExpenditures.length > 0 ? 3 : 2) : 1,
    },
  });
}
