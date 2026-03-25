import type { Metadata } from "next";
import {
  Landmark,
  ArrowRight,
  BookOpen,
  Map,
  DollarSign,
  Users,
  Vote,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Power Works | Daonra",
  description:
    "Demystifying government. Understand how bills become law, how lobbying works, how the federal budget is set, and how elections are decided.",
};

const TOPICS = [
  {
    title: "How a Bill Becomes Law",
    description:
      "The real process: committees, amendments, filibusters, reconciliation, and the gaps between civics class and reality.",
    href: "/how-power-works/bill-to-law",
    icon: BookOpen,
    live: true,
  },
  {
    title: "Gerrymandering Explained",
    description:
      "How district lines get drawn, who draws them, and why your vote might matter less than you think.",
    href: "/how-power-works/gerrymandering",
    icon: Map,
    live: true,
  },
  {
    title: "The Federal Budget",
    description:
      "Where your tax dollars go: discretionary vs. mandatory spending, the debt ceiling, and who decides.",
    href: "/how-power-works/federal-budget",
    icon: DollarSign,
    live: true,
  },
  {
    title: "How Lobbying Works",
    description:
      "What lobbyists actually do, how they influence policy, and the line between advocacy and corruption.",
    href: "/how-power-works/lobbying",
    icon: Landmark,
    live: true,
  },
  {
    title: "Local Government 101",
    description:
      "City councils, school boards, zoning commissions: the local bodies that affect your daily life the most.",
    href: "/how-power-works/local-government",
    icon: Users,
    live: true,
  },
  {
    title: "The Electoral System",
    description:
      "Electoral college, primaries, caucuses, and why some votes count more than others.",
    href: "/how-power-works/electoral-system",
    icon: Vote,
    live: true,
  },
];

export default function HowPowerWorksPage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          How Power Works
        </div>
        <h1 className="mt-4 max-w-3xl font-headline text-5xl font-black tracking-tight text-ink lg:text-6xl">
          Demystifying Government
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink/70">
          Clear, nonpartisan explainers on how the system actually works, from
          how a bill becomes law to how gerrymandering shapes elections. No
          jargon, no spin.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((topic) => {
            const Icon = topic.icon;

            if (topic.live) {
              return (
                <Link
                  key={topic.title}
                  href={topic.href}
                  className="group relative rounded-xl border-2 border-ink bg-ink p-6 text-white transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between">
                    <Icon className="h-6 w-6 text-accent-light" />
                    <ArrowRight className="h-5 w-5 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
                  </div>
                  <h3 className="mt-4 font-headline text-xl font-bold text-white">
                    {topic.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {topic.description}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-accent-light">
                    Read Now
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              );
            }

            return (
              <div
                key={topic.title}
                className="rounded-xl border border-border bg-surface p-6"
              >
                <div className="flex items-start justify-between">
                  <Icon className="h-6 w-6 text-muted" />
                </div>
                <h3 className="mt-4 font-headline text-xl font-bold text-ink">
                  {topic.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {topic.description}
                </p>
                <div className="mt-5 font-mono text-xs font-bold uppercase tracking-wider text-muted/60">
                  Coming Soon
                </div>
              </div>
            );
          })}
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
