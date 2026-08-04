import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { PageShell } from "@/components/layout/page-shell";
import { AppProviders } from "@/components/providers/app-providers";
import { siteConfig } from "@/constants/site";

import "./globals.css";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"]
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        <AppProviders>
          <PageShell>{children}</PageShell>
        </AppProviders>
      </body>
    </html>
  );
}
