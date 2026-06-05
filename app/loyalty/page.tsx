import { CUSTOMERS, TIER_STATS } from "@/lib/mock-data";
import { CustomerLookup } from "@/components/loyalty/CustomerLookup";
import { Provenance } from "@/components/Provenance";
import { formatCurrency, formatCompactINR, TIER_HEX } from "@/lib/utils";

// Point value used for liability estimation — stated basis, see provenance.
const POINT_VALUE_INR = 0.25;

export default function LoyaltyPage() {
  const totalMembers = TIER_STATS.reduce((s, t) => s + t.count, 0);
  const outstandingPoints = CUSTOMERS.reduce((s, c) => s + c.loyaltyPoints, 0);
  const liability = outstandingPoints * POINT_VALUE_INR;
  const avgMemberSpend =
    CUSTOMERS.reduce((s, c) => s + c.totalSpend, 0) / CUSTOMERS.length;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-8">
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-semibold tracking-tight text-stone-900">
          Loyalty
        </h1>
        <Provenance className="hidden sm:block">
          {totalMembers} enrolled members · as of 1 Jun 2026
        </Provenance>
      </div>

      {/* Programme economics — the numbers a finance team asks about */}
      <div className="rounded-[10px] border border-stone-200 bg-white p-5">
        <h2 className="mb-4 text-[15px] font-semibold text-stone-900">
          Programme economics
        </h2>
        <div className="grid grid-cols-2 gap-y-5 sm:grid-cols-4 sm:divide-x sm:divide-stone-200">
          {[
            {
              label: "Enrolled members",
              value: String(totalMembers),
              note: "100% of customer base",
            },
            {
              label: "Outstanding points",
              value: outstandingPoints.toLocaleString("en-IN"),
              note: "unredeemed balance",
            },
            {
              label: "Est. liability",
              value: formatCompactINR(liability),
              note: `at ₹${POINT_VALUE_INR}/pt`,
            },
            {
              label: "Avg member spend",
              value: formatCurrency(Math.round(avgMemberSpend)),
              note: "lifetime",
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
              <p className="mt-0.5 text-xs text-stone-500">{m.note}</p>
            </div>
          ))}
        </div>
        <Provenance className="mt-4">
          Liability = outstanding points × ₹{POINT_VALUE_INR} redemption value ·
          computed from 200 members · demo data
        </Provenance>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Tier distribution — single stacked strip + ledger rows */}
        <div className="rounded-[10px] border border-stone-200 bg-white p-5">
          <h2 className="mb-4 text-[15px] font-semibold text-stone-900">
            Tier distribution
          </h2>

          <div className="flex h-2.5 w-full overflow-hidden rounded-sm">
            {TIER_STATS.map((t) => (
              <div
                key={t.tier}
                style={{
                  width: `${(t.count / totalMembers) * 100}%`,
                  backgroundColor: TIER_HEX[t.tier],
                }}
                title={`${t.tier} — ${t.count} members`}
              />
            ))}
          </div>

          <table className="mt-4 w-full text-[13px]">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="py-2 text-left text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500">
                  Tier
                </th>
                <th className="py-2 text-right text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500">
                  Threshold
                </th>
                <th className="py-2 text-right text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500">
                  Members
                </th>
                <th className="py-2 text-right text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500">
                  Avg spend
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {TIER_STATS.map((t) => (
                <tr key={t.tier} className="h-10">
                  <td className="py-2">
                    <span className="flex items-center gap-2.5 font-medium text-stone-900">
                      <span
                        className="h-5 w-[3px] shrink-0 rounded-full"
                        style={{ backgroundColor: TIER_HEX[t.tier] }}
                      />
                      {t.tier}
                    </span>
                  </td>
                  <td className="py-2 text-right tabular-nums text-stone-500">
                    {t.minPoints.toLocaleString("en-IN")}
                    {t.maxPoints !== null
                      ? `–${t.maxPoints.toLocaleString("en-IN")}`
                      : "+"}{" "}
                    pts
                  </td>
                  <td className="py-2 text-right tabular-nums text-stone-900">
                    {t.count}
                    <span className="ml-1.5 text-stone-500">
                      {((t.count / totalMembers) * 100).toFixed(0)}%
                    </span>
                  </td>
                  <td className="py-2 text-right tabular-nums text-stone-700">
                    {formatCurrency(t.avgSpend)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Benefits — plain text, on demand */}
          <details className="group mt-3 border-t border-stone-100 pt-3">
            <summary className="cursor-pointer list-none text-xs font-medium text-stone-500 transition-colors hover:text-stone-900">
              <span className="mr-1.5 inline-block transition-transform group-open:rotate-90">
                ›
              </span>
              Tier benefits
            </summary>
            <dl className="mt-3 space-y-2.5">
              {TIER_STATS.map((t) => (
                <div key={t.tier} className="flex gap-3">
                  <dt className="w-16 shrink-0 text-xs font-medium text-stone-700">
                    {t.tier}
                  </dt>
                  <dd className="text-xs leading-relaxed text-stone-500">
                    {t.benefits.join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </details>

          <Provenance className="mt-3">
            Points thresholds per programme rules · 200 members
          </Provenance>
        </div>

        {/* Member lookup */}
        <CustomerLookup />
      </div>
    </div>
  );
}
