import type { Metadata } from "next";

import { siteConfig } from "@/constants/site";

export function createMetadata(title: string, description: string): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      siteName: siteConfig.name
    }
  };
}
