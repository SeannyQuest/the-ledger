"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Loader2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Building2,
  Users,
  Landmark,
  FileText,
} from "lucide-react";
import { formatCompactMoney, formatNumber, cn } from "@/lib/utils";
import { ENTITY_COLORS, ENTITY_LABELS, PARTY_COLORS } from "@/lib/constants";
import type { EntityType } from "@/types";

/* ── Types ──────────────────────────────────────── */

interface StageEntity {
  id: string;
  name: string;
  type: string;
  amount: number;
  party?: string | null;
  state?: string | null;
}

interface Trail {
  label: string;
  steps: Array<{
    entity: string;
    entityId: string;
    type: string;
    amount: number;
  }>;
  roiMultiple: number | null;
}

interface PipelineData {
  stages: {
    sources: number;
    intermediaries: number;
    recipients: number;
    contracts: number;
  };
  stageFlows: Record<string, number>;
  topEntities: Record<string, StageEntity[]>;
  trails: Trail[];
  meta: { totalTracked: number; entityCount: number; flowCount: number };
}

interface FlowLink {
  source: string;
  target: string;
  amount: number;
  transactionCount: number;
  dateRange: { start: string; end: string };
  flowType: string;
}

interface FlowNode {
  id: string;
  entityType: string;
  name: string;
  totalAmount: number;
}

interface FlowData {
  nodes: FlowNode[];
  links: FlowLink[];
  meta: { totalAmount: number; truncated: boolean };
}

type SortKey = "amount" | "transactions" | "source" | "target";
type SortDir = "asc" | "desc";

/* ── Stage config ──────────────────────────────── */

const STAGES = [
  {
    key: "sources",
    label: "Sources",
    sub: "Corporations & Individuals",
    color: "#0a0a0a",
    icon: Building2,
  },
  {
    key: "intermediaries",
    label: "Intermediaries",
    sub: "PACs & Lobbying Firms",
    color: "#9333ea",
    icon: Users,
  },
  {
    key: "recipients",
    label: "Politicians",
    sub: "Candidates & Committees",
    color: "#2563eb",
    icon: Landmark,
  },
  {
    key: "contracts",
    label: "Contracts",
    sub: "Federal Awards → Back to Corps",
    color: "#059669",
    icon: FileText,
  },
] as const;

const FLOW_TYPE_LABELS: Record<string, string> = {
  corporate_contribution: "Corporate Donation",
  individual_contribution: "Individual Donation",
  pac_contribution: "PAC Contribution",
  party_contribution: "Party Contribution",
  lobbying_payment: "Lobbying",
  federal_contract: "Federal Contract",
  federal_grant: "Federal Grant",
  donation: "Donation",
  lobbying: "Lobbying",
  contract: "Contract",
  pac_transfer: "PAC Transfer",
  independent_expenditure: "Indep. Expenditure",
};

const FLOW_TYPE_COLORS: Record<string, string> = {
  corporate_contribution: "#1a7a3a",
  individual_contribution: "#16a34a",
  pac_contribution: "#9333ea",
  party_contribution: "#4f46e5",
  lobbying_payment: "#d97706",
  federal_contract: "#2563eb",
  federal_grant: "#0891b2",
  donation: "#1a7a3a",
  lobbying: "#d97706",
  contract: "#2563eb",
  pac_transfer: "#9333ea",
  independent_expenditure: "#c41d1d",
};

/* ── Page ───────────────────────────────────────── */

