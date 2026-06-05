"use client";

import { useState } from "react";
import { CUSTOMERS } from "@/lib/mock-data";
import { Provenance } from "@/components/Provenance";
import { formatCurrency, TIER_HEX } from "@/lib/utils";
import type { Customer, LoyaltyTier } from "@/types";

const TIER_THRESHOLDS: Record<LoyaltyTier, number> = {
  Bronze: 0,
  Silver: 2500,
  Gold: 7500,
  Platinum: 20000,
};

const NEXT_TIER: Record<LoyaltyTier, LoyaltyTier | null> = {
  Bronze: "Silver",
  Silver: "Gold",
  Gold: "Platinum",
  Platinum: null,
};

function ProgressToNext({ customer }: { customer: Customer }) {
  const currentTier = customer.loyaltyTier;
  const nextTier = NEXT_TIER[currentTier];

  if (!nextTier) {
    return (
      <p className="mt-3 text-xs text-stone-500">
        Platinum — highest tier. No further thresholds.
      </p>
    );
  }

  const nextThreshold = TIER_THRESHOLDS[nextTier];
  const currentThreshold = TIER_THRESHOLDS[currentTier];
  const range = nextThreshold - currentThreshold;
  const progress = Math.min(
    ((customer.loyaltyPoints - currentThreshold) / range) * 100,
    100
  );
  const remaining = Math.max(nextThreshold - customer.loyaltyPoints, 0);

  return (
    <div className="mt-3">
      <div className="mb-1 flex justify-between text-xs">
        <span className="tabular-nums text-stone-600">
          {remaining.toLocaleString("en-IN")} pts to {nextTier}
        </span>
        <span className="tabular-nums font-medium text-stone-700">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-stone-100">
        <div
          className="h-full rounded-full bg-stone-900 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-1 font-mono text-[11px] text-stone-500">
        {nextTier} unlocks at {nextThreshold.toLocaleString("en-IN")} pts
      </p>
    </div>
  );
}

export function CustomerLookup() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Customer | null | "none">(null);

  function handleSearch() {
    if (!query.trim()) return;
    const q = query.toLowerCase();
    const found = CUSTOMERS.find(
      (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    );
    setResult(found ?? "none");
  }

  return (
    <div className="rounded-[10px] border border-stone-200 bg-white p-5">
      <h2 className="text-[15px] font-semibold text-stone-900">Member lookup</h2>
      <p className="mt-0.5 text-[13px] text-stone-500">
        Search by name or email.
      </p>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setResult(null);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Name or email"
          className="h-8 flex-1 rounded-md border border-stone-300 bg-white px-2.5 text-[13px] text-stone-900 placeholder:text-stone-400 transition-shadow focus:border-[#2E5CE6] focus:outline-none focus:ring-2 focus:ring-[#2E5CE6]/25"
        />
        <button
          onClick={handleSearch}
          className="h-8 rounded-md bg-stone-900 px-3.5 text-[13px] font-medium text-white transition-colors hover:bg-stone-800"
        >
          Search
        </button>
      </div>

      {/* Typeahead suggestions */}
      {query.length >= 2 && result === null && (
        <div className="mt-2 max-h-44 divide-y divide-stone-100 overflow-y-auto rounded-md border border-stone-200">
          {CUSTOMERS.filter((c) =>
            c.name.toLowerCase().includes(query.toLowerCase())
          )
            .slice(0, 6)
            .map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setQuery(c.name);
                  setResult(c);
                }}
                className="flex w-full items-center justify-between px-3 py-2 text-left transition-colors hover:bg-stone-50"
              >
                <span>
                  <span className="block text-[13px] font-medium text-stone-900">
                    {c.name}
                  </span>
                  <span className="block text-xs text-stone-500">{c.email}</span>
                </span>
                <span className="text-stone-300">→</span>
              </button>
            ))}
        </div>
      )}

      {result === "none" && (
        <div className="mt-4 rounded-md border border-stone-200 bg-stone-50 px-3.5 py-3">
          <p className="text-[13px] text-stone-700">
            No member matching &ldquo;{query}&rdquo;.
          </p>
          <p className="mt-0.5 text-xs text-stone-500">
            Search by full or partial name, or by email.
          </p>
        </div>
      )}

      {result && result !== "none" && (
        <div className="mt-4 rounded-md border border-stone-200 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[15px] font-semibold text-stone-900">
                {result.name}
              </p>
              <p className="mt-0.5 text-xs text-stone-500">{result.email}</p>
            </div>
            <span className="flex items-center gap-1.5 text-[13px] font-medium text-stone-700">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: TIER_HEX[result.loyaltyTier] }}
              />
              {result.loyaltyTier}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 divide-x divide-stone-200">
            {[
              {
                label: "Points",
                value: result.loyaltyPoints.toLocaleString("en-IN"),
              },
              { label: "Lifetime", value: formatCurrency(result.totalSpend) },
              { label: "Orders", value: String(result.purchaseCount) },
            ].map((m) => (
              <div key={m.label} className="px-3 first:pl-0 last:pr-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500">
                  {m.label}
                </p>
                <p
                  className="mt-0.5 text-[15px] font-semibold text-stone-900"
                  data-numeric
                >
                  {m.value}
                </p>
              </div>
            ))}
          </div>

          <ProgressToNext customer={result} />
          <Provenance className="mt-3 border-t border-stone-100 pt-2.5">
            Member record · {result.segment} · as of 1 Jun 2026
          </Provenance>
        </div>
      )}
    </div>
  );
}
