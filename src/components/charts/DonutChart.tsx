"use client";

import { useMemo, useState } from "react";
import * as d3 from "d3";
import { formatCompactMoney } from "@/lib/utils";

interface DonutChartProps {
  data: Array<{ label: string; value: number; color: string }>;
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: string;
}

export function DonutChart({
  data,
  size = 200,
  thickness = 32,
  centerLabel,
  centerValue,
}: DonutChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const radius = size / 2;
  const innerRadius = radius - thickness;

  const pieData = useMemo(() => {
    const pie = d3
      .pie<{ label: string; value: number; color: string }>()
      .value((d) => d.value)
      .sort(null)
      .padAngle(0.02);
    return pie(data);
  }, [data]);

  const arcGenerator = useMemo(
    () =>
      d3
        .arc<d3.PieArcDatum<{ label: string; value: number; color: string }>>()
        .innerRadius(innerRadius)
        .outerRadius(radius)
        .cornerRadius(2),
    [innerRadius, radius],
  );

  const hoveredArcGenerator = useMemo(
    () =>
      d3
        .arc<d3.PieArcDatum<{ label: string; value: number; color: string }>>()
        .innerRadius(innerRadius - 2)
        .outerRadius(radius + 4)
        .cornerRadius(2),
    [innerRadius, radius],
  );

  if (data.length === 0 || data.every((d) => d.value === 0)) {
    return (
      <div
        className="flex items-center justify-center text-muted"
        style={{ width: size, height: size }}
      >
        <span className="font-mono text-sm">No data</span>
      </div>
    );
  }

  const hovered = hoveredIndex !== null ? data[hoveredIndex] : null;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Chart */}
      <div
        className="relative"
        style={{ width: size, height: size }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <svg width={size} height={size} className="overflow-visible">
          <g transform={`translate(${radius}, ${radius})`}>
            {pieData.map((arc, i) => (
              <path
                key={i}
                d={
                  (hoveredIndex === i
                    ? hoveredArcGenerator(arc)
                    : arcGenerator(arc)) ?? ""
                }
                fill={arc.data.color}
                opacity={
                  hoveredIndex === null || hoveredIndex === i ? 1 : 0.4
                }
                style={{
                  transition:
                    "opacity 0.2s ease, d 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  setHoveredIndex(i);
                  const rect = e.currentTarget
                    .closest("div")!
                    .getBoundingClientRect();
                  setTooltipPos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                  });
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget
                    .closest("div")!
                    .getBoundingClientRect();
                  setTooltipPos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                  });
                }}
              />
            ))}

            {/* Center text */}
            {(centerValue || centerLabel) && (
              <>
                {centerValue && (
                  <text
                    textAnchor="middle"
                    dy={centerLabel ? "-0.2em" : "0.35em"}
                    className="fill-ink text-[18px] font-bold"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {centerValue}
                  </text>
                )}
                {centerLabel && (
                  <text
                    textAnchor="middle"
                    dy={centerValue ? "1.2em" : "0.35em"}
                    className="fill-muted text-[12px]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {centerLabel}
                  </text>
                )}
              </>
            )}
          </g>
        </svg>

        {/* Tooltip */}
        {hovered && (
          <div
            className="chart-tooltip pointer-events-none absolute z-50 rounded-lg border border-border bg-surface px-3 py-2 font-mono text-xs shadow-lg"
            style={{ left: tooltipPos.x + 14, top: tooltipPos.y - 14 }}
          >
            <div className="font-semibold text-ink">{hovered.label}</div>
            <div className="text-muted">{formatCompactMoney(hovered.value)}</div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        {data.map((d, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 text-xs"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ cursor: "default" }}
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: d.color }}
            />
            <span className="text-muted">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
