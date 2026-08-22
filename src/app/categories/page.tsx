import { CategoryBrowser } from "@/components/catalogue/category-browser";
import { SectionHeading } from "@/components/home/section-heading";
import { listCategories } from "@/lib/db/categories";
import { createMetadata } from "@/utils/metadata";

export const dynamic = "force-dynamic";

export const metadata = createMetadata("Categories", "Explore all mattress and accessory categories.");

export default async function CategoriesPage() {
  const categories = await listCategories();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 md:px-8">
      <SectionHeading
        eyebrow="All Categories"
        title="Explore Product Categories"
        description="Find your ideal comfort range by mattress type, build material, and use case."
      />
      <CategoryBrowser categories={categories} />
    </div>
  );
}
