import type { LayoutType } from "@/lib/schema/resume";

/** Cấu hình mặc định của ứng dụng — chỉnh tại đây hoặc xem config.md */
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
} as const;
