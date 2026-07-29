import type { IntelligenceReportListItem } from "@/lib/reports/types";

/**
 * Temporary presentation-layer classification until a controlled report_type / frequency field exists.
 * Weekly reports: category contains "weekly" (case-insensitive). Empty category → general.
 */
export function normaliseCategory(
  category: string | null | undefined,
): string {
  return (category ?? "").trim().toLowerCase();
}

export function isWeeklyReport(category: string | null | undefined): boolean {
  const normalised = normaliseCategory(category);
  if (!normalised) return false;
  return normalised.includes("weekly");
}

export function partitionPublishedReports(
  reports: IntelligenceReportListItem[],
): {
  general: IntelligenceReportListItem[];
  weekly: IntelligenceReportListItem[];
} {
  const general: IntelligenceReportListItem[] = [];
  const weekly: IntelligenceReportListItem[] = [];

  for (const report of reports) {
    if (isWeeklyReport(report.category)) {
      weekly.push(report);
    } else {
      general.push(report);
    }
  }

  return { general, weekly };
}
