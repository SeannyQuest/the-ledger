import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function PetitionPage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-4xl px-4 py-24 lg:px-8">
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Civic How-To
        </div>
        <h1 className="mt-4 max-w-3xl font-headline text-5xl font-black tracking-tight text-ink lg:text-6xl">
          Start a Petition
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink/70">
          Petitions work when they are specific, local, and connected to direct
          action. Here is how to run one that actually moves something.
        </p>

        {/* Section 1 — When Petitions Work (and When They Don't) */}
        <div className="mt-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-ink">
            When Petitions Work (and When They Do Not)
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/70">
            Be honest with yourself before you start. Online petitions to
            national figures rarely produce results on their own. Change.org
            signatures do not move Congress.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink/70">
            Petitions work best when:
          </p>
          <ul className="mt-4 space-y-4 text-sm leading-relaxed text-ink/80">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">The target is local</strong> — a
                mayor, school board, city council.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">
                  The signatures are from constituents
                </strong>{" "}
                who can actually vote the target out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 font-bold text-accent">&bull;</span>
              <span>
                <strong className="text-ink">
                  The petition is connected to showing up in person,
                </strong>{" "}
                not just clicking.
              </span>
            </li>
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-ink/70">
            A petition with 200 local signatures delivered in person at a city
            council meeting beats 50,000 online signatures from strangers.
          </p>
        </div>

        {/* Section 2 — Two Types of Petitions */}
        <div className="mt-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-ink">
            Two Types of Petitions
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-headline text-lg font-bold text-ink">
                Ballot Initiative Petition
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Collects signatures to put a measure directly on the ballot,
                bypassing the legislature. Available in about 26 states.
                Requirements vary widely — some need 5% of registered voters,
                some need 8%. High effort but high impact.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                Search &ldquo;[your state] ballot initiative petition
                requirements&rdquo; or check Ballotpedia for your
                state&apos;s rules.
              </p>
              <a
                href="https://ballotpedia.org/Initiative"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:text-ink"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Ballotpedia Guide
              </a>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-headline text-lg font-bold text-ink">
                Constituent Pressure Petition
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                The more common type. Collect signatures to present to an
                elected official showing constituent support or opposition for a
                specific action. No legal threshold, but local signatures from
                real constituents carry weight.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 — How to Run a Constituent Petition */}
        <div className="mt-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-ink">
            How to Run a Constituent Petition
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/70">
            Step by step.
          </p>
          <ul className="mt-6 space-y-6 text-sm leading-relaxed text-ink/80">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 font-mono text-xs font-bold text-accent">
                01
              </span>
              <span>
                <strong className="text-ink">Be specific.</strong>{" "}
                &ldquo;We want the city council to approve the affordable
                housing zoning variance at 5th and Main&rdquo; beats &ldquo;We
                want more affordable housing.&rdquo; One ask. One target. One
                deadline.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 font-mono text-xs font-bold text-accent">
                02
              </span>
              <span>
                <strong className="text-ink">Define your target.</strong> Who
                has the power to do what you want? Mayor, city council, school
                board, county commissioner. If you do not know, call the
                relevant office and ask.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 font-mono text-xs font-bold text-accent">
                03
              </span>
              <span>
                <strong className="text-ink">Set a signature goal.</strong> For
                local issues, 100 to 500 local signatures is meaningful. For
                statewide, think 1,000+. Quality over quantity. Local voters
                beat distant supporters.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 font-mono text-xs font-bold text-accent">
                04
              </span>
              <span>
                <strong className="text-ink">Choose your platform.</strong> For
                online: Change.org (free, widely used), Action Network (free for
                nonprofits, better data), or Google Forms (simple, you own the
                data). For in-person: paper works fine.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 font-mono text-xs font-bold text-accent">
                05
              </span>
              <span>
                <strong className="text-ink">Write the petition text.</strong>{" "}
                One paragraph max. State: who you are, what you want, why, and
                the specific ask. No jargon.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 font-mono text-xs font-bold text-accent">
                06
              </span>
              <span>
                <strong className="text-ink">Collect signatures.</strong> In
                person at community events, outside grocery stores, at church,
                at local events. Online via social share. Door to door if you
                have the time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 font-mono text-xs font-bold text-accent">
                07
              </span>
              <span>
                <strong className="text-ink">Deliver it.</strong> In person if
                possible. Bring people with you. Ask to speak during public
                comment. Hand it to staff and get a receipt. Follow up.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 font-mono text-xs font-bold text-accent">
                08
              </span>
              <span>
                <strong className="text-ink">Tell the story.</strong> Send a
                press release to your local paper. Post on Nextdoor and local
                Facebook groups. Document the delivery. Photos help.
              </span>
            </li>
          </ul>
        </div>

        {/* Section 4 — Writing the Petition */}
        <div className="mt-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-ink">
            Writing the Petition
          </h2>
          <div className="mt-8 rounded-xl border-2 border-accent/20 bg-accent/5 p-6">
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Petition Template
            </h3>
            <div className="mt-4 space-y-3 font-mono text-sm leading-relaxed text-ink/80">
              <p>
                <strong className="text-ink">
                  Petition to [Target Name/Body]
                </strong>
              </p>
              <p>
                We, the undersigned residents of [city/district], call on
                [target] to [specific action] by [date if applicable].
              </p>
              <p className="text-ink/60">
                [1-2 sentences of context — why this matters, what the problem
                is]
              </p>
              <p>We ask that you [restate the specific ask clearly].</p>
              <p>Signed,</p>
              <p className="text-ink/60">
                [Name] | [Address/ZIP] | [Date]
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink/70">
            Collecting addresses or ZIP codes makes signatures more credible to
            elected officials. It proves constituents are in their district.
          </p>
        </div>

        {/* Section 5 — Ballot Initiative Resources */}
        <div className="mt-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-ink">
            Ballot Initiative Resources
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/70">
            If you are pursuing a ballot initiative, these will help. Note that
            ballot initiatives typically require a paid petition drive at
            scale. Budget for it if going that route.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-headline text-lg font-bold text-ink">
                Ballotpedia
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                State-by-state guide to ballot initiative requirements,
                signature thresholds, and deadlines.
              </p>
              <a
                href="https://ballotpedia.org/Initiative"
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
                Represent.Us
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Runs anti-corruption ballot initiatives across the country.
                Good model for how to organize a statewide petition drive.
              </p>
              <a
                href="https://represent.us"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:text-ink"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                represent.us
              </a>
            </div>
          </div>
        </div>

        {/* Section 6 — Free Tools */}
        <div className="mt-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-ink">
            Free Tools
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-headline text-lg font-bold text-ink">
                Change.org
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Largest platform, easiest to share. Limited data control.
              </p>
              <a
                href="https://www.change.org"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:text-ink"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                change.org
              </a>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-headline text-lg font-bold text-ink">
                Action Network
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Better for organizing. Free for nonprofits. Stronger data
                tools.
              </p>
              <a
                href="https://actionnetwork.org"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:text-ink"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                actionnetwork.org
              </a>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-headline text-lg font-bold text-ink">
                Google Forms
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Simple. You own all the data. No algorithm deciding who sees
                it.
              </p>
              <a
                href="https://forms.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:text-ink"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                forms.google.com
              </a>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-headline text-lg font-bold text-ink">
                MoveOn Petitions
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Good for progressive causes. Built-in audience.
              </p>
              <a
                href="https://petitions.moveon.org"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:text-ink"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                petitions.moveon.org
              </a>
            </div>
          </div>
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
