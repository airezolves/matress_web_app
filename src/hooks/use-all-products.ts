"use client";

import { useEffect, useState } from "react";

import type { Product } from "@/types/product";

/**
 * Client-side hook that loads all products from the public `/api/products`
 * endpoint (backed by D1). Used by components that resolve product details
 * from cart ids stored in localStorage (cart table, inquiry form).
 */
export function useAllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch("/api/products")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Failed to load products"))))
      .then((data) => {
        const payload = data as { products?: Product[] };
        if (active) {
          setProducts(payload.products ?? []);
        }
      })
      .catch(() => {
        if (active) {
          setProducts([]);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return { products, loading };
}
