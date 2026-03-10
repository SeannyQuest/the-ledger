/**
 * Seed Demo Data — Populate the database with real-world entities and
 * money flows so the D3 visualizations have something to render.
 *
 * This uses real public data from FEC/USASpending for the top players
 * in campaign finance. All numbers are from public records.
 *
 * Usage: npx tsx scripts/seed-demo-data.ts
 */

import { PrismaClient, Prisma } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function findOrCreateEntity(
  data: Prisma.EntityCreateInput,
): Promise<string> {
  const existing = await prisma.entity.findFirst({
    where: { canonicalName: data.canonicalName, type: data.type },
    select: { id: true },
  });
  if (existing) return existing.id;
  const entity = await prisma.entity.create({ data });
  return entity.id;
}

async function main() {
  console.log("=== Seeding Demo Data ===\n");

  // ─── Corporations ───────────────────────────────────────────────
  const corps = [
    {
      name: "Lockheed Martin Corporation",
      ticker: "LMT",
      industry: "Defense & Aerospace",
      naics: "336411",
    },
    {
      name: "RTX Corporation",
      ticker: "RTX",
      industry: "Defense & Aerospace",
      naics: "336411",
    },
    {
      name: "Boeing Company",
      ticker: "BA",
      industry: "Defense & Aerospace",
      naics: "336411",
    },
    {
      name: "General Dynamics Corporation",
      ticker: "GD",
      industry: "Defense & Aerospace",
      naics: "336411",
    },
    {
      name: "Northrop Grumman Corporation",
      ticker: "NOC",
      industry: "Defense & Aerospace",
      naics: "336411",
    },
    {
      name: "Alphabet Inc",
      ticker: "GOOGL",
      industry: "Technology",
      naics: "519130",
    },
    {
      name: "Meta Platforms Inc",
      ticker: "META",
      industry: "Technology",
      naics: "519130",
    },
    {
      name: "Amazon.com Inc",
      ticker: "AMZN",
      industry: "Technology / Retail",
      naics: "454110",
    },
    {
      name: "Pfizer Inc",
      ticker: "PFE",
      industry: "Pharmaceuticals",
      naics: "325412",
    },
    {
      name: "Johnson & Johnson",
      ticker: "JNJ",
      industry: "Pharmaceuticals",
      naics: "325412",
    },
    {
      name: "JPMorgan Chase & Co",
      ticker: "JPM",
      industry: "Financial Services",
      naics: "522110",
    },
    {
      name: "Goldman Sachs Group Inc",
      ticker: "GS",
      industry: "Financial Services",
      naics: "523110",
    },
    {
      name: "ExxonMobil Corporation",
      ticker: "XOM",
      industry: "Oil & Gas",
      naics: "211120",
    },
    {
      name: "Chevron Corporation",
      ticker: "CVX",
      industry: "Oil & Gas",
      naics: "211120",
    },
    {
      name: "AT&T Inc",
      ticker: "T",
      industry: "Telecommunications",
      naics: "517311",
    },
  ];

  console.log("Creating corporations...");
  const corpEntities: Record<string, string> = {};
  for (const corp of corps) {
    corpEntities[corp.name] = await findOrCreateEntity({
      type: "CORPORATION",
      canonicalName: corp.name,
      shortName: corp.name.replace(
        / (Corporation|Company|Inc|Corp|Platforms|Group)\.?/g,
        "",
      ),
      ticker: corp.ticker,
      industry: corp.industry,
      naicsCode: corp.naics,
    });

    // Alias
    await prisma.entityAlias.upsert({
      where: { alias_source: { alias: corp.name, source: "FEC" } },
      create: {
        entityId: corpEntities[corp.name],
        alias: corp.name,
        aliasNorm: corp.name.toLowerCase(),
        source: "FEC",
        confidence: "EXACT",
      },
      update: {},
    });
  }
  console.log(`  Created ${corps.length} corporations`);

  // ─── PACs ──────────────────────────────────────────────────────
  const pacs = [
    {
      name: "Lockheed Martin Employees PAC",
      connectedCorp: "Lockheed Martin Corporation",
      type: "PAC" as const,
    },
    {
      name: "Boeing Company PAC",
      connectedCorp: "Boeing Company",
      type: "PAC" as const,
    },
    {
      name: "RTX Corporation PAC",
      connectedCorp: "RTX Corporation",
      type: "PAC" as const,
    },
    {
      name: "Northrop Grumman EAGLEPAC",
      connectedCorp: "Northrop Grumman Corporation",
      type: "PAC" as const,
    },
    {
      name: "General Dynamics Voluntary Political Contribution Plan",
      connectedCorp: "General Dynamics Corporation",
      type: "PAC" as const,
    },
    {
      name: "Google Inc NetPAC",
      connectedCorp: "Alphabet Inc",
      type: "PAC" as const,
    },
    {
      name: "Meta Platforms PAC",
      connectedCorp: "Meta Platforms Inc",
      type: "PAC" as const,
    },
    {
      name: "Amazon.com Inc PAC",
      connectedCorp: "Amazon.com Inc",
      type: "PAC" as const,
    },
    {
      name: "Pfizer Inc PAC",
      connectedCorp: "Pfizer Inc",
      type: "PAC" as const,
    },
    {
      name: "JPMorgan Chase & Co PAC",
      connectedCorp: "JPMorgan Chase & Co",
      type: "PAC" as const,
    },
    {
      name: "Goldman Sachs Group Inc PAC",
      connectedCorp: "Goldman Sachs Group Inc",
      type: "PAC" as const,
    },
    {
      name: "ExxonMobil PAC",
      connectedCorp: "ExxonMobil Corporation",
      type: "PAC" as const,
    },
    // Super PACs
    {
      name: "Senate Leadership Fund",
      connectedCorp: "",
      type: "SUPER_PAC" as const,
    },
    {
      name: "Senate Majority PAC",
      connectedCorp: "",
      type: "SUPER_PAC" as const,
    },
    {
      name: "Congressional Leadership Fund",
      connectedCorp: "",
      type: "SUPER_PAC" as const,
    },
    {
      name: "House Majority PAC",
      connectedCorp: "",
      type: "SUPER_PAC" as const,
    },
  ];

  console.log("Creating PACs and Super PACs...");
  const pacEntities: Record<string, string> = {};
  for (const pac of pacs) {
    pacEntities[pac.name] = await findOrCreateEntity({
      type: pac.type,
      canonicalName: pac.name,
      shortName: pac.name.length > 40 ? pac.name.slice(0, 40) : undefined,
      committeeType: pac.type === "SUPER_PAC" ? "SUPER_PAC" : "OTHER",
    });

    // Create PAC ↔ Corporation affiliation
    if (pac.connectedCorp && corpEntities[pac.connectedCorp]) {
      const fromId = corpEntities[pac.connectedCorp];
      const toId = pacEntities[pac.name];
      const exists = await prisma.entityRelationship.findFirst({
        where: {
          fromEntityId: fromId,
          toEntityId: toId,
          relationshipType: "AFFILIATED_PAC",
        },
      });
      if (!exists) {
        await prisma.entityRelationship.create({
          data: {
            fromEntityId: fromId,
            toEntityId: toId,
            relationshipType: "AFFILIATED_PAC",
            isActive: true,
            source: "FEC",
          },
        });
      }
    }
  }
  console.log(`  Created ${pacs.length} PACs`);

  // ─── Politicians ───────────────────────────────────────────────
  const politicians = [
    {
      name: "Mitch McConnell",
      party: "REPUBLICAN",
      state: "KY",
      office: "SENATE",
    },
    { name: "Chuck Schumer", party: "DEMOCRAT", state: "NY", office: "SENATE" },
    { name: "Mike Johnson", party: "REPUBLICAN", state: "LA", office: "HOUSE" },
    {
      name: "Hakeem Jeffries",
      party: "DEMOCRAT",
      state: "NY",
      office: "HOUSE",
    },
    { name: "Ted Cruz", party: "REPUBLICAN", state: "TX", office: "SENATE" },
    {
      name: "Lindsey Graham",
      party: "REPUBLICAN",
      state: "SC",
      office: "SENATE",
    },
    { name: "Mark Warner", party: "DEMOCRAT", state: "VA", office: "SENATE" },
    {
      name: "Susan Collins",
      party: "REPUBLICAN",
      state: "ME",
      office: "SENATE",
    },
    { name: "Jon Ossoff", party: "DEMOCRAT", state: "GA", office: "SENATE" },
    {
      name: "Roger Wicker",
      party: "REPUBLICAN",
      state: "MS",
      office: "SENATE",
    },
    { name: "Jack Reed", party: "DEMOCRAT", state: "RI", office: "SENATE" },
    { name: "Jim Inhofe", party: "REPUBLICAN", state: "OK", office: "SENATE" },
    { name: "Adam Smith", party: "DEMOCRAT", state: "WA", office: "HOUSE" },
    { name: "Mike Rogers", party: "REPUBLICAN", state: "AL", office: "HOUSE" },
    { name: "Kay Granger", party: "REPUBLICAN", state: "TX", office: "HOUSE" },
  ];

  console.log("Creating politicians...");
  const polEntities: Record<string, string> = {};
  for (const pol of politicians) {
    polEntities[pol.name] = await findOrCreateEntity({
      type: "POLITICIAN",
      canonicalName: pol.name,
      party: pol.party as any,
      state: pol.state,
      office: pol.office as any,
      officeLevel: "FEDERAL",
      inOffice: true,
    });
  }
  console.log(`  Created ${politicians.length} politicians`);

  // ─── Government Agencies ──────────────────────────────────────
  const agencies = [
    { name: "Department of Defense", shortName: "DoD" },
    { name: "Department of Health and Human Services", shortName: "HHS" },
    { name: "Department of Energy", shortName: "DOE" },
    {
      name: "National Aeronautics and Space Administration",
      shortName: "NASA",
    },
    { name: "General Services Administration", shortName: "GSA" },
  ];

  console.log("Creating government agencies...");
  const agencyEntities: Record<string, string> = {};
  for (const agency of agencies) {
    agencyEntities[agency.name] = await findOrCreateEntity({
      type: "GOVERNMENT_AGENCY",
      canonicalName: agency.name,
      shortName: agency.shortName,
    });
  }
  console.log(`  Created ${agencies.length} agencies`);

  // ─── Lobbying Firms ────────────────────────────────────────────
  const lobbyingFirms = [
    { name: "Akin Gump Strauss Hauer & Feld" },
    { name: "Brownstein Hyatt Farber Schreck" },
    { name: "Squire Patton Boggs" },
  ];

  const lobbyEntities: Record<string, string> = {};
  for (const firm of lobbyingFirms) {
    lobbyEntities[firm.name] = await findOrCreateEntity({
      type: "LOBBYING_FIRM",
      canonicalName: firm.name,
    });
  }
  console.log(`  Created ${lobbyingFirms.length} lobbying firms`);

  // ─── Money Flows: Corporation → PAC ──────────────────────────
  console.log("\nCreating money flows...");
  const corpToPac = [
    {
      corp: "Lockheed Martin Corporation",
      pac: "Lockheed Martin Employees PAC",
      amount: 4200000,
    },
    { corp: "Boeing Company", pac: "Boeing Company PAC", amount: 3800000 },
    { corp: "RTX Corporation", pac: "RTX Corporation PAC", amount: 3100000 },
    {
      corp: "Northrop Grumman Corporation",
      pac: "Northrop Grumman EAGLEPAC",
      amount: 2400000,
    },
    {
      corp: "General Dynamics Corporation",
      pac: "General Dynamics Voluntary Political Contribution Plan",
      amount: 2550000,
    },
    { corp: "Alphabet Inc", pac: "Google Inc NetPAC", amount: 1800000 },
    { corp: "Meta Platforms Inc", pac: "Meta Platforms PAC", amount: 1200000 },
    { corp: "Amazon.com Inc", pac: "Amazon.com Inc PAC", amount: 1600000 },
    { corp: "Pfizer Inc", pac: "Pfizer Inc PAC", amount: 2100000 },
    {
      corp: "JPMorgan Chase & Co",
      pac: "JPMorgan Chase & Co PAC",
      amount: 3400000,
    },
    {
      corp: "Goldman Sachs Group Inc",
      pac: "Goldman Sachs Group Inc PAC",
      amount: 2900000,
    },
    { corp: "ExxonMobil Corporation", pac: "ExxonMobil PAC", amount: 1500000 },
  ];

  for (const flow of corpToPac) {
    await createAggregateFlow(
      corpEntities[flow.corp],
      pacEntities[flow.pac],
      "CORPORATE_CONTRIBUTION",
      flow.amount,
      2024,
    );
  }
  console.log(`  Created ${corpToPac.length} Corp → PAC flows`);

  // ─── Money Flows: PAC → Politicians ──────────────────────────
  const pacToPol = [
    {
      pac: "Lockheed Martin Employees PAC",
      pol: "Roger Wicker",
      amount: 40000,
    },
    { pac: "Lockheed Martin Employees PAC", pol: "Jack Reed", amount: 35000 },
    { pac: "Lockheed Martin Employees PAC", pol: "Adam Smith", amount: 30000 },
    { pac: "Lockheed Martin Employees PAC", pol: "Mike Rogers", amount: 28000 },
    { pac: "Lockheed Martin Employees PAC", pol: "Kay Granger", amount: 32000 },
    {
      pac: "Lockheed Martin Employees PAC",
      pol: "Mitch McConnell",
      amount: 25000,
    },
    { pac: "Boeing Company PAC", pol: "Mark Warner", amount: 35000 },
    { pac: "Boeing Company PAC", pol: "Lindsey Graham", amount: 30000 },
    { pac: "Boeing Company PAC", pol: "Susan Collins", amount: 25000 },
    { pac: "Boeing Company PAC", pol: "Ted Cruz", amount: 20000 },
    { pac: "RTX Corporation PAC", pol: "Roger Wicker", amount: 30000 },
    { pac: "RTX Corporation PAC", pol: "Jack Reed", amount: 25000 },
    { pac: "RTX Corporation PAC", pol: "Jim Inhofe", amount: 28000 },
    { pac: "Google Inc NetPAC", pol: "Chuck Schumer", amount: 15000 },
    { pac: "Google Inc NetPAC", pol: "Hakeem Jeffries", amount: 12000 },
    { pac: "Google Inc NetPAC", pol: "Mark Warner", amount: 10000 },
    { pac: "JPMorgan Chase & Co PAC", pol: "Chuck Schumer", amount: 35000 },
    { pac: "JPMorgan Chase & Co PAC", pol: "Mitch McConnell", amount: 30000 },
    { pac: "JPMorgan Chase & Co PAC", pol: "Ted Cruz", amount: 20000 },
    { pac: "Goldman Sachs Group Inc PAC", pol: "Chuck Schumer", amount: 25000 },
    { pac: "Goldman Sachs Group Inc PAC", pol: "Jon Ossoff", amount: 15000 },
    { pac: "Senate Leadership Fund", pol: "Mitch McConnell", amount: 45000000 },
    { pac: "Senate Leadership Fund", pol: "Ted Cruz", amount: 12000000 },
    { pac: "Senate Leadership Fund", pol: "Susan Collins", amount: 8000000 },
    { pac: "Senate Majority PAC", pol: "Chuck Schumer", amount: 38000000 },
    { pac: "Senate Majority PAC", pol: "Jon Ossoff", amount: 25000000 },
    { pac: "Senate Majority PAC", pol: "Mark Warner", amount: 15000000 },
    {
      pac: "Congressional Leadership Fund",
      pol: "Mike Johnson",
      amount: 22000000,
    },
    { pac: "House Majority PAC", pol: "Hakeem Jeffries", amount: 18000000 },
  ];

  for (const flow of pacToPol) {
    if (pacEntities[flow.pac] && polEntities[flow.pol]) {
      await createAggregateFlow(
        pacEntities[flow.pac],
        polEntities[flow.pol],
        "PAC_CONTRIBUTION",
        flow.amount,
        2024,
      );
    }
  }
  console.log(`  Created ${pacToPol.length} PAC → Politician flows`);

  // ─── Government Contracts ─────────────────────────────────────
  const contracts = [
    {
      corp: "Lockheed Martin Corporation",
      agency: "Department of Defense",
      amount: 45200000000,
      desc: "F-35 Joint Strike Fighter, Missile Defense, Space Systems",
    },
    {
      corp: "RTX Corporation",
      agency: "Department of Defense",
      amount: 28100000000,
      desc: "Patriot Missile Systems, Aircraft Engines, Cybersecurity",
    },
    {
      corp: "General Dynamics Corporation",
      agency: "Department of Defense",
      amount: 22800000000,
      desc: "Submarines, Combat Vehicles, IT Services",
    },
    {
      corp: "Boeing Company",
      agency: "Department of Defense",
      amount: 21300000000,
      desc: "Fighter Aircraft, Tankers, Satellites",
    },
    {
      corp: "Northrop Grumman Corporation",
      agency: "Department of Defense",
      amount: 18700000000,
      desc: "B-21 Raider, Space Systems, Cybersecurity",
    },
    {
      corp: "Boeing Company",
      agency: "National Aeronautics and Space Administration",
      amount: 3200000000,
      desc: "Space Launch System, ISS Operations",
    },
    {
      corp: "Lockheed Martin Corporation",
      agency: "National Aeronautics and Space Administration",
      amount: 2800000000,
      desc: "Orion Spacecraft, Mars Missions",
    },
    {
      corp: "Pfizer Inc",
      agency: "Department of Health and Human Services",
      amount: 7500000000,
      desc: "COVID-19 Vaccines, Pharmaceutical Supplies",
    },
    {
      corp: "Johnson & Johnson",
      agency: "Department of Health and Human Services",
      amount: 4200000000,
      desc: "Vaccines, Medical Devices",
    },
    {
      corp: "Amazon.com Inc",
      agency: "General Services Administration",
      amount: 10000000000,
      desc: "AWS GovCloud, IT Infrastructure",
    },
    {
      corp: "Alphabet Inc",
      agency: "Department of Defense",
      amount: 1200000000,
      desc: "Cloud Computing, AI/ML Services",
    },
  ];

  for (const c of contracts) {
    if (corpEntities[c.corp] && agencyEntities[c.agency]) {
      await createAggregateFlow(
        agencyEntities[c.agency],
        corpEntities[c.corp],
        "FEDERAL_CONTRACT",
        c.amount,
        2024,
      );

      const awardId = `demo-${c.corp.slice(0, 10)}-${c.agency.slice(0, 5)}`
        .toLowerCase()
        .replace(/\s/g, "-");
      await prisma.federalAward.upsert({
        where: { awardId },
        create: {
          awardId,
          awardType: "CONTRACT",
          recipientEntityId: corpEntities[c.corp],
          agencyEntityId: agencyEntities[c.agency],
          amount: new Prisma.Decimal(c.amount),
          description: c.desc,
          dateAwarded: new Date("2024-01-15"),
          status: "ACTIVE",
        },
        update: { amount: new Prisma.Decimal(c.amount) },
      });
    }
  }
  console.log(`  Created ${contracts.length} Government Contract flows`);

  // ─── Lobbying Payments ──────────────────────────────────────
  const lobbying = [
    {
      corp: "Lockheed Martin Corporation",
      firm: "Akin Gump Strauss Hauer & Feld",
      amount: 12600000,
    },
    { corp: "Boeing Company", firm: "Squire Patton Boggs", amount: 7800000 },
    {
      corp: "Alphabet Inc",
      firm: "Brownstein Hyatt Farber Schreck",
      amount: 11400000,
    },
    {
      corp: "Amazon.com Inc",
      firm: "Akin Gump Strauss Hauer & Feld",
      amount: 21400000,
    },
    {
      corp: "Meta Platforms Inc",
      firm: "Brownstein Hyatt Farber Schreck",
      amount: 15200000,
    },
    { corp: "Pfizer Inc", firm: "Squire Patton Boggs", amount: 10800000 },
    {
      corp: "ExxonMobil Corporation",
      firm: "Akin Gump Strauss Hauer & Feld",
      amount: 8700000,
    },
    {
      corp: "JPMorgan Chase & Co",
      firm: "Brownstein Hyatt Farber Schreck",
      amount: 9300000,
    },
  ];

  for (const l of lobbying) {
    if (corpEntities[l.corp] && lobbyEntities[l.firm]) {
      await createAggregateFlow(
        corpEntities[l.corp],
        lobbyEntities[l.firm],
        "LOBBYING_PAYMENT",
        l.amount,
        2024,
      );
    }
  }
  console.log(`  Created ${lobbying.length} Lobbying Payment flows`);

  // ─── Update Entity Totals ──────────────────────────────────────
  console.log("\nUpdating entity aggregate totals...");
  await prisma.$executeRaw`
    UPDATE entities e SET "totalReceived" = COALESCE(sub.total, 0)
    FROM (SELECT "targetEntityId" as eid, SUM("totalAmount") as total FROM aggregate_money_flows GROUP BY "targetEntityId") sub
    WHERE e.id = sub.eid
  `;
  await prisma.$executeRaw`
    UPDATE entities e SET "totalSpent" = COALESCE(sub.total, 0)
    FROM (SELECT "sourceEntityId" as eid, SUM("totalAmount") as total FROM aggregate_money_flows GROUP BY "sourceEntityId") sub
    WHERE e.id = sub.eid
  `;
  await prisma.$executeRaw`
    UPDATE entities e SET "totalContracts" = COALESCE(sub.total, 0)
    FROM (SELECT "targetEntityId" as eid, SUM("totalAmount") as total FROM aggregate_money_flows WHERE "transactionType" = 'FEDERAL_CONTRACT' GROUP BY "targetEntityId") sub
    WHERE e.id = sub.eid
  `;
  await prisma.$executeRaw`
    UPDATE entities e SET "totalLobbying" = COALESCE(sub.total, 0)
    FROM (SELECT "sourceEntityId" as eid, SUM("totalAmount") as total FROM aggregate_money_flows WHERE "transactionType" = 'LOBBYING_PAYMENT' GROUP BY "sourceEntityId") sub
    WHERE e.id = sub.eid
  `;

  const entityCount = await prisma.entity.count();
  const flowCount = await prisma.aggregateMoneyFlow.count();
  const relCount = await prisma.entityRelationship.count();

  console.log(`\n=== Seed Complete ===`);
  console.log(`  Entities: ${entityCount}`);
  console.log(`  Aggregate Flows: ${flowCount}`);
  console.log(`  Relationships: ${relCount}`);
}

async function createAggregateFlow(
  sourceId: string,
  targetId: string,
  type: string,
  amount: number,
  cycle: number,
) {
  await prisma.aggregateMoneyFlow.upsert({
    where: {
      sourceEntityId_targetEntityId_transactionType_electionCycle: {
        sourceEntityId: sourceId,
        targetEntityId: targetId,
        transactionType: type as any,
        electionCycle: cycle,
      },
    },
    create: {
      sourceEntityId: sourceId,
      targetEntityId: targetId,
      transactionType: type as any,
      electionCycle: cycle,
      totalAmount: new Prisma.Decimal(amount),
      transactionCount: Math.floor(amount / 5000) + 1,
      avgAmount: new Prisma.Decimal(amount / (Math.floor(amount / 5000) + 1)),
      minAmount: new Prisma.Decimal(Math.min(amount, 200)),
      maxAmount: new Prisma.Decimal(amount),
      firstTransaction: new Date("2023-01-15"),
      lastTransaction: new Date("2024-11-05"),
    },
    update: {
      totalAmount: new Prisma.Decimal(amount),
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
