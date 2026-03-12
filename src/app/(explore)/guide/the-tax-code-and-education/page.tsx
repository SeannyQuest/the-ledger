import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  TrendingUp,
  FileText,
  Landmark,
  Building2,
  DollarSign,
  GraduationCap,
  BookOpen,
  Scale,
  Shield,
  Receipt,
  Globe,
  Users,
  Briefcase,
} from "lucide-react";
import { ScrollytellSection } from "@/components/stories/ScrollytellSection";
import type { ScrollytellStep } from "@/components/stories/ScrollytellSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Tax Code & Education — The Ledger",
  description:
    "From the TCJA's $1.5 trillion corporate windfall to the $1.84 trillion student debt crisis, how lobbying dollars write the tax code and reshape American education. Chapter 9 of The Field Guide to American Corruption.",
};

/* ------------------------------------------------------------------ */
/*  Scrollytell — The Tax & Education Pipeline                         */
/* ------------------------------------------------------------------ */

const SCROLLYTELL_STEPS: ScrollytellStep[] = [
  {
    id: "tcja-windfall",
    title: "The $1.5 Trillion Rewrite",
    body: "In Q4 2017, lobbying filings on tax issues surged to 4,673 &mdash; a 56% spike above the quarterly norm. The Business Roundtable quadrupled its spending to $17.3 million in a single quarter. When the Tax Cuts and Jobs Act was signed on December 22, 2017, it slashed the corporate rate from 35% to 21% and added $1.456 trillion to the national debt over a decade. The top 1% received 47.6% of the benefits. The bottom 40% received less than 2%.",
    stat: { value: "$1.5T", label: "Added to the Deficit Over a Decade", color: "#c41d1d" },
    highlightColor: "#c41d1d",
  },
  {
    id: "buybacks-over-workers",
    title: "Buybacks Over Bonuses",
    body: "Corporate America promised the TCJA would unleash investment and worker pay. Instead, S&P 500 companies spent $806 billion on stock buybacks in 2018 &mdash; a 55% jump. By February 2018, companies had spent $171 billion on buybacks versus just $6 billion on worker bonuses. Only 20% of incremental cash went to capital expenditure or R&D. The rest went back to shareholders. Ninety-one Fortune 500 companies paid zero federal income tax that year.",
    stat: { value: "$806B", label: "Stock Buybacks in 2018", color: "#c41d1d" },
    highlightColor: "#c41d1d",
  },
  {
    id: "lobbying-roi",
    title: "The 22,000% Return",
    body: "In 2004, ninety-three firms spent $282.7 million lobbying for a repatriation tax holiday and saved $62.5 billion collectively &mdash; a 22,000% return on investment. Every dollar spent on lobbying returned $220 in tax savings. The Sunlight Foundation found that companies lobbying more on taxes consistently pay lower effective rates. The TCJA proved the formula scales: 47% of all federal lobbyists now work on tax issues.",
    stat: { value: "22,000%", label: "Lobbying ROI on 2004 Tax Holiday", color: "#d97706" },
    highlightColor: "#d97706",
  },
  {
    id: "irs-gutted",
    title: "Defunding the Referee",
    body: "Congress cut the IRS enforcement budget 23% in real terms after 2010. The audit rate for millionaires collapsed 80%. EITC claimants &mdash; the working poor &mdash; became nearly as likely to be audited as the top 1%. When the Inflation Reduction Act invested $80 billion to rebuild enforcement, the CBO projected it would recover $204 billion. Republicans clawed back $41.8 billion within three years, killing the program before it could work.",
    stat: { value: "$41.8B", label: "IRS Funding Clawed Back", color: "#c41d1d" },
    highlightColor: "#c41d1d",
  },
  {
    id: "student-debt",
    title: "The $1.84 Trillion Anchor",
    body: "Student loan debt now stands at $1.84 trillion, owed by 45.8 million Americans. Loan servicers like Navient and MOHELA spent over $50 million lobbying Congress since 2008 to protect their revenue streams. When Biden attempted broad forgiveness, the Supreme Court blocked it in a 6-3 ruling &mdash; with standing based on MOHELA&apos;s potential revenue loss. The servicer industry collected $1.1 billion in DOE payments while borrowers drowned.",
    stat: { value: "$1.84T", label: "Total Student Loan Debt", color: "#c41d1d" },
    highlightColor: "#c41d1d",
  },
  {
    id: "voucher-wave",
    title: "The Privatization Wave",
    body: "In 2021, zero states had universal school voucher programs. By 2025, thirteen did. The American Federation for Children &mdash; founded by Betsy DeVos &mdash; spent $9 million on state elections in 2022, winning 277 of 368 races and defeating 40 incumbents. Jeff Yass contributed $7 million to the AFC Victory Fund alone. In Colorado, pro-voucher forces outspent opponents 158-to-1. The Heritage Foundation authored the blueprint in Project 2025, then its author was hired into the DOE to execute it.",
    stat: { value: "0 → 13", label: "Universal Voucher States (2021-2025)", color: "#d97706" },
    highlightColor: "#d97706",
  },
  {
    id: "doe-dismantled",
    title: "Dismantling From Within",
    body: "The Department of Education lost approximately 1,700 employees &mdash; nearly half its workforce &mdash; under the Trump administration. At least 240 Office for Civil Rights attorneys were laid off. DOGE cut dozens of IES research contracts worth $900 million. Lindsey Burke spent 17 years at the Heritage Foundation writing the chapter calling for the DOE&apos;s elimination, then was hired as Deputy Chief of Staff for Policy and Programs to implement it. The revolving door does not just spin &mdash; it swings open and stays.",
    stat: { value: "~50%", label: "DOE Workforce Cut", color: "#c41d1d" },
    highlightColor: "#c41d1d",
  },
];

/* ------------------------------------------------------------------ */
/*  Key Players                                                       */
/* ------------------------------------------------------------------ */

