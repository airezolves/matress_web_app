"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, LoaderCircle, MessageCircle, Send, Sparkles } from "lucide-react";
import { useForm, type Path } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { inquiryConfig } from "@/config/inquiry-config";
import { useInquiryCart } from "@/context/inquiry-cart-context";
import { buildWhatsAppLink, selectionEnquiryMessage } from "@/lib/whatsapp";
import { productService } from "@/services/product-service";
import { inquirySchema, type InquiryPayload, type InquiryResponse } from "@/types/inquiry";

const EASE = [0.22, 1, 0.36, 1] as const;

const steps: Array<{
  title: string;
  subtitle: string;
  fields: Array<Path<InquiryPayload>>;
}> = [
  {
    title: "Let's start with you",
    subtitle: "Tell us who we'll be helping find their perfect mattress.",
    fields: ["name", "phone", "whatsappNumber"]
  },
  {
    title: "How can we reach you?",
    subtitle: "We'll use these details to follow up and arrange a showroom visit.",
    fields: ["email", "city", "address"]
  },
  {
    title: "What are you looking for?",
    subtitle: "Share any preferences — feel, size, budget or timing.",
    fields: ["message"]
  }
];

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-secondary">{label}</label>
      {children}
      {error ? <p className="text-xs text-primary">{error}</p> : null}
    </div>
  );
}

export function InquiryForm() {
  const reduce = useReducedMotion();
  const { items, clearCart } = useInquiryCart();

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [sameWhatsApp, setSameWhatsApp] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<InquiryPayload>({ mode: "onTouched", resolver: zodResolver(inquirySchema) });

  const selectionNames = useMemo(() => {
    const all = productService.getAllProducts();
    return items
      .map((item) => all.find((product) => product.id === item.productId)?.name)
      .filter((name): name is string => Boolean(name));
  }, [items]);

  const isLastStep = step === steps.length - 1;

  const goNext = async () => {
    const valid = await trigger(steps[step].fields);
    if (!valid) {
      return;
    }
    setDirection(1);
    setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((current) => Math.max(current - 1, 0));
  };

  const toggleSameWhatsApp = (checked: boolean) => {
    setSameWhatsApp(checked);
    if (checked) {
      setValue("whatsappNumber", getValues("phone"), { shouldValidate: true });
    }
  };

  const onSubmit = async (values: InquiryPayload) => {
    setSubmitError("");
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), inquiryConfig.requestTimeoutMs);

    try {
      const response = await fetch(inquiryConfig.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: values, productIds: items.map((item) => item.productId) }),
        signal: controller.signal
      });

      const data = (await response.json()) as InquiryResponse;

      if (!response.ok || !data.success) {
        setSubmitError(data.message ?? "Inquiry submission failed. Please try again.");
        return;
      }

      setReferenceId(data.inquiryId ?? null);
      setSubmitted(true);
      clearCart();
    } catch {
      setSubmitError("Network issue while submitting. Please try again or reach us on WhatsApp.");
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="rounded-[2rem] border border-border bg-white p-10 text-center shadow-soft"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="h-8 w-8" />
        </span>
        <h2 className="mt-6 font-heading text-3xl text-secondary">Enquiry received.</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Thank you — our team will reach out shortly to help you find the right mattress.
          {referenceId ? (
            <>
              {" "}
              Your reference is <span className="font-semibold text-secondary">{referenceId}</span>.
            </>
          ) : null}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/products">
            <Button>Continue Browsing</Button>
          </Link>
          <a
            href={buildWhatsAppLink(selectionEnquiryMessage(selectionNames))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-button)] bg-[#25D366] px-5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            <MessageCircle className="h-4 w-4" />
            Message us on WhatsApp
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[2rem] border border-border bg-white p-6 shadow-soft md:p-8"
    >
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          <span>
            Step {step + 1} of {steps.length}
          </span>
          <span>{Math.round(((step + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-brand-neutral">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={false}
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </div>
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            initial={reduce ? false : { opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <h2 className="font-heading text-3xl text-secondary md:text-4xl">{steps[step].title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{steps[step].subtitle}</p>

            <div className="mt-6 space-y-4">
              {step === 0 ? (
                <>
                  <Field label="Full name" error={errors.name?.message}>
                    <Input placeholder="e.g. Aarti Sharma" {...register("name")} />
                  </Field>
                  <Field label="Phone" error={errors.phone?.message}>
                    <Input inputMode="numeric" placeholder="10-digit mobile number" {...register("phone")} />
                  </Field>
                  <label className="flex items-center gap-2 text-sm text-secondary">
                    <input
                      type="checkbox"
                      checked={sameWhatsApp}
                      onChange={(event) => toggleSameWhatsApp(event.target.checked)}
                      className="h-4 w-4 rounded border-border accent-primary"
                    />
                    My WhatsApp number is the same as my phone
                  </label>
                  {!sameWhatsApp ? (
                    <Field label="WhatsApp number" error={errors.whatsappNumber?.message}>
                      <Input inputMode="numeric" placeholder="WhatsApp number" {...register("whatsappNumber")} />
                    </Field>
                  ) : (
                    <input type="hidden" {...register("whatsappNumber")} />
                  )}
                </>
              ) : null}

              {step === 1 ? (
                <>
                  <Field label="Email" error={errors.email?.message}>
                    <Input type="email" placeholder="you@example.com" {...register("email")} />
                  </Field>
                  <Field label="City" error={errors.city?.message}>
                    <Input placeholder="Your city" {...register("city")} />
                  </Field>
                  <Field label="Address" error={errors.address?.message}>
                    <Textarea placeholder="Where should we reach you?" {...register("address")} />
                  </Field>
                </>
              ) : null}

              {step === 2 ? (
                <>
                  {selectionNames.length > 0 ? (
                    <div className="rounded-2xl border border-border bg-brand-ivory p-4">
                      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                        <Sparkles className="h-3.5 w-3.5" />
                        Your selection
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-secondary">
                        {selectionNames.map((name) => (
                          <li key={name} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  <Field label="Your message" error={errors.message?.message}>
                    <Textarea
                      rows={4}
                      placeholder="Tell us about the feel, size or timeline you have in mind…"
                      {...register("message")}
                    />
                  </Field>
                </>
              ) : null}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {submitError ? <p className="mt-4 text-sm font-medium text-primary">{submitError}</p> : null}

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={goBack}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        ) : (
          <span />
        )}

        {isLastStep ? (
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Send Enquiry
          </Button>
        ) : (
          <Button type="button" onClick={goNext}>
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
}
