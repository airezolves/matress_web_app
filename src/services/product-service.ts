import Fuse from "fuse.js";

import categories from "@/data/categories.json";
import { products } from "@/data/products";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

export interface ProductFilters {
  category?: string[];
  subcategory?: string[];
  material?: string[];
  comfort?: string[];
  thickness?: string[];
  size?: string[];
  warranty?: string[];
  firmness?: string[];
  brand?: string[];
}

const fuse = new Fuse(products, {
  includeScore: true,
  threshold: 0.3,
  keys: ["name", "description", "category", "subcategory", "features", "brand", "tags", "featureTiles.usp"]
});

const hasSelectedFilters = (values?: string[]) => Boolean(values && values.length > 0);

const matchField = (value: string, selected?: string[]) => {
  if (!hasSelectedFilters(selected)) {
    return true;
  }

  return selected?.includes(value) ?? true;
};

export const productService = {
  getAllProducts(): Product[] {
    return products;
  },

  getFeaturedProducts(): Product[] {
    return products.slice(0, 6);
  },

  getRelatedProducts(product: Product): Product[] {
    return products
      .filter((candidate) => candidate.id !== product.id && candidate.subcategory === product.subcategory)
      .slice(0, 4);
  },

  getAllCategories(): Category[] {
    return categories as Category[];
  },

  getProductBySlug(slug: string): Product | undefined {
    return products.find((product) => product.slug === slug);
  },

  searchProducts(query: string): Product[] {
    if (!query.trim()) {
      return products;
    }

    return fuse.search(query).map((result) => result.item);
  },

  filterProducts(initialProducts: Product[], filters: ProductFilters): Product[] {
    return initialProducts.filter((product) => {
      const sizeMatch =
        !hasSelectedFilters(filters.size) ||
        product.sizes.some((sizeOption) => filters.size?.includes(sizeOption));

      const warrantyMatch =
        !hasSelectedFilters(filters.warranty) ||
        filters.warranty?.some((warranty) => product.warranty.includes(warranty));

      const material = product.material ?? "";
      const comfort = product.comfort ?? "";
      const thickness = product.thickness ?? "";
      const firmness = product.firmness ?? "";

      return (
        matchField(product.category, filters.category) &&
        matchField(product.subcategory, filters.subcategory) &&
        matchField(material, filters.material) &&
        matchField(comfort, filters.comfort) &&
        matchField(thickness, filters.thickness) &&
        matchField(firmness, filters.firmness) &&
        matchField(product.brand, filters.brand) &&
        sizeMatch &&
        warrantyMatch
      );
    });
  },

  sortProducts(list: Product[], sortBy: string): Product[] {
    const sorted = [...list];

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
  }
};
