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
  {
    badge: "Weekly operators",
    title: "Weekly HGV Operator Registrations",
    summary:
      "Newly registered operators from the previous seven days, structured for sales and outreach teams.",
    dateLabel: "March 2026",
  },
  {
    badge: "Licence trends",
    title: "Operator Licence Trends Report 2026",
    summary:
      "How licence types, vehicle authorisations and renewal patterns are shifting across the UK fleet.",
    dateLabel: "March 2026",
  },
  {
    badge: "Sector outlook",
    title: "UK Transport Sector Outlook 2026",
    summary:
      "Commercial signals across haulage, logistics and supply-chain operators shaping the year ahead.",
    dateLabel: "February 2026",
  },
  {
    badge: "Contact enrichment",
    title: "New Operator Contact Enrichment",
    summary:
      "How enriched direct-dial contacts improve connect rates for transport sales teams.",
    dateLabel: "February 2026",
  },
];
