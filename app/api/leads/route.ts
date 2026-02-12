import { NextRequest, NextResponse } from "next/server";
import { db, leads } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { email, name, funnelResponses, source } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const existing = await db.query.leads.findFirst({
    where: eq(leads.email, email.toLowerCase().trim()),
  });

  if (existing) {
    await db
      .update(leads)
      .set({
        name: name || existing.name,
        funnelResponses: {
          ...(existing.funnelResponses as object),
          ...funnelResponses,
        },
        updatedAt: new Date(),
      })
      .where(eq(leads.id, existing.id));

    return NextResponse.json({ id: existing.id });
  }

  const [lead] = await db
    .insert(leads)
    .values({
      email: email.toLowerCase().trim(),
      name,
      funnelResponses,
      source,
    })
    .returning({ id: leads.id });

  return NextResponse.json({ id: lead.id });
}
