"use client";

import { createContext, useContext, useMemo } from "react";

import { useLocalStorage } from "@/hooks/use-local-storage";
import type { CartItem, InquiryCartContextValue } from "@/types/cart";

const InquiryCartContext = createContext<InquiryCartContextValue | undefined>(undefined);

const STORAGE_KEY = "restolex-inquiry-cart";

export function InquiryCartProvider({ children }: { children: React.ReactNode }) {
  const { value: items, setValue: setItems } = useLocalStorage<CartItem[]>(STORAGE_KEY, []);

  const value = useMemo<InquiryCartContextValue>(() => {
    const addItem = (productId: string) => {
      setItems((current) => {
        const existing = current.find((item) => item.productId === productId);
        if (!existing) {
          return [...current, { productId, quantity: 1 }];
        }

        return current.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      });
    };

    const removeItem = (productId: string) => {
      setItems((current) => current.filter((item) => item.productId !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }

      setItems((current) =>
        current.map((item) => (item.productId === productId ? { ...item, quantity } : item))
      );
    };

    const clearCart = () => setItems([]);

    const count = items.reduce((total, item) => total + item.quantity, 0);

    return { items, addItem, removeItem, updateQuantity, clearCart, count };
  }, [items, setItems]);

  return <InquiryCartContext.Provider value={value}>{children}</InquiryCartContext.Provider>;
}

export function useInquiryCart() {
  const context = useContext(InquiryCartContext);

  if (!context) {
    throw new Error("useInquiryCart must be used inside InquiryCartProvider");
  }

  return context;
}
