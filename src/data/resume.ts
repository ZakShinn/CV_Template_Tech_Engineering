import type { Resume } from "@/lib/schema/resume";
import { DEFAULT_SECTION_ORDER } from "@/lib/schema/resume";
import { appConfig } from "./config";

/**
 * Dữ liệu CV mặc định — chỉnh nội dung tại file này.
 * Hướng dẫn chi tiết: src/data/resume.md
 */
export const defaultResume: Resume = {
  version: "1.0",
  meta: {
    layout: appConfig.defaultLayout,
    theme: appConfig.defaultTheme,
    locale: "vi",
  },
  personal: {
    fullName: "Alex Nguyen",
    title: "Senior Software Engineer · Platform & Cloud",
    avatar: "",
    contact: {
      email: "alex.nguyen@engineer.dev",
      phone: "+84 90 123 4567",
      location: "Ho Chi Minh City, Vietnam · Remote-friendly",
      linkedin: "https://linkedin.com/in/alexnguyen",
      github: "https://github.com/alexnguyen",
      portfolio: "https://alexnguyen.dev",
      blog: "https://alexnguyen.dev/blog",
      stackoverflow: "https://stackoverflow.com/users/alexnguyen",
    },
    qrEnabled: appConfig.qrContactEnabled,
  },
  summary:
    "Senior engineer with 8+ years building distributed systems, cloud-native platforms, and developer tooling. Led teams shipping microservices at 10M+ requests/day, cut deployment time by 70% via GitOps, and reduced API p99 latency from 900ms to 120ms. Strong in Go, TypeScript, Kubernetes, and Terraform with a focus on reliability, security, and measurable impact.",
  sectionOrder: [...DEFAULT_SECTION_ORDER],
  skills: [
    {
      id: "languages",
      label: "Programming Languages",
      skills: [
        { name: "Go", proficiency: "expert" },
        { name: "Rust", proficiency: "advanced" },
        { name: "Python", proficiency: "expert" },
        { name: "TypeScript", proficiency: "expert" },
        { name: "Java", proficiency: "advanced" },
        { name: "C/C++", proficiency: "intermediate" },
        { name: "Bash", proficiency: "advanced" },
      ],
    },
    {
      id: "frontend",
      label: "Frontend",
      skills: [
        { name: "React", proficiency: "expert" },
        { name: "Next.js", proficiency: "expert" },
        { name: "Vue", proficiency: "advanced" },
        { name: "TailwindCSS", proficiency: "expert" },
      ],
    },
    {
      id: "backend",
      label: "Backend",
      skills: [
        { name: "Node.js", proficiency: "expert" },
        { name: "FastAPI", proficiency: "expert" },
        { name: "Spring Boot", proficiency: "advanced" },
        { name: "gRPC", proficiency: "advanced" },
      ],
    },
    {
      id: "infrastructure",
      label: "Infrastructure",
      skills: [
        { name: "Docker", proficiency: "expert" },
        { name: "Kubernetes", proficiency: "expert" },
        { name: "Terraform", proficiency: "expert" },
        { name: "Ansible", proficiency: "advanced" },
      ],
    },
    {
      id: "cloud",
      label: "Cloud",
      skills: [
        { name: "AWS", proficiency: "expert" },
        { name: "Azure", proficiency: "advanced" },
        { name: "GCP", proficiency: "advanced" },
        { name: "Cloudflare", proficiency: "advanced" },
      ],
    },
    {
      id: "databases",
      label: "Databases",
      skills: [
        { name: "PostgreSQL", proficiency: "expert" },
        { name: "MySQL", proficiency: "advanced" },
        { name: "Redis", proficiency: "expert" },
        { name: "MongoDB", proficiency: "advanced" },
      ],
    },
    {
      id: "networking",
      label: "Networking & Security",
      skills: [
        { name: "Linux", proficiency: "expert" },
        { name: "Nginx", proficiency: "expert" },
        { name: "WireGuard", proficiency: "advanced" },
        { name: "SIEM", proficiency: "intermediate" },
      ],
    },
    {
      id: "ai",
      label: "AI / ML",
      skills: [
        { name: "PyTorch", proficiency: "advanced" },
        { name: "Hugging Face", proficiency: "advanced" },
        { name: "LangChain", proficiency: "advanced" },
      ],
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "CloudScale Technologies",
      position: "Senior Platform Engineer",
      location: "Remote",
      startDate: "2022-03",
      current: true,
      stack: ["Go", "Kubernetes", "Terraform", "AWS", "PostgreSQL", "gRPC"],
      responsibilities: [
        "Own platform reliability for multi-tenant SaaS serving 500+ enterprise customers",
        "Design internal developer platform and golden-path templates",
      ],
      achievements: [
        "Designed CI/CD pipelines reducing deployment failures by 45%",
        "Migrated legacy monolith to Kubernetes; improved release frequency from monthly to daily",
        "Built scalable microservices handling 10M+ requests/day with 99.95% uptime",
        "Automated infrastructure provisioning using Terraform across 3 AWS regions",
        "Optimized API latency from 900ms p99 to 120ms through caching and query tuning",
      ],
    },
    {
      id: "exp-2",
      company: "FinTech Global",
      position: "Software Engineer II",
      location: "Singapore",
      startDate: "2019-01",
      endDate: "2022-02",
      stack: ["Python", "FastAPI", "React", "Docker", "PostgreSQL"],
      achievements: [
        "Implemented event-driven payment processing with idempotent consumers",
        "Reduced incident MTTR by 60% via observability stack (Prometheus, Grafana, OpenTelemetry)",
        "Led security hardening: OAuth2, mTLS, and secrets rotation with HashiCorp Vault",
      ],
    },
    {
      id: "exp-3",
      company: "StartupLabs",
      position: "Full Stack Developer",
      location: "Ho Chi Minh City",
      startDate: "2016-06",
      endDate: "2018-12",
      stack: ["Node.js", "Vue", "MongoDB", "AWS"],
      achievements: [
        "Shipped MVP to production in 12 weeks; grew to 50k MAU",
        "Introduced automated testing raising coverage from 20% to 75%",
      ],
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "K8s GitOps Controller",
      description: "Open-source Kubernetes operator for declarative deployments",
      github: "https://github.com/alexnguyen/k8s-gitops-controller",
      stack: ["Go", "Kubernetes", "controller-runtime", "Prometheus"],
      architecture:
        "Reconciliation loop with CRDs; integrates with Argo CD webhooks and Slack alerts",
      achievements: [
        "1.2k GitHub stars; adopted by 3 companies in production",
        "Reduced drift detection time from hours to under 2 minutes",
      ],
      featured: true,
    },
    {
      id: "proj-2",
      name: "Observability Kit",
      description: "Drop-in OpenTelemetry SDK wrappers for microservices",
      github: "https://github.com/alexnguyen/obs-kit",
      demo: "https://obs-kit.dev",
      stack: ["TypeScript", "Go", "OpenTelemetry", "Grafana"],
      achievements: [
        "Standardized tracing across 40+ services",
        "Cut onboarding time for new services from 2 days to 2 hours",
      ],
      featured: true,
    },
    {
      id: "proj-3",
      name: "LLM Pipeline Orchestrator",
      stack: ["Python", "FastAPI", "LangChain", "Redis", "PostgreSQL"],
      architecture: "Async job queue with rate limiting and cost tracking per tenant",
      achievements: ["Processes 2M+ inference jobs/month with autoscaling workers"],
      featured: false,
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Solutions Architect – Professional",
      issuer: "Amazon Web Services",
      date: "2024-06",
      credentialId: "SAP-XXXX",
    },
    {
      id: "cert-2",
      name: "Certified Kubernetes Administrator (CKA)",
      issuer: "CNCF",
      date: "2023-11",
    },
    {
      id: "cert-3",
      name: "Google Professional Cloud Architect",
      issuer: "Google Cloud",
      date: "2023-03",
    },
  ],
  education: [
    {
      id: "edu-1",
      university: "Ho Chi Minh City University of Technology",
      degree: "Bachelor of Engineering",
      major: "Computer Science",
      graduationYear: "2016",
      gpa: "3.7/4.0",
    },
  ],
  openSource: {
    githubUsername: "alexnguyen",
    stats: {
      repositories: 42,
      stars: 3200,
      contributions: 1800,
    },
    repositories: [
      {
        name: "k8s-gitops-controller",
        description: "Kubernetes GitOps operator",
        url: "https://github.com/alexnguyen/k8s-gitops-controller",
        stars: 1200,
      },
      {
        name: "obs-kit",
        description: "OpenTelemetry tooling",
        url: "https://github.com/alexnguyen/obs-kit",
        stars: 890,
      },
    ],
    highlights: [
      "Maintainer of 2 CNCF-adjacent projects with 2k+ combined stars",
      "50+ merged PRs to upstream Kubernetes ecosystem tools",
      "Speaker at local K8s meetups on platform engineering",
    ],
  },
  languages: [
    { name: "English", level: "Professional working proficiency" },
    { name: "Vietnamese", level: "Native" },
    { name: "Japanese", level: "Basic (JLPT N4)" },
  ],
};

/** @deprecated Dùng defaultResume — giữ alias để tương thích */
export const sampleResume = defaultResume;
