"use client";

import {
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  BookOpen,
  Layers,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import type { Resume } from "@/lib/schema/resume";
import { cn } from "@/lib/utils";

const iconMap = {
  email: Mail,
  phone: Phone,
  location: MapPin,
  linkedin: Linkedin,
  github: Github,
  portfolio: Globe,
  blog: BookOpen,
  stackoverflow: Layers,
} as const;

function ContactLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-xs text-cv-muted hover:text-cv-accent transition-colors"
      aria-label={label}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate max-w-[180px]">{label}</span>
    </a>
  );
}

export function CVHeader({
  personal,
  variant = "default",
}: {
  personal: Resume["personal"];
  variant?: "default" | "sidebar" | "compact" | "ats";
}) {
  const { fullName, title, avatar, contact, qrEnabled } = personal;
  const qrValue = contact.email
    ? `mailto:${contact.email}`
    : contact.portfolio || contact.github || "";

  const links = [
    contact.linkedin && {
      key: "linkedin",
      href: contact.linkedin,
      label: "LinkedIn",
      icon: iconMap.linkedin,
    },
    contact.github && {
      key: "github",
      href: contact.github,
      label: "GitHub",
      icon: iconMap.github,
    },
    contact.portfolio && {
      key: "portfolio",
      href: contact.portfolio,
      label: "Portfolio",
      icon: iconMap.portfolio,
    },
    contact.blog && {
      key: "blog",
      href: contact.blog,
      label: "Blog",
      icon: iconMap.blog,
    },
    contact.stackoverflow && {
      key: "stackoverflow",
      href: contact.stackoverflow,
      label: "Stack Overflow",
      icon: iconMap.stackoverflow,
    },
  ].filter(Boolean) as {
    key: string;
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];

  if (variant === "sidebar") {
    return (
      <header className="print-break-avoid">
        {avatar ? (
          <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-cv mb-4 mx-auto">
            <Image src={avatar} alt={fullName} fill className="object-cover" />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-electric-500/20 to-emerald-500/10 border border-electric-500/30 flex items-center justify-center text-2xl font-semibold text-cv-accent mb-4 mx-auto shadow-[0_0_24px_-8px_rgba(10,132,255,0.4)]">
            {fullName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
        )}
        <h1 className="text-lg font-bold text-center leading-tight">{fullName}</h1>
        <p className="text-xs text-cv-muted text-center mt-1 leading-snug">{title}</p>
        <div className="mt-4 space-y-2 text-xs">
          <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-cv-muted hover:text-cv-accent">
            <Mail className="h-3.5 w-3.5" />
            <span className="break-all">{contact.email}</span>
          </a>
          {contact.phone && (
            <span className="flex items-center gap-2 text-cv-muted">
              <Phone className="h-3.5 w-3.5" />
              {contact.phone}
            </span>
          )}
          {contact.location && (
            <span className="flex items-center gap-2 text-cv-muted">
              <MapPin className="h-3.5 w-3.5" />
              {contact.location}
            </span>
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md border border-cv text-cv-muted hover:text-cv-accent hover:border-electric-500/50 hover:bg-electric-500/10 hover:shadow-[0_0_12px_-4px_rgba(10,132,255,0.4)] transition-all duration-200"
              aria-label={l.label}
            >
              <l.icon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
        {qrEnabled && qrValue && (
          <div className="mt-6 flex justify-center">
            <QRCodeSVG value={qrValue} size={72} level="M" className="rounded" />
          </div>
        )}
      </header>
    );
  }

  return (
    <header
      className={cn(
        "print-break-avoid border-b border-cv pb-5 mb-6",
        variant === "compact" && "pb-3 mb-4",
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex gap-4 items-start">
          {avatar && variant !== "ats" && (
            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-cv shrink-0 hidden sm:block">
              <Image src={avatar} alt={fullName} fill className="object-cover" />
            </div>
          )}
          <div>
            <h1
              className={cn(
                "font-bold tracking-tight text-[var(--cv-fg)]",
                variant === "compact" ? "text-2xl" : "text-3xl",
              )}
            >
              {fullName}
            </h1>
            <p
              className={cn(
                "text-cv-accent font-medium mt-1 font-mono",
                variant === "compact" ? "text-sm" : "text-base",
              )}
            >
              {title}
            </p>
          </div>
        </div>
        {qrEnabled && qrValue && variant !== "ats" && (
          <div className="hidden sm:block shrink-0">
            <QRCodeSVG value={qrValue} size={64} level="M" />
          </div>
        )}
      </div>

      <div
        className={cn(
          "mt-4 flex flex-wrap gap-x-4 gap-y-2",
          variant === "ats" && "text-sm",
        )}
      >
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex items-center gap-1.5 text-xs text-cv-muted hover:text-cv-accent"
        >
          <Mail className="h-3.5 w-3.5" />
          {contact.email}
        </a>
        {contact.phone && (
          <span className="inline-flex items-center gap-1.5 text-xs text-cv-muted">
            <Phone className="h-3.5 w-3.5" />
            {contact.phone}
          </span>
        )}
        {contact.location && (
          <span className="inline-flex items-center gap-1.5 text-xs text-cv-muted">
            <MapPin className="h-3.5 w-3.5" />
            {contact.location}
          </span>
        )}
      </div>

      {links.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-3">
          {links.map((l) => (
            <ContactLink key={l.key} href={l.href} label={l.label} icon={l.icon} />
          ))}
        </div>
      )}
    </header>
  );
}
