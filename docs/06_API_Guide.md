# 06 API Guide

## Endpoint
- Method: `POST`
- Path: `/api/inquiry`

## Request Body
```json
{
  "customer": {
    "name": "...",
    "phone": "...",
    "whatsappNumber": "...",
    "email": "...",
    "city": "...",
    "address": "...",
    "message": "..."
  },
  "productIds": ["prd-..."]
}
```

## Validation
- Schema: `src/types/inquiry.ts` (`inquirySchema`)
- API route checks both customer payload and product list.

## Service Flow
1. API route validates request.
2. API route calls `inquiryService.submitInquiry`.
3. Service resolves products and calls `WhatsAppService` placeholders.
4. Service returns success/failure object.

## WhatsApp Integration Point
- File: `src/services/whatsapp-service.ts`
- Implement logic in:
  - `sendCustomerMessage()`
  - `sendDealerMessage()`

## Where to Add Environment Variables
- Keep provider tokens/secrets in `.env.local`.
- Read env values inside `whatsapp-service.ts` during real integration.
