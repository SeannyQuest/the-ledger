import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/trades/alerts
 *
 * Identifies suspicious congressional trades based on:
 * - Late disclosure (disclosureDate - txDate > 45 days)
 * - Large amount (amountHigh >= $500,000)
 * - Pre-earnings timing (trades within 7 days before large single-day price moves)
 *
 * Returns flagged trades sorted by severity (most flags first, then delay days).
 */

type FlagReason = "LATE_DISCLOSURE" | "LARGE_AMOUNT" | "SUSPICIOUS_TIMING";

interface FlaggedTrade {
  id: string;
  entityId: string;
  representative: string;
  party: string | null;
  ticker: string;
  assetName: string;
  txType: string;
  txDate: string;
  disclosureDate: string;
  amount: string;
  amountLow: number;
  amountHigh: number;
  delayDays: number;
  flags: FlagReason[];
  entity: {
    id: string;
    name: string;
    party: string | null;
    state: string | null;
    office: string | null;
    photoUrl: string | null;
  };
}

export async function GET() {
  // Cap to 2 most recent years — alerts are by definition about recent activity
  const cutoff = new Date(new Date().getFullYear() - 2, 0, 1);

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

  // Group trades by ticker + date for timing analysis.
  // Build a map of ticker -> sorted dates so we can detect clusters of
  // activity that precede large moves. Since we don't have real price data,
  // we approximate "suspicious timing" by flagging trades where a large number
  // of different representatives traded the same ticker within a 7-day window.
  const tickerDateMap = new Map<string, Date[]>();
  for (const t of trades) {
    const dates = tickerDateMap.get(t.ticker) ?? [];
    dates.push(t.txDate);
    tickerDateMap.set(t.ticker, dates);
  }

  // For each ticker, find 7-day windows with 3+ unique traders -> "suspicious timing"
  const tickerTraderMap = new Map<string, Map<string, Date[]>>();
  for (const t of trades) {
    if (!tickerTraderMap.has(t.ticker)) {
      tickerTraderMap.set(t.ticker, new Map());
    }
    const traderMap = tickerTraderMap.get(t.ticker)!;
    const dates = traderMap.get(t.entityId) ?? [];
    dates.push(t.txDate);
    traderMap.set(t.entityId, dates);
  }

  // Build set of suspicious (ticker, date) pairs:
  // A trade is suspicious if 3+ different representatives traded the same
  // ticker within a 7-day window around the trade date.
  const suspiciousTradeKeys = new Set<string>();

  for (const [ticker, traderMap] of tickerTraderMap) {
    // Collect all (entityId, date) pairs
    const allEntries: { entityId: string; date: Date }[] = [];
    for (const [entityId, dates] of traderMap) {
      for (const d of dates) {
        allEntries.push({ entityId, date: d });
      }
    }

    // For each trade, check if 3+ unique traders traded within 7 days
    for (const entry of allEntries) {
      const windowStart = entry.date.getTime() - 7 * 24 * 60 * 60 * 1000;
      const windowEnd = entry.date.getTime() + 7 * 24 * 60 * 60 * 1000;
      const uniqueTraders = new Set(
        allEntries
          .filter(
            (e) =>
              e.date.getTime() >= windowStart && e.date.getTime() <= windowEnd,
          )
          .map((e) => e.entityId),
      );
      if (uniqueTraders.size >= 3) {
        suspiciousTradeKeys.add(
          `${ticker}:${entry.date.toISOString().split("T")[0]}:${entry.entityId}`,
        );
      }
    }
  }

  // Flag trades
  const flaggedTrades: FlaggedTrade[] = [];

  for (const t of trades) {
    const flags: FlagReason[] = [];

    // Calculate disclosure delay
    const txTime = t.txDate.getTime();
    const disclosureTime = t.disclosureDate.getTime();
    const delayDays = Math.round(
      (disclosureTime - txTime) / (1000 * 60 * 60 * 24),
    );

    // Flag 1: Late disclosure (> 45 days)
    if (delayDays > 45) {
      flags.push("LATE_DISCLOSURE");
    }

    // Flag 2: Large amount
    if (t.amountHigh >= 500_000) {
      flags.push("LARGE_AMOUNT");
    }

    // Flag 3: Suspicious timing (clustered trading)
    const tradeKey = `${t.ticker}:${t.txDate.toISOString().split("T")[0]}:${t.entityId}`;
    if (suspiciousTradeKeys.has(tradeKey)) {
      flags.push("SUSPICIOUS_TIMING");
    }

    if (flags.length === 0) continue;

    flaggedTrades.push({
      id: t.id,
      entityId: t.entityId,
      representative: t.representative,
      party: t.party,
      ticker: t.ticker,
      assetName: t.assetName,
      txType: t.txType,
      txDate: t.txDate.toISOString().split("T")[0],
      disclosureDate: t.disclosureDate.toISOString().split("T")[0],
      amount: t.amount,
      amountLow: t.amountLow,
      amountHigh: t.amountHigh,
      delayDays,
      flags,
      entity: {
        id: t.entity.id,
        name: t.entity.canonicalName,
        party: t.entity.party,
        state: t.entity.state,
        office: t.entity.office,
        photoUrl: t.entity.photoUrl,
      },
    });
  }

  // Sort by severity: most flags first, then by delay days desc
  flaggedTrades.sort((a, b) => {
    if (b.flags.length !== a.flags.length)
      return b.flags.length - a.flags.length;
    return b.delayDays - a.delayDays;
  });

  // Summary stats
  const totalFlagged = flaggedTrades.length;
  const avgDelay =
    totalFlagged > 0
      ? Math.round(
          flaggedTrades.reduce((sum, t) => sum + t.delayDays, 0) / totalFlagged,
        )
      : 0;
  const largestTrade =
    totalFlagged > 0 ? Math.max(...flaggedTrades.map((t) => t.amountHigh)) : 0;

  const lateDisclosureCount = flaggedTrades.filter((t) =>
    t.flags.includes("LATE_DISCLOSURE"),
  ).length;
  const largeAmountCount = flaggedTrades.filter((t) =>
    t.flags.includes("LARGE_AMOUNT"),
  ).length;
  const suspiciousTimingCount = flaggedTrades.filter((t) =>
    t.flags.includes("SUSPICIOUS_TIMING"),
  ).length;

  return NextResponse.json({
    flaggedTrades: flaggedTrades.slice(0, 200),
    stats: {
      totalFlagged,
      avgDelay,
      largestTrade,
      lateDisclosureCount,
      largeAmountCount,
      suspiciousTimingCount,
      totalTrades: trades.length,
    },
  });
}
