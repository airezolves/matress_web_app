# 08 Future Upgrade Guide

## Goal
Enable backend expansion without rewriting the frontend.

## Move to FastAPI
- Keep current frontend API contract stable (`/api/inquiry` payload format).
- Replace Next API route with a proxy to FastAPI or direct calls from frontend.
- Reuse the same TypeScript types in `src/types/inquiry.ts`.

## Add Database
- Preserve product type contracts.
- Introduce a backend product API and swap `productService` data source.
- Keep UI components unchanged because they consume typed service outputs.

## Add Admin Panel
- Create separate admin app or route group.
- Store product CRUD in backend and reuse image conventions.
- Keep catalogue display app read-only if preferred.

## Add Payments Later
- Leave inquiry flow untouched.
- Add separate checkout context and route tree.
- Keep inquiry cart distinct from payment cart to avoid breaking current UX.

## Add Inventory
- Add `stock` and availability fields in backend response.
- Extend product type with optional inventory metadata.
- Update product card and detail components to show availability badges.

## Add Authentication
- Integrate auth provider at route middleware layer.
- Protect only admin or staff routes initially.
- Keep public catalogue routes open for lead capture.
