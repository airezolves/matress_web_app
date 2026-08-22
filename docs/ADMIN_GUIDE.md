# Admin Guide — Managing Products & Inquiries

This guide explains how to **add, update, and delete products**, and how to **view
customer inquiries**, on the live site. Everything is backed by Cloudflare D1
(the production database) — changes appear on the website immediately.

---

## 1. How admin access works

The catalogue is public, but **write actions are protected** by a secret admin
key. Every admin request must include an `Authorization` header:

```
Authorization: Bearer <ADMIN_API_KEY>
```

- The key is stored as a **Cloudflare Worker secret** (never in the code or Git).
- Requests without a valid key get `401 Unauthorized`.

### Set or rotate the admin key

```bash
npx wrangler secret put ADMIN_API_KEY
# paste a strong random value when prompted
```

For local development the key comes from `.dev.vars`
(`ADMIN_API_KEY=local-dev-admin-key`).

> Keep this key private. Anyone with it can add or delete products.

---

## 2. Admin endpoints

| Action | Method & path | Auth |
| --- | --- | --- |
| Add or update a product | `POST /api/admin/products` | Bearer key |
| Delete a product | `DELETE /api/admin/products/{id}` | Bearer key |
| List recent inquiries | `GET /api/admin/inquiries` | Bearer key |
| List all products (public) | `GET /api/products` | none |

Base URL (production):
`https://restolex-showroom-catalogue.restolex-showroom-catalogue.workers.dev`

For local testing, use `http://localhost:8787` (see the Local Development guide).

---

## 3. Add or update a product

`POST /api/admin/products` uses **insert-or-replace**: posting a product with an
existing `id` updates it; a new `id` creates it.

### Required fields

`id`, `slug`, `name`, `brand`, `category`, `subcategory`, `description`,
`thickness`, `warranty`.

### Full field reference

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Unique, e.g. `prd-cloud-foam` |
| `slug` | string | URL segment, e.g. `cloud-foam-mattress` (unique) |
| `name` | string | Display name |
| `brand` | string | e.g. `Restolex` |
| `category` | string | e.g. `Mattress`, `Pillow` |
| `subcategory` | string | e.g. `Foam Mattress` |
| `shortDescription` | string | Card blurb (optional) |
| `description` | string | Full description |
| `material` | string | e.g. `Memory Foam` (optional) |
| `comfort` | string | e.g. `Medium` (optional) |
| `firmness` | string | e.g. `Medium-Firm` (optional) |
| `thickness` | string | e.g. `6 inch` |
| `warranty` | string | e.g. `7 years` |
| `images` | string[] | Paths under `/images/...` |
| `sizes` | string[] | e.g. `["Single","Queen","King"]` |
| `features` | string[] | Bullet features |
| `specifications` | array | `[{ "label": "...", "value": "..." }]` |
| `tags` | string[] | Search tags |
| `faqs` | array | `[{ "question": "...", "answer": "..." }]` |
| `testimonials` | array | Optional customer quotes |

### Example — add a product

```bash
curl -X POST https://restolex-showroom-catalogue.restolex-showroom-catalogue.workers.dev/api/admin/products \
  -H "Authorization: Bearer $ADMIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "prd-cloud-foam",
    "slug": "cloud-foam-mattress",
    "name": "Cloud Foam Mattress",
    "brand": "Restolex",
    "category": "Mattress",
    "subcategory": "Foam Mattress",
    "shortDescription": "Plush pressure-relieving memory foam.",
    "description": "A soft memory-foam mattress that cradles the body and relieves pressure points for undisturbed sleep.",
    "material": "Memory Foam",
    "comfort": "Plush",
    "firmness": "Medium-Soft",
    "thickness": "6 inch",
    "warranty": "7 years",
    "images": ["/images/products/foam/cloud-foam-1.png"],
    "sizes": ["Single", "Queen", "King"],
    "features": ["Pressure relief", "Breathable cover"],
    "specifications": [{ "label": "Density", "value": "40 kg/m³" }],
    "tags": ["foam", "soft"],
    "faqs": [],
    "testimonials": []
  }'
```

Success returns `201 Created` with the saved product.

### Update an existing product

Post the **same `id`** with the changed fields (send the full object). It replaces
the existing row.

### About product images

Image paths point to files under `public/images/...` that ship with the site.
To use brand-new images, add the files under `public/images/` and redeploy
(push to `main`, or run `npm run deploy`). Existing image paths need no redeploy.

---

## 4. Delete a product

```bash
curl -X DELETE https://restolex-showroom-catalogue.restolex-showroom-catalogue.workers.dev/api/admin/products/prd-cloud-foam \
  -H "Authorization: Bearer $ADMIN_API_KEY"
```

Returns `200 OK` on success, `404` if the id doesn't exist.

---

## 5. View customer inquiries

Every inquiry submitted through the site is stored in the database.

```bash
curl https://restolex-showroom-catalogue.restolex-showroom-catalogue.workers.dev/api/admin/inquiries \
  -H "Authorization: Bearer $ADMIN_API_KEY"
```

Or query the database directly:

```bash
npx wrangler d1 execute DB --remote \
  --command "SELECT name, phone, city, product_names, created_at FROM inquiries ORDER BY created_at DESC LIMIT 20;"
```

---

## 6. Bulk changes via SQL (optional)

For one-off bulk edits you can run SQL against the live database:

```bash
# Update a field
npx wrangler d1 execute DB --remote \
  --command "UPDATE products SET warranty='10 years' WHERE id='prd-spring-signature';"

# Run a file of statements
npx wrangler d1 execute DB --remote --file ./patch.sql
```

---

## 7. Rebuild the catalogue from source files (optional)

The initial catalogue is seeded from JSON in `src/data/products/*.json` and
`src/data/categories.json`. To regenerate the seed after editing those files:

```bash
npm run db:generate-seed        # writes migrations/0002_seed.sql
```

For a fresh seed revision, create a new migration (e.g. `0003_seed_v2.sql`) so
migration history stays append-only, then apply it:

```bash
npm run db:migrate:remote
```

---

## Quick reference

| I want to… | Do this |
| --- | --- |
| Add / update a product | `POST /api/admin/products` (Bearer key) |
| Delete a product | `DELETE /api/admin/products/{id}` |
| See inquiries | `GET /api/admin/inquiries` (Bearer key) |
| Rotate the admin key | `wrangler secret put ADMIN_API_KEY` |
| Bulk edit | `wrangler d1 execute DB --remote ...` |
