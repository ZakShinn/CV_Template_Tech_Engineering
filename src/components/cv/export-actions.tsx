"use client";

import { useState } from "react";
import { Download, FileText, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadDocx, exportResumeToDocx } from "@/lib/export/docx";
import { exportToPDF } from "@/lib/export-pdf";
import { printResume } from "@/lib/print";
import { ATS_PDF_HINT } from "@/lib/seo";
import type { Resume } from "@/lib/schema/resume";
import { appConfig } from "@/data/config";

export function ExportActions({ resume }: { resume: Resume }) {
  const [loading, setLoading] = useState<"pdf" | "docx" | null>(null);
  const baseName = resume.personal.fullName.replace(/\s+/g, "_");

  async function handlePdf() {
    const el =
      document.getElementById("cv-print") ??
      document.getElementById("cv-preview");
    if (!el) return;
    setLoading("pdf");
    try {
      await exportToPDF(
        el,
        `${appConfig.exportFilenamePrefix}_${baseName}.pdf`,
      );
    } finally {
      setLoading(null);
    }
  }

  async function handleDocx() {
    setLoading("docx");
    try {
      const blob = await exportResumeToDocx(resume);
      downloadDocx(blob, `${appConfig.exportFilenamePrefix}_${baseName}.docx`);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex items-center gap-2 shrink-0 no-print">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="font-mono text-xs gap-1.5"
        onClick={() => printResume()}
        aria-label="In CV A4"
      >
        <Printer className="h-3.5 w-3.5" />
        In CV
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="font-mono text-xs gap-1.5"
        onClick={handlePdf}
        disabled={loading !== null}
        title={ATS_PDF_HINT}
        aria-label="Tải PDF"
      >
        <Download className="h-3.5 w-3.5" />
        {loading === "pdf" ? "…" : "PDF"}
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="font-mono text-xs gap-1.5"
        onClick={handleDocx}
        disabled={loading !== null}
        aria-label="Tải DOCX"
      >
        <FileText className="h-3.5 w-3.5" />
        {loading === "docx" ? "…" : "DOCX"}
      </Button>
    </div>
  );
}
