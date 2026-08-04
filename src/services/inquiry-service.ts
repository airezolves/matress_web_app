import { randomUUID } from "crypto";

import { siteConfig } from "@/constants/site";
import { productService } from "@/services/product-service";
import { WhatsAppService } from "@/services/whatsapp-service";
import type { InquiryRequest, InquiryResponse } from "@/types/inquiry";
import type { Product } from "@/types/product";

const whatsappService = new WhatsAppService();

export const inquiryService = {
  async submitInquiry(payload: InquiryRequest): Promise<InquiryResponse> {
    const selectedProducts = payload.productIds
      .map((id) => productService.getAllProducts().find((product) => product.id === id))
      .filter((product): product is Product => Boolean(product));

    if (!selectedProducts.length) {
      return {
        success: false,
        message: "Please add at least one product to your inquiry."
      };
    }

    await whatsappService.sendCustomerMessage(payload.customer, selectedProducts);
    await whatsappService.sendDealerMessage(payload.customer, selectedProducts);

    return {
      success: true,
      message: `Inquiry received. Our team at ${siteConfig.name} will contact you shortly.`,
      inquiryId: randomUUID()
    };
  }
};
