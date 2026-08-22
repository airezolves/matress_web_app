import { ProductCard } from "@/components/catalogue/product-card";
import { SectionHeading } from "@/components/home/section-heading";
import { listProducts } from "@/lib/db/products";
import { productService } from "@/services/product-service";

export async function FeaturedProducts() {
  const products = productService.getFeaturedProducts(await listProducts());

  return (
    <section className="bg-white/60 px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Featured"
          title="High-Demand Showroom Picks"
          description="A premium shortlist selected by our in-store sleep specialists."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
