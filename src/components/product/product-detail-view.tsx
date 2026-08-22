"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Headset, Layers, Leaf, ShieldCheck, Sparkles, Star } from "lucide-react";

import { FadeUp, StaggerChild, StaggerChildren } from "@/components/animation/motion-primitives";
import { ProductCard } from "@/components/catalogue/product-card";
import { AddToInquiryButton } from "@/components/inquiry/add-to-inquiry-button";
import testimonialsData from "@/data/testimonials.json";
import { cn } from "@/lib/utils";
import type { Product, ProductTestimonial } from "@/types/product";

const AUTO_ROTATE_MS = 4200;
const EASE = [0.22, 1, 0.36, 1] as const;
const TILE_ICONS = [Sparkles, Layers, Star, Leaf];

type TabKey = "description" | "size" | "thickness";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const reduce = useReducedMotion();
  const images = product.images.length > 0 ? product.images : ["/images/products/spring-signature.svg"];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>("description");

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }
    const timer = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % images.length);
    }, AUTO_ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [images.length]);

  const currentImage = images[activeImageIndex] ?? images[0];

  const featureTiles = useMemo(
    () => [
      {
        label: "Feel",
        value: product.featureTiles?.feel ?? product.comfort ?? "Medium Soft"
      },
      {
        label: "Cover Type",
        value: product.featureTiles?.coverType ?? "Premium quilted top fabric"
      },
      {
        label: "USP",
        value:
          product.featureTiles?.usp ??
          "Breathable support layers and orthopaedic pressure balancing"
      },
      {
        label: "Core Material",
        value:
          product.featureTiles?.coreMaterial ??
          [product.material, product.firmness].filter(Boolean).join(" | ") ??
          "Comfort core with durable support base"
      }
    ],
    [product]
  );

  const normalizedSizes = product.sizes.map((size) => size.split("-")[0]);
  const thicknessValue = product.thickness.replace(/\s*inch(es)?\s*/i, "").trim();

  const tabs: Array<{ key: TabKey; label: string }> = [
    { key: "description", label: "Description" },
    { key: "size", label: "Sizes" },
    { key: "thickness", label: "Thickness" }
  ];

  const testimonials = useMemo<ProductTestimonial[]>(() => {
    const configured =
      testimonialsData.byProduct[product.slug as keyof typeof testimonialsData.byProduct];

    if (configured && configured.length > 0) {
      return configured as ProductTestimonial[];
    }
    if (product.testimonials && product.testimonials.length > 0) {
      return product.testimonials;
    }
    return testimonialsData.default as ProductTestimonial[];
  }, [product.slug, product.testimonials]);

  const supportItems = [
    { icon: ShieldCheck, title: "Trusted Warranty", subtitle: "Years of worry-free comfort" },
    { icon: Headset, title: "Expert Support", subtitle: "Guidance whenever you need it" }
  ];

  const warrantyBadge = product.commercial?.warrantyBadge ?? `${product.warranty} Warranty`;

  const showPrev = () =>
    setActiveImageIndex((current) => (current - 1 + images.length) % images.length);
  const showNext = () => setActiveImageIndex((current) => (current + 1) % images.length);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      {/* Hero: sticky gallery + scrolling details */}
      <section className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-border bg-gradient-to-br from-brand-ivory via-white to-brand-lavender">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImageIndex}
                initial={reduce ? false : { opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="absolute inset-0"
              >
                <Image src={currentImage} alt={product.name} fill className="object-contain p-8" priority />
              </motion.div>
            </AnimatePresence>

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={showPrev}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-secondary shadow-soft backdrop-blur transition hover:scale-105"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-secondary shadow-soft backdrop-blur transition hover:scale-105"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-secondary/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  {activeImageIndex + 1} / {images.length}
                </div>
              </>
            ) : null}
          </div>

          {images.length > 1 ? (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1 no-scrollbar">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                  className={cn(
                    "relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border transition",
                    index === activeImageIndex
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-border opacity-70 hover:opacity-100"
                  )}
                >
                  <Image src={image} alt="" fill className="object-contain p-2" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <FadeUp>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {product.subcategory}
            </p>
            <h1 className="mt-3 font-heading text-4xl leading-tight text-secondary md:text-6xl">
              {product.name}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              {product.shortDescription ?? product.description}
            </p>
          </FadeUp>

          <FadeUp delay={0.08} className="mt-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 font-semibold text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              {warrantyBadge}
            </span>
            <span className="rounded-full border border-border px-3 py-1.5 text-muted-foreground">
              {product.thickness}
            </span>
            {product.firmness ? (
              <span className="rounded-full border border-border px-3 py-1.5 text-muted-foreground">
                {product.firmness}
              </span>
            ) : null}
          </FadeUp>

          <StaggerChildren className="mt-8 grid gap-3 sm:grid-cols-2">
            {featureTiles.map((tile, index) => {
              const Icon = TILE_ICONS[index % TILE_ICONS.length];
              return (
                <StaggerChild
                  key={tile.label}
                  className="rounded-2xl border border-border bg-white p-5 shadow-soft"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {tile.label}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-secondary">{tile.value}</p>
                </StaggerChild>
              );
            })}
          </StaggerChildren>

          <FadeUp delay={0.1} className="mt-8">
            <AddToInquiryButton productId={product.id} />
          </FadeUp>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {supportItems.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-secondary">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product details tabs */}
      <section className="mt-20 rounded-[2.5rem] border border-border bg-white p-8 shadow-soft md:p-12">
        <FadeUp>
          <h2 className="font-heading text-3xl text-secondary md:text-4xl">Product Details</h2>
        </FadeUp>

        <div className="mt-6 flex gap-8 border-b border-border">
          {tabs.map((tab) => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "relative pb-3 text-base font-semibold transition",
                  active ? "text-secondary" : "text-muted-foreground hover:text-secondary"
                )}
              >
                {tab.label}
                {active ? (
                  <motion.span
                    layoutId="product-tab-underline"
                    className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary"
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          {activeTab === "description" ? (
            <p className="max-w-4xl text-base leading-8 text-secondary/80 md:text-lg">
              {product.description}
            </p>
          ) : null}

          {activeTab === "size" ? (
            <div className="flex flex-wrap gap-2.5">
              {normalizedSizes.map((size) => (
                <span
                  key={size}
                  className="inline-flex items-center rounded-full border border-primary/35 bg-brand-ivory px-4 py-2 text-sm font-semibold text-secondary"
                >
                  {size}
                </span>
              ))}
            </div>
          ) : null}

          {activeTab === "thickness" ? (
            <div className="inline-flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-primary/40 bg-brand-ivory text-2xl font-bold text-secondary">
              {thicknessValue}
              <span className="text-xs font-semibold text-muted-foreground">inches</span>
            </div>
          ) : null}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-20">
        <FadeUp className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Sleepers Speak</p>
          <h2 className="mt-3 font-heading text-4xl text-secondary md:text-5xl">
            Stories of comfort.
          </h2>
        </FadeUp>
        <StaggerChildren className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <StaggerChild
              key={`${item.author}-${index}`}
              className="rounded-3xl border border-border bg-white p-6 shadow-soft"
            >
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className={cn(
                      "h-4 w-4",
                      starIndex < item.rating ? "fill-accent" : "fill-none text-border"
                    )}
                  />
                ))}
              </div>
              <h3 className="mt-4 font-heading text-xl text-secondary">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary/75">
                &ldquo;{item.quote}&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-secondary">— {item.author}</p>
            </StaggerChild>
          ))}
        </StaggerChildren>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 ? (
        <section className="mt-20">
          <FadeUp className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Explore More
              </p>
              <h2 className="mt-3 font-heading text-4xl text-secondary md:text-5xl">
                You may also like.
              </h2>
            </div>
          </FadeUp>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedProducts.slice(0, 3).map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
