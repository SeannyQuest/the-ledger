import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/dark-money
 *
 * Top 501(c)(4) spenders, political expenditure trends.
 * Params: year, limit, offset
 */
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const year = sp.get("year");
  const limit = Math.min(parseInt(sp.get("limit") ?? "50"), 200);
  const offset = parseInt(sp.get("offset") ?? "0");

  const where: Record<string, unknown> = {};
  if (year) where.filingYear = parseInt(year);

  const [filings, total] = await Promise.all([
    prisma.nonprofitFiling.findMany({
      where: where as any,
      orderBy: { totalRevenue: "desc" },
      take: limit,
      skip: offset,
    }),
    prisma.nonprofitFiling.count({ where: where as any }),
  ]);

  // Top 20 orgs by total political spend — computed in DB, no full table scan
  const topOrgsRaw = await prisma.nonprofitFiling.groupBy({
    by: ["ein", "organizationName"],
    _sum: {
      politicalExpenses: true,
      totalRevenue: true,
      totalExpenses: true,
      totalAssets: true,
    },
    _max: { filingYear: true },
    _count: { filingYear: true },
    orderBy: { _sum: { politicalExpenses: "desc" } },
    take: 20,
  });

  const topOrgs = topOrgsRaw.map((r) => ({
    ein: r.ein,
    name: r.organizationName,
    latestRevenue: Number(r._sum.totalRevenue ?? 0),
    latestExpenses: Number(r._sum.totalExpenses ?? 0),
    latestPolitical: Number(r._sum.politicalExpenses ?? 0),
    latestAssets: Number(r._sum.totalAssets ?? 0),
    filingYears: r._count.filingYear,
    latestYear: r._max.filingYear,
  }));

  // Year breakdown
  const yearBreakdown = await prisma.nonprofitFiling.groupBy({
    by: ["filingYear"],
    _sum: {
      totalRevenue: true,
      totalExpenses: true,
      politicalExpenses: true,
    },
    _count: { filingYear: true },
    orderBy: { filingYear: "desc" },
  });

  // Stats — derived from the yearBreakdown groupBy already in memory
  const totalPoliticalSpend = yearBreakdown.reduce(
    (sum, y) => sum + Number(y._sum.politicalExpenses ?? 0),
    0,
  );
  const uniqueOrgs = topOrgsRaw.length;

  return NextResponse.json({
    filings: filings.map((f) => ({
      id: f.id,
      ein: f.ein,
      organizationName: f.organizationName,
      taxPeriod: f.taxPeriod,
      totalRevenue: Number(f.totalRevenue ?? 0),
      totalExpenses: Number(f.totalExpenses ?? 0),
      totalAssets: Number(f.totalAssets ?? 0),
      politicalExpenses: Number(f.politicalExpenses ?? 0),
      grantRecipients: f.grantRecipients,
      formType: f.formType,
      filingYear: f.filingYear,
      pdfUrl: f.pdfUrl,
    })),
    meta: { total, limit, offset },
    topOrgs,
    yearBreakdown: yearBreakdown.map((y) => ({
      year: y.filingYear,
      count: y._count.filingYear,
      totalRevenue: Number(y._sum.totalRevenue ?? 0),
      totalExpenses: Number(y._sum.totalExpenses ?? 0),
      politicalExpenses: Number(y._sum.politicalExpenses ?? 0),
    })),
    stats: {
      totalFilings: total,
      uniqueOrganizations: uniqueOrgs,
      totalPoliticalSpend: totalPoliticalSpend,
    },
  });
}
