"use client";

import { motion } from "framer-motion";
import { CompactSenior } from "@/components/cv/layouts/compact-senior";
import { SingleColumnATS } from "@/components/cv/layouts/single-column-ats";
import { TwoColumnModern } from "@/components/cv/layouts/two-column-modern";
import type { Resume } from "@/lib/schema/resume";
import { cn } from "@/lib/utils";

export function CVRenderer({
  resume,
  className,
  id = "cv-preview",
  animate = true,
}: {
  resume: Resume;
  className?: string;
  id?: string;
  animate?: boolean;
}) {
  const layout = resume.meta.layout;

  const content = (() => {
    switch (layout) {
      case "single-column-ats":
        return <SingleColumnATS resume={resume} />;
      case "compact-senior":
        return <CompactSenior resume={resume} />;
      case "two-column-modern":
      default:
        return <TwoColumnModern resume={resume} />;
    }
  })();

  const Wrapper = animate ? motion.div : "div";
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 12, scale: 0.995 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
      }
    : {};

  return (
    <div className="relative">
      {/* Glow behind CV paper */}
      <div
        className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-electric-500/10 via-transparent to-emerald-500/5 blur-xl pointer-events-none print:hidden"
        aria-hidden
      />
      <Wrapper
        id={id}
        className={cn(
          "cv-paper relative rounded-xl border border-cv/80",
          "shadow-cv-preview p-8 md:p-10",
          "print:shadow-none print:border-0 print:rounded-none print:p-0",
          "before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px]",
          "before:bg-gradient-to-r before:from-transparent before:via-electric-500/60 before:to-transparent",
          "before:rounded-t-xl before:print:hidden",
          className,
        )}
        {...motionProps}
      >
        {content}
      </Wrapper>
    </div>
  );
}
