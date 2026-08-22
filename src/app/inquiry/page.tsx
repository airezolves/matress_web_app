import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { SectionHeading } from "@/components/home/section-heading";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata("Inquiry", "Submit your mattress inquiry and showroom request.");

export default function InquiryPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-12 md:px-8">
      <SectionHeading
        eyebrow="Personal Consultation"
        title="Find Your Mattress"
        description="Answer a few quick questions and our sleep specialists will guide you to the right fit."
      />
      <InquiryForm />
    </div>
  );
}
