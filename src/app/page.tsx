import { defaultResume } from "@/data/resume";
import { CvPageView } from "@/components/cv/cv-page-view";

/** Trang chủ = xem CV. Chỉnh nội dung trong src/data/resume.ts */
export default function HomePage() {
  return <CvPageView resume={defaultResume} />;
}
