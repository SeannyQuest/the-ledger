/**
 * FEC Data Sync Script
 *
 * Syncs candidate, committee, contribution, and disbursement data from the
 * OpenFEC API into the Ledger database.
 *
 * Usage:
 *   npx tsx --tsconfig tsconfig.json scripts/sync-fec.ts
 *   npx tsx --tsconfig tsconfig.json scripts/sync-fec.ts --candidates-only
 *   npx tsx --tsconfig tsconfig.json scripts/sync-fec.ts --committees-only
 *   npx tsx --tsconfig tsconfig.json scripts/sync-fec.ts --contributions-only
 *
 * Set FEC_API_KEY env var for higher rate limits (falls back to DEMO_KEY).
 */

import { PrismaClient, Prisma } from "@/generated/prisma";
import {
  normalizeName,
  parsePersonName,
  fecCommitteeToEntityType,
} from "@/lib/entity-resolution";

// ─────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────

const API_BASE = "https://api.open.fec.gov/v1";
const API_KEY = process.env.FEC_API_KEY ?? "DEMO_KEY";
const PER_PAGE = 100;
const RATE_LIMIT_MS = 500;
const MAX_PAGES_PER_ENDPOINT = 100; // Safety cap — OpenFEC caps at 100 pages for some endpoints
const TOP_COMMITTEES_FOR_TRANSACTIONS = 50; // Fetch transactions for top N committees by receipts

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
// CLI Flags
// ─────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const candidatesOnly = args.includes("--candidates-only");
const committeesOnly = args.includes("--committees-only");
const contributionsOnly = args.includes("--contributions-only");
const runAll = !candidatesOnly && !committeesOnly && !contributionsOnly;

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch a single page from the OpenFEC API with rate limiting.
 */
async function fetchFecPage<T>(
  endpoint: string,
  params: Record<string, string | number> = {},
): Promise<{
  results: T[];
  pagination: { pages: number; page: number; count: number };
}> {
  const url = new URL(`${API_BASE}${endpoint}`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("per_page", String(PER_PAGE));
  for (const [key, val] of Object.entries(params)) {
    url.searchParams.set(key, String(val));
  }

  await sleep(RATE_LIMIT_MS);

  const response = await fetch(url.toString());
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `FEC API ${response.status} on ${endpoint}: ${body.slice(0, 200)}`,
    );
  }

  return response.json();
}

/**
 * Paginate through all pages of an endpoint.
 * Yields each page of results.
 */
async function* paginateFec<T>(
  endpoint: string,
  params: Record<string, string | number> = {},
  maxPages = MAX_PAGES_PER_ENDPOINT,
): AsyncGenerator<T[], void, unknown> {
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages && page <= maxPages) {
    const data = await fetchFecPage<T>(endpoint, { ...params, page });
    totalPages = data.pagination.pages;
    yield data.results;
    page++;
  }
}

/**
 * Map FEC party code to our Party enum.
 */
function mapParty(
  fecParty: string | null | undefined,
):
  | "DEMOCRAT"
  | "REPUBLICAN"
  | "INDEPENDENT"
  | "LIBERTARIAN"
  | "GREEN"
  | "OTHER"
  | undefined {
  if (!fecParty) return undefined;
  const code = fecParty.toUpperCase();
  if (code === "DEM" || code === "D") return "DEMOCRAT";
  if (code === "REP" || code === "R") return "REPUBLICAN";
  if (code === "IND" || code === "I") return "INDEPENDENT";
  if (code === "LIB" || code === "L") return "LIBERTARIAN";
  if (code === "GRE" || code === "G") return "GREEN";
  return "OTHER";
}

/**
 * Map FEC office code to our Office enum.
 */
function mapOffice(
  fecOffice: string | null | undefined,
): "PRESIDENT" | "SENATE" | "HOUSE" | undefined {
  if (!fecOffice) return undefined;
  const code = fecOffice.toUpperCase();
  if (code === "P") return "PRESIDENT";
  if (code === "S") return "SENATE";
  if (code === "H") return "HOUSE";
  return undefined;
}

