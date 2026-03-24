"use client";

import { useState } from "react";
import { primaryCalendar, type StatePrimary } from "@/lib/elections-data";

const TYPE_STYLES: Record<StatePrimary["primaryType"], string> = {
  open: "bg-green-100 text-green-800",
  closed: "bg-red-100 text-red-800",
  "semi-open": "bg-yellow-100 text-yellow-800",
  "semi-closed": "bg-orange-100 text-orange-800",
};

const TYPE_LABELS: Record<StatePrimary["primaryType"], string> = {
  open: "Open",
  closed: "Closed",
  "semi-open": "Semi-Open",
  "semi-closed": "Semi-Closed",
};

function formatPrimaryDate(iso: string): string {
  if (!iso) return "N/A";
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const MONTHS = [
  { label: "All", value: "all" },
  { label: "Mar", value: "3" },
  { label: "May", value: "5" },
  { label: "Jun", value: "6" },
  { label: "Aug", value: "8" },
  { label: "Sep", value: "9" },
  { label: "Oct", value: "10" },
];

export default function PrimaryCalendar() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? primaryCalendar
      : primaryCalendar.filter((s) => {
          if (!s.primaryDate) return false;
          const month = new Date(s.primaryDate + "T12:00:00").getMonth() + 1;
          return month.toString() === filter;
        });

  return (
    <div>
      {/* Filter row */}
      <div className="flex flex-wrap gap-2">
        {MONTHS.map((m) => (
          <button
            key={m.value}
            onClick={() => setFilter(m.value)}
            className={`rounded-full px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
              filter === m.value
                ? "bg-ink text-white"
                : "border border-border text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((s) => (
          <div
            key={s.abbr}
            className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-ink/30"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-headline text-lg font-bold text-ink">
                {s.state}
              </h3>
              <span className="shrink-0 font-mono text-xs font-bold text-muted">
                {s.abbr}
              </span>
            </div>
            <p className="mt-2 text-sm font-medium text-ink/70">
              {formatPrimaryDate(s.primaryDate)}
            </p>
            <span
              className={`mt-3 inline-block rounded-full px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wider ${TYPE_STYLES[s.primaryType]}`}
            >
              {TYPE_LABELS[s.primaryType]}
            </span>
            {s.notes && (
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {s.notes}
              </p>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-sm text-muted">
          No primaries scheduled for this month.
        </p>
      )}
    </div>
  );
}
