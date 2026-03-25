"use client";

import { useState, useEffect } from "react";
import { Loader2, Search, ArrowRight, DollarSign } from "lucide-react";
import { PARTY_COLORS, ENTITY_COLORS } from "@/lib/constants";
import { formatCompactMoney } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { EntityType } from "@/types";

/* ── Types ──────────────────────────────────────── */

interface OverviewDonor {
  id: string;
  name: string;
  type: string;
  industry: string | null;
  totalDonated: number;
  politiciansFunded: number;
}

interface FundedPolitician {
  id: string;
  name: string;
  party: string | null;
  state: string | null;
  office: string | null;
  donationAmount: number;
  votes: {
    total: number;
    yea: number;
    nay: number;
  };
}

interface RelevantBill {
  id: string;
  billId: string;
  title: string;
  policyArea: string | null;
}

interface EntityDetail {
  entity: {
    id: string;
    name: string;
    type: string;
    industry: string | null;
  };
  fundedPoliticians: FundedPolitician[];
  relevantBills: RelevantBill[];
  stats: {
    totalDonated: number;
    politiciansFunded: number;
    billsVotedOn: number;
  };
}

interface OverviewData {
  donors: OverviewDonor[];
  stats: {
    totalBills: number;
    totalVotes: number;
    topDonorCount: number;
  };
}

/* ── Page ───────────────────────────────────────── */

