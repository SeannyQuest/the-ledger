"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { formatCompactMoney, formatNumber } from "@/lib/utils";
import { PARTY_COLORS, ENTITY_COLORS } from "@/lib/constants";
import type { EntityType } from "@/types";

/* ── Types ──────────────────────────────────────── */

interface LeaderboardEntry {
  entityId: string;
  name: string;
  entityType: string;
  party?: string | null;
  state?: string | null;
  amount: number;
  detail?: string;
}

interface LeaderboardSection {
  title: string;
  subtitle: string;
  entries: LeaderboardEntry[];
}

/* ── Page ───────────────────────────────────────── */

export default function LeaderboardsPage() {
  const [sections, setSections] = useState<LeaderboardSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/trades/leaderboard").then((r) => r.json()),
      fetch("/api/money-flow/pipeline").then((r) => r.json()),
    ])
      .then(([trades, pipeline]) => {
        const leaderboards: LeaderboardSection[] = [];

        // Top stock traders
        if (trades.topTraders?.length > 0) {
          leaderboards.push({
            title: "Top Stock Traders",
            subtitle: "Members of Congress with highest estimated trading volume",
            entries: trades.topTraders.slice(0, 10).map((t: any) => ({
              entityId: t.entityId,
              name: t.name,
              entityType: "politician",
              party: t.party,
              state: t.state,
              amount: t.estimatedVolume,
              detail: `${t.tradeCount} trades`,
            })),
          });
        }

        // Top donors (from pipeline sources)
        if (pipeline.topEntities?.sources?.length > 0) {
          leaderboards.push({
            title: "Top Donors",
            subtitle: "Corporations and individuals with largest political spending",
            entries: pipeline.topEntities.sources.slice(0, 10).map((e: any) => ({
              entityId: e.id,
              name: e.name,
              entityType: e.type,
              amount: e.amount,
            })),
          });
        }

        // Top recipients
        if (pipeline.topEntities?.recipients?.length > 0) {
          leaderboards.push({
            title: "Top Recipients",
            subtitle: "Politicians who received the most campaign contributions",
            entries: pipeline.topEntities.recipients.slice(0, 10).map((e: any) => ({
              entityId: e.id,
              name: e.name,
              entityType: e.type,
              party: e.party,
              state: e.state,
              amount: e.amount,
            })),
          });
        }

        // Top contract recipients
        if (pipeline.topEntities?.contracts?.length > 0) {
          leaderboards.push({
            title: "Top Gov. Contractors",
            subtitle: "Entities receiving the most federal contract dollars",
            entries: pipeline.topEntities.contracts.slice(0, 10).map((e: any) => ({
              entityId: e.id,
              name: e.name,
              entityType: e.type,
              amount: e.amount,
            })),
          });
        }

        // Top intermediaries
        if (pipeline.topEntities?.intermediaries?.length > 0) {
          leaderboards.push({
            title: "Top PACs & Intermediaries",
            subtitle: "PACs, Super PACs, and lobbying firms moving the most money",
            entries: pipeline.topEntities.intermediaries.slice(0, 10).map((e: any) => ({
              entityId: e.id,
              name: e.name,
              entityType: e.type,
              amount: e.amount,
            })),
          });
        }

        // Top traded tickers
        if (trades.topTickers?.length > 0) {
          leaderboards.push({
            title: "Most Traded Stocks",
            subtitle: "Stocks most frequently bought and sold by Congress",
            entries: trades.topTickers.slice(0, 10).map((t: any) => ({
              entityId: "", // No entity page for tickers
              name: `${t.ticker} — ${t.assetName}`,
              entityType: "corporation",
              amount: t.estimatedVolume,
              detail: `${t.tradeCount} trades by ${t.uniqueTraders} members`,
            })),
          });
        }

        setSections(leaderboards);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
      {/* Header */}
      <div>
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Rankings
        </div>
        <h1 className="mt-4 font-headline text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Leaderboards
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Who spends the most, receives the most, and trades the most in
          American politics.
        </p>
      </div>

      {loading && (
        <div className="mt-16 flex h-64 items-center justify-center">
          <div className="flex items-center gap-3 text-muted">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="font-mono text-sm">Loading leaderboards...</span>
          </div>
        </div>
      )}

      {!loading && (
        <div className="mt-12 grid gap-16 lg:grid-cols-2">
          {sections.map((section) => (
            <LeaderboardCard key={section.title} section={section} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Leaderboard Card ──────────────────────────── */

function LeaderboardCard({ section }: { section: LeaderboardSection }) {
  const maxAmount = section.entries[0]?.amount ?? 1;

  return (
    <div>
      <div className="border-t-4 border-ink pt-4">
        <h2 className="font-headline text-xl font-black text-ink">
          {section.title}
        </h2>
        <p className="mt-1 text-sm text-muted">{section.subtitle}</p>
      </div>

      <div className="mt-6 space-y-1.5">
        {section.entries.map((entry, i) => {
          const barWidth = Math.max(5, (entry.amount / maxAmount) * 100);
          const color = entry.party
            ? PARTY_COLORS[entry.party.toLowerCase()] ?? "#6b7280"
            : ENTITY_COLORS[entry.entityType as EntityType] ?? "#6b7280";

          const content = (
            <div className="group flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-2.5 transition-colors hover:border-ink/20">
              <span className="w-5 shrink-0 font-mono text-xs font-bold text-muted/50">
                {i + 1}
              </span>
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: color }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="truncate text-sm text-ink group-hover:text-accent">
                    {entry.name}
                  </span>
                  {entry.state && (
                    <span className="shrink-0 font-mono text-[10px] text-muted">
                      {entry.state}
                    </span>
                  )}
                </div>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-border/50">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${barWidth}%`, backgroundColor: color }}
                  />
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-mono text-xs font-bold text-ink">
                  {formatCompactMoney(entry.amount)}
                </div>
                {entry.detail && (
                  <div className="font-mono text-[10px] text-muted">
                    {entry.detail}
                  </div>
                )}
              </div>
            </div>
          );

          if (entry.entityId) {
            return (
              <Link
                key={`${entry.entityId}-${i}`}
                href={`/entity/${entry.entityType}/${entry.entityId}`}
              >
                {content}
              </Link>
            );
          }
          return <div key={`${entry.name}-${i}`}>{content}</div>;
        })}
      </div>
    </div>
  );
}
