import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
  integer,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull(),
    name: text("name"),
    funnelResponses: jsonb("funnel_responses").default({}),
    source: text("source"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("leads_email_idx").on(table.email)],
);

export const purchases = pgTable("purchases", {
  id: uuid("id").primaryKey().defaultRandom(),
  leadId: uuid("lead_id").references(() => leads.id),
  email: text("email").notNull(),
  amountCents: integer("amount_cents").notNull(),
  currency: text("currency").default("usd").notNull(),
  platformFeeCents: integer("platform_fee_cents").notNull(),
  stripeSessionId: text("stripe_session_id").unique().notNull(),
  stripePaymentIntent: text("stripe_payment_intent"),
  downloadToken: text("download_token"),
  downloadCount: integer("download_count").default(0).notNull(),
  status: text("status").default("pending").notNull(),
  fulfilledAt: timestamp("fulfilled_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
