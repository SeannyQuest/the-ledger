/**
 * Senate LDA Lobbying Data Sync
 *
 * Syncs lobbying registrations and quarterly activity reports from
 * the Senate Lobbying Disclosure Act API (lda.senate.gov/api/).
 *
 * Usage: npx tsx scripts/sync-lobbying.ts [--registrations] [--filings]
 */

import { PrismaClient } from "../src/generated/prisma";
import { normalizeName } from "../src/lib/entity-resolution";

const prisma = new PrismaClient();
const BASE_URL = "https://lda.senate.gov/api/v1";
const DELAY_MS = 500;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
      });
      if (res.ok) return res;
      if (res.status === 429) {
        console.log(`  Rate limited, waiting ${(i + 1) * 2}s...`);
        await sleep((i + 1) * 2000);
        continue;
      }
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    } catch (err) {
      if (i === retries - 1) throw err;
      await sleep(1000);
    }
  }
  throw new Error("Max retries exceeded");
}

// ─── Sync Lobbying Filings ──────────────────────────────────────────────

interface LDAFiling {
  filing_uuid: string;
  filing_type: string;
  filing_type_display: string;
  filing_year: number;
  filing_period: string;
  filing_period_display: string;
  filing_date: string | null;
  dt_posted: string;
  registrant: {
    id: number;
    name: string;
    description: string;
  };
  client: {
    id: number;
    name: string;
    description: string;
    state: string;
    country: string;
  };
  income: string | null;
  expenses: string | null;
  lobbying_activities: Array<{
    general_issue_code: string;
    general_issue_code_display: string;
    description: string;
    lobbyists: Array<{
      lobbyist: { id: number; first_name: string; last_name: string };
      covered_position: string;
    }>;
  }>;
}

