# Info Funnel Template — Agent Guide

This is a golden reference template for building info product funnels.
Clone this repo, customize it, and deploy to a subdomain.

## What to Customize

### Always change:

1. **`lib/config.ts`** — product name, price, description, influencer name, colors, connected account ID
2. **`app/(funnel)/*/page.tsx`** — rewrite all copy, questions, options, stats, testimonials
3. **`public/`** — replace all placeholder images with influencer's branding
4. **`app/globals.css`** — adjust `@theme` CSS variables if theme changes need it

### Optionally change:

5. **`components/`** — modify or completely replace any component
6. **`lib/funnel-steps.ts`** — add, remove, or reorder funnel steps

### Do NOT touch (unless you know what you're doing):

7. **`app/api/webhooks/`** — Stripe and Resend webhook handlers
8. **`lib/stripe.ts`** — Stripe Connect payment plumbing
9. **`lib/tokens.ts`** — JWT download token signing/verification
10. **`lib/db/schema.ts`** — unless adding new tables

## How to Add/Remove Funnel Steps

1. Create or delete a page in `app/(funnel)/your-step/page.tsx`
2. Edit the `funnelSteps` array in `lib/funnel-steps.ts`
3. The progress bar and navigation automatically update

## How to Change the Product Price

Edit `priceInCents` in `lib/config.ts`. The Stripe product/price is created lazily
on first checkout. If changing price after first use, delete the cached Stripe product
in the dashboard or change the product search metadata.

## Deployment

1. Set all env vars from `.env.example`
2. Run migration: `psql $POSTGRES_URL -f drizzle/0001_initial.sql`
3. Upload the PDF: use Vercel Blob dashboard or `@vercel/blob` put() API
4. Deploy to Vercel with subdomain
5. Set up Stripe webhook pointing to `https://subdomain/api/webhooks/stripe`
6. Stripe webhook events to listen for: `checkout.session.completed`

## Env Vars

See `.env.example` for the complete list with descriptions.

## Step Components Reference

| Component | File | Use for |
|-----------|------|---------|
| `StepChoice` | `components/step-choice.tsx` | Single or multi-select question |
| `StepSocialProof` | `components/step-social-proof.tsx` | Big stat with dark card |
| `StepTestimonials` | `components/step-testimonials.tsx` | Before/after carousel |
| `StepInput` | `components/step-input.tsx` | Form fields (text, email, select) |
| `ContinueButton` | `components/continue-button.tsx` | Sticky bottom CTA |

## Funnel Flow

```
/ (splash, 3s auto-advance)
→ /goal (single choice)
→ /insight (social proof stat)
→ /approach (single choice)
→ /promise (results claim)
→ /qualify (form: experience level)
→ /about-you (form: name + email — LEAD CAPTURE)
→ /motivation (multi choice)
→ /proof (testimonial carousel)
→ /checkout (pricing + Stripe button)
→ Stripe Checkout → /success → email with /download/[token]
```
