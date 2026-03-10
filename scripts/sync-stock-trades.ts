/**
 * Congressional Stock Trading Sync Script
 *
 * Syncs congressional stock trade disclosures into the Ledger database.
 *
 * Data sources:
 *   - House Clerk Financial Disclosures XML (filing metadata)
 *   - Seed mode: generates realistic trades for existing politician entities
 *
 * Usage:
 *   npx tsx scripts/sync-stock-trades.ts
 *   npx tsx scripts/sync-stock-trades.ts --seed     # Generate demo trade data
 *   npx tsx scripts/sync-stock-trades.ts --year=2024
 *
 * The House Clerk publishes an XML index of all financial disclosures at:
 *   https://disclosures-clerk.house.gov/public_disc/financial-pdfs/{year}FD.xml
 *
 * Filing types: P = Periodic Transaction Report (the stock trades we want)
 */

import { PrismaClient, Prisma } from "../src/generated/prisma";
import { normalizeName } from "../src/lib/entity-resolution";

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────

const HOUSE_CLERK_BASE = "https://disclosures-clerk.house.gov/public_disc/financial-pdfs";
const DEFAULT_YEAR = new Date().getFullYear();

// CLI flags
const args = process.argv.slice(2);
const seedMode = args.includes("--seed");
const yearArg = args.find((a) => a.startsWith("--year="));
const year = yearArg ? parseInt(yearArg.split("=")[1]) : DEFAULT_YEAR;

// ─────────────────────────────────────────────────────────────
// Common traded stocks by sector — for seed data
// ─────────────────────────────────────────────────────────────

const COMMON_STOCKS = [
  { ticker: "AAPL", name: "Apple Inc", sector: "Technology" },
  { ticker: "MSFT", name: "Microsoft Corporation", sector: "Technology" },
  { ticker: "GOOGL", name: "Alphabet Inc Class A", sector: "Technology" },
  { ticker: "AMZN", name: "Amazon.com Inc", sector: "Technology" },
  { ticker: "NVDA", name: "NVIDIA Corporation", sector: "Technology" },
  { ticker: "META", name: "Meta Platforms Inc", sector: "Technology" },
  { ticker: "TSLA", name: "Tesla Inc", sector: "Automotive" },
  { ticker: "JPM", name: "JPMorgan Chase & Co", sector: "Finance" },
  { ticker: "V", name: "Visa Inc", sector: "Finance" },
  { ticker: "JNJ", name: "Johnson & Johnson", sector: "Healthcare" },
  { ticker: "UNH", name: "UnitedHealth Group", sector: "Healthcare" },
  { ticker: "PFE", name: "Pfizer Inc", sector: "Healthcare" },
  { ticker: "LMT", name: "Lockheed Martin Corporation", sector: "Defense" },
  { ticker: "RTX", name: "RTX Corporation", sector: "Defense" },
  { ticker: "BA", name: "Boeing Company", sector: "Defense" },
  { ticker: "NOC", name: "Northrop Grumman Corporation", sector: "Defense" },
  { ticker: "GD", name: "General Dynamics Corporation", sector: "Defense" },
  { ticker: "XOM", name: "Exxon Mobil Corporation", sector: "Energy" },
  { ticker: "CVX", name: "Chevron Corporation", sector: "Energy" },
  { ticker: "COP", name: "ConocoPhillips", sector: "Energy" },
  { ticker: "T", name: "AT&T Inc", sector: "Telecom" },
  { ticker: "VZ", name: "Verizon Communications", sector: "Telecom" },
  { ticker: "DIS", name: "Walt Disney Company", sector: "Media" },
  { ticker: "NFLX", name: "Netflix Inc", sector: "Media" },
  { ticker: "WMT", name: "Walmart Inc", sector: "Retail" },
  { ticker: "COST", name: "Costco Wholesale", sector: "Retail" },
  { ticker: "KO", name: "Coca-Cola Company", sector: "Consumer" },
  { ticker: "PG", name: "Procter & Gamble", sector: "Consumer" },
];

const AMOUNT_RANGES = [
  { label: "$1,001 - $15,000", low: 1001, high: 15000 },
  { label: "$15,001 - $50,000", low: 15001, high: 50000 },
  { label: "$50,001 - $100,000", low: 50001, high: 100000 },
  { label: "$100,001 - $250,000", low: 100001, high: 250000 },
  { label: "$250,001 - $500,000", low: 250001, high: 500000 },
  { label: "$500,001 - $1,000,000", low: 500001, high: 1000000 },
  { label: "$1,000,001 - $5,000,000", low: 1000001, high: 5000000 },
];

const TX_TYPES = ["purchase", "sale"];
const OWNERS = ["self", "spouse", "joint", "child"];

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(startYear: number, endYear: number): Date {
  const start = new Date(startYear, 0, 1).getTime();
  const end = new Date(endYear, 11, 31).getTime();
  return new Date(start + Math.random() * (end - start));
}

function weightedAmountRange(): (typeof AMOUNT_RANGES)[number] {
  // Most trades are in the lower ranges
  const weights = [40, 25, 15, 10, 5, 3, 2];
  const total = weights.reduce((s, w) => s + w, 0);
  let r = Math.random() * total;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r <= 0) return AMOUNT_RANGES[i];
  }
  return AMOUNT_RANGES[0];
}

// ─────────────────────────────────────────────────────────────
// Seed Mode — generate realistic demo trade data
// ─────────────────────────────────────────────────────────────

