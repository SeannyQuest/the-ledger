"use client";

import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { formatCompactMoney } from "@/lib/utils";
import { ENTITY_COLORS, ENTITY_LABELS } from "@/lib/constants";
import type { EntityType } from "@/types";

interface SearchResult {
  entity: {
    id: string;
    type: string;
    name: string;
    shortName?: string;
    party?: string;
    state?: string;
    office?: string;
    ticker?: string;
    industry?: string;
    totalReceived: number;
    totalSpent: number;
    totalContributed: number;
    totalLobbying: number;
    totalContracts: number;
    photoUrl?: string;
  };
  matchField: string;
  matchHighlight: string;
  score: number;
}

const ENTITY_TYPES = [
  { value: "", label: "All Types" },
  { value: "POLITICIAN", label: "Politicians" },
  { value: "CORPORATION", label: "Corporations" },
  { value: "PAC", label: "PACs" },
  { value: "SUPER_PAC", label: "Super PACs" },
  { value: "LOBBYING_FIRM", label: "Lobbying Firms" },
  { value: "GOVERNMENT_AGENCY", label: "Gov. Agencies" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ q: query, limit: "30" });
        if (typeFilter) params.set("type", typeFilter);
        const res = await fetch(`/api/search?${params}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results ?? []);
        }
      } catch {
        // Ignore
      } finally {
        setLoading(false);
        setSearched(true);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, typeFilter]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
        Search
      </div>
      <h1 className="mt-4 font-headline text-5xl font-black tracking-tight text-ink lg:text-6xl">
        Find Anyone
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        Search for any politician, corporation, PAC, Super PAC, lobbyist, or
        government agency.
      </p>

      {/* Search input */}
      <div className="mt-8 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full rounded-lg border border-border bg-surface py-3.5 pl-12 pr-4 text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-border bg-surface px-4 py-3 font-mono text-sm text-ink"
        >
          {ENTITY_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      <div className="mt-8">
        {loading && (
          <div className="flex items-center gap-3 py-8 text-muted">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="font-mono text-sm">Searching...</span>
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-muted">
              No results found for &ldquo;{query}&rdquo;. Try a different search
              term.
            </p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <>
            <div className="mb-4 font-mono text-xs text-muted">
              {results.length} result{results.length !== 1 ? "s" : ""}
            </div>
            <div className="space-y-3">
              {results.map((r) => {
                const eType = r.entity.type as EntityType;
                return (
                  <Link
                    key={r.entity.id}
                    href={`/entity/${r.entity.type}/${r.entity.id}`}
                    className="flex items-center gap-4 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-ink/20 hover:bg-paper"
                  >
                    {/* Entity color dot */}
                    <div
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{
                        backgroundColor: ENTITY_COLORS[eType] ?? "#6b7280",
                      }}
                    />

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-headline text-lg font-bold text-ink">
                          {r.entity.name}
                        </span>
                        <span className="shrink-0 rounded-full bg-paper px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
                          {ENTITY_LABELS[eType] ?? r.entity.type}
                        </span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-3 font-mono text-xs text-muted">
                        {r.entity.party && <span>{r.entity.party}</span>}
                        {r.entity.state && (
                          <span>
                            {r.entity.state}
                            {r.entity.office ? ` \u2022 ${r.entity.office}` : ""}
                          </span>
                        )}
                        {r.entity.industry && <span>{r.entity.industry}</span>}
                        {r.entity.ticker && <span>{r.entity.ticker}</span>}
                      </div>
                    </div>

                    {/* Financial stats */}
                    <div className="hidden shrink-0 gap-6 text-right sm:flex">
                      {r.entity.totalReceived > 0 && (
                        <div>
                          <div className="font-mono text-xs text-muted">
                            Received
                          </div>
                          <div className="font-mono text-sm font-bold text-money-in">
                            {formatCompactMoney(r.entity.totalReceived)}
                          </div>
                        </div>
                      )}
                      {r.entity.totalContracts > 0 && (
                        <div>
                          <div className="font-mono text-xs text-muted">
                            Contracts
                          </div>
                          <div className="font-mono text-sm font-bold text-accent">
                            {formatCompactMoney(r.entity.totalContracts)}
                          </div>
                        </div>
                      )}
                      {r.entity.totalSpent > 0 && (
                        <div>
                          <div className="font-mono text-xs text-muted">
                            Spent
                          </div>
                          <div className="font-mono text-sm font-bold text-money-out">
                            {formatCompactMoney(r.entity.totalSpent)}
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {!searched && !loading && (
          <div className="py-16 text-center">
            <Search className="mx-auto h-12 w-12 text-border" />
            <p className="mt-4 text-sm text-muted">
              Start typing to search across all entities in the database.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
