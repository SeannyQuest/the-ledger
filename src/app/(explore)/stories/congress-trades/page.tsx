import Link from "next/link";
import { ArrowRight, ArrowUpRight, TrendingUp, FileText, Users, Landmark, BarChart3 } from "lucide-react";
import { ScrollytellSection } from "@/components/stories/ScrollytellSection";
import type { ScrollytellStep } from "@/components/stories/ScrollytellSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Congress Trades on Insider Info | Daonra",
  description:
    "95% of Congress owns stocks, and their leaders outperform the market by up to 47% per year. An investigation into congressional trading and the toothless STOCK Act.",
};

const SCROLLYTELL_STEPS: ScrollytellStep[] = [
  {
    id: "access",
    title: "The Access",
    body: "Ninety-five percent of Congress owns individual stocks. Members sit on committees that oversee industries they invest in — Armed Services, Energy and Commerce, Financial Services. They receive classified briefings, preview unreleased economic data, and negotiate legislation that will move markets. This isn't theoretical access. It's a structural advantage no hedge fund can match.",
    stat: { value: "95%", label: "Of Congress Owns Stocks", color: "accent" },
    highlightColor: "#d97706",
  },
  {
    id: "trade",
    title: "The Trade",
    body: "In 2024, Representative Josh Gottheimer of New Jersey executed 526 individual stock trades with a combined volume of roughly $91 million. He sits on the Financial Services Committee — the body that writes the rules for the same banks and asset managers he trades in. He is not alone. Dozens of members trade hundreds of times per year in the very sectors they regulate.",
    stat: { value: "526", label: "Trades by Top Trader (2024)", color: "money-in" },
    highlightColor: "#1a7a3a",
  },
  {
    id: "outperformance",
    title: "The Outperformance",
    body: "Academic research and public filings reveal that congressional leaders — Speakers, Majority Leaders, committee chairs — outperform the S&P 500 by as much as 47% annually. Rank-and-file members show smaller but still statistically significant outperformance. The pattern holds across parties, chambers, and market conditions. The only common variable is access to non-public information.",
    stat: { value: "47%", label: "Annual Outperformance by Leaders", color: "#c41d1d" },
    highlightColor: "#c41d1d",
  },
  {
    id: "example",
    title: "The Example",
    body: "In late 2022, Speaker Nancy Pelosi's husband purchased $1.8 million in NVIDIA call options. Weeks later, Congress began advancing the CHIPS Act — legislation that would funnel $52 billion in subsidies to semiconductor manufacturers. NVIDIA's stock surged. The position grew to over $5 million in gains. Pelosi's office maintained the trades were made independently. The timing spoke for itself.",
    stat: { value: "$5M+", label: "Gain on NVDA Options", color: "money-in" },
    highlightColor: "#1a7a3a",
  },
  {
    id: "penalty",
    title: "The Penalty",
    body: "The STOCK Act, passed in 2012 with bipartisan fanfare, was supposed to end congressional insider trading. The penalty for failing to disclose a trade on time: $200. Senator Tommy Tuberville accumulated 132 separate violations while sitting on the Armed Services Committee — trades in defense stocks while receiving classified military briefings. Total consequences: zero referrals, zero investigations, zero charges. Ever.",
    stat: { value: "$200", label: "Maximum STOCK Act Fine", color: "accent" },
    highlightColor: "#d97706",
  },
];

const KEY_PLAYERS = [
  {
    name: "Nancy Pelosi",
    type: "politician" as const,
    stat: "$5M+ NVDA gain",
    description: "Former Speaker of the House. Her household's trading portfolio has become a symbol of congressional stock trading.",
    href: "/entity/politician/nancy-pelosi",
    icon: Landmark,
  },
  {
    name: "Tommy Tuberville",
    type: "politician" as const,
    stat: "132 STOCK Act violations",
    description: "Senator from Alabama. Sits on Armed Services Committee while trading defense stocks without consequence.",
    href: "/entity/politician/tommy-tuberville",
    icon: Landmark,
  },
  {
    name: "Josh Gottheimer",
    type: "politician" as const,
    stat: "526 trades, $91M volume",
    description: "Representative from New Jersey. Financial Services Committee member and the most active congressional trader of 2024.",
    href: "/entity/politician/josh-gottheimer",
    icon: BarChart3,
  },
  {
    name: "STOCK Act Enforcement",
    type: "agency" as const,
    stat: "$200 max fine",
    description: "The 2012 law meant to curb insider trading in Congress has no meaningful enforcement mechanism.",
    href: "/entity/agency/stock-act",
    icon: FileText,
  },
];

