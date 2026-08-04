export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 font-heading text-4xl text-secondary md:text-5xl">{title}</h2>
      {description ? <p className="mt-3 text-muted-foreground">{description}</p> : null}
    </div>
  );
}
