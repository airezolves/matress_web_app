import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetailView } from "@/components/product/product-detail-view";
import { productService } from "@/services/product-service";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productService.getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name} | Mr & Mrs Furnishings`,
    description: product.description
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = productService.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = productService.getRelatedProducts(product);

  return <ProductDetailView product={product} relatedProducts={relatedProducts} />;
}
