import { getDownloadUrl } from "@vercel/blob";

export async function getSignedDownloadUrl(blobKey: string): Promise<string> {
  return getDownloadUrl(blobKey);
}
