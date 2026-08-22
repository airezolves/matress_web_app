"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, MoveRight, Sparkles } from "lucide-react";

import CardFanCarousel, { type CardItem } from "@/components/ui/card-fan-carousel";
import { ProductHeroVisual } from "@/components/home/product-hero-visual";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const heroCards: CardItem[] = [
  { imgUrl: "/images/home_page/product_categories/spring-mattresses.svg", alt: "Spring mattresses", linkUrl: "/products" },
  { imgUrl: "/images/home_page/product_categories/foam-mattresses.svg", alt: "Foam mattresses", linkUrl: "/products" },
  { imgUrl: "/images/home_page/product_categories/latex-mattresses.svg", alt: "Latex mattresses", linkUrl: "/products" },
  { imgUrl: "/images/home_page/product_categories/coir-mattresses.svg", alt: "Coir mattresses", linkUrl: "/products" },
  { imgUrl: "/images/home_page/product_categories/orthopaedic.svg", alt: "Orthopaedic range", linkUrl: "/products" },
  { imgUrl: "/images/home_page/product_categories/pillows.svg", alt: "Pillows", linkUrl: "/products" },
  { imgUrl: "/images/home_page/product_categories/accessories.svg", alt: "Sleep accessories", linkUrl: "/products" },
  { imgUrl: "/images/home_page/product_categories/mattress.png", alt: "Signature mattress", linkUrl: "/products" }
];

const trustStats = [
  { value: "20+ years", label: "of craftsmanship" },
  { value: "10,000+", label: "families rested" },
  { value: "4.8 / 5", label: "showroom rating" }
];

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.09, delayChildren: reduceMotion ? 0 : 0.05 }
    }
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.7, ease: EASE } }
  };

  return (
    <section className="relative overflow-hidden px-4 pb-6 pt-8 md:px-8 md:pt-12">
      {/* Ambient section glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 50% at 20% 10%, rgba(141,106,157,0.16), transparent 70%), radial-gradient(45% 45% at 90% 30%, rgba(91,53,104,0.14), transparent 65%)"
        }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        {/* Left: content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-accent backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5" />
            The Sleep Studio
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-secondary sm:text-5xl md:text-6xl"
          >
            Sleep better.
            <span className="block text-primary">Wake different.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0"
          >
            Explore a curated collection of mattresses, pillows and sleep essentials — crafted for
            comfort, chosen with care. Visit our showroom and feel the difference before you decide.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <Link href="/products" className={cn(buttonVariants({ size: "lg" }))}>
              Explore Collection
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/inquiry" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
              Find My Mattress
              <MoveRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-4 lg:mx-0"
          >
            {trustStats.map((stat) => (
              <div key={stat.value} className="text-center lg:text-left">
                <p className="text-lg font-semibold text-secondary sm:text-xl">{stat.value}</p>
                <p className="text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: realistic mattress render with subtle parallax + float */}
        <motion.div
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: EASE, delay: reduceMotion ? 0 : 0.2 }}
          className="hidden sm:block"
        >
          <ProductHeroVisual />
        </motion.div>
      </div>

      {/* 3D fan carousel of product categories */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.8, ease: EASE, delay: reduceMotion ? 0 : 0.3 }}
        className="mt-6 md:mt-10"
      >
        <CardFanCarousel cards={heroCards} />
      </motion.div>
    </section>
  );
}
