import Link from "next/link";
import { ArrowRight, ArrowUpRight, TrendingUp, FileText, Pill, Building2, Users, DollarSign } from "lucide-react";
import { ScrollytellSection } from "@/components/stories/ScrollytellSection";
import type { ScrollytellStep } from "@/components/stories/ScrollytellSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pharma's $452 Million Bet | Daonra",
  description:
    "The pharmaceutical industry spends more on lobbying than any other sector — $452M in 2025 alone. An investigation into how pharma blocks drug pricing reform.",
};

const SCROLLYTELL_STEPS: ScrollytellStep[] = [
  {
    id: "spend",
    title: "The Spend",
    body: "The pharmaceutical industry is the single largest lobbying force in Washington. In 2025 alone, pharma companies and their trade groups spent $452 million on federal lobbying — more than oil, tech, and defense combined. PhRMA, the industry's main trade association, maintains a permanent lobbying operation that dwarfs most government agencies in budget and headcount. This is not occasional influence. It is a standing army.",
    stat: { value: "$452M", label: "Pharma Lobbying Spend (2025)", color: "#c41d1d" },
    highlightColor: "#c41d1d",
  },
  {
    id: "blockade",
    title: "The Blockade",
    body: "For over two decades, the pharmaceutical industry successfully blocked Medicare from negotiating drug prices — the single most impactful cost-saving measure available. Every other major government buyer negotiates: the VA, Medicaid, the NHS. Medicare, which covers 65 million Americans, was explicitly prohibited by law from doing so. That prohibition wasn't an accident. It was purchased.",
    stat: { value: "20", label: "Years Medicare Couldn't Negotiate", color: "accent" },
    highlightColor: "#d97706",
  },
  {
    id: "windfall",
    title: "The Windfall",
    body: "The Congressional Budget Office estimated that a single provision blocking Medicare negotiation cost taxpayers $8 billion per year. The dark money and lobbying investment to maintain that provision was roughly $4 million annually. That is a 2,000-to-1 return: for every dollar pharma spent on political influence, they avoided $2,000 in price controls. No legitimate investment in any market produces that kind of return.",
    stat: { value: "2,000:1", label: "Return on Political Investment", color: "money-in" },
    highlightColor: "#1a7a3a",
  },
  {
    id: "army",
    title: "The Army",
    body: "When the Inflation Reduction Act threatened to introduce limited Medicare drug price negotiation in 2022, the pharmaceutical industry deployed 545 registered lobbyists to Capitol Hill — roughly 20 lobbyists for every member of the relevant committees. They hired former congressional staffers, former CMS administrators, and former White House officials. The bill passed, but in dramatically weakened form: only 10 drugs in the first year, with negotiations delayed by years.",
    stat: { value: "545", label: "Lobbyists Deployed Against IRA", color: "accent" },
    highlightColor: "#d97706",
  },
  {
    id: "price",
    title: "The Price",
    body: "Americans pay two to three times more for prescription drugs than citizens of any other developed nation. Insulin that costs $10 in Canada costs $300 in the United States. Cancer drugs priced at $50,000 per course abroad sell for $150,000 here. The pharmaceutical industry argues that high prices fund innovation. But over half of transformative drug research is funded by the NIH — with taxpayer dollars. The public pays twice: once for the research, and again at the pharmacy counter.",
    stat: { value: "2-3x", label: "U.S. Drug Prices vs. Other Nations", color: "#c41d1d" },
    highlightColor: "#c41d1d",
  },
];

const KEY_PLAYERS = [
  {
    name: "PhRMA",
    type: "corporation" as const,
    stat: "#1 lobbying spender",
    description: "The Pharmaceutical Research and Manufacturers of America. The industry's primary trade group and lobbying vehicle in Washington.",
    href: "/entity/corporation/phrma",
    icon: Pill,
  },
  {
    name: "Pfizer",
    type: "corporation" as const,
    stat: "$31M lobbying (2023-2024)",
    description: "One of the world's largest pharmaceutical companies and a top individual lobbying spender in the sector.",
    href: "/entity/corporation/pfizer",
    icon: Building2,
  },
  {
    name: "Johnson & Johnson",
    type: "corporation" as const,
    stat: "$18M lobbying (2023-2024)",
    description: "Global pharma and consumer health conglomerate. Active in lobbying against drug pricing regulation.",
    href: "/entity/corporation/johnson-and-johnson",
    icon: Building2,
  },
  {
    name: "545 Pharma Lobbyists",
    type: "agency" as const,
    stat: "20:1 ratio vs. Congress",
    description: "The army of registered lobbyists deployed to fight the Inflation Reduction Act's drug pricing provisions.",
    href: "/entity/agency/pharma-lobby",
    icon: Users,
  },
];

