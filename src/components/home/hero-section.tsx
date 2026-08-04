import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import homepage from "@/data/homepage.json";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-14 md:px-8 md:pt-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            {homepage.hero.subtitle}
          </span>
          <h1 className="mt-5 font-heading text-5xl leading-[1.04] text-secondary md:text-7xl">
            {homepage.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {homepage.hero.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products">
              <Button>
                {homepage.hero.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/inquiry">
              <Button variant="outline">{homepage.hero.secondaryCta}</Button>
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-gradient-to-br from-white via-card to-brand-sand p-8 shadow-glow">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Showroom Promise</p>
          <ul className="mt-6 space-y-4">
            {homepage.whyChooseUs.map((point) => (
              <li key={point} className="rounded-xl border border-border bg-white/80 p-4 text-sm text-secondary">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
