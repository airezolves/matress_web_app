# 14 — Cloudflare Live Operations Guide

This document explains how the **Mr & Mrs Furnishings / Restolex Showroom Catalogue**
runs in production on Cloudflare, and how to operate it day-to-day: updating
products, running migrations, managing secrets, CI/CD, custom domains, and cost.

---

## 1. Architecture at a glance

```mermaid
flowchart LR
  U[Visitor] -->|HTTPS| W[Cloudflare Worker\nrestolex-showroom-catalogue]
  W -->|static assets| A[ASSETS binding\n.open-next/assets]
  W -->|SQL| D[(D1 database\nrestolex-catalogue-db)]
  subgraph Worker (Next.js via OpenNext)
    P[Server pages\nforce-dynamic] --> DB1[src/lib/db/*]
    R[API routes] --> DB1
  end
  DB1 --> D
```

- **Runtime:** Next.js 15 (App Router) compiled to a single Cloudflare Worker by
  `@opennextjs/cloudflare` (OpenNext). Deployed with `wrangler`.
- **Database:** Cloudflare **D1** (SQLite) named `restolex-catalogue-db`, bound to
  the Worker as `env.DB`. **D1 is the single source of truth** for products,
  categories, and inquiries.
- **Static assets** (`/images/*`, `/_next/static/*`) are served from the `ASSETS`
  binding, cached per `public/_headers`.
- **Rendering:** pages that read D1 are `export const dynamic = "force-dynamic"`
  so newly added/deleted products appear immediately (D1 is not available during
  `next build`, so nothing is prerendered from it).

### Key files

| Concern | File |
| --- | --- |
| Worker/D1 config | `wrangler.jsonc` |
| OpenNext config | `open-next.config.ts` |
| Bindings type declaration | `cloudflare-env.d.ts` (generated) |
| DB access layer | `src/lib/db/{client,mappers,products,categories,inquiries}.ts` |
| Product helpers (pure) | `src/services/product-service.ts` |
| Public product API | `src/app/api/products/route.ts` |
| Inquiry API | `src/app/api/inquiry/route.ts` |
| Admin APIs | `src/app/api/admin/products/route.ts`, `.../products/[id]/route.ts`, `.../inquiries/route.ts` |
| Admin auth | `src/lib/admin-auth.ts` |
| Migrations | `migrations/0001_init.sql`, `migrations/0002_seed.sql` |
| Seed generator | `scripts/generate-seed.mjs` |
| CI/CD | `.github/workflows/deploy.yml` |

---

## 2. Database schema

Three tables (see `migrations/0001_init.sql`):

- **`products`** — queryable scalar columns (`id`, `slug`, `name`, `brand`,
  `category`, `subcategory`, `thickness`, `warranty`, …) plus JSON text columns
  for arrays/objects (`images`, `features`, `specifications`, `sizes`, `tags`,
  `faqs`, `feature_tiles`, `commercial`, `testimonials`). Also `sort_order`,
  `is_active`, `created_at`, `updated_at`.
- **`categories`** — `id`, `name`, `slug`, `description`, `image`,
  `product_count`, `sort_order`.
- **`inquiries`** — customer fields, `product_ids`/`product_names` (JSON),
  `status` (defaults `new`), `created_at`.

---

## 3. Environments & bindings

| Binding | What | Local (`.dev.vars` / `--local` D1) | Remote (Cloudflare) |
| --- | --- | --- | --- |
| `DB` | D1 database | `.wrangler/state` SQLite | `restolex-catalogue-db` |
| `ASSETS` | static files | from `.open-next/assets` | same |
| `NEXT_PUBLIC_SITE_ENV` | var | `production` | `production` |
| `ADMIN_API_KEY` | secret | `local-dev-admin-key` (in `.dev.vars`) | set via `wrangler secret put` |

`.dev.vars` is **gitignored** — never commit real secrets.

---

