import type { LayoutType, SectionId } from "@/lib/schema/resume";

/**
 * ═══════════════════════════════════════════════════════════════
 *  CẤU HÌNH — src/config.ts
 *  Hướng dẫn: src/huongdan.md
 * ═══════════════════════════════════════════════════════════════
 *
 *  BẬT/TẮT GÌ Ở ĐÂU?
 *  ─────────────────
 *  • Danh mục CV (Summary, Skills, Experience…): `configAdvanced.sections` (true = hiện).
 *  • UI trang web (nút, nền, export, QR): `configAdvanced.features` + vài cờ bên dưới.
 *  • Section tắt trong config vẫn giữ dữ liệu trong resume-*.ts — chỉ không render web/PDF/DOCX.
 *  • Section bật nhưng không có dữ liệu vẫn tự ẩn (`normalizeResume`).
 *
 *  BẢNG `sections` — false = ẩn danh mục (web + in + PDF + DOCX)
 *  summary | skills | experience | education | languages
 *  projects | certifications | opensource
 *
 *  BẢNG `features` — false = ẩn thành phần UI trang
 *  ┌────────────────────┬──────────────────────────────────────────────┐
 *  │ techBackground     │ Nền grid + hiệu ứng công nghệ phía sau CV    │
 *  │ themeToggle        │ Nút đổi dark / light (header)                │
 *  │ localeToggle       │ Nút VI / EN (cần translationApi)             │
 *  │ layoutSwitcher     │ Nút đổi layout CV (header)                   │
 *  │ showQrCode         │ Khối QR trong header CV (+ qrContactEnabled) │
 *  │ exportPrint        │ Nút "In CV"                                    │
 *  │ exportPdf          │ Nút tải PDF                                    │
 *  │ exportDocx         │ Nút tải DOCX                                   │
 *  │ translationApi     │ Gọi API dịch + cho phép localeToggle           │
 *  │ blockGoogle        │ (dự kiến) chặn font/CSP/dịch qua Google       │
 *  └────────────────────┴──────────────────────────────────────────────┘
 */

/** Cấu hình cơ bản — SEO, layout mặc định, chặn index */
export const configBasic = {
  /** Tiêu đề tab trình duyệt */
  title: "Võ Hoàng Hải Nghĩa — CV | ZakShinn",

  /** URL site (SEO, Open Graph) */
  siteUrl: "https://your-cv.vercel.app",

  /** Mô tả meta */
  description:
    "CV Võ Hoàng Hải Nghĩa (ZakShinn) — Senior System Administrator, DevOps, Lead Developer. MikroTik, Ubuntu, WireGuard, Next.js.",

  /** Layout CV: two-column-modern | single-column-ats | compact-senior */
  defaultLayout: "two-column-modern" as LayoutType,

  /** Giao diện: light | dark | system */
  defaultTheme: "dark" as "light" | "dark" | "system",

  /** Ngôn ngữ mặc định CV: vi | en */
  defaultLocale: "vi" as "vi" | "en",

  /**
   * Chặn Google/Bing index trang CV.
   * true = meta noindex + robots.txt Disallow + header X-Robots-Tag.
   * Đặt false nếu muốn CV xuất hiện trên tìm kiếm.
   */
  blockSearchIndexing: true,
} as const;

/**
 * Cấu hình nâng cao — zoom trình duyệt, export, QR, ẩn/hiện danh mục CV, `features`.
 */
export const configAdvanced = {
  /** Phóng to CV trên trình duyệt (1 = 100%, 2 = 200%). In ấn luôn 100% */
  browserDisplayScale: 2,

  /** Tiền tố tên file khi tải PDF/DOCX (vd. CV_Ten.pdf) */
  exportFilenamePrefix: "CV",

  /**
   * Cho phép gắn QR liên hệ vào header CV.
   * Hiển thị thật cần cả hai: qrContactEnabled = true VÀ features.showQrCode = true.
   */
  qrContactEnabled: true,

  /**
   * Bật/tắt từng danh mục trên CV (true = hiện, false = ẩn).
   * Áp dụng web, in, PDF, DOCX. Dữ liệu vẫn nằm trong resume-basic / resume-advanced.
   */
  sections: {
    /** Tóm tắt / Profile — resume-basic.ts → summary */
    summary: true,
    /** Kỹ năng — resume-basic.ts + resume-advanced.ts → skillsExtra */
    skills: true,
    /** Kinh nghiệm — resume-basic.ts → experience */
    experience: true,
    /** Học vấn — resume-basic.ts → education */
    education: true,
    /** Ngôn ngữ — resume-basic.ts → languages */
    languages: true,
    /** Dự án — resume-advanced.ts → projects */
    projects: true,
    /** Chứng chỉ — resume-advanced.ts → certifications */
    certifications: true,
    /** Open Source — resume-advanced.ts → openSource */
    opensource: true,
  } as const satisfies Record<
    | "summary"
    | "skills"
    | "experience"
    | "education"
    | "languages"
    | "projects"
    | "certifications"
    | "opensource",
    boolean
  >,

  /**
   * Bật/tắt thành phần giao diện trang CV (true = hiện, false = ẩn).
   * Không điều khiển nội dung danh mục — dùng `sections` phía trên.
   */
  features: {
    /** Bật/tắt nền grid + hiệu ứng công nghệ phía sau CV */
    techBackground: true,
    /** Bật/tắt nút đổi giao diện dark / light trên header */
    themeToggle: true,
    /** Bật/tắt nút đổi ngôn ngữ VI / EN trên header (cần translationApi) */
    localeToggle: true,
    /** Bật/tắt nút đổi layout CV trên header */
    layoutSwitcher: true,
    /** Bật/tắt khối QR liên hệ trong phần header CV (cần qrContactEnabled) */
    showQrCode: true,
    /** Bật/tắt nút "In CV" trong nhóm Export */
    exportPrint: true,
    /** Bật/tắt nút tải file PDF */
    exportPdf: true,
    /** Bật/tắt nút tải file DOCX */
    exportDocx: true,
    /** Bật/tắt API dịch `/api/translate` (MyMemory only, không Google/Lingva) */
    translationApi: true,
    /**
     * Bật/tắt chế độ chặn dịch vụ Google toàn cục:
     * - font hệ thống (không fonts.googleapis.com)
     * - CSP chặn domain Google
     * - dịch không qua Google Translate
     */
    blockGoogle: true,
  },
} as const;

/** Gộp cấu hình — dùng trong app */
export const appConfig = {
  ...configBasic,
  ...configAdvanced,
} as const;

export type AppConfig = typeof appConfig;

/** Danh mục CV có được bật trong config không */
export function isCvSectionEnabled(sectionId: SectionId): boolean {
  const { sections } = configAdvanced;
  if (!(sectionId in sections)) return false;
  return sections[sectionId as keyof typeof sections];
}
