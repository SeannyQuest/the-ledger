/**
 * Entity Resolution — normalizes names and matches entities across data sources.
 *
 * The same entity appears differently across FEC, USASpending, LDA, etc:
 * - FEC: "GOOGLE LLC"
 * - USASpending: "ALPHABET INC"
 * - LDA: "Google LLC"
 * - SEC: "GOOGL" (ticker)
 *
 * This module provides name normalization and matching utilities.
 */

/**
 * Normalize a name for fuzzy matching:
 * - Lowercase
 * - Strip common suffixes (Inc, LLC, Corp, Ltd, etc.)
 * - Remove punctuation
 * - Collapse whitespace
 * - Remove common prefixes (The, A)
 */
export function normalizeName(name: string): string {
  let n = name.toLowerCase().trim();

  // Remove common corporate suffixes
  const suffixes = [
    /\b(inc|incorporated|corp|corporation|co|company|llc|llp|lp|ltd|limited|plc|group|holdings?|enterprises?|industries?|international|intl|assoc|association|assn|committee|cmte|pac|political action committee|for america|for congress|for senate|for president)\b\.?/gi,
  ];
  for (const suffix of suffixes) {
    n = n.replace(suffix, "");
  }

  // Remove honorific prefixes
  n = n.replace(/^(sen\.?|rep\.?|mr\.?|mrs\.?|ms\.?|dr\.?|hon\.?|the)\s+/i, "");

  // Remove punctuation except hyphens
  n = n.replace(/[^a-z0-9\s-]/g, "");

  // Collapse whitespace
  n = n.replace(/\s+/g, " ").trim();

  return n;
}

/**
 * Check if two normalized names are likely the same entity.
 * Returns a confidence score between 0 and 1.
 */
export function nameSimilarity(a: string, b: string): number {
  const normA = normalizeName(a);
  const normB = normalizeName(b);

  // Exact match after normalization
  if (normA === normB) return 1.0;

  // One contains the other
  if (normA.includes(normB) || normB.includes(normA)) return 0.85;

  // Levenshtein distance ratio
  const distance = levenshteinDistance(normA, normB);
  const maxLen = Math.max(normA.length, normB.length);
  if (maxLen === 0) return 0;
  const ratio = 1 - distance / maxLen;

  // Token overlap (handles word reordering: "John Smith" vs "Smith, John")
  const tokensA = new Set(normA.split(" "));
  const tokensB = new Set(normB.split(" "));
  const intersection = new Set([...tokensA].filter((x) => tokensB.has(x)));
  const union = new Set([...tokensA, ...tokensB]);
  const jaccard = union.size > 0 ? intersection.size / union.size : 0;

  // Weighted combination
  return Math.max(ratio, jaccard);
}

/**
 * Levenshtein edit distance between two strings.
 */
function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
}

/**
 * Parse a person's name from "LAST, FIRST MIDDLE" format (FEC style)
 * to "First Last" format.
 */
export function parsePersonName(name: string): { first: string; last: string; full: string } {
  const parts = name.split(",").map((p) => p.trim());
  if (parts.length >= 2) {
    const last = parts[0];
    const firstMiddle = parts[1].split(" ")[0];
    return {
      first: titleCase(firstMiddle),
      last: titleCase(last),
      full: `${titleCase(firstMiddle)} ${titleCase(last)}`,
    };
  }
  return { first: "", last: titleCase(name), full: titleCase(name) };
}

function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Determine EntityType from FEC committee designation and type codes.
 */
export function fecCommitteeToEntityType(
  designation: string | null,
  committeeType: string | null,
  organizationType: string | null
): "pac" | "super_pac" | "party_committee" | "corporation" | "union" | "nonprofit" {
  // Super PACs: committee type "O" (independent expenditure only)
  if (committeeType === "O" || committeeType === "V") return "super_pac";

  // Party committees
  if (committeeType === "X" || committeeType === "Y" || committeeType === "Z") return "party_committee";

  // Connected PACs (SSFs) — check organization type
  if (organizationType === "C") return "pac"; // Corporation-connected
  if (organizationType === "L") return "pac"; // Labor-connected
  if (organizationType === "T") return "pac"; // Trade association

  return "pac";
}
