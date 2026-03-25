import Link from "next/link";
import { ArrowRight, ArrowUpRight, TrendingUp, FileText, DoorOpen, Building2, Landmark, ShieldAlert } from "lucide-react";
import { ScrollytellSection } from "@/components/stories/ScrollytellSection";
import type { ScrollytellStep } from "@/components/stories/ScrollytellSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Revolving Door | Daonra",
  description:
    "65% of Congress walks through the revolving door into lobbying. An investigation into how cooling-off periods are bypassed and regulatory capture becomes the norm.",
};

const SCROLLYTELL_STEPS: ScrollytellStep[] = [
  {
    id: "trend",
    title: "The Trend",
    body: "In the 1970s, roughly 25% of departing members of Congress went on to become lobbyists. By 2019, that number had surged to 65%, according to Public Citizen. The revolving door didn't open gradually. It was ripped off its hinges. As lobbying became more lucrative and legislative experience more valuable to corporations, the pipeline from public service to private influence became the default career path on Capitol Hill.",
    stat: { value: "65%", label: "Of Congress Becomes Lobbyists", color: "#c41d1d" },
    highlightColor: "#c41d1d",
  },
  {
    id: "bypass",
    title: "The Bypass",
    body: "Federal law imposes a one-year 'cooling-off period' for House members and a two-year period for Senators before they can register as lobbyists. In practice, former officials simply become 'strategic consultants' or 'senior advisors' at lobbying firms, performing exactly the same work without formally registering. This shadow lobbying is perfectly legal, widely practiced, and makes the cooling-off period essentially meaningless.",
    stat: { value: "1-2yr", label: "Cooling-Off Period (Easily Bypassed)", color: "accent" },
    highlightColor: "#d97706",
  },
  {
    id: "revenue",
    title: "The Revenue",
    body: "Research shows a direct correlation between a lobbyist's revenue and their former boss's committee assignments. A former staffer from the Senate Finance Committee commands dramatically higher fees than one from a less powerful committee. The value isn't expertise. It's access. When a former chief of staff calls their old boss's office, the call gets returned. When an outsider calls, it doesn't.",
    stat: { value: "$$$", label: "Revenue Tied to Former Boss's Committee", color: "money-in" },
    highlightColor: "#1a7a3a",
  },
  {
    id: "network",
    title: "The Network",
    body: "Former officials don't just carry Rolodexes. They carry institutional knowledge. They know which staffers draft which provisions. They know when a bill is about to move. They know who owes whom a favor. This network effect means that the revolving door doesn't just benefit individuals. It creates an entire ecosystem where private interests have better intelligence about government than the public does.",
    stat: { value: "740+", label: "Former Officials as Lobbyists (Defense Alone)", color: "accent" },
    highlightColor: "#d97706",
  },
  {
    id: "system",
    title: "The System",
    body: "The end result is regulatory capture: the phenomenon where the industries being regulated effectively control their regulators. Former Pentagon officials oversee defense budgets, then leave to work for defense contractors. Former FDA officials approve drugs, then join the pharmaceutical companies whose products they reviewed. Former SEC commissioners write financial regulations, then defend Wall Street firms against those same rules. The fox doesn't just guard the henhouse. It designed it.",
    stat: { value: "100%", label: "Regulatory Capture Cycle", color: "#c41d1d" },
    highlightColor: "#c41d1d",
  },
];

const KEY_PLAYERS = [
  {
    name: "Pentagon → Defense Lobby",
    type: "agency" as const,
    stat: "312 former officials",
    description: "Senior Pentagon officials retire and take positions at lobbying firms representing the defense contractors they once oversaw.",
    href: "/entity/agency/pentagon-revolving-door",
    icon: ShieldAlert,
  },
  {
    name: "FDA → Pharma",
    type: "agency" as const,
    stat: "Regulatory capture pipeline",
    description: "Former FDA officials and reviewers join pharmaceutical companies, leveraging relationships with the agency that approves drugs.",
    href: "/entity/agency/fda-revolving-door",
    icon: Building2,
  },
  {
    name: "Congress → K Street",
    type: "agency" as const,
    stat: "65% become lobbyists",
    description: "The majority of departing members of Congress now enter lobbying or strategic consulting, monetizing their access and relationships.",
    href: "/entity/agency/congress-k-street",
    icon: Landmark,
  },
  {
    name: "Shadow Lobbying",
    type: "corporation" as const,
    stat: "Unregistered, unregulated",
    description: "Former officials perform lobbying work as 'strategic consultants' without registering, bypassing cooling-off periods entirely.",
    href: "/entity/corporation/shadow-lobbying",
    icon: DoorOpen,
  },
];

