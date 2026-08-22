import Image from "next/image";
import { Award, HeartHandshake, Leaf, ShieldCheck } from "lucide-react";

import {
  AnimatedText,
  FadeUp,
  ParallaxImage,
  StaggerChild,
  StaggerChildren
} from "@/components/animation/motion-primitives";
import { ShowroomCta } from "@/components/home/showroom-cta";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata(
  "About Us",
  "The story, values and showroom behind our premium mattress experience."
);

const stats = [
  { value: "20+", label: "Years of comfort" },
  { value: "5,000+", label: "Happy sleepers" },
  { value: "100%", label: "Genuine products" },
  { value: "7-day", label: "Showroom support" }
];

const values = [
  {
    icon: HeartHandshake,
    title: "Guidance first",
    detail: "No pressure, no jargon — just honest advice to help you sleep better."
  },
  {
    icon: ShieldCheck,
    title: "Genuine & trusted",
    detail: "An authorized dealer offering only authentic, warranty-backed products."
  },
  {
    icon: Leaf,
    title: "Comfort you can feel",
    detail: "Curated collections you can experience in person before you decide."
  },
  {
    icon: Award,
    title: "Craft & quality",
    detail: "Every mattress is chosen for materials, durability and real support."
  }
];

const timeline = [
  { year: "2004", detail: "Showroom established with a curated, comfort-first product approach." },
  { year: "2012", detail: "Expanded into premium mattress consultation and sleep profiling." },
  { year: "2019", detail: "Became an authorized Restolex dealer partner." },
  { year: "2025", detail: "Launched our digital showroom and personalized enquiry experience." }
];

export default function AboutPage() {
  return (
    <div className="space-y-24 pb-8">
      {/* Intro */}
      <section className="px-4 pt-6 md:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Our Story</p>
            <AnimatedText
              as="h1"
              text="Better sleep,"
              className="mt-4 font-heading text-5xl text-secondary md:text-7xl"
            />
            <AnimatedText
              as="h1"
              text="thoughtfully guided."
              className="font-heading text-5xl text-primary md:text-7xl"
              delay={0.15}
            />
            <FadeUp delay={0.2}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                We are a premium mattress showroom and authorized dealer, dedicated to helping every
                customer discover their ideal sleep through patient consultation, transparent
                education and hands-on experience.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-border">
              <ParallaxImage className="absolute inset-0 h-full w-full" distance={40}>
                <Image
                  src="/images/showroom/store-2.svg"
                  alt="Our showroom"
                  fill
                  className="object-cover"
                />
              </ParallaxImage>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 md:px-8">
        <StaggerChildren className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <StaggerChild
              key={stat.label}
              className="rounded-3xl border border-border bg-white p-6 text-center shadow-soft"
            >
              <p className="font-heading text-4xl text-primary md:text-5xl">{stat.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </StaggerChild>
          ))}
        </StaggerChildren>
      </section>

      {/* Values */}
      <section className="px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeUp className="mx-auto mb-12 max-w-xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              What We Stand For
            </p>
            <h2 className="mt-3 font-heading text-4xl text-secondary md:text-5xl">
              Values that shape every visit.
            </h2>
          </FadeUp>
          <StaggerChildren className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => (
              <StaggerChild
                key={value.title}
                className="rounded-3xl border border-border bg-white p-7 shadow-soft"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <value.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-heading text-2xl text-secondary">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.detail}</p>
              </StaggerChild>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 md:px-8">
        <div className="mx-auto max-w-4xl">
          <FadeUp className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Our Journey</p>
            <h2 className="mt-3 font-heading text-4xl text-secondary md:text-5xl">
              Two decades of comfort.
            </h2>
          </FadeUp>
          <div className="relative border-l border-border pl-8">
            {timeline.map((entry) => (
              <FadeUp key={entry.year} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[2.35rem] flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-white">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </span>
                <p className="font-heading text-3xl text-primary">{entry.year}</p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-secondary">{entry.detail}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeUp className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Inside The Experience
            </p>
            <h2 className="mt-3 font-heading text-4xl text-secondary md:text-5xl">Our showroom.</h2>
          </FadeUp>
          <StaggerChildren className="grid gap-4 md:grid-cols-3">
            {["store-1.svg", "store-2.svg", "store-3.svg"].map((image) => (
              <StaggerChild
                key={image}
                className="relative h-64 overflow-hidden rounded-3xl border border-border shadow-soft"
              >
                <Image
                  src={`/images/showroom/${image}`}
                  alt="Showroom view"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </StaggerChild>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <ShowroomCta />
    </div>
  );
}
