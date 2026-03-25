import type { Metadata } from "next";
import { ClipboardList, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Scorecards | Daonra",
  description:
    "Hold power accountable. Voting records, stock trade tracking, donor maps, attendance scores, and promise tracking for every member of Congress.",
};

export default function ScorecardsPage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Scorecards & Accountability
        </div>
        <h1 className="mt-4 max-w-3xl font-headline text-5xl font-black tracking-tight text-ink lg:text-6xl">
          Hold Power Accountable
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink/70">
          Voting records, stock trades, donor maps, and attendance scores. See
          how your representatives actually perform — not just what they
          promise.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Voting Records",
              description:
                "How did your representatives vote on the issues that matter to you? Search by topic, bill, or legislator.",
            },
            {
              title: "Stock Trade Tracker",
              description:
                "Congressional stock trades disclosed under the STOCK Act. See who's trading what — and whether it aligns with their committee work.",
            },
            {
              title: "Donor Maps",
              description:
                "Interactive maps showing who funds your representatives — by industry, geography, and amount.",
            },
            {
              title: "Attendance Scores",
              description:
                "Who shows up to vote and who doesn't? Track committee attendance and floor vote participation rates.",
            },
            {
              title: "Promise Tracker",
              description:
                "Campaign promises vs. legislative action. See which representatives follow through — and which don't.",
            },
            {
              title: "Comparison Tool",
              description:
                "Compare any two legislators side by side — voting records, donors, trades, and more.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <ClipboardList className="h-6 w-6 text-money-neutral" />
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