/**
 * Map the lowercase return from fecCommitteeToEntityType to the Prisma EntityType enum.
 */
function mapEntityType(
  typeStr: ReturnType<typeof fecCommitteeToEntityType>,
):
  | "PAC"
  | "SUPER_PAC"
  | "PARTY_COMMITTEE"
  | "CORPORATION"
  | "UNION"
  | "NONPROFIT" {
  const map = {
    pac: "PAC",
    super_pac: "SUPER_PAC",
    party_committee: "PARTY_COMMITTEE",
    corporation: "CORPORATION",
    union: "UNION",
    nonprofit: "NONPROFIT",
  } as const;
  return map[typeStr];
}

/**
 * Map FEC committee type code to our CommitteeType enum.
 */
function mapCommitteeType(
  committeeType: string | null | undefined,
):
  | "AUTHORIZED"
  | "NATIONAL_PARTY"
  | "STATE_PARTY"
  | "SUPER_PAC"
  | "HYBRID_PAC"
  | "LEADERSHIP"
  | "JOINT_FUNDRAISING"
  | "CAREY_COMMITTEE"
  | "OTHER" {
  if (!committeeType) return "OTHER";
  switch (committeeType.toUpperCase()) {
    case "H":
    case "P":
    case "S":
    case "A":
      return "AUTHORIZED";
    case "X":
      return "NATIONAL_PARTY";
    case "Y":
      return "STATE_PARTY";
    case "Z":
      return "NATIONAL_PARTY";
    case "O":
      return "SUPER_PAC";
    case "V":
      return "HYBRID_PAC";
    case "J":
      return "JOINT_FUNDRAISING";
    case "D":
      return "LEADERSHIP";
    default:
      return "OTHER";
  }
}

/**
 * Map FEC transaction type code to our TransactionType enum.
 */
function mapContributionType(
  receiptType: string | null | undefined,
):
  | "INDIVIDUAL_CONTRIBUTION"
  | "PAC_CONTRIBUTION"
  | "PARTY_CONTRIBUTION"
  | "CANDIDATE_CONTRIBUTION"
  | "CORPORATE_CONTRIBUTION"
  | "OTHER" {
  if (!receiptType) return "INDIVIDUAL_CONTRIBUTION";
  const code = receiptType.toUpperCase();
  // 11A = individual, 11C = PAC, 15 = contribution from party, 15C/15E = party
  // 24T = PAC earmarked, 10 = candidate contribution
  if (code.startsWith("11A") || code.startsWith("15A"))
    return "INDIVIDUAL_CONTRIBUTION";
  if (
    code.startsWith("11C") ||
    code.startsWith("24T") ||
    code.startsWith("24K")
  )
    return "PAC_CONTRIBUTION";
  if (code.startsWith("15") || code.startsWith("15E") || code.startsWith("15C"))
    return "PARTY_CONTRIBUTION";
  if (code.startsWith("10")) return "CANDIDATE_CONTRIBUTION";
  return "INDIVIDUAL_CONTRIBUTION";
}

// ─────────────────────────────────────────────────────────────
// FEC API Response Types
// ─────────────────────────────────────────────────────────────

interface FecCandidateResult {
  candidate_id: string;
  name: string;
  party: string | null;
  office: string | null;
  state: string | null;
  district: string | null;
  incumbent_challenge: string | null;
  election_years: number[] | null;
  // Financial fields (may not be present on all endpoints)
  total_receipts?: number | null;
  total_disbursements?: number | null;
  cash_on_hand_end_period?: number | null;
}

interface FecCommitteeResult {
  committee_id: string;
  name: string;
  designation: string | null;
  committee_type: string | null;
  organization_type: string | null;
  party: string | null;
  state: string | null;
  treasurer_name: string | null;
  candidate_ids: string[] | null;
  total_receipts?: number | null;
  total_disbursements?: number | null;
}

