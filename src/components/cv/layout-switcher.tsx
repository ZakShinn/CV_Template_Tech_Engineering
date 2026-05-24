"use client";

import type { LayoutType } from "@/lib/schema/resume";
import { cn } from "@/lib/utils";

const layouts: { value: LayoutType; label: string }[] = [
  { value: "two-column-modern", label: "2 cột" },
  { value: "single-column-ats", label: "ATS 1 cột" },
  { value: "compact-senior", label: "Senior gọn" },
];

export function LayoutSwitcher({
  value,
  onChange,
}: {
  value: LayoutType;
  onChange: (layout: LayoutType) => void;
}) {
  return (
    <select
      aria-label="Chọn layout CV"
      value={value}
      onChange={(e) => onChange(e.target.value as LayoutType)}
      className={cn(
        "h-8 rounded-lg border border-cv bg-transparent px-2 text-xs font-mono",
        "text-cv-muted hover:border-electric-500/50 focus:outline-none focus:ring-1 focus:ring-electric-500/40",
      )}
    >
      {layouts.map((l) => (
        <option key={l.value} value={l.value}>
          {l.label}
        </option>
      ))}
    </select>
  );
}
