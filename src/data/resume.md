# Hướng dẫn chỉnh `resume.ts`

File **`src/data/resume.ts`** là nguồn dữ liệu CV mặc định. Khi deploy hoặc chia sẻ template, người dùng chỉ cần sửa file này (và `config.ts`).

## 1. Thông tin cá nhân (`personal`)

```ts
personal: {
  fullName: "Họ và tên",
  title: "Senior Backend Engineer · Go / Kubernetes",
  avatar: "", // URL ảnh hoặc để trống → hiện chữ cái đầu
  contact: {
    email: "you@email.com",      // bắt buộc
    phone: "+84 ...",
    location: "City · Remote",
    linkedin: "https://linkedin.com/in/...",
    github: "https://github.com/...",
    portfolio: "https://...",
    blog: "",
    stackoverflow: "",
  },
  qrEnabled: true, // hoặc dùng appConfig.qrContactEnabled
},
```

## 2. Tóm tắt (`summary`)

Viết 3–5 câu, **có số liệu**:

- Quy mô hệ thống (requests/day, users, uptime)
- Cải thiện đo lường được (latency, deployment time, cost)
- Stack chính và vai trò (lead, ownership)

Ví dụ: *"Reduced API p99 from 900ms to 120ms; automated infra with Terraform across 3 regions."*

## 3. Thứ tự section (`sectionOrder`)

Mảng id theo thứ tự hiển thị (có thể kéo-thả trên UI, nhưng file là mặc định):

`summary` · `skills` · `experience` · `projects` · `certifications` · `education` · `opensource` · `languages`

## 4. Kỹ năng (`skills`)

Mỗi nhóm:

```ts
{
  id: "languages",           // id duy nhất
  label: "Programming Languages",
  skills: [
    { name: "Go", proficiency: "expert" },
    { name: "Python", proficiency: "advanced" },
  ],
},
```

**Proficiency:** `expert` | `advanced` | `intermediate` | `familiar` (hiển thị 4 chấm nhỏ trên CV).

Có thể thêm/xóa nhóm: Frontend, Backend, Infrastructure, Cloud, Databases, Networking/Security, AI/ML.

## 5. Kinh nghiệm (`experience`)

```ts
{
  id: "exp-1",                    // unique
  company: "Tên công ty",
  position: "Chức danh",
  location: "Remote",
  startDate: "2022-03",           // YYYY-MM
  endDate: "2024-01",             // bỏ nếu current: true
  current: true,
  stack: ["Go", "K8s", "AWS"],
  responsibilities: ["..."],      // tuỳ chọn
  achievements: [                 // bullet impact — ưu tiên
    "Designed CI/CD reducing failures by 45%",
  ],
},
```

**Gợi ý:** động từ mạnh — Designed, Built, Migrated, Optimized, Led, Automated.

## 6. Dự án (`projects`)

```ts
{
  id: "proj-1",
  name: "Tên project",
  description: "Một dòng mô tả",
  github: "https://github.com/...",
  demo: "https://...",
  stack: ["React", "Go"],
  architecture: "Mô tả kiến trúc ngắn (monospace)",
  achievements: ["1.2k stars", "..."],
  featured: true,   // hiển thị nổi bật
},
```

## 7. Chứng chỉ, học vấn, open source, ngôn ngữ

- **certifications:** `name`, `issuer`, `date`, `credentialId`, `url`
- **education:** `university`, `degree`, `major`, `graduationYear`, `gpa`
- **openSource:** `githubUsername`, `stats`, `repositories`, `highlights` — hoặc sync qua GitHub trên UI
- **languages:** `name`, `level`

## 8. Meta (`meta`)

```ts
meta: {
  layout: "two-column-modern", // xem config.ts
  theme: "dark",
  locale: "vi",
},
```

## Sau khi sửa

1. Lưu file.
2. `npm run dev` — mở http://localhost:3000 và reload trang.
3. Deploy: `npm run build` rồi publish (Vercel, v.v.).

## Validate

Schema: `resume.schema.json` + types trong `src/lib/schema/resume.ts`. Trường bắt buộc: `version`, `personal`, `summary`, `skills`, `experience`, …
