import Link from "next/link";
import type { SegmentStats } from "@/types";
import { SEGMENT_HEX } from "@/lib/utils";

// Horizontal stacked bar with direct labels. Length > angle; no legend ping-pong.
// Server component — no charting library required for five rectangles.
export function SegmentCompositionBar({ data }: { data: SegmentStats[] }) {
  const total = data.reduce((s, d) => s + d.count, 0);

  return (
    <div>
      <div className="flex h-2.5 w-full overflow-hidden rounded-sm">
        {data.map((s) => (
          <div
            key={s.segment}
            style={{
              width: `${(s.count / total) * 100}%`,
              backgroundColor: SEGMENT_HEX[s.segment],
            }}
            title={`${s.segment} — ${s.count} customers`}
          />
        ))}
      </div>

      <div className="mt-3 space-y-1.5">
        {data.map((s) => (
          <Link
            key={s.segment}
            href="/segments"
            className="group flex items-baseline justify-between gap-3 rounded px-1 py-0.5 -mx-1 transition-colors hover:bg-stone-50"
          >
            <span className="flex items-center gap-2 text-[13px] text-stone-700 group-hover:text-stone-900">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: SEGMENT_HEX[s.segment] }}
              />
              {s.segment}
            </span>
            <span className="text-[13px] tabular-nums text-stone-500">
              {s.count}
              <span className="ml-2 inline-block w-10 text-right text-stone-500">
                {((s.count / total) * 100).toFixed(0)}%
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
