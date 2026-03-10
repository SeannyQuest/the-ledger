"use client";

import { useMemo } from "react";
import * as d3 from "d3";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  showEndDot?: boolean;
}

export function Sparkline({
  data,
  width = 80,
  height = 24,
  color = "var(--color-accent)",
  showEndDot = true,
}: SparklineProps) {
  const padding = showEndDot ? 3 : 1;

  const { linePath, lastPoint } = useMemo(() => {
    if (data.length < 2) return { linePath: "", lastPoint: null };

    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([padding, width - padding]);

    const extent = d3.extent(data) as [number, number];
    const yMin = extent[0];
    const yMax = extent[1];
    const yScale = d3
      .scaleLinear()
      .domain([yMin === yMax ? yMin - 1 : yMin, yMax === yMin ? yMax + 1 : yMax])
      .range([height - padding, padding]);

    const lineGenerator = d3
      .line<number>()
      .x((_d, i) => xScale(i))
      .y((d) => yScale(d))
      .curve(d3.curveMonotoneX);

    const path = lineGenerator(data) ?? "";
    const lx = xScale(data.length - 1);
    const ly = yScale(data[data.length - 1]);

    return { linePath: path, lastPoint: { x: lx, y: ly } };
  }, [data, width, height, padding]);

  if (data.length < 2) {
    return (
      <svg
        width={width}
        height={height}
        className="inline-block align-middle"
      />
    );
  }

  return (
    <svg
      width={width}
      height={height}
      className="inline-block align-middle overflow-visible"
    >
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {showEndDot && lastPoint && (
        <circle
          cx={lastPoint.x}
          cy={lastPoint.y}
          r={2.5}
          fill={color}
        />
      )}
    </svg>
  );
}
