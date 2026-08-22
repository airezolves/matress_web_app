import "server-only";

import { getDB } from "@/lib/db/client";
import { rowToCategory, type CategoryRow } from "@/lib/db/mappers";
import type { Category } from "@/types/category";

export async function listCategories(): Promise<Category[]> {
  const db = await getDB();
  const { results } = await db
    .prepare(
      `SELECT id, name, slug, description, image, product_count, sort_order
       FROM categories ORDER BY sort_order ASC, name ASC`
    )
    .all<CategoryRow>();
  return (results ?? []).map(rowToCategory);
}
