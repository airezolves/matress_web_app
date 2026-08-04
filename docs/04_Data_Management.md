# 04 Data Management

## Data Locations
- Categories: `src/data/categories.json`
- Homepage content: `src/data/homepage.json`
- Products: one file per product in `src/data/products/*.json`
- Product registry: `src/data/products/index.ts`

## Product JSON Contract
Each product must include:
- `id`, `slug`, `name`, `brand`
- `category`, `subcategory`, `description`
- `images`, `features`, `specifications`
- `sizes`, `warranty`, `material`, `comfort`, `firmness`, `thickness`, `tags`, `faqs`

## Add a New Product
1. Create a new JSON file in `src/data/products`.
2. Follow the exact product schema used in existing files.
3. Add at least one image path from `public/images/products`.
4. Import and append it in `src/data/products/index.ts`.

## Edit a Product
- Update the corresponding JSON file only.
- Keep `id` stable if existing cart references should remain valid.

## Delete a Product
1. Remove file from `src/data/products`.
2. Remove import/export entry from `src/data/products/index.ts`.

## Image Linking Rules
- Put product images under `public/images/products`.
- Use absolute public path format: `/images/products/file.svg`.
- For showroom images use `public/images/showroom`.