interface FecScheduleAResult {
  sub_id: string;
  committee_id: string;
  committee: { name: string } | null;
  contributor_name: string | null;
  contributor_employer: string | null;
  contributor_occupation: string | null;
  contributor_state: string | null;
  contribution_receipt_amount: number | null;
  contribution_receipt_date: string | null;
  receipt_type: string | null;
  filing_form: string | null;
  report_type: string | null;
  election_type: string | null;
  two_year_transaction_period: number | null;
  line_number: string | null;
}

interface FecScheduleBResult {
  sub_id: string;
  committee_id: string;
  committee: { name: string } | null;
  recipient_name: string | null;
  recipient_state: string | null;
  disbursement_amount: number | null;
  disbursement_date: string | null;
  disbursement_description: string | null;
  disbursement_type: string | null;
  report_type: string | null;
  two_year_transaction_period: number | null;
}

// ─────────────────────────────────────────────────────────────
// Sync: Candidates
// ─────────────────────────────────────────────────────────────

async function syncCandidates(): Promise<{
  processed: number;
  created: number;
  updated: number;
}> {
  console.log("\n========== Syncing FEC Candidates ==========");

  let processed = 0;
  let created = 0;
  let updated = 0;

  // Fetch current-cycle candidates sorted by total receipts (most active first)
  const currentCycle =
    new Date().getFullYear() % 2 === 0
      ? new Date().getFullYear()
      : new Date().getFullYear() + 1;
  const paginator = paginateFec<FecCandidateResult>("/candidates/", {
    sort: "-first_file_date",
    cycle: currentCycle,
    candidate_status: "C", // Current candidates
    is_active_candidate: "true",
  });

  for await (const page of paginator) {
    for (const candidate of page) {
      try {
        const parsedName = parsePersonName(candidate.name);
        const normalizedName = normalizeName(parsedName.full);
        const party = mapParty(candidate.party);
        const office = mapOffice(candidate.office);

        // 1. Upsert FecCandidate raw record
        const existing = await prisma.fecCandidate.findUnique({
          where: { candidateId: candidate.candidate_id },
        });

        let fecRecord;
        if (existing) {
          fecRecord = await prisma.fecCandidate.update({
            where: { candidateId: candidate.candidate_id },
            data: {
              name: candidate.name,
              party: candidate.party,
              office: candidate.office,
              state: candidate.state,
              district: candidate.district,
              incumbentChallenge: candidate.incumbent_challenge,
              electionYears: candidate.election_years ?? [],
              totalReceipts: new Prisma.Decimal(candidate.total_receipts ?? 0),
              totalDisbursements: new Prisma.Decimal(
                candidate.total_disbursements ?? 0,
              ),
              cashOnHand: new Prisma.Decimal(
                candidate.cash_on_hand_end_period ?? 0,
              ),
            },
          });
          updated++;
        } else {
          fecRecord = await prisma.fecCandidate.create({
            data: {
              candidateId: candidate.candidate_id,
              name: candidate.name,
              party: candidate.party,
              office: candidate.office,
              state: candidate.state,
              district: candidate.district,
              incumbentChallenge: candidate.incumbent_challenge,
              electionYears: candidate.election_years ?? [],
              totalReceipts: new Prisma.Decimal(candidate.total_receipts ?? 0),
              totalDisbursements: new Prisma.Decimal(
                candidate.total_disbursements ?? 0,
              ),
              cashOnHand: new Prisma.Decimal(
                candidate.cash_on_hand_end_period ?? 0,
              ),
            },
          });
          created++;
        }

        // 2. Create or find Entity (POLITICIAN)
        let entity = fecRecord.entityId
          ? await prisma.entity.findUnique({
              where: { id: fecRecord.entityId },
            })
          : null;

        if (!entity) {
          // Try to find existing entity by source record
          const existingSource = await prisma.entitySourceRecord.findUnique({
            where: {
              source_sourceId_sourceIdType: {
                source: "FEC",
                sourceId: candidate.candidate_id,
                sourceIdType: "candidate_id",
              },
            },
            include: { entity: true },
          });

          if (existingSource) {
            entity = existingSource.entity;
          } else {
            // Create new entity
            entity = await prisma.entity.create({
              data: {
                type: "POLITICIAN",
                canonicalName: parsedName.full,
                party,
                state: candidate.state,
                district: candidate.district,
                office,
                officeLevel: office ? "FEDERAL" : undefined,
                inOffice: candidate.incumbent_challenge === "I",
              },
            });
          }

          // Link FecCandidate to Entity
          await prisma.fecCandidate.update({
            where: { candidateId: candidate.candidate_id },
            data: { entityId: entity.id },
          });
        }

        // 3. Ensure EntityAlias exists
        await prisma.entityAlias.upsert({
          where: {
            alias_source: {
              alias: candidate.name,
              source: "FEC",
            },
          },
          update: {},
          create: {
            entityId: entity.id,
            alias: candidate.name,
            aliasNorm: normalizedName,
            source: "FEC",
            confidence: "EXACT",
          },
        });

        // Also create alias for the parsed "First Last" format if different
        if (parsedName.full !== candidate.name) {
          await prisma.entityAlias.upsert({
            where: {
              alias_source: {
                alias: parsedName.full,
                source: "FEC",
              },
            },
            update: {},
            create: {
              entityId: entity.id,
              alias: parsedName.full,
              aliasNorm: normalizedName,
              source: "FEC",
              confidence: "EXACT",
            },
          });
        }

        // 4. Ensure EntitySourceRecord exists
        await prisma.entitySourceRecord.upsert({
          where: {
            source_sourceId_sourceIdType: {
              source: "FEC",
              sourceId: candidate.candidate_id,
              sourceIdType: "candidate_id",
            },
          },
          update: {
            lastSynced: new Date(),
            sourceData: candidate as unknown as Prisma.JsonObject,
          },
          create: {
            entityId: entity.id,
            source: "FEC",
            sourceId: candidate.candidate_id,
            sourceIdType: "candidate_id",
            lastSynced: new Date(),
            sourceData: candidate as unknown as Prisma.JsonObject,
          },
        });

        processed++;
        if (processed % 50 === 0) {
          console.log(
            `  [Candidates] Processed ${processed} (${created} created, ${updated} updated)`,
          );
        }
      } catch (err) {
        console.error(
          `  [Candidates] Error processing ${candidate.candidate_id}: ${err}`,
        );
      }
    }
  }

  console.log(
    `  [Candidates] Done: ${processed} processed, ${created} created, ${updated} updated`,
  );
  return { processed, created, updated };
}

