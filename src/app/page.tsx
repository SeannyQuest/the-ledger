import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Network,
  Search,
  Calculator,
  Factory,
  EyeOff,
  BookOpen,
} from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { prisma } from "@/lib/prisma";
import { formatCompactMoney, formatCompactNumber } from "@/lib/utils";

export const revalidate = 3600; // Revalidate stats every hour

async function getStats() {
  const [
    entityCount,
    flowCount,
    totalContracts,
    totalLobbying,
    totalContributions,
  ] = await Promise.all([
    prisma.entity.count({ where: { mergedIntoId: null } }),
    prisma.aggregateMoneyFlow.count(),
    prisma.aggregateMoneyFlow.aggregate({
      where: { transactionType: "FEDERAL_CONTRACT" },
      _sum: { totalAmount: true },
    }),
    prisma.aggregateMoneyFlow.aggregate({
      where: { transactionType: "LOBBYING_PAYMENT" },
      _sum: { totalAmount: true },
    }),
    prisma.aggregateMoneyFlow.aggregate({
      where: {
        transactionType: {
          in: [
            "CORPORATE_CONTRIBUTION",
            "PAC_CONTRIBUTION",
            "INDIVIDUAL_CONTRIBUTION",
            "PARTY_CONTRIBUTION",
          ],
        },
      },
      _sum: { totalAmount: true },
    }),
  ]);

  return {
    entityCount,
    flowCount,
    totalContracts: Number(totalContracts._sum.totalAmount ?? 0),
    totalLobbying: Number(totalLobbying._sum.totalAmount ?? 0),
    totalContributions: Number(totalContributions._sum.totalAmount ?? 0),
  };
}

