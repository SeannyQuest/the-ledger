import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Landmark,
  Globe,
  Users,
  ClipboardList,
  Compass,
  Search,
  DollarSign,
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

const PILLARS = [
  {
    icon: DollarSign,
    title: "Follow the Money",
    description:
      "Track campaign finance, lobbying payments, and government contracts. See who funds whom — and what they get in return.",
    href: "/money-flow",
    color: "accent",
  },
  {
    icon: Landmark,
    title: "How Power Works",
    description:
      "Explainers that demystify government — how bills pass, how gerrymandering works, how local politics shapes your daily life.",
    href: "/how-power-works",
    color: "money-in",
  },
  {
    icon: Globe,
    title: "What Is Working",
    description:
      "Solutions from around the world that prove better is possible. Universal healthcare, ranked-choice voting, anti-corruption wins.",
    href: "/whats-working",
    color: "money-out",
  },
  {
    icon: Users,
    title: "The Collaboration Advantage",
    description:
      "What humans achieve when they work together. From mutual aid networks to open-source governance tools — cooperation wins.",
    href: "/collaboration",
    color: "entity-pac",
  },
  {
    icon: ClipboardList,
    title: "Scorecards & Accountability",
    description:
      "Voting records, stock trades, donor maps, and more. Hold your representatives accountable with the facts.",
    href: "/scorecards",
    color: "money-neutral",
  },
  {
    icon: Compass,
    title: "Civic How-To",
    description:
      "Practical guides: register to vote, contact your reps, attend town halls, run for office. Your step-by-step playbook for participation.",
    href: "/civics",
    color: "accent",
  },
];

export default async function HomePage() {
  const stats = await getStats();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b-4 border-ink bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-32">
          {/* Masthead */}
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Transparency &middot; Understanding &middot; Action
          </div>

          {/* Headline */}
          <h1 className="mt-6 max-w-4xl font-headline text-6xl font-black leading-[0.95] tracking-tight text-ink lg:text-8xl xl:text-9xl">
            Your Guide to How Power Works
          </h1>

          {/* Subhead */}
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink/70 lg:text-2xl">
            Follow the money. Understand the system. See what&apos;s working
            around the world.{" "}
            <span className="font-semibold text-ink">
              Then do something about it.
            </span>
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/money-flow"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-ink/80"
            >
              <BarChart3 className="h-4 w-4" />
              Explore the Platform
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/civics"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-white"
            >
              <Compass className="h-4 w-4" />
              Get Involved
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

      {/* Transparency Tools — dynamic stats */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="mb-8 text-center">
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Transparency Tools
            </div>
            <p className="mt-2 text-sm text-muted">
              Real-time data from official government sources — no paywalls, no
              editorializing
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
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
        </div>
      </section>

      {/* Six Pillars */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            The Platform
          </div>
          <h2 className="mt-4 max-w-3xl font-headline text-4xl font-black tracking-tight text-ink lg:text-5xl">
            Six Ways to Engage
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Daonra is built around six pillars — from tracking money in politics
            to practical tools for getting involved. Start anywhere.
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((pillar) => (
              <PillarCard
                key={pillar.href}
                icon={<pillar.icon className="h-6 w-6" />}
                title={pillar.title}
                description={pillar.description}
                href={pillar.href}
                color={pillar.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Civic Engagement Framework — replaces corruption loop */}
      <section className="border-y-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
            The Civic Engagement Framework
          </div>
          <h2 className="mt-4 max-w-3xl font-headline text-4xl font-black tracking-tight lg:text-5xl">
            From Awareness to Action
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-white/60">
            Democracy works when people participate. Here&apos;s how Daonra
            helps you go from informed citizen to active participant.
          </p>

          <div className="mt-16 grid gap-0 md:grid-cols-4">
            <EngagementStep
              step={1}
              title="Learn"
              description="Understand how the system actually works — from campaign finance to how a bill becomes law. Knowledge is the first step."
            />
            <EngagementStep
              step={2}
              title="Track"
              description={`Follow ${formatCompactMoney(stats.totalContributions)} in contributions, ${formatCompactMoney(stats.totalLobbying)} in lobbying, and ${formatCompactMoney(stats.totalContracts)} in contracts. See where the money goes.`}
            />
            <EngagementStep
              step={3}
              title="Connect"
              description="Find others who care. See what's working around the world. Learn from communities that have already solved these problems."
            />
            <EngagementStep
              step={4}
              title="Act"
              description="Register to vote. Contact your reps. Attend a town hall. Run for office. Use our step-by-step guides to make your voice heard."
            />
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/civics"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-ink"
            >
              Start Your Civic Journey
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
              Built on Transparency
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
              All financial data comes from official government sources. Updated
              in real-time. No paywalls. No editorializing. Just the facts.
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

function PillarCard({
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
      <h3 className="mt-4 font-headline text-xl font-bold text-ink">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      <div className="mt-4 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent opacity-0 transition-opacity group-hover:opacity-100">
        Explore <ArrowRight className="h-3 w-3" />
      </div>
    </Link>
  );
}

function EngagementStep({
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
