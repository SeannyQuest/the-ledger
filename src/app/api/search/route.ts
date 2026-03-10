import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  const type = request.nextUrl.searchParams.get("type");
  const limit = Math.min(parseInt(request.nextUrl.searchParams.get("limit") ?? "20"), 50);

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const searchTerm = `%${q}%`;

  const whereClause: Record<string, unknown> = {
    OR: [
      { canonicalName: { contains: q, mode: "insensitive" } },
      { shortName: { contains: q, mode: "insensitive" } },
      { aliases: { some: { alias: { contains: q, mode: "insensitive" } } } },
    ],
    mergedIntoId: null,
  };

  if (type) {
    whereClause.type = type.toUpperCase();
  }

  const entities = await prisma.entity.findMany({
    where: whereClause as any,
    orderBy: [{ totalReceived: "desc" }],
    take: limit,
    select: {
      id: true,
      type: true,
      canonicalName: true,
      shortName: true,
      party: true,
      state: true,
      office: true,
      ticker: true,
      industry: true,
      totalReceived: true,
      totalSpent: true,
      totalContributed: true,
      totalLobbying: true,
      totalContracts: true,
      photoUrl: true,
    },
  });

  const results = entities.map((e) => ({
    entity: {
      id: e.id,
      type: e.type.toLowerCase(),
      name: e.canonicalName,
      shortName: e.shortName,
      party: e.party,
      state: e.state,
      office: e.office,
      ticker: e.ticker,
      industry: e.industry,
      totalReceived: Number(e.totalReceived),
      totalSpent: Number(e.totalSpent),
      totalContributed: Number(e.totalContributed),
      totalLobbying: Number(e.totalLobbying),
      totalContracts: Number(e.totalContracts),
      photoUrl: e.photoUrl,
    },
    matchField: "name",
    matchHighlight: e.canonicalName,
    score: 1,
  }));

  return NextResponse.json({ results });
}
