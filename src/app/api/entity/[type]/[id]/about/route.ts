import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchEntityAbout } from "@/lib/wikipedia";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ type: string; id: string }> },
) {
  const { id } = await params;

  const entity = await prisma.entity.findUnique({
    where: { id },
    select: {
      id: true,
      canonicalName: true,
      type: true,
      description: true,
      photoUrl: true,
      state: true,
      party: true,
      office: true,
      industry: true,
    },
  });

  if (!entity) {
    return NextResponse.json({ error: "Entity not found" }, { status: 404 });
  }

  // If we already have a cached description, return it immediately
  if (entity.description) {
    return NextResponse.json({
      summary: entity.description,
      thumbnailUrl: entity.photoUrl,
      wikipediaUrl: null,
      cached: true,
    });
  }

  // Fetch from Wikipedia
  const about = await fetchEntityAbout(entity.canonicalName, entity.type, {
    state: entity.state,
    party: entity.party,
    office: entity.office,
    industry: entity.industry,
  });

  if (!about) {
    return NextResponse.json({
      summary: null,
      thumbnailUrl: entity.photoUrl,
      wikipediaUrl: null,
      cached: false,
    });
  }

  // Cache the description and photo in the database (fire and forget)
  prisma.entity
    .update({
      where: { id },
      data: {
        description: about.summary,
        ...(about.thumbnailUrl && !entity.photoUrl
          ? { photoUrl: about.thumbnailUrl }
          : {}),
      },
    })
    .catch(() => {
      // Non-critical — don't fail the response
    });

  return NextResponse.json({
    summary: about.summary,
    thumbnailUrl: about.thumbnailUrl ?? entity.photoUrl,
    wikipediaUrl: about.wikipediaUrl,
    cached: false,
  });
}
