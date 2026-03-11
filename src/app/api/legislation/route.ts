import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/legislation
 *
 * Query legislation with filters.
 * Params: congress, policyArea, status, sponsorId, limit, offset
 */
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const congress = sp.get("congress");
  const policyArea = sp.get("policyArea");
  const sponsorId = sp.get("sponsorId");
  const limit = Math.min(parseInt(sp.get("limit") ?? "50"), 200);
  const offset = parseInt(sp.get("offset") ?? "0");

  const where: Record<string, unknown> = {};
  if (congress) where.congress = parseInt(congress);
  if (policyArea) where.policyArea = policyArea;
  if (sponsorId) where.sponsorEntityId = sponsorId;

  const [bills, total] = await Promise.all([
    prisma.legislation.findMany({
      where: where as any,
      orderBy: { introducedDate: "desc" },
      take: limit,
      skip: offset,
      include: {
        sponsorEntity: {
          select: { id: true, canonicalName: true, party: true, state: true },
        },
        _count: { select: { votes: true } },
      },
    }),
    prisma.legislation.count({ where: where as any }),
  ]);

  // Get vote summary for each bill
  const billsWithVotes = await Promise.all(
    bills.map(async (bill) => {
      let voteSummary = null;

      if (bill._count.votes > 0) {
        const votes = await prisma.legislativeVote.groupBy({
          by: ["position"],
          where: { legislationId: bill.id },
          _count: { position: true },
        });

        voteSummary = {
          yea: votes.find((v) => v.position === "YEA")?._count.position ?? 0,
          nay: votes.find((v) => v.position === "NAY")?._count.position ?? 0,
          present: votes.find((v) => v.position === "PRESENT")?._count.position ?? 0,
          notVoting: votes.find((v) => v.position === "NOT_VOTING")?._count.position ?? 0,
        };
      }

      return {
        id: bill.id,
        billId: bill.billId,
        billType: bill.billType,
        billNumber: bill.billNumber,
        congress: bill.congress,
        title: bill.title,
        summary: bill.summary,
        introducedDate: bill.introducedDate.toISOString().split("T")[0],
        lastActionDate: bill.lastActionDate?.toISOString().split("T")[0] ?? null,
        status: bill.status,
        policyArea: bill.policyArea,
        subjects: bill.subjects,
        sponsor: bill.sponsorEntity
          ? {
              id: bill.sponsorEntity.id,
              name: bill.sponsorEntity.canonicalName,
              party: bill.sponsorEntity.party,
              state: bill.sponsorEntity.state,
            }
          : null,
        voteCount: bill._count.votes,
        voteSummary,
      };
    }),
  );

  // Get policy area breakdown for sidebar
  const policyAreas = await prisma.legislation.groupBy({
    by: ["policyArea"],
    where: { policyArea: { not: null } },
    _count: { policyArea: true },
    orderBy: { _count: { policyArea: "desc" } },
    take: 20,
  });

  return NextResponse.json({
    bills: billsWithVotes,
    meta: { total, limit, offset },
    policyAreas: policyAreas.map((p) => ({
      name: p.policyArea,
      count: p._count.policyArea,
    })),
  });
}
