# 07 Deployment

## Deploy to Vercel
1. Push repository to GitHub.
2. Import project in Vercel.
3. Framework detected as Next.js automatically.
4. Build command: `npm run build`.
5. Output: managed by Next.js.

## Environment Variables
Current project needs none for local placeholders.
Future WhatsApp integration should add:
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_TEMPLATE_NAMESPACE` (if needed)

## Production Checklist
- Run `npm run lint`
- Run `npm run build`
- Verify `/products`, `/products/[slug]`, `/inquiry`, `/api/inquiry`

## Domain Connection
- Add custom domain in Vercel project settings.
- Configure DNS records from your domain provider.
- Enable HTTPS (auto-managed by Vercel).
