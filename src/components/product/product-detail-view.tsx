"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Headset, Layers, ShieldCheck, Star } from "lucide-react";

import { AddToInquiryButton } from "@/components/inquiry/add-to-inquiry-button";
import { Button } from "@/components/ui/button";
import testimonialsData from "@/data/testimonials.json";
import type { Product, ProductTestimonial } from "@/types/product";

const AUTO_ROTATE_MS = 3200;

type TabKey = "description" | "size" | "thickness";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  void relatedProducts;
  const images = product.images.length > 0 ? product.images : ["/images/products/spring-signature.svg"];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>("description");

  useEffect(() => {
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
        value: product.featureTiles?.usp ?? "Breathable support layers and orthopaedic pressure balancing"
      },
      {
        label: "Core Material",
        value: (
          product.featureTiles?.coreMaterial ??
          [product.material, product.firmness].filter(Boolean).join(" | ")
        ) || "Comfort core with durable support base"
      }
    ],
    [product]
  );

  const normalizedSizes = product.sizes.map((size) => size.split("-")[0]);
  const thicknessValue = product.thickness.replace(/\s*inch(es)?\s*/i, "").trim();

  const tabs: Array<{ key: TabKey; label: string; content: string }> = [
    { key: "description", label: "Description", content: product.description },
    { key: "size", label: "Size", content: "" },
    { key: "thickness", label: "Thickness", content: "" }
  ];

  const testimonials = useMemo(() => {
    const configured = testimonialsData.byProduct[product.slug as keyof typeof testimonialsData.byProduct];

    if (configured && configured.length > 0) {
      return configured as ProductTestimonial[];
    }

    if (product.testimonials && product.testimonials.length > 0) {
      return product.testimonials;
    }

    return testimonialsData.default as ProductTestimonial[];
  }, [product.slug, product.testimonials]);

  const supportItems = [
    {
      icon: ShieldCheck,
      title: "Trusted Warranty",
      subtitle: "Enjoy years of worry-free comfort"
    },
    {
      icon: Headset,
      title: "Support 24/7",
      subtitle: "Contact us anytime"
    }
  ];

  const commercial = {
    warrantyBadge: product.commercial?.warrantyBadge ?? `${product.warranty} Warranty`
  };

  const showPrev = () => {
    setActiveImageIndex((current) => (current - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setActiveImageIndex((current) => (current + 1) % images.length);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-14 px-4 py-10 md:px-8">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,2.15fr)_minmax(0,1fr)]">
        <div className="grid gap-5 md:grid-cols-[120px_1fr]">
          <div className="h-[620px] overflow-y-auto pr-1">
            <div className="space-y-2">
              {images.map((image, index) => {
                const active = index === activeImageIndex;

                return (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`group relative block h-[96px] w-full overflow-hidden rounded-lg transition ${
                      active ? "scale-[1.02] opacity-100" : "opacity-60"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} preview ${index + 1}`}
                      fill
                      className={`object-contain transition ${active ? "blur-0" : "blur-[1.4px]"}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative h-[500px] overflow-hidden md:h-[620px]">
            <Image src={currentImage} alt={product.name} fill className="object-contain" priority />

            <Button
              type="button"
              variant="secondary"
              onClick={showPrev}
              className="absolute left-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full p-0"
            >
                <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={showNext}
              className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full p-0"
            >
                <ChevronRight className="h-5 w-5" />
            </Button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1 text-xs text-white">
              {activeImageIndex + 1}/{images.length}
            </div>
          </div>
        </div>

        <div className="space-y-4 py-1">
          <h1 className="font-heading text-4xl leading-tight text-secondary md:text-5xl">{product.name.toUpperCase()}</h1>

          <p className="max-w-md font-body text-base font-normal leading-7 tracking-normal text-[#4b4b4b]">
            {product.shortDescription ?? product.description}
          </p>

          <div className="inline-flex rounded-xl bg-primary/10 px-4 py-2 text-sm font-semibold text-secondary">
            {commercial.warrantyBadge}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full border border-border px-3 py-1">{product.subcategory}</span>
            <span className="rounded-md border border-border px-2 py-1">{product.thickness}</span>
          </div>

          <AddToInquiryButton productId={product.id} />
        </div>
      </section>

      <section className="rounded-[var(--radius-card)] border border-border bg-[#f6f6f6] p-8 shadow-soft">
        <h2 className="border-l-4 border-primary pl-3 font-heading text-4xl text-secondary">Product Details</h2>
        <div className="mt-6 border-b border-secondary/20">
          <div className="flex gap-8">
            {tabs.map((tab) => {
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`border-b-2 pb-3 text-base font-semibold transition ${
                    active ? "border-primary text-secondary" : "border-transparent text-secondary/70"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === "description" ? (
          <>
            <p className="mt-6 max-w-4xl font-body text-base font-normal leading-8 tracking-normal text-[#3f3f3f] md:text-lg">
              {tabs[0].content}
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featureTiles.map((tile) => (
                <article key={tile.label} className="space-y-3 rounded-xl bg-white p-5 shadow-soft">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">
                    <Layers className="h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="font-body text-lg font-bold text-secondary">{tile.label}</h3>
                  <p className="font-body text-base font-normal leading-8 tracking-normal text-[#3f3f3f]">
                    {tile.value}
                  </p>
                </article>
              ))}
            </div>
          </>
        ) : null}

        {activeTab === "size" ? (
          <div className="mt-6 flex flex-wrap gap-2.5">
            {normalizedSizes.map((size) => (
              <span
                key={size}
                className="inline-flex items-center rounded-full border border-primary/35 bg-white px-4 py-2 text-sm font-semibold text-secondary"
              >
                {size}
              </span>
            ))}
          </div>
        ) : null}

        {activeTab === "thickness" ? (
          <div className="mt-6 inline-flex h-20 w-20 items-center justify-center rounded-md border border-primary/40 bg-white text-lg font-bold text-secondary">
            {thicknessValue}
            <span className="ml-0.5 text-xs font-semibold">in</span>
          </div>
        ) : null}
      </section>

      <section className="flex flex-wrap items-start justify-center gap-8 border-y border-border py-8 md:gap-14">
        {supportItems.map((item) => (
          <div key={item.title} className="w-[220px] text-center">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/25 bg-white">
              <item.icon className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="mt-3 text-xl font-semibold text-secondary">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.subtitle}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[var(--radius-card)] bg-[#f2f2f2] px-6 py-10 md:px-10">
        <h2 className="text-center font-heading text-5xl text-secondary">
          Stories of <span className="text-secondary/35">Restolex</span>
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={`${item.author}-${item.title}`} className="rounded-xl bg-white p-6 shadow-soft">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">❝</div>
              <h3 className="mt-4 text-3xl font-semibold text-secondary">{item.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-secondary/70">“{item.quote}”</p>
              <p className="mt-4 text-lg font-semibold text-secondary">- {item.author}</p>
              <div className="mt-3 flex text-orange-400">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
