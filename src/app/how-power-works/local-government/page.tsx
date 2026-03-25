import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Local Government 101 | How Power Works | Daonra",
  description:
    "City councils, school boards, zoning commissions — the local bodies that shape your daily life more than Congress ever will.",
};

export default function LocalGovernmentPage() {
  return (
    <article className="bg-paper">
      {/* Hero */}
      <header className="bg-ink text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light mb-4">
            Daonra Explainers · ~11 min read
          </div>
          <h1 className="font-headline text-4xl font-black tracking-tight lg:text-5xl">
            Local Government 101
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/70 max-w-2xl">
            More than 90,000 governments operate below the federal level in the
            United States. They fill your potholes, run your schools, and decide
            where you can build a house. Most people ignore them entirely.
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { stat: "90,000+", label: "Local governments in the U.S." },
              { stat: "15%", label: "Avg. turnout in local elections" },
              { stat: "75%", label: "Of daily life affected locally" },
              { stat: "$2T+", label: "Annual local government spending" },
            ].map(({ stat, label }) => (
              <div key={stat} className="rounded-lg border border-white/20 p-4">
                <div className="font-headline text-2xl font-black text-accent-light">
                  {stat}
                </div>
                <div className="mt-1 text-xs leading-snug text-white/60">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Part I: The Layers */}
      <section className="bg-paper border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
            Part I
          </div>
          <h2 className="font-headline text-3xl font-black text-ink mb-6">
            The Layers of Local Government
          </h2>
          <p className="text-ink/80 leading-relaxed mb-6">
            Below the state level, government fractures into thousands of
            overlapping jurisdictions. You are simultaneously governed by your
            county, your municipality (if you live in one), your school district,
            and possibly one or more special districts — all at once.
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-ink text-white">
                  <th className="text-left px-4 py-3 font-mono font-bold uppercase tracking-wider text-xs">
                    Type
                  </th>
                  <th className="text-left px-4 py-3 font-mono font-bold uppercase tracking-wider text-xs">
                    What It Does
                  </th>
                  <th className="text-left px-4 py-3 font-mono font-bold uppercase tracking-wider text-xs">
                    Who Governs
                  </th>
                  <th className="text-left px-4 py-3 font-mono font-bold uppercase tracking-wider text-xs">
                    How Funded
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    type: "County",
                    does: "Courts, jails, property records, elections, social services",
                    who: "Board of Supervisors / Commissioners (elected)",
                    funded: "Property tax + state transfers",
                  },
                  {
                    type: "City / Municipality",
                    does: "Police, fire, roads, parks, zoning, water",
                    who: "City Council + Mayor or City Manager",
                    funded: "Sales tax + property tax + fees",
                  },
                  {
                    type: "School District",
                    does: "K–12 public education",
                    who: "Elected School Board",
                    funded: "Property tax + state/federal aid",
                  },
                  {
                    type: "Special District",
                    does: "Single function: water, fire, transit, mosquito control",
                    who: "Elected or appointed board",
                    funded: "Fees, bonds, or dedicated taxes",
                  },
                ].map((row) => (
                  <tr key={row.type} className="border-b border-border">
                    <td className="px-4 py-3 font-bold text-ink">{row.type}</td>
                    <td className="px-4 py-3 text-ink/70">{row.does}</td>
                    <td className="px-4 py-3 text-ink/70">{row.who}</td>
                    <td className="px-4 py-3 text-ink/70">{row.funded}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-ink/80 leading-relaxed">
            Many Americans are surprised to learn they live in a city{" "}
            <em>and</em> a county{" "}
            <em>and</em> a school district{" "}
            <em>and</em> a water district — each with separate elected boards,
            separate budgets, and separate election cycles. In California alone,
            there are over 1,000 special districts operating essentially
            invisibly to most residents.
          </p>
        </div>
      </section>

      {/* Part II: School Boards */}
      <section className="bg-surface border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
            Part II
          </div>
          <h2 className="font-headline text-3xl font-black text-ink mb-6">
            School Boards
          </h2>
          <p className="text-ink/80 leading-relaxed mb-6">
            The United States has approximately 13,500 public school districts,
            each governed by an elected school board. These boards control
            curriculum, discipline policy, staff hiring and firing, and
            multi-hundred-million-dollar budgets. Voter turnout in school board
            elections typically runs between 5% and 15% — meaning a handful of
            organized voters can swing the result.
          </p>

          <div className="rounded-xl border-l-4 border-accent bg-surface p-6 my-8">
            <p className="font-headline text-lg font-bold text-ink mb-2">
              "The school board is the most powerful elected office most people
              will never run for."
            </p>
            <p className="text-sm text-muted">
              — Common observation among education policy advocates
            </p>
          </div>

          <p className="text-ink/80 leading-relaxed mb-4">
            School boards set property tax levies, negotiate union contracts, and
            approve textbooks. In many states, they can hire and fire the
            superintendent without public notice. Between 2020 and 2022, school
            boards became flashpoints for national political battles over mask
            mandates, critical race theory, and book bans — demonstrating that
            these obscure local offices carry outsized national significance.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 mt-8">
            {[
              {
                title: "Budget Authority",
                body: "School boards approve budgets that in large districts can exceed $1 billion annually. They set local property tax levies and decide how state funds are allocated.",
              },
              {
                title: "Curriculum Control",
                body: "Boards adopt textbooks, approve course offerings, and set standards for what is taught. State standards create floors, but boards have discretion above them.",
              },
              {
                title: "Personnel Decisions",
                body: "The board hires the superintendent, who runs day-to-day operations. In practice, a board–superintendent power struggle is one of the most common sources of district dysfunction.",
              },
              {
                title: "Low Turnout = High Leverage",
                body: "Because turnout is so low, organized groups — teachers' unions, parent organizations, political activists — can dominate elections with relatively few votes.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-lg border border-border bg-paper p-5"
              >
                <h3 className="font-headline text-base font-bold text-ink mb-2">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink/70">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part III: Zoning */}
      <section className="bg-paper border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
            Part III
          </div>
          <h2 className="font-headline text-3xl font-black text-ink mb-6">
            Zoning: The Hidden Power Over Housing
          </h2>
          <p className="text-ink/80 leading-relaxed mb-6">
            Zoning is a city or county's legal division of its land into zones
            that specify what can be built where. Most American cities use
            "Euclidean zoning" — named after a 1926 Supreme Court case — that
            separates residential, commercial, and industrial uses and within
            residential zones further specifies density (single-family only,
            apartments allowed, etc.).
          </p>
          <p className="text-ink/80 leading-relaxed mb-8">
            Because local zoning boards and city councils control what gets built,
            they have enormous indirect power over housing prices, neighborhood
            demographics, and regional economic growth. Existing homeowners —
            who vote at higher rates than renters — often use the public comment
            process and CEQA-style environmental review requirements to block
            new housing, a dynamic critics call NIMBYism (Not In My Back Yard).
          </p>

          <h3 className="font-headline text-xl font-bold text-ink mb-4">
            The Approval Gauntlet
          </h3>
          <div className="space-y-3 mb-8">
            {[
              {
                num: "1",
                title: "Application & Environmental Review",
                body: "Developer files a project application. In California and some other states, projects must complete environmental impact review under CEQA, which can take years and cost millions.",
              },
              {
                num: "2",
                title: "Planning Commission",
                body: "An appointed body reviews the project for consistency with the general plan, design standards, and zoning codes. Neighbors can testify.",
              },
              {
                num: "3",
                title: "City Council Vote",
                body: "The elected council approves or denies. They can add conditions — lower density, design changes, community benefits agreements — or reject entirely.",
              },
              {
                num: "4",
                title: "Litigation & Appeals",
                body: "Opponents can sue under CEQA, challenge the environmental review, or appeal to state bodies. Even approved projects can be tied up for years.",
              },
            ].map((step) => (
              <div key={step.num} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center font-headline font-bold text-sm">
                  {step.num}
                </div>
                <div>
                  <div className="font-bold text-ink text-sm">{step.title}</div>
                  <div className="text-sm text-ink/70 leading-relaxed mt-0.5">
                    {step.body}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-ink text-white p-6 my-8">
            <h3 className="font-headline text-lg font-bold mb-3">
              The Reform Wave
            </h3>
            <p className="text-sm leading-relaxed text-white/80">
              Starting around 2019, a growing "YIMBY" (Yes In My Back Yard)
              movement began pushing state legislatures to override local zoning.
              California's SB 9 (2021) legalized duplexes on single-family lots
              statewide. Oregon banned single-family-only zoning in cities over
              10,000. Minneapolis eliminated single-family zoning citywide in
              2018. These reforms represent a fundamental shift: state
              governments overruling local governments on housing — a power
              struggle with enormous consequences for affordability and density.
            </p>
          </div>
        </div>
      </section>

      {/* Part IV: Local Budgets */}
      <section className="bg-surface border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
            Part IV
          </div>
          <h2 className="font-headline text-3xl font-black text-ink mb-6">
            Local Budgets and the Property Tax
          </h2>
          <p className="text-ink/80 leading-relaxed mb-6">
            Local governments raise money primarily through property taxes — a
            levy on the assessed value of real estate. The rate is expressed in
            "mills": one mill equals $1 of tax per $1,000 of assessed value.
            A home assessed at $300,000 in a jurisdiction with a 20-mill rate
            owes $6,000 per year ($300,000 × 0.020).
          </p>

          <div className="rounded-xl border border-border bg-paper p-6 mb-8">
            <h3 className="font-headline text-base font-bold text-ink mb-4">
              Where Local Tax Dollars Go (typical city budget)
            </h3>
            {[
              { label: "Public Safety (Police + Fire)", pct: 38 },
              { label: "Education (if city-funded)", pct: 22 },
              { label: "Infrastructure & Public Works", pct: 18 },
              { label: "Parks & Recreation", pct: 8 },
              { label: "General Administration", pct: 7 },
              { label: "Debt Service", pct: 7 },
            ].map(({ label, pct }) => (
              <div key={label} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-ink/80">{label}</span>
                  <span className="font-bold text-ink">{pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-headline text-xl font-bold text-ink mb-4">
            Tax Increment Financing (TIF)
          </h3>
          <p className="text-ink/80 leading-relaxed mb-4">
            TIF districts are a common but opaque local financing tool. When a
            city creates a TIF district, it freezes the property tax base at
            current levels. As development in the district increases assessed
            values, the "increment" (the additional tax revenue above the frozen
            baseline) goes to a special fund — not to schools or the county —
            to pay for infrastructure within the district.
          </p>
          <p className="text-ink/80 leading-relaxed">
            Critics argue TIFs effectively defund schools and other services for
            years or decades by diverting revenue that would otherwise flow to
            general funds. Supporters say they finance development that wouldn't
            happen otherwise. Chicago has used TIF districts so extensively that
            reformers have labeled the system a "shadow budget" — billions of
            dollars largely outside the normal appropriations process.
          </p>
        </div>
      </section>

      {/* Part V: Special Districts */}
      <section className="bg-paper border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
            Part V
          </div>
          <h2 className="font-headline text-3xl font-black text-ink mb-6">
            The Hidden World of Special Districts
          </h2>
          <p className="text-ink/80 leading-relaxed mb-8">
            Special districts are single-purpose local governments. There are
            approximately 38,000 of them across the United States — more than
            any other type of local government. Most operate with almost no
            public attention, collecting fees or taxes and providing a single
            service. Their elections often have turnout below 5%.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {[
              {
                type: "Water & Sewer Districts",
                count: "~3,300",
                note: "Manage drinking water delivery and wastewater treatment. Often have bonding authority for infrastructure.",
              },
              {
                type: "Fire Protection Districts",
                count: "~5,700",
                note: "Provide fire and EMS services outside city limits. Set by separate property tax levy.",
              },
              {
                type: "Transit Districts",
                count: "~600",
                note: "Run bus and rail systems across multiple jurisdictions. Examples: BART, SEPTA, WMATA.",
              },
              {
                type: "Hospital Districts",
                count: "~1,000",
                note: "Own and operate public hospitals. Can levy taxes and issue bonds for capital projects.",
              },
              {
                type: "School Districts",
                count: "~13,500",
                note: "The most politically active special district. Controls K–12 education and the local property tax levy.",
              },
              {
                type: "Utility Districts",
                count: "~14,000+",
                note: "Electric, gas, stormwater, irrigation — often serving rural areas or new subdivisions.",
              },
            ].map((d) => (
              <div
                key={d.type}
                className="rounded-lg border border-border bg-surface p-5"
              >
                <div className="font-headline text-2xl font-black text-accent mb-1">
                  {d.count}
                </div>
                <div className="font-bold text-ink text-sm mb-2">{d.type}</div>
                <p className="text-xs leading-relaxed text-ink/60">{d.note}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border-l-4 border-accent bg-surface p-6">
            <p className="text-ink/80 leading-relaxed text-sm">
              Because special district boards often run without opposition and
              their elections are held on off-cycle dates, they represent
              perhaps the clearest example of how low participation leads to
              unaccountable government. A water district board can raise your
              rates, incur decades of debt, or mismanage public infrastructure —
              and most residents will never know it happened.
            </p>
          </div>
        </div>
      </section>

      {/* Part VI: How to Participate */}
      <section className="bg-surface border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
            Part VI
          </div>
          <h2 className="font-headline text-3xl font-black text-ink mb-6">
            How to Actually Participate
          </h2>
          <p className="text-ink/80 leading-relaxed mb-8">
            The math of local elections is dramatically different from national
            ones. A school board seat in a mid-size city might be decided by
            2,000–5,000 votes. A city council race in a small town might be
            won by 300. A single organized neighborhood association can
            dominate a planning commission hearing. This is not a bug —
            it's a structural feature that makes local government uniquely
            accessible to individual participation.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 mb-8">
            {[
              {
                title: "Vote in Every Local Election",
                body: "Put school board, city council, water district, and county supervisor elections on your calendar. They're often held in odd years and off-cycle months when turnout collapses.",
              },
              {
                title: "Attend Public Comment Sessions",
                body: "Planning commission meetings, school board meetings, and city council sessions all have public comment periods. Three minutes of testimony from a prepared resident can shift a vote.",
              },
              {
                title: "Run for Office",
                body: "School board, city council, and special district seats are genuinely accessible to first-time candidates. Campaigns often cost under $10,000. Uncontested seats are common.",
              },
              {
                title: "Track the Budget",
                body: "Most local governments post their budgets and meeting agendas online. Budget hearings — where priorities are actually set — are open to the public and poorly attended.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-lg border-2 border-ink bg-ink p-5 text-white"
              >
                <h3 className="font-headline text-base font-bold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/70">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part VII: Resources */}
      <section className="bg-paper border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
            Part VII
          </div>
          <h2 className="font-headline text-3xl font-black text-ink mb-6">
            Find Your Local Governments
          </h2>
          <p className="text-ink/80 leading-relaxed mb-8">
            Most people don't know how many governments they're subject to, who
            represents them, or when their next election is. These resources
            help.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {[
              {
                name: "Ballotpedia",
                url: "ballotpedia.org",
                desc: "Find every ballot you'll be voting on, including local races most sites ignore.",
              },
              {
                name: "Vote411",
                url: "vote411.org",
                desc: "League of Women Voters voter guide — covers local candidates alongside federal.",
              },
              {
                name: "OpenGov",
                url: "opengov.com",
                desc: "Many local governments post their budgets on OpenGov with searchable data.",
              },
              {
                name: "Nextdoor / Local Facebook",
                url: "community",
                desc: "Neighborhood platforms where local meeting announcements and planning notices often circulate.",
              },
              {
                name: "County Assessor Site",
                url: "your county",
                desc: "Find your property tax bills, assessed value, and which taxing jurisdictions you're in.",
              },
              {
                name: "Open Meetings Laws",
                url: "state law",
                desc: "Every state requires public notice and open access to most government meetings — know your rights.",
              },
            ].map((r) => (
              <div
                key={r.name}
                className="rounded-lg border border-border bg-surface p-5"
              >
                <div className="font-headline text-base font-bold text-ink mb-1">
                  {r.name}
                </div>
                <div className="font-mono text-xs text-muted mb-2">{r.url}</div>
                <p className="text-sm leading-relaxed text-ink/60">{r.desc}</p>
              </div>
            ))}
          </div>

          {/* Closing callout */}
          <div className="rounded-xl bg-ink text-white p-8">
            <h3 className="font-headline text-2xl font-black mb-3">
              Local Government Is Where It Starts
            </h3>
            <p className="text-white/80 leading-relaxed">
              Most significant changes in American public life — from civil
              rights to environmental protection to education reform — began at
              the local level before spreading upward. The school board in your
              district, the planning commission in your city, the water board
              in your county: these are not consolation prizes. They are the
              foundation. The people who show up govern.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom nav */}
      <nav className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/how-power-works/gerrymandering"
              className="group flex flex-col rounded-lg border border-border bg-surface p-4 hover:border-ink transition-colors"
            >
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted mb-1">
                ← Previous
              </span>
              <span className="font-headline text-sm font-bold text-ink group-hover:text-accent transition-colors">
                Gerrymandering Explained
              </span>
            </Link>
            <Link
              href="/how-power-works/electoral-system"
              className="group flex flex-col rounded-lg border border-border bg-surface p-4 hover:border-ink transition-colors text-right"
            >
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted mb-1">
                Next →
              </span>
              <span className="font-headline text-sm font-bold text-ink group-hover:text-accent transition-colors">
                The Electoral System
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </article>
  );
}
