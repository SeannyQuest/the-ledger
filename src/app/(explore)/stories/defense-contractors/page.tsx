import Link from "next/link";
import { ArrowRight, ArrowUpRight, Shield, Building2, Landmark, FileText, TrendingUp } from "lucide-react";
import { ScrollytellSection } from "@/components/stories/ScrollytellSection";
import type { ScrollytellStep } from "@/components/stories/ScrollytellSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Defense Contractor Pipeline — The Ledger",
  description:
    "How defense contractors spend millions on lobbying and PAC donations, then receive billions back in government contracts. An investigation by The Ledger.",
};

const MONEY_FLOW_STEPS: ScrollytellStep[] = [
  {
    id: "donation",
    title: "The Donation",
    body: "The top five defense contractors — Lockheed Martin, Raytheon, Northrop Grumman, Boeing, and General Dynamics — collectively funneled $67 million into political action committees and direct campaign contributions during the 2022-2024 election cycles. These donations were split roughly 55/45 between Republican and Democratic candidates, ensuring access regardless of which party holds power.",
    stat: { value: "$67M", label: "PAC & Campaign Donations", color: "money-in" },
    highlightColor: "#1a7a3a",
  },
  {
    id: "lobby",
    title: "The Lobby",
    body: "Simultaneously, these same five corporations spent $142 million on lobbying firms with direct access to congressional leadership and key committee members. Lobbying disclosures show over 740 individual lobbyists employed — many of them former Pentagon officials, congressional staffers, or retired military officers who walked through the revolving door.",
    stat: { value: "$142M", label: "Lobbying Expenditures", color: "accent" },
    highlightColor: "#d97706",
  },
  {
    id: "legislation",
    title: "The Legislation",
    body: "Of the 51 members sitting on the House and Senate Armed Services Committees, 48 received direct contributions from defense contractor PACs. These committee members draft and approve the National Defense Authorization Act — the legislation that determines how hundreds of billions of defense dollars are allocated each year.",
    stat: { value: "48/51", label: "Committee Members Funded", color: "entity-politician" },
    highlightColor: "#2563eb",
  },
  {
    id: "contract",
    title: "The Contract",
    body: "In the same period, the Department of Defense awarded $178 billion in contracts to these five companies. From F-35 fighter jets to missile defense systems to IT infrastructure — the contracts span every branch of the military and represent the largest concentration of federal procurement spending in any single industry.",
    stat: { value: "$178B", label: "Defense Contracts Awarded", color: "money-out" },
    highlightColor: "#c41d1d",
  },
  {
    id: "roi",
    title: "The Return on Investment",
    body: "For every $1 these corporations spent on political donations and lobbying, they received approximately $850 back in government contracts. That is an 85,000% return on investment. No stock market play, no venture capital bet, no real estate deal comes close. This is the most reliable investment in America — and it is perfectly legal.",
    stat: { value: "$850", label: "Returned Per $1 Spent", color: "#c41d1d" },
    highlightColor: "#c41d1d",
  },
];

const KEY_PLAYERS = [
  {
    name: "Lockheed Martin",
    type: "corporation" as const,
    stat: "$63.4B in contracts",
    description: "The largest defense contractor in the world. Primary contractor for the F-35 program.",
    href: "/entity/corporation/lockheed-martin",
    icon: Building2,
  },
  {
    name: "Senate Armed Services Committee",
    type: "agency" as const,
    stat: "26 members",
    description: "The Senate committee responsible for authorizing defense spending and military policy.",
    href: "/entity/agency/senate-armed-services",
    icon: Landmark,
  },
  {
    name: "Raytheon Technologies",
    type: "corporation" as const,
    stat: "$38.7B in contracts",
    description: "Major missile systems and defense electronics manufacturer. Merged with United Technologies in 2020.",
    href: "/entity/corporation/raytheon",
    icon: Building2,
  },
  {
    name: "Northrop Grumman",
    type: "corporation" as const,
    stat: "$29.1B in contracts",
    description: "Builder of the B-21 stealth bomber and major intelligence systems contractor.",
    href: "/entity/corporation/northrop-grumman",
    icon: Shield,
  },
];

