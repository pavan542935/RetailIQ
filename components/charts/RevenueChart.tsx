"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { MonthlyRevenue } from "@/types";
import { formatCompactINR } from "@/lib/utils";

interface RevenueChartProps {
  data: MonthlyRevenue[];
}

interface TooltipPayload {
  value: number;
  payload: { month: string; revenue: number; orders: number };
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="rounded-md border border-stone-200 bg-white px-3 py-2 shadow-sm">
      <p className="text-xs font-medium text-stone-500">{label} 2026</p>
      <p className="text-sm font-semibold tabular-nums text-stone-900">
        {formatCompactINR(d.value)}
      </p>
      <p className="font-mono text-[11px] text-stone-500">
        {d.payload.orders.toLocaleString("en-IN")} orders
      </p>
    </div>
  );
}

// Single-series ink line. No gradient flood, no dots, hairline grid.
export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="#E8E6E3" strokeWidth={1} vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "#78716C" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={formatCompactINR}
          tick={{ fontSize: 11, fill: "#78716C" }}
          axisLine={false}
          tickLine={false}
          width={52}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: "#D6D3D1", strokeWidth: 1 }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#1C1917"
          strokeWidth={1.5}
          dot={false}
          activeDot={{ r: 3, fill: "#1C1917", strokeWidth: 0 }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
