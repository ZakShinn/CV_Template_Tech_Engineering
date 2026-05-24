/** Metadata & JSON-LD helpers */
export function buildPersonJsonLd(input: {
  name: string;
  jobTitle: string;
  email?: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    jobTitle: input.jobTitle,
    ...(input.email && { email: input.email }),
    ...(input.url && { url: input.url }),
  };
}

export const ATS_PDF_HINT =
  "Tải PDF giữ layout. Để ATS đọc được chữ, dùng In CV → Lưu PDF (Ctrl+P).";
