// Geometry-faithful skeleton — matches the Overview layout exactly.
export default function OverviewLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse space-y-6 p-8">
      <div className="flex items-baseline justify-between">
        <div className="h-6 w-28 rounded bg-stone-200" />
        <div className="h-3.5 w-48 rounded bg-stone-100" />
      </div>

      {/* Headline band */}
      <div className="rounded-[10px] border border-stone-200 bg-white p-5">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <div className="h-3 w-36 rounded bg-stone-100" />
            <div className="h-9 w-40 rounded bg-stone-200" />
            <div className="h-3.5 w-48 rounded bg-stone-100" />
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2 sm:px-5">
                <div className="h-3 w-20 rounded bg-stone-100" />
                <div className="h-5 w-14 rounded bg-stone-200" />
                <div className="h-3 w-24 rounded bg-stone-100" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-[10px] border border-stone-200 bg-white p-5 lg:col-span-2">
          <div className="mb-4 h-4 w-24 rounded bg-stone-200" />
          <div className="h-[220px] rounded bg-stone-50" />
        </div>
        <div className="rounded-[10px] border border-stone-200 bg-white p-5">
          <div className="mb-4 h-4 w-40 rounded bg-stone-200" />
          <div className="h-2.5 w-full rounded-sm bg-stone-100" />
          <div className="mt-3 space-y-2.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-3.5 w-28 rounded bg-stone-100" />
                <div className="h-3.5 w-16 rounded bg-stone-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
