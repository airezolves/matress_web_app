"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useInquiryCart } from "@/context/inquiry-cart-context";

const EASE = [0.22, 1, 0.36, 1] as const;

export function AddToInquiryButton({ productId }: { productId: string }) {
  const { addItem } = useInquiryCart();
  const reduce = useReducedMotion();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(productId);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="rounded-2xl border border-border bg-white/95 p-3 shadow-soft">
      <Button onClick={handleAdd} disabled={added} className="h-12 w-full text-base">
        <AnimatePresence mode="wait" initial={false}>
          {added ? (
            <motion.span
              key="added"
              initial={reduce ? false : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="flex items-center gap-2"
            >
              <Check className="h-5 w-5" />
              Added to My Cart
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={reduce ? false : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="flex items-center gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to My Cart
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </div>
  );
}
