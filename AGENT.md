# Info Funnel Template — Agent Guide

This is a golden reference template for building info product funnels.
Clone this repo, customize it, and deploy to Cloudflare Pages.

## Architecture

This template is a **pure static site** — no server runtime, no database connection, no Stripe keys, no email API, no file storage needed. ALL backend logic (payments, lead capture, digital delivery) is handled centrally by the Freedom platform.

```
Funnel Template (this repo)              Freedom Platform (centralized)
┌──────────────────────────────┐         ┌──────────────────────────────────┐
│ Static HTML/JS/CSS           │         │ POST /api/worker/leads           │
│ (output: 'export')           │──lead──→│   → captures lead in Postgres   │
│                              │         │                                  │
│ Lead capture form            │         │ POST /api/worker/payment-links   │
│   POSTs to Freedom API       │         │   → creates Stripe payment link  │
│   (cross-origin)             │         │   → tracks founder ownership     │
│                              │         │                                  │
│ Checkout page                │         │ POST /api/worker/products/       │
│   (links to Stripe URL)      │         │   :id/upload                     │
│                              │         │   → stores PDF in Blob           │
│ Success page                 │         │                                  │
│   calls Freedom API for      │         │ GET /api/products/               │
│   instant download           │────dl──→│   session-download               │
│                              │         │   → instant download via Stripe  │
│ Deployed to Cloudflare Pages │         │     session (no webhook needed)  │
│ at {project-name}.pages.dev  │         │                                  │
└──────────────────────────────┘         │ Stripe webhook                   │
                                         │   → credits founder wallet       │
                                         │   → sends delivery email backup  │
                                         └──────────────────────────────────┘
```

## Setup Flow (what the Evolve agent does)

**Order matters.** The payment link needs the project name (for `successUrl`) and the file must be uploaded before any customer can pay.

### Step 1: Decide the project name

Pick a project name based on the product/business name. Example: `python-mastery`
The final URL will be `https://python-mastery.pages.dev`

### Step 2: Create product + payment link

Use the publisher's actual product name — this appears on the Stripe checkout page.

```
POST https://getfreedom.app/api/worker/payment-links
Headers: x-worker-secret: $WORKER_SECRET
Body: {
  "founderId": "...",
  "productName": "Python Mastery Course",     ← publisher's real product name
  "priceCents": 4900,                         ← agent decides pricing with publisher
  "description": "...",
  "deliveryType": "download",
  "deliveryEmailSubject": "Your purchase: Python Mastery Course",
  "deliveryEmailBody": "Thank you! Click below to download your course.",
  "successUrl": "https://python-mastery.pages.dev/success",  ← REQUIRED
  "maxDownloadsPerPurchase": 10,
  "downloadExpiryDays": 30
}
Response: { "paymentUrl": "https://buy.stripe.com/...", "productId": "prod_..." }
```

**`successUrl` is critical.** Without it, customers see a generic Stripe "Thanks for your payment" page instead of your branded `/success` page that tells them to check their email.

### Step 3: Upload the digital file (REQUIRED)

```
POST https://getfreedom.app/api/worker/products/{productId}/upload
Headers: x-worker-secret: $WORKER_SECRET
Body: multipart form data with "file" and "founderId"
```

**If you skip this step, customers will pay but never receive the download email.** The webhook only sends the delivery email when the product has a file attached (`blobKey` is set).

### Step 4: Set environment variables

- `NEXT_PUBLIC_PAYMENT_LINK_URL` — the `paymentUrl` from step 2
- `NEXT_PUBLIC_APP_URL` — `https://getfreedom.app` (Freedom platform URL)
- `NEXT_PUBLIC_FOUNDER_ID` — UUID of the founder who owns this funnel

These are baked into the static JS at build time. CF Pages needs no runtime env vars.

### Step 5: Customize, build, and deploy

- Edit `lib/config.ts` with product name, price, influencer name
- Edit funnel copy in `app/(funnel)/*/page.tsx`
- Build: `npm run build` (uses `output: 'export'`)
- Deploy: `npx wrangler pages deploy out --project-name={project-name} --branch=main --commit-dirty=true`
- Site live at `https://{project-name}.pages.dev` immediately

### Post-payment flow (automatic, no agent action needed)

```
Customer pays → Stripe redirects to /success?session_id=cs_xxx
  → Success page calls Freedom API for instant download URL
  → Shows "Download Now" button (customer gets file immediately)
  → Falls back to "check your email" if API unavailable
  → Webhook fires (5-30s later): credits wallet, sends email backup
```

