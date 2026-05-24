import type { Resume } from "@/lib/schema/resume";

export type CVLocale = "vi" | "en";

export const sectionLabels = {
  vi: {
    summary: "Tóm tắt nghề nghiệp",
    skills: "Kỹ năng",
    experience: "Kinh nghiệm làm việc",
    projects: "Dự án",
    certifications: "Chứng chỉ",
    education: "Học vấn",
    openSource: "Open Source",
    languages: "Ngôn ngữ",
  },
  en: {
    summary: "Professional Summary",
    skills: "Technical Skills",
    experience: "Work Experience",
    projects: "Projects",
    certifications: "Certifications",
    education: "Education",
    openSource: "Open Source",
    languages: "Languages",
  },
} as const;

export function getSectionLabel(
  locale: Resume["meta"]["locale"],
  key: keyof typeof sectionLabels.en,
) {
  const l: CVLocale = locale === "vi" ? "vi" : "en";
  return sectionLabels[l][key];
}
