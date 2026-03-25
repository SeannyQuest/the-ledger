import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Users,
  Shield,
  Heart,
  Building2,
  BookOpen,
  ExternalLink,
  Clock,
  BarChart3,
  FileText,
  Landmark,
  RefreshCw,
  Lock,
  Zap,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "The Federal Budget Explained | Daonra",
  description:
    "Where your $6.1 trillion in federal taxes actually goes: mandatory vs. discretionary spending, the debt ceiling, and who really decides.",
};

export default function FederalBudgetPage() {
  return (
    <article className="bg-paper">
      {/* ── Hero ── */}
      <div className="bg-ink text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
          <nav className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/50">
            <Link href="/how-power-works" className="hover:text-white/80">
              How Power Works
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/80">The Federal Budget</span>
          </nav>

          <h1 className="mt-6 font-headline text-5xl font-black tracking-tight lg:text-6xl">
            The Federal Budget
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70">
            The U.S. government spends roughly{" "}
            <span className="font-bold text-white">$6.1 trillion</span> per year
            , more than the GDP of every country except the U.S. itself. Almost
            two-thirds of it is on autopilot. Here is how it works.
          </p>

          {/* Stat row */}
          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-10 sm:grid-cols-4">
            {[
              { label: "Total FY2024 Spending", value: "$6.1T" },
              { label: "Mandatory Spending", value: "~67%" },
              { label: "Discretionary Spending", value: "~28%" },
              { label: "Interest on Debt", value: "$870B" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-headline text-3xl font-black text-accent-light">
                  {s.value}
                </div>
                <div className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-white/50">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
        {/* Part I: Two Buckets */}
        <section>
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part I
          </div>
          <h2 className="mt-3 font-headline text-4xl font-black tracking-tight text-ink">
            Two Buckets: Mandatory and Discretionary
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/70">
            The federal budget is divided into two fundamentally different
            categories. Understanding this split is the single most important
            thing you can know about government spending, because most of the
            political battles you see on the news are only about one of them.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Mandatory */}
            <div className="rounded-xl border-2 border-accent/20 bg-accent/5 p-6">
              <div className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-accent" />
                <h3 className="font-headline text-xl font-bold text-ink">
                  Mandatory Spending
                </h3>
              </div>
              <div className="mt-2 font-headline text-4xl font-black text-accent">
                ~$4.1 trillion
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                Spending required by existing law. Congress does not vote on
                this every year. It flows automatically based on who qualifies
                under the law. To change it, Congress must change the underlying
                statute, a much higher political bar.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-ink/80">
                {[
                  { program: "Social Security", pct: "~21% of total budget" },
                  {
                    program: "Medicare",
                    pct: "~14% of total budget",
                  },
                  {
                    program: "Medicaid + CHIP",
                    pct: "~10% of total budget",
                  },
                  {
                    program: "Interest on the national debt",
                    pct: "~14% of total budget",
                  },
                  {
                    program: "Other entitlements (SNAP, veterans, etc.)",
                    pct: "~8% of total budget",
                  },
                ].map((item) => (
                  <li key={item.program} className="flex items-start gap-2">
                    <span className="mt-0.5 font-bold text-accent">›</span>
                    <span>
                      <strong className="text-ink">{item.program}</strong>:{" "}
                      {item.pct}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Discretionary */}
            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-ink/40" />
                <h3 className="font-headline text-xl font-bold text-ink">
                  Discretionary Spending
                </h3>
              </div>
              <div className="mt-2 font-headline text-4xl font-black text-ink">
                ~$1.7 trillion
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                Spending that Congress appropriates anew every single year
                through 12 separate appropriations bills. This is what annual
                budget battles are actually about. If Congress fails to pass
                appropriations on time, the government shuts down.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-ink/80">
                {[
                  { program: "Defense / Military", pct: "~$860B (~14%)" },
                  {
                    program: "Non-defense discretionary",
                    pct: "~$840B (~14%)",
                  },
                  {
                    program: "Education, housing, transportation, research",
                    pct: "Included in non-defense",
                  },
                  {
                    program: "Veterans' health (VA)",
                    pct: "Included in non-defense",
                  },
                ].map((item) => (
                  <li key={item.program} className="flex items-start gap-2">
                    <span className="mt-0.5 font-bold text-ink/40">›</span>
                    <span>
                      <strong className="text-ink">{item.program}</strong>:{" "}
                      {item.pct}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-xl border-l-4 border-accent bg-accent/5 p-5">
            <p className="text-sm font-medium leading-relaxed text-ink/80">
              <strong className="text-ink">The key insight:</strong> When
              politicians fight over the budget, they are typically fighting
              over the 28% that is discretionary. The other 67%+ is legally
              automatic. Cutting Social Security or Medicare requires passing a
              new law, not just losing a budget vote.
            </p>
          </div>
        </section>

        {/* Part II: Where It Goes */}
        <section className="mt-20">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part II
          </div>
          <h2 className="mt-3 font-headline text-4xl font-black tracking-tight text-ink">
            Where the Money Actually Goes
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/70">
            Here is a full breakdown of FY2024 federal spending, translated from
            budget lines into plain English.
          </p>

          <div className="mt-10 space-y-4">
            {[
              {
                icon: Users,
                category: "Social Security",
                amount: "$1.47T",
                pct: "24%",
                color: "text-blue-600",
                bg: "bg-blue-50",
                note: "Monthly payments to 67 million retired and disabled Americans and their dependents. Funded by payroll taxes, not general revenue, though the trust fund is drawing down.",
              },
              {
                icon: Heart,
                category: "Medicare",
                amount: "$869B",
                pct: "14%",
                color: "text-rose-600",
                bg: "bg-rose-50",
                note: "Health coverage for 67 million people over 65 or with qualifying disabilities. Split into Part A (hospital), Part B (outpatient), Part C (Medicare Advantage), and Part D (drugs).",
              },
              {
                icon: Heart,
                category: "Medicaid + CHIP",
                amount: "$616B",
                pct: "10%",
                color: "text-pink-600",
                bg: "bg-pink-50",
                note: "Health coverage for 90 million low-income adults, children, pregnant women, elderly, and people with disabilities. Joint federal-state program. Feds pay 50-75% depending on the state.",
              },
              {
                icon: TrendingUp,
                category: "Interest on the National Debt",
                amount: "$870B",
                pct: "14%",
                color: "text-orange-600",
                bg: "bg-orange-50",
                note: "Interest payments on the $34+ trillion national debt. This is now the fastest-growing line item in the federal budget. It exceeded defense spending for the first time in FY2024.",
              },
              {
                icon: Shield,
                category: "Defense / Military",
                amount: "$860B",
                pct: "14%",
                color: "text-slate-600",
                bg: "bg-slate-50",
                note: "The Department of Defense base budget, nuclear weapons (DOE), and military construction. Does not include Veterans Affairs, intelligence agencies, or military retirement (counted elsewhere).",
              },
              {
                icon: Building2,
                category: "Non-Defense Discretionary",
                amount: "$840B",
                pct: "14%",
                color: "text-green-600",
                bg: "bg-green-50",
                note: "Everything else Congress funds annually: education, housing, transportation, NASA, EPA, FDA, NIH research, foreign aid, federal law enforcement, and more. This is the entire domestic agenda.",
              },
              {
                icon: Users,
                category: "Other Mandatory (SNAP, TANF, Veterans, Etc.)",
                amount: "$560B",
                pct: "9%",
                color: "text-purple-600",
                bg: "bg-purple-50",
                note: "Supplemental Nutrition Assistance Program (SNAP/food stamps), TANF (welfare), veterans' compensation, federal employee retirement, Earned Income Tax Credit, and other mandatory programs.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.category}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className={`rounded-lg p-2 ${item.bg}`}>
                      <Icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <h3 className="font-headline text-lg font-bold text-ink">
                          {item.category}
                        </h3>
                        <span
                          className={`font-mono text-sm font-bold ${item.color}`}
                        >
                          {item.amount}
                        </span>
                        <span className="font-mono text-xs text-muted">
                          {item.pct} of total
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ink/70">
                        {item.note}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Part III: How the Budget Is Made */}
        <section className="mt-20">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part III
          </div>
          <h2 className="mt-3 font-headline text-4xl font-black tracking-tight text-ink">
            How the Budget Is Made
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/70">
            The budget process is supposed to follow a defined annual calendar.
            In practice, it almost never does. Here is both the theory and the
            reality.
          </p>

          {/* The Official Process */}
          <h3 className="mt-10 font-headline text-2xl font-bold text-ink">
            A. The Official Process (Almost Never Happens On Time)
          </h3>

          <ol className="mt-6 space-y-6">
            {[
              {
                step: "1",
                title: "President Submits a Budget Request",
                timing: "First Monday in February",
                detail:
                  "The Office of Management and Budget (OMB) compiles a detailed budget proposal on behalf of the President. It is a political statement as much as a financial one: it lists priorities, not law. Congress is not required to follow it. The President's budget often arrives late.",
              },
              {
                step: "2",
                title: "Congressional Budget Committees Write a Resolution",
                timing: "April 15 deadline (rarely met)",
                detail:
                  "The House and Senate Budget Committees each draft a 'budget resolution' setting overall spending caps and targets. This is not a law, and the President cannot veto it. It is a framework. When the two chambers agree, it passes as a concurrent resolution.",
              },
              {
                step: "3",
                title: "12 Appropriations Subcommittees Go to Work",
                timing: "Spring through summer",
                detail:
                  "The Appropriations Committees in each chamber divide discretionary spending into 12 bills covering different departments (Defense, Labor/HHS, Transportation, etc.). Subcommittees hold hearings, mark up bills, and pass them to the full committees.",
              },
              {
                step: "4",
                title: "Full Chambers Vote on Appropriations Bills",
                timing: "Should be done by October 1",
                detail:
                  "Each of the 12 bills must pass both the House and Senate, then be reconciled in a conference committee when the versions differ. The President must sign each one. October 1 is the start of the federal fiscal year.",
              },
              {
                step: "5",
                title: "President Signs (or Vetoes)",
                timing: "Before or just after October 1",
                detail:
                  "If all 12 bills are signed, the government is funded. If not, which is the norm, Congress passes a Continuing Resolution (CR) to keep the government open at prior funding levels while negotiations continue.",
              },
            ].map((s) => (
              <li key={s.step} className="flex items-start gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-black text-white">
                  {s.step}
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h4 className="font-headline text-base font-bold text-ink">
                      {s.title}
                    </h4>
                    <span className="font-mono text-xs text-muted">
                      {s.timing}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                    {s.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* The Reality */}
          <h3 className="mt-14 font-headline text-2xl font-bold text-ink">
            B. The Reality: CRs, Omnibuses, and Shutdowns
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-ink/70">
            Congress has passed all 12 appropriations bills on time exactly four
            times since 1977. That is not a typo. The normal operating mode of
            the federal government is some combination of:
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: RefreshCw,
                title: "Continuing Resolution (CR)",
                desc: "A stopgap measure that keeps the government funded at prior-year levels while Congress fails to pass the real budget. CRs can last a week or a full year. They freeze programs in place, with no new initiatives, no new hiring, no contract adjustments.",
              },
              {
                icon: FileText,
                title: "Omnibus Bill",
                desc: "When Congress bundles all 12 unfinished appropriations bills into one massive package (sometimes 4,000+ pages long) and passes it hours before a deadline. Few members have read it. Riders (unrelated provisions) get tucked in. This has become the standard operating procedure.",
              },
              {
                icon: AlertTriangle,
                title: "Government Shutdown",
                desc: "When funding lapses entirely. 'Non-essential' federal workers are furloughed without pay. National parks close. Benefit payments pause. Contractors stop work. The economy loses roughly $2B per week. Shutdowns have happened 14 times since 1981.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <Icon className="h-5 w-5 text-accent" />
                  <h4 className="mt-3 font-headline text-base font-bold text-ink">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-ink/70">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Reconciliation */}
          <h3 className="mt-14 font-headline text-2xl font-bold text-ink">
            C. Reconciliation: The Filibuster Workaround
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-ink/70">
            The most powerful budget tool Congress has is one most people have
            never heard of: budget reconciliation.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">
            Normal legislation in the Senate requires 60 votes to overcome a
            filibuster. Budget reconciliation bills can pass with a simple
            majority of 51 votes. The catch: reconciliation can only be used
            once per year, only for provisions that directly change spending,
            revenues, or the debt limit, and cannot add to the long-term deficit
            (the Byrd Rule).
          </p>
          <div className="mt-5 rounded-xl border border-border bg-surface p-5">
            <h4 className="font-headline text-base font-bold text-ink">
              Major laws passed via reconciliation:
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-ink/80">
              {[
                "The 2001 Bush tax cuts (EGTRRA)",
                "The 2003 Bush dividend and capital gains tax cuts",
                "The Affordable Care Act fixes (HCERA, 2010)",
                "The 2017 Tax Cuts and Jobs Act",
                "The 2021 American Rescue Plan ($1.9T COVID relief)",
                "The 2022 Inflation Reduction Act",
              ].map((law) => (
                <li key={law} className="flex items-start gap-2">
                  <span className="mt-0.5 font-bold text-accent">›</span>
                  <span>{law}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Part IV: The Debt Ceiling */}
        <section className="mt-20">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part IV
          </div>
          <h2 className="mt-3 font-headline text-4xl font-black tracking-tight text-ink">
            The Debt Ceiling
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/70">
            The debt ceiling is one of the most misunderstood concepts in
            American politics. Here is what it actually is and why it matters.
          </p>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/80">
            <div>
              <h3 className="font-headline text-xl font-bold text-ink">
                What It Is
              </h3>
              <p className="mt-3">
                The debt ceiling is a legal limit on how much the federal
                government can borrow to pay bills it has already incurred.
                Raising it does not authorize new spending. It allows the
                Treasury to pay obligations Congress already voted for. Refusing
                to raise the debt ceiling is like buying a car, having the bill
                sent home, and then refusing to pay the credit card statement.
              </p>
            </div>

            <div>
              <h3 className="font-headline text-xl font-bold text-ink">
                The Current Number
              </h3>
              <p className="mt-3">
                The U.S. national debt exceeded $34 trillion in 2024. The debt
                ceiling has been raised, revised, or suspended 78 times since
                1960. It has been raised under every President, Republican and
                Democrat alike.
              </p>
            </div>

            <div>
              <h3 className="font-headline text-xl font-bold text-ink">
                Why It Is Used as a Bargaining Chip
              </h3>
              <p className="mt-3">
                Defaulting on U.S. debt would be catastrophic, triggering a
                global financial crisis, spiking interest rates, and wiping out
                the economic foundation of the dollar as the world's reserve
                currency. This is precisely why threatening not to raise it has
                political leverage. The minority party uses the threat of
                default to extract spending cuts or policy concessions from the
                majority.
              </p>
            </div>

            <div>
              <h3 className="font-headline text-xl font-bold text-ink">
                Extraordinary Measures
              </h3>
              <p className="mt-3">
                When the debt ceiling is hit, the Treasury Secretary can take
                "extraordinary measures," accounting maneuvers that delay
                default for weeks or months. These include suspending
                reinvestment in federal employee pension funds, halting new
                state and local government series securities, and similar
                financial engineering. They buy time; they do not solve the
                problem.
              </p>
            </div>
          </div>

          <blockquote className="mt-8 border-l-4 border-accent pl-5">
            <p className="text-base leading-relaxed text-ink/80 italic">
              &ldquo;The full faith and credit of the United States is not a
              bargaining chip.&rdquo;
            </p>
            <cite className="mt-2 block font-mono text-xs text-muted not-italic">
              - Treasury Secretary Janet Yellen, 2023
            </cite>
          </blockquote>
        </section>

        {/* Part V: Deficit vs Debt */}
        <section className="mt-20">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part V
          </div>
          <h2 className="mt-3 font-headline text-4xl font-black tracking-tight text-ink">
            Deficit vs. Debt: The Difference That Matters
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/70">
            These two terms are routinely confused, including by politicians.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                The Deficit
              </div>
              <div className="mt-2 font-headline text-3xl font-bold text-ink">
                ~$1.7 trillion (FY2023)
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                The <strong className="text-ink">annual shortfall</strong>: how
                much more the government spent than it collected in taxes in a
                single year. The deficit can go up or down year to year based on
                economic conditions, tax policy, and spending decisions.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                Think of it as your household spending $5,000 more than you
                earned this year.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                The Debt
              </div>
              <div className="mt-2 font-headline text-3xl font-bold text-ink">
                $34+ trillion
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                The <strong className="text-ink">accumulated total</strong> of
                all past deficits minus surpluses. Every year the government
                runs a deficit, it adds to the debt by borrowing (issuing
                Treasury bonds). The national debt has grown in almost every
                year since World War II.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                Think of it as your household's total outstanding credit card
                balance built up over decades.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-surface p-5">
            <h3 className="font-headline text-base font-bold text-ink">
              Who Holds the National Debt?
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-ink/80">
              {[
                {
                  holder: "Federal Reserve and other U.S. government accounts",
                  pct: "~40%",
                  note: "The government owes money to itself",
                },
                {
                  holder: "Foreign governments and investors",
                  pct: "~24%",
                  note: "Japan ($1.1T) and China ($860B) are the largest",
                },
                {
                  holder: "U.S. individual and institutional investors",
                  pct: "~36%",
                  note: "Pension funds, mutual funds, banks, and individuals holding Treasury bonds",
                },
              ].map((item) => (
                <li key={item.holder} className="flex items-start gap-2">
                  <span className="mt-0.5 font-bold text-accent">›</span>
                  <span>
                    <strong className="text-ink">{item.holder}</strong>:{" "}
                    {item.pct}
                    <span className="ml-1 text-muted">({item.note})</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Part VI: Who Decides */}
        <section className="mt-20">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part VI
          </div>
          <h2 className="mt-3 font-headline text-4xl font-black tracking-tight text-ink">
            Who Actually Decides
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/70">
            Budget decisions involve more actors than most people realize, and
            real power is concentrated in fewer hands than the official process
            suggests.
          </p>

          <div className="mt-8 space-y-6">
            {[
              {
                icon: Building2,
                actor: "The Appropriations Committees",
                power: "Highest, on discretionary spending",
                detail:
                  "The most important committees in Congress for day-to-day spending. The 12 subcommittees on each side control the funding for every federal department and agency. Members of these committees are highly sought by lobbyists. They can add or strip specific line items, defund programs, and attach policy riders to funding bills.",
              },
              {
                icon: Landmark,
                actor: "The Budget Committees",
                power: "Medium, sets the framework",
                detail:
                  "Write the budget resolution that sets overall spending targets. Less powerful than Appropriations but important for setting the fiscal contours of a given year.",
              },
              {
                icon: Users,
                actor: "Leadership (Speaker, Majority Leader, Whips)",
                power: "High, controls the floor schedule",
                detail:
                  "Leadership decides what comes to the floor for a vote and when. They can block budget bills they don't want members to vote on, or fast-track deals reached in private. Most budget agreements happen in leadership-to-leadership negotiations, not public committee hearings.",
              },
              {
                icon: Building2,
                actor: "The President and OMB",
                power: "Medium, proposes, does not dispose",
                detail:
                  "The President submits a budget request but cannot spend money Congress hasn't appropriated. However, the White House has significant leverage through veto threats, executive orders, and impoundment (delaying or refusing to spend appropriated funds, though impoundment is heavily restricted by the 1974 Budget Act).",
              },
              {
                icon: BarChart3,
                actor: "The Congressional Budget Office (CBO)",
                power: "Structural, the scorekeeper",
                detail:
                  "The nonpartisan referee. CBO 'scores' legislation, telling Congress what it will cost and how it affects the deficit. Bills that CBO says cost too much often die or get restructured. Politicians fight to influence CBO scoring assumptions. Its rulings are not binding, but they shape the entire debate.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.actor}
                  className="flex items-start gap-5 rounded-xl border border-border bg-surface p-5"
                >
                  <div className="rounded-lg bg-accent/10 p-2.5">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h3 className="font-headline text-base font-bold text-ink">
                        {item.actor}
                      </h3>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                        {item.power}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Part VII: Why Interest Is the Sleeper Issue */}
        <section className="mt-20">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part VII
          </div>
          <h2 className="mt-3 font-headline text-4xl font-black tracking-tight text-ink">
            Interest: The Sleeper Issue
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/70">
            The fastest-growing line item in the federal budget is one almost no
            one talks about: interest on the national debt.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              {
                label: "FY2021 interest payments",
                value: "$352B",
                note: "Near-zero interest rate era",
              },
              {
                label: "FY2023 interest payments",
                value: "$659B",
                note: "After rate hikes began",
              },
              {
                label: "FY2024 interest payments",
                value: "$870B",
                note: "Now exceeds defense spending",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-surface p-5 text-center"
              >
                <div className="font-headline text-4xl font-black text-ink">
                  {s.value}
                </div>
                <div className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-muted">
                  {s.label}
                </div>
                <div className="mt-2 text-xs text-ink/60">{s.note}</div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-ink/70">
            Interest payments are mandatory. You cannot cut them without
            defaulting on U.S. debt. As interest rates rose from near-zero in
            2021 to over 5% in 2023, the cost of servicing existing debt
            exploded. The CBO projects interest payments will exceed $1 trillion
            annually by 2026 and continue rising, crowding out funding for
            everything else.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">
            Interest on the debt is now the second-largest line item in the
            federal budget, behind only Social Security. Unlike Social Security,
            it provides nothing to anyone. It is the price of past decisions.
          </p>
        </section>

        {/* Part VIII: What You Can Do */}
        <section className="mt-20">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Part VIII
          </div>
          <h2 className="mt-3 font-headline text-4xl font-black tracking-tight text-ink">
            What You Can Do
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/70">
            The federal budget is the most consequential document produced by
            the U.S. government. Most people never engage with it. Here is how
            to change that.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: BarChart3,
                title: "Follow the actual spending",
                desc: "USASpending.gov is the government's official database. You can see exactly where federal money goes, by agency, contractor, location, and program.",
                href: "https://www.usaspending.gov",
                external: true,
              },
              {
                icon: FileText,
                title: "Read the CBO baseline",
                desc: "The Congressional Budget Office publishes an updated Budget and Economic Outlook every January and August. It is dense but authoritative, and free.",
                href: "https://www.cbo.gov/topics/budget",
                external: true,
              },
              {
                icon: BookOpen,
                title: "Track the Appropriations process",
                desc: "Follow the 12 annual appropriations bills on Congress.gov. You can see exactly what your representative voted for and against.",
                href: "https://www.congress.gov",
                external: true,
              },
              {
                icon: DollarSign,
                title: "See who got the contracts",
                desc: "Daonra's government contracts tracker shows federal contract awards down to the vendor and congressional district level.",
                href: "/contracts",
                external: false,
              },
            ].map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <div className="flex items-start justify-between gap-2">
                    <Icon className="h-5 w-5 text-accent" />
                    {item.external && (
                      <ExternalLink className="h-4 w-4 text-muted" />
                    )}
                  </div>
                  <h3 className="mt-3 font-headline text-base font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">
                    {item.desc}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-wider text-accent">
                    {item.external ? "Visit" : "Explore"}
                    <ChevronRight className="h-3 w-3" />
                  </div>
                </>
              );

              if (item.external) {
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-ink/20"
                  >
                    {content}
                  </a>
                );
              }
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-ink/20"
                >
                  {content}
                </Link>
              );
            })}
          </div>

          {/* Budget watchdog orgs */}
          <div className="mt-8 rounded-xl border border-border bg-surface p-6">
            <h3 className="font-headline text-base font-bold text-ink">
              Budget Watchdog Organizations
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                {
                  name: "Committee for a Responsible Federal Budget",
                  url: "https://www.crfb.org",
                  desc: "Bipartisan fiscal watchdog. Tracks deficits, debt, and spending proposals in plain English.",
                },
                {
                  name: "Tax Policy Center",
                  url: "https://www.taxpolicycenter.org",
                  desc: "Nonpartisan analysis of tax and budget proposals from the Urban Institute and Brookings Institution.",
                },
                {
                  name: "Center on Budget and Policy Priorities",
                  url: "https://www.cbpp.org",
                  desc: "Progressive-leaning but rigorously sourced analysis of the budget's impact on low- and moderate-income people.",
                },
                {
                  name: "American Enterprise Institute",
                  url: "https://www.aei.org",
                  desc: "Conservative-leaning budget and economic analysis. Good counterpoint on entitlement and tax policy.",
                },
              ].map((org) => (
                <a
                  key={org.name}
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="flex items-start gap-1.5">
                    <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    <div>
                      <div className="font-headline text-sm font-bold text-ink group-hover:text-accent">
                        {org.name}
                      </div>
                      <div className="mt-0.5 text-xs leading-relaxed text-muted">
                        {org.desc}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom nav */}
        <div className="mt-20 flex items-center justify-between border-t border-border pt-8">
          <Link
            href="/how-power-works/lobbying"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            How Lobbying Works
          </Link>
          <Link
            href="/how-power-works"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent hover:text-ink"
          >
            All Topics
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
