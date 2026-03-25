import Link from "next/link";
import { ArrowRight, ArrowUpRight, TrendingUp, FileText, Shield, Building2, Landmark, Target } from "lucide-react";
import { ScrollytellSection } from "@/components/stories/ScrollytellSection";
import type { ScrollytellStep } from "@/components/stories/ScrollytellSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Defense Dollar | Daonra",
  description:
    "Trace $1 of lobbying spend through the iron triangle. Top defense contractors invested $1.1B in lobbying and received $2.02 trillion in contracts, an 1,800:1 ROI.",
};

const SCROLLYTELL_STEPS: ScrollytellStep[] = [
  {
    id: "dollar",
    title: "The Dollar",
    body: "Take a single dollar from a defense contractor's treasury and follow it through the iron triangle, the self-reinforcing loop between Congress, the Pentagon, and the defense industry. That dollar will pass through lobbying firms, campaign accounts, procurement offices, and executive suites before circling back, multiplied by a factor most investors can only dream of. This is the most efficient money machine in American government.",
    stat: { value: "$1", label: "Trace a Single Dollar", color: "accent" },
    highlightColor: "#d97706",
  },
  {
    id: "investment",
    title: "The Investment",
    body: "From 2001 to 2021, the top five defense contractors (Lockheed Martin, Raytheon, Northrop Grumman, Boeing, and General Dynamics) spent a combined $1.1 billion on lobbying. This figure includes only registered lobbying expenditures; it does not account for campaign contributions, dark money spending, or the unregistered 'strategic consulting' that supplements formal lobbying. The real number is almost certainly higher.",
    stat: { value: "$1.1B", label: "Lobbying Spend (2001-2021)", color: "money-in" },
    highlightColor: "#1a7a3a",
  },
  {
    id: "machine",
    title: "The Machine",
    body: "The defense lobbying operation is a daily affair. At peak, the top five contractors employed 904 registered lobbyists simultaneously, spending an average of $381,000 per day on influence operations. The F-35 fighter jet program alone has suppliers in 45+ states, ensuring that nearly every member of Congress has a constituent whose job depends on the program's continuation. This isn't just lobbying. It's economic entrenchment by design.",
    stat: { value: "$381K", label: "Spent Per Day on Lobbying", color: "accent" },
    highlightColor: "#d97706",
  },
  {
    id: "payoff",
    title: "The Payoff",
    body: "During the same 2001-2021 period, these five companies received approximately $2.02 trillion in Department of Defense contracts. That is a return of roughly $1,800 for every $1 spent on lobbying, an 180,000% return on investment. No stock, no bond, no real estate play in history has produced returns even remotely comparable. The defense dollar doesn't just circulate through the system. It multiplies.",
    stat: { value: "1,800x", label: "Return on Lobbying Dollar", color: "#c41d1d" },
    highlightColor: "#c41d1d",
  },
  {
    id: "circle",
    title: "The Circle",
    body: "The iron triangle closes when people move through the same revolving door as the money. Pentagon officials retire into executive positions at defense contractors. Defense industry executives take senior Pentagon appointments overseeing procurement. Lobbyists shuttle between K Street and government service. The circle is unbroken: the same individuals who award contracts later profit from them, and the same individuals who profit from contracts later award them.",
    stat: { value: "360°", label: "The Iron Triangle Completes", color: "#c41d1d" },
    highlightColor: "#c41d1d",
  },
];

const KEY_PLAYERS = [
  {
    name: "Lockheed Martin",
    type: "corporation" as const,
    stat: "$75B+ avg. annual contracts",
    description: "The world's largest defense contractor. Maker of the F-35, the most expensive weapons program in history with suppliers in 45+ states.",
    href: "/entity/corporation/lockheed-martin",
    icon: Building2,
  },
  {
    name: "Raytheon Technologies",
    type: "corporation" as const,
    stat: "$30B+ avg. annual contracts",
    description: "Major missile systems and defense electronics manufacturer. Merged with United Technologies in 2020 to form RTX Corporation.",
    href: "/entity/corporation/raytheon",
    icon: Target,
  },
  {
    name: "Northrop Grumman",
    type: "corporation" as const,
    stat: "$25B+ avg. annual contracts",
    description: "Builder of the B-21 Raider stealth bomber and major intelligence, surveillance, and reconnaissance systems contractor.",
    href: "/entity/corporation/northrop-grumman",
    icon: Shield,
  },
  {
    name: "Boeing Defense",
    type: "corporation" as const,
    stat: "$25B+ avg. annual contracts",
    description: "Defense arm of Boeing. Produces military aircraft, satellites, and weapons systems alongside its commercial aviation business.",
    href: "/entity/corporation/boeing-defense",
    icon: Building2,
  },
];

