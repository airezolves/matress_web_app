"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { ProductFilters } from "@/services/product-service";

interface FiltersOptionMap {
  category: string[];
  subcategory: string[];
  material: string[];
  comfort: string[];
  thickness: string[];
  size: string[];
  warranty: string[];
  firmness: string[];
  brand: string[];
}

interface ProductFiltersProps {
  query: string;
  onQueryChange: (value: string) => void;
  filters: ProductFilters;
  options: FiltersOptionMap;
  onFilterChange: (field: keyof ProductFilters, value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  clearFilters: () => void;
}

export function ProductFiltersPanel({
  query,
  onQueryChange,
  filters,
  options,
  onFilterChange,
  sortBy,
  onSortChange,
  clearFilters
}: ProductFiltersProps) {
  const map: Array<{ key: keyof ProductFilters; label: string }> = [
    { key: "category", label: "Category" },
    { key: "subcategory", label: "Subcategory" },
    { key: "material", label: "Material" },
    { key: "comfort", label: "Comfort" },
    { key: "thickness", label: "Thickness" },
    { key: "size", label: "Size" },
    { key: "warranty", label: "Warranty" },
    { key: "firmness", label: "Firmness" },
    { key: "brand", label: "Brand" }
  ];

  return (
    <div className="rounded-[var(--radius-card)] border border-border/80 bg-white/90 p-5 shadow-soft">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by name, feature, category, brand..."
          aria-label="Search products"
          className="lg:col-span-3"
        />

        {map.map((entry) => (
          <Select
            key={entry.key}
            value={filters[entry.key]?.[0] ?? ""}
            onChange={(event) => onFilterChange(entry.key, event.target.value)}
            aria-label={entry.label}
          >
            <option value="">All {entry.label}</option>
            {options[entry.key].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        ))}

        <Select value={sortBy} onChange={(event) => onSortChange(event.target.value)} aria-label="Sort products">
          <option value="name-asc">Sort: Name A-Z</option>
          <option value="name-desc">Sort: Name Z-A</option>
          <option value="warranty-desc">Sort: Warranty High-Low</option>
        </Select>
      </div>

      <div className="mt-4 flex justify-end">
        <Button variant="ghost" onClick={clearFilters}>
          <X className="h-4 w-4" />
          Clear filters
        </Button>
      </div>
    </div>
  );
}
