# 10 Project Walkthrough

## 1. Start Here
- Open `src/app/layout.tsx` to understand global shell and providers.
- Open `src/components/layout/navbar.tsx` and `footer.tsx` for shared layout.

## 2. Understand Data
- `src/data/products/*.json`: source of truth for product catalogue.
- `src/data/products/index.ts`: product registry.
- `src/data/categories.json`: category metadata.

## 3. Understand Business Logic
- `src/services/product-service.ts`: search, filter, sort, related products.
- `src/services/inquiry-service.ts`: inquiry orchestration.
- `src/services/whatsapp-service.ts`: integration placeholders.

## 4. Understand State
- `src/context/inquiry-cart-context.tsx`: cart operations and count.
- `src/hooks/use-local-storage.ts`: persistence.
- `src/hooks/use-products.ts`: search + filter + sort composition.

## 5. Understand Pages
- `src/app/page.tsx`: landing assembly.
- `src/app/categories/page.tsx`: category catalogue.
- `src/app/products/page.tsx`: product search/filter page.
- `src/app/products/[slug]/page.tsx`: detailed product experience.
- `src/app/inquiry-cart/page.tsx`: cart review.
- `src/app/inquiry/page.tsx`: inquiry form.

## 6. Understand API
- `src/app/api/inquiry/route.ts`: single inquiry endpoint.
- Validation schema in `src/types/inquiry.ts`.

## 7. Design System Overview
- Tokens in `src/app/globals.css`.
- Reusable primitives in `src/components/ui`.
- Motion behavior in `src/components/animation/reveal.tsx`.

## 8. Running the Project
- `npm install`
- `npm run dev`
- `npm run lint`
- `npm run build`

## 9. Typical Change Example
To add a new product:
1. Add JSON file in `src/data/products`.
2. Add image files under `public/images/products`.
3. Register product in `src/data/products/index.ts`.
4. Validate filters/search behavior on `/products`.

## 10. One-Hour Codebase Reading Path
1. `layout.tsx`
2. `product-service.ts`
3. `inquiry-cart-context.tsx`
4. `products-catalog-view.tsx`
5. `inquiry-form.tsx`
6. `/api/inquiry/route.ts`
This sequence gives full understanding of rendering, state, and request flow.
