"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Loader2,
  ArrowDown,
  EyeOff,
  Users,
  DollarSign,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { formatCompactMoney, formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { ENTITY_COLORS, ENTITY_LABELS } from "@/lib/constants";
import type { EntityType } from "@/types";

/* ── Types ──────────────────────────────────────── */

interface TraceSource {
  entityId: string;
  name: string;
  entityType: string;
  totalPoliticalExpenses: number;
  totalRevenue: number;
  filingCount: number;
  latestFilingYear: number | null;
  grantRecipients: Array<{ name: string; amount: number; purpose: string }>;
}

interface Expenditure {
  targetEntityId: string | null;
  targetName: string;
  amount: number;
  supportOppose: string | null;
  electionYear: number | null;
  transactionDate: string;
}

interface Intermediary {
  entityId: string;
  name: string;
  entityType: string;
  totalReceived: number;
  transactionCount: number;
  expenditures: Expenditure[];
  totalExpenditures: number;
}

interface FinalRecipient {
  name: string;
  entityType: string;
  total: number;
  supportCount: number;
  opposeCount: number;
}

interface TraceSummary {
  totalDarkMoney: number;
  totalPoliticalExpenses: number;
  totalOutboundToIntermediaries: number;
  totalIndependentExpenditures: number;
  intermediaryCount: number;
  finalRecipientCount: number;
  chainDepth: number;
}

interface TraceData {
  source: TraceSource;
  intermediaries: Intermediary[];
  finalRecipients: FinalRecipient[];
  summary: TraceSummary;
}

interface TopOrg {
  ein: string;
  name: string;
  latestRevenue: number;
  latestExpenses: number;
  latestPolitical: number;
  latestAssets: number;
  filingYears: number[];
}

interface DarkMoneyListData {
  topOrgs: TopOrg[];
  stats: {
    totalFilings: number;
    uniqueOrganizations: number;
    totalPoliticalSpend: number;
  };
}

interface SearchResult {
  entity: {
    id: string;
    type: EntityType;
    name: string;
  };
}

/* ── Helpers ─────────────────────────────────────── */

function entityTypeToFrontend(prismaType: string): EntityType {
  const map: Record<string, EntityType> = {
    POLITICIAN: "politician",
    CORPORATION: "corporation",
    PAC: "pac",
    SUPER_PAC: "super_pac",
    LOBBYIST: "lobbyist",
    LOBBYING_FIRM: "lobbying_firm",
    GOVERNMENT_AGENCY: "agency",
    INDIVIDUAL: "individual",
    UNION: "union",
    NONPROFIT: "nonprofit",
    PARTY_COMMITTEE: "party_committee",
  };
  return map[prismaType] ?? "individual";
}

function EntityTypeBadge({ type }: { type: string }) {
  const feType = entityTypeToFrontend(type);
  const color = ENTITY_COLORS[feType] ?? "#6b7280";
  const label = ENTITY_LABELS[feType] ?? type;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white"
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  );
}

function SupportOpposeBadge({ value }: { value: string | null }) {
  if (value === "S")
    return (
      <span className="rounded bg-green-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-green-700">
        SUPPORT
      </span>
    );
  if (value === "O")
    return (
      <span className="rounded bg-red-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-red-700">
        OPPOSE
      </span>
    );
  return null;
}

/* ── Flow Arrow ──────────────────────────────────── */

function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-2">
      <div className="h-6 w-px bg-accent" />
      {label && (
        <span className="my-1 font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
          {label}
        </span>
      )}
      <ArrowDown className="h-4 w-4 text-accent" />
    </div>
  );
}

/* ── Page ───────────────────────────────────────── */

