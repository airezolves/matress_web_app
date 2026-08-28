"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import FirmnessMattress3D, { type FirmnessLabel } from "@/components/home/firmness-mattress-3d";

const feels = [
  {
    label: "Super Soft",
    description: "Deep cushioning that gently cradles the body.",
    traits: ["Plush surface", "Deep contouring", "Pressure relief"],
  },
  {
    label: "Medium Soft",
    description: "Cushioned comfort with a supportive foundation.",
    traits: ["Soft cushioning", "Balanced support", "Gentle contouring"],
  },
  {
    label: "Medium",
    description: "An even balance of comfort and stable support.",
    traits: ["Versatile feel", "Even weight balance", "Responsive support"],
  },
  {
    label: "Medium Firm",
    description: "Stronger support with controlled cushioning.",
    traits: ["Stable surface", "Reduced sink", "Structured support"],
  },
] as const satisfies ReadonlyArray<{ label: FirmnessLabel; description: string; traits: readonly string[] }>;

type Feel = (typeof feels)[number];

export function FeelTheDifference() {
  const reduce = useReducedMotion();
  const [selectedFeel, setSelectedFeel] = useState<Feel>(feels[1]);

  return (
    <section className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Find your comfort
          </p>
          <h2 className="mt-3 font-heading text-4xl text-secondary md:text-6xl">
            Feel the difference.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Choose the support level that feels right, then explore matching mattresses.
          </p>
        </div>

        <div className="overflow-hidden rounded-[var(--radius-card)] border border-border/80 bg-white shadow-glow">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden bg-brand-neutral p-8 sm:min-h-[440px] sm:p-12">
              <FirmnessMattress3D firmness={selectedFeel.label} />

              <AnimatePresence mode="wait">
                <motion.span
                  key={selectedFeel.label}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  className="absolute bottom-6 rounded-full border border-white/80 bg-white/90 px-4 py-2 text-sm font-semibold text-secondary shadow-soft backdrop-blur"
                >
                  {selectedFeel.label} feel
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="flex flex-col p-6 sm:p-10 lg:p-12">
              <div className="grid grid-cols-2 gap-2" role="group" aria-label="Choose mattress firmness">
                {feels.map((feel) => {
                  const selected = feel.label === selectedFeel.label;

                  return (
                    <button
                      key={feel.label}
                      type="button"
                      onClick={() => setSelectedFeel(feel)}
                      aria-pressed={selected}
                      className={`flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-button)] border px-3 py-2 text-sm font-semibold transition ${
                        selected
                          ? "border-primary bg-primary text-white shadow-soft"
                          : "border-border bg-white text-secondary hover:border-primary/50 hover:bg-brand-lavender/30"
                      }`}
                    >
                      {selected && <Check className="h-4 w-4" />}
                      {feel.label}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFeel.label}
                  initial={reduce ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="mt-9"
                >
                  <h3 className="font-heading text-4xl text-secondary">{selectedFeel.label}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {selectedFeel.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {selectedFeel.traits.map((trait) => (
                      <li key={trait} className="flex items-center gap-3 text-sm font-medium text-secondary">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        {trait}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              <Link
                href={`/products?firmness=${encodeURIComponent(selectedFeel.label)}`}
                className="mt-10 inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-button)] bg-secondary px-5 text-sm font-semibold text-white transition hover:bg-secondary-strong"
              >
                View {selectedFeel.label.toLowerCase()} mattresses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
