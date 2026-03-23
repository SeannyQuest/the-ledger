import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  TrendingUp,
  FileText,
  Landmark,
  Building2,
  ShieldOff,
  Heart,
  Banknote,
  Users,
  Bitcoin,
  Scale,
} from "lucide-react";
import { ScrollytellSection } from "@/components/stories/ScrollytellSection";
import type { ScrollytellStep } from "@/components/stories/ScrollytellSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wall Street & Healthcare | Daonra",
  description:
    "From crypto Super PACs to Medicare Advantage fraud, two industries that capture regulators, gut consumer protections, and privatize public systems. Chapter 3 of The Field Guide to American Corruption.",
};

/* ------------------------------------------------------------------ */
/*  Scrollytell — The Money Loop                                      */
/* ------------------------------------------------------------------ */

const SCROLLYTELL_STEPS: ScrollytellStep[] = [
  {
    id: "premiums",
    title: "The Premium Extraction",
    body: "It starts with the money Americans have no choice but to pay. Health insurance premiums have risen 47% over the past decade while wages grew 27%. Medicare Advantage plans — 52% of all Medicare enrollment — overcharge the federal government by an estimated $600 billion since 2003. The money flows in one direction: out of paychecks, out of the Treasury, and into corporate balance sheets. UnitedHealth posted $2.3 billion in profit in Q3 2025 alone.",
    stat: { value: "$600B+", label: "Medicare Advantage Overpayments Since 2003", color: "#c41d1d" },
    highlightColor: "#c41d1d",
  },
  {
    id: "lobby",
    title: "The Lobbying Wall",
    body: "Those profits fund the lobbying apparatus that prevents reform. The health sector spent $868 million on federal lobbying in 2025 — an all-time record, driven by Medicaid cut battles. The financial sector added another $711 million. Combined, these two industries deployed more than $1.5 billion in a single year to shape the laws that govern them. The American Hospital Association alone spent $32 million. Blue Cross Blue Shield retained 100 lobbyists just for Medicare Advantage.",
    stat: { value: "$1.58B", label: "Combined Lobbying (2025)", color: "accent" },
    highlightColor: "#d97706",
  },
  {
    id: "block",
    title: "The Reform Kill",
    body: "The lobbying works. When Congress considered the No Surprises Act, the private-equity-owned physician staffing industry funneled $54 million through a dark money front called Doctor Patient Unity to gut the bill. When the Dodd-Frank Act threatened Wall Street, banks deployed 3,000 lobbyists — six for every member of Congress — and spent $27.3 million in just three months. After Dodd-Frank passed anyway, the industry spent $55 million, then $61 million, then $61 million again on implementation lobbying. The spending after the law exceeded the spending to block it.",
    stat: { value: "3,000", label: "Lobbyists Deployed Against Dodd-Frank", color: "#c41d1d" },
    highlightColor: "#c41d1d",
  },
  {
    id: "capture",
    title: "The Regulatory Capture",
    body: "When lobbying alone is not enough, both industries place their own people inside the agencies meant to police them. At the SEC, 419 former employees filed 1,949 disclosure statements — and research shows regulators are 44.7% less likely to enforce against banks that lobby. At CMS, 53% of departing officials leave for the health industry. Twenty-four of fifty state insurance commissioners came from the industry they regulate. The referees are former players.",
    stat: { value: "44.7%", label: "Enforcement Reduction at Lobbying Banks", color: "money-out" },
    highlightColor: "#c41d1d",
  },
  {
    id: "profits",
    title: "The Payout",
    body: "The captured regulators look the other way, and the profits flow. Private equity firms save $2 billion per year through the carried interest loophole — Senator Sinema took $500,000 from PE firms, then demanded a $14 billion closure of the loophole be removed from the Inflation Reduction Act. The three largest PBMs control 80% of the pharmacy market; the FTC has sued all three for inflating insulin prices. The cycle completes: profits fund lobbying, lobbying blocks reform, blocked reform protects profits.",
    stat: { value: "$2B/yr", label: "Carried Interest Loophole Savings", color: "money-in" },
    highlightColor: "#1a7a3a",
  },
  {
    id: "cycle",
    title: "The Cycle Repeats",
    body: "Crypto showed how fast the playbook scales. Industry lobbying surged 1,386% in six years — from $2.72 million in 2017 to $40.42 million in 2023. Fairshake PAC raised $195 million and achieved a 91% win rate in 2024, accounting for nearly half of all corporate political dollars that cycle. They targeted and defeated progressive members Katie Porter, Jamaal Bowman, and Cori Bush. Wall Street learned this playbook decades ago. Healthcare perfected it. Crypto is running it at startup speed.",
    stat: { value: "1,386%", label: "Crypto Lobbying Increase (2017-2023)", color: "accent" },
    highlightColor: "#d97706",
  },
];

