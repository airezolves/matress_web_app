# 02 Folder Explanation

## Root
- `src/app`: App Router pages and API routes only.
- `src/components`: UI and feature components.
- `src/context`: shared React Context state containers.
- `src/hooks`: reusable hooks.
- `src/services`: business logic and service orchestration.
- `src/types`: type models and shared schemas.
- `src/data`: static catalogue JSON.
- `src/constants`: configuration constants and navigation maps.
- `src/config`: runtime config constants.
- `src/lib`: framework-level helpers.
- `src/utils`: app utilities.
- `public/images`: local image assets.
- `docs`: developer handover documentation.

## What Belongs Where
- UI markup: `src/components`
- Page route wiring: `src/app`
- Search/filter/cart logic: `src/services` and `src/context`
- Form validation schema: `src/types/inquiry.ts`
- Product and category content: `src/data`

## What Should Never Be Placed
- API/business logic inside page components
- Hardcoded product arrays in components
- LocalStorage access spread across random components
- WhatsApp integration details directly in UI code
- Huge multipurpose files mixing unrelated concerns
