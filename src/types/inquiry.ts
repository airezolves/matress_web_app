import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^[0-9]{10,15}$/, "Phone should contain 10 to 15 digits"),
  whatsappNumber: z
    .string()
    .regex(/^[0-9]{10,15}$/, "WhatsApp number should contain 10 to 15 digits"),
  email: z.string().email("Enter a valid email"),
  city: z.string().min(2, "City must be at least 2 characters"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export const catalogueRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^[0-9]{10,15}$/, "Phone should contain 10 to 15 digits"),
  email: z.string().email("Enter a valid email"),
  city: z.string().min(2, "City must be at least 2 characters")
});

export type InquiryPayload = z.infer<typeof inquirySchema>;
export type CatalogueRequestPayload = z.infer<typeof catalogueRequestSchema>;

export interface InquiryRequest {
  customer: InquiryPayload;
  productIds: string[];
}

export interface InquiryResponse {
  success: boolean;
  message: string;
  inquiryId?: string;
  downloadUrl?: string;
}
