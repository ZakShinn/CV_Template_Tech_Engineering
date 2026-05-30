import type { Resume, SectionId } from "@/lib/schema/resume";
import { DEFAULT_SECTION_ORDER } from "@/lib/schema/resume";

/** Chuỗi có nội dung sau khi trim */
export function hasText(value?: string | null): boolean {
  return Boolean(value?.trim());
}

/** Lọc dòng rỗng / chỉ khoảng trắng */
export function cleanLines(lines?: string[] | null): string[] {
  if (!lines?.length) return [];
  return lines.map((l) => (typeof l === "string" ? l.trim() : "")).filter(Boolean);
}

function cleanSkillCategories(
  categories: Resume["skills"] | undefined,
): Resume["skills"] {
  if (!categories?.length) return [];
  return categories
    .map((cat) => ({
      ...cat,
      id: cat.id?.trim() || "skills",
      label: cat.label?.trim() || "Skills",
      skills: (cat.skills ?? [])
        .map((s) => ({
          name: s.name?.trim() ?? "",
          proficiency: s.proficiency,
        }))
        .filter((s) => hasText(s.name)),
    }))
    .filter((cat) => cat.skills.length > 0);
}

function cleanExperience(list: Resume["experience"] | undefined): Resume["experience"] {
  if (!list?.length) return [];
  return list
    .filter((exp) => hasText(exp.company) || hasText(exp.position))
    .map((exp) => ({
      ...exp,
      id: exp.id?.trim() || `exp-${exp.company}`.replace(/\s+/g, "-").toLowerCase(),
      company: exp.company?.trim() ?? "",
      position: exp.position?.trim() ?? "",
      location: exp.location?.trim() || undefined,
      startDate: exp.startDate?.trim() ?? "",
      endDate: exp.endDate?.trim() || undefined,
      stack: cleanLines(exp.stack),
      responsibilities: cleanLines(exp.responsibilities),
      achievements: cleanLines(exp.achievements),
    }));
}

function cleanProjects(list: Resume["projects"] | undefined): Resume["projects"] {
  if (!list?.length) return [];
  return list
    .filter((p) => hasText(p.name))
    .map((p) => ({
      ...p,
      id: p.id?.trim() || `proj-${p.name}`.replace(/\s+/g, "-").toLowerCase(),
      name: p.name.trim(),
      description: p.description?.trim() || undefined,
      github: p.github?.trim() || undefined,
      demo: p.demo?.trim() || undefined,
      stack: cleanLines(p.stack),
      architecture: p.architecture?.trim() || undefined,
      achievements: cleanLines(p.achievements),
    }));
}

function cleanEducation(list: Resume["education"] | undefined): Resume["education"] {
  if (!list?.length) return [];
  return list
    .filter((e) => hasText(e.university) || hasText(e.degree))
    .map((e) => ({
      ...e,
      id: e.id?.trim() || `edu-${e.university}`.slice(0, 20),
      university: e.university?.trim() ?? "",
      degree: e.degree?.trim() ?? "",
      major: e.major?.trim() || undefined,
      graduationYear: e.graduationYear?.trim() ?? "",
      gpa: e.gpa?.trim() || undefined,
    }));
}

function cleanCertifications(
  list: Resume["certifications"] | undefined,
): Resume["certifications"] {
  if (!list?.length) return [];
  return list
    .filter((c) => hasText(c.name))
    .map((c) => ({
      ...c,
      id: c.id?.trim() || `cert-${c.name}`.slice(0, 24),
      name: c.name.trim(),
      issuer: c.issuer?.trim() ?? "",
      date: c.date?.trim() || undefined,
      credentialId: c.credentialId?.trim() || undefined,
      url: c.url?.trim() || undefined,
    }));
}

function cleanLanguages(list: Resume["languages"] | undefined): Resume["languages"] {
  if (!list?.length) return [];
  return list
    .filter((l) => hasText(l.name))
    .map((l) => ({
      name: l.name.trim(),
      level: l.level?.trim() ?? "",
    }));
}

function cleanOpenSource(
  oss: Resume["openSource"] | undefined,
): Resume["openSource"] | undefined {
  if (!oss) return undefined;

  const highlights = cleanLines(oss.highlights);
  const repositories = (oss.repositories ?? []).filter((r) => hasText(r.name));
  const hasStats =
    oss.stats &&
    (oss.stats.repositories != null ||
      oss.stats.stars != null ||
      oss.stats.contributions != null);
  const hasUser = hasText(oss.githubUsername);

  if (!hasUser && !hasStats && repositories.length === 0 && highlights.length === 0) {
    return undefined;
  }

  return {
    ...oss,
    githubUsername: oss.githubUsername?.trim() || undefined,
    highlights: highlights.length ? highlights : undefined,
    repositories: repositories.length ? repositories : undefined,
    stats: hasStats ? oss.stats : undefined,
  };
}

