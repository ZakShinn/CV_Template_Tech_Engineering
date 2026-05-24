import { SectionTitle } from "@/components/cv/shared/section-title";
import { getSectionLabel, type CVLocale } from "@/i18n/section-labels";
import type { Resume } from "@/lib/schema/resume";

export function CertificationsSection({
  certifications,
  variant = "default",
  locale = "en",
}: {
  certifications: Resume["certifications"];
  variant?: "default" | "sidebar" | "compact";
  locale?: CVLocale;
}) {
  if (!certifications.length) return null;

  return (
    <section className="print-break-avoid" aria-labelledby="certs-heading">
      <SectionTitle
        variant={
          variant === "sidebar" ? "sidebar" : variant === "compact" ? "compact" : "default"
        }
      >
        <span id="certs-heading">{getSectionLabel(locale, "certifications")}</span>
      </SectionTitle>
      <ul className="space-y-2">
        {certifications.map((cert) => (
          <li key={cert.id} className="text-sm">
            <span className="font-medium text-[var(--cv-fg)]">{cert.name}</span>
            <span className="text-cv-muted"> — {cert.issuer}</span>
            {cert.date && (
              <span className="text-xs text-cv-muted ml-2">({cert.date})</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
