import { SectionTitle } from "@/components/cv/shared/section-title";
import { getSectionLabel, type CVLocale } from "@/i18n/section-labels";
import type { Resume } from "@/lib/schema/resume";

export function LanguagesSection({
  languages,
  variant = "default",
  locale = "en",
}: {
  languages: Resume["languages"];
  variant?: "default" | "sidebar" | "compact";
  locale?: CVLocale;
}) {
  return (
    <section className="print-break-avoid" aria-labelledby="languages-heading">
      <SectionTitle
        variant={
          variant === "sidebar" ? "sidebar" : variant === "compact" ? "compact" : "default"
        }
      >
        <span id="languages-heading">{getSectionLabel(locale, "languages")}</span>
      </SectionTitle>
      <ul className="space-y-1.5">
        {languages.map((lang) => (
          <li key={lang.name} className="text-sm flex justify-between gap-4">
            <span className="font-medium">{lang.name}</span>
            <span className="text-cv-muted text-xs text-right">{lang.level}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
