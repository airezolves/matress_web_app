"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { FadeUp } from "@/components/animation/motion-primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

type GalleryCategory = {
  name: string;
  description: string;
  image: string;
  href: string;
  imageFit?: "contain" | "cover";
};

const categories: GalleryCategory[] = [
  {
    name: "Spring Collection",
    description: "Responsive support. Cooler sleep.",
    image: "/images/home_page/product_categories/spring-mattress.jpg",
    href: "/products?subcategory=Spring+Mattress",
    imageFit: "cover",
  },
  {
    name: "Foam Collection",
    description: "Adaptive contouring for pressure relief.",
    image: "/images/home_page/product_categories/foam-mattress.jpg",
    href: "/products?subcategory=Foam+Mattress",
    imageFit: "cover"
  },
  {
    name: "Latex Collection",
    description: "Natural breathability and resilience.",
    image: "/images/home_page/product_categories/latex-mattress.jpg",
    href: "/products?subcategory=Latex+Mattress",
    imageFit: "cover",
  },
  {
    name: "Coir Collection",
    description: "Natural firmness and breathable support.",
    image: "/images/home_page/product_categories/coir-mattress.png",
    href: "/products?subcategory=Coir+Mattress",
    imageFit: "cover"
  }
];

export function CategoryGallery() {
  const reduce = useReducedMotion();

  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeUp className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            The Collections
          </p>
          <h2 className="mt-3 font-heading text-4xl text-secondary md:text-6xl">
            Explore by material and feel.
          </h2>
        </FadeUp>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
              className="group min-w-0 overflow-hidden rounded-[var(--radius-card)] border border-border/80 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-glow"
            >
              <Link href={category.href} className="flex h-full flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-neutral">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className={`transition-transform duration-700 ease-out group-hover:scale-105 ${
                      category.imageFit === "cover" ? "object-cover" : "object-contain p-8"
                    }`}
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading text-2xl leading-tight text-secondary">{category.name}</h3>
                  <p className="mt-2 min-h-10 text-sm leading-5 text-muted-foreground">
                    {category.description}
                  </p>
                  <span className="mt-5 inline-flex items-center justify-between border-t border-border/70 pt-4 text-sm font-semibold text-primary">
                    Explore collection
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-lavender/70 transition-colors group-hover:bg-primary group-hover:text-white">
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
