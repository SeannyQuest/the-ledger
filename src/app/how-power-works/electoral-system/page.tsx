import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Electoral System | How Power Works | Daonra",
  description:
    "Electoral college, primaries, voter registration, campaign finance, and why some votes count more than others.",
};

export default function ElectoralSystemPage() {
  return (
    <article className="bg-paper">
      {/* Hero */}
      <header className="bg-ink text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light mb-4">
            Daonra Explainers · ~14 min read
          </div>
          <h1 className="font-headline text-4xl font-black tracking-tight lg:text-5xl">
            The Electoral System
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/70 max-w-2xl">
            The rules that govern American elections weren't handed down from
            nature. They were designed — and they shape who holds power, whose
            votes matter, and who gets to vote at all.
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { stat: "270", label: "Electoral votes needed to win the presidency" },
              { stat: "538", label: "Total electoral votes allocated" },
              { stat: "5×", label: "Candidates won presidency, lost popular vote" },
              { stat: "48", label: "States using winner-take-all allocation" },
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

      {/* Part I: Electoral College */}
      <section className="bg-paper border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
            Part I
          </div>
          <h2 className="font-headline text-3xl font-black text-ink mb-6">
            The Electoral College
          </h2>
          <p className="text-ink/80 leading-relaxed mb-6">
            Americans do not directly elect the president. They vote for a slate
            of "electors" pledged to a candidate. Each state has a number of
            electors equal to its total Congressional delegation (House seats +
            2 senators). Washington D.C. gets 3, for a total of 538. A candidate
            needs 270 to win.
          </p>
          <p className="text-ink/80 leading-relaxed mb-8">
            The system produces significant malapportionment. Wyoming has about
            192,000 people per electoral vote; California has about 718,000. A
            Wyoming voter carries nearly four times the presidential weight of a
            California voter — not because of any constitutional principle, but
            as an artifact of small states always receiving a minimum of 3
            electors.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {[
              {
                fact: "Winner-Take-All",
                body: "48 states award all their electors to the plurality winner. Maine and Nebraska use congressional-district allocation — the only exceptions.",
              },
              {
                fact: "Faithless Electors",
                body: "Electors are humans who can vote for whomever they choose. In 2020, the Supreme Court (Chiafalo v. Washington) ruled states may bind electors and penalize defection.",
              },
              {
                fact: "NPVIC",
                body: "The National Popular Vote Interstate Compact would award states' electors to the national popular vote winner. As of 2026, states worth 209 of the required 270 electoral votes have joined.",
              },
              {
                fact: "Contested Contingent",
                body: "If no candidate reaches 270, the House chooses the president — with each state delegation casting one vote. The Senate separately elects the VP.",
              },
              {
                fact: "Swing State Premium",
                body: "Under winner-take-all, only competitive states receive meaningful campaign attention. Safe states are largely ignored by both candidates.",
              },
            ].map((card) => (
              <div
                key={card.fact}
                className="rounded-lg border border-border bg-surface p-5"
              >
                <h3 className="font-headline text-sm font-bold text-ink mb-2">
                  {card.fact}
                </h3>
                <p className="text-xs leading-relaxed text-ink/60">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part II: Primaries */}
      <section className="bg-surface border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
            Part II
          </div>
          <h2 className="font-headline text-3xl font-black text-ink mb-6">
            Primaries and Caucuses
          </h2>
          <p className="text-ink/80 leading-relaxed mb-6">
            Primaries are elections within a party to select its nominee. Before
            1968, party bosses largely controlled nominations through brokered
            conventions. The chaotic 1968 Democratic convention — marked by
            protest, police violence, and Hubert Humphrey winning despite not
            entering a single primary — triggered the McGovern-Fraser reforms,
            which required delegates to reflect primary and caucus results.
          </p>
          <p className="text-ink/80 leading-relaxed mb-8">
            The shift democratized nominations but also created new problems:
            primary electorates tend to be smaller, older, whiter, and more
            ideologically extreme than the general electorate, pulling both
            parties away from median voter preferences.
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-ink text-white">
                  <th className="text-left px-4 py-3 font-mono font-bold uppercase tracking-wider text-xs">
                    Primary Type
                  </th>
                  <th className="text-left px-4 py-3 font-mono font-bold uppercase tracking-wider text-xs">
                    Who Can Vote
                  </th>
                  <th className="text-left px-4 py-3 font-mono font-bold uppercase tracking-wider text-xs">
                    Examples
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    type: "Closed Primary",
                    who: "Registered party members only",
                    ex: "NY, PA, Florida (D)",
                  },
                  {
                    type: "Open Primary",
                    who: "Any registered voter, regardless of party",
                    ex: "Wisconsin, Michigan",
                  },
                  {
                    type: "Semi-Open/Semi-Closed",
                    who: "Party members + independents (varies by state)",
                    ex: "New Hampshire, Massachusetts",
                  },
                  {
                    type: "Top-Two / Jungle Primary",
                    who: "All voters; top 2 advance regardless of party",
                    ex: "California, Washington",
                  },
                  {
                    type: "Ranked-Choice Primary",
                    who: "Varies; voters rank candidates 1–N",
                    ex: "Alaska, Maine federal races",
                  },
                ].map((row) => (
                  <tr key={row.type} className="border-b border-border">
                    <td className="px-4 py-3 font-bold text-ink">{row.type}</td>
                    <td className="px-4 py-3 text-ink/70">{row.who}</td>
                    <td className="px-4 py-3 text-ink/70">{row.ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border-l-4 border-accent bg-paper p-6">
            <h3 className="font-headline text-base font-bold text-ink mb-2">
              Superdelegates and the 2016–2020 Reforms
            </h3>
            <p className="text-sm leading-relaxed text-ink/70">
              Democratic "superdelegates" — party officials and elected
              representatives who are automatic convention delegates — were
              created after the 1968 reforms to give the party establishment
              some counterweight. In 2018, after Bernie Sanders supporters
              argued superdelegates distorted the 2016 race, the Democrats
              passed new rules barring superdelegates from voting on the first
              ballot, unless no candidate has secured a majority of pledged
              delegates.
            </p>
          </div>
        </div>
      </section>

      {/* Part III: Why Some Votes Count More */}
      <section className="bg-paper border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
            Part III
          </div>
          <h2 className="font-headline text-3xl font-black text-ink mb-6">
            Why Some Votes Count More Than Others
          </h2>
          <p className="text-ink/80 leading-relaxed mb-6">
            Structural features of the American electoral system systematically
            amplify the political power of some Americans while diluting others.
            These are not accidental — they reflect specific choices about
            representation, often made at the founding or during periods of
            acute political conflict.
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
            {[
              {
                stat: "40",
                sub: "states",
                label: "control 80% of Senate seats",
              },
              {
                stat: "30%",
                sub: "of population",
                label: "elects those 80% of senators",
              },
              {
                stat: "5.2M",
                sub: "Americans",
                label: "disenfranchised by felony convictions",
              },
              {
                stat: "7×",
                sub: "more likely",
                label: "swing-state voters receive campaign visits",
              },
            ].map(({ stat, sub, label }) => (
              <div
                key={stat + sub}
                className="rounded-lg bg-ink text-white p-4 text-center"
              >
                <div className="font-headline text-3xl font-black text-accent-light">
                  {stat}
                </div>
                <div className="font-mono text-xs text-white/60 mt-0.5">{sub}</div>
                <div className="text-xs text-white/70 mt-2 leading-snug">{label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-headline text-xl font-bold text-ink mb-3">
                Senate Malapportionment
              </h3>
              <p className="text-ink/80 leading-relaxed">
                The Senate gives each state exactly two senators regardless of
                population. Wyoming (580,000 people) has the same Senate
                representation as California (39 million). The 40 least-populous
                states contain about 30% of the U.S. population but control 80%
                of Senate seats. Because the Senate confirms judges, ratifies
                treaties, and can block virtually any legislation, this
                imbalance shapes American policy far beyond what population
                share would suggest.
              </p>
            </div>

            <div>
              <h3 className="font-headline text-xl font-bold text-ink mb-3">
                Felon Disenfranchisement
              </h3>
              <p className="text-ink/80 leading-relaxed">
                An estimated 5.2 million Americans are barred from voting due
                to felony convictions. Rules vary dramatically by state: Maine
                and Vermont allow incarcerated people to vote; Florida,
                Kentucky, and Virginia impose lifetime bans for some offenses
                (though Florida voters passed Amendment 4 in 2018 to restore
                rights for most). Because incarceration rates are dramatically
                higher for Black Americans, disenfranchisement falls
                disproportionately on communities of color.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part IV: Voter Registration */}
      <section className="bg-surface border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
            Part IV
          </div>
          <h2 className="font-headline text-3xl font-black text-ink mb-6">
            Voter Registration and Access
          </h2>
          <p className="text-ink/80 leading-relaxed mb-6">
            The United States is nearly alone among wealthy democracies in
            placing the burden of voter registration on individual citizens.
            Most democracies automatically register citizens; America requires
            affirmative registration, often weeks before an election. This
            creates a structural barrier that suppresses participation most
            among young, mobile, and low-income voters.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 mb-8">
            {[
              {
                title: "Automatic Voter Registration (AVR)",
                body: "More than 20 states now automatically register eligible citizens when they interact with government agencies (DMV, benefits offices). Oregon's 2015 AVR law added 272,000 new voters in its first year.",
              },
              {
                title: "Voter ID Laws",
                body: "Roughly 35 states require some form of ID to vote. Studies suggest 10% of Americans lack acceptable photo ID. Strict ID laws reduce turnout most among elderly, low-income, and minority voters.",
              },
              {
                title: "Voting Rights Act",
                body: "The 1965 VRA required states with histories of discrimination to get federal 'preclearance' before changing voting rules. The Supreme Court gutted preclearance in Shelby County v. Holder (2013), releasing covered jurisdictions from federal oversight.",
              },
              {
                title: "Polling Place Access",
                body: "The Leadership Conference documented 1,688 polling place closures between 2012 and 2018, concentrated in states freed from VRA preclearance. Fewer polling places mean longer lines and higher travel burdens in affected communities.",
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

      {/* Part V: Campaign Finance */}
      <section className="bg-paper border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
            Part V
          </div>
          <h2 className="font-headline text-3xl font-black text-ink mb-6">
            Campaign Finance
          </h2>
          <p className="text-ink/80 leading-relaxed mb-8">
            American elections cost extraordinary amounts of money — the 2020
            election cycle cost an estimated $14 billion, nearly double 2016.
            The rules governing who can spend what, on what, and with what
            transparency have been shaped by decades of legislation and Supreme
            Court rulings that have progressively loosened restrictions while
            maintaining others.
          </p>

          {/* Timeline */}
          <div className="space-y-6 mb-8">
            {[
              {
                year: "1971 / 1974",
                title: "FECA — The Foundation",
                body: "The Federal Election Campaign Act created the first comprehensive disclosure requirements and spending limits. The 1974 amendments after Watergate added hard contribution limits and created the FEC.",
              },
              {
                year: "1976",
                title: "Buckley v. Valeo",
                body: "The Supreme Court equated money with speech. It upheld limits on contributions to candidates but struck down limits on independent expenditures — the ruling that opened the door to everything that followed.",
              },
              {
                year: "2002",
                title: "McCain-Feingold (BCRA)",
                body: "Banned 'soft money' (unlimited contributions to parties) and restricted 'issue ads' that attacked candidates close to elections. Considered the high-water mark of modern campaign finance reform.",
              },
              {
                year: "2010",
                title: "Citizens United",
                body: "The Supreme Court ruled corporations and unions can spend unlimited funds on independent political expenditures. Combined with SpeechNow.org v. FEC the same year, Citizens United enabled Super PACs — committees that can raise and spend unlimited amounts as long as they don't coordinate with campaigns.",
              },
            ].map((item) => (
              <div key={item.year} className="flex gap-6">
                <div className="flex-shrink-0 text-right w-20">
                  <div className="font-mono text-xs font-bold text-accent">
                    {item.year}
                  </div>
                </div>
                <div className="flex-shrink-0 w-px bg-border relative">
                  <div className="absolute top-1.5 -left-1.5 w-3 h-3 rounded-full bg-accent" />
                </div>
                <div className="pb-6">
                  <div className="font-headline text-base font-bold text-ink mb-1">
                    {item.title}
                  </div>
                  <p className="text-sm leading-relaxed text-ink/70">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-ink text-white p-6">
            <h3 className="font-headline text-lg font-bold mb-3">Dark Money</h3>
            <p className="text-sm leading-relaxed text-white/80">
              "Dark money" refers to political spending by 501(c)(4) nonprofits
              that are not required to disclose their donors. Unlike Super PACs
              (which must disclose), these organizations can raise unlimited
              funds and spend on elections while keeping funders anonymous.
              Dark money spending exceeded $1 billion in the 2020 cycle,
              according to OpenSecrets. Both parties use dark money vehicles,
              but the lack of disclosure is itself the issue — voters cannot
              evaluate who is trying to influence their vote.
            </p>
          </div>
        </div>
      </section>

      {/* Part VI: Election Administration */}
      <section className="bg-surface border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
            Part VI
          </div>
          <h2 className="font-headline text-3xl font-black text-ink mb-6">
            Election Administration
          </h2>
          <p className="text-ink/80 leading-relaxed mb-8">
            U.S. elections are administered by approximately 8,000 separate
            jurisdictions — counties, cities, townships — each with its own
            equipment, procedures, and personnel. There is no federal election
            authority. The result is a patchwork system where the experience of
            voting, the reliability of equipment, and the speed of results
            varies enormously depending on where you live.
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-ink text-white">
                  <th className="text-left px-4 py-3 font-mono font-bold uppercase tracking-wider text-xs">
                    Layer
                  </th>
                  <th className="text-left px-4 py-3 font-mono font-bold uppercase tracking-wider text-xs">
                    Who Is Responsible
                  </th>
                  <th className="text-left px-4 py-3 font-mono font-bold uppercase tracking-wider text-xs">
                    Key Decisions
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    layer: "Federal",
                    who: "Congress (HAVA), FEC, EAC",
                    what: "Minimum standards, funding, campaign finance rules",
                  },
                  {
                    layer: "State",
                    who: "Secretary of State (usually)",
                    what: "Voter registration rules, ballot design, certification timeline",
                  },
                  {
                    layer: "County/Local",
                    who: "County Clerk or Board of Elections",
                    what: "Polling places, equipment, poll workers, canvassing results",
                  },
                ].map((row) => (
                  <tr key={row.layer} className="border-b border-border">
                    <td className="px-4 py-3 font-bold text-ink">{row.layer}</td>
                    <td className="px-4 py-3 text-ink/70">{row.who}</td>
                    <td className="px-4 py-3 text-ink/70">{row.what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-ink/80 leading-relaxed mb-4">
            The Help America Vote Act (2002), passed after the 2000 Florida
            recount debacle and hanging chads, set minimum federal standards
            and provided funding for new voting equipment. But underfunded
            jurisdictions still run elections on aging machines. The Brennan
            Center documented 33 states using voting equipment past its
            manufacturer's recommended lifespan as of recent elections.
          </p>
          <p className="text-ink/80 leading-relaxed">
            The January 6, 2021 attack on the Capitol, and the preceding
            pressure campaign on state election officials to reverse results,
            highlighted how election certification — the formal acceptance of
            results — is itself a political process with human decision-makers
            who can be pressured or intimidated.
          </p>
        </div>
      </section>

      {/* Part VII: Reform */}
      <section className="bg-paper border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
            Part VII
          </div>
          <h2 className="font-headline text-3xl font-black text-ink mb-6">
            Reform Proposals
          </h2>
          <p className="text-ink/80 leading-relaxed mb-8">
            The debates around electoral reform involve real trade-offs about
            representation, accountability, and political stability. These are
            the most widely discussed proposals — each with genuine arguments
            on both sides.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 mb-12">
            {[
              {
                title: "National Popular Vote Interstate Compact",
                status: "Partial",
                body: "States pledge their electors to the national popular vote winner. Currently at 209/270 electoral votes. Would take effect only when 270 is reached.",
                pro: "Presidents would need to build broad national coalitions",
                con: "Could trigger constitutional challenges; rural concerns about coastal dominance",
              },
              {
                title: "Ranked-Choice Voting",
                status: "Growing",
                body: "Voters rank candidates in order of preference. If no one wins 50%, last-place candidates are eliminated and votes redistributed. Alaska and Maine use it for federal races.",
                pro: "Eliminates spoiler effect; allows more candidate choices",
                con: "More complex ballot; can produce counterintuitive results",
              },
              {
                title: "Automatic Voter Registration",
                status: "In 20+ states",
                body: "Citizens are registered when interacting with government agencies. Oregon's AVR added 272,000 voters in year one.",
                pro: "Removes registration barrier; Oregon saw turnout increase",
                con: "Opponents raise concerns about accuracy of government records",
              },
              {
                title: "Small-Donor Matching",
                status: "NYC model",
                body: "Government matches small donations at a 6:1 or higher ratio to amplify grassroots funding. New York City's program dramatically increased small-donor participation in city races.",
                pro: "Candidates less dependent on wealthy donors; broader donor base",
                con: "Costs public money; risk of gaming via straw donors",
              },
            ].map((reform) => (
              <div
                key={reform.title}
                className="rounded-lg border border-border bg-surface p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-headline text-sm font-bold text-ink">
                    {reform.title}
                  </h3>
                  <span className="flex-shrink-0 ml-2 font-mono text-xs text-accent bg-accent/10 px-2 py-0.5 rounded">
                    {reform.status}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-ink/70 mb-3">
                  {reform.body}
                </p>
                <div className="text-xs space-y-1">
                  <div className="text-green-700 dark:text-green-400">
                    + {reform.pro}
                  </div>
                  <div className="text-ink/50">− {reform.con}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Resources */}
          <h3 className="font-headline text-xl font-bold text-ink mb-4">
            Go Deeper
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 mb-12">
            {[
              {
                name: "FairVote",
                desc: "Research and advocacy on ranked-choice voting and proportional representation.",
              },
              {
                name: "OpenSecrets",
                desc: "Campaign finance tracking — who is spending what, where the money comes from.",
              },
              {
                name: "NCSL Voting Laws",
                desc: "National Conference of State Legislatures tracks changes to voting laws across all 50 states.",
              },
              {
                name: "Brennan Center",
                desc: "Research on voting rights, election security, and the integrity of U.S. elections.",
              },
            ].map((r) => (
              <div
                key={r.name}
                className="rounded-lg border border-border bg-paper p-4"
              >
                <div className="font-headline text-sm font-bold text-ink mb-1">
                  {r.name}
                </div>
                <p className="text-xs leading-relaxed text-ink/60">{r.desc}</p>
              </div>
            ))}
          </div>

          {/* Closing callout */}
          <div className="rounded-xl bg-ink text-white p-8">
            <h3 className="font-headline text-2xl font-black mb-3">
              The System Is Not Neutral
            </h3>
            <p className="text-white/80 leading-relaxed">
              Every feature of the American electoral system — the Electoral
              College, winner-take-all allocation, the primary structure, voter
              registration requirements, campaign finance rules — reflects a
              political choice made at a specific historical moment by people
              with specific interests. None of it was inevitable, and all of it
              can be changed. Understanding the system as designed, rather than
              natural, is the first step toward evaluating whether it serves
              democratic principles — and what alternatives might look like.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom nav */}
      <nav className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/how-power-works/local-government"
              className="group flex flex-col rounded-lg border border-border bg-surface p-4 hover:border-ink transition-colors"
            >
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted mb-1">
                ← Previous
              </span>
              <span className="font-headline text-sm font-bold text-ink group-hover:text-accent transition-colors">
                Local Government 101
              </span>
            </Link>
            <Link
              href="/how-power-works"
              className="group flex flex-col rounded-lg border border-border bg-surface p-4 hover:border-ink transition-colors text-right"
            >
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted mb-1">
                All Topics →
              </span>
              <span className="font-headline text-sm font-bold text-ink group-hover:text-accent transition-colors">
                How Power Works
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </article>
  );
}
