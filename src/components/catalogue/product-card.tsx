"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Heart, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { useInquiryCart } from "@/context/inquiry-cart-context";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

const EASE = [0.22, 1, 0.36, 1] as const;
const FALLBACK_IMAGE = "/images/products/spring-signature.svg";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useInquiryCart();
  const reduce = useReducedMotion();
  const [added, setAdded] = useState(false);
  const [saved, setSaved] = useState(false);
  const image = product.images.find((source) => source.trim()) ?? FALLBACK_IMAGE;

  const handleAdd = () => {
    addItem(product.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -8 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-white shadow-soft transition-shadow duration-500 hover:shadow-glow"
    >
      <Link href={`/products/${product.slug}`} className="relative block h-60 overflow-hidden">
        <Image
          src={image}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-transform duration-700 ease-out",
            !reduce && "group-hover:scale-[1.05]"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute right-4 top-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white/90 text-secondary opacity-0 shadow-soft backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 max-sm:translate-y-0 max-sm:opacity-100">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </Link>

      <button
        type="button"
        onClick={() => setSaved((prev) => !prev)}
        aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
        aria-pressed={saved}
        className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-secondary shadow-soft backdrop-blur transition hover:scale-105 active:scale-95"
      >
        <Heart className={cn("h-4 w-4 transition", saved && "fill-primary text-primary")} />
      </button>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <Badge>{product.brand}</Badge>
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {product.firmness ?? product.thickness}
          </span>
        </div>
        <h3 className="font-heading text-2xl leading-tight text-secondary">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.shortDescription ?? product.description}
        </p>

        <button
          type="button"
          onClick={handleAdd}
          disabled={added}
          className={cn(
            "mt-auto flex h-11 items-center justify-center gap-2 rounded-[var(--radius-button)] text-sm font-semibold transition-all duration-300",
            added ? "bg-secondary text-white" : "bg-primary text-white hover:bg-primary-strong"
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span
                key="added"
                initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                Added to Cart
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add to Cart
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.article>
  );
}
