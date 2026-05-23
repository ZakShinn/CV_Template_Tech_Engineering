# Thư mục dữ liệu CV (`src/data`)

Trang web **chỉ hiển thị** CV — không có form chỉnh trên trình duyệt. Mọi thay đổi làm trong code tại đây, rồi build/deploy lại.

## File cần chỉnh

| File | Mục đích | Hướng dẫn |
|------|----------|-----------|
| [`resume.ts`](./resume.ts) | Toàn bộ nội dung CV | [resume.md](./resume.md) |
| [`config.ts`](./config.ts) | Layout, theme, QR mặc định | [config.md](./config.md) |
| [`resume.schema.json`](./resume.schema.json) | JSON Schema tham chiếu | [resume.schema.md](./resume.schema.md) |

## Quy trình

1. Sửa `resume.ts` (và/hoặc `config.ts`)
2. `npm run dev` → xem tại http://localhost:3000
3. `npm run build` → deploy

Không còn editor trên web — reload trang luôn lấy dữ liệu từ file đã build.

## Xuất file

Trên header trang web (chỉ bạn khi self-host):

- **In CV** — in A4 (bản in riêng, không bị zoom ×2)
- **DOCX** — tải Word từ dữ liệu `resume.ts`

## Layout

Đặt trong `resume.meta.layout` hoặc `config.defaultLayout`:

- `two-column-modern`
- `single-column-ats`
- `compact-senior`

## Không chỉnh khi chỉ đổi nội dung CV

- `src/components/cv/` — giao diện (đã cố định)
- `src/lib/schema/resume.ts` — kiểu dữ liệu