const KEY_PLAYERS = [
  {
    name: "U.S. Chamber of Commerce",
    stat: "$76.4M lobbying (2024), 99 tax lobbyists",
    description:
      "The single largest lobbying spender in America. Has spent $746 million since 2015. Deployed 99 tax-issue lobbyists in 2024 alone to protect corporate rate cuts and block reform.",
    href: "/entity/corporation/us-chamber-of-commerce",
    icon: Landmark,
  },
  {
    name: "Business Roundtable",
    stat: "$17.3M in Q4 2017 alone",
    description:
      "A CEO coalition of 200+ major corporations that quadrupled its normal lobbying spend to push the TCJA across the finish line. Deployed 68 tax lobbyists in 2024.",
    href: "/entity/corporation/business-roundtable",
    icon: Briefcase,
  },
  {
    name: "Intuit / TurboTax",
    stat: "$93M+ lobbying against free filing",
    description:
      "Spent over two decades and $93 million fighting to prevent free government tax filing. The IRS Direct File program was launched in 2024 and killed in 2025.",
    href: "/entity/corporation/intuit",
    icon: Receipt,
  },
  {
    name: "American Federation for Children",
    stat: "$9M on state elections, 277/368 wins",
    description:
      "Founded by Betsy DeVos. The nation's largest school choice advocacy organization. Passed 200+ school choice laws across 31 states. Jeff Yass is its largest donor at $7 million.",
    href: "/entity/corporation/afc",
    icon: GraduationCap,
  },
  {
    name: "Navient",
    stat: "$1.71M lobbying (2020), top servicer",
    description:
      "The largest student loan company and top industry lobbying spender since 2015. Part of the $50 million industry lobbying effort that has blocked comprehensive reform for over a decade.",
    href: "/entity/corporation/navient",
    icon: DollarSign,
  },
  {
    name: "Walton Family Foundation",
    stat: "$1B+ in education, 1-in-4 charter startups",
    description:
      "Over $1 billion invested in education. Funded one in four charter school startups in the United States. Over $400 million in charter school grants. 840,000 students attend WFF-funded schools.",
    href: "/entity/person/walton-family",
    icon: Building2,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function TheTaxCodeAndEducationPage() {
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
            <span className="text-white/60">Chapter 9</span>
          </nav>

          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
            Chapter 9 &middot; Tax Policy &middot; Education
          </div>

          <h1 className="mt-6 font-headline text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl xl:text-8xl">
            The Tax Code
            <br />
            &amp; Education
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70 lg:text-2xl">
            A $1.5 trillion corporate tax cut written by lobbyists. A $1.84 trillion student debt
            crisis sustained by servicers. Two systems rigged by the same playbook:{" "}
            <span className="font-semibold text-white">spend to write the rules, then profit from
            them</span>.
          </p>

          {/* Key stats row */}
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: "$1.456T", label: "TCJA Deficit Cost" },
              { value: "22,000%", label: "Lobbying ROI" },
              { value: "$1.84T", label: "Student Debt" },
              { value: "0 → 13", label: "Voucher States" },
            ].map((item) => (
              <div key={item.label}>
                <div className="font-headline text-2xl font-black text-accent-light lg:text-3xl">
                  {item.value}
                </div>
                <div className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white/40">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-white/50">
            <time dateTime="2026-03-11">March 11, 2026</time>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>35 min read</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>The Ledger &middot; Field Guide</span>
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
            The American tax code is 6,871 pages long. It is not written by Congress. It is
            written by the 6,107 lobbyists who filed on tax issues in 2024 &mdash; 47% of every
            federal lobbyist in Washington. Their clients spent $4.4 billion on lobbying that
            year, a record, and the return on that investment dwarfs anything on Wall Street:
            22,000% on a single tax holiday. The code they produce is a shadow spending program
            worth $2.2 trillion in annual tax expenditures &mdash; more than Social Security,
            more than Medicare, more than defense. The difference is that no one votes on it,
            no one reviews it annually, and the benefits flow overwhelmingly upward.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            Education operates under the same gravitational pull. The $1.84 trillion student debt
            crisis is not an accident but a product of sustained industry lobbying &mdash; over $50
            million since 2008 from loan servicers alone &mdash; that has blocked every attempt at
            comprehensive reform. The for-profit college sector mounted a $12.5 million lobbying
            surge to kill Obama-era accountability rules, then watched its champion, Betsy DeVos,
            rescind them entirely. School choice advocates backed by the DeVos, Walton, and Koch
            fortunes spent tens of millions to take universal voucher programs from zero states to
            thirteen in four years. The Heritage Foundation wrote the blueprint to dismantle the
            Department of Education in Project 2025, then its author was hired to execute it.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Ledger examined two decades of lobbying disclosures, campaign finance records, IRS
            enforcement data, student loan servicing contracts, and state-level political spending
            across the tax and education sectors. The data comes from OpenSecrets, the Joint
            Committee on Taxation, the Congressional Budget Office, the Institute on Taxation and
            Economic Policy, the Government Accountability Office, ProPublica, and federal court
            filings. Every dollar figure in this chapter is sourced to a public record.
          </p>
        </div>
      </section>

      {/* ── Part I: The Tax Code ── */}
      <section className="border-t-4 border-ink bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part I
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Tax Code
          </h2>

          {/* TCJA */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The Tax Cuts and Jobs Act: Anatomy of a Lobbying Victory
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Tax Cuts and Jobs Act, signed December 22, 2017, was the largest overhaul of the
            U.S. tax code in thirty years. Its centerpiece &mdash; slashing the corporate rate from
            35% to 21% &mdash; was the product of the most intense corporate lobbying campaign in
            modern history. In a typical quarter, approximately 3,000 lobbying filings mention
            taxation. In Q4 2017, that number surged to 4,673. The Business Roundtable, a coalition
            of 200 CEOs from the largest American corporations, spent $17.3 million in that single
            quarter &mdash; nearly quadruple its prior spending. The U.S. Chamber of Commerce, the
            National Association of Realtors, and the Business Roundtable combined to spend more than
            $56 million in Q4 2017 alone. Even the Beer Institute increased its lobbying budget by
            $390,000 to $1.3 million in that quarter, fighting for an excise tax cut.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Joint Committee on Taxation estimated the law would add $1.456 trillion to annual
            deficits over a decade. The Congressional Budget Office put the figure at $1.5 trillion
            over the 2018&ndash;2027 budget window. The corporate rate cut alone was projected to
            reduce federal revenues by $919 billion over the same period. And the benefits were
            distributed precisely as the lobbying investment predicted: 47.6% to 62.6% of total
            benefits went to the top 1%, depending on the analytical model used. The top 0.1% of
            households received an average tax cut of $193,380. The middle 20% received $930. The
            bottom 40% received less than 2% of total benefits &mdash; a gap of roughly $60,000
            versus $500 between the top 1% and the bottom 60%.
          </p>

          {/* TCJA stat grid */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-money-out">35% → 21%</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Corporate Rate Cut
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">4,673</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Tax Lobbying Filings Q4 2017
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-accent">$193K</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Avg. Tax Cut, Top 0.1%
              </div>
            </div>
          </div>

          {/* Stock Buybacks */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Stock Buybacks: Where the Money Actually Went
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The TCJA&apos;s proponents promised a tidal wave of business investment, wage growth, and
            job creation. The data told a different story. In 2018, S&amp;P 500 companies executed
            $806 billion in stock buybacks &mdash; a 55% increase over 2017. Across all public
            companies, buybacks approached $1 trillion. The fifteen largest corporate cash holders
            tripled their buyback spending from $86 billion in 2017 to $231 billion in 2018. By
            February 2018 &mdash; barely two months after the law was signed &mdash; companies had
            announced $171 billion in buybacks versus just $6 billion in worker bonuses. For every
            dollar that went to employees, twenty-eight dollars went to shareholders.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Only about 20% of the incremental cash flowing from the tax cut went to capital
            expenditure or research and development. The rest went to buybacks, dividends, and
            executive compensation. The pattern was not accidental. It was predictable. Academic
            research had demonstrated after the 2004 repatriation holiday that companies
            overwhelmingly return windfall tax savings to shareholders rather than investing in
            productive capacity. The TCJA was the same experiment at ten times the scale, and it
            produced the same result.
          </p>

          {/* Corporate Zero-Tax */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The Companies That Pay Nothing
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Despite a statutory corporate tax rate of 21%, hundreds of major corporations pay far
            less &mdash; or nothing at all. In 2018, ninety-one profitable Fortune 500 companies
            paid zero federal income tax on their combined profits. The list included Amazon,
            Chevron, Halliburton, and IBM. In 2020, fifty-five profitable corporations paid $0 on
            $40 billion in combined pretax income &mdash; income that would have generated $8.5
            billion at the statutory rate. Instead, those companies received $3.5 billion in tax
            rebates, draining a net $12 billion from the Treasury. Twenty-six companies sustained
            a zero effective rate across the entire three-year period from 2018 to 2020.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The individual cases are instructive. FedEx earned $1.2 billion in pretax income in
            2020 and paid nothing; it received a $230 million rebate. Nike earned $2.9 billion and
            paid nothing; it received $109 million. Duke Energy reported $7.9 billion in pretax
            income across three years and paid nothing on balance. Salesforce earned $2.7 billion
            in 2021 and paid zero. AT&amp;T and Charter Communications each earned more than $1
            billion in 2021 and paid zero. The average effective rate for 379 profitable Fortune 500
            companies in 2018 was 11.3% &mdash; slightly more than half the 21% statutory rate. For
            the period 2018&ndash;2021, 95 companies averaged an effective rate below 10%, up from
            56 companies in the pre-TCJA period of 2013&ndash;2016. The GAO found that 34% of
            large, profitable corporations pay zero federal income tax in any given year.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            These zero-tax companies are not passive beneficiaries. Public Citizen&apos;s
            &ldquo;The Price of Zero&rdquo; report found that the 55 companies paying $0 in 2020
            spent $450 million on lobbying and campaign contributions between 2015 and 2020.
            They deployed an average of 526 lobbyists per year. FedEx alone spent $71 million on
            lobbying and campaign contributions across the 2016&ndash;2020 cycles. Twenty-two of
            the fifty-five companies lobbied specifically on the Tax Cuts and Jobs Act.
          </p>

          {/* Carried Interest stat grid */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-money-out">91</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Fortune 500 Cos. Paid $0 (2018)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">$450M</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Political Spending by Zero-Tax Cos.
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-accent">11.3%</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Actual Effective Rate (2018)
              </div>
            </div>
          </div>

          {/* Carried Interest */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The Carried Interest Loophole: A Masterclass in Survival
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The carried interest loophole allows private equity and hedge fund managers to pay the
            20% capital gains rate instead of the 37% ordinary income rate on their management
            fees. Despite bipartisan criticism from Obama, Trump, Clinton, Sanders, and Biden, the
            loophole has survived every reform attempt &mdash; a testament to the financial
            industry&apos;s raw lobbying power. The loophole costs the federal government between
            $2 billion and $18 billion per year, depending on methodology. The CBO estimated in
            2017 that closing it would raise $14 billion over a decade.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The pattern of near-reform followed by survival is remarkably consistent. Obama called
            for carried interest reform in multiple budget proposals; Congress blocked every one.
            Trump pledged on the campaign trail to close it; the TCJA merely extended the holding
            period from one year to three. The Build Back Better Act included a reform provision;
            it stalled. The Inflation Reduction Act of 2022 contained a provision projected to
            raise $17 billion. Then Senator Kyrsten Sinema demanded its removal as a condition of
            her vote. Sinema had received more than $2 million from the securities and investment
            industry since 2018, including $44,000 from Blackstone employees and executives alone
            and $95,000 combined from KKR, Carlyle Group, and Apollo Global Management. Senate
            Majority Leader Chuck Schumer said Democrats had &ldquo;no choice&rdquo; but to drop
            the provision. The One Big Beautiful Bill Act of July 2025 left the loophole intact
            yet again.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The private equity industry&apos;s investment in political influence is staggering.
            In the 2020 election cycle, the securities and investment sector spent $625 million
            on combined political activity &mdash; $547 million in campaign contributions and the
            rest in lobbying. Citadel led individual firms at $67 million, followed by Blackstone
            at $43 million and Susquehanna International at $30 million. During the TCJA debate,
            Blackstone, Carlyle, and KKR combined to give $1.31 million to Republican lawmakers
            versus $438,000 to Democrats. Blackstone employees alone gave $212,000 to Mitch
            McConnell. The American Investment Council, the industry&apos;s primary lobbying arm,
            paid $100,000 to The Duberstein Group for carried interest lobbying during the TCJA
            fight. When Obama had proposed closing the loophole in 2010, Blackstone increased its
            lobbying budget from $6.7 million to $9 million in a single year.
          </p>

          {/* Offshore Havens */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Offshore Havens: $2.6 Trillion in the Shadows
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Before the TCJA, Fortune 500 companies held $2.6 trillion in profits offshore,
            sheltered from the then-35% corporate rate. They maintained 9,755 subsidiaries in
            tax haven jurisdictions. The taxes avoided on those holdings totaled an estimated $752
            billion. The Netherlands, Ireland, and Bermuda alone accounted for 35% of all overseas
            profits reported by U.S. multinationals &mdash; despite containing less than 0.3% of
            the world&apos;s population. The annual revenue lost to offshore profit shifting is
            approximately $150 billion per year in federal and state revenue combined.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Apple&apos;s arrangement with Ireland became the defining case study. Between 2004 and
            2014, Apple routed &euro;110.8 billion in non-U.S. profits through Irish subsidiaries,
            paying an effective tax rate as low as 0.005% &mdash; despite Ireland&apos;s statutory
            rate of 12.5%. In 2016, the European Commission ordered Apple to pay &euro;13 billion
            plus interest in unpaid Irish taxes &mdash; the largest corporate tax fine in history.
            Apple&apos;s response, revealed in the Paradise Papers, was to move its intellectual
            property holdings to Jersey in the Channel Islands. Google deployed a parallel scheme
            known as the &ldquo;Double Irish with Dutch Sandwich,&rdquo; routing $23 billion through
            Ireland and the Netherlands to Bermuda in 2017 alone, saving approximately $3.6 billion
            per year.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Corporate inversions &mdash; reincorporating in a low-tax jurisdiction while maintaining
            U.S. operations &mdash; arrived in two waves. The first, from 1996 to 2004, involved
            &ldquo;naked inversions&rdquo; to Caribbean havens and was partially closed by
            legislation. The second wave, from 2012 to 2016, targeted Ireland and the United
            Kingdom through mergers with real foreign companies. The largest completed inversion
            was Medtronic&apos;s $48 billion acquisition of Covidien in Ireland in 2015, driven
            by $20 billion in untaxed offshore reserves despite the vast majority of Medtronic&apos;s
            revenue coming from the United States. The largest aborted inversion was
            Pfizer&apos;s $160 billion attempt to merge with Allergan in 2016, which would have
            avoided $40.7 billion in taxes on offshore earnings. The Obama Treasury Department
            blocked the deal with new anti-inversion rules.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The global response has been tepid. In 2021, more than 140 countries signed an OECD
            agreement establishing a 15% minimum corporate tax rate for companies earning above
            &euro;750 million. The Income Inclusion Rule took effect in January 2024, with roughly
            90% of in-scope multinationals subject to it by 2025. But in January 2026, a
            &ldquo;Side-by-Side&rdquo; agreement effectively excluded U.S. multinationals from the
            15% floor. The Trump administration had already pulled the United States out of the
            implementation framework. Critics note that the 15% rate is itself too low and riddled
            with exceptions that undermine its effectiveness.
          </p>

          {/* IRS Defunding */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Defunding the IRS: Cutting the Cops on the Beat
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The most efficient way to reduce taxes for the wealthy is not to change the tax code
            but to ensure it is not enforced. Since 2010, the IRS enforcement budget has declined
            23% in inflation-adjusted terms. The result is a collapse in auditing capacity precisely
            where the money is. The overall individual audit rate dropped from 0.89% in 2010 to
            0.29% in 2019. Millionaires became 80% less likely to be audited between 2011 and
            2018. Audit rates for returns reporting more than $5 million in income fell 66% over
            the same period. Meanwhile, Earned Income Tax Credit claimants &mdash; among the
            lowest-income filers &mdash; were audited at a rate of 0.78%, nearly three times the
            overall rate. The working poor became about as likely to face an IRS audit as someone
            in the top 1%.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The disparity is structural. Auditing complex corporate and billionaire returns requires
            specialized expertise that the IRS can no longer retain. Experienced agents leave for
            private-sector tax practices that pay multiples of government salaries. What remains is
            the capacity for simple &ldquo;correspondence audits&rdquo; &mdash; automated checks
            on straightforward returns filed by low-income workers claiming the EITC. The total
            revenue shortfall from reduced enforcement since 2011 exceeds $95 billion in cumulative
            collections. The Treasury estimates the annual tax gap &mdash; the difference between
            what is owed and what is collected &mdash; at $600 billion. Stanford University
            researchers estimate that noncompliance by the richest 1% alone costs $175 billion
            per year.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Inflation Reduction Act of August 2022 attempted to reverse the damage with $80
            billion in mandatory IRS funding over ten years. The CBO projected the investment would
            generate $204 billion in additional revenue &mdash; a return of $2.55 for every $1
            spent. The Republican response was swift and systematic. The first bill of the 118th
            Congress, H.R. 23, proposed rescinding the entire $80 billion. The Fiscal Responsibility
            Act of 2023 immediately rescinded $1.4 billion and agreed to claw back $20 billion more.
            Subsequent appropriations rescissions in FY2024 and FY2025 stripped an additional $40.4
            billion. In total, approximately $41.8 billion &mdash; 52% of the original investment &mdash;
            was clawed back within three years. The enforcement boost that was designed to last a
            decade was effectively killed before it could demonstrate results. The primary
            beneficiaries of the defunding are the corporations and wealthy individuals whose complex
            returns the IRS can no longer audit.
          </p>

          {/* Tax Prep Industry */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The Tax Prep Industry: Lobbying to Keep Filing Painful
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            In most developed nations, the government files taxes for its citizens using data it
            already possesses. In the United States, a $14 billion industry exists to perform this
            service &mdash; and that industry has spent over two decades ensuring the government
            never competes with it. Since the launch of the IRS Free File Program in 2003, Intuit
            (maker of TurboTax) and H&amp;R Block have spent a combined $93 million lobbying
            against free government-provided tax filing. Intuit alone has spent $47.2 million.
            H&amp;R Block has spent $42 million over two decades of federal lobbying.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            ProPublica&apos;s 2019 investigation documented Intuit&apos;s twenty-year campaign in
            granular detail: deliberately steering eligible taxpayers away from free filing options,
            deploying deceptive advertising, and lobbying Congress to prohibit the IRS from
            developing its own free system. The FTC subsequently found that Intuit had engaged in
            deceptive practices with its &ldquo;free&rdquo; TurboTax advertising. Intuit&apos;s
            lobbying spending has only accelerated: nearly $3.8 million in 2023 and nearly $4
            million in 2024 &mdash; both company records. When the IRS launched its Direct File
            pilot in thirteen states on January 29, 2024 &mdash; the first time taxpayers could
            file online directly with the IRS for free, funded by the Inflation Reduction Act &mdash;
            the tax prep industry mounted an intense opposition campaign. The Trump administration
            ended the Direct File program in 2025.
          </p>

          {/* Estate / Death Tax */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The &ldquo;Death Tax&rdquo;: How 18 Families Rewrote the Estate Tax
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            In 1995, Republican pollster Frank Luntz conducted polling on the estate tax and
            advised the new GOP majority to never use the words &ldquo;estate tax&rdquo; or
            &ldquo;inheritance tax&rdquo; again. Instead, they should call it the &ldquo;death
            tax.&rdquo; It was one of the most effective framing operations in modern political
            history. The rebranding shifted public perception from a tax on wealthy estates
            &mdash; affecting roughly two in every 1,000 decedents &mdash; to a universal tax
            on death itself. Support for repeal surged despite the fact that the overwhelming
            majority of Americans would never owe a penny.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            A 2006 United for a Fair Economy report identified eighteen families with a combined
            net worth exceeding $185 billion who were financing a coordinated campaign to repeal
            the estate tax. The families included the Gallos, the Kochs, the Mars family, and the
            Waltons. Patricia Soldano, an estate planner, launched the repeal effort with
            approximately fifty wealthy clients; her Policy and Taxation Group spent $250,000 or
            more per year on lobbying. The results have been dramatic. The estate tax exemption
            was $675,000 with a top rate of 55% in 2001. The TCJA doubled it to approximately
            $11.18 million per individual. By 2025 it had grown to $13.99 million. The One Big
            Beautiful Bill Act made the higher exemption permanent at $15 million or more, indexed
            to inflation. The estate tax, which generated significant revenue for a century, now
            applies to a negligible fraction of estates. An ironic footnote: the life insurance
            industry, which benefits from estate tax planning, spent roughly $1.5 million through
            the Coalition for America&apos;s Priorities fighting to preserve the tax.
          </p>

          {/* State Tax Competition */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The Race to the Bottom: State Tax Subsidies
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            State and local governments spend an estimated $45 to $90 billion annually on corporate
            tax incentives and economic development subsidies. Megadeals worth $100 million or more
            have become commonplace, despite academic research consistently demonstrating that
            targeted incentives do not generate broad-based economic growth. The Amazon HQ2 bidding
            war of 2017 epitomized the dynamic: 238 North American cities submitted bids, with the
            twenty semifinalists averaging offers of $2.15 billion from cities and $6.75 billion
            from states over fifteen years. New York offered $1.525 billion in tax breaks plus $325
            million in cash grants before grassroots opposition killed the deal in February 2019.
            Virginia offered up to $750 million. Over its lifetime, Amazon has received more than $1
            billion in state and local tax breaks.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The SALT deduction cap &mdash; set at $10,000 by the TCJA &mdash; added another
            dimension to state tax competition. The One Big Beautiful Bill Act raised the cap to
            $40,000, phasing down to $10,000 for incomes over $500,000. Full repeal would cut
            taxes by more than $140,000 for the top 0.1%, with 75% of the benefit flowing to
            households earning above $430,000. The SALT caucus &mdash; a bipartisan coalition of
            representatives from high-tax states including New York, New Jersey, and California &mdash;
            has made SALT relief a precondition for supporting any tax legislation, creating a
            dynamic in which the wealthiest households in the wealthiest states hold the entire tax
            code hostage.
          </p>

          {/* Tax Expenditures */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The Hidden Budget: $2.2 Trillion in Tax Expenditures
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Tax expenditures &mdash; the credits, deductions, exemptions, and exclusions embedded
            in the code &mdash; totaled $1.9 trillion in 2024 and are projected to reach $2.2
            trillion in 2025. That figure exceeds the federal spending on Social Security, Medicare,
            or national defense &mdash; any single line item in the discretionary or mandatory
            budget. Yet unlike direct spending, tax expenditures face no annual appropriations
            review. They reduce revenue rather than appropriate funds, making them less visible
            to the public and less subject to democratic oversight. Individual tax breaks account
            for $1.7 trillion of the total; corporate tax breaks add $188 billion. The growth rate
            is accelerating: an 8% increase, or $155 billion, is projected from 2025 to 2026 alone.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The overall tax gap &mdash; the difference between taxes owed and taxes paid &mdash;
            stands at $600 billion annually by Treasury estimates. The IRS projects $540 billion
            per year for tax years 2017 through 2019. The corporate tax gap alone is at least $32
            billion per year by IRS estimates, though this figure is widely considered a significant
            undercount. Corporate tax revenue as a share of GDP has declined for decades, with the
            burden shifting to individual income taxes and payroll taxes. The Economic Policy
            Institute concluded that the TCJA &ldquo;overwhelmingly benefited the rich and
            corporations while overlooking working families.&rdquo; The 2025 extension battle
            confirmed the trajectory: the One Big Beautiful Bill Act made TCJA&apos;s individual
            provisions permanent, restored 100% bonus depreciation, and raised the SALT cap &mdash;
            at a projected cost of $4 trillion over the 2025&ndash;2034 budget window.
          </p>
        </div>
      </section>

      {/* ── Scrollytelling section ── */}
      <ScrollytellSection
        headline="The Tax &amp; Education Pipeline"
        subhead="Seven steps trace how corporate lobbying rewrites the tax code, guts enforcement, and reshapes American education from kindergarten through graduate school."
        steps={SCROLLYTELL_STEPS}
        bgColor="bg-ink"
        textColor="text-white"
      />

      {/* ── Pull quote ── */}
      <section className="border-y-4 border-ink bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
          <blockquote className="text-center">
            <p className="font-headline text-3xl font-black leading-tight tracking-tight text-ink lg:text-4xl">
              &ldquo;Ninety-three firms spent $282.7 million lobbying for a tax holiday
              and saved $62.5 billion &mdash; a 22,000% return. Every dollar spent
              returned $220 in tax savings.&rdquo;
            </p>
            <cite className="mt-6 block font-mono text-sm font-bold uppercase tracking-widest text-muted">
              University of Kansas / Sunlight Foundation Study, 2009
            </cite>
          </blockquote>
        </div>
      </section>

      {/* ── Part II: Education ── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part II
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Education
          </h2>

          {/* Student Loans */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The $1.84 Trillion Student Debt Machine
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Federal student loan debt stood at $1.69 trillion as of September 2025. Including
            private loans, the total reached $1.84 trillion &mdash; owed by 45.8 million
            borrowers carrying an average balance of $39,547. The debt grew $54 billion in 2025
            alone, with quarterly year-over-year growth averaging 2.94%. Federal loans account
            for more than 90% of all student debt. This is not a market failure. It is a system
            maintained by an industry that profits from the debt&apos;s persistence.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The student loan servicing industry has spent over $50 million lobbying Congress since
            2008. Navient, the largest servicer, led the field with $1.71 million in 2020 alone.
            Sallie Mae (SLM Corp) spent $1.4 million that year. MOHELA, a state-chartered servicer,
            spent $320,000 in 2019 while collecting $279.2 million in servicing fees in 2023 and
            over $1.1 billion in Department of Education payments since 2011. The industry&apos;s
            lobbying has been remarkably effective at blocking reform: every major attempt to
            restructure student debt has either been killed in Congress, blocked by courts, or
            gutted through administrative inaction.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Biden administration&apos;s attempt at broad student loan forgiveness illustrates
            the industry&apos;s defensive power. The initial plan &mdash; up to $20,000 in
            forgiveness per borrower under the HEROES Act &mdash; was struck down by the Supreme
            Court in <em>Biden v. Nebraska</em> on June 30, 2023, in a 6-3 ruling that invoked the
            &ldquo;major questions doctrine.&rdquo; The basis for Missouri&apos;s standing was
            MOHELA&apos;s potential revenue loss if forgiven loans exited its servicing portfolio.
            A state-chartered loan servicer&apos;s profits became the legal lever to block relief
            for 45 million borrowers. A second attempt in September 2024 was pre-emptively blocked
            by seven Republican-led states within two days. In total, the Biden administration
            forgave approximately $175 billion for 4.76 million borrowers through targeted programs
            &mdash; roughly 9.5% of total federal student debt &mdash; through mechanisms the
            servicer lobby could not easily challenge: Public Service Loan Forgiveness corrections,
            income-driven repayment adjustments, and borrower defense discharges. Over fifty members
            of Congress called on the Department of Education to consider terminating MOHELA&apos;s
            contract in 2024.
          </p>

          {/* Student debt stat grid */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-money-out">$1.84T</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Total Student Debt
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">45.8M</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Borrowers
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-accent">$50M+</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Industry Lobbying Since 2008
              </div>
            </div>
          </div>

          {/* For-Profit Colleges */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            For-Profit Colleges: The $12.5 Million Lobbying Surge
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The for-profit college industry mounted one of the most aggressive lobbying campaigns
            in education history during 2010&ndash;2012, when the Obama administration proposed
            &ldquo;gainful employment&rdquo; rules that would have tied federal student aid
            eligibility to debt-to-income outcomes for graduates. Before the rules were proposed,
            the industry spent $2.8 million on lobbying in 2009. By 2010, spending nearly tripled
            to $7.57 million. In 2011, it peaked at $12.5 million &mdash; deployed through 37
            lobbying firms that fielded 158 lobbyists, 71% of whom had prior government experience
            and twelve of whom were former members of Congress. The Association of Private Sector
            Colleges and Universities (now Career Education Colleges and Universities) hired former
            Senate Majority Leader Trent Lott and former Senator John Breaux through Squire Patton
            Boggs, paying $1.44 million over four years.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The institutions at the center of this lobbying effort were, in many cases, running
            fraudulent operations. Corinthian Colleges closed in 2015 after being denied access
            to federal funds following investigations into systematic fraud. The result was $5.8
            billion in loan discharges for 560,000 borrowers &mdash; the single largest student
            loan discharge in history at the time. ITT Tech closed in September 2016 under similar
            circumstances, generating $3.9 billion in discharges for 208,000 borrowers. DeVry
            University, which had spent $720,000 on lobbying in 2011 (through lobbyist Heather
            Podesta), ultimately had $37 million in student loans canceled. In total, nearly $9.7
            billion in student loans have been discharged from the two largest for-profit closures.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The regulatory arc tells the story of capture in miniature. The Obama administration
            finalized gainful employment rules in 2014 and implemented them in 2015. Betsy DeVos
            rescinded them entirely in July 2019. DeVos staffed the Department of Education with
            former for-profit college executives who then rolled back regulations on their former
            industry and delayed enforcement of fraud findings. The Biden administration released
            new gainful employment regulations in October 2023. Under the second Trump
            administration, reporting deadlines were delayed and implementation remains uncertain.
            The rule has been proposed, implemented, rescinded, re-proposed, and re-implemented
            across three administrations &mdash; a sixteen-year regulatory saga driven entirely
            by the oscillation of industry lobbying power.
          </p>

          {/* Charter/Voucher */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The Voucher Wave: From Zero to Thirteen States
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The school choice movement experienced the fastest policy diffusion in modern education
            history between 2021 and 2025. In 2021, zero states had universal school voucher or
            Education Savings Account programs. By the end of 2025, thirteen did. Five states &mdash;
            Arkansas, Florida, Iowa, Ohio, and Utah &mdash; enacted universal programs in 2023
            alone. Florida&apos;s HB 1 made 3.2 million K-12 students immediately eligible. Iowa
            set the per-student amount at $7,598. Four more states followed in 2024: Alabama,
            Georgia, Louisiana, and Wyoming. In 2025, Texas created a $1 billion ESA program at
            $10,000 per student, Tennessee enacted a $7,000 ESA, and Wyoming removed its remaining
            income restrictions. Participation grew from approximately 584,000 students in
            2023&ndash;2024 to 805,000 in 2024&ndash;2025 &mdash; a 40% increase in a single year.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            This did not happen organically. The American Federation for Children, founded by
            Betsy DeVos, is the nation&apos;s largest school choice advocacy organization and has
            been credited with passing more than 200 school choice laws across 31 states. In 2022,
            AFC spent $9 million on state-level elections and won 277 of 368 races, defeating 40
            incumbents opposed to vouchers. The organization announced $10 million for 2024 state
            elections. Its Victory Fund has raised $10.6 million since launch, with Jeff Yass
            contributing $7 million and the DeVos family contributing $1 million. In Texas alone,
            AFC spent nearly $4 million in 2024. In Tennessee, AFC and Americans for Prosperity
            combined to spend $1.125 million on lobbying for a statewide voucher plan.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Koch network&apos;s Americans for Prosperity set a record with $1.9 million in
            federal lobbying in 2023, deployed seventeen lobbyists, and received nearly $80 million
            in funding primarily from Koch Industries. AFP conducts door-knocking, literature
            distribution, and phone banking for pro-voucher candidates. The Heritage Foundation&apos;s
            Project 2025 education chapter &mdash; authored by Lindsey Burke, who subsequently became
            DOE Deputy Chief of Staff for Policy and Programs &mdash; identifies school vouchers as a
            key conservative litmus test and proposes establishing a federal voucher program. Heritage
            President Kevin Roberts has called vouchers a &ldquo;non-negotiable&rdquo; priority.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Walton Family Foundation has invested more than $1 billion in education, including
            over $400 million specifically in charter school grants. The foundation has funded one
            in four charter school startups in the United States; 840,000 students attend
            Walton-funded schools. In 2023, the foundation dispensed nearly $580 million in total
            grants. In Colorado alone, the Waltons directed more than $20 million to education
            advocacy groups including Colorado Succeeds, the Colorado League of Charter Schools,
            and Transform Education Now. Democrats for Education Reform, a PAC encouraging
            Democratic Party support for charter schools, has been sustained by Walton family
            funding for over a decade &mdash; though the organization&apos;s footprint has
            contracted from nineteen state chapters to four by 2025, and its staff from thirteen
            to four.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The DeVos family&apos;s political spending extends far beyond the AFC. During her
            Senate confirmation hearing, Betsy DeVos acknowledged under questioning that it was
            &ldquo;possible&rdquo; her family had contributed $200 million to Republican candidates
            over the years. Documented contributions include $58 million to Michigan state
            candidates, $17.7 million to federal candidates, and $6.4 million across twelve other
            states. The family&apos;s annual philanthropy totals approximately $90 to $94 million,
            with nearly half directed to education groups.
          </p>

          {/* Voucher stat grid */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-accent">158:1</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Pro-Voucher Spending Ratio (CO)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">$1B+</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Walton Education Investment
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-out">$200M+</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                DeVos Family Political Giving
              </div>
            </div>
          </div>

          {/* Teachers Unions */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Teachers Unions: The Other Side of the Ledger
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The teachers unions are the largest organized counterweight to the school choice
            movement, and their political spending is substantial. The National Education
            Association, with approximately three million members, spent $22.7 million in
            campaign contributions during the 2024 cycle. Its advocacy fund PAC raised $27.9
            million and disbursed $29.4 million, including $2.5 million to Future Forward USA
            Action, $1.5 million to the House Majority PAC, and $1.5 million to the Senate
            Majority PAC. The NEA&apos;s total political footprint in 2024 was approximately
            $169 million &mdash; encompassing contributions, political activities, lobbying ($2.78
            million), and $128 million in grants to other organizations. In 2025, the NEA spent
            $51.7 million on political activities and lobbying alone.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The American Federation of Teachers, with approximately 1.7 million members,
            contributed over $16 million to federal candidates in the 2024 cycle &mdash; 99.9%
            to Democrats. Its PAC raised $12 million for Democratic candidates. The AFT spent
            $38 million or more on political activities and lobbying in 2024 and $46.9 million in
            the 2022&ndash;2023 cycle. Combined, the two unions spent over $96.9 million on
            political activities in 2023. Between 1990 and 2020, their combined direct
            contributions to federal candidates exceeded $150 million, with 97% or more going to
            Democrats. Between 1989 and 2009, the unions ranked as the number-one hard-money
            contributor to federal campaigns at $59.4 million.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The unions&apos; dominance in school board elections is measurable. Union-endorsed
            candidates have historically won 60% to 71% of contested school board races. In 2025,
            84% of incumbents seeking re-election won &mdash; the highest rate since 2022. Both
            the NEA and AFT actively campaign against charter expansion and voucher programs at
            every level of government. The asymmetry in the education spending fight is stark:
            the voucher movement is funded by a handful of billionaire families spending tens of
            millions per cycle; the union movement is funded by millions of individual dues-paying
            members contributing smaller amounts across a much broader base. Both sides spend
            heavily. But in state-level charter and voucher battles, the billionaire-funded
            organizations routinely outspend their opponents by margins of 100-to-1 or more &mdash;
            as Colorado&apos;s 158-to-1 ratio in 2024 demonstrated.
          </p>

          {/* DOE Dismantlement */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Dismantling the Department of Education
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Trump administration has pursued the most aggressive effort in history to dismantle
            the Department of Education. An executive order signed in March 2025 initiated the
            process. Approximately 1,700 employees have been cut &mdash; nearly 50% of the
            workforce relative to Inauguration Day. At least 240 Office for Civil Rights employees
            were laid off, most of them attorneys investigating discrimination complaints. DOGE
            cut dozens of IES research contracts worth roughly $900 million. Six interagency
            agreements transferred programs &mdash; including Title I, the largest federal K-12
            funding stream &mdash; to other agencies, with the Department of Labor absorbing
            several major programs.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The FY2026 budget proposal cuts $12 billion from the Department of Education &mdash;
            a 15.3% reduction. Eighteen ESSA programs would be consolidated into a single block
            grant with $4.5 billion fewer dollars, a 70% cut. All federal funding for language
            instruction for English learners would be eliminated. IDEA funding for students with
            disabilities would be consolidated into a single program. Education Secretary Linda
            McMahon has described the strategy as working within legal constraints to dismantle the
            department from inside, following the Project 2025 blueprint: eliminate programs deemed
            ineffective, shift functions to other agencies, and transfer funding control to states.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The revolving door is the mechanism. Lindsey Burke spent seventeen years at the Heritage
            Foundation, where she directed the Center for Education Policy and co-authored the
            Project 2025 chapter proposing the DOE&apos;s dismantlement. She was then hired as the
            DOE&apos;s Deputy Chief of Staff for Policy and Programs &mdash; the official responsible
            for implementing the very plan she had authored. During the first Trump term, Education
            Secretary Betsy DeVos staffed the DOE with former for-profit college executives who
            then rolled back regulations on their former industry. In 2024, 403 clients lobbied
            the Department of Education, and total education sector lobbying reached $105.6 million.
          </p>

          {/* College Board & University Lobbying */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The College Board: A Billion-Dollar &ldquo;Nonprofit&rdquo;
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The College Board is classified as a nonprofit organization. It generated approximately
            $1.02 billion in revenue in 2023. It holds $2.06 billion in cash and investments. Its
            CEO, David Coleman, was paid $2.5 million in 2020; its president, Jeremy Singer,
            received $1.4 million. The organization consistently surpasses $50 million in annual
            profits. It spent nearly $18 million on employee travel in 2023. It is the only
            organization in the United States that distributes the PSAT, SAT, and AP exams &mdash;
            a de facto monopoly over the standardized testing pipeline that shapes college
            admissions for millions of students annually.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The College Board has deployed lobbyists to block competitors from entering the college
            entrance exam market. The Columbia Undergraduate Law Review has published a case for
            Sherman Act Section 2 enforcement against the College Board&apos;s monopoly position.
            The organization&apos;s federal lobbying is modest in absolute terms &mdash; $124,832
            in 2024 &mdash; but its market power renders aggressive lobbying unnecessary. The
            monopoly is self-sustaining: colleges require SAT or ACT scores, high schools
            administer AP exams to boost their rankings, and the College Board collects fees at
            every stage while maintaining its tax-exempt status.
          </p>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Universities Fight Back: The 2025 Lobbying Surge
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Major research universities dramatically ramped up federal lobbying in 2025 in response
            to the Trump administration&apos;s escalating attacks on higher education. Total
            lobbying by Association of American Universities member institutions rose from $28.1
            million in 2024 to more than $37 million in 2025 &mdash; a 31% increase. The
            University of California system led all institutions at $2.775 million. The University
            of Washington spent $1.341 million; the University of Florida, $1.334 million; the
            University of Pennsylvania, $1.32 million; Indiana University, $1.314 million. Yale
            and Columbia each exceeded $1 million. Cornell spent $914,000 or more.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Harvard&apos;s lobbying surge was the most dramatic &mdash; and the most instructive
            about the dynamics of political spending under threat. Harvard spent nearly $1 million
            on federal lobbying in 2025, its highest total in more than two decades. In Q1 2025,
            the university spent $230,000, including $90,000 to Ballard Partners, a firm with
            close ties to the Trump administration. Q2 set a record at $270,000. The trigger was
            existential: Trump had stripped Harvard of nearly $3 billion in federal funding and
            frozen $2.2 billion within hours of the university defying administration demands
            regarding its governance, hiring, and admissions practices. Trump publicly threatened
            to revoke Harvard&apos;s tax-exempt status. Universities targeted by the administration
            more than doubled their lobbying spending.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The endowment tax amplified the confrontation. The TCJA had imposed a modest 1.4%
            excise tax on net investment income for the wealthiest private colleges. The One Big
            Beautiful Bill Act raised that rate to as high as 8% for institutions with the largest
            endowments. For Harvard, the increase could cost more than $200 million per year. The
            institutions at the highest rate include Harvard, Yale, Princeton, Stanford, and MIT.
            The tax is explicitly punitive &mdash; a financial weapon deployed against universities
            the administration viewed as ideologically hostile.
          </p>

          {/* Early Childhood */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Early Childhood: The $52.5 Billion Cliff
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The expiration of $52.5 billion in pandemic-era child care funding created a crisis
            threatening millions of children&apos;s access to care. The American Rescue Plan had
            provided $24 billion in stabilization grants and $13.5 billion in Child Care and
            Development Block Grant expansions, both of which expired in September 2023. An
            additional $15 billion in block grants expired in September 2024. The projected impact:
            3.2 million children losing access to care and more than 70,000 program closures. States
            faced a $48 billion funding gap in 2024. By that year, 53% of child care providers
            reported staffing shortages, 56% were under-enrolled relative to capacity, and the root
            causes were inseparable from the funding crisis: staffing shortages driven by low pay
            (cited by 89% and 77% of providers respectively) and lack of affordability for families
            (66%).
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Head Start, the federal early childhood program serving low-income families, received
            $12.3 billion in FY2024 funding and $12.36 billion in FY2026 &mdash; modest increases
            that did not keep pace with inflation. Project 2025 had proposed eliminating Head Start
            entirely. The National Head Start Association mounted a grassroots defense: 300,000
            letters to Congress, 50,000 petition signatures, rallies nationwide, and direct visits
            to Republican members. The NHSA spent $316,947 on federal lobbying in 2024. Head Start
            received a reprieve from budget cuts, but its future remains contested. State pre-K
            spending reached $13.6 billion in 2023&ndash;2024, an inflation-adjusted increase of
            nearly $2 billion, or 17%, over the prior year. Per-child spending rose to $7,888. But
            these state investments cannot substitute for the scale of expired federal pandemic
            funding.
          </p>

          {/* Education stat grid */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-accent">$37M+</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                University Lobbying (2025)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">$1.02B</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                College Board Revenue
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-out">$52.5B</div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Expired Child Care Funding
              </div>
            </div>
          </div>
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
            The corporations, foundations, and trade groups that write the tax code and reshape
            American education through sustained political investment.
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
            { value: "$1.456T", label: "TCJA Deficit Cost" },
            { value: "22,000%", label: "Tax Lobbying ROI" },
            { value: "$1.84T", label: "Student Loan Debt" },
            { value: "$96.9M", label: "Union Political Spending" },
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
              All figures in this chapter are derived from publicly available data. Federal
              lobbying expenditure data comes from Senate Lobbying Disclosure Act filings and
              OpenSecrets.org. Tax revenue and deficit projections reference the Joint Committee
              on Taxation (JCT) and the Congressional Budget Office (CBO). Corporate effective
              tax rate analyses are sourced from the Institute on Taxation and Economic Policy
              (ITEP) and the Government Accountability Office (GAO-23-105384). The 22,000%
              lobbying ROI calculation is from a University of Kansas study published via the
              Sunlight Foundation (2009). Student loan debt figures are drawn from the U.S.
              Department of Education and the Education Data Initiative. For-profit college
              lobbying data references OpenSecrets and Sunlight Foundation analyses. School
              choice spending data references OpenSecrets, NBC News, and state campaign finance
              disclosures. Teachers union spending data is sourced from OpenSecrets, IRS Form 990
              filings (via Americans for Fair Treatment and Capital Research Center), and union
              financial disclosures. University lobbying data references Inside Higher Ed and
              OpenSecrets. College Board financials are drawn from IRS Form 990 filings. All
              dollar figures are nominal unless otherwise stated. Inflation-adjusted figures
              reference CPI-U where noted.
            </p>
          </div>
        </div>
      </section>

      {/* ── Chapter navigation ── */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
          <div className="grid grid-cols-2 gap-6">
            <Link
              href="/guide/industries-that-shape-daily-life"
              className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <ArrowLeft className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-ink" />
              <div className="min-w-0">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Previous Chapter
                </div>
                <div className="mt-1 font-headline text-base font-bold text-ink lg:text-lg">
                  Chapter 8: Industries That Shape Daily Life
                </div>
              </div>
            </Link>
            <Link
              href="/guide/the-influence-machine"
              className="group flex items-center justify-end gap-4 rounded-xl border border-border bg-surface p-6 text-right transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <div className="min-w-0">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Next Chapter
                </div>
                <div className="mt-1 font-headline text-base font-bold text-ink lg:text-lg">
                  Chapter 10: The Influence Machine
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
            Explore the interactive money flow diagram to trace tax lobbying dollars and education
            spending from corporate treasuries through Congress to the classroom.
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
