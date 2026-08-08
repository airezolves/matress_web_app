"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { FadeUp } from "@/components/animation/motion-primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

type GalleryCategory = {
  number: string;
  name: string;
  description: string;
  image: string;
  href: string;
};

const categories: GalleryCategory[] = [
  {
    number: "01",
    name: "Spring Collection",
    description: "Responsive support. Cooler sleep.",
    image: "/images/home_page/product_categories/spring-mattresses.svg",
    href: "/products?subcategory=Spring+Mattress"
  },
  {
    number: "02",
    name: "Foam Collection",
    description: "Adaptive contouring for pressure relief.",
    image: "/images/home_page/product_categories/foam-mattresses.svg",
    href: "/products?subcategory=Foam+Mattress"
  },
  {
    number: "03",
    name: "Latex Collection",
    description: "Natural breathability and resilience.",
    image: "/images/home_page/product_categories/latex-mattresses.svg",
    href: "/products?subcategory=Latex+Mattress"
  },
  {
    number: "04",
    name: "Orthopedic",
    description: "Zoned alignment for deeper support.",
    image: "/images/home_page/product_categories/orthopaedic.svg",
    href: "/products?subcategory=Coir+Mattress"
  },
  {
    number: "05",
    name: "Pillows & Accessories",
    description: "Finishing touches for better rest.",
    image: "/images/home_page/product_categories/pillows.svg",
    href: "/products?subcategory=Pillows"
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

        <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
              className="group relative h-[460px] w-[78vw] shrink-0 overflow-hidden rounded-[2rem] border border-border bg-brand-neutral transition-all duration-500 sm:w-[52vw] md:w-[40%] lg:w-[30%] md:hover:w-[42%]"
            >
              <Link href={category.href} className="block h-full w-full">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-lavender/30 to-brand-neutral" />
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain p-12 transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/10 to-transparent opacity-80" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <p className="font-heading text-2xl text-white/60">{category.number}</p>
                  <h3 className="mt-1 font-heading text-3xl">{category.name}</h3>
                  <p className="mt-2 max-w-xs text-sm text-white/80">{category.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    Explore Collection
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
