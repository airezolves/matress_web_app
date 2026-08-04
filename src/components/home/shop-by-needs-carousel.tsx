"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Link from "next/link";

type NeedCard = {
  title: string;
  subtitle: string;
  image: string;
  href: string;
};

const needs: NeedCard[] = [
  {
    title: "Natural Collection",
    subtitle: "Breathable comfort for daily sleep",
    image: "/images/home_page/needs/natural_collection.png",
    href: "/products?subcategory=Latex+Mattress"
  },
  {
    title: "Back Support",
    subtitle: "Orthopaedic support for alignment",
    image: "/images/home_page/needs/back_support.png",
    href: "/products?subcategory=Spring+Mattress"
  },
  {
    title: "No Partner Disturbance",
    subtitle: "Low-motion-transfer comfort choices",
    image: "/images/home_page/needs/no_partner_disturbance.png",
    href: "/products?subcategory=Spring+Mattress"
  },
  {
    title: "Reversible",
    subtitle: "Dual-comfort options in one mattress",
    image: "/images/home_page/needs/reversible.png",
    href: "/products?subcategory=Foam+Mattress"
  },
  {
    title: "Cooling Comfort",
    subtitle: "Heat-friendly materials for summer",
    image: "/images/home_page/needs/cooling_comfort.png",
    href: "/products?subcategory=Foam+Mattress"
  },
  {
    title: "Firm Coir Feel",
    subtitle: "Structured support and durability",
    image: "/images/products/coir/wave-body-align-coir-2.png",
    href: "/products?subcategory=Coir+Mattress"
  },
  {
    title: "Sleep Accessories",
    subtitle: "Pillows and essentials for better rest",
    image: "/images/home_page/needs/sleep_accessories.png",
    href: "/products?subcategory=Pillows"
  }
];

const loopedNeeds = [...needs, ...needs];
const SWITCH_MS = 2400;

export function ShopByNeedsCarousel() {
  const railRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    const getStep = () => {
      const firstCard = rail.querySelector("[data-need-card='true']") as HTMLAnchorElement | null;
      if (!firstCard) {
        return 0;
      }
      const gap = 12;
      return firstCard.getBoundingClientRect().width + gap;
    };

    const timer = window.setInterval(() => {
      const step = getStep();
      if (!step) {
        return;
      }

      const half = rail.scrollWidth / 2;
      const next = rail.scrollLeft + step;

      if (next >= half) {
        // Snap to the mirrored start so the loop feels infinite.
        rail.scrollTo({ left: 0, behavior: "auto" });
        return;
      }

      rail.scrollTo({ left: next, behavior: "smooth" });
    }, SWITCH_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="px-4 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-heading text-4xl text-secondary md:text-5xl">Shop By Needs</h2>
        <div className="mx-auto mt-3 h-1 w-36 rounded-full bg-gradient-to-r from-sky-400 via-fuchsia-400 to-orange-400" />

        <div
          ref={railRef}
          className="mt-8 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Shop by needs auto-scroll carousel"
        >
          {loopedNeeds.map((item, index) => (
            <Link
              key={`${item.title}-${index}`}
              href={item.href}
              data-need-card="true"
              className="group min-w-[84%] shrink-0 sm:min-w-[47%] lg:basis-[calc((100%-2.25rem)/4)] lg:min-w-0 lg:max-w-[calc((100%-2.25rem)/4)]"
            >
              <div className="overflow-hidden rounded-none border border-border/60 bg-white shadow-soft">
                <div className="relative h-56 bg-card md:h-64">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              <h3 className="mt-4 text-3xl font-semibold text-secondary">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>
              <div className="mt-3 h-1 w-full rounded-full bg-gradient-to-r from-sky-400 via-fuchsia-400 to-orange-400" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
