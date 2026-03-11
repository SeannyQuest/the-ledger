"use client";

import { useState, useEffect } from "react";
import { Loader2, ArrowRight, RefreshCw } from "lucide-react";
import { ENTITY_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { EntityType } from "@/types";

/* ── Types ──────────────────────────────────────── */

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

interface RevolvingDoorData {
  transitions: PersonTransition[];
  allRelationships: RelationshipEntry[];
  stats: {
    totalTransitions: number;
    uniquePeople: number;
    govtToPrivate: number;
    privateToGovt: number;
    totalRelationships: number;
  };
}

type ViewMode = "transitions" | "all";

/* ── Page ───────────────────────────────────────── */

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
            return to government. Track the revolving door between public service
            and private interest.
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
                  Govt → Private
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
                  Private → Govt
                </div>
                <div className="font-mono text-2xl font-bold text-money-in">
                  {data.stats.privateToGovt}
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
          Revolving door data is derived from entity relationship records in The
          Ledger. Cross-sector transitions are identified when employment or board
          membership links connect government entities (politicians, agencies)
          with private entities (corporations, lobbying firms).
        </p>
      </div>
    </div>
  );
}

/* ── Entity Badge ──────────────────────────────── */

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
