# Hướng dẫn nhập liệu CV

Chỉnh CV trong **`src/`** bằng code. Sau khi sửa: `npm run dev` hoặc `npm run build`.

## Cấu trúc file

| File | Vai trò |
|------|---------|
| **`resume-basic.ts`** | Dữ liệu **bắt buộc** mọi CV phải có |
| **`resume-advanced.ts`** | Thông tin **nâng cao** (tùy chọn, khuyến nghị senior/DevOps) |
| **`resume.ts`** | Gộp basic + advanced → `defaultResume` (không cần sửa nội dung) |
| **`avatar.ts`** | Ảnh đại diện |
| **`color.ts`** | Màu sắc |
| **`font.ts`** | Font chữ |
| **`config.ts`** | Cấu hình web, bật/tắt tính năng |

---

## 1. `resume-basic.ts` — CV cốt lõi

Các mục **mọi CV kỹ thuật nên có**:

| Mục | Trường | Ghi chú |
|-----|--------|---------|
| Đầu trang | `personal` | Họ tên, chức danh, email, phone, LinkedIn, GitHub… |
| Tóm tắt | `summary` | 3–5 câu, có số liệu (%, latency, scale…) |
| Kỹ năng chính | `skills` | Ngôn ngữ lập trình, Frontend, Backend… |
| Kinh nghiệm | `experience` | Công ty, chức danh, `achievements` (bullet impact) |
| Học vấn | `education` | Trường, bằng, năm tốt nghiệp |
| Ngôn ngữ | `languages` | Tiếng Anh, Việt… |

Thứ tự hiển thị mặc định: `BASIC_SECTION_ORDER`  
(`summary` → `skills` → `experience` → `education` → `languages`).

---

## 2. `resume-advanced.ts` — Nâng cao

Bổ sung khi cần CV chuyên sâu:

| Mục | Trường | Ghi chú |
|-----|--------|---------|
| Kỹ năng mở rộng | `skillsExtra` | Hạ tầng, Cloud, DB, Security, AI/ML… (gộp sau skills basic) |
| Dự án | `projects` | GitHub, demo, `featured`, kiến trúc |
| Chứng chỉ | `certifications` | AWS, CKA, GCP… |
| Open Source | `openSource` | GitHub stats, repo nổi bật |
| Thứ tự tuỳ chỉnh | `sectionOrderOverride` | `undefined` = basic trước, advanced sau |

Section advanced mặc định: `projects` → `certifications` → `opensource`.

**Tắt hẳn phần advanced:** để mảng rỗng `projects: []`, `certifications: []`, bỏ/comment `openSource`, `skillsExtra: []`.

**Xoá dòng / block không cần:** có thể bỏ hẳn `achievements`, `stack`, `responsibilities` trong một job; xoá cả mục trong mảng; để trống `summary` hoặc `email`. `buildResume()` tự lọc dòng rỗng và **ẩn section không còn dữ liệu** — app vẫn chạy bình thường.

---

## 3. `resume.ts`

Chỉ chứa logic gộp:

- `skills` = `resumeBasic.skills` + `resumeAdvanced.skillsExtra`
- `sectionOrder` = basic + advanced (hoặc `sectionOrderOverride`)

Export từ file này: `defaultResume`, `buildResume()`.

---

## 4. `avatar.ts` · `color.ts` · `font.ts` · `config.ts`

Xem **`config.ts`** (bảng chú thích đầu file):

- **`sections`**: bật/tắt danh mục CV (Summary, Skills, Experience, Projects…) — áp dụng web, in, PDF, DOCX. Dữ liệu vẫn giữ trong `resume-*.ts`.
- **`features`**: bật/tắt UI (nền, nút theme/layout/ngôn ngữ, export, QR).
- Danh mục bật nhưng rỗng vẫn tự ẩn khi build (`normalizeResume`).

**Chặn Google tìm kiếm CV:** trong `config.ts` đặt `blockSearchIndexing: true` (mặc định). Trang gửi `noindex`, `robots.txt` chặn crawl, và header `X-Robots-Tag`. Muốn SEO công khai → đặt `false`.

---

## Quy trình

```bash
npm run dev
```

1. Sửa **`resume-basic.ts`** trước (thông tin bắt buộc).
2. Bổ sung **`resume-advanced.ts`** nếu cần.
3. Reload trang → kiểm tra In / PDF / DOCX.

---

## Gợi ý nội dung

- **Basic:** đủ để ATS và recruiter đọc nhanh (kinh nghiệm + kỹ năng + học vấn).
- **Advanced:** làm nổi bật senior (dự án, chứng chỉ, OSS, stack hạ tầng).
