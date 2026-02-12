import { product } from "./config";

const FROM_EMAIL = `${product.influencer.name} <noreply@mail.founderarena.org>`;

export async function sendPurchaseEmail(params: {
  to: string;
  downloadUrl: string;
  productName: string;
  amountPaid: string;
}): Promise<{ id: string }> {
  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
      <h1 style="font-size: 24px; color: #1A1A1A;">Your purchase is ready!</h1>
      <p style="color: #555; font-size: 16px; line-height: 1.6;">
        Thank you for purchasing <strong>${params.productName}</strong>.
      </p>
      <div style="margin: 32px 0;">
        <a href="${params.downloadUrl}"
           style="display: inline-block; background: #1A1A1A; color: white; padding: 14px 32px;
                  border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: 500;">
          Download Now
        </a>
      </div>
      <p style="color: #888; font-size: 14px;">
        This link expires in 7 days. If it expires, visit the link and request a new one.
      </p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
      <p style="color: #999; font-size: 13px;">
        Amount paid: ${params.amountPaid}<br/>
        Product: ${params.productName}
      </p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: params.to,
      subject: `Your copy of "${params.productName}" is ready!`,
      html,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Resend error: ${error}`);
  }

  return res.json();
}