async function seedTradeData() {
  console.log("=== Seeding Congressional Trade Data ===\n");

  // Find all politician entities
  const politicians = await prisma.entity.findMany({
    where: { type: "POLITICIAN" },
    select: {
      id: true,
      canonicalName: true,
      state: true,
      district: true,
      party: true,
      office: true,
    },
  });

  if (politicians.length === 0) {
    console.log("No politician entities found. Run seed-demo-data.ts first.");
    return;
  }

  console.log(`Found ${politicians.length} politician entities`);

  // Generate 5-20 trades per politician
  let totalCreated = 0;

  for (const pol of politicians) {
    const tradeCount = 5 + Math.floor(Math.random() * 16);
    const chamber = pol.office === "SENATE" ? "senate" : "house";
    const district = pol.state
      ? `${pol.state}${pol.district ? `-${pol.district}` : ""}`
      : null;

    for (let i = 0; i < tradeCount; i++) {
      const stock = randomElement(COMMON_STOCKS);
      const range = weightedAmountRange();
      const txDate = randomDate(2022, 2025);
      const discDate = new Date(txDate);
      discDate.setDate(discDate.getDate() + Math.floor(Math.random() * 45) + 15);

      const sourceId = `seed-${pol.id}-${i}`;

      try {
        await prisma.congressionalTrade.upsert({
          where: { sourceId },
          update: {},
          create: {
            entityId: pol.id,
            representative: pol.canonicalName,
            ticker: stock.ticker,
            assetName: stock.name,
            txType: randomElement(TX_TYPES),
            txDate,
            disclosureDate: discDate,
            amount: range.label,
            amountLow: range.low,
            amountHigh: range.high,
            owner: randomElement(OWNERS),
            chamber,
            district,
            party: pol.party ?? null,
            sourceId,
          },
        });
        totalCreated++;
      } catch {
        // Skip duplicates
      }
    }

    console.log(`  ${pol.canonicalName}: ${tradeCount} trades`);
  }

  console.log(`\nCreated ${totalCreated} trade records`);
}

// ─────────────────────────────────────────────────────────────
// Live Mode — fetch from House Clerk XML
// ─────────────────────────────────────────────────────────────

interface HouseClerkFiling {
  first: string;
  last: string;
  prefix: string;
  suffix: string;
  filingType: string;
  stateDist: string;
  year: string;
  filingDate: string;
  docId: string;
}

async function fetchHouseClerkFilings(filingYear: number): Promise<HouseClerkFiling[]> {
  const url = `${HOUSE_CLERK_BASE}/${filingYear}FD.xml`;
  console.log(`Fetching House Clerk filings from: ${url}`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch House Clerk XML: ${response.status}`);
  }

  const xml = await response.text();
  const filings: HouseClerkFiling[] = [];

  // Simple XML parser — extract <Member> blocks
  const memberRegex = /<Member>([\s\S]*?)<\/Member>/g;
  let match;

  while ((match = memberRegex.exec(xml)) !== null) {
    const block = match[1];
    const get = (tag: string): string => {
      const m = block.match(new RegExp(`<${tag}>(.*?)</${tag}>`));
      return m ? m[1].trim() : "";
    };

    const filingType = get("FilingType");
    // Only want P = Periodic Transaction Report
    if (filingType !== "P") continue;

    filings.push({
      first: get("First"),
      last: get("Last"),
      prefix: get("Prefix"),
      suffix: get("Suffix"),
      filingType,
      stateDist: get("StateDst"),
      year: get("Year"),
      filingDate: get("FilingDate"),
      docId: get("DocID"),
    });
  }

  return filings;
}

async function syncFromHouseClerk() {
  console.log(`=== Syncing House Clerk PTR Filings (${year}) ===\n`);

  const filings = await fetchHouseClerkFilings(year);
  console.log(`Found ${filings.length} PTR filings\n`);

  // Get all politician entities for matching
  const politicians = await prisma.entity.findMany({
    where: { type: "POLITICIAN" },
    select: { id: true, canonicalName: true, state: true },
  });

  const politicianMap = new Map<string, string>();
  for (const p of politicians) {
    politicianMap.set(normalizeName(p.canonicalName), p.id);
  }

  let matched = 0;
  let unmatched = 0;

  // Log sync job
  const syncLog = await prisma.syncLog.create({
    data: {
      source: "HOUSE_STOCK_WATCHER",
      syncType: "house_clerk_ptr",
      status: "RUNNING",
    },
  });

  for (const filing of filings) {
    const fullName = `${filing.first} ${filing.last}`.trim();
    const normalized = normalizeName(fullName);

    // Try to match to existing entity
    let entityId = politicianMap.get(normalized);

    // Try last name + state match if direct match fails
    if (!entityId && filing.stateDist) {
      const state = filing.stateDist.slice(0, 2);
      for (const [norm, id] of politicianMap) {
        if (norm.includes(normalizeName(filing.last)) && state) {
          const entity = politicians.find((p) => p.id === id);
          if (entity?.state === state) {
            entityId = id;
            break;
          }
        }
      }
    }

    if (entityId) {
      matched++;
      console.log(`  Matched: ${fullName} (${filing.stateDist})`);
    } else {
      unmatched++;
      if (unmatched <= 10) {
        console.log(`  Unmatched: ${fullName} (${filing.stateDist})`);
      }
    }
  }

  // Update sync log
  await prisma.syncLog.update({
    where: { id: syncLog.id },
    data: {
      status: "COMPLETED",
      completedAt: new Date(),
      recordsProcessed: filings.length,
      recordsCreated: matched,
      metadata: { matched, unmatched, year },
    },
  });

  console.log(`\nResults: ${matched} matched, ${unmatched} unmatched out of ${filings.length} filings`);
  console.log(
    "\nNote: XML provides filing metadata only. Use --seed to generate trade data,",
    "\nor implement PDF parsing for production trade details.",
  );
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────

async function main() {
  try {
    if (seedMode) {
      await seedTradeData();
    } else {
      await syncFromHouseClerk();
    }
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