Both delivery channels work in parallel — instant download for immediate gratification, email for a persistent backup link. The platform auto-appends `?session_id={CHECKOUT_SESSION_ID}` to the success URL.

## What to Customize

### Always change:

1. **`lib/config.ts`** — product name, price, description, influencer name, colors, payment link URL
2. **`app/(funnel)/*/page.tsx`** — rewrite all copy, questions, options, stats, testimonials
3. **`public/`** — replace all placeholder images with influencer's branding
4. **`app/globals.css`** — adjust `@theme` CSS variables if theme changes need it

### Optionally change:

5. **`components/`** — modify or completely replace any component
6. **`lib/funnel-steps.ts`** — add, remove, or reorder funnel steps

### Do NOT touch:

7. **Lead capture POST logic** — leads are sent cross-origin to Freedom API (`POST /api/worker/leads`); do not change the endpoint or auth pattern
8. **`next.config`** — `output: 'export'` must remain for Cloudflare Pages static deployment

## How to Add/Remove Funnel Steps

1. Create or delete a page in `app/(funnel)/your-step/page.tsx`
2. Edit the `funnelSteps` array in `lib/funnel-steps.ts`
3. The progress bar and navigation automatically update

## How to Change the Product Price

Edit `priceInCents` in `lib/config.ts`. This is display-only — the actual price
is set when creating the payment link via Freedom API.

## Env Vars

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_PAYMENT_LINK_URL` | Yes | Stripe payment link URL (from Freedom API) |
| `NEXT_PUBLIC_APP_URL` | Yes | Freedom platform URL (same key Freedom uses: `https://getfreedom.app`) |
| `NEXT_PUBLIC_FOUNDER_ID` | Yes | UUID of the founder who owns this funnel |
| `NEXT_PUBLIC_BASE_URL` | Yes | Deployed URL, e.g. `https://{project-name}.pages.dev` |

**Not needed** (handled by Freedom platform):
- ~~POSTGRES_URL~~ (lead capture POSTs to Freedom API, no local DB)
- ~~STRIPE_SECRET_KEY~~
- ~~STRIPE_WEBHOOK_SECRET~~
- ~~RESEND_API_KEY~~
- ~~BLOB_READ_WRITE_TOKEN~~
- ~~JWT_SECRET~~

## Lead Capture

The template captures leads by POSTing cross-origin to the Freedom platform:

```
POST https://getfreedom.app/api/worker/leads
Headers: x-worker-secret: $WORKER_SECRET  (or public with founderId in body)
Body: { "founderId": "...", "email": "...", "name": "...", ... }
```

No database connection is needed in the template itself. The template is pure static HTML/JS after build.

## Step Components Reference

| Component | File | Use for |
|-----------|------|---------|
| `StepChoice` | `components/step-choice.tsx` | Single or multi-select question |
| `StepValue` | `components/step-value.tsx` | Centered heading + body (value reinforcement screens) |
| `StepSocialProof` | `components/step-social-proof.tsx` | Big stat with dark gradient card |
| `StepTestimonials` | `components/step-testimonials.tsx` | Before/after carousel |
| `StepInput` | `components/step-input.tsx` | Form fields (text, email, select) |
| `ContinueButton` | `components/continue-button.tsx` | Sticky bottom CTA |

## Funnel Flow (16 steps)

```
Part 1 — Diagnostic Survey:
  / (splash, 3s auto-advance)
  → /hook ("How long have you been trying to [X]?" — single choice)
  → /frustration ("Which of these is most frustrating?" — single choice)
  → /experience ("What have you tried before?" — single choice)
  → /goal ("What's your biggest challenge?" — single choice)

Part 2 — Value Reinforcement:
  → /insight (The Pivot — why old methods fail)
  → /approach (The Architecture — how the system works)
  → /promise (The Burden Transfer — what's removed)
  → /role (The User's Role — what you do)
  → /shift (The Structural Shift — new daily reality)
  → /results (The Compounding Effect — long-term benefit)

Part 3 — Qualification + Lead Capture:
  → /qualify ("Where are you in your journey?" — single choice)
  → /about-you (name + email — LEAD CAPTURE, POSTs to Freedom API cross-origin)
  → /motivation ("What would achieving this mean?" — multi choice)
  → /proof (testimonial carousel)

Part 4 — Checkout:
  → /checkout (pricing + Stripe payment link)
  → Stripe Checkout (hosted by Stripe) → /success (instant download + email backup)
```
