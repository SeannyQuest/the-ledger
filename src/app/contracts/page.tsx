"use client";

import { useState, useEffect, useCallback } from "react";
import { DollarSign, Loader2, Download } from "lucide-react";
import Link from "next/link";
import { useMode } from "@/context/ModeContext";
import { formatCompactMoney } from "@/lib/utils";
import { ENTITY_COLORS } from "@/lib/constants";
import type { EntityType } from "@/types";

interface ContractorData {
  entityId: string;
  name: string;
  entityType: string;
  totalContracts: number;
  totalDonated: number;
  totalLobbying: number;
  roi: number;
}

export default function ContractsPage() {
  const { mode } = useMode();
  const [contractors, setContractors] = useState<ContractorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    async function fetchContractors() {
      try {
        const res = await fetch("/api/contracts/top");
        if (res.ok) {
          const data = await res.json();
          setContractors(data.contractors ?? []);
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchContractors();
  }, []);

  const handleExport = useCallback(async () => {
    setExporting(true);
    try {
      const res = await fetch("/api/export?type=contractors");
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        res.headers.get("Content-Disposition")?.match(/filename="(.+)"/)?.[1] ??
        "daonra-contractors.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      // Silently fail
    } finally {
      setExporting(false);
    }
  }, []);

  const totalContracts = contractors.reduce((s, c) => s + c.totalContracts, 0);
  const topContractor = contractors[0];
  const avgRoi =
    contractors.length > 0
      ? contractors.reduce((s, c) => s + c.roi, 0) / contractors.length
      : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            {mode === "explore" ? "Government Contracts" : "Research Mode"}
          </div>
          <h1 className="mt-4 font-headline text-5xl font-black tracking-tight text-ink lg:text-6xl">
            {mode === "explore"
              ? "The Return on Investment"
              : "Contracts Dashboard"}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            {mode === "explore"
              ? "How much do corporations spend on politics, and how much do they get back in government contracts?"
              : "Full sortable, filterable table of government contracts with ROI analysis."}
          </p>
        </div>
        {mode === "research" && (
          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-muted hover:border-ink/30 disabled:opacity-50"
          >
            {exporting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {exporting ? "Exporting..." : "Export CSV"}
          </button>
        )}
      </div>

      {/* Summary stats */}
      {!loading && contractors.length > 0 && (
        <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-surface p-5">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
              Total Fed. Contracts
            </div>
            <div className="mt-2 font-mono text-3xl font-bold text-ink">
              {formatCompactMoney(totalContracts)}
            </div>
            <div className="mt-1 font-mono text-xs text-muted">2024 Cycle</div>
          </div>
          <div className="rounded-lg border border-border bg-surface p-5">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
              Top Contractor
            </div>
            <div className="mt-2 font-mono text-3xl font-bold text-accent">
              {formatCompactMoney(topContractor?.totalContracts ?? 0)}
            </div>
            <div className="mt-1 font-mono text-xs text-muted">
              {topContractor?.name ?? "N/A"}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface p-5">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
              Avg. ROI
            </div>
            <div className="mt-2 font-mono text-3xl font-bold text-money-in">
              {avgRoi > 0 ? `${Math.round(avgRoi).toLocaleString()}x` : "N/A"}
            </div>
            <div className="mt-1 font-mono text-xs text-muted">
              Donations vs Contracts
            </div>
          </div>
        </div>
      )}

      {/* Top Contractors */}
      <div className="mt-16">
        <h2 className="font-headline text-3xl font-bold text-ink">
          Top Federal Contractors
        </h2>
        <p className="mt-2 text-sm text-muted">
          Ranked by total contract value, with political donation
          cross-reference.
        </p>

        {loading && (
          <div className="mt-8 flex items-center gap-3 text-muted">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="font-mono text-sm">
              Loading contractor data...
            </span>
          </div>
        )}

        <div className="mt-8 space-y-4">
          {contractors.map((contractor, i) => (
            <Link
              key={contractor.entityId}
              href={`/entity/${contractor.entityType}/${contractor.entityId}`}
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
                      ENTITY_COLORS[contractor.entityType as EntityType] ??
                      "#6b7280",
                  }}
                />
                <div className="min-w-0 flex-1">
                  <div className="font-headline text-lg font-bold text-ink">
                    {contractor.name}
                  </div>
                </div>
                <div className="hidden text-right sm:block">
                  <div className="font-mono text-sm font-bold text-accent">
                    {contractor.roi > 0
                      ? `${Math.round(contractor.roi).toLocaleString()}x`
                      : "N/A"}
                  </div>
                  <div className="font-mono text-xs text-muted">return</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:ml-14 sm:grid-cols-4">
                <div>
                  <div className="font-mono text-xs text-muted">Contracts</div>
                  <div className="font-mono text-sm font-bold text-ink">
                    {formatCompactMoney(contractor.totalContracts)}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-xs text-muted">Donated</div>
                  <div className="font-mono text-sm font-bold text-money-out">
                    {formatCompactMoney(contractor.totalDonated)}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-xs text-muted">Lobbying</div>
                  <div className="font-mono text-sm font-bold text-money-in">
                    {formatCompactMoney(contractor.totalLobbying)}
                  </div>
                </div>
                <div className="sm:hidden">
                  <div className="font-mono text-xs text-muted">ROI</div>
                  <div className="font-mono text-sm font-bold text-accent">
                    {contractor.roi > 0
                      ? `${Math.round(contractor.roi).toLocaleString()}x`
                      : "N/A"}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ROI explanation */}
      <div className="mt-16 rounded-xl border border-border bg-surface/50 p-6">
        <div className="flex items-start gap-4">
          <DollarSign className="h-6 w-6 shrink-0 text-accent" />
          <div>
            <h3 className="font-headline text-lg font-bold text-ink">
              How ROI is Calculated
            </h3>
            <p className="mt-2 text-sm text-muted">
              ROI = Total Government Contracts Received / (Total PAC Donations +
              Lobbying Spend). This measures the &ldquo;return&rdquo;
              corporations get on their political spending. For example, if a
              company spends $8M on donations and lobbying and receives $45B in
              contracts, their ROI is approximately 5,600x. This does not imply
              direct corruption but highlights the correlation between political
              spending and government contract awards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