function cleanContact(contact: Resume["personal"]["contact"]): Resume["personal"]["contact"] {
  const c = contact ?? ({} as Resume["personal"]["contact"]);
  return {
    email: c.email?.trim() ?? "",
    phone: c.phone?.trim() || undefined,
    location: c.location?.trim() || undefined,
    birthDate: c.birthDate?.trim() || undefined,
    linkedin: c.linkedin?.trim() ?? "",
    github: c.github?.trim() ?? "",
    portfolio: c.portfolio?.trim() ?? "",
    blog: c.blog?.trim() ?? "",
    stackoverflow: c.stackoverflow?.trim() ?? "",
    facebook: c.facebook?.trim() ?? "",
    zalo: c.zalo?.trim() ?? "",
  };
}

import { isCvSectionEnabled } from "@/config";

/** Section có dữ liệu để hiển thị không */
export function hasSectionContent(resume: Resume, sectionId: SectionId): boolean {
  switch (sectionId) {
    case "summary":
      return hasText(resume.summary);
    case "skills":
      return resume.skills.length > 0;
    case "experience":
      return resume.experience.length > 0;
    case "projects":
      return resume.projects.length > 0;
    case "certifications":
      return resume.certifications.length > 0;
    case "education":
      return resume.education.length > 0;
    case "languages":
      return resume.languages.length > 0;
    case "opensource":
      return Boolean(resume.openSource);
    default:
      return false;
  }
}

/** Section được bật trong config và còn dữ liệu */
export function shouldRenderSection(
  resume: Resume,
  sectionId: SectionId,
): boolean {
  if (!isCvSectionEnabled(sectionId)) return false;
  return hasSectionContent(resume, sectionId);
}

/** Chỉ giữ section còn nội dung + thứ tự hợp lệ */
export function resolveSectionOrder(
  resume: Resume,
  preferred?: SectionId[],
): SectionId[] {
  const base = preferred?.length ? preferred : DEFAULT_SECTION_ORDER;
  const seen = new Set<SectionId>();
  const ordered: SectionId[] = [];

  for (const id of base) {
    if (seen.has(id)) continue;
    if (!shouldRenderSection(resume, id)) continue;
    seen.add(id);
    ordered.push(id);
  }

  for (const id of DEFAULT_SECTION_ORDER) {
    if (seen.has(id)) continue;
    if (!shouldRenderSection(resume, id)) continue;
    seen.add(id);
    ordered.push(id);
  }

  return ordered;
}

export type ResumeDraft = {
  version?: Resume["version"];
  meta?: Partial<Resume["meta"]>;
  personal?: Partial<Resume["personal"]> & {
    contact?: Partial<Resume["personal"]["contact"]>;
  };
  summary?: string;
  sectionOrder?: SectionId[];
  skills?: Resume["skills"];
  experience?: Resume["experience"];
  projects?: Resume["projects"];
  certifications?: Resume["certifications"];
  education?: Resume["education"];
  openSource?: Resume["openSource"];
  languages?: Resume["languages"];
};

/**
 * Chuẩn hoá CV sau khi gộp basic + advanced.
 * Xoá dòng/block rỗng, bỏ section không có dữ liệu — app vẫn chạy bình thường.
 */
export function normalizeResume(draft: ResumeDraft): Resume {
  const personalIn = draft.personal ?? ({} as Resume["personal"]);
  const contact = cleanContact(
    personalIn.contact as Resume["personal"]["contact"],
  );

  const skills = cleanSkillCategories([
    ...(draft.skills ?? []),
  ]);

  const experience = cleanExperience(draft.experience);
  const projects = cleanProjects(draft.projects);
  const certifications = cleanCertifications(draft.certifications);
  const education = cleanEducation(draft.education);
  const languages = cleanLanguages(draft.languages);
  const openSource = cleanOpenSource(draft.openSource);

  const normalized: Resume = {
    version: "1.0",
    meta: {
      layout: draft.meta?.layout ?? "two-column-modern",
      theme: draft.meta?.theme,
      locale: draft.meta?.locale ?? "vi",
    },
    personal: {
      fullName: personalIn.fullName?.trim() || "Your Name",
      alias: personalIn.alias?.trim() || undefined,
      title: personalIn.title?.trim() || "",
      avatar: personalIn.avatar?.trim() ?? "",
      contact,
      qrEnabled: personalIn.qrEnabled,
    },
    summary: draft.summary?.trim() ?? "",
    skills,
    experience,
    projects,
    certifications,
    education,
    openSource,
    languages,
    sectionOrder: [],
  };

  normalized.sectionOrder = resolveSectionOrder(
    normalized,
    draft.sectionOrder,
  );

  return normalized;
}
