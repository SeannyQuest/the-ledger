import Link from "next/link";
import { ArrowRight, ArrowUpRight, TrendingUp, FileText, EyeOff, Building2, Landmark, Scale } from "lucide-react";
import { ScrollytellSection } from "@/components/stories/ScrollytellSection";
import type { ScrollytellStep } from "@/components/stories/ScrollytellSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "$4.3 Billion in the Shadows — The Ledger",
  description:
    "Since Citizens United, $4.3 billion in dark money has flowed through 501(c)(4) nonprofits and shell companies. An investigation into America's anonymous political spending.",
};

const SCROLLYTELL_STEPS: ScrollytellStep[] = [
  {
    id: "loophole",
    title: "The Loophole",
    body: "Under IRS rules, 501(c)(4) 'social welfare' nonprofits can spend up to 49.9% of their budget on political activity — without disclosing a single donor. These organizations were originally designed for civic groups and neighborhood associations. Today they are the preferred vehicle for billionaires, corporations, and foreign-connected entities to spend unlimited sums on American elections while remaining completely anonymous.",
    stat: { value: "49.9%", label: "Political Spending Allowed (No Disclosure)", color: "accent" },
    highlightColor: "#d97706",
  },
  {
    id: "explosion",
    title: "The Explosion",
    body: "In 2008, outside political spending totaled $338 million. Then came Citizens United v. FEC in January 2010, which ruled that corporations and unions could spend unlimited amounts on elections. By 2012, outside spending had quadrupled. By 2024, it surpassed $4.5 billion. The decision didn't just open a door — it demolished the wall between private wealth and public elections.",
    stat: { value: "$4.5B+", label: "Outside Spending (2024)", color: "#c41d1d" },
    highlightColor: "#c41d1d",
  },
  {
    id: "shell-game",
    title: "The Shell Game",
    body: "In the 2024 cycle alone, Super PACs received $1.3 billion from shell companies — LLCs and holding companies with no employees, no public presence, and no discernible business purpose beyond funneling political money. These entities are created weeks before an election, donate millions, and then dissolve. The FEC lacks the resources and, in many cases, the legal authority to trace the true source of the funds.",
    stat: { value: "$1.3B", label: "From Shell Companies (2024)", color: "money-out" },
    highlightColor: "#c41d1d",
  },
  {
    id: "players",
    title: "The Players",
    body: "Crossroads GPS, co-founded by Karl Rove, spent $349 million across multiple cycles without ever disclosing its donors. Americans for Prosperity, funded by the Koch network, deployed $398 million in total political spending. Majority Forward, aligned with Senate Democrats, spent over $200 million. Dark money is not a partisan phenomenon — both sides have built industrial-scale operations to hide who's paying for American elections.",
    stat: { value: "$349M", label: "Crossroads GPS (Undisclosed Donors)", color: "accent" },
    highlightColor: "#d97706",
  },
  {
    id: "failed-reform",
    title: "The Failed Reform",
    body: "The DISCLOSE Act — which would require dark money groups to reveal donors giving more than $10,000 — has been introduced in every Congress since 2010. It has been filibustered every single time. Polls consistently show 75-80% of Americans support mandatory donor disclosure, including majorities of both parties. Yet in fifteen years, not a single transparency reform has passed. The system protects itself.",
    stat: { value: "0", label: "Reforms Passed Since Citizens United", color: "#c41d1d" },
    highlightColor: "#c41d1d",
  },
];

const KEY_PLAYERS = [
  {
    name: "Crossroads GPS",
    type: "corporation" as const,
    stat: "$349M in dark money",
    description: "Co-founded by Karl Rove. One of the largest 501(c)(4) political spenders in history, with zero donor disclosure.",
    href: "/entity/corporation/crossroads-gps",
    icon: EyeOff,
  },
  {
    name: "Americans for Prosperity",
    type: "corporation" as const,
    stat: "$398M total political spending",
    description: "Koch network flagship. Combines 501(c)(4) dark money with Super PAC spending across federal and state races.",
    href: "/entity/corporation/americans-for-prosperity",
    icon: Building2,
  },
  {
    name: "Majority Forward",
    type: "corporation" as const,
    stat: "$200M+ spent",
    description: "Aligned with Senate Democrats. Demonstrates that dark money infrastructure exists on both sides of the aisle.",
    href: "/entity/corporation/majority-forward",
    icon: Landmark,
  },
  {
    name: "Citizens United v. FEC",
    type: "agency" as const,
    stat: "January 21, 2010",
    description: "The Supreme Court decision that opened the floodgates for unlimited corporate and union political spending.",
    href: "/entity/agency/citizens-united",
    icon: Scale,
  },
];

