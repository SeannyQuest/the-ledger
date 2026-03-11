/**
 * ProPublica Nonprofit Explorer Data Sync Script
 *
 * Fetches IRS 990 filings for politically active nonprofits.
 *
 * Usage:
 *   npx tsx scripts/sync-nonprofits.ts
 *   npx tsx scripts/sync-nonprofits.ts --seed    # Generate demo data
 *
 * API docs: https://projects.propublica.org/nonprofits/api
 * No API key required.
 */

import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const args = process.argv.slice(2);
const seedMode = args.includes("--seed");

const PP_API = "https://projects.propublica.org/nonprofits/api/v2";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─────────────────────────────────────────────────────────────
// Seed Mode
// ─────────────────────────────────────────────────────────────

const DARK_MONEY_ORGS = [
  { name: "Americans for Prosperity", ein: "320138790" },
  { name: "Crossroads GPS", ein: "272942250" },
  { name: "League of Conservation Voters", ein: "521533838" },
  { name: "American Action Network", ein: "271444695" },
  { name: "Patriot Majority USA", ein: "273543270" },
  { name: "Americans for Tax Reform", ein: "521839580" },
  { name: "Majority Forward", ein: "812415625" },
  { name: "One Nation", ein: "812415590" },
  { name: "Senate Leadership Fund", ein: "474739378" },
  { name: "House Majority PAC", ein: "274127282" },
  { name: "Club for Growth Action", ein: "202869990" },
  { name: "US Chamber of Commerce", ein: "530045720" },
  { name: "National Rifle Association", ein: "530116130" },
  { name: "Planned Parenthood Action Fund", ein: "131644147" },
  { name: "Heritage Action for America", ein: "274513827" },
];

async function seedNonprofitData() {
  console.log("=== Seeding Nonprofit 990 Filing Data ===\n");

  let created = 0;

  for (const org of DARK_MONEY_ORGS) {
    // Generate 3 years of filings
    for (const year of [2021, 2022, 2023]) {
      const taxPeriod = `${year}12`;
      const revenue = Math.floor(5000000 + Math.random() * 200000000);
      const expenses = Math.floor(revenue * (0.7 + Math.random() * 0.25));
      const assets = Math.floor(revenue * (0.3 + Math.random() * 1.5));
      const politicalExpenses = Math.floor(
        expenses * (0.1 + Math.random() * 0.6),
      );

      const grantRecipients = Array.from(
        { length: 2 + Math.floor(Math.random() * 4) },
        () => ({
          name: randomElement([
            "State Policy Network",
            "Freedom Partners",
            "Center for American Progress",
            "Heritage Foundation",
            "Brookings Institution",
            "Cato Institute",
            "American Enterprise Institute",
            "Center on Budget and Policy Priorities",
          ]),
          amount: Math.floor(100000 + Math.random() * 5000000),
          purpose: randomElement([
            "General operating support",
            "Policy research",
            "Public education campaigns",
            "Issue advocacy",
            "Voter engagement",
          ]),
        }),
      );

      try {
        await prisma.nonprofitFiling.upsert({
          where: { ein_taxPeriod: { ein: org.ein, taxPeriod } },
          update: {},
          create: {
            ein: org.ein,
            organizationName: org.name,
            taxPeriod,
            totalRevenue: revenue,
            totalExpenses: expenses,
            totalAssets: assets,
            politicalExpenses: politicalExpenses,
            grantRecipients,
            formType: "990",
            filingYear: year,
            pdfUrl: `https://projects.propublica.org/nonprofits/organizations/${org.ein}/${year}`,
          },
        });
        created++;
      } catch {
        // Skip duplicates
      }
    }
    console.log(`  ${org.ein}: ${org.name} (3 filings)`);
  }

  console.log(`\nCreated ${created} nonprofit filings`);
}

// ─────────────────────────────────────────────────────────────
// Live Mode
// ─────────────────────────────────────────────────────────────

async function syncFromProPublica() {
  console.log("=== Syncing ProPublica Nonprofit Data ===\n");

  const syncLog = await prisma.syncLog.create({
    data: { source: "PROPUBLICA", syncType: "nonprofit_990", status: "RUNNING" },
  });

  let processed = 0;
  let created = 0;

  // Search for politically active organizations
  const searchTerms = [
    "americans for prosperity",
    "crossroads gps",
    "league of conservation voters",
    "american action network",
  ];

  for (const term of searchTerms) {
    try {
      await sleep(1000);
      const res = await fetch(
        `${PP_API}/search.json?q=${encodeURIComponent(term)}`,
      );
      if (!res.ok) {
        console.log(`  Search error for "${term}": ${res.status}`);
        continue;
      }

      const data = await res.json();
      const orgs = data.organizations ?? [];

      for (const org of orgs.slice(0, 3)) {
        processed++;
        const ein = org.ein;
        if (!ein) continue;

        // Fetch filings
        try {
          await sleep(1000);
          const filingsRes = await fetch(
            `${PP_API}/organizations/${ein}.json`,
          );
          if (!filingsRes.ok) continue;

          const orgData = await filingsRes.json();
          const filings = orgData.filings_with_data ?? [];

          for (const filing of filings.slice(0, 3)) {
            const taxPeriod = String(filing.tax_prd ?? "");
            if (!taxPeriod) continue;

            try {
              await prisma.nonprofitFiling.upsert({
                where: { ein_taxPeriod: { ein, taxPeriod } },
                update: {},
                create: {
                  ein,
                  organizationName: orgData.organization?.name ?? org.name ?? "Unknown",
                  taxPeriod,
                  totalRevenue: filing.totrevenue ?? null,
                  totalExpenses: filing.totfuncexpns ?? null,
                  totalAssets: filing.totassetsend ?? null,
                  politicalExpenses: null,
                  formType: filing.formtype ?? "990",
                  filingYear: parseInt(taxPeriod.slice(0, 4)),
                  pdfUrl: filing.pdf_url ?? null,
                },
              });
              created++;
            } catch {
              // Skip
            }
          }

          console.log(`  ${ein}: ${orgData.organization?.name ?? org.name}`);
        } catch {
          // Skip
        }
      }
    } catch (err) {
      console.log(`  Error searching "${term}": ${err}`);
    }
  }

  await prisma.syncLog.update({
    where: { id: syncLog.id },
    data: {
      status: "COMPLETED",
      completedAt: new Date(),
      recordsProcessed: processed,
      recordsCreated: created,
    },
  });

  console.log(`\nProcessed ${processed}, created ${created}`);
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────

async function main() {
  try {
    if (seedMode) {
      await seedNonprofitData();
    } else {
      await syncFromProPublica();
    }
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
