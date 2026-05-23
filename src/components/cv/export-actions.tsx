"use client";

import { useState } from "react";
import { FileText, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadDocx, exportResumeToDocx } from "@/lib/export/docx";
import { printResume } from "@/lib/print";
import type { Resume } from "@/lib/schema/resume";
import { appConfig } from "@/data/config";

export function ExportActions({ resume }: { resume: Resume }) {
  const [loadingDocx, setLoadingDocx] = useState(false);

  async function handleDocx() {
    setLoadingDocx(true);
    try {
      const blob = await exportResumeToDocx(resume);
      const name = resume.personal.fullName.replace(/\s+/g, "_");
      downloadDocx(blob, `${appConfig.exportFilenamePrefix}_${name}.docx`);
    } finally {
      setLoadingDocx(false);
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
        onClick={handleDocx}
        disabled={loadingDocx}
        aria-label="Tải DOCX"
      >
        <FileText className="h-3.5 w-3.5" />
        {loadingDocx ? "…" : "DOCX"}
      </Button>
    </div>
  );
}
