import { getDownloadUrl } from "@vercel/blob";

export async function getSignedDownloadUrl(blobKey: string): Promise<string> {
  const { url } = await getDownloadUrl(blobKey);
  return url;
}
