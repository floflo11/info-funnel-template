# Info Funnel Template

A high-converting 10-step web funnel for selling info products (ebooks, PDFs, courses).

Built with Next.js 15, Tailwind CSS v4, Framer Motion, Stripe Connect, Resend, and Neon PostgreSQL.

## Features

- **10-step animated funnel** — modeled after proven high-converting patterns (Hims-style)
- **Email capture** — leads saved before paywall (step 7 of 10)
- **Stripe Connect payments** — platform fee + transfer to influencer's connected account
- **Email delivery** — purchase confirmation with download link via Resend
- **Gated downloads** — signed JWT tokens, expiring URLs, re-send support
- **Agent-friendly** — designed for Evolve coding agent to customize per influencer

## Quick Start

```bash
pnpm install
cp .env.example .env.local
# Fill in all env vars
psql $POSTGRES_URL -f drizzle/0001_initial.sql
pnpm dev
```

## Customization

See [AGENT.md](./AGENT.md) for the full customization guide.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4 + Framer Motion
- **Font:** Geist Sans
- **Payments:** Stripe Connect
- **Email:** Resend
- **Database:** Neon PostgreSQL + Drizzle ORM
- **Storage:** Vercel Blob
- **Auth:** None (JWT download tokens only)
