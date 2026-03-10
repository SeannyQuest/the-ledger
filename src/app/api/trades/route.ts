import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/trades
 *
 * Query congressional stock trades with filters.
 * Params: ticker, entityId, chamber, txType, party, limit, offset
 */
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const ticker = sp.get("ticker");
  const entityId = sp.get("entityId");
  const chamber = sp.get("chamber");
  const txType = sp.get("txType");
  const party = sp.get("party");
  const limit = Math.min(parseInt(sp.get("limit") ?? "50"), 200);
  const offset = parseInt(sp.get("offset") ?? "0");

  const where: Record<string, unknown> = {};
  if (ticker) where.ticker = ticker.toUpperCase();
  if (entityId) where.entityId = entityId;
  if (chamber) where.chamber = chamber.toLowerCase();
  if (txType) where.txType = txType.toLowerCase();
  if (party) where.party = party.toUpperCase();

  const [trades, total] = await Promise.all([
    prisma.congressionalTrade.findMany({
      where: where as any,
      orderBy: { txDate: "desc" },
      take: limit,
      skip: offset,
      include: {
        entity: {
          select: {
            id: true,
            canonicalName: true,
            party: true,
            state: true,
            office: true,
            photoUrl: true,
          },
        },
      },
    }),
    prisma.congressionalTrade.count({ where: where as any }),
  ]);

  return NextResponse.json({
    trades: trades.map((t) => ({
      id: t.id,
      entityId: t.entityId,
      representative: t.representative,
      party: t.party,
      chamber: t.chamber,
      district: t.district,
      ticker: t.ticker,
      assetName: t.assetName,
      txType: t.txType,
      txDate: t.txDate.toISOString().split("T")[0],
      disclosureDate: t.disclosureDate.toISOString().split("T")[0],
      amount: t.amount,
      amountLow: t.amountLow,
      amountHigh: t.amountHigh,
      owner: t.owner,
      entity: {
        id: t.entity.id,
        name: t.entity.canonicalName,
        party: t.entity.party,
        state: t.entity.state,
        office: t.entity.office,
        photoUrl: t.entity.photoUrl,
      },
    })),
    meta: { total, limit, offset },
  });
}
