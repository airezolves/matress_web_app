# 13 — Cloudflare Deployment Plan (End‑to‑End)

> The concrete, step-by-step plan to deploy `restolex-showroom-catalogue`
> (Mr & Mrs Furnishings) to **Cloudflare Workers** on the **free tier** using the
> **OpenNext adapter**. This document lists every code change required, and every
> action **you** (the account owner) must perform. Companion to
> `12_Cloudflare_Free_Tier_Guide.md`.

---

## 0. Overview of the target architecture

```
GitHub repo ──push──▶ Cloudflare Workers Build (CI/CD)
                          │  runs: opennextjs-cloudflare build
                          ▼
                 .open-next/worker.js  +  .open-next/assets/**
                          │
                          ▼
                 Cloudflare Worker (workerd runtime)
                   ├─ static assets  → served from edge (free, unlimited)
                   └─ dynamic routes → SSR pages + POST /api/inquiry
                          │
                          ▼
                 https://<name>.workers.dev  (free)  or  your custom domain
```

- **Host:** Cloudflare Workers (not Pages).
- **Adapter:** `@opennextjs/cloudflare`.
- **CLI:** `wrangler`.
- **DB today:** none (data is static JSON).
- **DB later (optional):** Cloudflare **D1** to persist inquiries.

---

## 1. Current-state readiness assessment

| Item | State | Action needed |
| --- | --- | --- |
| Next.js 15 App Router | ✅ Compatible | none |
| React 19 | ✅ Compatible | none |
| `next/image` (9 usages) | ✅ Supported via Cloudflare Images | optional image binding |
| `POST /api/inquiry` route handler | ✅ Supported | runs as Worker |
| `randomUUID` from `crypto` | ⚠️ Needs Node compat | enable `nodejs_compat` flag |
| `export const runtime = "edge"` | ✅ None present in repo | nothing to remove |
| Env vars required today | ✅ None | add later for WhatsApp |
| `next.config.ts` | Minimal | add OpenNext dev hook |
| Static product data | ✅ JSON, build-time | none |

**Conclusion:** No architectural blockers. This is a low-risk, mostly-config deployment.

---

## 2. Code & config changes required (I will make these)

These are the exact changes to the repository. They are additive and safe.

### 2.1 Add dependencies

```bash
npm install @opennextjs/cloudflare@latest
npm install --save-dev wrangler@latest
```

