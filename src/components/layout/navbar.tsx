"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";

import { navigationItems } from "@/constants/navigation";
import { siteConfig } from "@/constants/site";
import { useInquiryCart } from "@/context/inquiry-cart-context";

export function Navbar() {
  const pathname = usePathname();
  const { count } = useInquiryCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.name} home`}>
          <Image
            src="/images/brand/business-logo.svg"
            alt="Business logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-xl"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-xl font-semibold text-primary md:text-2xl">
              {siteConfig.name}
            </span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              Authorized Restolex Dealer
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {navigationItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  active ? "text-primary" : "text-foreground/80 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/inquiry-cart"
            className="relative inline-flex h-10 items-center gap-2 rounded-full border border-border bg-white px-4 text-sm font-semibold text-foreground shadow-sm transition hover:border-primary/30"
            aria-label="Open inquiry cart"
          >
            <ShoppingBag className="h-4 w-4" />
            Cart
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs text-white">
              {count}
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-border/60 bg-background/95 px-4 py-4 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navigationItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:bg-primary/5 hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
