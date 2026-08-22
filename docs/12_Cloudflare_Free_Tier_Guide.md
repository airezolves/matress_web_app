# 12 — Cloudflare Free Tier Guide (End‑to‑End)

> A complete, practical reference for what Cloudflare gives you **for free**, which
> products are relevant to this Next.js catalogue app, and how each one maps to a
> real need. Written for the `restolex-showroom-catalogue` (Mr & Mrs Furnishings)
> project. Last researched: **August 2026**.

---

## 1. TL;DR — Can this app run on Cloudflare for free?

**Yes.** This project is an almost-perfect fit for the Cloudflare free tier:

- It is a **Next.js 15 App Router** app (React 19).
- Product data is **static JSON** bundled at build time — no database needed today.
- There is exactly **one dynamic API route** (`POST /api/inquiry`) that only validates
  input and returns a message. The WhatsApp service is a **placeholder** (no external calls yet).
- No authentication, no persistent storage, no server-side secrets required today.

That means it deploys as a **Cloudflare Worker** (via the OpenNext adapter), and virtually
every request is served either as a **static asset** (free & unlimited) or as a tiny
Worker invocation that stays comfortably inside the free limits.

---

## 2. The two ways to deploy Next.js on Cloudflare

| Approach | Product | Status (2026) | Recommendation |
| --- | --- | --- | --- |
| **OpenNext adapter** (`@opennextjs/cloudflare`) | Cloudflare **Workers** | ✅ Current, actively maintained, supports full App Router, SSR, ISR, Route Handlers, RSC, Server Actions, image optimization | **Use this** |
| `@cloudflare/next-on-pages` | Cloudflare **Pages** | ⚠️ Legacy, edge-runtime only, being superseded by Workers | Avoid for new projects |

**Decision for this repo:** Use **Cloudflare Workers + OpenNext adapter**. It supports every
Next.js feature this app uses (App Router, dynamic routes, `next/image`, route handlers)
and is the officially recommended path in the Cloudflare framework guide.

> Note: Cloudflare Pages still exists and its "Functions" are billed as Workers, but the
> modern, supported route for Next.js is Workers via OpenNext.

---

## 3. Free tier — the products that matter to this app

### 3.1 Workers (compute) — **the core of the deployment**

| Metric | Free plan |
| --- | --- |
| Requests to your Worker code | **100,000 / day** |
| Static asset requests | **Free & unlimited** (do not count against the 100k) |
| CPU time per invocation | **10 ms** |
| Duration (wall-clock) | No charge |

**What this means here:** Most page views (HTML, CSS, JS, images, JSON) are served as
**static assets** = free and unlimited. Only `POST /api/inquiry` and any truly dynamic
server render count toward the 100k/day Worker request budget. For a showroom catalogue,
you will not get close to 100k dynamic requests/day.

### 3.2 Workers Static Assets — **free & unlimited**

The OpenNext build outputs a `.open-next/assets` directory (HTML, `_next/static`, images).
Cloudflare serves these directly from its CDN edge. These requests are **free and unlimited**
and never touch your Worker's CPU budget. This is why a mostly-static site like this one is
so cheap.

### 3.3 Workers KV — key/value store (optional)

| Metric | Free plan |
| --- | --- |
| Reads | 100,000 / day |
| Writes | 1,000 / day |
| Deletes | 1,000 / day |
| List | 1,000 / day |
| Storage | 1 GB |

**Use for this app (future):** caching, feature flags, storing lightweight config, or a
simple "inquiries received today" counter. Eventually-consistent, great for read-heavy data.

### 3.4 D1 — serverless SQLite database (optional)

| Metric | Free plan |
| --- | --- |
| Rows read | 5 million / day |
| Rows written | 100,000 / day |
| Storage | 5 GB total |

**Use for this app (future):** the natural home for **inquiry submissions** if you want to
persist them (name, phone, selected products, timestamp). SQL, relational, queryable from
the dashboard. Cloudflare confirms D1 will always have a free plan. This is the recommended
DB for turning the current placeholder inquiry flow into a real, stored lead pipeline.

### 3.5 R2 — object storage (optional)

| Metric | Free plan |
| --- | --- |
| Storage | 10 GB-month |
| Class A ops (writes/mutations) | 1 million / month |
| Class B ops (reads) | 10 million / month |
| Egress (data out) | **Free** (no bandwidth charges — a big differentiator vs S3) |

**Use for this app (future):** host product/showroom images if you move them out of the
repo's `public/` folder, or store uploaded assets. Also used by OpenNext as an optional
**incremental cache** bucket for ISR (not required for this app since data is static).

### 3.6 Durable Objects — stateful coordination (optional, advanced)

| Metric | Free plan |
| --- | --- |
| Requests | 100,000 / day |
| Duration | 13,000 GB-s / day |
| Storage | SQLite-backed only on Free plan |

**Use for this app:** not needed. Relevant only if you add real-time features (live chat,
counters with strong consistency, websockets).

### 3.7 Other free-tier products (reference)

