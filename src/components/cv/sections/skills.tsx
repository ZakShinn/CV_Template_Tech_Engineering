import { ProficiencyDots } from "@/components/cv/shared/proficiency-dots";
import { SectionTitle } from "@/components/cv/shared/section-title";
import { getSectionLabel, type CVLocale } from "@/i18n/section-labels";
import type { SkillCategory } from "@/lib/schema/resume";
import { cn } from "@/lib/utils";

export function SkillsSection({
  skills,
  variant = "default",
  compact = false,
  locale = "en",
}: {
  skills: SkillCategory[];
  variant?: "default" | "sidebar" | "compact";
  compact?: boolean;
  locale?: CVLocale;
}) {
  return (
    <section className="print-break-avoid" aria-labelledby="skills-heading">
      <SectionTitle
        variant={
          variant === "sidebar" ? "sidebar" : variant === "compact" ? "compact" : "default"
        }
      >
        <span id="skills-heading">{getSectionLabel(locale, "skills")}</span>
      </SectionTitle>
      <div className={cn("space-y-4", compact && "space-y-3")}>
        {skills.map((cat) => (
          <div key={cat.id}>
            <h3
              className={cn(
                "font-medium text-[var(--cv-fg)] mb-2",
                compact ? "text-xs" : "text-sm",
              )}
            >
              {cat.label}
            </h3>
            <ul className="flex flex-wrap gap-1.5" role="list">
              {cat.skills.map((skill) => (
                <li key={skill.name} className="skill-tag inline-flex items-center">
                  {skill.name}
                  {!compact && <ProficiencyDots level={skill.proficiency} />}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
