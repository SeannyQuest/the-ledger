"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Search,
  Loader2,
  DollarSign,
  TrendingUp,
  Building2,
  Landmark,
  HandCoins,
  ArrowRight,
  Calculator,
} from "lucide-react";
import Link from "next/link";
import { useMode } from "@/context/ModeContext";
import { formatCompactMoney } from "@/lib/utils";
import { ENTITY_COLORS, ENTITY_LABELS } from "@/lib/constants";
import type { EntityType } from "@/types";

// ── Types ──

interface SearchEntity {
  id: string;
  type: string;
  name: string;
  shortName?: string;
  industry?: string;
  ticker?: string;
  totalContracts: number;
  totalSpent: number;
  totalLobbying: number;
}

interface SearchResult {
  entity: SearchEntity;
  matchField: string;
  matchHighlight: string;
  score: number;
}

interface ROIData {
  entity: {
    id: string;
    name: string;
    shortName?: string;
    type: string;
    industry?: string;
    ticker?: string;
  };
  politicalSpending: {
    donations: number;
    lobbying: number;
    total: number;
  };
  governmentReturns: {
    contracts: number;
    grants: number;
    totalFromEntity: number;
    total: number;
  };
  roi: {
    multiple: number;
    raw: number;
  };
  yearlyBreakdown: {
    year: number;
    spending: number;
    returns: number;
  }[];
  topRecipients: {
    entityId: string;
    name: string;
    type: string;
    total: number;
  }[];
  topAgencies: {
    name: string;
    total: number;
  }[];
}

// ── Component ──

