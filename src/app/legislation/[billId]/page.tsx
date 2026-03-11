"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  ArrowLeft,
  DollarSign,
  Users,
  Scale,
  Building2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { formatCompactMoney, formatMoney, cn } from "@/lib/utils";
import { PARTY_COLORS, ENTITY_COLORS } from "@/lib/constants";
import { VoteBreakdown } from "@/components/legislation/VoteBreakdown";
import type { EntityType } from "@/types";

/* ── Types ──────────────────────────────────────── */

interface Sponsor {
  id: string;
  name: string;
  party: string | null;
  state: string | null;
  office: string | null;
  totalReceived: number;
  totalLobbying: number;
}

interface BillInfo {
  id: string;
  billId: string;
  billType: string;
  billNumber: string;
  congress: number;
  title: string;
  summary: string | null;
  introducedDate: string;
  lastActionDate: string | null;
  status: string | null;
  policyArea: string | null;
  subjects: string[];
  sponsor: Sponsor | null;
  voteCount: number;
}

interface LobbyingFiling {
  id: string;
  filingId: string;
  amount: number;
  filingDate: string;
  filingYear: number;
  registrant: { id: string; name: string; type: string };
  client: { id: string; name: string; type: string; industry: string | null };
  specificIssues: string | null;
}

interface IndustryBreakdown {
  industry: string;
  amount: number;
  filingCount: number;
}

interface SponsorDonor {
  sourceEntityId: string;
  sourceName: string;
  sourceType: string;
  sourceIndustry: string | null;
  amount: number;
  transactionCount: number;
}

interface PartyVote {
  party: string;
  yea: number;
  nay: number;
  present: number;
  notVoting: number;
}

interface VoteSummary {
  yea: number;
  nay: number;
  present: number;
  notVoting: number;
}

interface InfluenceData {
  bill: BillInfo;
  lobbying: {
    totalSpend: number;
    filingCount: number;
    filings: LobbyingFiling[];
    industryBreakdown: IndustryBreakdown[];
  };
  sponsorDonors: SponsorDonor[];
  pacContributors: SponsorDonor[];
  votes: {
    summary: VoteSummary;
    byParty: PartyVote[];
    totalVoters: number;
  };
}

/* ── Page ───────────────────────────────────────── */

