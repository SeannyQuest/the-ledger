import { Compass, ArrowRight, Vote } from "lucide-react";
import Link from "next/link";

export default function CivicsPage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Civic How-To
        </div>
        <h1 className="mt-4 max-w-3xl font-headline text-5xl font-black tracking-tight text-ink lg:text-6xl">
          Your Playbook for Participation
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink/70">
          Step-by-step guides for every level of civic engagement. Whether
          you&apos;re voting for the first time or thinking about running for
          office — we&apos;ve got you covered.
        </p>

        {/* Elections banner */}
        <Link
          href="/elections"
          className="group mt-16 flex items-center gap-5 rounded-xl border-2 border-accent/30 bg-surface p-6 transition-colors hover:border-accent"
        >
          <Vote className="h-8 w-8 shrink-0 text-accent" />
          <div className="flex-1">
            <h3 className="font-headline text-xl font-bold text-ink">
              Upcoming Elections
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              See what is on your ballot in 2026. Primaries, generals, and
              special elections.
            </p>
          </div>
          <ArrowRight className="h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
        </Link>

        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Register to Vote — live */}
          <Link
            href="/civics/register"
            className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-ink"
          >
            <Compass className="h-6 w-6 text-accent" />
            <h3 className="mt-4 font-headline text-xl font-bold text-ink">
              Register to Vote
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              State-by-state guide to voter registration — deadlines, ID
              requirements, and how to check your status.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent transition-colors group-hover:text-ink">
              Get Started <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Contact Your Representatives — live */}
          <Link
            href="/civics/contact"
            className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-ink"
          >
            <Compass className="h-6 w-6 text-accent" />
            <h3 className="mt-4 font-headline text-xl font-bold text-ink">
              Contact Your Representatives
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Find your reps at every level. Templates for calls, emails, and
              letters that actually get read.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent transition-colors group-hover:text-ink">
              Get Started <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Attend a Town Hall — live */}
          <Link
            href="/civics/town-halls"
            className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-ink"
          >
            <Compass className="h-6 w-6 text-accent" />
            <h3 className="mt-4 font-headline text-xl font-bold text-ink">
              Attend a Town Hall
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              How to find upcoming town halls, what to expect, and how to ask
              questions that get real answers.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent transition-colors group-hover:text-ink">
              Get Started <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Run for Local Office — live */}
          <Link
            href="/civics/run-for-office"
            className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-ink"
          >
            <Compass className="h-6 w-6 text-accent" />
            <h3 className="mt-4 font-headline text-xl font-bold text-ink">
              Run for Local Office
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              A practical guide to running for school board, city council, or
              county commission — from filing to fundraising.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent transition-colors group-hover:text-ink">
              Get Started <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Start a Petition — live */}
          <Link
            href="/civics/petition"
            className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-ink"
          >
            <Compass className="h-6 w-6 text-accent" />
            <h3 className="mt-4 font-headline text-xl font-bold text-ink">
              Start a Petition
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              How to draft, circulate, and submit petitions that create real
              change at the local and state level.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent transition-colors group-hover:text-ink">
              Get Started <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Remaining cards — coming soon */}
          {[
            {
              title: "FOIA Requests",
              description:
                "How to file Freedom of Information Act requests — templates, tips, and what to do when agencies don't respond.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <Compass className="h-6 w-6 text-accent" />
              <h3 className="mt-4 font-headline text-xl font-bold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
              <div className="mt-4 text-xs font-bold uppercase tracking-wider text-muted">
                Coming Soon
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent hover:text-ink"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
