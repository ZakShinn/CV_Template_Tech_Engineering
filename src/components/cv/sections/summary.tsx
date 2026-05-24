import { SectionTitle } from "@/components/cv/shared/section-title";
import { getSectionLabel, type CVLocale } from "@/i18n/section-labels";

export function SummarySection({
  summary,
  variant = "default",
  locale = "en",
}: {
  summary: string;
  variant?: "default" | "sidebar" | "compact";
  locale?: CVLocale;
}) {
  return (
    <section className="print-break-avoid" aria-labelledby="summary-heading">
      <SectionTitle variant={variant === "sidebar" ? "sidebar" : variant === "compact" ? "compact" : "default"}>
        <span id="summary-heading">{getSectionLabel(locale, "summary")}</span>
      </SectionTitle>
      <p className="text-sm leading-relaxed text-cv-muted">{summary}</p>
    </section>
  );
}
