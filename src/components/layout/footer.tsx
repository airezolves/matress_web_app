import Image from "next/image";
import Link from "next/link";
import { PhoneCall, MapPin, Mail } from "lucide-react";

import { siteConfig } from "@/constants/site";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-heading text-3xl">{siteConfig.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
            Premium mattress consultation and curated sleep solutions from an authorized dealer.
          </p>
          <div className="mt-5 inline-flex items-center gap-3 rounded-xl bg-white/95 px-4 py-3">
            <Image
              src="/images/brand/restolex-logo.png"
              alt="Restolex"
              width={132}
              height={36}
            />
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.24em] text-white/50">
            Authorized Restolex Dealer
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-white/70">Visit & Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-white/85">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4" />
              <span>{siteConfig.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <PhoneCall className="h-4 w-4" />
              <span>{siteConfig.phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{siteConfig.email}</span>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-white/70">Quick Links</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/products" className="text-white/85 hover:text-white">
              Explore Products
            </Link>
            <Link href="/categories" className="text-white/85 hover:text-white">
              Browse Categories
            </Link>
            <Link href="/inquiry" className="text-white/85 hover:text-white">
              Submit Inquiry
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20 px-4 py-4 text-center text-xs text-white/70 md:px-8">
        © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
      </div>
    </footer>
  );
}