// ─────────────────────────────────────────────────────────────
// Sync: Committees
// ─────────────────────────────────────────────────────────────

async function syncCommittees(): Promise<{
  processed: number;
  created: number;
  updated: number;
}> {
  console.log("\n========== Syncing FEC Committees ==========");

  let processed = 0;
  let created = 0;
  let updated = 0;

  const currentCycle =
    new Date().getFullYear() % 2 === 0
      ? new Date().getFullYear()
      : new Date().getFullYear() + 1;
  const paginator = paginateFec<FecCommitteeResult>("/committees/", {
    sort: "-first_file_date",
    cycle: currentCycle,
  });

  for await (const page of paginator) {
    for (const committee of page) {
      try {
        const normalizedName = normalizeName(committee.name);
        const entityTypeStr = fecCommitteeToEntityType(
          committee.designation,
          committee.committee_type,
          committee.organization_type,
        );
        const entityType = mapEntityType(entityTypeStr);
        const committeeType = mapCommitteeType(committee.committee_type);

        // 1. Upsert FecCommittee raw record
        const existing = await prisma.fecCommittee.findUnique({
          where: { committeeId: committee.committee_id },
        });

        let fecRecord;
        if (existing) {
          fecRecord = await prisma.fecCommittee.update({
            where: { committeeId: committee.committee_id },
            data: {
              name: committee.name,
              designation: committee.designation,
              committeeType: committee.committee_type,
              organizationType: committee.organization_type,
              party: committee.party,
              state: committee.state,
              treasurerName: committee.treasurer_name,
              candidateIds: committee.candidate_ids ?? [],
              totalReceipts: new Prisma.Decimal(committee.total_receipts ?? 0),
              totalDisbursements: new Prisma.Decimal(
                committee.total_disbursements ?? 0,
              ),
            },
          });
          updated++;
        } else {
          fecRecord = await prisma.fecCommittee.create({
            data: {
              committeeId: committee.committee_id,
              name: committee.name,
              designation: committee.designation,
              committeeType: committee.committee_type,
              organizationType: committee.organization_type,
              party: committee.party,
              state: committee.state,
              treasurerName: committee.treasurer_name,
              candidateIds: committee.candidate_ids ?? [],
              totalReceipts: new Prisma.Decimal(committee.total_receipts ?? 0),
              totalDisbursements: new Prisma.Decimal(
                committee.total_disbursements ?? 0,
              ),
            },
          });
          created++;
        }

        // 2. Create or find Entity
        let entity = fecRecord.entityId
          ? await prisma.entity.findUnique({
              where: { id: fecRecord.entityId },
            })
          : null;

        if (!entity) {
          const existingSource = await prisma.entitySourceRecord.findUnique({
            where: {
              source_sourceId_sourceIdType: {
                source: "FEC",
                sourceId: committee.committee_id,
                sourceIdType: "committee_id",
              },
            },
            include: { entity: true },
          });

          if (existingSource) {
            entity = existingSource.entity;
          } else {
            entity = await prisma.entity.create({
              data: {
                type: entityType,
                canonicalName: committee.name,
                party: mapParty(committee.party),
                state: committee.state,
                committeeType,
              },
            });
          }

          // Link FecCommittee to Entity
          await prisma.fecCommittee.update({
            where: { committeeId: committee.committee_id },
            data: { entityId: entity.id },
          });
        }

        // 3. Ensure EntityAlias
        await prisma.entityAlias.upsert({
          where: {
            alias_source: {
              alias: committee.name,
              source: "FEC",
            },
          },
          update: {},
          create: {
            entityId: entity.id,
            alias: committee.name,
            aliasNorm: normalizedName,
            source: "FEC",
            confidence: "EXACT",
          },
        });

        // 4. Ensure EntitySourceRecord
        await prisma.entitySourceRecord.upsert({
          where: {
            source_sourceId_sourceIdType: {
              source: "FEC",
              sourceId: committee.committee_id,
              sourceIdType: "committee_id",
            },
          },
          update: {
            lastSynced: new Date(),
            sourceData: committee as unknown as Prisma.JsonObject,
          },
          create: {
            entityId: entity.id,
            source: "FEC",
            sourceId: committee.committee_id,
            sourceIdType: "committee_id",
            lastSynced: new Date(),
            sourceData: committee as unknown as Prisma.JsonObject,
          },
        });

        processed++;
        if (processed % 50 === 0) {
          console.log(
            `  [Committees] Processed ${processed} (${created} created, ${updated} updated)`,
          );
        }
      } catch (err) {
        console.error(
          `  [Committees] Error processing ${committee.committee_id}: ${err}`,
        );
      }
    }
  }

  console.log(
    `  [Committees] Done: ${processed} processed, ${created} created, ${updated} updated`,
  );
  return { processed, created, updated };
}

