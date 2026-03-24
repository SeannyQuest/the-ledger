import { XMLParser } from "fast-xml-parser";
import { createHash } from "crypto";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { SOURCES, type Source } from "./sources.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Story = {
  id: string;
  title: string;
  url: string;
  source: string;
  category: string;
  publishedAt: string;
  score: number;
  whyItMatters: string;
};

type NewsFeed = {
  lastUpdated: string;
  mode: "full" | "hourly";
  bannerStory: Story;
  stories: Story[];
};

type RawItem = {
  title: string;
  link: string;
  pubDate?: string;
  "dc:date"?: string;
  published?: string;
  updated?: string;
  description?: string;
  source: string;
  category: string;
};

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUTPUT_PATH = resolve(__dirname, "../../public/news-feed.json");

const apiKey = process.env.GOOGLE_AI_API_KEY;
if (!apiKey) {
  console.error(
    "ERROR: GOOGLE_AI_API_KEY is not set.\n" +
      "Set it in your shell environment or add GOOGLE_AI_API_KEY=your-key to .env.local"
  );
  process.exit(1);
}

const args = process.argv.slice(2);
const modeArg = args.find((a) => a.startsWith("--mode="));
const mode: "full" | "hourly" = modeArg?.split("=")[1] === "hourly" ? "hourly" : "full";

const HOURS_BACK = mode === "full" ? 24 : 2;
const MAX_STORIES = 50;
const FETCH_TIMEOUT = 10_000;
const BATCH_SIZE = 10;

console.log(`[daonra-news] mode=${mode}, looking back ${HOURS_BACK}h`);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function hashUrl(url: string): string {
  return createHash("sha256").update(url).digest("hex").slice(0, 16);
}

function parseDate(raw: string | undefined): Date | null {
  if (!raw) return null;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d;
}

function timeAgo(date: Date): string {
  const mins = Math.floor((Date.now() - date.getTime()) / 60_000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function similarTitle(a: string, b: string): boolean {
  const normalize = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();
  const na = normalize(a);
  const nb = normalize(b);
  if (na === nb) return true;
  // Check if one contains 80%+ of the other's words
  const wa = new Set(na.split(" "));
  const wb = new Set(nb.split(" "));
  const overlap = [...wa].filter((w) => wb.has(w)).length;
  return overlap / Math.min(wa.size, wb.size) > 0.8;
}

// ---------------------------------------------------------------------------
// RSS Fetching
// ---------------------------------------------------------------------------

async function fetchFeed(source: Source): Promise<RawItem[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const res = await fetch(source.url, {
      signal: controller.signal,
      headers: { "User-Agent": "DaonraNewsAgent/1.0" },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`  [SKIP] ${source.name}: HTTP ${res.status}`);
      return [];
    }

    const xml = await res.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      parseAttributeValue: true,
      processEntities: false,
    });
    const parsed = parser.parse(xml);

    // Handle RSS 2.0 and Atom formats
    let items: any[] = [];
    if (parsed.rss?.channel?.item) {
      items = Array.isArray(parsed.rss.channel.item)
        ? parsed.rss.channel.item
        : [parsed.rss.channel.item];
    } else if (parsed.feed?.entry) {
      items = Array.isArray(parsed.feed.entry)
        ? parsed.feed.entry
        : [parsed.feed.entry];
    } else if (parsed.rdf?.item) {
      items = Array.isArray(parsed.rdf?.item)
        ? parsed.rdf.item
        : [parsed.rdf.item];
    }

    return items
      .map((item: any) => {
        let link = item.link;
        // Atom feeds have link as object with @_href
        if (typeof link === "object") {
          if (Array.isArray(link)) {
            const alt = link.find((l: any) => l["@_rel"] === "alternate");
            link = alt?.["@_href"] || link[0]?.["@_href"] || "";
          } else {
            link = link["@_href"] || "";
          }
        }

        const title =
          typeof item.title === "string"
            ? item.title
            : item.title?.["#text"] || "";

        return {
          title: title.trim(),
          link: (link || "").trim(),
          pubDate: item.pubDate || item["dc:date"] || item.published || item.updated,
          description: item.description || item.summary || "",
          source: source.name,
          category: source.category,
        };
      })
      .filter((item: RawItem) => item.title && item.link);
  } catch (err: any) {
    clearTimeout(timeout);
    if (err.name === "AbortError") {
      console.warn(`  [TIMEOUT] ${source.name}`);
    } else {
      console.warn(`  [ERROR] ${source.name}: ${err.message}`);
    }
    return [];
  }
}

// ---------------------------------------------------------------------------
// LLM Scoring
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are the editorial engine for Daonra, a civic platform that follows power and money.

Editorial values:
- Anti-imperialist: US military interventions, arms sales, Pentagon spending, drone wars, sanctions as coercion get high priority
- Class-conscious: stories about wealth concentration, labor suppression, regulatory capture, corporate crime get high priority
- Multi-perspective: for any conflict, surface non-US/non-Western framings
- Anti-war: civilian casualties, war costs, veteran outcomes, conflict escalation
- Follow the money: lobbying, revolving door, campaign finance, government contracts
- Solutions: when something is working (universal healthcare outcomes, housing policy, labor wins) surface it

Deprioritize:
- Horse-race politics (polls, who said what at a press conference, daily Trump/GOP/Dem drama)
- Stories already saturating every mainstream outlet (if CNN, NYT, Fox are all running it, skip)
- Celebrity, entertainment, sports
- Crime stories without systemic angle

For each story, return a JSON array. Each element must have:
- index: the story's index in the input array
- score: 1-10 (10 = must surface, 1 = skip)
- whyItMatters: 1-2 sentences in Daonra voice. Direct, fact-first, no hysteria, no em dashes. Tell the reader exactly why this affects their life or matters to power dynamics.
- category: "power-money" | "conflicts" | "environment" | "labor" | "abroad" | "accountability"
- keepStory: true if score >= 5

