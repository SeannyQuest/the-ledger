import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Flag,
  Globe,
  Vote,
  ShieldCheck,
  FileText,
  Scale,
  Landmark,
  BookOpen,
  BarChart3,
  Calculator,
  TrendingUp,
} from "lucide-react";
import { ScrollytellSection } from "@/components/stories/ScrollytellSection";
import type { ScrollytellStep } from "@/components/stories/ScrollytellSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corruption & Reform | Daonra",
  description:
    "Chapter 7 of The Field Guide to American Corruption. State-level bribery, foreign influence operations, and the reform movements fighting to reclaim democracy, from NYC's matching funds to overturning Citizens United.",
};

const SCROLLYTELL_STEPS: ScrollytellStep[] = [
  {
    id: "citizens-united",
    title: "Citizens United Opens the Floodgates",
    body: "On January 21, 2010, the Supreme Court rules 5-4 in Citizens United v. FEC that corporations and unions can spend unlimited sums on elections. Justice Kennedy writes that independent expenditures &lsquo;do not give rise to corruption or the appearance of corruption.&rsquo; Outside spending immediately quadruples from $338 million in 2008 to $1.3 billion in 2012. The modern era of unlimited money in politics begins, and with it, a cascade of failed federal reforms that continues to this day.",
    stat: {
      value: "$338M→$4.5B",
      label: "Outside Spending 2008 → 2024",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
  {
    id: "federal-failures",
    title: "Every Federal Reform Dies",
    body: "The DISCLOSE Act, which would require organizations spending more than $10,000 on elections to reveal their donors, is introduced in every Congress since 2010. It is filibustered every single time. HR1, the For the People Act (the most comprehensive democracy reform bill in a generation) passes the House in 2021 and dies in the Senate. The Freedom to Vote Act meets the same fate. The FEC remains deadlocked 3-3 by design, unable to enforce existing law. The IRS stops policing 501(c)(4) political activity. Zero successful federal reforms pass in fifteen years.",
    stat: {
      value: "0",
      label: "Successful Federal Reforms Since 2010",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
  {
    id: "state-corruption",
    title: "The States: Corruption Without Guardrails",
    body: "While federal reformers hit a wall, state-level corruption operates with even less oversight. Many states impose no contribution limits whatsoever. Pay-to-play is legal and open. In Ohio, FirstEnergy spends $60 million in the largest state bribery scandal in American history, securing HB6, a billion-dollar utility bailout. Speaker Larry Householder is convicted. ALEC, the American Legislative Exchange Council, operates a system where corporations co-write model legislation alongside state legislators, with corporate representatives holding equal votes. State lobbying and dark money remain even less tracked than federal spending.",
    stat: {
      value: "$60M",
      label: "FirstEnergy Bribery (Ohio HB6)",
      color: "accent",
    },
    highlightColor: "#d97706",
  },
  {
    id: "foreign-influence",
    title: "Foreign Governments Buy Access",
    body: "Under the Foreign Agents Registration Act, Saudi Arabia, the UAE, Japan, South Korea, and Israel are among the top foreign spenders on American lobbying. But FARA enforcement is skeletal: the DOJ assigns roughly 30 staff to police foreign influence across the entire country. Unregistered agents far exceed registered ones. Paul Manafort is convicted for unregistered work for Ukraine. Michael Flynn pleads guilty for Turkey, then is pardoned. The NRA is described as a &lsquo;foreign asset&rsquo; in a Senate report. Maria Butina is convicted as a Russian agent. Multiple Chinese influence prosecutions follow since 2020.",
    stat: {
      value: "~30",
      label: "DOJ Staff Policing Foreign Influence",
      color: "#c41d1d",
    },
    highlightColor: "#c41d1d",
  },
  {
    id: "state-success",
    title: "The States That Got It Right",
    body: "Where federal reform has failed, a handful of states and cities have built working alternatives. New York City implements 8:1 small-donor matching, where a $175 contribution becomes $1,575 in public funds, dramatically diversifying the donor pool. Seattle distributes $100 in Democracy Vouchers to every resident, increasing participation and empowering non-wealthy donors. Maine and Arizona run Clean Elections public financing. Michigan passes an independent redistricting commission backed by a $16.4 million campaign. Alaska adopts ranked-choice voting with open primaries. These experiments prove the system can be fixed.",
    stat: {
      value: "8:1",
      label: "NYC Small-Donor Match Ratio",
      color: "money-in",
    },
    highlightColor: "#16a34a",
  },
  {
    id: "the-question",
    title: "What Would It Take?",
    body: "Seventy-five to eighty percent of Americans, across party lines, support overturning Citizens United. Seventy-six percent believe campaign contributions influence judicial decisions. Academic evidence shows economic elites dominate policymaking while average citizens have approximately zero influence. Corporate lobbying returns reach 6,000 to 22,000 percent. Every major democracy on Earth has stricter campaign finance rules than the United States. The UK caps national election spending at roughly $30 million. Canada imposes strict contribution limits and short campaign periods. The evidence is overwhelming. The question is not whether the system is broken. The question is whether the people who benefit from the breakage will ever allow it to be repaired.",
    stat: {
      value: "75-80%",
      label: "Support Overturning Citizens United",
      color: "money-in",
    },
    highlightColor: "#16a34a",
  },
];

export default function CorruptionAndReformPage() {
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
            <span className="text-accent-light">Chapter 7</span>
          </nav>

          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
            Chapter 7 &middot; The Field Guide to American Corruption
          </div>

          <h1 className="mt-6 font-headline text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl xl:text-8xl">
            Corruption &amp; Reform
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70 lg:text-2xl">
            State-level bribery, foreign influence operations, and the reform
            movements fighting to reclaim democracy, from{" "}
            <span className="font-semibold text-white">
              NYC&apos;s matching funds
            </span>{" "}
            to overturning Citizens United.
          </p>

          <div className="mt-8 flex items-center gap-6 text-sm text-white/50">
            <time dateTime="2026-03-11">March 11, 2026</time>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>22 min read</span>
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
            Over the preceding six chapters, we have documented the machinery of
            American corruption: the $5.08 billion lobbying industrial complex,
            the $4.3 billion dark money pipeline, the revolving door that sends
            65% of departing members of Congress to K Street, the industries
            that write the rules they are supposed to follow, the courts whose
            judges are elected by the corporations that appear before them, and
            the justice system that incarcerates for profit. Every one of these
            systems is legal. Every one of them is documented. And every attempt
            to reform them at the federal level has failed, not once, not
            occasionally, but every single time, without exception, for fifteen
            consecutive years.
          </p>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            This final chapter examines the architecture of that failure. At the
            state level, corruption often operates without even the pretense of
            guardrails: many states impose no contribution limits, and dark
            money flows with even less transparency than in Washington. Foreign
            governments spend millions purchasing access through a registration
            system policed by roughly 30 federal employees. But this chapter
            also documents something else: the places where reform has actually
            worked. New York City&apos;s 8:1 small-donor matching program.
            Seattle&apos;s Democracy Vouchers. Alaska&apos;s ranked-choice
            voting. Michigan&apos;s independent redistricting commission. These
            are not theoretical proposals. They are functioning systems, and
            they prove that the machinery of corruption can be dismantled, if
            the political will exists to do it.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The question this chapter confronts is the one that has haunted
            every page of this guide: if 75-80% of Americans want reform, and
            every major democracy on Earth has stricter rules than we do, why
            can&apos;t we fix this? The answer, as with everything else in
            Daonra, follows the money.
          </p>
        </div>
      </section>

      {/* Scrollytelling section */}
      <ScrollytellSection
        headline="The Arc of Reform"
        subhead="From Citizens United through fifteen years of failed federal reforms to the state-level experiments proving the system can be fixed."
        steps={SCROLLYTELL_STEPS}
        bgColor="bg-ink"
        textColor="text-white"
      />

      {/* Pull quote break */}
      <section className="border-y-4 border-ink bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
          <blockquote className="text-center">
            <p className="font-headline text-3xl font-black leading-tight tracking-tight text-ink lg:text-4xl">
              &ldquo;The preferences of the average American appear to have only
              a minuscule, near-zero, statistically non-significant impact upon
              public policy.&rdquo;
            </p>
            <cite className="mt-6 block font-mono text-sm font-bold uppercase tracking-widest text-muted">
              Gilens &amp; Page, &ldquo;Testing Theories of American
              Politics,&rdquo; 2014
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Section 1: State-Level Corruption */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Landmark className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Dimension I
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            State-Level Corruption
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            If the federal system is a machine for converting money into policy,
            state government is often the same machine with the safety guards
            removed. Many states impose no limits on campaign contributions
            whatsoever. In these jurisdictions, pay-to-play is not a scandal.
            it is the operating system. A developer writes a six-figure check to
            a governor, and the zoning board approves a project the following
            month. A utility company funds a legislative caucus, and a
            billion-dollar bailout follows. The corruption is not hidden because
            it does not need to be.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Ohio HB6 scandal stands as the definitive case study.
            FirstEnergy, facing the closure of two uncompetitive nuclear plants,
            spent $60 million to secure passage of House Bill 6,
            billion-dollar ratepayer bailout disguised as clean energy
            legislation. The money flowed through a web of dark money groups to
            Ohio House Speaker Larry Householder, who used it to elect allies,
            crush a ballot initiative that would have repealed the law, and
            consolidate personal power. Federal prosecutors called it the
            largest bribery scheme in Ohio history. Householder was convicted in
            2023 and sentenced to 20 years in federal prison. FirstEnergy paid
            $230 million in penalties. The scheme worked for years before anyone
            stopped it.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            ALEC (the American Legislative Exchange Council) operates a
            parallel system that is technically legal. The organization convenes
            corporate representatives and state legislators in the same room to
            co-write &ldquo;model legislation.&rdquo; In these sessions,
            corporate members historically held equal voting power with elected
            officials. The resulting bills, covering everything from
            environmental deregulation to stand-your-ground laws to
            pharmaceutical protections, are then introduced in statehouses
            across the country, often word-for-word. It is a factory for
            corporate-drafted law, and it operates in plain sight because no
            state law prohibits it.
          </p>

          {/* Inline stat callout grid */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-3">
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                $60M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                FirstEnergy Bribery
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                $230M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                FirstEnergy Penalties
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-out">
                20 yrs
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Householder Sentence
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            State supreme court races, as documented in Chapter 5, have become
            multi-million dollar affairs in which corporate and ideological
            donors effectively select the judges who will rule on cases
            affecting their interests. State lobbying varies wildly in
            transparency: some states have zero disclosure requirements. And
            state-level dark money is even less tracked than federal: many
            states still do not require electronic filing of campaign finance
            reports, meaning that spending data is scattered across paper forms
            in county clerk offices, effectively invisible to public scrutiny.
            The result is a system where corruption is not just possible but
            structurally encouraged, where the cost of influence is lowest and
            the oversight is thinnest.
          </p>
        </div>
      </section>

      {/* Section 2: Foreign Lobbying */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Globe className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Dimension II
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Foreign Lobbying &amp; FARA
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The Foreign Agents Registration Act was enacted in 1938 to counter
            Nazi propaganda. Today it is the primary (and largely ineffective)
            mechanism for tracking foreign government influence in American
            politics. Top foreign spenders include Saudi Arabia, the United Arab
            Emirates, Japan, South Korea, and Israel, all of which maintain
            extensive lobbying operations in Washington. These nations hire
            former members of Congress, retired generals, and elite law firms to
            advocate for arms sales, trade agreements, and diplomatic
            priorities. The spending is legal, disclosed, and effective.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The problem is what lies beyond the disclosure. FARA enforcement has
            been historically minimal. The Department of Justice assigns
            approximately 30 staff to police foreign influence operations across
            the entire country. Unregistered foreign agents far exceed
            registered ones. The cases that do reach prosecution reveal the
            scale of what goes undetected: Paul Manafort was convicted for years
            of unregistered lobbying on behalf of Ukrainian interests, funneling
            tens of millions through offshore accounts. Michael Flynn, a sitting
            National Security Advisor, pleaded guilty to acting as an
            unregistered agent of Turkey, then was pardoned. Tom Barrack, a
            close ally of President Trump, was charged with acting as an
            unregistered agent of the UAE but acquitted.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Russian interference operations have been the most publicly visible.
            A bipartisan Senate Intelligence Committee report described the
            National Rifle Association as a &ldquo;foreign asset&rdquo; that
            Russian operatives used to access conservative political circles.
            Maria Butina was convicted of conspiracy to act as an unregistered
            Russian agent, having infiltrated NRA circles and established
            back-channel contacts with political figures. Chinese influence
            operations have prompted growing concern and multiple prosecutions
            since 2020. Allied nations (Japan, South Korea, and Israel) spend
            heavily on defense cooperation lobbying, a practice that is entirely
            legal but raises the fundamental question of who American foreign
            policy is designed to serve.
          </p>

          {/* Inline stat callout grid */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-3">
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                ~30
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                DOJ FARA Staff
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                5
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Top Foreign Spender Nations
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-out">
                3
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                High-Profile Prosecutions
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Federal Reform Failures */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Scale className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Dimension III
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Graveyard of Federal Reform
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            Since Citizens United, the federal government has not enacted a
            single significant campaign finance or anti-corruption reform. This
            is not for lack of trying. It is for lack of a system that allows
            the beneficiaries of corruption to vote against their own interests.
            The DISCLOSE Act has been introduced in every Congress since 2010
            and filibustered every time. HR1, the For the People Act (covering
            voter access, redistricting, campaign finance, and ethics) passed
            the House in 2021 with zero Republican votes and died in the Senate.
            The Freedom to Vote Act, a compromise version, met the same fate.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The institutional failures run deeper than legislation. The Federal
            Election Commission, the agency charged with policing campaign
            finance, is deadlocked 3-3 along partisan lines by design. The
            commission cannot agree on enforcement actions, cannot update
            regulations, and cannot investigate coordination between Super PACs
            and campaigns. It has been structurally incapacitated, not by
            accident, but by a confirmation process that ensures no party ever
            holds a working majority. The Internal Revenue Service, which
            theoretically polices the boundary between &ldquo;social
            welfare&rdquo; nonprofits and political operations, stopped
            enforcing 501(c)(4) political activity limits after the Tea Party
            scrutiny scandal. The cop on the beat has been handcuffed, and the
            backup has gone home.
          </p>

          {/* Reform timeline */}
          <div className="my-12 space-y-4 border-l-4 border-accent pl-6">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024
              </div>
              <div className="mt-1 text-base font-semibold text-ink">
                DISCLOSE Act: filibustered every session
              </div>
            </div>
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                2021
              </div>
              <div className="mt-1 text-base font-semibold text-ink">
                HR1 / For the People Act: passed House, died in Senate
              </div>
            </div>
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                2022
              </div>
              <div className="mt-1 text-base font-semibold text-ink">
                Freedom to Vote Act: filibustered
              </div>
            </div>
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                Ongoing
              </div>
              <div className="mt-1 text-base font-semibold text-ink">
                FEC deadlocked 3-3, cannot enforce
              </div>
            </div>
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                Ongoing
              </div>
              <div className="mt-1 text-base font-semibold text-ink">
                IRS: stopped enforcing 501(c)(4) political limits
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            The structural math is damning. A constitutional amendment to
            overturn Citizens United requires a two-thirds vote in both chambers
            of Congress and ratification by three-quarters of state
            legislatures. The same legislators who benefit from unlimited
            spending would need to vote to end it. The same donors who fund
            their campaigns would need to accept diminished influence. The
            system has been engineered so that the people with the power to fix
            it are the people with the least incentive to do so.
          </p>
        </div>
      </section>

      {/* Section 4: State Reform Successes */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Vote className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Dimension IV
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Where Reform Has Worked
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The federal landscape is bleak, but it is not the entire story. A
            handful of states and cities have built functioning alternatives to
            the broken campaign finance system, experiments that demonstrate,
            with data, that reform is not only possible but effective. These
            programs have diversified donor pools, increased civic
            participation, and reduced the influence of mega-donors. They are
            proof of concept for a system that most Americans say they want.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            New York City&apos;s small-donor matching program is the gold
            standard. Under the system, contributions of up to $175 are matched
            at an 8:1 ratio with public funds, meaning a $175 donation becomes
            $1,575 in a candidate&apos;s account. The effect is transformative.
            Candidates can fund competitive campaigns by raising small
            contributions from their own constituents rather than courting
            wealthy donors at Manhattan fundraisers. The program has
            dramatically diversified the donor pool by race, income, and
            geography, making the people who fund elections look more like the
            people who vote in them.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Seattle&apos;s Democracy Vouchers program takes a different
            approach. Every Seattle resident receives $100 in vouchers (four
            $25 certificates) that they can assign to qualifying candidates.
            The program, funded by a modest property tax, has increased
            participation among low-income residents and people of color, and
            has expanded the pool of viable candidates to include people without
            access to wealthy donor networks. It is, in effect, a public
            financing system that puts the allocation decision in the hands of
            ordinary voters.
          </p>

          {/* State success grid */}
          <div className="my-12 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-paper p-6">
              <div className="font-headline text-3xl font-black text-money-in">
                8:1
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                NYC Matching Ratio
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                Contributions up to $175 matched with public funds. Dramatically
                diversified donor pool by race, income, and geography.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-paper p-6">
              <div className="font-headline text-3xl font-black text-money-in">
                $100
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Seattle Democracy Vouchers
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                Every resident receives four $25 vouchers. Increased
                participation among low-income voters and people of color.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-paper p-6">
              <div className="font-headline text-3xl font-black text-accent">
                $16.4M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Michigan Redistricting Campaign
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                2018 ballot initiative created an independent redistricting
                commission, ending partisan gerrymandering.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-paper p-6">
              <div className="font-headline text-3xl font-black text-accent">
                RCV
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Alaska Open Primaries
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                Ranked-choice voting with open primaries. Reduces the power of
                partisan extremes and dark money in primary elections.
              </p>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            Maine and Arizona pioneered Clean Elections public financing
            systems, providing full public funding to qualifying candidates who
            agree to forgo private fundraising. These programs have been
            weakened by court decisions limiting matching fund provisions, but
            they continue to operate and have enabled candidates without wealthy
            connections to run competitive campaigns. Taken together, these
            state and local experiments constitute a blueprint for what national
            reform could look like, if the federal government were capable of
            acting.
          </p>
        </div>
      </section>

      {/* Section 5: International Comparison */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Globe className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Dimension V
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The International Outlier
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            Every major democracy on Earth has stricter campaign finance rules
            than the United States. This is not an exaggeration. It is a
            statement of comparative fact that should inform every debate about
            whether reform is &ldquo;feasible.&rdquo; Other nations have decided
            that unlimited political spending is incompatible with democratic
            governance. The United States has decided that it is protected
            speech. The divergence in outcomes is predictable.
          </p>

          {/* International comparison table */}
          <div className="my-12 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                    Country
                  </th>
                  <th className="px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                    Key Restriction
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-6 py-4 font-semibold text-ink">
                    United Kingdom
                  </td>
                  <td className="px-6 py-4 text-sm text-ink/70">
                    National spending cap ~$30M for entire general election.
                    Political TV advertising banned.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-ink">Canada</td>
                  <td className="px-6 py-4 text-sm text-ink/70">
                    Strict contribution limits. Short, regulated campaign
                    periods. Corporate and union donations banned.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-ink">Germany</td>
                  <td className="px-6 py-4 text-sm text-ink/70">
                    Public financing of parties. Full financial transparency
                    requirements. Donations above &euro;10,000 publicly
                    reported.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-ink">France</td>
                  <td className="px-6 py-4 text-sm text-ink/70">
                    Equal free airtime for candidates. Strict spending caps.
                    Corporate donations banned since 1995.
                  </td>
                </tr>
                <tr className="bg-accent/5">
                  <td className="px-6 py-4 font-semibold text-accent">
                    United States
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-accent">
                    No spending limits. Unlimited Super PAC spending. Secret
                    donors via 501(c)(4)s. $4.5B+ outside spending in 2024.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            The comparison is not subtle. The United Kingdom caps total national
            election spending at roughly $30 million, less than the budget of a
            single competitive U.S. Senate race. Canada bans corporate and union
            donations outright and enforces short, tightly regulated campaign
            periods. France provides equal free airtime to all candidates and
            has banned corporate donations since 1995. Germany publicly finances
            political parties and requires full transparency for donations above
            &euro;10,000. These are not authoritarian states suppressing
            political speech. They are functioning democracies that have
            concluded (correctly, by the evidence) that unlimited money in
            politics is corrosive to democratic governance.
          </p>
        </div>
      </section>

      {/* Section 6: Reform Organizations & Coalitions */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Dimension VI
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Reform Ecosystem
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The organizations fighting to reform the system operate at a scale
            that is impressive on its own terms and microscopic relative to the
            forces they oppose. The reform landscape spans the ideological
            spectrum, a fact that both demonstrates the breadth of concern
            about systemic corruption and illustrates the unusual coalitions
            that have, on rare occasions, broken through.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            On the progressive side, the Soros Open Society Foundations
            committed $220 million over five years beginning in 2020, with an
            additional $50 million-plus directed toward district attorney races.
            The MacArthur Foundation has deployed $246 million or more across 51
            sites through its Safety and Justice Challenge. The Ford
            Foundation&apos;s Justice and Mobility Fund exceeded $250 million.
            The ACLU operates with a $383 million annual budget (2024) and
            foundation assets of $785.6 million. These are substantial sums.
            but they are dwarfed by the $5.08 billion spent annually on lobbying
            alone, to say nothing of the billions in campaign spending and dark
            money.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The most instructive case study in reform coalition-building is the
            First Step Act of 2018, which passed the Senate 87-12, a landslide
            in an era of partisan paralysis. The coalition was extraordinary:
            the ACLU joined with the Koch network. FreedomWorks partnered with
            the Fraternal Order of Police. Heritage Action aligned with Van
            Jones. Kim Kardashian lobbied the White House. Koch&apos;s Right on
            Crime initiative, funded with $5 million or more from Koch
            Industries, had already demonstrated the model in Texas, where $241
            million in alternative sentencing investments saved the state $4
            billion and enabled the closure of 11 prisons. The coalition proved
            that when left and right identify a shared interest in reform, in
            this case, reducing incarceration costs and addressing
            over-sentencing, the system can move.
          </p>

          {/* Reform org grid */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-3">
            <div>
              <div className="font-headline text-3xl font-black text-ink">
                $220M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Soros Open Society (5 yr)
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-ink">
                $383M
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                ACLU Budget (2024)
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-money-in">
                $4B
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Koch Texas Savings
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-accent">
                87-12
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                First Step Act Senate Vote
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-ink">
                $250M+
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Ford Foundation Fund
              </div>
            </div>
            <div>
              <div className="font-headline text-3xl font-black text-money-in">
                11
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Texas Prisons Closed
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            The academic evidence for reform is unambiguous. Gilens and
            Page&apos;s 2014 study demonstrated that economic elites dominate
            American policymaking while average citizens exert approximately
            zero influence. Corporate lobbying yields returns between 6,000% and
            22,000% on tax provisions. Public financing experiments show modest
            but measurable improvements in donor diversity and candidate access,
            though their impact has been weakened by court decisions.
            Seventy-five to eighty percent of Americans support overturning
            Citizens United. Seventy-six percent believe campaign contributions
            influence judicial decisions. The public knows the system is broken.
            The system knows the public knows. It does not care.
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
              State corruption data references DOJ prosecution records,
              including the FirstEnergy/HB6 case (U.S. v. Householder, S.D.
              Ohio). ALEC membership and operations are documented by the Center
              for Media and Democracy. Foreign lobbying data is sourced from
              FARA filings maintained by the DOJ and analyzed by OpenSecrets.
              FARA staffing figures are from DOJ Inspector General reports.
              Federal reform bill histories reference congressional records
              (Congress.gov). FEC deadlock data is from FEC meeting minutes and
              commissioner vote records. New York City matching fund data is
              from the NYC Campaign Finance Board annual reports. Seattle
              Democracy Voucher data is from the Seattle Ethics and Elections
              Commission. International comparisons reference Election Spending
              Commission reports (UK), Elections Canada, Bundestag financial
              disclosures (Germany), and Commission Nationale des Comptes de
              Campagne (France). Reform organization budgets reference IRS 990
              filings, annual reports, and foundation disclosures. The Gilens
              &amp; Page study was published in{" "}
              <em>Perspectives on Politics</em> (2014, Vol. 12, No. 3). Lobbying
              ROI data is from the Sunlight Foundation. Public opinion data on
              Citizens United references Pew Research Center and AP-NORC
              polling. All aggregated numbers are for editorial context and
              should be verified against primary sources for academic citation.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter navigation */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
          <div className="grid grid-cols-2 gap-6">
            <Link
              href="/guide/the-justice-system"
              className="group flex items-center gap-4 rounded-xl border border-border bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <ArrowLeft className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-ink" />
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Previous: Chapter 6
                </div>
                <div className="mt-1 font-headline text-lg font-bold text-ink">
                  The Justice System
                </div>
              </div>
            </Link>
            <Link
              href="/guide/industries-that-shape-daily-life"
              className="group flex items-center justify-end gap-4 rounded-xl border border-border bg-paper p-6 text-right transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Next: Chapter 8
                </div>
                <div className="mt-1 font-headline text-lg font-bold text-ink">
                  Industries That Shape Daily Life
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
            Transparency Is the First Step
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/60">
            The corruption described in this chapter is bipartisan and systemic.
            But so is the resistance. From New York City&apos;s 8:1 small-donor
            matching to state-level disclosure laws, reformers are proving that
            alternatives exist. Daonra&apos;s interactive tools let you trace
            the connections yourself: follow the money flows, calculate the
            return on lobbying investments, and track the trades your
            representatives make while writing the laws that govern your life.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/40">
            The system survives on complexity and opacity. Accountability begins
            when you start looking.
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
