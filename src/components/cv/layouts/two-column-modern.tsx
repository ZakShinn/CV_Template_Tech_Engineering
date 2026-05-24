import { CVHeader } from "@/components/cv/sections/header";
import {
  SectionRenderer,
  SIDEBAR_SECTIONS,
} from "@/components/cv/section-renderer";
import type { Resume, SectionId } from "@/lib/schema/resume";

const MAIN_DEFAULT: SectionId[] = [
  "summary",
  "experience",
  "projects",
];

export function TwoColumnModern({ resume }: { resume: Resume }) {
  const order = resume.sectionOrder;
  const sidebarIds = order.filter((id) => SIDEBAR_SECTIONS.includes(id));
  const mainIds = order.filter(
    (id) => !SIDEBAR_SECTIONS.includes(id) || id === "summary",
  );

  const mainOrdered =
    mainIds.length > 0
      ? mainIds
      : MAIN_DEFAULT.filter((id) => order.includes(id) || id === "summary");

  const sidebarOrdered =
    sidebarIds.length > 0
      ? sidebarIds
      : SIDEBAR_SECTIONS.filter((id) => order.includes(id));

  return (
    <article
      className="cv-paper max-w-[210mm] mx-auto"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-10">
        <aside className="space-y-6 lg:border-r border-cv lg:pr-8 print:break-inside-avoid lg:bg-gradient-to-b lg:from-cv-muted/[0.06] lg:to-transparent">
          <CVHeader personal={resume.personal} variant="sidebar" />
          {sidebarOrdered.map((sectionId) => (
            <SectionRenderer
              key={sectionId}
              sectionId={sectionId}
              resume={resume}
              variant="sidebar"
            />
          ))}
        </aside>

        <main className="space-y-6 min-w-0">
          {mainOrdered.map((sectionId) => (
            <SectionRenderer
              key={sectionId}
              sectionId={sectionId}
              resume={resume}
              variant="default"
            />
          ))}
        </main>
      </div>
    </article>
  );
}
