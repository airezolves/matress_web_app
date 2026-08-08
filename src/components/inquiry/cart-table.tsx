"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Sparkles, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useInquiryCart } from "@/context/inquiry-cart-context";
import { buildWhatsAppLink, selectionEnquiryMessage } from "@/lib/whatsapp";
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
      <div className="rounded-[var(--radius-card)] border border-dashed border-border bg-white p-12 text-center shadow-soft">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="h-6 w-6" />
        </span>
        <h2 className="mt-5 font-heading text-3xl uppercase tracking-[0.08em] text-secondary">
          Your selection is empty
        </h2>
        <p className="mt-2 text-muted-foreground">
          Browse the collection and add the mattresses you love. We&apos;ll help you take it from there.
        </p>
        <Link href="/products" className="mt-6 inline-block">
          <Button>Explore Collection</Button>
        </Link>
      </div>
    );
  }

  const selectionMessage = selectionEnquiryMessage(enriched.map((item) => item.product.name));

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="font-heading text-3xl uppercase tracking-[0.06em] text-secondary">
          My Selection
        </h2>
        <span className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {enriched.length} {enriched.length === 1 ? "Product" : "Products"}
        </span>
      </div>

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

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
        <Link href="/inquiry">
          <Button>Request a Quote</Button>
        </Link>
        <a
          href={buildWhatsAppLink(selectionMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-button)] bg-[#25D366] px-5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp Us
        </a>
        <Button variant="ghost" onClick={clearCart} className="ml-auto">
          Clear Selection
        </Button>
      </div>
    </div>
  );
}
