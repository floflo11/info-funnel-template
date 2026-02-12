import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function createDownloadToken(params: {
  purchaseId: string;
  email: string;
}): Promise<string> {
  return new SignJWT({
    purchaseId: params.purchaseId,
    email: params.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyDownloadToken(
  token: string,
): Promise<{ purchaseId: string; email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return {
      purchaseId: payload.purchaseId as string,
      email: payload.email as string,
    };
  } catch {
    return null;
  }
}
