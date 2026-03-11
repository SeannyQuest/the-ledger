"use client";

import { useState, useEffect } from "react";
import { Loader2, Globe, Building2, ArrowRight } from "lucide-react";
import { formatCompactMoney, formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Link from "next/link";

/* ── Types ──────────────────────────────────────── */

interface Activity {
  activityType: string;
  amount: number | null;
  periodStart: string;
  periodEnd: string;
  description: string | null;
}

interface Registration {
  id: string;
  registrationNum: string;
  foreignPrincipal: string;
  country: string;
  registrantName: string;
  registrantEntityId: string | null;
  registrationDate: string;
  terminationDate: string | null;
  active: boolean;
  recentActivities: Activity[];
}

interface CountryBreakdown {
  country: string;
  registrationCount: number;
  totalSpending: number;
}

interface FaraData {
  registrations: Registration[];
  meta: { total: number };
  countryBreakdown: CountryBreakdown[];
  stats: {
    totalRegistrations: number;
    activeRegistrations: number;
    uniqueCountries: number;
  };
}

/* ── Page ───────────────────────────────────────── */

export default function ForeignInfluencePage() {
  const [data, setData] = useState<FaraData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countryFilter, setCountryFilter] = useState<string>("");
  const [activeOnly, setActiveOnly] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ limit: "100" });
    if (countryFilter) params.set("country", countryFilter);
    if (activeOnly) params.set("active", "true");

    fetch(`/api/foreign-influence?${params}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError("Failed to load FARA data"))
      .finally(() => setLoading(false));
  }, [countryFilter, activeOnly]);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
      {/* Header */}
      <div>
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Foreign Agents Registration Act
        </div>
        <h1 className="mt-4 font-headline text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Foreign Influence
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Foreign governments and entities hire US firms to lobby Congress and
          shape public opinion. Track every registered foreign agent.
        </p>
      </div>

      {/* Stats */}
      {data && !loading && (
        <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-border py-4">
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Total Registrations
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {formatNumber(data.stats.totalRegistrations)}
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Active
            </div>
            <div className="font-mono text-2xl font-bold text-money-in">
              {formatNumber(data.stats.activeRegistrations)}
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Countries
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {formatNumber(data.stats.uniqueCountries)}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mt-10 grid gap-10 lg:grid-cols-[300px_1fr]">
        {/* Sidebar — Country leaderboard */}
        <div>
          <h2 className="font-headline text-lg font-black text-ink">
            By Country
          </h2>
          <p className="mt-1 text-sm text-muted">
            Ranked by total lobbying spend
          </p>

          <div className="mt-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={activeOnly}
                onChange={(e) => setActiveOnly(e.target.checked)}
                className="rounded border-border"
              />
              <span className="font-mono text-xs text-muted">Active only</span>
            </label>
          </div>

          {data && (
            <div className="mt-4 space-y-1.5">
              <button
                onClick={() => setCountryFilter("")}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition-colors",
                  !countryFilter
                    ? "bg-ink text-white"
                    : "text-muted hover:bg-surface hover:text-ink",
                )}
              >
                <span className="font-mono text-xs">All countries</span>
                <span className="font-mono text-[10px]">
                  {data.stats.totalRegistrations}
                </span>
              </button>
              {data.countryBreakdown.map((c) => {
                const maxSpend = data.countryBreakdown[0]?.totalSpending || 1;
                const barWidth = Math.max(
                  5,
                  (c.totalSpending / maxSpend) * 100,
                );

                return (
                  <button
                    key={c.country}
                    onClick={() =>
                      setCountryFilter(
                        countryFilter === c.country ? "" : c.country,
                      )
                    }
                    className={cn(
                      "group flex w-full flex-col rounded-md px-3 py-2 text-left transition-colors",
                      countryFilter === c.country
                        ? "bg-ink text-white"
                        : "hover:bg-surface",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "text-xs font-medium",
                          countryFilter === c.country
                            ? "text-white"
                            : "text-ink",
                        )}
                      >
                        {c.country}
                      </span>
                      <span
                        className={cn(
                          "font-mono text-[10px]",
                          countryFilter === c.country
                            ? "text-white/70"
                            : "text-muted",
                        )}
                      >
                        {c.registrationCount} regs
                      </span>
                    </div>
                    {c.totalSpending > 0 && (
                      <div className="mt-1 flex items-center gap-2">
                        <div className="h-1 flex-1 overflow-hidden rounded-full bg-border/30">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              countryFilter === c.country
                                ? "bg-white/50"
                                : "bg-accent",
                            )}
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                        <span
                          className={cn(
                            "shrink-0 font-mono text-[10px]",
                            countryFilter === c.country
                              ? "text-white/70"
                              : "text-muted",
                          )}
                        >
                          {formatCompactMoney(c.totalSpending)}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Main content — Registration list */}
        <div>
          {loading && (
            <div className="flex h-96 items-center justify-center">
              <div className="flex items-center gap-3 text-muted">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="font-mono text-sm">
                  Loading foreign influence data...
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {!loading && data && (
            <div className="space-y-3">
              {data.registrations.map((reg) => (
                <div
                  key={reg.id}
                  className="rounded-lg border border-border bg-surface p-4 transition-colors hover:border-ink/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Globe className="h-3.5 w-3.5 text-muted/50" />
                        <span className="font-mono text-[10px] font-bold text-accent">
                          {reg.country}
                        </span>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 font-mono text-[10px] font-bold",
                            reg.active
                              ? "bg-money-in/10 text-money-in"
                              : "bg-border/30 text-muted",
                          )}
                        >
                          {reg.active ? "Active" : "Terminated"}
                        </span>
                      </div>

                      <h3 className="mt-1.5 text-sm font-medium text-ink">
                        {reg.foreignPrincipal}
                      </h3>

                      <div className="mt-1 flex items-center gap-2">
                        <Building2 className="h-3 w-3 text-muted/40" />
                        <span className="text-xs text-muted">
                          Represented by{" "}
                          {reg.registrantEntityId ? (
                            <Link
                              href={`/entity/lobbying_firm/${reg.registrantEntityId}`}
                              className="text-ink underline decoration-border underline-offset-2 hover:decoration-ink"
                            >
                              {reg.registrantName}
                            </Link>
                          ) : (
                            reg.registrantName
                          )}
                        </span>
                      </div>

                      <div className="mt-1 font-mono text-[10px] text-muted/60">
                        Registered {reg.registrationDate}
                        {reg.terminationDate &&
                          ` · Terminated ${reg.terminationDate}`}
                      </div>
                    </div>

                    {/* Spending from activities */}
                    {reg.recentActivities.length > 0 && (
                      <div className="shrink-0 text-right">
                        <div className="font-mono text-sm font-bold text-ink">
                          {formatCompactMoney(
                            reg.recentActivities.reduce(
                              (sum, a) => sum + (a.amount ?? 0),
                              0,
                            ),
                          )}
                        </div>
                        <div className="font-mono text-[10px] text-muted">
                          reported spend
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Recent activities */}
                  {reg.recentActivities.length > 0 && (
                    <div className="mt-3 border-t border-border/50 pt-3">
                      <div className="flex flex-wrap gap-2">
                        {reg.recentActivities.map((act, i) => (
                          <span
                            key={i}
                            className="rounded bg-border/20 px-2 py-0.5 font-mono text-[10px] text-muted"
                          >
                            {act.activityType.replace(/_/g, " ")}
                            {act.amount
                              ? ` · ${formatCompactMoney(act.amount)}`
                              : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {data.registrations.length === 0 && (
                <div className="flex h-64 items-center justify-center">
                  <p className="font-mono text-sm text-muted">
                    No registrations found for this filter.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Methodology */}
      <div className="mt-12 rounded-lg border border-border bg-surface/50 px-4 py-3">
        <p className="font-mono text-xs text-muted">
          Data sourced from the Foreign Agents Registration Act (FARA) filings
          with the Department of Justice. FARA requires persons acting as agents
          of foreign principals to disclose their relationship and activities.
        </p>
      </div>
    </div>
  );
}
