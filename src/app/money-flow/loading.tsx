export default function MoneyFlowLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      {/* Header skeleton */}
      <div className="h-3 w-32 animate-pulse rounded bg-border" />
      <div className="mt-4 h-12 w-80 animate-pulse rounded bg-border" />
      <div className="mt-4 h-5 w-96 animate-pulse rounded bg-border" />

      {/* Stats bar skeleton */}
      <div className="mt-8 flex gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 w-40 animate-pulse rounded-lg bg-surface" />
        ))}
      </div>

      {/* Sankey placeholder */}
      <div className="mt-8 h-[500px] animate-pulse rounded-xl border border-border bg-surface" />
    </div>
  );
}
