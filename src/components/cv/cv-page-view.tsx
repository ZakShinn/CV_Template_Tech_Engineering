"use client";

import { motion } from "framer-motion";
import { CVRenderer } from "@/components/cv/cv-renderer";
import { ExportActions } from "@/components/cv/export-actions";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { TechBackground } from "@/components/ui/tech-background";
import { appConfig } from "@/data/config";
import type { Resume } from "@/lib/schema/resume";

/** Trang xem CV — zoom x2 màn hình; bản in riêng scale 1:1 */
export function CvPageView({ resume }: { resume: Resume }) {
  const scale = appConfig.browserDisplayScale;

  return (
    <div
      className="relative min-h-screen cv-app-root"
      style={{ "--cv-display-scale": String(scale) } as React.CSSProperties}
    >
      <TechBackground />

      <header className="no-print sticky top-0 z-50 border-b border-cv/60 backdrop-blur-xl bg-[var(--header-bg)]">
        <div className="tech-header-bar w-full absolute bottom-0 left-0" />
        <div className="max-w-[100vw] mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-3">
          <motion.div
            className="flex items-center gap-3 min-w-0"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-electric-500/30 bg-electric-500/10 font-mono text-xs text-cv-accent">
              &lt;/&gt;
            </div>
            <span className="font-semibold text-sm tracking-tight gradient-text-tech truncate">
              {resume.personal.fullName}
            </span>
          </motion.div>
          <div className="flex items-center gap-2 shrink-0">
            <ExportActions resume={resume} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Màn hình: zoom x2 */}
      <main className="cv-screen-only cv-screen-main w-full overflow-x-auto px-4 md:px-6 py-8 md:py-10">
        <motion.div
          className="cv-scale-outer mx-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <div className="cv-scale-viewport">
            <CVRenderer resume={resume} animate id="cv-preview" />
          </div>
        </motion.div>
      </main>

      {/* In: bản 1:1, không zoom — ẩn trên màn hình */}
      <div className="cv-print-only" aria-hidden>
        <CVRenderer resume={resume} animate={false} id="cv-print" />
      </div>
    </div>
  );
}
