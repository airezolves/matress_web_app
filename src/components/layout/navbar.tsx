"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";

import { navigationItems } from "@/constants/navigation";
import { siteConfig } from "@/constants/site";
import { useInquiryCart } from "@/context/inquiry-cart-context";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const { count } = useInquiryCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:px-6 md:pt-5"
      initial={false}
    >
      <motion.div
        animate={{
          scale: scrolled ? 0.98 : 1,
          backgroundColor: scrolled ? "rgba(250, 247, 242, 0.82)" : "rgba(250, 247, 242, 0)",
          boxShadow: scrolled ? "0 18px 44px -30px rgba(36, 31, 37, 0.5)" : "0 0 0 0 rgba(0,0,0,0)",
          borderColor: scrolled ? "rgba(235, 228, 230, 0.9)" : "rgba(235, 228, 230, 0)"
        }}
        transition={{ duration: 0.4, ease: EASE }}
        className="flex w-full max-w-7xl items-center justify-between gap-4 rounded-full border px-4 py-2.5 backdrop-blur-xl md:px-6"
      >
        <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.name} home`}>
          <Image
            src="/images/brand/business-logo.png"
            alt="Business logo"
            width={38}
            height={38}
            className="h-9 w-9 rounded-xl"
            priority
          />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-heading text-lg font-semibold text-secondary md:text-xl">
              {siteConfig.name}
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
              Authorized Restolex Dealer
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navigationItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/inquiry-cart"
            className="relative inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-strong"
            aria-label="Open my selection"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">My Selection</span>
            {count > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-primary">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/80 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="absolute left-3 right-3 top-[4.5rem] rounded-3xl border border-border bg-background/95 p-4 shadow-glow backdrop-blur-xl md:left-6 md:right-6 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navigationItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
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
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
