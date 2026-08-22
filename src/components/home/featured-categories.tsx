import { CategoryCard } from "@/components/catalogue/category-card";
import { SectionHeading } from "@/components/home/section-heading";
import { listCategories } from "@/lib/db/categories";

export async function FeaturedCategories() {
  const categories = await listCategories();

  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Categories"
          title="Curated Sleep Collections"
          description="Browse premium categories to match your comfort profile and bedroom requirements."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
