import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gerrymandering Explained | Daonra",
  description:
    "How district lines get drawn, who draws them, and why your vote may count for less than you think, a clear explainer on gerrymandering and redistricting.",
};

export default function GerrymanderingPage() {
  return (
    <article>
      {/* Hero */}
      <header className="relative overflow-hidden bg-ink text-white">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 lg:px-8 lg:py-32">
          <nav className="mb-8 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-white/40">
            <Link
              href="/how-power-works"
              className="transition-colors hover:text-accent-light"
            >
              How Power Works
            </Link>
            <span>/</span>
            <span className="text-accent-light">Gerrymandering Explained</span>
          </nav>
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
            How Power Works &middot; Explainer
          </div>
          <h1 className="mt-6 font-headline text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl">
            Gerrymandering Explained
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70 lg:text-2xl">
            The maps that decide elections before a single vote is cast. How
            district lines get drawn, who draws them, and why your vote may
            count for less than you think.
          </p>
          <div className="mt-8 flex items-center gap-6 text-sm text-white/50">
            <span>Daonra Explainers</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>~12 min read</span>
          </div>
        </div>
      </header>

      {/* Stat row */}
      <div className="border-t border-white/10 bg-ink">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
            {[
              {
                stat: "97%",
                label:
                  "House incumbents who win re-election in gerrymandered districts",
              },
              {
                stat: "59M",
                label:
                  'Americans in districts rated "uncompetitive" after 2020 redistricting',
              },
              {
                stat: "2011",
                label:
                  "Year Republicans launched REDMAP, the coordinated gerrymandering strategy",
              },
              {
                stat: "0",
                label:
                  "Federal courts that can strike down partisan gerrymandering (since Rucho v. Common Cause, 2019)",
              },
            ].map(({ stat, label }) => (
              <div key={stat} className="bg-ink px-6 py-8">
                <p className="font-headline text-4xl font-black text-accent-light">
                  {stat}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-white/50">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Part I */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part I
          </div>
          <h2 className="mt-4 font-headline text-4xl font-black leading-tight tracking-tight text-ink lg:text-5xl">
            What Gerrymandering Is, and Where It Came From
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/70">
            <p>
              The name itself is a piece of American political folklore. In
              1812, Massachusetts Governor Elbridge Gerry signed a bill
              redrawing state senate districts to benefit his party. One
              district, snaking through Essex County, was drawn in such a
              contorted shape that a newspaper cartoonist compared it to a
              salamander, and dubbed it a &ldquo;Gerrymander.&rdquo;
            </p>
            <p>
              There are two core techniques, and they work in tandem.{" "}
              <span className="font-semibold text-ink">Packing</span> means
              concentrating opposition voters into as few districts as possible.
              They win those districts by enormous margins, but those surplus
              votes are wasted.{" "}
              <span className="font-semibold text-ink">Cracking</span> is the
              complement: splitting opposition voters across multiple districts
              so they&rsquo;re never a majority in any of them. Together,
              packing and cracking let a mapmaker predetermine outcomes before a
              single ballot is cast.
            </p>
            <p>
              The math is counterintuitive until you see it. Imagine 60 voters
              across a 6-district grid: 36 favor Party A (60%), 24 favor Party B
              (40%). With fairly drawn districts: 4 seats for A, 2 for B. With
              cracking and packing: a skilled mapmaker can hand Party B all six
              seats despite losing the popular vote by 20 points. Democracy on
              paper; minority rule in practice.
            </p>
            <p>
              Both parties have done this. But the scale, precision, and
              coordination of the practice has varied dramatically across eras,
              states, and parties, as has the technology available to those
              doing the drawing.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                num: "Technique 1",
                title: "Packing",
                body: "Concentrating opposition voters into a small number of districts. They win those seats by landslide margins of 80%+, but every vote above 50% is wasted. It doesn\u2019t elect a second representative.",
                result:
                  "Fewer total seats despite high vote totals in packed districts.",
              },
              {
                num: "Technique 2",
                title: "Cracking",
                body: "Splitting opposition voters across many districts so they form a permanent minority in each one. Thirty percent here, thirty percent there, never enough to win anywhere.",
                result:
                  "Zero representation despite significant overall vote share.",
              },
            ].map(({ num, title, body, result }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-surface p-8"
              >
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                  {num}
                </p>
                <h3 className="mt-2 font-headline text-2xl font-black text-ink">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/70">
                  {body}
                </p>
                <div className="mt-4 border-t border-border pt-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
                    Result
                  </p>
                  <p className="mt-1 text-sm text-ink/60">{result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part II */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part II
          </div>
          <h2 className="mt-4 font-headline text-4xl font-black leading-tight tracking-tight text-ink lg:text-5xl">
            Who Draws the Lines, and How
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/70">
            <p>
              The U.S. Constitution requires a census every ten years. After
              each one, district lines are redrawn to account for population
              shifts. In most states, the legislature that happens to be in
              power at that moment draws both congressional and state
              legislative maps. The party that controls the statehouse draws the
              lines for elections it will compete in. The conflict of interest
              is not incidental. It is the system.
            </p>
            <p>
              The timeline matters enormously. The 2020 census data was released
              in 2021. States spent 2021 and 2022 drawing new maps. Those maps
              govern every election from 2022 through 2030, covering six
              congressional elections and ten state legislative cycles, all
              determined by whoever happened to control state government in the
              winter of 2021.
            </p>
            <p>
              This is why state legislative elections in years ending in 0 are
              called the &ldquo;hidden elections.&rdquo; A $50 million
              investment in state races in a census year can be worth billions
              in structural political advantage over ten years.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                n: "1",
                title: "State Legislature",
                desc: "Most states. Both chambers vote; governor can sign or veto. The dominant model, and most susceptible to partisan manipulation.",
              },
              {
                n: "2",
                title: "Independent Commission",
                desc: "15 states including CA, AZ, and MI. Appointed body, not legislators. Varying degrees of true independence depending on appointment process.",
              },
              {
                n: "3",
                title: "Bipartisan Commission",
                desc: "A few states. Requires cross-party agreement to adopt any map, which tends to produce more moderate outcomes, or stalemate.",
              },
              {
                n: "4",
                title: "Courts (Last Resort)",
                desc: "Federal or state courts draw maps when legislatures deadlock, miss deadlines, or when existing maps are struck down by judicial order.",
              },
            ].map(({ n, title, desc }) => (
              <div
                key={n}
                className="flex gap-4 rounded-lg border border-border bg-paper p-5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-xs font-bold text-white">
                  {n}
                </div>
                <div>
                  <p className="font-headline font-bold text-ink">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14 rounded-xl bg-ink p-8 text-white lg:p-10">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/40">
              Case Study
            </p>
            <h3 className="mt-4 font-headline text-2xl font-black">
              The REDMAP Strategy
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-white/80 lg:text-base">
              In 2010, the Republican State Leadership Committee launched
              REDMAP, the Redistricting Majority Project. The strategy: invest
              heavily in state legislative races in 2010 (a census year), win
              control of state governments, and draw favorable maps for the
              following decade.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/80 lg:text-base">
              Cost: ~$30 million. Result: Republicans won 700+ state legislative
              seats and took control of redistricting in Pennsylvania, Ohio,
              Michigan, and North Carolina, securing structural advantages that
              persisted for a decade regardless of how national vote totals
              shifted.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-6 border-t border-white/10 pt-6">
              {[
                ["$30M", "Invested in state races"],
                ["700+", "State legislative seats flipped"],
                ["10 yrs", "Of map control secured"],
              ].map(([v, l]) => (
                <div key={v}>
                  <p className="font-headline text-3xl font-black text-accent-light">
                    {v}
                  </p>
                  <p className="mt-1 text-xs text-white/40">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Part III */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part III
          </div>
          <h2 className="mt-4 font-headline text-4xl font-black leading-tight tracking-tight text-ink lg:text-5xl">
            The Precision Gerrymander: How Technology Changed Everything
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/70">
            <p>
              For most of American history, gerrymandering was a blunt
              instrument. Mapmakers worked from rough census tallies and
              political intuition, hand-drawing districts on paper. In the
              1990s, GIS software changed the calculus. The real revolution came
              in 2010. By then, mapmakers had access to tools of a fundamentally
              different character:
            </p>
          </div>
          <ul className="mt-6 space-y-3 border-l-2 border-border pl-6">
            {[
              [
                "Voter file data",
                "Party registration and complete voting history for every registered voter in the state, down to individual precincts and often individual households.",
              ],
              [
                "Consumer data",
                "Purchasing patterns, magazine subscriptions, TV viewing habits correlated with political behavior, with dozens of commercial data points mapped to partisan affiliation.",
              ],
              [
                "Precinct-level results",
                "Exact vote margins in every precinct across multiple election cycles, allowing mapmakers to model how any district configuration would have performed historically.",
              ],
              [
                "Simulation software",
                "The ability to generate and evaluate thousands of district configurations in minutes, selecting the one with the optimal partisan outcome while satisfying legal requirements.",
              ],
            ].map(([term, desc]) => (
              <li key={term} className="text-ink/70">
                <span className="font-semibold text-ink">{term}</span>: {desc}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            Pennsylvania&rsquo;s 2011 congressional map, struck down by the
            state supreme court in 2018, was so precisely drawn that Democrats
            needed to win the statewide popular vote by roughly ten points just
            to win half the congressional seats. That isn&rsquo;t bad luck.
            That&rsquo;s engineering.
          </p>
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                n: "1",
                era: "Pre-1990",
                title: "Hand-Drawn Maps",
                desc: "Rough census data, paper maps, political instinct. Gerrymandered by intent but limited by tools. Imprecision was common.",
              },
              {
                n: "2",
                era: "1990\u20132010",
                title: "GIS Software Era",
                desc: "Geographic information systems allowed demographic overlays and systematic testing. Partisan advantage became more reliable and more defensible in court.",
              },
              {
                n: "3",
                era: "2010\u2013Present",
                title: "Surgical Precision",
                desc: "Full voter files, consumer data, simulation software running thousands of configurations. Maps drawn to statistical implausibility of natural occurrence.",
              },
            ].map(({ n, era, title, desc }) => (
              <div
                key={n}
                className="rounded-xl border border-border bg-surface p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-mono text-sm font-bold text-white">
                  {n}
                </div>
                <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  {era}
                </p>
                <h4 className="mt-1 font-headline text-lg font-black text-ink">
                  {title}
                </h4>
                <p className="mt-3 text-xs leading-relaxed text-ink/60">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part IV */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part IV
          </div>
          <h2 className="mt-4 font-headline text-4xl font-black leading-tight tracking-tight text-ink lg:text-5xl">
            Race, the Voting Rights Act, and the Courts
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/70">
            <p>
              For decades after the Civil Rights era, the most powerful check on
              gerrymandering was the Voting Rights Act of 1965. Section 5
              required states with histories of racial discrimination to obtain
              federal &ldquo;preclearance&rdquo; before implementing any changes
              to voting maps. In 2013, <em>Shelby County v. Holder</em> gutted
              the preclearance formula. Section 5 enforcement effectively ended.
            </p>
            <p>
              Racial gerrymandering, which uses race as the predominant factor
              in drawing district lines, is still unconstitutional under the
              Equal Protection Clause. <em>Shaw v. Reno</em> (1993) established
              that districts cannot be so irregularly shaped that race is the
              only plausible explanation. But the VRA&rsquo;s Section 2 also{" "}
              <em>requires</em> states to create majority-minority districts
              when populations are sufficiently large and concentrated. The law
              simultaneously prohibits and sometimes mandates considering race.
              Courts have spent three decades navigating that tension.
            </p>
            <p>
              In 2023, <em>Allen v. Milligan</em> produced one of the few recent
              bright spots. Alabama had drawn a map with one majority-Black
              district out of seven, despite Black residents comprising 27% of
              the state&rsquo;s population. The Supreme Court, 5&ndash;4, ruled
              that the map violated Section 2 by diluting Black voting power.
              The state was ordered to draw a second majority-Black district.
            </p>
            <p>
              Federal courts cannot strike down maps for{" "}
              <span className="font-semibold text-ink">partisan</span>{" "}
              gerrymandering. <em>Rucho v. Common Cause</em> (2019) closed that
              door. Courts <span className="font-semibold text-ink">can</span>{" "}
              strike down racial gerrymanders. This creates a direct incentive
              for mapmakers to use race as a proxy for partisanship, then claim
              in court that the motive was partisan, not racial.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                year: "1993",
                case: "Shaw v. Reno",
                desc: "Established that racial gerrymandering can violate Equal Protection even when creating majority-minority districts. Districts cannot be \u201cso bizarre on their face\u201d that race is the only explanation.",
              },
              {
                year: "2019",
                case: "Rucho v. Common Cause",
                desc: "Federal courts have no jurisdiction over partisan gerrymandering claims, a \u201cpolitical question\u201d beyond judicial reach. State courts remain an avenue.",
              },
              {
                year: "2023",
                case: "Allen v. Milligan",
                desc: "Alabama\u2019s map diluted Black voting power in violation of VRA Section 2. The 5\u20134 ruling ordered a second majority-Black district, one of the few recent VRA victories.",
              },
            ].map(({ year, case: c, desc }) => (
              <div
                key={year}
                className="rounded-xl border border-border bg-paper p-6"
              >
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                  {year}
                </p>
                <h4 className="mt-2 font-headline text-lg font-black text-ink">
                  {c}
                </h4>
                <div className="mt-2 h-0.5 w-8 bg-accent" />
                <p className="mt-4 text-xs leading-relaxed text-ink/60">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part V */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part V
          </div>
          <h2 className="mt-4 font-headline text-4xl font-black leading-tight tracking-tight text-ink lg:text-5xl">
            Reform: What&rsquo;s Been Tried and What Works
          </h2>
          <div className="mt-10 space-y-10">
            {[
              {
                title: "Independent Redistricting Commissions",
                items: [
                  "15 states use some form of independent or bipartisan commission to draw district lines.",
                  "California (2008) and Michigan (2018) created citizen commissions via ballot initiative, with members selected through an application process, not the legislature.",
                  "Arizona State Legislature v. Arizona IRC (2015) confirmed that ballot initiatives can remove redistricting authority from legislatures entirely.",
                  "Evidence: states with independent commissions produce more competitive districts on average, though commissions are not immune to manipulation.",
                ],
              },
              {
                title: "Algorithmic and Mathematical Approaches",
                items: [
                  "\u201cShortest split-line\u201d method: a purely mathematical algorithm that draws districts by repeatedly splitting states with the shortest possible line. Nonpartisan, but ignores communities of interest.",
                  "Ranked-choice voting as a partial solution: multi-member RCV districts make gerrymandering much harder since winning requires capturing multiple seats in the same geography.",
                  "The efficiency gap and other metrics: scholars have proposed legal standards courts could apply if Rucho is ever revisited.",
                ],
              },
              {
                title: "State Courts as the Remaining Venue",
                items: [
                  "After Rucho closed federal courts to partisan gerrymandering claims, state courts became the primary battleground.",
                  "The Pennsylvania Supreme Court struck down the 2011 map under the state constitution\u2019s free and equal elections clause (2018), and drew a replacement map itself.",
                  "North Carolina\u2019s Supreme Court has shifted positions multiple times as control of the court changed between parties.",
                  "Key insight: state court outcomes on gerrymandering are heavily influenced by the partisan composition of the court, which is itself determined by elections.",
                ],
              },
            ].map(({ title, items }) => (
              <div key={title}>
                <h3 className="font-headline text-xl font-bold text-ink">
                  {title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex gap-3 text-ink/70">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                n: "01",
                title: "Independent Commission",
                pros: [
                  "Removes mapmaking from legislators",
                  "Harder to manipulate with robust application process",
                ],
                cons: ["Depends heavily on how commissioners are selected"],
              },
              {
                n: "02",
                title: "Multi-Member RCV Districts",
                pros: [
                  "Makes packing and cracking much harder",
                  "Already used in some state legislatures",
                ],
                cons: ["Requires fundamental change to election structure"],
              },
              {
                n: "03",
                title: "Algorithmic Drawing",
                pros: [
                  "Purely mathematical; eliminates intentional manipulation",
                ],
                cons: [
                  "Ignores communities of interest",
                  "Produces mathematically neutral but visually bizarre maps",
                ],
              },
              {
                n: "04",
                title: "State Courts",
                pros: [
                  "Available now without new legislation",
                  "Can produce fast results",
                ],
                cons: [
                  "Vulnerable to court composition changing",
                  "Not durable without constitutional amendment",
                ],
              },
            ].map(({ n, title, pros, cons }) => (
              <div
                key={n}
                className="rounded-xl border border-border bg-surface p-6"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                    {n}
                  </span>
                  <h4 className="font-headline font-semibold text-ink">
                    {title}
                  </h4>
                </div>
                <ul className="space-y-2">
                  {pros.map((p) => (
                    <li
                      key={p}
                      className="flex gap-2 text-sm leading-relaxed text-ink/70"
                    >
                      <span className="mt-0.5 shrink-0 text-accent">+</span>
                      <span>{p}</span>
                    </li>
                  ))}
                  {cons.map((c) => (
                    <li
                      key={c}
                      className="flex gap-2 text-sm leading-relaxed text-ink/70"
                    >
                      <span className="mt-0.5 shrink-0 text-muted">
                        &ndash;
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part VI */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part VI
          </div>
          <h2 className="mt-4 font-headline text-4xl font-black leading-tight tracking-tight text-ink lg:text-5xl">
            What Gerrymandering Actually Does to Democracy
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {[
              {
                label: "Pennsylvania 2012",
                stat: "Democrats won 83,000 more votes statewide, but Republicans won 13 of 18 congressional seats.",
              },
              {
                label: "Wisconsin 2012",
                stat: "Democrats won the majority of votes statewide, but Republicans won 60 of 99 state assembly seats.",
              },
            ].map(({ label, stat }) => (
              <div
                key={label}
                className="rounded-xl border border-border bg-paper p-6"
              >
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  {label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  {stat}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            These results are mathematically close to impossible under fair
            maps. They are not anomalies They are designed outcomes.
          </p>
          <div className="mt-12 space-y-8">
            {[
              {
                title: "Reduced Competition = Reduced Accountability",
                body: "Safe seats reduce electoral accountability. Incumbents fear primary challengers more than general election opponents, which pushes behavior toward the base, not the median voter. Research shows representatives from competitive districts have more moderate voting records and greater constituent responsiveness.",
              },
              {
                title: "The Nationalization Effect",
                body: "Gerrymandering makes local elections function as proxies for national party contests. Voters in heavily gerrymandered states have fewer competitive races to anchor attention; the national party brand becomes the dominant frame.",
              },
              {
                title: "Voter Disengagement",
                body: "Research shows voters in uncompetitive districts are less likely to vote, less likely to contact representatives, and report lower political efficacy. \u201cWhy vote if the outcome is predetermined?\u201d is a rational response to a structurally rigged map.",
              },
            ].map(({ title, body }) => (
              <div key={title}>
                <h3 className="font-headline text-xl font-bold text-ink">
                  {title}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-ink/70">
                  {body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-14 rounded-xl bg-ink p-8 text-white">
            <p className="font-headline text-lg leading-relaxed">
              Gerrymandering doesn&rsquo;t just pick winners. It picks the
              voters. By choosing which communities end up in which districts,
              mapmakers decide whose voices get amplified and whose get wasted.
              The result is a legislature that can remain structurally
              unresponsive to majority opinion for an entire decade.
            </p>
          </div>
        </div>
      </section>

      {/* Part VII */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part VII
          </div>
          <h2 className="mt-4 font-headline text-4xl font-black leading-tight tracking-tight text-ink lg:text-5xl">
            What You Can Do
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The next redistricting cycle begins after the 2030 census. That
            gives nearly a decade to change state laws before it matters, but
            only if the organizing starts now.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {[
              {
                type: "Tool",
                title: "Dave\u2019s Redistricting App",
                url: "davesredistricting.org",
                desc: "Draw your own districts. The most powerful tool for understanding how lines shape outcomes. Lets you draw and analyze maps at the precinct level with partisan performance data built in.",
              },
              {
                type: "Tracker",
                title: "Ballotpedia Redistricting Tracker",
                url: "ballotpedia.org",
                desc: "Tracks redistricting activity in all 50 states, court cases, timelines, and current maps. The best single source for following the legal landscape across the country.",
              },
              {
                type: "Advocacy",
                title: "State-Level Advocacy",
                url: "Common Cause \u00b7 League of Women Voters",
                desc: "Redistricting reform requires winning state legislature races or ballot initiative campaigns. Common Cause and the League of Women Voters run active state-based campaigns.",
              },
              {
                type: "Foundation",
                title: "2030 Census Participation",
                url: "census.gov",
                desc: "Accurate census data is the foundation of redistricting. Undercounts in minority communities directly affect political representation. Ensure your household and neighbors are counted.",
              },
            ].map(({ type, title, url, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-surface p-6"
              >
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                  {type}
                </div>
                <h4 className="mt-1 font-headline text-lg font-semibold text-ink">
                  {title}
                </h4>
                <p className="font-mono text-xs text-muted">{url}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  {desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <h3 className="font-headline text-xl font-bold text-ink">
              Resources
            </h3>
            <ul className="mt-6 space-y-3">
              {[
                [
                  "redistricting.lls.edu",
                  "All About Redistricting: the most comprehensive academic resource on redistricting law.",
                ],
                [
                  "planscore.org",
                  "PlanScore: grades district maps for partisan fairness using multiple metrics.",
                ],
                [
                  "gerrymander.princeton.edu",
                  "Princeton Gerrymandering Project: grades every state\u2019s maps A through F.",
                ],
                [
                  "davesredistricting.org",
                  "Dave\u2019s Redistricting App: an interactive mapping tool for the public.",
                ],
                [
                  "commoncause.org",
                  "Common Cause: redistricting reform advocacy across all 50 states.",
                ],
                [
                  "lwv.org",
                  "League of Women Voters: runs state-level campaigns for independent commissions.",
                ],
              ].map(([url, desc], i) => (
                <li
                  key={url}
                  className="flex items-start gap-4 border-b border-border pb-3 last:border-0"
                >
                  <span className="font-mono mt-0.5 shrink-0 text-xs text-muted">
                    0{i + 1}
                  </span>
                  <div>
                    <span className="font-mono text-sm text-accent-light">
                      {url}
                    </span>
                    <span className="text-sm text-ink/60">: {desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Bottom nav */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
          <div className="grid grid-cols-2 gap-6">
            <Link
              href="/how-power-works/bill-to-law"
              className="group flex items-center gap-4 rounded-xl border border-border bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <span className="text-lg text-muted transition-colors group-hover:text-ink">
                &larr;
              </span>
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Previous
                </div>
                <div className="mt-1 font-headline text-lg font-bold text-ink">
                  How a Bill Becomes Law
                </div>
              </div>
            </Link>
            <Link
              href="/how-power-works/local-government"
              className="group flex items-center justify-end gap-4 rounded-xl border border-border bg-paper p-6 text-right transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Next Topic
                </div>
                <div className="mt-1 font-headline text-lg font-bold text-ink">
                  Local Government 101
                </div>
              </div>
              <span className="text-lg text-muted transition-colors group-hover:text-ink">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
