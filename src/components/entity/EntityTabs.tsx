"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TabNav } from "@/components/shared/TabNav";
import { MoneyAmount } from "@/components/shared/MoneyAmount";
import { ENTITY_COLORS } from "@/lib/constants";
import { formatCompactMoney } from "@/lib/utils";
import type { EntityType } from "@/types";

// ── Props ──────────────────────────────────────────────

interface Stat {
  label: string;
  amount: number;
}

interface Donor {
  id: string;
  sourceEntityId: string;
  sourceName: string;
  sourceType: string;
  transactionType: string;
  totalAmount: number;
}

interface Recipient {
  id: string;
  targetEntityId: string;
  targetName: string;
  targetType: string;
  transactionType: string;
  totalAmount: number;
}

interface Relationship {
  type: string;
  direction: "incoming" | "outgoing";
  entityId: string;
  entityType: string;
  entityName: string;
}

interface Alias {
  alias: string;
  source: string;
}

interface EntityMeta {
  id: string;
  type: string;
  canonicalName?: string;
  description?: string | null;
  industry?: string | null;
  ticker?: string | null;
  website?: string | null;
  state?: string | null;
  office?: string | null;
  party?: string | null;
  photoUrl?: string | null;
}

export interface EntityTabsProps {
  stats: Stat[];
  topDonors: Donor[];
  topRecipients: Recipient[];
  relationships: Relationship[];
  aliases: Alias[];
  entity: EntityMeta;
}

// ── Component ──────────────────────────────────────────

export function EntityTabs({
  stats,
  topDonors,
  topRecipients,
  relationships,
  aliases,
  entity,
}: EntityTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const isPolitician = entity.type === "POLITICIAN";

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "about", label: "About" },
    { id: "money-in", label: "Money In", count: topDonors.length || undefined },
    {
      id: "money-out",
      label: "Money Out",
      count: topRecipients.length || undefined,
    },
    ...(isPolitician
      ? [
          { id: "trading", label: "Trading" },
          { id: "voting", label: "Voting" },
        ]
      : []),
    {
      id: "connections",
      label: "Connections",
      count: relationships.length || undefined,
    },
    { id: "profile", label: "Profile" },
  ];

  return (
    <div className="mt-8">
      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="py-6">
        {activeTab === "overview" && (
          <OverviewTab
            stats={stats}
            topDonors={topDonors.slice(0, 3)}
            topRecipients={topRecipients.slice(0, 3)}
            entity={entity}
          />
        )}
        {activeTab === "about" && <AboutTab entity={entity} />}
        {activeTab === "money-in" && <MoneyInTab donors={topDonors} />}
        {activeTab === "money-out" && (
          <MoneyOutTab recipients={topRecipients} />
        )}
        {activeTab === "trading" && isPolitician && (
          <TradingTab entityId={entity.id} />
        )}
        {activeTab === "voting" && isPolitician && (
          <VotingTab
            entityId={entity.id}
            entityName={entity.canonicalName ?? "this member"}
          />
        )}
        {activeTab === "connections" && (
          <ConnectionsTab relationships={relationships} />
        )}
        {activeTab === "profile" && (
          <ProfileTab aliases={aliases} entity={entity} />
        )}
      </div>
    </div>
  );
}

// ── About: Shared hook ────────────────────────────────

