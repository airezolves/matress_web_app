import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, PhoneCall } from "lucide-react";

import { siteConfig } from "@/constants/site";
import { buildWhatsAppLink, generalEnquiryMessage } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-secondary text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1">
          <p className="font-heading text-3xl">{siteConfig.name}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            A premium mattress showroom and authorized dealer, helping you discover the sleep that
            feels right for you.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3">
            <Image src="/images/brand/restolex-logo.png" alt="Restolex" width={132} height={36} />
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/50">Visit & Contact</p>
          <ul className="mt-5 space-y-4 text-sm text-white/85">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{siteConfig.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="h-4 w-4 shrink-0 text-accent" />
              <span>{siteConfig.hours}</span>
            </li>
            <li className="flex items-center gap-3">
              <PhoneCall className="h-4 w-4 shrink-0 text-accent" />
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-accent" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/50">Explore</p>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <Link href="/products" className="text-white/80 hover:text-white">
              Collections
            </Link>
            <Link href="/inquiry" className="text-white/80 hover:text-white">
              Find Your Mattress
            </Link>
            <Link href="/inquiry-cart" className="text-white/80 hover:text-white">
              My Selection
            </Link>
            <Link href="/about" className="text-white/80 hover:text-white">
              About Us
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/50">Experience It</p>
          <p className="mt-5 text-sm leading-relaxed text-white/70">
            Pictures show the mattress. Your body tells you if it&apos;s the right one.
          </p>
          <a
            href={buildWhatsAppLink(generalEnquiryMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Us
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/50 md:px-8">
        © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
      </div>
    </footer>
  );
}
