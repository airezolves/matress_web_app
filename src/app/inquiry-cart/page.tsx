import { InquiryCartTable } from "@/components/inquiry/cart-table";
import { SectionHeading } from "@/components/home/section-heading";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata("Inquiry Cart", "Review selected products and proceed to inquiry form.");

export default function InquiryCartPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 md:px-8">
      <SectionHeading
        eyebrow="Inquiry Cart"
        title="Your Selected Products"
        description="Review your selected products before submitting an inquiry."
      />
      <InquiryCartTable />
    </div>
  );
}
