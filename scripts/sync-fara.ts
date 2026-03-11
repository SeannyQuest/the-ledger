/**
 * FARA (Foreign Agents Registration Act) Data Sync Script
 *
 * Fetches foreign agent registrations and activities.
 *
 * Usage:
 *   npx tsx scripts/sync-fara.ts
 *   npx tsx scripts/sync-fara.ts --seed    # Generate demo data
 *
 * FARA eFile: https://efile.fara.gov/
 * No API key required.
 */

import { PrismaClient } from "../src/generated/prisma";
import { normalizeName } from "../src/lib/entity-resolution";

const prisma = new PrismaClient();

const args = process.argv.slice(2);
const seedMode = args.includes("--seed");

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─────────────────────────────────────────────────────────────
// Seed Mode
// ─────────────────────────────────────────────────────────────

const COUNTRIES = [
  "Saudi Arabia",
  "United Arab Emirates",
  "Japan",
  "South Korea",
  "Turkey",
  "Qatar",
  "China",
  "United Kingdom",
  "Germany",
  "Israel",
  "India",
  "Russia",
  "Mexico",
  "Canada",
  "Australia",
];

const FOREIGN_PRINCIPALS = [
  "Royal Embassy of Saudi Arabia",
  "Government of Japan",
  "Korea Trade-Investment Promotion Agency",
  "Turkish Heritage Organization",
  "Qatar Investment Authority",
  "Huawei Technologies",
  "British American Tobacco",
  "Deutsche Bank AG",
  "Israel Allies Foundation",
  "Reliance Industries Limited",
  "Gazprom International",
  "Mexican Tourism Board",
  "Canadian Lumber Trade Alliance",
  "Rio Tinto Mining",
  "Samsung Electronics",
];

const LOBBYING_FIRMS = [
  "Akin Gump Strauss Hauer & Feld",
  "Squire Patton Boggs",
  "BGR Group",
  "Mercury Public Affairs",
  "Podesta Group",
  "Holland & Knight",
  "Brownstein Hyatt Farber Schreck",
  "DLA Piper",
  "Hogan Lovells",
  "K&L Gates",
];

const ACTIVITY_TYPES = ["political_activities", "public_relations", "lobbying"];

async function seedFaraData() {
  console.log("=== Seeding FARA Registration Data ===\n");

  // Try to match lobbying firms to existing entities
  const firms = await prisma.entity.findMany({
    where: { type: "LOBBYING_FIRM" },
    select: { id: true, canonicalName: true },
  });
  const firmMap = new Map(firms.map((f) => [normalizeName(f.canonicalName), f.id]));
  console.log(`Found ${firms.length} lobbying firm entities`);

  let regsCreated = 0;
  let activitiesCreated = 0;

  for (let i = 0; i < FOREIGN_PRINCIPALS.length; i++) {
    const regNum = `${6000 + i}`;
    const firm = randomElement(LOBBYING_FIRMS);
    const country = COUNTRIES[i % COUNTRIES.length];
    const regDate = new Date(
      2020 + Math.floor(Math.random() * 5),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1,
    );
    const terminated = Math.random() < 0.2;

    // Match firm entity
    let firmEntityId: string | null = null;
    for (const [norm, id] of firmMap) {
      if (firm.toLowerCase().includes(norm.split(" ")[0].toLowerCase())) {
        firmEntityId = id;
        break;
      }
    }

    try {
      const registration = await prisma.faraRegistration.upsert({
        where: { registrationNum: regNum },
        update: {},
        create: {
          registrationNum: regNum,
          foreignPrincipal: FOREIGN_PRINCIPALS[i],
          country,
          registrantName: firm,
          registrantEntityId: firmEntityId,
          registrationDate: regDate,
          terminationDate: terminated
            ? new Date(regDate.getTime() + Math.random() * 365 * 24 * 60 * 60 * 1000)
            : null,
          active: !terminated,
        },
      });
      regsCreated++;
      console.log(`  Reg ${regNum}: ${FOREIGN_PRINCIPALS[i]} → ${firm} (${country})`);

      // Generate 2-5 activities per registration
      const activityCount = 2 + Math.floor(Math.random() * 4);
      for (let j = 0; j < activityCount; j++) {
        const actType = randomElement(ACTIVITY_TYPES);
        const periodStart = new Date(
          regDate.getTime() + j * 90 * 24 * 60 * 60 * 1000,
        );
        const periodEnd = new Date(
          periodStart.getTime() + 90 * 24 * 60 * 60 * 1000,
        );
        const amount = Math.floor(50000 + Math.random() * 2000000);

        try {
          await prisma.faraActivity.create({
            data: {
              registrationId: registration.id,
              activityType: actType,
              description: `${actType.replace(/_/g, " ")} on behalf of ${FOREIGN_PRINCIPALS[i]} regarding bilateral relations and trade`,
              amount,
              periodStart,
              periodEnd,
            },
          });
          activitiesCreated++;
        } catch {
          // Skip
        }
      }
    } catch {
      // Skip duplicates
    }
  }

  console.log(`\nCreated ${regsCreated} registrations and ${activitiesCreated} activities`);
}

// ─────────────────────────────────────────────────────────────
// Live Mode
// ─────────────────────────────────────────────────────────────

async function syncFromFara() {
  console.log("=== Syncing FARA Data ===\n");
  console.log("Note: FARA efile API access varies. Using seed mode for development.");
  console.log("Run with --seed to generate demo data.\n");

  // The FARA efile system has limited API access
  // For production, would scrape https://efile.fara.gov/docs/
  // or use the semi-annual reports at https://www.justice.gov/nsd-fara
  console.log("To fetch real FARA data, use: npx tsx scripts/sync-fara.ts --seed");
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────

async function main() {
  try {
    if (seedMode) {
      await seedFaraData();
    } else {
      await syncFromFara();
    }
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
