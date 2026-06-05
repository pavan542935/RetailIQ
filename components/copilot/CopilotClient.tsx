"use client";

import { useCallback, useState } from "react";
import { Loader2 } from "lucide-react";
import type { Campaign, CampaignGoal, Channel, Segment } from "@/types";
import { SEGMENTS, CAMPAIGN_GOALS, CHANNELS } from "@/types";
import { CampaignOutput, CampaignSkeleton } from "@/components/CampaignOutput";
import { Provenance } from "@/components/Provenance";
import { SEGMENT_STATS } from "@/lib/mock-data";
import { formatCurrency, SEGMENT_HEX, cn } from "@/lib/utils";

type GenerationState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; campaign: Campaign; isRegenerating: boolean }
  | { status: "error"; message: string };

interface CopilotClientProps {
  initialSegment?: Segment;
}

const GOAL_LABELS: Record<CampaignGoal, string> = {
  "Re-engage": "Re-engage inactive customers",
  Upsell: "Upsell / cross-sell products",
  "Loyalty Reward": "Reward loyal customers",
  "Win Back": "Win back churned customers",
  Welcome: "Welcome new customers",
};

interface Brief {
  segment: Segment;
  goal: CampaignGoal;
  channel: Channel;
  offer: string;
}

// One-click example briefs — the empty state runs a real generation.
const EXAMPLE_BRIEFS: { label: string; detail: string; brief: Brief }[] = [
  {
    label: "Win back At Risk customers",
    detail: "38 customers · WhatsApp",
    brief: { segment: "At Risk", goal: "Win Back", channel: "WhatsApp", offer: "" },
  },
  {
    label: "Reward Champions",
    detail: "30 customers · Email",
    brief: { segment: "Champions", goal: "Loyalty Reward", channel: "Email", offer: "" },
  },
  {
    label: "Welcome new customers",
    detail: "42 customers · Email",
    brief: { segment: "New Customers", goal: "Welcome", channel: "Email", offer: "" },
  },
];

const inputClass =
  "w-full rounded-md border border-stone-300 bg-white px-2.5 text-[13px] text-stone-900 transition-shadow focus:border-[#2E5CE6] focus:outline-none focus:ring-2 focus:ring-[#2E5CE6]/25";

