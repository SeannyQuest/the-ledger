import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Vote, Landmark } from "lucide-react";

export const metadata: Metadata = {
  title: "Elections | Daonra",
  description:
    "Know what's on your ballot. Primary calendars, election board lookup, notable 2026 races, and voter registration resources.",
};
import PrimaryCalendar from "@/components/elections/PrimaryCalendar";
import ElectionBoardFinder from "@/components/elections/ElectionBoardFinder";
import { notableRaces, type Race } from "@/lib/elections-data";

type CivicElection = {
  id: string;
  name: string;
  electionDay: string;
};

const COMPETITIVENESS_STYLES: Record<Race["competitiveness"], string> = {
  "safe-d": "bg-blue-700 text-white",
  "lean-d": "bg-blue-400 text-white",
  "toss-up": "bg-yellow-500 text-ink",
  "lean-r": "bg-red-400 text-white",
  "safe-r": "bg-red-700 text-white",
};

const COMPETITIVENESS_LABELS: Record<Race["competitiveness"], string> = {
  "safe-d": "Safe D",
  "lean-d": "Lean D",
  "toss-up": "Toss-Up",
  "lean-r": "Lean R",
  "safe-r": "Safe R",
};

const TYPE_STYLES: Record<Race["type"], string> = {
  senate: "bg-entity-politician/10 text-entity-politician",
  governor: "bg-entity-agency/10 text-entity-agency",
  special: "bg-entity-pac/10 text-entity-pac",
};

function formatElectionDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function isWithin30Days(dateStr: string): boolean {
  const now = new Date();
  const election = new Date(dateStr);
  const diff = election.getTime() - now.getTime();
  return diff > 0 && diff <= 30 * 24 * 60 * 60 * 1000;
}

async function getUpcomingElections(): Promise<CivicElection[]> {
  const apiKey = process.env.GOOGLE_CIVIC_API_KEY;
  if (!apiKey) return [];

  try {
    const res = await fetch(
      `https://www.googleapis.com/civicinfo/v2/elections?key=${apiKey}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    const elections = (data.elections ?? []) as CivicElection[];
    return elections.filter((e) => e.id !== "2000");
  } catch {
    return [];
  }
}

export default async function ElectionsPage() {
  const upcomingElections = await getUpcomingElections();

  return (
    <section className="bg-paper">
      {/* Hero */}
      <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-32">
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Elections
        </div>
        <h1 className="mt-4 max-w-3xl font-headline text-5xl font-black tracking-tight text-ink lg:text-6xl">
          Know What Is on Your Ballot
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink/70">
          Primaries, generals, and special elections, all in one place. Find
          your polling place, check your registration, and never miss a vote.
        </p>
      </div>

      {/* Upcoming Elections (API) */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <div className="flex items-center gap-3">
            <Vote className="h-6 w-6 text-accent" />
            <h2 className="font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
              Upcoming Elections
            </h2>
          </div>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            Confirmed elections from the Google Civic Information API.
          </p>

          {upcomingElections.length > 0 ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingElections.map((election) => (
                <div
                  key={election.id}
                  className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-ink/30"
                >
                  <h3 className="font-headline text-lg font-bold text-ink">
                    {election.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-ink/70">
                    {formatElectionDate(election.electionDay)}
                  </p>
                  {isWithin30Days(election.electionDay) && (
                    <span className="mt-3 inline-block rounded-full bg-accent px-3 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-white">
                      Coming Up
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-xl border border-border bg-surface p-8 text-center">
              <p className="text-sm text-muted">
                Check back soon. Upcoming elections will appear here as they are
                confirmed.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 2026 Primary Calendar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-6 w-6 text-accent" />
            <h2 className="font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
              2026 Primary Calendar
            </h2>
          </div>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            Every state primary date and type for 2026. Filter by month to plan
            ahead.
          </p>

          <div className="mt-10">
            <PrimaryCalendar />
          </div>
        </div>
      </div>

      {/* State Election Board Finder */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <div className="flex items-center gap-3">
            <Landmark className="h-6 w-6 text-accent" />
            <h2 className="font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
              Find Your State Election Board
            </h2>
          </div>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            Every state has an official election authority. Find yours for
            polling locations, ballot samples, and local race information.
          </p>

          <div className="mt-10">
            <ElectionBoardFinder />
          </div>
        </div>
      </div>

      {/* Notable 2026 Races */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <h2 className="font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Notable 2026 Races
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            The Senate seats and governor mansions most likely to change hands.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {notableRaces.map((race) => (
              <div
                key={race.id}
                className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-ink/30"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-headline text-lg font-bold text-ink">
                    {race.name}
                  </h3>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wider ${COMPETITIVENESS_STYLES[race.competitiveness]}`}
                  >
                    {COMPETITIVENESS_LABELS[race.competitiveness]}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wider ${TYPE_STYLES[race.type]}`}
                  >
                    {race.type}
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {race.state}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  {race.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/civics"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent hover:text-ink"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to Civics Hub
            </Link>
            <Link
              href="/civics/register"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent hover:text-ink"
            >
              Register to Vote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
