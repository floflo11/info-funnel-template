import { NextRequest, NextResponse } from "next/server";
import { constructWebhookEvent } from "@/lib/stripe";
import { db, purchases } from "@/lib/db";
import { createDownloadToken } from "@/lib/tokens";
import { sendPurchaseEmail } from "@/lib/email";
import { product } from "@/lib/config";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = constructWebhookEvent(body, signature);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email = session.customer_email || "";
    const leadId = session.metadata?.leadId;
    const amountTotal = session.amount_total || 0;

    const feeAmount =
      Math.round(amountTotal * (product.platformFeePercent / 100)) +
      product.platformFeeFixed;

    const purchaseId = crypto.randomUUID();
    const downloadToken = await createDownloadToken({
      purchaseId,
      email,
    });

    await db.insert(purchases).values({
      id: purchaseId,
      leadId: leadId && leadId !== "anonymous" ? leadId : null,
      email,
      amountCents: amountTotal,
      platformFeeCents: feeAmount,
      stripeSessionId: session.id,
      stripePaymentIntent:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : null,
      downloadToken,
      status: "fulfilled",
      fulfilledAt: new Date(),
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    const downloadUrl = `${baseUrl}/download/${downloadToken}`;

    try {
      await sendPurchaseEmail({
        to: email,
        downloadUrl,
        productName: product.name,
        amountPaid: `$${(amountTotal / 100).toFixed(2)}`,
      });
    } catch (err) {
      console.error("Failed to send purchase email:", err);
    }
  }

  return NextResponse.json({ received: true });
}
