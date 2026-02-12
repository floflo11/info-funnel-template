import { verifyDownloadToken } from "@/lib/tokens";
import { db, purchases } from "@/lib/db";
import { eq, sql } from "drizzle-orm";
import { product } from "@/lib/config";
import { getSignedDownloadUrl } from "@/lib/blob";

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const payload = await verifyDownloadToken(token);

  if (!payload) {
    return (
      <div className="min-h-dvh flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold mb-3">Link expired</h1>
          <p className="text-gray-500 mb-6">
            This download link has expired. Enter your email to get a new one.
          </p>
          <form
            action="/api/resend-download"
            method="POST"
            className="space-y-3"
          >
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-foreground text-surface font-medium"
            >
              Re-send download link
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Increment download count
  await db
    .update(purchases)
    .set({ downloadCount: sql`${purchases.downloadCount} + 1` })
    .where(eq(purchases.id, payload.purchaseId));

  // Get signed blob URL
  const downloadUrl = await getSignedDownloadUrl(product.pdfBlobKey);

  return (
    <div className="min-h-dvh flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold mb-3">Your download is ready</h1>
        <p className="text-gray-500 mb-6">{product.name}</p>
        <a
          href={downloadUrl}
          className="inline-block w-full py-4 rounded-full bg-primary text-white font-bold text-lg text-center"
        >
          Download PDF
        </a>
        <p className="text-xs text-gray-400 mt-4">
          This link will expire shortly. Click the button to start your
          download.
        </p>
      </div>
    </div>
  );
}
