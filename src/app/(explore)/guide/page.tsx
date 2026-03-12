import Link from "next/link";
import {
  ArrowRight,
  DollarSign,
  Factory,
  Landmark,
  Building2,
  Scale,
  Gavel,
  Flag,
  BookOpen,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Field Guide to American Corruption — The Ledger",
  description:
    "A comprehensive, navigable encyclopedia of political money, corporate capture, and systemic corruption in American democracy. 24 dimensions of influence, from dark money to antitrust.",
};

interface Chapter {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  stat: string;
  statLabel: string;
  topics: string[];
}

const CHAPTERS: Chapter[] = [
  {
    number: 1,
    slug: "the-money-machine",
    title: "The Money Machine",
    subtitle:
      "How lobbying, dark money, Super PACs, and a hollowed-out campaign finance system concentrate power in the hands of the donor class.",
    icon: DollarSign,
    stat: "$4.3B",
    statLabel: "Dark money since Citizens United",
    topics: [
      "Lobbying totals",
      "Dark money",
      "Super PACs & mega-donors",
      "Citizens United",
      "The donor class",
    ],
  },
  {
    number: 2,
    slug: "industry-capture",
    title: "Industry Capture",
    subtitle:
      "Pharma, defense, fossil fuel, and tech — the four industries that spend billions to write the rules they are supposed to follow.",
    icon: Factory,
    stat: "$452M",
    statLabel: "Pharma lobbying per year",
    topics: [
      "Pharmaceutical lobbying",
      "Defense contractors",
      "Fossil fuel influence",
      "Big Tech lobbying",
    ],
  },
  {
    number: 3,
    slug: "wall-street-and-healthcare",
    title: "Wall Street & Healthcare",
    subtitle:
      "From crypto Super PACs to Medicare Advantage fraud, two industries that capture regulators, gut consumer protections, and privatize public systems.",
    icon: Landmark,
    stat: "$868M",
    statLabel: "Health lobbying in 2025",
    topics: [
      "Financial industry lobbying",
      "Crypto & Fairshake PAC",
      "Private equity",
      "Health insurance & PBMs",
      "Medicare Advantage",
      "CFPB assault",
    ],
  },
  {
    number: 4,
    slug: "congress-inc",
    title: "Congress Inc.",
    subtitle:
      "Members of Congress trade stocks on insider information, leave office to become lobbyists, and operate in a system where organized labor is outspent 16 to 1.",
    icon: Building2,
    stat: "65%",
    statLabel: "Of Congress become lobbyists",
    topics: [
      "Congressional stock trading",
      "The revolving door",
      "Union political spending",
    ],
  },
  {
    number: 5,
    slug: "courts-maps-and-ballots",
    title: "Courts, Maps & Ballots",
    subtitle:
      "Billionaires buy judicial seats, gerrymanders lock in minority rule, and corporate money floods ballot measures to veto the will of voters.",
    icon: Scale,
    stat: "$157M",
    statLabel: "Judicial election spending 2023-24",
    topics: [
      "Judicial elections & court capture",
      "Gerrymandering & redistricting money",
      "Corporate ballot measure spending",
    ],
  },
  {
    number: 6,
    slug: "the-justice-system",
    title: "The Justice System",
    subtitle:
      "Private prisons profit from incarceration, the gun lobby blocks reform after every massacre, and corporate monopolies crush competitors while enforcers are starved of funding.",
    icon: Gavel,
    stat: "$45B",
    statLabel: "ICE solicitation for private detention",
    topics: [
      "Private prisons & criminal justice",
      "Gun industry & NRA spending",
      "Antitrust enforcement & corporate power",
    ],
  },
  {
    number: 7,
    slug: "corruption-and-reform",
    title: "Corruption & Reform",
    subtitle:
      "State-level bribery, foreign influence operations, and the reform movements fighting to reclaim democracy — from NYC's matching funds to overturning Citizens United.",
    icon: Flag,
    stat: "$682M",
    statLabel: "Peak reform philanthropy (2020)",
    topics: [
      "State-level corruption",
      "Foreign lobbying (FARA)",
      "Reform landscape",
    ],
  },
];

