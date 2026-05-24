import { ExternalLink, Github } from "lucide-react";
import { SectionTitle } from "@/components/cv/shared/section-title";
import { getSectionLabel, type CVLocale } from "@/i18n/section-labels";
import type { Project } from "@/lib/schema/resume";
import { cn } from "@/lib/utils";

export function ProjectsSection({
  projects,
  variant = "default",
  compact = false,
  locale = "en",
}: {
  projects: Project[];
  variant?: "default" | "sidebar" | "compact";
  compact?: boolean;
  locale?: CVLocale;
}) {
  const sorted = [...projects].sort(
    (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
  );

  return (
    <section aria-labelledby="projects-heading">
      <SectionTitle
        variant={
          variant === "sidebar" ? "sidebar" : variant === "compact" ? "compact" : "default"
        }
      >
        <span id="projects-heading">{getSectionLabel(locale, "projects")}</span>
      </SectionTitle>
      <div className={cn("space-y-4", compact && "space-y-3")}>
        {sorted.map((proj) => (
          <article
            key={proj.id}
            className={cn(
              "print-break-avoid rounded-md border border-cv p-3",
              proj.featured &&
                "border-electric-500/40 bg-gradient-to-br from-electric-500/10 to-transparent shadow-[inset_0_1px_0_rgba(94,179,255,0.1)]",
            )}
          >
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={cn("font-semibold", compact ? "text-sm" : "text-base")}>
                {proj.name}
              </h3>
              {proj.featured && (
                <span className="text-[10px] uppercase tracking-wider font-mono text-emerald-500 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                  Featured
                </span>
              )}
              <div className="flex gap-2 ml-auto">
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cv-muted hover:text-cv-accent"
                    aria-label="GitHub"
                  >
                    <Github className="h-3.5 w-3.5" />
                  </a>
                )}
                {proj.demo && (
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cv-muted hover:text-cv-accent"
                    aria-label="Live demo"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
            {proj.description && (
              <p className="text-sm text-cv-muted mt-1">{proj.description}</p>
            )}
            {proj.architecture && (
              <p className="text-xs font-mono text-cv-muted mt-2 border-l-2 border-electric-500/40 pl-2">
                {proj.architecture}
              </p>
            )}
            <p className="text-xs font-mono mt-2 text-cv-muted">
              {proj.stack.join(" · ")}
            </p>
            {proj.achievements && proj.achievements.length > 0 && (
              <ul className="mt-2 space-y-1 list-disc list-outside ml-4">
                {proj.achievements.map((a, i) => (
                  <li key={i} className="text-sm text-cv-muted">
                    {a}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