export default function MoneyFlowPage() {
  const [pipeline, setPipeline] = useState<PipelineData | null>(null);
  const [flows, setFlows] = useState<FlowData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Table state
  const [sortKey, setSortKey] = useState<SortKey>("amount");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [showAllConnections, setShowAllConnections] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/money-flow/pipeline").then((r) => r.json()),
      fetch("/api/money-flow?minAmount=1000&limit=200").then((r) => r.json()),
    ])
      .then(([p, f]) => {
        setPipeline(p);
        setFlows(f);
      })
      .catch(() => setError("Failed to load money flow data"))
      .finally(() => setLoading(false));
  }, []);

  // Build node lookup
  const nodeMap = new Map<string, FlowNode>();
  flows?.nodes.forEach((n) => nodeMap.set(n.id, n));

  // Sort and filter connections
  const connections = (flows?.links ?? [])
    .filter((l) => !typeFilter || l.flowType === typeFilter)
    .sort((a, b) => {
      const dir = sortDir === "desc" ? -1 : 1;
      switch (sortKey) {
        case "amount":
          return (a.amount - b.amount) * dir;
        case "transactions":
          return (a.transactionCount - b.transactionCount) * dir;
        case "source":
          return (
            (nodeMap.get(a.source)?.name ?? "").localeCompare(
              nodeMap.get(b.source)?.name ?? "",
            ) * dir
          );
        case "target":
          return (
            (nodeMap.get(a.target)?.name ?? "").localeCompare(
              nodeMap.get(b.target)?.name ?? "",
            ) * dir
          );
        default:
          return 0;
      }
    });

  const visibleConnections = showAllConnections
    ? connections
    : connections.slice(0, 25);

  // Unique flow types for filter
  const flowTypes = [...new Set(flows?.links.map((l) => l.flowType) ?? [])];

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "desc" ? "asc" : "desc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
      {/* Header */}
      <div>
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Follow the Money
        </div>
        <h1 className="mt-4 font-headline text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
          The Money Pipeline
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          How money flows from corporations through PACs to politicians, and
          back again through government contracts.
        </p>
      </div>

      {/* Stats */}
      {pipeline && !loading && (
        <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-border py-4">
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Total Tracked
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {formatCompactMoney(pipeline.meta.totalTracked)}
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Entities
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {formatNumber(pipeline.meta.entityCount)}
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Money Flows
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {formatNumber(pipeline.meta.flowCount)}
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex h-96 items-center justify-center">
          <div className="flex items-center gap-3 text-muted">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="font-mono text-sm">
              Loading money flow data...
            </span>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {!loading && pipeline && (
        <>
          {/* ── Section 1: Aggregate Flow Ribbon ─────── */}
          <div className="mt-10">
            <AggregateFlow pipeline={pipeline} />
          </div>

          {/* ── Section 2: Top Connections Table ──────── */}
          <div className="mt-16">
            <div className="border-t-4 border-ink pt-8">
              <h2 className="font-headline text-2xl font-black text-ink">
                Top Connections
              </h2>
              <p className="mt-1 text-sm text-muted">
                The largest individual money flows between entities, ranked by
                amount.
              </p>
            </div>

            {/* Flow type filters */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => setTypeFilter(null)}
                className={cn(
                  "rounded-full px-3 py-1 font-mono text-[10px] font-bold transition-colors",
                  !typeFilter
                    ? "bg-ink text-white"
                    : "bg-border/30 text-muted hover:text-ink",
                )}
              >
                All
              </button>
              {flowTypes.map((ft) => (
                <button
                  key={ft}
                  onClick={() => setTypeFilter(typeFilter === ft ? null : ft)}
                  className={cn(
                    "rounded-full px-3 py-1 font-mono text-[10px] font-bold transition-colors",
                    typeFilter === ft
                      ? "text-white"
                      : "bg-border/30 text-muted hover:text-ink",
                  )}
                  style={
                    typeFilter === ft
                      ? { backgroundColor: FLOW_TYPE_COLORS[ft] ?? "#6b7280" }
                      : undefined
                  }
                >
                  {FLOW_TYPE_LABELS[ft] ?? ft.replace(/_/g, " ")}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-ink">
                    <th className="pb-2 pr-2 text-left font-mono text-[10px] font-bold uppercase text-muted">
                      #
                    </th>
                    <SortHeader
                      label="Source"
                      sortKey="source"
                      current={sortKey}
                      dir={sortDir}
                      onSort={toggleSort}
                    />
                    <th className="pb-2 px-2 text-center font-mono text-[10px] font-bold uppercase text-muted">
                      Type
                    </th>
                    <SortHeader
                      label="Target"
                      sortKey="target"
                      current={sortKey}
                      dir={sortDir}
                      onSort={toggleSort}
                    />
                    <SortHeader
                      label="Amount"
                      sortKey="amount"
                      current={sortKey}
                      dir={sortDir}
                      onSort={toggleSort}
                      align="right"
                    />
                    <SortHeader
                      label="Txns"
                      sortKey="transactions"
                      current={sortKey}
                      dir={sortDir}
                      onSort={toggleSort}
                      align="right"
                    />
                  </tr>
                </thead>
                <tbody>
                  {visibleConnections.map((link, i) => {
                    const source = nodeMap.get(link.source);
                    const target = nodeMap.get(link.target);
                    return (
                      <tr
                        key={`${link.source}-${link.target}-${link.flowType}-${i}`}
                        className="border-b border-border/50 transition-colors hover:bg-surface"
                      >
                        <td className="py-2.5 pr-2 font-mono text-[10px] text-muted/50">
                          {i + 1}
                        </td>
                        <td className="py-2.5 pr-2">
                          <EntityCell entity={source} />
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <FlowTypeBadge type={link.flowType} />
                        </td>
                        <td className="py-2.5 pr-2">
                          <EntityCell entity={target} />
                        </td>
                        <td className="py-2.5 pr-2 text-right font-mono text-sm font-bold text-ink">
                          {formatCompactMoney(link.amount)}
                        </td>
                        <td className="py-2.5 text-right font-mono text-xs text-muted">
                          {formatNumber(link.transactionCount)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {connections.length > 25 && (
              <button
                onClick={() => setShowAllConnections(!showAllConnections)}
                className="mt-4 flex items-center gap-1.5 font-mono text-xs font-bold text-accent hover:underline"
              >
                {showAllConnections ? (
                  <>
                    <ChevronUp className="h-3.5 w-3.5" />
                    Show top 25
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3.5 w-3.5" />
                    Show all {connections.length} connections
                  </>
                )}
              </button>
            )}

            {connections.length === 0 && (
              <div className="mt-4 py-8 text-center font-mono text-sm text-muted">
                No connections match the current filter.
              </div>
            )}
          </div>

          {/* ── Section 3: Money Trails (ROI) ────────── */}
          {pipeline.trails.length > 0 && (
            <div className="mt-16">
              <div className="border-t-4 border-ink pt-8">
                <h2 className="font-headline text-2xl font-black text-ink">
                  Follow the Money
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-muted">
                  Corporations invest in politics and receive government
                  contracts in return. These trails show the documented
                  round-trip.
                </p>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pipeline.trails.map((trail, i) => (
                  <TrailCard key={i} trail={trail} />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Methodology */}
      <div className="mt-12 rounded-lg border border-border bg-surface/50 px-4 py-3">
        <p className="font-mono text-xs text-muted">
          Data sourced from FEC, USASpending.gov, and Senate LDA. Flows
          represent aggregate transactions between entities for the 2024
          election cycle. Click any entity to view their full profile.
        </p>
      </div>
    </div>
  );
}

/* ── Aggregate Flow Ribbon ────────────────────── */

function AggregateFlow({ pipeline }: { pipeline: PipelineData }) {
  const getFlow = (from: string, to: string): number => {
    let total = 0;
    for (const [key, amount] of Object.entries(pipeline.stageFlows)) {
      if (key.includes(from) && key.includes(to)) {
        total += amount;
      }
    }
    return total;
  };

  const flowAmounts = [
    getFlow("sources", "intermediaries") || getFlow("sources", "recipients"),
    getFlow("intermediaries", "recipients"),
    getFlow("recipients", "contracts") ||
      getFlow("intermediaries", "contracts") ||
      getFlow("sources", "contracts"),
  ];

  // Calculate widths proportional to amounts
  const stageTotals = STAGES.map(
    (s) => pipeline.stages[s.key as keyof typeof pipeline.stages],
  );
  const maxStage = Math.max(...stageTotals, 1);

  return (
    <div>
      {/* Desktop: Horizontal flow */}
      <div className="hidden lg:block">
        <div className="flex items-stretch gap-0">
          {STAGES.map((stage, i) => {
            const Icon = stage.icon;
            const total = stageTotals[i];
            const barHeight = Math.max(20, (total / maxStage) * 100);
            const entities = pipeline.topEntities[stage.key] ?? [];

            return (
              <div key={stage.key} className="flex flex-1 items-stretch">
                {/* Stage card */}
                <div className="flex-1 rounded-xl border border-border bg-surface p-4 transition-shadow hover:shadow-md">
                  {/* Header */}
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                      style={{ backgroundColor: stage.color }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-ink">
                        {stage.label}
                      </div>
                      <div className="font-mono text-[9px] text-muted">
                        {stage.sub}
                      </div>
                    </div>
                  </div>

                  {/* Amount bar */}
                  <div className="mt-3 font-mono text-xl font-black text-ink">
                    {formatCompactMoney(total)}
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-border/30">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${barHeight}%`,
                        backgroundColor: stage.color,
                      }}
                    />
                  </div>

                  {/* Top 3 entities */}
                  <div className="mt-3 space-y-1">
                    {entities.slice(0, 3).map((e, j) => (
                      <Link
                        key={e.id}
                        href={`/entity/${e.type}/${e.id}`}
                        className="flex items-center justify-between gap-2 rounded-md px-1.5 py-1 transition-colors hover:bg-border/20"
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="font-mono text-[9px] text-muted/40">
                            {j + 1}
                          </span>
                          <div
                            className="h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{
                              backgroundColor: e.party
                                ? (PARTY_COLORS[e.party.toLowerCase()] ??
                                  stage.color)
                                : (ENTITY_COLORS[e.type as EntityType] ??
                                  stage.color),
                            }}
                          />
                          <span className="truncate text-xs text-ink">
                            {e.name}
                          </span>
                        </div>
                        <span className="shrink-0 font-mono text-[10px] text-muted">
                          {formatCompactMoney(e.amount)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Flow arrow between stages */}
                {i < STAGES.length - 1 && (
                  <div className="flex w-16 flex-col items-center justify-center">
                    <div className="font-mono text-[10px] font-bold text-accent">
                      {formatCompactMoney(flowAmounts[i] || 0)}
                    </div>
                    <div className="mt-0.5 flex items-center">
                      <div className="h-px w-4 bg-accent/40" />
                      <ArrowRight className="h-4 w-4 -ml-0.5 text-accent" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: Vertical flow */}
      <div className="space-y-0 lg:hidden">
        {STAGES.map((stage, i) => {
          const Icon = stage.icon;
          const total = stageTotals[i];
          const entities = pipeline.topEntities[stage.key] ?? [];

          return (
            <div key={stage.key}>
              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                      style={{ backgroundColor: stage.color }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-ink">
                        {stage.label}
                      </div>
                      <div className="font-mono text-[9px] text-muted">
                        {stage.sub}
                      </div>
                    </div>
                  </div>
                  <div className="font-mono text-lg font-black text-ink">
                    {formatCompactMoney(total)}
                  </div>
                </div>

                {/* Top 3 entities */}
                <div className="mt-3 space-y-1">
                  {entities.slice(0, 3).map((e, j) => (
                    <Link
                      key={e.id}
                      href={`/entity/${e.type}/${e.id}`}
                      className="flex items-center justify-between gap-2 rounded-md px-1.5 py-1 transition-colors hover:bg-border/20"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="font-mono text-[9px] text-muted/40">
                          {j + 1}
                        </span>
                        <div
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{
                            backgroundColor:
                              ENTITY_COLORS[e.type as EntityType] ??
                              stage.color,
                          }}
                        />
                        <span className="truncate text-xs text-ink">
                          {e.name}
                        </span>
                      </div>
                      <span className="shrink-0 font-mono text-[10px] text-muted">
                        {formatCompactMoney(e.amount)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Flow arrow */}
              {i < STAGES.length - 1 && (
                <div className="flex flex-col items-center py-2">
                  <div className="h-4 w-px bg-accent/40" />
                  <ArrowRight className="h-4 w-4 rotate-90 text-accent" />
                  <div className="font-mono text-[10px] font-bold text-accent">
                    {formatCompactMoney(flowAmounts[i] || 0)}
                  </div>
                  <div className="h-2 w-px bg-accent/40" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Table Components ─────────────────────────── */

function SortHeader({
  label,
  sortKey,
  current,
  dir,
  onSort,
  align = "left",
}: {
  label: string;
  sortKey: SortKey;
  current: SortKey;
  dir: SortDir;
  onSort: (key: SortKey) => void;
  align?: "left" | "right";
}) {
  const isActive = current === sortKey;
  return (
    <th
      className={cn(
        "cursor-pointer select-none pb-2 px-2 font-mono text-[10px] font-bold uppercase transition-colors hover:text-ink",
        align === "right" ? "text-right" : "text-left",
        isActive ? "text-ink" : "text-muted",
      )}
      onClick={() => onSort(sortKey)}
    >
      <span className="inline-flex items-center gap-0.5">
        {label}
        {isActive && (
          <span className="text-accent">
            {dir === "desc" ? " \u25BC" : " \u25B2"}
          </span>
        )}
      </span>
    </th>
  );
}

function EntityCell({ entity }: { entity: FlowNode | undefined }) {
  if (!entity) return <span className="text-xs text-muted">Unknown</span>;
  return (
    <Link
      href={`/entity/${entity.entityType}/${entity.id}`}
      className="group flex items-center gap-1.5"
    >
      <div
        className="h-2 w-2 shrink-0 rounded-full"
        style={{
          backgroundColor:
            ENTITY_COLORS[entity.entityType as EntityType] ?? "#6b7280",
        }}
      />
      <span className="text-sm text-ink group-hover:text-accent">
        {entity.name}
      </span>
      <span className="font-mono text-[9px] text-muted/60">
        {ENTITY_LABELS[entity.entityType as EntityType] ??
          entity.entityType.replace(/_/g, " ")}
      </span>
    </Link>
  );
}

function FlowTypeBadge({ type }: { type: string }) {
  return (
    <span
      className="inline-block whitespace-nowrap rounded-full px-2 py-0.5 font-mono text-[9px] font-bold text-white"
      style={{ backgroundColor: FLOW_TYPE_COLORS[type] ?? "#6b7280" }}
    >
      {FLOW_TYPE_LABELS[type] ?? type.replace(/_/g, " ")}
    </span>
  );
}

/* ── Trail Card ───────────────────────────────── */

function TrailCard({ trail }: { trail: Trail }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-headline text-base font-bold leading-tight text-ink">
          {trail.label}
        </h3>
        {trail.roiMultiple && trail.roiMultiple > 1 && (
          <span className="shrink-0 rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-xs font-bold text-accent">
            {trail.roiMultiple}x ROI
          </span>
        )}
      </div>

      <div className="mt-4 space-y-0">
        {trail.steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div
                className="h-3 w-3 rounded-full border-2"
                style={{
                  borderColor:
                    ENTITY_COLORS[step.type as EntityType] ?? "#6b7280",
                  backgroundColor:
                    i === 0 || i === trail.steps.length - 1
                      ? (ENTITY_COLORS[step.type as EntityType] ?? "#6b7280")
                      : "transparent",
                }}
              />
              {i < trail.steps.length - 1 && (
                <div className="h-6 w-px bg-border" />
              )}
            </div>
            <div className="min-w-0 flex-1 pb-3">
              <Link
                href={`/entity/${step.type}/${step.entityId}`}
                className="text-sm text-ink hover:text-accent"
              >
                {step.entity}
              </Link>
              <span className="ml-2 font-mono text-xs text-muted">
                {formatCompactMoney(step.amount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
