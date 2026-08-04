import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { SectionHeading } from "@/components/home/section-heading";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata("Inquiry", "Submit your mattress inquiry and showroom request.");

export default function InquiryPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-12 md:px-8">
      <SectionHeading
        eyebrow="Inquiry Form"
        title="Tell Us What You Need"
        description="Share your preferences and our team will contact you with the right recommendations."
      />
      <InquiryForm />
    </div>
  );
}
