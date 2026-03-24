"use client";

import { useState } from "react";
import {
  Search,
  Phone,
  ExternalLink,
  Globe,
  ChevronDown,
  Users,
  Landmark,
} from "lucide-react";
import legislatorData from "@/lib/data/legislators.json";

// --- Types ---

type Member = {
  bioguide: string;
  name: string;
  party: string;
  state: string;
  type: "sen" | "rep";
  district?: number;
  phone?: string;
  contactForm?: string;
  website?: string;
  twitter?: string;
  facebook?: string;
};

type StateLegislators = {
  senators: Member[];
  representatives: Record<string, Member>;
};

const legislators = legislatorData as Record<string, StateLegislators>;

// --- State abbreviation to full name ---

const stateNames: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
  MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire",
  NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina",
  ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
  RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee",
  TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington",
  WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming", DC: "District of Columbia",
  AS: "American Samoa", GU: "Guam", MP: "Northern Mariana Islands",
  PR: "Puerto Rico", VI: "U.S. Virgin Islands",
};

// --- Party badge ---

function PartyBadge({ party }: { party: string }) {
  const p = party.toLowerCase();
  let classes = "bg-gray-100 text-gray-800";
  let label = party;

  if (p.includes("democrat")) {
    classes = "bg-blue-100 text-blue-800";
    label = "D";
  } else if (p.includes("republican")) {
    classes = "bg-red-100 text-red-800";
    label = "R";
  } else if (p.includes("independent")) {
    classes = "bg-gray-100 text-gray-800";
    label = "I";
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-xs font-bold ${classes}`}
    >
      {label}
    </span>
  );
}

// --- Member card ---

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="rounded-xl border-2 border-border bg-surface p-5 transition-colors hover:border-ink/30 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-headline text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {member.name}
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <PartyBadge party={member.party} />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
              {member.type === "sen" ? "Senator" : "Representative"}
            </span>
            <span className="text-xs text-muted">
              {stateNames[member.state] || member.state}
              {member.type === "rep" &&
                member.district !== undefined &&
                ` \u2014 District ${member.district}`}
            </span>
          </div>
        </div>
        {member.type === "sen" ? (
          <Landmark className="h-5 w-5 shrink-0 text-muted" />
        ) : (
          <Users className="h-5 w-5 shrink-0 text-muted" />
        )}
      </div>

      {/* Phone — prominent */}
      {member.phone && (
        <a
          href={`tel:${member.phone}`}
          className="mt-5 flex items-center gap-3 rounded-lg border border-accent/20 bg-accent/5 px-4 py-3 font-mono text-lg font-bold text-ink transition-colors hover:border-accent hover:bg-accent/10 sm:text-xl"
        >
          <Phone className="h-5 w-5 text-accent" />
          {member.phone}
        </a>
      )}

      {/* Actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        {member.contactForm && (
          <a
            href={member.contactForm}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:border-ink hover:bg-ink/5"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Contact Form
          </a>
        )}
        {member.website && (
          <a
            href={member.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-muted transition-colors hover:border-ink hover:text-ink"
          >
            <Globe className="h-3.5 w-3.5" />
            Official Website
          </a>
        )}
      </div>
    </div>
  );
}

// --- Contact templates ---

function ContactTemplates() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-12 rounded-xl border-2 border-border bg-surface">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >
        <h3 className="font-headline text-xl font-bold text-ink sm:text-2xl">
          How to Contact Your Rep (That Actually Works)
        </h3>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="space-y-8 border-t border-border px-6 py-6">
          {/* Effectiveness note */}
          <p className="rounded-lg bg-accent/5 px-4 py-3 text-sm font-medium text-ink/80">
            Calls are more effective than emails. Emails are more effective than
            online forms. Show up in person if you can.
          </p>

          {/* Phone script */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
              30-Second Phone Script
            </h4>
            <div className="mt-3 rounded-lg border border-border bg-paper p-4 font-mono text-sm leading-relaxed text-ink/80">
              <p>
                &ldquo;Hi, my name is{" "}
                <span className="border-b border-dashed border-accent text-ink">
                  [your name]
                </span>{" "}
                and I&apos;m a constituent from{" "}
                <span className="border-b border-dashed border-accent text-ink">
                  [your city]
                </span>
                . I&apos;m calling to{" "}
                <span className="border-b border-dashed border-accent text-ink">
                  [urge/thank]
                </span>{" "}
                the{" "}
                <span className="border-b border-dashed border-accent text-ink">
                  [Senator/Representative]
                </span>{" "}
                to{" "}
                <span className="border-b border-dashed border-accent text-ink">
                  [support/oppose]
                </span>{" "}
                <span className="border-b border-dashed border-accent text-ink">
                  [specific bill or issue]
                </span>
                . This is important to me because{" "}
                <span className="border-b border-dashed border-accent text-ink">
                  [one sentence why]
                </span>
                . Thank you for your time.&rdquo;
              </p>
            </div>
            <p className="mt-2 text-xs text-muted">
              You&apos;ll almost always speak to a staffer, not the member.
              That&apos;s normal — staffers tally every call.
            </p>
          </div>

          {/* Email template */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Email Template
            </h4>
            <div className="mt-3 space-y-3 rounded-lg border border-border bg-paper p-4 text-sm leading-relaxed text-ink/80">
              <p>
                <strong className="text-ink">Subject:</strong> Constituent
                Request RE:{" "}
                <span className="border-b border-dashed border-accent text-ink">
                  [Issue/Bill Number]
                </span>
              </p>
              <p>
                Dear{" "}
                <span className="border-b border-dashed border-accent text-ink">
                  [Senator/Representative] [Last Name]
                </span>
                ,
              </p>
              <p>
                My name is{" "}
                <span className="border-b border-dashed border-accent text-ink">
                  [your name]
                </span>{" "}
                and I am a constituent in{" "}
                <span className="border-b border-dashed border-accent text-ink">
                  [your city, state]
                </span>
                . I am writing to{" "}
                <span className="border-b border-dashed border-accent text-ink">
                  [urge/thank]
                </span>{" "}
                you regarding{" "}
                <span className="border-b border-dashed border-accent text-ink">
                  [specific issue or bill]
                </span>
                .
              </p>
              <p>
                <span className="border-b border-dashed border-accent text-ink">
                  [1-2 sentences on why this matters to you personally]
                </span>
              </p>
              <p>
                I respectfully ask that you{" "}
                <span className="border-b border-dashed border-accent text-ink">
                  [specific action: vote yes/no, cosponsor, hold a hearing]
                </span>
                .
              </p>
              <p>
                Thank you for representing our community.
                <br />
                <span className="border-b border-dashed border-accent text-ink">
                  [Your full name]
                </span>
                <br />
                <span className="border-b border-dashed border-accent text-ink">
                  [Your address]
                </span>
              </p>
            </div>
            <p className="mt-2 text-xs text-muted">
              Include your address — offices filter out non-constituents. Be
              specific about the bill or issue.
            </p>
          </div>

          {/* Tips */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Tips That Actually Matter
            </h4>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink/80">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-accent">&bull;</span>
                <span>
                  <strong className="text-ink">Call the DC office</strong> for
                  federal policy. Call the{" "}
                  <strong className="text-ink">local/district office</strong>{" "}
                  for help with federal agencies (VA, IRS, immigration).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-accent">&bull;</span>
                <span>
                  <strong className="text-ink">Be specific.</strong>{" "}
                  &ldquo;Please vote yes on HR 1234&rdquo; beats &ldquo;I care
                  about the environment.&rdquo;
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-accent">&bull;</span>
                <span>
                  <strong className="text-ink">
                    Personal stories are powerful.
                  </strong>{" "}
                  One sentence about how an issue affects you is worth a page of
                  policy arguments.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-accent">&bull;</span>
                <span>
                  <strong className="text-ink">
                    You don&apos;t need to be an expert.
                  </strong>{" "}
                  &ldquo;I&apos;m concerned about X and I want to know where you
                  stand&rdquo; is a perfectly good call.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-accent">&bull;</span>
                <span>
                  <strong className="text-ink">Follow up.</strong> If you get a
                  form letter back, call again. Persistence signals that voters
                  are watching.
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Main component ---

export function ContactReps() {
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{
    stateAbbr: string;
    senators: Member[];
    representatives: Member[];
    multiDistrict: boolean;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = zip.trim();

    if (!/^\d{5}$/.test(trimmed)) {
      setError("Please enter a valid 5-digit ZIP code.");
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch(`/api/zip-lookup?zip=${trimmed}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      const { state_abbr, districts } = data as {
        state_abbr: string;
        districts: number[];
      };

      const stateLeg = legislators[state_abbr];

      if (!stateLeg) {
        setError("No representative data found for your state.");
        setLoading(false);
        return;
      }

      const reps: Member[] = [];
      for (const d of districts) {
        const rep = stateLeg.representatives[String(d)];
        if (rep) reps.push(rep);
      }

      setResults({
        stateAbbr: state_abbr,
        senators: stateLeg.senators,
        representatives: reps,
        multiDistrict: districts.length > 1,
      });
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-12">
      {/* ZIP input */}
      <form onSubmit={handleSubmit} className="mx-auto max-w-md">
        <label
          htmlFor="zip-input"
          className="block font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted"
        >
          Enter your ZIP code
        </label>
        <div className="mt-3 flex gap-3">
          <input
            id="zip-input"
            type="text"
            inputMode="numeric"
            pattern="\d{5}"
            maxLength={5}
            placeholder="e.g. 20500"
            value={zip}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
              setError(null);
            }}
            className="flex-1 rounded-lg border-2 border-border bg-surface px-4 py-3 font-mono text-lg text-ink placeholder:text-muted/50 focus:border-ink focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 font-mono text-sm font-bold uppercase tracking-wider text-paper transition-colors hover:bg-ink/80 disabled:opacity-50"
          >
            <Search className="h-4 w-4" />
            {loading ? "..." : "Find"}
          </button>
        </div>
        {error && (
          <p className="mt-3 text-sm font-medium text-accent">{error}</p>
        )}
      </form>

      {/* Results */}
      {results && (
        <div className="mt-12">
          {/* State header */}
          <h2 className="text-center font-headline text-2xl font-bold text-ink sm:text-3xl">
            Your Representatives in{" "}
            {stateNames[results.stateAbbr] || results.stateAbbr}
          </h2>

          {results.multiDistrict && (
            <p className="mt-3 text-center text-sm text-muted">
              Your ZIP code spans multiple congressional districts — we&apos;re
              showing all representatives for your area.
            </p>
          )}

          {/* Senators */}
          {results.senators.length > 0 && (
            <div className="mt-8">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-muted">
                Your Senators
              </h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {results.senators.map((s) => (
                  <MemberCard key={s.bioguide} member={s} />
                ))}
              </div>
            </div>
          )}

          {/* Representatives */}
          {results.representatives.length > 0 && (
            <div className="mt-8">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-muted">
                Your Representative{results.representatives.length > 1 ? "s" : ""}
              </h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {results.representatives.map((r) => (
                  <MemberCard key={r.bioguide} member={r} />
                ))}
              </div>
            </div>
          )}

          {results.senators.length === 0 &&
            results.representatives.length === 0 && (
              <p className="mt-8 text-center text-sm text-muted">
                No current representatives found for this area. This may be a
                territory or non-voting district.
              </p>
            )}

          {/* Contact templates */}
          <ContactTemplates />
        </div>
      )}
    </div>
  );
}
