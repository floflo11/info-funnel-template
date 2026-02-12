import { NextRequest, NextResponse } from "next/server";
import { db, purchases } from "@/lib/db";
import { eq } from "drizzle-orm";
import { createDownloadToken } from "@/lib/tokens";
import { sendPurchaseEmail } from "@/lib/email";
import { product } from "@/lib/config";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = formData.get("email") as string;

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const purchase = await db.query.purchases.findFirst({
    where: eq(purchases.email, email.toLowerCase().trim()),
    orderBy: (p, { desc }) => [desc(p.createdAt)],
  });

  if (!purchase) {
    return NextResponse.redirect(new URL("/success", req.url));
  }

  if (purchase.downloadCount > 3) {
    return NextResponse.redirect(new URL("/success", req.url));
  }

  const newToken = await createDownloadToken({
    purchaseId: purchase.id,
    email: purchase.email,
  });

  await db
    .update(purchases)
    .set({ downloadToken: newToken })
    .where(eq(purchases.id, purchase.id));

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  await sendPurchaseEmail({
    to: purchase.email,
    downloadUrl: `${baseUrl}/download/${newToken}`,
    productName: product.name,
    amountPaid: `$${(purchase.amountCents / 100).toFixed(2)}`,
  });

  return NextResponse.redirect(new URL("/success", req.url));
}
