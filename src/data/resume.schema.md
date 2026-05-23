# Hướng dẫn `resume.schema.json`

File **`src/data/resume.schema.json`** mô tả cấu trúc JSON Resume (phiên bản `1.0`). Dùng để:

- Tham chiếu khi chỉnh `resume.ts` thủ công
- Validate JSON import/export
- Tích hợp tool bên ngoài (JSON Schema validators)

## Không bắt buộc sửa

Ứng dụng chạy bằng TypeScript (`src/lib/schema/resume.ts` + Zod). Chỉ sửa file JSON schema khi:

- Thêm trường mới toàn hệ thống
- Cần document cho team/CI

## Trường bắt buộc (root)

- `version` — luôn `"1.0"`
- `meta`, `personal`, `summary`, `sectionOrder`
- `skills`, `experience`, `projects`, `certifications`, `education`, `languages`
- `openSource` — tuỳ chọn

## Layout hợp lệ

```json
"layout": "single-column-ats" | "two-column-modern" | "compact-senior"
```

## Proficiency kỹ năng

```json
"proficiency": "expert" | "advanced" | "intermediate" | "familiar"
```

## Đồng bộ với TypeScript

Khi đổi schema JSON, cập nhật song song:

1. `src/lib/schema/resume.ts` (Zod)
2. `src/data/resume.ts` (dữ liệu mẫu)

Nếu không đồng bộ, build TypeScript có thể báo lỗi.
