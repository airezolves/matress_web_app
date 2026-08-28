"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Download, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { inquiryConfig } from "@/config/inquiry-config";
import {
  catalogueRequestSchema,
  type CatalogueRequestPayload,
  type InquiryResponse
} from "@/types/inquiry";

export function CatalogueDownloadForm() {
  const [downloadUrl, setDownloadUrl] = useState("");
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CatalogueRequestPayload>({
    mode: "onTouched",
    resolver: zodResolver(catalogueRequestSchema)
  });

  const onSubmit = async (values: CatalogueRequestPayload) => {
    setSubmitError("");
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), inquiryConfig.requestTimeoutMs);

    try {
      const response = await fetch("/api/catalogue-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: controller.signal
      });
      const data = (await response.json()) as InquiryResponse;

      if (!response.ok || !data.success || !data.downloadUrl) {
        setSubmitError(data.message ?? "Submission failed. Please try again.");
        return;
      }

      setDownloadUrl(data.downloadUrl);
    } catch {
      setSubmitError("Network issue while submitting. Please try again.");
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  if (downloadUrl) {
    return (
      <div className="rounded-[var(--radius-card)] border border-border bg-white p-8 text-center shadow-soft md:p-10">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="h-7 w-7" />
        </span>
        <h2 className="mt-5 font-heading text-3xl text-secondary">Your catalogue is ready.</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          Thank you for sharing your details. Download the latest Restolex catalogue below.
        </p>
        <a
          href={downloadUrl}
          download="Restolex-Catalogue.pdf"
          className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-button)] bg-primary px-7 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-strong"
        >
          <Download className="h-4 w-4" />
          Download Catalogue
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[var(--radius-card)] border border-border bg-white p-6 shadow-soft md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name?.message}>
          <Input autoComplete="name" placeholder="Your name" {...register("name")} />
        </Field>
        <Field label="Phone number" error={errors.phone?.message}>
          <Input autoComplete="tel" inputMode="numeric" placeholder="10-digit mobile number" {...register("phone")} />
        </Field>
        <Field label="Email address" error={errors.email?.message}>
          <Input autoComplete="email" type="email" placeholder="you@example.com" {...register("email")} />
        </Field>
        <Field label="City" error={errors.city?.message}>
          <Input autoComplete="address-level2" placeholder="Your city" {...register("city")} />
        </Field>
      </div>

      <label className="mt-5 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
        <input type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-primary" />
        I agree to be contacted by the Restolex showroom team about products and offers.
      </label>

      {submitError ? <p className="mt-4 text-sm font-medium text-primary">{submitError}</p> : null}

      <Button type="submit" disabled={isSubmitting} className="mt-6 w-full sm:w-auto">
        {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        Submit to Download
      </Button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="space-y-1.5 text-sm font-medium text-secondary">
      <span>{label}</span>
      {children}
      {error ? <span className="block text-xs text-primary">{error}</span> : null}
    </label>
  );
}