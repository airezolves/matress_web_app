import { ProductsCatalogView } from "@/components/catalogue/products-catalog-view";
import { SectionHeading } from "@/components/home/section-heading";
import { listProducts } from "@/lib/db/products";
import { createMetadata } from "@/utils/metadata";

export const dynamic = "force-dynamic";

export const metadata = createMetadata("Products", "Browse, search, and filter all products.");

interface ProductsPageProps {
  searchParams: Promise<{
    query?: string | string[];
    subcategory?: string | string[];
    firmness?: string | string[];
    usecase?: string | string[];
  }>;
}

function firstValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const products = await listProducts();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 md:px-8">
      <SectionHeading
        eyebrow="Product Catalogue"
        title="Discover Premium Sleep Products"
        description="Use advanced filters, live search, and category combinations to shortlist quickly."
      />
      <ProductsCatalogView
        initialProducts={products}
        initialQuery={firstValue(params.query)}
        initialSubcategory={firstValue(params.subcategory)}
        initialFirmness={firstValue(params.firmness)}
        initialUsecase={firstValue(params.usecase)}
      />
    </div>
  );
}
