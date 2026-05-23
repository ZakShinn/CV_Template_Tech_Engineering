import { cn } from "@/lib/utils";

export function SectionTitle({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "sidebar" | "compact";
}) {
  return (
    <div className={cn("mb-3", variant === "compact" && "mb-2")}>
      <h2
        className={cn(
          "font-semibold tracking-tight text-[var(--cv-fg)] flex items-center gap-2",
          variant === "default" &&
            "text-xs uppercase tracking-[0.2em] text-cv-muted",
          variant === "sidebar" &&
            "text-[10px] uppercase tracking-[0.25em] text-cv-accent font-mono",
          variant === "compact" &&
            "text-[10px] uppercase tracking-wider text-cv-muted font-mono",
          className,
        )}
      >
        <span
          className={cn(
            "h-1 w-1 rounded-full shrink-0",
            variant === "sidebar" ? "bg-electric-500" : "bg-electric-500/70",
          )}
        />
        {children}
      </h2>
      {variant === "default" && (
        <div className="mt-2 h-px w-full bg-gradient-to-r from-electric-500/40 via-cv-border to-transparent" />
      )}
    </div>
  );
}
