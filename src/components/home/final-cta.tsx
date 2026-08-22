import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AnimatedText, FadeUp } from "@/components/animation/motion-primitives";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden px-4 py-28 md:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(141,106,157,0.16),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(91,53,104,0.14),transparent_45%)]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <AnimatedText
          as="h2"
          text="Your best sleep"
          className="font-heading text-5xl text-secondary md:text-7xl"
        />
        <AnimatedText
          as="h2"
          text="is waiting."
          className="font-heading text-5xl text-primary md:text-7xl"
          delay={0.15}
        />
        <FadeUp delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Explore the collection online. Experience it in person. Find the mattress that feels
            right for you.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/products">
              <Button size="lg" className="group">
                Explore Collection
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/inquiry">
              <Button size="lg" variant="outline">
                Find My Mattress
              </Button>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
