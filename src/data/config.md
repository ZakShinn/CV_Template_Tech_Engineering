# Hướng dẫn chỉnh `config.ts`

File **`src/data/config.ts`** điều khiển hành vi ứng dụng, **không** chứa nội dung CV chi tiết.

## Các tuỳ chọn

```ts
export const appConfig = {
  title: "Tech CV — Engineering Resume",
  defaultLayout: "two-column-modern",
  defaultTheme: "dark",
  qrContactEnabled: true,
  exportFilenamePrefix: "CV",
};
```

### `defaultLayout`

| Giá trị | Khi nào dùng |
|---------|----------------|
| `two-column-modern` | Portfolio, startup, Big Tech (có sidebar skills) |
| `single-column-ats` | Nộp qua ATS, job board, recruiter scan |
| `compact-senior` | Nhiều năm kinh nghiệm, cần gọn 1–2 trang |

### `browserDisplayScale`

Phóng to CV trên **màn hình** (mặc định `2` = 200%). Bản **in** luôn 100% khổ A4, không phụ thuộc giá trị này.

### `defaultTheme`

- `dark` — graphite + electric blue (mặc định template)
- `light` — in ấn / một số công ty thích nền sáng
- `system` — theo OS

Người dùng vẫn đổi theme bằng nút trên header.

### `qrContactEnabled`

`true` → hiển thị QR (mailto email) trên layout two-column sidebar.  
Tắt nếu export PDF không cần QR.

## Liên kết với `resume.ts`

`resume.ts` import `appConfig` cho:

- `meta.layout` / `meta.theme` ban đầu
- `personal.qrEnabled`

Chỉ cần sửa **một nơi** (`config.ts`) nếu muốn đổi layout/theme toàn cục; hoặc sửa trực tiếp trong `resume.meta` nếu chỉ đổi CV mẫu.

## Tiêu đề trang

`title` trong config — có thể đồng bộ thủ công với `src/app/layout.tsx` → `metadata.title` nếu muốn đổi SEO/tab browser.
