"use client";

import { useState, useEffect } from "react";
import { Loader2, TrendingUp, TrendingDown, ArrowUpDown } from "lucide-react";
import { TradeTable, type Trade } from "@/components/trades/TradeTable";
import {
  TraderLeaderboard,
  TickerLeaderboard,
} from "@/components/trades/TraderLeaderboard";
import { formatCompactMoney, formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

/* ── Types ──────────────────────────────────────── */

interface LeaderboardData {
  topTraders: Array<{
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
  }>;
  topTickers: Array<{
    ticker: string;
    assetName: string;
    tradeCount: number;
    estimatedVolume: number;
    purchases: number;
    sales: number;
    uniqueTraders: number;
  }>;
  recentTrades: Trade[];
  stats: {
    totalTrades: number;
    totalEstimatedVolume: number;
    uniqueTraders: number;
    uniqueTickers: number;
    purchaseCount: number;
    saleCount: number;
  };
}

type ViewMode = "leaderboard" | "all-trades";

/* ── Page ───────────────────────────────────────── */

export default function TradesPage() {
  const [view, setView] = useState<ViewMode>("leaderboard");
  const [leaderboard, setLeaderboard] = useState<LeaderboardData | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [tradesLoading, setTradesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters for all-trades view
  const [txTypeFilter, setTxTypeFilter] = useState<string>("");
  const [partyFilter, setPartyFilter] = useState<string>("");

  // Fetch leaderboard on mount
  useEffect(() => {
    fetch("/api/trades/leaderboard")
      .then((r) => r.json())
      .then(setLeaderboard)
      .catch(() => setError("Failed to load leaderboard"))
      .finally(() => setLoading(false));
  }, []);

  // Fetch all trades when switching to trades view
  useEffect(() => {
    if (view !== "all-trades") return;
    if (trades.length > 0 && !tradesLoading) return;

    setTradesLoading(true);
    const params = new URLSearchParams({ limit: "200" });
    if (txTypeFilter) params.set("txType", txTypeFilter);
    if (partyFilter) params.set("party", partyFilter);

    fetch(`/api/trades?${params}`)
      .then((r) => r.json())
      .then((data) => setTrades(data.trades))
      .catch(() => setError("Failed to load trades"))
      .finally(() => setTradesLoading(false));
  }, [view, txTypeFilter, partyFilter]);

  const stats = leaderboard?.stats;

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Congressional Trading
          </div>
          <h1 className="mt-4 font-headline text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Stock Trades
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Members of Congress buy and sell stocks while writing laws that
            affect those same companies. Track every disclosed trade.
          </p>
        </div>

        {/* View toggle */}
        <div className="flex shrink-0 items-center rounded-lg border border-border bg-surface p-1">
          <button
            onClick={() => setView("leaderboard")}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-colors",
              view === "leaderboard"
                ? "bg-ink text-white"
                : "text-muted hover:text-ink",
            )}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            Leaderboard
          </button>
          <button
            onClick={() => setView("all-trades")}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-colors",
              view === "all-trades"
                ? "bg-ink text-white"
                : "text-muted hover:text-ink",
            )}
          >
            <ArrowUpDown className="h-3.5 w-3.5" />
            All Trades
          </button>
        </div>
      </div>

      {/* Stats bar */}
      {stats && !loading && (
        <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-border py-4">
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Total Trades
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {formatNumber(stats.totalTrades)}
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Est. Volume
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {formatCompactMoney(stats.totalEstimatedVolume)}
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Traders
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {formatNumber(stats.uniqueTraders)}
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Tickers
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {formatNumber(stats.uniqueTickers)}
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-money-in" />
              <span className="font-mono text-sm font-bold text-money-in">
                {formatNumber(stats.purchaseCount)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingDown className="h-3.5 w-3.5 text-money-out" />
              <span className="font-mono text-sm font-bold text-money-out">
                {formatNumber(stats.saleCount)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mt-10">
        {loading && (
          <div className="flex h-96 items-center justify-center">
            <div className="flex items-center gap-3 text-muted">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="font-mono text-sm">Loading trades...</span>
            </div>
          </div>
        )}

        {/* ── Leaderboard View ──────────────────── */}
        {!loading && view === "leaderboard" && leaderboard && (
          <div className="space-y-16">
            <div className="grid gap-16 lg:grid-cols-2">
              <TraderLeaderboard traders={leaderboard.topTraders} />
              <TickerLeaderboard tickers={leaderboard.topTickers} />
            </div>

            {/* Recent notable trades */}
            {leaderboard.recentTrades.length > 0 && (
              <div>
                <div className="border-t-4 border-ink pt-8">
                  <h2 className="font-headline text-2xl font-black text-ink">
                    Recent Trades
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    The latest stock transactions disclosed by members of
                    Congress
                  </p>
                </div>
                <div className="mt-6">
                  <TradeTable trades={leaderboard.recentTrades} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── All Trades View ───────────────────── */}
        {!loading && view === "all-trades" && (
          <>
            {/* Filters */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <label className="font-mono text-xs text-muted">Type</label>
              <select
                value={txTypeFilter}
                onChange={(e) => {
                  setTxTypeFilter(e.target.value);
                  setTrades([]);
                }}
                className="rounded border border-border bg-surface px-2 py-1 font-mono text-xs text-ink"
              >
                <option value="">All</option>
                <option value="purchase">Purchases</option>
                <option value="sale">Sales</option>
              </select>

              <label className="ml-4 font-mono text-xs text-muted">Party</label>
              <select
                value={partyFilter}
                onChange={(e) => {
                  setPartyFilter(e.target.value);
                  setTrades([]);
                }}
                className="rounded border border-border bg-surface px-2 py-1 font-mono text-xs text-ink"
              >
                <option value="">All</option>
                <option value="DEMOCRAT">Democrat</option>
                <option value="REPUBLICAN">Republican</option>
                <option value="INDEPENDENT">Independent</option>
              </select>
            </div>

            {tradesLoading && (
              <div className="flex h-64 items-center justify-center">
                <div className="flex items-center gap-3 text-muted">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="font-mono text-sm">Loading trades...</span>
                </div>
              </div>
            )}

            {!tradesLoading && <TradeTable trades={trades} />}
          </>
        )}

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>

      {/* Methodology note */}
      <div className="mt-12 rounded-lg border border-border bg-surface/50 px-4 py-3">
        <p className="font-mono text-xs text-muted">
          Data sourced from House Financial Disclosures (STOCK Act). Dollar
          amounts are reported in ranges, not exact figures. Estimated volume
          uses the midpoint of each range. Disclosure is required within 45 days
          of the transaction.
        </p>
      </div>
    </div>
  );
}
