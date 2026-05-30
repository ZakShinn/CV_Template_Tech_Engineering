import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
} from "docx";
import type { Resume } from "@/lib/schema/resume";
import { shouldRenderSection } from "@/lib/resume-normalize";
import { getSectionLabel, getUiString } from "@/i18n/section-labels";

export async function exportResumeToDocx(resume: Resume): Promise<Blob> {
  const locale = resume.meta.locale === "vi" ? "vi" : "en";
  const children: Paragraph[] = [];

  children.push(
    new Paragraph({
      heading: HeadingLevel.TITLE,
      children: [new TextRun({ text: resume.personal.fullName, bold: true, size: 32 })],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: resume.personal.title,
          color: "0066CC",
          size: 24,
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: [
            resume.personal.contact.email,
            resume.personal.contact.phone,
            resume.personal.contact.location,
          ]
            .filter(Boolean)
            .join(" | "),
          size: 20,
        }),
      ],
    }),
    new Paragraph({ text: "" }),
  );

  const links = [
    resume.personal.contact.linkedin,
    resume.personal.contact.github,
    resume.personal.contact.portfolio,
  ].filter(Boolean);
  if (links.length) {
    children.push(new Paragraph({ children: [new TextRun(links.join(" | "))] }));
    children.push(new Paragraph({ text: "" }));
  }

  if (shouldRenderSection(resume, "summary")) {
    children.push(
      new Paragraph({ heading: HeadingLevel.HEADING_1, text: getSectionLabel(locale, "summary") }),
      new Paragraph({ children: [new TextRun(resume.summary)] }),
      new Paragraph({ text: "" }),
    );
  }

  if (shouldRenderSection(resume, "skills")) {
    children.push(
      new Paragraph({ heading: HeadingLevel.HEADING_1, text: getSectionLabel(locale, "skills") }),
    );
    for (const cat of resume.skills) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: cat.label, bold: true }),
            new TextRun({ text: ": " + cat.skills.map((s) => s.name).join(", ") }),
          ],
        }),
      );
    }
    children.push(new Paragraph({ text: "" }));
  }

  if (shouldRenderSection(resume, "experience")) {
    children.push(
      new Paragraph({ heading: HeadingLevel.HEADING_1, text: getSectionLabel(locale, "experience") }),
    );
    for (const exp of resume.experience) {
      const dates = exp.current
        ? `${exp.startDate} – ${getUiString(locale, "present")}`
        : `${exp.startDate} – ${exp.endDate ?? ""}`;
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: exp.position, bold: true }),
            new TextRun({ text: ` | ${exp.company} | ${dates}` }),
          ],
        }),
      );
      if (exp.stack?.length) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${getUiString(locale, "stack")}: ${exp.stack.join(", ")}`,
                italics: true,
              }),
            ],
          }),
        );
      }
      for (const ach of exp.achievements ?? []) {
        children.push(
          new Paragraph({ bullet: { level: 0 }, children: [new TextRun(ach)] }),
        );
      }
      for (const r of exp.responsibilities ?? []) {
        children.push(
          new Paragraph({ bullet: { level: 0 }, children: [new TextRun(r)] }),
        );
      }
    }
    children.push(new Paragraph({ text: "" }));
  }

  if (shouldRenderSection(resume, "projects")) {
    children.push(
      new Paragraph({ heading: HeadingLevel.HEADING_1, text: getSectionLabel(locale, "projects") }),
    );
    for (const proj of resume.projects) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: proj.name, bold: true })],
        }),
      );
      if (proj.description) {
        children.push(new Paragraph({ children: [new TextRun(proj.description)] }));
      }
      if (proj.stack?.length) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: proj.stack.join(", "), italics: true })],
          }),
        );
      }
      for (const ach of proj.achievements ?? []) {
        children.push(
          new Paragraph({ bullet: { level: 0 }, children: [new TextRun(ach)] }),
        );
      }
    }
    children.push(new Paragraph({ text: "" }));
  }

  if (shouldRenderSection(resume, "certifications")) {
    children.push(
      new Paragraph({ heading: HeadingLevel.HEADING_1, text: getSectionLabel(locale, "certifications") }),
    );
    for (const c of resume.certifications) {
      children.push(new Paragraph({ text: `${c.name} — ${c.issuer}` }));
    }
    children.push(new Paragraph({ text: "" }));
  }

  if (shouldRenderSection(resume, "education")) {
    children.push(
      new Paragraph({ heading: HeadingLevel.HEADING_1, text: getSectionLabel(locale, "education") }),
    );
    for (const edu of resume.education) {
      const year = edu.graduationYear ? ` (${edu.graduationYear})` : "";
      children.push(
        new Paragraph({
          text: `${edu.university} — ${edu.degree}${edu.major ? `, ${edu.major}` : ""}${year}`,
        }),
      );
    }
    children.push(new Paragraph({ text: "" }));
  }

  if (shouldRenderSection(resume, "opensource") && resume.openSource) {
    children.push(
      new Paragraph({ heading: HeadingLevel.HEADING_1, text: getSectionLabel(locale, "openSource") }),
    );
    if (resume.openSource.githubUsername) {
      children.push(
        new Paragraph({ text: `github.com/${resume.openSource.githubUsername}` }),
      );
    }
    for (const h of resume.openSource.highlights ?? []) {
      children.push(new Paragraph({ bullet: { level: 0 }, children: [new TextRun(h)] }));
    }
    children.push(new Paragraph({ text: "" }));
  }

  if (shouldRenderSection(resume, "languages")) {
    children.push(
      new Paragraph({ heading: HeadingLevel.HEADING_1, text: getSectionLabel(locale, "languages") }),
    );
    for (const lang of resume.languages) {
      children.push(new Paragraph({ text: `${lang.name} — ${lang.level}` }));
    }
  }

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });

  return Packer.toBlob(doc);
}

export function downloadDocx(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
