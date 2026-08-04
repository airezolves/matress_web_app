# 01 Project Architecture

## Overview
This application is a static-first product catalogue and lead generation platform for a mattress showroom authorized to sell Restolex products.

Core objectives:
- Fast browsing of products and categories
- Rich filtering and Fuse.js search
- Local persistent inquiry cart
- Inquiry submission through one API endpoint (`POST /api/inquiry`)

## High-Level Layers
- App Router pages: route composition and page-level metadata
- Components: reusable UI and page sections
- Context and hooks: cart state and product search/filter orchestration
- Services: product querying/filtering, inquiry orchestration, WhatsApp integration placeholders
- Data: JSON-driven catalogue (`src/data`)
- Types and validation: strict TypeScript models and Zod schemas

## Data Flow
1. Product data is loaded from JSON files in `src/data/products`.
2. `productService` provides search, filter, sort, related, and category lookups.
3. Pages and client components consume service outputs.
4. Inquiry cart actions update Context state and Local Storage.
5. Inquiry form posts customer and product IDs to `/api/inquiry`.
6. API validates input and calls `inquiryService`.
7. `inquiryService` calls placeholder `WhatsAppService` methods for future integration.

## Routing Model
- `/` landing
- `/about`
- `/categories`
- `/products`
- `/products/[slug]`
- `/inquiry-cart`
- `/inquiry`
- `/api/inquiry`

## Communication Pattern
- Parent pages pass typed props to reusable components.
- Cross-page state (cart) is centralized in `InquiryCartProvider`.
- Server routes only for inquiry submission.

## Performance Strategy
- Static rendering for catalogue pages
- Client-only dynamic behavior for filters/search/cart
- Next Image optimization with local assets
- Dynamic import used for product filter panel component

## Accessibility Baseline
- Semantic sections and labels
- Keyboard-focusable controls
- Form labels with error messages
- Contrast-safe color tokens
