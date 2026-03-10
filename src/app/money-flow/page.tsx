"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Loader2, BarChart3, GitBranch } from "lucide-react";
import { useMode } from "@/context/ModeContext";
import { formatCompactMoney, formatNumber } from "@/lib/utils";
import { MoneyPipeline, type PipelineData } from "@/components/money-flow/MoneyPipeline";
import { FLOW_TYPE_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SankeyDiagram = dynamic(
  () =>
    import("@/components/money-flow/SankeyDiagram").then(
      (m) => m.SankeyDiagram,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex aspect-[16/9] items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface">
        <Loader2 className="h-5 w-5 animate-spin text-muted" />
      </div>
    ),
  },
);

/* ── Types ──────────────────────────────────────── */

interface FlowData {
  nodes: Array<{ id: string; entityId: string; entityType: string; name: string; totalAmount: number }>;
  links: Array<{ source: string; target: string; amount: number; transactionCount: number; dateRange: { start: string; end: string }; flowType: string }>;
  meta: { totalAmount: number; truncated: boolean };
}

type ViewMode = "pipeline" | "sankey";

/* ── Page ───────────────────────────────────────── */

export default function MoneyFlowPage() {
  const { mode } = useMode();
  const [view, setView] = useState<ViewMode>("pipeline");

  // Pipeline data
  const [pipelineData, setPipelineData] = useState<PipelineData | null>(null);
  const [pipelineLoading, setPipelineLoading] = useState(true);

  // Sankey data (lazy-loaded only when switching to sankey view)
  const [sankeyData, setSankeyData] = useState<FlowData | null>(null);
  const [sankeyLoading, setSankeyLoading] = useState(false);
  const [minAmount, setMinAmount] = useState(10000);

  const [error, setError] = useState<string | null>(null);

  // Fetch pipeline data on mount
  useEffect(() => {
    fetch("/api/money-flow/pipeline")
      .then((r) => r.json())
      .then(setPipelineData)
      .catch(() => setError("Failed to load pipeline data"))
      .finally(() => setPipelineLoading(false));
  }, []);

  // Fetch sankey data only when sankey view is active
  useEffect(() => {
    if (view !== "sankey") return;
    if (sankeyData && !sankeyLoading) return; // Already loaded

    setSankeyLoading(true);
    fetch(`/api/money-flow?minAmount=${minAmount}&limit=200`)
      .then((r) => r.json())
      .then(setSankeyData)
      .catch(() => setError("Failed to load flow data"))
      .finally(() => setSankeyLoading(false));
  }, [view, minAmount]);

  const handleNodeClick = (entityId: string) => {
    window.location.href = `/entity/corporation/${entityId}`;
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Follow the Money
          </div>
          <h1 className="mt-4 font-headline text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
            The Money Pipeline
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            How money flows from corporations through PACs to politicians — and back again through government contracts.
          </p>
        </div>

        {/* View toggle */}
        <div className="flex shrink-0 items-center rounded-lg border border-border bg-surface p-1">
          <button
            onClick={() => setView("pipeline")}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-colors",
              view === "pipeline"
                ? "bg-ink text-white"
                : "text-muted hover:text-ink",
            )}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            Pipeline
          </button>
          <button
            onClick={() => setView("sankey")}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-colors",
              view === "sankey"
                ? "bg-ink text-white"
                : "text-muted hover:text-ink",
            )}
          >
            <GitBranch className="h-3.5 w-3.5" />
            Sankey
          </button>
        </div>
      </div>

      {/* Stats bar */}
      {pipelineData && !pipelineLoading && (
        <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-border py-4">
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Total Tracked
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {formatCompactMoney(pipelineData.meta.totalTracked)}
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Entities
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {formatNumber(pipelineData.meta.entityCount)}
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Money Flows
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {formatNumber(pipelineData.meta.flowCount)}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="mt-10">
        {/* ── Pipeline View ──────────────────────── */}
        {view === "pipeline" && (
          <>
            {pipelineLoading && (
              <div className="flex h-96 items-center justify-center">
                <div className="flex items-center gap-3 text-muted">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="font-mono text-sm">Loading pipeline...</span>
                </div>
              </div>
            )}
            {!pipelineLoading && pipelineData && (
              <MoneyPipeline data={pipelineData} />
            )}
          </>
        )}

        {/* ── Sankey View ────────────────────────── */}
        {view === "sankey" && (
          <>
            {/* Sankey controls */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <label className="font-mono text-xs text-muted">Min Amount</label>
              <select
                value={minAmount}
                onChange={(e) => {
                  setMinAmount(Number(e.target.value));
                  setSankeyData(null); // Force refetch
                }}
                className="rounded border border-border bg-surface px-2 py-1 font-mono text-xs text-ink"
              >
                <option value={1000}>$1K+</option>
                <option value={10000}>$10K+</option>
                <option value={100000}>$100K+</option>
                <option value={1000000}>$1M+</option>
                <option value={10000000}>$10M+</option>
              </select>

              {/* Legend */}
              {sankeyData && (
                <div className="flex flex-wrap gap-3 ml-auto">
                  {getUniqueFlowTypes(sankeyData.links).map((type) => (
                    <div key={type} className="flex items-center gap-1.5">
                      <div
                        className="h-2.5 w-2.5 rounded-sm"
                        style={{ backgroundColor: getFlowColor(type) }}
                      />
                      <span className="font-mono text-[10px] text-muted">
                        {type.replace(/_/g, " ")}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {sankeyLoading && (
              <div className="flex aspect-[16/9] items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface">
                <div className="flex items-center gap-3 text-muted">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="font-mono text-sm">Loading Sankey diagram...</span>
                </div>
              </div>
            )}

            {!sankeyLoading && sankeyData && sankeyData.nodes.length > 0 && (
              <div className="rounded-xl border border-border bg-surface p-4">
                <SankeyDiagram
                  nodes={sankeyData.nodes.map((n) => ({
                    id: n.id,
                    entityType: n.entityType as any,
                    name: n.name,
                    totalAmount: n.totalAmount,
                  }))}
                  links={sankeyData.links.map((l) => ({
                    source: l.source,
                    target: l.target,
                    amount: l.amount,
                    flowType: l.flowType,
                    transactionCount: l.transactionCount,
                  }))}
                  onNodeClick={handleNodeClick}
                />
              </div>
            )}

            {!sankeyLoading && sankeyData && sankeyData.nodes.length === 0 && (
              <div className="flex aspect-[16/9] items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface">
                <p className="text-sm text-muted">
                  No money flows found. Try lowering the minimum amount filter.
                </p>
              </div>
            )}
          </>
        )}

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>

      {/* Methodology note */}
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

/* ── Helpers ──────────────────────────────────── */

function getUniqueFlowTypes(links: Array<{ flowType: string }>): string[] {
  return [...new Set(links.map((l) => l.flowType))];
}

function getFlowColor(type: string): string {
  const map: Record<string, string> = {
    corporate_contribution: "#1a7a3a",
    individual_contribution: "#16a34a",
    pac_contribution: "#9333ea",
    party_contribution: "#4f46e5",
    lobbying_payment: "#d97706",
    federal_contract: "#2563eb",
    federal_grant: "#0891b2",
    ...FLOW_TYPE_COLORS,
  };
  return map[type] ?? "#6b7280";
}
