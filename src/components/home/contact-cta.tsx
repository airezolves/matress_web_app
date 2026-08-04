import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";

export function ContactCta() {
  return (
    <section className="px-4 pb-16 md:px-8">
      <div className="mx-auto max-w-7xl rounded-[var(--radius-card)] border border-border bg-gradient-to-r from-brand-wine to-primary p-8 text-white shadow-glow md:p-12">
        <p className="text-xs uppercase tracking-[0.2em] text-white/80">Visit Our Showroom</p>
        <h3 className="mt-3 font-heading text-4xl leading-tight md:text-5xl">
          Need help selecting the right mattress?
        </h3>
        <p className="mt-4 max-w-2xl text-sm text-white/90 md:text-base">
          Talk to our sleep specialists for guided product recommendations. Call {siteConfig.phone} or submit a quick inquiry.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/inquiry">
            <Button variant="secondary">Start Inquiry</Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" className="border-white/50 bg-transparent text-white hover:bg-white/10">
              Explore Collection
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