export function CopilotClient({ initialSegment }: CopilotClientProps) {
  const [segment, setSegment] = useState<Segment>(initialSegment ?? "Champions");
  const [goal, setGoal] = useState<CampaignGoal>("Re-engage");
  const [channel, setChannel] = useState<Channel>("Email");
  const [offer, setOffer] = useState("");
  const [state, setState] = useState<GenerationState>({ status: "idle" });

  const segmentStats = SEGMENT_STATS.find((s) => s.segment === segment);

  const runGeneration = useCallback(async (brief: Brief, isRegen = false) => {
    setState((prev) =>
      isRegen && prev.status === "success"
        ? { ...prev, isRegenerating: true }
        : { status: "loading" }
    );
    try {
      const res = await fetch("/api/generate-campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brief),
      });
      const data = await res.json();
      if (!res.ok) {
        setState({
          status: "error",
          message: data.error ?? "Generation failed. Try again.",
        });
        return;
      }
      setState({
        status: "success",
        campaign: data.campaign,
        isRegenerating: false,
      });
    } catch {
      setState({
        status: "error",
        message: "Network error. Check your connection and try again.",
      });
    }
  }, []);

  const handleGenerate = () => runGeneration({ segment, goal, channel, offer });
  const handleRegenerate = () =>
    runGeneration({ segment, goal, channel, offer }, true);

  const handleExample = (brief: Brief) => {
    setSegment(brief.segment);
    setGoal(brief.goal);
    setChannel(brief.channel);
    setOffer(brief.offer);
    runGeneration(brief);
  };

  const busy =
    state.status === "loading" ||
    (state.status === "success" && state.isRegenerating);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-8">
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-semibold tracking-tight text-stone-900">
          Campaigns
        </h1>
        <Provenance className="hidden sm:block">Drafts grounded in segment data · demo data</Provenance>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        {/* Brief rail */}
        <div className="space-y-4">
          <div className="space-y-4 rounded-[10px] border border-stone-200 bg-white p-5">
            {/* Audience with live evidence */}
            <div>
              <label
                htmlFor="audience"
                className="mb-1.5 block text-xs font-medium text-stone-700"
              >
                Audience
              </label>
              <select
                id="audience"
                value={segment}
                onChange={(e) => setSegment(e.target.value as Segment)}
                className={cn(inputClass, "h-8")}
              >
                {SEGMENTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {segmentStats && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs tabular-nums text-stone-500">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: SEGMENT_HEX[segment] }}
                  />
                  {segmentStats.count} customers · avg{" "}
                  {formatCurrency(segmentStats.avgSpend)} · RFM{" "}
                  {segmentStats.avgRfm}
                </p>
              )}
            </div>

            {/* Objective */}
            <div>
              <label
                htmlFor="objective"
                className="mb-1.5 block text-xs font-medium text-stone-700"
              >
                Objective
              </label>
              <select
                id="objective"
                value={goal}
                onChange={(e) => setGoal(e.target.value as CampaignGoal)}
                className={cn(inputClass, "h-8")}
              >
                {CAMPAIGN_GOALS.map((g) => (
                  <option key={g} value={g}>
                    {GOAL_LABELS[g]}
                  </option>
                ))}
              </select>
            </div>

            {/* Channel — words, no emoji */}
            <div>
              <p className="mb-1.5 text-xs font-medium text-stone-700">Channel</p>
              <div className="grid grid-cols-2 gap-1.5">
                {CHANNELS.map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => setChannel(ch)}
                    className={cn(
                      "h-8 rounded-md border text-[13px] transition-colors duration-150",
                      channel === ch
                        ? "border-stone-900 bg-stone-50 font-medium text-stone-900"
                        : "border-stone-200 text-stone-600 hover:border-stone-300 hover:text-stone-900"
                    )}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            {/* Offer */}
            <div>
              <label
                htmlFor="offer"
                className="mb-1.5 block text-xs font-medium text-stone-700"
              >
                Offer{" "}
                <span className="font-normal text-stone-500">(optional)</span>
              </label>
              <textarea
                id="offer"
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                placeholder="20% off orders above ₹999"
                rows={3}
                maxLength={280}
                className={cn(inputClass, "resize-none py-2")}
              />
              <p className="mt-1 text-right font-mono text-[11px] text-stone-500">
                {offer.length}/280 · woven verbatim into the draft
              </p>
            </div>

            {/* Generate — ink primary */}
            <button
              onClick={handleGenerate}
              disabled={busy}
              className="flex h-9 w-full items-center justify-center gap-2 rounded-md bg-stone-900 text-[13px] font-medium text-white transition-colors hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
            >
              {state.status === "loading" ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Drafting · llama-3.3-70b
                </>
              ) : (
                "Generate draft"
              )}
            </button>
          </div>

          {/* What the model sees — AI transparency */}
          <details className="group rounded-[10px] border border-stone-200 bg-white">
            <summary className="cursor-pointer list-none px-4 py-2.5 text-xs font-medium text-stone-600 transition-colors hover:text-stone-900">
              <span className="mr-1.5 inline-block transition-transform group-open:rotate-90">
                ›
              </span>
              What the model sees
            </summary>
            <div className="border-t border-stone-100 px-4 py-3">
              <pre className="whitespace-pre-wrap rounded bg-stone-50 p-2.5 font-mono text-[11px] leading-relaxed text-stone-600">
                {`Segment: ${segment} — ${segmentStats?.count ?? 0} customers,
avg spend ${segmentStats ? formatCurrency(segmentStats.avgSpend) : "—"},
avg RFM ${segmentStats?.avgRfm ?? "—"}
Objective: ${GOAL_LABELS[goal]}
Channel: ${channel}
Offer: ${offer || "(none — model proposes one)"}`}
              </pre>
              <Provenance className="mt-2">
                Sent verbatim to llama-3.3-70b · nothing else leaves the brief
              </Provenance>
            </div>
          </details>
        </div>

        {/* Artifact canvas */}
        <div>
          {state.status === "idle" && (
            <div className="rounded-[10px] border border-stone-200 bg-white p-5">
              <p className="text-[13px] text-stone-600">
                No drafts yet. Start from a brief, or pick an example.
              </p>
              <div className="mt-4 divide-y divide-stone-100 rounded-md border border-stone-200">
                {EXAMPLE_BRIEFS.map((ex) => (
                  <button
                    key={ex.label}
                    onClick={() => handleExample(ex.brief)}
                    className="group flex w-full items-center justify-between px-4 py-3 text-left transition-colors first:rounded-t-md last:rounded-b-md hover:bg-stone-50"
                  >
                    <span>
                      <span className="block text-[13px] font-medium text-stone-900">
                        {ex.label}
                      </span>
                      <span className="block text-xs tabular-nums text-stone-500">
                        {ex.detail}
                      </span>
                    </span>
                    <span className="text-[13px] text-stone-300 transition-colors group-hover:text-stone-900">
                      →
                    </span>
                  </button>
                ))}
              </div>
              <Provenance className="mt-4">
                Each example runs a real generation against current segment data
              </Provenance>
            </div>
          )}

          {state.status === "loading" && (
            <div className="rounded-[10px] border border-stone-200 bg-white p-5">
              <p className="mb-4 flex items-center gap-2 font-mono text-[11px] text-stone-500">
                <Loader2 size={12} className="animate-spin" />
                Drafting · llama-3.3-70b
              </p>
              <CampaignSkeleton />
            </div>
          )}

          {state.status === "error" && (
            <div className="rounded-[10px] border border-stone-200 bg-white p-5">
              <p className="text-[13px] font-medium text-[#C2342C]">
                Generation failed
              </p>
              <p className="mt-1 text-[13px] text-stone-600">{state.message}</p>
              <button
                onClick={handleGenerate}
                className="mt-4 h-8 rounded-md border border-stone-300 px-3 text-[13px] font-medium text-stone-900 transition-colors hover:bg-stone-50"
              >
                Try again
              </button>
            </div>
          )}

          {state.status === "success" && (
            <div className="rounded-[10px] border border-stone-200 bg-white p-5">
              <CampaignOutput
                campaign={state.campaign}
                onRegenerate={handleRegenerate}
                isRegenerating={state.isRegenerating}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
