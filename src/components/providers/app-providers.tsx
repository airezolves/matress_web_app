"use client";

import { InquiryCartProvider } from "@/context/inquiry-cart-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <InquiryCartProvider>{children}</InquiryCartProvider>;
}
