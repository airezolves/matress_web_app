import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeUp, ScaleIn } from "@/components/animation/motion-primitives";
import { ProductCard } from "@/components/catalogue/product-card";
import { Button } from "@/components/ui/button";
import { productService } from "@/services/product-service";

export function FeaturedCollection() {
  const [feature, ...rest] = productService.getFeaturedProducts();
  const supporting = rest.slice(0, 3);

  if (!feature) {
    return null;
  }

  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeUp className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Featured</p>
            <h2 className="mt-3 font-heading text-4xl text-secondary md:text-6xl">The Collection</h2>
          </div>
          <Link href="/products">
            <Button variant="outline" className="group">
              View All
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </FadeUp>

        <ScaleIn className="relative overflow-hidden rounded-[2.5rem] border border-border bg-gradient-to-br from-brand-ivory via-white to-brand-lavender">
          <div className="grid items-center gap-8 p-8 md:grid-cols-2 md:p-12">
            <div className="relative order-2 aspect-[4/3] w-full md:order-1">
              <Image
                src={feature.images[0]}
                alt={feature.name}
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {feature.subcategory}
              </span>
              <h3 className="mt-4 font-heading text-4xl text-secondary md:text-5xl">
                {feature.name}
              </h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                {feature.shortDescription ?? feature.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={`/products/${feature.slug}`}>
                  <Button className="group">
                    View Product
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </ScaleIn>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {supporting.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