export default function DefenseDollarStory() {
  return (
    <article>
      {/* Hero */}
      <header className="relative border-b-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-24 lg:px-8 lg:py-32">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
            Investigation &middot; Defense &middot; ROI
          </div>

          <h1 className="mt-6 font-headline text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl xl:text-8xl">
            The Defense Dollar
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70 lg:text-2xl">
            For every $1 of lobbying, defense contractors received $1,800 in government contracts,{" "}
            <span className="font-semibold text-white">that&apos;s an 180,000% return</span>.
          </p>

          <div className="mt-8 flex items-center gap-6 text-sm text-white/50">
            <time dateTime="2026-03-10">March 10, 2026</time>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>11 min read</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>Daonra Investigations</span>
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
            The iron triangle is not a conspiracy theory. It is a term from political science
            textbooks, describing the mutually reinforcing relationship between Congress, federal
            agencies, and the industries they regulate. Nowhere is this triangle more visible, or more profitable, than in defense. Daonra followed a single dollar from a
            contractor&apos;s lobbying budget through the entire system to measure what comes
            back. The answer: $1,800.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            We analyzed twenty years of lobbying expenditures, campaign contributions, and
            Department of Defense contract awards for the five largest defense contractors.
            The data paints a picture of a system so efficient that it makes every other form
            of investment look primitive. The defense dollar doesn&apos;t just flow through
            Washington. It multiplies, circulates, and entrenches itself.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The following investigation uses data from the Senate Lobbying Disclosure Act
            database, FEC.gov, and USASpending.gov. All figures cover the 2001-2021 period.
            Scroll through to follow the dollar.
          </p>
        </div>
      </section>

      {/* Scrollytelling section */}
      <ScrollytellSection
        headline="Follow the Defense Dollar"
        subhead="Five steps trace a single lobbying dollar through the iron triangle and measure what comes back."
        steps={SCROLLYTELL_STEPS}
        bgColor="bg-ink"
        textColor="text-white"
      />

      {/* Pull quote break */}
      <section className="border-y-4 border-ink bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
          <blockquote className="text-center">
            <p className="font-headline text-3xl font-black leading-tight tracking-tight text-ink lg:text-4xl">
              &ldquo;For every $1 of lobbying, defense contractors received $1,800
              in government contracts. That&apos;s an 180,000% return.&rdquo;
            </p>
            <cite className="mt-6 block font-mono text-sm font-bold uppercase tracking-widest text-muted">
              Daonra Analysis, 2001-2021 Data
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Analysis section */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <h2 className="font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Entrenchment Strategy
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The F-35 Joint Strike Fighter is the most expensive weapons program in human history,
            with a lifetime cost estimated at $1.7 trillion. It is also the most politically
            protected. Lockheed Martin deliberately distributed its supply chain across 45 states
            and over 1,500 suppliers, ensuring that canceling or reducing the program would
            eliminate jobs in nearly every congressional district. This is not a manufacturing
            decision. It is a political strategy.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The same entrenchment pattern repeats across every major defense program. Shipbuilding
            is split between Virginia and Mississippi. Missile production spans Alabama, Arizona,
            and Massachusetts. Each facility creates a constituency of workers, subcontractors,
            and local businesses whose livelihoods depend on continued defense spending. Members
            of Congress who might otherwise question a program&apos;s cost or effectiveness face
            a simple political calculation: vote for the contract, or explain to your district
            why you eliminated their jobs.
          </p>

          {/* Inline stat callout */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-accent">904</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Registered Lobbyists
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">$2.02T</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                In Contracts Received
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-in">45+</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                States With F-35 Suppliers
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            The iron triangle is self-reinforcing. Contractors lobby for programs. Congress
            funds them to protect jobs. The Pentagon awards contracts to the contractors who
            lobbied for them. Those contractors then use their profits to fund more lobbying.
            The cycle accelerates with each turn, and the numbers grow larger with each
            defense authorization. Breaking the triangle would require Congress to vote
            against its own constituents&apos; economic interests, and that almost never happens.
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
            The Iron Triangle
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Explore the profiles of the defense contractors at the center of the most profitable lobbying operation in America.
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
              All figures in this investigation are derived from publicly available data.
              Lobbying expenditure data comes from the Senate Lobbying Disclosure Act database
              and OpenSecrets.org. Contract award data is sourced from USASpending.gov and
              the Federal Procurement Data System. ROI calculations divide total contract
              value by total registered lobbying expenditures for the same entities and time
              period. All numbers are illustrative aggregates for editorial purposes and should
              be verified against primary sources for citation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center lg:px-8">
          <TrendingUp className="mx-auto h-10 w-10 text-accent-light" />
          <h2 className="mt-6 font-headline text-3xl font-black tracking-tight lg:text-4xl">
            See the Full Iron Triangle
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/60">
            Explore the interactive money flow diagram to trace every dollar from contractor
            treasury through Congress and back.
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
