export default function DependenciesLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 animate-pulse">
        <div className="h-7 w-56 rounded bg-gray-200" />
        <div className="mt-2 h-4 w-80 rounded bg-gray-100" />
      </div>

      <div className="mb-3 h-5 w-40 animate-pulse rounded bg-gray-200" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg border border-gray-200 bg-gray-50 p-4"
          >
            <div className="h-3 w-16 rounded bg-gray-200" />
            <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
            <div className="mt-3 h-3 w-1/2 rounded bg-gray-200" />
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-gray-400">
        Loading dependencies…
      </p>
    </div>
  );
}
