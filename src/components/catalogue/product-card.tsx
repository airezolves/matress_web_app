"use client";

import Image from "next/image";
import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useInquiryCart } from "@/context/inquiry-cart-context";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useInquiryCart();

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
      <Card className="overflow-hidden border-border/70 bg-white/90">
        <Link href={`/products/${product.slug}`}>
          <div className="relative h-56 overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition duration-500 hover:scale-105"
            />
          </div>
        </Link>
        <div className="space-y-3 p-5">
          <div className="flex items-center justify-between gap-3">
            <Badge>{product.brand}</Badge>
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {product.firmness ?? product.thickness}
            </span>
          </div>
          <h3 className="font-heading text-2xl text-secondary">{product.name}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
          <div className="flex gap-2">
            <Button className="flex-1" onClick={() => addItem(product.id)}>
              <HeartHandshake className="h-4 w-4" />
              Add to Inquiry
            </Button>
            <Link href={`/products/${product.slug}`} className="flex-1">
              <Button variant="outline" className="w-full">
                View
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