export default function BillInfluencePage() {
  const params = useParams<{ billId: string }>();
  const [data, setData] = useState<InfluenceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.billId) return;
    setLoading(true);

    fetch(`/api/legislation/${encodeURIComponent(params.billId)}/influence`)
      .then((r) => {
        if (!r.ok) throw new Error("Bill not found");
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [params.billId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex items-center gap-3 text-muted">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="font-mono text-sm">Following the money...</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <Link
          href="/legislation"
          className="flex items-center gap-2 font-mono text-xs text-muted hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Legislation
        </Link>
        <div className="mt-8 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600">
            {error ?? "Failed to load bill data"}
          </p>
        </div>
      </div>
    );
  }

  const { bill, lobbying, sponsorDonors, pacContributors, votes } = data;
  const billLabel = `${bill.billType.toUpperCase()} ${bill.billNumber}`;
  const passed = votes.summary.yea > votes.summary.nay;
  const totalVotes =
    votes.summary.yea +
    votes.summary.nay +
    votes.summary.present +
    votes.summary.notVoting;

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
      {/* Back nav */}
      <Link
        href="/legislation"
        className="flex items-center gap-2 font-mono text-xs text-muted hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Legislation
      </Link>

      {/* ── Bill Header ─────────────────────────────── */}
      <div className="mt-8">
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Who Bought This Law?
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded bg-ink px-2.5 py-1 font-mono text-xs font-bold text-white">
            {billLabel}
          </span>
          <span className="font-mono text-xs text-muted">
            {bill.congress}th Congress
          </span>
          {bill.policyArea && (
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] text-accent">
              {bill.policyArea}
            </span>
          )}
          {bill.status && (
            <span className="rounded-full bg-surface px-2.5 py-0.5 font-mono text-[10px] text-muted">
              {bill.status}
            </span>
          )}
        </div>
        <h1 className="mt-4 font-headline text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
          {bill.title}
        </h1>
        {bill.summary && (
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            {bill.summary}
          </p>
        )}

        {/* Sponsor line */}
        {bill.sponsor && (
          <div className="mt-4 flex items-center gap-2">
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: bill.sponsor.party
                  ? PARTY_COLORS[bill.sponsor.party.toLowerCase()] ?? "#6b7280"
                  : "#6b7280",
              }}
            />
            <Link
              href={`/entity/politician/${bill.sponsor.id}`}
              className="font-mono text-sm text-muted hover:text-ink"
            >
              Sponsored by{" "}
              <span className="font-medium text-ink">
                {bill.sponsor.name}
              </span>
              {bill.sponsor.state && ` (${bill.sponsor.state})`}
            </Link>
          </div>
        )}

        {/* Subjects tags */}
        {bill.subjects.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {bill.subjects.slice(0, 8).map((s) => (
              <span
                key={s}
                className="rounded bg-border/30 px-2 py-0.5 font-mono text-[10px] text-muted"
              >
                {s}
              </span>
            ))}
            {bill.subjects.length > 8 && (
              <span className="font-mono text-[10px] text-muted/60">
                +{bill.subjects.length - 8} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── Big Stat Cards ──────────────────────────── */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total Lobbying */}
        <div className="rounded-lg border border-border bg-surface p-5">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-accent" />
            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
              Lobbying on Issue
            </div>
          </div>
          <div className="mt-3 font-mono text-3xl font-black text-ink">
            {formatCompactMoney(lobbying.totalSpend)}
          </div>
          <div className="mt-1 font-mono text-xs text-muted">
            {lobbying.filingCount} filings across{" "}
            {lobbying.industryBreakdown.length} industries
          </div>
        </div>

        {/* Sponsor Donors */}
        <div className="rounded-lg border border-border bg-surface p-5">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-accent" />
            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
              Sponsor&apos;s Top Donors
            </div>
          </div>
          <div className="mt-3 font-mono text-3xl font-black text-ink">
            {sponsorDonors.length > 0
              ? formatCompactMoney(
                  sponsorDonors.reduce((sum, d) => sum + d.amount, 0),
                )
              : "$0"}
          </div>
          <div className="mt-1 font-mono text-xs text-muted">
            {sponsorDonors.length} donors
            {pacContributors.length > 0 &&
              ` (${pacContributors.length} PACs)`}
          </div>
        </div>

        {/* Vote Outcome */}
        <div className="rounded-lg border border-border bg-surface p-5">
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-accent" />
            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
              Vote Outcome
            </div>
          </div>
          {totalVotes > 0 ? (
            <>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-mono text-3xl font-black text-ink">
                  {votes.summary.yea}-{votes.summary.nay}
                </span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 font-mono text-[10px] font-bold",
                    passed
                      ? "bg-money-in/10 text-money-in"
                      : "bg-money-out/10 text-money-out",
                  )}
                >
                  {passed ? "PASSED" : "FAILED"}
                </span>
              </div>
              <div className="mt-1 font-mono text-xs text-muted">
                {votes.totalVoters} total votes across {votes.byParty.length}{" "}
                parties
              </div>
            </>
          ) : (
            <>
              <div className="mt-3 font-mono text-3xl font-black text-muted/40">
                ---
              </div>
              <div className="mt-1 font-mono text-xs text-muted">
                No roll-call vote recorded
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── THE MONEY TRAIL ─────────────────────────── */}
      <div className="mt-14">
        <div className="border-b-2 border-ink pb-2">
          <h2 className="font-headline text-2xl font-black tracking-tight text-ink">
            The Money Trail
          </h2>
          <p className="mt-1 font-mono text-xs text-muted">
            Follow the money from lobbying firms and donors to the bill&apos;s
            sponsor and vote outcome.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Industry Lobbying Breakdown */}
          <div>
            <h3 className="flex items-center gap-2 font-headline text-lg font-bold text-ink">
              <Building2 className="h-4 w-4 text-accent" />
              Industry Lobbying
            </h3>
            <p className="mt-1 font-mono text-[10px] uppercase text-muted">
              Who lobbied on{" "}
              {bill.policyArea ?? "related issues"}
            </p>

            {lobbying.industryBreakdown.length > 0 ? (
              <div className="mt-4 space-y-2">
                {lobbying.industryBreakdown.map((ind) => {
                  const maxAmount = lobbying.industryBreakdown[0]?.amount || 1;
                  const pct = Math.max(
                    (ind.amount / maxAmount) * 100,
                    2,
                  );
                  return (
                    <div key={ind.industry}>
                      <div className="flex items-center justify-between">
                        <span className="truncate text-xs font-medium text-ink">
                          {ind.industry}
                        </span>
                        <span className="ml-2 shrink-0 font-mono text-xs text-muted">
                          {formatCompactMoney(ind.amount)}
                        </span>
                      </div>
                      <div className="mt-1 flex h-2 overflow-hidden rounded-full bg-border/30">
                        <div
                          className="h-full rounded-full bg-accent/60 transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="mt-0.5 font-mono text-[10px] text-muted/60">
                        {ind.filingCount} filing
                        {ind.filingCount !== 1 ? "s" : ""}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="mt-4 rounded-lg border border-dashed border-border px-4 py-8 text-center">
                <p className="font-mono text-xs text-muted">
                  No lobbying filings matched this bill&apos;s policy area.
                </p>
              </div>
            )}
          </div>

          {/* Sponsor Donor List */}
          <div>
            <h3 className="flex items-center gap-2 font-headline text-lg font-bold text-ink">
              <DollarSign className="h-4 w-4 text-accent" />
              Sponsor&apos;s Top Donors
            </h3>
            <p className="mt-1 font-mono text-[10px] uppercase text-muted">
              Who funded{" "}
              {bill.sponsor?.name ?? "the sponsor"}
            </p>

            {sponsorDonors.length > 0 ? (
              <div className="mt-4 space-y-1">
                {sponsorDonors.map((donor, i) => (
                  <Link
                    key={donor.sourceEntityId}
                    href={`/entity/${donor.sourceType}/${donor.sourceEntityId}`}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-surface"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-border/40 font-mono text-[10px] font-bold text-muted">
                      {i + 1}
                    </span>
                    <div
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{
                        backgroundColor:
                          ENTITY_COLORS[
                            donor.sourceType as EntityType
                          ] ?? "#6b7280",
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-xs font-medium text-ink">
                        {donor.sourceName}
                      </div>
                      <div className="font-mono text-[10px] text-muted/60">
                        {donor.sourceIndustry ?? donor.sourceType}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs font-bold text-ink">
                        {formatCompactMoney(donor.amount)}
                      </div>
                      <div className="font-mono text-[10px] text-muted/60">
                        {donor.transactionCount} txn
                        {donor.transactionCount !== 1 ? "s" : ""}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-lg border border-dashed border-border px-4 py-8 text-center">
                <p className="font-mono text-xs text-muted">
                  No donor data available for this bill&apos;s sponsor.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Vote Breakdown by Party ─────────────────── */}
      {totalVotes > 0 && (
        <div className="mt-14">
          <div className="border-b-2 border-ink pb-2">
            <h2 className="font-headline text-2xl font-black tracking-tight text-ink">
              Vote Breakdown
            </h2>
            <p className="mt-1 font-mono text-xs text-muted">
              How each party voted on this bill.
            </p>
          </div>

          {/* Overall bar */}
          <div className="mt-6">
            <VoteBreakdown votes={votes.summary} />
          </div>

          {/* By party */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {votes.byParty.map((pv) => {
              const partyTotal = pv.yea + pv.nay + pv.present + pv.notVoting;
              const yeaPct =
                partyTotal > 0
                  ? ((pv.yea / partyTotal) * 100).toFixed(0)
                  : "0";
              const nayPct =
                partyTotal > 0
                  ? ((pv.nay / partyTotal) * 100).toFixed(0)
                  : "0";
              const partyColor =
                PARTY_COLORS[pv.party.toLowerCase()] ?? "#6b7280";
              const partyLabel =
                pv.party.charAt(0) + pv.party.slice(1).toLowerCase();

              return (
                <div
                  key={pv.party}
                  className="rounded-lg border border-border bg-surface p-4"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: partyColor }}
                    />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                      {partyLabel}
                    </span>
                    <span className="ml-auto font-mono text-[10px] text-muted">
                      {partyTotal} votes
                    </span>
                  </div>

                  {/* Party vote bar */}
                  <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-border/30">
                    <div
                      className="h-full bg-money-in"
                      style={{
                        width: `${partyTotal > 0 ? (pv.yea / partyTotal) * 100 : 0}%`,
                      }}
                    />
                    <div
                      className="h-full bg-money-out"
                      style={{
                        width: `${partyTotal > 0 ? (pv.nay / partyTotal) * 100 : 0}%`,
                      }}
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-muted">
                        <span className="font-bold text-money-in">
                          {pv.yea}
                        </span>{" "}
                        Yea ({yeaPct}%)
                      </span>
                      <span className="font-mono text-xs text-muted">
                        <span className="font-bold text-money-out">
                          {pv.nay}
                        </span>{" "}
                        Nay ({nayPct}%)
                      </span>
                    </div>
                  </div>

                  {(pv.present > 0 || pv.notVoting > 0) && (
                    <div className="mt-1 font-mono text-[10px] text-muted/60">
                      {pv.present > 0 && `Present: ${pv.present}`}
                      {pv.present > 0 && pv.notVoting > 0 && " / "}
                      {pv.notVoting > 0 && `Not voting: ${pv.notVoting}`}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── PAC Contributors ────────────────────────── */}
      {pacContributors.length > 0 && (
        <div className="mt-14">
          <div className="border-b-2 border-ink pb-2">
            <h2 className="font-headline text-2xl font-black tracking-tight text-ink">
              PAC Contributors
            </h2>
            <p className="mt-1 font-mono text-xs text-muted">
              Political Action Committees that funded the sponsor.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pacContributors.map((pac) => (
              <Link
                key={pac.sourceEntityId}
                href={`/entity/${pac.sourceType}/${pac.sourceEntityId}`}
                className="rounded-lg border border-border bg-surface p-4 transition-colors hover:border-ink/20"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor:
                        ENTITY_COLORS[pac.sourceType as EntityType] ??
                        "#9333ea",
                    }}
                  />
                  <span className="font-mono text-[10px] uppercase text-muted">
                    {pac.sourceType === "super_pac" ? "Super PAC" : "PAC"}
                  </span>
                </div>
                <div className="mt-2 text-sm font-medium text-ink line-clamp-1">
                  {pac.sourceName}
                </div>
                <div className="mt-1 font-mono text-lg font-bold text-ink">
                  {formatCompactMoney(pac.amount)}
                </div>
                <div className="mt-0.5 font-mono text-[10px] text-muted">
                  {pac.transactionCount} transaction
                  {pac.transactionCount !== 1 ? "s" : ""}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Lobbying Filings Detail ─────────────────── */}
      {lobbying.filings.length > 0 && (
        <LobbyingFilingsSection filings={lobbying.filings} />
      )}

      {/* ── Follow the Money CTA ────────────────────── */}
      {bill.sponsor && (
        <div className="mt-14 rounded-lg border-2 border-ink bg-ink/5 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-headline text-xl font-bold text-ink">
                Follow the Money
              </h3>
              <p className="mt-1 max-w-lg text-sm text-muted">
                Trace the full money pipeline from donors through PACs to{" "}
                {bill.sponsor.name} and beyond. See the complete financial
                network.
              </p>
            </div>
            <Link
              href={`/money-flow?entity=${bill.sponsor.id}`}
              className="flex shrink-0 items-center gap-2 rounded-lg bg-ink px-5 py-3 font-mono text-xs font-bold text-white transition-colors hover:bg-ink/80"
            >
              View Money Flow
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Methodology */}
      <div className="mt-12 rounded-lg border border-border bg-surface/50 px-4 py-3">
        <p className="font-mono text-xs text-muted">
          Data sourced from Congress.gov, Senate Lobbying Disclosure Act filings,
          and FEC records. Lobbying connections are matched by policy area and
          subject keywords. Donor amounts are aggregate totals across all
          election cycles on record.
        </p>
      </div>
    </div>
  );
}

/* ── Lobbying Filings Collapsible Section ───────── */

function LobbyingFilingsSection({
  filings,
}: {
  filings: LobbyingFiling[];
}) {
  const [expanded, setExpanded] = useState(false);
  const visibleFilings = expanded ? filings : filings.slice(0, 5);

  return (
    <div className="mt-14">
      <div className="border-b-2 border-ink pb-2">
        <h2 className="font-headline text-2xl font-black tracking-tight text-ink">
          Lobbying Filings
        </h2>
        <p className="mt-1 font-mono text-xs text-muted">
          Detailed lobbying disclosure filings related to this bill&apos;s
          policy area.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {visibleFilings.map((filing) => (
          <div
            key={filing.id}
            className="rounded-lg border border-border bg-surface p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/entity/lobbying_firm/${filing.registrant.id}`}
                    className="text-sm font-medium text-ink hover:text-accent"
                  >
                    {filing.registrant.name}
                  </Link>
                  <span className="font-mono text-[10px] text-muted/60">
                    for
                  </span>
                  <Link
                    href={`/entity/${filing.client.type}/${filing.client.id}`}
                    className="text-sm font-medium text-ink hover:text-accent"
                  >
                    {filing.client.name}
                  </Link>
                </div>
                {filing.client.industry && (
                  <div className="mt-0.5 font-mono text-[10px] text-muted">
                    {filing.client.industry}
                  </div>
                )}
                {filing.specificIssues && (
                  <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-2">
                    {filing.specificIssues}
                  </p>
                )}
              </div>
              <div className="shrink-0 text-right">
                <div className="font-mono text-sm font-bold text-ink">
                  {filing.amount > 0
                    ? formatMoney(filing.amount)
                    : "Undisclosed"}
                </div>
                <div className="font-mono text-[10px] text-muted">
                  {filing.filingDate} / {filing.filingYear}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filings.length > 5 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-2 font-mono text-xs text-muted hover:text-ink"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3.5 w-3.5" />
              Show fewer filings
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5" />
              Show all {filings.length} filings
            </>
          )}
        </button>
      )}
    </div>
  );
}
