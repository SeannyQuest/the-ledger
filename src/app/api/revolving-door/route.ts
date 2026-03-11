import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/revolving-door
 *
 * Query EntityRelationships for career transitions between
 * government, lobbying, and corporate sectors.
 *
 * Returns:
 * - transitions: grouped cross-sector moves per person
 * - timelines: per-person career timeline with all positions ordered chronologically
 * - allRelationships: raw relationship list
 * - stats: summary counts including top industries and avg govt tenure
 */

const GOVT_TYPES = ["POLITICIAN", "GOVERNMENT_AGENCY"];
const PRIVATE_TYPES = ["CORPORATION", "LOBBYING_FIRM", "LOBBYIST"];

function isGovtType(type: string) {
  return GOVT_TYPES.includes(type);
}

function isPrivateType(type: string) {
  return PRIVATE_TYPES.includes(type);
}

function toDateStr(d: Date | null | undefined): string | null {
  return d ? d.toISOString().split("T")[0] : null;
}

export async function GET() {
  // Find entities with employment/board relationships across sectors
  const relationships = await prisma.entityRelationship.findMany({
    where: {
      relationshipType: {
        in: ["EMPLOYMENT", "BOARD_MEMBER", "FORMER_EMPLOYEE", "CONSULTANT"],
      },
    },
    include: {
      fromEntity: {
        select: { id: true, canonicalName: true, type: true, industry: true },
      },
      toEntity: {
        select: { id: true, canonicalName: true, type: true, industry: true },
      },
    },
    orderBy: { startDate: "desc" },
    take: 200,
  });

  // Find cross-sector transitions
  const transitions = relationships.filter((r) => {
    const fromGovt = isGovtType(r.fromEntity.type);
    const toGovt = isGovtType(r.toEntity.type);
    const fromPrivate = isPrivateType(r.fromEntity.type);
    const toPrivate = isPrivateType(r.toEntity.type);
    return (fromGovt && toPrivate) || (fromPrivate && toGovt);
  });

  // Group by person (the person is the entity who moves between sectors)
  const personTransitions = new Map<
    string,
    {
      person: { id: string; name: string; type: string };
      moves: Array<{
        from: { id: string; name: string; type: string };
        to: { id: string; name: string; type: string };
        relationshipType: string;
        title: string | null;
        startDate: string | null;
        endDate: string | null;
        isActive: boolean;
      }>;
    }
  >();

  for (const r of transitions) {
    const person = isGovtType(r.fromEntity.type) ? r.fromEntity : r.toEntity;
    const personKey = person.id;

    if (!personTransitions.has(personKey)) {
      personTransitions.set(personKey, {
        person: {
          id: person.id,
          name: person.canonicalName,
          type: person.type.toLowerCase(),
        },
        moves: [],
      });
    }

    personTransitions.get(personKey)!.moves.push({
      from: {
        id: r.fromEntity.id,
        name: r.fromEntity.canonicalName,
        type: r.fromEntity.type.toLowerCase(),
      },
      to: {
        id: r.toEntity.id,
        name: r.toEntity.canonicalName,
        type: r.toEntity.type.toLowerCase(),
      },
      relationshipType: r.relationshipType,
      title: r.title,
      startDate: toDateStr(r.startDate),
      endDate: toDateStr(r.endDate),
      isActive: r.isActive,
    });
  }

  // ── Build career timelines ──
  // For each person with cross-sector moves, collect ALL their relationship
  // records (not just cross-sector ones) and build a chronological timeline.
  const personIds = [...personTransitions.keys()];

  // Get all relationships involving these people (both directions)
  const personRelationships = relationships.filter(
    (r) =>
      personIds.includes(r.fromEntity.id) || personIds.includes(r.toEntity.id),
  );

  // Build timeline per person
  interface TimelinePosition {
    organization: {
      id: string;
      name: string;
      type: string;
      industry: string | null;
    };
    role: string | null;
    relationshipType: string;
    startDate: string | null;
    endDate: string | null;
    isActive: boolean;
    sector: "government" | "private" | "other";
  }

  interface PersonTimeline {
    person: { id: string; name: string; type: string };
    positions: TimelinePosition[];
    totalMoves: number;
  }

  const timelinesMap = new Map<string, PersonTimeline>();

  for (const r of personRelationships) {
    // Determine which entity is the "person" and which is the "org"
    const isFromPerson = personIds.includes(r.fromEntity.id);
    const person = isFromPerson ? r.fromEntity : r.toEntity;
    const org = isFromPerson ? r.toEntity : r.fromEntity;
    const personKey = person.id;

    if (!timelinesMap.has(personKey)) {
      timelinesMap.set(personKey, {
        person: {
          id: person.id,
          name: person.canonicalName,
          type: person.type.toLowerCase(),
        },
        positions: [],
        totalMoves: 0,
      });
    }

    const sector: "government" | "private" | "other" = isGovtType(org.type)
      ? "government"
      : isPrivateType(org.type)
        ? "private"
        : "other";

    timelinesMap.get(personKey)!.positions.push({
      organization: {
        id: org.id,
        name: org.canonicalName,
        type: org.type.toLowerCase(),
        industry: org.industry,
      },
      role: r.title,
      relationshipType: r.relationshipType,
      startDate: toDateStr(r.startDate),
      endDate: toDateStr(r.endDate),
      isActive: r.isActive,
      sector,
    });
  }

  // Sort positions chronologically within each timeline
  for (const timeline of timelinesMap.values()) {
    timeline.positions.sort((a, b) => {
      const aDate = a.startDate ?? "9999";
      const bDate = b.startDate ?? "9999";
      return aDate.localeCompare(bDate);
    });
    timeline.totalMoves = timeline.positions.length;
  }

  const timelines = [...timelinesMap.values()]
    .filter((t) => t.positions.length >= 2)
    .sort((a, b) => b.totalMoves - a.totalMoves)
    .slice(0, 50);

  // ── Enhanced stats ──
  const govtToPrivate = transitions.filter(
    (r) => isGovtType(r.fromEntity.type) && isPrivateType(r.toEntity.type),
  ).length;

  const privateToGovt = transitions.filter(
    (r) => isPrivateType(r.fromEntity.type) && isGovtType(r.toEntity.type),
  ).length;

  // Top industries that people move to/from
  const industryCounts = new Map<string, number>();
  for (const r of transitions) {
    const privateEntity = isPrivateType(r.fromEntity.type)
      ? r.fromEntity
      : r.toEntity;
    const industry = privateEntity.industry ?? "Unknown";
    industryCounts.set(industry, (industryCounts.get(industry) ?? 0) + 1);
  }
  const topIndustries = [...industryCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([industry, count]) => ({ industry, count }));

  // Average time in government (for people who have dated govt positions)
  let totalGovtDays = 0;
  let govtPositionsWithDates = 0;
  for (const timeline of timelines) {
    for (const pos of timeline.positions) {
      if (pos.sector === "government" && pos.startDate && pos.endDate) {
        const start = new Date(pos.startDate).getTime();
        const end = new Date(pos.endDate).getTime();
        const days = (end - start) / (1000 * 60 * 60 * 24);
        if (days > 0) {
          totalGovtDays += days;
          govtPositionsWithDates++;
        }
      }
    }
  }
  const avgGovtTenureDays =
    govtPositionsWithDates > 0
      ? Math.round(totalGovtDays / govtPositionsWithDates)
      : 0;
  const avgGovtTenureYears =
    avgGovtTenureDays > 0 ? +(avgGovtTenureDays / 365).toFixed(1) : 0;

  return NextResponse.json({
    transitions: [...personTransitions.values()]
      .sort((a, b) => b.moves.length - a.moves.length)
      .slice(0, 50),
    timelines,
    allRelationships: relationships.slice(0, 100).map((r) => ({
      id: r.id,
      from: {
        id: r.fromEntity.id,
        name: r.fromEntity.canonicalName,
        type: r.fromEntity.type.toLowerCase(),
      },
      to: {
        id: r.toEntity.id,
        name: r.toEntity.canonicalName,
        type: r.toEntity.type.toLowerCase(),
      },
      type: r.relationshipType,
      title: r.title,
      startDate: toDateStr(r.startDate),
      endDate: toDateStr(r.endDate),
      isActive: r.isActive,
    })),
    stats: {
      totalTransitions: transitions.length,
      uniquePeople: personTransitions.size,
      govtToPrivate,
      privateToGovt,
      totalRelationships: relationships.length,
      topIndustries,
      avgGovtTenureYears,
    },
  });
}
