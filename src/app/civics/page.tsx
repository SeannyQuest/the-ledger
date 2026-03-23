import { Compass, ArrowRight } from "lucide-react";
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

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Register to Vote",
              description:
                "State-by-state guide to voter registration — deadlines, ID requirements, and how to check your status.",
            },
            {
              title: "Contact Your Representatives",
              description:
                "Find your reps at every level. Templates for calls, emails, and letters that actually get read.",
            },
            {
              title: "Attend a Town Hall",
              description:
                "How to find upcoming town halls, what to expect, and how to ask questions that get real answers.",
            },
            {
              title: "Run for Local Office",
              description:
                "A practical guide to running for school board, city council, or county commission — from filing to fundraising.",
            },
            {
              title: "Start a Petition",
              description:
                "How to draft, circulate, and submit petitions that create real change at the local and state level.",
            },
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
