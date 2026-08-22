# Local Development Guide

How to run the site on your machine, with the real database engine, and verify
everything works before pushing.

---

## 1. Prerequisites

- **Node.js 22 or newer** (`node -v`) — Wrangler requires it.
- **npm** (ships with Node).
- A **Cloudflare account** (only needed for deploying / remote database).

Install dependencies once:

```bash
npm install
```

---

## 2. Environment files

Create `.dev.vars` in the project root (already gitignored) for local secrets:

```
NEXTJS_ENV=development
ADMIN_API_KEY=local-dev-admin-key
```

This gives you a working admin key for local testing without touching production.

---

## 3. Set up the local database

The app uses **Cloudflare D1** (SQLite). A local copy lives under `.wrangler/`.

```bash
# Create the local database schema + seed data
npm run db:migrate:local
```

This applies `migrations/0001_init.sql` (tables) and `migrations/0002_seed.sql`
(8 products + 5 categories). You now have a fully populated local database.

---

## 4. Run the app

There are two ways to run locally:

### a) Fast dev server (hot reload)

```bash
npm run dev
```

Open http://localhost:3000. Best for UI work — instant refresh on save.

### b) Production-parity preview (recommended before pushing)

This builds the app the same way it runs on Cloudflare (the `workerd` runtime)
with the local D1 database bound:

```bash
npm run preview
```

Open http://localhost:8787. Use this to confirm the real backend behaviour
(database reads/writes, API routes, caching) exactly as production.

---

## 5. Verify everything works

With `npm run preview` running on port 8787:

### Pages (should all return 200)

```bash
for p in / /products /categories /products/spring-signature-lux; do
  echo "$p -> $(curl -s -o /dev/null -w '%{http_code}' http://localhost:8787$p)"
done
```

### Public products API

```bash
curl -s http://localhost:8787/api/products | head -c 200
```

### Submit a test inquiry (persists to the local DB)

```bash
curl -s -X POST http://localhost:8787/api/inquiry \
  -H 'Content-Type: application/json' \
  -d '{"customer":{"name":"Test User","phone":"9876543210","whatsappNumber":"9876543210","email":"test@example.com","city":"Bengaluru","address":"123 Test Street, Bengaluru","message":"Interested in a spring mattress"},"productIds":["prd-spring-signature"]}'
```

### Admin: list inquiries (needs the local key)

```bash
curl -s http://localhost:8787/api/admin/inquiries \
  -H 'Authorization: Bearer local-dev-admin-key'
```

### Admin: add then delete a product

```bash
# add
curl -s -X POST http://localhost:8787/api/admin/products \
  -H 'Authorization: Bearer local-dev-admin-key' \
  -H 'Content-Type: application/json' \
  -d '{"id":"prd-test","slug":"test-mattress","name":"Test Mattress","brand":"Restolex","category":"Mattress","subcategory":"Foam Mattress","description":"Temp test product.","thickness":"6 inch","warranty":"5 years","images":[],"sizes":["Single"],"features":[],"specifications":[],"tags":[],"faqs":[],"testimonials":[]}'

# delete
curl -s -X DELETE http://localhost:8787/api/admin/products/prd-test \
  -H 'Authorization: Bearer local-dev-admin-key'
```

Inspect the local database directly at any time:

```bash
npx wrangler d1 execute DB --local --command "SELECT COUNT(*) AS products FROM products;"
```

---

## 6. Useful scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Next.js dev server (port 3000) |
| `npm run preview` | Build + run on Cloudflare runtime (port 8787) |
| `npm run build` | Production Next.js build |
| `npm run lint` | Lint the codebase |
| `npm run db:migrate:local` | Apply migrations to the local database |
| `npm run db:migrate:remote` | Apply migrations to the production database |
| `npm run db:generate-seed` | Regenerate seed SQL from `src/data` |
| `npm run cf-typegen` | Regenerate Cloudflare binding types |
| `npm run deploy` | Build + deploy to Cloudflare |

---

## 7. Troubleshooting

- **`Wrangler requires at least Node.js v22`** — upgrade Node (`nvm install 22`).
- **Empty products / DB errors in preview** — run `npm run db:migrate:local` to
  create and seed the local database.
- **Admin endpoints return 401 locally** — make sure `.dev.vars` has
  `ADMIN_API_KEY=local-dev-admin-key` and you send it as a Bearer token.
- **Port already in use** — stop other dev servers, or the preview will pick the
  next free port (check the console output for the URL).

For deploying and managing the live site, see the project `README.md` and
`docs/ADMIN_GUIDE.md`.
