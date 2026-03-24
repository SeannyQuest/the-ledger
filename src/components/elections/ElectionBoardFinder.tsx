"use client";

import { useState } from "react";
import { stateElectionBoards } from "@/lib/elections-data";
import { ChevronDown, ExternalLink } from "lucide-react";

export default function ElectionBoardFinder() {
  const [selectedAbbr, setSelectedAbbr] = useState("");

  const selected = selectedAbbr
    ? stateElectionBoards.find((s) => s.abbr === selectedAbbr) ?? null
    : null;

  return (
    <div>
      <label
        htmlFor="election-board-select"
        className="block font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted"
      >
        Select Your State
      </label>
      <div className="relative mt-2 max-w-md">
        <select
          id="election-board-select"
          value={selectedAbbr}
          onChange={(e) => setSelectedAbbr(e.target.value)}
          className="w-full appearance-none rounded-lg border-2 border-ink bg-surface py-3.5 pl-4 pr-12 font-headline text-lg font-bold text-ink transition-colors focus:border-accent focus:outline-none"
        >
          <option value="">Choose a state&hellip;</option>
          {stateElectionBoards.map((s) => (
            <option key={s.abbr} value={s.abbr}>
              {s.state}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/50" />
      </div>

      {selected && (
        <div className="mt-6 rounded-xl border-2 border-ink bg-surface p-6 sm:p-8">
          <h3 className="font-headline text-2xl font-black tracking-tight text-ink sm:text-3xl">
            {selected.state}
          </h3>
          <a
            href={selected.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-transparent hover:text-ink"
          >
            Visit Election Board
            <ExternalLink className="h-4 w-4" />
          </a>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Your state election board is the official source for polling
            locations, ballot samples, and local races.
          </p>
        </div>
      )}
    </div>
  );
}
