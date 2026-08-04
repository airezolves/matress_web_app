# 03 Component Map

## Layout
- `components/layout/navbar.tsx`: global sticky navigation and cart count.
- `components/layout/footer.tsx`: contact details and quick links.
- `components/layout/page-shell.tsx`: wraps all pages with navbar/footer.

## Providers
- `components/providers/app-providers.tsx`: root provider composition.

## Home
- `components/home/hero-section.tsx`: top hero with CTA.
- `components/home/featured-categories.tsx`: highlighted category grid.
- `components/home/featured-products.tsx`: key product showcase.
- `components/home/trust-strip.tsx`: proof metrics section.
- `components/home/contact-cta.tsx`: final conversion block.
- `components/home/section-heading.tsx`: reusable heading system.

## Catalogue
- `components/catalogue/category-card.tsx`: category display card.
- `components/catalogue/product-card.tsx`: product card + add to inquiry.
- `components/catalogue/product-filters.tsx`: filter/search/sort controls.
- `components/catalogue/products-catalog-view.tsx`: stateful products view.

## Inquiry
- `components/inquiry/cart-table.tsx`: inquiry cart table operations.
- `components/inquiry/inquiry-form.tsx`: validated inquiry submission.
- `components/inquiry/add-to-inquiry-button.tsx`: sticky product CTA.

## UI Primitives (shadcn-style)
- `components/ui/button.tsx`
- `components/ui/input.tsx`
- `components/ui/textarea.tsx`
- `components/ui/select.tsx`
- `components/ui/card.tsx`
- `components/ui/badge.tsx`

## Animation
- `components/animation/reveal.tsx`: reusable reveal animation wrapper.