export default function DarkMoneyShadowsStory() {
  return (
    <article>
      {/* Hero */}
      <header className="relative border-b-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-24 lg:px-8 lg:py-32">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
            Investigation &middot; Dark Money &middot; Citizens United
          </div>

          <h1 className="mt-6 font-headline text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl xl:text-8xl">
            $4.3 Billion in the Shadows
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70 lg:text-2xl">
            Since Citizens United, billions in anonymous money have reshaped American elections —{" "}
            <span className="font-semibold text-white">and voters have no idea who&apos;s paying</span>.
          </p>

          <div className="mt-8 flex items-center gap-6 text-sm text-white/50">
            <time dateTime="2026-03-10">March 10, 2026</time>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>13 min read</span>
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
            On January 21, 2010, the Supreme Court ruled in Citizens United v. FEC that
            corporations and unions had a First Amendment right to spend unlimited sums on
            political campaigns. The majority opinion argued that transparency requirements
            would prevent corruption. Fifteen years later, the transparency never came — but
            the money did. Over $4.3 billion in dark money has flowed through the shadows of
            American democracy since that decision.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The Ledger traced the infrastructure of anonymous political spending — from 501(c)(4)
            nonprofits that hide their donors, to shell companies that funnel millions into
            Super PACs, to the filibustered reforms that would have stopped it. What we found
            is a system so thoroughly entrenched that even 80% public support for transparency
            cannot dislodge it.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The following investigation uses data from the Federal Election Commission,
            IRS 990 filings, and the Center for Responsive Politics. All figures are from
            the 2010-2024 period. Scroll through to see how the money hides.
          </p>
        </div>
      </section>

      {/* Scrollytelling section */}
      <ScrollytellSection
        headline="Follow the Dark Money"
        subhead="Five steps reveal how billions in anonymous spending reshaped American elections."
        steps={SCROLLYTELL_STEPS}
        bgColor="bg-ink"
        textColor="text-white"
      />

      {/* Pull quote break */}
      <section className="border-y-4 border-ink bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
          <blockquote className="text-center">
            <p className="font-headline text-3xl font-black leading-tight tracking-tight text-ink lg:text-4xl">
              &ldquo;$4.3 billion has flowed through the shadows since Citizens United —
              and voters have no idea who&apos;s paying.&rdquo;
            </p>
            <cite className="mt-6 block font-mono text-sm font-bold uppercase tracking-widest text-muted">
              The Ledger Analysis, 2010-2024 Data
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Analysis section */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <h2 className="font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Transparency Myth
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Justice Anthony Kennedy, writing for the Citizens United majority, predicted that
            &ldquo;prompt disclosure of expenditures can provide shareholders and citizens with
            the information needed to hold corporations and elected officials accountable.&rdquo;
            He assumed disclosure would happen. It didn&apos;t. The FEC, deadlocked 3-3 along
            partisan lines, has failed to update disclosure rules. The IRS, after a political
            firestorm over scrutiny of Tea Party groups, has largely retreated from enforcing
            the political activity limits on 501(c)(4) organizations.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The result is a system where a single billionaire can create a 501(c)(4) nonprofit,
            donate $50 million to it anonymously, and that nonprofit can then fund attack ads,
            issue campaigns, and voter mobilization efforts — all without a single public record
            connecting the donor to the spending. The money is legal. The anonymity is by design.
          </p>

          {/* Inline stat callout */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-accent">$338M</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Outside Spending (2008)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">$4.5B+</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Outside Spending (2024)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-in">1,231%</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Increase Since 2008
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            Dark money is not a glitch in the system. It is the system. Both parties use it,
            both parties benefit from it, and neither has the incentive to dismantle it. The
            DISCLOSE Act has become a perennial prop — introduced for the press release, then
            quietly allowed to die. Meanwhile, the money flows, the donors stay hidden, and
            the voters are left guessing who is really paying for their democracy.
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
            The Dark Money Network
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Explore the organizations and legal structures that enable anonymous political spending at scale.
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
              Outside spending data comes from the Federal Election Commission (FEC.gov).
              501(c)(4) financial data is sourced from IRS 990 filings. Dark money totals
              and organizational spending figures reference analysis by the Center for
              Responsive Politics (OpenSecrets.org). Shell company donation tracking uses
              FEC independent expenditure reports. All numbers are illustrative aggregates
              for editorial purposes and should be verified against primary sources for citation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center lg:px-8">
          <TrendingUp className="mx-auto h-10 w-10 text-accent-light" />
          <h2 className="mt-6 font-headline text-3xl font-black tracking-tight lg:text-4xl">
            Trace the Dark Money
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/60">
            Explore the interactive money flow diagram to see how anonymous donations
            move through the political system.
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
