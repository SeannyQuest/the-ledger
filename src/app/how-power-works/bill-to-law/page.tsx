import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "How a Bill Becomes Law | Daonra",
  description:
    "The real legislative process — committees, filibusters, reconciliation, conference reports, and the gap between civics class and how Congress actually works.",
};

export default function BillToLawPage() {
  return (
    <article>
      {/* SECTION: Hero */}
      <header className="relative overflow-hidden border-b-4 border-ink bg-ink text-white">
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 lg:px-8 lg:py-32">
          <nav className="mb-8 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-white/40">
            <Link
              href="/how-power-works"
              className="transition-colors hover:text-accent-light"
            >
              How Power Works
            </Link>
            <span>/</span>
            <span className="text-accent-light">How a Bill Becomes Law</span>
          </nav>
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
            How Power Works &middot; Explainer
          </div>
          <h1 className="mt-6 font-headline text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl">
            How a Bill Becomes Law
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70 lg:text-2xl">
            Your civics textbook got it wrong &mdash; or at least incomplete.
            Most bills never receive a vote. The real action happens behind
            closed doors in committees, and the process is engineered as much
            to <em>block</em> legislation as to pass it.
          </p>
          <div className="mt-8 flex items-center gap-6 text-sm text-white/50">
            <span>Daonra Explainers</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>~14 min read</span>
          </div>
        </div>
        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </header>

      {/* Stat row */}
      <div className="border-t border-white/10 bg-ink">
        <div className="mx-auto max-w-4xl px-4 py-10 lg:px-8">
          <div className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
            <div className="bg-ink px-6 py-8">
              <div className="font-headline text-3xl font-black text-white lg:text-4xl">
                ~10,000
              </div>
              <div className="mt-2 font-mono text-xs font-bold uppercase tracking-widest text-white/40">
                Bills introduced per Congress
              </div>
            </div>
            <div className="bg-ink px-6 py-8">
              <div className="font-headline text-3xl font-black text-accent-light lg:text-4xl">
                ~4%
              </div>
              <div className="mt-2 font-mono text-xs font-bold uppercase tracking-widest text-white/40">
                Actually become law
              </div>
            </div>
            <div className="bg-ink px-6 py-8">
              <div className="font-headline text-3xl font-black text-white lg:text-4xl">
                ~90%
              </div>
              <div className="mt-2 font-mono text-xs font-bold uppercase tracking-widest text-white/40">
                Die in committee without a vote
              </div>
            </div>
            <div className="bg-ink px-6 py-8">
              <div className="font-headline text-3xl font-black text-accent-light lg:text-4xl">
                263
              </div>
              <div className="mt-2 font-mono text-xs font-bold uppercase tracking-widest text-white/40">
                Avg. days from introduction to passage
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: Part I */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part I
          </div>
          <h2 className="mt-4 font-headline text-4xl font-black leading-tight tracking-tight text-ink lg:text-5xl">
            Where Bills Actually Come From
          </h2>

          <div className="mt-10 space-y-6">
            <p className="text-lg leading-relaxed text-ink/70">
              The civics class version goes like this: a citizen has an idea,
              contacts their representative, and a bill gets written. It&rsquo;s
              technically true that any member of Congress can introduce a bill
              &mdash; but that framing is deeply misleading about where
              legislation actually originates.
            </p>
            <p className="text-lg leading-relaxed text-ink/70">
              In practice, the authorship of major legislation is far more
              distributed &mdash; and far more corporate. Lobbyists and industry
              groups draft statutory language and shop it to sympathetic members.
              The Office of Management and Budget sends &ldquo;administration
              priority&rdquo; legislation to Capitol Hill each session. Senior
              committee staff, many with decades of subject-matter expertise,
              shape the technical language that members themselves rarely read in
              full. Think tanks publish model bills that get introduced nearly
              verbatim.
            </p>
            <p className="text-lg leading-relaxed text-ink/70">
              A 2014 study of major legislation found that roughly 40% was
              drafted primarily by outside groups. The member who
              &ldquo;introduces&rdquo; the bill is often simply the carrier
              &mdash; the trusted ally with the right committee assignment and
              the political will to absorb whatever backlash follows.
            </p>
            <p className="text-lg leading-relaxed text-ink/70">
              This is why lobbying firms obsessively cultivate relationships with
              specific members. The access isn&rsquo;t just about influence
              &mdash; it&rsquo;s about finding someone willing to put their name
              on the bill and defend it through the gauntlet of the legislative
              process.
            </p>
            <p className="text-lg leading-relaxed text-ink/70">
              Two structural patterns are worth understanding.
              &ldquo;Companion bills&rdquo; are introduced simultaneously in
              both the House and Senate &mdash; a strategy to accelerate the
              process since both chambers can begin committee work in parallel.
              More cynical is the &ldquo;message bill&rdquo;: legislation
              introduced with no expectation of passage, designed purely to
              force opponents onto the record voting against something popular
              with constituents.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                Industry Groups
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                Draft statutory language directly, hire former Hill staffers as
                lobbyists who know the process intimately, and fund the
                campaigns of members likely to carry the legislation. The
                revolving door between Congress and K Street is the mechanism.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                Executive Branch
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                The OMB transmits the administration&rsquo;s legislative agenda
                to Capitol Hill each Congress &mdash; often dozens of fully
                drafted bills. When the White House and Congress share a party,
                much of the majority&rsquo;s workload is simply advancing these
                proposals.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                Committee Staff
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                Senior committee staff accumulate decades of policy expertise
                that no elected member can match. They negotiate technical
                language, identify landmines, and often shape legislation more
                profoundly than the members whose names appear on it.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                Think Tanks
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                Organizations across the ideological spectrum &mdash; Heritage
                Foundation, Brookings, Center for American Progress &mdash;
                publish &ldquo;model legislation&rdquo; that enters the
                congressional pipeline with minimal modification. The pipeline
                from policy paper to introduced bill can be remarkably short.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Part II */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part II
          </div>
          <h2 className="mt-4 font-headline text-4xl font-black leading-tight tracking-tight text-ink lg:text-5xl">
            The Real Legislative Work: Committees
          </h2>

          <div className="mt-10 space-y-6">
            <p className="text-lg leading-relaxed text-ink/70">
              The House and Senate each have 20 standing committees, each with
              jurisdiction over specific policy domains &mdash; Agriculture,
              Armed Services, Finance, Judiciary, and so on. When a bill is
              introduced, the Speaker of the House or the Senate&rsquo;s
              presiding officer refers it to the relevant committee. For major
              legislation touching multiple policy areas, it may be referred to
              several committees simultaneously, each of which must act before
              the bill can advance.
            </p>
            <p className="text-lg leading-relaxed text-ink/70">
              The committee chair&rsquo;s power in this system is nearly
              absolute. They set the agenda. They decide which bills receive
              hearings and which are filed away and forgotten. They control the
              scheduling of markup sessions. A chair who opposes a bill &mdash;
              or who simply owes a favor to an industry that opposes it &mdash;
              can kill it without any member ever casting a vote.
            </p>
            <p className="text-lg leading-relaxed text-ink/70">
              There is a procedural escape valve: the discharge petition. If 218
              members of the House sign a petition, a bill can be forced out of
              committee and onto the floor. In theory, this prevents any single
              chair from indefinitely blocking popular legislation. In practice,
              it has been used successfully only about 25 times in congressional
              history &mdash; members are deeply reluctant to cross their own
              leadership this way.
            </p>
            <p className="text-lg leading-relaxed text-ink/70">
              Most bills are referred first to a subcommittee &mdash; a smaller
              body focused on a narrower slice of the committee&rsquo;s
              jurisdiction. This adds another gate. The subcommittee holds
              hearings, invites expert witnesses, and builds a public record. If
              it clears the subcommittee, the full committee then conducts a
              &ldquo;markup&rdquo; &mdash; a line-by-line amendment process
              that can stretch over days or weeks. A favorable committee vote
              &ldquo;reports&rdquo; the bill to the full chamber. The other 90%
              simply die here, unscheduled, unvoted on, unnoticed.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="relative rounded-xl border border-border bg-paper p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink font-mono text-sm font-black text-white">
                1
              </div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                Referral
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                The Speaker or presiding officer assigns the bill to relevant
                committee(s). Major legislation frequently receives multiple
                referrals, requiring each committee to act &mdash; a significant
                barrier to passage.
              </p>
            </div>
            <div className="relative rounded-xl border border-border bg-paper p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink font-mono text-sm font-black text-white">
                2
              </div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                Subcommittee
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                Most bills are referred down to a subcommittee, adding another
                gate. Subcommittees hold hearings, invite witnesses, and build
                the official record. Many bills clear no further than this
                stage.
              </p>
            </div>
            <div className="relative rounded-xl border border-border bg-paper p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink font-mono text-sm font-black text-white">
                3
              </div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                Markup
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                The full committee amends the bill section by section, often
                over multiple sessions. A majority vote to &ldquo;report&rdquo;
                the bill sends it to the chamber floor &mdash; a milestone fewer
                than one in ten bills ever reach.
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-r-xl border-l-4 border-accent bg-ink/5 p-6">
            <p className="font-headline text-xl font-bold leading-snug text-ink lg:text-2xl">
              &ldquo;The committee chairman is, in many respects, more powerful
              than the full committee. By refusing to schedule a hearing, they
              can kill a bill without a single vote ever being cast.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: Part III */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part III
          </div>
          <h2 className="mt-4 font-headline text-4xl font-black leading-tight tracking-tight text-ink lg:text-5xl">
            Floor Procedures: How Bills Get (or Don&rsquo;t Get) a Vote
          </h2>

          <div className="mt-10 space-y-8">
            <div>
              <h3 className="font-headline text-xl font-bold text-ink">
                The House Rules Committee
              </h3>
              <p className="mt-1 text-sm text-muted">
                The &ldquo;traffic cop of the House&rdquo;
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  "Before any bill reaches the House floor, it must get a \u201crule\u201d from the Rules Committee \u2014 a special resolution setting the terms of debate.",
                  "The rule determines: how long debate lasts (usually 1\u20134 hours), whether amendments are allowed (open, closed, or structured rules), and the order in which amendments can be offered.",
                  "A \u201cclosed rule\u201d means no amendments at all \u2014 the bill is voted on as-is from committee.",
                  "The Rules Committee has 13 members \u2014 historically 9 majority, 4 minority \u2014 and is considered an arm of the Speaker.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-ink/70">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
                <li className="flex gap-3 text-ink/70">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>
                    <span className="font-semibold text-ink">
                      Suspension of the rules:
                    </span>{" "}
                    for non-controversial bills, the House can skip the Rules
                    Committee with a two-thirds vote; most bills actually pass
                    this way.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-headline text-xl font-bold text-ink">
                Senate Floor: A Different World
              </h3>
              <ul className="mt-4 space-y-3">
                {[
                  "The Senate has no equivalent of the Rules Committee for most legislation.",
                  "Bills reach the floor by \u201cunanimous consent\u201d (a single senator can object) or through a formal motion to proceed \u2014 which itself can be filibustered.",
                  "Every senator has the right to offer unlimited amendments unless limited by unanimous consent agreements.",
                  "A \u201chotline\u201d system: leadership circulates bills to all Senate offices; if no one objects within a set window, they pass by UC.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-ink/70">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="font-headline text-xl font-bold text-ink">
              House vs. Senate at a Glance
            </h3>
            <div className="mt-6 overflow-hidden rounded-xl border border-border">
              <div className="grid grid-cols-2 divide-x divide-border">
                <div className="bg-ink px-6 py-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                    House
                  </span>
                </div>
                <div className="bg-ink px-6 py-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                    Senate
                  </span>
                </div>
              </div>
              {[
                [
                  "Rules Committee controls floor access",
                  "Any senator can block floor access",
                ],
                [
                  "Strict time limits, amendment rules",
                  "Unlimited debate unless cloture invoked",
                ],
                [
                  "Majority usually controls the floor",
                  "Minority has enormous leverage",
                ],
                [
                  "218 votes needed to pass",
                  "51 votes to pass (but 60 for cloture)",
                ],
              ].map(([house, senate], i) => (
                <div
                  key={i}
                  className="grid grid-cols-2 divide-x divide-border border-t border-border"
                >
                  <div
                    className={`px-6 py-4 text-sm text-ink/70 ${i % 2 === 0 ? "bg-paper" : "bg-surface"}`}
                  >
                    {house}
                  </div>
                  <div
                    className={`px-6 py-4 text-sm text-ink/70 ${i % 2 === 0 ? "bg-paper" : "bg-surface"}`}
                  >
                    {senate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Part IV */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part IV
          </div>
          <h2 className="mt-4 font-headline text-4xl font-black leading-tight tracking-tight text-ink lg:text-5xl">
            The Filibuster: The Senate&rsquo;s Most Powerful Obstacle
          </h2>

          <ul className="mt-10 space-y-4">
            {[
              "The word \u201cfilibuster\u201d comes from Dutch/Spanish for pirate; first used in the Senate in 1837.",
              "The original filibuster required actually talking \u2014 Strom Thurmond spoke for 24 hours 18 minutes against the Civil Rights Act of 1957, the longest in history.",
              "The modern filibuster: since the 1970s, senators don\u2019t have to speak \u2014 they simply signal their intent to filibuster, and floor time moves on. This is why the Senate can filibuster dozens of bills simultaneously.",
              "Used roughly 1,000 times since 1917; dramatically increased after the 1970s rules change; record highs in recent decades.",
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-ink/70">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
            <li className="flex gap-3 text-ink/70">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>
                <span className="font-semibold text-ink">Cloture:</span> the
                only way to end debate; requires 60 votes (three-fifths of the
                Senate); takes 30 additional hours after cloture is invoked
                before final passage.
              </span>
            </li>
          </ul>

          <div className="mt-12 space-y-6">
            <div>
              <h3 className="font-headline text-xl font-bold text-ink">
                The Nuclear Option
              </h3>
              <ul className="mt-4 space-y-3">
                <li className="flex gap-3 text-ink/70">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>
                    <span className="font-semibold text-ink">2013:</span> Senate
                    Democrats changed rules for most executive and judicial
                    nominees to require only 51 votes &mdash; Harry Reid&rsquo;s
                    nuclear option.
                  </span>
                </li>
                <li className="flex gap-3 text-ink/70">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>
                    <span className="font-semibold text-ink">2017:</span> Senate
                    Republicans extended this to Supreme Court nominees &mdash;
                    Mitch McConnell&rsquo;s nuclear option.
                  </span>
                </li>
                <li className="flex gap-3 text-ink/70">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>
                    The legislative filibuster still requires 60 votes &mdash;
                    neither party has eliminated it for regular legislation as of
                    2025.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-headline text-xl font-bold text-ink">
                Budget Reconciliation &mdash; The Workaround
              </h3>
              <ul className="mt-4 space-y-3">
                <li className="flex gap-3 text-ink/70">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>
                    Legislation that deals with the federal budget (spending,
                    taxes, debt limit) can be passed with 51 votes via
                    reconciliation.
                  </span>
                </li>
                <li className="flex gap-3 text-ink/70">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>
                    The &ldquo;Byrd Rule&rdquo;: provisions in reconciliation
                    bills must be directly budget-related; a Senate
                    parliamentarian rules on violations.
                  </span>
                </li>
                <li className="flex gap-3 text-ink/70">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>
                    Major laws passed via reconciliation: Tax Cuts and Jobs Act
                    (2017), ACA revenue provisions, American Rescue Plan (2021),
                    Inflation Reduction Act (2022).
                  </span>
                </li>
                <li className="flex gap-3 text-ink/70">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>
                    <span className="font-semibold text-ink">Limit:</span> only
                    one reconciliation bill per fiscal year.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 rounded-r-xl border-l-4 border-accent bg-accent/10 p-6">
            <p className="text-lg leading-relaxed text-ink">
              The 60-vote threshold isn&rsquo;t in the Constitution. It&rsquo;s
              a Senate rule that could be changed with 51 votes. The reason it
              persists is that both parties, when in the minority, benefit from
              it.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: Part V */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part V
          </div>
          <h2 className="mt-4 font-headline text-4xl font-black leading-tight tracking-tight text-ink lg:text-5xl">
            Two Bills, One Law: Reconciling the House and Senate
          </h2>

          <div className="mt-10 space-y-6">
            <p className="text-lg leading-relaxed text-ink/70">
              The Constitution requires that both chambers pass the identical
              text before a bill goes to the President. Because the House and
              Senate almost always pass different versions, the chambers must
              reconcile their differences before anything can become law.
            </p>
            <p className="text-lg leading-relaxed text-ink/70">
              Three methods exist. The first is{" "}
              <span className="font-semibold text-ink">ping-pong</span> &mdash;
              one chamber amends the other&rsquo;s bill and sends it back, and
              this continues until both agree. The second is a{" "}
              <span className="font-semibold text-ink">
                conference committee
              </span>{" "}
              &mdash; a formal negotiation between members appointed from both
              chambers. The third, and simplest, is when one chamber simply
              adopts the other&rsquo;s text unchanged.
            </p>
          </div>

          <div className="mt-12 rounded-xl border border-border bg-surface p-8">
            <h3 className="font-headline text-xl font-bold text-ink">
              Conference Committees
            </h3>
            <div className="mt-5 space-y-4 text-ink/70">
              <p>
                Historically, conference committees were the primary mechanism
                for resolving differences. &ldquo;Conferees&rdquo; are appointed
                by leadership &mdash; typically senior members of the committees
                that handled the legislation.
              </p>
              <p>
                Conference meetings are technically open to the public, and
                C-SPAN has covered them since 1975, but they were historically
                held in secret. Critically, the resulting conference report
                cannot be amended &mdash; both chambers must vote it up or down
                as a whole.
              </p>
              <p>
                Conference committees have declined sharply in recent decades.
                The 2017 Tax Cuts and Jobs Act had no formal conference committee
                &mdash; House and Senate Republican leadership negotiated
                directly and privately.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="font-headline text-xl font-bold text-ink">
              What Gets Changed in Conference
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                "The most controversial provisions are often stripped out or softened to secure enough votes in both chambers.",
                "Riders get added \u2014 provisions entirely unrelated to the bill\u2019s stated subject matter.",
                "Earmarks (now formally banned but still occurring informally) get inserted to win specific members\u2019 support.",
                "This is where lobbyists swarm in the final days, working to protect or kill specific provisions before the text is locked.",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-ink/70">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <h3 className="font-headline text-xl font-bold text-ink">
              Typical Reconciliation Timeline
            </h3>
            <ol className="relative ml-4 mt-8 space-y-0 border-l-2 border-border">
              {[
                {
                  step: "Step 1",
                  title: "House Passes H.R. 1234 with Amendments",
                  desc: "The House votes and passes its version of the bill, incorporating floor amendments.",
                },
                {
                  step: "Step 2",
                  title: "Senate Passes Amended Version",
                  desc: "The Senate passes its own version, changing 47 provisions \u2014 the two texts are now incompatible.",
                },
                {
                  step: "Step 3",
                  title: "Conferees Appointed \u2014 Weeks of Negotiation",
                  desc: "Appointed members from both chambers meet, negotiate, and draft a unified conference report.",
                },
                {
                  step: "Step 4",
                  title: "Conference Report Filed \u2014 Both Chambers Vote",
                  desc: "The report cannot be amended. Both chambers vote it up or down. Identical text is sent to the President.",
                },
              ].map(({ step, title, desc }, i, arr) => (
                <li
                  key={i}
                  className={`relative pl-8 ${i < arr.length - 1 ? "pb-10" : ""}`}
                >
                  <div className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-accent">
                    <span className="font-mono text-xs font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
                    {step}
                  </p>
                  <p className="mt-1 font-semibold text-ink">{title}</p>
                  <p className="mt-1 text-sm text-muted">{desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* SECTION: Part VI */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part VI
          </div>
          <h2 className="mt-4 font-headline text-4xl font-black leading-tight tracking-tight text-ink lg:text-5xl">
            The President&rsquo;s Four Choices
          </h2>

          <p className="mt-10 text-lg leading-relaxed text-ink/70">
            Once Congress passes identical text in both chambers, the
            Constitution gives the President ten days (excluding Sundays) to
            act. That window produces four distinct outcomes &mdash; each with
            different political and legal consequences.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              {
                color: "bg-green-500",
                option: "Option 1",
                title: "Sign",
                body: "The President signs the bill and it becomes law immediately. This is the most common outcome.",
                note: "Presidents may attach a signing statement \u2014 a written document interpreting the law\u2019s meaning or signaling intent not to enforce provisions they consider unconstitutional. Courts have given these statements limited deference.",
              },
              {
                color: "bg-red-500",
                option: "Option 2",
                title: "Veto",
                body: "The President returns the bill to Congress with written objections. Congress can override the veto with two-thirds of both chambers voting in favor.",
                note: "Only roughly 111 successful overrides in U.S. history out of approximately 2,500 vetoes cast. The threat of a veto is often more powerful than the act itself.",
              },
              {
                color: "bg-yellow-400",
                option: "Option 3",
                title: "Pocket Veto",
                body: "If Congress adjourns within ten days of sending a bill to the President, and the President takes no action, the bill dies \u2014 it has been \u201cpocketed.\u201d",
                note: "Unlike a standard veto, a pocket veto cannot be overridden because Congress is no longer in session to hold an override vote.",
              },
              {
                color: "bg-muted/40",
                option: "Option 4",
                title: "Unsigned \u2014 Becomes Law",
                body: "If Congress remains in session and the President does nothing for ten days, the bill becomes law without the President\u2019s signature.",
                note: "Used to signal disapproval of a bill without triggering an override fight that the President might lose, or that would force members of his own party to take an uncomfortable vote.",
              },
            ].map(({ color, option, title, body, note }) => (
              <div
                key={option}
                className="overflow-hidden rounded-xl border border-border bg-paper"
              >
                <div className={`h-1.5 w-full ${color}`} />
                <div className="p-6">
                  <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                    {option}
                  </p>
                  <h3 className="mt-2 font-headline text-xl font-bold text-ink">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">
                    {body}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {note}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 border-t border-border pt-10">
            <h3 className="font-headline text-xl font-bold text-ink">
              When Legislation Fails: Executive Orders
            </h3>
            <div className="mt-6 space-y-4 text-ink/70">
              <p className="text-lg leading-relaxed">
                When legislation stalls or fails in Congress, presidents
                increasingly turn to executive orders &mdash; directives issued
                under claimed constitutional or statutory authority that carry
                the force of law without requiring congressional approval.
              </p>
              <p className="text-lg leading-relaxed">
                Executive orders can be reversed by a future president with a
                single signature. Major executive orders have reshaped American
                life in ways legislation could not: Franklin Roosevelt&rsquo;s
                EO 9066 authorized the internment of Japanese Americans; Harry
                Truman&rsquo;s EO 9981 desegregated the U.S. military in 1948;
                Barack Obama&rsquo;s DACA order protected hundreds of thousands
                of undocumented immigrants brought to the U.S. as children
                &mdash; and was subsequently rescinded by President Trump.
              </p>
              <p className="text-lg leading-relaxed">
                Executive orders are not a substitute for legislation. Courts
                can and do strike them down when a president exceeds
                constitutional or statutory authority &mdash; and without
                congressional backing, they remain vulnerable to the next
                administration&rsquo;s pen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Part VII */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part VII
          </div>
          <h2 className="mt-4 font-headline text-4xl font-black leading-tight tracking-tight text-ink lg:text-5xl">
            When the Regular Process Breaks Down
          </h2>

          <div className="mt-10 space-y-10">
            <div>
              <h3 className="font-headline text-xl font-bold text-ink">
                The Appropriations Process
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-ink/70">
                Congress is supposed to pass 12 annual appropriations bills by
                October 1 &mdash; the start of the federal fiscal year. The last
                time all 12 passed on time was 1997. In the nearly three decades
                since, Congress has relied on a rotating set of workarounds.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  {
                    label: "Continuing Resolutions (CRs)",
                    desc: "Stopgap funding measures that maintain prior-year spending levels. New programs cannot be funded under a CR. A government perpetually running on CRs cannot respond nimbly to new or emerging needs.",
                  },
                  {
                    label: "Omnibus Bills",
                    desc: "Massive spending packages that bundle all 12 appropriations bills into one vote. Members often receive thousands of pages hours before the vote. The alternative \u2014 shutting down government \u2014 creates enormous pressure to vote yes.",
                  },
                  {
                    label: "Anomalies",
                    desc: "Specific exceptions written into CRs to address urgent needs that can\u2019t wait for a full appropriations bill. These carve-outs are negotiated individually and are often the only way to fund new priorities during a CR period.",
                  },
                ].map(({ label, desc }) => (
                  <div
                    key={label}
                    className="rounded-lg border border-border bg-surface p-4"
                  >
                    <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                      {label}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-headline text-xl font-bold text-ink">
                Government Shutdowns
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-ink/70">
                When neither a CR nor an omnibus passes before the funding
                deadline, the government shuts down. Non-essential operations
                cease until Congress acts.
              </p>
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-border bg-surface p-5">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 font-mono text-xs font-bold text-accent">
                      2013
                    </div>
                    <div>
                      <div className="font-headline text-base font-bold text-ink">
                        16-Day Shutdown
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        A standoff over the Affordable Care Act halted
                        non-essential government operations for 16 days. The OMB
                        estimated the shutdown cost approximately $24 billion in
                        lost economic activity.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-surface p-5">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 font-mono text-xs font-bold text-accent">
                      2018&ndash;19
                    </div>
                    <div>
                      <div className="font-headline text-base font-bold text-ink">
                        35-Day Shutdown &mdash; Longest in U.S. History
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        A dispute over border wall funding produced the longest
                        government shutdown on record. Roughly 800,000 federal
                        workers were furloughed or required to work without pay.
                        Federal contractors &mdash; who received no back pay
                        &mdash; bore some of the deepest financial damage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-surface p-5">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                    What Shuts Down
                  </div>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted">
                    {[
                      "Non-essential federal workers furloughed",
                      "National parks and monuments close",
                      "Federal contractors unpaid, no back pay guaranteed",
                      "Visa and passport processing slows significantly",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 text-accent">&bull;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-border bg-surface p-5">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                    What Stays Open
                  </div>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted">
                    {[
                      "Military operations and national security",
                      "Social Security and Medicare/Medicaid payments",
                      "Air traffic control and border patrol",
                      "Essential federal functions and emergency services",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 text-accent">&bull;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-headline text-xl font-bold text-ink">
                Must-Pass Vehicles
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-ink/70">
                Certain bills carry so much political weight that they are
                functionally guaranteed to pass &mdash; the debt ceiling, the
                NDAA, the farm bill. The consequences of failure are too severe
                or too visible to allow.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink/70">
                This creates a predictable dynamic: unrelated legislation gets
                attached. Reforms that could never survive standalone floor votes
                &mdash; and riders designed to slip through without scrutiny
                &mdash; often become law this way rather than through anything
                resembling regular order.
              </p>
            </div>
          </div>

          <div className="mt-14 rounded-xl bg-ink p-8">
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent-light">
              Reality Check
            </div>
            <div className="mt-2 font-headline text-xl font-bold text-white">
              The Legislative Calendar Reality
            </div>
            <p className="mt-4 leading-relaxed text-white/80">
              A two-year Congress &mdash; 435 House members, 100 senators, 1
              President &mdash; will consider roughly 10,000&ndash;15,000 bills.
              About 300&ndash;500 will become law. Most governance happens not
              through legislation but through regulation, executive action, and
              agency discretion &mdash; processes largely invisible to the
              public.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: Part VIII */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part VIII
          </div>
          <h2 className="mt-4 font-headline text-4xl font-black leading-tight tracking-tight text-ink lg:text-5xl">
            Following Legislation and Making Your Voice Heard
          </h2>

          <p className="mt-10 text-lg leading-relaxed text-ink/70">
            The legislative process is deliberately designed to be opaque.
            Procedures compound on procedures; procedural votes obscure
            substantive ones; markups happen in rooms most people will never
            enter. But more information is publicly available than most people
            realize &mdash; if you know where to look.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                title: "Congress.gov",
                label: "congress.gov",
                items: [
                  "Track any bill\u2019s status, full text, amendments, committee actions, and co-sponsors",
                  "Set up alerts for bills you care about",
                  "See exactly how your representatives voted on every recorded vote",
                ],
              },
              {
                title: "GovTrack.us",
                label: "Free & Nonpartisan",
                items: [
                  "Adds predictive analysis: probability a bill passes committee or the full chamber",
                  "Ideology scoring of members based on voting records",
                  "Historical comparisons of voting patterns over time",
                ],
              },
              {
                title: "Contact Your Representative",
                label: "Direct Engagement",
                items: [
                  "Calls are more effective than emails; showing up to district offices is most effective",
                  "Staff tally constituent contacts \u2014 volume matters, especially on close votes",
                  "Best timing: during committee markup, before a floor vote, or before a conference report",
                ],
              },
              {
                title: "Daonra Tools",
                label: "Follow the Money",
                items: [
                  "Track which members receive money from industries backing a specific bill",
                  "See the revolving door: former staffers now lobbying for legislation they helped write",
                  "Follow campaign finance flows behind any floor vote",
                ],
              },
            ].map(({ title, label, items }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-paper p-6"
              >
                <div className="font-headline text-base font-bold text-ink">
                  {title}
                </div>
                <div className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  {label}
                </div>
                <ul className="mt-4 space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted">
                      <span className="mt-1 shrink-0 text-accent">&bull;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <h3 className="font-headline text-xl font-bold text-ink">
              Procedural Terms Worth Knowing
            </h3>
            <div className="mt-6 overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-ink">
                    <th className="px-5 py-3 text-left font-mono text-[10px] font-bold uppercase tracking-widest text-accent-light">
                      Term
                    </th>
                    <th className="px-5 py-3 text-left font-mono text-[10px] font-bold uppercase tracking-widest text-accent-light">
                      What It Means
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    [
                      "Cloture",
                      "Motion to end Senate debate and force a vote; requires 60 votes. The primary mechanism used to break a filibuster.",
                    ],
                    [
                      "Discharge Petition",
                      "House mechanism to force a bill out of committee onto the floor; requires 218 signatures.",
                    ],
                    [
                      "Point of Order",
                      "A formal objection that a rule has been violated. Ruled on by the presiding officer; can be appealed to the full chamber.",
                    ],
                    [
                      "Unanimous Consent",
                      "Senate shortcut requiring agreement from every senator to proceed. Any single senator can object and block the action.",
                    ],
                    [
                      "Motion to Recommit",
                      "House minority tool to send a bill back to committee. Often used as a messaging vote rather than a serious procedural move.",
                    ],
                    [
                      "Rider",
                      "An unrelated provision attached to a must-pass bill. Allows legislation to become law without ever receiving a standalone vote.",
                    ],
                    [
                      "Mark-up",
                      "The committee process of amending a bill line by line before it is reported to the full chamber.",
                    ],
                    [
                      "Engrossment",
                      "The official enrollment of a bill\u2019s final text after it passes one chamber, before transmission to the other.",
                    ],
                  ].map(([term, def], i) => (
                    <tr key={term} className={i % 2 === 0 ? "bg-paper" : "bg-surface"}>
                      <td className="whitespace-nowrap px-5 py-4 align-top font-mono text-xs font-bold text-ink">
                        {term}
                      </td>
                      <td className="px-5 py-4 leading-relaxed text-muted">
                        {def}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom nav */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
          <div className="grid grid-cols-2 gap-6">
            <Link
              href="/how-power-works/federal-budget"
              className="group flex items-center gap-4 rounded-xl border border-border bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <ArrowLeft className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-ink" />
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Previous
                </div>
                <div className="mt-1 font-headline text-lg font-bold text-ink">
                  The Federal Budget
                </div>
              </div>
            </Link>
            <Link
              href="/how-power-works/gerrymandering"
              className="group flex items-center justify-end gap-4 rounded-xl border border-border bg-paper p-6 text-right transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Next Topic
                </div>
                <div className="mt-1 font-headline text-lg font-bold text-ink">
                  Gerrymandering Explained
                </div>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-ink" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
