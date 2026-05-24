import { CVHeader } from "@/components/cv/sections/header";
import { SectionRenderer } from "@/components/cv/section-renderer";
import type { Resume } from "@/lib/schema/resume";

/** Dense layout for senior engineers with extensive experience */
export function CompactSenior({ resume }: { resume: Resume }) {
  return (
    <article
      className="cv-paper max-w-[210mm] mx-auto text-[13px] leading-snug"
      itemScope
      itemType="https://schema.org/Person"
    >
      <CVHeader personal={resume.personal} variant="compact" />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-6 md:gap-8">
        <div className="space-y-4 min-w-0">
          {resume.sectionOrder
            .filter((id) =>
              ["summary", "experience", "projects"].includes(id),
            )
            .map((sectionId) => (
              <SectionRenderer
                key={sectionId}
                sectionId={sectionId}
                resume={resume}
                variant="compact"
                compact
              />
            ))}
        </div>
        <div className="space-y-4 md:border-l md:border-cv md:pl-6 print:border-l print:pl-4">
          {resume.sectionOrder
            .filter((id) =>
              ["skills", "certifications", "education", "opensource", "languages"].includes(
                id,
              ),
            )
            .map((sectionId) => (
              <SectionRenderer
                key={sectionId}
                sectionId={sectionId}
                resume={resume}
                variant="compact"
                compact
              />
            ))}
        </div>
      </div>
    </article>
  );
}
