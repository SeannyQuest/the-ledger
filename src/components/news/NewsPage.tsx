"use client";

import { useState, useMemo } from "react";

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

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "power-money", label: "Power & Money" },
  { id: "conflicts", label: "Conflicts" },
  { id: "environment", label: "Environment" },
  { id: "labor", label: "Labor" },
  { id: "abroad", label: "Abroad" },
  { id: "accountability", label: "Accountability" },
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  "power-money": "bg-ink text-white",
  conflicts: "bg-accent text-white",
  environment: "bg-money-in text-white",
  labor: "bg-entity-lobbyist text-white",
  abroad: "bg-money-neutral text-white",
  accountability: "bg-entity-pac text-white",
};

// Left column categories
const LEFT_CATS = new Set(["power-money", "accountability"]);
// Center column categories
const CENTER_CATS = new Set(["conflicts", "abroad"]);
// Right column categories
const RIGHT_CATS = new Set(["environment", "labor"]);

function timeAgo(iso: string): string {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function CategoryBadge({ category }: { category: string }) {
  const label = CATEGORIES.find((c) => c.id === category)?.label || category;
  const colorClass = CATEGORY_COLORS[category] || "bg-muted text-white";
  return (
    <span
      className={`inline-block rounded px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide ${colorClass}`}
    >
      {label}
    </span>
  );
}

function StoryCard({ story }: { story: Story }) {
  return (
    <article className="py-3">
      <div className="flex items-center gap-2">
        <CategoryBadge category={story.category} />
        <span className="font-mono text-[11px] uppercase text-muted">
          {story.source}
        </span>
        <span className="text-[11px] text-muted">{timeAgo(story.publishedAt)}</span>
      </div>
      <a
        href={story.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 block font-headline text-lg font-bold leading-tight text-ink transition-colors hover:text-accent"
      >
        {story.title}
      </a>
      <p className="mt-1 text-sm italic leading-snug text-ink/70">
        {story.whyItMatters}
      </p>
    </article>
  );
}

function StoryColumn({
  stories,
  label,
}: {
  stories: Story[];
  label: string;
}) {
  if (stories.length === 0) return null;
  return (
    <div>
      <h3 className="border-b-2 border-ink pb-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
        {label}
      </h3>
      <div className="divide-y divide-border-light">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}

export function NewsPage({ feed }: { feed: NewsFeed }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredStories = useMemo(() => {
    if (!feed) return [];
    const all = [feed.bannerStory, ...feed.stories];
    if (activeCategory === "all") return all;
    return all.filter((s) => s.category === activeCategory);
  }, [feed, activeCategory]);

  const banner = filteredStories[0] || null;
  const rest = filteredStories.slice(1);

  const leftStories = rest.filter((s) => LEFT_CATS.has(s.category));
  const centerStories = rest.filter((s) => CENTER_CATS.has(s.category));
  const rightStories = rest.filter((s) => RIGHT_CATS.has(s.category));

  // If filtering by category, all stories go into center
  const isFiltered = activeCategory !== "all";

  if (!feed) {
    return (
      <div className="bg-paper">
        <section className="border-b-4 border-ink">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
            <h1 className="font-headline text-5xl font-black tracking-tight text-ink">
              DAONRA REPORT
            </h1>
            <p className="mt-6 text-lg text-ink/70">
              No stories yet. The news agent has not run. Check back after the
              next scheduled update.
            </p>
            <p className="mt-2 font-mono text-sm text-muted">
              Stories curated for civic impact. Updated hourly 8am-10pm CT.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-paper">
      {/* Top bar */}
      <section className="border-b-4 border-ink">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
              DAONRA REPORT
            </h1>
            <p className="font-mono text-xs text-muted">
              Updated {timeAgo(feed.lastUpdated)}
            </p>
          </div>

          {/* Category filter pills */}
          <div className="mt-3 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide transition-colors ${
                  activeCategory === cat.id
                    ? "bg-ink text-white"
                    : "bg-paper-dark text-muted hover:bg-border hover:text-ink"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Banner headline */}
      {banner && (
        <section className="border-b-2 border-accent bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
            <div className="flex items-center gap-2">
              <CategoryBadge category={banner.category} />
              <span className="font-mono text-xs uppercase text-muted">
                {banner.source}
              </span>
              <span className="text-xs text-muted">
                {timeAgo(banner.publishedAt)}
              </span>
            </div>
            <a
              href={banner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block font-headline text-3xl font-black leading-tight text-ink transition-colors hover:text-accent lg:text-4xl"
            >
              {banner.title}
            </a>
            <p className="mt-3 text-base italic leading-relaxed text-ink/70 lg:text-lg">
              {banner.whyItMatters}
            </p>
          </div>
        </section>
      )}

      {/* 3-column grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {isFiltered ? (
          /* Filtered: single column of matching stories */
          <div className="mx-auto max-w-2xl divide-y divide-border-light">
            {rest.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
            {rest.length === 0 && (
              <p className="py-8 text-center text-muted">
                No stories in this category right now.
              </p>
            )}
          </div>
        ) : (
          /* Unfiltered: 3-column layout */
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6">
              <StoryColumn
                stories={leftStories}
                label="Power & Money / Accountability"
              />
            </div>
            <div className="space-y-6">
              <StoryColumn
                stories={centerStories}
                label="Conflicts / Abroad"
              />
            </div>
            <div className="space-y-6">
              <StoryColumn
                stories={rightStories}
                label="Environment / Labor"
              />
            </div>
          </div>
        )}
      </section>

      {/* Footer note */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
          <p className="font-mono text-xs leading-relaxed text-muted">
            Stories curated for civic impact. We link to original sources; we do
            not host content. Updated hourly 8am-10pm CT.
          </p>
        </div>
      </section>
    </div>
  );
}
