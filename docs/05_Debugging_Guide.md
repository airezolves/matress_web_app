# 05 Debugging Guide

## UI Issues
- Check browser console for React warnings.
- Confirm Tailwind classes are present in rendered elements.
- Verify token variables in `src/app/globals.css`.

## API Issues
- API file: `src/app/api/inquiry/route.ts`.
- Validate request payload shape against `inquirySchema`.
- Confirm `productIds` is a non-empty array.

## Routing Issues
- App Router routes must map to folder names under `src/app`.
- Dynamic detail route must use `src/app/products/[slug]/page.tsx`.

## Local Storage Issues
- Cart key: `restolex-inquiry-cart` in `useLocalStorage`.
- Clear browser storage if stale schema causes parse issues.

## Filter Issues
- Filter logic lives in `productService.filterProducts`.
- Confirm filter option values exactly match product fields.

## Search Issues
- Fuse config is in `productService`.
- Verify search keys include newly added fields.
- If search is too strict, increase Fuse threshold slightly.

## Build and Lint Commands
- `npm run lint`
- `npm run build`
