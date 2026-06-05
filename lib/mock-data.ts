import type {
  Customer,
  Segment,
  LoyaltyTier,
  Channel,
  MonthlyRevenue,
  SegmentStats,
  TierStats,
} from "@/types";

// Seeded deterministic RNG (mulberry32) — ensures stable SSR/client hydration
function mulberry32(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = mulberry32(0xdeadbeef);

function ri(min: number, max: number) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

function dateAgo(daysAgo: number): string {
  const d = new Date("2026-06-01");
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
}

function loyaltyTier(pts: number): LoyaltyTier {
  if (pts >= 20000) return "Platinum";
  if (pts >= 7500) return "Gold";
  if (pts >= 2500) return "Silver";
  return "Bronze";
}

const FIRST_NAMES = [
  "Rahul", "Priya", "Arjun", "Anjali", "Vikram", "Sunita", "Rohit", "Neha",
  "Amit", "Pooja", "Sanjay", "Divya", "Raj", "Kavya", "Aakash", "Meera",
  "Deepak", "Nisha", "Kiran", "Shreya", "Manish", "Ananya", "Vivek", "Ritu",
  "Arun", "Lakshmi", "Naveen", "Sneha", "Varun", "Ishita", "Harish", "Tanya",
  "Girish", "Pallavi", "Pramod", "Swati", "Ravi", "Aarti", "Sunil", "Jyoti",
  "Vinod", "Geeta", "Rajesh", "Usha", "Manoj", "Chitra", "Ganesh", "Radha",
  "Siddharth", "Rohan", "Nikhil", "Kartik", "Ankit", "Puja", "Sonal", "Rina",
  "Kirti", "Suresh", "Nita", "Madhu",
] as const;

const LAST_NAMES = [
  "Sharma", "Patel", "Kumar", "Singh", "Gupta", "Mehta", "Joshi", "Iyer",
  "Reddy", "Nair", "Rao", "Verma", "Chauhan", "Shah", "Saxena", "Mishra",
  "Pandey", "Srivastava", "Pillai", "Bhat", "Agarwal", "Desai", "Kulkarni",
  "Krishnan", "Menon", "Tiwari", "Banerjee", "Das", "Malhotra", "Kapoor",
] as const;

const CITIES = [
  "Mumbai", "Delhi", "Bengaluru", "Chennai", "Hyderabad", "Pune", "Kolkata",
  "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Chandigarh", "Bhopal", "Kochi",
  "Nagpur", "Indore", "Vadodara", "Coimbatore", "Visakhapatnam", "Patna",
] as const;

const CHANNELS: readonly Channel[] = ["Email", "SMS", "WhatsApp", "All Channels"];

let _id = 1;

interface SegmentProfile {
  segment: Segment;
  count: number;
  r: [number, number];
  f: [number, number];
  m: [number, number];
  spendMin: number;
  spendMax: number;
  purchaseMin: number;
  purchaseMax: number;
  pointsMin: number;
  pointsMax: number;
  recencyDaysMin: number;
  recencyDaysMax: number;
}

const PROFILES: SegmentProfile[] = [
  {
    segment: "Champions",
    count: 30,
    r: [4, 5], f: [4, 5], m: [4, 5],
    spendMin: 30000, spendMax: 120000,
    purchaseMin: 12, purchaseMax: 36,
    pointsMin: 15000, pointsMax: 50000,
    recencyDaysMin: 1, recencyDaysMax: 30,
  },
  {
    segment: "Loyal Customers",
    count: 50,
    r: [3, 5], f: [3, 5], m: [3, 4],
    spendMin: 15000, spendMax: 50000,
    purchaseMin: 8, purchaseMax: 20,
    pointsMin: 5000, pointsMax: 20000,
    recencyDaysMin: 10, recencyDaysMax: 60,
  },
  {
    segment: "At Risk",
    count: 38,
    r: [1, 2], f: [3, 5], m: [3, 5],
    spendMin: 12000, spendMax: 60000,
    purchaseMin: 6, purchaseMax: 18,
    pointsMin: 5000, pointsMax: 18000,
    recencyDaysMin: 90, recencyDaysMax: 200,
  },
  {
    segment: "New Customers",
    count: 42,
    r: [5, 5], f: [1, 2], m: [1, 2],
    spendMin: 500, spendMax: 6000,
    purchaseMin: 1, purchaseMax: 3,
    pointsMin: 50, pointsMax: 600,
    recencyDaysMin: 1, recencyDaysMax: 20,
  },
  {
    segment: "Hibernating",
    count: 40,
    r: [1, 2], f: [1, 2], m: [1, 2],
    spendMin: 400, spendMax: 5000,
    purchaseMin: 1, purchaseMax: 4,
    pointsMin: 40, pointsMax: 2000,
    recencyDaysMin: 180, recencyDaysMax: 365,
  },
];

function generateCustomers(): Customer[] {
  const customers: Customer[] = [];

  for (const profile of PROFILES) {
    for (let i = 0; i < profile.count; i++) {
      const firstName = pick(FIRST_NAMES);
      const lastName = pick(LAST_NAMES);
      const name = `${firstName} ${lastName}`;
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${_id}@example.com`;

      const r = ri(profile.r[0], profile.r[1]);
      const f = ri(profile.f[0], profile.f[1]);
      const m = ri(profile.m[0], profile.m[1]);
      const composite = r * 100 + f * 10 + m;

      const totalSpend = ri(profile.spendMin, profile.spendMax);
      const purchaseCount = ri(profile.purchaseMin, profile.purchaseMax);
      const loyaltyPoints = ri(profile.pointsMin, profile.pointsMax);
      const daysAgo = ri(profile.recencyDaysMin, profile.recencyDaysMax);

      const city = pick(CITIES);
      const preferredChannel = pick(CHANNELS);

      customers.push({
        id: `cust_${String(_id++).padStart(4, "0")}`,
        name,
        email,
        segment: profile.segment,
        rfmScore: { recency: r, frequency: f, monetary: m, composite },
        totalSpend,
        lastPurchase: dateAgo(daysAgo),
        purchaseCount,
        loyaltyTier: loyaltyTier(loyaltyPoints),
        loyaltyPoints,
        preferredChannel,
        city,
      });
    }
  }

  return customers;
}

export const CUSTOMERS: Customer[] = generateCustomers();

// Monthly revenue — last 6 months in INR
export const MONTHLY_REVENUE: MonthlyRevenue[] = [
  { month: "Jan", revenue: 4200000, orders: 1240 },
  { month: "Feb", revenue: 3850000, orders: 1090 },
  { month: "Mar", revenue: 5100000, orders: 1480 },
  { month: "Apr", revenue: 4750000, orders: 1360 },
  { month: "May", revenue: 5600000, orders: 1620 },
  { month: "Jun", revenue: 6200000, orders: 1840 },
];

const SEGMENT_META: Record<
  Segment,
  { description: string }
> = {
  Champions: {
    description: "Bought recently, buy often, and spend the most. Your best customers.",
  },
  "Loyal Customers": {
    description: "Spend consistently and respond well to loyalty reward programs.",
  },
  "At Risk": {
    description: "Used to purchase frequently but haven't bought recently. Act fast.",
  },
  "New Customers": {
    description: "Made their first purchase recently. Nurture them into loyal buyers.",
  },
  Hibernating: {
    description: "Low activity across all RFM dimensions. Win-back campaigns needed.",
  },
};

// Computed segment stats from CUSTOMERS
export const SEGMENT_STATS: SegmentStats[] = Object.entries(SEGMENT_META).map(
  ([seg, meta]) => {
    const segCustomers = CUSTOMERS.filter((c) => c.segment === seg);
    const totalRevenue = segCustomers.reduce((s, c) => s + c.totalSpend, 0);
    const avgSpend =
      segCustomers.length > 0
        ? Math.round(totalRevenue / segCustomers.length)
        : 0;
    const avgRfm =
      segCustomers.length > 0
        ? Math.round(
            segCustomers.reduce((s, c) => s + c.rfmScore.composite, 0) /
              segCustomers.length
          )
        : 0;
    return {
      segment: seg as Segment,
      count: segCustomers.length,
      avgSpend,
      avgRfm,
      totalRevenue,
      description: meta.description,
    };
  }
);

const TIER_META: Record<
  "Bronze" | "Silver" | "Gold" | "Platinum",
  {
    minPoints: number;
    maxPoints: number | null;
    benefits: string[];
  }
> = {
  Bronze: {
    minPoints: 0,
    maxPoints: 2499,
    benefits: [
      "Early access to sale events",
      "Birthday discount (5%)",
      "Free standard shipping on orders above ₹999",
    ],
  },
  Silver: {
    minPoints: 2500,
    maxPoints: 7499,
    benefits: [
      "All Bronze benefits",
      "10% discount on select categories",
      "Free express shipping",
      "Exclusive member-only offers",
    ],
  },
  Gold: {
    minPoints: 7500,
    maxPoints: 19999,
    benefits: [
      "All Silver benefits",
      "Priority customer support",
      "15% flat discount on all orders",
      "Double points on weekends",
      "Dedicated account manager",
    ],
  },
  Platinum: {
    minPoints: 20000,
    maxPoints: null,
    benefits: [
      "All Gold benefits",
      "20% flat discount, always",
      "Free same-day delivery",
      "Exclusive product launches",
      "Personal shopper service",
      "Concierge returns & exchanges",
    ],
  },
};

export const TIER_STATS: TierStats[] = (["Bronze", "Silver", "Gold", "Platinum"] as const).map(
  (tier) => {
    const meta = TIER_META[tier];
    const tierCustomers = CUSTOMERS.filter((c) => c.loyaltyTier === tier);
    const avgSpend =
      tierCustomers.length > 0
        ? Math.round(
            tierCustomers.reduce((s, c) => s + c.totalSpend, 0) /
              tierCustomers.length
          )
        : 0;
    return {
      tier,
      count: tierCustomers.length,
      minPoints: meta.minPoints,
      maxPoints: meta.maxPoints,
      avgSpend,
      benefits: meta.benefits,
    };
  }
);
