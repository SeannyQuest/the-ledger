"use client";

import { useMemo } from "react";
import * as d3 from "d3";
import Link from "next/link";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import { formatCompactMoney } from "@/lib/utils";

interface BarChartProps {
  data: Array<{ label: string; value: number; color?: string; href?: string }>;
  height?: number;
  formatValue?: (v: number) => string;
  showValues?: boolean;
}

const BAR_HEIGHT = 28;
const BAR_GAP = 8;
const LABEL_WIDTH = 160;
const VALUE_WIDTH = 80;
const MIN_BAR_WIDTH = 2;

export function BarChart({
  data,
  height: fixedHeight,
  formatValue = formatCompactMoney,
  showValues = true,
}: BarChartProps) {
  const [containerRef, { width: containerWidth }] = useResizeObserver();

  const computedHeight =
    fixedHeight ?? Math.max(100, data.length * (BAR_HEIGHT + BAR_GAP) + BAR_GAP);
  const barAreaWidth = Math.max(
    0,
    containerWidth - LABEL_WIDTH - (showValues ? VALUE_WIDTH : 0),
  );

  const xScale = useMemo(() => {
    const maxValue = d3.max(data, (d) => d.value) ?? 0;
    return d3
      .scaleLinear()
      .domain([0, maxValue || 1])
      .range([MIN_BAR_WIDTH, Math.max(MIN_BAR_WIDTH, barAreaWidth)]);
  }, [data, barAreaWidth]);

  if (data.length === 0) {
    return (
      <div
        ref={containerRef}
        className="viz-container relative flex w-full items-center justify-center text-muted"
        style={{ minHeight: fixedHeight ?? 100 }}
      >
        <span className="font-mono text-sm">No data</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="viz-container relative w-full">
      {containerWidth > 0 && (
        <svg
          width={containerWidth}
          height={computedHeight}
          viewBox={`0 0 ${containerWidth} ${computedHeight}`}
          className="overflow-visible"
        >
          {data.map((d, i) => {
            const y = BAR_GAP + i * (BAR_HEIGHT + BAR_GAP);
            const barWidth = d.value > 0 ? xScale(d.value) : MIN_BAR_WIDTH;
            const barColor = d.color ?? "var(--color-accent)";

            const row = (
              <g key={i} className={d.href ? "cursor-pointer" : undefined}>
                {/* Label */}
                <text
                  x={LABEL_WIDTH - 12}
                  y={y + BAR_HEIGHT / 2}
                  dy="0.35em"
                  textAnchor="end"
                  className="fill-ink text-[13px]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {d.label.length > 22
                    ? d.label.slice(0, 21) + "\u2026"
                    : d.label}
                </text>

                {/* Bar background */}
                <rect
                  x={LABEL_WIDTH}
                  y={y}
                  width={barAreaWidth}
                  height={BAR_HEIGHT}
                  rx={3}
                  className="fill-paper-dark"
                />

                {/* Bar fill — CSS transition for animation */}
                <rect
                  x={LABEL_WIDTH}
                  y={y}
                  width={barWidth}
                  height={BAR_HEIGHT}
                  rx={3}
                  fill={barColor}
                  style={{
                    transition: "width 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />

                {/* Value label */}
                {showValues && (
                  <text
                    x={LABEL_WIDTH + barAreaWidth + 10}
                    y={y + BAR_HEIGHT / 2}
                    dy="0.35em"
                    textAnchor="start"
                    className="fill-muted text-[12px]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {formatValue(d.value)}
                  </text>
                )}
              </g>
            );

            if (d.href) {
              return (
                <Link key={i} href={d.href}>
                  {row}
                </Link>
              );
            }
            return row;
          })}
        </svg>
      )}
    </div>
  );
}
