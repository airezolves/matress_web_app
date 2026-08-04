import type { InquiryPayload } from "@/types/inquiry";
import type { Product } from "@/types/product";

export class WhatsAppService {
  // Placeholder for future WhatsApp Business Cloud API integration.
  async sendCustomerMessage(customer: InquiryPayload, products: Product[]): Promise<void> {
    void customer;
    void products;
    return Promise.resolve();
  }

  // Placeholder for dealer-facing notification integration.
  async sendDealerMessage(customer: InquiryPayload, products: Product[]): Promise<void> {
    void customer;
    void products;
    return Promise.resolve();
  }
}
