"use client";

import Link from "next/link";
import { PARTY_COLORS } from "@/lib/constants";
import { formatCompactMoney } from "@/lib/utils";

interface Trader {
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

interface TopTicker {
  ticker: string;
  assetName: string;
  tradeCount: number;
  estimatedVolume: number;
  purchases: number;
  sales: number;
  uniqueTraders: number;
}

export function TraderLeaderboard({ traders }: { traders: Trader[] }) {
  return (
    <div>
      <h2 className="font-headline text-xl font-black text-ink">
        Top Traders by Volume
      </h2>
      <p className="mt-1 text-sm text-muted">
        Ranked by estimated trading volume (midpoint of disclosed ranges)
      </p>

      <div className="mt-6 space-y-2">
        {traders.slice(0, 10).map((trader, i) => {
          const maxVolume = traders[0]?.estimatedVolume ?? 1;
          const barWidth = Math.max(
            5,
            (trader.estimatedVolume / maxVolume) * 100,
          );

          return (
            <Link
              key={trader.entityId}
              href={`/entity/politician/${trader.entityId}`}
              className="group relative flex items-center gap-4 rounded-lg border border-border bg-surface px-4 py-3 transition-colors hover:border-ink/20"
            >
              {/* Rank */}
              <span className="w-6 shrink-0 font-mono text-sm font-bold text-muted/50">
                {i + 1}
              </span>

              {/* Party dot */}
              <div
                className="h-3 w-3 shrink-0 rounded-full"
                style={{
                  backgroundColor: trader.party
                    ? PARTY_COLORS[trader.party.toLowerCase()] ?? "#6b7280"
                    : "#6b7280",
                }}
              />

              {/* Name + state */}
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="truncate text-sm font-medium text-ink group-hover:text-accent">
                    {trader.name}
                  </span>
                  {trader.state && (
                    <span className="shrink-0 font-mono text-[10px] text-muted">
                      {trader.state}
                    </span>
                  )}
                </div>

                {/* Bar + stats */}
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border/50">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <span className="shrink-0 font-mono text-xs text-muted">
                    {trader.tradeCount} trades
                  </span>
                </div>
              </div>

              {/* Volume */}
              <div className="shrink-0 text-right">
                <div className="font-mono text-sm font-bold text-ink">
                  {formatCompactMoney(trader.estimatedVolume)}
                </div>
                <div className="font-mono text-[10px] text-muted">
                  {trader.purchases}B / {trader.sales}S
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function TickerLeaderboard({ tickers }: { tickers: TopTicker[] }) {
  return (
    <div>
      <h2 className="font-headline text-xl font-black text-ink">
        Most Traded Stocks
      </h2>
      <p className="mt-1 text-sm text-muted">
        Stocks most frequently traded by members of Congress
      </p>

      <div className="mt-6 space-y-2">
        {tickers.slice(0, 10).map((ticker, i) => {
          const maxCount = tickers[0]?.tradeCount ?? 1;
          const barWidth = Math.max(5, (ticker.tradeCount / maxCount) * 100);

          return (
            <div
              key={ticker.ticker}
              className="flex items-center gap-4 rounded-lg border border-border bg-surface px-4 py-3"
            >
              {/* Rank */}
              <span className="w-6 shrink-0 font-mono text-sm font-bold text-muted/50">
                {i + 1}
              </span>

              {/* Ticker */}
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-sm font-bold text-ink">
                    {ticker.ticker}
                  </span>
                  <span className="truncate text-xs text-muted">
                    {ticker.assetName}
                  </span>
                </div>

                <div className="mt-1.5 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border/50">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <span className="shrink-0 font-mono text-xs text-muted">
                    {ticker.uniqueTraders} members
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="shrink-0 text-right">
                <div className="font-mono text-sm font-bold text-ink">
                  {ticker.tradeCount}
                </div>
                <div className="font-mono text-[10px] text-muted">
                  {ticker.purchases}B / {ticker.sales}S
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
