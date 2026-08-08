import { siteConfig } from "@/constants/site";

/** Build a wa.me deep link with a prefilled message (digits-only number). */
export function buildWhatsAppLink(message: string): string {
  const digits = siteConfig.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function productEnquiryMessage(productName: string): string {
  return `Hi ${siteConfig.name}, I'm interested in ${productName}. Could you share more details?`;
}

export function selectionEnquiryMessage(productNames: string[]): string {
  if (productNames.length === 0) {
    return `Hi ${siteConfig.name}, I'd like help finding the right mattress.`;
  }
  return `Hi ${siteConfig.name}, I'm interested in these mattresses: ${productNames.join(", ")}. Please help me with the next steps.`;
}

export const generalEnquiryMessage = `Hi ${siteConfig.name}, I'd like to learn more about your mattresses and showroom.`;
