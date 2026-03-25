/**
 * Compute Aggregate Money Flows
 *
 * Reads all MoneyTransaction records and computes aggregated flows
 * between entities per election cycle. These aggregates power the
 * Sankey diagram and network graph visualizations.
 *
 * Usage: npx tsx scripts/compute-aggregates.ts
 */

import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

function electionCycleForDate(date: Date): number {
  const year = date.getFullYear();
  // Election cycles are 2-year periods ending in even years
  return year % 2 === 0 ? year : year + 1;
}

async function computeAggregates() {
  console.log("=== Computing Aggregate Money Flows ===\n");

  const syncLog = await prisma.syncLog.create({
    data: {
      source: "MANUAL",
      syncType: "compute_aggregates",
      status: "RUNNING",
      startedAt: new Date(),
    },
  });

  try {
    // Get distinct source-target-type-cycle combinations
    // Using raw SQL for the aggregation since Prisma doesn't support
    // complex GROUP BY with computed fields well
    const aggregates = await prisma.$queryRaw<
      Array<{
        source_entity_id: string;
        target_entity_id: string;
        transaction_type: string;
        election_cycle: number;
        total_amount: bigint | number;
        transaction_count: bigint | number;
        avg_amount: bigint | number;
        min_amount: bigint | number;
        max_amount: bigint | number;
        first_transaction: Date;
        last_transaction: Date;
      }>
    >`
      SELECT
        source_entity_id,
        target_entity_id,
        transaction_type::text,
        CASE
          WHEN EXTRACT(YEAR FROM transaction_date)::int % 2 = 0
          THEN EXTRACT(YEAR FROM transaction_date)::int
          ELSE EXTRACT(YEAR FROM transaction_date)::int + 1
        END as election_cycle,
        SUM(amount) as total_amount,
        COUNT(*)::int as transaction_count,
        AVG(amount) as avg_amount,
        MIN(amount) as min_amount,
        MAX(amount) as max_amount,
        MIN(transaction_date) as first_transaction,
        MAX(transaction_date) as last_transaction
      FROM money_transactions
      WHERE source_entity_id IS NOT NULL
        AND target_entity_id IS NOT NULL
      GROUP BY
        source_entity_id,
        target_entity_id,
        transaction_type,
        CASE
          WHEN EXTRACT(YEAR FROM transaction_date)::int % 2 = 0
          THEN EXTRACT(YEAR FROM transaction_date)::int
          ELSE EXTRACT(YEAR FROM transaction_date)::int + 1
        END
    `;

    console.log(`Found ${aggregates.length} unique flow combinations`);

    let upserted = 0;

    for (const agg of aggregates) {
      await prisma.aggregateMoneyFlow.upsert({
        where: {
          sourceEntityId_targetEntityId_transactionType_electionCycle: {
            sourceEntityId: agg.source_entity_id,
            targetEntityId: agg.target_entity_id,
            transactionType: agg.transaction_type as any,
            electionCycle: Number(agg.election_cycle),
          },
        },
        create: {
          sourceEntityId: agg.source_entity_id,
          targetEntityId: agg.target_entity_id,
          transactionType: agg.transaction_type as any,
          electionCycle: Number(agg.election_cycle),
          totalAmount: Number(agg.total_amount),
          transactionCount: Number(agg.transaction_count),
          avgAmount: Number(agg.avg_amount),
          minAmount: Number(agg.min_amount),
          maxAmount: Number(agg.max_amount),
          firstTransaction: agg.first_transaction,
          lastTransaction: agg.last_transaction,
        },
        update: {
          totalAmount: Number(agg.total_amount),
          transactionCount: Number(agg.transaction_count),
          avgAmount: Number(agg.avg_amount),
          minAmount: Number(agg.min_amount),
          maxAmount: Number(agg.max_amount),
          firstTransaction: agg.first_transaction,
          lastTransaction: agg.last_transaction,
        },
      });

      upserted++;
      if (upserted % 100 === 0) {
        console.log(
          `  Upserted ${upserted}/${aggregates.length} aggregates...`,
        );
      }
    }

    // Also update entity aggregate totals
    console.log("\nUpdating entity aggregate totals...");
    await updateEntityTotals();

    await prisma.syncLog.update({
      where: { id: syncLog.id },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
        recordsProcessed: aggregates.length,
        recordsCreated: upserted,
      },
    });

    console.log(`\nDone: ${upserted} aggregate flows computed`);
  } catch (err) {
    await prisma.syncLog.update({
      where: { id: syncLog.id },
      data: {
        status: "FAILED",
        completedAt: new Date(),
        errorMessage: err instanceof Error ? err.message : String(err),
      },
    });
    console.error("Aggregate computation failed:", err);
    throw err;
  }
}

async function updateEntityTotals() {
  // Update totalReceived (sum of inflow transactions)
  await prisma.$executeRaw`
    UPDATE entities e
    SET total_received = COALESCE(sub.total, 0)
    FROM (
      SELECT target_entity_id as entity_id, SUM(amount) as total
      FROM money_transactions
      WHERE target_entity_id IS NOT NULL
      GROUP BY target_entity_id
    ) sub
    WHERE e.id = sub.entity_id
  `;

  // Update totalSpent (sum of outflow transactions)
  await prisma.$executeRaw`
    UPDATE entities e
    SET total_spent = COALESCE(sub.total, 0)
    FROM (
      SELECT source_entity_id as entity_id, SUM(amount) as total
      FROM money_transactions
      WHERE source_entity_id IS NOT NULL
      GROUP BY source_entity_id
    ) sub
    WHERE e.id = sub.entity_id
  `;

  // Update totalContributed (donations given)
  await prisma.$executeRaw`
    UPDATE entities e
    SET total_contributed = COALESCE(sub.total, 0)
    FROM (
      SELECT source_entity_id as entity_id, SUM(amount) as total
      FROM money_transactions
      WHERE source_entity_id IS NOT NULL
        AND transaction_type IN ('INDIVIDUAL_CONTRIBUTION', 'PAC_CONTRIBUTION', 'PARTY_CONTRIBUTION', 'CANDIDATE_CONTRIBUTION', 'CORPORATE_CONTRIBUTION')
      GROUP BY source_entity_id
    ) sub
    WHERE e.id = sub.entity_id
  `;

  // Update totalLobbying (lobbying payments)
  await prisma.$executeRaw`
    UPDATE entities e
    SET total_lobbying = COALESCE(sub.total, 0)
    FROM (
      SELECT source_entity_id as entity_id, SUM(amount) as total
      FROM money_transactions
      WHERE source_entity_id IS NOT NULL
        AND transaction_type = 'LOBBYING_PAYMENT'
      GROUP BY source_entity_id
    ) sub
    WHERE e.id = sub.entity_id
  `;

  // Update totalContracts (federal contracts received)
  await prisma.$executeRaw`
    UPDATE entities e
    SET total_contracts = COALESCE(sub.total, 0)
    FROM (
      SELECT target_entity_id as entity_id, SUM(amount) as total
      FROM money_transactions
      WHERE target_entity_id IS NOT NULL
        AND transaction_type IN ('FEDERAL_CONTRACT', 'FEDERAL_GRANT')
      GROUP BY target_entity_id
    ) sub
    WHERE e.id = sub.entity_id
  `;

  console.log("  Entity totals updated");
}

async function main() {
  console.log("=== Daonra | Aggregate Computation ===");
  await computeAggregates();
  console.log("\n=== Complete ===");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
