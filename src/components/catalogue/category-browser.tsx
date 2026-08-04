"use client";

import { useMemo, useState } from "react";

import { CategoryCard } from "@/components/catalogue/category-card";
import { Input } from "@/components/ui/input";
import type { Category } from "@/types/category";

export function CategoryBrowser({ categories }: { categories: Category[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return categories;
    }

    const normalized = query.trim().toLowerCase();
    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(normalized) ||
        category.description.toLowerCase().includes(normalized)
    );
  }, [categories, query]);

  return (
    <div className="space-y-6">
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search categories"
        aria-label="Search categories"
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((category, index) => (
          <CategoryCard key={category.id} category={category} index={index} />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">Showing {filtered.length} categories</p>
    </div>
  );
}
