import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Segment, LoyaltyTier } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Indian compact notation for summaries and chart axes: ₹4.9L, ₹2.97Cr.
// Full en-IN grouping (formatCurrency) stays in tables.
export function formatCompactINR(amount: number): string {
  if (amount >= 1_00_00_000) return `₹${(amount / 1_00_00_000).toFixed(2)}Cr`;
  if (amount >= 1_00_000) return `₹${(amount / 1_00_000).toFixed(1)}L`;
  return formatCurrency(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function daysSince(dateStr: string): number {
  const ms = new Date("2026-06-01").getTime() - new Date(dateStr).getTime();
  return Math.floor(ms / 86_400_000);
}

/*
 * Ledger categorical palette — muted, colorblind-distinguishable.
 * Appears only as small ticks, dots, and chart series. Never card backgrounds.
 */
export const SEGMENT_HEX: Record<Segment, string> = {
  Champions: "#2F7D5B", // viridian
  "Loyal Customers": "#4A6FA5", // slate blue
  "New Customers": "#7C5CBF", // muted violet
  "At Risk": "#C75D3A", // terracotta — concern without alarm
  Hibernating: "#8A8680", // warm gray
};

// Flat tier hues. Gradients banned.
export const TIER_HEX: Record<LoyaltyTier, string> = {
  Bronze: "#9C6B3F",
  Silver: "#8C9196",
  Gold: "#A8842C",
  Platinum: "#6E6486",
};

// Semantic delta colors — reserved exclusively for change indicators.
export const DELTA_POSITIVE = "#0E7A4A";
export const DELTA_NEGATIVE = "#C2342C";
