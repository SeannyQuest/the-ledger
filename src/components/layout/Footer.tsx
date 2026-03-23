import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-4 border-ink bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <span className="font-headline text-xl font-black tracking-tight text-ink">
              DAONRA
            </span>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Tracking the flow of money in American politics.
              Federal, state, and local campaign finance, lobbying,
              and government contracts — all in one place.
            </p>
          </div>

          {/* Data Sources */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
              Data Sources
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm text-ink">
              <li>FEC (Federal Election Commission)</li>
              <li>USASpending.gov</li>
              <li>Senate Lobbying Disclosures</li>
              <li>FollowTheMoney.org (50 States)</li>
              <li>SEC EDGAR</li>
              <li>IRS 990 / 527 Filings</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
              About
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <Link href="/about" className="text-ink underline-offset-2 hover:underline">
                  Methodology & Data Sources
                </Link>
              </li>
              <li>
                <span className="text-muted">
                  Data updated in real-time from public records
                </span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="thin" />

        <div className="flex items-center justify-between text-xs text-muted">
          <span>&copy; {new Date().getFullYear()} Daonra. All data from public sources.</span>
          <span className="font-mono">v0.1.0</span>
        </div>
      </div>
    </footer>
  );
}