async function syncFilings(year: number = new Date().getFullYear()) {
  const syncLog = await prisma.syncLog.create({
    data: {
      source: "SENATE_LDA",
      syncType: "lobbying_filings",
      status: "RUNNING",
      startedAt: new Date(),
    },
  });

  let totalProcessed = 0;
  let totalCreated = 0;
  let totalUpdated = 0;

  console.log(`\n=== Syncing LDA Filings for ${year} ===`);

  // The Senate LDA API requires specific quarter filing types: Q1, Q2, Q3, Q4
  const quarters = ["Q1", "Q2", "Q3", "Q4"];

  try {
    for (const quarter of quarters) {
      let page = 1;
      let hasNext = true;

      console.log(`\n--- Quarter: ${quarter} ---`);

      while (hasNext) {
        const url = `${BASE_URL}/filings/?filing_year=${year}&filing_type=${quarter}&page=${page}&page_size=25`;
        console.log(`  Fetching page ${page}...`);

        const res = await fetchWithRetry(url);
        const data = await res.json();

        const results: LDAFiling[] = data.results ?? [];
        hasNext = !!data.next;

        for (const filing of results) {
          try {
            // Find or create registrant entity (lobbying firm)
            const registrantEntity = await findOrCreateEntity(
              filing.registrant.name,
              "LOBBYING_FIRM",
              `lda_registrant_${filing.registrant.id}`
            );

            // Find or create client entity (corporation, union, etc.)
            const clientEntity = await findOrCreateEntity(
              filing.client.name,
              "CORPORATION",
              `lda_client_${filing.client.id}`
            );

            // Parse amount
            const amount = parseFloat(filing.income ?? filing.expenses ?? "0");

            // Upsert filing
            const existing = await prisma.lobbyingFiling.findUnique({
              where: { filingId: filing.filing_uuid },
            });

            if (existing) {
              await prisma.lobbyingFiling.update({
                where: { filingId: filing.filing_uuid },
                data: {
                  amount,
                  lobbyists: filing.lobbying_activities.flatMap((a) =>
                    a.lobbyists.map((l) => ({
                      name: `${l.lobbyist.first_name} ${l.lobbyist.last_name}`,
                      coveredPosition: l.covered_position,
                    }))
                  ),
                  issues: filing.lobbying_activities.map((a) => ({
                    code: a.general_issue_code,
                    display: a.general_issue_code_display,
                    description: a.description,
                  })),
                },
              });
              totalUpdated++;
            } else {
              await prisma.lobbyingFiling.create({
                data: {
                  filingId: filing.filing_uuid,
                  filingType: filing.filing_type,
                  registrantEntityId: registrantEntity.id,
                  clientEntityId: clientEntity.id,
                  amount,
                  filingDate: new Date(filing.dt_posted || filing.filing_date || new Date().toISOString()),
                  filingYear: filing.filing_year,
                  filingPeriod: filing.filing_period,
                  lobbyists: filing.lobbying_activities.flatMap((a) =>
                    a.lobbyists.map((l) => ({
                      name: `${l.lobbyist.first_name} ${l.lobbyist.last_name}`,
                      coveredPosition: l.covered_position,
                    }))
                  ),
                  issues: filing.lobbying_activities.map((a) => ({
                    code: a.general_issue_code,
                    display: a.general_issue_code_display,
                    description: a.description,
                  })),
                },
              });
              totalCreated++;
            }

            // Create money transaction (client pays lobbying firm)
            if (amount > 0) {
              await prisma.moneyTransaction.upsert({
                where: {
                  dataSource_sourceTransactionId: {
                    dataSource: "SENATE_LDA",
                    sourceTransactionId: filing.filing_uuid,
                  },
                },
                create: {
                  sourceEntityId: clientEntity.id,
                  targetEntityId: registrantEntity.id,
                  transactionType: "LOBBYING_PAYMENT",
                  direction: "OUTFLOW",
                  amount,
                  transactionDate: new Date(filing.dt_posted || filing.filing_date || new Date().toISOString()),
                  dataSource: "SENATE_LDA",
                  sourceTransactionId: filing.filing_uuid,
                  sourceName: filing.client.name,
                  targetName: filing.registrant.name,
                },
                update: {
                  amount,
                },
              });
            }

            totalProcessed++;
          } catch (err) {
            console.error(`  Error processing filing ${filing.filing_uuid}:`, err);
          }
        }

        console.log(`  Page ${page}: ${results.length} filings (${totalProcessed} total)`);
        page++;
        await sleep(DELAY_MS);

        // Safety limit per quarter for DEMO purposes
        if (page > 20) {
          console.log("  Reached page limit (20 pages), stopping this quarter.");
          break;
        }
      }
    }

    await prisma.syncLog.update({
      where: { id: syncLog.id },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
        recordsProcessed: totalProcessed,
        recordsCreated: totalCreated,
        recordsUpdated: totalUpdated,
      },
    });

    console.log(`\n  Done: ${totalProcessed} processed, ${totalCreated} created, ${totalUpdated} updated`);
  } catch (err) {
    await prisma.syncLog.update({
      where: { id: syncLog.id },
      data: {
        status: "FAILED",
        completedAt: new Date(),
        recordsProcessed: totalProcessed,
        errorMessage: err instanceof Error ? err.message : String(err),
      },
    });
    console.error("Sync failed:", err);
  }
}

// ─── Entity Helpers ──────────────────────────────────────────────────────

async function findOrCreateEntity(
  name: string,
  type: "LOBBYING_FIRM" | "CORPORATION" | "LOBBYIST",
  sourceId: string
) {
  const aliasNorm = normalizeName(name);

  // Check if we already have this entity via alias
  const existingAlias = await prisma.entityAlias.findFirst({
    where: { aliasNorm, source: "SENATE_LDA" },
    include: { entity: true },
  });

  if (existingAlias) return existingAlias.entity;

  // Create new entity
  const entity = await prisma.entity.create({
    data: {
      type,
      canonicalName: name,
      shortName: name.length > 30 ? name.slice(0, 30) : null,
    },
  });

  // Create alias
  await prisma.entityAlias.create({
    data: {
      entityId: entity.id,
      alias: name,
      aliasNorm,
      source: "SENATE_LDA",
      confidence: "EXACT",
    },
  });

  // Create source record
  await prisma.entitySourceRecord.create({
    data: {
      entityId: entity.id,
      source: "SENATE_LDA",
      sourceId,
      sourceIdType: "lda_id",
    },
  });

  return entity;
}

// ─── Main ────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const year = args.find((a) => /^\d{4}$/.test(a))
    ? parseInt(args.find((a) => /^\d{4}$/.test(a))!)
    : new Date().getFullYear();

  console.log("=== Daonra | Senate LDA Lobbying Sync ===");
  console.log(`Target year: ${year}`);

  await syncFilings(year);

  console.log("\n=== Sync Complete ===");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
