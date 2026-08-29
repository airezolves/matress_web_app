import Fuse from "fuse.js";

import type { Product } from "@/types/product";

export interface ProductFilters {
  category?: string[];
  subcategory?: string[];
  usecase?: string[];
  material?: string[];
  thickness?: string[];
  size?: string[];
  warranty?: string[];
  firmness?: string[];
  brand?: string[];
}

export interface ProductFilterOptions {
  category: string[];
  subcategory: string[];
  usecase: string[];
  material: string[];
  thickness: string[];
  size: string[];
  warranty: string[];
  firmness: string[];
  brand: string[];
}

const USECASE_OPTIONS = [
  "orthopedic",
  "cooling",
  "couples",
  "pressure relief",
  "natural",
  "pillow",
  "sofa bed",
  "sofa"
];

const FUSE_KEYS = [
  "name",
  "description",
  "category",
  "subcategory",
  "features",
  "brand",
  "tags",
  "featureTiles.usp"
];

const hasSelectedFilters = (values?: string[]) => Boolean(values && values.length > 0);

const matchField = (value: string, selected?: string[]) => {
  if (!hasSelectedFilters(selected)) {
    return true;
  }

  return selected?.includes(value) ?? true;
};

/**
 * Pure catalogue helpers. These operate on an in-memory product array (loaded
 * from D1 on the server and passed to the client) so search/filter/sort stay
 * instant and client-side, with no per-keystroke network cost.
 */
export const productService = {
  getFeaturedProducts(products: Product[], count = 6): Product[] {
    return products.slice(0, count);
  },

  getRelatedProducts(products: Product[], product: Product, count = 4): Product[] {
    return products
      .filter(
        (candidate) =>
          candidate.id !== product.id && candidate.subcategory === product.subcategory
      )
      .slice(0, count);
  },

  searchProducts(products: Product[], query: string): Product[] {
    if (!query.trim()) {
      return products;
    }

    const fuse = new Fuse(products, { includeScore: true, threshold: 0.3, keys: FUSE_KEYS });
    return fuse.search(query).map((result) => result.item);
  },

  filterProducts(products: Product[], filters: ProductFilters): Product[] {
    return products.filter((product) => {
      const sizeMatch =
        !hasSelectedFilters(filters.size) ||
        product.sizes.some((sizeOption) => filters.size?.includes(sizeOption));

      const warrantyMatch =
        !hasSelectedFilters(filters.warranty) ||
        filters.warranty?.some((warranty) => product.warranty.includes(warranty));

      const material = product.material ?? "";
      const thickness = product.thickness ?? "";
      const firmness = product.firmness ?? "";
      const usecaseMatch =
        !hasSelectedFilters(filters.usecase) ||
        filters.usecase?.some((usecase) =>
          product.tags?.some((tag) => tag.toLowerCase() === usecase.toLowerCase())
        );

      return (
        matchField(product.category, filters.category) &&
        matchField(product.subcategory, filters.subcategory) &&
        usecaseMatch &&
        matchField(material, filters.material) &&
        matchField(thickness, filters.thickness) &&
        matchField(firmness, filters.firmness) &&
        matchField(product.brand, filters.brand) &&
        sizeMatch &&
        warrantyMatch
      );
    });
  },

  sortProducts(products: Product[], sortBy: string): Product[] {
    const sorted = [...products];

    if (sortBy === "name-asc") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "name-desc") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (sortBy === "warranty-desc") {
      sorted.sort((a, b) => Number.parseInt(b.warranty, 10) - Number.parseInt(a.warranty, 10));
    }

    return sorted;
  },

  buildFilterOptions(products: Product[]): ProductFilterOptions {
    const unique = (selector: (value: Product) => string | undefined) =>
      Array.from(
        new Set(products.map(selector).filter((item): item is string => Boolean(item)))
      ).sort();

    return {
      category: unique((item) => item.category),
      subcategory: unique((item) => item.subcategory),
      usecase: USECASE_OPTIONS,
      material: unique((item) => item.material),
      thickness: unique((item) => item.thickness),
      size: Array.from(new Set(products.flatMap((item) => item.sizes))).sort(),
      warranty: unique((item) => item.warranty),
      firmness: unique((item) => item.firmness),
      brand: unique((item) => item.brand)
    };
  }
};
