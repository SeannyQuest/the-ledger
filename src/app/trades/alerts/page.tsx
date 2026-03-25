"use client";

import { useState, useEffect } from "react";
import { Loader2, AlertTriangle, Clock, DollarSign, Users } from "lucide-react";
import Link from "next/link";
import { formatCompactMoney, formatNumber, cn } from "@/lib/utils";
import { PARTY_COLORS } from "@/lib/constants";

/* -- Types ------------------------------------------------ */

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

interface AlertsData {
  flaggedTrades: FlaggedTrade[];
  stats: {
    totalFlagged: number;
    avgDelay: number;
    largestTrade: number;
    lateDisclosureCount: number;
    largeAmountCount: number;
    suspiciousTimingCount: number;
    totalTrades: number;
  };
}

/* -- Flag config ------------------------------------------ */

const FLAG_CONFIG: Record<
  FlagReason,
  { label: string; color: string; bgColor: string; description: string }
> = {
  LATE_DISCLOSURE: {
    label: "Late Disclosure",
    color: "text-red-600",
    bgColor: "bg-red-100",
    description: "Filed more than 45 days after the trade",
  },
  LARGE_AMOUNT: {
    label: "Large Amount",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    description: "Trade value at or above $500,000",
  },
  SUSPICIOUS_TIMING: {
    label: "Clustered Trading",
    color: "text-yellow-700",
    bgColor: "bg-yellow-100",
    description:
      "Multiple representatives traded the same ticker within 7 days",
  },
};

/* -- Page ------------------------------------------------- */

