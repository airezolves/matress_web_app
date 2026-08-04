import { CategoryCard } from "@/components/catalogue/category-card";
import { SectionHeading } from "@/components/home/section-heading";
import { productService } from "@/services/product-service";

export function FeaturedCategories() {
  const categories = productService.getAllCategories();

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
