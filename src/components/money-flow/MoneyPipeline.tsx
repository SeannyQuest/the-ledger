"use client";

import Link from "next/link";
import { ENTITY_COLORS, PARTY_COLORS } from "@/lib/constants";
import { formatCompactMoney } from "@/lib/utils";
import type { EntityType } from "@/types";

/* ── Types ──────────────────────────────────────────── */

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

export interface PipelineData {
  stages: { sources: number; intermediaries: number; recipients: number; contracts: number };
  stageFlows: Record<string, number>;
  topEntities: Record<string, StageEntity[]>;
  trails: Trail[];
  meta: { totalTracked: number; entityCount: number; flowCount: number };
}

/* ── Stage Config ──────────────────────────────────── */

const STAGES = [
  {
    key: "sources",
    label: "Money Sources",
    sublabel: "Corporations, Individuals, Unions",
    color: "#0a0a0a",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    key: "intermediaries",
    label: "Intermediaries",
    sublabel: "PACs, Super PACs, Lobbying Firms",
    color: "#9333ea",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    key: "recipients",
    label: "Politicians",
    sublabel: "Candidates, Party Committees",
    color: "#2563eb",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    key: "contracts",
    label: "Gov. Contracts",
    sublabel: "Federal Agencies → Back to Corps",
    color: "#059669",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
] as const;

/* ── Component ──────────────────────────────────────── */

export function MoneyPipeline({ data }: { data: PipelineData }) {
  // Get flow amounts between adjacent stages
  const flowBetween = (from: string, to: string): number => {
    let total = 0;
    for (const [key, amount] of Object.entries(data.stageFlows)) {
      if (key.includes(`${from}`) && key.includes(`${to}`)) {
        total += amount;
      }
    }
    return total;
  };

  const stageFlowAmounts = [
    flowBetween("sources", "intermediaries") || flowBetween("sources", "recipients"),
    flowBetween("intermediaries", "recipients"),
    flowBetween("recipients", "contracts") || flowBetween("intermediaries", "contracts") || flowBetween("sources", "contracts"),
  ];

  return (
    <div className="space-y-16">
      {/* ── Pipeline Visualization ──────────────────── */}
      <div>
        {/* Desktop: Horizontal pipeline */}
        <div className="hidden lg:block">
          <div className="flex items-start gap-0">
            {STAGES.map((stage, i) => (
              <div key={stage.key} className="flex flex-1 items-start">
                {/* Stage column */}
                <div className="flex-1">
                  <StageColumn
                    stage={stage}
                    entities={data.topEntities[stage.key] ?? []}
                    total={data.stages[stage.key as keyof typeof data.stages]}
                  />
                </div>
                {/* Arrow between stages */}
                {i < STAGES.length - 1 && (
                  <div className="flex flex-col items-center justify-start pt-14 px-1">
                    <div className="font-mono text-xs font-bold text-accent">
                      {formatCompactMoney(stageFlowAmounts[i] || 0)}
                    </div>
                    <div className="mt-1 flex items-center text-muted">
                      <div className="h-px w-6 bg-border" />
                      <svg className="h-4 w-4 -ml-1 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical pipeline */}
        <div className="lg:hidden space-y-2">
          {STAGES.map((stage, i) => (
            <div key={stage.key}>
              <StageColumn
                stage={stage}
                entities={data.topEntities[stage.key] ?? []}
                total={data.stages[stage.key as keyof typeof data.stages]}
              />
              {i < STAGES.length - 1 && (
                <div className="flex flex-col items-center py-3">
                  <svg className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-mono text-xs font-bold text-accent">
                    {formatCompactMoney(stageFlowAmounts[i] || 0)}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Money Trails ──────────────────────────── */}
      {data.trails.length > 0 && (
        <div>
          <div className="border-t-4 border-ink pt-8">
            <h2 className="font-headline text-2xl font-black text-ink">
              Follow the Money
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Documented money paths showing how corporations invest in politics and receive government contracts in return.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.trails.map((trail, i) => (
              <TrailCard key={i} trail={trail} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Stage Column ──────────────────────────────────── */

function StageColumn({
  stage,
  entities,
  total,
}: {
  stage: (typeof STAGES)[number];
  entities: StageEntity[];
  total: number;
}) {
  return (
    <div>
      {/* Stage header */}
      <div className="rounded-t-xl border-2 px-4 py-4" style={{ borderColor: stage.color }}>
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
            style={{ backgroundColor: stage.color }}
          >
            {stage.icon}
          </div>
          <div>
            <h3 className="font-headline text-sm font-bold text-ink">
              {stage.label}
            </h3>
            <p className="font-mono text-[10px] text-muted">{stage.sublabel}</p>
          </div>
        </div>
        <div className="mt-3 font-mono text-2xl font-black text-ink">
          {formatCompactMoney(total)}
        </div>
      </div>

      {/* Top entities */}
      <div className="space-y-px rounded-b-xl border-2 border-t-0" style={{ borderColor: `${stage.color}33` }}>
        {entities.slice(0, 5).map((entity, i) => (
          <Link
            key={entity.id}
            href={`/entity/${entity.type}/${entity.id}`}
            className="group flex items-center justify-between px-4 py-2.5 transition-colors first:rounded-none last:rounded-b-xl hover:bg-surface"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="font-mono text-[10px] font-bold text-muted/50">
                {i + 1}
              </span>
              <div
                className="h-2 w-2 shrink-0 rounded-full"
                style={{
                  backgroundColor:
                    entity.party
                      ? PARTY_COLORS[entity.party.toLowerCase()] ?? stage.color
                      : ENTITY_COLORS[entity.type as EntityType] ?? stage.color,
                }}
              />
              <span className="truncate text-sm text-ink group-hover:text-accent">
                {entity.name}
              </span>
            </div>
            <span className="shrink-0 pl-2 font-mono text-xs font-bold text-muted">
              {formatCompactMoney(entity.amount)}
            </span>
          </Link>
        ))}
        {entities.length === 0 && (
          <div className="px-4 py-4 text-center font-mono text-xs text-muted">
            No entities in this stage
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Trail Card ────────────────────────────────────── */

function TrailCard({ trail }: { trail: Trail }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-headline text-base font-bold text-ink leading-tight">
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
            {/* Vertical connector line */}
            <div className="flex flex-col items-center">
              <div
                className="h-3 w-3 rounded-full border-2"
                style={{
                  borderColor: ENTITY_COLORS[step.type as EntityType] ?? "#6b7280",
                  backgroundColor: i === 0 || i === trail.steps.length - 1
                    ? ENTITY_COLORS[step.type as EntityType] ?? "#6b7280"
                    : "transparent",
                }}
              />
              {i < trail.steps.length - 1 && (
                <div className="h-6 w-px bg-border" />
              )}
            </div>
            <div className="flex-1 min-w-0 pb-3">
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
