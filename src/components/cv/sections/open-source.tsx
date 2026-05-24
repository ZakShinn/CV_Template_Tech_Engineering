import { Github } from "lucide-react";
import { SectionTitle } from "@/components/cv/shared/section-title";
import { getSectionLabel, type CVLocale } from "@/i18n/section-labels";
import type { Resume } from "@/lib/schema/resume";

export function OpenSourceSection({
  openSource,
  variant = "default",
  locale = "en",
}: {
  openSource?: Resume["openSource"];
  variant?: "default" | "sidebar" | "compact";
  locale?: CVLocale;
}) {
  if (!openSource) return null;

  const { githubUsername, stats, repositories, highlights } = openSource;

  return (
    <section className="print-break-avoid" aria-labelledby="oss-heading">
      <SectionTitle
        variant={
          variant === "sidebar" ? "sidebar" : variant === "compact" ? "compact" : "default"
        }
      >
        <span id="oss-heading">{getSectionLabel(locale, "openSource")}</span>
      </SectionTitle>
      {githubUsername && (
        <p className="text-sm flex items-center gap-2 text-cv-muted mb-3">
          <Github className="h-4 w-4" />
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cv-accent font-mono"
          >
            @{githubUsername}
          </a>
        </p>
      )}
      {stats && (
        <div className="flex flex-wrap gap-4 text-xs font-mono text-cv-muted mb-3">
          {stats.repositories != null && <span>{stats.repositories} repos</span>}
          {stats.stars != null && <span>{stats.stars.toLocaleString()} stars</span>}
          {stats.contributions != null && (
            <span>{stats.contributions.toLocaleString()} contributions</span>
          )}
        </div>
      )}
      {repositories && repositories.length > 0 && (
        <ul className="space-y-2 mb-3">
          {repositories.map((repo) => (
            <li key={repo.name} className="text-sm">
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-cv-accent"
              >
                {repo.name}
              </a>
              {repo.stars != null && (
                <span className="text-xs text-cv-muted ml-2">★ {repo.stars}</span>
              )}
              {repo.description && (
                <p className="text-xs text-cv-muted">{repo.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
      {highlights && (
        <ul className="list-disc list-outside ml-4 space-y-1">
          {highlights.map((h, i) => (
            <li key={i} className="text-sm text-cv-muted">
              {h}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
