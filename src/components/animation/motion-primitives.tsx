"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants
} from "framer-motion";

import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type BaseProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Fade + rise into view once. */
export function FadeUp({ children, className, delay = 0 }: BaseProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Simple opacity reveal. */
export function FadeIn({ children, className, delay = 0 }: BaseProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Soft scale-in for product/media surfaces. */
export function ScaleIn({ children, className, delay = 0 }: BaseProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
};

/** Wrap a group; children using <StaggerChild> animate in sequence. */
export function StaggerChildren({
  children,
  className,
  amount = 0.2
}: BaseProps & { amount?: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={reduce ? undefined : containerVariants}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChild({ children, className }: BaseProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} variants={reduce ? undefined : childVariants}>
      {children}
    </motion.div>
  );
}

/** Vertical parallax driven by scroll position. */
export function ParallaxImage({
  children,
  className,
  distance = 60
}: BaseProps & { distance?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={reduce ? undefined : { y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

/** Word-by-word editorial heading reveal. */
export function AnimatedText({
  text,
  className,
  as: Tag = "h2",
  delay = 0
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[Tag];

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: delay } }
      }}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%", opacity: 0 },
              show: { y: "0%", opacity: 1, transition: { duration: 0.6, ease: EASE } }
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Magnetic hover wrapper — element gently follows the cursor. */
export function MagneticButton({
  children,
  className,
  strength = 0.35
}: BaseProps & { strength?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={reduce ? undefined : { x: springX, y: springY }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}

/** Subtle lift on hover for cards. */
export function HoverLift({ children, className }: BaseProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={reduce ? undefined : { y: -8 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