export default function PowerMapPage() {
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [detail, setDetail] = useState<EntityDetail | null>(null);
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch overview on mount
  useEffect(() => {
    fetch("/api/power-map")
      .then((r) => r.json())
      .then(setOverview)
      .catch(() => setError("Failed to load power map data"))
      .finally(() => setLoading(false));
  }, []);

  // Fetch detail when entity selected
  useEffect(() => {
    if (!selectedEntityId) {
      setDetail(null);
      return;
    }

    setDetailLoading(true);
    fetch(`/api/power-map?entityId=${selectedEntityId}`)
      .then((r) => r.json())
      .then(setDetail)
      .catch(() => setError("Failed to load entity details"))
      .finally(() => setDetailLoading(false));
  }, [selectedEntityId]);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
      {/* Header */}
      <div>
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Follow the Influence
        </div>
        <h1 className="mt-4 font-headline text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Power Map
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Connect the dots between donations and votes. Select a donor to see
          which politicians they fund and how those politicians voted.
        </p>
      </div>

      {/* Stats */}
      {overview && !loading && (
        <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-border py-4">
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Bills Tracked
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {overview.stats.totalBills}
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Votes Recorded
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {overview.stats.totalVotes}
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Top Donors
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {overview.stats.topDonorCount}
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
              <span className="font-mono text-sm">Loading power map...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {!loading && overview && (
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
            {/* Left: Donor list */}
            <div>
              <h2 className="font-headline text-xl font-black text-ink">
                Top Donors
              </h2>
              <p className="mt-1 text-sm text-muted">
                Select a donor to explore their political influence
              </p>

              <div className="mt-6 space-y-2">
                {overview.donors.map((donor) => {
                  const isSelected = selectedEntityId === donor.id;
                  return (
                    <button
                      key={donor.id}
                      onClick={() =>
                        setSelectedEntityId(isSelected ? null : donor.id)
                      }
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all",
                        isSelected
                          ? "border-ink bg-ink/5 shadow-sm"
                          : "border-border bg-surface hover:border-ink/20",
                      )}
                    >
                      <div
                        className="h-3 w-3 shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            ENTITY_COLORS[
                              donor.type.toLowerCase() as EntityType
                            ] ?? "#6b7280",
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-ink">
                          {donor.name}
                        </div>
                        <div className="font-mono text-[10px] text-muted">
                          {donor.industry ?? donor.type.replace(/_/g, " ")} ·{" "}
                          {donor.politiciansFunded} politicians funded
                        </div>
                      </div>
                      <div className="shrink-0 font-mono text-sm font-bold text-ink">
                        {formatCompactMoney(donor.totalDonated)}
                      </div>
                    </button>
                  );
                })}

                {overview.donors.length === 0 && (
                  <div className="rounded-lg border border-dashed border-border bg-surface/50 px-6 py-10 text-center">
                    <DollarSign className="mx-auto h-8 w-8 text-muted/30" />
                    <p className="mt-3 font-mono text-sm text-muted">
                      No donor data available yet.
                    </p>
                    <p className="mt-1 text-xs text-muted/60">
                      Run the data sync to populate donation records.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Detail panel */}
            <div>
              {!selectedEntityId && (
                <div className="flex h-96 items-center justify-center rounded-lg border border-dashed border-border bg-surface/30">
                  <div className="text-center">
                    <Search className="mx-auto h-8 w-8 text-muted/30" />
                    <p className="mt-3 font-mono text-sm text-muted">
                      Select a donor to see their influence network
                    </p>
                  </div>
                </div>
              )}

              {detailLoading && (
                <div className="flex h-96 items-center justify-center">
                  <div className="flex items-center gap-3 text-muted">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="font-mono text-sm">
                      Loading influence data...
                    </span>
                  </div>
                </div>
              )}

              {!detailLoading && detail && (
                <div>
                  {/* Entity header */}
                  <div className="border-b-4 border-ink pb-4">
                    <h2 className="font-headline text-2xl font-black text-ink">
                      {detail.entity.name}
                    </h2>
                    <div className="mt-1 flex items-center gap-4">
                      <span className="font-mono text-xs text-muted">
                        {detail.entity.industry ??
                          detail.entity.type.replace(/_/g, " ")}
                      </span>
                      <span className="font-mono text-xs font-bold text-accent">
                        {formatCompactMoney(detail.stats.totalDonated)} donated
                      </span>
                    </div>
                  </div>

                  {/* Funded politicians */}
                  <div className="mt-8">
                    <h3 className="font-headline text-lg font-bold text-ink">
                      Funded Politicians ({detail.stats.politiciansFunded})
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      Politicians who received donations from{" "}
                      {detail.entity.name}
                    </p>

                    <div className="mt-4 space-y-2">
                      {detail.fundedPoliticians.map((pol) => (
                        <Link
                          key={pol.id}
                          href={`/entity/politician/${pol.id}`}
                          className="group flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 transition-colors hover:border-ink/20"
                        >
                          <div
                            className="h-3 w-3 shrink-0 rounded-full"
                            style={{
                              backgroundColor: pol.party
                                ? (PARTY_COLORS[pol.party.toLowerCase()] ??
                                  "#6b7280")
                                : "#6b7280",
                            }}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline gap-2">
                              <span className="text-sm font-medium text-ink group-hover:text-accent">
                                {pol.name}
                              </span>
                              {pol.state && (
                                <span className="font-mono text-[10px] text-muted">
                                  {pol.state}
                                </span>
                              )}
                            </div>
                            {pol.votes.total > 0 && (
                              <div className="mt-1 font-mono text-[10px] text-muted">
                                {pol.votes.total} votes tracked ·{" "}
                                {pol.votes.yea} yea · {pol.votes.nay} nay
                              </div>
                            )}
                          </div>
                          <div className="shrink-0 text-right">
                            <div className="font-mono text-sm font-bold text-money-in">
                              {formatCompactMoney(pol.donationAmount)}
                            </div>
                            <div className="font-mono text-[10px] text-muted">
                              received
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 shrink-0 text-muted/30 group-hover:text-ink" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Relevant bills */}
                  {detail.relevantBills.length > 0 && (
                    <div className="mt-10">
                      <h3 className="font-headline text-lg font-bold text-ink">
                        Relevant Legislation
                      </h3>
                      <p className="mt-1 text-sm text-muted">
                        Bills these funded politicians voted on
                      </p>
                      <div className="mt-4 space-y-2">
                        {detail.relevantBills.map((bill) => (
                          <div
                            key={bill.id}
                            className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3"
                          >
                            <span className="shrink-0 rounded bg-ink px-2 py-0.5 font-mono text-[10px] font-bold text-white">
                              {bill.billId}
                            </span>
                            <span className="min-w-0 flex-1 truncate text-sm text-ink">
                              {bill.title}
                            </span>
                            {bill.policyArea && (
                              <span className="shrink-0 rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent">
                                {bill.policyArea}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Link to entity profile */}
                  <div className="mt-8">
                    <Link
                      href={`/entity/${detail.entity.type}/${detail.entity.id}`}
                      className="inline-flex items-center gap-2 font-mono text-xs text-muted underline decoration-border underline-offset-4 hover:text-ink hover:decoration-ink"
                    >
                      View full entity profile
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Methodology */}
      <div className="mt-12 rounded-lg border border-border bg-surface/50 px-4 py-3">
        <p className="font-mono text-xs text-muted">
          This analysis connects campaign finance data with congressional voting
          records. Correlation does not imply causation; donations and votes may
          align for many reasons including shared ideology and constituent
          interests.
        </p>
      </div>
    </div>
  );
}