// ─────────────────────────────────────────────────────────────
// Sync: Contributions (Schedule A)
// ─────────────────────────────────────────────────────────────

/**
 * Find or create an Entity for a contributor (individual, PAC, etc.).
 * Returns the entity ID or null if the contributor name is missing.
 */
async function findOrCreateContributorEntity(
  contributorName: string | null,
  contributorState: string | null,
  contributorEmployer: string | null,
): Promise<string | null> {
  if (!contributorName || contributorName.trim() === "") return null;

  const normalizedName = normalizeName(contributorName);

  // Check for existing alias
  const existingAlias = await prisma.entityAlias.findFirst({
    where: { aliasNorm: normalizedName, source: "FEC" },
  });

  if (existingAlias) return existingAlias.entityId;

  // Determine entity type — if the name looks like a person (has comma), treat as INDIVIDUAL
  const isPerson = contributorName.includes(",");
  const entityType = isPerson ? ("INDIVIDUAL" as const) : ("UNKNOWN" as const);
  const displayName = isPerson
    ? parsePersonName(contributorName).full
    : contributorName;

  const entity = await prisma.entity.create({
    data: {
      type: entityType,
      canonicalName: displayName,
      state: contributorState,
    },
  });

  await prisma.entityAlias.create({
    data: {
      entityId: entity.id,
      alias: contributorName,
      aliasNorm: normalizedName,
      source: "FEC",
      confidence: "EXACT",
    },
  });

  return entity.id;
}

