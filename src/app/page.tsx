import Link from "next/link";
import { Building2, CircleCheck, Headset, ShieldCheck, Sparkles, Truck } from "lucide-react";

import { CategoryCard } from "@/components/catalogue/category-card";
import { ProductCard } from "@/components/catalogue/product-card";
import { ShopByNeedsCarousel } from "@/components/home/shop-by-needs-carousel";
import { ShopBySizeRow } from "@/components/home/shop-by-size-row";
import { SectionHeading } from "@/components/home/section-heading";
import testimonialsData from "@/data/testimonials.json";
import { Button } from "@/components/ui/button";
import { productService } from "@/services/product-service";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata("Home", "Premium mattress catalogue and lead generation platform.");

export default function Home() {
  const categories = productService.getAllCategories().slice(0, 6);
  const bestSellers = productService.getAllProducts().slice(0, 4);
  const stories = testimonialsData.default.slice(0, 3);

  const quickNeeds = [
    {
      title: "Back Pain Support",
      desc: "Orthopaedic picks with medium-firm spinal alignment",
      href: "/products?subcategory=Spring+Mattresses"
    },
    {
      title: "Cooling Comfort",
      desc: "Breathable and temperature-friendly mattress options",
      href: "/products?subcategory=Latex+Mattresses"
    },
    {
      title: "Firm Coir Support",
      desc: "Durable firm comfort for posture-first sleepers",
      href: "/products?subcategory=Coir+Mattresses"
    },
    {
      title: "Pillow & Accessories",
      desc: "Neck support and add-ons for complete sleep setup",
      href: "/products?subcategory=Pillows"
    }
  ];

  const serviceHighlights = [
    {
      icon: ShieldCheck,
      title: "Authorized Dealer",
      desc: "Genuine products with warranty-backed support"
    },
    {
      icon: Truck,
      title: "Reliable Delivery",
      desc: "Fast dispatch support coordinated by showroom team"
    },
    {
      icon: Headset,
      title: "Expert Consultation",
      desc: "Get guided recommendations before you decide"
    },
    {
      icon: Building2,
      title: "Store Experience",
      desc: "Try feel levels physically with in-store demos"
    }
  ];

  const faqItems = [
    {
      q: "Which mattress is best for back pain?",
      a: "Start with medium-firm orthopaedic or support-focused spring models for spinal alignment."
    },
    {
      q: "What thickness should I choose?",
      a: "For most adults, 8 to 10 inch mattresses are ideal for comfort and long-term support."
    },
    {
      q: "Can I compare models before finalizing?",
      a: "Yes. We help you compare comfort, material, warranty, and use-case before inquiry submission."
    }
  ];

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-14 pt-12 md:px-8 md:pb-20 md:pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(138,43,143,0.12),transparent_34%),radial-gradient(circle_at_90%_18%,rgba(197,161,91,0.16),transparent_32%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Premium Sleep Consultation
            </p>
            <h1 className="mt-5 max-w-3xl font-heading text-5xl leading-[1.03] text-secondary md:text-7xl">
              Find Your Best Mattress Without Guesswork
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Compare comfort levels, materials, and support profiles the smart way. Explore curated
              Restolex collections with showroom-backed guidance.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/products">
                <Button>Explore Mattresses</Button>
              </Link>
              <Link href="/inquiry">
                <Button variant="outline">Get Expert Recommendation</Button>
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-2 text-xs text-muted-foreground md:text-sm">
              <span className="rounded-full border border-border bg-white px-3 py-1">100% Genuine</span>
              <span className="rounded-full border border-border bg-white px-3 py-1">Warranty Guidance</span>
              <span className="rounded-full border border-border bg-white px-3 py-1">In-Store Trial Support</span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/70 bg-white/90 p-6 shadow-glow md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Shop By Need</p>
            <div className="mt-4 space-y-3">
              {quickNeeds.map((need) => (
                <Link
                  key={need.title}
                  href={need.href}
                  className="block rounded-xl border border-border/70 bg-card px-4 py-3 transition hover:border-primary/35"
                >
                  <p className="font-semibold text-secondary">{need.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{need.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ShopByNeedsCarousel />

      <ShopBySizeRow />

      <section className="px-4 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Top Categories"
            title="Shop Mattress Collections"
            description="Category-first navigation inspired by leading sleep brands for faster discovery."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Best Sellers"
            title="Most Inquired Models"
            description="High-interest options with comfort-focused feature sets and showroom verification support."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 rounded-[var(--radius-card)] border border-border bg-white p-6 shadow-soft md:grid-cols-2 xl:grid-cols-4">
          {serviceHighlights.map((item) => (
            <div key={item.title} className="rounded-xl border border-border/70 bg-card p-5">
              <item.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-semibold text-secondary">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-12 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[var(--radius-card)] border border-border bg-secondary px-6 py-10 text-white shadow-soft md:px-10">
          <h2 className="font-heading text-4xl md:text-5xl">Real Stories, Better Sleep</h2>
          <p className="mt-3 max-w-3xl text-white/80">
            Social-proof layout inspired by top D2C brands, tuned for your showroom inquiry flow.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {stories.map((story) => (
              <article key={`${story.author}-${story.title}`} className="rounded-xl bg-white p-5 text-secondary">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">{story.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-secondary/85">&quot;{story.quote}&quot;</p>
                <p className="mt-4 text-sm font-semibold">- {story.author}</p>
                <div className="mt-2 inline-flex items-center gap-1 text-xs text-amber-600">
                  <CircleCheck className="h-3.5 w-3.5" />
                  {story.rating}/5 verified comfort rating
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-8 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[var(--radius-card)] border border-border bg-white p-8 shadow-soft md:p-10">
          <SectionHeading
            eyebrow="Frequently Asked"
            title="Quick Mattress Buying Help"
            description="Simple answers to the most common questions customers ask before buying."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {faqItems.map((item) => (
              <article key={item.q} className="rounded-xl border border-border/70 bg-card p-5">
                <h3 className="font-semibold text-secondary">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/inquiry">
              <Button>Talk to Sleep Expert</Button>
            </Link>
            <Link href="/categories">
              <Button variant="outline">Browse All Categories</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
