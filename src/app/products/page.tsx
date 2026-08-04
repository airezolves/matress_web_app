import { ProductsCatalogView } from "@/components/catalogue/products-catalog-view";
import { SectionHeading } from "@/components/home/section-heading";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata("Products", "Browse, search, and filter all products.");

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 md:px-8">
      <SectionHeading
        eyebrow="Product Catalogue"
        title="Discover Premium Sleep Products"
        description="Use advanced filters, live search, and category combinations to shortlist quickly."
      />
      <ProductsCatalogView />
    </div>
  );
}