async function syncContributions(): Promise<{
  processed: number;
  created: number;
  updated: number;
}> {
  console.log("\n========== Syncing FEC Contributions (Schedule A) ==========");

  let processed = 0;
  let created = 0;
  let updated = 0;

  // Get top committees by receipts to fetch their contributions
  const topCommittees = await prisma.fecCommittee.findMany({
    orderBy: { totalReceipts: "desc" },
    take: TOP_COMMITTEES_FOR_TRANSACTIONS,
    select: { committeeId: true, entityId: true, name: true },
  });

  if (topCommittees.length === 0) {
    console.log(
      "  [Contributions] No committees in DB. Run --committees-only first.",
    );
    return { processed, created, updated };
  }

  console.log(
    `  [Contributions] Fetching contributions for top ${topCommittees.length} committees...`,
  );

  const currentCycle =
    new Date().getFullYear() % 2 === 0
      ? new Date().getFullYear()
      : new Date().getFullYear() + 1;

  for (const committee of topCommittees) {
    console.log(
      `  [Contributions] Committee: ${committee.name} (${committee.committeeId})`,
    );

    try {
      // OpenFEC Schedule A: max 100 pages, sorted by amount desc to get biggest first
      const paginator = paginateFec<FecScheduleAResult>(
        "/schedules/schedule_a/",
        {
          committee_id: committee.committeeId,
          two_year_transaction_period: currentCycle,
          sort: "-contribution_receipt_amount",
          min_amount: 200, // Itemized contributions only (above $200)
        },
        10,
      ); // Limit to 10 pages per committee (1,000 transactions)

      for await (const page of paginator) {
        for (const contrib of page) {
          try {
            if (
              !contrib.contribution_receipt_amount ||
              !contrib.contribution_receipt_date
            )
              continue;

            const sourceTransactionId = `schedule_a_${contrib.sub_id}`;

            // Check if transaction already exists (idempotency)
            const existingTx = await prisma.moneyTransaction.findFirst({
              where: { sourceTransactionId, dataSource: "FEC" },
            });
            if (existingTx) {
              processed++;
              continue;
            }

            // Find or create contributor entity
            const sourceEntityId = await findOrCreateContributorEntity(
              contrib.contributor_name,
              contrib.contributor_state,
              contrib.contributor_employer,
            );

            // Target entity is the committee
            const targetEntityId = committee.entityId;

            await prisma.moneyTransaction.create({
              data: {
                sourceEntityId,
                targetEntityId,
                transactionType: mapContributionType(contrib.receipt_type),
                direction: "INFLOW",
                amount: new Prisma.Decimal(contrib.contribution_receipt_amount),
                transactionDate: new Date(contrib.contribution_receipt_date),
                electionYear: contrib.two_year_transaction_period,
                dataSource: "FEC",
                sourceTransactionId,
                sourceName: contrib.contributor_name,
                targetName: committee.name,
                sourceState: contrib.contributor_state,
                fecReportType: contrib.report_type,
                contributorEmployer: contrib.contributor_employer,
                contributorOccupation: contrib.contributor_occupation,
              },
            });

            created++;
            processed++;

            if (processed % 100 === 0) {
              console.log(
                `    [Contributions] Processed ${processed} (${created} created)`,
              );
            }
          } catch (err) {
            console.error(
              `    [Contributions] Error processing contribution ${contrib.sub_id}: ${err}`,
            );
          }
        }
      }
    } catch (err) {
      console.error(
        `  [Contributions] Error fetching for committee ${committee.committeeId}: ${err}`,
      );
    }
  }

  console.log(
    `  [Contributions] Done: ${processed} processed, ${created} created`,
  );
  return { processed, created, updated };
}

