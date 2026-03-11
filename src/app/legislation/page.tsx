"use client";

import { useState, useEffect } from "react";
import { Loader2, Scale, Filter, ArrowRight } from "lucide-react";
import { VoteBreakdown } from "@/components/legislation/VoteBreakdown";
import { PARTY_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

/* ── Types ──────────────────────────────────────── */

interface BillSponsor {
  id: string;
  name: string;
  party: string | null;
  state: string | null;
}

interface VoteSummary {
  yea: number;
  nay: number;
  present: number;
  notVoting: number;
}

interface Bill {
  id: string;
  billId: string;
  billType: string;
  billNumber: number;
  congress: number;
  title: string;
  summary: string | null;
  introducedDate: string;
  lastActionDate: string | null;
  status: string | null;
  policyArea: string | null;
  subjects: string[];
  sponsor: BillSponsor | null;
  voteCount: number;
  voteSummary: VoteSummary | null;
}

interface PolicyArea {
  name: string;
  count: number;
}

interface LegislationData {
  bills: Bill[];
  meta: { total: number; limit: number; offset: number };
  policyAreas: PolicyArea[];
}

/* ── Page ───────────────────────────────────────── */

export default function LegislationPage() {
  const [data, setData] = useState<LegislationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [policyFilter, setPolicyFilter] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ limit: "100" });
    if (policyFilter) params.set("policyArea", policyFilter);

    fetch(`/api/legislation?${params}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError("Failed to load legislation"))
      .finally(() => setLoading(false));
  }, [policyFilter]);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Congressional Record
          </div>
          <h1 className="mt-4 font-headline text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Legislation
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Bills introduced in Congress with roll-call vote breakdowns. See how
            your representatives voted and who sponsored what.
          </p>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-lg border border-border px-3 py-2 font-mono text-xs font-medium transition-colors",
            showFilters
              ? "bg-ink text-white"
              : "bg-surface text-muted hover:text-ink",
          )}
        >
          <Filter className="h-3.5 w-3.5" />
          Filters
        </button>
      </div>

      {/* Stats bar */}
      {data && !loading && (
        <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-border py-4">
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Total Bills
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {data.meta.total}
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              With Votes
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {data.bills.filter((b) => b.voteCount > 0).length}
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Policy Areas
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {data.policyAreas.length}
            </div>
          </div>
        </div>
      )}

      {/* Filter panel */}
      {showFilters && data && (
        <div className="mt-6 rounded-lg border border-border bg-surface p-4">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
            Policy Area
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => setPolicyFilter("")}
              className={cn(
                "rounded-full px-3 py-1 font-mono text-xs transition-colors",
                !policyFilter
                  ? "bg-ink text-white"
                  : "bg-border/30 text-muted hover:text-ink",
              )}
            >
              All
            </button>
            {data.policyAreas.map((pa) => (
              <button
                key={pa.name}
                onClick={() => setPolicyFilter(pa.name)}
                className={cn(
                  "rounded-full px-3 py-1 font-mono text-xs transition-colors",
                  policyFilter === pa.name
                    ? "bg-ink text-white"
                    : "bg-border/30 text-muted hover:text-ink",
                )}
              >
                {pa.name} ({pa.count})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mt-10">
        {loading && (
          <div className="flex h-96 items-center justify-center">
            <div className="flex items-center gap-3 text-muted">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="font-mono text-sm">Loading legislation...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {!loading && data && (
          <div className="space-y-4">
            {data.bills.map((bill) => (
              <BillCard key={bill.id} bill={bill} />
            ))}

            {data.bills.length === 0 && (
              <div className="flex h-64 items-center justify-center">
                <p className="font-mono text-sm text-muted">
                  No bills found for this filter.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Methodology */}
      <div className="mt-12 rounded-lg border border-border bg-surface/50 px-4 py-3">
        <p className="font-mono text-xs text-muted">
          Data sourced from Congress.gov API. Vote breakdowns show
          Yea/Nay/Present/Not Voting counts from official roll-call records.
          Bills are listed by introduction date.
        </p>
      </div>
    </div>
  );
}

/* ── Bill Card ──────────────────────────────────── */

function BillCard({ bill }: { bill: Bill }) {
  const billLabel = `${bill.billType.toUpperCase()} ${bill.billNumber}`;

  return (
    <div className="rounded-lg border border-border bg-surface p-5 transition-colors hover:border-ink/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        {/* Bill info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <span className="shrink-0 rounded bg-ink px-2 py-0.5 font-mono text-[10px] font-bold text-white">
              {billLabel}
            </span>
            <span className="font-mono text-[10px] text-muted">
              {bill.congress}th Congress
            </span>
            {bill.policyArea && (
              <span className="hidden rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent sm:inline">
                {bill.policyArea}
              </span>
            )}
          </div>

          <Link
            href={`/legislation/${encodeURIComponent(bill.billId)}`}
            className="group"
          >
            <h3 className="mt-2 text-sm font-medium leading-snug text-ink line-clamp-2 group-hover:text-accent">
              {bill.title}
            </h3>
          </Link>

          {bill.summary && (
            <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-2">
              {bill.summary}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-3">
            {bill.sponsor && (
              <Link
                href={`/entity/politician/${bill.sponsor.id}`}
                className="flex items-center gap-1.5 text-xs text-muted hover:text-ink"
              >
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: bill.sponsor.party
                      ? (PARTY_COLORS[bill.sponsor.party.toLowerCase()] ??
                        "#6b7280")
                      : "#6b7280",
                  }}
                />
                <span>
                  {bill.sponsor.name}
                  {bill.sponsor.state ? ` (${bill.sponsor.state})` : ""}
                </span>
              </Link>
            )}
            <span className="font-mono text-[10px] text-muted/60">
              Introduced {bill.introducedDate}
            </span>
            {bill.status && (
              <span className="font-mono text-[10px] text-muted/60">
                {bill.status}
              </span>
            )}
            <Link
              href={`/legislation/${encodeURIComponent(bill.billId)}`}
              className="flex items-center gap-1 font-mono text-[10px] font-bold text-accent hover:text-ink"
            >
              Who bought this?
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Vote breakdown */}
        {bill.voteSummary && (
          <div className="w-full shrink-0 lg:w-64">
            <VoteBreakdown votes={bill.voteSummary} />
          </div>
        )}

        {!bill.voteSummary && bill.voteCount === 0 && (
          <div className="flex shrink-0 items-center gap-2 lg:w-64">
            <Scale className="h-4 w-4 text-muted/40" />
            <span className="font-mono text-[10px] text-muted/60">
              No roll-call vote
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
