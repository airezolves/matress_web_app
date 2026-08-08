"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const feels = [
  {
    threshold: 33,
    label: "Soft",
    description: "Plush comfort for pressure relief.",
    traits: ["Deep contouring", "Shoulder & hip relief", "Cradling feel"]
  },
  {
    threshold: 66,
    label: "Medium",
    description: "Balanced comfort and support.",
    traits: ["Versatile support", "Even weight balance", "Adaptable feel"]
  },
  {
    threshold: 101,
    label: "Firm",
    description: "Stable support for deeper alignment.",
    traits: ["Spinal alignment", "Minimal sink", "Structured support"]
  }
];

function resolveFeel(value: number) {
  return feels.find((feel) => value < feel.threshold) ?? feels[feels.length - 1];
}

export function FeelTheDifference() {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(50);
  const feel = resolveFeel(value);
  const compression = 1 - (value / 100) * 0.06;

  return (
    <section className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Interactive
          </p>
          <h2 className="mt-3 font-heading text-4xl text-secondary md:text-6xl">
            Feel the difference.
          </h2>
        </div>

        <div className="grid items-center gap-12 rounded-[2.5rem] border border-border bg-white p-8 shadow-glow md:grid-cols-2 md:p-12">
          <div className="relative flex h-64 items-center justify-center">
            <div className="absolute h-40 w-full max-w-sm rounded-3xl bg-gradient-to-br from-brand-lavender to-brand-ivory" />
            <motion.div
              animate={reduce ? undefined : { scaleY: compression }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              style={{ transformOrigin: "bottom" }}
              className="relative h-44 w-full max-w-sm"
            >
              <Image
                src="/images/home_page/product_categories/mattress.png"
                alt="Mattress firmness preview"
                fill
                className="object-contain drop-shadow-xl"
              />
            </motion.div>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <h3 className="font-heading text-4xl text-secondary">{feel.label}</h3>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                {value < 33 ? "Soft" : value < 66 ? "Medium" : "Firm"}
              </span>
            </div>
            <p className="mt-3 text-lg text-muted-foreground">{feel.description}</p>

            <div className="mt-8">
              <div className="flex justify-between text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <span>Soft</span>
                <span>Firm</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={value}
                onChange={(event) => setValue(Number(event.target.value))}
                aria-label="Adjust firmness"
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-brand-lavender via-accent to-primary accent-primary"
              />
            </div>

            <ul className="mt-8 space-y-2">
              {feel.traits.map((trait) => (
                <li key={trait} className="flex items-center gap-3 text-sm text-secondary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {trait}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