// ─────────────────────────────────────────────────────────────
// Sync: Disbursements (Schedule B)
// ─────────────────────────────────────────────────────────────

async function syncDisbursements(): Promise<{
  processed: number;
  created: number;
  updated: number;
}> {
  console.log("\n========== Syncing FEC Disbursements (Schedule B) ==========");

  let processed = 0;
  let created = 0;
  let updated = 0;

  const topCommittees = await prisma.fecCommittee.findMany({
    orderBy: { totalDisbursements: "desc" },
    take: TOP_COMMITTEES_FOR_TRANSACTIONS,
    select: { committeeId: true, entityId: true, name: true },
  });

  if (topCommittees.length === 0) {
    console.log(
      "  [Disbursements] No committees in DB. Run --committees-only first.",
    );
    return { processed, created, updated };
  }

  console.log(
    `  [Disbursements] Fetching disbursements for top ${topCommittees.length} committees...`,
  );

  const currentCycle =
    new Date().getFullYear() % 2 === 0
      ? new Date().getFullYear()
      : new Date().getFullYear() + 1;

  for (const committee of topCommittees) {
    console.log(
      `  [Disbursements] Committee: ${committee.name} (${committee.committeeId})`,
    );

    try {
      const paginator = paginateFec<FecScheduleBResult>(
        "/schedules/schedule_b/",
        {
          committee_id: committee.committeeId,
          two_year_transaction_period: currentCycle,
          sort: "-disbursement_amount",
        },
        10,
      ); // 10 pages per committee

      for await (const page of paginator) {
        for (const disb of page) {
          try {
            if (!disb.disbursement_amount || !disb.disbursement_date) continue;

            const sourceTransactionId = `schedule_b_${disb.sub_id}`;

            // Idempotency check
            const existingTx = await prisma.moneyTransaction.findFirst({
              where: { sourceTransactionId, dataSource: "FEC" },
            });
            if (existingTx) {
              processed++;
              continue;
            }

            // Find or create recipient entity
            let targetEntityId: string | null = null;
            if (disb.recipient_name && disb.recipient_name.trim() !== "") {
              const normalizedRecipient = normalizeName(disb.recipient_name);
              const existingAlias = await prisma.entityAlias.findFirst({
                where: { aliasNorm: normalizedRecipient, source: "FEC" },
              });

              if (existingAlias) {
                targetEntityId = existingAlias.entityId;
              } else {
                const recipientEntity = await prisma.entity.create({
                  data: {
                    type: "UNKNOWN",
                    canonicalName: disb.recipient_name,
                    state: disb.recipient_state,
                  },
                });
                await prisma.entityAlias.create({
                  data: {
                    entityId: recipientEntity.id,
                    alias: disb.recipient_name,
                    aliasNorm: normalizedRecipient,
                    source: "FEC",
                    confidence: "EXACT",
                  },
                });
                targetEntityId = recipientEntity.id;
              }
            }

            // Source is the committee making the disbursement
            const sourceEntityId = committee.entityId;

            await prisma.moneyTransaction.create({
              data: {
                sourceEntityId,
                targetEntityId,
                transactionType: "OPERATING_EXPENDITURE",
                direction: "OUTFLOW",
                amount: new Prisma.Decimal(disb.disbursement_amount),
                transactionDate: new Date(disb.disbursement_date),
                electionYear: disb.two_year_transaction_period,
                dataSource: "FEC",
                sourceTransactionId,
                sourceName: committee.name,
                targetName: disb.recipient_name,
                targetState: disb.recipient_state,
                fecReportType: disb.report_type,
              },
            });

            created++;
            processed++;

            if (processed % 100 === 0) {
              console.log(
                `    [Disbursements] Processed ${processed} (${created} created)`,
              );
            }
          } catch (err) {
            console.error(
              `    [Disbursements] Error processing disbursement ${disb.sub_id}: ${err}`,
            );
          }
        }
      }
    } catch (err) {
      console.error(
        `  [Disbursements] Error fetching for committee ${committee.committeeId}: ${err}`,
      );
    }
  }

  console.log(
    `  [Disbursements] Done: ${processed} processed, ${created} created`,
  );
  return { processed, created, updated };
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log("=== FEC Data Sync ===");
  console.log(
    `API Key: ${API_KEY === "DEMO_KEY" ? "DEMO_KEY (rate-limited)" : "Custom key"}`,
  );
  console.log(
    `Mode: ${runAll ? "Full sync" : args.filter((a) => a.startsWith("--")).join(", ")}`,
  );
  console.log(`Started at: ${new Date().toISOString()}`);

  const syncLog = await prisma.syncLog.create({
    data: {
      source: "FEC",
      syncType: runAll
        ? "full"
        : args.filter((a) => a.startsWith("--")).join(","),
      status: "RUNNING",
    },
  });

  const totals = { processed: 0, created: 0, updated: 0 };

  try {
    // 1. Candidates
    if (runAll || candidatesOnly) {
      const result = await syncCandidates();
      totals.processed += result.processed;
      totals.created += result.created;
      totals.updated += result.updated;
    }

    // 2. Committees
    if (runAll || committeesOnly) {
      const result = await syncCommittees();
      totals.processed += result.processed;
      totals.created += result.created;
      totals.updated += result.updated;
    }

    // 3. Contributions (Schedule A) — requires committees to be synced first
    if (runAll || contributionsOnly) {
      const result = await syncContributions();
      totals.processed += result.processed;
      totals.created += result.created;
      totals.updated += result.updated;
    }

    // 4. Disbursements (Schedule B) — requires committees to be synced first
    if (runAll) {
      const result = await syncDisbursements();
      totals.processed += result.processed;
      totals.created += result.created;
      totals.updated += result.updated;
    }

    // Update sync log on success
    await prisma.syncLog.update({
      where: { id: syncLog.id },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
        recordsProcessed: totals.processed,
        recordsCreated: totals.created,
        recordsUpdated: totals.updated,
      },
    });

    console.log("\n=== Sync Complete ===");
    console.log(`  Processed: ${totals.processed}`);
    console.log(`  Created:   ${totals.created}`);
    console.log(`  Updated:   ${totals.updated}`);
    console.log(`  Finished:  ${new Date().toISOString()}`);
  } catch (err) {
    console.error("\n=== Sync Failed ===", err);

    await prisma.syncLog.update({
      where: { id: syncLog.id },
      data: {
        status: "FAILED",
        completedAt: new Date(),
        recordsProcessed: totals.processed,
        recordsCreated: totals.created,
        recordsUpdated: totals.updated,
        errorMessage: err instanceof Error ? err.message : String(err),
      },
    });

    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
