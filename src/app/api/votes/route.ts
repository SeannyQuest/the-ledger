import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/votes?entityId=...&limit=100
 *
 * Returns roll-call votes cast by a specific entity (legislator).
 */
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const entityId = sp.get("entityId");
  const limit = Math.min(parseInt(sp.get("limit") ?? "100"), 200);

  if (!entityId) {
    return NextResponse.json({ error: "entityId required" }, { status: 400 });
  }

  const votes = await prisma.legislativeVote.findMany({
    where: { entityId },
    orderBy: { voteDate: "desc" },
    take: limit,
    select: {
      id: true,
      position: true,
      voteDate: true,
      legislation: {
        select: {
          id: true,
          billId: true,
          title: true,
          policyArea: true,
        },
      },
    },
  });

  return NextResponse.json({
    votes: votes.map((v) => ({
      ...v,
      voteDate: v.voteDate.toISOString().split("T")[0],
    })),
  });
}
