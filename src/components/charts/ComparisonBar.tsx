"use client";

import { formatCompactMoney } from "@/lib/utils";

interface ComparisonBarProps {
  leftValue: number;
  rightValue: number;
  leftColor?: string;
  rightColor?: string;
  leftLabel?: string;
  rightLabel?: string;
  formatValue?: (v: number) => string;
}

export function ComparisonBar({
  leftValue,
  rightValue,
  leftColor = "var(--color-money-in)",
  rightColor = "var(--color-money-out)",
  leftLabel,
  rightLabel,
  formatValue = formatCompactMoney,
}: ComparisonBarProps) {
  const maxValue = Math.max(leftValue, rightValue, 1);
  const leftPct = (leftValue / maxValue) * 100;
  const rightPct = (rightValue / maxValue) * 100;

  return (
    <div className="flex w-full flex-col gap-1">
      {/* Labels row */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted">{leftLabel}</span>
        <span className="text-muted">{rightLabel}</span>
      </div>

      {/* Bars */}
      <div className="flex h-8 items-center gap-0.5">
        {/* Left side: value + bar growing right-to-left */}
        <div className="flex flex-1 items-center gap-2">
          <span
            className="shrink-0 font-mono text-xs tabular-nums"
            style={{ color: leftColor }}
          >
            {formatValue(leftValue)}
          </span>
          <div className="relative flex h-6 flex-1 justify-end">
            <div
              className="h-full rounded-l-sm"
              style={{
                width: `${leftPct}%`,
                backgroundColor: leftColor,
                transition: "width 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </div>
        </div>

        {/* Center divider */}
        <div className="h-8 w-px shrink-0 bg-border" />

        {/* Right side: bar growing left-to-right + value */}
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex h-6 flex-1 justify-start">
            <div
              className="h-full rounded-r-sm"
              style={{
                width: `${rightPct}%`,
                backgroundColor: rightColor,
                transition: "width 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </div>
          <span
            className="shrink-0 font-mono text-xs tabular-nums"
            style={{ color: rightColor }}
          >
            {formatValue(rightValue)}
          </span>
        </div>
      </div>
    </div>
  );
}
