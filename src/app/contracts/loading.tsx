export default function ContractsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      {/* Header skeleton */}
      <div className="h-3 w-40 animate-pulse rounded bg-border" />
      <div className="mt-4 h-12 w-96 animate-pulse rounded bg-border" />
      <div className="mt-4 h-5 w-80 animate-pulse rounded bg-border" />

      {/* Stats row skeleton */}
      <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-lg border border-border bg-surface" />
        ))}
      </div>

      {/* Contractor list skeleton */}
      <div className="mt-16 space-y-4">
        <div className="h-8 w-64 animate-pulse rounded bg-border" />
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-lg border border-border bg-surface" />
        ))}
      </div>
    </div>
  );
}
