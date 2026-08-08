import { Building2, Headset, ShieldCheck, Truck } from "lucide-react";

import { FadeUp, StaggerChild, StaggerChildren } from "@/components/animation/motion-primitives";
import { CategoryGallery } from "@/components/home/category-gallery";
import { FeaturedCollection } from "@/components/home/featured-collection";
import { FeelTheDifference } from "@/components/home/feel-the-difference";
import { FinalCta } from "@/components/home/final-cta";
import { HeroSection } from "@/components/home/hero-section";
import { InsideTheMattress } from "@/components/home/inside-the-mattress";
import { ShowroomCta } from "@/components/home/showroom-cta";
import { SleepSelector } from "@/components/home/sleep-selector";
import { TestimonialsScroller } from "@/components/home/testimonials-scroller";
import testimonialsData from "@/data/testimonials.json";
import { productService } from "@/services/product-service";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata(
  "Home",
  "A premium digital showroom for mattresses engineered around the way you sleep."
);

const serviceHighlights = [
  {
    icon: ShieldCheck,
    title: "Authorized Dealer",
    desc: "Genuine products with warranty-backed assurance."
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    desc: "Careful dispatch coordinated by our showroom team."
  },
  {
    icon: Headset,
    title: "Expert Consultation",
    desc: "Guided recommendations before you decide."
  },
  {
    icon: Building2,
    title: "Store Experience",
    desc: "Feel every comfort level with in-store demos."
  }
];

export default function Home() {
  const stories = [
    ...testimonialsData.default,
    ...productService
      .getAllProducts()
      .flatMap((product) => product.testimonials ?? [])
      .slice(0, 8)
  ];

  return (
    <>
      <HeroSection />
      <SleepSelector />
      <CategoryGallery />
      <FeaturedCollection />
      <InsideTheMattress />
      <FeelTheDifference />

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeUp className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Why Choose Us
            </p>
            <h2 className="mt-3 font-heading text-4xl text-secondary md:text-5xl">
              A better way to buy a mattress.
            </h2>
          </FadeUp>
          <StaggerChildren className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {serviceHighlights.map((item) => (
              <StaggerChild
                key={item.title}
                className="flex flex-col items-center rounded-[var(--radius-card)] border border-border bg-white p-8 text-center shadow-soft"
              >
                <item.icon className="h-9 w-9 text-primary" />
                <h3 className="mt-4 font-heading text-2xl text-secondary">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </StaggerChild>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <ShowroomCta />

      <TestimonialsScroller items={stories} />

      <FinalCta />
    </>
  );
}
