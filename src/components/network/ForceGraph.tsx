"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import { formatCompactMoney } from "@/lib/utils";
import { ENTITY_COLORS, LINK_TYPE_COLORS } from "@/lib/constants";
import type { EntityType, LinkType } from "@/types";

/* ── Types ──────────────────────────────────────────────────── */

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  entityType: EntityType;
  name: string;
  weight: number;
  expanded: boolean;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  linkType: LinkType;
  weight: number;
  label?: string;
}

interface Props {
  nodes: GraphNode[];
  links: GraphLink[];
  centerNodeId: string;
  onNodeClick?: (entityId: string) => void;
  height?: number;
}

/* ── Component ──────────────────────────────────────────────── */

export function ForceGraph({
  nodes,
  links,
  centerNodeId,
  onNodeClick,
  height: fixedHeight,
}: Props) {
  const [containerRef, { width: containerWidth }] = useResizeObserver();
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<d3.Simulation<GraphNode, GraphLink> | null>(
    null,
  );
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    content: string;
  } | null>(null);

  const width = containerWidth || 900;
  const height = fixedHeight || 600;

  const render = useCallback(() => {
    if (!svgRef.current || nodes.length === 0 || width === 0) return;

    // Cleanup previous simulation
    if (simulationRef.current) {
      simulationRef.current.stop();
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Scale for node radius based on weight
    const maxWeight = d3.max(nodes, (d) => d.weight) ?? 1;
    const radiusScale = d3.scaleSqrt().domain([0, maxWeight]).range([6, 40]);

    // Clone data so D3 can mutate positions
    const simNodes: GraphNode[] = nodes.map((d) => ({ ...d }));
    const simLinks: GraphLink[] = links.map((d) => ({
      ...d,
      source: d.source,
      target: d.target,
    }));

    // Simulation
    const simulation = d3
      .forceSimulation<GraphNode>(simNodes)
      .force(
        "link",
        d3
          .forceLink<GraphNode, GraphLink>(simLinks)
          .id((d) => d.id)
          .distance(120)
          .strength(0.4),
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide<GraphNode>().radius((d) => radiusScale(d.weight) + 4),
      );

    simulationRef.current = simulation;

    // Container group for zoom
    const g = svg.append("g");

    // Zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 5])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // ── Links ──
    const linkGroup = g
      .append("g")
      .attr("stroke-opacity", 0.5)
      .selectAll("line")
      .data(simLinks)
      .join("line")
      .attr("stroke", (d) => LINK_TYPE_COLORS[d.linkType] ?? "#999")
      .attr("stroke-width", (d) =>
        Math.max(1, Math.min(6, Math.log10(d.weight + 1))),
      )
      .on("mouseenter", function (event, d) {
        d3.select(this)
          .attr("stroke-opacity", 1)
          .attr("stroke-width", function () {
            return Math.max(
              2,
              parseFloat(d3.select(this).attr("stroke-width")) * 1.5,
            );
          });
        const src = d.source as GraphNode;
        const tgt = d.target as GraphNode;
        setTooltip({
          x: event.offsetX,
          y: event.offsetY,
          content: `${src.name} → ${tgt.name}\n${d.linkType.replace(/_/g, " ")}: ${formatCompactMoney(d.weight)}`,
        });
      })
      .on("mouseleave", function () {
        d3.select(this).attr("stroke-opacity", 0.5);
        setTooltip(null);
      });

    // ── Nodes ──
    const nodeGroup = g
      .append("g")
      .selectAll("g")
      .data(simNodes)
      .join("g")
      .style("cursor", onNodeClick ? "pointer" : "default")
      .on("click", (_event, d) => {
        if (onNodeClick) onNodeClick(d.id);
      })
      .call(
        d3
          .drag<SVGGElement, GraphNode>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }) as any,
      );

    // Node circles
    nodeGroup
      .append("circle")
      .attr("r", (d) => radiusScale(d.weight))
      .attr("fill", (d) => ENTITY_COLORS[d.entityType] ?? "#6b7280")
      .attr("stroke", (d) => (d.id === centerNodeId ? "#c41d1d" : "#fff"))
      .attr("stroke-width", (d) => (d.id === centerNodeId ? 3 : 1.5))
      .attr("opacity", 0.9)
      .on("mouseenter", function (event, d) {
        d3.select(this).attr("opacity", 1).attr("stroke-width", 3);
        setTooltip({
          x: event.offsetX,
          y: event.offsetY,
          content: `${d.name}\n${d.entityType.replace(/_/g, " ")}\n${formatCompactMoney(d.weight)}`,
        });
      })
      .on("mouseleave", function (_, d) {
        d3.select(this)
          .attr("opacity", 0.9)
          .attr("stroke-width", d.id === centerNodeId ? 3 : 1.5);
        setTooltip(null);
      });

    // Node labels
    nodeGroup
      .append("text")
      .attr("dy", (d) => radiusScale(d.weight) + 14)
      .attr("text-anchor", "middle")
      .attr("font-size", 11)
      .attr("font-family", "var(--font-body)")
      .attr("fill", "var(--color-ink)")
      .text((d) => {
        const maxLen = d.id === centerNodeId ? 30 : 20;
        return d.name.length > maxLen
          ? d.name.slice(0, maxLen - 1) + "\u2026"
          : d.name;
      });

    // Tick handler
    simulation.on("tick", () => {
      linkGroup
        .attr("x1", (d) => (d.source as GraphNode).x!)
        .attr("y1", (d) => (d.source as GraphNode).y!)
        .attr("x2", (d) => (d.target as GraphNode).x!)
        .attr("y2", (d) => (d.target as GraphNode).y!);

      nodeGroup.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    // Center on the center node after a brief warmup
    simulation.on("end", () => {
      const centerNode = simNodes.find((n) => n.id === centerNodeId);
      if (centerNode) {
        const transform = d3.zoomIdentity.translate(
          width / 2 - (centerNode.x ?? 0),
          height / 2 - (centerNode.y ?? 0),
        );
        svg.transition().duration(500).call(zoom.transform, transform);
      }
    });

    return () => {
      simulation.stop();
    };
  }, [nodes, links, centerNodeId, width, height, onNodeClick]);

  useEffect(() => {
    render();
    return () => {
      if (simulationRef.current) simulationRef.current.stop();
    };
  }, [render]);

  return (
    <div ref={containerRef} className="viz-container relative w-full">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      />
      {tooltip && (
        <div
          className="chart-tooltip pointer-events-none absolute z-50 max-w-xs rounded-lg border border-border bg-surface px-3 py-2 font-mono text-xs shadow-lg"
          style={{ left: tooltip.x + 12, top: tooltip.y - 12 }}
        >
          {tooltip.content.split("\n").map((line, i) => (
            <div
              key={i}
              className={i === 0 ? "font-semibold text-ink" : "text-muted"}
            >
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
