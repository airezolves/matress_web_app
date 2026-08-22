import "server-only";

import { getDB } from "@/lib/db/client";
import type { InquiryPayload } from "@/types/inquiry";

export interface InquiryRecord {
  id: string;
  customer: InquiryPayload;
  productIds: string[];
  productNames: string[];
  status: string;
  createdAt: string;
}

interface InquiryRow {
  id: string;
  name: string;
  phone: string;
  whatsapp_number: string;
  email: string;
  city: string;
  address: string;
  message: string;
  product_ids: string;
  product_names: string;
  status: string;
  created_at: string;
}

export interface CreateInquiryInput {
  id: string;
  customer: InquiryPayload;
  productIds: string[];
  productNames: string[];
}

export async function createInquiry(input: CreateInquiryInput): Promise<void> {
  const db = await getDB();
  await db
    .prepare(
      `INSERT INTO inquiries (
        id, name, phone, whatsapp_number, email, city, address, message,
        product_ids, product_names
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      input.id,
      input.customer.name,
      input.customer.phone,
      input.customer.whatsappNumber,
      input.customer.email,
      input.customer.city,
      input.customer.address,
      input.customer.message,
      JSON.stringify(input.productIds),
      JSON.stringify(input.productNames)
    )
    .run();
}

export async function listInquiries(limit = 100): Promise<InquiryRecord[]> {
  const db = await getDB();
  const { results } = await db
    .prepare(
      `SELECT id, name, phone, whatsapp_number, email, city, address, message,
              product_ids, product_names, status, created_at
       FROM inquiries ORDER BY created_at DESC LIMIT ?`
    )
    .bind(limit)
    .all<InquiryRow>();

  return (results ?? []).map((row) => ({
    id: row.id,
    customer: {
      name: row.name,
      phone: row.phone,
      whatsappNumber: row.whatsapp_number,
      email: row.email,
      city: row.city,
      address: row.address,
      message: row.message
    },
    productIds: safeArray(row.product_ids),
    productNames: safeArray(row.product_names),
    status: row.status,
    createdAt: row.created_at
  }));
}

function safeArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}