export default function TradeAlertsPage() {
  const [data, setData] = useState<AlertsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [flagFilter, setFlagFilter] = useState<FlagReason | "">("");

  useEffect(() => {
    fetch("/api/trades/alerts")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError("Failed to load alerts data"))
      .finally(() => setLoading(false));
  }, []);

  const filteredTrades = data
    ? flagFilter
      ? data.flaggedTrades.filter((t) =>
          t.flags.includes(flagFilter as FlagReason),
        )
      : data.flaggedTrades
    : [];

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
      {/* Header */}
      <div>
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Congressional Trading
        </div>
        <h1 className="mt-4 font-headline text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Suspicious Trades
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Trades flagged for late disclosure, unusually large amounts, or
          suspicious timing patterns. These are not accusations of wrongdoing;
          they are data points that warrant scrutiny.
        </p>
        <div className="mt-3">
          <Link
            href="/trades"
            className="font-mono text-xs text-accent hover:underline"
          >
            &larr; Back to All Trades
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      {data && !loading && (
        <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-border py-4">
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Flagged Trades
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {formatNumber(data.stats.totalFlagged)}
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Avg Disclosure Delay
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {data.stats.avgDelay} days
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Largest Trade
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {formatCompactMoney(data.stats.largestTrade)}
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-red-500" />
              <span className="font-mono text-sm font-bold text-red-600">
                {formatNumber(data.stats.lateDisclosureCount)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5 text-orange-500" />
              <span className="font-mono text-sm font-bold text-orange-600">
                {formatNumber(data.stats.largeAmountCount)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-yellow-600" />
              <span className="font-mono text-sm font-bold text-yellow-700">
                {formatNumber(data.stats.suspiciousTimingCount)}
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
              <span className="font-mono text-sm">Scanning trades...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {!loading && data && (
          <>
            {/* Filter bar */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <label className="font-mono text-xs text-muted">
                Filter by flag
              </label>
              <select
                value={flagFilter}
                onChange={(e) =>
                  setFlagFilter(e.target.value as FlagReason | "")
                }
                className="rounded border border-border bg-surface px-2 py-1 font-mono text-xs text-ink"
              >
                <option value="">All Flags</option>
                <option value="LATE_DISCLOSURE">Late Disclosure</option>
                <option value="LARGE_AMOUNT">Large Amount</option>
                <option value="SUSPICIOUS_TIMING">Clustered Trading</option>
              </select>
              <span className="font-mono text-xs text-muted">
                {formatNumber(filteredTrades.length)} trades
              </span>
            </div>

            {/* Table */}
            {filteredTrades.length === 0 ? (
              <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border bg-surface/50">
                <div className="text-center">
                  <AlertTriangle className="mx-auto h-8 w-8 text-muted/30" />
                  <p className="mt-3 font-mono text-sm text-muted">
                    No flagged trades found.
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-ink bg-surface">
                      <th className="px-4 py-3 text-left font-mono text-xs font-bold uppercase tracking-wider text-muted">
                        Representative
                      </th>
                      <th className="px-4 py-3 text-left font-mono text-xs font-bold uppercase tracking-wider text-muted">
                        Ticker
                      </th>
                      <th className="px-4 py-3 text-left font-mono text-xs font-bold uppercase tracking-wider text-muted">
                        Amount
                      </th>
                      <th className="hidden px-4 py-3 text-left font-mono text-xs font-bold uppercase tracking-wider text-muted sm:table-cell">
                        Trade Date
                      </th>
                      <th className="hidden px-4 py-3 text-left font-mono text-xs font-bold uppercase tracking-wider text-muted md:table-cell">
                        Disclosure
                      </th>
                      <th className="hidden px-4 py-3 text-right font-mono text-xs font-bold uppercase tracking-wider text-muted md:table-cell">
                        Delay
                      </th>
                      <th className="px-4 py-3 text-left font-mono text-xs font-bold uppercase tracking-wider text-muted">
                        Flags
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredTrades.map((trade) => (
                      <tr
                        key={trade.id}
                        className="transition-colors hover:bg-surface/80"
                      >
                        <td className="px-4 py-3">
                          <Link
                            href={`/entity/politician/${trade.entityId}`}
                            className="group flex items-center gap-2"
                          >
                            <div
                              className="h-2 w-2 shrink-0 rounded-full"
                              style={{
                                backgroundColor: trade.party
                                  ? (PARTY_COLORS[trade.party.toLowerCase()] ??
                                    "#6b7280")
                                  : "#6b7280",
                              }}
                            />
                            <span className="text-ink group-hover:text-accent">
                              {trade.representative}
                            </span>
                            {trade.entity.state && (
                              <span className="font-mono text-[10px] text-muted">
                                {trade.entity.state}
                              </span>
                            )}
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-mono text-sm font-bold text-ink">
                            {trade.ticker}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-sm text-ink">
                          {trade.amount}
                        </td>
                        <td className="hidden px-4 py-3 font-mono text-xs text-muted sm:table-cell">
                          {trade.txDate}
                        </td>
                        <td className="hidden px-4 py-3 font-mono text-xs text-muted md:table-cell">
                          {trade.disclosureDate}
                        </td>
                        <td className="hidden px-4 py-3 text-right md:table-cell">
                          <span
                            className={cn(
                              "font-mono text-sm font-bold",
                              trade.delayDays > 45
                                ? "text-red-600"
                                : "text-muted",
                            )}
                          >
                            {trade.delayDays}d
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {trade.flags.map((flag) => {
                              const config = FLAG_CONFIG[flag];
                              return (
                                <span
                                  key={flag}
                                  className={cn(
                                    "inline-flex rounded-full px-2 py-0.5 font-mono text-[10px] font-bold",
                                    config.bgColor,
                                    config.color,
                                  )}
                                  title={config.description}
                                >
                                  {config.label}
                                </span>
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* How We Flag Trades explainer */}
            <div className="mt-12 space-y-4">
              <div className="border-t-4 border-ink pt-8">
                <h2 className="font-headline text-2xl font-black text-ink">
                  How We Flag Trades
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Our system applies three independent tests to every
                  congressional stock trade. A trade can trigger multiple flags.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-red-200 bg-red-50/50 p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-red-600" />
                    <h3 className="font-mono text-xs font-bold uppercase text-red-600">
                      Late Disclosure
                    </h3>
                  </div>
                  <p className="mt-2 text-xs text-muted">
                    Under the STOCK Act, members must disclose trades within 45
                    days. Trades flagged here exceeded that window. Late
                    disclosure can obscure the connection between a trade and
                    relevant legislative activity.
                  </p>
                </div>

                <div className="rounded-lg border border-orange-200 bg-orange-50/50 p-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-orange-600" />
                    <h3 className="font-mono text-xs font-bold uppercase text-orange-600">
                      Large Amount
                    </h3>
                  </div>
                  <p className="mt-2 text-xs text-muted">
                    Trades with a reported upper bound of $500,000 or more.
                    Larger trades carry higher financial stakes and greater
                    potential for conflicts of interest with legislative duties.
                  </p>
                </div>

                <div className="rounded-lg border border-yellow-200 bg-yellow-50/50 p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-yellow-700" />
                    <h3 className="font-mono text-xs font-bold uppercase text-yellow-700">
                      Clustered Trading
                    </h3>
                  </div>
                  <p className="mt-2 text-xs text-muted">
                    Flagged when 3 or more representatives traded the same
                    ticker within a 7-day window. Coordinated timing across
                    members may indicate shared non-public information.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Methodology note */}
      <div className="mt-12 rounded-lg border border-border bg-surface/50 px-4 py-3">
        <p className="font-mono text-xs text-muted">
          Flags are generated algorithmically and do not constitute evidence of
          insider trading or other wrongdoing. Data sourced from House and
          Senate Financial Disclosures (STOCK Act). Dollar amounts are reported
          in ranges, not exact figures.
        </p>
      </div>
    </div>
  );
}
