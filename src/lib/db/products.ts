import "server-only";

import { getDB } from "@/lib/db/client";
import { rowToProduct, type ProductRow } from "@/lib/db/mappers";
import type { Product } from "@/types/product";

const SELECT_COLUMNS = `
  id, slug, name, brand, category, subcategory, short_description, description,
  material, comfort, firmness, thickness, warranty, images, features,
  specifications, sizes, tags, faqs, feature_tiles, commercial, testimonials,
  sort_order, is_active, created_at, updated_at
`;

/** Fields accepted when creating or replacing a product. */
export type ProductInput = Omit<Product, never> & { sortOrder?: number };

export async function listProducts(): Promise<Product[]> {
  const db = await getDB();
  const { results } = await db
    .prepare(
      `SELECT ${SELECT_COLUMNS} FROM products WHERE is_active = 1 ORDER BY sort_order ASC, name ASC`
    )
    .all<ProductRow>();
  return (results ?? []).map(rowToProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const db = await getDB();
  const row = await db
    .prepare(`SELECT ${SELECT_COLUMNS} FROM products WHERE slug = ? AND is_active = 1`)
    .bind(slug)
    .first<ProductRow>();
  return row ? rowToProduct(row) : null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const db = await getDB();
  const row = await db
    .prepare(`SELECT ${SELECT_COLUMNS} FROM products WHERE id = ?`)
    .bind(id)
    .first<ProductRow>();
  return row ? rowToProduct(row) : null;
}

/**
 * Creates a new product (or replaces one with the same id/slug).
 * JSON-typed fields are serialized to text columns.
 */
export async function createProduct(input: ProductInput): Promise<Product> {
  const db = await getDB();

  const nextOrder =
    input.sortOrder ??
    ((
      await db.prepare(`SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM products`).first<{
        next: number;
      }>()
    )?.next ?? 0);

  await db
    .prepare(
      `INSERT OR REPLACE INTO products (
        id, slug, name, brand, category, subcategory, short_description, description,
        material, comfort, firmness, thickness, warranty, images, features,
        specifications, sizes, tags, faqs, feature_tiles, commercial, testimonials,
        sort_order, is_active, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, datetime('now'))`
    )
    .bind(
      input.id,
      input.slug,
      input.name,
      input.brand,
      input.category,
      input.subcategory,
      input.shortDescription ?? null,
      input.description,
      input.material ?? null,
      input.comfort ?? null,
      input.firmness ?? null,
      input.thickness,
      input.warranty,
      JSON.stringify(input.images ?? []),
      JSON.stringify(input.features ?? []),
      JSON.stringify(input.specifications ?? []),
      JSON.stringify(input.sizes ?? []),
      JSON.stringify(input.tags ?? []),
      JSON.stringify(input.faqs ?? []),
      input.featureTiles ? JSON.stringify(input.featureTiles) : null,
      input.commercial ? JSON.stringify(input.commercial) : null,
      JSON.stringify(input.testimonials ?? []),
      nextOrder
    )
    .run();

  const created = await getProductById(input.id);
  if (!created) {
    throw new Error("Failed to load product after insert");
  }
  return created;
}

/** Hard-deletes a product. Returns true when a row was removed. */
export async function deleteProduct(id: string): Promise<boolean> {
  const db = await getDB();
  const result = await db.prepare(`DELETE FROM products WHERE id = ?`).bind(id).run();
  return (result.meta?.changes ?? 0) > 0;
}
