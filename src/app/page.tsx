import { ContactCta } from "@/components/home/contact-cta";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HeroSection } from "@/components/home/hero-section";
import { SectionHeading } from "@/components/home/section-heading";
import { TrustStrip } from "@/components/home/trust-strip";
import homepage from "@/data/homepage.json";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata("Home", "Premium mattress catalogue and lead generation platform.");

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="A Trusted Mattress Showroom Experience"
            description="Built around guidance, quality assurance, and premium consultation."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {homepage.whyChooseUs.map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-white p-5 shadow-soft">
                <p className="text-sm text-secondary">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[var(--radius-card)] border border-border bg-white p-6 shadow-soft">
          <SectionHeading eyebrow="Brands Available" title="Authorized Collections" />
          <div className="flex flex-wrap justify-center gap-3">
            {homepage.brands.map((brand) => (
              <span key={brand} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="px-4 py-12 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[var(--radius-card)] border border-dashed border-border bg-white/70 p-8 text-center">
          <h3 className="font-heading text-4xl text-secondary">Store Location</h3>
          <p className="mt-2 text-sm text-muted-foreground">Google Maps integration placeholder</p>
          <div className="mt-6 rounded-xl border border-border bg-brand-sand/40 p-12 text-sm text-muted-foreground">
            Map Widget Placeholder
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
