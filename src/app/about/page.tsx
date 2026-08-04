import Image from "next/image";

import { SectionHeading } from "@/components/home/section-heading";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata("About Us", "Showroom profile, mission, and dealer information.");

const timeline = [
  { year: "2004", detail: "Showroom established with a curated comfort-first product approach." },
  { year: "2012", detail: "Expanded into premium mattress consultation and sleep profiling." },
  { year: "2019", detail: "Became an authorized Restolex dealer partner." },
  { year: "2025", detail: "Launched digital catalogue and personalized inquiry workflow." }
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 md:px-8">
      <section className="rounded-[var(--radius-card)] border border-border bg-white p-8 shadow-soft">
        <SectionHeading eyebrow="Company" title="About Our Showroom" />
        <p className="mx-auto mt-4 max-w-3xl text-center text-muted-foreground">
          We are a premium mattress showroom and authorized dealer focused on helping every customer choose better sleep through guided recommendations and transparent product education.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[var(--radius-card)] border border-border bg-white p-6 shadow-soft">
          <h2 className="font-heading text-3xl text-secondary">Mission</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Deliver personalized sleep solutions with trustworthy consultation and premium product curation.
          </p>
        </div>
        <div className="rounded-[var(--radius-card)] border border-border bg-white p-6 shadow-soft">
          <h2 className="font-heading text-3xl text-secondary">Vision</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Become the most trusted mattress destination for modern Indian households and hospitality spaces.
          </p>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Store Gallery" title="Inside The Experience" />
        <div className="grid gap-4 md:grid-cols-3">
          {["store-1.svg", "store-2.svg", "store-3.svg"].map((image) => (
            <div key={image} className="relative h-56 overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
              <Image src={`/images/showroom/${image}`} alt="Showroom view" fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Timeline" title="Our Journey" />
        <div className="grid gap-4 md:grid-cols-2">
          {timeline.map((entry) => (
            <div key={entry.year} className="rounded-2xl border border-border bg-white p-5 shadow-soft">
              <p className="text-xs uppercase tracking-[0.2em] text-primary">{entry.year}</p>
              <p className="mt-2 text-sm text-secondary">{entry.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
