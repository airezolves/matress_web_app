import { CatalogueDownloadForm } from "@/components/inquiry/catalogue-download-form";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata(
  "Download Catalogue",
  "Request and download the latest Restolex product catalogue."
);

export default function DownloadCataloguePage() {
  return (
    <section className="px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Product guide</p>
          <h1 className="mt-3 font-heading text-4xl text-secondary md:text-6xl">Download our catalogue</h1>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">
            Share your details to access the latest mattress, pillow and sofa collections.
          </p>
        </div>
        <CatalogueDownloadForm />
      </div>
    </section>
  );
}