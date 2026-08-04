import homepage from "@/data/homepage.json";

export function TrustStrip() {
  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 rounded-[var(--radius-card)] border border-border bg-secondary p-6 text-white md:grid-cols-3 md:p-8">
        {homepage.trustStats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-white/20 bg-white/5 p-5 text-center">
            <p className="font-heading text-4xl">{stat.value}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.14em] text-white/80">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
