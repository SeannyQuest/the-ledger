"use client";

import { useState, useEffect } from "react";
import { Loader2, Factory, TrendingUp, Building2, DollarSign } from "lucide-react";
import Link from "next/link";
import { formatCompactMoney } from "@/lib/utils";

/* ── Types ──────────────────────────────────────── */

interface IndustryCard {
  slug: string;
  name: string;
  description: string;
  entityCount: number;
  totalLobbying: number;
  totalContracts: number;
  roi: number;
}

/* ── Icon map ───────────────────────────────────── */

const INDUSTRY_ICONS: Record<string, typeof Factory> = {
  defense: Factory,
  pharmaceuticals: Factory,
  technology: Factory,
  "oil-gas": Factory,
  finance: Building2,
  insurance: Building2,
  telecom: Factory,
  agriculture: Factory,
};

const INDUSTRY_ACCENT: Record<string, string> = {
  defense: "#dc2626",
  pharmaceuticals: "#0891b2",
  technology: "#2563eb",
  "oil-gas": "#d97706",
  finance: "#059669",
  insurance: "#7c3aed",
  telecom: "#9333ea",
  agriculture: "#16a34a",
};

/* ── Page ───────────────────────────────────────── */

export default function IndustryIndexPage() {
  const [industries, setIndustries] = useState<IndustryCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/industry")
      .then((r) => r.json())
      .then((data) => setIndustries(data.industries ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalLobbying = industries.reduce((s, i) => s + i.totalLobbying, 0);
  const totalContracts = industries.reduce((s, i) => s + i.totalContracts, 0);
  const totalEntities = industries.reduce((s, i) => s + i.entityCount, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      {/* Header */}
      <div>
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Industry Analysis
        </div>
        <h1 className="mt-4 font-headline text-5xl font-black tracking-tight text-ink lg:text-6xl">
          Industry Power Dashboard
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Which industries wield the most political power? Track lobbying
          expenditures, government contracts received, and the revolving door
          between public service and private interest sector by sector.
        </p>
      </div>

      {/* Aggregate stats */}
      {!loading && industries.length > 0 && (
        <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-surface p-5">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
              Total Industry Lobbying
            </div>
            <div className="mt-2 font-mono text-3xl font-bold text-ink">
              {formatCompactMoney(totalLobbying)}
            </div>
            <div className="mt-1 font-mono text-xs text-muted">
              Across all tracked industries
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface p-5">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
              Total Fed. Contracts
            </div>
            <div className="mt-2 font-mono text-3xl font-bold text-accent">
              {formatCompactMoney(totalContracts)}
            </div>
            <div className="mt-1 font-mono text-xs text-muted">
              Awarded to industry entities
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface p-5">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
              Entities Tracked
            </div>
            <div className="mt-2 font-mono text-3xl font-bold text-money-in">
              {totalEntities.toLocaleString()}
            </div>
            <div className="mt-1 font-mono text-xs text-muted">
              Corporations, PACs, lobbying firms
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mt-16 flex items-center gap-3 text-muted">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="font-mono text-sm">Loading industry data...</span>
        </div>
      )}

      {/* Industry grid */}
      <div className="mt-16">
        <h2 className="font-headline text-3xl font-bold text-ink">
          Industries
        </h2>
        <p className="mt-2 text-sm text-muted">
          Select an industry to see its key players, lobbying filings,
          legislation, and revolving door connections.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => {
            const Icon = INDUSTRY_ICONS[industry.slug] ?? Factory;
            const accent = INDUSTRY_ACCENT[industry.slug] ?? "#6b7280";

            return (
              <Link
                key={industry.slug}
                href={`/industry/${industry.slug}`}
                className="group rounded-lg border border-border bg-surface p-5 transition-colors hover:bg-paper"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${accent}15` }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: accent }}
                    />
                  </div>
                  <h3 className="font-headline text-lg font-bold text-ink group-hover:text-accent">
                    {industry.name}
                  </h3>
                </div>

                <p className="mt-3 line-clamp-2 text-sm text-muted">
                  {industry.description}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <div className="font-mono text-[10px] uppercase text-muted">
                      Lobbying
                    </div>
                    <div className="font-mono text-sm font-bold text-money-out">
                      {formatCompactMoney(industry.totalLobbying)}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase text-muted">
                      Contracts
                    </div>
                    <div className="font-mono text-sm font-bold text-money-in">
                      {formatCompactMoney(industry.totalContracts)}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase text-muted">
                      Entities
                    </div>
                    <div className="font-mono text-sm font-bold text-ink">
                      {industry.entityCount.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase text-muted">
                      ROI
                    </div>
                    <div className="font-mono text-sm font-bold text-accent">
                      {industry.roi > 0
                        ? `${industry.roi.toLocaleString()}x`
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {!loading && industries.length === 0 && (
          <div className="mt-8 flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
            <div className="text-center">
              <Factory className="mx-auto h-8 w-8 text-muted/30" />
              <p className="mt-3 font-mono text-sm text-muted">
                No industry data available yet.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Methodology */}
      <div className="mt-16 rounded-xl border border-border bg-surface/50 p-6">
        <div className="flex items-start gap-4">
          <DollarSign className="h-6 w-6 shrink-0 text-accent" />
          <div>
            <h3 className="font-headline text-lg font-bold text-ink">
              How Industry Data is Compiled
            </h3>
            <p className="mt-2 text-sm text-muted">
              Industries are classified using NAICS codes and keyword matching
              against entity records. Lobbying totals are summed from Senate LDA
              disclosure filings. Contract values come from USASpending federal
              award data. ROI is calculated as total contracts received divided by
              total political spending (lobbying + PAC contributions). This does
              not imply direct corruption but highlights the correlation between
              industry political spending and government contract awards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
