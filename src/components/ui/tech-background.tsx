"use client";

import { motion } from "framer-motion";

const FLOATING_SNIPPETS = [
  "kubectl apply -f deploy.yaml",
  "terraform plan",
  "docker build -t api:latest .",
  "git push origin main",
  "const app = express()",
  "SELECT * FROM users",
  "async fn main()",
  "pip install torch",
];

export function TechBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none no-print"
      aria-hidden
    >
      {/* Base */}
      <div className="absolute inset-0 bg-tech-base" />

      {/* Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-[var(--tech-grid-opacity)]" />

      {/* Radial glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-tech-glow-blue blur-[120px] animate-tech-pulse" />
      <div className="absolute bottom-[-15%] right-[-5%] w-[45%] h-[45%] rounded-full bg-tech-glow-emerald blur-[100px] animate-tech-pulse-delayed" />
      <div className="absolute top-[40%] right-[20%] w-[25%] h-[25%] rounded-full bg-tech-glow-violet blur-[80px] opacity-40 animate-tech-float" />

      {/* Scan line */}
      <div className="absolute inset-0 tech-scanline opacity-[0.03] dark:opacity-[0.06]" />

      {/* Circuit corners */}
      <svg
        className="absolute top-4 left-4 w-24 h-24 text-electric-500/20 dark:text-electric-400/25"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path d="M10 10 H50 M10 10 V50" stroke="currentColor" strokeWidth="1" />
        <circle cx="10" cy="10" r="2" fill="currentColor" />
      </svg>
      <svg
        className="absolute bottom-4 right-4 w-24 h-24 text-emerald-500/20 rotate-180"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path d="M10 10 H50 M10 10 V50" stroke="currentColor" strokeWidth="1" />
        <circle cx="10" cy="10" r="2" fill="currentColor" />
      </svg>

      {/* Floating code hints */}
      <div className="absolute inset-0 overflow-hidden">
        {FLOATING_SNIPPETS.map((snippet, i) => (
          <motion.span
            key={snippet}
            className="absolute font-mono text-[10px] sm:text-xs text-electric-500/15 dark:text-electric-400/20 whitespace-nowrap select-none"
            style={{
              left: `${8 + (i * 11) % 75}%`,
              top: `${5 + (i * 13) % 85}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.15, 0.35, 0.15],
              y: [0, -12, 0],
            }}
            transition={{
              duration: 8 + i * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            {snippet}
          </motion.span>
        ))}
      </div>

      {/* Dot matrix overlay */}
      <div className="absolute inset-0 bg-tech-dots opacity-30 dark:opacity-50" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-tech-vignette" />
    </div>
  );
}