export default function DefenseContractorsStory() {
  return (
    <article>
      {/* Hero */}
      <header className="relative border-b-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-24 lg:px-8 lg:py-32">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
            Investigation &middot; Defense &middot; Campaign Finance
          </div>

          <h1 className="mt-6 font-headline text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl xl:text-8xl">
            The Defense Contractor Pipeline
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70 lg:text-2xl">
            How America&apos;s top five defense contractors spend millions on lobbying and campaign donations — then receive{" "}
            <span className="font-semibold text-white">billions back in government contracts</span>.
          </p>

          <div className="mt-8 flex items-center gap-6 text-sm text-white/50">
            <time dateTime="2026-03-09">March 9, 2026</time>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>12 min read</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>The Ledger Investigations</span>
          </div>
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

      {/* Lead paragraph */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <p className="drop-cap text-xl leading-relaxed text-ink/80 lg:text-2xl lg:leading-relaxed">
            In the marble corridors of the Pentagon, a transaction is taking place that dwarfs anything on Wall Street.
            Every year, a handful of defense corporations write checks to politicians, hire armies of lobbyists,
            and receive back contracts worth thousands of times their political investment. The numbers are public.
            The pattern is unmistakable. And yet the pipeline continues, cycle after cycle, administration after administration.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The Ledger traced the money from corporate treasuries to PAC accounts, through lobbying firms,
            into the campaign coffers of Armed Services Committee members, and back out as government contracts.
            What we found is a system so efficient, so bipartisan, and so deeply embedded that it operates
            less like corruption and more like infrastructure.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The following investigation uses publicly available data from FEC.gov, the Senate Lobbying Disclosure Act
            database, and USASpending.gov. All figures are from the 2022-2024 election and procurement cycles.
            Scroll through to see how the money moves.
          </p>
        </div>
      </section>

      {/* Scrollytelling section */}
      <ScrollytellSection
        headline="Follow the Money"
        subhead="Five steps trace the path from corporate treasury to government contract and back again."
        steps={MONEY_FLOW_STEPS}
        bgColor="bg-ink"
        textColor="text-white"
      />

      {/* Pull quote break */}
      <section className="border-y-4 border-ink bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
          <blockquote className="text-center">
            <p className="font-headline text-3xl font-black leading-tight tracking-tight text-ink lg:text-4xl">
              &ldquo;For every dollar spent on political influence, defense contractors saw $850 return in government contracts.
              That&apos;s not lobbying — that&apos;s the best investment in America.&rdquo;
            </p>
            <cite className="mt-6 block font-mono text-sm font-bold uppercase tracking-widest text-muted">
              The Ledger Analysis, 2022-2024 Data
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Analysis section */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <h2 className="font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Revolving Door
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The pipeline doesn&apos;t just flow through money — it flows through people. Of the 740 lobbyists
            employed by the top five defense contractors, our analysis found that 312 previously held positions
            in the Department of Defense, congressional offices, or military leadership. These individuals carry
            with them relationships, institutional knowledge, and direct access to decision-makers.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The pattern is consistent: a senior Pentagon official retires, takes a position at a lobbying firm
            retained by a defense contractor, and uses their connections to influence procurement decisions.
            When the administration changes, the revolving door spins again — this time with industry executives
            taking government positions where they oversee the very contracts their former employers compete for.
          </p>

          {/* Inline stat callout */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-accent">312</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Former Gov. Officials
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">740</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Total Lobbyists
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-in">42%</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Revolving Door Rate
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            This isn&apos;t a partisan issue. Defense contractor PACs split their donations almost evenly
            between parties. The donations track committee assignments, not ideology. A freshman representative
            assigned to the Armed Services Committee will see their defense contractor donations spike within
            the first quarter — regardless of whether they wear a red or blue tie.
          </p>
        </div>
      </section>

      {/* Key Players */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Key Players
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Entities in the Pipeline
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Explore the profiles of the major corporations and institutions driving the defense contractor pipeline.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {KEY_PLAYERS.map((player) => {
              const Icon = player.icon;
              return (
                <Link
                  key={player.name}
                  href={player.href}
                  className="group flex gap-5 rounded-xl border border-border bg-paper p-6 transition-all hover:-translate-y-1 hover:border-ink/30 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface text-ink">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-headline text-lg font-bold text-ink">
                        {player.name}
                      </h3>
                      <ArrowUpRight className="h-4 w-4 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <div className="mt-0.5 font-mono text-sm font-bold text-accent">
                      {player.stat}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {player.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology note */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
          <div className="rounded-xl border border-border bg-surface p-8">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Methodology &amp; Data Sources
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              All figures in this investigation are derived from publicly available data. Campaign
              contribution data comes from the Federal Election Commission (FEC.gov). Lobbying
              expenditures are sourced from the Senate Lobbying Disclosure Act database. Contract
              data comes from USASpending.gov. Figures represent the 2022-2024 election and
              procurement cycles. All numbers are illustrative aggregates for editorial purposes
              and should be verified against primary sources for citation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center lg:px-8">
          <TrendingUp className="mx-auto h-10 w-10 text-accent-light" />
          <h2 className="mt-6 font-headline text-3xl font-black tracking-tight lg:text-4xl">
            See the Full Money Flow
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/60">
            Explore the interactive Sankey diagram to trace every dollar from corporate treasury
            to government contract.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/money-flow"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-white/90"
            >
              Explore Money Flows
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10"
            >
              All Investigations
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
