"use client";

import Link from "next/link";
import { PARTY_COLORS } from "@/lib/constants";

export interface Trade {
  id: string;
  entityId: string;
  representative: string;
  party: string | null;
  chamber: string;
  district: string | null;
  ticker: string;
  assetName: string;
  txType: string;
  txDate: string;
  disclosureDate: string;
  amount: string;
  amountLow: number;
  amountHigh: number;
  owner: string;
  entity: {
    id: string;
    name: string;
    party: string | null;
    state: string | null;
    office: string | null;
    photoUrl: string | null;
  };
}

export function TradeTable({ trades }: { trades: Trade[] }) {
  if (trades.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface/50 px-6 py-10 text-center">
        <p className="font-mono text-sm text-muted">No trades found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-ink bg-surface">
            <th className="px-4 py-3 text-left font-mono text-xs font-bold uppercase tracking-wider text-muted">
              Representative
            </th>
            <th className="px-4 py-3 text-left font-mono text-xs font-bold uppercase tracking-wider text-muted">
              Ticker
            </th>
            <th className="px-4 py-3 text-left font-mono text-xs font-bold uppercase tracking-wider text-muted">
              Type
            </th>
            <th className="px-4 py-3 text-left font-mono text-xs font-bold uppercase tracking-wider text-muted">
              Amount
            </th>
            <th className="hidden px-4 py-3 text-left font-mono text-xs font-bold uppercase tracking-wider text-muted sm:table-cell">
              Date
            </th>
            <th className="hidden px-4 py-3 text-left font-mono text-xs font-bold uppercase tracking-wider text-muted lg:table-cell">
              Owner
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {trades.map((trade) => (
            <tr
              key={trade.id}
              className="transition-colors hover:bg-surface/80"
            >
              <td className="px-4 py-3">
                <Link
                  href={`/entity/politician/${trade.entityId}`}
                  className="group flex items-center gap-2"
                >
                  <div
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{
                      backgroundColor: trade.party
                        ? PARTY_COLORS[trade.party.toLowerCase()] ?? "#6b7280"
                        : "#6b7280",
                    }}
                  />
                  <span className="text-ink group-hover:text-accent">
                    {trade.representative}
                  </span>
                  {trade.entity.state && (
                    <span className="font-mono text-[10px] text-muted">
                      {trade.entity.state}
                    </span>
                  )}
                </Link>
              </td>
              <td className="px-4 py-3">
                <span className="font-mono text-sm font-bold text-ink">
                  {trade.ticker}
                </span>
                <span className="ml-2 hidden text-xs text-muted lg:inline">
                  {trade.assetName}
                </span>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 font-mono text-xs font-bold ${
                    trade.txType === "purchase"
                      ? "bg-money-in/10 text-money-in"
                      : "bg-money-out/10 text-money-out"
                  }`}
                >
                  {trade.txType}
                </span>
              </td>
              <td className="px-4 py-3 font-mono text-sm text-ink">
                {trade.amount}
              </td>
              <td className="hidden px-4 py-3 font-mono text-xs text-muted sm:table-cell">
                {trade.txDate}
              </td>
              <td className="hidden px-4 py-3 font-mono text-xs text-muted capitalize lg:table-cell">
                {trade.owner}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
