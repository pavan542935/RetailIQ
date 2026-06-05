"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { Campaign } from "@/types";
import { Provenance } from "@/components/Provenance";

interface CampaignOutputProps {
  campaign: Campaign;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

function formatISTTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
  } catch {
    return "—";
  }
}

export function CampaignOutput({
  campaign,
  onRegenerate,
  isRegenerating,
}: CampaignOutputProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = `${campaign.subject}\n\n${campaign.body}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Model attribution lives here — in metadata, not in headlines.
  const provenance =
    campaign.source === "ai"
      ? `Generated ${formatISTTime(campaign.generatedAt)} IST · ${campaign.segment} · llama-3.3-70b`
      : `Sample draft · demo mode · ${campaign.segment}`;

  return (
    <div className="space-y-4">
      {/* Header — channel + goal as quiet metadata, regenerate as ghost action */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-stone-500">
          <span className="font-medium text-stone-700">{campaign.channel}</span>
          <span className="mx-1.5 text-stone-300">·</span>
          {campaign.goal}
          <span className="mx-1.5 text-stone-300">·</span>
          {campaign.tone}
        </p>
        <button
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isRegenerating && <Loader2 size={12} className="animate-spin" />}
          {isRegenerating ? "Drafting" : "Regenerate"}
        </button>
      </div>

      {/* Subject */}
      <div>
        <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500">
          Subject
        </p>
        <p className="text-[15px] font-semibold leading-snug text-stone-900">
          {campaign.subject}
        </p>
      </div>

      {/* Message body — sunken surface, channel-neutral */}
      <div>
        <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500">
          Message
        </p>
        <div className="whitespace-pre-wrap rounded-md bg-[#F5F4F2] p-4 text-[13px] leading-relaxed text-stone-800">
          {campaign.body}
        </div>
      </div>

      {/* Meta row — timing and predicted open rate with stated basis */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-2 border-t border-stone-100 pt-3 sm:grid-cols-2">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500">
            Send timing
          </p>
          <p className="mt-0.5 text-[13px] text-stone-800">{campaign.timing}</p>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500">
            Predicted open rate
          </p>
          <p className="mt-0.5 text-[13px] tabular-nums text-stone-800">
            {campaign.expectedOpenRate}
            <span className="ml-1.5 text-xs text-stone-500">
              channel benchmark for this segment
            </span>
          </p>
        </div>
      </div>

      {/* Personalisation note */}
      {campaign.personalizationTip && (
        <div className="border-t border-stone-100 pt-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-stone-500">
            Personalisation
          </p>
          <p className="mt-0.5 text-[13px] leading-relaxed text-stone-600">
            {campaign.personalizationTip}
          </p>
        </div>
      )}

      {/* Actions + provenance */}
      <div className="space-y-3 border-t border-stone-100 pt-3">
        <button
          onClick={handleCopy}
          className="h-9 w-full rounded-md border border-stone-300 text-[13px] font-medium text-stone-900 transition-colors hover:bg-stone-50"
        >
          {copied ? "Copied" : "Copy message"}
        </button>
        <Provenance>{provenance}</Provenance>
      </div>
    </div>
  );
}

// Geometry-faithful skeleton for the artifact card
export function CampaignSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="flex justify-between">
        <div className="h-3.5 w-44 rounded bg-stone-100" />
        <div className="h-3.5 w-20 rounded bg-stone-100" />
      </div>
      <div className="space-y-1.5">
        <div className="h-3 w-14 rounded bg-stone-100" />
        <div className="h-5 w-3/4 rounded bg-stone-200" />
      </div>
      <div className="space-y-1.5">
        <div className="h-3 w-16 rounded bg-stone-100" />
        <div className="space-y-2 rounded-md bg-[#F5F4F2] p-4">
          <div className="h-3.5 w-full rounded bg-stone-200" />
          <div className="h-3.5 w-5/6 rounded bg-stone-200" />
          <div className="h-3.5 w-4/5 rounded bg-stone-200" />
          <div className="h-3.5 w-2/3 rounded bg-stone-200" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 border-t border-stone-100 pt-3">
        <div className="space-y-1.5">
          <div className="h-3 w-20 rounded bg-stone-100" />
          <div className="h-3.5 w-full rounded bg-stone-200" />
        </div>
        <div className="space-y-1.5">
          <div className="h-3 w-28 rounded bg-stone-100" />
          <div className="h-3.5 w-24 rounded bg-stone-200" />
        </div>
      </div>
      <div className="h-9 w-full rounded-md bg-stone-100" />
    </div>
  );
}
