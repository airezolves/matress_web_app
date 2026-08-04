"use client";

import { Button } from "@/components/ui/button";
import { useInquiryCart } from "@/context/inquiry-cart-context";

export function AddToInquiryButton({ productId }: { productId: string }) {
  const { addItem } = useInquiryCart();

  return (
    <div className="rounded-2xl border border-border bg-white/95 p-3 shadow-soft">
      <div className="flex">
        <Button onClick={() => addItem(productId)} className="h-12 w-full text-base">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
