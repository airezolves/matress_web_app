import type { Category } from "@/types/category";
import type {
  Product,
  ProductCommercial,
  ProductFaq,
  ProductFeatureTiles,
  ProductSpecification,
  ProductTestimonial
} from "@/types/product";

/** Raw row shape as stored in the D1 `products` table. */
export interface ProductRow {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  short_description: string | null;
  description: string;
  material: string | null;
  comfort: string | null;
  firmness: string | null;
  thickness: string;
  warranty: string;
  images: string;
  features: string;
  specifications: string;
  sizes: string;
  tags: string;
  faqs: string;
  feature_tiles: string | null;
  commercial: string | null;
  testimonials: string;
  sort_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  product_count: number;
  sort_order: number;
}

function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    category: row.category,
    subcategory: row.subcategory,
    shortDescription: row.short_description ?? undefined,
    description: row.description,
    images: parseJson<string[]>(row.images, []),
    features: parseJson<string[]>(row.features, []),
    specifications: parseJson<ProductSpecification[]>(row.specifications, []),
    sizes: parseJson<string[]>(row.sizes, []),
    warranty: row.warranty,
    material: row.material ?? undefined,
    comfort: row.comfort ?? undefined,
    firmness: row.firmness ?? undefined,
    thickness: row.thickness,
    tags: parseJson<string[]>(row.tags, []),
    faqs: parseJson<ProductFaq[]>(row.faqs, []),
    featureTiles: row.feature_tiles
      ? parseJson<ProductFeatureTiles | undefined>(row.feature_tiles, undefined)
      : undefined,
    commercial: row.commercial
      ? parseJson<ProductCommercial | undefined>(row.commercial, undefined)
      : undefined,
    testimonials: parseJson<ProductTestimonial[]>(row.testimonials, [])
  };
}

export function rowToCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    image: row.image,
    productCount: row.product_count
  };
}
