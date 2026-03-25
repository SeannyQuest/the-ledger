"use client";

import { useState } from "react";
import { Globe, Check, X, Minus, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Data ───────────────────────────────────────── */

interface Country {
  name: string;
  flag: string;
  individualLimits: string;
  corporateDonations: "banned" | "limited" | "unlimited";
  corporateDetail: string;
  publicFunding: "heavy" | "moderate" | "minimal" | "none";
  publicFundingDetail: string;
  spendingLimits: boolean;
  spendingDetail: string;
  foreignBan: boolean;
  disclosureStrength: "strong" | "moderate" | "weak";
  disclosureDetail: string;
  uniqueFeature: string;
}

const COUNTRIES: Country[] = [
  {
    name: "United States",
    flag: "🇺🇸",
    individualLimits: "$3,500/candidate/election; no Super PAC limit",
    corporateDonations: "limited",
    corporateDetail:
      "Direct contributions banned, but unlimited donations to Super PACs for independent expenditures (Citizens United, 2010)",
    publicFunding: "none",
    publicFundingDetail:
      "Presidential Election Campaign Fund exists but is effectively defunct; no candidate has used it since 2012",
    spendingLimits: false,
    spendingDetail:
      "None for candidates declining public funding (all of them). Super PACs can spend without limit.",
    foreignBan: true,
    disclosureStrength: "moderate",
    disclosureDetail:
      'Contributions over $200 disclosed to FEC. However, "dark money" via 501(c) nonprofits is not disclosed; $1.9B in dark money flowed through those channels in 2024 federal races.',
    uniqueFeature:
      "Only major democracy with virtually no spending limits and massive private financing via Super PACs",
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    individualLimits: "No limit on donation amounts",
    corporateDonations: "unlimited",
    corporateDetail:
      "UK-registered companies and trade unions may donate without caps",
    publicFunding: "minimal",
    publicFundingDetail:
      '"Short Money" for opposition parties\' parliamentary duties only, not campaigning',
    spendingLimits: true,
    spendingDetail:
      "Strict. ~£34M for a party contesting all seats. ~£11,390 + per-voter amount per candidate.",
    foreignBan: true,
    disclosureStrength: "strong",
    disclosureDetail:
      'Donations over £11,180 must be reported. 2025 "know your donor" rules require enhanced checks. Max fines raised to £500,000.',
    uniqueFeature:
      "Regulates spending rather than donations: no donation cap, but strict spending caps",
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    individualLimits: "C$1,750/year per party",
    corporateDonations: "banned",
    corporateDetail:
      "Banned entirely since 2004. Only individual Canadian citizens or permanent residents may donate. Union donations also banned.",
    publicFunding: "moderate",
    publicFundingDetail:
      "Federal per-vote subsidy discontinued 2015. 75% tax credit on first $400 remains. Candidates with 10%+ votes get partial expense reimbursement.",
    spendingLimits: true,
    spendingDetail:
      "Parties and candidates have limits. Third parties limited to C$602,700 total during campaigns.",
    foreignBan: true,
    disclosureStrength: "strong",
    disclosureDetail:
      "Donors of $200+ must be named. Annual financial returns required.",
    uniqueFeature:
      "One of the strictest among Anglo democracies: complete ban on corporate and union donations",
  },
  {
    name: "France",
    flag: "🇫🇷",
    individualLimits: "€4,600/candidate/election; €7,500/year to parties",
    corporateDonations: "banned",
    corporateDetail:
      "Banned entirely since 1995. Only natural persons (individuals) may donate.",
    publicFunding: "heavy",
    publicFundingDetail:
      "Government subsidies are largest source. Presidential candidates exceeding 5% of votes get up to 47.5% of spending reimbursed.",
    spendingLimits: true,
    spendingDetail:
      "Presidential: €16.85M (first round) + €5.66M (second round) = €22.51M max",
    foreignBan: true,
    disclosureStrength: "strong",
    disclosureDetail:
      "All campaign accounts audited by the National Commission for Campaign Accounts (CNCCFP).",
    uniqueFeature:
      "Corporate ban + spending limits + generous public reimbursement: one of the most regulated systems globally",
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    individualLimits: "No limit",
    corporateDonations: "unlimited",
    corporateDetail:
      "Corporations can donate unlimited amounts to political parties",
    publicFunding: "moderate",
    publicFundingDetail:
      "€0.88/vote (first 4M votes), €0.70/additional vote, plus €0.38 per euro of private donations. Public funding cannot exceed party's own revenue.",
    spendingLimits: false,
    spendingDetail: "No spending limits for parties or candidates",
    foreignBan: true,
    disclosureStrength: "strong",
    disclosureDetail:
      "Donations over €10,000 must be named. Donations of €35,000+ must be immediately disclosed to the Bundestag President.",
    uniqueFeature:
      'Constitutional requirement (since 1949) for public accounting. "Matching" system incentivizes small donations.',
  },
  {
    name: "Japan",
    flag: "🇯🇵",
    individualLimits: "¥1.5M (~$10,000)/year total",
    corporateDonations: "limited",
    corporateDetail:
      "Allowed to parties only, not individual candidates. Companies receiving government subsidies cannot contribute. ¥500,000/company cap.",
    publicFunding: "heavy",
    publicFundingDetail:
      "~¥250 per person in Japan's population (~$300M total), distributed to parties by Diet seats",
    spendingLimits: true,
    spendingDetail:
      'Varies by election. Many activities by support groups fall outside "campaign spending" definition.',
    foreignBan: true,
    disclosureStrength: "moderate",
    disclosureDetail:
      "Individuals donating ¥50,000+ and organizations purchasing party tickets ¥200,000+ must be named.",
    uniqueFeature:
      "Door-to-door canvassing banned since 1925. Limits on poster sizes, display locations. Official campaigns last only 12 days.",
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    individualLimits: "A$20,000/year per party (2025 reform)",
    corporateDonations: "limited",
    corporateDetail:
      "Allowed but newly capped under 2025 reforms. Previously unlimited at federal level.",
    publicFunding: "moderate",
    publicFundingDetail:
      "Per-vote public funding for qualifying candidates. Amount indexed annually.",
    spendingLimits: true,
    spendingDetail:
      "A$800,000 per electorate; A$90M per party nationally (2025 reform). Self-funding candidates exempt for own party.",
    foreignBan: true,
    disclosureStrength: "strong",
    disclosureDetail:
      'Near-real-time disclosure under 2025 reforms. "Dark money" substantially reduced.',
    uniqueFeature:
      "2025 Electoral Legislation Amendment Act represents a generational shift after decades of gridlock on reform",
  },
  {
    name: "India",
    flag: "🇮🇳",
    individualLimits: "Cash capped at ₹2,000/transaction; no overall cap",
    corporateDonations: "unlimited",
    corporateDetail:
      "No cap since removal of 7.5% profit rule. Electoral trusts donated $459M in 2024-25. 83% went to ruling BJP.",
    publicFunding: "none",
    publicFundingDetail:
      "No direct public funding. Free airtime on state broadcaster Doordarshan only.",
    spendingLimits: false,
    spendingDetail:
      "Candidate limits exist but parties exempt. Limits widely seen as unrealistic and routinely exceeded.",
    foreignBan: true,
    disclosureStrength: "weak",
    disclosureDetail:
      'Donations above ₹20,000 (~$240) must be reported. Below that classified as "unknown income," a major transparency gap.',
    uniqueFeature:
      "Electoral Bonds scheme ($1.9B anonymous corporate donations) struck down as unconstitutional by Supreme Court in February 2024",
  },
  {
    name: "Brazil",
    flag: "🇧🇷",
    individualLimits: "Up to 10% of prior-year annual income",
    corporateDonations: "banned",
    corporateDetail:
      "Banned entirely since 2015 by Supreme Court ruling after massive corruption scandals (Lava Jato/Car Wash)",
    publicFunding: "heavy",
    publicFundingDetail:
      "Public campaign fund quadrupled after the corporate ban. Partisan Fund distributes by parliamentary representation.",
    spendingLimits: true,
    spendingDetail:
      "Ceilings for all election types. All spending must be invoiced and reported to Electoral Court.",
    foreignBan: true,
    disclosureStrength: "strong",
    disclosureDetail:
      "All campaign accounts filed with Electoral Court. Real-time disclosure during campaigns.",
    uniqueFeature:
      "Corporate ban came from anti-corruption movement. Mandatory voting means campaigns focus on persuasion, not turnout.",
  },
  {
    name: "South Korea",
    flag: "🇰🇷",
    individualLimits: "₩20M (~$15,000)/year to sponsorship associations",
    corporateDonations: "banned",
    corporateDetail:
      "Corporations and organizations banned. Using employees or family as proxies is also prohibited.",
    publicFunding: "moderate",
    publicFundingDetail:
      '"National Current Subsidies" for party operations + "Election Subsidies" by vote share',
    spendingLimits: true,
    spendingDetail: "Strict limits set for each election type",
    foreignBan: true,
    disclosureStrength: "strong",
    disclosureDetail:
      "Contributions over ₩1.2M require real-name verified methods (check, credit card, bank transfer).",
    uniqueFeature:
      "Real-name financial verification is unusually strict. Many officials have lost seats for campaign finance violations; enforcement is notably robust.",
  },
  {
    name: "Sweden",
    flag: "🇸🇪",
    individualLimits: "No limit",
    corporateDonations: "unlimited",
    corporateDetail:
      "Allowed with no limits. Trade union donations also permitted.",
    publicFunding: "heavy",
    publicFundingDetail:
      "Public subsidies provide 80-90% of major parties' annual revenue. Dominant funding source.",
    spendingLimits: false,
    spendingDetail:
      "No spending limits. Despite this, spending is relatively low due to short campaigns and public media dominance.",
    foreignBan: false,
    disclosureStrength: "moderate",
    disclosureDetail:
      "Since 2018, parties must disclose income sources. Donations above SEK 24,150 must include donor identity. No expenditure reporting required.",
    uniqueFeature:
      "Relies on massive public funding (80-90% of revenue) rather than regulation to reduce private money influence",
  },
  {
    name: "Mexico",
    flag: "🇲🇽",
    individualLimits:
      "0.5% of the spending ceiling for previous presidential election",
    corporateDonations: "banned",
    corporateDetail:
      "Complete ban: no corporation, domestic or foreign, may donate. Religious organizations also banned.",
    publicFunding: "heavy",
    publicFundingDetail:
      "Dominant source. 70% allocated by vote share; 30% split equally among registered parties. INE administers.",
    spendingLimits: true,
    spendingDetail:
      "Ceilings for all race types. Every campaign expense must have a corresponding invoice filed with INE.",
    foreignBan: true,
    disclosureStrength: "strong",
    disclosureDetail:
      "Comprehensive invoice-level accountability. Every expense must be documented.",
    uniqueFeature:
      "One of the most heavily regulated systems globally. INE has strong enforcement powers. Extensive prohibited donors list.",
  },
];

type Dimension =
  | "corporate"
  | "spending"
  | "publicFunding"
  | "disclosure"
  | "overview";

/* ── Page ───────────────────────────────────────── */

export default function GlobalComparisonPage() {
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);
  const [dimension, setDimension] = useState<Dimension>("overview");

  const corporateBanned = COUNTRIES.filter(
    (c) => c.corporateDonations === "banned",
  );
  const noSpendingLimits = COUNTRIES.filter((c) => !c.spendingLimits);
  const heavyPublicFunding = COUNTRIES.filter(
    (c) => c.publicFunding === "heavy",
  );

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
      {/* Header */}
      <div>
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Global Perspective
        </div>
        <h1 className="mt-4 font-headline text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Campaign Finance
          <br />
          Around the World
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          How does American campaign finance compare? Twelve major democracies,
          side by side: from donation limits to dark money, from public funding
          to corporate bans.
        </p>
      </div>

      {/* Key stats */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="font-mono text-3xl font-black text-accent">
            {corporateBanned.length}
          </div>
          <div className="mt-1 text-sm text-muted">
            ban corporate donations entirely
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {corporateBanned.map((c) => (
              <span key={c.name} className="text-lg" title={c.name}>
                {c.flag}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="font-mono text-3xl font-black text-accent">
            {noSpendingLimits.length}
          </div>
          <div className="mt-1 text-sm text-muted">
            have no campaign spending limits
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {noSpendingLimits.map((c) => (
              <span key={c.name} className="text-lg" title={c.name}>
                {c.flag}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="font-mono text-3xl font-black text-accent">
            {heavyPublicFunding.length}
          </div>
          <div className="mt-1 text-sm text-muted">
            rely heavily on public funding
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {heavyPublicFunding.map((c) => (
              <span key={c.name} className="text-lg" title={c.name}>
                {c.flag}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="font-mono text-3xl font-black text-accent">
            {COUNTRIES.filter((c) => c.foreignBan).length}/{COUNTRIES.length}
          </div>
          <div className="mt-1 text-sm text-muted">ban foreign donations</div>
        </div>
      </div>

      {/* Dimension filter */}
      <div className="mt-10 flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-muted">View:</span>
        {(
          [
            { id: "overview", label: "Overview" },
            { id: "corporate", label: "Corporate Donations" },
            { id: "spending", label: "Spending Limits" },
            { id: "publicFunding", label: "Public Funding" },
            { id: "disclosure", label: "Disclosure" },
          ] as const
        ).map((d) => (
          <button
            key={d.id}
            onClick={() => setDimension(d.id)}
            className={cn(
              "rounded-full px-3 py-1 font-mono text-xs transition-colors",
              dimension === d.id
                ? "bg-ink text-white"
                : "bg-border/30 text-muted hover:text-ink",
            )}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Comparison grid */}
      <div className="mt-8">
        {dimension === "overview" && (
          <OverviewGrid
            countries={COUNTRIES}
            expandedCountry={expandedCountry}
            setExpandedCountry={setExpandedCountry}
          />
        )}
        {dimension === "corporate" && <CorporateView countries={COUNTRIES} />}
        {dimension === "spending" && <SpendingView countries={COUNTRIES} />}
        {dimension === "publicFunding" && (
          <PublicFundingView countries={COUNTRIES} />
        )}
        {dimension === "disclosure" && <DisclosureView countries={COUNTRIES} />}
      </div>

      {/* Global trends */}
      <div className="mt-16 border-t-4 border-ink pt-8">
        <h2 className="font-headline text-2xl font-black text-ink">
          Global Trends
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Corporate Bans Spreading",
              text: "The trend is toward banning corporate donations. Brazil (2015) is the most recent major ban. Australia significantly tightened corporate rules in 2025.",
            },
            {
              title: "Dark Money Is the Dominant Challenge",
              text: "Over 60 countries allow anonymous donations. US dark money hit $1.9B in the 2024 cycle. Shell companies and nonprofits are the primary vehicles.",
            },
            {
              title: "Foreign Interference Growing",
              text: "Cryptocurrencies, shell companies, and cross-border flows make foreign donation bans harder to enforce. ~20 countries revised political finance laws between 2021–2023.",
            },
            {
              title: "Digital Ads Creating New Gaps",
              text: "Online political advertising is poorly regulated globally. Ireland's 2022 Electoral Reform Act (transparency notices on online ads) is a model others are studying.",
            },
            {
              title: "Real-Time Disclosure Becoming Standard",
              text: "Australia's 2025 reform introduced near-real-time disclosure. The global trend is toward faster, more granular reporting rather than annual filings.",
            },
            {
              title: "Public Funding as Counterweight",
              text: "Countries that ban corporate donations typically increase public funding. Brazil quadrupled its fund; Mexico's system is publicly funded by design.",
            },
          ].map((trend) => (
            <div
              key={trend.title}
              className="rounded-lg border border-border bg-surface p-5"
            >
              <h3 className="font-headline text-base font-bold text-ink">
                {trend.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {trend.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* US spotlight */}
      <div className="mt-16 rounded-xl border-2 border-accent/20 bg-accent/5 p-6 sm:p-8">
        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Where the US Stands
        </div>
        <h2 className="mt-3 font-headline text-2xl font-black text-ink">
          America Is an Outlier
        </h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          <div>
            <div className="text-sm font-medium text-ink">
              No Spending Limits
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              Only 4 of 12 major democracies lack spending limits. The US is the
              only one that also allows unlimited independent expenditures via
              Super PACs.
            </p>
          </div>
          <div>
            <div className="text-sm font-medium text-ink">
              No Public Funding
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              The Presidential Election Campaign Fund is effectively defunct.
              Most peer democracies provide significant public campaign funding.
            </p>
          </div>
          <div>
            <div className="text-sm font-medium text-ink">
              Dark Money Loophole
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              501(c)(4) nonprofits can spend on elections without disclosing
              donors. $1.9 billion in dark money flowed through the 2024 cycle.
            </p>
          </div>
        </div>
      </div>

      {/* Sources */}
      <div className="mt-12 rounded-lg border border-border bg-surface/50 px-4 py-3">
        <p className="font-mono text-xs text-muted">
          Data compiled from FEC, UK Electoral Commission, Elections Canada,
          CNCCFP (France), Bundestag records, Japan NEC, Australian Electoral
          Commission, Election Commission of India, Brazilian Electoral Court,
          South Korean NEC, Swedish Kammarkollegiet, Mexican INE, Transparency
          International, International IDEA, and the Law Library of Congress.
          Last updated March 2026.
        </p>
      </div>
    </div>
  );
}

/* ── Overview Grid ──────────────────────────────── */

function OverviewGrid({
  countries,
  expandedCountry,
  setExpandedCountry,
}: {
  countries: Country[];
  expandedCountry: string | null;
  setExpandedCountry: (name: string | null) => void;
}) {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="hidden items-center gap-3 rounded-lg bg-ink px-4 py-2 lg:flex">
        <span className="w-40 font-mono text-[10px] font-bold text-white">
          Country
        </span>
        <span className="w-32 font-mono text-[10px] font-bold text-white">
          Corp. Donations
        </span>
        <span className="w-28 font-mono text-[10px] font-bold text-white">
          Spending Limits
        </span>
        <span className="w-28 font-mono text-[10px] font-bold text-white">
          Public Funding
        </span>
        <span className="w-28 font-mono text-[10px] font-bold text-white">
          Disclosure
        </span>
        <span className="w-24 font-mono text-[10px] font-bold text-white">
          Foreign Ban
        </span>
        <span className="flex-1 font-mono text-[10px] font-bold text-white">
          Individual Limits
        </span>
      </div>

      {countries.map((c) => {
        const isExpanded = expandedCountry === c.name;
        return (
          <div key={c.name}>
            <button
              onClick={() => setExpandedCountry(isExpanded ? null : c.name)}
              className={cn(
                "flex w-full flex-col gap-2 rounded-lg border px-4 py-3 text-left transition-colors lg:flex-row lg:items-center lg:gap-3",
                isExpanded
                  ? "border-ink bg-ink/5"
                  : "border-border bg-surface hover:border-ink/20",
              )}
            >
              <span className="flex w-40 items-center gap-2 text-sm font-medium text-ink">
                <span className="text-lg">{c.flag}</span>
                {c.name}
                {isExpanded ? (
                  <ChevronUp className="ml-auto h-3.5 w-3.5 text-muted lg:hidden" />
                ) : (
                  <ChevronDown className="ml-auto h-3.5 w-3.5 text-muted lg:hidden" />
                )}
              </span>
              <span className="w-32">
                <StatusBadge
                  status={
                    c.corporateDonations === "banned"
                      ? "good"
                      : c.corporateDonations === "limited"
                        ? "mixed"
                        : "bad"
                  }
                  label={
                    c.corporateDonations === "banned"
                      ? "Banned"
                      : c.corporateDonations === "limited"
                        ? "Limited"
                        : "Unlimited"
                  }
                />
              </span>
              <span className="w-28">
                <StatusBadge
                  status={c.spendingLimits ? "good" : "bad"}
                  label={c.spendingLimits ? "Yes" : "None"}
                />
              </span>
              <span className="w-28">
                <StatusBadge
                  status={
                    c.publicFunding === "heavy"
                      ? "good"
                      : c.publicFunding === "moderate"
                        ? "mixed"
                        : "bad"
                  }
                  label={
                    c.publicFunding.charAt(0).toUpperCase() +
                    c.publicFunding.slice(1)
                  }
                />
              </span>
              <span className="w-28">
                <StatusBadge
                  status={
                    c.disclosureStrength === "strong"
                      ? "good"
                      : c.disclosureStrength === "moderate"
                        ? "mixed"
                        : "bad"
                  }
                  label={
                    c.disclosureStrength.charAt(0).toUpperCase() +
                    c.disclosureStrength.slice(1)
                  }
                />
              </span>
              <span className="w-24">
                {c.foreignBan ? (
                  <Check className="h-4 w-4 text-money-in" />
                ) : (
                  <Minus className="h-4 w-4 text-muted/40" />
                )}
              </span>
              <span className="flex-1 font-mono text-xs text-muted">
                {c.individualLimits}
              </span>
            </button>

            {isExpanded && (
              <div className="ml-4 mt-1 rounded-lg border border-border bg-paper p-5 lg:ml-0">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <DetailBlock
                    label="Corporate Donations"
                    content={c.corporateDetail}
                  />
                  <DetailBlock
                    label="Spending Limits"
                    content={c.spendingDetail}
                  />
                  <DetailBlock
                    label="Public Funding"
                    content={c.publicFundingDetail}
                  />
                  <DetailBlock
                    label="Disclosure"
                    content={c.disclosureDetail}
                  />
                  <DetailBlock
                    label="What Makes It Unique"
                    content={c.uniqueFeature}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Dimension Views ────────────────────────────── */

function CorporateView({ countries }: { countries: Country[] }) {
  const sorted = [...countries].sort((a, b) => {
    const order = { banned: 0, limited: 1, unlimited: 2 };
    return order[a.corporateDonations] - order[b.corporateDonations];
  });

  return (
    <div className="space-y-2">
      {sorted.map((c) => (
        <div
          key={c.name}
          className="flex items-start gap-4 rounded-lg border border-border bg-surface px-4 py-3"
        >
          <span className="text-2xl">{c.flag}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-ink">{c.name}</span>
              <StatusBadge
                status={
                  c.corporateDonations === "banned"
                    ? "good"
                    : c.corporateDonations === "limited"
                      ? "mixed"
                      : "bad"
                }
                label={
                  c.corporateDonations === "banned"
                    ? "Banned"
                    : c.corporateDonations === "limited"
                      ? "Limited"
                      : "Unlimited"
                }
              />
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {c.corporateDetail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SpendingView({ countries }: { countries: Country[] }) {
  const withLimits = countries.filter((c) => c.spendingLimits);
  const without = countries.filter((c) => !c.spendingLimits);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h3 className="font-headline text-lg font-bold text-ink">
          Have Spending Limits ({withLimits.length})
        </h3>
        <div className="mt-4 space-y-2">
          {withLimits.map((c) => (
            <div
              key={c.name}
              className="rounded-lg border border-border bg-surface px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{c.flag}</span>
                <span className="text-sm font-medium text-ink">{c.name}</span>
              </div>
              <p className="mt-1 text-xs text-muted">{c.spendingDetail}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-headline text-lg font-bold text-money-out">
          No Spending Limits ({without.length})
        </h3>
        <div className="mt-4 space-y-2">
          {without.map((c) => (
            <div
              key={c.name}
              className="rounded-lg border border-money-out/20 bg-money-out/5 px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{c.flag}</span>
                <span className="text-sm font-medium text-ink">{c.name}</span>
              </div>
              <p className="mt-1 text-xs text-muted">{c.spendingDetail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PublicFundingView({ countries }: { countries: Country[] }) {
  const levels = ["heavy", "moderate", "minimal", "none"] as const;
  const labels = {
    heavy: "Heavy Public Funding",
    moderate: "Moderate Public Funding",
    minimal: "Minimal Public Funding",
    none: "No Public Funding",
  };

  return (
    <div className="space-y-8">
      {levels.map((level) => {
        const group = countries.filter((c) => c.publicFunding === level);
        if (group.length === 0) return null;
        return (
          <div key={level}>
            <h3 className="font-headline text-lg font-bold text-ink">
              {labels[level]} ({group.length})
            </h3>
            <div className="mt-4 space-y-2">
              {group.map((c) => (
                <div
                  key={c.name}
                  className="rounded-lg border border-border bg-surface px-4 py-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{c.flag}</span>
                    <span className="text-sm font-medium text-ink">
                      {c.name}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    {c.publicFundingDetail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DisclosureView({ countries }: { countries: Country[] }) {
  const sorted = [...countries].sort((a, b) => {
    const order = { strong: 0, moderate: 1, weak: 2 };
    return order[a.disclosureStrength] - order[b.disclosureStrength];
  });

  return (
    <div className="space-y-2">
      {sorted.map((c) => (
        <div
          key={c.name}
          className="flex items-start gap-4 rounded-lg border border-border bg-surface px-4 py-3"
        >
          <span className="text-2xl">{c.flag}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-ink">{c.name}</span>
              <StatusBadge
                status={
                  c.disclosureStrength === "strong"
                    ? "good"
                    : c.disclosureStrength === "moderate"
                      ? "mixed"
                      : "bad"
                }
                label={
                  c.disclosureStrength.charAt(0).toUpperCase() +
                  c.disclosureStrength.slice(1)
                }
              />
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {c.disclosureDetail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Shared Components ──────────────────────────── */

function StatusBadge({
  status,
  label,
}: {
  status: "good" | "mixed" | "bad";
  label: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-bold",
        status === "good" && "bg-money-in/10 text-money-in",
        status === "mixed" && "bg-amber-100 text-amber-700",
        status === "bad" && "bg-money-out/10 text-money-out",
      )}
    >
      {status === "good" && <Check className="h-2.5 w-2.5" />}
      {status === "mixed" && <Minus className="h-2.5 w-2.5" />}
      {status === "bad" && <X className="h-2.5 w-2.5" />}
      {label}
    </span>
  );
}

function DetailBlock({ label, content }: { label: string; content: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
        {label}
      </div>
      <p className="mt-1 text-xs leading-relaxed text-ink/80">{content}</p>
    </div>
  );
}
