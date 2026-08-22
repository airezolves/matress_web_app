"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

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

  const [showFilters, setShowFilters] = useState(false);

  const activeCount = useMemo(
    () => map.filter((entry) => (filters[entry.key]?.[0] ?? "") !== "").length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters]
  );

  return (
    <div className="rounded-[var(--radius-card)] border border-border/80 bg-white/90 p-4 shadow-soft sm:p-5">
      <div className="flex flex-col gap-3">
        <Input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by name, feature, category, brand..."
          aria-label="Search products"
        />

        {/* Mobile: collapse the filter wall behind a toggle */}
        <button
          type="button"
          onClick={() => setShowFilters((open) => !open)}
          className="inline-flex h-11 items-center justify-between rounded-full border border-border bg-white px-4 text-sm font-semibold text-secondary active:scale-[0.98] md:hidden"
          aria-expanded={showFilters}
        >
          <span className="inline-flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-white">
                {activeCount}
              </span>
            )}
          </span>
          <span className="text-xs text-muted-foreground">{showFilters ? "Hide" : "Show"}</span>
        </button>
      </div>

      <div
        className={`${showFilters ? "grid" : "hidden"} mt-4 gap-3 md:mt-4 md:grid md:grid-cols-2 lg:grid-cols-3`}
      >
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
