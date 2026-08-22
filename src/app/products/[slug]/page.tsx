import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetailView } from "@/components/product/product-detail-view";
import { getProductBySlug, listProducts } from "@/lib/db/products";
import { productService } from "@/services/product-service";

export const dynamic = "force-dynamic";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

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
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await listProducts();
  const relatedProducts = productService.getRelatedProducts(allProducts, product);

  return <ProductDetailView product={product} relatedProducts={relatedProducts} />;
}