export default function GuidePage() {
  return (
    <div className="bg-paper">
      {/* Hero */}
      <header className="relative border-b-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-24 lg:px-8 lg:py-32">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
            The Ledger &middot; Reference
          </div>

          <h1 className="mt-6 font-headline text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl xl:text-8xl">
            The Field Guide to
            <br />
            American Corruption
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70 lg:text-2xl">
            A comprehensive encyclopedia of how money buys power in the United
            States — from the lobbying firms on K Street to the courtrooms where
            judges are elected, the prisons run for profit, and the regulators
            captured by the industries they oversee.
          </p>

          <div className="mt-8 flex items-center gap-6 text-sm text-white/50">
            <span>24 dimensions of influence</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>7 chapters</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>Continuously updated</span>
          </div>

          <p className="mt-10 max-w-xl text-base leading-relaxed text-white/50">
            Every number cited in this guide is sourced from federal databases,
            court filings, Senate disclosures, and peer-reviewed research. This
            is not opinion. This is the ledger.
          </p>
        </div>

        {/* Decorative grid */}
        <div
          className="absolute inset-0 -z-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </header>

      {/* Quick stats bar */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border md:grid-cols-4">
          {[
            { value: "$5.08B", label: "Total US lobbying (2025)" },
            { value: "$4.3B", label: "Dark money since 2010" },
            { value: "1,800:1", label: "Defense lobbying ROI" },
            { value: "65%", label: "Of Congress become lobbyists" },
          ].map((item) => (
            <div key={item.label} className="bg-surface p-6 text-center lg:p-8">
              <div className="font-headline text-3xl font-black text-ink lg:text-4xl">
                {item.value}
              </div>
              <div className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chapter listing */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Table of Contents
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Seven Chapters
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Each chapter covers a distinct dimension of how money distorts
            American democracy. Read them in order, or jump to the topic that
            matters to you.
          </p>

          <div className="mt-12 space-y-6">
            {CHAPTERS.map((chapter) => {
              const Icon = chapter.icon;
              return (
                <Link
                  key={chapter.slug}
                  href={`/guide/${chapter.slug}`}
                  className="group block overflow-hidden rounded-xl border border-border bg-surface transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
                >
                  <div className="grid md:grid-cols-12">
                    {/* Left panel */}
                    <div className="flex items-center gap-6 border-b border-border bg-paper p-8 md:col-span-8 md:border-b-0 md:border-r md:p-10">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-ink text-white">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                          Chapter {chapter.number}
                        </div>
                        <h3 className="mt-1 font-headline text-2xl font-black tracking-tight text-ink lg:text-3xl">
                          {chapter.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted lg:text-base">
                          {chapter.subtitle}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {chapter.topics.map((topic) => (
                            <span
                              key={topic}
                              className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-muted"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right stat panel */}
                    <div className="flex flex-col items-center justify-center p-8 md:col-span-4">
                      <div className="font-headline text-4xl font-black text-ink lg:text-5xl">
                        {chapter.stat}
                      </div>
                      <div className="mt-1 text-center font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                        {chapter.statLabel}
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-accent opacity-0 transition-opacity group-hover:opacity-100">
                        Read Chapter <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            About This Guide
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink">
            How to Use This Guide
          </h2>

          <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink/70">
            <p>
              This guide exists because the information it contains is
              deliberately difficult to find. Campaign finance data is scattered
              across dozens of federal databases, state agencies, court filings,
              and academic papers. Lobbying disclosures are filed in formats
              designed to be searched but not read. Dark money, by definition,
              resists documentation.
            </p>
            <p>
              We spent months assembling this data from primary sources: the
              Senate Lobbying Disclosure Act database, FEC filings,
              USASpending.gov, ProPublica&apos;s 990 database, state campaign
              finance agencies, congressional financial disclosures, federal
              court records, and peer-reviewed research from political science,
              economics, and law.
            </p>
            <p>
              Every dollar figure in this guide is sourced. Where estimates
              conflict, we note the range and cite the methodology. Where data
              is incomplete — as it often is with dark money — we say so
              explicitly rather than filling gaps with speculation.
            </p>
            <p>
              This is not a partisan document. The corruption it describes is
              bipartisan. Democrats and Republicans alike benefit from the
              revolving door, trade stocks on insider information, and accept
              money from the industries they regulate. The system is the
              problem, and the system serves both parties.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center lg:px-8">
          <BookOpen className="mx-auto h-10 w-10 text-accent-light" />
          <h2 className="mt-6 font-headline text-3xl font-black tracking-tight lg:text-4xl">
            Start Reading
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/60">
            Begin with Chapter 1 to understand the foundational mechanics of
            political money, or jump to any chapter that interests you.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/guide/the-money-machine"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-white/90"
            >
              Chapter 1: The Money Machine
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Investigations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
