/** Static previews when no published reports exist. Delete this file usage once live data fills the library. */
export type ReportLibraryPlaceholder = {
  badge: string;
  title: string;
  summary: string;
  dateLabel: string;
};

export const reportLibraryPlaceholders: ReportLibraryPlaceholder[] = [
  {
    badge: "Market outlook",
    title: "UK HGV Market Outlook Q2 2026",
    summary:
      "Analysis of operator activity, registration trends and factors shaping the UK HGV market.",
    dateLabel: "July 2026",
  },
  {
    badge: "Operator insights",
    title: "UK Operator Insights Report 2026",
    summary:
      "Key findings on operator demographics, licence types, fleet sizes and regional distribution.",
    dateLabel: "June 2026",
  },
  {
    badge: "Fleet trends",
    title: "Fleet Size and Trends Report 2026",
    summary:
      "Analysis of fleet-size changes, operator growth and commercial vehicle capacity across the UK.",
    dateLabel: "May 2026",
  },
  {
    badge: "Regional analysis",
    title: "Regional HGV Activity Report Q1 2026",
    summary:
      "A quarterly breakdown of operator registrations and activity by UK region.",
    dateLabel: "April 2026",
  },
];
