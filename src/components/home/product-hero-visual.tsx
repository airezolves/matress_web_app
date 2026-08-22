"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useReducedMotion, motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Premium hero visual: a realistic mattress render with subtle mouse-parallax
 * tilt, a slow float, and a breathing ground shadow — no card, no border.
 * Parallax tracks the pointer across the whole viewport (not just this
 * element) so the effect is felt anywhere on the hero, not only on hover.
 */
export function ProductHeroVisual() {
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 90, damping: 16, mass: 0.6 });
  const springY = useSpring(pointerY, { stiffness: 90, damping: 16, mass: 0.6 });

  // Mouse-driven "looking around a physical object" tilt.
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const translateX = useTransform(springX, [-0.5, 0.5], [-16, 16]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-9, 9]);
  const scale = useTransform([springX, springY], (latest) => {
    const [sx, sy] = latest as number[];
    const magnitude = Math.min(1, Math.sqrt(sx * sx + sy * sy) / 0.5);
    return 1 + magnitude * 0.035;
  });

  useEffect(() => {
    if (reduceMotion) return;
    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX / window.innerWidth - 0.5);
      pointerY.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reduceMotion, pointerX, pointerY]);

  return (
    <div className="relative mx-auto w-full max-w-lg [perspective:1400px] sm:max-w-xl">
      {/* Warm ambient glow — ivory / lavender / a whisper of plum, never neon */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-10%] -z-10"
        style={{
          background:
            "radial-gradient(42% 42% at 50% 46%, rgba(233,221,239,0.65), transparent 72%), radial-gradient(34% 34% at 28% 66%, rgba(250,247,242,0.75), transparent 70%), radial-gradient(30% 30% at 74% 30%, rgba(91,53,104,0.14), transparent 72%)",
          filter: "blur(28px)"
        }}
      />

      {/* Float group: mattress + shadow move together, breathing every 4.5s */}
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
        transition={
          reduceMotion ? undefined : { duration: 4.5, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }
        }
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            x: translateX,
            y: translateY,
            scale,
            transformStyle: "preserve-3d"
          }}
          className="relative mx-auto aspect-[1024/559] w-[86%] sm:w-full"
        >
          <Image
            src="/images/home_page/hero/premium-mattress.png"
            alt="Premium quilted mattress, three-quarter view"
            fill
            priority
            sizes="(max-width: 768px) 80vw, 45vw"
            className="object-contain drop-shadow-[0_40px_50px_rgba(71,40,80,0.28)]"
          />
        </motion.div>

        {/* Ground shadow: smaller & lighter as the mattress lifts, larger & darker as it settles */}
        <motion.div
          aria-hidden
          animate={
            reduceMotion
              ? undefined
              : { scaleX: [1, 0.82, 1], opacity: [0.32, 0.18, 0.32] }
          }
          transition={
            reduceMotion ? undefined : { duration: 4.5, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }
          }
          className="mx-auto -mt-3 h-6 w-[58%] rounded-full bg-secondary/40 blur-xl sm:h-7 sm:w-[52%]"
        />
      </motion.div>
    </div>
  );
}
