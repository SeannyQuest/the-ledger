import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function RunForOfficePage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-4xl px-4 py-24 lg:px-8">
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Civic How-To
        </div>
        <h1 className="mt-4 max-w-3xl font-headline text-5xl font-black tracking-tight text-ink lg:text-6xl">
          Run for Local Office
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink/70">
          Local offices are where policy actually touches your life. School
          boards, city councils, water districts, planning commissions. Most
          races have no incumbent. Most have no opponent. Showing up is often
          enough to win.
        </p>

        {/* Section 1 — Why Local Office Matters More Than You Think */}
        <div className="mt-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-ink">
            Why Local Office Matters More Than You Think
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink/80">
            <p>
              School boards set curriculum, hire superintendents, and control
              budgets in the hundreds of millions. They decide what your kids
              learn, who teaches them, and what buildings they learn in.
            </p>
            <p>
              City councils decide zoning, housing density, police budgets, and
              contract awards. They shape what your neighborhood looks like and
              how your tax dollars get spent.
            </p>
            <p>
              Water boards, utility districts, and port authorities run essential
              infrastructure with almost no public attention. Billions of dollars
              flow through these bodies annually. Most voters cannot name a
              single member.
            </p>
            <p>
              State legislature seats in many states pay $0 and require no prior
              experience. Most local races are decided by fewer than 500 votes.
              Some by fewer than 50.
            </p>
          </div>
        </div>

        {/* Section 2 — What Offices Can You Run For? */}
        <div className="mt-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-ink">
            What Offices Can You Run For?
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-headline text-lg font-bold text-ink">
                School Board
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Curriculum, budget, superintendent hiring, facilities. The
                single most impactful local office for families.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-headline text-lg font-bold text-ink">
                City / Town Council
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Local ordinances, zoning, police budget, city contracts. The
                body that shapes daily life in your municipality.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-headline text-lg font-bold text-ink">
                County Commissioner / Supervisor
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                County services, property tax rates, elections administration.
                Oversees services that city governments do not cover.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-headline text-lg font-bold text-ink">
                Water / Utility District Board
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Rates, infrastructure, environmental compliance. Controls the
                pipes, wires, and water that keep your community running.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-headline text-lg font-bold text-ink">
                Planning &amp; Zoning Commission
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                What gets built, where, and at what density. Has a massive
                impact on housing availability and neighborhood character.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-headline text-lg font-bold text-ink">
                State Legislature
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Varies by state, often part-time. Sets state law on education,
                healthcare, criminal justice, and taxes.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-headline text-lg font-bold text-ink">
                Judge / Magistrate
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                In many states these are elected positions. Judges shape how
                laws are applied in your community every day.
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-ink/60">
            Most of these have no salary requirements, no degree requirements,
            and no prior political experience required.
          </p>
        </div>

        {/* Section 3 — How to Start (Step by Step) */}
        <div className="mt-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-ink">
            How to Start
          </h2>
          <ol className="mt-8 space-y-6">
            <li className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-bold text-white">
                1
              </span>
              <div>
                <h3 className="font-headline text-base font-bold text-ink">
                  Pick your race
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">
                  Find what is on the ballot in your area at vote.org or your
                  county clerk website. Look for seats with no incumbent or no
                  opponent listed.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-bold text-white">
                2
              </span>
              <div>
                <h3 className="font-headline text-base font-bold text-ink">
                  Check the requirements
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">
                  Most require living in the district for 30+ days and being a
                  registered voter. Some require a filing fee ($0-$200). Check
                  your state or county election board.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-bold text-white">
                3
              </span>
              <div>
                <h3 className="font-headline text-base font-bold text-ink">
                  File your candidacy paperwork
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">
                  Done at your county clerk or state election board office.
                  Deadlines vary. Typically 3-6 months before election day.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-bold text-white">
                4
              </span>
              <div>
                <h3 className="font-headline text-base font-bold text-ink">
                  Form a committee (if required)
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">
                  Most local races require a campaign committee to accept
                  donations, even if you spend $0. Simple one-page filing.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-bold text-white">
                5
              </span>
              <div>
                <h3 className="font-headline text-base font-bold text-ink">
                  Get on the ballot
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">
                  Some races require collecting signatures (usually 25-100 for
                  local office). Others just need the filing fee.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-bold text-white">
                6
              </span>
              <div>
                <h3 className="font-headline text-base font-bold text-ink">
                  Tell people you are running
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">
                  Social media post, neighborhood Facebook group, Nextdoor,
                  local paper. You do not need a website or mailer to win a
                  low-turnout local race.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-bold text-white">
                7
              </span>
              <div>
                <h3 className="font-headline text-base font-bold text-ink">
                  Show up
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">
                  Attend public meetings before the election. Introduce
                  yourself. Be visible. In local races, name recognition is
                  everything.
                </p>
              </div>
            </li>
          </ol>
        </div>

        {/* Section 4 — Resources */}
        <div className="mt-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-ink">
            Resources
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-headline text-lg font-bold text-ink">
                Run for Something
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Helps progressive candidates under 40 run for local office.
                Training, resources, and endorsements.
              </p>
              <a
                href="https://runforsomething.net"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:text-ink"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                runforsomething.net
              </a>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-headline text-lg font-bold text-ink">
                Sister District
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Connects volunteers with competitive state legislative races
                across the country.
              </p>
              <a
                href="https://sisterdistrict.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:text-ink"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                sisterdistrict.com
              </a>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-headline text-lg font-bold text-ink">
                Ballotpedia Candidate How-To
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Plain-English overview of candidate requirements by state.
                Filing deadlines, petition thresholds, and office descriptions.
              </p>
              <a
                href="https://ballotpedia.org/Become_a_candidate"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:text-ink"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                ballotpedia.org
              </a>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-headline text-lg font-bold text-ink">
                Vote.org
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Find what is on your local ballot. Check registration status and
                polling locations.
              </p>
              <a
                href="https://vote.org"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:text-ink"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                vote.org
              </a>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6 md:col-span-2">
              <h3 className="font-headline text-lg font-bold text-ink">
                Your State&apos;s Secretary of State
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Official filing requirements, deadlines, and candidate guides.
                Search &ldquo;[your state] secretary of state candidate
                filing&rdquo; for your specific requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5 — What It Actually Takes */}
        <div className="mt-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-ink">
            What It Actually Takes
          </h2>
          <ul className="mt-6 space-y-4 text-sm leading-relaxed text-ink/80">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">Time:</strong> 5-15 hours per week
                for a local race in the months before election.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">Money:</strong> $0-$2,000 for most
                local races. School board and city council can be done with yard
                signs and door knocking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">Experience:</strong> None required.
                Literally none.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                The hardest part is deciding to do it. The logistics are simpler
                than people think.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                You will lose the first time. Most people do. Run again.
              </span>
            </li>
          </ul>
        </div>

        {/* Section 6 — A Note on Nonpartisan Races */}
        <div className="mt-16 rounded-xl border-2 border-accent/20 bg-accent/5 p-6">
          <h2 className="font-headline text-xl font-bold text-ink">
            A Note on Nonpartisan Races
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/80">
            Many local races are officially nonpartisan. No party label on the
            ballot. This lowers the barrier significantly. You do not need party
            support, a party primary, or party money to win.
          </p>
        </div>

        {/* Bottom CTAs */}
        <div className="mt-16 flex flex-wrap items-center gap-6 border-t border-border pt-8">
          <Link
            href="/civics"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent hover:text-ink"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Civics Hub
          </Link>
        </div>
      </div>
    </section>
  );
}
