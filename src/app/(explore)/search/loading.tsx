export default function SearchLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      {/* Header skeleton */}
      <div className="h-3 w-24 animate-pulse rounded bg-border" />
      <div className="mt-4 h-12 w-64 animate-pulse rounded bg-border" />
      <div className="mt-4 h-5 w-80 animate-pulse rounded bg-border" />

      {/* Search input skeleton */}
      <div className="mt-8 flex gap-3">
        <div className="h-12 flex-1 animate-pulse rounded-lg bg-surface" />
        <div className="h-12 w-40 animate-pulse rounded-lg bg-surface" />
      </div>

      {/* Results placeholder */}
      <div className="mt-8 flex flex-col items-center py-16">
        <div className="h-12 w-12 animate-pulse rounded-full bg-border" />
        <div className="mt-4 h-4 w-64 animate-pulse rounded bg-border" />
      </div>
    </div>
  );
}