/* ------------------------------------------------------------------ */
/*  Key Players                                                       */
/* ------------------------------------------------------------------ */

const KEY_PLAYERS = [
  {
    name: "JPMorgan Chase",
    stat: "$8.05M lobbying (2024)",
    description:
      "The largest U.S. bank by assets and the top individual lobbying spender in the financial sector. Led the industry fight against Dodd-Frank provisions.",
    href: "/entity/corporation/jpmorgan-chase",
    icon: Landmark,
  },
  {
    name: "Fairshake PAC",
    stat: "$195M raised, 91% win rate",
    description:
      "The crypto industry Super PAC that accounted for nearly half of all corporate political dollars in 2024. Targeted and defeated three progressive incumbents.",
    href: "/entity/corporation/fairshake-pac",
    icon: Bitcoin,
  },
  {
    name: "UnitedHealth Group",
    stat: "$9.93M lobbying",
    description:
      "The largest health insurer in the U.S. Received an estimated $8.7 billion in excess Medicare Advantage payments. Under DOJ criminal and civil investigation in 2025.",
    href: "/entity/corporation/unitedhealth",
    icon: Heart,
  },
  {
    name: "Blue Cross Blue Shield",
    stat: "$27.15M lobbying (100 MA lobbyists)",
    description:
      "Deployed 100 lobbyists focused solely on Medicare Advantage. The single largest lobbying spender in the health insurance sector.",
    href: "/entity/corporation/bcbs",
    icon: ShieldOff,
  },
  {
    name: "Kenneth Griffin / Citadel",
    stat: "$100M personal (2024)",
    description:
      "Citadel founder and hedge fund billionaire. Over $250 million in career political spending. Emblematic of the megadonor class that dominates financial sector influence.",
    href: "/entity/person/kenneth-griffin",
    icon: Banknote,
  },
  {
    name: "Centene Corporation",
    stat: "$26.9M political, $1B+ overbilling",
    description:
      "The largest Medicaid managed care company. Settled overbilling claims in 13+ states while maintaining one of the highest political spending profiles in the sector.",
    href: "/entity/corporation/centene",
    icon: Building2,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function WallStreetAndHealthcarePage() {
  return (
    <article>
      {/* ── Hero ── */}
      <header className="relative border-b-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-24 lg:px-8 lg:py-32">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 font-mono text-xs text-white/40">
            <Link href="/guide" className="transition-colors hover:text-white/70">
              Field Guide
            </Link>
            <span>/</span>
            <span className="text-white/60">Chapter 3</span>
          </nav>

          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
            Chapter 3 &middot; Financial Industry &middot; Healthcare
          </div>

          <h1 className="mt-6 font-headline text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl xl:text-8xl">
            Wall Street &amp;
            <br />
            Healthcare
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70 lg:text-2xl">
            Two megasectors, one playbook: capture the regulator, gut the consumer protection,{" "}
            <span className="font-semibold text-white">privatize the public system</span>.
          </p>

          <div className="mt-8 flex items-center gap-6 text-sm text-white/50">
            <time dateTime="2026-03-11">March 11, 2026</time>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>22 min read</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>Daonra &middot; Field Guide</span>
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

      {/* ── Lead paragraph ── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <p className="drop-cap text-xl leading-relaxed text-ink/80 lg:text-2xl lg:leading-relaxed">
            The financial industry and the healthcare industry do not look alike. One trades
            derivatives in glass towers on the Hudson; the other runs dialysis clinics in strip
            malls across the Sun Belt. But follow the money and they become indistinguishable.
            Both spend hundreds of millions per year on federal lobbying. Both rotate their
            executives through the agencies that regulate them. Both have perfected the art of
            blocking reform after a crisis, then resuming the behavior that caused it. In 2025,
            these two sectors spent a combined $1.58 billion on lobbying — more than the GDP of
            a dozen sovereign nations.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            Daonra examined twenty years of lobbying disclosures, campaign finance records,
            revolving-door employment data, and regulatory enforcement actions across both
            sectors. We traced money from corporate treasuries through trade associations and
            Super PACs into the campaign accounts of the committee members who write the rules.
            We tracked former regulators into industry jobs and measured the enforcement gaps
            that followed. The pattern is the same in both industries: spend to capture, capture
            to deregulate, deregulate to profit.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            This chapter covers the financial industry — from the 2008 crisis through crypto&apos;s
            rise — and the broader healthcare sector beyond pharmaceuticals: insurers, hospitals,
            pharmacy benefit managers, and the managed care companies that now control more than
            half of Medicare. The data comes from Senate lobbying disclosures, FEC filings,
            OpenSecrets, CMS records, and federal enforcement databases.
          </p>
        </div>
      </section>

      {/* ── Part I: Wall Street ── */}
      <section className="border-t-4 border-ink bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part I
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Financial Industry
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The FIRE sector — finance, insurance, and real estate — spent $636.4 million on
            federal lobbying in 2024 and $711 million in 2025. Securities and investment firms
            alone accounted for $195 million, a 26% increase in a single year. JPMorgan led
            individual corporate spenders at $8.05 million, followed by Goldman Sachs at
            $4.69 million. These numbers represent only registered lobbying; they do not include
            campaign contributions, dark money, or the personal political spending of executives
            like Kenneth Griffin, who spent $100 million in 2024 alone and more than $250 million
            over his career.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The financial sector&apos;s lobbying machine does not operate in bursts. It is permanent
            infrastructure. In the decade before the 2008 financial crisis, the industry spent
            $2.7 billion on lobbying and over $1 billion in campaign contributions. Companies
            that received $295 billion in TARP bailout funds had collectively spent $114 million
            on lobbying in the years prior. The investment in political influence paid for itself
            many times over — first in the deregulation that enabled the crisis, then in the
            bailout that cushioned its consequences.
          </p>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Dodd-Frank: The Template
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Dodd-Frank Act of 2010 was supposed to prevent the next crisis. The financial
            industry treated it as a lobbying opportunity. During the legislative fight, banks
            deployed 3,000 lobbyists — six for every member of Congress — and spent $27.3 million
            in just three months. When the bill passed anyway, the industry simply shifted its
            spending to the rulemaking process. In the three years after passage, annual lobbying
            exceeded the pre-passage totals: $55 million, then $61 million, then $61 million
            again. The lesson was clear: if you cannot kill a law, you can gut its implementation.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The strategy bore fruit in 2018, when $400 million in cumulative lobbying secured a
            rollback that raised the &ldquo;too-big-to-fail&rdquo; threshold from $50 billion to
            $250 billion in assets. Among the most aggressive advocates was Greg Becker, CEO of
            Silicon Valley Bank, who personally lobbied for the higher threshold. Five years later,
            SVB collapsed — the second-largest bank failure in American history — at exactly the
            asset level that would have kept it under enhanced federal supervision had the
            threshold not been raised.
          </p>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The CFPB Assault
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Consumer Financial Protection Bureau was created by Dodd-Frank to serve as a
            watchdog for ordinary Americans against predatory financial practices. The industry
            targeted it immediately. The U.S. Chamber of Commerce spent $30 million campaigning
            to restructure the agency. When Mick Mulvaney was appointed acting director in 2017,
            he requested a $0 budget from Congress — literally asking for no money to operate the
            agency he led. In February 2025, OMB Director Russell Vought ordered the CFPB to
            cease all supervisory work entirely. The estimated cost to consumers of the weakened
            oversight exceeds $15 billion.
          </p>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Crypto: The New Money
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The cryptocurrency industry has replicated Wall Street&apos;s playbook at unprecedented
            speed. Lobbying spending increased 1,386% in six years — from $2.72 million in 2017
            to $40.42 million in 2023. But lobbying was only the beginning. Fairshake, the
            industry&apos;s Super PAC, raised $195 million for the 2024 cycle and achieved a 91% win
            rate, accounting for nearly half of all corporate political dollars spent that year.
            The PAC specifically targeted progressive members who had called for stronger crypto
            regulation: Katie Porter in California, Jamaal Bowman in New York, and Cori Bush in
            Missouri. All three lost.
          </p>

          {/* Wall Street stat grid */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-accent">$711M</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                FIRE Lobbying (2025)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">$195M</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Fairshake PAC (2024)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-out">$15B+</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                CFPB Gutting Cost
              </div>
            </div>
          </div>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The Revolving Door and Private Equity
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The SEC&apos;s revolving door is among the most active in government. A total of 419
            former employees filed 1,949 post-employment disclosure statements — and academic
            research has documented that regulators are 44.7% less likely to bring enforcement
            actions against banks that maintain active lobbying operations. The message to
            would-be enforcers is unmistakable: these companies will be your future employers.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Private equity has leveraged this dynamic to protect its most lucrative advantage.
            The industry spent $625 million on political influence in 2020 alone, primarily
            to preserve the carried interest loophole — a tax provision that allows fund managers
            to pay capital gains rates on what is effectively labor income, saving the industry
            an estimated $2 billion per year. When the Inflation Reduction Act threatened to
            close the loophole, Senator Kyrsten Sinema — who had received $500,000 from
            private equity donors — demanded its removal from the bill. The $14 billion closure
            provision was stripped. The loophole remains.
          </p>
        </div>
      </section>

      {/* ── Scrollytelling section ── */}
      <ScrollytellSection
        headline="The Money Loop"
        subhead="Six steps reveal how profits become lobbying, lobbying blocks reform, and blocked reform protects profits — in both Wall Street and healthcare."
        steps={SCROLLYTELL_STEPS}
        bgColor="bg-ink"
        textColor="text-white"
      />

      {/* ── Pull quote ── */}
      <section className="border-y-4 border-ink bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
          <blockquote className="text-center">
            <p className="font-headline text-3xl font-black leading-tight tracking-tight text-ink lg:text-4xl">
              &ldquo;The spending after Dodd-Frank passed exceeded the spending
              to block it. The industry learned: if you can&apos;t kill a law,
              you can gut its implementation.&rdquo;
            </p>
            <cite className="mt-6 block font-mono text-sm font-bold uppercase tracking-widest text-muted">
              Daonra Analysis, Senate Lobbying Disclosures 2009-2013
            </cite>
          </blockquote>
        </div>
      </section>

      {/* ── Part II: Healthcare ── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part II
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Healthcare Beyond Pharma
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The pharmaceutical industry gets the headlines, but it is only one piece of the
            health sector&apos;s political machine. The broader healthcare industry — insurers,
            hospitals, managed care organizations, and pharmacy benefit managers — is the
            single largest lobbying sector in the United States. In 2025, total health sector
            lobbying hit $868 million, a record driven by the fight over proposed Medicaid cuts.
            More than 1,834 registered lobbyists worked the sector that year.
          </p>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The Insurance Machine
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Health insurers have built one of the most sophisticated influence operations in
            Washington. Blue Cross Blue Shield spent $27.15 million on lobbying and deployed
            100 lobbyists focused specifically on Medicare Advantage. AHIP, the insurance
            industry trade group, spent a record $13.06 million — and that figure does not
            include the $86.2 million AHIP secretly funneled to the U.S. Chamber of Commerce
            to fund anti-Affordable Care Act advertising campaigns. UnitedHealth Group spent
            $9.93 million in registered lobbying while posting billions in quarterly profit.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The hospital lobby matches the insurers in scale if not sophistication. The American
            Hospital Association spent $29 million in 2024 and $32 million in 2025. The
            Federation of American Hospitals, which represents for-profit hospital chains,
            illustrates the revolving door in miniature: 19 of its 23 registered lobbyists
            previously held government positions.
          </p>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Medicare Advantage: The $600 Billion Overcharge
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Medicare Advantage is the crown jewel of healthcare industry capture. Private
            insurers receive per-enrollee payments from the federal government to manage care
            for Medicare beneficiaries — and they have systematically inflated those payments
            through a practice known as upcoding, in which patients are diagnosed with more
            severe conditions than they actually have. Since 2003, overpayments have exceeded
            $600 billion. Projections show they will surpass $1 trillion over the next decade.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            To protect this revenue stream, the industry deployed more than 220 lobbyists
            focused on Medicare Advantage policy. UnitedHealth alone received an estimated
            $8.7 billion in excess payments. The Better Medicare Alliance — an industry-funded
            advocacy group — spent over $13.5 million on advertising campaigns promoting
            Medicare Advantage to seniors and lawmakers. The message is always the same:
            beneficiaries love the program. The overpayments are never mentioned.
          </p>

          {/* Healthcare stat grid */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-accent">$868M</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Health Lobbying (2025)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">$600B+</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                MA Overpayments
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-out">91%</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Fairshake Win Rate
              </div>
            </div>
          </div>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            PBMs, Dark Money, and Surprise Billing
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Pharmacy benefit managers — the middlemen who negotiate drug prices between
            manufacturers and insurers — have become one of the most concentrated and opaque
            forces in healthcare. The three largest PBMs control 80% of the market. PCMA, their
            trade group, doubled its lobbying to $17.5-18 million as the Federal Trade Commission
            brought suit against all three for inflating insulin prices. The FTC&apos;s complaint
            alleges that PBMs systematically steered patients toward higher-cost insulin products
            to increase their own rebate revenue.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            When Congress moved to ban surprise medical billing — the practice of charging
            patients out-of-network rates for emergency care — the private equity firms that
            own physician staffing companies deployed more than $100 million in dark money to
            weaken the legislation. A front group called Doctor Patient Unity spent $54 million
            on advertising without disclosing that its sole funders were TeamHealth and Envision
            Healthcare, two PE-owned staffing firms that profited directly from the billing
            practices the law targeted. The No Surprises Act eventually passed, but the
            arbitration mechanism was designed to favor providers over patients.
          </p>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            UnitedHealth: Case Study in Scale
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            No company better illustrates the scale of healthcare industry power than
            UnitedHealth Group. In December 2024, the killing of its insurance unit CEO
            became a cultural flashpoint — a reflection of public fury at an industry that
            denies claims, inflates costs, and spends billions on political influence. By 2025,
            the Department of Justice had opened both criminal and civil investigations into the
            company. UnitedHealth posted $2.3 billion in Q3 2025 profit — down from $6.1 billion
            in the prior year, reflecting legal costs and increased regulatory scrutiny.
          </p>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The Healthcare Revolving Door
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The revolving door in healthcare is not a side effect. It is the mechanism. At CMS —
            the agency that administers Medicare and Medicaid, overseeing more than $1.5 trillion
            in annual spending — 53% of departing officials leave for positions in the health
            industry. Twenty-four of fifty state insurance commissioners came from the industry
            they were appointed to regulate. The estimated consumer cost of this structural
            capture is $27 billion per year in overpayments, denied claims, and unenforced
            regulations.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Medicaid managed care — the outsourcing of state Medicaid programs to private
            insurers — represents the latest frontier. The program now exceeds $880 billion,
            with managed care organizations handling 52% of enrollment. Centene, the largest
            Medicaid MCO, has spent $26.9 million on political activity while settling
            overbilling claims in more than thirteen states for a cumulative total exceeding
            $1 billion. The company pays the settlements, increases its political spending,
            and continues to win new state contracts.
          </p>
        </div>
      </section>

      {/* ── Key Players ── */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Key Players
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Influence Network
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            The corporations, executives, and trade groups driving a combined $1.58 billion
            lobbying machine across finance and healthcare.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

      {/* ── Combined stat banner ── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border md:grid-cols-4">
          {[
            { value: "$711M", label: "FIRE Lobbying (2025)" },
            { value: "$868M", label: "Health Lobbying (2025)" },
            { value: "$600B+", label: "MA Overpayments" },
            { value: "44.7%", label: "Enforcement Reduction" },
          ].map((item) => (
            <div key={item.label} className="bg-surface p-6 text-center lg:p-8">
              <div className="font-headline text-3xl font-black text-ink lg:text-4xl">
                {item.value}
              </div>
              <div className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Methodology note ── */}
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
              All figures in this chapter are derived from publicly available data. Lobbying
              expenditure data comes from the Senate Lobbying Disclosure Act database and
              OpenSecrets.org. Medicare Advantage overpayment estimates reference MedPAC
              reports, CBO analyses, and peer-reviewed research published in health economics
              journals. Campaign finance data is sourced from the Federal Election Commission
              (FEC.gov). Revolving-door statistics are drawn from the Government Accountability
              Office, the Project on Government Oversight, and SEC post-employment disclosure
              filings. PBM market share and FTC enforcement data reference the FTC&apos;s 2024
              interim staff report. Centene settlement figures are aggregated from state
              attorney general press releases. All numbers are illustrative aggregates for
              editorial purposes and should be verified against primary sources for citation.
            </p>
          </div>
        </div>
      </section>

      {/* ── Chapter navigation ── */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
          <div className="grid grid-cols-2 gap-6">
            <Link
              href="/guide/industry-capture"
              className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <ArrowLeft className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-ink" />
              <div className="min-w-0">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Previous Chapter
                </div>
                <div className="mt-1 font-headline text-base font-bold text-ink lg:text-lg">
                  Chapter 2: Industry Capture
                </div>
              </div>
            </Link>
            <Link
              href="/guide/congress-inc"
              className="group flex items-center justify-end gap-4 rounded-xl border border-border bg-surface p-6 text-right transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <div className="min-w-0">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Next Chapter
                </div>
                <div className="mt-1 font-headline text-base font-bold text-ink lg:text-lg">
                  Chapter 4: Congress Inc.
                </div>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-ink" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA footer ── */}
      <section className="border-t-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center lg:px-8">
          <TrendingUp className="mx-auto h-10 w-10 text-accent-light" />
          <h2 className="mt-6 font-headline text-3xl font-black tracking-tight lg:text-4xl">
            Follow the Money
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/60">
            Explore the interactive money flow diagram to trace financial and healthcare
            lobbying dollars from corporate treasury to Capitol Hill and back.
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
              href="/guide"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10"
            >
              All Chapters
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
