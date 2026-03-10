export default function NetworkLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      {/* Header skeleton */}
      <div className="h-3 w-32 animate-pulse rounded bg-border" />
      <div className="mt-4 h-12 w-72 animate-pulse rounded bg-border" />
      <div className="mt-4 h-5 w-96 animate-pulse rounded bg-border" />

      {/* Search bar skeleton */}
      <div className="mt-8 h-12 w-full max-w-lg animate-pulse rounded-lg bg-surface" />

      {/* Graph placeholder */}
      <div className="mt-8 h-[600px] animate-pulse rounded-xl border border-border bg-surface" />
    </div>
  );
}
