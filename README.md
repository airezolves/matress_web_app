# Mr & Mrs Furnishings — Restolex Showroom Catalogue

A premium, mobile-first digital showroom and product catalogue for **Mr & Mrs
Furnishings**, an authorized Restolex dealer. Customers browse mattresses,
pillows and sleep essentials, build a selection, and submit inquiries — all
backed by a real database and deployed globally on Cloudflare at zero cost.

**Live site:**
https://restolex-showroom-catalogue.restolex-showroom-catalogue.workers.dev

---

## Features

- Curated product catalogue with live search, filtering, and sorting.
- Product detail pages with images, specs, sizes, and FAQs.
- Inquiry cart + form — submissions are stored in the database.
- Admin API to add / update / delete products and read inquiries.
- Fully responsive, mobile-first UI with tasteful motion and a 3D hero.
- Persistent data in **Cloudflare D1** (the single source of truth).

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 15 (App Router), React 19 |
| Styling | Tailwind CSS v4 |
| Motion / 3D | Framer Motion, react-three-fiber |
| Database | Cloudflare D1 (SQLite) |
| Runtime | Cloudflare Workers via OpenNext |
| Tooling | Wrangler, TypeScript, ESLint |

---

## Project structure

```
src/
  app/            App Router pages + API routes
    api/          products, inquiry, admin endpoints
  components/     UI, home, catalogue, product, inquiry, layout
  lib/db/         D1 data-access layer (products, categories, inquiries)
  services/       pure product helpers (search/filter/sort)
  data/           source JSON used to seed the database
migrations/       D1 schema + seed SQL
docs/             ADMIN_GUIDE.md, LOCAL_DEVELOPMENT.md
```

---

## Quick start

```bash
npm install
npm run db:migrate:local   # create + seed local database
npm run dev                # http://localhost:3000
```

For a production-parity run on the Cloudflare runtime, use `npm run preview`
(http://localhost:8787). Full instructions: **[docs/LOCAL_DEVELOPMENT.md](docs/LOCAL_DEVELOPMENT.md)**.

---

## Managing products & inquiries

Products and inquiries are managed through a secured admin API (add / update /
delete products, read inquiries). See **[docs/ADMIN_GUIDE.md](docs/ADMIN_GUIDE.md)**
for endpoints, the product schema, and copy-paste examples.

---

## Deployment & CI/CD

The app runs as a single Cloudflare Worker with a D1 database binding.

**Manual deploy:**

```bash
npx wrangler login
npm run db:migrate:remote   # apply any new migrations
npm run deploy
```

**Automatic deploy (GitHub Actions):** every push to `main` runs
`.github/workflows/deploy.yml`, which installs dependencies, applies remote D1
migrations, and deploys. It requires two repository secrets:

- `CLOUDFLARE_API_TOKEN` — "Edit Cloudflare Workers" token, with D1 edit.
- `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account id.

The admin key is a Worker secret set once with `wrangler secret put ADMIN_API_KEY`
and persists across deploys.

---

## Cost

Runs comfortably within Cloudflare's free tier (100k requests/day, D1 free
limits). Public GitHub repos get unlimited Actions minutes. No paid services are
required.

---

## Documentation

- **[docs/LOCAL_DEVELOPMENT.md](docs/LOCAL_DEVELOPMENT.md)** — run and verify the
  site locally.
- **[docs/ADMIN_GUIDE.md](docs/ADMIN_GUIDE.md)** — add / update / delete products
  and read inquiries.

---

## Credits

Designed & developed by **AI Rezolves** — websites & AI solutions for growing
businesses.
Email: ai.rezolves@gmail.com · Phone: +91 97314 19699
