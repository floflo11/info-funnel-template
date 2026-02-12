export const product = {
  name: "The Ultimate Guide to Building Your Brand",
  description:
    "A step-by-step ebook for turning your expertise into a profitable online business.",
  priceInCents: 4900,
  currency: "usd" as const,
  influencer: {
    name: "Alex Johnson",
    connectedAccountId: process.env.STRIPE_CONNECTED_ACCOUNT_ID!,
  },
  pdfBlobKey: "products/ebook.pdf",
  platformFeePercent: 5,
  platformFeeFixed: 30,
};

export const theme = {
  primary: "#B87333",
  accent: "#F5A623",
  background: "#FAFAFA",
  text: "#1A1A1A",
};
