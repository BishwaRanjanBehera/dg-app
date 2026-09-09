export default function RollupLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 animate-pulse">
        <div className="h-7 w-64 rounded bg-gray-200" />
        <div className="mt-2 h-4 w-72 rounded bg-gray-100" />
      </div>

      <div className="mb-8 flex justify-center">
        <div className="h-28 w-48 animate-pulse rounded-lg border border-gray-200 bg-gray-50" />
      </div>

      <div className="mb-3 h-5 w-52 animate-pulse rounded bg-gray-200" />
      <div className="mb-8 animate-pulse rounded-lg border border-gray-200 bg-gray-50">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-12 border-b border-gray-100 last:border-0" />
        ))}
      </div>

      <div className="mb-3 h-5 w-40 animate-pulse rounded bg-gray-200" />
      <div className="animate-pulse space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-3 w-full rounded bg-gray-200" />
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-gray-400">
        Loading rollup data…
      </p>
    </div>
  );
}
