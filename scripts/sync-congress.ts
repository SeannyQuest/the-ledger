/**
 * Congress.gov Data Sync Script
 *
 * Syncs bills, votes, and cosponsors from the Congress.gov API into
 * the existing Legislation and LegislativeVote Prisma models.
 *
 * Usage:
 *   npx tsx scripts/sync-congress.ts
 *   npx tsx scripts/sync-congress.ts --seed         # Generate demo legislation data
 *   npx tsx scripts/sync-congress.ts --congress=118  # Specific congress
 *
 * Data sources:
 *   - Congress.gov API (api.congress.gov/v3) — requires free API key
 *   - House Clerk roll call XML (clerk.house.gov) — no key needed
 *
 * Set CONGRESS_API_KEY env var (get free at api.data.gov).
 */

import { PrismaClient } from "../src/generated/prisma";
import { normalizeName } from "../src/lib/entity-resolution";

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────

const API_BASE = "https://api.congress.gov/v3";
const API_KEY =
  process.env.CONGRESS_GOV_API_KEY ??
  process.env.CONGRESS_API_KEY ??
  "DEMO_KEY";
const RATE_LIMIT_MS = 1000; // Congress.gov is strict on rate limits
const HOUSE_CLERK_BASE = "https://clerk.house.gov/evs";

