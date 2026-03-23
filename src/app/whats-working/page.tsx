import { Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WhatsWorkingPage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          What Is Working
        </div>
        <h1 className="mt-4 max-w-3xl font-headline text-5xl font-black tracking-tight text-ink lg:text-6xl">
          Proof That Better Is Possible
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink/70">
          Solutions from around the world — countries, cities, and communities
          that have tackled corruption, improved governance, and strengthened
          democracy. If they can do it, so can we.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Ranked-Choice Voting",
              description:
                "How Alaska, Maine, and cities worldwide are using ranked-choice voting to reduce polarization and give voters more choice.",
            },
            {
              title: "Anti-Corruption Wins",
              description:
                "From Iceland's crowdsourced constitution to South Korea's anti-corruption agency — real victories against systemic corruption.",
            },
            {
              title: "Universal Healthcare Models",
              description:
                "How other democracies provide healthcare to all citizens — costs, outcomes, and what the U.S. can learn.",
            },
            {
              title: "Participatory Budgeting",
              description:
                "Cities like Porto Alegre, Paris, and New York let residents directly decide how public money is spent.",
            },
            {
              title: "Campaign Finance Reform",
              description:
                "Public financing, donation limits, and transparency laws that are actually working to reduce money in politics.",
            },
            {
              title: "Open Government Data",
              description:
                "Countries leading in government transparency — open data portals, FOIA reforms, and civic tech success stories.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <Globe className="h-6 w-6 text-money-out" />
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
