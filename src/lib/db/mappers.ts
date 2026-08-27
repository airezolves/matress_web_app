import type { Category } from "@/types/category";
import type {
  Product,
  ProductFeatureTiles,
  ProductTestimonial
} from "@/types/product";

const FALLBACK_PRODUCT_IMAGE = "/images/products/spring-signature.svg";

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
  sizes: string;
  tags: string;
  feature_tiles: string | null;
  testimonials: string;
  specifications: string | null;
  care_instructions: string | null;
  delivery_information: string | null;
  return_policy: string | null;
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
  const images = parseJson<string[]>(row.images, []).filter(
    (source) => typeof source === "string" && source.trim().length > 0
  );

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    category: row.category,
    subcategory: row.subcategory,
    shortDescription: row.short_description ?? undefined,
    description: row.description,
    images: images.length > 0 ? images : [FALLBACK_PRODUCT_IMAGE],
    features: parseJson<string[]>(row.features, []),
    sizes: parseJson<string[]>(row.sizes, []),
    warranty: row.warranty,
    material: row.material ?? undefined,
    comfort: row.comfort ?? undefined,
    firmness: row.firmness ?? undefined,
    thickness: row.thickness,
    tags: parseJson<string[]>(row.tags, []),
    featureTiles: row.feature_tiles
      ? parseJson<ProductFeatureTiles | undefined>(row.feature_tiles, undefined)
      : undefined,
    testimonials: parseJson<ProductTestimonial[]>(row.testimonials, []),
    specificationDetails: row.specifications ?? undefined,
    careInstructions: row.care_instructions ?? undefined,
    deliveryInformation: row.delivery_information ?? undefined,
    returnPolicy: row.return_policy ?? undefined
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
