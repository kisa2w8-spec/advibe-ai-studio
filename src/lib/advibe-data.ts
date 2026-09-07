export type Tone = "Viral" | "Urgency" | "Storytelling" | "Professional";
export type Platform = "TikTok" | "Meta / Instagram" | "Google Search" | "YouTube Shorts";

export type GeneratedAd = {
  id: string;
  platform: Platform;
  tone: Tone;
  hook: string;
  body: string;
  cta: string;
  ctr: number;
};

const hooks: Record<Tone, string[]> = {
  Viral: [
    "POV: you found the {product} everyone keeps hiding",
    "I was today years old when I discovered {product}",
    "This {product} broke our checkout page. Twice.",
  ],
  Urgency: [
    "Last 48 hours: {product} at launch pricing",
    "Stock is moving fast — {product} is nearly gone",
    "Prices go up Friday. {product} doesn't wait.",
  ],
  Storytelling: [
    "Three months ago we almost shut down. Then {product} happened.",
    "She tried everything before {product}. Here's what changed.",
    "It started with one frustrated customer — now {product} exists.",
  ],
  Professional: [
    "{product}: measurable results for teams that track everything",
    "Why leading teams standardise on {product}",
    "A cleaner, faster way to handle it — meet {product}",
  ],
};

const bodies = [
  "Built for {audience} who are tired of guessing. {description} Every detail engineered to remove friction and get results in days, not quarters.",
  "{description} Loved by {audience} for one reason: it just works — on day one, without a 40-page onboarding doc.",
  "We asked 400 {audience} what was broken. {description} This is the answer, shipped.",
];

const ctas = [
  "Claim your spot →",
  "Try it free today",
  "Get started in 60 seconds",
  "See it in action",
];

const fill = (t: string, product: string, audience: string, description: string) =>
  t
    .replaceAll("{product}", product || "your product")
    .replaceAll("{audience}", audience || "modern buyers")
    .replaceAll("{description}", description || "Designed to do more with less.");

export function generateAds(input: {
  product: string;
  description: string;
  audience: string;
  tone: Tone;
  platform: Platform;
  count?: number;
}): GeneratedAd[] {
  const count = input.count ?? 3;
  return Array.from({ length: count }, (_, i) => ({
    id: `${Date.now()}-${i}`,
    platform: input.platform,
    tone: input.tone,
    hook: fill(hooks[input.tone][i % 3]!, input.product, input.audience, input.description),
    body: fill(bodies[i % bodies.length]!, input.product, input.audience, input.description),
    cta: ctas[(i + 1) % ctas.length]!,
    ctr: Math.round((2.6 + Math.random() * 4.2) * 10) / 10,
  }));
}

export const savedLibrary: GeneratedAd[] = generateAds({
  product: "Lumen Sleep Mask",
  description: "A weighted, cooling sleep mask that blocks 100% of light.",
  audience: "burnt-out founders",
  tone: "Viral",
  platform: "TikTok",
});

export const performanceData = [
  { day: "Mon", ctr: 3.1, roas: 2.4 },
  { day: "Tue", ctr: 3.6, roas: 2.9 },
  { day: "Wed", ctr: 4.2, roas: 3.4 },
  { day: "Thu", ctr: 3.9, roas: 3.1 },
  { day: "Fri", ctr: 5.1, roas: 4.2 },
  { day: "Sat", ctr: 5.8, roas: 4.6 },
  { day: "Sun", ctr: 5.3, roas: 4.1 },
];

export const channelData = [
  { channel: "TikTok", generated: 412 },
  { channel: "Meta", generated: 318 },
  { channel: "Google", generated: 204 },
  { channel: "Shorts", generated: 156 },
];
