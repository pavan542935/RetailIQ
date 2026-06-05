import { cn } from "@/lib/utils";

// The signature Ledger component: 11px mono, ink-faint.
// Every module showing computed data ends with one of these.
export function Provenance({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("font-mono text-[11px] leading-4 text-stone-500", className)}>
      {children}
    </p>
  );
}

// Delta — arrow + value + comparison basis, plain colored text. No pills.
export function Delta({
  direction,
  good = direction === "up",
  children,
}: {
  direction: "up" | "down";
  good?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className="text-xs font-medium"
      style={{ color: good ? "#0E7A4A" : "#C2342C" }}
    >
      {direction === "up" ? "↑" : "↓"} {children}
    </span>
  );
}