### 2.2 New file — `wrangler.jsonc` (project root)

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "main": ".open-next/worker.js",
  "name": "restolex-showroom-catalogue",
  "compatibility_date": "2025-03-01",
  "compatibility_flags": ["nodejs_compat"],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  },
  "observability": { "enabled": true }
}
```
> `nodejs_compat` is required for Next.js (and for the `crypto.randomUUID` call).

### 2.3 New file — `open-next.config.ts` (project root)

```ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig();
```

### 2.4 New file — `.dev.vars` (project root, git-ignored)

```
NEXTJS_ENV=development
```

### 2.5 New file — `public/_headers` (long-cache static assets)

```
/_next/static/*
  Cache-Control: public,max-age=31536000,immutable
```

### 2.6 Edit — `next.config.ts` (add local dev integration)

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
```

### 2.7 Edit — `package.json` scripts (add these)

```json
"preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
"deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
"cf-typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts"
```

### 2.8 Edit — `.gitignore` (add build & local artifacts)

```
.open-next
.dev.vars
.wrangler
cloudflare-env.d.ts
```

> No application/business logic changes are required. The inquiry flow, product
> catalogue, filters, and cart all continue to work unchanged.

---

## 3. What YOU need to do (account, creds, approvals)

I cannot create accounts or hold your credentials. Here is your checklist.

### Step A — Create a Cloudflare account (free)
1. Go to **https://dash.cloudflare.com/sign-up**.
2. Sign up with email + password (free plan, no card required).
3. Verify your email.

### Step B — Choose how we deploy (pick ONE)

**Option 1 — CLI deploy from your machine (fastest to first deploy).**
- You run `npx wrangler login` in the terminal once. A browser opens; you click
  **Allow**. This authorizes Wrangler on your machine (no token to paste).
- Then deployment is just `npm run deploy`.
- ✅ Recommended for the first go-live.

**Option 2 — Git-connected CI/CD (best for ongoing, auto-deploy on push).**
- In the Cloudflare dashboard: **Workers & Pages → Create → Workers → Connect to Git**.
- Authorize Cloudflare's GitHub app and select this repository.
- Set **Build command:** `npx opennextjs-cloudflare build`
  and **Deploy command:** `npx opennextjs-cloudflare deploy` (C3 usually pre-fills these).
- Every push to your production branch auto-builds and deploys.

> You can start with Option 1 and add Option 2 later. **Tell me which you prefer.**

### Step C — (Only if you want CI/CD tokens / headless deploy)
If you'd rather I script a non-interactive deploy, you'd create an **API token**:
- Dashboard → **My Profile → API Tokens → Create Token** → template **"Edit Cloudflare Workers"**.
- ⚠️ **Do not paste the token into chat.** Put it in your shell as
  `export CLOUDFLARE_API_TOKEN=...` and `export CLOUDFLARE_ACCOUNT_ID=...` yourself.
  For a first deployment, **Option 1 (`wrangler login`) avoids tokens entirely** and is safer.

### Step D — (Optional) Custom domain
- If you own a domain (e.g. `mrandmrsfurnishings.com`), add it as a **Website** in
  Cloudflare and update your registrar's nameservers to Cloudflare's (shown in the dashboard).
- Then attach it to the Worker under **Worker → Settings → Domains & Routes**.
- Until then, your free `https://restolex-showroom-catalogue.<your-subdomain>.workers.dev`
  URL works immediately.

---

## 4. Deployment procedure (the actual run)

Once Section 2 changes are in and you've done **Step A + Step B/Option 1**:

```bash
# 1. Install deps (one time)
npm install

# 2. Verify a normal build still passes
npm run lint
npm run build

# 3. Preview in the real Workers runtime locally (recommended sanity check)
npm run preview        # opens the app running under workerd

# 4. Authorize once (interactive, you click "Allow" in the browser)
npx wrangler login

# 5. Deploy to Cloudflare (build + upload)
npm run deploy
```

On success, Wrangler prints your live `*.workers.dev` URL.

### Post-deploy verification checklist
- [ ] `/` home renders (hero, featured products, testimonials).
- [ ] `/products` list + client-side search/filter works.
- [ ] `/products/[slug]` detail pages render for all 8 products.
- [ ] `/categories`, `/about`, `/inquiry`, `/inquiry-cart` render.
- [ ] `POST /api/inquiry` returns success JSON (submit the inquiry form).
- [ ] Images under `/images/**` load.
- [ ] No `nodejs_compat` runtime errors in the Worker logs.

---

## 5. Optional Phase 2 — persist inquiries in D1 (free)

Today `POST /api/inquiry` validates and returns a message but **stores nothing**
(WhatsApp service is a placeholder). To turn inquiries into stored leads:

1. Create a D1 database:
   ```bash
   npx wrangler d1 create restolex_inquiries
   ```
2. Add the binding to `wrangler.jsonc`:
   ```jsonc
   "d1_databases": [
     { "binding": "DB", "database_name": "restolex_inquiries", "database_id": "<from step 1>" }
   ]
   ```
3. Create a `leads` table (name, phone, email, product_ids, created_at) via a migration.
4. In `inquiry-service.ts` / the route, read the binding through
   `getCloudflareContext().env.DB` and `INSERT` the lead.
5. Free tier easily covers this (100,000 writes/day).

> This is optional and out of scope for the initial go-live. I can implement it as a
> follow-up once the basic deployment is confirmed working.

---

## 6. Optional Phase 3 — real WhatsApp notifications

`WhatsAppService` currently no-ops. To send real messages:
1. Get WhatsApp Business Cloud API credentials (Meta).
2. Store them as **Wrangler secrets** (never in code):
   ```bash
   npx wrangler secret put WHATSAPP_ACCESS_TOKEN
   npx wrangler secret put WHATSAPP_PHONE_NUMBER_ID
   ```
3. Replace the placeholder methods with `fetch()` calls to the WhatsApp API.
4. Optionally offload to **Cloudflare Queues** (free 10k ops/day) so the HTTP response
   returns instantly and messages send in the background.

---

## 7. Rollback & safety

- The Worker keeps **version history**; you can roll back to a previous deployment from
  the dashboard (**Worker → Deployments**) instantly.
- The repo changes are additive; reverting the commit + `git push` restores the prior state.
- Free tier means **no billing risk**; there is no card on file on the free plan.
- All secrets stay in Wrangler/dashboard, never in the repo.

---

## 8. What I need FROM YOU to proceed with the actual deployment

Please provide / confirm:

1. **Deploy method:** Option 1 (`wrangler login` from your machine) or Option 2 (Git CI/CD)?
2. **Worker name:** keep `restolex-showroom-catalogue` or choose another?
3. **Custom domain:** do you have one to attach now, or start on `*.workers.dev`?
4. **Phase 2 (D1 lead storage):** include now, or ship the catalogue first?
5. Confirm you've completed **Step A** (created the Cloudflare account).

Once you confirm #1–#5, I'll apply the Section 2 code changes, run the local
`build` + `preview` to validate, and then walk you through (or run) the deploy.

---

## 9. Sources

- Cloudflare Workers + Next.js framework guide — developers.cloudflare.com/workers/frameworks/framework-guides/nextjs
- OpenNext Cloudflare "Get Started" — opennext.js.org/cloudflare/get-started
- Cloudflare Workers / D1 pricing — developers.cloudflare.com/workers/platform/pricing
