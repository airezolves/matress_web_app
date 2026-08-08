"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as const;

type Choice = { value: string; label: string };

const positions: Choice[] = [
  { value: "side", label: "Side" },
  { value: "back", label: "Back" },
  { value: "stomach", label: "Stomach" },
  { value: "combination", label: "Combination" }
];

const users: Choice[] = [
  { value: "me", label: "Me" },
  { value: "couple", label: "Couple" },
  { value: "child", label: "Child" },
  { value: "guest", label: "Guest room" }
];

const sizes: Choice[] = [
  { value: "single", label: "Single" },
  { value: "queen", label: "Queen" },
  { value: "king", label: "King" },
  { value: "custom", label: "Custom" }
];

function firmnessLabel(value: number) {
  if (value < 33) return "Soft";
  if (value < 66) return "Medium";
  return "Firm";
}

function recommendation(position: string, firmness: number) {
  const feel = firmnessLabel(firmness);
  const support =
    position === "side"
      ? "Pressure Relief"
      : position === "stomach"
        ? "Stable Support"
        : "Balanced Support";
  return { feel, support };
}

export function SleepSelector() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [position, setPosition] = useState("");
  const [firmness, setFirmness] = useState(50);
  const [user, setUser] = useState("");
  const [size, setSize] = useState("");

  const totalSteps = 4;
  const complete = step >= totalSteps;

  const canAdvance =
    (step === 0 && position) ||
    step === 1 ||
    (step === 2 && user) ||
    (step === 3 && size);

  const reset = () => {
    setStep(0);
    setPosition("");
    setFirmness(50);
    setUser("");
    setSize("");
  };

  const result = recommendation(position, firmness);
  const match = 84 + (firmness % 9);

  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-border bg-white shadow-glow">
        <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative flex flex-col justify-between bg-gradient-to-br from-primary to-primary-strong p-8 text-white md:p-10">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/70">Sleep Consultation</p>
              <h2 className="mt-4 font-heading text-4xl leading-tight md:text-5xl">
                Which sleep feels like you?
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">
                Answer a few quick questions and we&apos;ll shape a sleep profile tailored to how you
                rest.
              </p>
            </div>
            <div className="mt-10 flex gap-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                    index <= step ? "bg-white" : "bg-white/25"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-8 md:p-10">
            <AnimatePresence mode="wait">
              {!complete ? (
                <motion.div
                  key={step}
                  initial={reduce ? false : { opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: -24 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  {step === 0 && (
                    <StepBlock
                      label="Question 1"
                      title="How do you usually sleep?"
                      choices={positions}
                      selected={position}
                      onSelect={setPosition}
                    />
                  )}

                  {step === 1 && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-primary">Question 2</p>
                      <h3 className="mt-2 font-heading text-3xl text-secondary">
                        What firmness do you prefer?
                      </h3>
                      <div className="mt-10">
                        <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                          <span>Soft</span>
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                            {firmnessLabel(firmness)}
                          </span>
                          <span>Firm</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={firmness}
                          onChange={(event) => setFirmness(Number(event.target.value))}
                          aria-label="Firmness preference"
                          className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-brand-lavender via-accent to-primary accent-primary"
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <StepBlock
                      label="Question 3"
                      title="Who will be using it?"
                      choices={users}
                      selected={user}
                      onSelect={setUser}
                    />
                  )}

                  {step === 3 && (
                    <StepBlock
                      label="Question 4"
                      title="What size are you looking for?"
                      choices={sizes}
                      selected={size}
                      onSelect={setSize}
                    />
                  )}

                  <div className="mt-10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      disabled={step === 0}
                      className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary disabled:opacity-40"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                    <Button
                      onClick={() => setStep((s) => s + 1)}
                      disabled={!canAdvance}
                      className="group"
                    >
                      {step === totalSteps - 1 ? "See My Profile" : "Continue"}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                    <Check className="h-4 w-4" />
                    {match}% Match
                  </div>
                  <h3 className="mt-5 font-heading text-3xl text-secondary">Your Sleep Profile</h3>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {[
                      { label: "Support", value: result.support },
                      { label: "Comfort", value: "Pressure Relief" },
                      { label: "Firmness", value: `${result.feel} Firmness` },
                      { label: "Size", value: size ? size[0].toUpperCase() + size.slice(1) : "Queen" }
                    ].map((tile) => (
                      <div key={tile.label} className="rounded-2xl border border-border bg-brand-ivory p-4">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          {tile.label}
                        </p>
                        <p className="mt-1 font-heading text-xl text-secondary">{tile.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/products">
                      <Button className="group">
                        View Recommended Mattress
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </Link>
                    <Button variant="ghost" onClick={reset}>
                      <RefreshCw className="h-4 w-4" />
                      Start over
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepBlock({
  label,
  title,
  choices,
  selected,
  onSelect
}: {
  label: string;
  title: string;
  choices: Choice[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-primary">{label}</p>
      <h3 className="mt-2 font-heading text-3xl text-secondary">{title}</h3>
      <div className="mt-8 grid grid-cols-2 gap-3">
        {choices.map((choice) => {
          const active = selected === choice.value;
          return (
            <button
              key={choice.value}
              type="button"
              onClick={() => onSelect(choice.value)}
              className={`rounded-2xl border px-5 py-4 text-left text-base font-medium transition-all duration-200 ${
                active
                  ? "border-primary bg-primary/5 text-primary shadow-soft"
                  : "border-border bg-white text-secondary hover:border-primary/40"
              }`}
            >
              {choice.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
