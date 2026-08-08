import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, MessageCircle } from "lucide-react";

import { FadeUp, ParallaxImage } from "@/components/animation/motion-primitives";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";
import { buildWhatsAppLink, generalEnquiryMessage } from "@/lib/whatsapp";

export function ShowroomCta() {
  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-border bg-secondary text-white">
        <div className="grid gap-0 lg:grid-cols-2">
          <div className="relative min-h-[320px] overflow-hidden">
            <ParallaxImage className="absolute inset-0 h-full w-full" distance={40}>
              <Image
                src="/images/showroom/store-1.svg"
                alt="Inside our showroom"
                fill
                className="object-cover"
              />
            </ParallaxImage>
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent lg:bg-gradient-to-r" />
          </div>

          <FadeUp className="p-8 md:p-14">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              Experience It
            </p>
            <h2 className="mt-3 font-heading text-4xl md:text-5xl">
              Experience it before you decide.
            </h2>
            <p className="mt-4 max-w-md text-white/70">
              Pictures can show you the mattress. Your body tells you if it&apos;s the right one.
              Visit our showroom and feel the difference in person.
            </p>

            <div className="mt-6 space-y-2 text-sm text-white/80">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                {siteConfig.address}
              </p>
              <p className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-accent" />
                {siteConfig.hours}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={siteConfig.mapEmbedUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary">Get Directions</Button>
              </a>
              <Link href="/inquiry">
                <Button variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">
                  Book a Sleep Consultation
                </Button>
              </Link>
              <a
                href={buildWhatsAppLink(generalEnquiryMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-[#25D366] px-5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
