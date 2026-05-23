# Tech Engineering CV Template

Template CV kỹ thuật — **trang chủ chỉ xem CV**, giao diện cố định. Chỉnh nội dung bằng code trong `src/data/`.

## Chạy

```bash
npm install
npm run dev
```

Mở **http://localhost:3000**

## Chỉnh CV

| File | Hướng dẫn |
|------|-----------|
| [`src/data/resume.ts`](src/data/resume.ts) | [resume.md](src/data/resume.md) |
| [`src/data/config.ts`](src/data/config.ts) | [config.md](src/data/config.md) |
| Tổng quan | [src/data/README.md](src/data/README.md) |

Sửa file → lưu → reload (dev) hoặc `npm run build` (production).

## Tính năng trang web

- 3 layout (cấu hình trong `config.ts` / `resume.meta`)
- Dark / light (nút trên header — chỉ đổi cách xem, không đổi dữ liệu CV)
- CV phóng **2×** trên trình duyệt (chỉnh `browserDisplayScale` trong `config.ts`)
- Nút **In CV** (A4) + tải **DOCX**

**Không có** editor, import JSON, GitHub sync hay lưu localStorage trên trình duyệt.

## Cấu trúc

```
src/data/              ← Dữ liệu CV + .md hướng dẫn
src/components/cv/     ← UI hiển thị
src/app/page.tsx       ← Trang xem CV
```

## License

MIT — [LICENSE](LICENSE)
