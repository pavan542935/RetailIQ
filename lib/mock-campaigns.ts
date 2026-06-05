import type { Segment, CampaignGoal } from "@/types";

interface MockCampaignData {
  subject: string;
  body: string;
  timing: string;
  expectedOpenRate: string;
  tone: string;
  personalizationTip: string;
}

export const MOCK_CAMPAIGNS: Partial<
  Record<Segment, Partial<Record<CampaignGoal, MockCampaignData>>>
> = {
  Champions: {
    "Re-engage": {
      subject: "We miss you, {{name}} — here's something just for you",
      body: "Hi {{name}},\n\nAs one of our most valued Champions, your loyalty means the world to us. We noticed it's been a little while since your last visit — and we'd love to welcome you back with an exclusive offer crafted just for you.\n\n{{offer}}\n\nYour VIP status ensures you get the best prices, early access to new arrivals, and priority support. We'd love to keep earning your trust.\n\nShop now and redeem your exclusive reward. 🎁",
      timing: "Tuesday or Wednesday, 10 AM–12 PM IST",
      expectedOpenRate: "38–45%",
      tone: "warm, exclusive",
      personalizationTip: "Reference their last purchased category and suggest complementary products",
    },
    Upsell: {
      subject: "Upgrade your experience, {{name}} — you've earned it",
      body: "Hi {{name}},\n\nYou're already among our top customers — and we believe you deserve even more. Based on your shopping patterns, we've curated a premium selection we think you'll love.\n\n{{offer}}\n\nAs a Champion member, you unlock exclusive early access to our premium tier products before anyone else. This offer is only available to our top 15% of customers.\n\nTap below to explore your personalised picks. ✨",
      timing: "Thursday, 7 PM–9 PM IST",
      expectedOpenRate: "42–50%",
      tone: "exclusive, aspirational",
      personalizationTip: "Show product recommendations based on highest-spend category",
    },
    "Loyalty Reward": {
      subject: "🏆 You've unlocked a Champion reward, {{name}}!",
      body: "Hello {{name}},\n\nCelebrating YOU — our Champion customer!\n\nYour continued loyalty has earned you an exclusive reward:\n\n{{offer}}\n\nAs a Champion, you automatically earn double points this week. That means every rupee you spend today counts twice towards your next milestone reward.\n\nThank you for being extraordinary. 🌟",
      timing: "Friday, 11 AM–1 PM IST",
      expectedOpenRate: "44–52%",
      tone: "celebratory, grateful",
      personalizationTip: "Show their current point balance and how close they are to the next reward milestone",
    },
    "Win Back": {
      subject: "{{name}}, we saved something special for you",
      body: "Hi {{name}},\n\nYou're a Champion — and Champions deserve to be celebrated, not lost. We've noticed a gap in your recent orders and we'd love to bring you back.\n\n{{offer}}\n\nThis is our exclusive win-back offer, available only to valued members like yourself. It expires in 5 days, so don't let it slip away.\n\nWe'd love to have you back. 💙",
      timing: "Monday, 9 AM–11 AM IST",
      expectedOpenRate: "40–48%",
      tone: "sincere, urgent",
      personalizationTip: "Remind them of their all-time purchase history and point balance to reinforce value",
    },
    Welcome: {
      subject: "Welcome to the Champions Club, {{name}}! 🎉",
      body: "Congratulations {{name}},\n\nYou've officially reached Champion status — our highest tier of customers.\n\n{{offer}}\n\nAs a Champion, here's what you now unlock:\n• 20% off all future orders\n• Priority customer support (response in < 2 hours)\n• First access to new product launches\n• Dedicated account manager\n\nThank you for your incredible loyalty. You make us better every day.",
      timing: "Immediately upon tier upgrade",
      expectedOpenRate: "55–65%",
      tone: "celebratory, premium",
      personalizationTip: "Include their total lifetime spend as a badge of honour in the message",
    },
  },

  "Loyal Customers": {
    "Re-engage": {
      subject: "{{name}}, we have something waiting for you",
      body: "Hi {{name}},\n\nYou're one of our most consistent shoppers — and we always love seeing your orders come in. We've put together something special to show our appreciation:\n\n{{offer}}\n\nYour loyalty has not gone unnoticed. As a valued member, this offer is reserved exclusively for customers like you.\n\nCome back and see what's new — we've added some great products since your last visit!",
      timing: "Wednesday, 10 AM–12 PM IST",
      expectedOpenRate: "32–40%",
      tone: "appreciative, friendly",
      personalizationTip: "Highlight any new products in the categories they most frequently shop",
    },
    Upsell: {
      subject: "Level up your favourites, {{name}} — premium picks inside",
      body: "Hi {{name}},\n\nWe know what you love — and we think you're ready for the next level.\n\n{{offer}}\n\nBased on your purchase history, we've curated a premium selection of products that complement what you already love. Loyal customers who explored these picks rated them 4.8/5 on average.\n\nReady to upgrade your experience?",
      timing: "Thursday or Friday, 7 PM–9 PM IST",
      expectedOpenRate: "28–36%",
      tone: "friendly, aspirational",
      personalizationTip: "Show the next loyalty tier they could reach and how many more points they need",
    },
    "Loyalty Reward": {
      subject: "Your loyalty points are ready to use, {{name}} 🎁",
      body: "Hello {{name}},\n\nYou've been consistently amazing — and your points have been building up!\n\n{{offer}}\n\nYou currently have enough points to redeem a significant reward. This is our way of saying: thank you for sticking with us.\n\nUse your reward on your next order. Valid for the next 14 days.",
      timing: "Friday, 12 PM–2 PM IST",
      expectedOpenRate: "35–42%",
      tone: "grateful, rewarding",
      personalizationTip: "Show exact point balance and the rupee value of the reward they can redeem",
    },
    "Win Back": {
      subject: "{{name}}, we noticed you've been away — we want you back",
      body: "Hi {{name}},\n\nYou've been a loyal customer and we genuinely miss you. It's been a while since your last order and we'd love to welcome you back with open arms.\n\n{{offer}}\n\nThis offer is our heartfelt invitation to come back. We've added exciting new products and improved our service based on customer feedback. We can't wait to show you what's new.",
      timing: "Tuesday, 10 AM–12 PM IST",
      expectedOpenRate: "28–35%",
      tone: "warm, sincere",
      personalizationTip: "Mention the number of months since their last purchase and empathise",
    },
    Welcome: {
      subject: "Welcome back, {{name}} — your loyalty is rewarded 🙌",
      body: "Hi {{name}},\n\nWelcome to your next chapter with us!\n\n{{offer}}\n\nYour consistent purchases have earned you Loyal Customer status — and it comes with exclusive perks:\n• 10% off on select categories\n• Free express shipping\n• Exclusive member-only offers\n\nThank you for being such a consistent part of our community.",
      timing: "Immediately upon tier entry",
      expectedOpenRate: "45–55%",
      tone: "welcoming, rewarding",
      personalizationTip: "Include their loyalty journey — how long they've been a customer and total spend",
    },
  },

  "At Risk": {
    "Re-engage": {
      subject: "{{name}}, we don't want to lose you ❤️",
      body: "Hi {{name}},\n\nWe've been looking at our customer family and we noticed something — we haven't seen you in a while, {{name}}.\n\nWe'd love to know if something went wrong, or if life just got busy. Either way, we want you back.\n\n{{offer}}\n\nThis is a personal offer — just for you. No strings attached. We simply want to earn your trust back and prove we're worth another shot.",
      timing: "Monday or Tuesday, 11 AM–1 PM IST",
      expectedOpenRate: "22–30%",
      tone: "personal, honest",
      personalizationTip: "Reference their last purchase date specifically — 'We last saw you on [date]'",
    },
    Upsell: {
      subject: "{{name}}, before you go — see what you've been missing",
      body: "Hi {{name}},\n\nWe know it's been a while. But before you completely move on, we want to show you what's new.\n\n{{offer}}\n\nWe've launched exciting new products in categories you've previously loved — and early access is available to returning customers like you.\n\nCome take a look. We think you'll be impressed.",
      timing: "Wednesday, 6 PM–8 PM IST",
      expectedOpenRate: "18–25%",
      tone: "confident, inviting",
      personalizationTip: "Show new arrivals in their historical purchase categories",
    },
    "Loyalty Reward": {
      subject: "Your points are expiring, {{name}} — don't let them go to waste",
      body: "Hi {{name}},\n\nQuick heads-up: you have loyalty points that are about to expire.\n\n{{offer}}\n\nYour points: {{points}}\nExpiry: 30 days from today\n\nDon't let your earned rewards go to waste. Use them on your next purchase and discover what's new. We've added over 200 new products this season.",
      timing: "Immediately, then reminder at 7 days before expiry",
      expectedOpenRate: "30–38%",
      tone: "urgent, helpful",
      personalizationTip: "Show the rupee value of their expiring points prominently",
    },
    "Win Back": {
      subject: "One last try, {{name}} — we have a special offer",
      body: "Hi {{name}},\n\nWe're reaching out one more time because you matter to us.\n\n{{offer}}\n\nWe've updated our product range, improved our delivery times, and enhanced our return policy — all based on feedback from customers like you.\n\nGive us one more chance. We promise this experience will be better than before.",
      timing: "Thursday, 10 AM–12 PM IST",
      expectedOpenRate: "20–28%",
      tone: "humble, sincere",
      personalizationTip: "Include a short testimonial from a returning customer who had a similar pattern",
    },
    Welcome: {
      subject: "Welcome back, {{name}} — we've kept the light on 🕯️",
      body: "Hi {{name}},\n\nIt's so good to see you back!\n\n{{offer}}\n\nWe've missed having you around. As a returning customer, we've prepared a special welcome-back gift:\n• Instant 15% off your first order back\n• Free express delivery\n• Bonus loyalty points\n\nLet's start fresh. We're so glad you're back.",
      timing: "Immediately upon return purchase",
      expectedOpenRate: "48–58%",
      tone: "warm, relieved",
      personalizationTip: "Acknowledge their return specifically and celebrate the fact they came back",
    },
  },

  "New Customers": {
    "Re-engage": {
      subject: "Hey {{name}}, ready for your next order? 👋",
      body: "Hi {{name}},\n\nWe loved having you as a customer for the first time! But we've noticed your next order hasn't happened yet.\n\n{{offer}}\n\nWe know first experiences matter, and we want yours to be perfect. If anything went wrong with your first order, our support team is ready to make it right.\n\nOtherwise — come back and explore more. There's so much waiting for you!",
      timing: "Day 14 after first purchase, 10 AM IST",
      expectedOpenRate: "28–36%",
      tone: "friendly, encouraging",
      personalizationTip: "Reference their first-order product by name to show personalisation",
    },
    Upsell: {
      subject: "{{name}}, customers who bought [product] also love these",
      body: "Hi {{name}},\n\nWe're so glad you made your first purchase with us! Based on what you ordered, we have a feeling you'll love these too.\n\n{{offer}}\n\nOur top recommendation for new customers like you is to try [complementary product] — it pairs perfectly with your recent order and 94% of buyers say they love it.\n\nExplore more and find your next favourite.",
      timing: "Day 7 after first purchase, 11 AM IST",
      expectedOpenRate: "30–38%",
      tone: "helpful, guiding",
      personalizationTip: "Use their first-order product as the anchor for all recommendations",
    },
    "Loyalty Reward": {
      subject: "{{name}}, you've earned your first reward! 🌟",
      body: "Hi {{name}},\n\nGreat news — you've just earned {{points}} loyalty points from your first order!\n\n{{offer}}\n\nHere's how the rewards work:\n• Every ₹10 spent = 1 point\n• 2,500 points = Silver tier (10% off everything!)\n• Points never expire as long as you shop once a year\n\nYou're already on your way to bigger rewards. Keep going!",
      timing: "Day 1 after first purchase, 12 PM IST",
      expectedOpenRate: "42–52%",
      tone: "exciting, educational",
      personalizationTip: "Show a visual progress bar towards their next tier milestone",
    },
    "Win Back": {
      subject: "{{name}}, did we do something wrong? We want to know",
      body: "Hi {{name}},\n\nYou gave us a chance and we're grateful for that. But we've noticed you haven't returned yet.\n\n{{offer}}\n\nWas something wrong with your order? Was the experience not up to your expectations? Please reply to this message — we read every response and we want to make it right.\n\nAs a token of goodwill, here's an offer from us to you.",
      timing: "Day 21 after first purchase, 10 AM IST",
      expectedOpenRate: "24–32%",
      tone: "humble, conversational",
      personalizationTip: "Include a brief customer support satisfaction survey (1 click)",
    },
    Welcome: {
      subject: "Welcome to the family, {{name}}! Here's what's next 🎉",
      body: "Hi {{name}},\n\nWelcome! We're so excited you're here.\n\n{{offer}}\n\nAs a new member, here's what awaits you:\n• Instant access to our entire catalogue\n• Free shipping on first 3 orders\n• Loyalty points on every purchase\n• 24/7 customer support\n\nYour first purchase has already earned you Bronze loyalty status. Start exploring — there's so much to discover!",
      timing: "Immediately after registration",
      expectedOpenRate: "52–62%",
      tone: "exciting, welcoming",
      personalizationTip: "Personalise with the city they're in and show local delivery timelines",
    },
  },

  Hibernating: {
    "Re-engage": {
      subject: "{{name}}, it's been too long — we're reaching out one more time",
      body: "Hi {{name}},\n\nWe haven't seen you in quite a while and we truly miss you.\n\n{{offer}}\n\nWe understand life gets busy. But we've made some incredible improvements since you last visited:\n• New product ranges\n• Faster delivery (same day in your city)\n• Improved return policy (30 days, no questions asked)\n\nWe'd love a second chance to impress you.",
      timing: "Wednesday, 11 AM–1 PM IST",
      expectedOpenRate: "16–22%",
      tone: "hopeful, humble",
      personalizationTip: "Show the time gap since last purchase — '{{X}} months ago, you ordered...'",
    },
    Upsell: {
      subject: "{{name}}, things have changed — here's what's new",
      body: "Hi {{name}},\n\nA lot has happened since we last saw you, {{name}}. We've expanded our range significantly and there's something for everyone now.\n\n{{offer}}\n\nBased on your past preferences, we've curated a selection we think you'll find irresistible. New arrivals. New prices. Same commitment to quality.\n\nCome back and see what you've been missing.",
      timing: "Thursday, 6 PM–8 PM IST",
      expectedOpenRate: "14–20%",
      tone: "curious, re-introductory",
      personalizationTip: "Highlight the biggest improvements since their last purchase date",
    },
    "Loyalty Reward": {
      subject: "{{name}}, your dormant points are about to expire",
      body: "Hi {{name}},\n\nThis is an important notice: you have {{points}} loyalty points sitting unused — and they're set to expire soon.\n\n{{offer}}\n\nDon't let what you've earned go to waste. Your points are worth ₹{{point_value}} in discounts. Come back for one purchase and keep your rewards alive.\n\nYour account will also be reactivated with full benefits.",
      timing: "Immediately — urgency-based",
      expectedOpenRate: "24–30%",
      tone: "urgent, practical",
      personalizationTip: "Show the exact rupee value of their points to make it tangible",
    },
    "Win Back": {
      subject: "{{name}}, this is our final offer — we hope to see you",
      body: "Hi {{name}},\n\nWe're sending you this message with genuine hope.\n\n{{offer}}\n\nThis is our most generous win-back offer, designed specifically for customers we care about but haven't seen in a long time.\n\nNo pressure. No commitment. Just a heartfelt invitation to come back when you're ready. We'll be here.",
      timing: "Monday, 10 AM IST",
      expectedOpenRate: "14–20%",
      tone: "sincere, low-pressure",
      personalizationTip: "Keep the email short — hibernating customers respond better to brevity",
    },
    Welcome: {
      subject: "{{name}}, welcome back — it's like you never left 🤝",
      body: "Hi {{name}},\n\nWe are so happy to see you back!\n\n{{offer}}\n\nTo celebrate your return, we've:\n• Reactivated your loyalty points\n• Added a welcome-back bonus of 500 points\n• Extended a special one-time discount just for you\n\nThings are better than ever here. Let's make a fresh start.",
      timing: "Immediately upon return purchase",
      expectedOpenRate: "46–55%",
      tone: "celebratory, forgiving",
      personalizationTip: "Acknowledge the gap without making the customer feel guilty",
    },
  },
};