export default function DarkMoneyTracePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [traceData, setTraceData] = useState<TraceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [topOrgs, setTopOrgs] = useState<DarkMoneyListData | null>(null);
  const [topOrgsLoading, setTopOrgsLoading] = useState(true);
  const [expandedIntermediaries, setExpandedIntermediaries] = useState<
    Set<string>
  >(new Set());

  // Load top orgs for browsing
  useEffect(() => {
    fetch("/api/dark-money?limit=50")
      .then((r) => r.json())
      .then(setTopOrgs)
      .catch(() => {})
      .finally(() => setTopOrgsLoading(false));
  }, []);

  // Search for entities
  const handleSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(query)}&limit=8`,
      );
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data.results ?? []);
      }
    } catch {
      // silently fail
    } finally {
      setSearching(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => handleSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery, handleSearch]);

  // Trace an entity
  const traceEntity = useCallback(async (entityId: string) => {
    setLoading(true);
    setError(null);
    setTraceData(null);
    setSearchQuery("");
    setSearchResults([]);
    setExpandedIntermediaries(new Set());

    try {
      const res = await fetch(
        `/api/dark-money/trace?entityId=${encodeURIComponent(entityId)}`,
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to trace");
      }
      const data = await res.json();
      setTraceData(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to trace dark money");
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleIntermediary = useCallback((id: string) => {
    setExpandedIntermediaries((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
      {/* Header */}
      <div>
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Dark Money Investigation
        </div>
        <h1 className="mt-4 font-headline text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Dark Money Tracer
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Trace the flow of untraceable money from anonymous donors through
          501(c)(4) nonprofits to Super PACs and into elections.
        </p>
      </div>

      {/* Search */}
      <div className="relative mt-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a nonprofit, 501(c)(4), or organization..."
            className="w-full rounded-lg border border-border bg-surface py-3 pl-12 pr-4 font-mono text-sm text-ink placeholder:text-muted/50 focus:border-ink/30 focus:outline-none focus:ring-1 focus:ring-ink/10"
          />
          {searching && (
            <Loader2 className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted" />
          )}
        </div>

        {/* Search dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute z-20 mt-1 w-full rounded-lg border border-border bg-surface shadow-lg">
            {searchResults.map((result) => (
              <button
                key={result.entity.id}
                onClick={() => traceEntity(result.entity.id)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-paper"
              >
                <div
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor:
                      ENTITY_COLORS[result.entity.type] ?? "#6b7280",
                  }}
                />
                <span className="flex-1 text-sm font-medium text-ink">
                  {result.entity.name}
                </span>
                <span className="font-mono text-[10px] uppercase text-muted">
                  {ENTITY_LABELS[result.entity.type] ?? result.entity.type}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-16 flex items-center justify-center">
          <div className="flex items-center gap-3 text-muted">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="font-mono text-sm">
              Tracing dark money chains...
            </span>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-8 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Trace Results */}
      {traceData && !loading && (
        <div className="mt-12">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-surface p-5">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Total Dark Money
              </div>
              <div className="mt-2 font-mono text-3xl font-bold text-accent">
                {formatCompactMoney(traceData.summary.totalDarkMoney)}
              </div>
              <div className="mt-1 font-mono text-xs text-muted">
                Traced through chain
              </div>
            </div>
            <div className="rounded-lg border border-border bg-surface p-5">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Intermediaries
              </div>
              <div className="mt-2 font-mono text-3xl font-bold text-ink">
                {traceData.summary.intermediaryCount}
              </div>
              <div className="mt-1 font-mono text-xs text-muted">
                PACs &amp; Super PACs
              </div>
            </div>
            <div className="rounded-lg border border-border bg-surface p-5">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Final Recipients
              </div>
              <div className="mt-2 font-mono text-3xl font-bold text-ink">
                {traceData.summary.finalRecipientCount}
              </div>
              <div className="mt-1 font-mono text-xs text-muted">
                Elections &amp; candidates
              </div>
            </div>
          </div>

          {/* Flow Chain */}
          <div className="mt-12">
            <h2 className="font-headline text-2xl font-black text-ink">
              Money Flow Chain
            </h2>
            <p className="mt-1 text-sm text-muted">
              Follow the money from its source to its final destination
            </p>

            <div className="mt-8 flex flex-col items-center">
              {/* Source Node: The Nonprofit */}
              <div className="w-full max-w-2xl rounded-xl border-2 border-ink bg-surface p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <EntityTypeBadge type={traceData.source.entityType} />
                    <h3 className="mt-2 font-headline text-xl font-bold text-ink">
                      {traceData.source.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-1 font-mono text-xs text-muted">
                      <EyeOff className="h-3 w-3" />
                      <span>Donors hidden from public</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-2xl font-bold text-accent">
                      {formatCompactMoney(
                        traceData.source.totalPoliticalExpenses,
                      )}
                    </div>
                    <div className="font-mono text-[10px] uppercase text-muted">
                      Political spending
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border pt-4 sm:grid-cols-3">
                  <div>
                    <div className="font-mono text-[10px] uppercase text-muted">
                      Total Revenue
                    </div>
                    <div className="font-mono text-sm font-bold text-ink">
                      {formatCompactMoney(traceData.source.totalRevenue)}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase text-muted">
                      IRS Filings
                    </div>
                    <div className="font-mono text-sm font-bold text-ink">
                      {traceData.source.filingCount}
                    </div>
                  </div>
                  {traceData.source.latestFilingYear && (
                    <div>
                      <div className="font-mono text-[10px] uppercase text-muted">
                        Latest Filing
                      </div>
                      <div className="font-mono text-sm font-bold text-ink">
                        {traceData.source.latestFilingYear}
                      </div>
                    </div>
                  )}
                </div>

                {/* Grant recipients from filings */}
                {traceData.source.grantRecipients.length > 0 && (
                  <div className="mt-4 border-t border-border/50 pt-3">
                    <div className="font-mono text-[10px] uppercase text-muted">
                      Known Grant Recipients
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {traceData.source.grantRecipients.slice(0, 8).map((g, i) => (
                        <span
                          key={i}
                          className="rounded bg-border/20 px-2 py-0.5 font-mono text-[10px] text-muted"
                        >
                          {g.name} &middot;{" "}
                          {formatCompactMoney(g.amount)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Arrow to intermediaries */}
              {traceData.intermediaries.length > 0 && (
                <FlowArrow label="Transfers to" />
              )}

              {/* Intermediary Nodes: Super PACs / PACs */}
              {traceData.intermediaries.length > 0 && (
                <div className="w-full max-w-2xl space-y-3">
                  {traceData.intermediaries.map((intermediary) => {
                    const isExpanded = expandedIntermediaries.has(
                      intermediary.entityId,
                    );
                    return (
                      <div
                        key={intermediary.entityId}
                        className="rounded-xl border border-border bg-surface shadow-sm"
                      >
                        <button
                          onClick={() =>
                            toggleIntermediary(intermediary.entityId)
                          }
                          className="flex w-full items-center gap-4 p-5 text-left"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <EntityTypeBadge
                                type={intermediary.entityType}
                              />
                              <span className="font-mono text-[10px] text-muted">
                                {intermediary.transactionCount} transfer
                                {intermediary.transactionCount !== 1
                                  ? "s"
                                  : ""}
                              </span>
                            </div>
                            <h4 className="mt-1.5 font-headline text-lg font-bold text-ink">
                              {intermediary.name}
                            </h4>
                          </div>
                          <div className="text-right">
                            <div className="font-mono text-lg font-bold text-accent">
                              {formatCompactMoney(intermediary.totalReceived)}
                            </div>
                            <div className="font-mono text-[10px] text-muted">
                              received
                            </div>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="h-5 w-5 shrink-0 text-muted" />
                          ) : (
                            <ChevronRight className="h-5 w-5 shrink-0 text-muted" />
                          )}
                        </button>

                        {/* Expanded: show expenditures */}
                        {isExpanded && intermediary.expenditures.length > 0 && (
                          <div className="border-t border-border px-5 pb-5 pt-4">
                            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
                              Independent Expenditures
                            </div>
                            <div className="mt-3 space-y-2">
                              {intermediary.expenditures.map((exp, i) => (
                                <div
                                  key={i}
                                  className="flex items-center gap-3 rounded-md border border-border/50 bg-paper px-3 py-2"
                                >
                                  <SupportOpposeBadge
                                    value={exp.supportOppose}
                                  />
                                  <span className="flex-1 text-sm text-ink">
                                    {exp.targetName}
                                  </span>
                                  {exp.electionYear && (
                                    <span className="font-mono text-[10px] text-muted">
                                      {exp.electionYear}
                                    </span>
                                  )}
                                  <span className="font-mono text-sm font-bold text-accent">
                                    {formatCompactMoney(exp.amount)}
                                  </span>
                                </div>
                              ))}
                            </div>
                            {intermediary.totalExpenditures > 0 && (
                              <div className="mt-3 text-right font-mono text-xs text-muted">
                                Total:{" "}
                                <span className="font-bold text-ink">
                                  {formatCompactMoney(
                                    intermediary.totalExpenditures,
                                  )}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {isExpanded &&
                          intermediary.expenditures.length === 0 && (
                            <div className="border-t border-border px-5 pb-4 pt-3">
                              <p className="font-mono text-xs text-muted">
                                No independent expenditure records found for
                                this entity.
                              </p>
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Arrow to final recipients */}
              {traceData.finalRecipients.length > 0 && (
                <FlowArrow label="Spent on elections" />
              )}

              {/* Final Recipients: Elections / Candidates */}
              {traceData.finalRecipients.length > 0 && (
                <div className="w-full max-w-2xl rounded-xl border border-border bg-surface p-5 shadow-sm">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
                    Final Recipients &mdash; Election Spending
                  </div>
                  <div className="mt-4 space-y-2">
                    {traceData.finalRecipients.map((recipient, i) => {
                      const maxTotal = traceData.finalRecipients[0]?.total || 1;
                      const barWidth = Math.max(
                        8,
                        (recipient.total / maxTotal) * 100,
                      );
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-ink">
                                {recipient.name}
                              </span>
                              <EntityTypeBadge type={recipient.entityType} />
                            </div>
                            <div className="mt-1 flex items-center gap-2">
                              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border/50">
                                <div
                                  className="h-full rounded-full bg-accent"
                                  style={{ width: `${barWidth}%` }}
                                />
                              </div>
                              {recipient.supportCount > 0 && (
                                <span className="font-mono text-[9px] text-green-600">
                                  {recipient.supportCount} support
                                </span>
                              )}
                              {recipient.opposeCount > 0 && (
                                <span className="font-mono text-[9px] text-red-600">
                                  {recipient.opposeCount} oppose
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="shrink-0 font-mono text-sm font-bold text-accent">
                            {formatCompactMoney(recipient.total)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* No chain found */}
              {traceData.intermediaries.length === 0 &&
                traceData.finalRecipients.length === 0 && (
                  <div className="mt-8 w-full max-w-2xl rounded-lg border border-border bg-surface/50 p-6 text-center">
                    <AlertTriangle className="mx-auto h-8 w-8 text-muted/40" />
                    <p className="mt-3 text-sm text-muted">
                      No downstream money flow chain found for this entity.
                      This organization may route money through channels not
                      yet tracked, or may primarily engage in direct political
                      spending.
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Browse Top Dark Money Orgs (shown when no trace is active) */}
      {!traceData && !loading && (
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-headline text-2xl font-black text-ink">
                Top Dark Money Organizations
              </h2>
              <p className="mt-1 text-sm text-muted">
                Select an organization to trace its money flow chain
              </p>
            </div>
            <Link
              href="/dark-money"
              className="font-mono text-xs text-accent underline underline-offset-2 hover:text-ink"
            >
              View full list
            </Link>
          </div>

          {topOrgsLoading && (
            <div className="mt-8 flex items-center gap-3 text-muted">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="font-mono text-sm">Loading organizations...</span>
            </div>
          )}

          {topOrgs && (
            <div className="mt-6 space-y-2">
              {topOrgs.topOrgs.slice(0, 15).map((org, i) => {
                const maxPol = topOrgs.topOrgs[0]?.latestPolitical || 1;
                const barWidth = Math.max(
                  5,
                  (org.latestPolitical / maxPol) * 100,
                );
                return (
                  <button
                    key={org.ein}
                    onClick={() => {
                      // Search for this org by name to get its entityId
                      setSearchQuery(org.name);
                    }}
                    className="flex w-full items-center gap-4 rounded-lg border border-border bg-surface px-4 py-3 text-left transition-all hover:border-ink/20 hover:shadow-sm"
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
                          {org.filingYears.length} filing
                          {org.filingYears.length !== 1 ? "s" : ""}
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
          )}
        </div>
      )}

      {/* How Dark Money Works */}
      <div className="mt-16">
        <div className="rounded-xl border border-border bg-surface/50 p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 shrink-0 text-accent" />
            <div>
              <h3 className="font-headline text-lg font-bold text-ink">
                How Dark Money Works
              </h3>
              <p className="mt-2 text-sm text-muted">
                &ldquo;Dark money&rdquo; refers to political spending by
                organizations that are not required to disclose their donors.
                Here is how the pipeline typically operates:
              </p>
            </div>
          </div>

          {/* Flow diagram */}
          <div className="mt-6 flex flex-col items-center gap-0">
            {/* Step 1 */}
            <div className="w-full max-w-lg rounded-lg border border-border bg-paper p-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <DollarSign className="h-4 w-4 text-ink" />
                <span className="font-headline text-sm font-bold text-ink">
                  Corporation / Wealthy Donor
                </span>
              </div>
              <p className="mt-1 font-mono text-[10px] text-muted">
                Wants to influence elections anonymously
              </p>
            </div>

            <FlowArrow label="Donates to" />

            {/* Step 2 */}
            <div className="w-full max-w-lg rounded-lg border-2 border-accent/30 bg-accent/5 p-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <EyeOff className="h-4 w-4 text-accent" />
                <span className="font-headline text-sm font-bold text-ink">
                  501(c)(4) Nonprofit
                </span>
              </div>
              <p className="mt-1 font-mono text-[10px] text-muted">
                Tax-exempt &ldquo;social welfare&rdquo; org &mdash; donor
                identities are hidden
              </p>
            </div>

            <FlowArrow label="Transfers to" />

            {/* Step 3 */}
            <div className="w-full max-w-lg rounded-lg border border-border bg-paper p-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                <span className="font-headline text-sm font-bold text-ink">
                  Super PAC
                </span>
              </div>
              <p className="mt-1 font-mono text-[10px] text-muted">
                Can spend unlimited amounts on elections &mdash; must report
                spending but not original donors
              </p>
            </div>

            <FlowArrow label="Funds" />

            {/* Step 4 */}
            <div className="w-full max-w-lg rounded-lg border border-red-200 bg-red-50 p-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="font-headline text-sm font-bold text-ink">
                  Attack Ads &amp; Election Spending
                </span>
              </div>
              <p className="mt-1 font-mono text-[10px] text-muted">
                Voters see the ads but never know who originally paid for them
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Methodology */}
      <div className="mt-8 rounded-lg border border-border bg-surface/50 px-4 py-3">
        <p className="font-mono text-xs text-muted">
          Data sourced from FEC filings, IRS 990 records (via ProPublica
          Nonprofit Explorer), and OpenSecrets. Dark money chain tracing
          connects nonprofit political expenditures to downstream Super PAC
          transfers and independent expenditures. Not all money flows are
          traceable through public records.
        </p>
      </div>
    </div>
  );
}
