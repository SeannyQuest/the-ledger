import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/trades/leaderboard
 *
 * Returns congressional stock trading leaderboard data:
 * - Top traders by estimated volume
 * - Most traded tickers
 * - Recent notable trades
 * - Summary stats
 */
export async function GET() {
  // Cap to 3 most recent years to avoid unbounded table scans at scale
  const cutoff = new Date(new Date().getFullYear() - 3, 0, 1);

  const trades = await prisma.congressionalTrade.findMany({
    where: { txDate: { gte: cutoff } },
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
    orderBy: { txDate: "desc" },
  });

  if (trades.length === 0) {
    return NextResponse.json({
      topTraders: [],
      topTickers: [],
      recentTrades: [],
      stats: {
        totalTrades: 0,
        totalEstimatedVolume: 0,
        uniqueTraders: 0,
        uniqueTickers: 0,
        purchaseCount: 0,
        saleCount: 0,
      },
    });
  }

  // ── Top Traders by estimated volume ──
  const traderMap = new Map<
    string,
    {
      entityId: string;
      name: string;
      party: string | null;
      state: string | null;
      office: string | null;
      photoUrl: string | null;
      tradeCount: number;
      estimatedVolume: number;
      purchases: number;
      sales: number;
    }
  >();

  for (const t of trades) {
    const existing = traderMap.get(t.entityId) ?? {
      entityId: t.entityId,
      name: t.entity.canonicalName,
      party: t.entity.party,
      state: t.entity.state,
      office: t.entity.office,
      photoUrl: t.entity.photoUrl,
      tradeCount: 0,
      estimatedVolume: 0,
      purchases: 0,
      sales: 0,
    };
    existing.tradeCount++;
    // Use midpoint of range as estimate
    existing.estimatedVolume += Math.round((t.amountLow + t.amountHigh) / 2);
    if (t.txType === "purchase") existing.purchases++;
    else if (t.txType === "sale") existing.sales++;
    traderMap.set(t.entityId, existing);
  }

  const topTraders = [...traderMap.values()]
    .sort((a, b) => b.estimatedVolume - a.estimatedVolume)
    .slice(0, 20);

  // ── Top Tickers ──
  const tickerMap = new Map<
    string,
    {
      ticker: string;
      assetName: string;
      tradeCount: number;
      estimatedVolume: number;
      purchases: number;
      sales: number;
      uniqueTraders: Set<string>;
    }
  >();

  for (const t of trades) {
    const existing = tickerMap.get(t.ticker) ?? {
      ticker: t.ticker,
      assetName: t.assetName,
      tradeCount: 0,
      estimatedVolume: 0,
      purchases: 0,
      sales: 0,
      uniqueTraders: new Set<string>(),
    };
    existing.tradeCount++;
    existing.estimatedVolume += Math.round((t.amountLow + t.amountHigh) / 2);
    if (t.txType === "purchase") existing.purchases++;
    else if (t.txType === "sale") existing.sales++;
    existing.uniqueTraders.add(t.entityId);
    tickerMap.set(t.ticker, existing);
  }

  const topTickers = [...tickerMap.values()]
    .sort((a, b) => b.tradeCount - a.tradeCount)
    .slice(0, 20)
    .map(({ uniqueTraders, ...rest }) => ({
      ...rest,
      uniqueTraders: uniqueTraders.size,
    }));

  // ── Recent trades (large ones) ──
  const recentTrades = trades
    .sort((a, b) => b.txDate.getTime() - a.txDate.getTime())
    .slice(0, 10)
    .map((t) => ({
      id: t.id,
      entityId: t.entityId,
      representative: t.representative,
      party: t.party,
      ticker: t.ticker,
      assetName: t.assetName,
      txType: t.txType,
      txDate: t.txDate.toISOString().split("T")[0],
      amount: t.amount,
      amountHigh: t.amountHigh,
      entity: {
        id: t.entity.id,
        name: t.entity.canonicalName,
        party: t.entity.party,
        state: t.entity.state,
      },
    }));

  // ── Summary stats ──
  const uniqueTraders = new Set(trades.map((t) => t.entityId)).size;
  const uniqueTickers = new Set(trades.map((t) => t.ticker)).size;
  const totalEstimatedVolume = trades.reduce(
    (sum, t) => sum + Math.round((t.amountLow + t.amountHigh) / 2),
    0,
  );

  return NextResponse.json({
    topTraders,
    topTickers,
    recentTrades,
    stats: {
      totalTrades: trades.length,
      totalEstimatedVolume,
      uniqueTraders,
      uniqueTickers,
      purchaseCount: trades.filter((t) => t.txType === "purchase").length,
      saleCount: trades.filter((t) => t.txType === "sale").length,
    },
  });
}
