import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  DollarSign,
  TrendingUp,
  FileText,
  EyeOff,
  Users,
  Scale,
  Banknote,
} from "lucide-react";
import { ScrollytellSection } from "@/components/stories/ScrollytellSection";
import type { ScrollytellStep } from "@/components/stories/ScrollytellSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Money Machine | Daonra",
  description:
    "Chapter 1 of The Field Guide to American Corruption. How $5.08 billion in lobbying, $4.3 billion in dark money, and a hollowed-out campaign finance system concentrate power in the donor class.",
};

const SCROLLYTELL_STEPS: ScrollytellStep[] = [
  {
    id: "the-donor",
    title: "The Donor Writes a Check",
    body: "It begins with a check, or, more precisely, a wire transfer. A pharmaceutical executive, a hedge fund manager, or a fossil fuel billionaire decides to influence an election. If they donate directly to a candidate, their name appears in FEC filings. But there is another way. They write a check to a 501(c)(4) nonprofit, a 'social welfare' organization that, under IRS rules, can engage in political activity while keeping its donor list completely secret. The money enters the system. The name does not.",
    stat: {
      value: "$4.3B",
      label: "Dark Money Since Citizens United",
      color: "accent",
    },
    highlightColor: "#d97706",
  },
  {
    id: "the-nonprofit",
    title: "The 501(c)(4) Launders the Source",
    body: "The nonprofit is the washing machine of American politics. Under current law, a 501(c)(4) can devote up to 49.9% of its budget to political activity (attack ads, voter mobilization, issue campaigns) without disclosing a single donor. The remaining 50.1% funds 'social welfare' activities that are often indistinguishable from political messaging. In the 2024 cycle, shell companies and nonprofits funneled $1.3 billion to Super PACs, more than the prior two cycles combined. The IRS, burned by the Tea Party scrutiny scandal, has largely stopped enforcing the rules.",
    stat: {
      value: "$1.3B",
      label: "Shell Company Donations (2024)",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
  {
    id: "the-superpac",
    title: "The Super PAC Deploys the Weapon",
    body: "The money flows from the nonprofit into a Super PAC, a political committee that can raise and spend unlimited sums, as long as it does not 'coordinate' with a candidate. In practice, coordination is a legal fiction. Super PACs are run by former campaign staffers, share consultants with official campaigns, and time their ad buys to complement candidate messaging. Outside spending exploded from $338 million in 2008 to over $4.5 billion in 2024. Timothy Mellon alone gave $150 million to Trump-aligned Super PACs. Fairshake, the crypto industry Super PAC, spent $195 million and won 91% of its races.",
    stat: {
      value: "$4.5B+",
      label: "Outside Spending (2024)",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
  {
    id: "the-attack-ad",
    title: "The Attack Ad Hits the Airwaves",
    body: "The Super PAC buys television time, digital ads, and direct mail. The ads do not say 'paid for by a pharmaceutical executive who wants to kill drug pricing reform.' They say 'paid for by Americans for a Stronger Tomorrow' or 'Citizens for Common Sense.' The voter sees the ad, absorbs the message, and has no way to know who paid for it. In competitive Senate races, outside spending now routinely exceeds the candidates' own fundraising. The candidate becomes secondary to the money behind the curtain.",
    stat: {
      value: "40%",
      label: "Of All Contributions From Top 0.01%",
      color: "accent",
    },
    highlightColor: "#d97706",
  },
  {
    id: "the-election",
    title: "The Election Is Decided",
    body: "The candidate wins. The top 100 donors contributed more than all small donors combined. The winner now holds office knowing exactly who funded their victory, even if the public does not. The FEC, deadlocked 3-3 along partisan lines, cannot investigate coordination. It cannot update disclosure rules. It cannot enforce the laws already on the books. The agency tasked with policing campaign finance has been deliberately broken.",
    stat: {
      value: "3-3",
      label: "FEC Partisan Deadlock",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
  {
    id: "the-payback",
    title: "The Policy Payback",
    body: "The winner takes office and the donors collect. A single lobbying campaign can yield returns of up to 22,000%. The Sunlight Foundation documented corporations spending $1 million on lobbying and receiving $220 million in tax breaks. In 2025, total US lobbying hit a record $5.08 billion, up 11% from the prior year. The pharmaceutical industry alone spent $452 million and deployed 1,834 lobbyists, more than three for every member of Congress. The cycle is complete. The donor writes another check.",
    stat: {
      value: "22,000%",
      label: "Maximum Lobbying ROI",
      color: "money-in",
    },
    highlightColor: "#16a34a",
  },
];

export default function TheMoneyMachinePage() {
  return (
    <article>
      {/* Hero */}
      <header className="relative border-b-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-24 lg:px-8 lg:py-32">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-white/40">
            <Link
              href="/guide"
              className="transition-colors hover:text-accent-light"
            >
              Field Guide
            </Link>
            <span>/</span>
            <span className="text-accent-light">Chapter 1</span>
          </nav>

          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
            Chapter 1 &middot; The Field Guide to American Corruption
          </div>

          <h1 className="mt-6 font-headline text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl xl:text-8xl">
            The Money Machine
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70 lg:text-2xl">
            How lobbying, dark money, Super PACs, and a hollowed-out campaign
            finance system concentrate power in the hands of{" "}
            <span className="font-semibold text-white">the donor class</span>.
          </p>

          <div className="mt-8 flex items-center gap-6 text-sm text-white/50">
            <time dateTime="2026-03-11">March 11, 2026</time>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>18 min read</span>
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
            In 2025, the United States spent more money on lobbying than at any
            point in its history: $5.08 billion, an 11% increase over the prior
            year&apos;s record of $4.4 billion, and part of a roughly $37
            billion stream that has flowed through Washington since 2015. That
            number represents only the money that is disclosed. Alongside it
            runs a parallel river: $4.3 billion in dark money since Citizens
            United, funneled through 501(c)(4) nonprofits and shell companies
            that exist for the sole purpose of hiding who is paying for American
            elections. Together, they form the machinery of a system in which
            policy is purchased, elections are underwritten by a handful of
            billionaires, and the average citizen&apos;s political influence has
            been mathematically demonstrated to approach zero.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            This is not hyperbole. In 2014, political scientists Martin Gilens
            and Benjamin Page published a landmark study analyzing 1,779 policy
            outcomes over two decades. Their conclusion was unambiguous:
            economic elites and organized business groups have substantial
            independent impacts on U.S. government policy, while average
            citizens and mass-based interest groups have little or no
            independent influence. The Money Machine is the infrastructure that
            makes this possible: the lobbying firms, the dark money networks,
            the Super PACs, the mega-donors, and the deliberately broken
            regulators who ensure the system perpetuates itself.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            What follows is a forensic accounting of how money converts into
            power in American democracy. Every dollar figure is sourced from
            federal databases, FEC filings, Senate disclosures, and
            peer-reviewed research. The numbers are precise because the
            corruption is.
          </p>
        </div>
      </section>

      {/* Scrollytelling section */}
      <ScrollytellSection
        headline="Anatomy of the Money Machine"
        subhead="Trace the lifecycle of a political dollar, from donor to nonprofit to Super PAC to attack ad to election to policy payback."
        steps={SCROLLYTELL_STEPS}
        bgColor="bg-ink"
        textColor="text-white"
      />

      {/* Pull quote break */}
      <section className="border-y-4 border-ink bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
          <blockquote className="text-center">
            <p className="font-headline text-3xl font-black leading-tight tracking-tight text-ink lg:text-4xl">
              &ldquo;Economic elites and organized groups representing business
              interests have substantial independent impacts on U.S. government
              policy, while average citizens and mass-based interest groups have
              little or no independent influence.&rdquo;
            </p>
            <cite className="mt-6 block font-mono text-sm font-bold uppercase tracking-widest text-muted">
              Gilens &amp; Page, &ldquo;Testing Theories of American
              Politics,&rdquo; 2014
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Section 1: Lobbying */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Banknote className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Dimension I
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Lobbying Industrial Complex
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The $5.08 billion spent on federal lobbying in 2025 is not an
            anomaly. It is an acceleration. Lobbying spending has increased
            every year for more than a decade, climbing from $3.2 billion in
            2015 to $4.4 billion in 2024 before shattering the record again. The
            money buys access, and access buys outcomes. The pharmaceutical
            industry leads all sectors at $452 million per year, followed by
            insurance at roughly $175 million, technology at approximately $170
            million, oil and gas at around $150 million, and defense contractors
            at $139 million. These are not donations. They are investments, and
            the returns are staggering.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Sunlight Foundation documented lobbying returns on investment as
            high as 22,000%, when a corporation spends $1 million on K Street and
            receives $220 million in favorable legislation, tax carve-outs, or
            regulatory exemptions. The health sector alone employs 1,834
            registered lobbyists, more than three for every member of Congress.
            These are not advocates making their case in a free marketplace of
            ideas. They are professionals deployed in industrial quantities to
            ensure that the industries with the most money have the most
            influence over the laws that govern them.
          </p>

          {/* Inline stat callout grid */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                $5.08B
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Total Lobbying (2025)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-in">
                22,000%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Max Lobbying ROI
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                1,834
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Health Sector Lobbyists
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            The genius of the lobbying system is its legal invisibility.
            Lobbying is protected speech. Disclosure requirements exist but are
            designed to be searched, not read, buried in databases that few
            voters will ever access. The result is a shadow legislature where
            the real negotiations happen in conference rooms on K Street, and
            the votes on Capitol Hill merely ratify decisions that were made
            months earlier over dinners, golf outings, and campaign fundraisers
            that lobbyists organize for the members they are simultaneously
            trying to influence.
          </p>
        </div>
      </section>

      {/* Section 2: Dark Money */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <EyeOff className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Dimension II
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            $4.3 Billion in the Dark
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            Dark money, meaning political spending by organizations that do not
            disclose their donors, reached a record $1.9 billion in the 2024
            election cycle. Since the Citizens United decision in 2010, the
            cumulative total has surpassed $4.3 billion. The architecture is
            elegant in its cynicism. A corporation or wealthy individual donates
            to a 501(c)(4) nonprofit, which the IRS classifies as a
            &ldquo;social welfare&rdquo; organization. Under current rules,
            these nonprofits can devote up to 49.9% of their spending to
            political activity while keeping their entire donor list secret. The
            nonprofit then funnels money to a Super PAC, which buys the ads. The
            public sees the ad. The public does not see the donor.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The 2024 cycle marked an inflection point: shell companies and
            nonprofits gave $1.3 billion to Super PACs, more than the prior two
            cycles combined. These entities are incorporated weeks before an
            election, donate millions from undisclosed sources, and dissolve
            before anyone can investigate. The FEC lacks the resources and, in
            many cases, the legal authority to trace the true origin of the
            funds. The organizations that have mastered this infrastructure read
            like a who&apos;s who of political power: Crossroads GPS, co-founded
            by Karl Rove, has channeled $349 million in undisclosed money.
            Americans for Prosperity, the Koch network&apos;s flagship, has
            deployed $398 million in total political spending. Majority Forward,
            aligned with Senate Democrats, spends roughly $29 million per cycle.
            Dark money is bipartisan. Both sides have built industrial-scale
            machines to hide who is buying American elections.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The DISCLOSE Act, which would require any organization spending
            more than $10,000 on elections to reveal donors giving above that
            threshold, has been introduced in every Congress since 2010. It has
            been filibustered every single time. Polls consistently show that
            75-80% of Americans support mandatory donor disclosure, including
            majorities of both parties. In fifteen years, not a single
            transparency reform has passed at the federal level. The system does
            not merely resist reform. It has been engineered to make reform
            impossible.
          </p>
        </div>
      </section>

      {/* Section 3: Super PACs & Mega-Donors */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Dimension III
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Super PACs &amp; the Mega-Donor Class
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The trajectory of outside spending in American elections tells a
            story of accelerating oligarchy. In 2008, outside groups spent $338
            million on federal elections. By 2012, the first presidential cycle
            after Citizens United, that number had quadrupled to $1.3 billion.
            By 2024, it surpassed $4.5 billion. The growth is not organic.
            is the predictable result of a legal framework that treats political
            spending as protected speech and places no meaningful limits on how
            much a single individual or corporation can spend to influence an
            election, so long as the spending is nominally
            &ldquo;independent.&rdquo;
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The scale of individual donations now defies comprehension. Timothy
            Mellon, heir to the Mellon banking fortune, gave more than $150
            million to Trump-aligned Super PACs in the 2024 cycle alone,
            single individual writing checks larger than the entire campaign
            budgets of most Senate candidates. Fairshake, the cryptocurrency
            industry&apos;s Super PAC, raised $195 million in its first cycle
            and achieved a 91% win rate in the races it targeted. These are not
            contributions in any democratic sense of the word. They are
            investments, and the investors expect returns.
          </p>

          {/* Inline stat callout grid */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                $4.5B+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Outside Spending (2024)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                $150M+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Timothy Mellon (2024)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-in">
                91%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Fairshake Win Rate
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            The FEC, the agency charged with policing campaign finance, has been
            deadlocked 3-3 along partisan lines for over a decade. With three
            Republican and three Democratic commissioners, the agency cannot
            agree on enforcement actions, cannot update regulations, and cannot
            investigate coordination between Super PACs and campaigns. The
            deadlock is not a bug. It is the intended outcome of a confirmation
            process that ensures no party ever has a working majority on the
            commission. The cop on the beat has been handcuffed to a desk.
          </p>
        </div>
      </section>

      {/* Section 4: Citizens United Impact */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Scale className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Dimension IV
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Citizens United Accelerant
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            On January 21, 2010, the Supreme Court ruled 5-4 in Citizens United
            v. FEC that the government could not restrict independent political
            expenditures by corporations, unions, and other associations.
            Justice Anthony Kennedy, writing for the majority, argued that
            &ldquo;independent expenditures, including those made by
            corporations, do not give rise to corruption or the appearance of
            corruption&rdquo; and that transparency requirements would provide
            adequate accountability. Both predictions have been spectacularly
            wrong.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The numbers tell the story with brutal clarity. Outside spending
            went from $338 million in 2008 to $1.3 billion in 2012 to $4.5
            billion in 2024, a thirteen-fold increase in fourteen years. The
            top 0.01% of donors now provide approximately 40% of all political
            contributions. The cost of winning a House seat has climbed to
            roughly $2.5 million; a Senate seat runs $15-30 million; and a
            presidential campaign requires upward of $1 billion. These are not
            numbers that reflect a functioning democracy of equal citizens. They
            are the price tags of a marketplace where political power is the
            commodity.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Polls consistently show that 75-80% of Americans, across party
            lines, support overturning Citizens United. Yet no federal reform
            has passed. Constitutional amendments require a two-thirds vote in
            both chambers and ratification by three-quarters of state
            legislatures. The beneficiaries of the current system are the ones
            who would need to vote to change it. The decision did not just open
            a door to unlimited money in politics. It demolished the wall and
            then made the wall&apos;s reconstruction structurally impossible.
          </p>
        </div>
      </section>

      {/* Section 5: The Donor Class */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Dimension V
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Donor Class
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The people who fund American elections are not representative of the
            people who vote in them. The donor class, the roughly 0.01% of the
            population that provides 40% of all political contributions, is
            overwhelmingly white, overwhelmingly male, and overwhelmingly
            wealthy. They are concentrated in a handful of zip codes in New
            York, San Francisco, Los Angeles, and the suburbs of Washington,
            D.C. Their policy preferences diverge sharply from those of the
            median voter: they are more likely to favor deregulation, lower
            taxes on capital gains, reduced social spending, and trade
            liberalization. When their preferences conflict with the preferences
            of ordinary citizens, the donors win.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Gilens and Page study is the definitive academic treatment of
            this dynamic. After analyzing 1,779 policy outcomes between 1981 and
            2002, the researchers found that when the preferences of economic
            elites diverge from those of the general public, the elites&apos;
            preferred policy outcome is adopted at a vastly higher rate. The
            average citizen&apos;s influence on policy is statistically
            indistinguishable from zero. This is not a conspiracy theory. It is
            a peer-reviewed finding published in{" "}
            <em>Perspectives on Politics</em>, one of the discipline&apos;s
            leading journals, and it has been cited over 7,000 times.
          </p>

          {/* Inline stat callout grid */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                40%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                From Top 0.01% of Donors
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                $1B+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Cost of a Presidency
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-out">
                &asymp;0
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Average Citizen Influence
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            The cost of running for office ensures that the donor class remains
            the gatekeeper. A viable House campaign requires approximately $2.5
            million. A competitive Senate race demands $15-30 million or more.
            Candidates without access to wealthy networks (candidates who look
            like, earn like, and think like the majority of Americans) are
            filtered out before they reach the ballot. The result is a
            legislature that is richer, whiter, and more male than the country
            it governs, elected by a process that structurally privileges the
            preferences of those who can write six- and seven-figure checks.
            This is not a democracy in crisis. It is a democracy that has been
            replaced, dollar by dollar, by something else entirely.
          </p>
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
              All figures in this chapter are derived from publicly available
              data. Lobbying totals are sourced from the Senate Office of Public
              Records via the Lobbying Disclosure Act database and OpenSecrets
              (Center for Responsive Politics) analysis. Dark money and outside
              spending figures reference FEC independent expenditure reports and
              OpenSecrets dark money tracking. The Gilens &amp; Page study was
              published in <em>Perspectives on Politics</em> (2014, Vol. 12, No.
              3). Lobbying ROI analysis is from the Sunlight Foundation. Donor
              class demographics reference research from the Brookings
              Institution and the Campaign Finance Institute. Super PAC
              contribution data is from FEC filings. Shell company tracking uses
              FEC independent expenditure reports and Issue One analysis. All
              aggregated numbers are for editorial context and should be
              verified against primary sources for academic citation.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter navigation */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
          <div className="grid grid-cols-2 gap-6">
            <Link
              href="/guide"
              className="group flex items-center gap-4 rounded-xl border border-border bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <ArrowLeft className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-ink" />
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Previous
                </div>
                <div className="mt-1 font-headline text-lg font-bold text-ink">
                  Table of Contents
                </div>
              </div>
            </Link>
            <Link
              href="/guide/industry-capture"
              className="group flex items-center justify-end gap-4 rounded-xl border border-border bg-paper p-6 text-right transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Next: Chapter 2
                </div>
                <div className="mt-1 font-headline text-lg font-bold text-ink">
                  Industry Capture
                </div>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-ink" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA footer */}
      <section className="border-t-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center lg:px-8">
          <DollarSign className="mx-auto h-10 w-10 text-accent-light" />
          <h2 className="mt-6 font-headline text-3xl font-black tracking-tight lg:text-4xl">
            Follow the Money
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/60">
            Explore the interactive money flow diagram to see how lobbying
            dollars, dark money, and Super PAC spending connect donors to policy
            outcomes.
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
              href="/guide/industry-capture"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Next: Industry Capture
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
