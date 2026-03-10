"use client";

import {
  Suspense,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Columns2,
  Loader2,
  X,
  Search,
  ArrowRight,
  TrendingUp,
  Users,
} from "lucide-react";
import { ENTITY_COLORS, ENTITY_LABELS } from "@/lib/constants";
import { formatCompactMoney, formatMoney } from "@/lib/utils";
import { EntityBadge } from "@/components/shared/EntityBadge";
import type { EntityType, Entity } from "@/types";

// ─── Types ──────────────────────────────────────────────────────────────────

interface FlowEntity {
  entityId: string;
  name: string;
  type?: string;
  amount: number;
  transactionCount: number;
}

interface EntityDetail {
  entity: Entity & {
    party?: string;
    state?: string;
    office?: string;
    industry?: string;
    ticker?: string;
    photoUrl?: string;
  };
  topDonors: FlowEntity[];
  topRecipients: FlowEntity[];
  relationships: Array<{
    type: string;
    direction: string;
    entity: { id: string; type: string; canonicalName: string };
    title?: string;
  }>;
}

interface ComparisonMetric {
  label: string;
  key: keyof Pick<
    Entity,
    | "totalReceived"
    | "totalSpent"
    | "totalContributed"
    | "totalLobbying"
    | "totalContracts"
  >;
}

interface SearchResultItem {
  entity: Entity & {
    party?: string;
    state?: string;
    office?: string;
    industry?: string;
    ticker?: string;
  };
  matchField: string;
  matchHighlight: string;
  score: number;
}

// ─── Constants ──────────────────────────────────────────────────────────────

const METRICS: ComparisonMetric[] = [
  { label: "Total Received", key: "totalReceived" },
  { label: "Total Spent", key: "totalSpent" },
  { label: "Total Contributed", key: "totalContributed" },
  { label: "Lobbying Spend", key: "totalLobbying" },
  { label: "Gov. Contracts", key: "totalContracts" },
];

const MAX_SLOTS = 3;

// ─── Page Wrapper ───────────────────────────────────────────────────────────

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted" />
        </div>
      }
    >
      <ComparePageInner />
    </Suspense>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

function ComparePageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read initial entity IDs from URL params
  const initialIds = useMemo(() => {
    const ids: string[] = [];
    const a = searchParams.get("a");
    const b = searchParams.get("b");
    const c = searchParams.get("c");
    if (a) ids.push(a);
    if (b) ids.push(b);
    if (c) ids.push(c);
    return ids;
  }, [searchParams]);

  const [slotCount, setSlotCount] = useState(Math.max(2, initialIds.length));
  const [selectedIds, setSelectedIds] = useState<(string | null)[]>(() => {
    const ids: (string | null)[] = [...initialIds];
    while (ids.length < Math.max(2, initialIds.length)) ids.push(null);
    return ids;
  });
  const [entityData, setEntityData] = useState<(EntityDetail | null)[]>([]);
  const [loadingEntities, setLoadingEntities] = useState<boolean[]>([]);

  // Update URL when selection changes
  const updateUrl = useCallback(
    (ids: (string | null)[]) => {
      const params = new URLSearchParams();
      const keys = ["a", "b", "c"];
      ids.forEach((id, i) => {
        if (id && keys[i]) params.set(keys[i], id);
      });
      const qs = params.toString();
      router.replace(qs ? `?${qs}` : "/compare", { scroll: false });
    },
    [router],
  );

  // Fetch entity detail — the API route resolves by ID regardless of type segment
  const fetchEntityDetail = useCallback(
    async (id: string): Promise<EntityDetail | null> => {
      try {
        const res = await fetch(`/api/entity/_/${id}`);
        if (!res.ok) return null;
        return await res.json();
      } catch {
        return null;
      }
    },
    [],
  );

  // Load initial entities from URL params
  useEffect(() => {
    if (initialIds.length === 0) return;

    const loadInitial = async () => {
      const newLoading = initialIds.map(() => true);
      setLoadingEntities(newLoading);

      const results = await Promise.all(
        initialIds.map((id) => fetchEntityDetail(id)),
      );
      setEntityData(results);
      setLoadingEntities(initialIds.map(() => false));
    };
    loadInitial();
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectEntity = useCallback(
    async (slotIndex: number, entity: SearchResultItem["entity"]) => {
      const newIds = [...selectedIds];
      newIds[slotIndex] = entity.id;
      setSelectedIds(newIds);
      updateUrl(newIds);

      // Fetch entity detail
      const newLoading = [...loadingEntities];
      newLoading[slotIndex] = true;
      setLoadingEntities(newLoading);

      const detail = await fetchEntityDetail(entity.id);
      setEntityData((prev) => {
        const updated = [...prev];
        updated[slotIndex] = detail;
        return updated;
      });
      setLoadingEntities((prev) => {
        const updated = [...prev];
        updated[slotIndex] = false;
        return updated;
      });
    },
    [selectedIds, loadingEntities, fetchEntityDetail, updateUrl],
  );

  const handleClearSlot = useCallback(
    (slotIndex: number) => {
      const newIds = [...selectedIds];
      newIds[slotIndex] = null;
      setSelectedIds(newIds);
      updateUrl(newIds);
      setEntityData((prev) => {
        const updated = [...prev];
        updated[slotIndex] = null;
        return updated;
      });
    },
    [selectedIds, updateUrl],
  );

  const handleAddSlot = useCallback(() => {
    if (slotCount < MAX_SLOTS) {
      setSlotCount(slotCount + 1);
      setSelectedIds((prev) => [...prev, null]);
    }
  }, [slotCount]);

  const handleRemoveSlot = useCallback(
    (index: number) => {
      if (slotCount <= 2) return;
      setSlotCount(slotCount - 1);
      setSelectedIds((prev) => prev.filter((_, i) => i !== index));
      setEntityData((prev) => prev.filter((_, i) => i !== index));
      setLoadingEntities((prev) => prev.filter((_, i) => i !== index));
      // Update URL
      const remaining = selectedIds.filter((_, i) => i !== index);
      updateUrl(remaining);
    },
    [slotCount, selectedIds, updateUrl],
  );

  // Loaded entities for comparison
  const loadedEntities = entityData.filter(
    (d): d is EntityDetail => d !== null,
  );
  const hasComparison = loadedEntities.length >= 2;

  // Compute shared connections
  const sharedConnections = useMemo(() => {
    if (loadedEntities.length < 2) return [];

    // Collect all flow entity IDs for each loaded entity
    const flowMaps = loadedEntities.map((detail) => {
      const map = new Map<
        string,
        { name: string; type?: string; amounts: number[] }
      >();
      for (const d of detail.topDonors) {
        map.set(d.entityId, {
          name: d.name,
          type: d.type,
          amounts: [d.amount],
        });
      }
      for (const r of detail.topRecipients) {
        const existing = map.get(r.entityId);
        if (existing) {
          existing.amounts.push(r.amount);
        } else {
          map.set(r.entityId, {
            name: r.name,
            type: r.type,
            amounts: [r.amount],
          });
        }
      }
      return map;
    });

    // Find IDs present in all flow maps
    const firstMap = flowMaps[0];
    const shared: Array<{ entityId: string; name: string; type?: string }> = [];

    for (const [entityId, info] of firstMap) {
      // Exclude the compared entities themselves
      const isComparedEntity = loadedEntities.some(
        (e) => e.entity.id === entityId,
      );
      if (isComparedEntity) continue;

      const inAll = flowMaps.every((m) => m.has(entityId));
      if (inAll) {
        shared.push({ entityId, name: info.name, type: info.type });
      }
    }

    return shared;
  }, [loadedEntities]);

  // Generate insights
  const insights = useMemo(() => {
    if (loadedEntities.length < 2) return [];

    const results: Array<{ text: string; icon: "trending" | "compare" }> = [];

    for (const metric of METRICS) {
      const values = loadedEntities.map((d) => ({
        name: d.entity.shortName || d.entity.name,
        value: d.entity[metric.key],
      }));

      const sorted = [...values].sort((a, b) => b.value - a.value);
      const max = sorted[0];
      const min = sorted[sorted.length - 1];

      if (max.value > 0 && min.value > 0) {
        const ratio = max.value / min.value;
        if (ratio >= 2) {
          results.push({
            text: `${max.name} has ${ratio.toFixed(1)}x more in ${metric.label.toLowerCase()} than ${min.name}`,
            icon: "trending",
          });
        }
      } else if (max.value > 0 && min.value === 0) {
        results.push({
          text: `Only ${max.name} has ${metric.label.toLowerCase()} (${formatCompactMoney(max.value)})`,
          icon: "compare",
        });
      }
    }

    if (sharedConnections.length > 0) {
      results.push({
        text: `${sharedConnections.length} shared connection${sharedConnections.length !== 1 ? "s" : ""} found across compared entities`,
        icon: "compare",
      });
    }

    return results.slice(0, 5);
  }, [loadedEntities, sharedConnections]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      {/* Header */}
      <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
        Research Mode
      </div>
      <h1 className="mt-4 font-headline text-4xl font-black tracking-tight text-ink lg:text-5xl">
        Compare Entities
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Select 2{"\u2013"}3 entities to compare side-by-side. See aligned
        metrics, shared connections, and overlapping donors.
      </p>

      {/* Entity Selector Slots */}
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: slotCount }).map((_, i) => (
          <EntitySlot
            key={i}
            index={i}
            selectedEntity={entityData[i]?.entity ?? null}
            loading={loadingEntities[i] ?? false}
            onSelect={(entity) => handleSelectEntity(i, entity)}
            onClear={() => handleClearSlot(i)}
            onRemove={slotCount > 2 ? () => handleRemoveSlot(i) : undefined}
          />
        ))}

        {/* Add slot button */}
        {slotCount < MAX_SLOTS && (
          <button
            onClick={handleAddSlot}
            className="flex min-h-[140px] items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface/50 transition-colors hover:border-ink/30 hover:bg-surface"
          >
            <div className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted">
                +
              </div>
              <p className="mt-2 font-mono text-xs text-muted">Add entity</p>
            </div>
          </button>
        )}
      </div>

      {/* Comparison Insights */}
      {hasComparison && insights.length > 0 && (
        <div className="mt-10">
          <h2 className="font-headline text-xl font-bold text-ink">
            Key Findings
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {insights.map((insight, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border bg-surface px-4 py-3"
              >
                {insight.icon === "trending" ? (
                  <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                ) : (
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                )}
                <p className="text-sm text-ink">{insight.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comparison Table */}
      {hasComparison && (
        <div className="mt-10">
          <h2 className="font-headline text-xl font-bold text-ink">
            Financial Comparison
          </h2>
          <div className="mt-4 overflow-x-auto">
            <ComparisonTable entities={loadedEntities} />
          </div>
        </div>
      )}

      {/* Shared Connections */}
      {hasComparison && (
        <div className="mt-10">
          <h2 className="font-headline text-xl font-bold text-ink">
            Shared Connections
          </h2>
          {sharedConnections.length === 0 ? (
            <div className="mt-4 rounded-xl border-2 border-dashed border-border bg-surface/50 px-6 py-10 text-center">
              <Users className="mx-auto h-8 w-8 text-border" />
              <p className="mt-3 text-sm text-muted">
                No shared donors or recipients found among the top connections.
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              {sharedConnections.map((conn) => (
                <div
                  key={conn.entityId}
                  className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 transition-colors hover:border-ink/20"
                >
                  <div
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor:
                        ENTITY_COLORS[
                          (conn.type ?? "individual") as EntityType
                        ] ?? "#6b7280",
                    }}
                  />
                  <span className="text-sm font-medium text-ink">
                    {conn.name}
                  </span>
                  <span className="ml-auto font-mono text-xs text-muted">
                    {conn.type
                      ? (ENTITY_LABELS[conn.type as EntityType] ??
                        conn.type.replace(/_/g, " "))
                      : ""}
                  </span>
                  <ArrowRight className="h-3 w-3 text-muted" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Empty state when nothing selected */}
      {!hasComparison && loadedEntities.length < 2 && (
        <div className="mt-10 rounded-xl border-2 border-dashed border-border bg-surface p-16 text-center">
          <Columns2 className="mx-auto h-12 w-12 text-border" />
          <p className="mt-4 text-sm text-muted">
            Select at least two entities above to see their side-by-side
            comparison.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Entity Slot ────────────────────────────────────────────────────────────

interface EntitySlotProps {
  index: number;
  selectedEntity: EntityDetail["entity"] | null;
  loading: boolean;
  onSelect: (entity: SearchResultItem["entity"]) => void;
  onClear: () => void;
  onRemove?: () => void;
}

function EntitySlot({
  index,
  selectedEntity,
  loading,
  onSelect,
  onClear,
  onRemove,
}: EntitySlotProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [searching, setSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setSearching(false);
      return;
    }

    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query)}&limit=8`,
        );
        if (res.ok) {
          const json = await res.json();
          setResults(json.results ?? []);
        }
      } catch {
        // ignore
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const slotLabels = ["A", "B", "C"];

  if (loading) {
    return (
      <div className="flex min-h-[140px] items-center justify-center rounded-xl border border-border bg-surface">
        <Loader2 className="h-5 w-5 animate-spin text-muted" />
      </div>
    );
  }

  if (selectedEntity) {
    const entityType = selectedEntity.type as EntityType;
    return (
      <div
        className="relative rounded-xl border bg-surface p-4"
        style={{ borderColor: ENTITY_COLORS[entityType] + "40" }}
      >
        {/* Remove / Clear buttons */}
        <div className="absolute right-2 top-2 flex items-center gap-1">
          <button
            onClick={onClear}
            className="rounded-full p-1 text-muted transition-colors hover:bg-paper hover:text-ink"
            title="Remove entity"
          >
            <X className="h-4 w-4" />
          </button>
          {onRemove && (
            <button
              onClick={onRemove}
              className="rounded-full p-1 font-mono text-xs text-muted transition-colors hover:bg-paper hover:text-ink"
              title="Remove slot"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Slot label */}
        <div
          className="inline-flex h-6 w-6 items-center justify-center rounded-full font-mono text-xs font-bold text-white"
          style={{ backgroundColor: ENTITY_COLORS[entityType] }}
        >
          {slotLabels[index]}
        </div>

        {/* Entity info */}
        <div className="mt-2">
          <EntityBadge type={entityType} size="sm" />
          <h3 className="mt-1.5 font-headline text-lg font-bold leading-tight text-ink">
            {selectedEntity.name}
          </h3>
          {selectedEntity.party && (
            <span className="font-mono text-xs text-muted">
              {selectedEntity.party}
              {selectedEntity.state ? ` \u2014 ${selectedEntity.state}` : ""}
            </span>
          )}
          {selectedEntity.industry && (
            <p className="font-mono text-xs text-muted">
              {selectedEntity.industry}
              {selectedEntity.ticker ? ` \u00B7 ${selectedEntity.ticker}` : ""}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Empty slot with search
  return (
    <div ref={containerRef} className="relative">
      <div className="rounded-xl border-2 border-dashed border-border bg-surface/50 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border font-mono text-xs text-muted">
            {slotLabels[index]}
          </div>
          <span className="font-mono text-xs text-muted">Select entity</span>
          {onRemove && (
            <button
              onClick={onRemove}
              className="ml-auto rounded-full p-1 text-muted transition-colors hover:text-ink"
              title="Remove slot"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
        <div className="relative mt-3">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search entities..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => {
              if (results.length > 0) setOpen(true);
            }}
            className="w-full rounded-lg border border-border bg-paper px-4 py-2 pl-9 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
          {searching && (
            <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted" />
          )}
        </div>
      </div>

      {/* Search dropdown */}
      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-64 overflow-y-auto rounded-lg border border-border bg-surface shadow-lg">
          {results.map((r) => (
            <button
              key={r.entity.id}
              onClick={() => {
                onSelect(r.entity);
                setQuery("");
                setResults([]);
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-paper"
            >
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{
                  backgroundColor:
                    ENTITY_COLORS[r.entity.type as EntityType] ?? "#6b7280",
                }}
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm text-ink">{r.entity.name}</div>
                {r.entity.party && (
                  <div className="font-mono text-xs text-muted">
                    {r.entity.party}
                    {r.entity.state ? ` \u2014 ${r.entity.state}` : ""}
                  </div>
                )}
              </div>
              <span className="shrink-0 font-mono text-xs text-muted">
                {ENTITY_LABELS[r.entity.type as EntityType] ??
                  r.entity.type.replace(/_/g, " ")}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {open && query.length >= 2 && !searching && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-border bg-surface p-4 text-center shadow-lg">
          <p className="text-sm text-muted">
            No entities found for &ldquo;{query}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Comparison Table ───────────────────────────────────────────────────────

interface ComparisonTableProps {
  entities: EntityDetail[];
}

function ComparisonTable({ entities }: ComparisonTableProps) {
  return (
    <div className="rounded-xl border border-border bg-surface">
      {/* Header row */}
      <div
        className="grid border-b border-border"
        style={{ gridTemplateColumns: `180px repeat(${entities.length}, 1fr)` }}
      >
        <div className="px-4 py-3">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
            Metric
          </span>
        </div>
        {entities.map((detail) => {
          const entityType = detail.entity.type as EntityType;
          return (
            <div
              key={detail.entity.id}
              className="border-l border-border px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: ENTITY_COLORS[entityType] }}
                />
                <span className="truncate font-headline text-sm font-bold text-ink">
                  {detail.entity.shortName || detail.entity.name}
                </span>
              </div>
              <div className="mt-0.5 font-mono text-xs text-muted">
                {ENTITY_LABELS[entityType]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Metric rows */}
      {METRICS.map((metric) => {
        const values = entities.map((d) => d.entity[metric.key]);
        const maxValue = Math.max(...values, 1);

        return (
          <div
            key={metric.key}
            className="grid border-b border-border last:border-b-0"
            style={{
              gridTemplateColumns: `180px repeat(${entities.length}, 1fr)`,
            }}
          >
            {/* Label */}
            <div className="flex items-center px-4 py-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
                {metric.label}
              </span>
            </div>

            {/* Values */}
            {entities.map((detail, i) => {
              const value = values[i];
              const entityType = detail.entity.type as EntityType;
              const isMax = value === Math.max(...values) && value > 0;
              const barWidth = maxValue > 0 ? (value / maxValue) * 100 : 0;

              return (
                <div
                  key={detail.entity.id}
                  className="border-l border-border px-4 py-4"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span
                      className={`font-mono text-lg font-bold tabular-nums ${
                        isMax ? "text-ink" : "text-muted"
                      }`}
                    >
                      {formatCompactMoney(value)}
                    </span>
                    {isMax && entities.length > 1 && (
                      <span className="shrink-0 rounded-full bg-paper px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
                        Highest
                      </span>
                    )}
                  </div>
                  {/* Bar */}
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-paper">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${barWidth}%`,
                        backgroundColor: isMax
                          ? ENTITY_COLORS[entityType]
                          : ENTITY_COLORS[entityType] + "40",
                      }}
                    />
                  </div>
                  {/* Exact value on hover tooltip area */}
                  <div className="mt-1 font-mono text-[10px] text-muted">
                    {formatMoney(value)}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
