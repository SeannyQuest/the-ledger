"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Loader2,
  ArrowLeft,
  Building2,
  Scale,
  RefreshCw,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { formatCompactMoney } from "@/lib/utils";
import { ENTITY_COLORS } from "@/lib/constants";
import type { EntityType } from "@/types";

/* ── Types ──────────────────────────────────────── */

interface EntityRow {
  id: string;
  name: string;
  entityType: string;
  industry: string | null;
  totalLobbying: number;
  totalContracts: number;
  totalContributed: number;
  roi: number;
}

interface LobbyingFiling {
  id: string;
  filingId: string;
  amount: number;
  filingDate: string;
  filingYear: number;
  issues: unknown;
  specificIssues: string | null;
  client: { id: string; name: string; type: string };
  registrant: { id: string; name: string; type: string };
}

interface BillSponsor {
  id: string;
  name: string;
  party: string | null;
  state: string | null;
}

interface Bill {
  id: string;
  billId: string;
  billType: string;
  billNumber: string;
  congress: number;
  title: string;
  summary: string | null;
  introducedDate: string;
  status: string | null;
  policyArea: string | null;
  sponsor: BillSponsor | null;
}

interface IndustryData {
  slug: string;
  name: string;
  description: string;
  stats: {
    totalLobbying: number;
    totalContracts: number;
    totalPacContributions: number;
    entityCount: number;
    avgRoi: number;
    revolvingDoorCount: number;
  };
  topEntities: EntityRow[];
  lobbyingFilings: LobbyingFiling[];
  legislation: Bill[];
}

/* ── Page ───────────────────────────────────────── */

