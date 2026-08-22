"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import categoriesData from "@/data/product_categories.json";

type CategoryItem = {
  id: string;
  name: string;
  image: string;
  subcategory: string;
};

export function CategoryShowcase() {
  const categories = categoriesData as CategoryItem[];
  const railRef = useRef<HTMLDivElement | null>(null);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    const checkOverflow = () => setShowArrows(rail.scrollWidth > rail.clientWidth + 4);
    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(rail);
    window.addEventListener("resize", checkOverflow);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkOverflow);
    };
  }, [categories.length]);

  const scrollByAmount = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    rail.scrollBy({ left: direction * rail.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="px-4 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-heading text-4xl text-secondary md:text-5xl">Shop By Category</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground">
          Explore our mattress collections, each crafted for a different kind of comfort.
        </p>

        <div className="relative mt-10">
          {showArrows && (
            <button
              type="button"
              aria-label="Scroll categories left"
              onClick={() => scrollByAmount(-1)}
              className="absolute left-0 top-1/2 z-10 hidden -translate-x-4 -translate-y-1/2 rounded-full border border-border bg-white p-2 shadow-soft transition hover:bg-card md:flex"
            >
              <ChevronLeft className="h-5 w-5 text-secondary" />
            </button>
          )}

          {/* Wraps and centers while everything fits; switches to a scrollable single row only once categories overflow. */}
          <div
            ref={railRef}
            className={`flex gap-4 overflow-x-auto scroll-smooth px-1 pb-2 md:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              showArrows ? "snap-x snap-mandatory justify-start" : "flex-wrap justify-center"
            }`}
          >
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?subcategory=${encodeURIComponent(category.subcategory)}`}
                className="group flex w-32 shrink-0 snap-start flex-col items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg md:w-36"
              >
                <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-primary/10 to-secondary/5">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={140}
                    height={140}
                    className="relative h-[72%] w-[72%] object-contain transition-transform duration-300 ease-out group-hover:scale-110"
                  />
                </div>
                <span className="text-center text-sm font-semibold text-secondary group-hover:text-primary">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>

          {showArrows && (
            <button
              type="button"
              aria-label="Scroll categories right"
              onClick={() => scrollByAmount(1)}
              className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-4 rounded-full border border-border bg-white p-2 shadow-soft transition hover:bg-card md:flex"
            >
              <ChevronRight className="h-5 w-5 text-secondary" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
