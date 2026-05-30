import type { Resume, SectionId } from "@/lib/schema/resume";
import { shouldRenderSection } from "@/lib/resume-normalize";
import type { CVLocale } from "@/i18n/section-labels";
import { CertificationsSection } from "@/components/cv/sections/certifications";
import { EducationSection } from "@/components/cv/sections/education";
import { ExperienceSection } from "@/components/cv/sections/experience";
import { LanguagesSection } from "@/components/cv/sections/languages";
import { OpenSourceSection } from "@/components/cv/sections/open-source";
import { ProjectsSection } from "@/components/cv/sections/projects";
import { SkillsSection } from "@/components/cv/sections/skills";
import { SummarySection } from "@/components/cv/sections/summary";

type Variant = "default" | "sidebar" | "compact";

const SIDEBAR_SECTIONS: SectionId[] = [
  "skills",
  "certifications",
  "education",
  "languages",
  "opensource",
];

export function SectionRenderer({
  sectionId,
  resume,
  variant = "default",
  compact = false,
}: {
  sectionId: SectionId;
  resume: Resume;
  variant?: Variant;
  compact?: boolean;
}) {
  if (!shouldRenderSection(resume, sectionId)) return null;

  const v = variant;
  const locale: CVLocale = resume.meta.locale === "vi" ? "vi" : "en";

  switch (sectionId) {
    case "summary":
      return <SummarySection summary={resume.summary} variant={v} locale={locale} />;
    case "skills":
      return (
        <SkillsSection skills={resume.skills} variant={v} compact={compact} locale={locale} />
      );
    case "experience":
      return (
        <ExperienceSection
          experience={resume.experience}
          variant={v}
          compact={compact}
          locale={locale}
        />
      );
    case "projects":
      return (
        <ProjectsSection projects={resume.projects} variant={v} compact={compact} locale={locale} />
      );
    case "certifications":
      return <CertificationsSection certifications={resume.certifications} variant={v} locale={locale} />;
    case "education":
      return <EducationSection education={resume.education} variant={v} locale={locale} />;
    case "opensource":
      return <OpenSourceSection openSource={resume.openSource} variant={v} locale={locale} />;
    case "languages":
      return <LanguagesSection languages={resume.languages} variant={v} locale={locale} />;
    default:
      return null;
  }
}

export { SIDEBAR_SECTIONS };
