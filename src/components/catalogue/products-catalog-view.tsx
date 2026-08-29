"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import { ProductCard } from "@/components/catalogue/product-card";
import { productService, type ProductFilters } from "@/services/product-service";
import { useProducts } from "@/hooks/use-products";
import type { Product } from "@/types/product";

const ProductFiltersPanel = dynamic(
  () => import("@/components/catalogue/product-filters").then((module) => module.ProductFiltersPanel),
  { ssr: false }
);

const initialFilters: ProductFilters = {
  category: [],
  subcategory: [],
  usecase: [],
  material: [],
  thickness: [],
  size: [],
  warranty: [],
  firmness: [],
  brand: []
};

interface ProductsCatalogViewProps {
  initialProducts: Product[];
  initialQuery?: string;
  initialSubcategory?: string;
  initialFirmness?: string;
  initialUsecase?: string;
}

export function ProductsCatalogView({
  initialProducts,
  initialQuery = "",
  initialSubcategory = "",
  initialFirmness = "",
  initialUsecase = ""
}: ProductsCatalogViewProps) {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<ProductFilters>(() => ({
    ...initialFilters,
    subcategory: initialSubcategory ? [initialSubcategory] : [],
    firmness: initialFirmness ? [initialFirmness] : [],
    usecase: initialUsecase ? [initialUsecase] : []
  }));
  const [sortBy, setSortBy] = useState("name-asc");

  const products = useProducts({ products: initialProducts, query, filters, sortBy });

  const options = useMemo(() => productService.buildFilterOptions(initialProducts), [initialProducts]);

  const onFilterChange = (field: keyof ProductFilters, value: string) => {
    setFilters((current) => ({ ...current, [field]: value ? [value] : [] }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setQuery("");
    setSortBy("name-asc");
  };

  return (
    <div className="space-y-8">
      <ProductFiltersPanel
        query={query}
        onQueryChange={setQuery}
        filters={filters}
        options={options}
        onFilterChange={onFilterChange}
        sortBy={sortBy}
        onSortChange={setSortBy}
        clearFilters={clearFilters}
      />

      <p className="text-sm text-muted-foreground">Showing {products.length} matching products</p>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
