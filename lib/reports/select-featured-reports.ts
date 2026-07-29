import { partitionPublishedReports } from "@/lib/reports/classify";
import type { IntelligenceReportListItem } from "@/lib/reports/types";

export const FEATURED_REPORT_LIMIT = 5;

export function selectFeaturedReports(
  reports: IntelligenceReportListItem[],
): IntelligenceReportListItem[] {
  const { general, weekly } = partitionPublishedReports(reports);
  return [...general, ...weekly].slice(0, FEATURED_REPORT_LIMIT);
}
