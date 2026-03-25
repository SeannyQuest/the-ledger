import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  ArrowLeftRight,
  Landmark,
  DollarSign,
  BarChart3,
  GitBranch,
  Building2,
  FileSearch,
  RefreshCw,
  Megaphone,
  Scale,
  Users,
  Search,
  Mail,
  ExternalLink,
  Pill,
  Shield,
  Cpu,
  Fuel,
  Clock,
  TrendingUp,
  FileText,
  AlertTriangle,
  BookOpen,
  Network,
  Eye,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How Lobbying Works | Daonra",
  description:
    "A clear, nonpartisan guide to lobbying in America — what lobbyists do, who pays them, how they shape policy, and what reform would look like.",
};

export default function LobbyingPage() {
  return (
    <article>
      {/* SECTION: Hero */}
      <header className="relative border-b-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-24 lg:px-8 lg:py-32">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-white/40">
            <Link
              href="/how-power-works"
              className="transition-colors hover:text-accent-light"
            >
              How Power Works
            </Link>
            <span>/</span>
            <span className="text-accent-light">Lobbying</span>
          </nav>

          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
            How Power Works &middot; Explainer
          </div>

          <h1 className="mt-6 font-headline text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl">
            How Lobbying Works
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70 lg:text-2xl">
            What lobbyists actually do, who pays them, how they move policy, and
            where the line between{" "}
            <span className="font-semibold text-white">
              advocacy and corruption
            </span>{" "}
            gets blurry.
          </p>

          <div className="mt-8 flex items-center gap-6 text-sm text-white/50">
            <span>Daonra Explainers</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>~12 min read</span>
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

      {/* SECTION: What Lobbying Is */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Scale className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Part I
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            What Lobbying Actually Is
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The legal definition is deliberately narrow. Under the Lobbying
            Disclosure Act of 1995, a lobbyist is anyone who spends at least 20
            percent of their working time on &ldquo;lobbying activities&rdquo;
            on behalf of a client and makes at least two lobbying contacts with
            covered officials in a six-month period. Make only one contact, or
            keep your time just under the threshold, and you are legally not a
            lobbyist at all. You don&rsquo;t have to register. You don&rsquo;t
            have to disclose. You can draft the bill, coach the senator, and
            attend the fundraiser &mdash; and none of it will appear in any
            public database.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            This is called the &ldquo;shadow lobbying&rdquo; problem, and it is
            not a bug. The industry has an obvious interest in keeping the
            definition tight. Former members of Congress and senior executive
            branch officials routinely move into consulting and &ldquo;strategic
            advisory&rdquo; roles at firms that do not register their work as
            lobbying &mdash; because the work is structured to stay just outside
            the legal definition while accomplishing the same thing.
          </p>

          <div className="mt-10 rounded-xl border-l-4 border-accent bg-surface px-6 py-6">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
              The Legal Definition vs. Reality
            </p>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-headline text-base font-black text-ink">
                  What the law calls lobbying
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink/70">
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    Registered LDA contact with a covered official
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    &ge;20% of professional time on lobbying activities
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    Quarterly disclosure of clients and issues
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    Reported spending above $3,000 per quarter
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-headline text-base font-black text-ink">
                  What influence actually looks like
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink/70">
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/30" />
                    &ldquo;Strategic consulting&rdquo; by former officials
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/30" />
                    Drafting bill language for friendly staffers
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/30" />
                    Coordinating outside spending with campaigns
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/30" />
                    Funding think tanks to produce favorable research
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/30" />
                    Hosting fundraisers for committee chairs
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="mt-12 font-headline text-2xl font-black text-ink">
            The Revolving Door Is Not a Side Effect. It&rsquo;s the Product.
          </h3>

          <p className="mt-4 text-lg leading-relaxed text-ink/70">
            The most valuable thing a lobbyist can sell is not information or
            persuasive writing. It is access &mdash; the ability to get a phone
            call returned, to get a meeting on the calendar, to be in the room.
            That access is almost always purchased with the same currency: prior
            government service. When a senator&rsquo;s chief of staff leaves to
            become a lobbyist for a pharmaceutical company, they bring with them
            a private cell number and fifteen years of relationships that no
            amount of campaign money can directly buy.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Center for Responsive Politics estimates that between 60 and 70
            percent of registered federal lobbyists are former government
            officials &mdash; former members of Congress, former senior
            staffers, former agency heads. The pipeline runs in both directions.
            Industry hires ex-government for access; government hires
            ex-industry for expertise that, by design, it no longer cultivates
            in-house. The result is a single permanent class of people who cycle
            between writing the rules and profiting from them, regardless of
            which party holds power.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Federal law imposes &ldquo;cooling off&rdquo; periods: former
            senators cannot lobby Congress for two years after leaving; former
            House members face a one-year ban; senior executive branch officials
            have a two-year ban on lobbying their former agency. These
            restrictions are real but narrow. They cover direct lobbying contact
            &mdash; not briefing colleagues who will make that contact, not
            preparing strategy, not attending fundraisers for the officials you
            used to work for. The cooling-off period is a formality. The
            revolving door keeps spinning.
          </p>

          <div className="mt-10 flex items-start gap-4 rounded-xl border border-border bg-surface p-6">
            <DollarSign className="mt-1 h-5 w-5 shrink-0 text-muted" />
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Typical salary premium
              </p>
              <p className="mt-2 text-base leading-relaxed text-ink/70">
                Studies of the revolving door consistently find that former
                congressional staffers who register as lobbyists earn a salary
                premium of roughly{" "}
                <span className="font-semibold text-ink">
                  $400,000 or more per year
                </span>{" "}
                over staffers who stay in government. The premium disappears
                almost entirely if their former boss leaves office &mdash;
                confirming that what they are selling is not expertise, but
                access.
              </p>
              <Link
                href="/revolving-door"
                className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-accent transition-colors hover:text-ink"
              >
                Track the revolving door <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: The Numbers */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Part II
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            The Numbers
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/60">
            These figures come from LDA disclosures filed with the Senate Office
            of Public Records and OpenSecrets.org. They represent only what the
            law requires to be disclosed.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border-2 border-ink bg-ink p-6 text-white">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-white/50">
                Total Federal Spending (2023)
              </p>
              <p className="mt-3 font-headline text-5xl font-black leading-none tracking-tight text-accent-light">
                $4.1B
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Reported lobbying expenditures under the LDA. Up from $3.5B in
                2020.
              </p>
            </div>
            <div className="rounded-xl border-2 border-border bg-paper p-6">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Registered Lobbyists
              </p>
              <p className="mt-3 font-headline text-5xl font-black leading-none tracking-tight text-ink">
                11,000+
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                Active registrants in 2023. Peak was 14,837 in 2007 before
                ethics rules pushed activity underground.
              </p>
            </div>
            <div className="rounded-xl border-2 border-border bg-paper p-6">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Former Gov&rsquo;t Officials
              </p>
              <p className="mt-3 font-headline text-5xl font-black leading-none tracking-tight text-ink">
                60&ndash;70%
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                Share of registered federal lobbyists with prior government
                employment.
              </p>
            </div>
            <div className="rounded-xl border-2 border-border bg-paper p-6">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Lobbying Clients (2023)
              </p>
              <p className="mt-3 font-headline text-5xl font-black leading-none tracking-tight text-ink">
                13,600+
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                Distinct organizations that hired at least one registered
                lobbyist in 2023.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/lobbying"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-ink bg-ink px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-paper hover:text-ink"
            >
              Browse All Lobbying Data <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/money-flow"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-border px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:border-ink"
            >
              Follow the Money <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y-4 border-ink bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
          <blockquote className="text-center">
            <p className="font-headline text-3xl font-black leading-tight tracking-tight text-ink lg:text-4xl">
              &ldquo;The U.S. Chamber of Commerce spent more on lobbying in 2023
              than the combined lobbying budgets of every union, every
              environmental group, and every consumer advocacy organization in
              the country.&rdquo;
            </p>
            <cite className="mt-6 block font-mono text-sm font-bold uppercase tracking-widest text-muted">
              OpenSecrets, Federal Lobbying Overview, 2023
            </cite>
          </blockquote>
        </div>
      </section>

      {/* SECTION: How It Works */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Network className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Part III
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            How It Actually Works
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Lobbying is not one thing. It is a layered system of influence that
            operates simultaneously through direct contact with officials,
            manufactured public opinion, campaign finance, and personnel
            placement. Each mechanism is legal. Each reinforces the others.
            Together they produce a structural advantage for organized money
            that no individual voter can match.
          </p>
        </div>

        <div className="border-t border-border">
          <div className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-mono text-xs font-black text-white">
                A
              </div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Direct Lobbying
              </p>
            </div>
            <h3 className="mt-4 font-headline text-2xl font-black text-ink">
              Meetings, Testimony, and Bill Language
            </h3>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              Direct lobbying is what most people picture: a lobbyist walking
              into a congressional office and making a case. The reality is more
              granular and more effective. The most consequential lobbying
              happens not in formal meetings but in the drafting process &mdash;
              at the staff level, where the actual text of legislation gets
              written.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">
              Congressional offices are perpetually understaffed. A Senate
              office managing a committee portfolio might have two or three
              policy staffers responsible for hundreds of bills across a dozen
              issue areas. When a senator needs to understand the technical
              specifics of pharmaceutical patent law, they turn to the people
              who have spent their careers on it. Those people are often
              registered lobbyists or former staffers now employed by trade
              associations. The staff ask for a &ldquo;section-by-section&rdquo;
              analysis. What comes back is frequently a template. What goes into
              the bill is often indistinguishable from what the industry wrote.
            </p>
            <div className="mt-8 rounded-xl border border-border bg-surface p-6">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Case Study
              </p>
              <p className="mt-3 font-headline text-lg font-black text-ink">
                The Medicare Modernization Act, 2003
              </p>
              <p className="mt-3 text-base leading-relaxed text-ink/70">
                The bill creating Medicare Part D was drafted with direct
                participation from the pharmaceutical and insurance industries.
                It contained an explicit prohibition on federal drug price
                negotiation &mdash; a provision worth hundreds of billions to
                the industry. The principal lobbyist on the bill was Billy
                Tauzin, then chairman of the House committee that wrote it.
                Within months of passage, Tauzin left Congress to become
                president of PhRMA at a reported salary of $2 million per year.
                The no-negotiation clause remained law for 19 years.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border">
          <div className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-mono text-xs font-black text-white">
                B
              </div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Indirect &amp; Grassroots Lobbying
              </p>
            </div>
            <h3 className="mt-4 font-headline text-2xl font-black text-ink">
              Manufacturing Public Pressure
            </h3>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              When direct lobbying isn&rsquo;t enough &mdash; or when a member
              needs political cover &mdash; the industry manufactures it. Trade
              associations run digital advertising in a senator&rsquo;s home
              state, generate constituent calls and emails, fund local business
              groups to hold press conferences, and commission polls showing
              &ldquo;small business owners support&rdquo; the legislation. The
              senator votes with the industry and cites constituent pressure.
              The constituent pressure was purchased.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">
              Critically, indirect lobbying does not have to be disclosed under
              the LDA. The U.S. Chamber disclosed approximately $67 million in
              direct lobbying in 2023, but its total political spending &mdash;
              including issue advertising and public affairs campaigns &mdash;
              is estimated to be several multiples of that. The public record
              shows the tip of the iceberg.
            </p>
            <div className="mt-8 flex items-start gap-4 rounded-xl border border-border bg-surface p-6">
              <Eye className="mt-1 h-5 w-5 shrink-0 text-muted" />
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                  What doesn&rsquo;t get disclosed
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink/70">
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/30" />
                    Paid advertising campaigns on legislation
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/30" />
                    Funding for third-party &ldquo;coalition&rdquo; groups
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/30" />
                    Payments to local organizations to generate constituent
                    contact
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/30" />
                    &ldquo;Strategic consulting&rdquo; by former officials below
                    the threshold
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border">
          <div className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-mono text-xs font-black text-white">
                C
              </div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Campaign Contributions as Access
              </p>
            </div>
            <h3 className="mt-4 font-headline text-2xl font-black text-ink">
              You Can&rsquo;t Buy a Vote. You Can Buy the Meeting.
            </h3>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              Campaign contributions are not bribery. The Supreme Court has said
              so repeatedly, most consequentially in Citizens United (2010) and
              McCutcheon (2014). What money purchases is not a vote &mdash; it
              is access and attention, which are worth more. Members of Congress
              spend an estimated 30 to 70 percent of their working hours on
              fundraising. The people who helped fill their campaign coffers get
              first claim on their time. A lobbyist who has raised $50,000 for a
              senator gets a returned call. A constituent without that
              relationship gets a form letter.
            </p>
            <div className="mt-8 rounded-xl border-l-4 border-ink bg-ink px-6 py-6 text-white">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-white/40">
                How Access Compounds
              </p>
              <div className="mt-5 space-y-4">
                {[
                  {
                    step: "01",
                    label: "Contribute to campaign",
                    detail: "PAC contribution to member on relevant committee",
                  },
                  {
                    step: "02",
                    label: "Attend fundraiser",
                    detail: "Informal access; no lobbying contact recorded",
                  },
                  {
                    step: "03",
                    label: "Request meeting",
                    detail: "Call returned within 24 hours; meeting scheduled",
                  },
                  {
                    step: "04",
                    label: "Leave-behind memo",
                    detail:
                      "Staff receives detailed policy brief; uses it in drafting",
                  },
                  {
                    step: "05",
                    label: "Mark-up participation",
                    detail: "Lobbyist consulted during committee process",
                  },
                  {
                    step: "06",
                    label: "Enrolled bill",
                    detail:
                      "Signed into law; press release credits bipartisan negotiation",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <span className="shrink-0 font-mono text-xs font-black text-white/30">
                      {item.step}
                    </span>
                    <div>
                      <span className="font-mono text-sm font-bold text-white">
                        {item.label}
                      </span>
                      <span className="ml-2 text-sm text-white/50">
                        &mdash; {item.detail}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border">
          <div className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-mono text-xs font-black text-white">
                D
              </div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                The Revolving Door as Mechanism
              </p>
            </div>
            <h3 className="mt-4 font-headline text-2xl font-black text-ink">
              The Personnel Is the Policy
            </h3>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              The revolving door is not merely a metaphor for access &mdash; it
              is an organizational mechanism that structurally embeds industry
              preference into government. When a regulator leaves the FDA to
              become a vice president at a pharmaceutical company, they carry
              knowledge of exactly which arguments will be persuasive, which
              officials are sympathetic, and where the informal pressure points
              are in the approval process.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">
              The reverse rotation is equally powerful. Studies of regulatory
              agency decisions consistently find that agencies whose senior
              staff came disproportionately from the industries they regulate
              issue rules that are more favorable to those industries, even
              controlling for ideology and partisanship. This is the deepest
              structural problem with American lobbying, and it is one that
              disclosure requirements cannot fix.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/revolving-door"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-ink bg-paper px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-white"
              >
                <Users className="h-4 w-4" />
                Explore the Revolving Door Database
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Industry by Industry */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Building2 className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Part IV
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Industry by Industry
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
            Five sectors. Five distinct playbooks. One identical outcome — the
            industry writes the rules it lives under.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Pharmaceuticals */}
            <div className="rounded-2xl border border-border bg-paper p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink">
                    <Pill className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                      Industry 01
                    </div>
                    <h3 className="font-headline text-xl font-black text-ink">
                      Pharmaceuticals
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-headline text-2xl font-black text-accent">
                    $452M
                  </div>
                  <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted">
                    Annual lobbying
                  </div>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-ink/70">
                The largest lobbying sector in America — by a wide margin.
                Pharma outspends oil and gas and defense{" "}
                <span className="font-semibold text-ink">combined</span>. The
                spending buys specific outcomes.
              </p>

              <ul className="mt-5 space-y-3">
                {[
                  {
                    target: "Medicare price negotiation ban",
                    result:
                      "Prohibited by law from 2003 to 2022. Twenty years of prohibition on the largest drug buyer in the country negotiating prices.",
                  },
                  {
                    target: "Patent evergreening",
                    result:
                      "Minor reformulations reset 20-year patent clocks. AbbVie filed 250+ patents on Humira to block biosimilars entering the market.",
                  },
                  {
                    target: "IRA drug pricing (2022)",
                    result:
                      "545 pharma lobbyists descended on the relevant committees — a 20:1 ratio. The bill passed but limited to 10 drugs in year one.",
                  },
                ].map((item) => (
                  <li
                    key={item.target}
                    className="border-l-2 border-accent pl-4"
                  >
                    <div className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                      {item.target}
                    </div>
                    <div className="mt-1 text-sm text-muted">{item.result}</div>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-xl bg-surface p-4">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Bottom line
                </div>
                <p className="mt-1 text-sm font-semibold text-ink">
                  Americans pay 2–3× more for drugs than any other developed
                  nation. Insulin costs $300 here, $10 in Canada. The difference
                  is not manufacturing cost. It is lobbying.
                </p>
              </div>
            </div>

            {/* Finance / Wall Street */}
            <div className="rounded-2xl border border-border bg-paper p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                      Industry 02
                    </div>
                    <h3 className="font-headline text-xl font-black text-ink">
                      Finance &amp; Wall Street
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-headline text-2xl font-black text-money-in">
                    $700M+
                  </div>
                  <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted">
                    Post-crisis lobbying
                  </div>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-ink/70">
                The financial sector spent over $700 million lobbying Congress
                in the five years after the 2008 crash — the crisis its own
                deregulation had triggered. It emerged with most of its power
                intact.
              </p>

              <ul className="mt-5 space-y-3">
                {[
                  {
                    target: "Dodd-Frank rollbacks",
                    result:
                      "The 2018 Economic Growth Act exempted banks under $250B from stress tests — signed two years before Signature Bank and SVB collapsed under identical conditions.",
                  },
                  {
                    target: "CFPB",
                    result:
                      "The Consumer Financial Protection Bureau has faced 12+ years of industry lawsuits and defunding attempts since its creation in 2010.",
                  },
                  {
                    target: "Crypto regulation",
                    result:
                      "The crypto industry spent $119M on the 2024 election cycle alone — the largest single-sector political investment relative to its size in that cycle.",
                  },
                ].map((item) => (
                  <li
                    key={item.target}
                    className="border-l-2 border-money-in pl-4"
                  >
                    <div className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                      {item.target}
                    </div>
                    <div className="mt-1 text-sm text-muted">{item.result}</div>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-xl bg-surface p-4">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Bottom line
                </div>
                <p className="mt-1 text-sm font-semibold text-ink">
                  Wall Street crashed the economy in 2008, received a $700B
                  bailout, then lobbied to undo the regulations written to
                  prevent a repeat. It worked.
                </p>
              </div>
            </div>

            {/* Defense Contractors */}
            <div className="rounded-2xl border border-border bg-paper p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                      Industry 03
                    </div>
                    <h3 className="font-headline text-xl font-black text-ink">
                      Defense Contractors
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-headline text-2xl font-black text-money-out">
                    1,800:1
                  </div>
                  <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted">
                    Lobbying ROI
                  </div>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-ink/70">
                From 2001 to 2021, the top five contractors spent $1.1B lobbying
                and received $2.02T in contracts. No hedge fund in history
                approaches a 1,800:1 return. Political investment is the most
                profitable investment available in America.
              </p>

              <ul className="mt-5 space-y-3">
                {[
                  {
                    target: "Budget guarantees",
                    result:
                      "The defense budget has grown every year since 2001 regardless of party control. In FY2024 it hit $886B — larger than the next 10 countries combined.",
                  },
                  {
                    target: "No-bid contracts",
                    result:
                      "In FY2022, 30% of Pentagon contracts were awarded noncompetitively. The GAO flags the same systemic failures year after year.",
                  },
                  {
                    target: "Geographic capture (F-35)",
                    result:
                      "The F-35 has suppliers in 45+ states — by design, not manufacturing efficiency. Cutting it means cutting jobs in 90% of congressional districts.",
                  },
                ].map((item) => (
                  <li
                    key={item.target}
                    className="border-l-2 border-money-out pl-4"
                  >
                    <div className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                      {item.target}
                    </div>
                    <div className="mt-1 text-sm text-muted">{item.result}</div>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-xl bg-surface p-4">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Bottom line
                </div>
                <p className="mt-1 text-sm font-semibold text-ink">
                  904 registered defense lobbyists in 2023 — more than one per
                  congressional district. Roughly $381,000 per day, every day,
                  including weekends.
                </p>
              </div>
            </div>

            {/* Big Tech */}
            <div className="rounded-2xl border border-border bg-paper p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink">
                    <Cpu className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                      Industry 04
                    </div>
                    <h3 className="font-headline text-xl font-black text-ink">
                      Big Tech
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-headline text-2xl font-black text-accent">
                    $277M
                  </div>
                  <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted">
                    To kill antitrust reform
                  </div>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-ink/70">
                A decade ago, Silicon Valley barely registered in Washington.
                Now Google, Meta, Amazon, Apple, and Microsoft are five of the
                largest lobbying operations in the country — and AI is making
                the arms race accelerate further.
              </p>

              <ul className="mt-5 space-y-3">
                {[
                  {
                    target: "Antitrust reform (2021–2023)",
                    result:
                      "Six bipartisan bills threatened to break up dominant platforms. Tech spent $277M to kill them — outspending reform supporters 6:1. None reached a floor vote.",
                  },
                  {
                    target: "Section 230",
                    result:
                      "The liability shield letting platforms host user content without legal responsibility. Every reform bill dies in committee. Big Tech lobbying on this issue exceeds $50M since 2020.",
                  },
                  {
                    target: "AI regulation",
                    result:
                      "Every major tech company added AI-focused lobbyists in 2023–2024 before rules were written. Incumbents who define the rules almost always win.",
                  },
                ].map((item) => (
                  <li
                    key={item.target}
                    className="border-l-2 border-accent pl-4"
                  >
                    <div className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                      {item.target}
                    </div>
                    <div className="mt-1 text-sm text-muted">{item.result}</div>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-xl bg-surface p-4">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Bottom line
                </div>
                <p className="mt-1 text-sm font-semibold text-ink">
                  TikTok spent a record $10.4M lobbying in 2024 fighting a ban.
                  Lobbying is cheaper than compliance. That calculus drives
                  everything.
                </p>
              </div>
            </div>

            {/* Oil & Gas — full width */}
            <div className="md:col-span-2 rounded-2xl border border-border bg-paper p-8">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink">
                    <Fuel className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                      Industry 05
                    </div>
                    <h3 className="font-headline text-xl font-black text-ink">
                      Oil &amp; Gas
                    </h3>
                  </div>
                </div>
                <div className="flex gap-8">
                  <div className="text-right">
                    <div className="font-headline text-2xl font-black text-money-out">
                      $20B+
                    </div>
                    <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted">
                      Annual subsidies
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-headline text-2xl font-black text-ink">
                      $41M
                    </div>
                    <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted">
                      One ballot measure
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-ink/70 md:max-w-xl">
                Oil and gas companies receive more than $20 billion per year in
                federal subsidies — tax breaks, royalty deferrals, and
                regulatory carveouts that have survived every administration for
                decades. The industry spends $100–150M annually to protect them.
                The return is roughly 150:1, every single year.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    target: "Subsidies",
                    result:
                      "$20B+ annually — intangible drilling deductions, percentage depletion allowances, and offshore royalty deferrals that have existed since 1916.",
                  },
                  {
                    target: "Pipeline approvals",
                    result:
                      "Keystone XL moved through multiple administrations based on lobbying pressure, not environmental review. Dakota Access DAPL permits cleared in months.",
                  },
                  {
                    target: "EPA rules",
                    result:
                      "The industry funds coordinated legal campaigns through state attorneys general to challenge EPA methane rules and clean air standards.",
                  },
                ].map((item) => (
                  <div
                    key={item.target}
                    className="rounded-xl border border-border bg-surface p-5"
                  >
                    <div className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                      {item.target}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.result}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-xl bg-ink p-5 text-white">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" />
                <p className="text-sm leading-relaxed">
                  <span className="font-bold">In 2018</span>, Colorado&rsquo;s
                  Prop 112 would have required fracking setbacks from homes and
                  schools. Industry spent $41M to defeat it — in a single state
                  ballot race. The same year, Washington&rsquo;s I-1631 carbon
                  fee was killed after $29.7M in industry spending. Both
                  contests were over before election day. Money of that scale
                  does not compete — it cancels.
                </p>
              </div>
            </div>
          </div>

          {/* Industry summary bar */}
          <div className="mt-12 grid grid-cols-2 gap-px bg-border sm:grid-cols-5">
            {[
              { label: "Pharma", value: "$452M/yr" },
              { label: "Finance", value: "$700M+ post-crash" },
              { label: "Defense", value: "1,800:1 ROI" },
              { label: "Big Tech", value: "$277M anti-antitrust" },
              { label: "Oil & Gas", value: "$20B/yr subsidies" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-surface px-4 py-5 text-center"
              >
                <div className="font-headline text-lg font-black text-ink">
                  {item.value}
                </div>
                <div className="mt-1 font-mono text-[9px] font-bold uppercase tracking-widest text-muted">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: Case Studies */}
      <section className="border-t border-border bg-ink text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <FileSearch className="h-6 w-6 text-accent-light" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
              Part V
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight lg:text-4xl">
            Three Case Studies
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white/60">
            Abstract arguments about influence have limits. These three cases
            are documented, sourced, and finished. What they wanted. What they
            spent. What they got.
          </p>

          <div className="mt-12 space-y-12">
            {/* Case Study 1: Medicare Modernization Act 2003 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 lg:p-10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Pill className="h-5 w-5 text-accent-light" />
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent-light">
                      Case Study 01 &middot; Pharmaceuticals
                    </span>
                  </div>
                  <h3 className="mt-2 font-headline text-2xl font-black lg:text-3xl">
                    The Medicare Prescription Drug Act
                  </h3>
                  <p className="mt-1 font-mono text-sm text-white/40">
                    2000–2003 &middot; Medicare Modernization Act
                  </p>
                </div>
                <div className="rounded-xl bg-white/10 px-5 py-3 text-center">
                  <div className="font-headline text-2xl font-black text-accent-light">
                    $8B/yr
                  </div>
                  <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/40">
                    Revenue protected
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                <div className="rounded-xl bg-white/5 p-5">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-accent-light" />
                    <div className="font-mono text-xs font-bold uppercase tracking-widest text-white/40">
                      What they wanted
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    A Medicare prescription drug benefit — but with one explicit
                    carve-out: a prohibition on Medicare negotiating drug
                    prices. The VA negotiates. Medicaid negotiates. The NHS
                    negotiates. Pharma wanted Medicare, the largest single drug
                    purchaser in the United States, legally banned from doing
                    the same.
                  </p>
                </div>

                <div className="rounded-xl bg-white/5 p-5">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-accent-light" />
                    <div className="font-mono text-xs font-bold uppercase tracking-widest text-white/40">
                      What they spent
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    PhRMA and the broader pharmaceutical sector deployed more
                    than $100M in lobbying during the 2001–2003 cycle. Their key
                    asset was not money — it was a person. Billy Tauzin (R-LA),
                    chair of House Energy and Commerce, shepherded the bill. He
                    retired in 2004 and became president of PhRMA at a salary
                    exceeding $2M/year.
                  </p>
                </div>

                <div className="rounded-xl bg-white/5 p-5">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-accent-light" />
                    <div className="font-mono text-xs font-bold uppercase tracking-widest text-white/40">
                      What they got
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    Section 1860D-11(i) of the MMA: &ldquo;The Secretary may not
                    interfere with the negotiations between drug manufacturers
                    and pharmacies and PDP sponsors.&rdquo; One sentence,
                    enacted as written. The prohibition held for 19 years. CBO
                    estimated the cost at $220B+ over 10 years. The IRA
                    partially reversed it in 2022 — after pharma filed 9+
                    lawsuits to block that too.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-white/30" />
                  <div className="font-mono text-xs font-bold uppercase tracking-widest text-white/30">
                    Timeline
                  </div>
                </div>
                <div className="space-y-0">
                  {[
                    {
                      year: "2000",
                      event:
                        "PhRMA begins drafting a Medicare drug benefit that excludes price negotiation.",
                    },
                    {
                      year: "2002",
                      event:
                        "Tauzin's committee takes jurisdiction. Industry lobbyists are embedded in the drafting process.",
                    },
                    {
                      year: "Nov 2003",
                      event:
                        "MMA passes at 3 a.m. after a 3-hour vote held open in violation of House rules. Republican leadership applies extraordinary pressure on holdouts. The no-negotiation clause is in the final text.",
                    },
                    {
                      year: "Jan 2004",
                      event:
                        "Tauzin announces he will not seek re-election. Negotiations with PhRMA are already underway.",
                    },
                    {
                      year: "Feb 2004",
                      event:
                        "Tauzin named president of PhRMA. Salary: $2.5M/year. The revolving door completes its rotation.",
                    },
                    {
                      year: "2006–2022",
                      event:
                        "Medicare Part D operates without price negotiation. Drug companies price without competitive pressure from the program's 65M enrollees.",
                    },
                    {
                      year: "2022",
                      event:
                        "The Inflation Reduction Act grants Medicare limited negotiation authority — 10 drugs in year one. Pharma files 9+ lawsuits to block it.",
                    },
                  ].map((item, i, arr) => (
                    <div key={item.year} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-2 w-2 shrink-0 rounded-full bg-accent-light mt-1.5" />
                        {i < arr.length - 1 && (
                          <div className="w-px flex-1 bg-white/10" />
                        )}
                      </div>
                      <div className="pb-4">
                        <div className="font-mono text-xs font-bold text-accent-light">
                          {item.year}
                        </div>
                        <p className="mt-0.5 text-sm text-white/60">
                          {item.event}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Case Study 2: Financial Deregulation & 2008 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 lg:p-10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-accent-light" />
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent-light">
                      Case Study 02 &middot; Finance
                    </span>
                  </div>
                  <h3 className="mt-2 font-headline text-2xl font-black lg:text-3xl">
                    The Deregulation Chain &amp; the 2008 Crash
                  </h3>
                  <p className="mt-1 font-mono text-sm text-white/40">
                    1994–2010 &middot; Gramm-Leach-Bliley, CFMA, Dodd-Frank
                  </p>
                </div>
                <div className="rounded-xl bg-white/10 px-5 py-3 text-center">
                  <div className="font-headline text-2xl font-black text-accent-light">
                    $700B
                  </div>
                  <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/40">
                    Taxpayer bailout
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                <div className="rounded-xl bg-white/5 p-5">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-accent-light" />
                    <div className="font-mono text-xs font-bold uppercase tracking-widest text-white/40">
                      What they wanted
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    The repeal of Glass-Steagall — the Depression-era law
                    separating commercial and investment banking. And then: zero
                    regulatory oversight of derivatives, the instruments that
                    would become the mechanism of the 2008 collapse. Two wins,
                    two campaigns, five years.
                  </p>
                </div>

                <div className="rounded-xl bg-white/5 p-5">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-accent-light" />
                    <div className="font-mono text-xs font-bold uppercase tracking-widest text-white/40">
                      What they spent
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    Citigroup alone spent $100M lobbying for Glass-Steagall
                    repeal in the 1990s. The financial sector invested $2.7B in
                    lobbying and $1.7B in campaign contributions between 1998
                    and 2008. The key architects — Gramm, Leach, Bliley — all
                    moved to financial sector roles after leaving office.
                  </p>
                </div>

                <div className="rounded-xl bg-white/5 p-5">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-accent-light" />
                    <div className="font-mono text-xs font-bold uppercase tracking-widest text-white/40">
                      What they got
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    Glass-Steagall repealed (Gramm-Leach-Bliley, 1999). OTC
                    derivatives explicitly exempted from CFTC oversight (CFMA,
                    2000). Banks grew to &ldquo;too big to fail.&rdquo; When the
                    mortgage-backed securities market collapsed in 2008,
                    taxpayers provided $700B in TARP funds and trillions more in
                    Fed liquidity support.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-white/30" />
                  <div className="font-mono text-xs font-bold uppercase tracking-widest text-white/30">
                    Timeline
                  </div>
                </div>
                <div className="space-y-0">
                  {[
                    {
                      year: "1998",
                      event:
                        "Citicorp and Travelers Group merge — technically illegal under Glass-Steagall. They do it anyway and lobby to change the law retroactively.",
                    },
                    {
                      year: "1999",
                      event:
                        "Gramm-Leach-Bliley passes. Glass-Steagall is repealed. Sandy Weill hangs a commemorative pen in his office.",
                    },
                    {
                      year: "2000",
                      event:
                        "The Commodity Futures Modernization Act passes. CFTC and SEC are explicitly blocked from overseeing credit default swaps and OTC derivatives.",
                    },
                    {
                      year: "2001–2007",
                      event:
                        "Mortgage-backed securities and CDOs proliferate. Rating agencies give AAA ratings. No regulator has jurisdiction over the instruments being created.",
                    },
                    {
                      year: "Sep 2008",
                      event:
                        "Lehman collapses. AIG requires a $180B rescue. Congress authorizes TARP: $700B in taxpayer funds.",
                    },
                    {
                      year: "2010",
                      event:
                        "Dodd-Frank passes. The financial sector immediately begins lobbying to gut it. By 2018, the key stress-test rollbacks are signed into law.",
                    },
                  ].map((item, i, arr) => (
                    <div key={item.year} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-2 w-2 shrink-0 rounded-full bg-accent-light mt-1.5" />
                        {i < arr.length - 1 && (
                          <div className="w-px flex-1 bg-white/10" />
                        )}
                      </div>
                      <div className="pb-4">
                        <div className="font-mono text-xs font-bold text-accent-light">
                          {item.year}
                        </div>
                        <p className="mt-0.5 text-sm text-white/60">
                          {item.event}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm leading-relaxed text-white/70">
                  <span className="font-bold text-white">The postscript:</span>{" "}
                  Phil Gramm, primary author of the derivatives deregulation
                  bill, became vice chairman of UBS&rsquo;s investment bank in
                  2002. UBS suffered $38B in losses tied to mortgage-backed
                  securities in 2008. Gramm later called the crisis a product of{" "}
                  <span className="italic">
                    &ldquo;mental recession.&rdquo;
                  </span>
                </p>
              </div>
            </div>

            {/* Case Study 3: JUUL / FDA Delay */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 lg:p-10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-accent-light" />
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent-light">
                      Case Study 03 &middot; Consumer Safety
                    </span>
                  </div>
                  <h3 className="mt-2 font-headline text-2xl font-black lg:text-3xl">
                    JUUL and the FDA Delay
                  </h3>
                  <p className="mt-1 font-mono text-sm text-white/40">
                    2019–2022 &middot; FDA Premarket Tobacco Application process
                  </p>
                </div>
                <div className="rounded-xl bg-white/10 px-5 py-3 text-center">
                  <div className="font-headline text-2xl font-black text-accent-light">
                    3 yrs
                  </div>
                  <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/40">
                    Regulatory delay bought
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                <div className="rounded-xl bg-white/5 p-5">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-accent-light" />
                    <div className="font-mono text-xs font-bold uppercase tracking-widest text-white/40">
                      What they wanted
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    Time. The FDA&rsquo;s premarket review required JUUL to
                    prove its products were &ldquo;appropriate for the
                    protection of public health&rdquo; — a standard it could not
                    meet given the youth addiction crisis its own marketing had
                    created. JUUL needed the review delayed, weakened, or
                    indefinitely stalled while remaining on shelves.
                  </p>
                </div>

                <div className="rounded-xl bg-white/5 p-5">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-accent-light" />
                    <div className="font-mono text-xs font-bold uppercase tracking-widest text-white/40">
                      What they spent
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    JUUL spent $47.5M on lobbying between 2018 and 2022 — an
                    extraordinary figure for a consumer product company with no
                    prior Washington presence. It hired 15+ lobbying firms,
                    cultivated relationships through community investment
                    grants, and ran a direct outreach program to high school
                    administrators framed as &ldquo;anti-vaping
                    education.&rdquo;
                  </p>
                </div>

                <div className="rounded-xl bg-white/5 p-5">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-accent-light" />
                    <div className="font-mono text-xs font-bold uppercase tracking-widest text-white/40">
                      What they got
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    Three years of delay. The FDA&rsquo;s denial order came in
                    June 2022 — and was immediately stayed by federal court at
                    JUUL&rsquo;s request. A Senate investigation found FDA staff
                    had been improperly pressured to slow the review. During
                    those three years, JUUL remained the best-selling
                    e-cigarette in the United States.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-white/30" />
                  <div className="font-mono text-xs font-bold uppercase tracking-widest text-white/30">
                    Timeline
                  </div>
                </div>
                <div className="space-y-0">
                  {[
                    {
                      year: "2015–2018",
                      event:
                        "JUUL's mango-flavored pods become dominant among teenagers. CDC declares a youth vaping epidemic. 3.6 million middle and high school students report current use.",
                    },
                    {
                      year: "2018",
                      event:
                        "FDA announces PMTA requirements for e-cigarettes. JUUL hires its first wave of Washington lobbyists. The original PMTA deadline is set.",
                    },
                    {
                      year: "2019",
                      event:
                        "Altria buys 35% of JUUL for $12.8B, bringing its full lobbying infrastructure. The PMTA deadline is extended. A planned flavor ban is scaled back after White House meetings.",
                    },
                    {
                      year: "2020",
                      event:
                        "PMTA deadline extended again. JUUL submits its application — 125,000 pages. Internal documents later show executives discussed youth usage rates as a market consideration.",
                    },
                    {
                      year: "Jun 2022",
                      event:
                        "FDA issues marketing denial order for JUUL. JUUL immediately sues. A federal court issues a stay. Products remain on shelves.",
                    },
                    {
                      year: "Jul 2022",
                      event:
                        'FDA unexpectedly reverses course, citing "scientific issues" requiring additional review. Senate investigators later find internal pressure was applied to slow the process.',
                    },
                  ].map((item, i, arr) => (
                    <div key={item.year} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-2 w-2 shrink-0 rounded-full bg-accent-light mt-1.5" />
                        {i < arr.length - 1 && (
                          <div className="w-px flex-1 bg-white/10" />
                        )}
                      </div>
                      <div className="pb-4">
                        <div className="font-mono text-xs font-bold text-accent-light">
                          {item.year}
                        </div>
                        <p className="mt-0.5 text-sm text-white/60">
                          {item.event}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm leading-relaxed text-white/70">
                  <span className="font-bold text-white">
                    The JUUL template:
                  </span>{" "}
                  You do not need to win the regulatory fight. You just need to
                  delay it long enough to generate revenue. Every year the FDA
                  review was stalled, JUUL sold roughly $1.5B in product. The
                  $47.5M in lobbying bought three years and approximately $4.5B
                  in sales. Regulatory delay is not a system failure. For JUUL,
                  it was the product.
                </p>
              </div>
            </div>
          </div>

          {/* Cross-links */}
          <div className="mt-14 border-t border-white/10 pt-10">
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-white/30">
              Dig deeper
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                {
                  href: "/lobbying",
                  label: "Lobbying data",
                  description:
                    "Search live Senate LDA disclosures — who filed, who paid, what issues.",
                },
                {
                  href: "/revolving-door",
                  label: "Revolving door",
                  description:
                    "Track government officials who moved to industry — and back.",
                },
                {
                  href: "/dark-money",
                  label: "Dark money",
                  description:
                    "501(c)(4) spending that does not appear in lobbying disclosures.",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-white/20 hover:bg-white/10"
                >
                  <div>
                    <div className="font-headline text-base font-bold text-white">
                      {item.label}
                    </div>
                    <p className="mt-1 text-sm text-white/50">
                      {item.description}
                    </p>
                  </div>
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-white/60" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: What Reform Looks Like */}
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Scale className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Part VI
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            What Reform Looks Like
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The lobbying reform story is not one of failure alone. There have
            been genuine wins — modest, contested, and frequently circumvented,
            but real. The problem is not that reformers have produced nothing.
            The problem is that every law with teeth has been defanged by the
            industry it was meant to constrain, often before the ink was dry.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            The Lobbying Disclosure Act of 1995, updated by the Honest
            Leadership and Open Government Act of 2007, forms the backbone of
            federal lobbying regulation. The HLOGA tightened cooling-off periods
            for revolving door officials — former Senators must wait two years
            before lobbying their former colleagues, House members one year —
            and banned lobbyists from buying meals or gifts for members of
            Congress. It increased disclosure frequency from semi-annual to
            quarterly and required lobbyists to disclose campaign bundling
            activities. These were meaningful steps. They also created an
            immediate workaround: shadow lobbying.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Shadow lobbying is the practice of doing everything a lobbyist does
            — advising clients on strategy, drafting legislative language,
            building relationships with congressional staff — while carefully
            staying below the threshold that triggers registration. Under the
            LDA, a person must register only if they spend 20% or more of their
            time lobbying a single client. That 20% rule is not an oversight. It
            is an invitation. Entire consulting firms operate as unregistered
            influence shops. Former officials advise on how to approach their
            former colleagues without ever picking up the phone themselves. The
            OpenSecrets estimate is that disclosed lobbying represents roughly
            half of the actual influence industry. The other half is invisible
            by design.
          </p>

          {/* Reform timeline */}
          <div className="my-12 space-y-4 border-l-4 border-accent pl-6">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                2007 &mdash; HLOGA
              </div>
              <div className="mt-1 text-base font-semibold text-ink">
                Cooling-off periods, gift ban, quarterly disclosure, bundling
                rules
              </div>
              <div className="mt-0.5 text-sm text-muted">
                Immediate response: shadow lobbying industry expands to avoid
                registration thresholds
              </div>
            </div>
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                2012 &mdash; STOCK Act
              </div>
              <div className="mt-1 text-base font-semibold text-ink">
                Banned congressional insider trading; required online disclosure
                of trades
              </div>
              <div className="mt-0.5 text-sm text-muted">
                Eight months later, Congress quietly removed the online
                disclosure requirement for most staff
              </div>
            </div>
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                State level &mdash; Maine &amp; Arizona
              </div>
              <div className="mt-1 text-base font-semibold text-ink">
                Clean Elections public financing &mdash; candidates qualify by
                raising small contributions
              </div>
              <div className="mt-0.5 text-sm text-muted">
                Arizona program weakened by Supreme Court (McComish, 2011);
                Maine program survives and shows reduced pay-to-play
              </div>
            </div>
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                State level &mdash; Montana
              </div>
              <div className="mt-1 text-base font-semibold text-ink">
                Among strongest state anti-corruption laws; strict lobbying
                disclosure, real-time online filing
              </div>
              <div className="mt-0.5 text-sm text-muted">
                Citizens United still overrides corporate spending limits at
                federal level
              </div>
            </div>
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                Current &mdash; ETHICS Act &amp; Lobbying Transparency Bills
              </div>
              <div className="mt-1 text-base font-semibold text-ink">
                Expand LDA coverage, close the 20% loophole, require shadow
                lobbyist registration
              </div>
              <div className="mt-0.5 text-sm text-muted">
                Introduced in multiple sessions; stalled in committee or blocked
                by floor scheduling
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            The STOCK Act of 2012 is the most instructive case study in reform
            half-measures. Passed in the wake of a <em>60 Minutes</em>{" "}
            investigation into congressional insider trading, it banned members
            and staff from trading on non-public legislative information and
            required disclosure of trades within 45 days. The bill passed 417-2
            in the House — a near-unanimous mandate. Eight months later, in a
            voice vote on a Friday afternoon with no press present, Congress
            quietly amended the law to remove the online disclosure requirement
            for thousands of congressional staffers. The principle survived. The
            enforcement mechanism did not.
          </p>

          {/* Stat callout grid */}
          <div className="my-12 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-3">
            <div>
              <div className="font-headline text-4xl font-black text-accent">
                20%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                LDA Registration Threshold
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-ink">
                2 yrs
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Senate Cooling-Off Period
              </div>
            </div>
            <div>
              <div className="font-headline text-4xl font-black text-money-out">
                ~50%
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Estimated Lobbying Undisclosed
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-ink/70">
            What reformers are currently pushing goes further than any law
            passed to date. The ETHICS Act and companion lobbying transparency
            bills circulating in Congress would close the 20% loophole by
            requiring registration based on activity type rather than time
            spent, mandate real-time disclosure of meetings between lobbyists
            and congressional offices, and extend cooling-off periods to five
            years for senior executive branch officials. Issue One&apos;s
            ReFormers Caucus &mdash; a group of more than 200 former members of
            Congress &mdash; has endorsed the framework. None of it has passed.
            The obstacle is not persuasion. It is interest. The members of
            Congress who would need to vote for stricter lobbying rules are the
            same members whose campaigns are funded by the industries that
            employ lobbyists. The answer, as with everything else in Daonra,
            follows the money.
          </p>
        </div>
      </section>

      {/* SECTION: What You Can Do */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-accent" />
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Part VII
            </div>
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            What You Can Do
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            The system is not a black box. Every disclosed lobbying contract,
            every campaign contribution, every revolving door hire is a public
            record &mdash; if you know where to look. Most people never look,
            which is part of how the system sustains itself. Transparency only
            works if someone is watching. Here is how to start.
          </p>

          {/* Action cards */}
          <div className="my-10 space-y-4">
            <div className="rounded-xl border border-border bg-paper p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Search className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-headline text-lg font-black text-ink">
                    Look up who&apos;s lobbying your representatives
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    Daonra&apos;s lobbying tracker lets you search by
                    representative, industry, or issue area to see every
                    registered lobbying contract touching your congressional
                    district. You can see which firms are active, how much is
                    being spent, and which bills are being targeted. The data
                    updates quarterly from LDA filings.
                  </p>
                  <Link
                    href="/lobbying"
                    className="mt-3 inline-flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-widest text-accent transition-opacity hover:opacity-70"
                  >
                    Search lobbying records
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-paper p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <DollarSign className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-headline text-lg font-black text-ink">
                    Follow the money to your reps
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    The FEC requires disclosure of all contributions above $200
                    to federal candidates. Daonra aggregates that data by
                    industry sector, so you can see whether your
                    representative&apos;s top funders are pharmaceutical
                    companies, defense contractors, or financial firms &mdash;
                    and cross-reference against their committee assignments and
                    voting record. The connection between donor and vote is not
                    always causal. But it is always worth knowing.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-4">
                    <Link
                      href="/money-flow"
                      className="inline-flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-widest text-accent transition-opacity hover:opacity-70"
                    >
                      Daonra money flow
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                    <a
                      href="https://www.fec.gov/data/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-widest text-muted transition-opacity hover:opacity-70"
                    >
                      FEC data portal
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-paper p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <ArrowLeftRight className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-headline text-lg font-black text-ink">
                    Identify revolving door officials in your district
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    Daonra&apos;s revolving door tracker maps the careers of
                    former congressional staff, agency officials, and members of
                    Congress who moved into lobbying or industry roles. You can
                    filter by district, agency, or sector. When a former EPA
                    official becomes a fossil fuel lobbyist, or a departing
                    committee staff director joins the trade association they
                    used to regulate, it is a matter of public record. Most
                    people never see it.
                  </p>
                  <Link
                    href="/revolving-door"
                    className="mt-3 inline-flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-widest text-accent transition-opacity hover:opacity-70"
                  >
                    Search revolving door records
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-paper p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Mail className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-headline text-lg font-black text-ink">
                    Contact your reps &mdash; specifically about lobbying reform
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    Generic constituent contact is noise. Specific, informed
                    contact is not. If you have looked up who is lobbying your
                    representative and who is funding them, you have something
                    concrete to say: cite the LDA filing, name the firm, ask
                    your rep to co-sponsor the ETHICS Act or the lobbying
                    transparency bill currently in committee. Staffers track
                    issue-specific contacts. A constituent who knows the
                    legislation by name is harder to dismiss than a form email.
                  </p>
                  <Link
                    href="/civics/contact"
                    className="mt-3 inline-flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-widest text-accent transition-opacity hover:opacity-70"
                  >
                    Find your representatives
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Organizations working on this */}
          <div className="mt-12">
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-muted">
              Organizations Working on This
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/60">
              Reform is not a single-issue movement, and these organizations
              approach it from different angles. None of them are substitutes
              for political pressure &mdash; they are infrastructure for it.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-4 rounded-lg border border-border bg-paper px-5 py-4">
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                <div>
                  <span className="font-semibold text-ink">Represent.Us</span>
                  <span className="mx-2 text-muted">&mdash;</span>
                  <span className="text-sm text-ink/60">
                    Cross-partisan anti-corruption coalition. Focuses on
                    state-level ballot initiatives and the American
                    Anti-Corruption Act framework. Strongest in grassroots
                    organizing.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg border border-border bg-paper px-5 py-4">
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                <div>
                  <span className="font-semibold text-ink">Issue One</span>
                  <span className="mx-2 text-muted">&mdash;</span>
                  <span className="text-sm text-ink/60">
                    Runs the ReFormers Caucus &mdash; over 200 former members of
                    Congress, cabinet officials, and governors. Focuses on
                    federal lobbying disclosure reform and small-donor matching.
                    Unusually effective at working across party lines.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg border border-border bg-paper px-5 py-4">
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                <div>
                  <span className="font-semibold text-ink">Democracy 21</span>
                  <span className="mx-2 text-muted">&mdash;</span>
                  <span className="text-sm text-ink/60">
                    Campaign finance specialists. Tracks FEC enforcement,
                    litigates dark money cases, and publishes model lobbying and
                    campaign finance legislation for state reformers to adapt.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Closing */}
          <div className="mt-14 rounded-xl border-l-4 border-accent bg-paper px-6 py-8">
            <p className="text-lg font-semibold leading-relaxed text-ink">
              The lobbying industry spent $5.08 billion last year. It employs
              more registered lobbyists than there are members of Congress
              &mdash; and that count excludes the shadow lobbyists who never
              register. The asymmetry is real and it is steep.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink/70">
              But every disclosure law that passed did so because organized
              citizens made the political cost of inaction higher than the cost
              of reform. Every state-level clean election program exists because
              voters put it on the ballot themselves. The system is not
              impervious to pressure. It is designed to resist it &mdash; and it
              has been moved before, and can be moved again. What it cannot
              survive is an informed, persistent public that refuses to look
              away.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <Link
              href="/money-flow"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-ink/90"
            >
              Explore Money Flows
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/how-power-works"
              className="inline-flex items-center gap-2 rounded-full border-2 border-border px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:border-ink hover:bg-ink/5"
            >
              <ArrowLeft className="h-4 w-4" />
              All Topics
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom nav */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
          <div className="grid grid-cols-2 gap-6">
            <Link
              href="/how-power-works"
              className="group flex items-center gap-4 rounded-xl border border-border bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <ArrowLeft className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-ink" />
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Back
                </div>
                <div className="mt-1 font-headline text-lg font-bold text-ink">
                  How Power Works
                </div>
              </div>
            </Link>
            <Link
              href="/how-power-works/federal-budget"
              className="group flex items-center justify-end gap-4 rounded-xl border border-border bg-paper p-6 text-right transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-lg"
            >
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                  Next Topic
                </div>
                <div className="mt-1 font-headline text-lg font-bold text-ink">
                  The Federal Budget
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