export default function IndustryDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [data, setData] = useState<IndustryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/industry/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Industry not found");
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-muted">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="font-mono text-sm">Loading industry data...</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <Link
          href="/industry"
          className="inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Industries
        </Link>
        <div className="mt-8 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600">
            {error ?? "Industry not found."}
          </p>
        </div>
      </div>
    );
  }

  const { stats } = data;

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
      {/* Back link */}
      <Link
        href="/industry"
        className="inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        All Industries
      </Link>

      {/* Header */}
      <div className="mt-6">
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Industry Profile
        </div>
        <h1 className="mt-4 font-headline text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
          {data.name}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{data.description}</p>
      </div>

      {/* Summary stats */}
      <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard
          label="Total Lobbying"
          value={formatCompactMoney(stats.totalLobbying)}
          sub="Senate LDA filings"
        />
        <StatCard
          label="Fed. Contracts"
          value={formatCompactMoney(stats.totalContracts)}
          sub="USASpending awards"
          valueClass="text-accent"
        />
        <StatCard
          label="PAC Contributions"
          value={formatCompactMoney(stats.totalPacContributions)}
          sub="FEC filings"
          valueClass="text-money-out"
        />
        <StatCard
          label="Entities"
          value={stats.entityCount.toLocaleString()}
          sub="Corps, PACs, firms"
        />
        <StatCard
          label="Avg. ROI"
          value={stats.avgRoi > 0 ? `${stats.avgRoi.toLocaleString()}x` : "N/A"}
          sub="Contracts / political spend"
          valueClass="text-money-in"
        />
        <StatCard
          label="Revolving Door"
          value={stats.revolvingDoorCount.toLocaleString()}
          sub="Cross-sector transitions"
          valueClass="text-money-out"
        />
      </div>

      {/* Top Players */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <Building2 className="h-5 w-5 text-accent" />
          <h2 className="font-headline text-3xl font-bold text-ink">
            Top Players
          </h2>
        </div>
        <p className="mt-2 text-sm text-muted">
          Entities ranked by total political spend (lobbying + contracts).
        </p>

        {data.topEntities.length === 0 ? (
          <EmptyState message="No entities found for this industry." />
        ) : (
          <div className="mt-6 space-y-3">
            {data.topEntities.map((entity, i) => (
              <Link
                key={entity.id}
                href={`/entity/${entity.entityType}/${entity.id}`}
                className="block rounded-lg border border-border bg-surface p-4 transition-colors hover:bg-paper"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <div
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{
                      backgroundColor:
                        ENTITY_COLORS[entity.entityType as EntityType] ??
                        "#6b7280",
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-headline text-lg font-bold text-ink">
                      {entity.name}
                    </div>
                    {entity.industry && (
                      <div className="font-mono text-xs text-muted">
                        {entity.industry}
                      </div>
                    )}
                  </div>
                  <div className="hidden text-right sm:block">
                    <div className="font-mono text-sm font-bold text-accent">
                      {entity.roi > 0
                        ? `${entity.roi.toLocaleString()}x`
                        : "N/A"}
                    </div>
                    <div className="font-mono text-xs text-muted">return</div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:ml-14 sm:grid-cols-4">
                  <div>
                    <div className="font-mono text-xs text-muted">Contracts</div>
                    <div className="font-mono text-sm font-bold text-ink">
                      {formatCompactMoney(entity.totalContracts)}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted">Lobbying</div>
                    <div className="font-mono text-sm font-bold text-money-out">
                      {formatCompactMoney(entity.totalLobbying)}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted">Contributed</div>
                    <div className="font-mono text-sm font-bold text-money-in">
                      {formatCompactMoney(entity.totalContributed)}
                    </div>
                  </div>
                  <div className="sm:hidden">
                    <div className="font-mono text-xs text-muted">ROI</div>
                    <div className="font-mono text-sm font-bold text-accent">
                      {entity.roi > 0
                        ? `${entity.roi.toLocaleString()}x`
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Key Legislation */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <Scale className="h-5 w-5 text-accent" />
          <h2 className="font-headline text-3xl font-bold text-ink">
            Key Legislation
          </h2>
        </div>
        <p className="mt-2 text-sm text-muted">
          Recent bills related to this industry.
        </p>

        {data.legislation.length === 0 ? (
          <EmptyState message="No related legislation found." />
        ) : (
          <div className="mt-6 space-y-3">
            {data.legislation.map((bill) => (
              <div
                key={bill.id}
                className="rounded-lg border border-border bg-surface p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="shrink-0 rounded bg-border/40 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase text-muted">
                        {bill.billType.toUpperCase()} {bill.billNumber}
                      </span>
                      {bill.status && (
                        <span className="shrink-0 rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-accent">
                          {bill.status}
                        </span>
                      )}
                    </div>
                    <h4 className="mt-1.5 font-headline text-sm font-bold text-ink">
                      {bill.title}
                    </h4>
                    {bill.summary && (
                      <p className="mt-1 line-clamp-2 text-xs text-muted">
                        {bill.summary}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-mono text-xs text-muted">
                      {bill.introducedDate}
                    </div>
                    {bill.policyArea && (
                      <div className="mt-0.5 font-mono text-[10px] text-muted/60">
                        {bill.policyArea}
                      </div>
                    )}
                  </div>
                </div>
                {bill.sponsor && (
                  <div className="mt-2 flex items-center gap-2">
                    <Link
                      href={`/entity/politician/${bill.sponsor.id}`}
                      className="flex items-center gap-1.5 rounded-md px-2 py-1 hover:bg-border/20"
                    >
                      <div
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            ENTITY_COLORS.politician,
                        }}
                      />
                      <span className="text-xs font-medium text-ink">
                        {bill.sponsor.name}
                      </span>
                      {bill.sponsor.party && (
                        <span className="font-mono text-[10px] text-muted/60">
                          ({bill.sponsor.party[0]}-{bill.sponsor.state})
                        </span>
                      )}
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lobbying Filings */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-accent" />
          <h2 className="font-headline text-3xl font-bold text-ink">
            Recent Lobbying Filings
          </h2>
        </div>
        <p className="mt-2 text-sm text-muted">
          Latest lobbying disclosure filings from entities in this industry.
        </p>

        {data.lobbyingFilings.length === 0 ? (
          <EmptyState message="No lobbying filings found for this industry." />
        ) : (
          <div className="mt-6 space-y-2">
            {data.lobbyingFilings.map((filing) => (
              <div
                key={filing.id}
                className="flex items-center gap-4 rounded-lg border border-border bg-surface px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/entity/${filing.client.type}/${filing.client.id}`}
                      className="text-sm font-bold text-ink hover:text-accent"
                    >
                      {filing.client.name}
                    </Link>
                    <span className="font-mono text-[10px] text-muted/40">
                      via
                    </span>
                    <Link
                      href={`/entity/${filing.registrant.type}/${filing.registrant.id}`}
                      className="text-sm text-muted hover:text-ink"
                    >
                      {filing.registrant.name}
                    </Link>
                  </div>
                  {filing.specificIssues && (
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted/70">
                      {filing.specificIssues}
                    </p>
                  )}
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-mono text-sm font-bold text-money-out">
                    {filing.amount > 0
                      ? formatCompactMoney(filing.amount)
                      : "--"}
                  </div>
                  <div className="font-mono text-[10px] text-muted">
                    {filing.filingDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Revolving Door callout */}
      {stats.revolvingDoorCount > 0 && (
        <section className="mt-16">
          <Link
            href="/revolving-door"
            className="block rounded-xl border border-border bg-surface/50 p-6 transition-colors hover:bg-paper"
          >
            <div className="flex items-start gap-4">
              <RefreshCw className="h-6 w-6 shrink-0 text-money-out" />
              <div>
                <h3 className="font-headline text-lg font-bold text-ink">
                  Revolving Door:{" "}
                  <span className="text-money-out">
                    {stats.revolvingDoorCount} Transitions
                  </span>
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {stats.revolvingDoorCount} cross-sector career transitions
                  detected between {data.name.toLowerCase()} entities and
                  government officials. View the full revolving door analysis.
                </p>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Methodology */}
      <div className="mt-12 rounded-lg border border-border bg-surface/50 px-4 py-3">
        <p className="font-mono text-xs text-muted">
          Industry classification uses NAICS codes and keyword matching against
          entity records. Lobbying totals are summed from Senate LDA filings.
          Contract values come from USASpending. ROI = Contracts / (Lobbying +
          PAC Contributions). Revolving door count reflects employment and board
          relationships linking industry entities to government officials.
        </p>
      </div>
    </div>
  );
}

/* ── Stat Card ──────────────────────────────────── */

function StatCard({
  label,
  value,
  sub,
  valueClass = "text-ink",
}: {
  label: string;
  value: string;
  sub: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
        {label}
      </div>
      <div className={`mt-1.5 font-mono text-2xl font-bold ${valueClass}`}>
        {value}
      </div>
      <div className="mt-0.5 font-mono text-[10px] text-muted">{sub}</div>
    </div>
  );
}

/* ── Empty State ────────────────────────────────── */

function EmptyState({ message }: { message: string }) {
  return (
    <div className="mt-6 flex h-40 items-center justify-center rounded-lg border border-dashed border-border">
      <p className="font-mono text-sm text-muted">{message}</p>
    </div>
  );
}
