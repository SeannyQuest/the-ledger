"use client";

import { useState, useEffect } from "react";
import { Loader2, ArrowRight, RefreshCw, Clock, Briefcase } from "lucide-react";
import { ENTITY_COLORS } from "@/lib/constants";
import { cn, formatNumber } from "@/lib/utils";
import Link from "next/link";
import type { EntityType } from "@/types";

/* -- Types ------------------------------------------------ */

interface EntityRef {
  id: string;
  name: string;
  type: string;
}

interface Move {
  from: EntityRef;
  to: EntityRef;
  relationshipType: string;
  title: string | null;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean;
}

interface PersonTransition {
  person: EntityRef;
  moves: Move[];
}

interface RelationshipEntry {
  id: string;
  from: EntityRef;
  to: EntityRef;
  type: string;
  title: string | null;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean;
}

interface TimelinePosition {
  organization: {
    id: string;
    name: string;
    type: string;
    industry: string | null;
  };
  role: string | null;
  relationshipType: string;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean;
  sector: "government" | "private" | "other";
}

interface PersonTimeline {
  person: EntityRef;
  positions: TimelinePosition[];
  totalMoves: number;
}

interface IndustryCount {
  industry: string;
  count: number;
}

interface RevolvingDoorData {
  transitions: PersonTransition[];
  timelines: PersonTimeline[];
  allRelationships: RelationshipEntry[];
  stats: {
    totalTransitions: number;
    uniquePeople: number;
    govtToPrivate: number;
    privateToGovt: number;
    totalRelationships: number;
    topIndustries: IndustryCount[];
    avgGovtTenureYears: number;
  };
}

type ViewMode = "transitions" | "timeline" | "all";

/* -- Sector colors ---------------------------------------- */

const SECTOR_STYLES: Record<
  string,
  { bg: string; border: string; dot: string; label: string }
> = {
  government: {
    bg: "bg-blue-50",
    border: "border-blue-300",
    dot: "bg-blue-600",
    label: "Government",
  },
  private: {
    bg: "bg-gray-50",
    border: "border-gray-400",
    dot: "bg-ink",
    label: "Private Sector",
  },
  other: {
    bg: "bg-gray-50",
    border: "border-gray-200",
    dot: "bg-gray-400",
    label: "Other",
  },
};

/* -- Page ------------------------------------------------- */

