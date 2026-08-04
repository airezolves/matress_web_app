"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { inquiryConfig } from "@/config/inquiry-config";
import { useInquiryCart } from "@/context/inquiry-cart-context";
import { inquirySchema, type InquiryPayload, type InquiryResponse } from "@/types/inquiry";

export function InquiryForm() {
  const { items, clearCart } = useInquiryCart();
  const [responseMessage, setResponseMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<InquiryPayload>({
    resolver: zodResolver(inquirySchema)
  });

  const onSubmit = async (values: InquiryPayload) => {
    setResponseMessage("");

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
        setResponseMessage(data.message ?? "Inquiry submission failed");
        return;
      }

      setResponseMessage(`${data.message} (Ref: ${data.inquiryId ?? "N/A"})`);
      clearCart();
      reset();
    } catch {
      setResponseMessage("Network issue while submitting inquiry. Please try again.");
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  const fieldClassName = "space-y-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-[var(--radius-card)] border border-border bg-white p-6 shadow-soft">
      <div className="grid gap-4 md:grid-cols-2">
        <div className={fieldClassName}>
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-xs text-primary">{errors.name.message}</p>}
        </div>

        <div className={fieldClassName}>
          <label htmlFor="phone" className="text-sm font-medium">
            Phone
          </label>
          <Input id="phone" {...register("phone")} />
          {errors.phone && <p className="text-xs text-primary">{errors.phone.message}</p>}
        </div>

        <div className={fieldClassName}>
          <label htmlFor="whatsappNumber" className="text-sm font-medium">
            WhatsApp Number
          </label>
          <Input id="whatsappNumber" {...register("whatsappNumber")} />
          {errors.whatsappNumber && <p className="text-xs text-primary">{errors.whatsappNumber.message}</p>}
        </div>

        <div className={fieldClassName}>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-xs text-primary">{errors.email.message}</p>}
        </div>

        <div className={fieldClassName}>
          <label htmlFor="city" className="text-sm font-medium">
            City
          </label>
          <Input id="city" {...register("city")} />
          {errors.city && <p className="text-xs text-primary">{errors.city.message}</p>}
        </div>

        <div className={fieldClassName}>
          <label htmlFor="address" className="text-sm font-medium">
            Address
          </label>
          <Input id="address" {...register("address")} />
          {errors.address && <p className="text-xs text-primary">{errors.address.message}</p>}
        </div>
      </div>

      <div className={fieldClassName}>
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <Textarea id="message" {...register("message")} />
        {errors.message && <p className="text-xs text-primary">{errors.message.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Submit Inquiry
      </Button>

      {responseMessage ? <p className="text-sm font-medium text-secondary">{responseMessage}</p> : null}
    </form>
  );
}
