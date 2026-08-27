"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  Box,
  Gauge,
  Layers,
  type LucideIcon,
  Maximize2,
  Ruler,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Tag,
  X
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { ProductFilters } from "@/services/product-service";

interface FiltersOptionMap {
  category: string[];
  subcategory: string[];
  material: string[];
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

// Secondary, less-frequently-used filters tucked behind the "Filters" toggle.
const ADVANCED_FILTERS: Array<{ key: keyof ProductFilters; label: string; icon: LucideIcon }> = [
  { key: "subcategory", label: "Subcategory", icon: Layers },
  { key: "material", label: "Material", icon: Box },
  { key: "thickness", label: "Thickness", icon: Ruler },
  { key: "size", label: "Size", icon: Maximize2 },
  { key: "warranty", label: "Warranty", icon: ShieldCheck },
  { key: "firmness", label: "Firmness", icon: Gauge },
  { key: "brand", label: "Brand", icon: Tag }
];

const ALL_FIELDS: Array<keyof ProductFilters> = ["category", ...ADVANCED_FILTERS.map((entry) => entry.key)];

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
  const [showAdvanced, setShowAdvanced] = useState(false);
  const selectedCategory = filters.category?.[0] ?? "";

  const activeCount = useMemo(
    () => ALL_FIELDS.filter((key) => (filters[key]?.[0] ?? "") !== "").length,
    [filters]
  );

  const activeChips = useMemo(
    () =>
      ADVANCED_FILTERS.filter((entry) => (filters[entry.key]?.[0] ?? "") !== "").map((entry) => ({
        key: entry.key,
        label: entry.label,
        value: filters[entry.key]?.[0] ?? ""
      })),
    [filters]
  );

  return (
    <div className="rounded-[2rem] border border-border/80 bg-white/95 p-5 shadow-soft sm:p-6">
      {/* Search + sort + advanced-filter toggle */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search by name, feature, category, brand..."
            aria-label="Search products"
            className="h-12 rounded-2xl pl-11 pr-10 text-[0.95rem]"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition hover:bg-card hover:text-secondary"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1 sm:w-52 sm:flex-none">
            <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Select
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value)}
              aria-label="Sort products"
              className="h-12 rounded-2xl pl-9"
            >
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="warranty-desc">Warranty High-Low</option>
            </Select>
          </div>

          <button
            type="button"
            onClick={() => setShowAdvanced((open) => !open)}
            aria-expanded={showAdvanced}
            className={`inline-flex h-12 shrink-0 items-center gap-2 rounded-2xl border px-4 text-sm font-semibold transition active:scale-[0.98] ${
              showAdvanced
                ? "border-primary bg-primary text-white shadow-soft"
                : "border-border bg-white text-secondary hover:border-primary/50"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeCount > 0 && (
              <span
                className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold ${
                  showAdvanced ? "bg-white text-primary" : "bg-primary text-white"
                }`}
              >
                {activeCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Quick category pills, sourced directly from the live catalogue categories */}
      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <CategoryPill
          label="All Categories"
          active={selectedCategory === ""}
          onClick={() => onFilterChange("category", "")}
        />
        {options.category.map((category) => (
          <CategoryPill
            key={category}
            label={category}
            active={selectedCategory === category}
            onClick={() => onFilterChange("category", selectedCategory === category ? "" : category)}
          />
        ))}
      </div>

      {/* Advanced filters, collapsed by default to keep the panel compact */}
      {showAdvanced && (
        <div className="mt-5 grid gap-4 border-t border-border/70 pt-5 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANCED_FILTERS.map(({ key, label, icon: Icon }) => (
            <label key={key} className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <Icon className="h-3.5 w-3.5" />
                {label}
              </span>
              <Select value={filters[key]?.[0] ?? ""} onChange={(event) => onFilterChange(key, event.target.value)}>
                <option value="">All {label}</option>
                {options[key].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </label>
          ))}
        </div>
      )}

      {/* Active filter chips + clear-all */}
      {(activeChips.length > 0 || selectedCategory) && (
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border/70 pt-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Active:</span>
          {selectedCategory && (
            <Chip label={`Category: ${selectedCategory}`} onRemove={() => onFilterChange("category", "")} />
          )}
          {activeChips.map((chip) => (
            <Chip
              key={chip.key}
              label={`${chip.label}: ${chip.value}`}
              onRemove={() => onFilterChange(chip.key, "")}
            />
          ))}
          <button
            type="button"
            onClick={clearFilters}
            className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-primary transition hover:text-primary-strong"
          >
            <X className="h-3.5 w-3.5" />
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}

function CategoryPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${
        active
          ? "border-primary bg-primary text-white shadow-soft"
          : "border-border bg-white text-secondary hover:border-primary/50"
      }`}
    >
      {label}
    </button>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-lavender/60 px-3 py-1.5 text-xs font-medium text-secondary">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="rounded-full p-0.5 transition hover:bg-white/70"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}
