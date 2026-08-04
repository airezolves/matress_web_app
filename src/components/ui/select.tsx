import { cn } from "@/lib/utils";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-xl border border-border bg-white px-3 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
