# 09 Code Tracing Guide

## How to Trace Any Flow
Use this model:
1. Page entry
2. Component event
3. Hook or context state update
4. Service call
5. API request/response (if applicable)
6. UI re-render

## Search Flow
```mermaid
flowchart TD
  A[Products Page] --> B[ProductsCatalogView query state]
  B --> C[useProducts hook]
  C --> D[productService.searchProducts via Fuse.js]
  D --> E[Filtered list returned]
  E --> F[Product cards re-render]
```

## Filter Flow
```mermaid
flowchart TD
  A[Filter dropdown change] --> B[onFilterChange]
  B --> C[filters state update]
  C --> D[useProducts recompute]
  D --> E[productService.filterProducts]
  E --> F[Filtered cards visible]
```

## Cart Flow
```mermaid
flowchart TD
  A[Add to Inquiry button] --> B[useInquiryCart addItem]
  B --> C[InquiryCartProvider state]
  C --> D[useLocalStorage persists data]
  D --> E[Navbar count and cart table update]
```

## Inquiry Submit Flow
```mermaid
flowchart TD
  A[InquiryForm submit] --> B[react-hook-form validation]
  B --> C[POST /api/inquiry]
  C --> D[API schema validation]
  D --> E[inquiryService.submitInquiry]
  E --> F[WhatsAppService placeholder methods]
  F --> G[JSON response]
  G --> H[UI success message + cart clear]
```

## Navigation and Routing Flow
```mermaid
flowchart TD
  A[Navbar Link Click] --> B[Next App Router transition]
  B --> C[Target page component]
  C --> D[Server or client rendering]
```

## Product Loading Flow
```mermaid
flowchart TD
  A[Page request] --> B[productService reads imported JSON]
  B --> C[Returns typed Product objects]
  C --> D[Components render cards/details]
```

## Product Details Flow
```mermaid
flowchart TD
  A[/products/[slug]] --> B[get slug param]
  B --> C[productService.getProductBySlug]
  C --> D[Render detail sections]
  D --> E[AddToInquiryButton interaction]
```
