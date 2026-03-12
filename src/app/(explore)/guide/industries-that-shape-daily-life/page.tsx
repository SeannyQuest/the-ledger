import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Flag,
  Wifi,
  Home,
  Wheat,
  FileText,
  BarChart3,
  Calculator,
  TrendingUp,
} from "lucide-react";
import { ScrollytellSection } from "@/components/stories/ScrollytellSection";
import type { ScrollytellStep } from "@/components/stories/ScrollytellSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries That Shape Daily Life — The Ledger",
  description:
    "Chapter 8 of The Field Guide to American Corruption. Telecom giants, real estate monopolies, and agribusiness conglomerates spend billions to shape the rules governing your internet, your housing, and your food — and the returns are extraordinary.",
};

const SCROLLYTELL_STEPS: ScrollytellStep[] = [
  {
    id: "telecom-lobbying",
    title: "The $1.84 Billion Telecom Machine",
    body: "Since 1998, the telecommunications industry has spent $1.84 billion on federal lobbying alone — making it the 12th largest lobbying sector in America. In the 116th Congress, the top 15 ISPs and trade associations spent $234 million at a rate of $320,000 per day. Comcast, AT&T, Verizon, and Charter combine for $50 million annually in federal lobbying — roughly 0.01% of their combined revenue — generating billions in regulatory advantages. For every single public comment filed on net neutrality, ISPs spent $100 on lobbying.",
    stat: {
      value: "$1.84B",
      label: "Telecom Lobbying Since 1998",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
  {
    id: "net-neutrality-killed",
    title: "Net Neutrality: Killed, Revived, Killed Again",
    body: "From 2008 to 2017, Comcast, AT&T, Verizon, and NCTA spent $572 million lobbying the FCC on broadband regulation. In 2017, FCC Chairman Ajit Pai — a former Verizon attorney — repealed net neutrality over the objections of millions. The FCC restored it in 2024, but the Sixth Circuit struck it down in January 2025, citing the Supreme Court&rsquo;s Loper Bright decision. Pai then became CEO of CTIA, the wireless industry&rsquo;s top lobbying group, completing the revolving door from regulator to private equity to industry lobbyist-in-chief.",
    stat: {
      value: "$572M",
      label: "ISP Lobbying to Kill Net Neutrality",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
  {
    id: "nar-dominance",
    title: "The Most Powerful Lobby in America",
    body: "The National Association of Realtors spent $86.4 million on lobbying in 2024 — more than any other organization in the country, surpassing even the U.S. Chamber of Commerce. NAR has spent $850 million or more on lobbying since 1998. Every one of its 1.5 million members pays $156 in mandatory annual dues, 35% of which — $55 per person — is classified as nondeductible lobbying expense. Members cannot opt out. The largest political machine in real estate is funded by a mandatory tax on the people who sell your home.",
    stat: {
      value: "$86.4M",
      label: "NAR Lobbying in 2024 (#1 in America)",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
  {
    id: "rent-control-crushed",
    title: "$280 Million to Block Rent Control",
    body: "Across three California ballot cycles — Propositions 10 (2018), 21 (2020), and 33 (2024) — the real estate industry spent $280 million or more to defeat rent control measures. All three lost with approximately 59% opposition. The California Apartment Association alone has spent $226 million defending the Costa-Hawkins Rental Housing Act since 2018. Blackstone contributed over $7 million to defeat Props 10 and 21, using pools of investor capital that included California public employee pension funds — public workers&rsquo; retirement money deployed to block rent protections for the public.",
    stat: {
      value: "$280M+",
      label: "Spent to Kill CA Rent Control (3 Cycles)",
      color: "#d97706",
    },
    highlightColor: "#d97706",
  },
  {
    id: "farm-bill-capture",
    title: "The Farm Bill: $523 Million in Lobbying",
    body: "Between 2019 and 2023, agribusiness groups reported $523 million in federal lobbying on Farm Bill issues. Industry outspent public interest groups 4 to 1 — $400 million from pharmaceutical, manufacturing, and big agriculture versus $95 million from nonprofits, labor unions, and tribal nations. The 2025 budget reconciliation cut $186.5 billion in federal nutrition spending over 10 years, despite the fact that SNAP accounts for 81% of Farm Bill mandatory spending and feeds tens of millions of Americans.",
    stat: {
      value: "$523M",
      label: "Farm Bill Lobbying (2019-2023)",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
  {
    id: "beef-monopoly",
    title: "Four Companies, 80% of Your Beef",
    body: "JBS, Tyson Foods, Cargill, and National Beef Packing control approximately 80-85% of the U.S. beef market. They have paid $140 million or more in price-fixing settlements — JBS $52.5 million, Tyson $55 million, Cargill $32.5 million — with estimated total consumer damages of $1.9 billion. JBS donated $5 million to Trump&rsquo;s 2025 inaugural committee — five times what Meta or Amazon gave — and began trading on the NYSE six months later, with SEC listing approved within two days of Trump appointee Paul Atkins becoming SEC Chair. The Batista brothers who founded JBS had previously confessed to bribing 1,900 Brazilian politicians.",
    stat: {
      value: "80-85%",
      label: "Beef Market Controlled by Big Four",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
  {
    id: "roundup-immunity",
    title: "$11 Billion in Settlements, Then Buy Immunity",
    body: "Bayer-Monsanto has paid $11 billion or more to approximately 100,000 Roundup plaintiffs, with 63,000 additional lawsuits pending and a $2.1 billion jury verdict in Georgia in March 2025 alone. Rather than reformulate, Bayer has spent $9.19 million or more on lobbying in 2025, deploying 49 lobbyists across 13 firms to secure Farm Bill language that would preempt state failure-to-warn lawsuits. North Dakota and Georgia have already signed pesticide immunity laws. Trump invoked the Defense Production Act to promote domestic glyphosate production, potentially granting manufacturer immunity. The company that poisoned people now lobbies to make suing about it illegal.",
    stat: {
      value: "$11B+",
      label: "Roundup Settlements to 100K Plaintiffs",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
];

export default function IndustriesThatShapeDailyLifePage() {
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
            <span className="text-accent-light">Chapter 8</span>
          </nav>

          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
            Chapter 8 &middot; The Field Guide to American Corruption
          </div>

          <h1 className="mt-6 font-headline text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl xl:text-8xl">
            Industries That Shape Daily Life
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70 lg:text-2xl">
            Telecom giants, real estate monopolies, and agribusiness
            conglomerates spend billions to shape the rules governing your{" "}
            <span className="font-semibold text-white">internet</span>, your{" "}
            <span className="font-semibold text-white">housing</span>, and your{" "}
            <span className="font-semibold text-white">food</span> — and the
            returns are extraordinary.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div>
              <div className="font-headline text-3xl font-black text-accent-light">
                $1.84B
              </div>
              <div className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white/40">
                Telecom Lobbying Since 1998
              </div>
            </div>
            <div className="hidden h-10 w-px bg-white/10 sm:block" />
            <div>
              <div className="font-headline text-3xl font-black text-accent-light">
                $850M+
              </div>
              <div className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white/40">
                NAR Lobbying Since 1998
              </div>
            </div>
            <div className="hidden h-10 w-px bg-white/10 sm:block" />
            <div>
              <div className="font-headline text-3xl font-black text-accent-light">
                $523M
              </div>
              <div className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white/40">
                Farm Bill Lobbying (5 yr)
              </div>
            </div>
            <div className="hidden h-10 w-px bg-white/10 sm:block" />
            <div>
              <div className="font-headline text-3xl font-black text-accent-light">
                $280M+
              </div>
              <div className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white/40">
                To Kill CA Rent Control
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-white/50">
            <time dateTime="2026-03-11">March 11, 2026</time>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>28 min read</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>The Ledger Investigations</span>
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
            The preceding chapters of this guide have documented the machinery
            of American corruption in its most visible forms — the lobbying
            industrial complex, the dark money pipeline, the revolving door
            between Congress and K Street, the industries that write their own
            regulations. But the most consequential lobbying in America does not
            happen on cable news or in Senate hearing rooms. It happens in the
            mundane regulatory processes that determine how much you pay for
            internet service, whether your rent can be capped, and what
            chemicals are permitted on the food you feed your children. Three
            industries — telecommunications, real estate, and agriculture —
            collectively spend more than a billion dollars per election cycle to
            shape the rules that govern the most basic conditions of daily life
            in the United States.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            This chapter examines how that money translates into policy. In
            telecommunications, a handful of ISPs have spent $1.84 billion since
            1998 to eliminate competition, kill net neutrality, and capture the
            agencies that regulate them — while 50 million Americans have one or
            zero choices for high-speed broadband. In real estate, the National
            Association of Realtors has spent $850 million on lobbying to become
            the single most powerful organization in Washington, while private
            equity firms have purchased tens of thousands of single-family homes
            and spent hundreds of millions defeating rent control. In
            agriculture, four companies control 80% of the beef market while
            lobbying to block antitrust enforcement, and Bayer-Monsanto has paid
            $11 billion in Roundup settlements while simultaneously lobbying to
            make future lawsuits illegal.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The pattern across all three industries is identical: concentrate
            market power, spend a fraction of the resulting profits on lobbying,
            capture the regulatory apparatus, and then use that captured
            apparatus to prevent competition, suppress consumer protections, and
            entrench the monopoly. The dollar figures are staggering. The
            returns on investment are even more so. And the costs are borne by
            the same people who have the least power to change the system — the
            consumers who pay inflated prices for broadband, the renters who
            cannot afford housing, and the farmers and farmworkers crushed
            between monopoly buyers and monopoly sellers.
          </p>
        </div>
      </section>

      {/* Scrollytelling section */}
      <ScrollytellSection
        headline="From Your Router to Your Refrigerator"
        subhead="How telecom, real estate, and agriculture lobbying shape the cost and quality of daily life in America — one regulatory capture at a time."
        steps={SCROLLYTELL_STEPS}
        bgColor="bg-ink"
        textColor="text-white"
      />

      {/* Pull quote break */}
      <section className="border-y-4 border-ink bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
          <blockquote className="text-center">
            <p className="font-headline text-3xl font-black leading-tight tracking-tight text-ink lg:text-4xl">
              &ldquo;The affordability crisis is fundamentally a supply
              problem&hellip; Large corporate ownership is a red herring.&rdquo;
            </p>
            <cite className="mt-6 block font-mono text-sm font-bold uppercase tracking-widest text-muted">
              Realtor.com Senior Economist — Responding to Trump&apos;s
              Executive Order on Institutional Homebuyers, Jan. 2026
            </cite>
          </blockquote>
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-ink/50">
            The real estate industry&apos;s preferred framing: the crisis is
            about supply, not the investors who bought 25% of Atlanta&apos;s
            single-family homes while lobbying to block every proposed remedy.
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION A: Telecom, Media & Net Neutrality                     */}
      {/* ============================================================== */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Wifi className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Research Topic #25
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Telecom, Media &amp; Net Neutrality
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The American broadband market is a study in engineered scarcity.
            Most Americans have one or two choices for high-speed internet
            service. Approximately 50 million have zero or one option. Prices
            are among the highest in the developed world — $75 to $85 per month
            on average — in a market where meaningful competition has been
            systematically eliminated through decades of mergers, regulatory
            capture, and legislative preemption. The companies that provide your
            internet access have spent $1.84 billion lobbying the federal
            government since 1998, and they have received a return on that
            investment that defies description.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The scale of the spending is both consistent and enormous. In 2023,
            the telecom services sector spent $117.6 million on federal
            lobbying. In 2024, the figure was $108.1 million. The broader
            communications and electronics sector — including tech companies —
            totaled $585.7 million. At the company level, Comcast spent $13.9
            million in 2024 and has consistently spent $13-14 million annually
            for at least five years. AT&amp;T spent $12.05 million. Verizon
            spent $11.38 million. Charter Spectrum spent $8.01 million, down 30%
            from its 2022 peak of $11.4 million. These are just the federal
            numbers. The industry spends an additional $25 million or more
            annually on state-level lobbying that is harder to track and often
            more consequential.
          </p>

          {/* Telecom spending stat grid */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-4">
            <div>
              <div className="font-headline text-3xl font-black text-money-out">
                $13.9M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Comcast (2024)
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-money-out">
                $12.1M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                AT&amp;T (2024)
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-money-out">
                $11.4M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Verizon (2024)
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-money-out">
                $17.3M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                CTIA (2024)
              </div>
            </div>
          </div>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The Revolving Door at the FCC
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Federal Communications Commission is the textbook case of
            regulatory capture through personnel. The revolving door between the
            agency and the industries it regulates is not a bug — it is a
            feature that has been refined over decades. Michael Powell served as
            FCC Chairman under George W. Bush from 2001 to 2005; he has been
            President and CEO of NCTA, the cable industry&apos;s trade
            association representing 90% of cable households, since April 2011.
            He now lobbies for the same companies he once regulated. Meredith
            Attwell Baker served as FCC Commissioner from 2009 to 2011; in
            January 2011, she voted to approve the $30 billion
            Comcast-NBCUniversal merger, and four months later she was hired by
            Comcast as Senior Vice President of Government Affairs. She later
            became CEO of CTIA, the wireless industry lobby, serving from June
            2014 to April 2025.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            But no career illustrates the revolving door more completely than
            Ajit Pai&apos;s. Pai served as an attorney at Jenner &amp; Block,
            where his clients included Securus, a prison phone company. He was
            appointed FCC Chairman by Trump in January 2017. Within a year, he
            repealed net neutrality — a move the telecom industry had spent $572
            million lobbying for over the preceding decade. He also dropped
            prison phone rate limits that had benefited his former client
            Securus. After leaving the FCC in January 2021, Pai became a partner
            at Searchlight Capital Partners, a private equity firm. And on April
            1, 2025, he became President and CEO of CTIA — the wireless
            industry&apos;s top lobbying organization, the same group that spent
            $17.3 million on lobbying in 2024 and ranked as the 9th largest
            lobbying spender in America. The trajectory is frictionless:
            regulator to private equity to industry lobbyist-in-chief.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The current FCC Chairman, Brendan Carr, brings his own set of
            alignments. Before the FCC, Carr was an attorney at Wiley Rein LLP,
            where his clients included Viacom, AOL Time Warner, and Bell
            telephone companies. He authored the FCC chapter of Project 2025,
            calling for regulating tech companies and ending Section 230 —
            making him the first FCC chairman to have written a policy blueprint
            for the agency he now leads. He was designated chair by Trump on
            January 20, 2025.
          </p>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Net Neutrality: A Decade of Destruction
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The history of net neutrality in America is the history of industry
            money overwhelming public interest. In 2015, the FCC under Chairman
            Tom Wheeler — himself a former NCTA president and CTIA CEO —
            reclassified broadband as a Title II telecommunications service,
            establishing enforceable net neutrality rules. Wheeler was a rare
            case of a revolving-door appointee who acted against industry
            interests, though his appointment was itself a product of the
            system: he had bundled $700,000 or more for Obama&apos;s campaigns.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The industry&apos;s response was swift and overwhelming. Between
            2008 and 2017, Comcast, AT&amp;T, Verizon, and NCTA spent $572
            million lobbying the FCC on broadband regulation. In 2017 alone, the
            telecom industry spent $110 million supporting net neutrality
            repeal, while proponents could muster only $39 million in defense —
            a nearly 3:1 spending disadvantage. A MapLight analysis found that
            for every single public comment filed on net neutrality, ISPs spent
            $100 on lobbying. On December 14, 2017, Pai&apos;s FCC voted to
            repeal net neutrality through the &ldquo;Restoring Internet
            Freedom&rdquo; order.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The FCC under Chairwoman Jessica Rosenworcel attempted to restore
            net neutrality, issuing the &ldquo;Safeguarding and Securing the
            Open Internet&rdquo; order on May 7, 2024, effective July 22, 2024.
            But the Sixth Circuit stayed the rule on August 1, 2024, citing the
            Supreme Court&apos;s Loper Bright decision — which had overturned
            Chevron deference just weeks earlier. On January 2, 2025, the Sixth
            Circuit unanimously struck down the 2024 order entirely, holding
            that broadband is an &ldquo;information service&rdquo; and the FCC
            had exceeded its statutory authority. The Loper Bright decision —
            the first major application of which killed net neutrality — has
            effectively made FCC reclassification impossible without new
            legislation from Congress. Net neutrality is dead, and the industry
            that killed it spent $572 million to do it.
          </p>

          {/* Net neutrality timeline */}
          <div className="my-12 space-y-4 border-l-4 border-accent pl-6">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                February 2015
              </div>
              <div className="mt-1 text-base font-semibold text-ink">
                FCC reclassifies broadband as Title II &mdash; net neutrality
                established
              </div>
            </div>
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                December 2017
              </div>
              <div className="mt-1 text-base font-semibold text-ink">
                Pai FCC repeals net neutrality &mdash; $110M in industry
                lobbying
              </div>
            </div>
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                May 2024
              </div>
              <div className="mt-1 text-base font-semibold text-ink">
                FCC restores net neutrality under Rosenworcel
              </div>
            </div>
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                August 2024
              </div>
              <div className="mt-1 text-base font-semibold text-ink">
                Sixth Circuit stays restoration &mdash; cites Loper Bright
              </div>
            </div>
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                January 2, 2025
              </div>
              <div className="mt-1 text-base font-semibold text-ink">
                Sixth Circuit kills net neutrality entirely &mdash; unanimously
              </div>
            </div>
          </div>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The $42.45 Billion Broadband Grab
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Broadband Equity, Access, and Deployment (BEAD) program — $42.45
            billion authorized under the 2021 Infrastructure Investment and Jobs
            Act — represents the largest federal investment in broadband
            infrastructure in American history. Its stated purpose is to bridge
            the digital divide. Its actual trajectory is a case study in how
            incumbents capture public funds. The industry spent $117 million in
            federal lobbying and $25 million more at the state level in 2023
            alone to influence how the money would be distributed. AT&amp;T,
            Comcast, Charter, and Verizon lobbied aggressively against rules
            requiring lower prices for low-income customers in exchange for BEAD
            funding. They lobbied against NTIA&apos;s prioritization of fiber,
            pushing instead for satellite and fixed wireless eligibility —
            technologies they already control. In June 2025, NTIA rescinded its
            previous guidance and gave states 90 days to integrate new
            requirements, effectively resetting the process to favor industry
            preferences.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Meanwhile, the Affordable Connectivity Program — which provided $30
            per month broadband subsidies to 23 million households — expired on
            June 1, 2024, after Congress failed to extend its $14.2 billion in
            funding. Twenty-three million households lost their broadband
            subsidy overnight. The telecom industry publicly supported extension
            while privately lobbying against the price and access requirements
            that would have accompanied it. The industry&apos;s preferred
            solution was to let the subsidy expire and capture the
            infrastructure money instead — a strategy that appears to be
            working.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Sixteen states still ban or restrict community-owned broadband
            networks — down from 19 at peak. These restrictions were seeded by
            ALEC&apos;s &ldquo;Municipal Telecommunications Private Industry
            Safeguards Act,&rdquo; a model bill designed to block local
            governments from building public broadband. Iterations passed in 19
            states. In North Carolina, six provisions in state law are nearly
            identical to the ALEC model. The town of Wilson, North Carolina,
            built a successful municipal fiber network and was specifically
            targeted by the resulting legislation. The FCC attempted to preempt
            these state laws in 2015 but failed — courts ruled the agency lacks
            authority to reallocate power between states and municipalities. The
            result: in states with these restrictions, municipalities cannot
            apply for federal BEAD grants, meaning the communities with the
            worst broadband access are legally barred from using public money to
            build alternatives.
          </p>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Media Consolidation &amp; the Death of Local News
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Telecommunications Act of 1996, signed by President Clinton on
            February 8, 1996, was sold as a measure to &ldquo;let anyone enter
            any communications business to compete in any market.&rdquo; Its
            actual effect was the most dramatic consolidation in media history.
            The Act eliminated the national ownership cap on commercial radio
            stations. Clear Channel — whose founder Lowry Mays personally
            lobbied Senator Bob Dole to insert the deregulation provision — grew
            from 40 stations to 1,240, a 30-fold increase that was previously
            illegal. The number of radio station owners dropped from 5,100 to
            3,800 within five years. Clear Channel later rebranded as
            iHeartMedia, which spent $4.47 million on lobbying in 2024 and
            carries Glenn Beck, Sean Hannity, Mark Levin, and other conservative
            programming through its Premiere Networks subsidiary.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Television consolidation followed the same trajectory. Sinclair
            Broadcasting, the second-largest TV station owner in America, sent
            97% of its executive contributions to Republicans in 2004 and 80% of
            its PAC money to Republicans in 2017-2018. The company forced local
            anchors to read scripted &ldquo;must-run&rdquo; segments and
            benefited from Trump-era FCC relaxation of ownership rules. In
            November 2025, Sinclair announced a hostile takeover of Scripps,
            spending $800,000 on lobbying that year — four times its 2023 level
            — focused on FCC ownership rules. Nexstar, the largest TV station
            owner, spent $3.2 million on lobbying in 2025 — ten times its
            2018-2023 annual average — while pursuing a $6.2 billion acquisition
            of Tegna. The company hired Jeff Miller, Trump&apos;s second
            inaugural committee finance chair, as a lobbyist for $510,000.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The casualties of consolidation are measured in deserts. As of 2025,
            213 U.S. counties have no local news source whatsoever — up from 206
            the prior year. Another 1,524 counties have only one remaining news
            source. Fifty million Americans have limited or no access to local
            news. Almost 40% of all local newspapers have vanished. More than
            270,000 newspaper jobs have been eliminated since 2005 — a 75%
            decline. One hundred thirty-six newspapers closed in the most recent
            year, a pace of more than two per week. Three hundred digital
            startups have launched in the past five years, but fewer than 10%
            serve rural counties. Local journalism — the foundation of
            democratic accountability — is being hollowed out while the
            companies that replaced it spend millions on lobbying to consolidate
            further.
          </p>

          {/* Local news stat grid */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-4">
            <div>
              <div className="font-headline text-3xl font-black text-money-out">
                213
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                News Desert Counties
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-money-out">
                50M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Americans Affected
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-money-out">
                ~40%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Local Papers Gone
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-money-out">
                270K+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Newspaper Jobs Lost
              </div>
            </div>
          </div>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Section 230 &amp; the Telecom-Tech Divide
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The battle over Section 230 of the Communications Decency Act
            reveals a rare fissure in the corporate lobbying consensus. The
            telecom industry generally supports Section 230 reform — Brendan
            Carr&apos;s Project 2025 chapter called for ending it — because
            telecoms want tech platforms held to the same regulatory standards
            they face. The tech industry spends enormous sums to preserve
            Section 230 protections: Big Tech spent $85.6 million on lobbying in
            2024, up from $68 million in 2023. Meta alone spent a record $24.4
            million — a 27% increase. Amazon spent $17.6 million. Google spent
            $12.1 million. ByteDance spent a record $10.4 million. From 2020 to
            2024, Meta, Alphabet, Microsoft, ByteDance, X, and Snap combined for
            $260 million in lobbying while publicly claiming to support reform.
            No Section 230 reform bill has become law despite dozens being
            introduced. The Graham-Durbin bill would sunset Section 230 on
            January 1, 2027, unless Congress enacts a replacement — but the same
            lobbying forces that have killed every previous bill remain fully
            deployed.
          </p>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Mega-Mergers &amp; the Regulatory Rubber Stamp
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The merger machine has reshaped the media and telecom landscape into
            an oligopoly. The Comcast-NBCUniversal merger in 2011 — a $30
            billion deal — was approved with 150 behavioral conditions, but
            Commissioner Baker&apos;s move to Comcast four months later cast a
            shadow over the process. The AT&amp;T-Time Warner merger in 2018 —
            $108.7 billion including debt — was challenged by the DOJ under
            circumstances that many on Wall Street attributed to Trump&apos;s
            personal animus toward CNN. AT&amp;T won without restrictions. The
            T-Mobile-Sprint merger in 2020, valued at $26.5 billion, was
            preceded by $17.2 million in lobbying and $195,000 in T-Mobile
            executive spending at Trump&apos;s D.C. hotel during the merger
            review. The Disney-Fox acquisition in 2019 — $71.3 billion — saw
            Trump congratulate Rupert Murdoch while simultaneously attacking the
            AT&amp;T-Time Warner deal over CNN. The pattern: mergers succeed
            when the political relationships are right, regardless of the
            competitive implications.
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION B: Real Estate & Housing                               */}
      {/* ============================================================== */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Home className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Research Topic #26
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Real Estate &amp; Housing Lobbying
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The National Association of Realtors is not merely the largest
            lobbying organization in the real estate industry. It is the single
            largest lobbying organization in America — period. In 2024, NAR
            spent $86.4 million on federal lobbying, surpassing the U.S. Chamber
            of Commerce ($76.3 million) and every other organization in the
            country. It was not the first time: NAR held the top spot in 2020
            and 2022 as well. Since 1998, NAR has spent $850 million or more on
            cumulative lobbying. Its total political spending in the 2024 cycle
            — including lobbying, direct contributions, and outside spending —
            reached $122.7 million. It operates one of the largest trade
            association PACs in the country (RPAC, founded 1969), which raised
            $19.8 million in the 2023-2024 cycle. Its congressional fund raised
            an additional $20.1 million. It spent $18.8 million on outside
            spending and $17.5 million in direct contributions.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The funding mechanism is both simple and coercive. NAR has 1.5
            million members, each of whom pays $156 in mandatory annual dues.
            Thirty-five percent of those dues — $55 per member, totaling $86.1
            million — is classified as nondeductible because it funds lobbying
            and political activity. Members cannot opt out. The largest lobbying
            operation in America is funded by a mandatory assessment on real
            estate agents, many of whom earn modest incomes. Seventy percent of
            RPAC contributions stay in-state for state and local races; 30% go
            to the national fund for federal races. This structure ensures that
            NAR&apos;s political influence extends from city council zoning
            decisions to federal tax policy.
          </p>

          {/* NAR spending stat grid */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-4">
            <div>
              <div className="font-headline text-3xl font-black text-money-out">
                $86.4M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                NAR Lobbying (2024)
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-money-out">
                $850M+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                NAR Lobbying (Since 1998)
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-accent">
                $122.7M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Total NAR Political (2024)
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-ink">
                1.5M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Mandatory Dues-Paying Members
              </div>
            </div>
          </div>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            In March 2024, NAR agreed to a $418 million antitrust settlement
            over allegations that it had conspired to inflate broker commissions
            — a practice that had cost home sellers billions. The settlement,
            finalized in November 2024, prohibited offers of broker compensation
            on the MLS and required buyers to sign written agreements outlining
            agent services and compensation. NAR&apos;s response was not
            contrition — it was a lobbying surge. In Q3 2024, the period between
            the settlement and the final ruling, NAR spent $47.9 million on
            lobbying — nearly matching some full-year totals. The Department of
            Justice successfully appealed to reopen its investigation into NAR
            in April 2024, reserving the right to take future action. NAR
            responded by deploying even more money to shape the implementation
            rules.
          </p>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            $280 Million to Crush Rent Control
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            California has become the primary battleground for the rent control
            wars, and the real estate industry has won every engagement through
            sheer financial force. Proposition 10 in 2018 sought to repeal the
            Costa-Hawkins Rental Housing Act, which prohibits local rent control
            on newer housing. The opposition spent $77.3 million — led by
            Blackstone Group, Essex Property Trust, and Equity Residential —
            against $26.2 million in support. The measure lost 59% to 41%.
            Proposition 21 in 2020, a scaled-back version allowing rent control
            on housing 15 years or older, saw opposition spending reach $83.6
            million against $40.9 million in support. It lost by approximately
            the same margin. Proposition 33 in 2024, which would have prohibited
            state limitations on local rent control, drew the most lopsided
            spending yet: $125 million in opposition against $48 million in
            support. The California Apartment Association and California
            Association of Realtors contributed $100 million of the $125 million
            opposition total. The measure lost with 59% opposition.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The California Apartment Association has spent $226 million
            defending Costa-Hawkins since 2018 — including $131 million in the
            2024 cycle alone. Three hundred fifty-five corporate and smaller
            landlords contributed $135.9 million to CAA&apos;s Issues Committee
            in 2023-2024. The industry&apos;s rent control opposition extends
            nationally: NAR stopped rent control efforts in Iowa and Delaware in
            2024, and the landlord lobby launched the multimillion-dollar
            &ldquo;More Housing Now!&rdquo; super PAC in Oregon to oppose rent
            control legislation. The real estate industry has spent $280 million
            across three California ballot cycles alone — all three measures
            defeated with virtually identical margins. The voters of California
            have been given a choice between rent relief and the most expensive
            opposition campaign in ballot measure history, and the money has won
            every time.
          </p>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Private Equity&apos;s Housing Takeover
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            In 2012, Blackstone founded Invitation Homes and began purchasing
            foreclosed single-family homes during the post-2008 crisis — roughly
            50,000 homes for approximately $10 billion, with an average $25,000
            per home in renovations. In 2017, Invitation Homes received a
            landmark 10-year, $1 billion loan from Wells Fargo guaranteed by
            Fannie Mae — the first government-backed securitization for
            institutional single-family rentals. The federal government was now
            backing Wall Street&apos;s purchase of the family home. Blackstone
            divested its stake in November 2019, earning approximately $7
            billion in profit — more than doubling its investment. It has since
            re-entered the market, acquiring Tricon Residential&apos;s 61,964
            homes to become the third-largest single-family rental operator.
            Invitation Homes now controls 85,000 rental homes across 16 markets
            and faces FTC enforcement for hidden fees and unjustly withholding
            security deposits.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Blackstone&apos;s political spending in the 2024 cycle totaled $48.6
            million in contributions plus $3.85 million in lobbying. Its
            anti-rent-control spending — $7 million or more to defeat
            California&apos;s Propositions 10 and 21 — came from pools of
            investor capital that included California public employee pension
            funds and University of California endowments. A UN Special
            Rapporteur wrote to Blackstone&apos;s CEO stating that the company
            uses &ldquo;significant resources and political leverage to
            undermine domestic laws and policies that would improve access to
            adequate housing.&rdquo; Nationally, firms owning 100 or more homes
            control approximately 1.4% of occupied single-family housing, but
            the concentration in Sun Belt markets is vastly higher: 25% of
            single-family homes in Atlanta, 21% in Jacksonville, 18% in
            Charlotte, 15% in Tampa. Hedge fund share of the single-family
            rental market is projected to grow from 5% in 2022 to 40% by 2030.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            In January 2026, Trump signed an executive order titled
            &ldquo;Stopping Wall Street from Competing with Main Street
            Homebuyers,&rdquo; directing agencies to prevent federal programs
            from facilitating sales of single-family homes to large
            institutional investors. Blackstone and Invitation Homes shares
            dropped immediately. But the order directed the Treasury Secretary
            to define &ldquo;large institutional investor&rdquo; within 30 days
            and HUD to issue guidance within 60 — leaving the definition, and
            therefore the enforcement, to an administration that received $48.6
            million from Blackstone in the preceding election cycle. Senate
            Democrats introduced competing legislation, but the structural
            incentives remain unchanged.
          </p>

          {/* PE in housing stat grid */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-4">
            <div>
              <div className="font-headline text-3xl font-black text-money-out">
                $48.6M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Blackstone Contributions (2024)
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-accent">
                85K
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Invitation Homes Rentals
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-ink">
                25%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Atlanta SFH (Institutional)
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-money-out">
                5%&rarr;40%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                SFR Hedge Fund Share (2022&rarr;2030)
              </div>
            </div>
          </div>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Friends of Angelo: The Pre-Crisis Bribery Machine
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Before the 2008 financial crisis, the mortgage industry built a
            bribery operation so brazen it was given a name. Countrywide
            Financial&apos;s &ldquo;Friends of Angelo&rdquo; program — named for
            CEO Angelo Mozilo — operated from 1991 to 2008, processing
            approximately 17,979 preferential loans to politicians and officials
            who regulated the mortgage industry. Benefits included 0.5
            percentage point rate reductions, waived junk fees averaging $350 to
            $400, expedited processing, and underwriting exceptions. The
            recipients included Senator Christopher Dodd, Chairman of the Senate
            Banking Committee; Senator Kent Conrad, Chairman of the Senate
            Budget Committee; HUD Secretary Alphonso Jackson; HHS Secretary
            Donna Shalala; and Fannie Mae CEO Franklin Raines. A 2009
            congressional report titled the scheme &ldquo;Countrywide&apos;s
            Systematic and Successful Effort to Buy Influence and Block
            Reform.&rdquo;
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Countrywide spent $8.7 million in political donations,
            contributions, and lobbying from 2002 to 2006. Ameriquest Mortgage
            spent $20.5 million over the same period explicitly to defeat
            anti-predatory lending legislation, according to the Wall Street
            Journal. Ameriquest founder Roland Arnall generated $12 million for
            Bush campaigns and political efforts while contributing $1.5 million
            to Governor Schwarzenegger and $271,200 to California AG Lockyer.
            Ameriquest paid a $325 million settlement with 49 state attorneys
            general for predatory lending. Between them, Countrywide and
            Ameriquest spent $29.2 million on political influence from 2002 to
            2006. During that same period, 16 pieces of federal anti-predatory
            lending legislation were introduced. Not a single one became law. An
            IMF study later found that lenders who lobbied on mortgage and
            securitization issues adopted significantly riskier lending
            strategies, and delinquency rates in 2008 were significantly higher
            in areas where lobbying lenders had expanded fastest. The financial
            industry then spent $2 billion or more fighting Dodd-Frank — $1
            billion to defeat it, $1 billion to weaken it after passage.
          </p>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Zoning, NIMBYism &amp; the Affordability Trap
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The housing affordability crisis is reinforced at the local level by
            a web of zoning restrictions defended by homeowner lobbying and
            NIMBY activism. Single-family-exclusive zoning benefits existing
            homeowners by restricting supply and inflating property values —
            creating a constituency with a direct financial interest in blocking
            affordable housing. In Michigan, 1,300 local government officials
            representing 6.2 million residents signed a letter opposing
            statewide density-focused zoning reform, arguing that state mandates
            strip local planning control. Local governments themselves spend
            millions annually through taxpayer-funded lobbying to defeat
            property tax and zoning reforms. The National Association of Home
            Builders actually supports zoning reform — advocating for
            higher-density developments and statewide preemption of exclusionary
            local zoning — placing it in rare disagreement with local government
            lobbies and some homeowner associations.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The broader finance, insurance, and real estate sector spent $636.4
            million on federal lobbying in 2024, an increase of $33.8 million
            over the prior year, as part of a record-breaking $4.4 billion total
            federal lobbying year. The real estate industry alone spent $91.2
            million, of which NAR accounted for 94.7%. The commercial real
            estate lobby secured major victories in the 2025 One Big Beautiful
            Bill Act: Opportunity Zones were made permanent, 100% bonus
            depreciation was restored for real estate assets acquired after
            January 19, 2025, and 1031 like-kind exchanges remained intact
            despite Biden&apos;s proposals to cap them at $500,000 per
            transaction. The Real Estate Roundtable, which spent $5.2 million on
            lobbying in 2024, continues to pursue its &ldquo;ultimate policy
            goal&rdquo; of full FIRPTA repeal. The system produces exactly what
            it is designed to produce: rising asset values for owners, rising
            costs for everyone else, and a regulatory apparatus that protects
            the former at the expense of the latter.
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION C: Agriculture & Food Industry                         */}
      {/* ============================================================== */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Wheat className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Research Topic #27
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Agriculture &amp; the Food Industry
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The American food system is a paradox of abundance and extraction.
            The United States produces more food than any nation on Earth, yet
            69% of its farms receive no subsidy payments. The top 10% of
            recipients collect 74% of all commodity subsidies. Four companies
            control 80% of the beef market. Three companies control 70% of
            agrochemicals and 60% of commercial seeds. The Farm Bill — the
            single largest piece of recurring legislation in American
            governance, reauthorized every five years — is shaped by $523
            million in industry lobbying while public interest groups are
            outspent 4 to 1. The system was not designed to feed people. It was
            designed to concentrate profit, and it functions precisely as
            intended.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Agribusiness lobbying has grown steadily and is now at record
            levels. In 2023, the sector spent $178 million on federal lobbying —
            a new record — with 1,300 or more registered lobbyists. This marked
            a 22% increase from the $145 million spent in 2019. The agribusiness
            sector contributed $124 million in campaign contributions during the
            2024 election cycle. The top Farm Bill lobbyists from 2019 to 2023
            included the U.S. Chamber of Commerce ($67 million), the
            Biotechnology Innovation Organization ($35 million), Bayer
            Corporation ($23 million), and the American Farm Bureau Federation
            and affiliates ($15.7 million). Approximately 75% of meat industry
            contributions go to Republicans.
          </p>

          {/* Ag spending stat grid */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-4">
            <div>
              <div className="font-headline text-3xl font-black text-money-out">
                $178M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Ag Lobbying (2023 Record)
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-money-out">
                $124M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Ag Contributions (2024)
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-accent">
                4:1
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Industry vs Public on Farm Bill
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-ink">
                1,300+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Registered Ag Lobbyists
              </div>
            </div>
          </div>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The Beef Monopoly &amp; Price-Fixing Machine
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The American beef industry operates as a functional oligopoly. JBS,
            Tyson Foods, Cargill, and National Beef Packing together control
            approximately 80-85% of the market. The consolidation has enabled
            coordinated pricing behavior that has already produced $140 million
            in settlements: JBS paid $52.5 million in 2022, Tyson and Cargill
            settled jointly for $87.5 million in 2025 ($55 million from Tyson,
            $32.5 million from Cargill). Plaintiff experts estimated total
            consumer damages at $1.9 billion. JBS USA and National Beef Packing
            remain in active litigation. In October 2024, McDonald&apos;s filed
            suit against all four companies, alleging price-fixing of beef since
            2015. The DOJ announced its own investigation into meatpacking
            companies in late 2025.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            JBS&apos;s political influence operation is a masterclass in
            transactional corruption. The company — whose founders, the Batista
            brothers, confessed in 2017 to bribing 1,900 Brazilian politicians
            and paid a $27 million U.S. anti-corruption settlement in 2020 —
            donated $5 million to Trump&apos;s 2025 inaugural committee through
            its subsidiary Pilgrim&apos;s Pride. The donation was five times
            what Meta or Amazon contributed, making it the single largest
            inaugural donation. Six months later, JBS began trading on the New
            York Stock Exchange. The SEC listing was approved within two days of
            Trump appointee Paul Atkins becoming SEC Chair. The meat industry
            has spent $97 million on federal lobbying since 1998 and $27 million
            in campaign contributions since 1990. Representative Andy Harris
            introduced an appropriations bill to eliminate all enforcement of
            the USDA&apos;s new poultry transparency ruling. The Meat Institute
            president sent a letter to the Trump White House seeking rollback of
            Clean Water Act enforcement, salmonella inspections, and equity
            provisions in the Packers and Stockyards Act.
          </p>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Bayer-Monsanto: $66 Billion Merger, $11 Billion in Lawsuits
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The seed and chemical industry underwent a staggering consolidation
            between 2017 and 2018. Bayer acquired Monsanto for $66 billion.
            ChemChina acquired Syngenta for $43 billion. Dow and DuPont merged
            then split into Corteva Agriscience, Dow, and DuPont. The result:
            where six companies once controlled two-thirds of global pesticide
            and seed markets, three to four now hold the same share. Three
            companies control approximately 70% of agrochemicals. Three
            companies control approximately 60% of commercial seeds. Bayer alone
            controls more than 25% of the global seed and pesticides market.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Roundup litigation is the most consequential product liability
            fight in modern agriculture. Bayer-Monsanto has paid $11 billion or
            more to approximately 100,000 plaintiffs alleging that Roundup
            (glyphosate) caused cancer. More than 63,000 additional lawsuits are
            pending. A proposed class settlement of $7.25 billion is under
            consideration. In March 2025, a Georgia jury returned a $2.1 billion
            verdict. In October 2024, a Philadelphia jury returned a $78 million
            verdict. Rather than accept liability and reformulate, Bayer has
            escalated its lobbying operation. In 2025, Bayer spent $9.19 million
            or more on lobbying with 49 lobbyists across 13 firms, up from $8.47
            million in 2024 and $7.45 million in 2023. The company is seeking
            Farm Bill language that would create federal preemption to block
            state failure-to-warn lawsuits — effectively making it illegal for
            states to require cancer warnings on products that have produced
            $2.1 billion jury verdicts.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            At the state level, Bayer has made progress. North Dakota and
            Georgia have signed pesticide immunity laws. The company lobbied in
            Idaho, Iowa, and Missouri for similar legislation in 2024, paying
            $123,250 in Iowa alone in 2025. Trump invoked the Defense Production
            Act to promote domestic glyphosate production, potentially granting
            manufacturer immunity — described by industry observers as a
            &ldquo;watershed moment&rdquo; for pesticides. The FTC has
            separately sued Syngenta and Corteva for an illegal pay-to-block
            scheme using loyalty programs that required distributors to source
            85-99% of products from the two companies, blocking generic
            competitors. Discovery continued throughout 2025, with the Trump
            administration and 12 states seeking an October trial date. The
            chemical industry&apos;s capture of the EPA is advanced: under
            Trump, the EPA chemical regulation office is headed by two former
            American Chemistry Council lobbyists and one former American Soybean
            Association lobbyist.
          </p>

          {/* Bayer-Monsanto stat grid */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-4">
            <div>
              <div className="font-headline text-3xl font-black text-money-out">
                $66B
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Bayer-Monsanto Merger
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-money-out">
                $11B+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Roundup Settlements
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-accent">
                63K+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Pending Lawsuits
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-ink">
                $9.19M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Bayer Lobbying (2025)
              </div>
            </div>
          </div>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            SNAP, Subsidies &amp; the Farm Bill&apos;s Real Beneficiaries
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Farm Bill is the most consequential piece of recurring
            legislation in American government, and its internal politics reveal
            whose interests the system actually serves. Approximately 81% of
            Farm Bill mandatory spending goes to the Nutrition title — primarily
            SNAP (food stamps), which cost roughly $100 billion in 2024 and
            accounts for about 50% of the entire USDA budget and 70% of all
            federal food assistance spending. SNAP feeds tens of millions of
            Americans. The 2025 budget reconciliation reduced federal nutrition
            spending by $186.5 billion over 10 years, expanded work requirements
            to adults up to age 64 (from 54), and imposed 5% state cost sharing
            starting October 2027. The industry lobbied for these cuts to the
            nutrition title while simultaneously lobbying for increased crop
            insurance and commodity subsidies for the largest agricultural
            operations.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The subsidy system is a monument to captured redistribution. In
            2024, commodity payments totaled $9.3 billion. From 2021 to 2023,
            taxpayer-funded farm support totaled $55.2 billion across three
            program types. The top 10% of recipients collect approximately 74%
            of all commodity subsidies. Sixty-nine percent of U.S. farms receive
            nothing. The concentration at the top is extraordinary: 10,249
            recipients received farm subsidies every single year for 39
            consecutive years (1985-2023), collecting $11.18 billion — an
            average of $1.09 million each. The top 10 individuals collected $9
            to $20 million each over that period. Corn alone accounted for $3.2
            billion in subsidies in 2024, or 30.5% of all subsidy payments.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The sugar program stands as the most politically protected subsidy
            in American agriculture. It costs taxpayers zero on paper —
            operating as a loan program — but costs consumers $3.5 billion or
            more annually through artificially inflated prices. The Fanjul
            brothers, Alfonso and Jose &ldquo;Pepe&rdquo; Fanjul, own the
            world&apos;s largest cane sugar refiner (Domino, Florida Crystals
            brands). Pepe Fanjul is a close Trump ally. Sugar industry PACs
            spent $7.5 million or more in the 2024 cycle. The industry deployed
            former House Agriculture Committee Chairman Collin Peterson as a
            lobbyist. The Republican Study Committee called for elimination of
            sugar protections in 2016, softened to &ldquo;phasing out&rdquo; in
            2019, then endorsed the industry&apos;s own alternative plan by
            2024. Federal crop insurance cost taxpayers $17.3 billion in 2022,
            with the government paying approximately 61% of premiums on average
            and providing additional administrative subsidies to private
            insurance companies.
          </p>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Trade Wars &amp; Taxpayer Bailouts
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Trump&apos;s trade wars have cost American agriculture billions in
            lost exports — and the bailouts have disproportionately enriched the
            largest operations. The Market Facilitation Program (MFP), created
            to compensate farmers for lost exports from Chinese tariff
            retaliation, distributed $23-28 billion from 2018 to 2020. The top
            1% of recipients received an average of $177,000 each. The bottom
            80% received an average of $5,136. The top half collected 95% of
            total payments. Farm subsidy payments ballooned from $4 billion in
            2017 to more than $20 billion in 2020. In December 2025, the Trump
            administration announced an additional $12 billion in
            &ldquo;one-time bridge payments&rdquo; — bringing the total trade
            war bailout to $35-40 billion.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The damage to agricultural exports is ongoing. The U.S. share of
            Chinese soybean imports fell from 49% in 2012 to 27% in 2024.
            Chinese imports of U.S. agriculture dropped from $42.8 billion in
            2022 to $29.25 billion in 2024. In March 2025, China let export
            licenses for hundreds of U.S. beef facilities expire, causing
            monthly beef exports to China to fall more than 90%. China hiked
            tariffs on almonds to 45%. Soybean production losses are projected
            at $3.6-5.9 billion annually. Forty-eight percent of farmers
            surveyed in December 2024 said U.S. agriculture was
            &ldquo;likely&rdquo; or &ldquo;very likely&rdquo; at risk of a trade
            war significantly decreasing exports. The cycle is self-reinforcing:
            the trade war creates the losses, the bailouts create the
            dependency, and the lobbying ensures the bailout money flows to the
            operations that least need it.
          </p>

          {/* Trade war stat grid */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-4">
            <div>
              <div className="font-headline text-3xl font-black text-money-out">
                $35-40B
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Total Trade War Bailouts
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-accent">
                $177K
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Top 1% Avg MFP Payment
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-ink">
                $5,136
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Bottom 80% Avg MFP Payment
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-money-out">
                49%&rarr;27%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                U.S. Share of China Soybeans
              </div>
            </div>
          </div>

          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            PFAS, Ag-Gag Laws &amp; the Food Industry vs. MAHA
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The chemical contamination of the American food supply is being
            defended by the same lobbying apparatus that protects every other
            form of agricultural monopoly. PFAS — &ldquo;forever
            chemicals&rdquo; linked to cancer, heart damage, hormone disruption,
            liver and thyroid problems, immune suppression, reproductive issues,
            and abnormal fetal development — are the subject of intense industry
            lobbying to prevent regulation. The American Chemistry Council spent
            $600,000 on PFAS lobbying in 2024 alone. Under Trump, the EPA
            chemical regulation office is staffed by former industry lobbyists,
            and the agency has proposed five PFAS-based pesticides for
            registration in less than a year — two already finalized — for use
            on tomatoes, peas, lettuce, and other food crops. Five hundred pages
            of FOIA documents detail industry efforts to gut federal PFAS
            regulations.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Ag-gag laws — state laws criminalizing undercover filming on farms —
            represent the industry&apos;s effort to prevent the public from
            seeing how its food is produced. Multiple states have enacted these
            laws, including Iowa, Utah, North Carolina, Kansas, Montana, and
            North Dakota. Kentucky passed a new ag-gag law in 2024. South Dakota
            introduced legislation in 2025 prohibiting &ldquo;deception to gain
            access to or employment at an agricultural facility.&rdquo; Courts
            have struck down several of these laws: the Fourth Circuit ruled
            that undercover investigations are protected newsgathering under the
            First Amendment, and a U.S. District Court ruled Iowa&apos;s latest
            ag-gag law unconstitutional. But the industry continues to push new
            versions in every legislative session. The same companies that fix
            prices, contaminate water supplies, and lobby against safety
            regulations are also lobbying to make it illegal for journalists to
            document what they do.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The food industry&apos;s confrontation with RFK Jr.&apos;s Make
            America Healthy Again (MAHA) movement has produced a surge in
            lobbying spending. Coca-Cola spent $4.93 million on lobbying in
            2024. McDonald&apos;s spent $2.95 million. The American Beverage
            Association doubled its spending to $1.7 million in the first half
            of 2025. A new industry front group — Americans for Ingredient
            Transparency, backed by Coca-Cola, Kraft Heinz, and Nestl&eacute; —
            is pushing for national labeling preemption laws that would override
            state food safety regulations. The industry argues that MAHA
            regulations will raise food prices, betting that affordability
            concerns will override health concerns. Major food and beverage
            lobbying groups have sued states over food safety regulations. The
            USDA announced the first-ever added sugar limits in school meals in
            2024 — breakfast cereals capped at 6 grams per dry ounce, yogurt at
            2 grams per ounce, flavored milk at 10 grams per 8 fluid ounces —
            with gradual implementation from Fall 2025 through Fall 2027. The
            food industry claimed the standards were too severe and would cause
            food waste while spending millions to water them down.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Farmworker protections remain a regulatory blind spot.
            Farmworkers&apos; toxic chemical exposure does not fall under OSHA
            jurisdiction like virtually all other American workers — an
            exclusion the agricultural industry actively lobbies to maintain.
            CropLife America, the American Farm Bureau, and allied organizations
            lobby against enhanced pesticide and worker safety regulations. OSHA
            proposed a heat protection rule in August 2024, but implementation
            remains uncertain. The 2024 Farm Bill included provisions making it
            harder for states to regulate pesticides and blocking individuals
            from seeking compensation for chemical harm. The ethanol industry
            adds another dimension: the Renewable Fuel Standard mandates
            approximately 15 billion gallons of biofuels annually, with the corn
            ethanol lobby spending $1.12 million in 2024 through the Renewable
            Fuels Association alone, within a broader renewable energy lobbying
            ecosystem of $64.9 million and 681 lobbyists. The industry&apos;s
            influence was historically amplified by Iowa&apos;s
            first-in-the-nation caucus status, with nine or more presidential
            candidates visiting ethanol factories in 2016 — though Iowa&apos;s
            loss of the Democratic first primary to South Carolina has
            diminished this leverage.
          </p>
        </div>
      </section>

      {/* Methodology note */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
          <div className="rounded-xl border border-border bg-paper p-8">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Methodology &amp; Data Sources
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Telecom lobbying data is sourced from OpenSecrets federal lobbying
              disclosures, FCC filings, and the Common Cause/CWA
              &ldquo;Broadband Gatekeepers&rdquo; report (2021). Net neutrality
              timeline references FCC docket records, Sixth Circuit rulings
              (Ohio Telecom Ass&apos;n v. FCC, January 2, 2025), and the Supreme
              Court&apos;s Loper Bright decision (June 2024). Revolving door
              data references FCC biographical records, OpenSecrets revolving
              door database, and corporate press releases. BEAD program data is
              from NTIA obligated funds records (December 23, 2024). Local news
              desert statistics reference the Northwestern Medill School State
              of Local News reports (2024-2025). Real estate lobbying data is
              from OpenSecrets, including NAR, Blackstone Group, and NAHB
              profiles. Rent control spending data references Ballotpedia
              (California Propositions 10, 21, 33), LA Public Press, and Housing
              Is A Human Right campaign finance analysis. Private equity housing
              data references the 2024 GAO Report (GAO-24-106643) on
              institutional investment in single-family homes. Countrywide data
              references the 2009 U.S. House Oversight Committee report
              &ldquo;Friends of Angelo.&rdquo; Agriculture lobbying data is from
              OpenSecrets and the Union of Concerned Scientists
              &ldquo;Cultivating Control&rdquo; report. Beef price-fixing
              settlement data references federal court records (2022-2025). Farm
              subsidy distribution data references the Environmental Working
              Group Farm Subsidy Database and USAFacts. Trade war data
              references USDA Economic Research Service and Farm Policy News
              (University of Illinois). PFAS lobbying data references NOTUS FOIA
              documents and Civil Eats reporting. All aggregated numbers are for
              editorial context and should be verified against primary sources
              for academic citation.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter navigation */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/guide/corruption-and-reform"
              className="group flex items-center gap-4 rounded-xl border border-border bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <ArrowLeft className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-ink" />
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Previous: Chapter 7
                </div>
                <div className="mt-1 font-headline text-lg font-bold text-ink">
                  Corruption &amp; Reform
                </div>
              </div>
            </Link>
            <Link
              href="/guide/the-tax-code-and-education"
              className="group flex items-center justify-end gap-4 rounded-xl border border-border bg-paper p-6 text-right transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Next: Chapter 9
                </div>
                <div className="mt-1 font-headline text-lg font-bold text-ink">
                  The Tax Code &amp; Education
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
          <Flag className="mx-auto h-10 w-10 text-accent-light" />
          <h2 className="mt-6 font-headline text-3xl font-black tracking-tight lg:text-4xl">
            Follow the Money That Shapes Your Life
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/60">
            Your broadband bill, your rent payment, your grocery receipt — each
            one reflects the lobbying investments documented in this chapter.
            The Ledger&apos;s tools let you trace the connections from industry
            spending to the policies that set prices in your daily life.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/40">
            Monopoly pricing survives on regulatory capture. Accountability
            begins when the ledger is open.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/money-flow"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-white/90"
            >
              <BarChart3 className="h-4 w-4" />
              Explore Money Flows
            </Link>
            <Link
              href="/roi"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <Calculator className="h-4 w-4" />
              ROI Calculator
            </Link>
            <Link
              href="/trades"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <TrendingUp className="h-4 w-4" />
              Trades Tracker
            </Link>
          </div>
          <div className="mt-10 border-t border-white/10 pt-10">
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white/50 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to The Field Guide
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
