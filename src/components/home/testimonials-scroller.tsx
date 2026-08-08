"use client";

import { Star } from "lucide-react";

import { FadeUp } from "@/components/animation/motion-primitives";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

export type TestimonialItem = {
  title: string;
  quote: string;
  author: string;
  rating: number;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialItem }) {
  const { title, quote, author, rating } = testimonial;
  return (
    <figure className="w-full max-w-xs rounded-3xl border border-border bg-white p-6 shadow-soft">
      <div className="flex gap-0.5 text-accent">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={cn("h-4 w-4", index < rating ? "fill-accent" : "fill-none text-border")}
          />
        ))}
      </div>
      <blockquote className="mt-4 text-sm leading-relaxed text-secondary/85">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <Avatar className="size-9">
          <AvatarFallback className="bg-primary text-sm font-semibold text-white">
            {initials(author)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <cite className="font-semibold not-italic leading-5 tracking-tight text-secondary">
            {author}
          </cite>
          <span className="text-xs leading-5 text-muted-foreground">{title}</span>
        </div>
      </figcaption>
    </figure>
  );
}

const fadeMask =
  "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)";

export function TestimonialsScroller({ items }: { items: TestimonialItem[] }) {
  if (items.length === 0) {
    return null;
  }

  const columnSize = Math.ceil(items.length / 3);
  const firstColumn = items.slice(0, columnSize);
  const secondColumn = items.slice(columnSize, columnSize * 2);
  const thirdColumn = items.slice(columnSize * 2);

  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <FadeUp className="mx-auto mb-12 flex max-w-md flex-col items-center gap-3 text-center">
          <span className="rounded-full border border-border bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Loved by Sleepers
          </span>
          <h2 className="font-heading text-4xl text-secondary md:text-5xl">
            Real stories, better sleep.
          </h2>
          <p className="text-sm text-muted-foreground">
            Hear from customers who found their perfect mattress with us.
          </p>
        </FadeUp>

        <div
          className="flex max-h-[40rem] justify-center gap-6 overflow-hidden"
          style={{ maskImage: fadeMask, WebkitMaskImage: fadeMask }}
        >
          <InfiniteSlider direction="vertical" speed={22} speedOnHover={10} gap={24}>
            {firstColumn.map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.author}-${index}`} testimonial={testimonial} />
            ))}
          </InfiniteSlider>

          <InfiniteSlider
            className="hidden md:block"
            direction="vertical"
            speed={32}
            speedOnHover={14}
            gap={24}
          >
            {secondColumn.map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.author}-${index}`} testimonial={testimonial} />
            ))}
          </InfiniteSlider>

          <InfiniteSlider
            className="hidden lg:block"
            direction="vertical"
            speed={26}
            speedOnHover={12}
            gap={24}
          >
            {thirdColumn.map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.author}-${index}`} testimonial={testimonial} />
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}