Return ONLY a JSON array, no other text.`;

type LLMResult = {
  index: number;
  score: number;
  whyItMatters: string;
  category: string;
  keepStory: boolean;
};

async function geminiScore(storyList: string, batchSize: number): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const body = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [{ parts: [{ text: `Score these ${batchSize} stories:\n\n${storyList}` }] }],
    generationConfig: { temperature: 0.2, maxOutputTokens: 2048 },
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data: any = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

async function scoreStories(items: RawItem[]): Promise<LLMResult[]> {
  const batches: RawItem[][] = [];
  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    batches.push(items.slice(i, i + BATCH_SIZE));
  }

  const allResults: LLMResult[] = [];

  for (let b = 0; b < batches.length; b++) {
    const batch = batches[b];
    const offset = b * BATCH_SIZE;

    const storyList = batch
      .map(
        (item, i) =>
          `[${i}] "${item.title}" (${item.source}) — ${(typeof item.description === "string" ? item.description : "").slice(0, 200)}`
      )
      .join("\n");

    try {
      const text = await geminiScore(storyList, batch.length);

      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const results: LLMResult[] = JSON.parse(jsonMatch[0]);
        for (const r of results) {
          r.index = r.index + offset;
          // Derive keepStory from score — don't trust LLM's boolean
          r.keepStory = r.score >= 5;
          allResults.push(r);
        }
      }

      console.log(`  [LLM] batch ${b + 1}/${batches.length}: ${batch.length} scored`);
    } catch (err: any) {
      console.error(`  [LLM ERROR] batch ${b + 1}: ${err.message}`);
    }
  }

  return allResults;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const cutoff = new Date(Date.now() - HOURS_BACK * 60 * 60 * 1000);

  // 1. Fetch all feeds in parallel
  console.log(`[daonra-news] fetching ${SOURCES.length} feeds...`);
  const feedResults = await Promise.all(SOURCES.map(fetchFeed));
  const allItems = feedResults.flat();
  console.log(`[daonra-news] ${allItems.length} raw items from ${SOURCES.length} feeds`);

  // 2. Filter by time
  const recent = allItems.filter((item) => {
    const d = parseDate(item.pubDate);
    if (!d) return true; // Keep items with no date (let LLM decide)
    return d >= cutoff;
  });
  console.log(`[daonra-news] ${recent.length} items within ${HOURS_BACK}h window`);

  // 3. Deduplicate by URL and title similarity
  const seen = new Map<string, RawItem>();
  const deduped: RawItem[] = [];

  for (const item of recent) {
    const urlKey = item.link.replace(/\/$/, "").toLowerCase();
    if (seen.has(urlKey)) continue;

    let isDupe = false;
    for (const existing of deduped) {
      if (similarTitle(item.title, existing.title)) {
        isDupe = true;
        break;
      }
    }
    if (isDupe) continue;

    seen.set(urlKey, item);
    deduped.push(item);
  }
  console.log(`[daonra-news] ${deduped.length} items after dedup`);

  if (deduped.length === 0) {
    console.log("[daonra-news] no stories to process. exiting.");
    return;
  }

  // 4. Score via LLM
  console.log(`[daonra-news] scoring ${deduped.length} stories via LLM...`);
  const scores = await scoreStories(deduped);

  // 5. Build story objects
  const stories: Story[] = [];
  for (const result of scores) {
    if (!result.keepStory) continue;
    const item = deduped[result.index];
    if (!item) continue;

    stories.push({
      id: hashUrl(item.link),
      title: item.title,
      url: item.link,
      source: item.source,
      category: result.category || item.category,
      publishedAt: parseDate(item.pubDate)?.toISOString() || new Date().toISOString(),
      score: result.score,
      whyItMatters: result.whyItMatters,
    });
  }

  // 6. For hourly mode, merge with existing feed
  let merged = stories;
  if (mode === "hourly" && existsSync(OUTPUT_PATH)) {
    try {
      const existing: NewsFeed = JSON.parse(readFileSync(OUTPUT_PATH, "utf-8"));
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      // Keep existing stories from the last 24h
      const kept = existing.stories.filter((s) => new Date(s.publishedAt) >= dayAgo);
      if (existing.bannerStory && new Date(existing.bannerStory.publishedAt) >= dayAgo) {
        kept.push(existing.bannerStory);
      }

      // Merge, deduping by id
      const idSet = new Set(merged.map((s) => s.id));
      for (const s of kept) {
        if (!idSet.has(s.id)) {
          merged.push(s);
          idSet.add(s.id);
        }
      }
    } catch {
      // If existing file is corrupt, just use new stories
    }
  }

  // 7. Sort: score desc, then recency desc
  merged.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  // 8. Cap at MAX_STORIES
  merged = merged.slice(0, MAX_STORIES);

  if (merged.length === 0) {
    console.log("[daonra-news] no stories passed scoring threshold. exiting.");
    return;
  }

  // 9. Banner = #1 story
  const bannerStory = merged[0];
  const remainingStories = merged.slice(1);

  // 10. Write output
  const feed: NewsFeed = {
    lastUpdated: new Date().toISOString(),
    mode,
    bannerStory,
    stories: remainingStories,
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(feed, null, 2));
  console.log(
    `[daonra-news] wrote ${merged.length} stories to ${OUTPUT_PATH}\n` +
      `  banner: "${bannerStory.title}" (score ${bannerStory.score})\n` +
      `  mode: ${mode}`
  );
}

main().catch((err) => {
  console.error("[daonra-news] fatal error:", err);
  process.exit(1);
});
