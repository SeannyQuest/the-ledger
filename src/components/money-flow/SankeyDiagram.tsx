"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import * as d3 from "d3";
import {
  sankey as d3Sankey,
  sankeyLinkHorizontal,
  type SankeyNode,
  type SankeyLink,
} from "d3-sankey";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import { formatCompactMoney } from "@/lib/utils";
import { ENTITY_COLORS, FLOW_TYPE_COLORS } from "@/lib/constants";
import type { EntityType, FlowType } from "@/types";

/* ── Types ──────────────────────────────────────────────────── */

interface SankeyNodeDatum {
  id: string;
  entityType: EntityType;
  name: string;
  totalAmount: number;
}

interface SankeyLinkDatum {
  source: string;
  target: string;
  amount: number;
  flowType: string;
  transactionCount: number;
}

interface Props {
  nodes: SankeyNodeDatum[];
  links: SankeyLinkDatum[];
  onNodeClick?: (entityId: string) => void;
  height?: number;
}

type SNode = SankeyNode<SankeyNodeDatum, SankeyLinkDatum>;
type SLink = SankeyLink<SankeyNodeDatum, SankeyLinkDatum>;

/* ── Component ──────────────────────────────────────────────── */

export function SankeyDiagram({ nodes, links, onNodeClick, height: fixedHeight }: Props) {
  const [containerRef, { width: containerWidth }] = useResizeObserver();
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    content: string;
  } | null>(null);

  const width = containerWidth || 900;
  const height = fixedHeight || Math.max(500, nodes.length * 28);
  const margin = { top: 16, right: 180, bottom: 16, left: 180 };

  const render = useCallback(() => {
    if (!svgRef.current || nodes.length === 0 || width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Build node index map
    const nodeMap = new Map(nodes.map((n, i) => [n.id, i]));

    // Filter links to only those with valid nodes
    const validLinks = links
      .filter((l) => nodeMap.has(l.source) && nodeMap.has(l.target))
      .map((l) => ({
        ...l,
        value: l.amount,
      }));

    if (validLinks.length === 0) return;

    // Create sankey layout
    const sankeyGen = d3Sankey<SankeyNodeDatum, SankeyLinkDatum>()
      .nodeId((d) => d.id)
      .nodeWidth(14)
      .nodePadding(12)
      .nodeSort(null)
      .extent([
        [margin.left, margin.top],
        [width - margin.right, height - margin.bottom],
      ]);

    const graph = sankeyGen({
      nodes: nodes.map((d) => ({ ...d })),
      links: validLinks.map((d) => ({ ...d })),
    });

    const sankeyNodes = graph.nodes as SNode[];
    const sankeyLinks = graph.links as SLink[];

    // ── Defs: gradients for links ──
    const defs = svg.append("defs");
    sankeyLinks.forEach((link, i) => {
      const sourceNode = link.source as SNode;
      const targetNode = link.target as SNode;
      const gradient = defs
        .append("linearGradient")
        .attr("id", `link-grad-${i}`)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", sourceNode.x1!)
        .attr("x2", targetNode.x0!);

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", getEntityColor(sourceNode.entityType))
        .attr("stop-opacity", 0.5);
      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", getEntityColor(targetNode.entityType))
        .attr("stop-opacity", 0.5);
    });

    // ── Links ──
    const linkGroup = svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.35)
      .selectAll("g")
      .data(sankeyLinks)
      .join("g");

    linkGroup
      .append("path")
      .attr("d", sankeyLinkHorizontal())
      .attr("stroke", (_d, i) => `url(#link-grad-${i})`)
      .attr("stroke-width", (d) => Math.max(1, d.width!))
      .style("cursor", "pointer")
      .on("mouseenter", function (event, d) {
        d3.select(this).attr("stroke-opacity", 0.7);
        const source = d.source as SNode;
        const target = d.target as SNode;
        const flowLabel = getFlowLabel(
          (d as unknown as { flowType: string }).flowType,
        );
        setTooltip({
          x: event.offsetX,
          y: event.offsetY,
          content: `${source.name} → ${target.name}\n${flowLabel}: ${formatCompactMoney(d.value!)}`,
        });
      })
      .on("mouseleave", function () {
        d3.select(this).attr("stroke-opacity", 0.35);
        setTooltip(null);
      });

    // ── Nodes ──
    const nodeGroup = svg
      .append("g")
      .selectAll("g")
      .data(sankeyNodes)
      .join("g")
      .style("cursor", onNodeClick ? "pointer" : "default")
      .on("click", (_event, d) => {
        if (onNodeClick) onNodeClick(d.id);
      });

    nodeGroup
      .append("rect")
      .attr("x", (d) => d.x0!)
      .attr("y", (d) => d.y0!)
      .attr("width", (d) => d.x1! - d.x0!)
      .attr("height", (d) => Math.max(1, d.y1! - d.y0!))
      .attr("fill", (d) => getEntityColor(d.entityType))
      .attr("rx", 2)
      .on("mouseenter", function (event, d) {
        d3.select(this).attr("opacity", 0.8);
        const incoming = (d.targetLinks as SLink[]).reduce(
          (s, l) => s + (l.value ?? 0),
          0,
        );
        const outgoing = (d.sourceLinks as SLink[]).reduce(
          (s, l) => s + (l.value ?? 0),
          0,
        );
        setTooltip({
          x: event.offsetX,
          y: event.offsetY,
          content: `${d.name}\nIn: ${formatCompactMoney(incoming)}\nOut: ${formatCompactMoney(outgoing)}`,
        });
      })
      .on("mouseleave", function () {
        d3.select(this).attr("opacity", 1);
        setTooltip(null);
      });

    // ── Labels ──
    nodeGroup
      .append("text")
      .attr("x", (d) => (d.x0! < width / 2 ? d.x0! - 8 : d.x1! + 8))
      .attr("y", (d) => (d.y0! + d.y1!) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d) => (d.x0! < width / 2 ? "end" : "start"))
      .attr("font-size", 12)
      .attr("font-family", "var(--font-body)")
      .attr("fill", "var(--color-ink)")
      .text((d) => truncateLabel(d.name, 28));

    // ── Amount labels next to node labels ──
    nodeGroup
      .append("text")
      .attr("x", (d) => (d.x0! < width / 2 ? d.x0! - 8 : d.x1! + 8))
      .attr("y", (d) => (d.y0! + d.y1!) / 2 + 16)
      .attr("text-anchor", (d) => (d.x0! < width / 2 ? "end" : "start"))
      .attr("font-size", 10)
      .attr("font-family", "var(--font-mono)")
      .attr("fill", "var(--color-muted)")
      .text((d) => {
        const total = (d.targetLinks as SLink[]).reduce(
          (s, l) => s + (l.value ?? 0),
          0,
        ) || (d.sourceLinks as SLink[]).reduce(
          (s, l) => s + (l.value ?? 0),
          0,
        );
        return formatCompactMoney(total);
      });
  }, [nodes, links, width, height, margin.left, margin.right, margin.top, margin.bottom, onNodeClick]);

  useEffect(() => {
    render();
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
            <div key={i} className={i === 0 ? "font-semibold text-ink" : "text-muted"}>
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Helpers ──────────────────────────────────────────────── */

function getEntityColor(type: EntityType): string {
  return ENTITY_COLORS[type] ?? "#6b7280";
}

function getFlowLabel(type: string): string {
  const map: Record<string, string> = {
    corporate_contribution: "Corporate Contribution",
    individual_contribution: "Individual Contribution",
    pac_contribution: "PAC Contribution",
    party_contribution: "Party Contribution",
    lobbying_payment: "Lobbying Payment",
    federal_contract: "Federal Contract",
    federal_grant: "Federal Grant",
    donation: "Donation",
    lobbying: "Lobbying",
    contract: "Contract",
  };
  return map[type] ?? type.replace(/_/g, " ");
}

function truncateLabel(str: string, max: number): string {
  return str.length > max ? str.slice(0, max - 1) + "\u2026" : str;
}
