import { randomUUID } from "crypto";

import { siteConfig } from "@/constants/site";
import { createInquiry } from "@/lib/db/inquiries";
import { getProductById } from "@/lib/db/products";
import { WhatsAppService } from "@/services/whatsapp-service";
import type { InquiryRequest, InquiryResponse } from "@/types/inquiry";
import type { Product } from "@/types/product";

const whatsappService = new WhatsAppService();

export const inquiryService = {
  async submitInquiry(payload: InquiryRequest): Promise<InquiryResponse> {
    const resolved = await Promise.all(payload.productIds.map((id) => getProductById(id)));
    const selectedProducts = resolved.filter((product): product is Product => Boolean(product));

    if (!selectedProducts.length) {
      return {
        success: false,
        message: "Please add at least one product to your inquiry."
      };
    }

    const inquiryId = randomUUID();

    await createInquiry({
      id: inquiryId,
      customer: payload.customer,
      productIds: selectedProducts.map((product) => product.id),
      productNames: selectedProducts.map((product) => product.name)
    });

    await whatsappService.sendCustomerMessage(payload.customer, selectedProducts);
    await whatsappService.sendDealerMessage(payload.customer, selectedProducts);

    return {
      success: true,
      message: `Inquiry received. Our team at ${siteConfig.name} will contact you shortly.`,
      inquiryId
    };
  }
};
