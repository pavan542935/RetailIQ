import { RevenueChart } from "@/components/charts/RevenueChart";
import { SegmentCompositionBar } from "@/components/charts/SegmentCompositionBar";
import { SegmentBadge } from "@/components/SegmentBadge";
import { Provenance, Delta } from "@/components/Provenance";
import { CUSTOMERS, MONTHLY_REVENUE, SEGMENT_STATS } from "@/lib/mock-data";
import { formatCurrency, formatCompactINR, formatDate, daysSince } from "@/lib/utils";

export default function OverviewPage() {
  const topCustomers = [...CUSTOMERS]
    .sort((a, b) => b.totalSpend - a.totalSpend)
    .slice(0, 8);

  const totalRevenue = MONTHLY_REVENUE.reduce((s, m) => s + m.revenue, 0);
  const prevMonth = MONTHLY_REVENUE[MONTHLY_REVENUE.length - 2];
  const thisMonth = MONTHLY_REVENUE[MONTHLY_REVENUE.length - 1];
  const monthDelta = thisMonth.revenue - prevMonth.revenue;
  const monthDeltaPct = ((monthDelta / prevMonth.revenue) * 100).toFixed(1);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-8">
      {/* Page header — title left, provenance right. No subtitle prose. */}
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-semibold tracking-tight text-stone-900">
          Overview
        </h1>
        <Provenance className="hidden sm:block">Jan–Jun 2026 · 200 customers · demo data</Provenance>
      </div>

      {/* Zone A — headline band. One number wins. */}
      <div className="rounded-[10px] border border-stone-200 bg-white p-5">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500">
              Revenue · last 6 months
            </p>
            <p
              className="mt-1 text-[32px] font-semibold leading-tight tracking-tight text-stone-900"
              data-numeric
            >
              {formatCompactINR(totalRevenue)}
            </p>
            <p className="mt-1 text-[13px] text-stone-600">
              <Delta direction="up">
                {formatCompactINR(monthDelta)} in Jun vs May · +{monthDeltaPct}%
              </Delta>
            </p>
          </div>

          {/* Supporting metrics — quiet inline row, hairline-separated, no icons */}
          <div className="grid grid-cols-2 gap-y-5 sm:grid-cols-4 sm:divide-x sm:divide-stone-200">
            {[
              {
                label: "Customers",
                value: "200",
                delta: <Delta direction="up">12% vs last quarter</Delta>,
              },
              {
                label: "Repeat purchase",
                value: "34%",
                delta: <Delta direction="up">3.2 pp vs May</Delta>,
              },
              {
                label: "Avg order value",
                value: "₹3,840",
                delta: <Delta direction="up">8.1% vs May</Delta>,
              },
              {
                label: "At risk",
                value: "38",
                delta: (
                  <Delta direction="down" good>
                    5 vs May
                  </Delta>
                ),
              },
            ].map((m) => (
              <div key={m.label} className="sm:px-5 sm:first:pl-0 sm:last:pr-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500">
                  {m.label}
                </p>
                <p
                  className="mt-1 text-[17px] font-semibold leading-snug text-stone-900"
                  data-numeric
                >
                  {m.value}
                </p>
                <p className="mt-0.5">{m.delta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zones C + D — revenue over time, segment composition */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-[10px] border border-stone-200 bg-white p-5 lg:col-span-2">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-[15px] font-semibold text-stone-900">Revenue</h2>
            <span className="text-[13px] tabular-nums text-stone-500">
              {formatCompactINR(thisMonth.revenue)} in Jun
            </span>
          </div>
          <RevenueChart data={MONTHLY_REVENUE} />
          <Provenance className="mt-3">
            Monthly gross revenue · Jan–Jun 2026 · demo data
          </Provenance>
        </div>

        <div className="rounded-[10px] border border-stone-200 bg-white p-5">
          <h2 className="mb-4 text-[15px] font-semibold text-stone-900">
            Segment composition
          </h2>
          <SegmentCompositionBar data={SEGMENT_STATS} />
          <Provenance className="mt-3">
            RFM quintile assignment · 200 customers
          </Provenance>
        </div>
      </div>

      {/* Zone E — top customers */}
      <div className="rounded-[10px] border border-stone-200 bg-white">
        <div className="border-b border-stone-200 px-5 py-3.5">
          <h2 className="text-[15px] font-semibold text-stone-900">
            Top customers by spend
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="px-5 py-2.5 text-left text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500">
                  Customer
                </th>
                <th className="px-3 py-2.5 text-left text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500">
                  Segment
                </th>
                <th className="hidden px-3 py-2.5 text-left text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500 md:table-cell">
                  City
                </th>
                <th className="px-3 py-2.5 text-right text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500">
                  Total spend
                </th>
                <th className="hidden px-5 py-2.5 text-right text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500 lg:table-cell">
                  Last purchase
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {topCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="h-11 transition-colors hover:bg-stone-50"
                >
                  <td className="px-5 py-2">
                    <p className="font-medium text-stone-900">{customer.name}</p>
                    <p className="text-xs text-stone-500">{customer.email}</p>
                  </td>
                  <td className="px-3 py-2">
                    <SegmentBadge segment={customer.segment} size="sm" />
                  </td>
                  <td className="hidden px-3 py-2 text-stone-600 md:table-cell">
                    {customer.city}
                  </td>
                  <td className="px-3 py-2 text-right font-medium tabular-nums text-stone-900">
                    {formatCurrency(customer.totalSpend)}
                  </td>
                  <td
                    className="hidden px-5 py-2 text-right tabular-nums text-stone-500 lg:table-cell"
                    title={formatDate(customer.lastPurchase)}
                  >
                    {daysSince(customer.lastPurchase)} d ago
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-stone-200 px-5 py-2.5">
          <Provenance>
            Lifetime spend · computed from 200 customers · as of 1 Jun 2026
          </Provenance>
        </div>
      </div>
    </div>
  );
}
