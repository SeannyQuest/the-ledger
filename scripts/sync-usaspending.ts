/**
 * sync-usaspending.ts
 *
 * Syncs federal contract/award data from USASpending.gov into The Ledger.
 *
 * Usage:
 *   npx tsx scripts/sync-usaspending.ts
 *
 * USASpending API docs: https://api.usaspending.gov
 * No API key required — completely free.
 */

import { PrismaClient } from "@/generated/prisma";
import { normalizeName } from "@/lib/entity-resolution";

const prisma = new PrismaClient();

const BASE_URL = "https://api.usaspending.gov";
const REQUEST_DELAY_MS = 300;
const TOP_RECIPIENTS_LIMIT = 100;
const AWARDS_PER_RECIPIENT = 50;

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson<T = unknown>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "(no body)");
    throw new Error(
      `USASpending API error: ${res.status} ${res.statusText} — ${url}\n${body}`
    );
  }
  return res.json() as Promise<T>;
}

async function postJson<T = unknown>(url: string, body: object): Promise<T> {
  return fetchJson<T>(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// ─────────────────────────────────────────────────────────────
// API Types (subset of USASpending response shapes)
// ─────────────────────────────────────────────────────────────

interface RecipientListResult {
  page_metadata: { page: number; total: number; limit: number; hasNext: boolean };
  results: Array<{
    id: string;
    name: string;
    recipient_level: string;
    amount: number;
    duns: string | null;
    uei: string | null;
  }>;
}

interface RecipientDetail {
  name: string;
  recipient_id: string;
  recipient_level: string;
  parent_name: string | null;
  parent_id: string | null;
  business_types: string[];
  location: {
    address_line1: string | null;
    city_name: string | null;
    state_code: string | null;
    zip: string | null;
    country_code: string | null;
  } | null;
  total_transaction_amount: number;
  total_face_value_loan_amount: number;
}

interface AwardSearchResult {
  page_metadata: { page: number; hasNext: boolean };
  results: Array<{
    internal_id: number;
    "Award ID": string;
    "Award Amount": number;
    "Total Outlays": number;
    "Description": string;
    "Start Date": string | null;
    "End Date": string | null;
    "Awarding Agency": string;
    "Awarding Sub Agency": string;
    "Award Type": string;
    Recipient: string;
    recipient_id: string | null;
    "Place of Performance State Code": string | null;
    "Place of Performance Country Code": string | null;
    "generated_internal_id": string;
    "NAICS Code": string | null;
    "PSC Code": string | null;
  }>;
}

interface AgencyRef {
  results: Array<{
    agency_id: number;
    toptier_flag: boolean;
    agency_name: string;
    toptier_code: string;
    abbreviation: string | null;
  }>;
}

// ─────────────────────────────────────────────────────────────
// Entity Resolution
// ─────────────────────────────────────────────────────────────

/**
 * Find or create an Entity for a given name and type.
 * Uses normalized name matching and creates an EntityAlias + EntitySourceRecord.
 */
async function findOrCreateEntity(
  name: string,
  type: "CORPORATION" | "GOVERNMENT_AGENCY",
  sourceId: string,
  sourceIdType: string,
  extraFields?: { state?: string; naicsCode?: string }
): Promise<string> {
  const normalized = normalizeName(name);

  // Try to find existing entity by alias
  const existingAlias = await prisma.entityAlias.findFirst({
    where: { aliasNorm: normalized, source: "USASPENDING" },
    select: { entityId: true },
  });

  if (existingAlias) {
    // Ensure source record exists
    await prisma.entitySourceRecord.upsert({
      where: {
        source_sourceId_sourceIdType: {
          source: "USASPENDING",
          sourceId,
          sourceIdType,
        },
      },
      update: { lastSynced: new Date() },
      create: {
        entityId: existingAlias.entityId,
        source: "USASPENDING",
        sourceId,
        sourceIdType,
        lastSynced: new Date(),
      },
    });
    return existingAlias.entityId;
  }

  // Also try a broader normalized-name search across all sources
  const broadAlias = await prisma.entityAlias.findFirst({
    where: { aliasNorm: normalized },
    select: { entityId: true },
  });

  if (broadAlias) {
    // Found entity from another source — add USASPENDING alias and source record
    await prisma.entityAlias.create({
      data: {
        entityId: broadAlias.entityId,
        alias: name,
        aliasNorm: normalized,
        source: "USASPENDING",
        confidence: "HIGH",
      },
    });
    await prisma.entitySourceRecord.upsert({
      where: {
        source_sourceId_sourceIdType: {
          source: "USASPENDING",
          sourceId,
          sourceIdType,
        },
      },
      update: { lastSynced: new Date() },
      create: {
        entityId: broadAlias.entityId,
        source: "USASPENDING",
        sourceId,
        sourceIdType,
        lastSynced: new Date(),
      },
    });
    return broadAlias.entityId;
  }

  // Create new entity
  const entity = await prisma.entity.create({
    data: {
      type,
      canonicalName: name,
      ...(extraFields?.state ? { state: extraFields.state } : {}),
      ...(extraFields?.naicsCode ? { naicsCode: extraFields.naicsCode } : {}),
      aliases: {
        create: {
          alias: name,
          aliasNorm: normalized,
          source: "USASPENDING",
          confidence: "EXACT",
        },
      },
      sourceRecords: {
        create: {
          source: "USASPENDING",
          sourceId,
          sourceIdType,
          lastSynced: new Date(),
        },
      },
    },
  });

  return entity.id;
}

// Cache for agency entities to avoid repeated lookups
const agencyEntityCache = new Map<string, string>();

async function findOrCreateAgency(agencyName: string): Promise<string> {
  if (!agencyName) agencyName = "UNKNOWN AGENCY";

  const cached = agencyEntityCache.get(agencyName);
  if (cached) return cached;

  const entityId = await findOrCreateEntity(
    agencyName,
    "GOVERNMENT_AGENCY",
    `agency:${normalizeName(agencyName)}`,
    "AGENCY_NAME"
  );

  agencyEntityCache.set(agencyName, entityId);
  return entityId;
}

// ─────────────────────────────────────────────────────────────
// Sync: Top Recipients
// ─────────────────────────────────────────────────────────────

async function fetchTopRecipients(): Promise<RecipientListResult["results"]> {
  console.log(`Fetching top ${TOP_RECIPIENTS_LIMIT} recipients...`);

  const allResults: RecipientListResult["results"] = [];
  let page = 1;
  const limit = 50;

  while (allResults.length < TOP_RECIPIENTS_LIMIT) {
    const data = await postJson<RecipientListResult>(
      `${BASE_URL}/api/v2/recipient/`,
      {
        order: "desc",
        sort: "amount",
        limit,
        page,
        award_type: "all",
      }
    );

    if (!data.results || data.results.length === 0) break;
    allResults.push(...data.results);

    console.log(
      `  Page ${page}: fetched ${data.results.length} recipients (total: ${allResults.length})`
    );

    if (!data.page_metadata?.hasNext) break;
    page++;
    await sleep(REQUEST_DELAY_MS);
  }

  return allResults.slice(0, TOP_RECIPIENTS_LIMIT);
}

// ─────────────────────────────────────────────────────────────
// Sync: Awards for a Recipient
// ─────────────────────────────────────────────────────────────

async function fetchAwardsForRecipient(
  recipientId: string,
  recipientName: string
): Promise<AwardSearchResult["results"]> {
  const allResults: AwardSearchResult["results"] = [];
  let page = 1;
  const limit = 25;

  // Fiscal year range: last 3 years
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 3;

  while (allResults.length < AWARDS_PER_RECIPIENT) {
    try {
      const data = await postJson<AwardSearchResult>(
        `${BASE_URL}/api/v2/search/spending_by_award/`,
        {
          filters: {
            recipient_id: recipientId,
            time_period: [
              {
                start_date: `${startYear}-10-01`,
                end_date: `${currentYear}-09-30`,
              },
            ],
            award_type_codes: [
              "A", "B", "C", "D",  // Contracts
              "02", "03", "04", "05",  // Grants
            ],
          },
          fields: [
            "Award ID",
            "Award Amount",
            "Total Outlays",
            "Description",
            "Start Date",
            "End Date",
            "Awarding Agency",
            "Awarding Sub Agency",
            "Award Type",
            "Recipient",
            "recipient_id",
            "Place of Performance State Code",
            "Place of Performance Country Code",
            "generated_internal_id",
            "NAICS Code",
            "PSC Code",
          ],
          page,
          limit,
          sort: "Award Amount",
          order: "desc",
          subawards: false,
        }
      );

      if (!data.results || data.results.length === 0) break;
      allResults.push(...data.results);

      if (!data.page_metadata?.hasNext) break;
      page++;
      await sleep(REQUEST_DELAY_MS);
    } catch (err) {
      console.error(
        `  Error fetching awards page ${page} for ${recipientName}:`,
        err instanceof Error ? err.message : err
      );
      break;
    }
  }

  return allResults.slice(0, AWARDS_PER_RECIPIENT);
}

// ─────────────────────────────────────────────────────────────
// Sync: Process a single award
// ─────────────────────────────────────────────────────────────

interface AwardStats {
  processed: number;
  created: number;
  updated: number;
  errors: number;
}

async function processAward(
  award: AwardSearchResult["results"][0],
  recipientEntityId: string,
  stats: AwardStats
): Promise<void> {
  const awardId = award["generated_internal_id"] || award["Award ID"];
  if (!awardId) {
    stats.errors++;
    return;
  }

  try {
    const amount = award["Award Amount"] || 0;
    const dateStr = award["Start Date"];
    const dateAwarded = dateStr ? new Date(dateStr) : new Date();
    const endDateStr = award["End Date"];
    const dateCompleted = endDateStr ? new Date(endDateStr) : null;
    const agencyName = award["Awarding Agency"] || "UNKNOWN AGENCY";
    const awardType = award["Award Type"] || "UNKNOWN";
    const description = award["Description"] || null;
    const naicsCode = award["NAICS Code"] || null;
    const pscCode = award["PSC Code"] || null;
    const popState = award["Place of Performance State Code"] || null;

    // Determine transaction type from award type
    const isContract = ["A", "B", "C", "D", "IDV"].some(
      (t) => awardType.toUpperCase().includes(t) || awardType.toLowerCase().includes("contract")
    );
    const transactionType = isContract ? "FEDERAL_CONTRACT" : "FEDERAL_GRANT";

    // Find or create agency entity
    const agencyEntityId = await findOrCreateAgency(agencyName);

    // Upsert the FederalAward
    const existing = await prisma.federalAward.findUnique({
      where: { awardId },
    });

    if (existing) {
      await prisma.federalAward.update({
        where: { awardId },
        data: {
          amount,
          description,
          dateCompleted,
          naicsCode,
          pscCode,
          placeOfPerformanceState: popState,
          status: dateCompleted ? "COMPLETED" : "ACTIVE",
        },
      });
      stats.updated++;
    } else {
      await prisma.federalAward.create({
        data: {
          awardId,
          awardType,
          recipientEntityId,
          agencyEntityId,
          amount,
          description,
          dateAwarded,
          dateCompleted,
          naicsCode,
          pscCode,
          placeOfPerformanceState: popState,
          status: dateCompleted ? "COMPLETED" : "ACTIVE",
        },
      });
      stats.created++;
    }

    // Create MoneyTransaction (idempotent via sourceTransactionId)
    const existingTx = await prisma.moneyTransaction.findFirst({
      where: {
        dataSource: "USASPENDING",
        sourceTransactionId: awardId,
      },
    });

    if (!existingTx) {
      await prisma.moneyTransaction.create({
        data: {
          sourceEntityId: agencyEntityId,
          targetEntityId: recipientEntityId,
          transactionType,
          direction: "INFLOW",
          amount: Math.abs(amount),
          transactionDate: dateAwarded,
          dataSource: "USASPENDING",
          sourceTransactionId: awardId,
          sourceName: agencyName,
          targetName: award["Recipient"] || null,
          targetState: popState,
        },
      });
    }

    stats.processed++;
  } catch (err) {
    console.error(
      `  Error processing award ${awardId}:`,
      err instanceof Error ? err.message : err
    );
    stats.errors++;
  }
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log("=== USASpending.gov Data Sync ===");
  console.log(`Started at ${new Date().toISOString()}\n`);

  // Create SyncLog
  const syncLog = await prisma.syncLog.create({
    data: {
      source: "USASPENDING",
      syncType: "top_recipients_awards",
      status: "RUNNING",
    },
  });

  const stats: AwardStats = {
    processed: 0,
    created: 0,
    updated: 0,
    errors: 0,
  };

  try {
    // ── Step 1: Fetch top recipients ──
    const recipients = await fetchTopRecipients();
    console.log(`\nFetched ${recipients.length} top recipients.\n`);

    // ── Step 2: For each recipient, fetch awards ──
    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i];
      const recipientName = recipient.name || "UNKNOWN RECIPIENT";
      const recipientId = recipient.id;

      console.log(
        `[${i + 1}/${recipients.length}] ${recipientName} (${formatCurrency(recipient.amount)})`
      );

      if (!recipientId) {
        console.log("  Skipping — no recipient ID.");
        continue;
      }

      // Create/find entity for the recipient
      const sourceIdType = recipient.uei ? "UEI" : recipient.duns ? "DUNS" : "RECIPIENT_HASH";
      const sourceId = recipient.uei || recipient.duns || recipientId;

      const recipientEntityId = await findOrCreateEntity(
        recipientName,
        "CORPORATION",
        sourceId,
        sourceIdType,
        {}
      );

      // Fetch recent awards
      const awards = await fetchAwardsForRecipient(recipientId, recipientName);
      console.log(`  Found ${awards.length} awards.`);

      for (const award of awards) {
        await processAward(award, recipientEntityId, stats);
      }

      console.log(
        `  Progress — processed: ${stats.processed}, created: ${stats.created}, updated: ${stats.updated}, errors: ${stats.errors}`
      );
      await sleep(REQUEST_DELAY_MS);
    }

    // ── Step 3: Update SyncLog — success ──
    await prisma.syncLog.update({
      where: { id: syncLog.id },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
        recordsProcessed: stats.processed,
        recordsCreated: stats.created,
        recordsUpdated: stats.updated,
        metadata: {
          recipientsFetched: recipients.length,
          errors: stats.errors,
        },
      },
    });

    console.log("\n=== Sync Complete ===");
    console.log(`  Processed: ${stats.processed}`);
    console.log(`  Created:   ${stats.created}`);
    console.log(`  Updated:   ${stats.updated}`);
    console.log(`  Errors:    ${stats.errors}`);
    console.log(`  Finished at ${new Date().toISOString()}`);
  } catch (err) {
    console.error("\nFATAL ERROR:", err);

    await prisma.syncLog.update({
      where: { id: syncLog.id },
      data: {
        status: "FAILED",
        completedAt: new Date(),
        recordsProcessed: stats.processed,
        recordsCreated: stats.created,
        recordsUpdated: stats.updated,
        errorMessage: err instanceof Error ? err.message : String(err),
      },
    });

    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
}

main();
