import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Scale,
  Gavel,
  Map,
  Vote,
  FileText,
} from "lucide-react";
import { ScrollytellSection } from "@/components/stories/ScrollytellSection";
import type { ScrollytellStep } from "@/components/stories/ScrollytellSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courts, Maps & Ballots — The Ledger",
  description:
    "Chapter 5 of The Field Guide to American Corruption. How $157M in judicial election spending, $30M in redistricting dark money, and $1.32B in ballot measure campaigns buy justice, lock in minority rule, and veto the will of voters.",
};

const SCROLLYTELL_STEPS: ScrollytellStep[] = [
  {
    id: "buying-the-bench",
    title: "Buying the Bench",
    body: "It starts with the courts. In 2023-24, spending on state supreme court elections hit $157.3 million \u2014 35% more than any prior cycle. For the first time in history, interest groups outspent the candidates themselves, accounting for 54% of all spending. These are not campaign donations. They are investments in judicial outcomes \u2014 and the investors expect returns. Academic research confirms what common sense suggests: Ohio judges voted in favor of their contributors 70% of the time. Every additional dollar from business interests corresponded to an increased probability of voting for business litigants. Forty-six percent of judges acknowledge that campaign money influences their decisions.",
    stat: {
      value: "$157.3M",
      label: "Judicial Election Spending (2023\u201324)",
      color: "accent",
    },
    highlightColor: "#d97706",
  },
  {
    id: "the-leo-network",
    title: "The Leonard Leo Machine",
    body: "One man\u2019s network has reshaped the entire federal judiciary. Leonard Leo, co-chairman of the Federalist Society, raised over $600 million between 2014 and 2020 to fund judicial confirmation campaigns and conservative legal infrastructure. The results: 86% of Trump\u2019s circuit and Supreme Court appointees are Federalist Society members. Six of nine sitting justices. The network\u2019s crown jewel is the Marble Freedom Trust, which received a $1.65 billion donation from electronics magnate Barre Seid \u2014 the largest known political advocacy donation in U.S. history. Seid structured the gift to avoid approximately $400 million in taxes. The Judicial Crisis Network, now called the Concord Fund, spent $7 million blocking Merrick Garland and $10 million each confirming Gorsuch, Kavanaugh, and Barrett \u2014 funded almost entirely by two donors.",
    stat: {
      value: "$1.65B",
      label: "Largest Political Donation in U.S. History",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
  {
    id: "caperton-precedent",
    title: "The $3 Million Justice",
    body: "The corruption is not theoretical. In Caperton v. A.T. Massey Coal Co. (2009), Don Blankenship spent $3 million electing Brent Benjamin to the West Virginia Supreme Court. Justice Benjamin then refused to recuse himself and cast the deciding vote to overturn a $50 million verdict against Blankenship\u2019s company. The Supreme Court ruled 5\u20134 that Benjamin\u2019s participation violated due process \u2014 but set the bar for recusal so high that it has been effectively meaningless since. In Wisconsin, spending escalated from $51 million in 2023 to over $100 million in 2025 \u2014 some estimates reaching $144.5 million when Elon Musk\u2019s petition signature payments are included. A single state supreme court seat now costs more than most congressional races.",
    stat: {
      value: "$100M+",
      label: "Wisconsin Supreme Court (2025)",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
  {
    id: "redmap",
    title: "REDMAP: $30 Million to Redraw America",
    body: "In 2010, the Republican State Leadership Committee launched REDMAP \u2014 the Redistricting Majority Project. The investment: $30 million. The return: 21 state legislative chambers flipped, 680+ seats gained, and a decade of locked-in power. In 2012, Republicans retained the U.S. House by 33 seats despite receiving over one million fewer total votes than Democrats nationwide. The donors who made it possible read like a Fortune 500 board: Walmart, Pfizer, Devon Energy, AT&T, Altria, and Koch-affiliated organizations. Democrats responded in 2017 when Eric Holder founded the NDRC, raising $35 million by 2018. The result, according to The New York Times: the fairest maps in 40 years. But the damage from a decade of gerrymandered representation \u2014 in legislation passed, courts packed, regulations gutted \u2014 cannot be undrawn.",
    stat: {
      value: "680+",
      label: "State Seats Flipped by REDMAP",
      color: "money-in",
    },
    highlightColor: "#16a34a",
  },
  {
    id: "precision-gerrymandering",
    title: "Census-Block Precision",
    body: "Modern gerrymandering is no longer an art \u2014 it is a science. Mapmakers now draw districts at census-block precision, using voter files, consumer data, and demographic modeling to sort voters with surgical accuracy. Thomas Hofeller, the Republican Party\u2019s chief redistricting strategist, left behind over 70,000 files after his death \u2014 and they proved that racial demographics were used as a primary factor in drawing districts. In Rucho v. Common Cause (2019), the Supreme Court ruled 5\u20134 that partisan gerrymandering is non-justiciable in federal courts, effectively removing the only federal check on the practice. Competitive districts have declined 42% as a result. In Texas in 2025, a Trump-urged redistricting plan targeted five Democratic seats; the Supreme Court stayed the lower court\u2019s ruling 6\u20133, allowing the maps to proceed.",
    stat: {
      value: "42%",
      label: "Decline in Competitive Districts",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
  {
    id: "ballot-measure-industry",
    title: "The Ballot Measure Industrial Complex",
    body: "When corporations cannot buy a legislature, they buy the ballot. Total spending on ballot measures hit a record $1.32 billion in 2024, up from $1.01 billion in 2016. California alone accounts for 50\u201365% of all ballot measure spending nationally. Uber, DoorDash, and Lyft spent a combined $160 million on Proposition 22 to exempt gig workers from employment protections \u2014 it passed. DaVita and Fresenius spent $204 million across two cycles to block dialysis clinic regulation. Pharmaceutical companies spent $109 million to defeat California\u2019s Prop 61 on drug pricing. The real estate industry poured $280 million into defeating three rent control measures \u2014 all three lost. Academic research confirms what the spending data suggests: opposition money is more effective at defeating ballot measures than supporting them, with a 5\u20138 point status quo bias baked into the system.",
    stat: {
      value: "$1.32B",
      label: "Ballot Measure Spending (2024, Record)",
      color: "accent",
    },
    highlightColor: "#d97706",
  },
];

export default function CourtsMapsAndBallotsPage() {
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
            <span className="text-accent-light">Chapter 5</span>
          </nav>

          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
            Chapter 5 &middot; The Field Guide to American Corruption
          </div>

          <h1 className="mt-6 font-headline text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl xl:text-8xl">
            Courts, Maps
            <br />
            &amp; Ballots
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70 lg:text-2xl">
            Billionaires buy judicial seats, gerrymanders lock in minority rule,
            and corporate money floods ballot measures to{" "}
            <span className="font-semibold text-white">
              veto the will of voters
            </span>
            .
          </p>

          <div className="mt-8 flex items-center gap-6 text-sm text-white/50">
            <time dateTime="2026-03-11">March 11, 2026</time>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>22 min read</span>
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
            The machinery of American corruption does not stop at the lobbying
            firm or the campaign contribution. It extends into the courtrooms
            where judges are elected with corporate money, into the back offices
            where politicians redraw district lines to choose their own voters,
            and onto the ballots where billion-dollar industries spend whatever
            it takes to override the democratic process itself. In
            2023&ndash;24, outside interest groups outspent judicial candidates
            for the first time in history. A single state supreme court race in
            Wisconsin attracted more than $100 million. And in the 2024 cycle,
            corporations spent a record $1.32 billion on ballot measures &mdash;
            deploying war chests that dwarf entire congressional campaigns to
            defeat policies that voters overwhelmingly support.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            This chapter documents three interconnected systems of capture.
            First, how dark money networks &mdash; led by Leonard Leo&apos;s
            $600 million judicial empire &mdash; have reshaped the federal and
            state judiciary from the Supreme Court down. Second, how precision
            gerrymandering, pioneered by operatives like Thomas Hofeller and
            funded by $30 million in corporate donations, locked in a decade of
            minority rule after 2010. And third, how the ballot measure &mdash;
            originally designed as a tool of direct democracy &mdash; has been
            co-opted by industries that spend hundreds of millions to veto the
            public will on drug prices, rent control, gig worker protections,
            and healthcare regulation.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The thread connecting these systems is straightforward: when
            corporations and wealthy donors cannot buy the legislature, they buy
            the courts. When they cannot buy the courts, they redraw the maps.
            When they cannot redraw the maps, they flood the ballot. Every exit
            is covered. Every democratic safeguard has a price.
          </p>
        </div>
      </section>

      {/* Scrollytelling section */}
      <ScrollytellSection
        headline="How Money Buys Justice at Every Level"
        subhead="From Supreme Court nominations to state judicial elections to gerrymandered maps to corporate ballot measure campaigns &mdash; trace the money through every layer of American democracy."
        steps={SCROLLYTELL_STEPS}
        bgColor="bg-ink"
        textColor="text-white"
      />

      {/* Pull quote break */}
      <section className="border-y-4 border-ink bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
          <blockquote className="text-center">
            <p className="font-headline text-3xl font-black leading-tight tracking-tight text-ink lg:text-4xl">
              &ldquo;Not only is justice blind &mdash; she has been bought.
              Forty-six percent of state judges say campaign contributions
              influence their decisions. The other fifty-four percent declined
              to admit it.&rdquo;
            </p>
            <cite className="mt-6 block font-mono text-sm font-bold uppercase tracking-widest text-muted">
              The Ledger Analysis, Judicial Election Data 2015&ndash;2024
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Section 1: Judicial Elections & Court Capture */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Gavel className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Dimension I
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Judicial Elections &amp; Court Capture
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The United States is one of the few countries in the world where
            judges are elected &mdash; and the consequences of that design
            choice have become catastrophic. Spending on state supreme court
            elections has surged from $79 million in 2015&ndash;16 to $97
            million in 2019&ndash;20 to $157.3 million in 2023&ndash;24, a
            doubling in less than a decade. But the most alarming shift is not
            the total &mdash; it is who is spending it. In 2023&ndash;24,
            interest groups accounted for 54% of all judicial election spending,
            the first time outside organizations outspent the candidates
            themselves. The bench is no longer elected by voters. It is
            purchased by interests.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The numbers from individual races are staggering. The 2025 Wisconsin
            Supreme Court election between Susan Crawford and Brad Schimel
            attracted over $100 million in spending &mdash; some estimates
            reaching $144.5 million when Elon Musk&apos;s petition signature
            payments are included. This followed the 2023 Wisconsin race between
            Janet Protasiewicz and Daniel Kelly, which cost $51 million and
            shattered the state&apos;s prior record by a factor of five. These
            are not outliers. They are the new baseline for any state supreme
            court seat that could affect abortion access, redistricting, voting
            rights, or corporate regulation.
          </p>

          {/* Inline stat callout grid */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                $79M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Judicial Spending (2015&ndash;16)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                $157.3M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Judicial Spending (2023&ndash;24)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-out">
                54%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                From Interest Groups
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            The Leonard Leo network is the most consequential force in modern
            judicial politics. Leo, co-chairman of the Federalist Society,
            raised over $600 million between 2014 and 2020 to fund judicial
            confirmation campaigns and conservative legal infrastructure. The
            results speak for themselves: 86% of Trump&apos;s circuit court and
            Supreme Court appointees are Federalist Society members. Six of nine
            sitting Supreme Court justices. The network&apos;s financial
            architecture is designed for opacity. The Marble Freedom Trust
            received a $1.65 billion donation from Barre Seid &mdash; the
            largest known political advocacy donation in U.S. history &mdash;
            structured to avoid approximately $400 million in capital gains
            taxes. The Judicial Crisis Network, now operating as the Concord
            Fund, spent $7 million blocking Merrick Garland&apos;s nomination
            and $10 million each to confirm Neil Gorsuch, Brett Kavanaugh, and
            Amy Coney Barrett. Its $48.1 million in annual revenue comes from
            nearly all from two donors whose identities remain undisclosed.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The academic evidence on what this money buys is unequivocal. A
            study of Ohio Supreme Court decisions found that justices voted in
            favor of their campaign contributors 70% of the time. Every
            additional dollar received from business interests corresponded to
            an increased probability of ruling in favor of business litigants.
            In Caperton v. A.T. Massey Coal Co., Don Blankenship spent $3
            million electing a single West Virginia justice who then cast the
            deciding vote to overturn a $50 million verdict against
            Blankenship&apos;s company. The U.S. Supreme Court ruled 5&ndash;4
            that this violated due process &mdash; but set the recusal standard
            so high that it has produced almost no subsequent disqualifications.
            The message to donors was clear: the investment works.
          </p>
        </div>
      </section>

      {/* Section 2: Gerrymandering & Redistricting Money */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Map className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Dimension II
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Gerrymandering &amp; Redistricting Money
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            Every ten years, after the census, America redraws its political
            maps. In most states, the politicians who benefit from the maps are
            the same ones drawing them. The result is a system in which elected
            officials choose their voters rather than the reverse. In 2010, the
            Republican State Leadership Committee executed REDMAP &mdash; the
            Redistricting Majority Project &mdash; a $30 million campaign to
            flip state legislatures in time for the redistricting cycle. The
            investment yielded 21 flipped chambers and over 680 state
            legislative seats. Two years later, Republicans retained the U.S.
            House of Representatives by 33 seats despite receiving more than one
            million fewer total votes than Democratic candidates nationwide.
            Thirty million dollars had purchased a decade of structural power.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The corporate donors behind REDMAP included Walmart, Pfizer, Devon
            Energy, AT&amp;T, Altria, and Koch-affiliated organizations &mdash;
            companies with direct financial interests in the regulatory outcomes
            that the gerrymandered legislatures would control. Democrats
            responded in 2017, when former Attorney General Eric Holder founded
            the National Democratic Redistricting Committee, which raised $35
            million by 2018. The result, according to The New York Times, was
            &ldquo;the fairest maps in 40 years.&rdquo; But a decade of
            legislation passed under gerrymandered maps &mdash; from voter ID
            laws to regulatory rollbacks to judicial appointments &mdash; cannot
            be un-legislated by redrawing lines.
          </p>

          {/* Inline stat callout grid */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                $30M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                REDMAP Investment
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-in">
                680+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                State Seats Flipped
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-out">
                42%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Competitive District Decline
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            The technology of gerrymandering has evolved from back-of-napkin
            sketches to census-block-level precision. Thomas Hofeller, the
            Republican Party&apos;s chief redistricting strategist for two
            decades, pioneered the use of granular demographic and voter data to
            draw maps with surgical efficiency. After his death in 2018,
            investigators discovered over 70,000 files on his hard drives
            &mdash; and they proved that racial demographics had been used as a
            primary criterion in drawing congressional districts. In Rucho v.
            Common Cause (2019), the Supreme Court ruled 5&ndash;4 that partisan
            gerrymandering claims are non-justiciable in federal courts,
            effectively removing the only federal check on the practice. Chief
            Justice Roberts acknowledged that &ldquo;excessive partisanship in
            districting leads to results that reasonably seem unjust&rdquo; but
            concluded the courts could not fix it.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Dark money has flooded the redistricting fight at every level. The
            Sixteen Thirty Fund, a liberal conduit, has received $245 million
            from Swiss billionaire Hansjorg Wyss since 2016 and distributed $130
            million across more than 25 ballot measures related to redistricting
            and voting rights. California&apos;s Proposition 50 in 2025
            attracted $215 million in total spending, with Governor Newsom alone
            contributing $120 million. In Texas, a Trump-urged redistricting
            plan targeting five Democratic seats was stayed by the Supreme Court
            6&ndash;3 in 2025 &mdash; a rare intervention that underscored the
            extremity of the gerrymander. The competitive district has become an
            endangered species: 42% of the decline in competitive House races is
            attributable to gerrymandering. When politicians draw their own
            maps, they draw themselves into permanent power.
          </p>
        </div>
      </section>

      {/* Section 3: Ballot Measure Corporate Spending */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Vote className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Dimension III
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Ballot Measure Industrial Complex
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The ballot initiative was designed as a safety valve &mdash; a way
            for citizens to bypass captured legislatures and enact policy
            directly. It has been co-opted into a corporate weapon. Total
            spending on ballot measures has climbed from $1.01 billion in 2016
            to $1.19 billion in 2018 to $1.24 billion in 2020 to $1.10 billion
            in 2022 to a record $1.32 billion in 2024. The money does not come
            from grassroots donors. It comes from industries facing regulation
            &mdash; and they spend whatever it takes to kill measures that
            threaten their bottom line.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The most expensive ballot measures in American history tell the
            story. California&apos;s Proposition 27 on sports betting attracted
            $407 million and was defeated. Proposition 22, the gig economy
            measure, cost $225 million &mdash; Uber contributed $59.5 million,
            DoorDash $52 million, Lyft $49 million &mdash; and it passed,
            exempting app-based drivers from labor protections. Florida&apos;s
            Amendment 3 on marijuana legalization drew $187 million and was
            defeated. California&apos;s Proposition 33 on rent control attracted
            $175 million and was defeated. In each case, the industry side
            outspent its opponents by margins of 3:1 or greater. The ballot
            measure is no longer a tool of direct democracy. It is an auction.
          </p>

          {/* Inline stat callout grid */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                $1.32B
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Ballot Measure Spending (2024)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                $225M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Prop 22 (Gig Workers)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-out">
                $204M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                DaVita &amp; Fresenius (Dialysis)
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            The pharmaceutical industry has been particularly aggressive. Drug
            companies spent $109 million to defeat California&apos;s Proposition
            61, which would have capped state drug prices at the level paid by
            the Veterans Administration. In Ohio, pharma deployed $59.1 million
            to crush Issue 2 &mdash; and succeeded by a margin of 79.5%. The
            dialysis industry has invested $204 million across Propositions 8
            and 23 to block clinic staffing and regulation requirements. The
            real estate industry has spent over $280 million across three rent
            control ballot measures in California &mdash; all three were
            defeated. The pattern is consistent: concentrated corporate money
            overwhelms diffuse public support.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Even the mechanics of ballot access have been monetized. The cost of
            gathering a single valid signature has climbed from $6.93 in 2016 to
            $14.87 in 2024 &mdash; a 120% increase. Total spending on signature
            gathering reached $172 million in the 2024 cycle. California alone
            accounts for 50&ndash;65% of all ballot measure spending nationally,
            making the state&apos;s initiative process a de facto proving ground
            for corporate political strategy. Academic research confirms the
            structural advantage: opposition money is more effective at
            defeating ballot measures than passing them, with a built-in status
            quo bias of 5&ndash;8 percentage points. The system was designed for
            citizens. It now belongs to corporations.
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
              Judicial election spending data is sourced from the Brennan Center
              for Justice at NYU School of Law, which tracks all state supreme
              court election expenditures. Leonard Leo network financials
              reference ProPublica&apos;s analysis of IRS 990 filings and
              investigative reporting by The New York Times and The Washington
              Post. The $1.65 billion Marble Freedom Trust donation was
              documented by The New York Times in August 2022. REDMAP spending
              is sourced from the Republican State Leadership Committee&apos;s
              own reporting and investigative analysis by David Daley
              (&ldquo;Ratf**ked,&rdquo; 2016). Gerrymandering impact data
              references analysis by the Brennan Center, FiveThirtyEight, and
              the Princeton Gerrymandering Project. Ballot measure spending
              totals are compiled from state campaign finance databases,
              Ballotpedia, and the National Institute on Money in Politics. The
              Hofeller files were entered into evidence in Common Cause v. Lewis
              (2019). Ohio judicial voting patterns reference Shepherd &amp;
              Kang, &ldquo;Skewed Justice&rdquo; (American Constitution Society,
              2014). All aggregated figures are for editorial context and should
              be verified against primary sources for academic citation.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter navigation */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
          <div className="grid grid-cols-2 gap-6">
            <Link
              href="/guide/congress-inc"
              className="group flex items-center gap-4 rounded-xl border border-border bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <ArrowLeft className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-ink" />
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Previous: Chapter 4
                </div>
                <div className="mt-1 font-headline text-lg font-bold text-ink">
                  Congress Inc.
                </div>
              </div>
            </Link>
            <Link
              href="/guide/the-justice-system"
              className="group flex items-center justify-end gap-4 rounded-xl border border-border bg-paper p-6 text-right transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Next: Chapter 6
                </div>
                <div className="mt-1 font-headline text-lg font-bold text-ink">
                  The Justice System
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
          <Scale className="mx-auto h-10 w-10 text-accent-light" />
          <h2 className="mt-6 font-headline text-3xl font-black tracking-tight lg:text-4xl">
            Follow the Money Into the Courts
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/60">
            Explore the interactive money flow diagram to trace how dark money
            networks, corporate donors, and PACs connect to judicial
            appointments, redistricting campaigns, and ballot measure wars.
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
              href="/guide/the-justice-system"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Next: The Justice System
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
