import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cv-surface)] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-electric-500 text-white shadow-[0_0_20px_-4px_rgba(10,132,255,0.5)] hover:bg-electric-400 hover:shadow-[0_0_28px_-4px_rgba(10,132,255,0.6)] dark:bg-electric-500 dark:hover:bg-electric-400",
        secondary:
          "bg-graphite-100/80 text-graphite-900 border border-cv hover:bg-graphite-200 dark:bg-graphite-800/80 dark:text-graphite-100 dark:hover:bg-graphite-700 dark:border-graphite-700",
        outline:
          "border border-cv bg-[var(--panel-bg)] backdrop-blur-sm hover:border-electric-500/40 hover:bg-cv-accent-soft/50 text-[var(--cv-fg)]",
        ghost:
          "hover:bg-electric-500/10 text-[var(--cv-fg)] hover:text-cv-accent",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-6",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  ),
);
Button.displayName = "Button";
