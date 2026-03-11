import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/regulations
 *
 * Query Federal Register entries with filters.
 * Params: type, significant, limit, offset
 */
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const type = sp.get("type");
  const significant = sp.get("significant");
  const limit = Math.min(parseInt(sp.get("limit") ?? "50"), 200);
  const offset = parseInt(sp.get("offset") ?? "0");

  const where: Record<string, unknown> = {};
  if (type) where.type = type;
  if (significant === "true") where.significantRule = true;

  const [entries, total] = await Promise.all([
    prisma.federalRegisterEntry.findMany({
      where: where as any,
      orderBy: { publicationDate: "desc" },
      take: limit,
      skip: offset,
    }),
    prisma.federalRegisterEntry.count({ where: where as any }),
  ]);

  // Get type breakdown
  const typeBreakdown = await prisma.federalRegisterEntry.groupBy({
    by: ["type"],
    _count: { type: true },
    orderBy: { _count: { type: "desc" } },
  });

  // Get agency breakdown
  // Since agencyNames is an array, we aggregate manually
  const agencyCounts = new Map<string, number>();
  const allEntries = await prisma.federalRegisterEntry.findMany({
    select: { agencyNames: true },
  });
  for (const entry of allEntries) {
    for (const name of entry.agencyNames) {
      agencyCounts.set(name, (agencyCounts.get(name) ?? 0) + 1);
    }
  }
  const topAgencies = [...agencyCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([name, count]) => ({ name, count }));

  return NextResponse.json({
    entries: entries.map((e) => ({
      id: e.id,
      documentNumber: e.documentNumber,
      title: e.title,
      type: e.type,
      agencyNames: e.agencyNames,
      publicationDate: e.publicationDate.toISOString().split("T")[0],
      significantRule: e.significantRule,
      abstractText: e.abstractText,
      htmlUrl: e.htmlUrl,
      commentCount: e.commentCount,
    })),
    meta: { total, limit, offset },
    typeBreakdown: typeBreakdown.map((t) => ({
      type: t.type,
      count: t._count.type,
    })),
    topAgencies,
  });
}
