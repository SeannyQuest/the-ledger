import { EntityBadge } from "@/components/shared/EntityBadge";
import { EntityTabs } from "@/components/entity/EntityTabs";
import { PARTY_COLORS } from "@/lib/constants";
import type { EntityType } from "@/types";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EntityProfilePage({
  params,
}: {
  params: Promise<{ type: string; id: string }>;
}) {
  const { type, id } = await params;

  const entity = await prisma.entity.findUnique({
    where: { id },
    include: {
      aliases: { select: { alias: true, source: true } },
      relationshipsFrom: {
        include: {
          toEntity: { select: { id: true, type: true, canonicalName: true } },
        },
        where: { isActive: true },
        take: 20,
      },
      relationshipsTo: {
        include: {
          fromEntity: { select: { id: true, type: true, canonicalName: true } },
        },
        where: { isActive: true },
        take: 20,
      },
    },
  });

  if (!entity) notFound();

  const entityType = entity.type.toLowerCase() as EntityType;

  // Get top inflows and outflows
  const [topDonors, topRecipients] = await Promise.all([
    prisma.aggregateMoneyFlow.findMany({
      where: { targetEntityId: id },
      orderBy: { totalAmount: "desc" },
      take: 10,
    }),
    prisma.aggregateMoneyFlow.findMany({
      where: { sourceEntityId: id },
      orderBy: { totalAmount: "desc" },
      take: 10,
    }),
  ]);

  // Resolve names for donors/recipients
  const relatedIds = new Set<string>();
  for (const d of topDonors) relatedIds.add(d.sourceEntityId);
  for (const r of topRecipients) relatedIds.add(r.targetEntityId);

  const relatedEntities = await prisma.entity.findMany({
    where: { id: { in: [...relatedIds] } },
    select: { id: true, type: true, canonicalName: true },
  });
  const nameMap = new Map(relatedEntities.map((e) => [e.id, e]));

  // Serialize relationships
  const relationships = [
    ...entity.relationshipsFrom.map((r) => ({
      type: r.relationshipType,
      direction: "outgoing" as const,
      entityId: r.toEntity.id,
      entityType: r.toEntity.type,
      entityName: r.toEntity.canonicalName,
    })),
    ...entity.relationshipsTo.map((r) => ({
      type: r.relationshipType,
      direction: "incoming" as const,
      entityId: r.fromEntity.id,
      entityType: r.fromEntity.type,
      entityName: r.fromEntity.canonicalName,
    })),
  ];

  // Serialize stats
  const stats = [
    { label: "Total Received", amount: Number(entity.totalReceived) },
    { label: "Total Spent", amount: Number(entity.totalSpent) },
    { label: "Total Contributed", amount: Number(entity.totalContributed) },
    { label: "Lobbying Spend", amount: Number(entity.totalLobbying) },
    { label: "Gov. Contracts", amount: Number(entity.totalContracts) },
  ];

  // Serialize donors
  const serializedDonors = topDonors.map((d) => {
    const source = nameMap.get(d.sourceEntityId);
    return {
      id: d.id,
      sourceEntityId: d.sourceEntityId,
      sourceName: source?.canonicalName ?? "Unknown",
      sourceType: source?.type ?? "corporation",
      transactionType: d.transactionType,
      totalAmount: Number(d.totalAmount),
    };
  });

  // Serialize recipients
  const serializedRecipients = topRecipients.map((r) => {
    const target = nameMap.get(r.targetEntityId);
    return {
      id: r.id,
      targetEntityId: r.targetEntityId,
      targetName: target?.canonicalName ?? "Unknown",
      targetType: target?.type ?? "corporation",
      transactionType: r.transactionType,
      totalAmount: Number(r.totalAmount),
    };
  });

  // Serialize entity metadata for profile tab
  const entityMeta = {
    id: entity.id,
    type: entity.type,
    canonicalName: entity.canonicalName,
    description: entity.description ?? null,
    industry: entity.industry ?? null,
    ticker: entity.ticker ?? null,
    website: entity.websiteUrl ?? null,
    state: entity.state ?? null,
    office: entity.office ?? null,
    party: entity.party ?? null,
    photoUrl: entity.photoUrl ?? null,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      {/* Entity Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <EntityBadge type={entityType} size="md" />
            {entity.party && (
              <span
                className="rounded-full px-3 py-1 font-mono text-xs font-bold text-white"
                style={{
                  backgroundColor:
                    PARTY_COLORS[entity.party.toLowerCase()] ?? "#6b7280",
                }}
              >
                {entity.party}
              </span>
            )}
            {entity.state && (
              <span className="rounded border border-border px-2 py-0.5 font-mono text-xs text-muted">
                {entity.state}
                {entity.office ? ` \u2022 ${entity.office}` : ""}
              </span>
            )}
          </div>
          <h1 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {entity.canonicalName}
          </h1>
          {entity.shortName && entity.shortName !== entity.canonicalName && (
            <p className="mt-1 text-lg text-muted">{entity.shortName}</p>
          )}
          {entity.industry && (
            <p className="mt-1 font-mono text-sm text-muted">
              {entity.industry}
              {entity.ticker ? ` \u2022 ${entity.ticker}` : ""}
            </p>
          )}
        </div>
        <Link
          href={`/network?entity=${id}`}
          className="inline-flex w-fit shrink-0 rounded-lg border border-border bg-surface px-4 py-2 font-mono text-xs font-medium text-muted transition-colors hover:border-ink/30 hover:text-ink"
        >
          View Network
        </Link>
      </div>

      {/* Tabbed Content */}
      <EntityTabs
        stats={stats}
        topDonors={serializedDonors}
        topRecipients={serializedRecipients}
        relationships={relationships}
        aliases={entity.aliases}
        entity={entityMeta}
      />
    </div>
  );
}
