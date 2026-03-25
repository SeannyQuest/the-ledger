"use client";

import { useState, useEffect } from "react";
import { Loader2, Eye, EyeOff, DollarSign } from "lucide-react";
import { formatCompactMoney, formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

/* ── Types ──────────────────────────────────────── */

interface TopOrg {
  ein: string;
  name: string;
  latestRevenue: number;
  latestExpenses: number;
  latestPolitical: number;
  latestAssets: number;
  filingYears: number[];
}

interface YearBreakdown {
  year: number;
  count: number;
  totalRevenue: number;
  totalExpenses: number;
  politicalExpenses: number;
}

interface Filing {
  id: string;
  ein: string;
  organizationName: string;
  taxPeriod: string;
  totalRevenue: number;
  totalExpenses: number;
  totalAssets: number;
  politicalExpenses: number;
  grantRecipients: Array<{
    name: string;
    amount: number;
    purpose: string;
  }> | null;
  formType: string;
  filingYear: number;
  pdfUrl: string | null;
}

interface DarkMoneyData {
  filings: Filing[];
  meta: { total: number };
  topOrgs: TopOrg[];
  yearBreakdown: YearBreakdown[];
  stats: {
    totalFilings: number;
    uniqueOrganizations: number;
    totalPoliticalSpend: number;
  };
}

/* ── Page ───────────────────────────────────────── */

export default function DarkMoneyPage() {
  const [data, setData] = useState<DarkMoneyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/dark-money?limit=100")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError("Failed to load dark money data"))
      .finally(() => setLoading(false));
  }, []);

  const selectedOrgFilings = data?.filings.filter((f) => f.ein === selectedOrg);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
      {/* Header */}
      <div>
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          501(c)(4) Political Spending
        </div>
        <h1 className="mt-4 font-headline text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Dark Money
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          501(c)(4) &ldquo;social welfare&rdquo; organizations spend hundreds of
          millions on politics without disclosing their donors. Track their IRS
          990 filings.
        </p>
      </div>

      {/* Stats */}
      {data && !loading && (
        <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-border py-4">
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Organizations
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {formatNumber(data.stats.uniqueOrganizations)}
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Total Filings
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {formatNumber(data.stats.totalFilings)}
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Political Spending
            </div>
            <div className="font-mono text-2xl font-bold text-accent">
              {formatCompactMoney(data.stats.totalPoliticalSpend)}
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
              <span className="font-mono text-sm">
                Loading dark money data...
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
          <>
            {/* Year trend */}
            {data.yearBreakdown.length > 0 && (
              <div className="mb-10">
                <h2 className="font-headline text-xl font-black text-ink">
                  Political Spending by Year
                </h2>
                <div className="mt-4 flex items-end gap-4">
                  {data.yearBreakdown
                    .sort((a, b) => a.year - b.year)
                    .map((y) => {
                      const maxSpend = Math.max(
                        ...data.yearBreakdown.map((y) => y.politicalExpenses),
                      );
                      const height = Math.max(
                        20,
                        (y.politicalExpenses / maxSpend) * 200,
                      );
                      return (
                        <div
                          key={y.year}
                          className="flex flex-col items-center gap-2"
                        >
                          <span className="font-mono text-[10px] text-muted">
                            {formatCompactMoney(y.politicalExpenses)}
                          </span>
                          <div
                            className="w-16 rounded-t-md bg-accent transition-all"
                            style={{ height: `${height}px` }}
                          />
                          <span className="font-mono text-xs text-muted">
                            {y.year}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Top organizations */}
            <div>
              <h2 className="font-headline text-xl font-black text-ink">
                Top Anonymous Spenders
              </h2>
              <p className="mt-1 text-sm text-muted">
                Ranked by political expenditures reported on IRS 990 filings
              </p>

              <div className="mt-6 space-y-2">
                {data.topOrgs.map((org, i) => {
                  const maxPol = data.topOrgs[0]?.latestPolitical || 1;
                  const barWidth = Math.max(
                    5,
                    (org.latestPolitical / maxPol) * 100,
                  );
                  const isSelected = selectedOrg === org.ein;

                  return (
                    <button
                      key={org.ein}
                      onClick={() =>
                        setSelectedOrg(isSelected ? null : org.ein)
                      }
                      className={cn(
                        "flex w-full items-center gap-4 rounded-lg border px-4 py-3 text-left transition-all",
                        isSelected
                          ? "border-ink bg-ink/5 shadow-sm"
                          : "border-border bg-surface hover:border-ink/20",
                      )}
                    >
                      <span className="w-6 shrink-0 font-mono text-sm font-bold text-muted/50">
                        {i + 1}
                      </span>

                      <EyeOff className="h-4 w-4 shrink-0 text-muted/30" />

                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-ink">
                          {org.name}
                        </div>
                        <div className="mt-1.5 flex items-center gap-3">
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border/50">
                            <div
                              className="h-full rounded-full bg-accent"
                              style={{ width: `${barWidth}%` }}
                            />
                          </div>
                          <span className="shrink-0 font-mono text-[10px] text-muted">
                            {org.filingYears.length} filings
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <div className="font-mono text-sm font-bold text-accent">
                          {formatCompactMoney(org.latestPolitical)}
                        </div>
                        <div className="font-mono text-[10px] text-muted">
                          political spend
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected org detail */}
            {selectedOrg &&
              selectedOrgFilings &&
              selectedOrgFilings.length > 0 && (
                <div className="mt-8 rounded-lg border border-ink/20 bg-surface p-6">
                  <h3 className="font-headline text-lg font-bold text-ink">
                    {selectedOrgFilings[0].organizationName}: IRS 990 Filings
                  </h3>

                  <div className="mt-4 space-y-4">
                    {selectedOrgFilings.map((f) => (
                      <div
                        key={f.id}
                        className="rounded-md border border-border bg-paper p-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm font-bold text-ink">
                            Tax Year {f.filingYear}
                          </span>
                          {f.pdfUrl && (
                            <a
                              href={f.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-[10px] text-accent underline underline-offset-2"
                            >
                              View 990
                            </a>
                          )}
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
                          <div>
                            <div className="font-mono text-[10px] uppercase text-muted">
                              Revenue
                            </div>
                            <div className="font-mono text-sm font-bold text-ink">
                              {formatCompactMoney(f.totalRevenue)}
                            </div>
                          </div>
                          <div>
                            <div className="font-mono text-[10px] uppercase text-muted">
                              Expenses
                            </div>
                            <div className="font-mono text-sm font-bold text-ink">
                              {formatCompactMoney(f.totalExpenses)}
                            </div>
                          </div>
                          <div>
                            <div className="font-mono text-[10px] uppercase text-muted">
                              Assets
                            </div>
                            <div className="font-mono text-sm font-bold text-ink">
                              {formatCompactMoney(f.totalAssets)}
                            </div>
                          </div>
                          <div>
                            <div className="font-mono text-[10px] uppercase text-muted">
                              Political
                            </div>
                            <div className="font-mono text-sm font-bold text-accent">
                              {formatCompactMoney(f.politicalExpenses)}
                            </div>
                          </div>
                        </div>

                        {f.grantRecipients &&
                          Array.isArray(f.grantRecipients) &&
                          f.grantRecipients.length > 0 && (
                            <div className="mt-3 border-t border-border/50 pt-3">
                              <div className="font-mono text-[10px] uppercase text-muted">
                                Grant Recipients
                              </div>
                              <div className="mt-1.5 flex flex-wrap gap-2">
                                {(
                                  f.grantRecipients as Array<{
                                    name: string;
                                    amount: number;
                                  }>
                                ).map((g, i) => (
                                  <span
                                    key={i}
                                    className="rounded bg-border/20 px-2 py-0.5 font-mono text-[10px] text-muted"
                                  >
                                    {g.name} · {formatCompactMoney(g.amount)}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </>
        )}
      </div>

      {/* Methodology */}
      <div className="mt-12 rounded-lg border border-border bg-surface/50 px-4 py-3">
        <p className="font-mono text-xs text-muted">
          Data sourced from ProPublica Nonprofit Explorer (IRS 990 filings).
          501(c)(4) organizations are not required to disclose their donors.
          Political expenditure figures come from self-reported IRS filings and
          may understate actual political activity.
        </p>
      </div>
    </div>
  );
}