export default function RevolvingDoorPage() {
  const [data, setData] = useState<RevolvingDoorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>("transitions");

  useEffect(() => {
    fetch("/api/revolving-door")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError("Failed to load revolving door data"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Career Transitions
          </div>
          <h1 className="mt-4 font-headline text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Revolving Door
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Government officials leave for lobbying firms and corporations, then
            return to government. Track the revolving door between public
            service and private interest.
          </p>
        </div>

        <div className="flex shrink-0 items-center rounded-lg border border-border bg-surface p-1">
          <button
            onClick={() => setView("transitions")}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-colors",
              view === "transitions"
                ? "bg-ink text-white"
                : "text-muted hover:text-ink",
            )}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Cross-Sector
          </button>
          <button
            onClick={() => setView("timeline")}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-colors",
              view === "timeline"
                ? "bg-ink text-white"
                : "text-muted hover:text-ink",
            )}
          >
            <Clock className="h-3.5 w-3.5" />
            Timelines
          </button>
          <button
            onClick={() => setView("all")}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-colors",
              view === "all"
                ? "bg-ink text-white"
                : "text-muted hover:text-ink",
            )}
          >
            All Connections
          </button>
        </div>
      </div>

      {/* Stats */}
      {data && !loading && (
        <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-border py-4">
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Total Connections
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {data.stats.totalRelationships}
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Cross-Sector
            </div>
            <div className="font-mono text-2xl font-bold text-accent">
              {data.stats.totalTransitions}
            </div>
          </div>
          {data.stats.govtToPrivate > 0 && (
            <>
              <div className="h-8 w-px bg-border" />
              <div>
                <div className="font-mono text-xs uppercase text-muted">
                  Govt &rarr; Private
                </div>
                <div className="font-mono text-2xl font-bold text-money-out">
                  {data.stats.govtToPrivate}
                </div>
              </div>
            </>
          )}
          {data.stats.privateToGovt > 0 && (
            <>
              <div className="h-8 w-px bg-border" />
              <div>
                <div className="font-mono text-xs uppercase text-muted">
                  Private &rarr; Govt
                </div>
                <div className="font-mono text-2xl font-bold text-money-in">
                  {data.stats.privateToGovt}
                </div>
              </div>
            </>
          )}
          {data.stats.avgGovtTenureYears > 0 && (
            <>
              <div className="h-8 w-px bg-border" />
              <div>
                <div className="font-mono text-xs uppercase text-muted">
                  Avg Govt Tenure
                </div>
                <div className="font-mono text-2xl font-bold text-ink">
                  {data.stats.avgGovtTenureYears}y
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Content */}
      <div className="mt-10">
        {loading && (
          <div className="flex h-96 items-center justify-center">
            <div className="flex items-center gap-3 text-muted">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="font-mono text-sm">
                Loading revolving door data...
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* ── Cross-Sector View ─────────────────── */}
        {!loading && data && view === "transitions" && (
          <div className="space-y-6">
            {data.transitions.length === 0 && (
              <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
                <div className="text-center">
                  <RefreshCw className="mx-auto h-8 w-8 text-muted/30" />
                  <p className="mt-3 font-mono text-sm text-muted">
                    No cross-sector transitions detected yet.
                  </p>
                  <p className="mt-1 text-xs text-muted/60">
                    Revolving door data is built from entity relationship
                    records.
                  </p>
                </div>
              </div>
            )}

            {data.transitions.map((t) => (
              <div
                key={t.person.id}
                className="rounded-lg border border-border bg-surface p-5"
              >
                <Link
                  href={`/entity/${t.person.type}/${t.person.id}`}
                  className="flex items-center gap-2 hover:text-accent"
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor:
                        ENTITY_COLORS[t.person.type as EntityType] ?? "#6b7280",
                    }}
                  />
                  <span className="font-headline text-lg font-bold text-ink">
                    {t.person.name}
                  </span>
                </Link>

                <div className="mt-4 space-y-2">
                  {t.moves.map((move, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-md bg-paper px-3 py-2"
                    >
                      <EntityBadge entity={move.from} />
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted/40" />
                      <EntityBadge entity={move.to} />
                      {move.title && (
                        <span className="ml-auto shrink-0 font-mono text-[10px] text-muted">
                          {move.title}
                        </span>
                      )}
                      {move.startDate && (
                        <span className="shrink-0 font-mono text-[10px] text-muted/60">
                          {move.startDate}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Timeline View ─────────────────────── */}
        {!loading && data && view === "timeline" && (
          <div className="space-y-10">
            {/* Top Industries sidebar */}
            {data.stats.topIndustries &&
              data.stats.topIndustries.length > 0 && (
                <div className="rounded-lg border border-border bg-surface p-5">
                  <h3 className="font-headline text-lg font-bold text-ink">
                    Top Destination Industries
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    Where government officials go when they leave public service
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {data.stats.topIndustries.map((ind) => (
                      <div
                        key={ind.industry}
                        className="flex items-center gap-2 rounded-md border border-border bg-paper px-3 py-1.5"
                      >
                        <Briefcase className="h-3 w-3 text-muted" />
                        <span className="text-xs font-medium text-ink">
                          {ind.industry}
                        </span>
                        <span className="font-mono text-[10px] font-bold text-accent">
                          {formatNumber(ind.count)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Timeline legend */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-8 rounded-sm border border-blue-300 bg-blue-50" />
                <span className="font-mono text-[10px] uppercase text-muted">
                  Government
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-8 rounded-sm border border-gray-400 bg-gray-50" />
                <span className="font-mono text-[10px] uppercase text-muted">
                  Private Sector
                </span>
              </div>
            </div>

            {/* Person timelines */}
            {data.timelines.length === 0 && (
              <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
                <div className="text-center">
                  <Clock className="mx-auto h-8 w-8 text-muted/30" />
                  <p className="mt-3 font-mono text-sm text-muted">
                    No career timelines available yet.
                  </p>
                </div>
              </div>
            )}

            {data.timelines.map((timeline) => (
              <CareerTimeline key={timeline.person.id} timeline={timeline} />
            ))}
          </div>
        )}

        {/* ── All Connections View ──────────────── */}
        {!loading && data && view === "all" && (
          <div className="space-y-2">
            {data.allRelationships.map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3"
              >
                <EntityBadge entity={r.from} />
                <div className="flex flex-col items-center">
                  <span className="rounded bg-border/30 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase text-muted">
                    {r.type.replace(/_/g, " ")}
                  </span>
                  <ArrowRight className="h-3 w-3 text-muted/30" />
                </div>
                <EntityBadge entity={r.to} />
                <div className="ml-auto flex items-center gap-3">
                  {r.title && (
                    <span className="font-mono text-[10px] text-muted">
                      {r.title}
                    </span>
                  )}
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 font-mono text-[10px] font-bold",
                      r.isActive
                        ? "bg-money-in/10 text-money-in"
                        : "bg-border/30 text-muted",
                    )}
                  >
                    {r.isActive ? "Active" : "Ended"}
                  </span>
                </div>
              </div>
            ))}

            {data.allRelationships.length === 0 && (
              <div className="flex h-64 items-center justify-center">
                <p className="font-mono text-sm text-muted">
                  No entity relationships found.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Methodology */}
      <div className="mt-12 rounded-lg border border-border bg-surface/50 px-4 py-3">
        <p className="font-mono text-xs text-muted">
          Revolving door data is derived from entity relationship records in
          Daonra. Cross-sector transitions are identified when employment or
          board membership links connect government entities (politicians,
          agencies) with private entities (corporations, lobbying firms).
          Timelines show the full career path of individuals who have moved
          between sectors.
        </p>
      </div>
    </div>
  );
}

/* -- Career Timeline Component ---------------------------- */

function CareerTimeline({ timeline }: { timeline: PersonTimeline }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      {/* Person header */}
      <Link
        href={`/entity/${timeline.person.type}/${timeline.person.id}`}
        className="flex items-center gap-2 hover:text-accent"
      >
        <div
          className="h-3 w-3 rounded-full"
          style={{
            backgroundColor:
              ENTITY_COLORS[timeline.person.type as EntityType] ?? "#6b7280",
          }}
        />
        <span className="font-headline text-lg font-bold text-ink">
          {timeline.person.name}
        </span>
        <span className="font-mono text-[10px] text-muted">
          {timeline.totalMoves} position{timeline.totalMoves !== 1 ? "s" : ""}
        </span>
      </Link>

      {/* Horizontal timeline bar */}
      <div className="mt-5 overflow-x-auto">
        <div className="flex items-stretch gap-0 min-w-0">
          {timeline.positions.map((pos, i) => {
            const style = SECTOR_STYLES[pos.sector] ?? SECTOR_STYLES.other;
            const isLast = i === timeline.positions.length - 1;

            return (
              <div key={i} className="flex items-stretch min-w-0">
                {/* Position block */}
                <div
                  className={cn(
                    "relative flex flex-col justify-center rounded-md border px-4 py-3 min-w-[180px] max-w-[280px]",
                    style.bg,
                    style.border,
                  )}
                >
                  {/* Sector dot */}
                  <div className="flex items-center gap-2">
                    <div
                      className={cn("h-2 w-2 shrink-0 rounded-full", style.dot)}
                    />
                    <span className="font-mono text-[10px] font-bold uppercase text-muted">
                      {style.label}
                    </span>
                  </div>

                  {/* Organization */}
                  <Link
                    href={`/entity/${pos.organization.type}/${pos.organization.id}`}
                    className="mt-1.5 text-sm font-medium text-ink hover:text-accent"
                  >
                    {pos.organization.name}
                  </Link>

                  {/* Role */}
                  {pos.role && (
                    <span className="mt-0.5 text-xs text-muted">
                      {pos.role}
                    </span>
                  )}

                  {/* Industry */}
                  {pos.organization.industry && (
                    <span className="mt-0.5 font-mono text-[10px] text-muted/60">
                      {pos.organization.industry}
                    </span>
                  )}

                  {/* Dates */}
                  <div className="mt-2 flex items-center gap-1">
                    {pos.startDate && (
                      <span className="font-mono text-[10px] text-muted/80">
                        {pos.startDate}
                      </span>
                    )}
                    {pos.startDate && (pos.endDate || pos.isActive) && (
                      <span className="font-mono text-[10px] text-muted/40">
                        –
                      </span>
                    )}
                    {pos.isActive ? (
                      <span className="rounded bg-money-in/10 px-1 font-mono text-[10px] font-bold text-money-in">
                        Present
                      </span>
                    ) : (
                      pos.endDate && (
                        <span className="font-mono text-[10px] text-muted/80">
                          {pos.endDate}
                        </span>
                      )
                    )}
                  </div>

                  {/* Relationship type badge */}
                  <span className="mt-1.5 self-start rounded bg-border/30 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-muted/60">
                    {pos.relationshipType.replace(/_/g, " ")}
                  </span>
                </div>

                {/* Arrow connector */}
                {!isLast && (
                  <div className="flex items-center px-1">
                    <div className="h-px w-4 bg-border" />
                    <ArrowRight className="h-3 w-3 shrink-0 text-muted/40" />
                    <div className="h-px w-4 bg-border" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* -- Entity Badge ----------------------------------------- */

function EntityBadge({ entity }: { entity: EntityRef }) {
  return (
    <Link
      href={`/entity/${entity.type}/${entity.id}`}
      className="flex items-center gap-1.5 rounded-md px-2 py-1 hover:bg-border/20"
    >
      <div
        className="h-2 w-2 shrink-0 rounded-full"
        style={{
          backgroundColor:
            ENTITY_COLORS[entity.type as EntityType] ?? "#6b7280",
        }}
      />
      <span className="text-xs font-medium text-ink">{entity.name}</span>
      <span className="font-mono text-[10px] text-muted/60">
        {entity.type.replace(/_/g, " ")}
      </span>
    </Link>
  );
}
