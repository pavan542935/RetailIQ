export const SEGMENTS = [
  "Champions",
  "Loyal Customers",
  "At Risk",
  "New Customers",
  "Hibernating",
] as const;
export type Segment = (typeof SEGMENTS)[number];

export const LOYALTY_TIERS = ["Bronze", "Silver", "Gold", "Platinum"] as const;
export type LoyaltyTier = (typeof LOYALTY_TIERS)[number];

export const CHANNELS = ["Email", "SMS", "WhatsApp", "All Channels"] as const;
export type Channel = (typeof CHANNELS)[number];

export const CAMPAIGN_GOALS = [
  "Re-engage",
  "Upsell",
  "Loyalty Reward",
  "Win Back",
  "Welcome",
] as const;
export type CampaignGoal = (typeof CAMPAIGN_GOALS)[number];

export interface RfmScore {
  recency: number;
  frequency: number;
  monetary: number;
  composite: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  segment: Segment;
  rfmScore: RfmScore;
  totalSpend: number;
  lastPurchase: string;
  purchaseCount: number;
  loyaltyTier: LoyaltyTier;
  loyaltyPoints: number;
  preferredChannel: Channel;
  city: string;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  orders: number;
}

export interface SegmentStats {
  segment: Segment;
  count: number;
  avgSpend: number;
  avgRfm: number;
  totalRevenue: number;
  description: string;
}

export interface TierStats {
  tier: LoyaltyTier;
  count: number;
  minPoints: number;
  maxPoints: number | null;
  avgSpend: number;
  benefits: string[];
}

export interface CampaignRequest {
  segment: Segment;
  goal: CampaignGoal;
  channel: Channel;
  offer: string;
}

export interface Campaign {
  id: string;
  subject: string;
  body: string;
  channel: Channel;
  timing: string;
  expectedOpenRate: string;
  tone: string;
  personalizationTip: string;
  segment: Segment;
  goal: CampaignGoal;
  offer: string;
  source: "ai" | "mock";
  generatedAt: string;
}

export interface CampaignSuccessResponse {
  campaign: Campaign;
}

export interface CampaignErrorResponse {
  error: string;
  code: string;
}
