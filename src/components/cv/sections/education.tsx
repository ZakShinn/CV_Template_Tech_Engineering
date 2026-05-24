import { SectionTitle } from "@/components/cv/shared/section-title";
import { getSectionLabel, type CVLocale } from "@/i18n/section-labels";
import type { Resume } from "@/lib/schema/resume";

export function EducationSection({
  education,
  variant = "default",
  locale = "en",
}: {
  education: Resume["education"];
  variant?: "default" | "sidebar" | "compact";
  locale?: CVLocale;
}) {
  return (
    <section className="print-break-avoid" aria-labelledby="education-heading">
      <SectionTitle
        variant={
          variant === "sidebar" ? "sidebar" : variant === "compact" ? "compact" : "default"
        }
      >
        <span id="education-heading">{getSectionLabel(locale, "education")}</span>
      </SectionTitle>
      <div className="space-y-3">
        {education.map((edu) => (
          <div key={edu.id} className="text-sm">
            <h3 className="font-semibold">{edu.university}</h3>
            <p className="text-cv-muted">
              {edu.degree}
              {edu.major && ` · ${edu.major}`}
            </p>
            <p className="text-xs text-cv-muted mt-0.5">
              {edu.graduationYear}
              {edu.gpa && ` · GPA ${edu.gpa}`}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
