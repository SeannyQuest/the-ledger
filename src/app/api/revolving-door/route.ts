import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/revolving-door
 *
 * Query EntityRelationships for career transitions between
 * government, lobbying, and corporate sectors.
 */
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

  // Find cross-sector transitions (e.g., politician → lobbying firm, agency → corporation)
  const GOVT_TYPES = ["POLITICIAN", "GOVERNMENT_AGENCY"];
  const PRIVATE_TYPES = ["CORPORATION", "LOBBYING_FIRM", "LOBBYIST"];

  const transitions = relationships.filter((r) => {
    const fromGovt = GOVT_TYPES.includes(r.fromEntity.type);
    const toGovt = GOVT_TYPES.includes(r.toEntity.type);
    const fromPrivate = PRIVATE_TYPES.includes(r.fromEntity.type);
    const toPrivate = PRIVATE_TYPES.includes(r.toEntity.type);

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
    // Determine who the "person" is (politicians move, corps stay)
    const person = GOVT_TYPES.includes(r.fromEntity.type)
      ? r.fromEntity
      : r.toEntity;
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
      startDate: r.startDate?.toISOString().split("T")[0] ?? null,
      endDate: r.endDate?.toISOString().split("T")[0] ?? null,
      isActive: r.isActive,
    });
  }

  // Stats
  const govtToPrivate = transitions.filter(
    (r) =>
      GOVT_TYPES.includes(r.fromEntity.type) &&
      PRIVATE_TYPES.includes(r.toEntity.type),
  ).length;

  const privateToGovt = transitions.filter(
    (r) =>
      PRIVATE_TYPES.includes(r.fromEntity.type) &&
      GOVT_TYPES.includes(r.toEntity.type),
  ).length;

  return NextResponse.json({
    transitions: [...personTransitions.values()]
      .sort((a, b) => b.moves.length - a.moves.length)
      .slice(0, 50),
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
      startDate: r.startDate?.toISOString().split("T")[0] ?? null,
      endDate: r.endDate?.toISOString().split("T")[0] ?? null,
      isActive: r.isActive,
    })),
    stats: {
      totalTransitions: transitions.length,
      uniquePeople: personTransitions.size,
      govtToPrivate,
      privateToGovt,
      totalRelationships: relationships.length,
    },
  });
}
