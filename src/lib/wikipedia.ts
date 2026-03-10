/**
 * Wikipedia REST API utilities for fetching entity summaries.
 * Uses the free Wikimedia REST API — no API key required.
 */

const WIKI_API = "https://en.wikipedia.org/api/rest_v1";

interface WikiSummary {
  title: string;
  extract: string;
  description?: string;
  thumbnail?: { source: string; width: number; height: number };
  content_urls?: { desktop: { page: string } };
}

interface AboutData {
  summary: string;
  description: string | null;
  thumbnailUrl: string | null;
  wikipediaUrl: string | null;
}

/**
 * Fetch a Wikipedia page summary by exact title.
 */
async function fetchSummary(title: string): Promise<WikiSummary | null> {
  const encoded = encodeURIComponent(title.replace(/ /g, "_"));
  try {
    const res = await fetch(`${WIKI_API}/page/summary/${encoded}`, {
      headers: { "User-Agent": "TheLedger/1.0 (campaign-finance-tracker)" },
      next: { revalidate: 86400 }, // Cache for 24h
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.type === "disambiguation") return null;
    return data as WikiSummary;
  } catch {
    return null;
  }
}

/**
 * Search Wikipedia for the best matching article.
 */
async function searchWikipedia(query: string): Promise<string | null> {
  const encoded = encodeURIComponent(query);
  try {
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encoded}&srlimit=3&format=json`,
      {
        headers: { "User-Agent": "TheLedger/1.0 (campaign-finance-tracker)" },
        next: { revalidate: 86400 },
      },
    );
    if (!res.ok) return null;
    const data = await res.json();
    const results = data?.query?.search;
    if (!results || results.length === 0) return null;
    return results[0].title as string;
  } catch {
    return null;
  }
}

/**
 * Build search queries tailored to entity type for better Wikipedia matches.
 */
function buildSearchQueries(
  name: string,
  entityType: string,
  meta: { state?: string | null; party?: string | null; office?: string | null; industry?: string | null },
): string[] {
  const queries: string[] = [];
  const type = entityType.toUpperCase();

  if (type === "POLITICIAN") {
    // Try with political context for disambiguation
    if (meta.state && meta.office) {
      queries.push(`${name} ${meta.state} ${meta.office} politician`);
    }
    if (meta.state) {
      queries.push(`${name} ${meta.state} politician`);
    }
    queries.push(`${name} politician`);
    queries.push(name);
  } else if (type === "CORPORATION") {
    queries.push(`${name} company`);
    if (meta.industry) {
      queries.push(`${name} ${meta.industry}`);
    }
    queries.push(name);
  } else if (type === "PAC" || type === "SUPER_PAC") {
    queries.push(`${name} political action committee`);
    queries.push(`${name} PAC`);
    queries.push(name);
  } else if (type === "LOBBYING_FIRM" || type === "LOBBYIST") {
    queries.push(`${name} lobbying`);
    queries.push(name);
  } else if (type === "GOVERNMENT_AGENCY") {
    queries.push(`${name} United States`);
    queries.push(name);
  } else {
    queries.push(name);
  }

  return queries;
}

/**
 * Main entry point: fetch an About section for an entity.
 * Tries direct title match first, then falls back to search.
 */
export async function fetchEntityAbout(
  name: string,
  entityType: string,
  meta: {
    state?: string | null;
    party?: string | null;
    office?: string | null;
    industry?: string | null;
  } = {},
): Promise<AboutData | null> {
  // First try direct title match (most efficient)
  const direct = await fetchSummary(name);
  if (direct && direct.extract && direct.extract.length > 50) {
    return {
      summary: direct.extract,
      description: direct.description ?? null,
      thumbnailUrl: direct.thumbnail?.source ?? null,
      wikipediaUrl: direct.content_urls?.desktop?.page ?? null,
    };
  }

  // Fall back to search with type-aware queries
  const queries = buildSearchQueries(name, entityType, meta);
  for (const query of queries) {
    const title = await searchWikipedia(query);
    if (!title) continue;

    const summary = await fetchSummary(title);
    if (summary && summary.extract && summary.extract.length > 50) {
      return {
        summary: summary.extract,
        description: summary.description ?? null,
        thumbnailUrl: summary.thumbnail?.source ?? null,
        wikipediaUrl: summary.content_urls?.desktop?.page ?? null,
      };
    }
  }

  return null;
}