export default async function HomePage() {
  const stats = await getStats();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b-4 border-ink bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-32">
          {/* Masthead */}
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Campaign Finance &middot; Lobbying &middot; Government Contracts
          </div>

          {/* Headline */}
          <h1 className="mt-6 max-w-4xl font-headline text-6xl font-black leading-[0.95] tracking-tight text-ink lg:text-8xl xl:text-9xl">
            Follow the Money
          </h1>

          {/* Subhead */}
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink/70 lg:text-2xl">
            Corporations donate millions to PACs. PACs fund politicians.
            Politicians award billions in contracts.{" "}
            <span className="font-semibold text-ink">See the full circle.</span>
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/money-flow"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-ink/80"
            >
              <BarChart3 className="h-4 w-4" />
              Explore Money Flows
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-white"
            >
              <Search className="h-4 w-4" />
              Search Entities
            </Link>
          </div>
        </div>

        {/* Decorative grid lines */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.03]"
          style={{
            backgroundImage: `
            linear-gradient(to right, #0a0a0a 1px, transparent 1px),
            linear-gradient(to bottom, #0a0a0a 1px, transparent 1px)
          `,
            backgroundSize: "60px 60px",
          }}
        />
      </section>

      {/* Topline Stats — now dynamic */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-16 lg:grid-cols-4 lg:px-8">
          <StatCard
            label="Contributions Tracked"
            value={formatCompactMoney(stats.totalContributions)}
            sublabel="2024 Election Cycle"
            delay={0}
          />
          <StatCard
            label="Lobbying Spending"
            value={formatCompactMoney(stats.totalLobbying)}
            sublabel="Tracked Payments"
            color="money-out"
            delay={150}
          />
          <StatCard
            label="Gov. Contracts"
            value={formatCompactMoney(stats.totalContracts)}
            sublabel="Federal Awards"
            color="accent"
            delay={300}
          />
          <StatCard
            label="Entities Tracked"
            value={formatCompactNumber(stats.entityCount)}
            sublabel="Politicians, Corps, PACs"
            delay={450}
          />
        </div>
      </section>

      {/* Feature Cards */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            What You Can Do
          </div>
          <h2 className="mt-4 max-w-2xl font-headline text-4xl font-black tracking-tight text-ink lg:text-5xl">
            See What They Don&apos;t Want You to See
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Money Flow Maps"
              description="Interactive Sankey diagrams trace money from corporations through PACs to politicians and back through government contracts."
              href="/money-flow"
              color="accent"
            />
            <FeatureCard
              icon={<Calculator className="h-6 w-6" />}
              title="ROI Calculator"
              description="How much do corporations spend on politics, and how much do they get back? Search any entity to calculate their return on political investment."
              href="/roi"
              color="money-in"
            />
            <FeatureCard
              icon={<Factory className="h-6 w-6" />}
              title="Industry Dashboard"
              description="See how entire industries — defense, pharma, tech, oil & gas — leverage political spending. Compare lobbying vs contracts by sector."
              href="/industry"
              color="money-out"
            />
            <FeatureCard
              icon={<EyeOff className="h-6 w-6" />}
              title="Dark Money Tracer"
              description="Trace anonymous political spending from 501(c)(4) nonprofits through Super PACs to attack ads. See the full chain of dark money."
              href="/dark-money/trace"
              color="entity-pac"
            />
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Building2 className="h-6 w-6" />}
              title="Contract Tracker"
              description="Which companies get the biggest federal contracts? Cross-reference with their political donations to see the ROI of lobbying."
              href="/contracts"
              color="money-neutral"
            />
            <FeatureCard
              icon={<Search className="h-6 w-6" />}
              title="Entity Profiles"
              description="Search any politician, corporation, or PAC. See their full financial profile — who funds them, who they fund, and what contracts they got."
              href="/search"
              color="accent"
            />
            <FeatureCard
              icon={<Network className="h-6 w-6" />}
              title="Power Networks"
              description="Interactive network graphs show corporate structures, board overlaps, PAC connections, and the revolving door between industry and government."
              href="/network"
              color="entity-pac"
            />
            <FeatureCard
              icon={<BookOpen className="h-6 w-6" />}
              title="Investigations"
              description="Long-form investigations into the defense pipeline, pharma lobbying, congressional insider trading, dark money, and the revolving door."
              href="/stories"
              color="money-in"
            />
          </div>
        </div>
      </section>

      {/* The Corruption Loop */}
      <section className="border-y-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
            The Circle of Influence
          </div>
          <h2 className="mt-4 max-w-3xl font-headline text-4xl font-black tracking-tight lg:text-5xl">
            How Money Corrupts the System
          </h2>

          <div className="mt-16 grid gap-0 md:grid-cols-4">
            <CorruptionStep
              step={1}
              title="Donate"
              description={`Corporations and wealthy individuals donate to PACs and Super PACs. We're tracking ${formatCompactMoney(stats.totalContributions)} in contributions.`}
            />
            <CorruptionStep
              step={2}
              title="Lobby"
              description={`Lobbying firms are paid ${formatCompactMoney(stats.totalLobbying)} to influence legislation. The same corporations that donate also lobby.`}
            />
            <CorruptionStep
              step={3}
              title="Legislate"
              description="Politicians who receive the money write and vote on laws that affect the donors' industries."
            />
            <CorruptionStep
              step={4}
              title="Contract"
              description={`The federal government awards ${formatCompactMoney(stats.totalContracts)} in contracts — often to the same corporations that funded the campaigns.`}
            />
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/money-flow"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-ink"
            >
              See the Full Circle
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <div className="text-center">
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-muted">
              100% Public Data
            </div>
            <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
              Every Dollar is a Public Record
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
              All data comes from official government sources. Updated in
              real-time. No paywalls. No editorializing. Just the numbers.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-muted">
            {[
              "FEC.gov",
              "USASpending.gov",
              "Senate LDA",
              "FollowTheMoney.org",
              "SEC EDGAR",
              "IRS 990/527",
              "Congress.gov",
            ].map((source) => (
              <div key={source} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {source}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  href,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-ink/30 hover:shadow-lg"
    >
      <div className={`inline-flex rounded-lg bg-paper p-3 text-${color}`}>
        {icon}
      </div>
      <h3 className="mt-4 font-headline text-xl font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      <div className="mt-4 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent opacity-0 transition-opacity group-hover:opacity-100">
        Explore <ArrowRight className="h-3 w-3" />
      </div>
    </Link>
  );
}

function CorruptionStep({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description: string;
}) {
  return (
    <div className="relative border-l border-white/20 p-6 first:border-l-0 md:border-l md:border-t-0">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent bg-transparent font-mono text-sm font-bold text-accent">
        {step}
      </div>
      <h3 className="mt-4 font-headline text-2xl font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">
        {description}
      </p>
      {step < 4 && (
        <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-white/30 md:block">
          <ArrowRight className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}
