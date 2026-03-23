import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  Scale,
  Newspaper,
  FileText,
  Network,
  GraduationCap,
  Gavel,
  BookOpen,
  BarChart3,
  Eye,
  DollarSign,
  Landmark,
  Users,
} from "lucide-react";
import { ScrollytellSection } from "@/components/stories/ScrollytellSection";
import type { ScrollytellStep } from "@/components/stories/ScrollytellSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Influence Machine | Daonra",
  description:
    "Chapter 10 of The Field Guide to American Corruption. Think tanks, dark money networks, model legislation factories, judicial pipelines, and partisan media infrastructure — how $1 billion+ per year in ideological spending shapes American law without a single vote.",
};

const SCROLLYTELL_STEPS: ScrollytellStep[] = [
  {
    id: "the-donor-summit",
    title: "The Donor Summit",
    body: "Twice a year, five hundred of the wealthiest people in America gather at a private resort for an invitation-only conference. No press. No recordings. No public agenda. The host is Charles Koch, and the purpose is straightforward: to pool hundreds of millions of dollars into a coordinated political operation spanning think tanks, universities, state legislatures, judicial nominations, and media outlets. The Koch network has spent more than $2 billion on politics since 2008. At each summit, donors pledge specific amounts to specific organizations. The money flows out the next morning. The public learns nothing.",
    stat: {
      value: "$2B+",
      label: "Koch Network Cumulative Spending",
      color: "accent",
    },
    highlightColor: "#d97706",
  },
  {
    id: "the-think-tank",
    title: "The Think Tank Produces the Playbook",
    body: "The Heritage Foundation receives $134 million per year. The Cato Institute receives $71 million. The American Enterprise Institute receives $68 million. These organizations employ hundreds of policy analysts who produce white papers, legislative templates, and media talking points that become the intellectual architecture of governance. Heritage\u2019s 1981 Mandate for Leadership contained 2,000 policy proposals. Reagan adopted two-thirds of them. Project 2025, the sequel, mobilized 100+ organizations and 280+ contributors to draft a comprehensive blueprint for the next conservative administration. These are not academic exercises. They are operating manuals for power.",
    stat: {
      value: "$400M+",
      label: "Combined Conservative Think Tank Budgets",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
  {
    id: "the-model-bill",
    title: "The Model Bill Factory",
    body: "The American Legislative Exchange Council convenes corporate executives and state legislators in the same room to draft legislation together. The corporations pay $7,000 to $25,000 for the privilege. The legislators pay $100. Each year, approximately 1,000 ALEC model bills are introduced in state legislatures across all 50 states, and roughly 20% become law. Stand Your Ground. Voter ID. Right-to-work. Anti-renewable energy standards. Private prison expansion. These laws did not originate in town halls or constituent meetings. They were written in hotel conference rooms by corporations and handed to lawmakers as finished products.",
    stat: {
      value: "~200",
      label: "ALEC Bills Enacted Per Year",
      color: "accent",
    },
    highlightColor: "#d97706",
  },
  {
    id: "the-dark-money-atm",
    title: "The Dark Money ATM",
    body: "DonorsTrust has granted more than $2.5 billion to conservative causes since its founding. Its mechanism is elegant: a wealthy donor deposits money into a donor-advised fund. DonorsTrust distributes grants under its own name. The original donor is never disclosed. Mother Jones magazine called it the \u2018dark money ATM of the right.\u2019 On the left, the Arabella Advisors network processed $1.51 billion in a single year through five nonprofits that serve as fiscal sponsors for hundreds of pop-up advocacy groups \u2014 organizations that appear, spend millions, and dissolve before anyone can trace the money back to its source.",
    stat: {
      value: "$1.9B",
      label: "Record Dark Money Spending (2024)",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
  {
    id: "the-judicial-pipeline",
    title: "The Judicial Pipeline",
    body: "The Federalist Society has 200+ law school chapters and 70,000+ practicing attorney members. Six of nine current Supreme Court justices are current or former members. When Donald Trump took office, he outsourced judicial selection to Federalist Society co-chairman Leonard Leo. Leo\u2019s network raised $600 million or more for judicial confirmation battles. Then, in 2021, a 90-year-old Chicago manufacturing magnate named Barre Seid donated $1.6 billion to Leo\u2019s Marble Freedom Trust \u2014 the largest known political advocacy donation in American history. Leo announced plans to devote $1 billion to \u2018crush liberal dominance\u2019 in news and entertainment.",
    stat: {
      value: "$1.6B",
      label: "Largest Political Donation Ever",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
  {
    id: "the-fake-newsroom",
    title: "The Fake Newsroom",
    body: "There are now 1,265 partisan \u2018pink slime\u2019 news sites in the United States \u2014 more than the 1,213 real daily newspapers that remain. Metric Media alone operates over 1,000 sites across all 50 states, publishing AI-generated content designed to look like local journalism but engineered to advance specific political agendas. On the progressive side, Courier Newsroom runs 10 outlets designed to look like independent local news while pushing Democratic messaging. Meanwhile, 2,900+ real newspapers have closed since 2005. The void left by legitimate journalism is being filled, algorithmically and deliberately, by propaganda.",
    stat: {
      value: "1,265",
      label: "Pink Slime Sites (vs. 1,213 Real Papers)",
      color: "accent",
    },
    highlightColor: "#d97706",
  },
  {
    id: "the-policy-pipeline",
    title: "The Complete Pipeline",
    body: "The system operates as a closed loop. University programs funded by wealthy donors produce intellectual frameworks. Think tanks translate those frameworks into policy proposals. ALEC and the State Policy Network convert proposals into model legislation. State legislators introduce the bills. The Federalist Society pipeline places judges who uphold them. Media infrastructure provides public support narratives. Dark money funds the entire process while shielding every donor\u2019s identity. This is not influence. It is infrastructure \u2014 an industrial process for manufacturing law without democratic input, funded by a small number of families whose names the public may never know.",
    stat: {
      value: "7 Stages",
      label: "From Donor to Law",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
];

export default function TheInfluenceMachinePage() {
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
            <span className="text-accent-light">Chapter 10</span>
          </nav>

          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
            Chapter 10 &middot; The Field Guide to American Corruption
          </div>

          <h1 className="mt-6 font-headline text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl xl:text-8xl">
            The Influence Machine
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70 lg:text-2xl">
            Think tanks, dark money networks, model legislation factories, and
            judicial pipelines &mdash; how{" "}
            <span className="font-semibold text-white">
              a billion dollars a year
            </span>{" "}
            in ideological infrastructure shapes American law without a single
            public vote.
          </p>

          <div className="mt-8 flex items-center gap-6 text-sm text-white/50">
            <time dateTime="2026-03-11">March 11, 2026</time>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>45 min read</span>
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
            Behind every law is a process. In a functioning democracy, that
            process begins with public deliberation and ends with elected
            representatives casting votes on behalf of their constituents. In the
            United States, the process increasingly begins somewhere else
            entirely: in the policy shops of Washington think tanks funded by
            billionaire families, in the conference rooms where corporate
            lobbyists sit side by side with state legislators drafting model
            bills, in the donor-advised funds that launder the identities of the
            people bankrolling judicial confirmation campaigns, and in the
            partisan media outlets that have outnumbered real newspapers. The
            combined annual budgets of the major conservative and liberal think
            tank networks exceed $700 million. Dark money spending hit a record
            $1.9 billion in the 2024 federal election cycle, roughly double the
            2020 total. And the organizations that connect donors to policy
            outcomes &mdash; ALEC, the Federalist Society, DonorsTrust, the
            Arabella Advisors network &mdash; have grown into a permanent
            infrastructure for manufacturing governance outside the democratic
            process.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            This chapter maps the complete machine. It follows the money from its
            origins in the personal fortunes of a handful of families &mdash; the
            Kochs, the Scaifes, the Bradleys, the Coors, the Seid estate
            &mdash; through the think tanks that translate wealth into
            intellectual frameworks, the organizations that convert those
            frameworks into model legislation, the networks that place
            ideologically sympathetic judges on the federal bench, and the media
            infrastructure that provides the public narrative to sustain it all.
            Every dollar figure is sourced from IRS filings, FEC reports,
            investigative journalism, and organizational financial disclosures.
            The numbers are not estimates. They are the recorded output of a
            system that operates in plain sight and in deep shadow
            simultaneously.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            What emerges is not a conspiracy. It is something more durable: an
            industrial process &mdash; methodical, well-funded, and operating
            across every level of American governance &mdash; in which policy is
            manufactured, judges are cultivated, legislation is templated, and
            the public is presented with a finished product it had no role in
            shaping. This is the influence machine.
          </p>
        </div>
      </section>

      {/* Scrollytelling section */}
      <ScrollytellSection
        headline="Anatomy of the Influence Machine"
        subhead="Trace how donor money flows through think tanks, model legislation factories, dark money conduits, judicial pipelines, and partisan media to produce law without democratic input."
        steps={SCROLLYTELL_STEPS}
        bgColor="bg-ink"
        textColor="text-white"
      />

      {/* Pull quote break */}
      <section className="border-y-4 border-ink bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
          <blockquote className="text-center">
            <p className="font-headline text-3xl font-black leading-tight tracking-tight text-ink lg:text-4xl">
              &ldquo;Nearly two-thirds of the 2,000 proposals in the original
              Mandate for Leadership were adopted or attempted by the Reagan
              administration. The New York Times called it &lsquo;the manifesto
              of the Reagan revolution.&rsquo;&rdquo;
            </p>
            <cite className="mt-6 block font-mono text-sm font-bold uppercase tracking-widest text-muted">
              Heritage Foundation, on its 1981 policy blueprint
            </cite>
          </blockquote>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section A: Conservative Think Tank Network                    */}
      {/* ============================================================ */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Building2 className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Section A
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Conservative Think Tank Network
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The major conservative think tanks form an interconnected ecosystem
            that translates donor money into policy proposals, personnel
            pipelines, and intellectual frameworks for governance. Their combined
            annual budgets exceed $400 million. They share donors, board members,
            and policy priorities. They produce the white papers that become
            talking points, the talking points that become legislation, and the
            personnel who staff Republican administrations at every level. This
            is not think-tankery in the traditional academic sense. It is an
            industrial operation for manufacturing the intellectual justification
            for predetermined policy outcomes, funded by the same families and
            foundations that benefit from those outcomes.
          </p>

          {/* Heritage Foundation */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The Heritage Foundation: $134 Million and Project 2025
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Founded in 1973, the Heritage Foundation is the most politically
            consequential think tank in America. Its 2024 revenue reached $133.9
            million &mdash; a 33% increase over the prior year&apos;s $101
            million &mdash; with 96.37% of that funding coming from
            organizational donors and just 3.63% from individuals. The donor
            families whose money sustains Heritage read like a roster of
            American industrial wealth: the Coors family, the Koch family, the
            Uihlein family (Uline shipping supplies), the Scaife family
            (banking and oil), the Seid family (electronics manufacturing), and
            the Bradley family (diversified manufacturing). These are not
            passive philanthropists. They are strategic investors in a policy
            apparatus that directly serves their economic and ideological
            interests.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Heritage&apos;s influence on American governance was established in
            its first decade. In 1981, the foundation published its original
            Mandate for Leadership: a 20-volume, 3,000-page policy blueprint
            containing more than 2,000 specific recommendations for the incoming
            Reagan administration. Reagan distributed copies at his first
            cabinet meeting. By the end of his first year, 60% of the proposals
            had been implemented or initiated. Over the course of his
            presidency, nearly two-thirds of all 2,000 proposals were adopted
            or attempted. The New York Times called it &ldquo;the manifesto of
            the Reagan revolution.&rdquo; Heritage did not merely influence the
            Reagan agenda. Heritage <em>was</em> the Reagan agenda.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Project 2025, the modern sequel, operates on a larger scale. The
            initiative brought together more than 100 coalition partner
            organizations and 280+ named contributors &mdash; the New York Times
            traced 307 contributors, 182 of whom had direct ties to the Trump
            administration. The advisory groups behind Project 2025 received
            $120 million or more from billionaire families since 2020, funneled
            through a network that included the Alliance Defending Freedom,
            Susan B. Anthony Pro-Life America, the American Accountability
            Foundation, the Claremont Institute, and Hillsdale College. The
            document is a comprehensive governance blueprint: detailed plans for
            every federal agency, staffing recommendations, regulatory rollback
            timelines, and executive order templates. It is, in effect, a
            government-in-waiting &mdash; fully staffed, fully funded, and ready
            to deploy on day one of a friendly administration.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Heritage&apos;s policy influence extends well beyond its flagship
            publications. The foundation has shaped judicial nominations and
            confirmations, provided the intellectual framework for the 2017 Tax
            Cuts and Jobs Act, driven deregulation agendas across multiple
            administrations, influenced immigration enforcement policy, and set
            defense spending priorities. Its total expenses in 2024 reached
            $142.2 million &mdash; exceeding even its record revenue &mdash;
            reflecting an organization that is spending aggressively to
            translate its policy vision into governance reality.
          </p>

          {/* Stat grid for Heritage */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 sm:grid-cols-4">
            <div>
              <div className="font-headline text-3xl font-black text-accent lg:text-4xl">
                $134M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Heritage Revenue (2024)
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-ink lg:text-4xl">
                100+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Project 2025 Partners
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-money-out lg:text-4xl">
                $120M+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Billionaire Funding Since 2020
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-ink lg:text-4xl">
                2,000
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Proposals in 1981 Mandate
              </div>
            </div>
          </div>

          {/* Cato Institute */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The Cato Institute: Libertarian Ideas, Koch Money
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Cato Institute was founded in 1977 with $500,000 from Charles
            Koch, who also co-founded the organization alongside Ed Crane and
            Murray Rothbard. Its articles of incorporation were originally filed
            in December 1974 under the name &ldquo;Charles Koch Foundation.&rdquo;
            Today, Cato&apos;s annual revenue exceeds $71 million, with
            cumulative Koch gifts totaling $30 million and total fundraising
            since its founding surpassing $400 million from all donor sources.
            The institute employs 124 staff and focuses on libertarian policy
            analysis: free markets, free trade, civil liberties, drug policy
            reform, immigration reform, and criminal justice reform.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Cato occupies a distinctive position in the conservative think tank
            ecosystem. Unlike Heritage, which functions as a policy arm of the
            Republican Party, Cato maintains a commitment to ideological
            libertarianism that occasionally puts it at odds with party
            orthodoxy &mdash; supporting immigration reform, opposing the war on
            drugs, and criticizing corporate welfare. This ideological
            independence has made Cato both more intellectually credible and
            less operationally powerful than Heritage. It produces the ideas
            that free-market conservatives cite in academic debates; Heritage
            produces the legislation that free-market conservatives enact into
            law.
          </p>

          {/* AEI, Manhattan, Hoover */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            AEI, Manhattan Institute &amp; Hoover: The Supporting Architecture
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The American Enterprise Institute, founded in 1938, operates on an
            estimated $68 million annual budget and focuses on free enterprise
            economics, foreign policy, and regulatory analysis. Between 2003 and
            2010, AEI received $86.7 million from identifiable sources,
            according to a Drexel University study. Major donors between 2012
            and 2016 included the Charles Koch Foundation ($1.6 million+),
            DonorsTrust and Donors Capital Fund ($5 million+), the Sarah Scaife
            Foundation ($1.7 million+), the Bradley Foundation ($480,000), and
            the Coors Foundation ($425,000). The donor overlap with Heritage is
            not coincidental &mdash; it is structural. The same families fund
            multiple nodes in the same network, ensuring that the intellectual
            output is coordinated even when the organizations are nominally
            independent.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Manhattan Institute for Policy Research, founded in 1978 and
            headquartered in New York City, reported $26.9 million in revenue in
            2023. Its donor base includes the Thomas W. Smith Foundation ($1.27
            million in 2019), the Bradley Foundation ($625,000), the Gates
            Foundation ($599,631 in 2017), the Charles Koch Foundation ($790,305
            from 2013 to 2021), the Claude R. Lambe Foundation ($2.075 million
            from 2001 to 2012), and Stand Together Fellowships ($445,520).
            Manhattan Institute specializes in urban policy, education reform,
            energy policy, and legal reform &mdash; translating national
            conservative frameworks into policy recommendations targeted at
            cities and states.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Hoover Institution on War, Revolution and Peace, housed at
            Stanford University since 1919, operates on an estimated $75 million
            annual budget, with 59% coming from philanthropic gifts, 39% from
            endowment earnings, and 2% from other sources. Its major funders
            include the Taube Family Foundation, the Koret Foundation, the Howard
            Charitable Foundation, the Sarah Scaife Foundation, the Walton
            Foundation, the Lynde and Harry Bradley Foundation, and the William
            E. Simon Foundation. Hoover&apos;s academic affiliation provides a
            veneer of scholarly independence that other conservative think tanks
            lack, allowing it to produce national security and economic research
            that carries the implicit authority of a world-class university.
          </p>

          {/* Combined budget stat */}
          <div className="my-12 rounded-xl border border-border bg-surface p-8">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
              Combined Conservative Think Tank Annual Budgets
            </div>
            <div className="mt-2 font-headline text-5xl font-black text-accent lg:text-6xl">
              $400M+
            </div>
            <div className="mt-2 text-sm text-muted">
              Heritage $134M + Cato $71M + AEI $68M + Hoover $75M + Manhattan
              $27M &mdash; funded substantially by the same overlapping network
              of donor families
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section B: Liberal/Progressive Think Tank Network             */}
      {/* ============================================================ */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Landmark className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Section B
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Liberal &amp; Progressive Think Tank Network
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The progressive think tank ecosystem is younger, less coordinated,
            and somewhat less lavishly funded than its conservative counterpart,
            though its combined annual budgets approach $300 million. Where
            conservative think tanks were built over five decades through
            deliberate, donor-driven institution building, progressive think
            tanks emerged more organically from academic traditions and policy
            debates, with significant funding from foundations, labor unions, and
            individual philanthropists. The result is an ecosystem that
            produces rigorous policy research but lacks the operational
            discipline &mdash; the ALEC-to-statehouse pipeline, the Federalist
            Society judicial conveyor belt &mdash; that gives conservative
            infrastructure its outsized legislative impact.
          </p>

          {/* Center for American Progress */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Center for American Progress: The Democratic Policy Hub
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Center for American Progress was founded in 2003 by John Podesta,
            former chief of staff to President Clinton, with the explicit goal
            of building a progressive counterweight to Heritage and AEI. Its
            2023 revenue reached $46.1 million. More than 96% of its funding
            comes from individuals and foundations, with 2.2% from labor unions,
            1.4% from corporations, and 0.2% from foreign governments. George
            Soros&apos;s organizations contributed $5.4 million between 2005 and
            2010 through the Foundation to Support Open Society and the Open
            Society Institute. Other major individual donors have included Peter
            Lewis, Steve Bing, and Herb and Marion Sandler.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            CAP&apos;s major foundation donors in 2022 included Bloomberg
            Philanthropies, Carnegie Corporation of New York, the Chan
            Zuckerberg Initiative, the Bill &amp; Melinda Gates Foundation, the
            William and Flora Hewlett Foundation, the Sandler Foundation, Silicon
            Valley Community Foundation, and the Wellspring Philanthropic Fund
            &mdash; all at the $1 million+ level. Corporate donors in 2024
            included Google, Apple, and NBC Universal. CAP focuses on health care
            policy, economic opportunity, climate and energy, immigration,
            education, and national security. It has served as a talent pipeline
            for Democratic administrations, with dozens of its staff moving into
            government positions under Presidents Obama and Biden.
          </p>

          {/* Brookings */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Brookings Institution: The Establishment Voice
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Brookings Institution, founded in 1916, is the oldest and
            largest policy research organization in the United States. Its
            fiscal year 2024 revenue reached $98.7 million, with expenses of
            $100.1 million and net assets of $487.8 million. More than 80% of
            its revenue comes from gifts and grants provided by a diverse array
            of individuals, foundations, corporations, and governments. Brookings
            positions itself as centrist and nonpartisan, though its policy
            prescriptions on foreign policy, economics, governance, metropolitan
            policy, and global development generally align with establishment
            Democratic thinking. Its scholars have staffed administrations of
            both parties, and its research is cited by policymakers across the
            ideological spectrum &mdash; a credibility advantage that the more
            explicitly partisan think tanks on both sides do not enjoy.
          </p>

          {/* Urban Institute, EPI, Roosevelt */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Urban Institute, EPI &amp; Roosevelt Institute
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Urban Institute, founded in 1968, is the largest progressive
            policy research organization by revenue at $125 million in 2024.
            Its revenue breakdown reveals a distinctive funding model: $80.3
            million in program and project grants, $34.3 million in contract
            amounts earned, $2 million in general support, $7.1 million in
            investment return, and $1.3 million in interest and other income.
            Federal government revenue accounts for 32.1% of its budget &mdash;
            making it significantly more dependent on government contracts than
            its conservative counterparts, which draw almost exclusively from
            private donors. Urban Institute focuses on housing and communities,
            income and benefits, health policy, education, tax policy, and
            criminal justice.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Economic Policy Institute, founded in 1986, operates on a $13.3
            million budget with strong ties to organized labor &mdash;
            union-funded research on minimum wage, trade policy, and worker
            protections forms its core output. The Roosevelt Institute, founded
            in 1987 and headquartered in New York City, reported $13.2 million
            in revenue and $36.7 million in net assets in 2023, focusing on
            economic reform, corporate governance, climate policy, and the
            relationship between democracy and markets. These smaller
            organizations fill important niches but lack the scale and political
            connections of Heritage or Brookings.
          </p>

          {/* Stat grid for progressive tanks */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 sm:grid-cols-4">
            <div>
              <div className="font-headline text-3xl font-black text-accent lg:text-4xl">
                $296M+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Combined Liberal Budgets
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-ink lg:text-4xl">
                $99M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Brookings Revenue
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-ink lg:text-4xl">
                $125M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Urban Institute Revenue
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-money-in lg:text-4xl">
                $46M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                CAP Revenue
              </div>
            </div>
          </div>

          {/* Asymmetry callout */}
          <div className="rounded-xl border border-border bg-paper p-8">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
              The Asymmetry Problem
            </h4>
            <p className="mt-4 text-lg leading-relaxed text-ink/70">
              While progressive think tanks collectively approach $300 million in
              annual budgets, they lack the operational infrastructure that gives
              conservative organizations their disproportionate legislative
              impact. There is no progressive equivalent to ALEC &mdash; no
              factory producing 1,000 model bills per year for state
              legislatures. There is no progressive Federalist Society &mdash;
              no systematic pipeline placing ideologically sympathetic judges
              across the federal bench. There is no progressive State Policy
              Network &mdash; no coordinated network of 64 state-level policy
              organizations pushing a unified legislative agenda. The
              progressive ecosystem produces research. The conservative
              ecosystem produces law.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section C: Dark Money Networks                                */}
      {/* ============================================================ */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Eye className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Section C
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Dark Money Networks
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            Dark money &mdash; political spending by organizations that do not
            disclose their donors &mdash; hit a record $1.9 billion in the 2024
            federal election cycle, roughly doubling the $1 billion spent in
            2020. Since Citizens United in 2010, the cumulative total has
            surpassed $4.3 billion in disclosed dark money on federal elections
            alone &mdash; and the Brennan Center for Justice notes that this
            figure &ldquo;necessarily &mdash; and perhaps substantially &mdash;
            underestimates the true scale.&rdquo; Both parties have built
            industrial-scale dark money operations. In 2024, $1.2 billion in
            dark money benefited Democrats while $664 million benefited
            Republicans. But the infrastructure behind the money &mdash; the
            permanent organizations, the donor networks, the institutional
            memory &mdash; is where the real power lies.
          </p>

          {/* Koch Network */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The Koch Network: $2+ Billion and Counting
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Koch political network is the most extensive privately funded
            political operation in American history. Charles Koch began building
            political infrastructure in the 1970s, co-founding the Cato
            Institute in 1977 and establishing a series of donor organizations
            that would eventually span think tanks, universities, super PACs,
            dark money nonprofits, and grassroots advocacy organizations. Total
            spending has exceeded $2 billion cumulatively since 2008, with
            individual cycle spending ranging from under $100 million in 2008 to
            $407 million in 2012, to $700-900 million in 2016 (depending on
            counting methodology), to a $400 million announced budget for the
            2018 midterms &mdash; a 60% increase over the 2016 cycle.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The network&apos;s institutional centerpiece is Americans for
            Prosperity, a 501(c)(4) advocacy nonprofit with $112 million in
            2022 revenue. Its affiliated super PAC, AFP Action, spent $157
            million in the 2024 federal elections &mdash; tripling its 2020
            level &mdash; with two-thirds going to House and Senate races. The
            funding trail reveals the network&apos;s internal mechanics: Koch
            Industries contributed $40 million in two donations (May 2023 and
            July 2024), and the Stand Together Chamber of Commerce &mdash; a
            Koch-controlled entity &mdash; served as a dark money conduit for
            an additional $43 million to AFP Action. The money moves from
            Koch Industries to Stand Together to AFP Action, with each transfer
            adding a layer of legal distance between the source and the
            expenditure.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Koch donor summits, held twice yearly by invitation only, are
            the operational hub. Five hundred or more wealthy donors attend each
            event, receiving detailed briefings on network priorities and
            pledging specific amounts to specific organizations. The summits
            began in 2003 and have produced more than $1 billion in documented
            pledges. The network&apos;s influence spans energy policy and fossil
            fuel deregulation, labor law and right-to-work legislation, criminal
            justice reform, education (school choice and charter schools), tax
            policy (estate tax elimination and corporate rate cuts),
            environmental regulation rollback, and higher education funding
            through the Mercatus Center and university programs at 300+
            institutions nationwide.
          </p>

          {/* Koch stat grid */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 sm:grid-cols-4">
            <div>
              <div className="font-headline text-3xl font-black text-accent lg:text-4xl">
                $2B+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Cumulative Koch Spending
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-money-out lg:text-4xl">
                $157M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                AFP Action (2024)
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-ink lg:text-4xl">
                500+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Donors Per Summit
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-ink lg:text-4xl">
                $900M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Peak Cycle Spending (2016)
              </div>
            </div>
          </div>

          {/* DonorsTrust */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            DonorsTrust: The Dark Money ATM
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            DonorsTrust and its sister organization Donors Capital Fund serve as
            the primary donor-advised fund infrastructure for conservative and
            libertarian donors. Founded in 1999 and headquartered in Alexandria,
            Virginia, the organizations have granted more than $2.5 billion to
            conservative causes since inception. The mechanism is
            straightforward: a wealthy donor makes a tax-deductible contribution
            to DonorsTrust. DonorsTrust then distributes grants under its own
            name, concealing the identity of the original donor. Mother Jones
            magazine called it the &ldquo;dark money ATM of the right.&rdquo;
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            In 2022 alone, DonorsTrust distributed $242 million in grant
            recommendations to more than 1,100 unique charities &mdash; a 21%
            increase over the $190 million distributed in 2021. The recipient
            categories read like a directory of conservative infrastructure:
            Heritage Foundation, AEI, Cato Institute, Manhattan Institute,
            Federalist Society, climate science denial organizations, anti-union
            advocacy groups, school choice organizations, deregulation
            advocates, State Policy Network affiliates, and organizations in
            the Leonard Leo network. The 2024 filings reveal striking
            concentration: the America First Legal Foundation received $21.3
            million from DonorsTrust in 2024, up from $3.2 million the prior
            year. The America First Policy Institute received $4.4 million, up
            from $159,200. These are not gradual shifts. They are deliberate,
            large-scale redeployments of anonymous money to emerging nodes in
            the conservative network.
          </p>

          {/* Leonard Leo / Marble Freedom Trust */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Leonard Leo &amp; Marble Freedom Trust: The $1.6 Billion Donation
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Leonard Leo, the longtime co-chairman of the Federalist Society, has
            built a parallel dark money empire that extends far beyond judicial
            nominations into media, culture, and policy. His network raised
            $600 million or more between 2014 and 2020, according to tax
            records. Then came the donation that rewrote the scale of American
            political giving: in 2021, Barre Seid, a 90-year-old Chicago
            manufacturing magnate, donated 100% of his shares in Tripp Lite to
            Leo&apos;s Marble Freedom Trust. The shares were sold to
            Ireland-based Eaton Corporation, generating approximately $1.6
            billion &mdash; the largest known donation to a political advocacy
            group in United States history. By structuring the gift as a
            charitable donation of appreciated stock, Seid avoided an estimated
            $400 million in capital gains taxes.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Marble Freedom Trust is structured as a trust rather than a
            corporation &mdash; a legal distinction that allows it to avoid
            public disclosure of its name, directors, and address. It has
            already distributed hundreds of millions: $141.5 million to the 85
            Fund, $100.9 million cumulative to the Concord Fund (formerly the
            Judicial Crisis Network, which led confirmation campaigns for
            conservative Supreme Court justices), and tens of millions more
            through a donor-advised fund at Schwab Charitable. Leo told the
            Financial Times in September 2024 that he planned to devote $1
            billion to &ldquo;crush liberal dominance&rdquo; in news and
            entertainment. A CREW investigation found that Leo-tied nonprofits
            paid his own businesses $90 million over six years &mdash; raising
            significant self-dealing concerns about the governance of the
            network.
          </p>

          {/* Arabella Advisors */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Arabella Advisors: The Liberal Dark Money Juggernaut
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Arabella Advisors &mdash; recently rebranded as Sunflower Services
            &mdash; manages the largest liberal dark money network in America.
            The for-profit LLC, headquartered in Washington, D.C., advises
            left-leaning donors and nonprofits about where to give money and
            manages five dark money nonprofits whose combined revenue reached
            $1.51 billion in 2024, up from $1.2 billion in 2023. Between 2019
            and 2022, the four main entities processed more than $5 billion in
            total. The network has channeled billions in untraceable funds to
            progressive causes since 2016.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The five nonprofit entities form a sophisticated fiscal sponsorship
            operation. The New Venture Fund (501(c)(3)) serves as the primary
            fiscal sponsor for charitable projects and pop-up organizations.
            The Sixteen Thirty Fund (501(c)(4)) is the political advocacy arm,
            described by The Atlantic as &ldquo;the indisputable heavyweight of
            Democratic dark money&rdquo; &mdash; it was the second-largest
            super PAC donor in 2020, giving $61 million. The Hopewell Fund and
            Windward Fund, both 501(c)(3) organizations, sponsor charitable and
            environmental projects respectively. The North Fund (501(c)(4))
            handles political advocacy and issue campaigns.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The fiscal sponsorship model is the key to the network&apos;s power
            and opacity. Arabella&apos;s nonprofits serve as fiscal sponsors for
            hundreds of temporary advocacy organizations &mdash; &ldquo;pop-up
            groups&rdquo; that appear to be independent but operate under the
            financial and legal umbrella of the parent nonprofits. These groups
            receive tax-exempt status, payroll, and financial infrastructure
            from the parent fund without separate incorporation. They can appear
            and disappear as campaigns require. No separate IRS filings are
            necessary. Donor anonymity is preserved at every level.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The network&apos;s major donors are partially known through
            investigative reporting. Swiss billionaire Hansjoerg Wyss has donated
            $245 million to the Sixteen Thirty Fund and New Venture Fund since
            2016. The Bill &amp; Melinda Gates Foundation has provided $450
            million over sixteen years, making it one of the earliest and
            largest funders. These figures represent the fraction that has been
            traced. The vast majority of the network&apos;s $1.51 billion in
            2024 revenue remains completely anonymous &mdash; by design.
          </p>

          {/* Dark money overview stats */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 sm:grid-cols-3">
            <div>
              <div className="font-headline text-3xl font-black text-accent lg:text-4xl">
                $1.9B
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Dark Money (2024 Cycle)
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-money-out lg:text-4xl">
                $2.5B+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                DonorsTrust Cumulative
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-ink lg:text-4xl">
                $1.51B
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Arabella Revenue (2024)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pull quote: Leonard Leo */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
          <blockquote className="border-l-4 border-accent bg-paper p-8 shadow-sm">
            <p className="font-headline text-2xl font-black leading-tight tracking-tight text-ink lg:text-3xl">
              &ldquo;We are going to crush liberal dominance in news and
              entertainment.&rdquo;
            </p>
            <cite className="mt-4 block font-mono text-sm font-bold uppercase tracking-widest text-muted">
              Leonard Leo, Financial Times interview, September 2024 &mdash;
              announcing plans to deploy $1 billion from the Barre Seid
              donation
            </cite>
          </blockquote>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section D: ALEC & Model Legislation                          */}
      {/* ============================================================ */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Section D
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            ALEC &amp; the Model Legislation Factory
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The American Legislative Exchange Council is the primary mechanism
            through which corporations directly collaborate with state
            legislators to draft legislation. Founded in 1973 and headquartered
            in Arlington, Virginia, ALEC operates on an annual revenue of
            approximately $10.1 million, with 98% of its funding coming from
            corporations or corporate foundations. The funding asymmetry between
            corporate and legislative members tells the story: corporations pay
            $7,000 to $25,000 or more for membership, while legislators pay a
            nominal $100 in annual dues. ALEC claims nearly one-quarter of all
            state legislators as members &mdash; the Center for Media and
            Democracy recorded 897 members in early 2020 &mdash; and counts
            nearly 300 corporate, foundation, and private-sector members.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The operational model is unprecedented in American governance.
            Corporations and legislators sit as equals on ALEC task forces
            organized by policy area &mdash; tax, energy, education, criminal
            justice &mdash; and jointly vote on model legislation that
            legislators then introduce verbatim in their home states. ALEC
            provides template bills, talking points, and legislative strategy.
            The corporations fund the process and shape the language. The result
            is approximately 1,000 ALEC model bills introduced in state
            legislatures each year, with roughly 20% &mdash; approximately 200
            bills &mdash; enacted into law. Between 2010 and 2018, 2,900 ALEC
            bills were introduced in all 50 states and Congress, with more than
            600 becoming law.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The policy areas covered by ALEC model legislation reveal the
            corporate interests that drive the organization. Right-to-work and
            anti-union legislation weakens organized labor. Voter ID
            requirements add barriers to voting in communities that tend to
            support Democratic candidates. Stand Your Ground laws expand
            self-defense doctrines in ways that benefit the firearms industry.
            Renewable energy standard rollbacks protect fossil fuel companies.
            Private prison expansion creates markets for the corrections
            industry. Pension reform reduces public employee benefits. The
            Arizona SB 1070 immigration enforcement model was drafted at an ALEC
            meeting with the private prison company Corrections Corporation of
            America in the room. Tort reform limits corporate liability.
            Preemption laws prevent cities from raising minimum wages, enacting
            paid sick leave, or passing environmental regulations that exceed
            state standards.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            ALEC&apos;s major corporate funders include Koch Foundations
            ($600,000+ over the past decade), the Bradley Foundation ($2.34
            million through 2016), ExxonMobil (long-standing major funder), and
            multiple pharmaceutical companies on its Private Enterprise Board.
            The organization also operates a &ldquo;scholarship&rdquo; program
            that funds legislators&apos; travel to ALEC conferences &mdash;
            effectively paying lawmakers to attend events where they receive
            pre-written legislation from corporate sponsors.
          </p>

          {/* ALEC stats */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 sm:grid-cols-4">
            <div>
              <div className="font-headline text-3xl font-black text-accent lg:text-4xl">
                ~1,000
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Model Bills/Year
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-money-in lg:text-4xl">
                ~20%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Enactment Rate
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-ink lg:text-4xl">
                98%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Funding From Corporations
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-ink lg:text-4xl">
                300
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Corporate Members
              </div>
            </div>
          </div>

          {/* Trayvon Martin case study */}
          <div className="rounded-xl border border-border bg-surface p-8">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
              Case Study: The Trayvon Martin Exodus
            </h4>
            <p className="mt-4 text-lg leading-relaxed text-ink/70">
              In February 2012, 17-year-old Trayvon Martin was shot and killed in
              Sanford, Florida, by George Zimmerman, who invoked Florida&apos;s
              Stand Your Ground law &mdash; a law based on an ALEC model bill.
              The resulting public outcry triggered the most significant
              corporate exodus in ALEC&apos;s history. Twenty-five corporations
              dropped their ALEC membership, along with four major nonprofits
              and 55 elected officials. The companies that left included
              Coca-Cola, Pepsi, Kraft Foods, McDonald&apos;s, Wendy&apos;s,
              Mars, Walmart, Amazon, General Electric, and Intuit. The Bill
              &amp; Melinda Gates Foundation also departed. In total, more than
              60 corporations abandoned ALEC, costing the organization $1.4
              million in income by June 2013 &mdash; a budget hole exceeding
              one-third of projected income.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink/70">
              ALEC&apos;s response was revealing. The organization launched the
              &ldquo;Prodigal Son Project&rdquo; &mdash; an internal campaign to
              identify 40+ lapsed corporate members and recruit them back. The
              project acknowledged that corporate participation was essential to
              ALEC&apos;s financial survival and legislative influence. The
              exodus demonstrated that ALEC&apos;s power depends on corporate
              willingness to be publicly associated with its agenda &mdash; and
              that sustained public pressure can disrupt the model legislation
              pipeline, at least temporarily.
            </p>
          </div>

          {/* State Policy Network */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The State Policy Network: 64 Think Tanks in 50 States
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The State Policy Network, founded in 1992 and headquartered in
            Arlington, Virginia, coordinates 64 state-focused think tanks
            across all 50 states, with more than 150 total member organizations
            including non-state-specific affiliates. SPN&apos;s own annual
            revenue is approximately $24 million, but the combined revenue of
            its member organizations reached $188 million in 2024 &mdash; up
            from $152 million in 2022 and $120 million in 2019. The network
            serves as the state-level implementation arm of the conservative
            policy infrastructure, translating national priorities into
            localized research, advocacy, and legislative campaigns.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The connections between SPN, ALEC, and the Koch network are
            extensive and documented. The Stand Together Trust provided $5
            million to SPN-affiliated think tanks in 2022. DonorsTrust and the
            Donors Capital Fund serve as major funding conduits. The Charles
            Koch Foundation makes direct grants to multiple SPN member
            organizations. All 64 member state think tanks have pushed ALEC
            agenda items, and 34 or more have direct ties to ALEC. Notable
            members include the Goldwater Institute (Arizona), the Mackinac
            Center for Public Policy (Michigan), the Texas Public Policy
            Foundation, the Independence Institute (Colorado), the John Locke
            Foundation (North Carolina), and the Heartland Institute (Illinois).
            The policy areas align precisely with ALEC&apos;s model legislation
            portfolio: right-to-work, public employee pension reform, school
            choice and vouchers, anti-renewable energy campaigns, occupational
            licensing reform, state tax reduction, government spending cuts,
            and criminal justice reform.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section E: Federalist Society & Judicial Pipeline             */}
      {/* ============================================================ */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Gavel className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Section E
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Federalist Society &amp; the Judicial Pipeline
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The Federalist Society for Law and Public Policy Studies is the
            gateway through which conservative legal ideology is translated into
            judicial appointments, regulatory policy, and law school culture. It
            is, by any measure, the most successful legal organization in
            American history. Founded in 1982 at Yale, Harvard, and the
            University of Chicago law schools, the Federalist Society has grown
            from a $100,000 budget and two student chapters into an
            organization with $20 million+ in annual revenue (reaching $22.6
            million in 2018), 204 chapters at ABA-accredited law schools plus
            10 satellite chapters, and a lawyers division of 70,000+ practicing
            attorneys across 90+ cities. It is the largest conservative legal
            organization in the United States.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Society&apos;s influence on the federal judiciary is without
            precedent. Six of the nine current Supreme Court justices are
            current or former members of the Federalist Society: Chief Justice
            John Roberts, Justice Clarence Thomas, Justice Samuel Alito, Justice
            Neil Gorsuch, Justice Brett Kavanaugh, and Justice Amy Coney
            Barrett. When Donald Trump entered office in 2017, he effectively
            outsourced judicial selection to the Federalist Society, relying on
            lists vetted by Leonard Leo and the organization&apos;s leadership
            to fill not only Supreme Court vacancies but hundreds of district
            and circuit court appointments. The result is a federal judiciary
            that has been systematically reshaped by a single organization over
            four decades &mdash; an achievement that will outlast any
            presidential administration by a generation or more.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Federalist Society&apos;s major donors in 2018 included the
            Charles Koch Charitable Foundation ($768,000), the Hewlett
            Foundation ($543,000), the Templeton Foundation ($423,000), and 47
            separate foundations contributing a combined $4 million. These
            figures represent only the traceable fraction. The organization
            shapes administrative law doctrine &mdash; including the successful
            campaign to overturn Chevron deference, which had required courts to
            defer to federal agency interpretations of ambiguous statutes
            &mdash; the revival of the non-delegation doctrine, and the
            expansion of originalist legal theory throughout the judiciary.
            Student chapters train the next generation of conservative legal
            thinkers. Faculty divisions embed conservative legal theory in law
            school curricula. The lawyers network connects conservative
            attorneys across private practice, government, and the judiciary in
            a self-reinforcing ecosystem of ideology, mentorship, and career
            advancement.
          </p>

          {/* Judicial pipeline stats */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 sm:grid-cols-4">
            <div>
              <div className="font-headline text-3xl font-black text-accent lg:text-4xl">
                6 of 9
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                SCOTUS Justices Are Members
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-ink lg:text-4xl">
                70,000+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Lawyer Members
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-money-out lg:text-4xl">
                $600M+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Leo Network (2014&ndash;2020)
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-ink lg:text-4xl">
                204
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Law School Chapters
              </div>
            </div>
          </div>

          {/* Academic Capture */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Academic Capture: When Universities Become Policy Arms
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The judicial pipeline begins in the academy, and the academy has
            been systematically infiltrated by donor money. The most documented
            case is the Koch network&apos;s investment in George Mason
            University and the Mercatus Center. Koch family foundations have
            contributed $30 million or more directly to GMU, with $46.5 million
            going to the GMU Foundation since 2005 &mdash; the bulk directed to
            the Economics department and the Law and Economics Center. Released
            donor agreements revealed that Koch Foundation endowed funds for
            professor salaries with two of five hiring committee members chosen
            by the donors &mdash; effectively giving donors veto power over
            academic appointments.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Mercatus Center, originally founded as the Center for the Study
            of Market Processes at Rutgers University before moving to GMU in
            the mid-1980s, operates a private email server for
            @mercatus.gmu.edu addresses &mdash; bypassing Virginia&apos;s
            Freedom of Information Act requirements. The co-founder of UnKoch
            My Campus described the arrangement: &ldquo;Mercatus&apos;s ties to
            the university allow the organization to essentially launder its
            agenda so it appears more objective.&rdquo; Google funded
            conferences at GMU where invited experts &ldquo;forcefully
            rejected&rdquo; government antitrust action against Google.
            Deregulation research produced at Mercatus is cited in congressional
            testimony. Cost-benefit analysis frameworks developed there are used
            to oppose environmental regulations. The center functions as an
            academic laundering operation &mdash; taking policy positions
            predetermined by donor interests and clothing them in the authority
            of a university.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The pattern extends across industries. The fossil fuel industry has
            donated tens to hundreds of millions to universities, sat on
            governing boards, sponsored scholarships, and built pro-fossil-fuel
            programming &mdash; yet only 7 peer-reviewed studies out of 14,000
            papers on conflicts of interest have scrutinized fossil fuel
            industry influence in academia. The tobacco industry pioneered the
            model, with Philip Morris offering $1 billion for research funding
            designed to create doubt about health risks. The pharmaceutical
            industry funds university clinical trials where industry-funded
            studies are systematically more likely to report favorable results
            than independently funded studies. Koch-funded economics programs
            now operate at 300+ universities nationwide. The university system
            &mdash; the institution that society trusts to produce independent
            knowledge &mdash; has been co-opted as a credentialing service for
            donor-driven policy agendas.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section F: Partisan Media Infrastructure                     */}
      {/* ============================================================ */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Newspaper className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Section F
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Partisan Media Infrastructure &amp; the Death of Local News
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The final stage of the influence machine is narrative control. The
            think tanks produce the ideas. ALEC produces the legislation. The
            Federalist Society produces the judges. But none of it functions
            without a media infrastructure that provides public support for
            predetermined policy outcomes while simultaneously destroying the
            independent journalism that might expose the machinery behind them.
            What has emerged in the United States is not a media ecosystem in
            any traditional sense. It is a propaganda infrastructure masquerading
            as journalism, funded by dark money and corporate interests, and
            filling the void left by the collapse of local news.
          </p>

          {/* Sinclair */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Sinclair Broadcasting: 185 Stations, One Message
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Sinclair Broadcast Group (now Sinclair Inc.) owns 185 television
            stations, making it the largest owner of stations affiliated with
            Fox, NBC, CBS, and ABC. Its 2024 annual revenue reached $3.55
            billion, with political ad revenue alone hitting a record $405
            million &mdash; a 16% increase over 2020. Sinclair is widely
            regarded as politically conservative: 80% of its PAC donations went
            to Republicans in the 2017-2018 cycle. The company has required its
            local anchors to read identical scripts promoting conservative
            viewpoints on multiple occasions. In 2018, anchors across dozens of
            stations were required to read identical promos criticizing
            &ldquo;fake stories&rdquo; in the media. In June 2024, dozens of
            anchors delivered identical introductions questioning President
            Biden&apos;s mental acuity. Regular &ldquo;must-run&rdquo;
            conservative commentary segments are embedded in local news
            broadcasts that viewers trust as independent journalism.
          </p>

          {/* Pink Slime */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            Pink Slime: 1,265 Fake Newsrooms
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            There are now 1,265 partisan &ldquo;pink slime&rdquo; news sites in
            the United States. That number exceeds the 1,213 real daily
            newspapers that remain in operation. Pink slime sites are partisan
            websites masquerading as local news, funded by dark money, advocacy
            groups, and special interests. They use local-sounding names, mimic
            the layout of legitimate news sites, and publish content designed to
            appear as objective journalism while advancing specific political
            agendas.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The largest conservative pink slime operation is Metric Media, which
            runs more than 1,000 local news sites across all 50 states &mdash;
            many of them publishing AI-generated content at industrial scale.
            Star News Digital Media operates 12 additional conservative-leaning
            local outlets. On the progressive side, The American Independent
            (a 501(c)(4)) pushes Democratic voter mobilization, and Courier
            Newsroom operates 10 media outlets branded as a &ldquo;pro-democracy
            news network&rdquo; &mdash; progressive news sites designed to look
            like independent local journalism. The partisan breakdown is
            striking: eight primary organizations run these networks (four
            conservative, four progressive), but the majority of sites were
            created by conservative Metric Media. All of them share deep, often
            opaque ties to dark money, advocacy groups, and other special
            interests.
          </p>

          {/* Local news collapse */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The Local News Collapse
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The proliferation of pink slime is possible only because legitimate
            local news is disappearing. More than 2,900 newspapers have closed
            in the United States since 2005, creating vast news deserts where no
            professional journalists cover local government, school boards,
            zoning decisions, or police conduct. The void left by their absence
            is being filled &mdash; algorithmically and deliberately &mdash; by
            partisan operations designed to look like the local news they
            replaced. Communities that lost their local newspaper are now more
            likely to encounter AI-generated partisan content than actual
            reporting about their own city council.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The economic destruction of local news and the rise of partisan
            media are not separate phenomena. They are two sides of the same
            process. As advertising revenue migrated to digital platforms,
            newspapers lost the economic foundation that sustained independent
            reporting. The organizations that benefit from reduced public
            scrutiny &mdash; corporations, political operatives, dark money
            networks &mdash; moved into the vacuum with content designed to
            advance their interests. The result is an information environment in
            which American citizens are simultaneously underinformed about local
            governance and overexposed to nationally coordinated partisan
            messaging dressed up as hometown news.
          </p>

          {/* Media stats */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 sm:grid-cols-3">
            <div>
              <div className="font-headline text-3xl font-black text-accent lg:text-4xl">
                1,265
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Pink Slime Sites
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-money-out lg:text-4xl">
                1,213
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Real Daily Newspapers
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-ink lg:text-4xl">
                2,900+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Newspapers Closed Since 2005
              </div>
            </div>
          </div>

          {/* Partisan media callouts */}
          <div className="rounded-xl border border-border bg-surface p-8">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
              The Partisan Media Ecosystem by the Numbers
            </h4>
            <div className="mt-6 space-y-6">
              <div className="border-b border-border pb-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-semibold text-ink">
                    Sinclair Broadcast Group
                  </span>
                  <span className="font-mono text-sm font-bold text-accent">
                    $3.55B revenue
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">
                  185 stations &middot; $405M in political ad revenue (2024
                  record) &middot; 80% of PAC donations to Republicans
                </p>
              </div>
              <div className="border-b border-border pb-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-semibold text-ink">
                    The Daily Wire
                  </span>
                  <span className="font-mono text-sm font-bold text-accent">
                    $200M+ revenue
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">
                  Founded 2015 with $4.7M from petroleum billionaire Farris
                  Wilks &middot; Valued at $1B+ &middot; Subscription-driven
                  conservative media
                </p>
              </div>
              <div className="border-b border-border pb-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-semibold text-ink">
                    The Epoch Times
                  </span>
                  <span className="font-mono text-sm font-bold text-accent">
                    $122M revenue (2021)
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">
                  685% revenue growth (2019&ndash;2021) &middot; CFO indicted
                  for $67M money laundering &middot; Second-largest funder of
                  pro-Trump Facebook ads in 2019
                </p>
              </div>
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-semibold text-ink">
                    Metric Media
                  </span>
                  <span className="font-mono text-sm font-bold text-accent">
                    1,000+ sites
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">
                  AI-generated partisan content across all 50 states &middot;
                  Largest pink slime network &middot; Dark money funded
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* The Complete Pipeline                                        */}
      {/* ============================================================ */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Network className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              The Full Picture
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Policy Pipeline: From Donor to Law in Seven Stages
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The influence machine does not operate as a collection of
            independent organizations. It operates as an integrated system
            &mdash; a policy pipeline with seven identifiable stages, each
            funded by the same small network of donors, each reinforcing the
            others, and each producing outputs that feed into the next stage.
            Understanding the pipeline as a whole reveals something that
            examining any single organization in isolation cannot: the degree
            to which American law is manufactured outside democratic
            institutions by a privately funded industrial process.
          </p>

          {/* Pipeline stages */}
          <div className="my-12 space-y-6">
            <div className="flex gap-4 rounded-lg border border-border bg-paper p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-black text-white">
                1
              </div>
              <div>
                <h4 className="font-headline text-lg font-bold text-ink">
                  Academic Research
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-ink/60">
                  Koch-funded programs at 300+ universities and the Mercatus
                  Center produce intellectual frameworks &mdash; cost-benefit
                  analyses, deregulation studies, free-market economics research
                  &mdash; that provide the scholarly foundation for
                  predetermined policy outcomes.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg border border-border bg-paper p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-black text-white">
                2
              </div>
              <div>
                <h4 className="font-headline text-lg font-bold text-ink">
                  Think Tank Translation
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-ink/60">
                  Heritage ($134M), Cato ($71M), and AEI ($68M) translate
                  academic research into specific policy proposals, white
                  papers, legislative language, and personnel recommendations
                  &mdash; the 2,000 proposals in Mandate for Leadership, the
                  900 pages of Project 2025.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg border border-border bg-paper p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-black text-white">
                3
              </div>
              <div>
                <h4 className="font-headline text-lg font-bold text-ink">
                  Model Legislation
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-ink/60">
                  ALEC and the State Policy Network convert proposals into
                  template bills that are introduced ~1,000 times per year
                  across all 50 states, with a 20% enactment rate.
                  Corporations and legislators co-author the language on joint
                  task forces.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg border border-border bg-paper p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-black text-white">
                4
              </div>
              <div>
                <h4 className="font-headline text-lg font-bold text-ink">
                  State Legislative Introduction
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-ink/60">
                  State legislators &mdash; one-quarter of whom are ALEC
                  members &mdash; introduce model bills verbatim in their home
                  states. SPN&apos;s 64 state think tanks provide localized
                  research to support national templates.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg border border-border bg-paper p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-black text-white">
                5
              </div>
              <div>
                <h4 className="font-headline text-lg font-bold text-ink">
                  Judicial Validation
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-ink/60">
                  The Federalist Society pipeline places sympathetic judges
                  &mdash; 6 of 9 Supreme Court justices, hundreds of district
                  and circuit court judges &mdash; who uphold the legislation
                  when challenged. Leo&apos;s $600M+ network funds
                  confirmation battles.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg border border-border bg-paper p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-black text-white">
                6
              </div>
              <div>
                <h4 className="font-headline text-lg font-bold text-ink">
                  Media Narrative Support
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-ink/60">
                  Sinclair&apos;s 185 stations, the Daily Wire ($200M+
                  revenue), 1,265 pink slime sites, and dark money-funded media
                  provide public support narratives while 2,900+ real
                  newspapers close, eliminating independent scrutiny.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg border border-border bg-paper p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-black text-white">
                7
              </div>
              <div>
                <h4 className="font-headline text-lg font-bold text-ink">
                  Dark Money Funding
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-ink/60">
                  DonorsTrust ($2.5B+ cumulative), the Koch network ($2B+),
                  Leonard Leo&apos;s Marble Freedom Trust ($1.6B), and the
                  Arabella network ($1.51B in 2024 alone) fund the entire
                  process while shielding every donor&apos;s identity.
                </p>
              </div>
            </div>
          </div>

          {/* Cross-cutting donor overlap */}
          <h3 className="mt-12 font-headline text-2xl font-black tracking-tight text-ink">
            The Donor Overlap: Same Families, Every Node
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The same small group of wealthy families and foundations fund
            multiple organizations across the entire conservative
            infrastructure. The Koch family (Charles Koch / Koch Industries)
            has spent $2+ billion cumulatively across Americans for Prosperity,
            the Cato Institute, Heritage Foundation, AEI, Mercatus Center,
            State Policy Network, ALEC, the Federalist Society, and DonorsTrust.
            The Bradley Foundation funds Heritage, AEI, Manhattan Institute,
            ALEC, Hoover Institution, and State Policy Network affiliates. The
            Scaife family funds Heritage, AEI, Hoover, and the Federalist
            Society. Barre Seid&apos;s $1.6 billion flows through the Marble
            Freedom Trust to the 85 Fund and Concord Fund. On the left,
            Hansjoerg Wyss has given $245 million to the Sixteen Thirty Fund
            and New Venture Fund since 2016. George Soros funds the Center for
            American Progress through the Open Society Foundations network.
            Farris and Dan Wilks, petroleum billionaires, seeded the Daily Wire
            with $4.7 million.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            This donor overlap is not incidental. It is the organizing principle
            of the influence machine. A relatively small number of families
            &mdash; perhaps two or three dozen on the conservative side, a
            similar number on the progressive side &mdash; fund the think tanks
            that produce the ideas, the organizations that convert ideas into
            legislation, the networks that place judges who uphold the
            legislation, the media that provides public support, and the dark
            money vehicles that anonymize the entire operation. The system is
            integrated. The funding is coordinated. And the democratic process
            &mdash; the part where citizens deliberate, organize, and hold
            representatives accountable &mdash; is bypassed at every stage.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Methodology                                                  */}
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
              All figures in this chapter are derived from publicly available
              records. Think tank revenues and expenses are sourced from IRS
              Form 990 filings via ProPublica Nonprofit Explorer and from
              organizational annual reports and financial disclosures. Dark
              money and outside spending totals reference FEC independent
              expenditure reports, Brennan Center for Justice analysis, and
              OpenSecrets (Center for Responsive Politics) dark money tracking.
              ALEC data is sourced from the Center for Media and Democracy
              (EXPOSEDbyCMD) and Brookings Institution analysis of state
              legislative records. Federalist Society membership and financial
              data come from IRS filings and investigative reporting by
              ProPublica, The Washington Post, and The Intercept. Leonard Leo
              network figures reference ProPublica&apos;s investigation of the
              Barre Seid donation, Senate Judiciary Committee research, and
              Citizens for Responsibility and Ethics in Washington (CREW)
              investigations. Arabella Advisors network data is from Capital
              Research Center analysis and IRS filings. Pink slime site counts
              are from NewsGuard and Axios reporting. Sinclair Broadcasting
              data comes from SEC filings and annual reports. Koch network
              spending figures reference OpenSecrets, the Center for Media and
              Democracy, and The Washington Post analysis. Academic capture data
              draws on Drexel University research, The Intercept investigations,
              and Floodlight News analysis. All aggregated numbers are for
              editorial context and should be verified against primary sources
              for academic citation.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Chapter Navigation                                           */}
      {/* ============================================================ */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
          <div className="grid grid-cols-2 gap-6">
            <Link
              href="/guide/the-tax-code-and-education"
              className="group flex items-center gap-4 rounded-xl border border-border bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <ArrowLeft className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-ink" />
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Previous: Chapter 9
                </div>
                <div className="mt-1 font-headline text-lg font-bold text-ink">
                  The Tax Code &amp; Education
                </div>
              </div>
            </Link>
            <Link
              href="/guide"
              className="group flex items-center justify-end gap-4 rounded-xl border border-border bg-paper p-6 text-right transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Final Chapter
                </div>
                <div className="mt-1 font-headline text-lg font-bold text-ink">
                  Back to The Field Guide
                </div>
              </div>
              <BookOpen className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-ink" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CTA Footer — Final Chapter                                   */}
      {/* ============================================================ */}
      <section className="border-t-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center lg:px-8">
          <DollarSign className="mx-auto h-10 w-10 text-accent-light" />
          <h2 className="mt-6 font-headline text-3xl font-black tracking-tight lg:text-4xl">
            You&apos;ve Reached the End of The Field Guide
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
            Ten chapters. Hundreds of data points. Billions of dollars traced.
            The Field Guide to American Corruption is a living document
            &mdash; explore the interactive tools to follow the money yourself,
            or revisit any chapter.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-white/90"
            >
              <BookOpen className="h-4 w-4" />
              Back to The Field Guide
            </Link>
            <Link
              href="/money-flow"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Explore Money Flows
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Read Investigations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