const args = process.argv.slice(2);
const seedMode = args.includes("--seed");
const congressArg = args.find((a) => a.startsWith("--congress="));
const congress = congressArg ? parseInt(congressArg.split("=")[1]) : 118;

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchApi<T>(
  endpoint: string,
  params: Record<string, string | number> = {},
): Promise<T> {
  const url = new URL(`${API_BASE}${endpoint}`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("format", "json");
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, String(v));
  }

  await sleep(RATE_LIMIT_MS);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API error ${res.status}: ${endpoint}`);
  return res.json() as Promise<T>;
}

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─────────────────────────────────────────────────────────────
// Seed Mode
// ─────────────────────────────────────────────────────────────

const POLICY_AREAS = [
  "Armed Forces and National Security",
  "Commerce",
  "Economics and Public Finance",
  "Education",
  "Energy",
  "Environmental Protection",
  "Finance and Financial Sector",
  "Government Operations and Politics",
  "Health",
  "Immigration",
  "International Affairs",
  "Labor and Employment",
  "Law",
  "Science, Technology, Communications",
  "Social Welfare",
  "Taxation",
  "Transportation and Public Works",
];

const BILL_STATUSES = [
  "Introduced",
  "Passed House",
  "Passed Senate",
  "Became Law",
  "Referred to Committee",
  "Reported by Committee",
  "Failed",
];

const VOTE_POSITIONS = ["YEA", "NAY", "PRESENT", "NOT_VOTING"] as const;

async function seedLegislationData() {
  console.log("=== Seeding Legislation & Vote Data ===\n");

  const politicians = await prisma.entity.findMany({
    where: { type: "POLITICIAN" },
    select: {
      id: true,
      canonicalName: true,
      party: true,
      state: true,
      office: true,
    },
  });

  if (politicians.length === 0) {
    console.log("No politician entities found. Run seed-demo-data.ts first.");
    return;
  }

  console.log(`Found ${politicians.length} politicians`);

  // Generate 30 bills
  const billTitles = [
    "Securing America's Future Energy Act",
    "Clean Air Standards Modernization Act",
    "Digital Privacy Protection Act",
    "Infrastructure Investment and Jobs Act",
    "Veterans Health Care Improvement Act",
    "Small Business Tax Relief Act",
    "Cybersecurity Enhancement Act",
    "Medicare Drug Price Negotiation Act",
    "Border Security and Immigration Reform Act",
    "Education Funding Equity Act",
    "National Defense Authorization Act",
    "Banking Transparency Act",
    "Climate Resilience and Innovation Act",
    "Social Security Strengthening Act",
    "Tech Platform Accountability Act",
    "Farm and Food Security Act",
    "Housing Affordability Act",
    "Election Integrity and Access Act",
    "Criminal Justice Reform Act",
    "AI Safety and Innovation Act",
    "Water Infrastructure Modernization Act",
    "Trade Fairness and Reciprocity Act",
    "Student Loan Relief Act",
    "Opioid Crisis Response Act",
    "Rural Broadband Expansion Act",
    "Government Accountability Act",
    "Pandemic Preparedness Act",
    "Retirement Security Act",
    "Green Energy Transition Act",
    "Tax Simplification Act",
  ];

  let billsCreated = 0;
  let votesCreated = 0;

  for (let i = 0; i < billTitles.length; i++) {
    const billType = randomElement(["hr", "s", "hjres", "sjres"]);
    const billNumber = String(1000 + i);
    const billId = `${congress}-${billType}-${billNumber}`;
    const sponsor = randomElement(politicians);
    const introduced = new Date(
      2023,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1,
    );
    const policyArea = randomElement(POLICY_AREAS);
    const status = randomElement(BILL_STATUSES);

    try {
      const legislation = await prisma.legislation.upsert({
        where: { billId },
        update: {},
        create: {
          billId,
          billType,
          billNumber,
          congress,
          title: billTitles[i],
          summary: `This legislation addresses ${policyArea.toLowerCase()} policy priorities for the ${congress}th Congress.`,
          introducedDate: introduced,
          lastActionDate: new Date(
            introduced.getTime() + Math.random() * 180 * 24 * 60 * 60 * 1000,
          ),
          status,
          sponsorEntityId: sponsor.id,
          policyArea,
          subjects: [policyArea],
        },
      });
      billsCreated++;
      console.log(`  Bill: ${billId} — ${billTitles[i]}`);

      // Generate votes for bills that passed a chamber
      if (["Passed House", "Passed Senate", "Became Law"].includes(status)) {
        const voteDate = new Date(
          introduced.getTime() + Math.random() * 90 * 24 * 60 * 60 * 1000,
        );
        const chamber = billType.startsWith("h") ? "House" : "Senate";

        const voteRecords = politicians.map((pol) => {
          const isPartyOfSponsor = pol.party === sponsor.party;
          const r = Math.random();
          let position: (typeof VOTE_POSITIONS)[number];

          if (r < 0.05) {
            position = "NOT_VOTING";
          } else if (r < 0.08) {
            position = "PRESENT";
          } else if (isPartyOfSponsor) {
            position = r < 0.85 ? "YEA" : "NAY";
          } else {
            position = r < 0.2 ? "YEA" : "NAY";
          }

          return {
            voteId: `${billId}-${pol.id}`,
            entityId: pol.id,
            legislationId: legislation.id,
            chamber,
            voteDate,
            position,
            congress,
            session: 1,
            rollNumber: 100 + i,
          };
        });

        const result = await prisma.legislativeVote.createMany({
          data: voteRecords,
          skipDuplicates: true,
        });
        votesCreated += result.count;
        console.log(`    → ${result.count} votes`);
      }
    } catch {
      // Skip duplicates
    }
  }

  console.log(`\nCreated ${billsCreated} bills and ${votesCreated} votes`);
}

// ─────────────────────────────────────────────────────────────
// Live Mode — fetch from Congress.gov API
// ─────────────────────────────────────────────────────────────

async function syncFromCongressGov() {
  console.log(`=== Syncing Congress.gov Data (${congress}th Congress) ===\n`);

  // Get politician entities for matching
  const politicians = await prisma.entity.findMany({
    where: { type: "POLITICIAN" },
    select: { id: true, canonicalName: true, state: true },
  });

  const politicianMap = new Map<string, string>();
  for (const p of politicians) {
    politicianMap.set(normalizeName(p.canonicalName), p.id);
  }

  const syncLog = await prisma.syncLog.create({
    data: {
      source: "CONGRESS_GOV",
      syncType: "bills_votes",
      status: "RUNNING",
    },
  });

  let billsProcessed = 0;
  let billsCreated = 0;

  // Fetch recent significant bills
  const billTypes = ["hr", "s", "sjres", "hjres", "sconres", "hconres", "sres", "hres"];
  for (const billType of billTypes) {
    try {
      const data = await fetchApi<any>(`/bill/${congress}/${billType}`, {
        limit: 250,
        sort: "updateDate+desc",
      });

      for (const billSummary of data.bills ?? []) {
        billsProcessed++;

        // Fetch full bill details
        try {
          const billData = await fetchApi<any>(
            `/bill/${congress}/${billType}/${billSummary.number}`,
          );
          const bill = billData.bill;
          if (!bill) continue;

          const sponsor = bill.sponsors?.[0];
          let sponsorEntityId: string | null = null;

          if (sponsor?.fullName) {
            const normalized = normalizeName(sponsor.fullName);
            sponsorEntityId = politicianMap.get(normalized) ?? null;

            // Try last name match
            if (!sponsorEntityId && sponsor.lastName) {
              for (const [norm, id] of politicianMap) {
                if (norm.includes(normalizeName(sponsor.lastName))) {
                  sponsorEntityId = id;
                  break;
                }
              }
            }
          }

          const billId = `${congress}-${billType}-${billSummary.number}`;

          await prisma.legislation.upsert({
            where: { billId },
            update: {
              lastActionDate: bill.latestAction?.actionDate
                ? new Date(bill.latestAction.actionDate)
                : undefined,
              status: bill.latestAction?.text?.slice(0, 200) ?? undefined,
            },
            create: {
              billId,
              billType,
              billNumber: String(billSummary.number),
              congress,
              title: bill.title ?? billSummary.title ?? "Untitled",
              summary: bill.summary?.text?.slice(0, 2000) ?? null,
              introducedDate: new Date(
                bill.introducedDate ??
                  billSummary.latestAction?.actionDate ??
                  Date.now(),
              ),
              lastActionDate: bill.latestAction?.actionDate
                ? new Date(bill.latestAction.actionDate)
                : null,
              status: bill.latestAction?.text?.slice(0, 200) ?? null,
              sponsorEntityId,
              policyArea: bill.policyArea?.name ?? null,
              subjects:
                bill.subjects?.legislativeSubjects?.map((s: any) => s.name) ??
                [],
            },
          });

          billsCreated++;
          console.log(`  ${billId}: ${(bill.title ?? "").slice(0, 60)}`);
        } catch (err) {
          console.log(
            `  Error fetching bill ${billType}/${billSummary.number}: ${err}`,
          );
        }
      }
    } catch (err) {
      console.log(`Error fetching ${billType} bills: ${err}`);
    }
  }

  await prisma.syncLog.update({
    where: { id: syncLog.id },
    data: {
      status: "COMPLETED",
      completedAt: new Date(),
      recordsProcessed: billsProcessed,
      recordsCreated: billsCreated,
      metadata: { congress, billsProcessed, billsCreated },
    },
  });

  console.log(
    `\nProcessed ${billsProcessed} bills, created/updated ${billsCreated}`,
  );
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────

async function main() {
  try {
    if (seedMode) {
      await seedLegislationData();
    } else {
      await syncFromCongressGov();
    }
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
