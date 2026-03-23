import { Landmark, ArrowRight } from "lucide-react";
import Link from "next/link";

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
          Clear, nonpartisan explainers on how the system actually works — from
          how a bill becomes law to how gerrymandering shapes elections. No
          jargon, no spin.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "How a Bill Becomes Law",
              description:
                "The real process — committees, amendments, filibusters, reconciliation, and the gaps between civics class and reality.",
            },
            {
              title: "Gerrymandering Explained",
              description:
                "How district lines get drawn, who draws them, and why your vote might matter less than you think.",
            },
            {
              title: "The Federal Budget",
              description:
                "Where your tax dollars go — discretionary vs. mandatory spending, the debt ceiling, and who decides.",
            },
            {
              title: "How Lobbying Works",
              description:
                "What lobbyists actually do, how they influence policy, and the line between advocacy and corruption.",
            },
            {
              title: "Local Government 101",
              description:
                "City councils, school boards, zoning commissions — the local bodies that affect your daily life the most.",
            },
            {
              title: "The Electoral System",
              description:
                "Electoral college, primaries, caucuses, and why some votes count more than others.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <Landmark className="h-6 w-6 text-money-in" />
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
