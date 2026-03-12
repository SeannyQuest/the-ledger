import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Gavel,
  Crosshair,
  Scale,
  FileText,
  ShieldAlert,
  Lock,
} from "lucide-react";
import { ScrollytellSection } from "@/components/stories/ScrollytellSection";
import type { ScrollytellStep } from "@/components/stories/ScrollytellSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Justice System — The Ledger",
  description:
    "Chapter 6 of The Field Guide to American Corruption. Private prisons profit from incarceration, the gun lobby blocks reform after every massacre, and corporate monopolies crush competitors while enforcers are starved of funding.",
};

const SCROLLYTELL_STEPS: ScrollytellStep[] = [
  {
    id: "the-donation",
    title: "The Private Prison Donates",
    body: "GEO Group and CoreCivic together spent $2.78 million on Trump\u2019s 2024 campaign and related entities, plus $1 million more to Trump\u2019s inaugural committee. They deployed $3.15 million in combined lobbying. The money flows to the politicians who control the contracts \u2014 and the sentencing laws that fill the beds.",
    stat: {
      value: "$2.78M",
      label: "Private Prison Companies to Trump 2024",
      color: "accent",
    },
    highlightColor: "#d97706",
  },
  {
    id: "the-politician",
    title: "The Politician Wins & Toughens Sentencing",
    body: "ALEC\u2019s Criminal Justice Task Force \u2014 co-chaired by CCA (now CoreCivic) \u2014 drafted model bills for Truth in Sentencing, Habitual Offender laws, Mandatory Minimums, and Stand Your Ground. These bills were introduced in statehouses nationwide. More convictions, longer sentences, fewer alternatives to incarceration. The pipeline from donation to legislation is direct and documented.",
    stat: {
      value: "4",
      label: "Model Bills Drafted to Fill Beds",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
  {
    id: "the-contracts",
    title: "The Contracts Multiply",
    body: "Immigration detention is now 90.8% privatized \u2014 up from 81% just years earlier. ICE issued a $45 billion solicitation over two years. GEO Group secured a $1 billion no-bid, 15-year contract for the Delaney Hall facility alone. The federal government has become the private prison industry\u2019s largest customer, and the invoices are paid with taxpayer money.",
    stat: {
      value: "90.8%",
      label: "Of Immigration Detention Is Private",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
  {
    id: "the-revenue",
    title: "The Company Profits",
    body: "GEO Group derives $1.05 billion from ICE contracts alone \u2014 43.9% of its total revenue. CoreCivic earns $552 million from ICE, or 30% of its revenue. When Biden signed an executive order limiting private prisons, GEO stock dropped 12.33%. When Trump won in 2024, GEO surged 41% in a single trading session. The stock market prices the relationship between policy and profit in real time.",
    stat: {
      value: "$1.05B",
      label: "GEO Group ICE Revenue (43.9% of Total)",
      color: "money-in",
    },
    highlightColor: "#16a34a",
  },
  {
    id: "the-expansion",
    title: "The System Expands",
    body: "The justice-industrial complex extends far beyond prison walls. For-profit probation companies charge offenders $30\u201360 per month \u2014 extracting roughly $40 million per year in Georgia alone with almost no transparency. Electronic monitoring is a $2.35 billion market growing to $3.42 billion by 2031. BI Incorporated, one of the largest ankle-monitor providers, is owned by GEO Group. The company profits whether you are inside the walls or outside them.",
    stat: {
      value: "$2.35B",
      label: "Electronic Monitoring Market (2026)",
      color: "accent",
    },
    highlightColor: "#d97706",
  },
  {
    id: "the-cycle",
    title: "The Cycle Repeats",
    body: "The company takes its profits and writes another check. GEO Group spent $3.72 million in contributions in the 2024 cycle alone. CoreCivic added $785K more. The bail bond industry collects $1.65 billion per year and spent $6 million in California alone to defeat reform. Mass incarceration costs taxpayers $445 billion annually. The cycle is self-reinforcing: more money buys more policy buys more incarceration buys more profit buys more money.",
    stat: {
      value: "$445B",
      label: "Annual Cost of Mass Incarceration",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
];

export default function TheJusticeSystemPage() {
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
            <span className="text-accent-light">Chapter 6</span>
          </nav>

          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
            Chapter 6 &middot; The Field Guide to American Corruption
          </div>

          <h1 className="mt-6 font-headline text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl xl:text-8xl">
            The Justice System
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70 lg:text-2xl">
            Private prisons profit from incarceration, the gun lobby blocks
            reform after every massacre, and corporate monopolies crush
            competitors while the enforcers are{" "}
            <span className="font-semibold text-white">starved of funding</span>
            .
          </p>

          <div className="mt-8 flex items-center gap-6 text-sm text-white/50">
            <time dateTime="2026-03-11">March 11, 2026</time>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>24 min read</span>
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
            The American justice system is not broken. It is functioning
            precisely as designed &mdash; by the corporations that profit from
            it. GEO Group and CoreCivic, the two largest private prison
            operators in the United States, poured $2.78 million into Donald
            Trump&apos;s 2024 campaign and related entities, then added another
            $1 million to his inaugural committee. In return, ICE issued a $45
            billion solicitation for detention services over two years, and
            immigration detention is now 90.8% privatized. The gun industry
            spent decades blocking every attempt at federal firearms legislation
            while the NRA funneled Russian money and its CEO looted $11 million
            in private jets. And as corporate monopolies tighten their grip on
            everything from beef to broadband, the agencies tasked with
            enforcing antitrust law operate on a budget that amounts to a
            rounding error next to the profits they are supposed to police.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            This chapter traces three interlocking systems of institutional
            corruption: the prison-industrial complex that turns incarceration
            into a publicly traded commodity, the firearms lobby that has
            perfected the art of post-massacre inaction, and the collapse of
            antitrust enforcement that has allowed a handful of corporations to
            dominate entire sectors of the American economy. In each case, the
            pattern is the same: an industry spends money to influence policy,
            the policy generates profit for the industry, and the profit funds
            the next cycle of influence. The numbers are precise because the
            corruption is.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            What makes the justice system uniquely corrosive is that the stakes
            are not abstract. When a pharmaceutical company captures its
            regulator, the harm is diffuse &mdash; higher drug prices spread
            across millions of consumers. When a private prison company captures
            its regulator, the harm is a human being in a cage, generating $95
            per night in revenue for shareholders. The distance between money
            and suffering is shorter here than anywhere else in American
            politics.
          </p>
        </div>
      </section>

      {/* Scrollytelling section */}
      <ScrollytellSection
        headline="The Justice-Industrial Cycle"
        subhead="Trace the self-reinforcing loop: private prison donates, politician toughens sentencing, prison fills, company profits, company donates again."
        steps={SCROLLYTELL_STEPS}
        bgColor="bg-ink"
        textColor="text-white"
      />

      {/* Pull quote break */}
      <section className="border-y-4 border-ink bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
          <blockquote className="text-center">
            <p className="font-headline text-3xl font-black leading-tight tracking-tight text-ink lg:text-4xl">
              &ldquo;Mass incarceration costs the United States $445 billion
              annually. The private prison industry spends millions to ensure it
              stays that way.&rdquo;
            </p>
            <cite className="mt-6 block font-mono text-sm font-bold uppercase tracking-widest text-muted">
              The Ledger Analysis of OpenSecrets, BJS, and SEC Filings
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Section 1: Private Prisons & Criminal Justice */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Lock className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Dimension I
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Private Prisons &amp; the Incarceration Economy
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            GEO Group spent $3.72 million in political contributions during the
            2024 cycle, including $1 million to a Trump super PAC and $775,000
            to the Congressional Leadership Fund. It deployed $1.38 million in
            lobbying. CoreCivic added $785,000 in contributions and $1.77
            million in lobbying. Both companies contributed $500,000 each to
            Trump&apos;s 2025 inaugural committee. These are not donations to a
            cause &mdash; they are investments in a business model that requires
            government policy to fill beds with human beings.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The return on that investment is visible in stock prices. When
            President Biden signed an executive order restricting the use of
            private prisons, GEO Group&apos;s stock dropped 12.33% in a single
            session. When Trump won the 2024 election, GEO surged 41% in one
            day. The market understood what the political contribution data
            already showed: the value of these companies is inseparable from the
            policies of the politicians they fund. GEO subsequently erased all
            gains and fell 60% from its post-election high &mdash; a reminder
            that even in captured markets, the stock price is not the same as
            the contract.
          </p>

          {/* Inline stat callout grid */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-4">
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                $3.72M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                GEO Contributions (2024)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-in">
                +41%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                GEO Stock on Trump Win
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-out">
                -60%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                GEO From Post-Election High
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                $45B
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                ICE Solicitation (2 Years)
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            The architecture of influence extends beyond campaign checks. The
            American Legislative Exchange Council &mdash; ALEC &mdash; provided
            the legislative machinery. CCA (now CoreCivic) co-chaired
            ALEC&apos;s Criminal Justice Task Force, which produced model bills
            for Truth in Sentencing laws, Habitual Offender statutes, Mandatory
            Minimum sentences, and Stand Your Ground provisions. These bills
            were introduced in statehouses across the country, often
            word-for-word. Each one increased the number of people incarcerated
            and the length of their sentences &mdash; and each one increased
            revenue for the companies that housed them.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Stand Your Ground deserves particular attention. The NRA brought
            Florida&apos;s Stand Your Ground law to ALEC in August 2005; Walmart
            co-chaired the task force that approved it as a model bill for
            national distribution. After the killing of Trayvon Martin in 2012,
            the corporate exodus was swift: Amazon, Coca-Cola, General Electric,
            Kraft, McDonald&apos;s, and Walmart all severed their ties with
            ALEC. But the model legislation they had helped approve was already
            on the books in dozens of states. The damage was done.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Immigration detention has become the fastest-growing segment of the
            private prison industry. ICE detention is now 90.8% privatized
            &mdash; up from 81% just years earlier. GEO Group derives $1.05
            billion from ICE contracts, representing 43.9% of its total revenue.
            CoreCivic earns $552 million from ICE, or 30% of its revenue. The
            Delaney Hall contract alone &mdash; $1 billion, no-bid, fifteen
            years &mdash; illustrates how far the industry has moved beyond the
            competitive procurement process that is supposed to protect
            taxpayers.
          </p>
        </div>
      </section>

      {/* Section 2: Beyond the Walls */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Dimension II
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Beyond the Walls: Probation, Monitoring &amp; Bail
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The justice-industrial complex does not end at the prison gate. An
            entire ecosystem of for-profit services extracts money from people
            who have been convicted, charged, or merely accused. For-profit
            probation companies operate on an entirely
            &ldquo;offender-funded&rdquo; model, charging probationers
            $30&ndash;60 per month for the privilege of being supervised. In
            Georgia alone, these companies extract roughly $40 million per year
            from probationers &mdash; people who are disproportionately poor and
            disproportionately Black. The industry operates with almost no
            transparency: no standardized reporting, no meaningful oversight,
            and no accountability when people are jailed for failing to pay fees
            they cannot afford.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Electronic monitoring has become a $2.35 billion market in 2026,
            projected to grow to $3.42 billion by 2031. The technology is
            positioned as a humane alternative to incarceration, but the
            business model tells a different story. BI Incorporated, one of the
            largest ankle-monitor providers in the country, is owned by GEO
            Group. The same company that profits from putting people in cells
            also profits from putting monitors on their ankles. Either way, the
            revenue flows to the same shareholders.
          </p>

          {/* Inline stat callout grid */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                $1.65B
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Bail Bond Industry / Year
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                $6M+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Industry Spent to Kill CA Prop 25
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-in">
                &minus;20%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                NJ Pretrial Jail After Reform
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            The bail bond industry collects $1.65 billion per year from
            defendants and their families &mdash; overwhelmingly from low-income
            communities. When California passed Proposition 25 in 2020 to
            eliminate cash bail, the bail bond industry spent more than $6
            million to defeat it at the ballot box &mdash; and won. The
            industry&apos;s argument was that bail reform would endanger public
            safety. New Jersey&apos;s experience tells a different story: after
            virtually eliminating cash bail, pretrial jail populations dropped
            20% and crime rates decreased. The reform worked. The industry
            simply ensured it would not spread.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The total cost of mass incarceration in the United States is $445
            billion annually &mdash; a figure that includes not only the direct
            costs of operating prisons and jails but the economic losses from
            removing millions of working-age adults from their families and
            communities. Reform philanthropy peaked at $682 million in 2020,
            driven by the racial justice movement, then collapsed to $341
            million in 2021 before partially recovering to roughly $500 million
            in 2023. The First Step Act of 2018 &mdash; which passed the Senate
            87&ndash;12 with an improbable coalition of the ACLU, the Koch
            network, the Fraternal Order of Police, Kim Kardashian, and Van
            Jones &mdash; demonstrated that bipartisan criminal justice reform
            is possible. Koch&apos;s Right on Crime initiative in Texas saved $4
            billion, closed 11 prisons, and drove crime to its lowest level
            since the 1960s. The precedent exists. The political will does not.
          </p>
        </div>
      </section>

      {/* Section 3: Gun Industry & NRA */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Crosshair className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Dimension III
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Gun Lobby&apos;s Long Decline
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The National Rifle Association&apos;s political spending tells the
            story of an organization in free fall. In 2016, the NRA spent $54.4
            million on outside political spending &mdash; a record that made it
            one of the most powerful forces in American elections. By 2020, that
            number had dropped to $29 million. In 2022, it collapsed to
            approximately $9,600 &mdash; effectively zero. The NRA partially
            recovered to $10.1 million in 2024, but the trajectory is
            unmistakable: the organization that once defined American gun policy
            has been hollowed out by financial mismanagement, legal liability,
            and the emergence of a counter-lobby that now outspends it.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The financial crisis is structural. NRA revenue fell from $367
            million in 2016 to $211 million in 2022 &mdash; a 52% drop over six
            years. Member dues, the organization&apos;s lifeblood, collapsed
            from $170 million to $83.3 million, a 59% decline. The cause is not
            mysterious. Wayne LaPierre, the NRA&apos;s longtime CEO, spent more
            than $11 million on private jets, over $500,000 on trips to the
            Bahamas on a vendor&apos;s yacht, and authorized $135 million in
            payments to Ackerman McQueen, the organization&apos;s advertising
            firm. A New York court found LaPierre liable for $5.4 million in
            damages and imposed a 10-year ban on serving as an officer of any
            New York nonprofit. The Senate Intelligence Committee separately
            documented that the NRA had acted as a &ldquo;foreign asset&rdquo;
            for Russia, with Maria Butina pleading guilty to conspiracy to act
            as an unregistered Russian agent.
          </p>

          {/* Inline stat callout grid */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-4">
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                $54.4M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                NRA Spending (2016 Peak)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-out">
                $10.1M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                NRA Spending (2024)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                3,886:1
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                NRA Advantage (2016)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-in">
                $18.3M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Gun Control Spending (2024)
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            The spending reversal is the most significant structural shift in
            gun politics in a generation. In 2016, the NRA outspent gun control
            organizations by a ratio of 3,886 to 1. By 2018, gun control groups
            outspent the NRA for the first time in history. In 2024, gun control
            organizations spent $18.3 million to the NRA&apos;s $10.1 million.
            Michael Bloomberg has contributed more than $270 million over his
            career to Everytown for Gun Safety, and pledged $45 million for the
            2024 cycle alone. A Stanford study found that pro-gun PAC
            fundraising increases 31% after school shootings, while gun safety
            organizations see a 20% increase &mdash; but both sides now operate
            at roughly the same financial scale.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The top congressional recipients of NRA money over their careers
            tell the story of the organization&apos;s priorities: Mitt Romney at
            $13.6 million, Richard Burr at $7 million, Roy Blunt at $4.6
            million, Thom Tillis at $4.4&ndash;5.6 million, and Marco Rubio at
            $3.3 million. These are the senators who voted against every major
            gun safety bill after every mass shooting for more than a decade.
            But the Uvalde massacre in 2022 cracked the wall: the Bipartisan
            Safer Communities Act became the first federal gun law in 30 years.
            Even so, 56% of the 93 new state-level gun laws passed that year{" "}
            <em>expanded</em> firearms access rather than restricting it. The
            NSSF &mdash; the National Shooting Sports Foundation, the gun
            industry&apos;s trade association &mdash; now spends $6.97 million
            on lobbying per year, surpassing the NRA. The torch has passed from
            the membership organization to the industry trade group.
          </p>
        </div>
      </section>

      {/* Section 4: Antitrust & Corporate Power */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Scale className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Dimension IV
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Antitrust &amp; the Monopoly Machine
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The federal government has declared Google an illegal monopoly. It
            has found the company liable in its ad tech business. It is
            prosecuting Apple, Amazon, and Meta. Live Nation settled for $280
            million &mdash; and 26 state attorneys general rejected the deal as
            inadequate. These are the largest antitrust actions in a generation,
            and they are unfolding against an industry that has spent $277
            million over two years lobbying to kill the reform bills that would
            make future enforcement easier. That $277 million is six times what
            reform supporters spent. Amazon alone deployed $16 million in nine
            months to defeat antitrust legislation in Congress.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The enforcement agencies are fighting with both hands tied. The
            Federal Trade Commission operates on a budget of approximately $430
            million &mdash; while the five largest technology companies alone
            generated over $400 billion in profits. The FTC&apos;s funding is
            roughly one-third of its 20th-century levels when adjusted for
            inflation and caseload. The Trump administration&apos;s FY2026
            budget proposed cutting the FTC to $385 million &mdash; a 10%
            reduction for an agency already operating at a fraction of its
            historical capacity. Lina Khan&apos;s tenure as FTC Chair saw more
            than 38 merger challenges, including victories in Nvidia-Arm and
            Kroger-Albertsons and losses in Microsoft-Activision and
            Meta-Within. The record demonstrated that vigorous enforcement is
            possible &mdash; and that the resources to sustain it are
            deliberately withheld.
          </p>

          {/* Inline stat callout grid */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-4">
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                $277M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Tech Anti-Antitrust Lobbying
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                $430M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                FTC Budget vs $400B+ Profits
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-out">
                $1.25T
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Deprived From Workers (Philippon)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-in">
                75%+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Industries More Concentrated
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            The consequences of monopoly power extend far beyond the technology
            sector. Private equity has colonized entire industries: $51.6
            billion in PE investment has driven corporate ownership of more than
            30% of veterinary practices. SCI, the largest funeral home
            conglomerate, charges a 42% premium over independent operators. The
            DOJ is prosecuting RealPage for algorithmic rent-fixing. In
            agriculture, four companies control 80% of beef processing &mdash;
            Tyson and Cargill settled for $87.5 million after a price-fixing
            investigation. Three companies control 70% of agrochemicals and 60%
            of seeds.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Economist Thomas Philippon estimates that the decline of competition
            has deprived American workers of $1.25 trillion in income. If
            competition were restored to historical levels, the median household
            would gain $5,000 per year. More than 75% of American industries
            have become more concentrated over the past two decades. The
            revolving door ensures that enforcement remains weak: more than 60%
            of FTC and DOJ antitrust staff move to BigLaw firms or the
            corporations they were regulating. Eighty-five percent of deputy
            assistant attorneys general for economics rotate into corporate
            consulting, where they bill $1,350 per hour to help the same
            companies evade the rules they once enforced. The enforcers become
            the defense attorneys. The cycle completes itself.
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
              Private prison contribution and lobbying data is sourced from FEC
              filings and OpenSecrets (Center for Responsive Politics). ICE
              contract values and detention privatization rates are from
              USASpending.gov, DHS Inspector General reports, and Congressional
              Research Service analyses. Stock price movements reference Yahoo
              Finance historical data. ALEC model legislation history is
              documented by the Center for Media and Democracy and confirmed
              through archived ALEC task force records. NRA spending and revenue
              figures are from FEC independent expenditure filings and IRS Form
              990 disclosures. The LaPierre liability finding is from the New
              York Supreme Court (2024). The Senate Intelligence
              Committee&apos;s &ldquo;foreign asset&rdquo; characterization is
              from its 2019 report on Russian interference. Gun control spending
              data references Everytown, Brady Campaign, and Giffords Law Center
              FEC filings. Antitrust case outcomes reference federal court
              rulings (Google Search: D.D.C. 2024; Google Ad Tech: E.D. Va.
              2025). Philippon&apos;s competition analysis is from{" "}
              <em>The Great Reversal</em> (Harvard University Press, 2019).
              Revolving door statistics are from the Project on Government
              Oversight and the Revolving Door Project. All aggregated figures
              are for editorial context and should be verified against primary
              sources for academic citation.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter navigation */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
          <div className="grid grid-cols-2 gap-6">
            <Link
              href="/guide/courts-maps-and-ballots"
              className="group flex items-center gap-4 rounded-xl border border-border bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <ArrowLeft className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-ink" />
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Previous: Chapter 5
                </div>
                <div className="mt-1 font-headline text-lg font-bold text-ink">
                  Courts, Maps &amp; Ballots
                </div>
              </div>
            </Link>
            <Link
              href="/guide/corruption-and-reform"
              className="group flex items-center justify-end gap-4 rounded-xl border border-border bg-paper p-6 text-right transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Next: Chapter 7
                </div>
                <div className="mt-1 font-headline text-lg font-bold text-ink">
                  Corruption &amp; Reform
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
          <Gavel className="mx-auto h-10 w-10 text-accent-light" />
          <h2 className="mt-6 font-headline text-3xl font-black tracking-tight lg:text-4xl">
            Follow the Money
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/60">
            See how private prison contributions, gun lobby spending, and
            corporate anti-antitrust lobbying connect to the policies that shape
            the justice system.
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
              href="/guide/corruption-and-reform"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Next: Corruption &amp; Reform
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
