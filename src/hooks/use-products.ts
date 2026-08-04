import { useMemo } from "react";

import { productService, type ProductFilters } from "@/services/product-service";

interface UseProductsParams {
  query: string;
  filters: ProductFilters;
  sortBy: string;
}

export function useProducts({ query, filters, sortBy }: UseProductsParams) {
  return useMemo(() => {
    const searched = productService.searchProducts(query);
    const filtered = productService.filterProducts(searched, filters);
    const sorted = productService.sortProducts(filtered, sortBy);

    return sorted;
  }, [filters, query, sortBy]);
}