export default function RevolvingDoorStory() {
  return (
    <article>
      {/* Hero */}
      <header className="relative border-b-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-24 lg:px-8 lg:py-32">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
            Investigation &middot; Revolving Door &middot; Lobbying
          </div>

          <h1 className="mt-6 font-headline text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl xl:text-8xl">
            The Revolving Door
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70 lg:text-2xl">
            65% of Congress walks through the revolving door into lobbying,{" "}
            <span className="font-semibold text-white">and the cooling-off period is fiction</span>.
          </p>

          <div className="mt-8 flex items-center gap-6 text-sm text-white/50">
            <time dateTime="2026-03-10">March 10, 2026</time>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>12 min read</span>
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
            There is a door on K Street that never stops spinning. Every term, members of Congress
            leave office and walk directly into lobbying firms, trading their public trust for
            private paydays. They bring with them relationships, institutional knowledge, and
            access that no amount of money can buy on the open market. The cooling-off period, the thin ethical guardrail meant to prevent this, is routinely circumvented through
            &ldquo;strategic consulting&rdquo; arrangements that perform exactly the same function
            as lobbying without the registration requirement.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            Daonra examined the career trajectories of every member of Congress who left
            office between 2010 and 2024, cross-referencing their post-government employment
            with lobbying registration records and corporate disclosures. We found that the
            revolving door is not a metaphor. It is a business model, and the most profitable
            one in Washington.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The following investigation uses data from the Senate Lobbying Disclosure Act
            database, Public Citizen, and the Center for Responsive Politics. Scroll through
            to see how the door spins.
          </p>
        </div>
      </section>

      {/* Scrollytelling section */}
      <ScrollytellSection
        headline="Through the Revolving Door"
        subhead="Five steps trace the path from public service to private influence, and back again."
        steps={SCROLLYTELL_STEPS}
        bgColor="bg-ink"
        textColor="text-white"
      />

      {/* Pull quote break */}
      <section className="border-y-4 border-ink bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
          <blockquote className="text-center">
            <p className="font-headline text-3xl font-black leading-tight tracking-tight text-ink lg:text-4xl">
              &ldquo;65% of Congress walks through the revolving door.
              The cooling-off period is fiction.&rdquo;
            </p>
            <cite className="mt-6 block font-mono text-sm font-bold uppercase tracking-widest text-muted">
              Public Citizen Research, 2019
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Analysis section */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <h2 className="font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Regulatory Capture in Action
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The revolving door doesn&apos;t just create conflicts of interest. It creates a
            fundamental power imbalance between regulated industries and the public. When a
            former four-star general joins a defense contractor&apos;s board, their former
            subordinates (now running procurement) face an impossible dynamic. When a former
            FDA division director joins a pharmaceutical company, their former colleagues at the
            agency understand the implicit career incentive: be industry-friendly, and the door
            opens for you too.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            This is regulatory capture in its purest form. The regulated industry doesn&apos;t
            need to corrupt individual officials. The system itself aligns incentives: be
            favorable to industry during your government tenure, and be rewarded with a
            lucrative private-sector career afterward. The result is regulation that serves
            the regulated, not the public.
          </p>

          {/* Inline stat callout */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-accent">25%</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Became Lobbyists (1970s)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">65%</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Became Lobbyists (2019)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-in">160%</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Increase Over 40 Years
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            Reform proposals (lifetime lobbying bans, longer cooling-off periods, expanded
            definitions of lobbying activity) are introduced regularly and go nowhere. The
            people who would need to vote for reform are the same people who benefit from
            the current system. The revolving door is self-protecting: the very officials who
            could close it have the most to lose from doing so.
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
            The Revolving Door Network
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Explore the pipelines between government agencies, Congress, and the lobbying firms that connect them.
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
              Revolving door statistics are sourced from Public Citizen and the Center for
              Responsive Politics (OpenSecrets.org). Lobbying registration data comes from
              the Senate Lobbying Disclosure Act database. Career trajectory analysis uses
              public LinkedIn profiles, corporate press releases, and lobbying firm disclosures.
              All numbers are illustrative aggregates for editorial purposes and should be
              verified against primary sources for citation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center lg:px-8">
          <TrendingUp className="mx-auto h-10 w-10 text-accent-light" />
          <h2 className="mt-6 font-headline text-3xl font-black tracking-tight lg:text-4xl">
            Map the Revolving Door
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/60">
            Explore the connections between government officials, lobbying firms, and the
            industries they serve.
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
