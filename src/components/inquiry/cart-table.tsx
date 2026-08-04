"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useInquiryCart } from "@/context/inquiry-cart-context";
import { productService } from "@/services/product-service";
import type { Product } from "@/types/product";

type EnrichedCartItem = {
  productId: string;
  quantity: number;
  product: Product;
};

export function InquiryCartTable() {
  const { items, removeItem, updateQuantity, clearCart } = useInquiryCart();

  const enriched = items
    .map((item) => {
      const product = productService.getAllProducts().find((entry) => entry.id === item.productId);
      if (!product) {
        return null;
      }
      return { ...item, product };
    })
    .filter((entry): entry is EnrichedCartItem => Boolean(entry));

  if (!enriched.length) {
    return (
      <div className="rounded-[var(--radius-card)] border border-dashed border-border p-10 text-center">
        <h2 className="font-heading text-3xl text-secondary">Inquiry cart is empty</h2>
        <p className="mt-2 text-muted-foreground">Add products before submitting your inquiry.</p>
        <Link href="/products" className="mt-5 inline-block">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        {enriched.map((item) => (
          <div
            key={item.productId}
            className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-white p-4 shadow-soft sm:flex-row sm:items-center"
          >
            <div className="relative h-24 w-full overflow-hidden rounded-xl sm:w-32">
              <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-heading text-2xl leading-tight text-secondary">{item.product.name}</p>
              <p className="text-sm text-muted-foreground">{item.product.subcategory}</p>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor={`qty-${item.productId}`} className="text-sm font-medium">
                Qty
              </label>
              <input
                id={`qty-${item.productId}`}
                type="number"
                min={1}
                value={item.quantity}
                onChange={(event) => updateQuantity(item.productId, Number(event.target.value))}
                className="h-10 w-20 rounded-lg border border-border px-2"
              />
            </div>

            <Button variant="ghost" onClick={() => removeItem(item.productId)} aria-label={`Remove ${item.product.name}`}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={clearCart}>
          Clear Cart
        </Button>
        <Link href="/inquiry">
          <Button>Proceed to Inquiry</Button>
        </Link>
      </div>
    </div>
  );
}
