import { Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CollaborationPage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          The Collaboration Advantage
        </div>
        <h1 className="mt-4 max-w-3xl font-headline text-5xl font-black tracking-tight text-ink lg:text-6xl">
          What We Build Together
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink/70">
          The best outcomes happen when people work together. From mutual aid
          networks to open-source governance tools — cooperation creates results
          that no individual can achieve alone.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Mutual Aid Networks",
              description:
                "How communities are building resilience from the ground up — sharing resources, skills, and support outside traditional institutions.",
            },
            {
              title: "Civic Tech",
              description:
                "Open-source tools built by citizens for citizens — from budget trackers to voting guides to transparency platforms like this one.",
            },
            {
              title: "Community Organizing",
              description:
                "The strategies and structures that turn individual frustration into collective power — from tenant unions to advocacy coalitions.",
            },
            {
              title: "Cross-Partisan Coalitions",
              description:
                "When people from different political backgrounds find common ground — examples of bipartisan wins on corruption, privacy, and more.",
            },
            {
              title: "Cooperative Models",
              description:
                "Worker co-ops, community land trusts, credit unions — alternative economic models that distribute power more equitably.",
            },
            {
              title: "Global Solidarity",
              description:
                "How movements in one country inspire and support movements in another — from climate action to anti-corruption.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <Users className="h-6 w-6 text-entity-pac" />
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
