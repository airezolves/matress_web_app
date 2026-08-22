import { useMemo } from "react";

import { productService, type ProductFilters } from "@/services/product-service";
import type { Product } from "@/types/product";

interface UseProductsParams {
  products: Product[];
  query: string;
  filters: ProductFilters;
  sortBy: string;
}

export function useProducts({ products, query, filters, sortBy }: UseProductsParams) {
  return useMemo(() => {
    const searched = productService.searchProducts(products, query);
    const filtered = productService.filterProducts(searched, filters);
    const sorted = productService.sortProducts(filtered, sortBy);

    return sorted;
  }, [products, filters, query, sortBy]);
}
