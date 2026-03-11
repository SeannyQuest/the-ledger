"use client";

interface VoteSummary {
  yea: number;
  nay: number;
  present: number;
  notVoting: number;
}

export function VoteBreakdown({
  votes,
  compact,
}: {
  votes: VoteSummary;
  compact?: boolean;
}) {
  const total = votes.yea + votes.nay + votes.present + votes.notVoting;
  if (total === 0) return null;

  const yeaPct = (votes.yea / total) * 100;
  const nayPct = (votes.nay / total) * 100;
  const passed = votes.yea > votes.nay;

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-border/30">
          <div
            className="h-full bg-money-in"
            style={{ width: `${yeaPct}%` }}
          />
          <div
            className="h-full bg-money-out"
            style={{ width: `${nayPct}%` }}
          />
        </div>
        <span className="shrink-0 font-mono text-[10px] text-muted">
          {votes.yea}-{votes.nay}
        </span>
      </div>
    );
  }

  return (
    <div>
      {/* Bar */}
      <div className="flex h-4 overflow-hidden rounded-lg">
        <div
          className="flex items-center justify-center bg-money-in transition-all"
          style={{ width: `${yeaPct}%` }}
        >
          {yeaPct > 15 && (
            <span className="font-mono text-[10px] font-bold text-white">
              {votes.yea}
            </span>
          )}
        </div>
        <div
          className="flex items-center justify-center bg-money-out transition-all"
          style={{ width: `${nayPct}%` }}
        >
          {nayPct > 15 && (
            <span className="font-mono text-[10px] font-bold text-white">
              {votes.nay}
            </span>
          )}
        </div>
      </div>

      {/* Labels */}
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-sm bg-money-in" />
            <span className="font-mono text-xs text-muted">
              Yea {votes.yea}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-sm bg-money-out" />
            <span className="font-mono text-xs text-muted">
              Nay {votes.nay}
            </span>
          </div>
          {votes.present > 0 && (
            <span className="font-mono text-xs text-muted/60">
              Present {votes.present}
            </span>
          )}
          {votes.notVoting > 0 && (
            <span className="font-mono text-xs text-muted/60">
              NV {votes.notVoting}
            </span>
          )}
        </div>
        <span
          className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
            passed
              ? "bg-money-in/10 text-money-in"
              : "bg-money-out/10 text-money-out"
          }`}
        >
          {passed ? "PASSED" : "FAILED"}
        </span>
      </div>
    </div>
  );
}
