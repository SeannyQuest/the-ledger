/**
 * Federal Register Data Sync Script
 *
 * Fetches significant rules and proposed rules from the Federal Register API.
 *
 * Usage:
 *   npx tsx scripts/sync-federal-register.ts
 *   npx tsx scripts/sync-federal-register.ts --seed    # Generate demo data
 *
 * API docs: https://www.federalregister.gov/developers/documentation/api/v1
 * No API key required.
 */

import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const args = process.argv.slice(2);
const seedMode = args.includes("--seed");

const FR_API = "https://www.federalregister.gov/api/v1";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─────────────────────────────────────────────────────────────
// Seed Mode
// ─────────────────────────────────────────────────────────────

const AGENCIES = [
  "Environmental Protection Agency",
  "Securities and Exchange Commission",
  "Federal Communications Commission",
  "Department of Defense",
  "Department of Energy",
  "Department of Health and Human Services",
  "Federal Trade Commission",
  "Department of the Treasury",
  "Department of Commerce",
  "Department of Transportation",
  "Department of Labor",
  "Federal Aviation Administration",
  "Food and Drug Administration",
  "Internal Revenue Service",
  "Department of Homeland Security",
];

const REG_TITLES = [
  "Emission Standards for Light-Duty Vehicles",
  "Cybersecurity Risk Management for Financial Institutions",
  "Net Neutrality and Open Internet Order",
  "Procurement Standards for Defense Contracts",
  "Renewable Energy Tax Credit Modifications",
  "Drug Pricing Transparency Requirements",
  "Consumer Data Privacy Protection Rule",
  "Corporate Tax Reporting Standards",
  "Export Control Regulations Update",
  "Autonomous Vehicle Safety Standards",
  "Workplace Safety Standards Revision",
  "Drone Operations in National Airspace",
  "Generic Drug Approval Process Reform",
  "Cryptocurrency Tax Reporting Requirements",
  "Border Security Technology Standards",
  "Broadband Infrastructure Deployment Rules",
  "Clean Water Act Enforcement Updates",
  "AI System Transparency Requirements",
  "Medical Device Cybersecurity Standards",
  "Supply Chain Security Requirements",
];

const DOC_TYPES = ["rule", "proposed_rule", "notice"];

async function seedFederalRegisterData() {
  console.log("=== Seeding Federal Register Data ===\n");

  // Resolve agency entities
  const agencies = await prisma.entity.findMany({
    where: { type: "GOVERNMENT_AGENCY" },
    select: { id: true, canonicalName: true },
  });
  console.log(`Found ${agencies.length} agency entities`);

  let created = 0;

  for (let i = 0; i < REG_TITLES.length; i++) {
    const docNum = `2024-${String(10000 + i)}`;
    const type = randomElement(DOC_TYPES);
    const agency = randomElement(AGENCIES);
    const pubDate = new Date(
      2024,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1,
    );
    const significant = Math.random() < 0.4;

    // Try to match agency to entity
    const matchedAgency = agencies.find((a) =>
      a.canonicalName
        .toLowerCase()
        .includes(agency.split(" ").slice(-1)[0].toLowerCase()),
    );

    try {
      await prisma.federalRegisterEntry.upsert({
        where: { documentNumber: docNum },
        update: {},
        create: {
          documentNumber: docNum,
          title: REG_TITLES[i],
          type,
          agencyNames: [agency],
          agencyEntityIds: matchedAgency ? [matchedAgency.id] : [],
          publicationDate: pubDate,
          significantRule: significant,
          abstractText: `This ${type.replace("_", " ")} by the ${agency} addresses regulatory requirements related to ${REG_TITLES[i].toLowerCase()}.`,
          htmlUrl: `https://www.federalregister.gov/documents/2024/${String(pubDate.getMonth() + 1).padStart(2, "0")}/${String(pubDate.getDate()).padStart(2, "0")}/${docNum}`,
          commentCount:
            type === "proposed_rule" ? Math.floor(Math.random() * 50000) : 0,
        },
      });
      created++;
      console.log(`  ${docNum}: ${REG_TITLES[i]} (${type})`);
    } catch {
      // Skip duplicates
    }
  }

  console.log(`\nCreated ${created} Federal Register entries`);
}

// ─────────────────────────────────────────────────────────────
// Live Mode
// ─────────────────────────────────────────────────────────────

async function syncFromFederalRegister() {
  console.log("=== Syncing Federal Register Data ===\n");

  const syncLog = await prisma.syncLog.create({
    data: {
      source: "FEDERAL_REGISTER",
      syncType: "entries",
      status: "RUNNING",
    },
  });

  let processed = 0;
  let created = 0;

  try {
    // Fetch significant rules from the past year
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const fromDate = oneYearAgo.toISOString().split("T")[0];

    const typeMap: Record<string, string> = {
      rule: "RULE",
      proposed_rule: "PROPOSED+RULE",
    };
    for (const docType of ["rule", "proposed_rule"]) {
      const url = `${FR_API}/documents?per_page=50&order=newest&conditions%5Btype%5D%5B%5D=${typeMap[docType]}&conditions%5Bpublication_date%5D%5Bgte%5D=${fromDate}`;

      await sleep(500);
      const res = await fetch(url);
      if (!res.ok) {
        console.log(`Error fetching ${docType}: ${res.status}`);
        continue;
      }

      const data = await res.json();

      for (const doc of data.results ?? []) {
        processed++;
        const docNum = doc.document_number;
        if (!docNum) continue;

        try {
          await prisma.federalRegisterEntry.upsert({
            where: { documentNumber: docNum },
            update: {
              commentCount: doc.comment_count ?? 0,
            },
            create: {
              documentNumber: docNum,
              title: doc.title ?? "Untitled",
              type: docType,
              agencyNames:
                doc.agencies
                  ?.map((a: any) => a.name ?? a.raw_name)
                  .filter(Boolean) ?? [],
              agencyEntityIds: [],
              publicationDate: new Date(doc.publication_date),
              significantRule:
                doc.significant === true || doc.significant === 1,
              abstractText:
                doc.abstract?.slice(0, 2000) ??
                doc.excerpts?.slice(0, 2000) ??
                null,
              htmlUrl: doc.html_url ?? "",
              pdfUrl: doc.pdf_url ?? null,
              commentCount: doc.comment_count ?? 0,
            },
          });
          created++;
          console.log(`  ${docNum}: ${(doc.title ?? "").slice(0, 60)}`);
        } catch {
          // Skip
        }
      }
    }
  } catch (err) {
    console.error("Error:", err);
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
      await seedFederalRegisterData();
    } else {
      await syncFromFederalRegister();
    }
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