| Product | Free allowance | Relevant here? |
| --- | --- | --- |
| **Hyperdrive** (pool/accelerate external Postgres/MySQL) | 100,000 queries/day | Only if you connect an external SQL DB |
| **Queues** | 10,000 operations/day | Background jobs (e.g. send WhatsApp async) — future |
| **Workflows** | shares 100k/day requests, 3,000 steps/day | Multi-step async orchestration — future |
| **Vectorize** (vector DB) | Paid only (30M queried dims on trial) | AI/search embeddings — not now |
| **Workers AI** | Free daily neuron allowance | AI features — not now |
| **Workers Logs** | 200,000 log events/day, 3-day retention | Debugging — useful |
| **Pages** (static hosting) | Unlimited requests, 500 builds/month | Alternative host — not chosen |
| **CDN + SSL + DDoS** | Free, unlimited | ✅ You get this automatically |
| **Custom domain + DNS** | Free | ✅ Connect your own domain free |

---

## 4. What you get "for free" just by being on Cloudflare

Independent of Workers usage, every deployment automatically includes:

- **Global CDN** — your assets served from 300+ edge locations.
- **Free automatic HTTPS/SSL** — no cert management.
- **Free unmetered DDoS protection**.
- **Free custom domain + DNS** (if you move/point your domain to Cloudflare).
- **`*.workers.dev` subdomain** — a free public URL out of the box, before you buy a domain.
- **Free CI/CD ("Workers Builds")** — connect GitHub, auto-build & deploy on every push.

---

## 5. How the free tier maps to THIS app specifically

| App concern | Cloudflare free-tier answer |
| --- | --- |
| Serving pages (`/`, `/products`, `/products/[slug]`, `/about`, `/categories`, `/inquiry`, `/inquiry-cart`) | Static assets + Worker SSR — free/near-free |
| Product images in `public/images/**` | Served as static assets (free, unlimited) |
| Product data (`src/data/**.json`) | Bundled into the build — no DB, no cost |
| Live search / filter (`fuse.js`) | Runs **client-side** in the browser — zero server cost |
| Inquiry cart | Stored in browser `localStorage` — zero server cost |
| `POST /api/inquiry` | Worker invocation — counts toward 100k/day (you'll use a tiny fraction) |
| `randomUUID()` in inquiry-service | Needs Node compat → enabled via `nodejs_compat` flag |
| WhatsApp notifications (future) | `fetch()` to WhatsApp Cloud API from the Worker; optionally queue via Queues |
| Persisting inquiries (future) | **D1** (5M reads/day, 100k writes/day free) |
| Storing secrets (future WhatsApp token) | Wrangler **secrets** / dashboard env vars (free) |

---

## 6. Free tier limits you should actually watch

For a showroom catalogue these are generous, but know the ceilings:

1. **100,000 Worker requests/day** — only *dynamic* requests count; static assets are free.
2. **10 ms CPU per request** — fine for this app's simple SSR + validation. Heavy work would
   need optimization or the $5/mo Paid plan (30s CPU/request).
3. **D1: 100,000 writes/day** — thousands of inquiries/day would still fit comfortably.
4. **KV: 1,000 writes/day** — writes are the tight limit; reads are 100k/day.
5. **No cold-start billing / no idle charges** — you don't pay to keep it "on".

If you ever exceed the free tier, the **Workers Paid plan is a flat $5/month** and raises
these limits dramatically (10M requests/month included, 30s CPU/request, etc.).

---

## 7. Cost expectation for this project

**Realistically: ₹0 / $0 per month.**

- A dealer showroom catalogue serves a modest number of visitors.
- The heavy assets (images, JS) are free static-asset requests.
- The only metered path is `POST /api/inquiry`, used a handful of times per visitor at most.
- Even adding D1 to store leads keeps you far under the free daily write limit.

You would only pay if the site became genuinely high-traffic **and** most traffic hit
dynamic Worker code — at which point $5/month removes the ceilings.

---

## 8. Glossary

- **Worker** — Cloudflare's serverless function/runtime (V8 isolate, `workerd`), runs your app.
- **OpenNext adapter** — open-source tool that compiles a Next.js build into a Worker.
- **Wrangler** — Cloudflare's CLI for building, previewing, deploying, and managing bindings.
- **Binding** — a declared connection from your Worker to a resource (KV, D1, R2, secret, another Worker).
- **Static assets** — pre-built files (HTML/CSS/JS/images) served from the edge, free & unlimited.
- **`nodejs_compat`** — a compatibility flag that enables Node.js APIs (needed by Next.js).
- **`*.workers.dev`** — the free public subdomain for your Worker before you attach a custom domain.

---

## 9. Sources

- Cloudflare Workers + Next.js framework guide — developers.cloudflare.com/workers/frameworks/framework-guides/nextjs
- OpenNext Cloudflare "Get Started" — opennext.js.org/cloudflare/get-started
- Cloudflare Workers pricing — developers.cloudflare.com/workers/platform/pricing
- Cloudflare D1 pricing — developers.cloudflare.com/d1/platform/pricing
