"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Loader2, Share2 } from "lucide-react";
import { useMode } from "@/context/ModeContext";
import { formatCompactMoney } from "@/lib/utils";

const ForceGraph = dynamic(
  () => import("@/components/network/ForceGraph").then((m) => m.ForceGraph),
  {
    ssr: false,
    loading: () => (
      <div className="flex aspect-[16/9] items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface">
        <Loader2 className="h-5 w-5 animate-spin text-muted" />
      </div>
    ),
  },
);
import { ENTITY_COLORS, LINK_TYPE_COLORS } from "@/lib/constants";
import type { EntityType, LinkType } from "@/types";

interface NetworkNode {
  id: string;
  entityId: string;
  entityType: string;
  name: string;
  weight: number;
  expanded: boolean;
}

interface NetworkLink {
  source: string;
  target: string;
  linkType: string;
  weight: number;
  label?: string;
}

interface NetworkData {
  nodes: NetworkNode[];
  links: NetworkLink[];
  centerNodeId: string;
}

export default function NetworkPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted" />
        </div>
      }
    >
      <NetworkPageInner />
    </Suspense>
  );
}

function NetworkPageInner() {
  const { mode } = useMode();
  const searchParams = useSearchParams();
  const entityIdParam = searchParams.get("entity");

  const [data, setData] = useState<NetworkData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(
    entityIdParam,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    Array<{ entity: { id: string; type: string; name: string } }>
  >([]);

  // Fetch network graph data for an entity
  useEffect(() => {
    if (!selectedEntityId) return;

    async function fetchNetwork() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/network/${selectedEntityId}?depth=2&minWeight=0`,
        );
        if (!res.ok) throw new Error("Failed to fetch network data");
        const json: NetworkData = await res.json();
        setData(json);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchNetwork();
  }, [selectedEntityId]);

  // Search for entities
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(searchQuery)}&limit=8`,
        );
        if (res.ok) {
          const json = await res.json();
          setSearchResults(json.results ?? []);
        }
      } catch {
        // Ignore search errors
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleNodeClick = (entityId: string) => {
    setSelectedEntityId(entityId);
  };

  // Collect entity/link type stats
  const entityTypeCounts: Record<string, number> = {};
  const linkTypeCounts: Record<string, number> = {};
  if (data) {
    for (const n of data.nodes) {
      entityTypeCounts[n.entityType] =
        (entityTypeCounts[n.entityType] || 0) + 1;
    }
    for (const l of data.links) {
      linkTypeCounts[l.linkType] = (linkTypeCounts[l.linkType] || 0) + 1;
    }
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            {mode === "explore" ? "Connections" : "Network Analysis"}
          </div>
          <h1 className="mt-4 font-headline text-5xl font-black tracking-tight text-ink lg:text-6xl">
            {mode === "explore" ? "Power Network" : "Entity Network Graph"}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            {mode === "explore"
              ? "Explore the web of connections between corporations, PACs, politicians, and lobbyists."
              : "Force-directed graph with zoom, drag, and path highlighting. Click nodes to expand."}
          </p>
        </div>
      </div>

      {/* Entity search */}
      <div className="relative mt-8">
        <input
          type="text"
          placeholder="Search for an entity to explore its network..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 font-body text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
        />
        {searchResults.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-40 mt-1 rounded-lg border border-border bg-surface shadow-lg">
            {searchResults.map((r) => (
              <button
                key={r.entity.id}
                onClick={() => {
                  setSelectedEntityId(r.entity.id);
                  setSearchQuery("");
                  setSearchResults([]);
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-paper"
              >
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      ENTITY_COLORS[r.entity.type as EntityType] ?? "#6b7280",
                  }}
                />
                <span className="text-sm text-ink">{r.entity.name}</span>
                <span className="ml-auto font-mono text-xs text-muted">
                  {r.entity.type.replace(/_/g, " ")}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      {data && !loading && (
        <div className="mt-6 flex flex-wrap items-center gap-6 border-y border-border py-4">
          <div>
            <div className="font-mono text-xs uppercase text-muted">Nodes</div>
            <div className="font-mono text-2xl font-bold text-ink">
              {data.nodes.length}
            </div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="font-mono text-xs uppercase text-muted">
              Connections
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {data.links.length}
            </div>
          </div>
          <div className="h-8 w-px bg-border" />

          {/* Entity type legend */}
          <div className="flex flex-wrap gap-3">
            {Object.entries(entityTypeCounts).map(([type, count]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      ENTITY_COLORS[type as EntityType] ?? "#6b7280",
                  }}
                />
                <span className="font-mono text-xs text-muted">
                  {type.replace(/_/g, " ")} ({count})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Link type legend */}
      {data && !loading && Object.keys(linkTypeCounts).length > 0 && (
        <div className="mt-3 flex flex-wrap gap-4">
          {Object.entries(linkTypeCounts).map(([type, count]) => (
            <div key={type} className="flex items-center gap-2">
              <div
                className="h-0.5 w-4"
                style={{
                  backgroundColor: LINK_TYPE_COLORS[type as LinkType] ?? "#999",
                }}
              />
              <span className="font-mono text-xs text-muted">
                {type.replace(/_/g, " ")} ({count})
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Graph */}
      <div className="mt-8">
        {!selectedEntityId && (
          <div className="flex aspect-[16/9] items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface">
            <div className="text-center">
              <Share2 className="mx-auto h-12 w-12 text-border" />
              <p className="mt-4 text-sm text-muted">
                Search for an entity above to explore its network of
                connections.
              </p>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex aspect-[16/9] items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface">
            <div className="flex items-center gap-3 text-muted">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="font-mono text-sm">
                Building network graph...
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex aspect-[16/9] items-center justify-center rounded-xl border-2 border-dashed border-red-200 bg-red-50">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && data && data.nodes.length > 0 && (
          <div className="rounded-xl border border-border bg-surface p-2">
            <ForceGraph
              nodes={data.nodes.map((n) => ({
                id: n.id,
                entityType: n.entityType as EntityType,
                name: n.name,
                weight: n.weight,
                expanded: n.expanded,
              }))}
              links={data.links.map((l) => ({
                source: l.source as string,
                target: l.target as string,
                linkType: l.linkType as LinkType,
                weight: l.weight,
                label: l.label,
              }))}
              centerNodeId={data.centerNodeId}
              onNodeClick={handleNodeClick}
              height={600}
            />
          </div>
        )}
      </div>

      {/* Help text */}
      <div className="mt-8 rounded-lg border border-border bg-surface/50 px-4 py-3">
        <p className="font-mono text-xs text-muted">
          Drag nodes to reposition. Scroll to zoom. Click a node to recenter the
          graph on that entity. Node size reflects total money flow. Line
          thickness reflects connection strength.
        </p>
      </div>
    </div>
  );
}
