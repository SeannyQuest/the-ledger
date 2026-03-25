import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Factory,
  FileText,
  Pill,
  Shield,
  Fuel,
  Cpu,
  BookOpen,
} from "lucide-react";
import { ScrollytellSection } from "@/components/stories/ScrollytellSection";
import type { ScrollytellStep } from "@/components/stories/ScrollytellSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Industry Capture: Pharma, Defense, Fossil Fuel & Big Tech | The Field Guide to American Corruption | Daonra",
  description:
    "Chapter 2: How four industries (pharmaceuticals, defense contractors, fossil fuels, and Big Tech) spend billions to write the rules they are supposed to follow. $452M pharma lobbying, 1,800:1 defense ROI, $20B+ fossil fuel subsidies, $277M tech anti-antitrust spending.",
};

const SCROLLYTELL_STEPS: ScrollytellStep[] = [
  {
    id: "lobby",
    title: "The Industry Lobbies",
    body: "It begins with money. Every year, the four capture industries pour more than $700 million into federal lobbying alone. Pharmaceutical companies deploy $452 million. Defense contractors spend $139 million. Oil and gas firms contribute $100-150 million. Big Tech adds $65 million and rising. These are not campaign donations or PR budgets. This is direct, targeted spending on the people who write laws, and it is disclosed because the law requires it. What it buys is not disclosed at all.",
    stat: {
      value: "$700M+",
      label: "Combined Annual Lobbying",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
  {
    id: "write",
    title: "The Industry Writes Regulations",
    body: "Lobbyists do not merely influence legislation. They draft it. Industry-written amendments appear verbatim in committee markups. Trade associations submit model regulatory language to agencies tasked with oversight. When the Inflation Reduction Act threatened pharma pricing, 545 lobbyists (20 for every member of the relevant committees) descended on Capitol Hill to rewrite the bill from the inside. When Congress considered antitrust reform for Big Tech, the industry spent $277 million over two years to kill it, outspending reform supporters six to one.",
    stat: {
      value: "6:1",
      label: "Industry vs. Reform Spending",
      color: "accent",
    },
    highlightColor: "#d97706",
  },
  {
    id: "revolve",
    title: "The Industry Hires the Regulators",
    body: "The revolving door is not a metaphor. It is a career pipeline. Billy Tauzin chaired the House Energy and Commerce Committee, shepherded the law that banned Medicare from negotiating drug prices, then became president of PhRMA at over $2 million per year. Pentagon officials routinely leave government service for executive positions at the defense contractors they oversaw. The same people who write the regulations one year are paid to circumvent them the next. The talent flows one direction: toward money.",
    stat: {
      value: "$2M+",
      label: "Tauzin's PhRMA Salary",
      color: "money-in",
    },
    highlightColor: "#1a7a3a",
  },
  {
    id: "block",
    title: "The Industry Blocks Reform",
    body: "When regulation threatens, captured industries do not simply oppose it. They engineer its failure. Pharma filed 9+ lawsuits challenging the IRA. Fossil fuel companies spent $41 million to defeat a single Colorado fracking ballot measure and $29.7 million to kill a Washington state carbon fee. Big Tech deployed $277 million in two years to prevent antitrust legislation from reaching a vote. Defense contractors spread the F-35 program across 45+ states, ensuring that any spending cut threatens jobs in nearly every congressional district. The architecture of obstruction is deliberate.",
    stat: {
      value: "45+",
      label: "States with F-35 Suppliers",
      color: "accent",
    },
    highlightColor: "#d97706",
  },
  {
    id: "profit",
    title: "The Industry Profits",
    body: "The returns are not speculative. The top five defense contractors invested $1.1 billion in lobbying from 2001 to 2021 and received $2.02 trillion in federal contracts, a return of 1,800 to 1. Fossil fuel companies receive over $20 billion per year in federal subsidies despite record profits. Pharma\u2019s $4 million annual dark money investment protected $8 billion in annual revenue by blocking Medicare negotiation. Americans pay two to three times more for drugs than citizens of any other developed nation. The capture is complete. The profits are permanent, until the cycle is broken.",
    stat: {
      value: "1,800:1",
      label: "Defense Lobbying ROI",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
];

export default function IndustryCapturePage() {
  return (
    <article>
      {/* ── Hero ── */}
      <header className="relative border-b-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-24 lg:px-8 lg:py-32">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
            <Link href="/guide" className="transition-colors hover:text-white">
              The Field Guide
            </Link>{" "}
            &middot; Chapter 2
          </div>

          <h1 className="mt-6 font-headline text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl">
            Industry Capture
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70 lg:text-2xl">
            Pharma, defense, fossil fuel, and Big Tech: the four industries
            that spend billions to write the rules they are supposed to follow.{" "}
            <span className="font-semibold text-white">
              This is how regulated becomes regulator.
            </span>
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

      {/* ── Lead Paragraph ── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <p className="drop-cap text-xl leading-relaxed text-ink/80 lg:text-2xl lg:leading-relaxed">
            Regulatory capture is the quiet, systemic process by which the
            industries a government is supposed to oversee instead come to
            control the agencies, the legislation, and the lawmakers themselves.
            It is not a conspiracy. It does not require backroom deals or
            suitcases of cash. It operates through legal lobbying, legitimate
            campaign contributions, and a revolving door that moves talent
            between government offices and corporate boardrooms with metronomic
            regularity. In four industries (pharmaceuticals, defense, fossil
            fuels, and technology) the capture is so complete that the line
            between public servant and private interest has effectively
            dissolved.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            This chapter examines each of these industries in turn: the money
            they spend, the mechanisms they use, and the public costs they
            impose. The data is drawn from Senate lobbying disclosures, FEC
            filings, USASpending.gov, state campaign finance databases, and
            congressional records. Every figure cited is sourced. The pattern is
            always the same: invest in politics, write the rules, hire the
            regulators, block reform, and profit.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The four industries profiled here spend a combined $700 million or
            more each year on federal lobbying alone. That figure does not
            include campaign contributions, dark money, state-level spending, or
            the invisible subsidy of the revolving door. The true cost of
            capture is incalculable. What follows is the portion we can measure.
          </p>
        </div>
      </section>

      {/* ── Scrollytelling: The Capture Cycle ── */}
      <ScrollytellSection
        headline="The Capture Cycle"
        subhead="Five steps show how industries transform lobbying dollars into regulatory control, and why the cycle is so difficult to break."
        steps={SCROLLYTELL_STEPS}
        bgColor="bg-ink"
        textColor="text-white"
      />

      {/* ── Pull Quote ── */}
      <section className="border-y-4 border-ink bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
          <blockquote className="text-center">
            <p className="font-headline text-3xl font-black leading-tight tracking-tight text-ink lg:text-4xl">
              &ldquo;The top five defense contractors invested $1.1 billion in
              lobbying and received $2.02 trillion in contracts. That is a
              return of 1,800 to 1.&rdquo;
            </p>
            <cite className="mt-6 block font-mono text-sm font-bold uppercase tracking-widest text-muted">
              Daonra Analysis &middot; USASpending.gov &amp; Senate
              Disclosure Data
            </cite>
          </blockquote>
        </div>
      </section>

      {/* ── Section 1: Pharmaceutical Lobbying ── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Pill className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Industry I
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Pharmaceutical Lobbying
          </h2>
          <p className="mt-2 text-lg text-muted">
            The largest lobbying sector in America, and the most effective.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The pharmaceutical industry is the single most prolific lobbying
            force in American politics. In 2025, the sector spent $451.8 million
            on federal lobbying, more than any other industry, more than oil
            and gas and defense combined. PhRMA, the industry&apos;s primary
            trade association, spent $31.7 million in 2024 alone, maintaining a
            permanent operation of hundreds of registered lobbyists who
            outnumber the staffs of most congressional committees.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            For more than two decades, this apparatus achieved something
            remarkable: it blocked Medicare (the largest single drug purchaser
            in the United States, covering 65 million Americans) from
            negotiating prescription drug prices. Every other major government
            buyer negotiates. The VA negotiates. Medicaid negotiates. The
            British NHS negotiates. Medicare was prohibited from doing so by
            law. That law was not an accident of policy. It was a product of
            sustained political investment: roughly $4 million per year in dark
            money to protect an estimated $8 billion annual windfall.
          </p>

          {/* Pharma stat grid */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                $452M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Annual Lobbying
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                545
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Lobbyists vs. IRA
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-out">
                20:1
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Lobbyist-to-Lawmaker Ratio
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            When the Inflation Reduction Act of 2022 finally introduced limited
            Medicare drug price negotiation, the pharmaceutical industry&apos;s
            response was immediate and overwhelming. It deployed 545 registered
            lobbyists to Capitol Hill, a ratio of roughly 20 lobbyists for
            every member of the relevant committees. It filed nine or more
            lawsuits challenging the program&apos;s constitutionality. The bill
            passed, but in dramatically weakened form: only ten drugs in the
            first year, with negotiations delayed and phased in over years.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The revolving door greased the machine. Billy Tauzin, who chaired
            the House Energy and Commerce Committee and shepherded the
            legislation that barred Medicare from negotiating, left Congress to
            become president of PhRMA at a salary exceeding $2 million per year.
            His case is not an outlier. It is a template. The lawmakers who
            protect the industry are rewarded by the industry, and the pipeline
            from Capitol Hill to K Street runs so smoothly that it barely makes
            news.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The result: Americans pay two to three times more for prescription
            drugs than citizens of any other developed nation. Insulin that
            costs $10 in Canada costs $300 here. Cancer treatments priced at
            $50,000 abroad sell for $150,000 domestically. The pharmaceutical
            industry argues that high prices fund innovation. But over half of
            transformative drug research is funded by the NIH, with taxpayer
            money. The public pays twice: once for the research, and again at
            the pharmacy counter.
          </p>
        </div>
      </section>

      {/* ── Section 2: Defense Contractors ── */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Industry II
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Defense Contractors
          </h2>
          <p className="mt-2 text-lg text-muted">
            An 1,800-to-1 return on political investment, the most profitable
            bet in Washington.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The numbers are difficult to process at human scale. From 2001 to
            2021, the top five defense contractors (Lockheed Martin, Boeing,
            Raytheon, General Dynamics, and Northrop Grumman) spent a combined
            $1.1 billion on federal lobbying. In return, they received $2.02
            trillion in federal contracts. That is a return of 1,800 to 1. No
            venture capital fund, no hedge fund, no stock market in history has
            produced returns remotely comparable. Political investment is the
            most profitable investment available in America, and the defense
            industry has perfected it.
          </p>

          {/* Defense stat grid */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-money-in">
                1,800:1
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Lobbying ROI
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                904
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Registered Lobbyists
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                $381K
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Lobbying Per Day
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            In 2023, Lockheed Martin alone spent $14.1 million on federal
            lobbying. The defense sector as a whole deployed 904 registered
            lobbyists and spent $139 million, roughly $381,000 per day, every
            day of the year, including weekends and holidays. These lobbyists
            are not strangers to the Pentagon. Many of them worked there. The
            revolving door between the Department of Defense and defense
            contracting firms is not a side channel. It is the main corridor.
            Generals retire on Friday and start as defense executives on Monday.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            But the industry&apos;s most sophisticated instrument of capture is
            not lobbying. It is geography. The F-35 Joint Strike Fighter
            program, the most expensive weapons system in human history,
            maintains suppliers and subcontractors in 45 or more states. This is
            not an accident of manufacturing efficiency. It is a deliberate
            political architecture. When any member of Congress considers
            cutting F-35 funding, they are voting to eliminate jobs in their own
            district. The program is designed to be impossible to cancel, not
            because it is indispensable to national security, but because its
            economic tendrils reach into nearly every congressional
            constituency. Bipartisan support is not earned. It is engineered.
          </p>
        </div>
      </section>

      {/* ── Section 3: Fossil Fuels ── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Fuel className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Industry III
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Fossil Fuels
          </h2>
          <p className="mt-2 text-lg text-muted">
            $100-150 million in annual lobbying to protect $20 billion in annual
            subsidies.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The fossil fuel industry&apos;s political operation is less a
            lobbying effort than a permanent counterinsurgency campaign. Oil and
            gas companies spend between $100 million and $150 million per year
            on federal lobbying. In return, the industry receives more than $20
            billion annually in federal subsidies, tax breaks, and preferential
            regulatory treatment: subsidies that persist through Democratic and
            Republican administrations alike, through oil booms and climate
            emergencies, through record-breaking profits and catastrophic
            spills.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The industry&apos;s legislative victories are measured not in bills
            passed but in bills killed. Fossil fuel lobbying helped destroy
            cap-and-trade legislation that had bipartisan support. It weakened
            the Clean Power Plan. It diluted the climate provisions of the Build
            Back Better Act until the bill&apos;s environmental ambitions were a
            fraction of their original scope. The Koch network alone has
            channeled hundreds of millions of dollars into energy policy
            influence, funding think tanks, academic chairs, state-level
            advocacy groups, and direct campaign contributions designed to make
            climate legislation politically radioactive.
          </p>

          {/* Fossil fuel stat grid */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-money-out">
                $20B+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Annual Subsidies
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                $41M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                To Defeat CO Prop 112
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                $29.7M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                To Defeat WA I-1631
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            The industry&apos;s most effective weapon is the ballot measure
            campaign. In 2018, Colorado&apos;s Proposition 112 would have
            required fracking setbacks from homes and schools. The oil and gas
            industry spent $41 million to defeat it, in a state ballot measure.
            The same year, Washington state&apos;s Initiative 1631, which would
            have imposed a carbon fee, was defeated after the industry poured
            $29.7 million into opposition advertising. In both cases, the
            industry outspent supporters by margins so vast that the contests
            were effectively over before they began. This is not democracy in
            action. It is democracy for sale.
          </p>
        </div>
      </section>

      {/* ── Section 4: Big Tech ── */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Cpu className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Industry IV
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Big Tech
          </h2>
          <p className="mt-2 text-lg text-muted">
            From Silicon Valley disruptors to Washington&apos;s newest lobbying
            powerhouse.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            A decade ago, the technology industry barely registered in
            Washington. Google, Facebook, Amazon, Apple, and Microsoft were
            engineering companies that viewed lobbying as a distraction from
            product development. That era is over. Today, Big Tech is one of the
            fastest-growing lobbying forces in the capital. Google, Meta,
            Amazon, Apple, and Microsoft each spend between $15 million and $25
            million or more per year on federal lobbying. Combined, the Big Five
            spent approximately $65 million in 2021, $69 million in 2022, $68
            million in 2023, and $61.5 million in 2024.
          </p>

          {/* Tech stat grid */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                $277M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                To Kill Antitrust Reform
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                $16M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Amazon (9 Months, 2022)
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-out">
                $10.4M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                TikTok Record Lobbying
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            The inflection point was antitrust. When bipartisan legislation
            threatened to break up dominant platforms and restrict
            self-preferencing, the technology industry responded with the
            largest defensive lobbying campaign in its history. Over two years,
            tech companies and their trade associations spent $277 million to
            kill antitrust reform, outspending reform supporters by a ratio of
            six to one. Amazon alone spent $16 million in the first nine months
            of 2022, a record pace for a single company. The bills never reached
            a floor vote.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Now artificial intelligence is driving a massive new lobbying surge.
            Every major tech company has hired additional lobbyists to shape AI
            regulation before it takes form. The pattern is familiar: arrive at
            the table before rules are written, frame the debate around
            industry-friendly concepts like &ldquo;innovation&rdquo; and
            &ldquo;competitiveness,&rdquo; and ensure that any regulation that
            emerges codifies the advantages of incumbents. Meanwhile,
            TikTok&apos;s parent company ByteDance spent a record $10.4 million
            on lobbying in 2024 as it fought a potential ban, a reminder that
            even companies under existential regulatory threat find lobbying
            more cost-effective than compliance.
          </p>
        </div>
      </section>

      {/* ── Combined Stats Bar ── */}
      <section className="border-y border-border bg-paper">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border md:grid-cols-4">
          {[
            { value: "$452M", label: "Pharma lobbying/year" },
            { value: "1,800:1", label: "Defense lobbying ROI" },
            { value: "$20B+", label: "Fossil fuel subsidies/year" },
            { value: "$277M", label: "Tech anti-antitrust spend" },
          ].map((item) => (
            <div key={item.label} className="bg-paper p-6 text-center lg:p-8">
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

      {/* ── Analysis: The Common Playbook ── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <h2 className="font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Common Playbook
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            Despite operating in vastly different sectors, these four industries
            follow an identical pattern of political capture. First, they invest
            in lobbying at a scale that dwarfs any opposing force. Second, they
            hire former regulators and lawmakers who understand the system from
            the inside. Third, they distribute economic benefits (jobs,
            contracts, research grants) across enough congressional districts
            to make opposition politically painful. Fourth, when reform
            movements gather momentum, they deploy overwhelming resources to
            dilute, delay, or destroy legislation before it reaches a vote.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The playbook works because the costs are concentrated and the
            benefits are diffuse. A pharmaceutical company that spends $30
            million on lobbying to protect a single drug&apos;s pricing power is
            making a rational investment with a clear return. The millions of
            Americans who pay inflated prices have no comparable mechanism for
            collective action. A defense contractor that maintains suppliers in
            45 states is not inefficient. It is building a political firewall.
            A fossil fuel company that spends $41 million to defeat a ballot
            measure is not wasting money. It is protecting $20 billion in
            annual subsidies.
          </p>

          {/* Combined stat grid */}
          <div className="my-12 grid grid-cols-3 gap-6 border-y border-border py-8">
            <div>
              <div className="font-headline text-4xl font-black text-money-out">
                545
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Pharma Lobbyists Post-IRA
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                45+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                States With F-35 Suppliers
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                904
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Defense Lobbyists (2023)
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            The asymmetry is the point. Industry capture persists not because
            voters approve of it, but because the forces defending the status
            quo will always outspend the forces challenging it. Reforming drug
            pricing, cutting defense waste, eliminating fossil fuel subsidies,
            and regulating Big Tech are all popular positions in public polling.
            They are also positions that threaten hundreds of billions of
            dollars in corporate revenue. The industries in this chapter have
            demonstrated, repeatedly and with mathematical precision, that
            political spending is the highest-return investment available in the
            American economy. Until the cost of capture exceeds the cost of
            compliance, the cycle will continue.
          </p>
        </div>
      </section>

      {/* ── Methodology ── */}
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
              All lobbying expenditure data is derived from the Senate Lobbying
              Disclosure Act database and cross-referenced with OpenSecrets.org
              compilations. Federal contract data comes from USASpending.gov.
              Fossil fuel subsidy estimates reference the International Monetary
              Fund, the International Energy Agency, and the Congressional
              Budget Office. Ballot measure spending data is sourced from state
              campaign finance disclosure databases (Colorado Secretary of
              State, Washington Public Disclosure Commission). Pharmaceutical
              pricing comparisons reference RAND Corporation and Commonwealth
              Fund analyses. All figures are illustrative aggregates compiled
              for editorial purposes and should be verified against primary
              sources for citation. Revolving door data references the Center
              for Responsive Politics and congressional financial disclosure
              filings.
            </p>
          </div>
        </div>
      </section>

      {/* ── Chapter Navigation ── */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
          <div className="grid grid-cols-2 gap-6">
            <Link
              href="/guide/the-money-machine"
              className="group flex items-center gap-3 rounded-xl border border-border p-6 transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <ArrowLeft className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:-translate-x-1" />
              <div className="min-w-0">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Previous Chapter
                </div>
                <div className="mt-1 font-headline text-lg font-bold text-ink">
                  The Money Machine
                </div>
              </div>
            </Link>
            <Link
              href="/guide/wall-street-and-healthcare"
              className="group flex items-center justify-end gap-3 rounded-xl border border-border p-6 text-right transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <div className="min-w-0">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Next Chapter
                </div>
                <div className="mt-1 font-headline text-lg font-bold text-ink">
                  Wall Street &amp; Healthcare
                </div>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Footer ── */}
      <section className="border-t-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center lg:px-8">
          <Factory className="mx-auto h-10 w-10 text-accent-light" />
          <h2 className="mt-6 font-headline text-3xl font-black tracking-tight lg:text-4xl">
            The Capture Continues
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/60">
            Industry capture is not a historical phenomenon. It is happening now
            : in AI regulation, defense budgets, drug pricing, and energy
            policy. Explore the full field guide or follow the money.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/guide/wall-street-and-healthcare"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-white/90"
            >
              Chapter 3: Wall Street &amp; Healthcare
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <BookOpen className="h-4 w-4" />
              Full Field Guide
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
