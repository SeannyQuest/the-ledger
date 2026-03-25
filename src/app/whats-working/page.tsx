import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "What's Working | Daonra",
  description:
    "Proof that better is possible. Ranked-choice voting, anti-corruption wins, universal healthcare models, participatory budgeting, campaign finance reform, and open government — documented cases of democracy being fixed.",
};

export default function WhatsWorkingPage() {
  return (
    <article className="bg-paper">

      {/* ── HERO ── */}
      <div className="bg-ink text-white">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <nav className="mb-10 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-white/40">
            <Link href="/" className="transition-colors hover:text-white/70">
              Daonra
            </Link>
            <ChevronRight className="h-3 w-3 text-white/25" />
            <span className="text-white/60">What&apos;s Working</span>
          </nav>

          <h1 className="font-headline text-4xl font-black leading-tight md:text-6xl">
            Proof That Better Is Possible
          </h1>

          <p className="mb-14 mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
            The U.S. isn&apos;t broken beyond repair. Around the world, democracies
            have solved the exact problems we face — corruption, polarization,
            money in politics, broken elections. This page documents what
            actually worked.
          </p>

          <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10 md:grid-cols-4">
            <div>
              <div className="font-headline text-3xl font-black text-accent-light">
                26 countries
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-white/50">
                use ranked-choice voting or a variant
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-accent-light">
                40+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-white/50">
                cities have implemented participatory budgeting
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-accent-light">
                Estonia
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-white/50">
                runs 99% of government services online
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-accent-light">
                Iceland
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-white/50">
                crowdsourced a constitution after a banking collapse
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 1: ELECTORAL REFORMS ── */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Part I
        </div>

        <h2 className="font-headline text-3xl font-black text-ink md:text-4xl">
          Electoral Reforms That Actually Work
        </h2>
        <p className="mb-14 mt-4 max-w-2xl text-lg text-muted">
          Most electoral dysfunction is solvable. The evidence is global.
        </p>

        {/* A. Ranked-Choice Voting */}
        <div className="mb-14">
          <h3 className="mb-4 font-headline text-2xl font-black text-ink">
            A. Ranked-Choice Voting (RCV)
          </h3>

          <div className="mb-6 border-l-4 border-accent pl-5">
            <p className="leading-relaxed text-ink">
              Voters rank candidates 1, 2, 3. If no candidate earns a majority
              in the first round, the last-place finisher is eliminated and
              those ballots are redistributed to their next-ranked choice. The
              process repeats until one candidate holds a majority.
            </p>
          </div>

          <h4 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-muted">
            Where it&apos;s working
          </h4>
          <ul className="mb-6 space-y-4">
            <li className="flex gap-3">
              <span className="mt-0.5 shrink-0 font-bold text-accent">›</span>
              <span className="leading-relaxed text-ink">
                <strong>Maine (2016):</strong> First U.S. state to adopt RCV
                for federal races. Rep. Jared Golden won the 2018 congressional
                race despite not being anyone&apos;s first choice outright —
                broad second-choice support carried him to a majority victory.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 shrink-0 font-bold text-accent">›</span>
              <span className="leading-relaxed text-ink">
                <strong>Alaska (2020, used 2022):</strong> Brought Mary Peltola
                (D) and Lisa Murkowski (R) to Congress — both with documented
                bipartisan support, both prevailing over same-party challengers
                in a competitive field.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 shrink-0 font-bold text-accent">›</span>
              <span className="leading-relaxed text-ink">
                <strong>Australia (since 1918):</strong> Has used preferential
                voting — the equivalent of RCV — for over a century. Coalition
                building is structurally incentivized; outcomes consistently
                skew more moderate than single-round systems.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 shrink-0 font-bold text-accent">›</span>
              <span className="leading-relaxed text-ink">
                <strong>New York City (2019, used 2021):</strong> Adopted RCV
                for primaries. The 2021 Democratic mayoral primary had 13
                candidates. The process ran without collapse or chaos.
              </span>
            </li>
          </ul>

          <h4 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-muted">
            What it changes
          </h4>
          <ul className="mb-6 space-y-2">
            <li className="flex gap-3">
              <span className="font-bold text-accent">›</span>
              <span className="text-ink">
                Eliminates the spoiler effect — third-party and independent
                candidates can run without splitting the vote.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-accent">›</span>
              <span className="text-ink">
                Reduces negative campaigning — candidates want their
                opponents&apos; supporters&apos; second-choice votes.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-accent">›</span>
              <span className="text-ink">
                More candidates can run viably, increasing voter choice.
              </span>
            </li>
          </ul>

          <div className="rounded-r-lg border-l-4 border-accent bg-surface py-3 pl-5 pr-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
              Status in the U.S.:
            </span>
            <span className="ml-2 text-ink">
              60+ jurisdictions currently use RCV. The movement is growing.
            </span>
          </div>
        </div>

        {/* B. Open Primaries */}
        <div className="mb-14">
          <h3 className="mb-4 font-headline text-2xl font-black text-ink">
            B. Open / Nonpartisan Primaries
          </h3>

          <div className="mb-6 border-l-4 border-accent pl-5">
            <p className="leading-relaxed text-ink">
              All voters — regardless of party registration — participate in
              the same primary. The top 2 finishers (or top 4 in Alaska&apos;s
              model) advance to the general election.
            </p>
          </div>

          <h4 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-muted">
            Where it&apos;s working
          </h4>
          <ul className="mb-6 space-y-4">
            <li className="flex gap-3">
              <span className="mt-0.5 shrink-0 font-bold text-accent">›</span>
              <span className="leading-relaxed text-ink">
                <strong>California Top-2 (since 2012):</strong> Reduced the
                number of uncontested general elections. Created pressure on
                candidates to appeal to the other party&apos;s voters, pushing
                some toward the center.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 shrink-0 font-bold text-accent">›</span>
              <span className="leading-relaxed text-ink">
                <strong>Alaska Top-4 + RCV:</strong> Considered the most
                advanced model currently in use in the U.S. Creates direct
                structural incentive for cross-party cooperation at every stage
                of the race.
              </span>
            </li>
          </ul>

          <h4 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-muted">
            What it changes
          </h4>
          <ul className="space-y-2">
            <li className="flex gap-3">
              <span className="font-bold text-accent">›</span>
              <span className="text-ink">
                Reduces the outsized influence of primary voters — who tend to
                be more ideologically extreme — over the final electoral
                outcome.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-accent">›</span>
              <span className="text-ink">
                Opens a viable path for moderate candidates who would otherwise
                be knocked out in partisan primaries.
              </span>
            </li>
          </ul>
        </div>

        {/* C. Automatic Voter Registration */}
        <div>
          <h3 className="mb-4 font-headline text-2xl font-black text-ink">
            C. Automatic Voter Registration (AVR)
          </h3>

          <div className="mb-6 border-l-4 border-accent pl-5">
            <p className="leading-relaxed text-ink">
              Citizens are automatically registered to vote when they interact
              with government agencies — DMV, social services, etc. — unless
              they explicitly opt out.
            </p>
          </div>

          <h4 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-muted">
            Where it&apos;s working
          </h4>
          <ul className="mb-6 space-y-4">
            <li className="flex gap-3">
              <span className="mt-0.5 shrink-0 font-bold text-accent">›</span>
              <span className="leading-relaxed text-ink">
                <strong>Oregon (2015):</strong> First U.S. state to adopt AVR.
                Voter registration climbed to 93% of eligible citizens. Turnout
                among newly registered voters exceeded the national average in
                the first cycle.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 shrink-0 font-bold text-accent">›</span>
              <span className="leading-relaxed text-ink">
                <strong>21+ U.S. states</strong> have since adopted AVR.
                Canada, Australia, and most of Europe have had equivalent
                systems for decades — treating voter registration as a
                government function, not a citizen burden.
              </span>
            </li>
          </ul>

          <h4 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-muted">
            What it changes
          </h4>
          <ul className="space-y-2">
            <li className="flex gap-3">
              <span className="font-bold text-accent">›</span>
              <span className="text-ink">
                Removes administrative barriers to voting that have
                historically suppressed registration among low-income and
                mobile populations.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-accent">›</span>
              <span className="text-ink">
                Registration rates increase 5–10 percentage points in the
                first election cycle after adoption.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ── SECTION 2: ANTI-CORRUPTION WINS ── */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <div className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part II
          </div>

          <h2 className="font-headline text-3xl font-black text-ink md:text-4xl">
            Anti-Corruption: Where It Actually Worked
          </h2>
          <p className="mb-14 mt-4 max-w-2xl text-lg text-muted">
            Systemic corruption is not inevitable. These countries and
            institutions proved it.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {/* South Korea */}
            <div className="flex flex-col rounded-xl border border-border bg-paper p-6">
              <div className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-muted">
                South Korea — 2002
              </div>
              <h3 className="mb-3 font-headline text-xl font-black text-ink">
                Independent Anti-Corruption Agency
              </h3>
              <div className="flex-1 space-y-3 leading-relaxed text-ink">
                <p>
                  <strong>Problem:</strong> Pervasive bribery across
                  government, business, and the judiciary — among the worst
                  in the OECD.
                </p>
                <p>
                  <strong>Solution:</strong> Created the Korea Independent
                  Commission Against Corruption (KICAC), later merged into
                  the Anti-Corruption and Civil Rights Commission (ACRC).
                  The body was insulated from executive control, with
                  mandatory financial disclosure and real prosecutorial
                  backup.
                </p>
                <p>
                  <strong>Outcome:</strong> Within 15 years, South Korea
                  moved from one of the most corrupt democracies in the OECD
                  to a middling one. In 2017, President Park Geun-hye was
                  impeached and imprisoned for corruption. The system worked.
                </p>
              </div>
              <div className="mt-5 border-t border-border pt-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                  Key Factor:
                </span>
                <span className="ml-2 font-mono text-xs text-muted">
                  Institutional independence + citizen whistleblower
                  protections
                </span>
              </div>
            </div>

            {/* Georgia */}
            <div className="flex flex-col rounded-xl border border-border bg-paper p-6">
              <div className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-muted">
                Georgia (the country) — 2004–2012
              </div>
              <h3 className="mb-3 font-headline text-xl font-black text-ink">
                Anti-Corruption Push After the Rose Revolution
              </h3>
              <div className="flex-1 space-y-3 leading-relaxed text-ink">
                <p>
                  <strong>Problem:</strong> Post-Soviet endemic corruption.
                  Traffic police routinely extracted bribes. Customs was a
                  shakedown operation from top to bottom.
                </p>
                <p>
                  <strong>Solution:</strong> Saakashvili&apos;s government
                  fired the entire 15,000-person traffic police force in a
                  single day and rebuilt it with new training and wages high
                  enough to make bribery unattractive. Customs corruption
                  was dismantled. Licenses and permits moved online, removing
                  human gatekeepers.
                </p>
                <p>
                  <strong>Outcome:</strong> Transparency International&apos;s
                  Corruption Perceptions Index: Georgia went from{" "}
                  <strong>124th in 2003</strong> to{" "}
                  <strong>50th by 2012</strong>. Police bribery was
                  essentially eliminated.
                </p>
              </div>
              <div className="mt-5 border-t border-border pt-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                  Key Factor:
                </span>
                <span className="ml-2 font-mono text-xs text-muted">
                  Removing human gatekeepers + wages high enough to make
                  bribery unattractive
                </span>
              </div>
            </div>

            {/* Iceland */}
            <div className="flex flex-col rounded-xl border border-border bg-paper p-6">
              <div className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-muted">
                Iceland — 2008–2012
              </div>
              <h3 className="mb-3 font-headline text-xl font-black text-ink">
                Crowdsourced Constitution After Banking Collapse
              </h3>
              <div className="flex-1 space-y-3 leading-relaxed text-ink">
                <p>
                  <strong>Problem:</strong> After the 2008 banking collapse —
                  all three of Iceland&apos;s major banks failed — public fury
                  at a system captured by financial and political elites.
                </p>
                <p>
                  <strong>Solution:</strong> A citizens&apos; assembly of 950
                  randomly selected people set national values. A 25-person
                  Constitutional Council — elected from 522 ordinary citizen
                  candidates — drafted a new constitution openly via weekly
                  public posts, Facebook/Twitter participation, and 3,600
                  public comments incorporated into the text.
                </p>
                <p>
                  <strong>Outcome:</strong> The document passed a referendum
                  by a two-thirds majority. It included explicit limits on
                  corporate money in politics, environmental rights, and media
                  ownership caps. Parliament did not ultimately ratify it —
                  but the process demonstrated participatory democracy at
                  scale is operationally possible.
                </p>
              </div>
              <div className="mt-5 border-t border-border pt-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                  Key Factor:
                </span>
                <span className="ml-2 font-mono text-xs text-muted">
                  Radical transparency + random selection to break elite
                  capture
                </span>
              </div>
            </div>

            {/* New Zealand */}
            <div className="flex flex-col rounded-xl border border-border bg-paper p-6">
              <div className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-muted">
                New Zealand — Electoral Finance Act
              </div>
              <h3 className="mb-3 font-headline text-xl font-black text-ink">
                Disclosure That Changed Political Culture
              </h3>
              <div className="flex-1 space-y-3 leading-relaxed text-ink">
                <p>
                  <strong>Problem:</strong> Secret and anonymous money flowing
                  into elections — donations untraceable, influence
                  unaccountable.
                </p>
                <p>
                  <strong>Solution:</strong> The Electoral Finance Act
                  requires real-time public disclosure of all donations over
                  NZ$1,500. Hard spending limits on campaigns. An Independent
                  Electoral Commission with genuine enforcement authority.
                </p>
                <p>
                  <strong>Outcome:</strong> New Zealand consistently ranks in
                  the{" "}
                  <strong>top 5 least corrupt countries globally</strong> on
                  Transparency International&apos;s index. Donation disclosure
                  shifted the culture around political money — the expectation
                  of secrecy evaporated.
                </p>
              </div>
              <div className="mt-5 border-t border-border pt-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                  Key Factor:
                </span>
                <span className="ml-2 font-mono text-xs text-muted">
                  Transparency alone — no public financing required, just
                  disclosure
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: UNIVERSAL HEALTHCARE ── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part III
          </div>

          <h2 className="font-headline text-3xl font-bold text-ink md:text-4xl">
            Universal Healthcare: What It Looks Like
          </h2>
          <p className="mb-10 mt-5 max-w-3xl text-lg leading-relaxed text-muted">
            Every other wealthy democracy provides healthcare to all its
            citizens. They do it in different ways — and at lower cost than the
            U.S. pays for partial coverage.
          </p>

          {/* Stat box */}
          <div className="mb-12 grid grid-cols-2 gap-6 rounded-xl bg-ink p-6 text-white md:grid-cols-4">
            {[
              { value: "~18%", label: "U.S. healthcare spending as share of GDP" },
              { value: "~11%", label: "Comparable country average" },
              { value: "~26M", label: "Uninsured Americans (~8%)" },
              { value: "26th", label: "U.S. life expectancy rank among 36 OECD nations" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-mono text-2xl font-bold text-accent-light">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-gray-300">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Model 1 */}
          <div className="mb-6 rounded-xl border border-border bg-surface p-6">
            <div className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Model 1
            </div>
            <h3 className="mb-4 font-headline text-xl font-bold text-ink">
              Single-Payer / National Health Service — Canada &amp; UK
            </h3>
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <div className="mb-2 font-semibold text-ink">
                  Canada (Medicare)
                </div>
                <p className="mb-3 text-sm leading-relaxed text-muted">
                  Federal government sets standards; provinces administer. All
                  residents covered for hospital and doctor care. Zero
                  point-of-service fees. Funded by taxes.
                </p>
                <div className="mb-3 flex flex-wrap gap-3">
                  <div className="rounded-lg bg-paper px-3 py-2 text-center">
                    <div className="font-mono font-bold text-ink">82 yrs</div>
                    <div className="text-xs text-muted">Life expectancy</div>
                  </div>
                  <div className="rounded-lg bg-paper px-3 py-2 text-center">
                    <div className="font-mono font-bold text-ink">11.6%</div>
                    <div className="text-xs text-muted">of GDP</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-muted">
                  <span className="font-semibold text-ink">Tradeoff:</span>{" "}
                  Longer wait times for elective procedures. Private
                  supplementary insurance covers extras (dental, vision,
                  drugs).
                </p>
              </div>
              <div>
                <div className="mb-2 font-semibold text-ink">UK (NHS)</div>
                <p className="mb-3 text-sm leading-relaxed text-muted">
                  Government owns hospitals and employs doctors directly. Free
                  at point of use for all residents. One of the most equitable
                  systems globally.
                </p>
                <div className="mb-3 flex flex-wrap gap-3">
                  <div className="rounded-lg bg-paper px-3 py-2 text-center">
                    <div className="font-mono font-bold text-ink">81 yrs</div>
                    <div className="text-xs text-muted">Life expectancy</div>
                  </div>
                  <div className="rounded-lg bg-paper px-3 py-2 text-center">
                    <div className="font-mono font-bold text-ink">10.2%</div>
                    <div className="text-xs text-muted">of GDP</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-muted">
                  <span className="font-semibold text-ink">Tradeoff:</span>{" "}
                  Underfunded in recent years; long waits in some specialties.
                </p>
              </div>
            </div>
            <div className="border-l-4 border-accent pl-5">
              <p className="text-sm leading-relaxed text-muted">
                <span className="font-semibold text-ink">Key factor:</span>{" "}
                removing administrative complexity. U.S. hospitals spend an
                estimated{" "}
                <span className="font-semibold text-ink">
                  $500 billion per year
                </span>{" "}
                on billing and insurance administration alone.
              </p>
            </div>
          </div>

          {/* Model 2 */}
          <div className="mb-6 rounded-xl border border-border bg-surface p-6">
            <div className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Model 2
            </div>
            <h3 className="mb-4 font-headline text-xl font-bold text-ink">
              Multi-Payer with Strong Regulation — Germany &amp; Switzerland
            </h3>
            <div className="mb-4 grid gap-6 md:grid-cols-2">
              <div>
                <div className="mb-2 font-semibold text-ink">Germany</div>
                <p className="mb-3 text-sm leading-relaxed text-muted">
                  105 nonprofit &ldquo;sickness funds&rdquo; compete for
                  enrollees under strict rules: community rating, comprehensive
                  mandated benefits, income-based premiums. Employers share the
                  cost.
                </p>
                <div className="mb-3 flex flex-wrap gap-3">
                  <div className="rounded-lg bg-paper px-3 py-2 text-center">
                    <div className="font-mono font-bold text-ink">81 yrs</div>
                    <div className="text-xs text-muted">Life expectancy</div>
                  </div>
                  <div className="rounded-lg bg-paper px-3 py-2 text-center">
                    <div className="font-mono font-bold text-ink">12.7%</div>
                    <div className="text-xs text-muted">of GDP</div>
                  </div>
                  <div className="rounded-lg bg-paper px-3 py-2 text-center">
                    <div className="font-mono font-bold text-ink">0%</div>
                    <div className="text-xs text-muted">Uninsured</div>
                  </div>
                </div>
                <p className="text-xs italic text-muted">
                  Competition is allowed. Profiteering is not.
                </p>
              </div>
              <div>
                <div className="mb-2 font-semibold text-ink">Switzerland</div>
                <p className="mb-3 text-sm leading-relaxed text-muted">
                  Mandatory private insurance, heavily subsidized for
                  low-income residents. Nonprofit required for basic coverage.
                  All insurers must offer the same basic benefits package.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="rounded-lg bg-paper px-3 py-2 text-center">
                    <div className="font-mono font-bold text-ink">84 yrs</div>
                    <div className="text-xs text-muted">Life expectancy</div>
                  </div>
                  <div className="rounded-lg bg-paper px-3 py-2 text-center">
                    <div className="font-mono font-bold text-ink">11.3%</div>
                    <div className="text-xs text-muted">of GDP</div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted">
                  Longest life expectancy in Europe.
                </p>
              </div>
            </div>
          </div>

          {/* Model 3 */}
          <div className="mb-10 rounded-xl border border-border bg-surface p-6">
            <div className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Model 3
            </div>
            <h3 className="mb-1 font-headline text-xl font-bold text-ink">
              Taiwan&apos;s National Health Insurance (NHI)
            </h3>
            <p className="mb-4 text-sm text-muted">
              The fastest universal coverage rollout in history.
            </p>

            <div className="mb-5 border-l-4 border-accent pl-5">
              <p className="font-semibold text-ink">
                In 1995, Taiwan went from 57% insured to 100% insured in a
                single year.
              </p>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-muted">
              Built on a single government insurer. Any licensed provider
              accepts the simple ID card. No claim forms for patients.
              Electronic health records in place since 2000. Taiwan handled
              COVID-19 better than nearly any other country.
            </p>

            <div className="mb-5 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { value: "6.6%", label: "of GDP" },
                { value: "100%", label: "Citizens covered" },
                { value: "81 yrs", label: "Life expectancy" },
                { value: "#1", label: "Patient satisfaction" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg bg-paper px-3 py-3 text-center"
                >
                  <div className="font-mono font-bold text-ink">{s.value}</div>
                  <div className="mt-1 text-xs text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* What the U.S. can learn */}
          <div className="rounded-r-xl border-l-4 border-accent bg-surface py-5 pl-5 pr-6">
            <div className="mb-3 font-semibold text-ink">
              What the U.S. can learn
            </div>
            <ul className="space-y-2 text-sm text-muted">
              {[
                "Every system above has: mandatory participation, regulated pricing, and nonprofit administration of core coverage.",
                "The U.S. already has elements of all three: Medicare/Medicaid, the ACA marketplace, and employer coverage.",
                "The missing ingredient is not the model — it's universality combined with administrative simplification.",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-0.5 font-bold text-accent">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: DEMOCRATIC INNOVATION ── */}
      <section className="border-t border-border bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part IV
          </div>

          <h2 className="font-headline text-3xl font-bold text-ink md:text-4xl">
            Democratic Innovation: New Ways of Deciding Together
          </h2>
          <p className="mb-14 mt-5 max-w-3xl text-lg leading-relaxed text-muted">
            Beyond elections, democracies are finding new ways to make
            collective decisions that are more representative, more deliberative,
            and more resistant to capture.
          </p>

          {/* A. Participatory Budgeting */}
          <div className="mb-12">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded border border-border bg-paper px-2 py-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
                A
              </div>
              <h3 className="font-headline text-2xl font-bold text-ink">
                Participatory Budgeting
              </h3>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-muted">
              Residents directly vote on how a portion of public money is
              spent. Not advisory — binding decisions on real allocations.
            </p>

            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-paper p-6">
                <div className="mb-2 flex items-start justify-between gap-4">
                  <div className="font-semibold text-ink">
                    Porto Alegre, Brazil
                  </div>
                  <div className="whitespace-nowrap font-mono text-xs text-muted">
                    Est. 1989
                  </div>
                </div>
                <p className="mb-3 text-sm leading-relaxed text-muted">
                  The original. The city devolved ~20% of its capital budget to
                  neighborhood assemblies. By the early 2000s, 50,000 residents
                  participated annually. The result: massive infrastructure
                  investment in the poorest neighborhoods.
                </p>
                <div className="border-l-4 border-accent pl-5">
                  <p className="font-medium text-ink">
                    Sewage connections in underserved neighborhoods: 49% → 98%
                    in 10 years.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-paper p-6">
                <div className="mb-2 flex items-start justify-between gap-4">
                  <div className="font-semibold text-ink">Paris, France</div>
                  <div className="whitespace-nowrap font-mono text-xs text-muted">
                    Since 2014
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  Allocates €100M/year — roughly 5% of the investment budget —
                  to resident-submitted projects. Over 100,000 Parisians vote
                  annually, online and in-person.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-paper p-6">
                <div className="mb-2 flex items-start justify-between gap-4">
                  <div className="font-semibold text-ink">New York City</div>
                  <div className="whitespace-nowrap font-mono text-xs text-muted">
                    City Council districts
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  ~$35M/year distributed via participatory budgeting. Studies
                  show it directs more money to lower-income neighborhoods than
                  traditional budget allocation processes.
                </p>
              </div>
            </div>

            <div className="mt-5 border-l-4 border-accent pl-5">
              <p className="text-sm text-muted">
                <span className="font-semibold text-ink">
                  What makes it work:
                </span>{" "}
                real money, real decisions, ward-level implementation.
                City-wide votes are too abstract — neighborhood scale creates
                accountability.
              </p>
            </div>
          </div>

          {/* B. Citizens' Assemblies */}
          <div className="mb-12">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded border border-border bg-paper px-2 py-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
                B
              </div>
              <h3 className="font-headline text-2xl font-bold text-ink">
                Citizens&apos; Assemblies
              </h3>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-muted">
              A randomly selected group of ordinary citizens — like jury duty —
              is given expert testimony, time to deliberate, and asked to make
              policy recommendations on difficult or politically deadlocked
              issues.
            </p>

            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-paper p-6">
                <div className="mb-2 flex items-start justify-between gap-4">
                  <div className="font-semibold text-ink">
                    Ireland — Citizens&apos; Assembly on Abortion
                  </div>
                  <div className="whitespace-nowrap font-mono text-xs text-muted">
                    2016–2018
                  </div>
                </div>
                <p className="mb-3 text-sm leading-relaxed text-muted">
                  99 randomly selected citizens deliberated for 18 months.
                  Their recommendations formed the basis of a referendum that
                  passed with 66% of the vote — ending a 35-year political
                  deadlock. The same assembly process was used for same-sex
                  marriage (2015) and climate policy.
                </p>
                <div className="border-l-4 border-accent pl-5">
                  <p className="font-medium text-ink">
                    35-year legislative deadlock resolved. 66% referendum
                    passage.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-paper p-6">
                <div className="mb-2 flex items-start justify-between gap-4">
                  <div className="font-semibold text-ink">
                    France — Convention Citoyenne pour le Climat
                  </div>
                  <div className="whitespace-nowrap font-mono text-xs text-muted">
                    2019–2020
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  150 randomly selected citizens deliberated on climate policy
                  for 9 months. Produced 149 specific proposals. The majority
                  formed the basis of France&apos;s Climate and Resilience Law.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-paper p-6">
                <div className="mb-2 flex items-start justify-between gap-4">
                  <div className="font-semibold text-ink">
                    UK — Climate Assembly UK
                  </div>
                  <div className="whitespace-nowrap font-mono text-xs text-muted">
                    2020
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  108 citizens deliberated for 8 months. Assembly findings
                  influenced the UK&apos;s net-zero legislation.
                </p>
              </div>
            </div>

            <div className="mt-5 border-l-4 border-accent pl-5">
              <p className="text-sm text-muted">
                <span className="font-semibold text-ink">Why it works:</span>{" "}
                random selection breaks partisan capture. Ordinary people,
                given time and real information, make thoughtful,
                evidence-based decisions. &ldquo;Mini-publics&rdquo; are a
                more accurate mirror of the population than elected bodies.
              </p>
            </div>
          </div>

          {/* C. Proportional Representation */}
          <div className="mb-12">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded border border-border bg-paper px-2 py-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
                C
              </div>
              <h3 className="font-headline text-2xl font-bold text-ink">
                Proportional Representation
              </h3>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-muted">
              Most established democracies use proportional representation (PR)
              rather than winner-take-all districts. Parties receive seats
              proportional to their vote share — a party that wins 30% of votes
              gets roughly 30% of seats.
            </p>

            <div className="mb-5 rounded-xl border border-border bg-paper p-6">
              <div className="mb-4 font-semibold text-ink">
                Documented outcomes in PR systems
              </div>
              <div className="space-y-3">
                {[
                  "Voter turnout is typically 10–15 percentage points higher than in U.S. elections.",
                  "PR systems elect roughly twice as many women as winner-take-all systems.",
                  "Smaller parties get represented — public opinion is reflected more accurately across the spectrum.",
                  "Less extreme policy swings between governments — coalition dynamics create continuity.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 w-6 shrink-0 font-mono text-sm font-bold text-accent">
                      +
                    </div>
                    <p className="text-sm text-muted">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5 rounded-xl border border-border bg-paper p-6">
              <div className="mb-3 font-semibold text-ink">
                Countries using proportional or mixed systems
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Germany",
                  "Netherlands",
                  "Sweden",
                  "Norway",
                  "Denmark",
                  "New Zealand (since 1996)",
                  "Japan (mixed)",
                ].map((country) => (
                  <span
                    key={country}
                    className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-ink"
                  >
                    {country}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted">
                New Zealand switched from a UK-style winner-take-all system via
                referendum in 1996.
              </p>
            </div>

            <div className="border-l-4 border-border pl-5">
              <p className="text-sm text-muted">
                <span className="font-semibold text-ink">Tradeoff:</span> PR
                can require coalition governments, which can be unstable.
                Israel&apos;s highly fragmented PR system is a cautionary
                example — too low a threshold for representation creates
                chronic instability.
              </p>
            </div>
          </div>

          {/* D. Estonia */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded border border-border bg-paper px-2 py-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
                D
              </div>
              <h3 className="font-headline text-2xl font-bold text-ink">
                Online Democracy — Estonia
              </h3>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-muted">
              Estonia has built the most advanced digital government in the
              world. 99% of government services are available online, 24/7, via
              a single digital identity. Built after independence from the USSR
              in 1991 — starting from scratch with no legacy systems to
              retrofit.
            </p>

            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-paper p-5">
                <div className="mb-2 text-sm font-semibold text-ink">
                  e-Voting
                </div>
                <p className="mb-3 text-xs leading-relaxed text-muted">
                  Online voting since 2005. In 2023, 51% of all votes were cast
                  online. Zero verified cases of fraud in 18 years of
                  operation.
                </p>
                <div className="border-l-4 border-accent pl-4">
                  <p className="text-xs text-ink">
                    Security model: voters can change their vote multiple times
                    before the deadline — eliminating coercion. The vote is
                    cryptographically separated from identity before counting.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-paper p-5">
                <div className="mb-2 text-sm font-semibold text-ink">
                  X-Road &amp; Infrastructure
                </div>
                <p className="mb-3 text-xs leading-relaxed text-muted">
                  X-Road is the data exchange layer that lets all government
                  agencies share data securely — without centralized storage.
                  No single point of failure or surveillance.
                </p>
                <div className="mb-2 mt-3 text-sm font-semibold text-ink">
                  e-Residency
                </div>
                <p className="text-xs leading-relaxed text-muted">
                  Non-Estonians can obtain a digital identity to run
                  businesses, sign documents, and access EU digital services —
                  from anywhere in the world.
                </p>
              </div>
            </div>

            <div className="border-l-4 border-accent pl-5">
              <p className="text-sm text-muted">
                <span className="font-semibold text-ink">
                  What the U.S. can learn:
                </span>{" "}
                building digital government infrastructure requires political
                will and sustained investment — not exotic technology. The
                barrier is institutional, not technical.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: CAMPAIGN FINANCE ── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part V
          </p>
          <h2 className="font-headline text-3xl font-bold text-ink md:text-4xl">
            Campaign Finance: What&apos;s Actually Working
          </h2>
          <p className="mb-12 mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Citizens United didn&apos;t end all campaign finance reform. At the
            state and local level, significant experiments in public financing
            are changing who runs, who wins, and who elected officials listen
            to.
          </p>

          {/* A: Small-Donor Matching */}
          <div className="mb-12">
            <h3 className="mb-4 font-headline text-xl font-bold text-ink">
              A. Small-Donor Matching Programs
            </h3>
            <p className="mb-4 leading-relaxed text-muted">
              New York City&apos;s matching program is the most studied in the
              United States. Enacted in 1988 and expanded multiple times, as of
              2021 it matches the first $250 of small donations at an 8-to-1
              ratio with public funds.
            </p>
            <div className="mb-6 rounded-r border-l-4 border-accent bg-surface py-3 pl-5">
              <p className="mb-1 text-sm font-medium text-ink">NYC Results</p>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted">
                <li>
                  Candidates using the system raised a higher share of their
                  money from within their own district — not large outside
                  donors.
                </li>
                <li>
                  2021 mayoral race: all major candidates participated; roughly
                  70% of campaign money came from small donors.
                </li>
                <li>
                  NYU Brennan Center: candidates in public financing systems
                  spend less time fundraising and more time with constituents.
                </li>
              </ul>
            </div>
            <p className="mb-4 leading-relaxed text-muted">
              Connecticut&apos;s Citizens&apos; Election Program (CEP) goes
              further: full public funding is available to any candidate who
              collects small qualifying donations from constituents.
            </p>
            <div className="rounded-r border-l-4 border-accent bg-surface py-3 pl-5">
              <p className="mb-1 text-sm font-medium text-ink">
                Connecticut CEP — Outcomes Since 2008
              </p>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted">
                <li>
                  Uptake: roughly 80% of state legislative candidates now use
                  it.
                </li>
                <li>
                  More women and candidates of color participate compared to
                  pre-CEP elections.
                </li>
                <li>
                  Legislators report spending significantly less time on
                  fundraising and more on governing.
                </li>
              </ul>
            </div>
          </div>

          {/* B: Maine */}
          <div className="mb-12">
            <h3 className="mb-4 font-headline text-xl font-bold text-ink">
              B. Maine Clean Elections Act
            </h3>
            <p className="mb-4 leading-relaxed text-muted">
              Passed by citizen initiative in 1996, Maine&apos;s Clean
              Elections Act provides full public funding to qualifying
              candidates who collect small donations from constituents to
              demonstrate viability.
            </p>
            <div className="rounded-r border-l-4 border-accent bg-surface py-3 pl-5">
              <ul className="list-inside list-disc space-y-1 text-sm text-muted">
                <li>
                  2018: 77% of Maine state legislative candidates used the
                  program.
                </li>
                <li>
                  Participants are significantly more likely to come from
                  working-class backgrounds — not career politicians or wealthy
                  self-funders.
                </li>
                <li>
                  Bipartisan appeal: Governor Janet Mills (D) and multiple
                  Republican legislators have used it.
                </li>
              </ul>
            </div>
          </div>

          {/* C: Seattle */}
          <div className="mb-12">
            <h3 className="mb-4 font-headline text-xl font-bold text-ink">
              C. Seattle&apos;s Democracy Voucher Program
            </h3>
            <p className="mb-4 leading-relaxed text-muted">
              In 2017, Seattle launched a direct-access experiment: every
              registered voter receives four $25 &ldquo;Democracy
              Vouchers&rdquo; — funded by a property tax levy — to donate to
              local campaigns of their choice.
            </p>
            <div className="rounded-r border-l-4 border-accent bg-surface py-3 pl-5">
              <p className="mb-1 text-sm font-medium text-ink">Results</p>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted">
                <li>Small-dollar donation participation tripled.</li>
                <li>
                  The donor pool became measurably more racially and
                  economically diverse.
                </li>
                <li>
                  Candidates raised more of their money from actual Seattle
                  residents.
                </li>
              </ul>
              <p className="mt-3 text-sm italic text-muted">
                The lesson: the barrier to small-donor participation is not
                desire — it&apos;s access to disposable income.
              </p>
            </div>
          </div>

          {/* D: International */}
          <div className="mb-12">
            <h3 className="mb-4 font-headline text-xl font-bold text-ink">
              D. International Models
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-surface p-5">
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
                  Germany
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  Partial public funding tied to vote share and small-donor
                  fundraising. Corporate donations to parties are banned.
                  Result: parties must maintain broad membership bases to
                  access public funds, keeping them structurally connected to
                  ordinary voters.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-surface p-5">
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
                  Canada
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  Corporate and union donations banned since 2006. Annual
                  donation limit: $1,675 to federal parties (inflation-indexed).
                  Result: federal parties are genuinely mass-membership
                  organizations, not vehicles for concentrated wealth.
                </p>
              </div>
            </div>
          </div>

          {/* Summary card */}
          <div className="rounded-xl bg-ink p-7 text-white">
            <p className="mb-4 font-headline text-lg font-bold">
              What these programs have in common
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-white/80">
              <li>
                Small donations amplified or replaced by public money, reducing
                dependence on large donors.
              </li>
              <li>
                Disclosure requirements so voters know who is funding
                campaigns.
              </li>
              <li>
                Spending limits or caps where legally permissible — harder in
                the U.S. after{" "}
                <span className="italic">Buckley v. Valeo</span>, but still
                available at the state and local level.
              </li>
            </ul>
            <p className="mt-4 font-mono text-xs text-white/50">
              None of these systems require a federal constitutional amendment
              to implement.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: OPEN GOVERNMENT ── */}
      <section className="border-t border-border bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part VI
          </p>
          <h2 className="font-headline text-3xl font-bold text-ink md:text-4xl">
            Open Government: Transparency at Scale
          </h2>
          <p className="mb-12 mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Corruption thrives in the dark. These countries built the
            infrastructure to make the dark places smaller.
          </p>

          {/* A: Estonia */}
          <div className="mb-12">
            <h3 className="mb-4 font-headline text-xl font-bold text-ink">
              A. Estonia: The World&apos;s Most Transparent Government
            </h3>
            <p className="mb-4 leading-relaxed text-muted">
              Estonia&apos;s X-Road system does more than move data efficiently
              — it creates a complete audit trail. Every time a government
              official accesses a citizen&apos;s data, a log entry is created
              that the citizen can view. You can see exactly who looked at your
              file and why.
            </p>
            <div className="rounded-r border-l-4 border-accent bg-paper py-3 pl-5">
              <ul className="list-inside list-disc space-y-1 text-sm text-muted">
                <li>
                  <span className="font-medium text-ink">Data minimization:</span>{" "}
                  agencies can only see what they need for their specific
                  function — no browsing.
                </li>
                <li>
                  <span className="font-medium text-ink">
                    Real accountability:
                  </span>{" "}
                  government employees have been fired for looking up celebrity
                  records without cause, because citizens reported it using the
                  audit log.
                </li>
                <li>
                  <span className="font-medium text-ink">
                    Business registry:
                  </span>{" "}
                  fully public and free. Company ownership is completely visible
                  to anyone.
                </li>
              </ul>
            </div>
          </div>

          {/* B: Open Contracting */}
          <div className="mb-12">
            <h3 className="mb-4 font-headline text-xl font-bold text-ink">
              B. Open Contracting — Slovakia and Ukraine
            </h3>
            <div className="mb-6">
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
                Slovakia
              </p>
              <p className="mb-3 leading-relaxed text-muted">
                In 2011, Slovakia passed a law requiring all government
                contracts to be published online before they take effect. A
                contract not published within three days is legally void.
              </p>
              <div className="rounded-r border-l-4 border-accent bg-paper py-3 pl-5">
                <ul className="list-inside list-disc space-y-1 text-sm text-muted">
                  <li>
                    Average contract prices dropped 10–15% immediately —
                    vendors knew they&apos;d be compared publicly.
                  </li>
                  <li>
                    Bid rigging became significantly harder to execute without
                    detection.
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
                Ukraine — ProZorro
              </p>
              <p className="mb-3 leading-relaxed text-muted">
                In 2016, Ukraine launched ProZorro — an open procurement system
                requiring all government purchases above a threshold to go
                through a competitive online process with all bids publicly
                visible.
              </p>
              <div className="rounded-r border-l-4 border-accent bg-paper py-3 pl-5">
                <ul className="list-inside list-disc space-y-1 text-sm text-muted">
                  <li>
                    By 2018: $5 billion in annual government procurement
                    processed through the system.
                  </li>
                  <li>
                    Price savings estimated at 5–7% on procured goods and
                    services.
                  </li>
                  <li>Won the World Procurement Award in 2016.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* C: FOIA */}
          <div className="mb-12">
            <h3 className="mb-4 font-headline text-xl font-bold text-ink">
              C. FOIA and Public Records: Gaps and Models
            </h3>
            <p className="mb-4 leading-relaxed text-muted">
              The U.S. Freedom of Information Act (1966) is among the oldest
              such laws in the world, but it has significant structural
              weaknesses: slow response times, widespread use of exemptions,
              and litigation routinely required to force compliance.
            </p>
            <div className="mb-5 rounded-lg border border-border bg-paper p-5">
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
                The U.S. Backlog
              </p>
              <p className="text-sm text-muted">
                Federal agencies have over 900,000 FOIA requests pending.
                Average response time: 6 months to never.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-paper p-5">
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
                  Sweden (1766)
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  The world&apos;s oldest freedom of information law. Every
                  public document is presumed accessible. Officials face
                  personal liability for unlawful secrecy. Responses required
                  within days, not months.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-paper p-5">
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
                  New Zealand
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  Official Information Act responses required within 20 working
                  days. An independent Ombudsman can compel compliance.
                  Litigation is rarely needed.
                </p>
              </div>
            </div>
          </div>

          {/* D: Beneficial Ownership */}
          <div className="mb-12">
            <h3 className="mb-4 font-headline text-xl font-bold text-ink">
              D. Beneficial Ownership Registries
            </h3>
            <p className="mb-4 leading-relaxed text-muted">
              Anonymous shell companies are a primary vehicle for hiding
              corruption, tax evasion, and foreign influence in domestic
              politics.
            </p>
            <div className="rounded-r border-l-4 border-accent bg-paper py-3 pl-5">
              <ul className="list-inside list-disc space-y-2 text-sm text-muted">
                <li>
                  <span className="font-medium text-ink">
                    UK (Companies House, 2016):
                  </span>{" "}
                  All company beneficial owners must register. Anyone can look
                  up who owns any UK company for free. Result: 100,000+
                  companies struck off for suspicious activity within two years.
                </li>
                <li>
                  <span className="font-medium text-ink">
                    EU (2020 Anti-Money Laundering Directive):
                  </span>{" "}
                  All member states required to build public beneficial
                  ownership registries.
                </li>
                <li>
                  <span className="font-medium text-ink">
                    U.S. (Corporate Transparency Act, 2021):
                  </span>{" "}
                  Small companies must report beneficial ownership to FinCEN.
                  The data is not yet fully public — a significant gap compared
                  to the UK and EU models.
                </li>
              </ul>
            </div>
          </div>

          {/* Closing callout */}
          <div className="rounded-r-xl border-l-4 border-accent bg-paper px-7 py-6">
            <p className="mb-2 font-headline text-lg font-bold text-ink">
              What these models prove
            </p>
            <p className="leading-relaxed text-muted">
              Transparency is not anti-government. The countries with the most
              open governments also consistently rank highest in public trust in
              government. The relationship runs in that direction — not the
              reverse.
            </p>
          </div>
        </div>
      </section>

      {/* ── PART VII: WHAT THIS MEANS + WHAT YOU CAN DO ── */}
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Part VII
        </div>

        {/* What This Means */}
        <div className="mt-6 max-w-3xl space-y-6">
          <h2 className="font-headline text-3xl font-bold text-ink">
            What This Means
          </h2>
          <p className="text-base leading-relaxed text-muted">
            Every example on this page shares a common thread: the problem was
            designed in. It was also designed out. The countries that fixed
            corruption built institutions that made corruption expensive —
            costly to execute, easy to detect, hard to hide. The ones that
            improved democracy built systems that made participation easy and
            political capture hard. None of it happened through good intentions
            alone. It happened through structural change.
          </p>
          <p className="text-base leading-relaxed text-muted">
            The U.S. has the raw materials. Maine&apos;s public financing law.
            Alaska&apos;s ranked-choice voting. Seattle&apos;s Democracy
            Vouchers. New York City&apos;s small-donor matching program.
            Hundreds of participatory budgeting programs running in cities from
            Boston to Oakland. The pieces exist — they are not theoretical,
            they are operating. What&apos;s missing is scale, and the political
            will to scale them from experiments into infrastructure.
          </p>
          <p className="text-base leading-relaxed text-muted">
            This is not a partisan argument. Ranked-choice voting has been
            adopted in red states and blue states. Anti-corruption reform has
            historically attracted coalitions across party lines — from
            progressive activists to libertarian watchdog groups. The frame of
            &ldquo;what works&rdquo; is more durable than left vs. right.
            Systems that reduce capture and expand participation tend to benefit
            whoever is currently being shut out, and that is never one party
            forever.
          </p>
        </div>

        {/* What You Can Do */}
        <div className="mt-16 space-y-8">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Take Action
          </div>

          <div className="max-w-3xl space-y-3">
            <h2 className="font-headline text-3xl font-bold text-ink">
              What You Can Do
            </h2>
            <p className="text-base leading-relaxed text-muted">
              Start local. The most successful reforms began at the local and
              state level before going national.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5">
              <div className="text-lg text-accent">&#9745;</div>
              <h3 className="font-headline text-base font-bold text-ink">
                Support RCV in Your City or State
              </h3>
              <p className="flex-1 text-sm leading-relaxed text-muted">
                Find out if your state or city has a ranked-choice voting ballot
                initiative or legislative effort. FairVote tracks active
                campaigns by state.
              </p>
              <Link
                href="/elections"
                className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-accent transition-colors hover:text-ink"
              >
                See Elections Tracker →
              </Link>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5">
              <div className="text-lg text-accent">$</div>
              <h3 className="font-headline text-base font-bold text-ink">
                Track Campaign Finance in Your District
              </h3>
              <p className="flex-1 text-sm leading-relaxed text-muted">
                Daonra&apos;s money-flow tracker shows who is funding your
                representatives and how those contributions align with their
                voting records.
              </p>
              <Link
                href="/money-flow"
                className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-accent transition-colors hover:text-ink"
              >
                Follow the Money →
              </Link>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5">
              <div className="text-lg text-accent">&#128196;</div>
              <h3 className="font-headline text-base font-bold text-ink">
                Push for Public Records
              </h3>
              <p className="flex-1 text-sm leading-relaxed text-muted">
                If your local government is slow or unresponsive to public
                records requests, your state&apos;s press freedom law may give
                you recourse. MuckRock makes filing and tracking requests easy.
              </p>
              <a
                href="https://www.muckrock.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-accent transition-colors hover:text-ink"
              >
                MuckRock ↗
              </a>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5">
              <div className="text-lg text-accent">&#9994;</div>
              <h3 className="font-headline text-base font-bold text-ink">
                Join a Reform Organization
              </h3>
              <p className="flex-1 text-sm leading-relaxed text-muted">
                The organizations below work on systemic reform across these
                issue areas. All are nonpartisan or cross-partisan — you
                don&apos;t have to agree on everything to work on structural
                fixes together.
              </p>
              <a
                href="#reform-orgs"
                className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-accent transition-colors hover:text-ink"
              >
                See Organizations ↓
              </a>
            </div>
          </div>
        </div>

        {/* Reform Organizations */}
        <section
          id="reform-orgs"
          className="mt-12 space-y-6 rounded-xl border border-border bg-surface p-6"
        >
          <h3 className="font-headline text-xl font-bold text-ink">
            Organizations Working on This
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "FairVote",
                url: "https://www.fairvote.org",
                domain: "fairvote.org",
                desc: "Ranked-choice voting and electoral reform advocacy. Tracks RCV campaigns across all 50 states.",
              },
              {
                name: "Represent.Us",
                url: "https://represent.us",
                domain: "represent.us",
                desc: "Cross-partisan anti-corruption coalition. Campaigns on state and local anti-corruption ordinances.",
              },
              {
                name: "Issue One",
                url: "https://issueone.org",
                domain: "issueone.org",
                desc: "Bipartisan campaign finance reform and money-in-politics transparency. Led by former members of Congress from both parties.",
              },
              {
                name: "Participatory Budgeting Project",
                url: "https://www.participatorybudgeting.org",
                domain: "participatorybudgeting.org",
                desc: "Helps cities design and implement participatory budgeting programs that give residents direct control over public spending.",
              },
              {
                name: "OpenSecrets",
                url: "https://www.opensecrets.org",
                domain: "opensecrets.org",
                desc: "Tracks campaign finance data and lobbying at the federal level. The definitive public record.",
              },
              {
                name: "Democracy Works",
                url: "https://democracy.works",
                domain: "democracy.works",
                desc: "Nonpartisan voter information infrastructure. Runs TurboVote, which helps millions of Americans register and track their ballots each cycle.",
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
        </section>

        {/* Bottom nav */}
        <div className="mt-20 flex items-center justify-between border-t border-border pt-8">
          <Link
            href="/how-power-works"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted transition-colors hover:text-ink"
          >
            <span>←</span>
            <span>How Power Works</span>
          </Link>
          <Link
            href="/elections"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted transition-colors hover:text-ink"
          >
            <span>Elections Tracker</span>
            <span>→</span>
          </Link>
        </div>
      </section>
    </article>
  );
}
