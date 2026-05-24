import type { LayoutType } from "@/lib/schema/resume";

/**
 * Cấu hình ứng dụng (layout, theme, QR, export) — chỉnh tại đây.
 * Nội dung CV: src/data/resume.ts · Hướng dẫn: src/data/HUONG_DAN_NHAP_LIEU.md
 */
export const appConfig = {
  /** Tiêu đề tab trình duyệt (có thể ghi đè trong layout.tsx) */
  title: "Tech CV — Engineering Resume",

  /** Layout CV khi mở trang chủ (không có ?layout= trên URL) */
  defaultLayout: "two-column-modern" as LayoutType,

  /** Giao diện mặc định: light | dark | system */
  defaultTheme: "dark" as "light" | "dark" | "system",

  /** Bật mã QR liên hệ trên CV */
  qrContactEnabled: true,

  /** Phóng to CV trên trình duyệt (1 = 100%, 2 = 200%). Không ảnh hưởng bản in. */
  browserDisplayScale: 2,

  /** Tên file khi export PDF/DOCX/JSON */
  exportFilenamePrefix: "CV",

  /** SEO & chia sẻ link */
  siteUrl: "https://your-cv.vercel.app",
  description:
    "CV kỹ thuật — Software Engineer, DevOps, Cloud. Tối ưu ATS, responsive, export PDF/DOCX.",
} as const;
