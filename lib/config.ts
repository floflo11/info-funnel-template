export const product = {
  name: "The Ultimate Guide to Building Your Brand",
  description:
    "A step-by-step ebook for turning your expertise into a profitable online business.",
  priceInCents: 4900,
  currency: "usd" as const,
  influencer: {
    name: "Alex Johnson",
  },
  // Set by the Evolve agent after calling POST /api/worker/payment-links
  paymentLinkUrl: process.env.NEXT_PUBLIC_PAYMENT_LINK_URL || "",
};

export const platform = {
  // Freedom platform URL — leads POST here cross-origin
  // Uses NEXT_PUBLIC_APP_URL (same key the Freedom app itself uses)
  url: process.env.NEXT_PUBLIC_APP_URL || "https://getfreedom.app",
  // Founder UUID — set per-deployment by the Evolve agent
  founderId: process.env.NEXT_PUBLIC_FOUNDER_ID || "",
};

export const theme = {
  primary: "#B87333",
  accent: "#F5A623",
  background: "#FAFAFA",
  text: "#1A1A1A",
};