## 4. Everyday commands

```bash
# Local dev with hot reload (Next dev + D1 via OpenNext dev hook)
npm run dev

# Full production-parity local run (workerd + local D1)
npm run preview            # builds with OpenNext, serves on http://localhost:8787

# Regenerate the seed SQL from src/data (only when editing seed JSON)
npm run db:generate-seed

# Apply migrations
npm run db:migrate:local   # local D1
npm run db:migrate:remote  # remote D1

# Deploy to Cloudflare
npm run deploy

# Regenerate cloudflare-env.d.ts after changing bindings in wrangler.jsonc
npm run cf-typegen
```

---

## 5. Managing products (add / update / delete)

There are three supported ways. **The admin API is the recommended runtime path.**

### 5a. Admin API (no redeploy needed)

All admin routes require `Authorization: Bearer <ADMIN_API_KEY>`.

**Add or replace a product** (`INSERT OR REPLACE` — same `id` updates it):

```bash
curl -X POST https://<your-worker-url>/api/admin/products \
  -H "Authorization: Bearer $ADMIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "prd-new-item",
    "slug": "new-item-mattress",
    "name": "New Item Mattress",
    "brand": "Restolex",
    "category": "Mattress",
    "subcategory": "Foam Mattress",
    "description": "Full description...",
    "shortDescription": "Short blurb",
    "thickness": "6 inch",
    "warranty": "7 years",
    "material": "Memory Foam",
    "comfort": "Medium",
    "firmness": "Medium",
    "images": ["/images/products/new-item-1.png"],
    "sizes": ["Single", "Queen"],
    "features": ["Feature A", "Feature B"],
    "specifications": [{ "label": "Density", "value": "40 kg/m³" }],
    "tags": ["foam"],
    "faqs": [],
    "testimonials": []
  }'
```

Required fields: `id`, `slug`, `name`, `brand`, `category`, `subcategory`,
`description`, `thickness`, `warranty`. Array/object fields default to empty.

**Delete a product:**

```bash
curl -X DELETE https://<your-worker-url>/api/admin/products/prd-new-item \
  -H "Authorization: Bearer $ADMIN_API_KEY"
```

Because pages are `force-dynamic`, changes are visible on the next request.