export default function ROICalculatorPage() {
  const { mode } = useMode();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<SearchEntity | null>(null);
  const [roiData, setRoiData] = useState<ROIData | null>(null);
  const [loadingROI, setLoadingROI] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // ── Debounced search ──
  useEffect(() => {
    if (query.length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=8`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.results ?? []);
          setShowDropdown(true);
        }
      } catch {
        // Silently fail
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // ── Click outside to close dropdown ──
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Select entity and fetch ROI ──
  const handleSelect = useCallback(async (entity: SearchEntity) => {
    setSelectedEntity(entity);
    setQuery(entity.name);
    setShowDropdown(false);
    setLoadingROI(true);

    try {
      const res = await fetch(`/api/roi/${entity.id}`);
      if (res.ok) {
        const data = await res.json();
        setRoiData(data);
      }
    } catch {
      // Silently fail
    } finally {
      setLoadingROI(false);
    }
  }, []);

  // ── ROI gauge percentage (capped at 100% for display, log scale) ──
  const gaugePercent =
    roiData && roiData.roi.raw > 0
      ? Math.min(100, Math.round((Math.log10(roiData.roi.raw + 1) / 5) * 100))
      : 0;

  // ── Max for year bar charts ──
  const maxYearValue =
    roiData?.yearlyBreakdown.reduce(
      (max, y) => Math.max(max, y.spending, y.returns),
      0,
    ) ?? 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      {/* Header */}
      <div>
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          {mode === "explore" ? "ROI Calculator" : "Research Mode"}
        </div>
        <h1 className="mt-4 font-headline text-5xl font-black tracking-tight text-ink lg:text-6xl">
          {mode === "explore"
            ? "Follow the Money Back"
            : "ROI Analysis Tool"}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          {mode === "explore"
            ? "How much does a corporation spend on politics\u2014and how much comes back in government contracts and grants?"
            : "Search any entity to calculate the ratio of political spending to government returns."}
        </p>
      </div>

      {/* Search */}
      <div className="relative mt-12" ref={dropdownRef}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (selectedEntity && e.target.value !== selectedEntity.name) {
                setSelectedEntity(null);
                setRoiData(null);
              }
            }}
            placeholder="Search a corporation, PAC, or organization..."
            className="w-full rounded-lg border border-border bg-surface py-4 pl-12 pr-12 font-mono text-sm text-ink placeholder:text-muted/60 focus:border-ink/40 focus:outline-none focus:ring-1 focus:ring-ink/20"
          />
          {searching && (
            <Loader2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-muted" />
          )}
        </div>

        {/* Search results dropdown */}
        {showDropdown && searchResults.length > 0 && (
          <div className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-paper shadow-lg">
            {searchResults.map((result) => (
              <button
                key={result.entity.id}
                onClick={() => handleSelect(result.entity)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-surface"
              >
                <div
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{
                    backgroundColor:
                      ENTITY_COLORS[result.entity.type as EntityType] ?? "#6b7280",
                  }}
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-headline text-sm font-bold text-ink">
                    {result.entity.name}
                  </div>
                  <div className="font-mono text-xs text-muted">
                    {ENTITY_LABELS[result.entity.type as EntityType] ?? result.entity.type}
                    {result.entity.industry ? ` \u00b7 ${result.entity.industry}` : ""}
                    {result.entity.ticker ? ` \u00b7 ${result.entity.ticker}` : ""}
                  </div>
                </div>
                {result.entity.totalContracts > 0 && (
                  <div className="shrink-0 font-mono text-xs text-accent">
                    {formatCompactMoney(result.entity.totalContracts)} contracts
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {showDropdown && searchResults.length === 0 && query.length >= 2 && !searching && (
          <div className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-paper p-4 shadow-lg">
            <div className="font-mono text-sm text-muted">No entities found.</div>
          </div>
        )}
      </div>

      {/* Loading state */}
      {loadingROI && (
        <div className="mt-16 flex items-center justify-center gap-3 text-muted">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="font-mono text-sm">Calculating ROI...</span>
        </div>
      )}

      {/* ROI Results */}
      {roiData && !loadingROI && (
        <>
          {/* Entity header */}
          <div className="mt-12 flex items-center gap-3">
            <div
              className="h-4 w-4 rounded-full"
              style={{
                backgroundColor:
                  ENTITY_COLORS[roiData.entity.type as EntityType] ?? "#6b7280",
              }}
            />
            <h2 className="font-headline text-3xl font-bold text-ink">
              {roiData.entity.name}
            </h2>
            <span className="rounded bg-surface px-2 py-0.5 font-mono text-xs uppercase tracking-wider text-muted">
              {ENTITY_LABELS[roiData.entity.type as EntityType] ?? roiData.entity.type}
            </span>
            {roiData.entity.industry && (
              <span className="font-mono text-xs text-muted">
                {roiData.entity.industry}
              </span>
            )}
          </div>

          {/* Summary stats */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-surface p-5">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Total Political Spend
              </div>
              <div className="mt-2 font-mono text-3xl font-bold text-money-out">
                {formatCompactMoney(roiData.politicalSpending.total)}
              </div>
              <div className="mt-1 font-mono text-xs text-muted">
                Donations + Lobbying
              </div>
            </div>
            <div className="rounded-lg border border-border bg-surface p-5">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Total Returns
              </div>
              <div className="mt-2 font-mono text-3xl font-bold text-money-in">
                {formatCompactMoney(roiData.governmentReturns.total)}
              </div>
              <div className="mt-1 font-mono text-xs text-muted">
                Contracts + Grants
              </div>
            </div>
            <div className="rounded-lg border border-border bg-surface p-5">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                ROI Multiple
              </div>
              <div className="mt-2 font-mono text-3xl font-bold text-accent">
                {roiData.roi.multiple > 0
                  ? `${roiData.roi.multiple.toLocaleString()}x`
                  : "N/A"}
              </div>
              <div className="mt-1 font-mono text-xs text-muted">
                Returns / Spend
              </div>
            </div>
          </div>

          {/* ROI Gauge bar */}
          {roiData.roi.raw > 0 && (
            <div className="mt-8 rounded-lg border border-border bg-surface p-5">
              <div className="flex items-center justify-between">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                  Return Multiplier
                </div>
                <div className="font-mono text-sm font-bold text-accent">
                  {roiData.roi.multiple.toLocaleString()}x
                </div>
              </div>
              <div className="mt-3 h-4 w-full overflow-hidden rounded-full bg-paper">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-700"
                  style={{ width: `${gaugePercent}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10px] text-muted">
                <span>1x</span>
                <span>10x</span>
                <span>100x</span>
                <span>1,000x</span>
                <span>10,000x+</span>
              </div>
            </div>
          )}

          {/* Breakdown cards */}
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="rounded-lg border border-border bg-paper p-4">
              <div className="flex items-center gap-2">
                <HandCoins className="h-4 w-4 text-money-out" />
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Donations
                </div>
              </div>
              <div className="mt-2 font-mono text-xl font-bold text-ink">
                {formatCompactMoney(roiData.politicalSpending.donations)}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-paper p-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-money-out" />
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Lobbying
                </div>
              </div>
              <div className="mt-2 font-mono text-xl font-bold text-ink">
                {formatCompactMoney(roiData.politicalSpending.lobbying)}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-paper p-4">
              <div className="flex items-center gap-2">
                <Landmark className="h-4 w-4 text-money-in" />
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Contracts
                </div>
              </div>
              <div className="mt-2 font-mono text-xl font-bold text-ink">
                {formatCompactMoney(roiData.governmentReturns.contracts)}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-paper p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-money-in" />
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Grants
                </div>
              </div>
              <div className="mt-2 font-mono text-xl font-bold text-ink">
                {formatCompactMoney(roiData.governmentReturns.grants)}
              </div>
            </div>
          </div>

          {/* Year-by-year breakdown */}
          {roiData.yearlyBreakdown.length > 0 && (
            <div className="mt-12">
              <h3 className="font-headline text-2xl font-bold text-ink">
                Year-by-Year Breakdown
              </h3>
              <p className="mt-1 text-sm text-muted">
                Political spending vs. government returns over time.
              </p>
              <div className="mt-6 space-y-3">
                {roiData.yearlyBreakdown.map((year) => (
                  <div
                    key={year.year}
                    className="rounded-lg border border-border bg-surface p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 shrink-0 font-mono text-sm font-bold text-ink">
                        {year.year}
                      </div>
                      <div className="min-w-0 flex-1 space-y-1.5">
                        {/* Spending bar */}
                        <div className="flex items-center gap-2">
                          <div className="w-16 shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted">
                            Spent
                          </div>
                          <div className="h-3 flex-1 overflow-hidden rounded-full bg-paper">
                            <div
                              className="h-full rounded-full bg-red-400/70 transition-all duration-500"
                              style={{
                                width: `${maxYearValue > 0 ? (year.spending / maxYearValue) * 100 : 0}%`,
                              }}
                            />
                          </div>
                          <div className="w-20 shrink-0 text-right font-mono text-xs font-medium text-money-out">
                            {formatCompactMoney(year.spending)}
                          </div>
                        </div>
                        {/* Returns bar */}
                        <div className="flex items-center gap-2">
                          <div className="w-16 shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted">
                            Returns
                          </div>
                          <div className="h-3 flex-1 overflow-hidden rounded-full bg-paper">
                            <div
                              className="h-full rounded-full bg-emerald-400/70 transition-all duration-500"
                              style={{
                                width: `${maxYearValue > 0 ? (year.returns / maxYearValue) * 100 : 0}%`,
                              }}
                            />
                          </div>
                          <div className="w-20 shrink-0 text-right font-mono text-xs font-medium text-money-in">
                            {formatCompactMoney(year.returns)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top recipients */}
          {roiData.topRecipients.length > 0 && (
            <div className="mt-12">
              <h3 className="font-headline text-2xl font-bold text-ink">
                Top Donation Recipients
              </h3>
              <p className="mt-1 text-sm text-muted">
                Politicians and committees that received the most from this entity.
              </p>
              <div className="mt-6 space-y-2">
                {roiData.topRecipients.map((recipient, i) => (
                  <Link
                    key={recipient.entityId}
                    href={`/entity/${recipient.type}/${recipient.entityId}`}
                    className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 transition-colors hover:bg-paper"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor:
                          ENTITY_COLORS[recipient.type as EntityType] ?? "#6b7280",
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <span className="font-headline text-sm font-bold text-ink">
                        {recipient.name}
                      </span>
                    </div>
                    <div className="font-mono text-sm font-bold text-money-out">
                      {formatCompactMoney(recipient.total)}
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Top awarding agencies */}
          {roiData.topAgencies.length > 0 && (
            <div className="mt-12">
              <h3 className="font-headline text-2xl font-bold text-ink">
                Top Awarding Agencies
              </h3>
              <p className="mt-1 text-sm text-muted">
                Government agencies that awarded the most contracts or grants to this entity.
              </p>
              <div className="mt-6 space-y-2">
                {roiData.topAgencies.map((agency, i) => (
                  <div
                    key={agency.name}
                    className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 font-mono text-[10px] font-bold text-accent">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="font-headline text-sm font-bold text-ink">
                        {agency.name}
                      </span>
                    </div>
                    <div className="font-mono text-sm font-bold text-money-in">
                      {formatCompactMoney(agency.total)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Link to entity detail */}
          <div className="mt-8">
            <Link
              href={`/entity/${roiData.entity.type}/${roiData.entity.id}`}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 font-mono text-sm font-medium text-ink transition-colors hover:bg-paper"
            >
              View Full Entity Profile
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </>
      )}

      {/* Empty state: no entity selected yet */}
      {!selectedEntity && !loadingROI && (
        <div className="mt-16 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface/30 py-16">
          <Calculator className="h-12 w-12 text-muted/40" />
          <p className="mt-4 font-headline text-lg font-bold text-muted/60">
            Search for an entity to begin
          </p>
          <p className="mt-1 max-w-sm text-center font-mono text-xs text-muted/50">
            Enter a corporation, PAC, or organization name above to calculate
            their political spending ROI.
          </p>
        </div>
      )}

      {/* No data state */}
      {roiData &&
        !loadingROI &&
        roiData.politicalSpending.total === 0 &&
        roiData.governmentReturns.total === 0 && (
          <div className="mt-8 rounded-lg border border-border bg-surface/50 p-6">
            <p className="font-mono text-sm text-muted">
              No political spending or government return data found for this entity.
              This could mean the entity operates at the state level, uses different names
              across filings, or data has not been ingested yet.
            </p>
          </div>
        )}

      {/* How it Works */}
      <div className="mt-16 rounded-xl border border-border bg-surface/50 p-6">
        <div className="flex items-start gap-4">
          <TrendingUp className="h-6 w-6 shrink-0 text-accent" />
          <div>
            <h3 className="font-headline text-lg font-bold text-ink">
              How the ROI Calculator Works
            </h3>
            <p className="mt-2 text-sm text-muted">
              The ROI multiplier is calculated as: <strong>Total Government Returns</strong> (federal
              contracts + grants) divided by <strong>Total Political Spending</strong> (PAC donations +
              individual contributions + lobbying expenditures). For example, if a company spends $5M
              on donations and lobbying and receives $2B in government contracts, their ROI is 400x.
            </p>
            <p className="mt-3 text-sm text-muted">
              This does not imply direct causation or corruption. Many factors determine contract awards,
              including technical capability, past performance, and competitive bidding. The calculator
              highlights the statistical correlation between political spending and government returns
              as a starting point for further investigation.
            </p>
            <p className="mt-3 text-sm text-muted">
              Data sources include FEC contribution records, Senate Lobbying Disclosure Act filings,
              and USASpending.gov federal award data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
