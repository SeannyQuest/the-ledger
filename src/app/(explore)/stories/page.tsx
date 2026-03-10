import Link from "next/link";
import { ArrowRight, Shield, Pill, Cpu, EyeOff, Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investigations — The Ledger",
  description:
    "Curated investigations tracing the money between political donations, lobbying, and government contracts.",
};

interface StoryCard {
  slug: string;
  title: string;
  description: string;
  tag: string;
  icon: React.ElementType;
  stat?: string;
  live: boolean;
}

const STORIES: StoryCard[] = [
  {
    slug: "defense-contractors",
    title: "The Defense Contractor Pipeline",
    description:
      "How the top five defense contractors spent $67M on lobbying and PAC donations — then received $178B in government contracts. For every $1 spent, $850 came back.",
    tag: "Defense",
    icon: Shield,
    stat: "$178B in contracts",
    live: true,
  },
  {
    slug: "big-pharma",
    title: "Big Pharma\u2019s Revolving Door",
    description:
      "Former FDA regulators now lobby for the companies they once oversaw. We trace the career paths, the payments, and the policy changes that followed.",
    tag: "Healthcare",
    icon: Pill,
    live: false,
  },
  {
    slug: "tech-lobby",
    title: "The Tech Lobby Surge",
    description:
      "Silicon Valley\u2019s lobbying spending tripled since 2016. From antitrust battles to AI regulation, the industry is buying a seat at every table.",
    tag: "Technology",
    icon: Cpu,
    live: false,
  },
  {
    slug: "dark-money",
    title: "Dark Money in State Politics",
    description:
      "Untraceable donations flooding state-level races in battleground states. How 501(c)(4) organizations became the preferred vehicle for anonymous political spending.",
    tag: "Dark Money",
    icon: EyeOff,
    live: false,
  },
];

export default function StoriesPage() {
  const featured = STORIES[0];
  const upcoming = STORIES.slice(1);
  const FeaturedIcon = featured.icon;

  return (
    <div className="bg-paper">
      {/* Page header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Investigations
          </div>
          <h1 className="mt-4 font-headline text-5xl font-black tracking-tight text-ink lg:text-6xl">
            Stories
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Curated investigations that trace the money and expose the connections
            between political donations, lobbying, and government contracts.
          </p>
        </div>
      </section>

      {/* Featured story */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
            Featured Investigation
          </div>

          <Link
            href={`/stories/${featured.slug}`}
            className="group mt-6 block overflow-hidden rounded-2xl border border-border bg-ink transition-all hover:shadow-2xl"
          >
            <div className="grid md:grid-cols-5">
              {/* Left visual panel */}
              <div className="relative flex flex-col items-center justify-center bg-ink p-12 text-white md:col-span-2">
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, #ffffff 1px, transparent 1px),
                      linear-gradient(to bottom, #ffffff 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                  }}
                />
                <FeaturedIcon className="relative h-16 w-16 text-accent-light" />
                <div className="relative mt-6 font-headline text-6xl font-black tracking-tight text-white lg:text-7xl">
                  $850
                </div>
                <div className="relative mt-2 font-mono text-xs font-bold uppercase tracking-widest text-white/50">
                  Returned per $1 Spent
                </div>
              </div>

              {/* Right content */}
              <div className="flex flex-col justify-center p-10 md:col-span-3 md:p-14">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent-light">
                  {featured.tag}
                </div>
                <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-white lg:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/60 lg:text-lg">
                  {featured.description}
                </p>
                {featured.stat && (
                  <div className="mt-6 font-mono text-sm font-bold text-accent-light">
                    {featured.stat}
                  </div>
                )}
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white transition-all group-hover:gap-3">
                  Read the Investigation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Upcoming stories grid */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
            Coming Soon
          </div>
          <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-ink lg:text-4xl">
            Investigations in Progress
          </h2>
          <p className="mt-3 max-w-lg text-base text-muted">
            These stories are being researched and written. Sign up below to be notified when they publish.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {upcoming.map((story) => {
              const Icon = story.icon;
              return (
                <div
                  key={story.slug}
                  className="group relative rounded-xl border border-border bg-surface p-8 transition-all"
                >
                  {/* Coming soon badge */}
                  <div className="absolute right-4 top-4 rounded-full border border-border bg-paper px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                    Coming Soon
                  </div>

                  <div className="inline-flex rounded-lg bg-paper p-3 text-muted">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mt-4 font-mono text-xs font-bold uppercase tracking-widest text-accent">
                    {story.tag}
                  </div>
                  <h3 className="mt-2 font-headline text-xl font-bold text-ink">
                    {story.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {story.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="border-t-4 border-ink bg-ink text-white">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center lg:px-8">
          <Mail className="mx-auto h-10 w-10 text-accent-light" />
          <h2 className="mt-6 font-headline text-3xl font-black tracking-tight lg:text-4xl">
            Stay Informed
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/60">
            Get notified when new investigations are published. No spam.
            Just follow the money.
          </p>
          <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-full border-2 border-white/20 bg-transparent px-6 py-3.5 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-white/50"
              aria-label="Email address"
            />
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-white/90"
            >
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-4 text-xs text-white/30">
            Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </section>
    </div>
  );
}
