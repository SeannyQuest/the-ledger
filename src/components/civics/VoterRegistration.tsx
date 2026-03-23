"use client";

import { useState } from "react";
import { stateVoterData, type StateVoterData } from "@/lib/voter-data";
import {
  CheckCircle2,
  XCircle,
  ExternalLink,
  ClipboardCheck,
  ChevronDown,
} from "lucide-react";

function Badge({
  label,
  active,
}: {
  label: string;
  active: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider ${
        active
          ? "bg-money-in/10 text-money-in"
          : "bg-ink/5 text-muted"
      }`}
    >
      {active ? (
        <CheckCircle2 className="h-3.5 w-3.5" />
      ) : (
        <XCircle className="h-3.5 w-3.5" />
      )}
      {label}
    </span>
  );
}

function StateInfoPanel({ data }: { data: StateVoterData }) {
  return (
    <div className="mt-12 rounded-xl border-2 border-ink bg-surface p-6 sm:p-8 lg:p-10">
      {/* State headline */}
      <h2 className="font-headline text-3xl font-black tracking-tight text-ink sm:text-4xl">
        {data.state} Voter Registration
      </h2>

      {/* Registration deadline — prominent */}
      <div className="mt-6 rounded-lg border border-accent/20 bg-accent/5 p-4 sm:p-5">
        <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
          Registration Deadline
        </div>
        <p className="mt-1.5 text-lg font-bold text-ink sm:text-xl">
          {data.registrationDeadline}
        </p>
      </div>

      {/* Primary CTA — register online */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={data.onlineRegistrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink bg-ink px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-transparent hover:text-ink"
        >
          {data.onlineRegistration
            ? "Register Online"
            : "Registration Info"}
          <ExternalLink className="h-4 w-4" />
        </a>
        <a
          href={data.checkRegistrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-white"
        >
          <ClipboardCheck className="h-4 w-4" />
          Check Registration Status
        </a>
      </div>

      {/* Badges row */}
      <div className="mt-8 flex flex-wrap gap-2">
        <Badge label="Online Registration" active={data.onlineRegistration} />
        <Badge
          label="Same-Day Registration"
          active={data.sameDayRegistration}
        />
        <Badge label="Early Voting" active={data.earlyVoting} />
        <Badge
          label="No-Excuse Absentee"
          active={data.noExcuseAbsenteeBallot}
        />
      </div>

      {/* ID Requirements */}
      <div className="mt-8">
        <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted">
          ID Requirements
        </h3>
        <p className="mt-2 leading-relaxed text-ink/80">
          {data.idRequirements}
        </p>
      </div>

      {/* Notes */}
      {data.notes && (
        <div className="mt-6">
          <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted">
            Good to Know
          </h3>
          <p className="mt-2 leading-relaxed text-ink/80">{data.notes}</p>
        </div>
      )}
    </div>
  );
}

export default function VoterRegistration() {
  const [selectedAbbr, setSelectedAbbr] = useState("");

  const selectedState = selectedAbbr
    ? stateVoterData.find((s) => s.abbr === selectedAbbr) ?? null
    : null;

  return (
    <div>
      {/* State selector */}
      <div className="mt-10">
        <label
          htmlFor="state-select"
          className="block font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted"
        >
          Select Your State
        </label>
        <div className="relative mt-2 max-w-md">
          <select
            id="state-select"
            value={selectedAbbr}
            onChange={(e) => setSelectedAbbr(e.target.value)}
            className="w-full appearance-none rounded-lg border-2 border-ink bg-surface py-3.5 pl-4 pr-12 font-headline text-lg font-bold text-ink transition-colors focus:border-accent focus:outline-none"
          >
            <option value="">Choose a state&hellip;</option>
            {stateVoterData.map((s) => (
              <option key={s.abbr} value={s.abbr}>
                {s.state}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/50" />
        </div>
      </div>

      {/* Info panel */}
      {selectedState && <StateInfoPanel data={selectedState} />}

      {/* Disclaimer */}
      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
        Registration rules change. Deadlines, ID requirements, and voting
        options are updated by state legislatures and courts regularly. Always
        verify the latest rules with your state election office or{" "}
        <a
          href="https://vote.gov"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-ink underline underline-offset-2 hover:text-accent"
        >
          vote.gov
        </a>
        .
      </p>
    </div>
  );
}
