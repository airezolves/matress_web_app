"use client";

import * as React from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export type InfiniteSliderProps = {
  children: React.ReactNode;
  className?: string;
  direction?: "horizontal" | "vertical";
  /** Pixels traversed per second. */
  speed?: number;
  /** Optional speed applied while the pointer hovers the track. */
  speedOnHover?: number;
  /** Gap between items, in pixels. */
  gap?: number;
};

export function InfiniteSlider({
  children,
  className,
  direction = "horizontal",
  speed = 40,
  speedOnHover,
  gap = 16
}: InfiniteSliderProps) {
  const reduce = useReducedMotion();
  const isVertical = direction === "vertical";
  const translation = useMotionValue(0);
  const setRef = React.useRef<HTMLDivElement | null>(null);
  const [size, setSize] = React.useState(0);
  const [currentSpeed, setCurrentSpeed] = React.useState(speed);

  React.useEffect(() => {
    setCurrentSpeed(speed);
  }, [speed]);

  React.useEffect(() => {
    const element = setRef.current;
    if (!element) {
      return;
    }
    const measure = () => {
      const rect = element.getBoundingClientRect();
      setSize(isVertical ? rect.height : rect.width);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [isVertical, children]);

  React.useEffect(() => {
    if (reduce || size === 0) {
      return;
    }
    const distance = size + gap;
    const controls = animate(translation, [0, -distance], {
      ease: "linear",
      duration: distance / currentSpeed,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0
    });
    return () => controls.stop();
  }, [size, gap, currentSpeed, reduce, translation]);

  const hoverHandlers =
    speedOnHover !== undefined
      ? {
          onHoverStart: () => setCurrentSpeed(speedOnHover),
          onHoverEnd: () => setCurrentSpeed(speed)
        }
      : {};

  const setClasses = cn("flex shrink-0", isVertical ? "flex-col" : "flex-row");

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        className="flex w-max"
        style={{
          flexDirection: isVertical ? "column" : "row",
          gap: `${gap}px`,
          ...(isVertical ? { y: translation } : { x: translation })
        }}
        {...hoverHandlers}
      >
        <div ref={setRef} className={setClasses} style={{ gap: `${gap}px` }}>
          {children}
        </div>
        <div className={setClasses} style={{ gap: `${gap}px` }} aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
