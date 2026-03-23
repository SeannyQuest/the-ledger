import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toCSV } from "@/lib/csv";

const MAX_ROWS = 1000;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type = searchParams.get("type");

  if (!type || !["contractors", "entities", "flows"].includes(type)) {
    return NextResponse.json(
      { error: 'Invalid type. Must be "contractors", "entities", or "flows".' },
      { status: 400 },
    );
  }

  const date = new Date().toISOString().slice(0, 10);
  const filename = `daonra-${type}-${date}.csv`;

  let csv: string;

  switch (type) {
    case "contractors":
      csv = await buildContractorsCSV();
      break;
    case "entities":
      csv = await buildEntitiesCSV();
      break;
    case "flows":
      csv = await buildFlowsCSV();
      break;
    default:
      return NextResponse.json({ error: "Unknown type" }, { status: 400 });
  }

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

// ─── Contractors: top entities with contracts, donations, lobbying, ROI ───

async function buildContractorsCSV(): Promise<string> {
  const entities = await prisma.entity.findMany({
    where: {
      totalContracts: { gt: 0 },
    },
    orderBy: { totalContracts: "desc" },
    take: MAX_ROWS,
    select: {
      id: true,
      type: true,
      canonicalName: true,
      state: true,
      industry: true,
      totalContracts: true,
      totalSpent: true,
      totalLobbying: true,
    },
  });

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
    donationFlows.map((f) => [
      f.sourceEntityId,
      Number(f._sum.totalAmount ?? 0),
    ]),
  );

  const headers = [
    "Name",
    "Type",
    "State",
    "Industry",
    "Total Contracts ($)",
    "Total Donated ($)",
    "Total Lobbying ($)",
    "Political Spend ($)",
    "ROI (x)",
  ];

  const rows = entities.map((e) => {
    const totalContracts = Number(e.totalContracts);
    const totalDonated = donationMap.get(e.id) ?? Number(e.totalSpent);
    const totalLobbying = Number(e.totalLobbying);
    const politicalSpend = totalDonated + totalLobbying;
    const roi = politicalSpend > 0 ? totalContracts / politicalSpend : 0;

    return [
      e.canonicalName,
      e.type,
      e.state ?? "",
      e.industry ?? "",
      totalContracts.toFixed(2),
      totalDonated.toFixed(2),
      totalLobbying.toFixed(2),
      politicalSpend.toFixed(2),
      Math.round(roi).toString(),
    ];
  });

  return toCSV(headers, rows);
}

// ─── Entities: all entities with financial summaries ───

async function buildEntitiesCSV(): Promise<string> {
  const entities = await prisma.entity.findMany({
    orderBy: { totalReceived: "desc" },
    take: MAX_ROWS,
    select: {
      id: true,
      type: true,
      canonicalName: true,
      shortName: true,
      state: true,
      party: true,
      office: true,
      industry: true,
      ticker: true,
      totalReceived: true,
      totalSpent: true,
      totalContributed: true,
      totalLobbying: true,
      totalContracts: true,
    },
  });

  const headers = [
    "ID",
    "Name",
    "Short Name",
    "Type",
    "State",
    "Party",
    "Office",
    "Industry",
    "Ticker",
    "Total Received ($)",
    "Total Spent ($)",
    "Total Contributed ($)",
    "Total Lobbying ($)",
    "Total Contracts ($)",
  ];

  const rows = entities.map((e) => [
    e.id,
    e.canonicalName,
    e.shortName ?? "",
    e.type,
    e.state ?? "",
    e.party ?? "",
    e.office ?? "",
    e.industry ?? "",
    e.ticker ?? "",
    Number(e.totalReceived).toFixed(2),
    Number(e.totalSpent).toFixed(2),
    Number(e.totalContributed).toFixed(2),
    Number(e.totalLobbying).toFixed(2),
    Number(e.totalContracts).toFixed(2),
  ]);

  return toCSV(headers, rows);
}

// ─── Flows: aggregate money flows with source/target names ───

async function buildFlowsCSV(): Promise<string> {
  const flows = await prisma.aggregateMoneyFlow.findMany({
    orderBy: { totalAmount: "desc" },
    take: MAX_ROWS,
    include: {
      sourceEntity: { select: { canonicalName: true, type: true } },
      targetEntity: { select: { canonicalName: true, type: true } },
    },
  });

  const headers = [
    "Source Name",
    "Source Type",
    "Target Name",
    "Target Type",
    "Transaction Type",
    "Election Cycle",
    "Total Amount ($)",
    "Transaction Count",
    "Avg Amount ($)",
    "Min Amount ($)",
    "Max Amount ($)",
    "First Transaction",
    "Last Transaction",
  ];

  const rows = flows.map((f) => [
    f.sourceEntity.canonicalName,
    f.sourceEntity.type,
    f.targetEntity.canonicalName,
    f.targetEntity.type,
    f.transactionType,
    f.electionCycle.toString(),
    Number(f.totalAmount).toFixed(2),
    f.transactionCount.toString(),
    Number(f.avgAmount).toFixed(2),
    Number(f.minAmount).toFixed(2),
    Number(f.maxAmount).toFixed(2),
    f.firstTransaction.toISOString().slice(0, 10),
    f.lastTransaction.toISOString().slice(0, 10),
  ]);

  return toCSV(headers, rows);
}
