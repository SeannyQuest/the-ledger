import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { NewsPage } from "@/components/news/NewsPage";

export const metadata = {
  title: "News | Daonra",
  description:
    "Stories curated for civic impact. Anti-imperialist, class-conscious, fact-first.",
};

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
} | null;

function loadFeed(): NewsFeed {
  const feedPath = resolve(process.cwd(), "public/news-feed.json");
  if (!existsSync(feedPath)) return null;
  try {
    return JSON.parse(readFileSync(feedPath, "utf-8"));
  } catch {
    return null;
  }
}

export default function News() {
  const feed = loadFeed();

  return <NewsPage feed={feed} />;
}
