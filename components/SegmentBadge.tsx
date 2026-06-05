import { cn, SEGMENT_HEX } from "@/lib/utils";
import type { Segment } from "@/types";

// Categorical chip: hue dot + plain label. The dot is the only color.
export function SegmentBadge({
  segment,
  size = "md",
  className,
}: {
  segment: Segment;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-stone-700",
        size === "sm" ? "text-xs" : "text-[13px]",
        className
      )}
    >
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: SEGMENT_HEX[segment] }}
      />
      {segment}
    </span>
  );
}
