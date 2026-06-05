import { CopilotClient } from "@/components/copilot/CopilotClient";
import { SEGMENTS } from "@/types";
import type { Segment } from "@/types";

export default async function CopilotPage({
  searchParams,
}: {
  searchParams: Promise<{ segment?: string }>;
}) {
  const params = await searchParams;
  const rawSegment = params.segment;
  const initialSegment =
    rawSegment && (SEGMENTS as readonly string[]).includes(rawSegment)
      ? (rawSegment as Segment)
      : undefined;

  return <CopilotClient initialSegment={initialSegment} />;
}