> Product images referenced by an admin-added product must exist under
> `public/images/...` and be deployed (they ship with the Worker's ASSETS). To
> add brand-new images, drop them in `public/images/` and redeploy.

### 5b. Direct SQL (occasional/bulk)

```bash
# Remote
npx wrangler d1 execute DB --remote \
  --command "UPDATE products SET warranty='10 years' WHERE id='prd-spring-signature';"

# From a file
npx wrangler d1 execute DB --remote --file ./patch.sql
```

### 5c. Re-seed from JSON (rebuild catalogue)

Edit the source JSON in `src/data/products/*.json` and `src/data/categories.json`,
then:

```bash
npm run db:generate-seed        # writes migrations/0002_seed.sql
```

`0002_seed.sql` uses `INSERT OR REPLACE`, so re-applying it refreshes seeded rows
without dropping admin-added ones. For a *new* seed revision, prefer creating a
new numbered migration (e.g. `0003_seed_v2.sql`) so migration history stays
append-only.

---

## 6. Inquiries

- Customers submit via the site; `POST /api/inquiry` validates with Zod, resolves
  product names from D1, and persists a row in `inquiries`.
- View recent inquiries:

```bash
curl https://<your-worker-url>/api/admin/inquiries \
  -H "Authorization: Bearer $ADMIN_API_KEY"
```

Or with SQL:

```bash
npx wrangler d1 execute DB --remote \
  --command "SELECT id,name,phone,city,product_names,created_at FROM inquiries ORDER BY created_at DESC LIMIT 20;"
```

---

## 7. Secrets

The admin key is a **Worker secret** (not in `wrangler.jsonc`). Set/rotate it:

```bash
npx wrangler secret put ADMIN_API_KEY
# paste a strong random value when prompted
```

Locally it comes from `.dev.vars` (`ADMIN_API_KEY=local-dev-admin-key`).

---

## 8. Migrations workflow

Migrations live in `migrations/` and are tracked by wrangler in a
`d1_migrations` table.

```bash
# Create a new migration
npx wrangler d1 migrations create DB add_something

# Apply
npm run db:migrate:local
npm run db:migrate:remote
```

Rules of thumb: migrations are **append-only and forward-only**; never edit an
already-applied file — add a new one instead.

---

## 9. Deploying

### Manual (from your machine)

```bash
npx wrangler login        # once
npm run db:migrate:remote # if there are new migrations
npm run deploy
```

### First-time account setup (one-time, required for the live URL)

If deploy prints *"You need to register a workers.dev subdomain"*, open the
Cloudflare dashboard → **Workers & Pages** → and register a `*.workers.dev`
subdomain for the account. After that, the Worker is reachable at
`https://restolex-showroom-catalogue.<subdomain>.workers.dev`.

---

## 10. CI/CD — auto-deploy on push to `main`

Workflow: `.github/workflows/deploy.yml`. On every push to `main` it runs
`npm ci`, generates types, applies remote D1 migrations, then builds and deploys.

**One-time GitHub setup** (repo → Settings → Secrets and variables → Actions):

1. `CLOUDFLARE_ACCOUNT_ID` = `8cb2a847eebdd3fe5e6d13b2bd6714bb`
2. `CLOUDFLARE_API_TOKEN` = a token created at
   dash.cloudflare.com/profile/api-tokens using the **"Edit Cloudflare Workers"**
   template, **plus D1 edit** permission (Account → D1 → Edit).

The admin secret (`ADMIN_API_KEY`) is **not** managed by CI — set it once with
`wrangler secret put`. It persists across deploys.

Push to `main` → GitHub Actions deploys automatically.

---

## 11. Custom domain (later)

1. Add your domain as a zone in Cloudflare (update nameservers), or use a
   subdomain of an existing zone.
2. In the dashboard: **Workers & Pages → restolex-showroom-catalogue → Settings →
   Domains & Routes → Add Custom Domain** (e.g. `catalogue.yourbrand.com`).
   Cloudflare provisions the TLS certificate automatically.
3. No code change needed; the Worker serves the new hostname.

---

## 12. Monitoring & debugging

- **Live logs:** `npx wrangler tail` (Worker observability is enabled in
  `wrangler.jsonc`).
- **Dashboard:** Workers & Pages → the Worker → Metrics / Logs.
- **D1 console:** dashboard → Storage & Databases → D1 → `restolex-catalogue-db`
  (browse tables, run SQL).

---

## 13. Cost — staying at $0

This app fits comfortably in Cloudflare's free tier:

- **Workers:** 100,000 requests/day free.
- **D1:** 5 GB storage, 5M rows read/day, 100k rows written/day free.
- **Assets:** served free with the Worker.

A dealer showroom catalogue is far below these limits. No paid add-ons are used.
Custom domains on Cloudflare are free; you only pay a registrar for the domain
name itself if you buy a new one.

---

## 14. Quick reference

| I want to… | Do this |
| --- | --- |
| Add/update a product | `POST /api/admin/products` (Bearer key) |
| Delete a product | `DELETE /api/admin/products/{id}` |
| See inquiries | `GET /api/admin/inquiries` (Bearer key) |
| Change schema | new file in `migrations/`, then `db:migrate:remote` |
| Rebuild catalogue from JSON | edit `src/data/**`, `npm run db:generate-seed`, add migration |
| Rotate admin key | `wrangler secret put ADMIN_API_KEY` |
| Deploy manually | `npm run deploy` |
| Auto-deploy | push to `main` |
| Run prod-parity locally | `npm run preview` |