function useAbout(entity: EntityMeta) {
  const [about, setAbout] = useState<{
    summary: string | null;
    thumbnailUrl: string | null;
    wikipediaUrl: string | null;
  } | null>(
    entity.description
      ? {
          summary: entity.description,
          thumbnailUrl: entity.photoUrl ?? null,
          wikipediaUrl: null,
        }
      : null,
  );
  const [loading, setLoading] = useState(!entity.description);

  useEffect(() => {
    if (entity.description) return;
    let cancelled = false;

    fetch(`/api/entity/${entity.type.toLowerCase()}/${entity.id}/about`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) {
          setAbout({
            summary: data.summary ?? null,
            thumbnailUrl: data.thumbnailUrl ?? null,
            wikipediaUrl: data.wikipediaUrl ?? null,
          });
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [entity.id, entity.description]);

  return { about, loading };
}

// ── Tab: Overview ──────────────────────────────────────

function OverviewTab({
  stats,
  topDonors,
  topRecipients,
  entity,
}: {
  stats: Stat[];
  topDonors: Donor[];
  topRecipients: Recipient[];
  entity: EntityMeta;
}) {
  const { about, loading } = useAbout(entity);

  return (
    <div className="space-y-10">
      {/* About teaser */}
      {loading && (
        <div className="rounded-xl border border-border bg-surface px-6 py-5">
          <div className="h-4 w-24 animate-pulse rounded bg-border/60" />
          <div className="mt-3 space-y-2">
            <div className="h-3 w-full animate-pulse rounded bg-border/40" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-border/40" />
            <div className="h-3 w-4/6 animate-pulse rounded bg-border/40" />
          </div>
        </div>
      )}
      {!loading && about?.summary && (
        <div className="rounded-xl border border-border bg-surface px-6 py-5">
          <div className="flex items-start gap-5">
            {about.thumbnailUrl && (
              <img
                src={about.thumbnailUrl}
                alt=""
                className="hidden h-20 w-20 shrink-0 rounded-lg border border-border object-cover sm:block"
              />
            )}
            <div className="min-w-0 flex-1">
              <h3 className="font-headline text-lg font-bold text-ink">
                About
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
                {about.summary}
              </p>
              {about.wikipediaUrl && (
                <a
                  href={about.wikipediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block font-mono text-xs text-muted underline decoration-border underline-offset-4 hover:text-ink hover:decoration-ink"
                >
                  Read more on Wikipedia
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
              {stat.label}
            </div>
            <div className="mt-1">
              <MoneyAmount
                amount={stat.amount}
                compact
                className="text-2xl font-bold"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Top 3 summaries side by side */}
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Top Donors preview */}
        <div>
          <h3 className="font-headline text-lg font-bold text-ink">
            Top Money In
          </h3>
          <div className="mt-4 space-y-3">
            {topDonors.length === 0 && (
              <p className="text-sm text-muted">No inflow records found.</p>
            )}
            {topDonors.map((d) => (
              <MoneyRow
                key={d.id}
                href={`/entity/${d.sourceType.toLowerCase()}/${d.sourceEntityId}`}
                colorKey={d.sourceType.toLowerCase()}
                name={d.sourceName}
                transactionType={d.transactionType}
                amount={d.totalAmount}
                variant="in"
              />
            ))}
          </div>
        </div>

        {/* Top Recipients preview */}
        <div>
          <h3 className="font-headline text-lg font-bold text-ink">
            Top Money Out
          </h3>
          <div className="mt-4 space-y-3">
            {topRecipients.length === 0 && (
              <p className="text-sm text-muted">No outflow records found.</p>
            )}
            {topRecipients.map((r) => (
              <MoneyRow
                key={r.id}
                href={`/entity/${r.targetType.toLowerCase()}/${r.targetEntityId}`}
                colorKey={r.targetType.toLowerCase()}
                name={r.targetName}
                transactionType={r.transactionType}
                amount={r.totalAmount}
                variant="out"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Tab: About ────────────────────────────────────────

function AboutTab({ entity }: { entity: EntityMeta }) {
  const { about, loading } = useAbout(entity);
  const entityLabel = entity.type.replace(/_/g, " ").toLowerCase();

  return (
    <div className="max-w-3xl">
      <h3 className="font-headline text-2xl font-black text-ink">
        About {entity.canonicalName ?? "this entity"}
      </h3>

      {loading && (
        <div className="mt-6 space-y-3">
          <div className="h-3 w-full animate-pulse rounded bg-border/40" />
          <div className="h-3 w-full animate-pulse rounded bg-border/40" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-border/40" />
          <div className="h-3 w-4/6 animate-pulse rounded bg-border/40" />
          <div className="h-3 w-full animate-pulse rounded bg-border/40" />
          <div className="h-3 w-3/4 animate-pulse rounded bg-border/40" />
        </div>
      )}

      {!loading && about?.summary && (
        <div className="mt-6">
          <div className="flex items-start gap-6">
            {about.thumbnailUrl && (
              <img
                src={about.thumbnailUrl}
                alt={entity.canonicalName ?? ""}
                className="hidden h-32 w-32 shrink-0 rounded-xl border border-border object-cover shadow-sm sm:block"
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-base leading-relaxed text-ink/80 first-letter:float-left first-letter:mr-2 first-letter:font-headline first-letter:text-4xl first-letter:font-black first-letter:leading-none first-letter:text-ink">
                {about.summary}
              </p>
            </div>
          </div>

          {about.wikipediaUrl && (
            <div className="mt-6 border-t border-border pt-4">
              <a
                href={about.wikipediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-ink"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.09 13.119c-.936 1.932-2.217 4.548-2.853 5.728-.616 1.074-1.127.931-1.532.029-1.406-3.321-4.293-9.144-5.651-12.409-.251-.601-.441-.987-.619-1.139-.181-.15-.554-.24-1.122-.271C.103 5.033 0 4.982 0 4.898v-.455l.052-.045c.924-.005 5.401 0 5.401 0l.051.045v.434c0 .119-.075.176-.225.176l-.564.031c-.485.029-.727.164-.727.407 0 .07.019.178.058.326.79 2.254 2.618 6.242 3.788 8.884.049-.085 1.588-3.306 2.421-5.078.203-.434.304-.773.304-1.015 0-.386-.282-.59-.846-.613l-.529-.025c-.158 0-.237-.063-.237-.189v-.422l.054-.045h4.29l.054.045v.403c0 .144-.07.216-.212.216l-.391.019c-.556.027-.835.18-1.093.732-.623 1.35-1.931 3.957-2.58 5.381.049.104 2.377 5.401 2.377 5.401.083.166.173.126.253-.021.573-1.053 3.077-6.26 3.788-7.747.184-.389.272-.694.272-.914 0-.344-.21-.56-.63-.649l-.58-.094c-.152 0-.227-.063-.227-.188v-.403l.054-.045h3.775l.054.045v.455c0 .072-.069.132-.207.179l-.401.065c-.539.127-.787.345-1.243 1.256l-4.079 8.209c-.391.773-.789.678-1.104.066z" />
                </svg>
                Read full article on Wikipedia
              </a>
            </div>
          )}
        </div>
      )}

      {!loading && !about?.summary && (
        <div className="mt-6 rounded-xl border border-dashed border-border bg-surface/50 px-6 py-10 text-center">
          <p className="font-mono text-sm text-muted">
            No background information available for this {entityLabel} yet.
          </p>
          <p className="mt-2 text-xs text-muted/60">
            Background data is sourced from Wikipedia and cached automatically.
          </p>
        </div>
      )}
    </div>
  );
}

// ── Tab: Money In ──────────────────────────────────────

function MoneyInTab({ donors }: { donors: Donor[] }) {
  if (donors.length === 0) {
    return <EmptyState message="No inflow records found." />;
  }

  return (
    <div>
      <h3 className="font-headline text-lg font-bold text-ink">All Inflows</h3>
      <div className="mt-4 space-y-2">
        {donors.map((d) => (
          <MoneyRow
            key={d.id}
            href={`/entity/${d.sourceType.toLowerCase()}/${d.sourceEntityId}`}
            colorKey={d.sourceType.toLowerCase()}
            name={d.sourceName}
            transactionType={d.transactionType}
            amount={d.totalAmount}
            variant="in"
          />
        ))}
      </div>
    </div>
  );
}

// ── Tab: Money Out ─────────────────────────────────────

function MoneyOutTab({ recipients }: { recipients: Recipient[] }) {
  if (recipients.length === 0) {
    return <EmptyState message="No outflow records found." />;
  }

  return (
    <div>
      <h3 className="font-headline text-lg font-bold text-ink">All Outflows</h3>
      <div className="mt-4 space-y-2">
        {recipients.map((r) => (
          <MoneyRow
            key={r.id}
            href={`/entity/${r.targetType.toLowerCase()}/${r.targetEntityId}`}
            colorKey={r.targetType.toLowerCase()}
            name={r.targetName}
            transactionType={r.transactionType}
            amount={r.totalAmount}
            variant="out"
          />
        ))}
      </div>
    </div>
  );
}

// ── Tab: Connections ───────────────────────────────────

function ConnectionsTab({ relationships }: { relationships: Relationship[] }) {
  if (relationships.length === 0) {
    return <EmptyState message="No connections found." />;
  }

  return (
    <div>
      <h3 className="font-headline text-lg font-bold text-ink">
        Entity Connections
      </h3>
      <div className="mt-4 flex flex-wrap gap-3">
        {relationships.map((rel, i) => (
          <Link
            key={i}
            href={`/entity/${rel.entityType.toLowerCase()}/${rel.entityId}`}
            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm transition-colors hover:border-ink/20"
          >
            <div
              className="h-2 w-2 shrink-0 rounded-full"
              style={{
                backgroundColor:
                  ENTITY_COLORS[rel.entityType.toLowerCase() as EntityType] ??
                  "#6b7280",
              }}
            />
            <span className="text-ink">{rel.entityName}</span>
            <span className="rounded bg-border/60 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
              {rel.type.replace(/_/g, " ")}
            </span>
            <span className="font-mono text-[10px] text-muted">
              {rel.direction === "outgoing" ? "\u2192" : "\u2190"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── Tab: Profile ───────────────────────────────────────

function ProfileTab({
  aliases,
  entity,
}: {
  aliases: Alias[];
  entity: EntityMeta;
}) {
  const metaEntries: Array<{ label: string; value: string }> = [];

  if (entity.type)
    metaEntries.push({ label: "Type", value: entity.type.replace(/_/g, " ") });
  if (entity.industry)
    metaEntries.push({ label: "Industry", value: entity.industry });
  if (entity.ticker)
    metaEntries.push({ label: "Ticker", value: entity.ticker });
  if (entity.state) metaEntries.push({ label: "State", value: entity.state });
  if (entity.office)
    metaEntries.push({ label: "Office", value: entity.office });
  if (entity.party) metaEntries.push({ label: "Party", value: entity.party });

  return (
    <div className="space-y-8">
      {/* Metadata */}
      <div>
        <h3 className="font-headline text-lg font-bold text-ink">Details</h3>
        <dl className="mt-4 divide-y divide-border">
          {metaEntries.map((entry) => (
            <div
              key={entry.label}
              className="flex items-baseline justify-between py-3"
            >
              <dt className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                {entry.label}
              </dt>
              <dd className="font-mono text-sm text-ink">{entry.value}</dd>
            </div>
          ))}
          {entity.website && (
            <div className="flex items-baseline justify-between py-3">
              <dt className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Website
              </dt>
              <dd>
                <a
                  href={entity.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-ink underline decoration-border underline-offset-4 hover:decoration-ink"
                >
                  {entity.website.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>

      {/* Aliases */}
      {aliases.length > 0 && (
        <div>
          <h3 className="font-headline text-lg font-bold text-ink">
            Known Aliases
          </h3>
          <div className="mt-4 space-y-2">
            {aliases.map((a, i) => (
              <div
                key={i}
                className="flex items-baseline justify-between rounded-lg border border-border bg-surface px-4 py-3"
              >
                <span className="text-sm text-ink">{a.alias}</span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
                  {a.source}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {aliases.length === 0 && metaEntries.length <= 1 && (
        <p className="text-sm text-muted">
          No additional profile data available.
        </p>
      )}
    </div>
  );
}

// ── Tab: Trading ──────────────────────────────────────

function TradingTab({ entityId }: { entityId: string }) {
  const [trades, setTrades] = useState<
    Array<{
      id: string;
      ticker: string;
      assetName: string;
      txType: string;
      txDate: string;
      amount: string;
      amountHigh: number;
      owner: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/trades?entityId=${entityId}&limit=50`)
      .then((r) => r.json())
      .then((data) => setTrades(data.trades ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [entityId]);

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 animate-pulse rounded-lg bg-border/30" />
        ))}
      </div>
    );
  }

  if (trades.length === 0) {
    return <EmptyState message="No stock trades disclosed by this member." />;
  }

  // Summary stats
  const purchases = trades.filter((t) => t.txType === "purchase");
  const sales = trades.filter((t) => t.txType === "sale");
  const estVolume = trades.reduce((sum, t) => sum + t.amountHigh, 0);
  const uniqueTickers = new Set(trades.map((t) => t.ticker)).size;

  return (
    <div>
      <h3 className="font-headline text-lg font-bold text-ink">Stock Trades</h3>
      <p className="mt-1 text-sm text-muted">
        Financial transactions disclosed under the STOCK Act
      </p>

      {/* Quick stats */}
      <div className="mt-6 flex flex-wrap gap-6">
        <div>
          <div className="font-mono text-xs uppercase text-muted">Trades</div>
          <div className="font-mono text-xl font-bold text-ink">
            {trades.length}
          </div>
        </div>
        <div>
          <div className="font-mono text-xs uppercase text-muted">
            Est. Volume
          </div>
          <div className="font-mono text-xl font-bold text-ink">
            {formatCompactMoney(estVolume)}
          </div>
        </div>
        <div>
          <div className="font-mono text-xs uppercase text-muted">Tickers</div>
          <div className="font-mono text-xl font-bold text-ink">
            {uniqueTickers}
          </div>
        </div>
        <div>
          <div className="font-mono text-xs uppercase text-muted">
            Buy / Sell
          </div>
          <div className="font-mono text-xl font-bold">
            <span className="text-money-in">{purchases.length}</span>
            {" / "}
            <span className="text-money-out">{sales.length}</span>
          </div>
        </div>
      </div>

      {/* Trade list */}
      <div className="mt-6 space-y-1.5">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
                  trade.txType === "purchase"
                    ? "bg-money-in/10 text-money-in"
                    : "bg-money-out/10 text-money-out"
                }`}
              >
                {trade.txType}
              </span>
              <div>
                <span className="font-mono text-sm font-bold text-ink">
                  {trade.ticker}
                </span>
                <span className="ml-2 text-xs text-muted">
                  {trade.assetName}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-sm text-ink">{trade.amount}</div>
              <div className="font-mono text-[10px] text-muted">
                {trade.txDate} · {trade.owner}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Link
          href={`/trades?entityId=${entityId}`}
          className="font-mono text-xs text-muted underline decoration-border underline-offset-4 hover:text-ink"
        >
          View all trades →
        </Link>
      </div>
    </div>
  );
}

// ── Tab: Voting ──────────────────────────────────────

function VotingTab({
  entityId,
  entityName,
}: {
  entityId: string;
  entityName: string;
}) {
  const [votes, setVotes] = useState<
    Array<{
      id: string;
      position: string;
      voteDate: string;
      legislation: {
        id: string;
        billId: string;
        title: string;
        policyArea: string | null;
      };
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/legislation?sponsorId=${entityId}&limit=100`)
      .then((r) => r.json())
      .then((data) => {
        // Also fetch votes cast by this entity
        return fetch(`/api/entity/${entityId}/votes`)
          .then((r) => {
            if (!r.ok) throw new Error();
            return r.json();
          })
          .catch(() => {
            // If no dedicated votes endpoint, show sponsored bills
            return { votes: [] };
          });
      })
      .then((data) => setVotes(data.votes ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [entityId]);

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 animate-pulse rounded-lg bg-border/30" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-headline text-lg font-bold text-ink">
        Voting Record
      </h3>
      <p className="mt-1 text-sm text-muted">
        Roll-call votes cast by {entityName}
      </p>

      {votes.length === 0 && (
        <div className="mt-6 rounded-lg border border-dashed border-border bg-surface/50 px-6 py-10 text-center">
          <p className="font-mono text-sm text-muted">
            No voting records available yet.
          </p>
          <p className="mt-1 text-xs text-muted/60">
            Voting data is synced from Congress.gov roll-call records.
          </p>
          <Link
            href="/legislation"
            className="mt-4 inline-block font-mono text-xs text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
          >
            Browse all legislation →
          </Link>
        </div>
      )}

      {votes.length > 0 && (
        <div className="mt-6 space-y-1.5">
          {votes.map((vote) => (
            <div
              key={vote.id}
              className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
                    vote.position === "YEA"
                      ? "bg-money-in/10 text-money-in"
                      : vote.position === "NAY"
                        ? "bg-money-out/10 text-money-out"
                        : "bg-border/30 text-muted"
                  }`}
                >
                  {vote.position}
                </span>
                <div className="min-w-0">
                  <span className="text-sm text-ink line-clamp-1">
                    {vote.legislation.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-muted">
                      {vote.legislation.billId}
                    </span>
                    {vote.legislation.policyArea && (
                      <span className="font-mono text-[10px] text-muted/60">
                        {vote.legislation.policyArea}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <span className="shrink-0 font-mono text-[10px] text-muted">
                {vote.voteDate}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <Link
          href="/legislation"
          className="font-mono text-xs text-muted underline decoration-border underline-offset-4 hover:text-ink"
        >
          View all legislation →
        </Link>
      </div>
    </div>
  );
}

// ── Shared: Money Row ──────────────────────────────────

function MoneyRow({
  href,
  colorKey,
  name,
  transactionType,
  amount,
  variant,
}: {
  href: string;
  colorKey: string;
  name: string;
  transactionType: string;
  amount: number;
  variant: "in" | "out";
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 transition-colors hover:border-ink/20"
    >
      <div className="flex items-center gap-3">
        <div
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{
            backgroundColor: ENTITY_COLORS[colorKey as EntityType] ?? "#6b7280",
          }}
        />
        <div>
          <div className="text-sm font-medium text-ink">{name}</div>
          <div className="font-mono text-xs text-muted">
            {transactionType.replace(/_/g, " ").toLowerCase()}
          </div>
        </div>
      </div>
      <span
        className={`font-mono text-sm font-bold ${
          variant === "in" ? "text-money-in" : "text-money-out"
        }`}
      >
        {formatCompactMoney(amount)}
      </span>
    </Link>
  );
}

// ── Shared: Empty State ────────────────────────────────

function EmptyState({ message }: { message: string }) {
  return <p className="text-sm text-muted">{message}</p>;
}
