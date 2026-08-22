"use client";

import { useEffect, useState } from "react";

type TestimonialItem = {
  title: string;
  quote: string;
  author: string;
  rating: number;
};

type TestimonialsCarouselProps = {
  items: TestimonialItem[];
};

const AUTO_SWITCH_MS = 3200;
const TRANSITION_MS = 500;
const MAX_ITEMS_PER_VIEW = 3;

// Cards visible at once: 1 on mobile, 3 from md breakpoint up (matches Tailwind's md: 768px).
function useItemsPerView() {
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const update = () => setItemsPerView(mediaQuery.matches ? 3 : 1);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return itemsPerView;
}

export function TestimonialsCarousel({ items }: TestimonialsCarouselProps) {
  const itemsPerView = useItemsPerView();
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  // Duplicate the leading cards (up to the widest view) so the tail scrolls straight into the start.
  const loopBuffer = Math.min(MAX_ITEMS_PER_VIEW, items.length);
  const slides = items.length > 0 ? [...items, ...items.slice(0, loopBuffer)] : items;

  useEffect(() => {
    if (items.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setAnimate(true);
      setIndex((prev) => prev + 1);
    }, AUTO_SWITCH_MS);

    return () => window.clearInterval(timer);
  }, [items.length]);

  useEffect(() => {
    if (index !== items.length) {
      return;
    }

    // Reached the appended duplicate: snap back to the start with no transition.
    const resetTimer = window.setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, TRANSITION_MS);

    return () => window.clearTimeout(resetTimer);
  }, [index, items.length]);

  if (items.length === 0) {
    return null;
  }

  const trackWidthPercent = (slides.length / itemsPerView) * 100;
  const itemWidthPercent = 100 / slides.length;

  return (
    <div className="mt-8 overflow-hidden">
      <div
        className="-mx-2 flex"
        style={{
          width: `${trackWidthPercent}%`,
          transform: `translateX(-${index * itemWidthPercent}%)`,
          transition: animate ? `transform ${TRANSITION_MS}ms ease` : "none"
        }}
      >
        {slides.map((story, slideIndex) => (
          <div
            key={`${story.author}-${story.title}-${slideIndex}`}
            className="shrink-0 px-2"
            style={{ width: `${itemWidthPercent}%` }}
          >
            <article className="rounded-xl bg-white p-5 text-secondary">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">{story.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-secondary/85">&quot;{story.quote}&quot;</p>
              <p className="mt-4 text-sm font-semibold">- {story.author}</p>
              <div className="mt-2 inline-flex items-center gap-1 text-xs text-amber-600">
                {story.rating}/5 verified comfort rating
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
