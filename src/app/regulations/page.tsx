"use client";

import { useState, useEffect } from "react";
import { Loader2, FileText, AlertTriangle, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/utils";

/* ── Types ──────────────────────────────────────── */

interface RegEntry {
  id: string;
  documentNumber: string;
  title: string;
  type: string;
  agencyNames: string[];
  publicationDate: string;
  significantRule: boolean;
  abstractText: string | null;
  htmlUrl: string;
  commentCount: number;
}

interface TypeBreakdown {
  type: string;
  count: number;
}

interface AgencyBreakdown {
  name: string;
  count: number;
}

interface RegData {
  entries: RegEntry[];
  meta: { total: number; limit: number; offset: number };
  typeBreakdown: TypeBreakdown[];
  topAgencies: AgencyBreakdown[];
}

const TYPE_LABELS: Record<string, string> = {
  rule: "Final Rule",
  proposed_rule: "Proposed Rule",
  notice: "Notice",
  presidential_document: "Presidential",
};

/* ── Page ───────────────────────────────────────── */

export default function RegulationsPage() {
  const [data, setData] = useState<RegData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [significantOnly, setSignificantOnly] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ limit: "100" });
    if (typeFilter) params.set("type", typeFilter);
    if (significantOnly) params.set("significant", "true");

    fetch(`/api/regulations?${params}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError("Failed to load regulations"))
      .finally(() => setLoading(false));
  }, [typeFilter, significantOnly]);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
      {/* Header */}
      <div>
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Federal Register
        </div>
        <h1 className="mt-4 font-headline text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Regulations
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Track federal rules and proposed regulations. See which agencies are
          writing the rules and how significant they are.
        </p>
      </div>

      {/* Stats */}
      {data && !loading && (
        <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-border py-4">
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Total Entries
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {formatNumber(data.meta.total)}
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          {data.typeBreakdown.map((t) => (
            <div key={t.type}>
              <div className="font-mono text-xs uppercase text-muted">
                {TYPE_LABELS[t.type] ?? t.type}
              </div>
              <div className="font-mono text-2xl font-bold text-ink">
                {formatNumber(t.count)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filters + Content */}
      <div className="mt-10 grid gap-10 lg:grid-cols-[250px_1fr]">
        {/* Sidebar */}
        <div className="space-y-6">
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
              Type
            </h3>
            <div className="mt-3 space-y-1">
              <button
                onClick={() => setTypeFilter("")}
                className={cn(
                  "block w-full rounded-md px-3 py-1.5 text-left font-mono text-xs transition-colors",
                  !typeFilter
                    ? "bg-ink text-white"
                    : "text-muted hover:text-ink",
                )}
              >
                All types
              </button>
              {["rule", "proposed_rule", "notice"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={cn(
                    "block w-full rounded-md px-3 py-1.5 text-left font-mono text-xs transition-colors",
                    typeFilter === t
                      ? "bg-ink text-white"
                      : "text-muted hover:text-ink",
                  )}
                >
                  {TYPE_LABELS[t]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={significantOnly}
                onChange={(e) => setSignificantOnly(e.target.checked)}
                className="rounded border-border"
              />
              <span className="font-mono text-xs text-muted">
                Significant rules only
              </span>
            </label>
          </div>

          {/* Top agencies */}
          {data && (
            <div>
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
                Top Agencies
              </h3>
              <div className="mt-3 space-y-1.5">
                {data.topAgencies.slice(0, 10).map((a) => (
                  <div
                    key={a.name}
                    className="flex items-baseline justify-between"
                  >
                    <span className="truncate text-xs text-muted">
                      {a.name}
                    </span>
                    <span className="ml-2 shrink-0 font-mono text-[10px] text-muted/60">
                      {a.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Entries */}
        <div>
          {loading && (
            <div className="flex h-96 items-center justify-center">
              <div className="flex items-center gap-3 text-muted">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="font-mono text-sm">Loading regulations...</span>
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
              {data.entries.map((entry) => (
                <a
                  key={entry.id}
                  href={entry.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-border bg-surface p-4 transition-colors hover:border-ink/20"
                >
                  <div className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted/50" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 font-mono text-[10px] font-bold",
                            entry.type === "rule"
                              ? "bg-accent/10 text-accent"
                              : entry.type === "proposed_rule"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-border/30 text-muted",
                          )}
                        >
                          {TYPE_LABELS[entry.type] ?? entry.type}
                        </span>
                        {entry.significantRule && (
                          <span className="flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 font-mono text-[10px] font-bold text-red-600">
                            <AlertTriangle className="h-2.5 w-2.5" />
                            Significant
                          </span>
                        )}
                        <span className="font-mono text-[10px] text-muted/60">
                          {entry.documentNumber}
                        </span>
                      </div>

                      <h3 className="mt-1.5 text-sm font-medium leading-snug text-ink line-clamp-2">
                        {entry.title}
                      </h3>

                      {entry.abstractText && (
                        <p className="mt-1.5 text-xs text-muted line-clamp-2">
                          {entry.abstractText}
                        </p>
                      )}

                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        {entry.agencyNames.slice(0, 2).map((name) => (
                          <span
                            key={name}
                            className="font-mono text-[10px] text-muted"
                          >
                            {name}
                          </span>
                        ))}
                        <span className="font-mono text-[10px] text-muted/60">
                          {entry.publicationDate}
                        </span>
                        {entry.commentCount > 0 && (
                          <span className="font-mono text-[10px] text-muted/60">
                            {formatNumber(entry.commentCount)} comments
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </a>
              ))}

              {data.entries.length === 0 && (
                <div className="flex h-64 items-center justify-center">
                  <p className="font-mono text-sm text-muted">
                    No entries found for this filter.
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
          Data sourced from the Federal Register API. Significant rules are those
          with an annual economic impact of $100M+ as determined by the Office of
          Information and Regulatory Affairs (OIRA).
        </p>
      </div>
    </div>
  );
}
