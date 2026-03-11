import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Industry slug → display name / NAICS prefix mapping.
 * NAICS prefixes are used to match entities by naicsCode.
 */
export const INDUSTRY_MAP: Record<
  string,
  { name: string; description: string; naicsPrefixes: string[]; keywords: string[] }
> = {
  defense: {
    name: "Defense & Aerospace",
    description:
      "Military contractors, weapons manufacturers, and aerospace companies that receive billions in federal contracts.",
    naicsPrefixes: ["3364", "3369", "9271", "5415"],
    keywords: ["defense", "aerospace", "military", "weapons", "arms"],
  },
  pharmaceuticals: {
    name: "Pharmaceuticals & Health",
    description:
      "Drug makers, medical device companies, and health insurers that spend heavily on lobbying drug pricing and FDA regulations.",
    naicsPrefixes: ["3254", "3391", "5242", "6211", "6221"],
    keywords: ["pharma", "pharmaceutical", "drug", "health", "medical", "biotech"],
  },
  technology: {
    name: "Technology",
    description:
      "Big Tech firms lobbying on antitrust, data privacy, AI regulation, and government IT contracts.",
    naicsPrefixes: ["5112", "5182", "5191", "5415", "3341", "3342", "3344"],
    keywords: ["tech", "technology", "software", "internet", "computer", "data", "ai"],
  },
  "oil-gas": {
    name: "Oil, Gas & Energy",
    description:
      "Fossil fuel producers, pipeline operators, and utilities fighting climate regulation while securing drilling leases.",
    naicsPrefixes: ["2111", "2121", "2131", "3241", "4861", "2211"],
    keywords: ["oil", "gas", "energy", "petroleum", "fossil", "fuel", "pipeline", "mining"],
  },
  finance: {
    name: "Finance & Banking",
    description:
      "Wall Street banks, hedge funds, and financial services firms shaping banking regulations and tax policy.",
    naicsPrefixes: ["5221", "5222", "5231", "5239", "5241"],
    keywords: ["bank", "finance", "financial", "investment", "securities", "hedge fund", "wall street"],
  },
  insurance: {
    name: "Insurance",
    description:
      "Property, casualty, life, and health insurance companies influencing healthcare and liability law.",
    naicsPrefixes: ["5241", "5242"],
    keywords: ["insurance", "insurer", "underwriter"],
  },
  telecom: {
    name: "Telecommunications",
    description:
      "Phone, cable, and broadband providers lobbying on net neutrality, spectrum allocation, and media ownership.",
    naicsPrefixes: ["5171", "5172", "5174", "5179", "5151"],
    keywords: ["telecom", "telecommunications", "wireless", "broadband", "cable"],
  },
  agriculture: {
    name: "Agriculture & Food",
    description:
      "Agribusiness, food processors, and farm lobbies shaping subsidies, trade policy, and environmental rules.",
    naicsPrefixes: ["1111", "1112", "1113", "1114", "3111", "3112", "3116"],
    keywords: ["agriculture", "farm", "food", "agri", "crop", "grain", "livestock"],
  },
};

/**
 * GET /api/industry
 *
 * Lists all industries with aggregate stats for the index page.
 */
export async function GET() {
  const industries = await Promise.all(
    Object.entries(INDUSTRY_MAP).map(async ([slug, meta]) => {
      // Match entities by industry keyword (case-insensitive contains)
      const entities = await prisma.entity.findMany({
        where: {
          OR: [
            // Match by industry field keywords
            ...meta.keywords.map((kw) => ({
              industry: { contains: kw, mode: "insensitive" as const },
            })),
            // Match by NAICS code prefix
            ...meta.naicsPrefixes.map((prefix) => ({
              naicsCode: { startsWith: prefix },
            })),
          ],
          mergedIntoId: null,
        },
        select: {
          id: true,
          totalLobbying: true,
          totalContracts: true,
          totalContributed: true,
          totalSpent: true,
        },
      });

      const totalLobbying = entities.reduce((s, e) => s + Number(e.totalLobbying), 0);
      const totalContracts = entities.reduce((s, e) => s + Number(e.totalContracts), 0);
      const totalPoliticalSpend = entities.reduce(
        (s, e) => s + Number(e.totalLobbying) + Number(e.totalContributed) + Number(e.totalSpent),
        0,
      );
      const roi = totalPoliticalSpend > 0 ? totalContracts / totalPoliticalSpend : 0;

      return {
        slug,
        name: meta.name,
        description: meta.description,
        entityCount: entities.length,
        totalLobbying,
        totalContracts,
        roi: Math.round(roi),
      };
    }),
  );

  // Sort by total lobbying + contracts descending
  industries.sort((a, b) => b.totalLobbying + b.totalContracts - (a.totalLobbying + a.totalContracts));

  return NextResponse.json({ industries });
}
