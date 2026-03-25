import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Methodology & Data Sources | Daonra",
  description:
    "How Daonra tracks money in politics. Data sources include FEC, OpenSecrets, USASpending, Congress.gov, and SEC disclosures.",
};
import {
  Database,
  Shield,
  GitMerge,
  AlertTriangle,
  Scale,
  BarChart3,
  ArrowRight,
} from "lucide-react";

const DATA_SOURCES = [
  {
    name: "Federal Election Commission (FEC)",
    url: "https://api.open.fec.gov",
    description:
      "Campaign contributions, committee filings, independent expenditures, and candidate financial summaries. Updated every 15 minutes via the OpenFEC API.",
    coverage: "Federal candidates and committees",
    updateFreq: "Every 15 minutes",
  },
  {
    name: "USASpending.gov",
    url: "https://api.usaspending.gov",
    description:
      "Federal contracts, grants, loans, and other financial assistance. Updated daily from 100+ federal agencies.",
    coverage: "All federal awards",
    updateFreq: "Daily",
  },
  {
    name: "Senate Lobbying Disclosure Act (LDA)",
    url: "https://lda.senate.gov",
    description:
      "Lobbying registrations, quarterly activity reports, and contribution reports. Filed by registered lobbyists and lobbying firms.",
    coverage: "Federal lobbying activity",
    updateFreq: "As filed (quarterly)",
  },
  {
    name: "FollowTheMoney.org",
    url: "https://www.followthemoney.org",
    description:
      "State-level campaign contributions across all 50 states. The most comprehensive source for state and local campaign finance.",
    coverage: "All 50 states",
    updateFreq: "As updated",
  },
  {
    name: "SEC EDGAR",
    url: "https://www.sec.gov/edgar",
    description:
      "Proxy statements (DEF 14A) for executive compensation and corporate political spending disclosures from public companies.",
    coverage: "Public companies",
    updateFreq: "As filed",
  },
  {
    name: "IRS 990/527",
    description:
      "Tax filings from PACs, Super PACs, 527 organizations, and nonprofits. Includes revenue, expenses, and executive compensation.",
    coverage: "Tax-exempt political orgs",
    updateFreq: "As filed",
  },
  {
    name: "Congress.gov",
    url: "https://api.congress.gov",
    description:
      "Legislation, voting records, and committee information from the Library of Congress.",
    coverage: "Congressional activity",
    updateFreq: "Daily",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b-4 border-ink bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-24 lg:px-8">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            About Daonra
          </div>
          <h1 className="mt-4 font-headline text-5xl font-black tracking-tight text-ink lg:text-6xl">
            Methodology &amp; Data Sources
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-ink/70">
            Every dollar on this platform is a matter of public record. We
            aggregate, clean, deduplicate, and visualize data from seven
            government sources so you don&apos;t have to.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
          <div className="drop-cap">
            <p className="text-lg leading-relaxed text-ink/80">
              Daonra exists because no single platform connects the full money
              path in American politics: Corporation donates to PAC, PAC funds
              Candidate, Candidate awards Government Contract back to
              Corporation. Existing tools (OpenSecrets, FEC.gov, LittleSis,
              USASpending) each cover one slice but force users to toggle
              between five websites. We built Daonra to close that gap.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
          <h2 className="font-headline text-3xl font-bold text-ink">
            How It Works
          </h2>
          <div className="mt-10 space-y-8">
            <HowItWorksStep
              icon={<Database className="h-5 w-5" />}
              title="1. Ingest"
              description="Automated pipelines pull data from seven government APIs and bulk data sources. FEC filings arrive within 15 minutes. Federal contracts update daily. State data syncs as it's published."
            />
            <HowItWorksStep
              icon={<GitMerge className="h-5 w-5" />}
              title="2. Resolve"
              description='The same entity appears under different names across sources. "Google LLC" in FEC filings, "Alphabet Inc" in SEC filings, "GOOGLE LLC" in lobbying disclosures. All the same entity. We use exact ID matching, normalized name matching, and contextual signals to unify records.'
            />
            <HowItWorksStep
              icon={<BarChart3 className="h-5 w-5" />}
              title="3. Aggregate"
              description="Raw transactions are aggregated into entity-level summaries and flow relationships. Pre-computed tables power the Sankey diagrams and network graphs without expensive real-time queries."
            />
            <HowItWorksStep
              icon={<Shield className="h-5 w-5" />}
              title="4. Serve"
              description="All data is served through a Next.js API backed by PostgreSQL. Visualizations use D3.js for Sankey money flow diagrams and force-directed network graphs. No paywalls, no editorializing."
            />
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
          <h2 className="font-headline text-3xl font-bold text-ink">
            Data Sources
          </h2>
          <p className="mt-2 text-muted">
            All data comes from official government sources and is freely
            available to the public.
          </p>

          <div className="mt-10 space-y-6">
            {DATA_SOURCES.map((source) => (
              <div
                key={source.name}
                className="rounded-lg border border-border bg-surface p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-headline text-lg font-bold text-ink">
                    {source.name}
                  </h3>
                  <div className="flex shrink-0 gap-3">
                    <span className="rounded bg-paper px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
                      {source.updateFreq}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {source.description}
                </p>
                <div className="mt-3 flex items-center gap-4 font-mono text-xs text-muted">
                  <span>Coverage: {source.coverage}</span>
                  {source.url && (
                    <>
                      <span className="text-border">|</span>
                      <span className="text-accent">{source.url}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Methodology */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
          <h2 className="font-headline text-3xl font-bold text-ink">
            ROI Calculation
          </h2>
          <div className="mt-6 rounded-xl border border-border bg-paper p-6">
            <div className="font-mono text-sm text-ink">
              ROI = Total Government Contracts Received / (Total PAC Donations +
              Lobbying Spend)
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            This measures the &ldquo;return&rdquo; corporations get on their
            political spending. For example, if a company spends $8M on
            donations and lobbying and receives $45B in contracts, their ROI is
            approximately 5,600x. This metric does not imply direct corruption
            or quid pro quo. It highlights the statistical correlation between
            political spending and government contract awards, which the public
            has a right to examine.
          </p>
        </div>
      </section>

      {/* Limitations */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-accent" />
            <div>
              <h2 className="font-headline text-3xl font-bold text-ink">
                What We Cannot Track
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink/80">
                <p>
                  <strong className="text-ink">Dark Money.</strong> Spending by
                  501(c)(4) social welfare organizations and certain 501(c)(6)
                  trade associations does not require donor disclosure. We track
                  the spending side when it appears in FEC independent
                  expenditure reports, but the original source of the money is
                  legally hidden.
                </p>
                <p>
                  <strong className="text-ink">Informal Influence.</strong>{" "}
                  Phone calls, personal relationships, fundraiser attendance,
                  and other forms of soft influence leave no paper trail. The
                  data here captures only formal, disclosed financial
                  transactions.
                </p>
                <p>
                  <strong className="text-ink">State-Level Gaps.</strong> While
                  FollowTheMoney.org covers all 50 states, disclosure
                  requirements vary dramatically. Some states have excellent
                  real-time reporting; others have minimal requirements with
                  significant delays.
                </p>
                <p>
                  <strong className="text-ink">
                    Entity Resolution Errors.
                  </strong>{" "}
                  Despite best efforts, some entities may be incorrectly merged
                  or remain unlinked. Contributions from &ldquo;John
                  Smith&rdquo; in different states may be different people, or
                  the same person filing under variations of their name.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
          <div className="flex items-start gap-4">
            <Scale className="mt-1 h-6 w-6 shrink-0 text-ink" />
            <div>
              <h2 className="font-headline text-3xl font-bold text-ink">
                Editorial Principles
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink/80">
                <p>
                  <strong className="text-ink">No editorializing.</strong> We
                  present the data as-is. We do not label spending as
                  &ldquo;corrupt&rdquo; or &ldquo;suspicious.&rdquo; Readers
                  draw their own conclusions.
                </p>
                <p>
                  <strong className="text-ink">Non-partisan.</strong> We track
                  both parties equally. Money flows wherever it flows. The data
                  does not have a political affiliation.
                </p>
                <p>
                  <strong className="text-ink">Open methodology.</strong> Every
                  calculation, data source, and assumption is documented. If we
                  make an error, we correct it transparently.
                </p>
                <p>
                  <strong className="text-ink">Free and open.</strong> This
                  platform is free to use. All source data is publicly
                  available. We believe sunlight is the best disinfectant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center lg:px-8">
          <h2 className="font-headline text-3xl font-bold text-white">
            Start Exploring
          </h2>
          <p className="mt-3 text-white/60">
            See the money. Follow the connections. Draw your own conclusions.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/money-flow"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-ink"
            >
              <BarChart3 className="h-4 w-4" />
              Money Flow Map
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white/70 transition-colors hover:border-white hover:text-white"
            >
              Search Entities
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function HowItWorksStep({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-ink text-ink">
        {icon}
      </div>
      <div>
        <h3 className="font-headline text-xl font-bold text-ink">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </div>
  );
}