export default function CongressTradesStory() {
  return (
    <article>
      {/* Hero */}
      <header className="relative border-b-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-24 lg:px-8 lg:py-32">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
            Investigation &middot; Stock Trading &middot; Ethics
          </div>

          <h1 className="mt-6 font-headline text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl xl:text-8xl">
            Congress Trades on Insider Info
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70 lg:text-2xl">
            Members of Congress outperform Wall Street&apos;s best hedge funds —{" "}
            <span className="font-semibold text-white">armed with information the public won&apos;t see for weeks</span>.
          </p>

          <div className="mt-8 flex items-center gap-6 text-sm text-white/50">
            <time dateTime="2026-03-10">March 10, 2026</time>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>14 min read</span>
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
            Every weekday, the men and women who write America&apos;s laws also trade its stocks.
            They sit in classified briefings, negotiate bills that will reshape entire industries,
            and then buy or sell shares in the companies affected — often within days of a market-moving vote.
            The practice is technically restricted by the STOCK Act of 2012. In reality, the law
            has no teeth, and everyone on Capitol Hill knows it.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            Daonra analyzed every financial disclosure filed by sitting members of Congress
            from 2020 through 2024. We cross-referenced trade dates with committee hearings,
            classified briefings, and legislative timelines. What we found is a pattern of
            perfectly timed trades, negligible penalties, and a regulatory framework designed
            to look like oversight while delivering none.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The data is public. The trades are documented. And the returns speak for themselves.
            Scroll through to see how the system works.
          </p>
        </div>
      </section>

      {/* Scrollytelling section */}
      <ScrollytellSection
        headline="Inside the Trades"
        subhead="Five steps show how congressional access turns into market advantage — with virtually zero accountability."
        steps={SCROLLYTELL_STEPS}
        bgColor="bg-ink"
        textColor="text-white"
      />

      {/* Pull quote break */}
      <section className="border-y-4 border-ink bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
          <blockquote className="text-center">
            <p className="font-headline text-3xl font-black leading-tight tracking-tight text-ink lg:text-4xl">
              &ldquo;Congressional leaders outperform Wall Street&apos;s best hedge funds — armed
              with information the public won&apos;t see for weeks.&rdquo;
            </p>
            <cite className="mt-6 block font-mono text-sm font-bold uppercase tracking-widest text-muted">
              Daonra Analysis, 2020-2024 Data
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Analysis section */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <h2 className="font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Toothless Watchdog
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The STOCK Act was signed into law in April 2012 with overwhelming bipartisan support.
            It required members of Congress to disclose stock trades within 45 days and prohibited
            them from using non-public information for personal financial gain. It was hailed as
            a landmark ethics reform. Within a year, Congress quietly gutted its most powerful
            provision — a searchable public database of disclosures — with a voice vote and
            virtually no media coverage.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Today, late disclosures are punished with a $200 fine that members can request to have
            waived. The Department of Justice has never brought an insider trading case against a
            sitting member of Congress under the STOCK Act. Not once. The Office of Congressional
            Ethics can investigate, but it cannot subpoena, cannot compel testimony, and its
            referrals are routinely ignored.
          </p>

          {/* Inline stat callout */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-accent">132</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Tuberville Violations
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">$200</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Maximum Fine
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-in">0</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Members Ever Charged
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            Reform efforts have stalled repeatedly. The TRUST in Congress Act, the Ban Congressional
            Stock Trading Act, and similar proposals have been introduced in every recent session —
            and none have reached a floor vote. Both parties talk about reform during campaign season.
            Neither moves on it once in power. The system works exactly as designed — for the people inside it.
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
            The Traders on Capitol Hill
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Explore the profiles of the most active congressional traders and the enforcement mechanisms meant to stop them.
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
              Congressional stock trade data comes from periodic transaction reports filed
              under the STOCK Act and compiled from the Senate and House financial disclosure
              databases. Outperformance figures reference peer-reviewed academic research on
              congressional trading patterns. STOCK Act violation counts are sourced from
              public reporting and ethics watchdog organizations. All numbers are illustrative
              aggregates for editorial purposes and should be verified against primary sources
              for citation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center lg:px-8">
          <TrendingUp className="mx-auto h-10 w-10 text-accent-light" />
          <h2 className="mt-6 font-headline text-3xl font-black tracking-tight lg:text-4xl">
            Track Congressional Trades
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/60">
            Explore the full database of congressional stock trades and see which members
            are trading in the sectors they regulate.
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
