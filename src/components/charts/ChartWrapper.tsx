"use client";

import { useResizeObserver } from "@/hooks/useResizeObserver";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ChartWrapperProps {
  children: (dimensions: { width: number; height: number }) => ReactNode;
  aspectRatio?: number;
  minHeight?: number;
  className?: string;
}

export function ChartWrapper({
  children,
  aspectRatio,
  minHeight = 300,
  className,
}: ChartWrapperProps) {
  const [containerRef, { width, height }] = useResizeObserver();

  const computedHeight = aspectRatio
    ? Math.max(width / aspectRatio, minHeight)
    : Math.max(height, minHeight);

  return (
    <div
      ref={containerRef}
      className={cn("viz-container relative w-full", className)}
      style={{ minHeight: aspectRatio ? computedHeight : minHeight }}
    >
      {width > 0 && children({ width, height: computedHeight })}
    </div>
  );
}
