"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const layers = [
  {
    number: "01",
    name: "Cool Touch Fabric",
    description: "A breathable knitted surface designed for a cooler sleep experience.",
    color: "from-brand-lavender to-white"
  },
  {
    number: "02",
    name: "Comfort Foam",
    description: "Adaptive comfort that cradles the body and helps relieve pressure points.",
    color: "from-accent/40 to-brand-lavender"
  },
  {
    number: "03",
    name: "Memory Layer",
    description: "Responsive memory foam that contours precisely to your shape.",
    color: "from-primary/40 to-accent/40"
  },
  {
    number: "04",
    name: "Support System",
    description: "Zoned support core engineered for spinal alignment and stability.",
    color: "from-primary/60 to-primary/30"
  },
  {
    number: "05",
    name: "Base Foundation",
    description: "A durable high-density base that anchors long-lasting support.",
    color: "from-primary-strong to-primary/60"
  }
];

function LayerBar({
  progress,
  index,
  number,
  name,
  color,
  reduce
}: {
  progress: MotionValue<number>;
  index: number;
  number: string;
  name: string;
  color: string;
  reduce: boolean | null;
}) {
  const spread = useTransform(progress, [0, 0.5], [0, (index - 2) * 14]);
  return (
    <motion.div
      style={reduce ? undefined : { y: spread }}
      className={`flex h-20 items-center justify-between rounded-2xl bg-gradient-to-r ${color} px-6 text-secondary shadow-glow`}
    >
      <span className="font-heading text-2xl">{number}</span>
      <span className="font-semibold">{name}</span>
    </motion.div>
  );
}

export function InsideTheMattress() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return (
    <section className="bg-secondary px-4 py-24 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Engineered Comfort
          </p>
          <h2 className="mt-3 font-heading text-4xl md:text-6xl">
            What you&apos;re sleeping on matters.
          </h2>
          <p className="mt-4 text-white/70">
            Every layer is designed with a purpose — from the surface you touch to the support you
            rely on.
          </p>
        </div>

        <div ref={ref} className="grid gap-12 lg:grid-cols-2">
          <div className="relative mx-auto flex w-full max-w-md flex-col gap-2">
            {layers.map((layer, index) => (
              <LayerBar
                key={layer.number}
                progress={scrollYProgress}
                index={index}
                number={layer.number}
                name={layer.name}
                color={layer.color}
                reduce={reduce}
              />
            ))}
          </div>

          <div className="flex flex-col justify-center gap-8">
            {layers.map((layer, index) => (
              <motion.div
                key={layer.number}
                initial={reduce ? false : { opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: EASE, delay: index * 0.05 }}
                className="border-l-2 border-accent/40 pl-6"
              >
                <p className="font-heading text-3xl text-accent">{layer.number}</p>
                <h3 className="mt-1 font-heading text-2xl">{layer.name}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70">
                  {layer.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
