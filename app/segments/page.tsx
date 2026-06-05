import Link from "next/link";
import { CUSTOMERS, SEGMENT_STATS } from "@/lib/mock-data";
import { SegmentBadge } from "@/components/SegmentBadge";
import { Provenance } from "@/components/Provenance";
import {
  formatCurrency,
  formatCompactINR,
  daysSince,
  SEGMENT_HEX,
} from "@/lib/utils";

export default function SegmentsPage() {
  const totalCustomers = CUSTOMERS.length;
  const totalRevenue = SEGMENT_STATS.reduce((s, x) => s + x.totalRevenue, 0);
  const maxShare = Math.max(
    ...SEGMENT_STATS.map((s) => s.count / totalCustomers)
  );

  // Avg days since last purchase, per segment
  const avgRecency = (segment: string) => {
    const cohort = CUSTOMERS.filter((c) => c.segment === segment);
    if (!cohort.length) return 0;
    return Math.round(
      cohort.reduce((s, c) => s + daysSince(c.lastPurchase), 0) / cohort.length
    );
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-8">
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-semibold tracking-tight text-stone-900">
          Segments
        </h1>
        <Provenance className="hidden sm:block">RFM quintiles · 200 customers · as of 1 Jun 2026</Provenance>
      </div>

      {/* The Segment Ledger — one instrument, aligned columns, comparison-first */}
      <div className="rounded-[10px] border border-stone-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="px-5 py-2.5 text-left text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500">
                  Segment
                </th>
                <th className="px-3 py-2.5 text-right text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500">
                  Customers
                </th>
                <th className="hidden px-3 py-2.5 text-left text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500 sm:table-cell">
                  Share of base
                </th>
                <th className="hidden px-3 py-2.5 text-right text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500 md:table-cell">
                  Value share
                </th>
                <th className="px-3 py-2.5 text-right text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500">
                  Avg spend
                </th>
                <th className="hidden px-3 py-2.5 text-right text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500 lg:table-cell">
                  Avg recency
                </th>
                <th className="px-5 py-2.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {SEGMENT_STATS.map((s) => {
                const basePct = (s.count / totalCustomers) * 100;
                const valuePct = (s.totalRevenue / totalRevenue) * 100;
                return (
                  <tr key={s.segment} className="group h-12 transition-colors hover:bg-stone-50">
                    {/* 3px hue tick — the only place segment color touches chrome */}
                    <td className="px-5 py-2.5">
                      <div className="flex items-center gap-3">
                        <span
                          className="h-7 w-[3px] shrink-0 rounded-full"
                          style={{ backgroundColor: SEGMENT_HEX[s.segment] }}
                        />
                        <div>
                          <p className="font-medium text-stone-900">{s.segment}</p>
                          <p className="max-w-72 truncate text-xs text-stone-500">
                            {s.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right font-medium tabular-nums text-stone-900">
                      {s.count}
                    </td>
                    <td className="hidden px-3 py-2.5 sm:table-cell">
                      <div className="flex items-center gap-2.5">
                        <div className="h-1 w-24 overflow-hidden rounded-full bg-stone-100">
                          {/* common scale across rows */}
                          <div
                            className="h-full rounded-full bg-stone-400"
                            style={{
                              width: `${(basePct / (maxShare * 100)) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="w-9 text-right tabular-nums text-stone-500">
                          {basePct.toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td className="hidden px-3 py-2.5 text-right tabular-nums md:table-cell">
                      <span className="font-medium text-stone-900">
                        {formatCompactINR(s.totalRevenue)}
                      </span>
                      <span className="ml-1.5 text-stone-500">
                        {valuePct.toFixed(0)}%
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-stone-700">
                      {formatCurrency(s.avgSpend)}
                    </td>
                    <td className="hidden px-3 py-2.5 text-right tabular-nums text-stone-500 lg:table-cell">
                      {avgRecency(s.segment)} d
                    </td>
                    <td className="px-5 py-2.5 text-right">
                      <Link
                        href={`/copilot?segment=${encodeURIComponent(s.segment)}`}
                        className="whitespace-nowrap text-[13px] font-medium text-stone-500 opacity-0 transition-opacity focus:opacity-100 group-hover:opacity-100 group-hover:text-stone-900"
                      >
                        Draft campaign →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="border-t border-stone-200 px-5 py-2.5">
          <Provenance>
            Value share = segment revenue ÷ total revenue · computed from 200
            customers · demo data
          </Provenance>
        </div>
      </div>

      {/* Methodology disclosure — docs-grade trust */}
      <details className="group rounded-[10px] border border-stone-200 bg-white">
        <summary className="cursor-pointer list-none px-5 py-3 text-[13px] font-medium text-stone-700 transition-colors hover:text-stone-900">
          <span className="mr-2 inline-block transition-transform group-open:rotate-90">
            ›
          </span>
          How RFM scores are computed
        </summary>
        <div className="space-y-2 border-t border-stone-100 px-5 py-4 text-[13px] leading-relaxed text-stone-600">
          <p>
            Each customer receives three quintile scores from 1 to 5:{" "}
            <span className="font-mono text-xs">R</span> (days since last
            purchase — lower is better),{" "}
            <span className="font-mono text-xs">F</span> (purchase count), and{" "}
            <span className="font-mono text-xs">M</span> (total spend). Quintile
            boundaries are recomputed against the full customer base on every
            sync.
          </p>
          <p>
            Segments are assigned from score patterns: Champions score 4–5
            across all three dimensions; At Risk combines high historical value
            (F, M ≥ 3) with poor recency (R ≤ 2); Hibernating scores low on
            every dimension. A customer belongs to exactly one segment.
          </p>
          <Provenance className="pt-1">
            Quintile method · recomputed on sync · last run 1 Jun 2026
          </Provenance>
        </div>
      </details>

      {/* Full customer table */}
      <div className="rounded-[10px] border border-stone-200 bg-white">
        <div className="border-b border-stone-200 px-5 py-3.5">
          <h2 className="text-[15px] font-semibold text-stone-900">
            All customers
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="sticky top-0 bg-white">
              <tr className="border-b border-stone-200">
                {[
                  ["Customer", "text-left"],
                  ["Segment", "text-left"],
                  ["RFM", "text-left"],
                  ["Total spend", "text-right"],
                  ["Purchases", "text-right"],
                  ["Last purchase", "text-right"],
                  ["City", "text-left"],
                ].map(([h, align]) => (
                  <th
                    key={h}
                    className={`px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500 first:pl-5 last:pr-5 ${align}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {CUSTOMERS.map((c) => (
                <tr key={c.id} className="h-11 transition-colors hover:bg-stone-50">
                  <td className="px-5 py-2">
                    <p className="font-medium text-stone-900">{c.name}</p>
                    <p className="text-xs text-stone-500">{c.email}</p>
                  </td>
                  <td className="px-4 py-2">
                    <SegmentBadge segment={c.segment} size="sm" />
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className="rounded bg-stone-100 px-1.5 py-0.5 font-mono text-xs text-stone-600"
                      title={`Recency ${c.rfmScore.recency} · Frequency ${c.rfmScore.frequency} · Monetary ${c.rfmScore.monetary}`}
                    >
                      {c.rfmScore.recency}-{c.rfmScore.frequency}-
                      {c.rfmScore.monetary}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right font-medium tabular-nums text-stone-900">
                    {formatCurrency(c.totalSpend)}
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums text-stone-600">
                    {c.purchaseCount}
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums text-stone-500">
                    {daysSince(c.lastPurchase)} d ago
                  </td>
                  <td className="px-5 py-2 text-stone-600">{c.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-stone-200 px-5 py-2.5">
          <Provenance>
            200 customers · RFM recomputed 1 Jun 2026 · demo data
          </Provenance>
        </div>
      </div>
    </div>
  );
}
