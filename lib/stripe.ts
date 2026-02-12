import Stripe from "stripe";
import { product } from "./config";

let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return _stripe;
}

let cachedPriceId: string | null = null;

async function getOrCreatePrice(): Promise<string> {
  if (cachedPriceId) return cachedPriceId;

  const existing = await getStripe().products.search({
    query: `metadata["template"]:"info-funnel"`,
  });

  let productId: string;
  if (existing.data.length > 0) {
    productId = existing.data[0].id;
    const prices = await getStripe().prices.list({
      product: productId,
      active: true,
      limit: 1,
    });
    if (prices.data.length > 0) {
      cachedPriceId = prices.data[0].id;
      return cachedPriceId;
    }
  } else {
    const stripeProduct = await getStripe().products.create({
      name: product.name,
      description: product.description,
      metadata: { template: "info-funnel" },
    });
    productId = stripeProduct.id;
  }

  const price = await getStripe().prices.create({
    product: productId,
    unit_amount: product.priceInCents,
    currency: product.currency,
  });

  cachedPriceId = price.id;
  return cachedPriceId;
}

export async function createCheckoutSession(params: {
  leadId: string;
  email: string;
  baseUrl: string;
}): Promise<string> {
  const priceId = await getOrCreatePrice();

  const feeAmount =
    Math.round(
      product.priceInCents * (product.platformFeePercent / 100),
    ) + product.platformFeeFixed;

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: params.email,
    payment_intent_data: {
      application_fee_amount: feeAmount,
      transfer_data: {
        destination: product.influencer.connectedAccountId,
      },
    },
    metadata: {
      leadId: params.leadId,
      influencerId: product.influencer.connectedAccountId,
    },
    success_url: `${params.baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${params.baseUrl}/checkout`,
  });

  return session.url!;
}

export function constructWebhookEvent(
  body: string,
  signature: string,
): Stripe.Event {
  return getStripe().webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!,
  );
}

export { getStripe as stripe };
