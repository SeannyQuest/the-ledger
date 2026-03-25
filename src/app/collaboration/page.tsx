import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Collaboration | Daonra",
  description:
    "What we build together. Mutual aid networks, civic tech, community organizing, cooperative models, cross-partisan coalitions, and global solidarity: the mechanisms of collective change.",
};

export default function CollaborationPage() {
  return (
    <article className="bg-paper">
      {/* ── HERO ── */}
      <div className="bg-ink text-white">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <nav className="mb-8 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-white/40">
            <Link href="/" className="transition-colors hover:text-white/60">
              Daonra
            </Link>
            <ChevronRight className="h-3 w-3 text-white/25" />
            <span className="text-white/60">Collaboration</span>
          </nav>

          <h1 className="font-headline text-4xl font-black leading-tight text-white md:text-6xl">
            What We Build Together
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">
            Individual action has limits. Collective action doesn&apos;t. From
            mutual aid networks to open-source civic tools to cross-party
            coalitions. Collaboration is the mechanism by which ordinary people
            change systems. Here is what that looks like when it works.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 md:grid-cols-4">
            {[
              {
                value: "1,000+",
                label: "mutual aid networks formed in the U.S. since 2020",
              },
              {
                value: "200+",
                label: "open-source civic tech tools in active use",
              },
              {
                value: "70%",
                label:
                  "of successful ballot initiatives driven by coalition organizing",
              },
              {
                value: "35 states",
                label: "have active cross-partisan anti-corruption campaigns",
              },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-headline text-3xl font-black text-accent-light">
                  {s.value}
                </div>
                <div className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-white/50">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PART I: MUTUAL AID ── */}
      <div className="bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part I
          </p>
          <h2 className="font-headline text-3xl font-black text-ink md:text-4xl">
            Mutual Aid: Cooperation That Actually Reaches People
          </h2>
          <p className="mb-16 mt-6 max-w-3xl text-lg leading-relaxed text-muted">
            Mutual aid is not charity. It is neighbors supporting neighbors,
            horizontally, without gatekeepers, without eligibility requirements.
            It works because it is built by the people who need it.
          </p>

          {/* A. What Mutual Aid Is */}
          <div className="mb-16">
            <h3 className="mb-4 font-headline text-xl font-bold text-ink">
              A. What Mutual Aid Is (and Isn&apos;t)
            </h3>
            <p className="mb-6 leading-relaxed text-muted">
              Scholar and organizer Dean Spade defines mutual aid as
              survival-focused community self-help where participants recognize
              their fates are linked. The distinction from charity isn&apos;t
              semantic. It&apos;s structural. Charity flows top-down: a donor
              with resources gives to a recipient in need, preserving the power
              differential between them. Mutual aid is lateral: everyone in the
              network is both giver and receiver, and the network itself becomes
              a form of collective power.
            </p>

            <div className="mb-6 border-l-4 border-accent pl-5">
              <p className="font-medium text-ink">
                Mutual aid explicitly politicizes need. It doesn&apos;t pretend
                poverty is individual failure. It builds community resilience
                while acknowledging the structural conditions that created the
                crisis in the first place.
              </p>
            </div>

            <p className="mb-4 leading-relaxed text-muted">
              This isn&apos;t new. The history of mutual aid in the U.S. is long
              and largely unwritten:
            </p>
            <ul className="space-y-3 leading-relaxed text-muted">
              {[
                {
                  label: "Black Panther Party (1966–1982):",
                  desc: "Free Breakfast for Children Program fed 20,000 kids daily at peak. Free health clinics ran across 13 cities. These were survival programs: immediate material support embedded in political organizing.",
                },
                {
                  label: "Puerto Rican Young Lords (1969):",
                  desc: "Garbage offensive (literally collected trash in East Harlem to force city sanitation response). Ran a free tuberculosis testing program that exposed city neglect.",
                },
                {
                  label: "Depression-era fraternal organizations:",
                  desc: "Before Social Security, mutual aid societies provided unemployment relief, death benefits, and medical care to members, particularly in immigrant communities.",
                },
              ].map((item) => (
                <li key={item.label} className="flex gap-3">
                  <span className="mt-0.5 font-bold text-accent">•</span>
                  <span>
                    <strong className="text-ink">{item.label}</strong>{" "}
                    {item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* B. COVID-19 Surge */}
          <div className="mb-16">
            <h3 className="mb-4 font-headline text-xl font-bold text-ink">
              B. COVID-19 Surge: What Got Built
            </h3>
            <p className="mb-6 leading-relaxed text-muted">
              Starting March 2020, over 1,000 local mutual aid networks formed
              across the United States in a matter of weeks, with no central
              organization, no federal directive, and no playbook.
            </p>

            <div className="mb-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface p-6">
                <div className="mb-1 font-headline text-lg font-bold text-ink">
                  NYC Mutual Aid
                </div>
                <div className="mb-4 font-mono text-xs text-muted">
                  47 neighborhood networks · 2020–present
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted">
                  Forty-seven neighborhood networks coordinated across the five
                  boroughs, largely via shared Google spreadsheets and Signal
                  groups. In the first eight weeks, they delivered groceries and
                  supplies to over 100,000 isolated residents. By 2021, many
                  networks pivoted to vaccine coordination, driving elderly
                  residents to appointment sites, translating vaccine
                  information into 14 languages.
                </p>
                <div className="border-l-4 border-accent pl-4">
                  <p className="font-medium text-ink">
                    100,000+ households reached in 8 weeks. Zero federal
                    coordination.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-surface p-6">
                <div className="mb-1 font-headline text-lg font-bold text-ink">
                  Bed-Stuy Strong
                </div>
                <div className="mb-4 font-mono text-xs text-muted">
                  Brooklyn, NY · Launched March 15, 2020
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted">
                  Launched with a single Instagram post asking neighbors to help
                  neighbors. Raised $2.3 million directly from community
                  members. Supported 7,000 households with groceries, household
                  supplies, and direct cash assistance. Run entirely by
                  volunteers. No nonprofit overhead, no executive director, no
                  grant applications.
                </p>
                <div className="border-l-4 border-accent pl-4">
                  <p className="font-medium text-ink">
                    $2.3M raised, 7,000 households served. All volunteer-run.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6 rounded-xl border border-border bg-surface p-6">
              <div className="mb-1 font-headline text-lg font-bold text-ink">
                Mutual Aid Hub
              </div>
              <div className="mb-4 font-mono text-xs text-muted">
                mutualaidhub.org · National
              </div>
              <p className="text-sm leading-relaxed text-muted">
                Maintained a crowdsourced national map of networks. At peak in
                2020: 1,200+ active networks listed: everything from
                single-block grocery pods to city-wide coordination networks.
              </p>
            </div>

            <div className="border-l-4 border-accent pl-5">
              <p className="mb-2 font-medium text-ink">
                What made these networks work:
              </p>
              <ul className="space-y-1 text-sm leading-relaxed text-muted">
                <li>
                  Hyper-local, at the neighborhood or block level, not citywide
                  bureaucracy
                </li>
                <li>
                  Low barrier: no application, no eligibility, no proof of need
                  required
                </li>
                <li>Fast, with same-day response in many networks</li>
                <li>
                  Sustained: networks persisted and adapted after the acute
                  emergency passed
                </li>
              </ul>
            </div>
          </div>

          {/* C. Mutual Aid Beyond Crisis */}
          <div>
            <h3 className="mb-4 font-headline text-xl font-bold text-ink">
              C. Mutual Aid Beyond Crisis
            </h3>
            <p className="mb-8 leading-relaxed text-muted">
              The emergency wave of 2020 didn&apos;t dissipate. It built
              infrastructure. Many networks that formed during COVID became the
              basis for ongoing community organizing.
            </p>

            <div className="mb-8 space-y-6">
              <div className="rounded-xl border border-border bg-surface p-6">
                <div className="mb-1 font-headline text-lg font-bold text-ink">
                  Tenant Organizing Networks
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  The LA Tenant Union and NYC Tenant Organizing Project apply
                  mutual aid frameworks to housing: when one tenant faces
                  eviction, the network responds collectively, showing up to
                  hearings, coordinating legal support, organizing building-wide
                  rent strikes.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-6">
                <div className="mb-1 font-headline text-lg font-bold text-ink">
                  Community Fridges
                </div>
                <p className="mb-3 text-sm leading-relaxed text-muted">
                  80+ community fridges operate in New York City alone. Stocked
                  by neighbors, maintained by neighbors, governed by a single
                  principle: &ldquo;Take what you need, leave what you
                  can.&rdquo; No means testing, no appointments, no shame.
                </p>
                <div className="border-l-4 border-accent pl-4">
                  <p className="font-medium text-ink">
                    80+ fridges in NYC. Hundreds more across the country.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-surface p-6">
                <div className="mb-1 font-headline text-lg font-bold text-ink">
                  Westside Tool Library
                </div>
                <div className="mb-3 font-mono text-xs text-muted">
                  Oakland, CA
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  10,000 tools shared by 3,000+ members on a sliding-scale
                  membership model. No one needs to own a $500 circular saw
                  they&apos;ll use twice. The tool library model now exists in
                  dozens of cities, reducing consumption, reducing costs,
                  building neighbor relationships in the process.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <p className="mb-3 font-headline text-base font-bold text-ink">
                Find or start a mutual aid network:
              </p>
              <ul className="space-y-2 text-sm text-muted">
                {[
                  {
                    label: "MutualAidHub.org",
                    desc: "national map of active networks",
                  },
                  {
                    label: "Big Door Brigade",
                    desc: '"How to Do Mutual Aid" guide',
                  },
                  {
                    label: "Dean Spade",
                    desc: "Mutual Aid: Building Solidarity During This Crisis (Verso, 2020, free PDF available)",
                  },
                ].map((item) => (
                  <li key={item.label}>
                    <span className="mr-1 font-mono text-accent">→</span>{" "}
                    <strong className="text-ink">{item.label}</strong>:{" "}
                    {item.desc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── PART II: CIVIC TECH ── */}
      <div className="border-t border-border bg-surface">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part II
          </p>
          <h2 className="font-headline text-3xl font-black text-ink md:text-4xl">
            Civic Tech: Open Tools for Open Government
          </h2>
          <p className="mb-16 mt-6 max-w-3xl text-lg leading-relaxed text-muted">
            Some of the most effective government accountability work happening
            today is built by small teams, volunteers, and nonprofits using open
            data and open source. These tools are changing how citizens access
            information and hold power accountable.
          </p>

          <div className="space-y-8">
            {/* OpenSecrets */}
            <div className="rounded-xl border border-border bg-paper p-6">
              <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                <div className="font-headline text-xl font-bold text-ink">
                  OpenSecrets
                </div>
                <div className="rounded border border-border bg-surface px-2 py-1 font-mono text-xs text-muted">
                  opensecrets.org
                </div>
              </div>
              <div className="mb-5 font-mono text-xs text-muted">
                Center for Responsive Politics · Founded 1983 · ~40 staff
              </div>
              <p className="mb-5 leading-relaxed text-muted">
                The definitive database of money in U.S. politics. Tracks every
                federal campaign finance filing, every lobbying registration,
                and every revolving-door move between government and K Street.
                Founded as a nonprofit in 1983, it has become the first stop for
                journalists, researchers, and watchdog organizations
                investigating political money.
              </p>
              <div className="mb-5 border-l-4 border-accent pl-5">
                <p className="font-medium text-ink">
                  50M+ page views annually. Used by journalists at every major
                  U.S. outlet.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-surface px-4 py-3">
                <p className="text-xs text-muted">
                  <span className="font-mono font-bold text-accent">
                    Daonra connection:
                  </span>{" "}
                  OpenSecrets is a primary data source for this site&apos;s
                  lobbying and money-flow features.
                </p>
              </div>
            </div>

            {/* ProPublica */}
            <div className="rounded-xl border border-border bg-paper p-6">
              <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                <div className="font-headline text-xl font-bold text-ink">
                  ProPublica Congress Tools
                </div>
                <div className="rounded border border-border bg-surface px-2 py-1 font-mono text-xs text-muted">
                  propublica.org
                </div>
              </div>
              <div className="mb-5 font-mono text-xs text-muted">
                ProPublica · Nonprofit newsroom · New York
              </div>
              <p className="mb-5 leading-relaxed text-muted">
                ProPublica has built some of the most consequential civic data
                infrastructure in the country, often as a byproduct of
                investigative reporting. The Congress API provides
                machine-readable access to all Congressional votes, member
                information, and bill tracking. It is free, open, no key
                required for basic use.
              </p>
              <div className="mb-5 border-l-4 border-accent pl-5">
                <p className="font-medium text-ink">
                  Dollars for Docs tracked $2B+ in pharmaceutical payments to
                  doctors, and contributed directly to a federal law.
                </p>
              </div>
              <ul className="space-y-3 text-sm leading-relaxed text-muted">
                {[
                  {
                    label: "Dollars for Docs:",
                    desc: "Tracked drug company payments to physicians before federal disclosure was required. Contributed to the Physician Payments Sunshine Act (2010), which became the Open Payments database.",
                  },
                  {
                    label: "Nonprofit Explorer:",
                    desc: "Financial data on every registered U.S. nonprofit from IRS Form 990 filings. Searchable, downloadable, no subscription required.",
                  },
                  {
                    label: "Congress API:",
                    desc: "Votes, members, bills, committees: all in JSON. Any developer can build accountability tools on top of it.",
                  },
                ].map((item) => (
                  <li key={item.label} className="flex gap-3">
                    <span className="font-bold text-accent">•</span>
                    <span>
                      <strong className="text-ink">{item.label}</strong>{" "}
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* MuckRock */}
            <div className="rounded-xl border border-border bg-paper p-6">
              <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                <div className="font-headline text-xl font-bold text-ink">
                  MuckRock
                </div>
                <div className="rounded border border-border bg-surface px-2 py-1 font-mono text-xs text-muted">
                  muckrock.com
                </div>
              </div>
              <div className="mb-5 font-mono text-xs text-muted">
                FOIA request platform · Cambridge, MA
              </div>
              <p className="mb-5 leading-relaxed text-muted">
                MuckRock is a platform for filing, tracking, and sharing FOIA
                requests. It makes public records accessible to anyone, not just
                journalists with institutional lawyers and institutional
                patience. The site handles the bureaucratic mechanics: finding
                the right office, formatting the request, tracking deadlines,
                escalating when agencies stonewall.
              </p>
              <div className="mb-5 border-l-4 border-accent pl-5">
                <p className="font-medium text-ink">
                  100,000+ FOIA requests filed. 20,000+ documents in the public
                  archive.
                </p>
              </div>
              <p className="text-sm leading-relaxed text-muted">
                Notable releases include police surveillance technology
                contracts, FBI domestic surveillance program records, and local
                government misconduct documentation that never would have
                surfaced through traditional channels.
              </p>
            </div>

            {/* Daonra */}
            <div className="rounded-xl border border-border bg-paper p-6">
              <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                <div className="font-headline text-xl font-bold text-ink">
                  Daonra
                </div>
                <div className="rounded border border-border bg-surface px-2 py-1 font-mono text-xs text-muted">
                  daonra.com
                </div>
              </div>
              <div className="mb-5 font-mono text-xs text-muted">
                Civic transparency platform · Open data · No paywall
              </div>
              <p className="mb-5 leading-relaxed text-muted">
                Daonra is itself a civic tech project. Open data from
                USASpending, the FEC, OpenSecrets, and public government
                databases, made accessible without paywalls, subscriptions, or
                data literacy requirements.
              </p>
              <div className="mb-6 border-l-4 border-accent pl-5">
                <p className="font-medium text-ink">
                  The same financial transparency data available to lobbyists
                  and major newsrooms. Available to anyone with a browser.
                </p>
              </div>
              <div className="mb-6 grid gap-6 md:grid-cols-2">
                <div>
                  <p className="mb-3 font-mono text-xs uppercase tracking-wide text-muted">
                    What Daonra tracks now
                  </p>
                  <ul className="space-y-2 text-sm text-muted">
                    {[
                      "Government contracts (USASpending)",
                      "Lobbying registrations (LDA filings)",
                      "Campaign finance (FEC)",
                      "Congressional stock trades (STOCK Act)",
                      "Dark money flows (IRS 990s)",
                      "Revolving door (custom entity resolution)",
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-accent">→</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-3 font-mono text-xs uppercase tracking-wide text-muted">
                    Coming next
                  </p>
                  <ul className="space-y-2 text-sm text-muted">
                    {[
                      "District-level contract spending",
                      "Bill votes cross-referenced against donor alignment",
                      "State legislature coverage",
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-accent">→</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PARTS III & IV: ORGANIZING + COALITIONS ── */}
      <div className="border-t border-border bg-paper">
        <div className="mx-auto max-w-5xl space-y-24 px-6 py-16 md:py-24">
          {/* PART III */}
          <section>
            <div className="mb-6">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                Part III
              </span>
            </div>
            <h2 className="mb-6 font-headline text-3xl font-bold text-ink">
              Community Organizing: How Individual Frustration Becomes
              Collective Power
            </h2>
            <p className="mb-12 max-w-3xl text-lg leading-relaxed text-muted">
              Organizing is not activism. It is infrastructure. It is the
              patient, methodical work of building relationships, developing
              leaders, and applying collective pressure on specific targets
              until they move. Here is how it actually works.
            </p>

            {/* A. Core Framework */}
            <div className="mb-16">
              <h3 className="mb-8 font-headline text-xl font-bold text-ink">
                A. The Core Framework: Power Analysis + Relationship + Action
              </h3>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    num: "01",
                    title: "Power Analysis",
                    desc: "Who has the power to give you what you want? Who influences them? What do they care about? What are they afraid of losing? Effective organizers spend weeks mapping power before making a single public demand.",
                  },
                  {
                    num: "02",
                    title: "Relational Organizing",
                    desc: "One-on-one conversations, not canvassing, not flyers. Meeting people where they are, listening to their specific grievances, understanding what motivates them. The IAF model: every leader does 30+ one-on-ones before the first public meeting.",
                  },
                  {
                    num: "03",
                    title: "Action",
                    desc: "Direct confrontation with the target. Public meetings, sit-ins, phone banks, media pressure, showing up in numbers. The goal is to make inaction more costly than compliance. Tactics are chosen based on what the target cares about, not what feels good to do.",
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="rounded-xl border border-border bg-surface p-6"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <span className="font-mono text-2xl font-bold text-accent">
                        {item.num}
                      </span>
                      <h4 className="font-headline text-lg font-bold text-ink">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-sm leading-relaxed text-muted">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* B. IAF */}
            <div className="mb-16">
              <h3 className="mb-6 font-headline text-xl font-bold text-ink">
                B. Industrial Areas Foundation: The Model That Works
              </h3>
              <div className="rounded-xl border border-border bg-surface p-8">
                <p className="mb-6 text-sm leading-relaxed text-muted">
                  Founded 1940 by Saul Alinsky. Now 65 affiliated organizations
                  across the U.S., UK, Canada, Australia, and Germany. IAF
                  affiliates organize through institutions: churches, mosques,
                  unions, schools. Leaders are trained in power analysis and
                  relational organizing. Campaigns are chosen by members, not
                  staff.
                </p>
                <div className="border-t border-border pt-6">
                  <span className="mb-4 block font-mono text-xs font-bold uppercase tracking-wider text-muted">
                    Documented Wins
                  </span>
                  <ul className="space-y-4">
                    {[
                      {
                        label: "Texas IAF, Colonias Infrastructure (1990s):",
                        desc: "Secured $250M in infrastructure improvements for unincorporated border communities (water, sewage, paved roads) for 400,000 people with no formal political representation.",
                      },
                      {
                        label: "BUILD (Baltimore):",
                        desc: "Won the first city living wage ordinance in U.S. history in 2002.",
                      },
                      {
                        label: "ACORN:",
                        desc: "400,000 members at peak. Secured $4B in Community Reinvestment Act lending commitments. Won living wage laws in 100+ cities.",
                      },
                    ].map((item) => (
                      <li key={item.label} className="flex gap-3">
                        <span className="mt-0.5 shrink-0 font-mono font-bold text-accent">
                          ›
                        </span>
                        <p className="text-sm leading-relaxed text-muted">
                          <span className="font-semibold text-ink">
                            {item.label}
                          </span>{" "}
                          {item.desc}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* C. Tenant Organizing */}
            <div className="mb-16">
              <h3 className="mb-6 font-headline text-xl font-bold text-ink">
                C. Tenant Organizing: The Housing Fight
              </h3>
              <div className="rounded-xl border border-border bg-surface p-8">
                <p className="mb-6 text-sm leading-relaxed text-muted">
                  Median rent has risen 30%+ since 2019 in most major U.S.
                  cities. Corporate landlords now own 40% of single-family
                  rentals. Tenants who have organized have demonstrated what
                  collective action can actually win.
                </p>
                <div className="mb-6 grid gap-6 md:grid-cols-2">
                  <div className="border-l-2 border-accent pl-4">
                    <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-muted">
                      LA Tenant Union, Founded 2015
                    </span>
                    <p className="text-sm leading-relaxed text-muted">
                      10,000+ members. Negotiated rent freezes with individual
                      landlords. Blocked 100+ evictions through collective
                      action. Won &ldquo;just cause&rdquo; eviction protections
                      in multiple LA jurisdictions.
                    </p>
                  </div>
                  <div className="border-l-2 border-accent pl-4">
                    <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-muted">
                      Crown Heights Tenant Union, Brooklyn
                    </span>
                    <p className="text-sm leading-relaxed text-muted">
                      Organized building by building. Won rent stabilization
                      extensions. Blocked luxury conversion of affordable
                      buildings. Documented model now used by other NYC
                      boroughs.
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-paper p-4">
                  <p className="font-medium leading-relaxed text-ink">
                    Individual tenant cases are almost always lost. Collective
                    cases almost always have leverage. A landlord facing one
                    eviction fight can proceed. A landlord facing a
                    building-wide rent strike backed by 50 organized tenants
                    calculates differently.
                  </p>
                </div>
              </div>
            </div>

            {/* D. Mechanics */}
            <div>
              <h3 className="mb-6 font-headline text-xl font-bold text-ink">
                D. The Mechanics: What Makes Organizing Work
              </h3>
              <div className="rounded-xl border border-border bg-surface p-8">
                <ul className="space-y-5">
                  {[
                    {
                      label: "A specific, winnable demand",
                      detail:
                        'Not "better housing" but "no rent increases above 3% for existing tenants in this building until code violations are resolved."',
                    },
                    {
                      label: "A clear target",
                      detail:
                        'A person with power, not a system or an institution. Mayor Jane Smith, not "the city."',
                    },
                    {
                      label: "Relationships before mobilization",
                      detail:
                        "People show up for people they know, not for causes they've only seen on social media.",
                    },
                    {
                      label: "Leaders, not followers",
                      detail:
                        "The goal is to develop 50 leaders who each bring 10 people, not 500 followers who show up when asked.",
                    },
                    {
                      label: "An escalating pressure campaign",
                      detail:
                        "One action rarely works; the sequence matters. Start with a meeting request. If refused, show up publicly. If that fails, escalate to disruption.",
                    },
                    {
                      label: "A theory of change",
                      detail:
                        "A specific answer to \"why will this target concede?\" If you can't answer that, you don't have a campaign. You have a complaint.",
                    },
                  ].map((item) => (
                    <li key={item.label} className="flex gap-3">
                      <span className="mt-0.5 shrink-0 text-lg font-mono font-bold text-accent">
                        ›
                      </span>
                      <p className="text-sm leading-relaxed text-muted">
                        <span className="font-semibold text-ink">
                          {item.label}:{" "}
                        </span>{" "}
                        {item.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* PART IV */}
          <section>
            <div className="mb-6">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                Part IV
              </span>
            </div>
            <h2 className="mb-6 font-headline text-3xl font-bold text-ink">
              Cross-Partisan Coalitions: When Left and Right Find Common Ground
            </h2>
            <p className="mb-12 max-w-3xl text-lg leading-relaxed text-muted">
              The most durable reforms happen when the coalition for them is too
              broad to be dismissed as partisan. Here are documented cases where
              people who disagree on most things agreed on structural change,
              and won.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  label: "Criminal Justice Reform",
                  title: "Koch Brothers + ACLU (2014–present)",
                  body: "Charles Koch (libertarian right) and the ACLU (civil liberties left) found common ground on mass incarceration for completely different reasons. Koch: government overreach, fiscal waste. ACLU: racial injustice, constitutional violations. Together they built the Coalition for Public Safety (2015), which included Americans for Tax Reform, the Center for American Progress, and the Brennan Center.",
                  win: "FIRST STEP Act (2018): the most significant federal criminal justice reform in decades. Reduced mandatory minimums, expanded good-time credits. Signed by Trump. Passed 87–12 in the Senate.",
                  key: "Ideological diversity made the coalition impossible to attack as partisan.",
                },
                {
                  label: "Surveillance / Fourth Amendment",
                  title: "ACLU + FreedomWorks (2013–present)",
                  body: "Post-Snowden revelations created unexpected alliances. Tea Party conservatives and progressive civil libertarians both opposed warrantless mass surveillance, arriving at the same position from opposite directions. The coalition: Demand Progress, EFF, FreedomWorks, ACLU, Ron Paul's Campaign for Liberty.",
                  win: "USA FREEDOM Act (2015): limited bulk phone records collection, reformed the FISA court, increased transparency. Passed with bipartisan support.",
                  key: "Surveillance affects everyone regardless of affiliation. Shared threat, shared coalition.",
                },
                {
                  label: "Anti-Corruption at the State Level",
                  title: "Represent.Us (2012–present)",
                  body: 'Founded explicitly to be cross-partisan. The strategy: find issues where conservatives and progressives share an enemy (corrupt politicians) even when they disagree on everything else. The frame: not "liberal reform" or "conservative reform" but "the politician on both sides is selling your vote."',
                  win: "Anti-corruption ballot initiatives passed in South Dakota (2016), Missouri (2018), North Dakota (2018), and Colorado (2018), all with bipartisan voter support. South Dakota passed 52–48 in a deep-red state.",
                  key: "The shared enemy (corrupt incumbents) cuts across party lines and makes ballot initiatives viable even in hostile states.",
                },
                {
                  label: "Electoral Reform",
                  title: "Ranked-Choice Voting: FairVote and Odd Alliances",
                  body: "RCV has been endorsed by Democratic Socialists, Tea Party activists, traditional conservatives, and progressive reformers in different jurisdictions, often in the same election cycle. In Alaska, it was adopted via ballot initiative in 2020 in a state that went 53% for Trump. The coalition included voters who hated closed primaries, rural conservatives, and Alaska Native groups.",
                  win: "Alaska adopted Top-4 + RCV in 2020. Mary Peltola (D) and Lisa Murkowski (R) won with documented bipartisan support in 2022.",
                  key: "Electoral reform that gives voters more choice appeals to anyone who feels underrepresented in their own party.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="flex flex-col rounded-xl border border-border bg-surface p-6"
                >
                  <span className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-muted">
                    {card.label}
                  </span>
                  <h4 className="mb-4 font-headline text-xl font-bold text-ink">
                    {card.title}
                  </h4>
                  <p className="mb-4 text-sm leading-relaxed text-muted">
                    {card.body}
                  </p>
                  <p className="mb-6 text-sm leading-relaxed text-muted">
                    <strong className="text-ink">What it won: </strong>
                    {card.win}
                  </p>
                  <div className="mt-auto border-t border-border pt-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                      Key Factor:{" "}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {card.key}
                    </span>
                  </div>
                </div>
              ))}

              {/* Open Data — full width */}
              <div className="flex flex-col rounded-xl border border-border bg-surface p-6 md:col-span-2">
                <span className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-muted">
                  Open Data / Government Transparency
                </span>
                <h4 className="mb-4 font-headline text-xl font-bold text-ink">
                  Bipartisan in Congress: Two Acts, One Pattern
                </h4>
                <div className="mb-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-muted">
                      DATA Act (2014)
                    </span>
                    <p className="text-sm leading-relaxed text-muted">
                      Requires all federal agencies to report spending data in
                      standardized, open formats. Passed the Senate unanimously.
                      USASpending.gov is the direct result, a searchable public
                      record of every federal contract and grant.
                    </p>
                  </div>
                  <div>
                    <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-muted">
                      Open Government Data Act (2018, enacted 2019)
                    </span>
                    <p className="text-sm leading-relaxed text-muted">
                      Makes federal data open by default. Passed on a voice
                      vote. Supported by both the Obama and Trump
                      administrations, a rare example of cross-administration
                      continuity.
                    </p>
                  </div>
                </div>
                <div className="mt-auto border-t border-border pt-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                    Key Factor:{" "}
                  </span>
                  <span className="font-mono text-xs text-muted">
                    When transparency doesn&apos;t threaten a current
                    majority&apos;s ability to hold power, it attracts
                    bipartisan support.
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── PARTS V & VI: COOPERATIVES + GLOBAL SOLIDARITY ── */}
      <div className="border-t border-border bg-surface">
        <div className="mx-auto max-w-5xl space-y-24 px-6 py-16 md:py-24">
          {/* PART V */}
          <section className="space-y-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                Part V
              </span>
              <h2 className="mt-2 font-headline text-3xl font-bold text-ink">
                Cooperative Models: Distributing Power Through Ownership
              </h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted">
                Cooperatives are not fringe economics. The cooperative sector
                employs 280 million people globally, about 10% of the
                world&apos;s employed population. Here are the models that
                change who holds power.
              </p>
            </div>

            {/* Worker Co-ops */}
            <div className="space-y-6">
              <h3 className="font-headline text-xl font-semibold text-ink">
                A. Worker Cooperatives
              </h3>
              <p className="max-w-3xl text-sm leading-relaxed text-muted">
                A business owned and democratically controlled by its workers.
                Workers vote on major decisions. Profits are distributed among
                members. No absentee shareholders.
              </p>

              <div className="rounded-xl border border-border bg-paper p-6">
                <h4 className="font-headline text-lg font-semibold text-ink">
                  Mondragon Corporation
                </h4>
                <p className="mt-0.5 font-mono text-xs text-muted">
                  Basque Country, Spain · Founded 1956
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Founded by a Catholic priest, José María Arizmendiarrieta, in
                  one of the poorest regions of Spain. Now one of the largest
                  worker cooperatives in the world.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {[
                    "80,000+ worker-owners across 257 businesses in manufacturing, retail, finance, and education.",
                    "€12 billion revenue (2022).",
                    "CEO pay ratio capped at 6:1, versus roughly 300:1 at the average U.S. corporation.",
                    "Workers cannot be laid off. During recessions, they are retrained or transferred to other Mondragon companies.",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="shrink-0 font-mono text-accent">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-l-4 border-accent pl-5">
                  <p className="font-medium text-ink">2008 financial crisis</p>
                  <p className="mt-1 text-sm text-muted">
                    Mondragon did not lay off workers. It reduced wages
                    temporarily (with a worker vote) and transferred employees
                    between companies. At industrial scale, democratic ownership
                    proved compatible with international competitiveness.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-paper p-6">
                <h4 className="font-headline text-lg font-semibold text-ink">
                  Evergreen Cooperatives
                </h4>
                <p className="mt-0.5 font-mono text-xs text-muted">
                  Cleveland, Ohio
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  A network of worker-owned businesses anchored by long-term
                  service contracts with large Cleveland institutions: hospitals
                  and universities. Includes Evergreen Energy Solutions (solar),
                  Evergreen Laundry, and Green City Growers, the largest urban
                  greenhouse in the United States. Hiring prioritizes workers
                  from surrounding low-income neighborhoods. Inspired by
                  Mondragon; adapted for the U.S. urban context.
                </p>
              </div>
            </div>

            {/* CLTs */}
            <div className="space-y-6">
              <h3 className="font-headline text-xl font-semibold text-ink">
                B. Community Land Trusts (CLTs)
              </h3>
              <p className="max-w-3xl text-sm leading-relaxed text-muted">
                A nonprofit organization that acquires land and holds it
                permanently in trust for the community. Residents own their
                homes but not the land beneath them, which remains permanently
                affordable and outside the speculative market.
              </p>

              <div className="rounded-xl border border-border bg-paper p-6">
                <h4 className="font-headline text-lg font-semibold text-ink">
                  Champlain Housing Trust
                </h4>
                <p className="mt-0.5 font-mono text-xs text-muted">
                  Burlington, Vermont · Founded 1984
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  The oldest and largest CLT in the United States. Founded after
                  a city study found renters couldn&apos;t afford to buy. Bernie
                  Sanders was mayor of Burlington at the time of founding.
                  2,500+ homes in the trust with formula-limited resale prices,
                  permanently.
                </p>
                <div className="mt-4 border-l-4 border-accent pl-5">
                  <p className="font-medium text-ink">2008 housing crash</p>
                  <p className="mt-1 text-sm text-muted">
                    CLT homeowners in Burlington had a foreclosure rate of{" "}
                    <strong className="text-ink">1.3%</strong> versus{" "}
                    <strong className="text-ink">4.6% nationally</strong>.
                    Permanent affordability built in structural stability that
                    market-rate homeownership could not.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-accent pl-5">
                <p className="font-medium text-ink">Why CLTs matter</p>
                <p className="mt-1 text-sm text-muted">
                  They are the only mechanism that permanently removes land from
                  the speculative market without government ownership. Once in a
                  CLT, land cannot be financialized.
                </p>
              </div>
            </div>

            {/* Credit Unions */}
            <div className="space-y-6">
              <h3 className="font-headline text-xl font-semibold text-ink">
                C. Credit Unions
              </h3>
              <p className="max-w-3xl text-sm leading-relaxed text-muted">
                Not-for-profit financial cooperatives owned by their members.
                Profits returned as lower fees, better rates, and dividends.
                Profits are not extracted by external shareholders.
              </p>

              <div className="rounded-xl border border-border bg-paper p-6">
                <h4 className="font-headline text-lg font-semibold text-ink">
                  The U.S. Credit Union Sector
                </h4>
                <p className="mt-0.5 font-mono text-xs text-muted">
                  5,000+ institutions · 140 million members · $2 trillion in
                  assets
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  <li className="flex gap-2">
                    <span className="shrink-0 font-mono text-accent">→</span>
                    <span>
                      Average credit union CD rate: consistently{" "}
                      <strong className="text-ink">0.3–0.5% higher</strong> than
                      commercial banks. Average loan rates consistently lower.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="shrink-0 font-mono text-accent">→</span>
                    <span>
                      Community Development Credit Unions (CDCUs) serve
                      low-income communities where banks have withdrawn.
                      mortgages, small business loans, financial education.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="shrink-0 font-mono text-accent">→</span>
                    <span>
                      <strong className="text-ink">
                        Self-Help Credit Union (Durham, NC):
                      </strong>{" "}
                      $17 billion in assets. $10 billion in financing provided
                      to low-income families and minority-owned businesses since
                      1980.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* PART VI */}
          <section className="space-y-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                Part VI
              </span>
              <h2 className="mt-2 font-headline text-3xl font-bold text-ink">
                Global Solidarity: How Movements Cross Borders
              </h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted">
                The problems are the same everywhere. The solutions travel. When
                a tactic works in one country, it spreads, sometimes over years,
                sometimes in days.
              </p>
            </div>

            {[
              {
                title: "A. Labor: The International Pattern",
                content: (
                  <div className="rounded-xl border border-border bg-paper p-6 space-y-4">
                    {[
                      {
                        label: "The 8-hour workday",
                        desc: "Won first in Australia (1856), then New Zealand, then the UK, then the United States (1938, Fair Labor Standards Act). A pattern of cross-border labor solidarity spanning 80 years, with each victory making the next more legible and achievable.",
                      },
                      {
                        label: "The Fight for $15",
                        desc: "Began with NYC fast food workers' strikes (2012). Spread to Seattle (first $15 ordinance, 2014), then California, then UK living wage campaigns, then Australian minimum wage increases. Now a global reference point for labor organizing.",
                      },
                      {
                        label: "International union coordination",
                        desc: "The AFL-CIO works with 56 million union members across 150 countries through the ITUC. When Amazon workers in Germany strike, it affects Amazon's U.S. wage negotiations. The company operates across those borders and so must labor.",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="border-l-4 border-accent pl-5"
                      >
                        <p className="font-medium text-ink">{item.label}</p>
                        <p className="mt-1 text-sm text-muted">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                title: "B. Climate: Fridays for Future",
                content: (
                  <div className="rounded-xl border border-border bg-paper p-6 space-y-4">
                    <p className="text-sm leading-relaxed text-muted">
                      Greta Thunberg began striking alone outside the Swedish
                      parliament in August 2018. Within 12 months, the tactic
                      had propagated across every continent.
                    </p>
                    <ul className="space-y-2 text-sm text-muted">
                      <li className="flex gap-2">
                        <span className="shrink-0 font-mono text-accent">
                          →
                        </span>
                        <span>
                          <strong className="text-ink">
                            7.6 million people in 163 countries
                          </strong>{" "}
                          participated in the September 2019 global climate
                          strike, the largest climate protest in recorded
                          history.
                        </span>
                      </li>
                    </ul>
                    <div className="border-l-4 border-accent pl-5">
                      <p className="font-medium text-ink">
                        Documented policy outcomes
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        UK declared a Climate Emergency (2019). European Green
                        Deal accelerated. New Zealand Zero Carbon Act passed
                        (2019). Hundreds of municipalities declared climate
                        emergencies worldwide.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                title: "C. Anti-Corruption: Cross-Border Exposés",
                content: (
                  <div className="rounded-xl border border-border bg-paper p-6 space-y-5">
                    <div>
                      <div className="mb-3 flex items-center gap-3">
                        <span className="rounded bg-ink px-2 py-0.5 font-mono text-xs text-white">
                          2016
                        </span>
                        <h4 className="font-headline text-base font-semibold text-ink">
                          Panama Papers
                        </h4>
                      </div>
                      <p className="mb-3 text-sm leading-relaxed text-muted">
                        11.5 million documents. Coordinated by ICIJ across{" "}
                        <strong className="text-ink">
                          370 journalists in 76 countries
                        </strong>
                        , publishing simultaneously.
                      </p>
                      <ul className="space-y-1 text-sm text-muted">
                        {[
                          "Iceland's Prime Minister resigned within days.",
                          "Pakistan's Prime Minister disqualified by the Supreme Court.",
                          "150+ investigations opened globally. ~$1.2 billion in recovered taxes.",
                        ].map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="shrink-0 font-mono text-accent">
                              →
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t border-border pt-4">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="rounded bg-ink px-2 py-0.5 font-mono text-xs text-white">
                          2021
                        </span>
                        <h4 className="font-headline text-base font-semibold text-ink">
                          Pandora Papers
                        </h4>
                      </div>
                      <p className="text-sm leading-relaxed text-muted">
                        Same model, larger scale:{" "}
                        <strong className="text-ink">
                          600 journalists, 117 countries, 11.9 million documents
                        </strong>
                        . Exposed the offshore wealth of 35 current and former
                        world leaders.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                title: "D. Technology Transfer: Open Source for Civic Good",
                content: (
                  <div className="rounded-xl border border-border bg-paper p-6 space-y-4">
                    <p className="text-sm leading-relaxed text-muted">
                      Once civic technology is open-sourced, it becomes free
                      infrastructure. The work is done once; the benefit
                      compounds.
                    </p>
                    {[
                      {
                        name: "Alaveteli",
                        sub: "mySociety, UK",
                        desc: "Open-source FOI request platform. Now running in 25 countries, enabling freedom-of-information filings from Ukraine to Kosovo to Australia.",
                      },
                      {
                        name: "Decidim",
                        sub: "Barcelona City Government",
                        desc: "Open-source participatory democracy platform. Now used by 400+ organizations and governments across 40 countries.",
                      },
                      {
                        name: "OpenSpending",
                        sub: "Open Knowledge Foundation",
                        desc: "Open-source government budget visualization. Deployed in 70+ countries.",
                      },
                    ].map((item) => (
                      <div key={item.name}>
                        <p className="text-sm font-semibold text-ink">
                          {item.name}{" "}
                          <span className="font-normal font-mono text-xs text-muted">
                            ({item.sub})
                          </span>
                        </p>
                        <p className="mt-0.5 text-sm text-muted">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                ),
              },
            ].map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="font-headline text-xl font-semibold text-ink">
                  {section.title}
                </h3>
                {section.content}
              </div>
            ))}

            {/* Closing callout */}
            <div className="rounded-xl bg-ink p-8 text-white">
              <p className="font-headline text-lg font-semibold leading-snug">
                What these movements prove: the problems of democratic
                backsliding, housing unaffordability, corporate capture, and
                labor exploitation are global, and so are the solutions.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Borders are not a reason to start from scratch. When a tactic
                works (a school strike, a CLT model, a coordinated document
                leak, an open-source platform) it travels. Every movement
                inherits the work of the last one.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* ── PART VII: WHERE TO START ── */}
      <div className="border-t border-border bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part VII
          </div>

          <h2 className="mt-3 font-headline text-3xl font-bold text-ink">
            Where to Start
          </h2>

          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            The hardest part is starting. The entry points below are
            low-barrier, proven, and directly connected to the work documented
            on this page.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Find or Start a Mutual Aid Network",
                desc: "MutualAidHub.org maintains an updated map of local networks in the U.S. If none exists in your area, Big Door Brigade's free guide walks you through starting one.",
                href: "https://www.mutualaidhub.org",
                label: "MutualAidHub.org →",
                external: true,
              },
              {
                title: "Use Open Civic Data",
                desc: "Daonra, OpenSecrets, MuckRock, and ProPublica's Congress tools give you access to the same financial transparency data available to major newsrooms, for free.",
                href: "/",
                label: "Start on Daonra →",
                external: false,
              },
              {
                title: "Get Organized",
                desc: "If you're dealing with housing, wages, or workplace issues, find your local IAF affiliate, tenant union, or worker center. Organizing works. Individual complaints usually don't.",
                href: "https://www.industrialareasfoundation.org",
                label: "Find an IAF Affiliate →",
                external: true,
              },
              {
                title: "Support Open Source Civic Tech",
                desc: "Tools like Alaveteli, Decidim, and OpenSpending are free because people contribute to them. Code, translations, testing, documentation: all needed.",
                href: "https://mysociety.org",
                label: "mySociety Projects →",
                external: true,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5"
              >
                <h3 className="font-headline text-base font-bold text-ink">
                  {item.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-muted">
                  {item.desc}
                </p>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto font-mono text-xs font-bold text-accent hover:text-ink"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="mt-auto font-mono text-xs font-bold text-accent hover:text-ink"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Organizations */}
          <div className="mt-10 rounded-xl border border-border bg-surface p-6">
            <h3 className="mb-6 font-headline text-base font-bold text-ink">
              Organizations in This Space
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Big Door Brigade",
                  url: "https://bigdoorbrigade.com",
                  domain: "bigdoorbrigade.com",
                  desc: 'Mutual aid resources and education. Free "How to Do Mutual Aid" guide.',
                },
                {
                  name: "Industrial Areas Foundation",
                  url: "https://industrialareasfoundation.org",
                  domain: "industrialareasfoundation.org",
                  desc: "The original broad-based organizing network. 65 affiliates in 6 countries.",
                },
                {
                  name: "National Center for Employee Ownership",
                  url: "https://nceo.org",
                  domain: "nceo.org",
                  desc: "Research and resources on employee ownership, ESOPs, and worker cooperatives.",
                },
                {
                  name: "US Federation of Worker Cooperatives",
                  url: "https://usworker.coop",
                  domain: "usworker.coop",
                  desc: "Network of 500+ worker cooperatives. Technical assistance, peer networks, policy advocacy.",
                },
                {
                  name: "Community Land Trust Network",
                  url: "https://cltnetwork.org",
                  domain: "cltnetwork.org",
                  desc: "National network of CLTs. Resources for starting and growing community land trusts.",
                },
                {
                  name: "ICIJ",
                  url: "https://icij.org",
                  domain: "icij.org",
                  desc: "The organization behind the Panama Papers and Pandora Papers. Partners with journalists in 100+ countries.",
                },
                {
                  name: "mySociety",
                  url: "https://mysociety.org",
                  domain: "mysociety.org",
                  desc: "UK-based civic tech nonprofit. Builds and open-sources tools including Alaveteli and TheyWorkForYou.",
                },
                {
                  name: "Represent.Us",
                  url: "https://represent.us",
                  domain: "represent.us",
                  desc: "Cross-partisan anti-corruption. Active in 35 states.",
                },
              ].map((org) => (
                <a
                  key={org.name}
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1"
                >
                  <span className="font-headline text-sm font-bold text-ink transition-colors group-hover:text-accent">
                    {org.name}
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {org.domain}
                  </span>
                  <span className="text-xs leading-relaxed text-muted">
                    {org.desc}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom nav */}
          <div className="mt-20 flex items-center justify-between border-t border-border pt-8">
            <Link
              href="/whats-working"
              className="text-sm font-bold text-muted transition-colors hover:text-ink"
            >
              ← What&apos;s Working
            </Link>
            <Link
              href="/civics"
              className="text-sm font-bold text-muted transition-colors hover:text-ink"
            >
              Civic Action Hub →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