export default function PharmaBetStory() {
  return (
    <article>
      {/* Hero */}
      <header className="relative border-b-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-24 lg:px-8 lg:py-32">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
            Investigation &middot; Pharmaceuticals &middot; Lobbying
          </div>

          <h1 className="mt-6 font-headline text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl xl:text-8xl">
            Pharma&apos;s $452 Million Bet
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70 lg:text-2xl">
            The pharmaceutical industry spends more on lobbying than any other sector in America —{" "}
            <span className="font-semibold text-white">and the return on investment is staggering</span>.
          </p>

          <div className="mt-8 flex items-center gap-6 text-sm text-white/50">
            <time dateTime="2026-03-10">March 10, 2026</time>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>15 min read</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>Daonra Investigations</span>
          </div>
        </div>

        {/* Decorative grid */}
        <div
          className="absolute inset-0 -z-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </header>

      {/* Lead paragraph */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <p className="drop-cap text-xl leading-relaxed text-ink/80 lg:text-2xl lg:leading-relaxed">
            No industry in America has mastered the art of political investment like pharmaceuticals.
            While other sectors spend millions on lobbying and hope for favorable treatment, pharma
            has built a machine so efficient that every dollar of political spending generates
            thousands in protected revenue. The numbers are not hidden. They are filed with the
            Senate, reported to the FEC, and published in annual reports. The system operates in
            plain sight — and it works.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            Daonra analyzed two decades of pharmaceutical lobbying expenditures, campaign
            contributions, and the legislative outcomes they purchased. We traced the money from
            corporate treasuries through trade associations, into the campaign accounts of key
            committee members, and measured the policy outcomes that followed. The correlation
            between spending and results is not subtle.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The following investigation uses data from the Senate Lobbying Disclosure Act database,
            FEC.gov, CBO scoring documents, and public financial reports. All figures are from the
            2003-2025 period. Scroll through to see how the bet pays off.
          </p>
        </div>
      </section>

      {/* Scrollytelling section */}
      <ScrollytellSection
        headline="The $452 Million Machine"
        subhead="Five steps reveal how pharmaceutical lobbying blocks reform and protects a pricing system that costs Americans billions."
        steps={SCROLLYTELL_STEPS}
        bgColor="bg-ink"
        textColor="text-white"
      />

      {/* Pull quote break */}
      <section className="border-y-4 border-ink bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
          <blockquote className="text-center">
            <p className="font-headline text-3xl font-black leading-tight tracking-tight text-ink lg:text-4xl">
              &ldquo;For every $1 pharma spent on dark money, they saved $2,000
              in price controls they avoided.&rdquo;
            </p>
            <cite className="mt-6 block font-mono text-sm font-bold uppercase tracking-widest text-muted">
              Daonra Analysis, CBO Estimates
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Analysis section */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <h2 className="font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Innovation Myth
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The pharmaceutical industry&apos;s primary defense of high drug prices is that they fund
            innovation. The data tells a different story. The National Institutes of Health —
            funded by taxpayers — contributes to the basic research behind the majority of
            transformative new drugs. A 2018 study published in the Proceedings of the National
            Academy of Sciences found that NIH funding contributed to research associated with
            every one of the 210 drugs approved by the FDA from 2010 to 2016.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Meanwhile, pharma companies spend more on marketing and lobbying combined than they
            do on R&amp;D. The top 10 pharmaceutical companies reported $180 billion in marketing
            expenses in 2023, compared to $140 billion in research spending. The innovation argument
            is not a justification — it is a talking point, manufactured and maintained by the same
            lobbying apparatus that blocks price reform.
          </p>

          {/* Inline stat callout */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-accent">$452M</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Annual Lobbying
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">545</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Lobbyists vs. IRA
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-in">2,000:1</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Return on Investment
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            The Inflation Reduction Act of 2022 represented the first crack in pharma&apos;s wall.
            Medicare can now negotiate prices on a small number of drugs, starting in 2026. But
            the industry has already filed multiple lawsuits challenging the program&apos;s
            constitutionality and deployed hundreds of lobbyists to weaken implementation.
            The $452 million annual lobbying budget is not going away — it is adapting.
          </p>
        </div>
      </section>

      {/* Key Players */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Key Players
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Pharma Lobbying Machine
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Explore the corporations and trade groups driving the largest lobbying operation in Washington.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {KEY_PLAYERS.map((player) => {
              const Icon = player.icon;
              return (
                <Link
                  key={player.name}
                  href={player.href}
                  className="group flex gap-5 rounded-xl border border-border bg-paper p-6 transition-all hover:-translate-y-1 hover:border-ink/30 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface text-ink">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-headline text-lg font-bold text-ink">
                        {player.name}
                      </h3>
                      <ArrowUpRight className="h-4 w-4 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <div className="mt-0.5 font-mono text-sm font-bold text-accent">
                      {player.stat}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {player.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology note */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
          <div className="rounded-xl border border-border bg-surface p-8">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Methodology &amp; Data Sources
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              All figures in this investigation are derived from publicly available data.
              Lobbying expenditure data comes from the Senate Lobbying Disclosure Act database
              and OpenSecrets.org. Drug pricing comparisons reference the RAND Corporation,
              Commonwealth Fund, and CBO scoring documents. NIH research contribution data
              is sourced from peer-reviewed academic studies. All numbers are illustrative
              aggregates for editorial purposes and should be verified against primary sources
              for citation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center lg:px-8">
          <TrendingUp className="mx-auto h-10 w-10 text-accent-light" />
          <h2 className="mt-6 font-headline text-3xl font-black tracking-tight lg:text-4xl">
            Follow the Pharma Money
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/60">
            Explore the interactive money flow diagram to trace pharmaceutical lobbying
            dollars from corporate treasury to Capitol Hill.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/money-flow"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-white/90"
            >
              Explore Money Flows
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10"
            >
              All Investigations
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
