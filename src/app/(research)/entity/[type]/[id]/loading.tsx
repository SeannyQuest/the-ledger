export default function EntityLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      {/* Entity header skeleton */}
      <div className="flex items-start gap-4">
        <div className="h-4 w-4 animate-pulse rounded-full bg-border" />
        <div>
          <div className="h-10 w-72 animate-pulse rounded bg-border" />
          <div className="mt-2 flex gap-2">
            <div className="h-6 w-24 animate-pulse rounded-full bg-border" />
            <div className="h-6 w-16 animate-pulse rounded-full bg-border" />
          </div>
        </div>
      </div>

      {/* Stats row skeleton */}
      <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-lg border border-border bg-surface" />
        ))}
      </div>

      {/* Content sections skeleton */}
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="h-64 animate-pulse rounded-xl border border-border bg-surface" />
        <div className="h-64 animate-pulse rounded-xl border border-border bg-surface" />
      </div>
    </div>
  );
}
