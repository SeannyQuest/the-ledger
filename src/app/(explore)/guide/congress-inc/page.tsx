import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  Briefcase,
  Users,
  FileText,
  BarChart3,
  ShieldAlert,
  Landmark,
  RefreshCw,
} from "lucide-react";
import { ScrollytellSection } from "@/components/stories/ScrollytellSection";
import type { ScrollytellStep } from "@/components/stories/ScrollytellSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Congress Inc. — Chapter 4 | The Field Guide to American Corruption — The Ledger",
  description:
    "Members of Congress trade stocks on insider information, leave office to become lobbyists, and operate in a system where organized labor is outspent 16 to 1. Chapter 4 of The Field Guide to American Corruption.",
};

/* ------------------------------------------------------------------ */
/*  Scrollytell Steps — lifecycle of a member of Congress              */
/* ------------------------------------------------------------------ */

const SCROLLYTELL_STEPS: ScrollytellStep[] = [
  {
    id: "fundraise",
    title: "The Fundraising Machine",
    body: "Before a single vote is cast, a congressional candidate must build a war chest. The average winning House campaign costs $2.8 million; a Senate seat averages $14.5 million. Members spend 30 to 70 percent of their working hours dialing donors. The money comes from industry PACs, individual mega-donors, and leadership PAC transfers. The fundraising never stops\u00a0\u2014\u00a0and it shapes every decision that follows.",
    stat: {
      value: "$14.5M",
      label: "Average Cost of a Senate Seat",
      color: "money-out",
    },
    highlightColor: "#c41d1d",
  },
  {
    id: "committees",
    title: "The Committee Assignment",
    body: "Once in office, members jockey for committee assignments that determine both legislative power and fundraising potential. A seat on Financial Services, Energy and Commerce, or Armed Services opens direct lines to the wealthiest industries in America. Committee members receive classified briefings, preview unreleased economic data, and negotiate legislation that moves markets\u00a0\u2014\u00a0all while trading the stocks of companies they oversee.",
    stat: {
      value: "95%",
      label: "Of Congress Owns Stocks",
      color: "accent",
    },
    highlightColor: "#d97706",
  },
  {
    id: "trading",
    title: "The Insider Trades",
    body: "In 2024 alone, Representative Josh Gottheimer executed 526 individual stock trades with a combined volume of roughly $91 million while sitting on the Financial Services Committee. He was not an outlier\u00a0\u2014\u00a0dozens of members trade hundreds of times per year in the sectors they regulate. Democrats averaged 31% returns, Republicans 26%, both beating the S&P 500\u2019s 24.9%. Congressional leaders outperform rank-and-file members by up to 47% per year.",
    stat: {
      value: "526",
      label: "Trades by Top Trader (2024)",
      color: "money-in",
    },
    highlightColor: "#1a7a3a",
  },
  {
    id: "penalty",
    title: "The Toothless Penalty",
    body: "The STOCK Act of 2012 was supposed to end it. The penalty for late disclosure: $200\u00a0\u2014\u00a0which members can request to have waived. Senator Tommy Tuberville racked up 132 violations while trading defense stocks on the Armed Services Committee. Total referrals, investigations, and criminal charges in the history of the STOCK Act: zero. Both parties have proposed trading bans. None have passed.",
    stat: {
      value: "$200",
      label: "Maximum STOCK Act Fine",
      color: "accent",
    },
    highlightColor: "#d97706",
  },
  {
    id: "revolving-door",
    title: "The Exit to K Street",
    body: "When members leave Congress, the real payday begins. In the 1970s, about 25% became lobbyists. By 2012, that number hit 50\u201360%. A 2019 Public Citizen study found 65% of departing members walk through the revolving door. They exploit former colleagues, committee relationships, and policy expertise\u00a0\u2014\u00a0bypassing the nominal cooling-off period through \u201Cstrategic consulting\u201D that looks like lobbying in all but legal definition.",
    stat: {
      value: "65%",
      label: "Of Congress Become Lobbyists",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
  {
    id: "influence",
    title: "The Return of Influence",
    body: "The former member, now a lobbyist, walks back into the Capitol building\u00a0\u2014\u00a0literally. Former members retain floor privileges, gym access, and the personal relationships that make lobbying effective. Their revenue is directly tied to their former boss\u2019s committee: when a former chair loses an election, lobbying income from that sector drops measurably. The cycle is closed. The institution serves its alumni, and its alumni serve the industries that pay them.",
    stat: {
      value: "16:1",
      label: "Business vs. Labor Spending",
      color: "money-out",
    },
    highlightColor: "#c41d1d",
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function CongressIncPage() {
  return (
    <article>
      {/* ============================================================ */}
      {/* Hero Header                                                   */}
      {/* ============================================================ */}
      <header className="relative border-b-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-24 lg:px-8 lg:py-32">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
            The Field Guide &middot; Chapter 4
          </div>

          <h1 className="mt-6 font-headline text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl xl:text-8xl">
            Congress Inc.
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70 lg:text-2xl">
            Members of Congress trade stocks on insider information, leave
            office to become lobbyists, and operate in a system where{" "}
            <span className="font-semibold text-white">
              organized labor is outspent 16 to 1
            </span>
            .
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/50">
            <span>Congressional stock trading</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>The revolving door</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>Union political spending</span>
          </div>

          <p className="mt-10 max-w-xl text-base leading-relaxed text-white/50">
            Every number in this chapter is sourced from Senate and House
            financial disclosures, STOCK Act violation records, Public Citizen
            reports, OpenSecrets data, Bureau of Labor Statistics findings, and
            peer-reviewed political science research.
          </p>
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

      {/* ============================================================ */}
      {/* Lead Paragraph                                                */}
      {/* ============================================================ */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <p className="drop-cap text-xl leading-relaxed text-ink/80 lg:text-2xl lg:leading-relaxed">
            The United States Congress is, by any honest accounting, a
            full-service financial institution. Its members trade stocks with
            the benefit of classified briefings, leave office to sell their
            access to the highest bidder, and preside over a political economy
            in which business outspends labor by a ratio of sixteen to one. The
            STOCK Act was supposed to fix the trading. Cooling-off periods were
            supposed to close the revolving door. Neither has worked. The system
            is not broken&nbsp;&mdash;&nbsp;it is functioning exactly as its
            beneficiaries designed it.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            This chapter traces three interlocking dimensions of congressional
            self-dealing: the insider stock trades that make members richer than
            the markets they regulate, the revolving door that converts public
            service into private lobbying careers, and the structural imbalance
            that ensures organized labor can never match the political spending
            of the industries it opposes.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The data is public. The pattern is undeniable. And the
            consequences&nbsp;&mdash;&nbsp;for everyone outside the
            Capitol&nbsp;&mdash;&nbsp;are measured in trillions.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Scrollytelling Section                                        */}
      {/* ============================================================ */}
      <ScrollytellSection
        headline="The Lifecycle of a Member of Congress"
        subhead="From fundraising to K Street: six steps show how public office becomes a private wealth engine."
        steps={SCROLLYTELL_STEPS}
        bgColor="bg-ink"
        textColor="text-white"
      />

      {/* ============================================================ */}
      {/* Pull Quote                                                    */}
      {/* ============================================================ */}
      <section className="border-y-4 border-ink bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
          <blockquote className="text-center">
            <p className="font-headline text-3xl font-black leading-tight tracking-tight text-ink lg:text-4xl">
              &ldquo;The STOCK Act&apos;s maximum penalty is $200. Senator
              Tuberville accumulated 132 violations. Total criminal charges in
              the law&apos;s history: zero.&rdquo;
            </p>
            <cite className="mt-6 block font-mono text-sm font-bold uppercase tracking-widest text-muted">
              STOCK Act Enforcement Record, 2012&ndash;2025
            </cite>
          </blockquote>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 1: Congressional Stock Trading                        */}
      {/* ============================================================ */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part I
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Trading on Tomorrow&apos;s News
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Ninety-five percent of Congress owns individual stocks. This is not,
            in itself, unusual&nbsp;&mdash;&nbsp;but Congress is not a usual
            workplace. Members sit on committees that oversee the industries
            they invest in. They receive classified national security briefings,
            preview unreleased economic data, and negotiate legislation that
            will reshape entire sectors before the public hears a word about it.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            In 2024, Representative Josh Gottheimer of New Jersey was the most
            active congressional trader: 526 trades totaling roughly $91 million
            in volume, all while sitting on the Financial Services
            Committee&nbsp;&mdash;&nbsp;the body that writes the rules for the
            banks and asset managers he was trading. Across the aisle and across
            the chamber, the pattern repeats. Democrats averaged returns of 31%,
            Republicans 26%, against the S&amp;P 500&apos;s 24.9%. Congressional
            leaders&nbsp;&mdash;&nbsp;Speakers, Majority Leaders, committee
            chairs&nbsp;&mdash;&nbsp;outperformed rank-and-file members by as
            much as 47% per year.
          </p>

          {/* Stat grid — trading */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-4">
            <div>
              <div className="font-headline text-4xl font-black text-money-in">
                526
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Trades (Top Trader, 2024)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                $91M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Volume (Gottheimer)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                47%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Leader Outperformance
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-in">
                31%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Dem Avg. Return
              </div>
            </div>
          </div>

          <h3 className="mt-12 font-headline text-2xl font-bold text-ink">
            The Pelosi Playbook
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">
            No name is more synonymous with congressional trading than Pelosi.
            In late 2022, then-Speaker Nancy Pelosi&apos;s husband purchased
            approximately $1.8 million in NVIDIA call options. Weeks later,
            Congress began advancing the CHIPS and Science
            Act&nbsp;&mdash;&nbsp; legislation that would funnel $52 billion in
            subsidies to semiconductor manufacturers. NVIDIA&apos;s stock
            surged. After a stock split, the position represented roughly 50,000
            shares and gains exceeding $5 million. Pelosi&apos;s office
            maintained the trades were made independently. The timing, as
            always, spoke for itself.
          </p>

          <h3 className="mt-12 font-headline text-2xl font-bold text-ink">
            The Tuberville Standard
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">
            Senator Tommy Tuberville of Alabama sits on the Armed Services
            Committee, where he receives classified briefings on military
            operations, defense procurement, and national security threats. He
            also accumulated 132 separate STOCK Act
            violations&nbsp;&mdash;&nbsp; late or missing disclosures of trades
            in defense contractors and other stocks directly relevant to his
            committee work. The penalty for each violation: $200, waivable upon
            request. Total referrals to the Department of Justice: zero. Total
            investigations opened: zero. Total criminal charges in the entire
            history of the STOCK Act: zero.
          </p>

          {/* Stat grid — enforcement */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                132
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Tuberville Violations
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                $200
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Maximum Fine
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-in">
                0
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Members Ever Charged
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            Both parties have introduced legislation to ban congressional stock
            trading&nbsp;&mdash;&nbsp;the TRUST in Congress Act, the Ban
            Congressional Stock Trading Act, and similar proposals appear in
            every recent session. None have reached a floor vote. The system
            works exactly as designed: for the people inside it.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 2: The Revolving Door                                 */}
      {/* ============================================================ */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part II
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Revolving Door
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            For most of the twentieth century, leaving Congress meant returning
            to a law practice, a business, or a home district. That changed. In
            the 1970s, roughly 25% of departing members became lobbyists. By
            2012, the rate had doubled to 50&ndash;60%. A 2019 study by Public
            Citizen found that 65% of members who left Congress walked straight
            through the revolving door into lobbying or &ldquo;strategic
            consulting&rdquo;&nbsp;&mdash;&nbsp;the latter a euphemism for
            shadow lobbying that skirts registration requirements.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The economics are straightforward. A former committee chair&apos;s
            lobbying revenue is directly tied to their former committee&apos;s
            jurisdiction. When that former boss loses an election or the
            committee changes hands, lobbying income from the affected sector
            drops measurably. Access is the product, and it has a shelf life.
          </p>

          {/* Revolving door stat grid */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-4">
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                25%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Became Lobbyists (1970s)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-out">
                65%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Became Lobbyists (2019)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                53%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                CMS Exit Rate to Industry
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                38%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Insurance Comm. to Industry
              </div>
            </div>
          </div>

          <h3 className="mt-12 font-headline text-2xl font-bold text-ink">
            The Case Studies
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">
            The revolving door isn&apos;t abstract. It has names and salary
            figures. Billy Tauzin chaired the House Energy and Commerce
            Committee, helped pass the Medicare Modernization Act that
            prohibited the government from negotiating drug prices, then left
            Congress to become president of PhRMA&nbsp;&mdash;&nbsp;the
            pharmaceutical industry&apos;s top lobbying group&nbsp;&mdash;&nbsp;
            at more than $2 million per year.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Mary Jo White moved from the law firm Debevoise &amp; Plimpton to
            chair the SEC, then returned to Debevoise. Thomas Scully went from
            the Federation of American Hospitals to running the Centers for
            Medicare &amp; Medicaid Services, then to a private equity firm.
            Marilyn Tavenner traveled from HCA (the nation&apos;s largest
            for-profit hospital chain) to CMS administrator, then to CEO of AHIP
            (the insurance industry lobby), then to LifePoint&apos;s board at
            $300,000 per year.
          </p>

          <h3 className="mt-12 font-headline text-2xl font-bold text-ink">
            The Regulators Follow the Same Path
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">
            It isn&apos;t just Congress. A study of SEC employees found that 419
            former staffers filed 1,949 &ldquo;post-employment&rdquo;
            disclosures to represent clients before their former agency.
            Twenty-one filed within one week of departure. Two filed after just
            two days. The cooling-off period is a legal fiction: former
            regulators simply classify their work as &ldquo;strategic
            advice&rdquo; rather than direct lobbying, and the revolving door
            spins unimpeded.
          </p>

          {/* SEC / CMS stat callout */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                419
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Former SEC Staff Filing Disclosures
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                1,949
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Post-Employment Disclosures
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-out">
                2 days
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Fastest Return to Lobbying
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Pull quote — revolving door                                   */}
      {/* ============================================================ */}
      <section className="border-y-4 border-ink bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
          <blockquote className="text-center">
            <p className="font-headline text-3xl font-black leading-tight tracking-tight text-ink lg:text-4xl">
              &ldquo;In the 1970s, 25% of departing members became lobbyists.
              Today, 65% do. The cooling-off period is bypassed through
              &lsquo;strategic consulting&rsquo;&nbsp;&mdash;&nbsp;shadow
              lobbying in all but name.&rdquo;
            </p>
            <cite className="mt-6 block font-mono text-sm font-bold uppercase tracking-widest text-muted">
              Public Citizen, Revolving Door Study (2019)
            </cite>
          </blockquote>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 3: Union Political Spending                           */}
      {/* ============================================================ */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part III
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Counterweight That Isn&apos;t
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Organized labor is often cited as the counterbalance to corporate
            political spending. The numbers tell a different story. In 2022, the
            four largest public-sector and service unions&nbsp;&mdash;&nbsp;the
            National Education Association, the American Federation of Teachers,
            AFSCME, and SEIU&nbsp;&mdash;&nbsp;spent a combined $708.8 million
            on political activities. That sounds enormous until you compare it
            to the other side of the ledger: business outspends labor 16 to 1 in
            total political expenditures, and 7 to 1 in PAC contributions alone.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Union money flows almost exclusively to Democrats. Government unions
            direct 95.7% of contributions to Democratic candidates. The broader
            labor movement sends 90&ndash;95% to the same party. This
            concentration creates a structural dependency: Democrats rely on
            union volunteers, endorsements, and turnout operations, while
            Republicans have little incentive to protect labor rights.
          </p>

          {/* Union spending stat grid */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-4">
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                $708.8M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Big Four Union Spending (2022)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                16:1
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Business vs. Labor (Total)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-out">
                7:1
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Business vs. Labor (PAC)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-in">
                95.7%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Gov. Unions to Democrats
              </div>
            </div>
          </div>

          <h3 className="mt-12 font-headline text-2xl font-bold text-ink">
            Citizens United Hit Labor Harder
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">
            The 2010 <em>Citizens United</em> decision is often described as
            affecting corporations and unions equally. In practice, the impact
            was asymmetric. The corporate sector&nbsp;&mdash;&nbsp;with vastly
            more capital and fewer internal approval
            requirements&nbsp;&mdash;&nbsp; gained disproportionately more from
            the deregulation of independent expenditures. Unions, which must
            fund political activities through separate PACs and cannot use dues
            without member authorization, saw a comparatively modest increase in
            spending capacity.
          </p>

          <h3 className="mt-12 font-headline text-2xl font-bold text-ink">
            Janus and the Fight Over Dues
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">
            In 2018, the Supreme Court&apos;s <em>Janus v. AFSCME</em> decision
            ruled that mandatory agency fees for public-sector unions were
            unconstitutional, dealing the labor movement its most significant
            legal blow in a generation. AFSCME alone lost more than 200,000
            fee-paying members. New York&apos;s public-sector unions lost an
            estimated $100 million per year in revenue. Across the country, 26
            states had already enacted right-to-work laws that produced similar
            effects: workers in RTW states earn 3.2% less&nbsp;&mdash;&nbsp;
            roughly $1,670 per year&nbsp;&mdash;&nbsp;than their counterparts in
            states with union security agreements.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            There have been signs of counter-movement. In February 2024,
            Michigan became the first state in roughly 60 years to repeal its
            right-to-work law. And despite the spending disadvantage, academic
            research consistently finds that a union endorsement boosts a
            candidate by 6 to 8 percentage points&nbsp;&mdash;&nbsp;a larger
            effect than campaign contributions alone. In school board races,
            union-endorsed candidates win 60&ndash;71% of the time.
          </p>

          {/* Janus / RTW stat grid */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-4">
            <div>
              <div className="font-headline text-4xl font-black text-money-out">
                200K+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                AFSCME Members Lost (Janus)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                $100M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                NY Union Revenue Lost / Year
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                26
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Right-to-Work States
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-in">
                6&ndash;8 pts
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Union Endorsement Boost
              </div>
            </div>
          </div>

          <h3 className="mt-12 font-headline text-2xl font-bold text-ink">
            The 2024 Fracture
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">
            The 2024 election cycle exposed new fault lines within organized
            labor. SEIU contributed $35.4 million directly and pledged $200
            million for the presidential race. Vice President Harris received
            $54.5 million from union sources. Former President Trump received
            $211,000&nbsp;&mdash;&nbsp;a ratio of roughly 258 to 1.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            But the Teamsters broke ranks in a way that hadn&apos;t happened
            since 1996: they declined to endorse either candidate. Sean
            O&apos;Brien, the Teamsters&apos; president, spoke at the Republican
            National Convention&nbsp;&mdash;&nbsp;an unprecedented act for a
            major union leader. The non-endorsement reflected a deeper tension
            within labor between white-collar public-sector unions that are
            overwhelmingly Democratic and blue-collar private- sector unions
            whose members increasingly vote Republican.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Key Figures Grid                                              */}
      {/* ============================================================ */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Key Figures
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Players in Congress Inc.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Politicians who trade, regulators who defect, and the revolving-door
            veterans who profit from both.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Josh Gottheimer",
                role: "Rep. (D-NJ), Financial Services Committee",
                stat: "526 trades, $91M volume",
                icon: BarChart3,
              },
              {
                name: "Nancy Pelosi",
                role: "Former Speaker of the House",
                stat: "$5M+ NVDA gain",
                icon: Landmark,
              },
              {
                name: "Tommy Tuberville",
                role: "Sen. (R-AL), Armed Services Committee",
                stat: "132 STOCK Act violations",
                icon: ShieldAlert,
              },
              {
                name: "Billy Tauzin",
                role: "Former House E&C Chair",
                stat: "Left for PhRMA at $2M+/yr",
                icon: RefreshCw,
              },
              {
                name: "Marilyn Tavenner",
                role: "HCA \u2192 CMS \u2192 AHIP \u2192 LifePoint",
                stat: "$300K/yr board seat",
                icon: Briefcase,
              },
              {
                name: "Sean O\u2019Brien",
                role: "Teamsters President",
                stat: "Spoke at RNC (unprecedented)",
                icon: Users,
              },
            ].map((player) => {
              const Icon = player.icon;
              return (
                <div
                  key={player.name}
                  className="flex gap-5 rounded-xl border border-border bg-paper p-6 transition-all hover:-translate-y-1 hover:border-ink/30 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface text-ink">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-headline text-lg font-bold text-ink">
                      {player.name}
                    </h3>
                    <div className="mt-0.5 text-sm text-muted">
                      {player.role}
                    </div>
                    <div className="mt-1.5 font-mono text-sm font-bold text-accent">
                      {player.stat}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Methodology Note                                              */}
      {/* ============================================================ */}
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
              Congressional stock trade data is sourced from periodic
              transaction reports filed under the STOCK Act, compiled from the
              Senate and House financial disclosure databases. Outperformance
              figures reference peer-reviewed academic research on congressional
              trading patterns and publicly available analyses of disclosure
              filings. STOCK Act violation counts are drawn from public
              reporting by ethics watchdog organizations and Senate records.
              Revolving-door statistics cite Public Citizen&apos;s 2019 study of
              post-congressional employment and SEC post-employment disclosure
              filings. Union political spending data comes from OpenSecrets and
              FEC filings. <em>Janus</em> impact figures are drawn from AFSCME
              membership reports and state-level revenue analyses. All numbers
              are illustrative aggregates for editorial purposes and should be
              verified against primary sources for citation.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Chapter Navigation                                            */}
      {/* ============================================================ */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Previous */}
            <Link
              href="/guide/wall-street-and-healthcare"
              className="group flex items-center gap-4 rounded-xl border border-border bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <ArrowLeft className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:-translate-x-1" />
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                  Previous &middot; Chapter 3
                </div>
                <div className="mt-1 font-headline text-lg font-bold text-ink">
                  Wall Street &amp; Healthcare
                </div>
              </div>
            </Link>

            {/* Next */}
            <Link
              href="/guide/courts-maps-and-ballots"
              className="group flex items-center justify-end gap-4 rounded-xl border border-border bg-paper p-6 text-right transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                  Next &middot; Chapter 5
                </div>
                <div className="mt-1 font-headline text-lg font-bold text-ink">
                  Courts, Maps &amp; Ballots
                </div>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CTA Footer                                                    */}
      {/* ============================================================ */}
      <section className="border-t-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center lg:px-8">
          <Building2 className="mx-auto h-10 w-10 text-accent-light" />
          <h2 className="mt-6 font-headline text-3xl font-black tracking-tight lg:text-4xl">
            Follow the Money
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/60">
            Explore the full database of congressional stock trades, lobbying
            expenditures, and revolving-door disclosures.
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
              Back to Field Guide
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
