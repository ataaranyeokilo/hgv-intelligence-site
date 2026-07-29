/** Display badge for intelligence library cards (from admin `category` string). */
export function formatReportCategoryBadge(category: string): string {
  const normalised = category.trim().toLowerCase();

  if (normalised.includes("market") && normalised.includes("outlook")) {
    return "Market outlook";
  }
  if (normalised.includes("market trend")) {
    return "Market outlook";
  }
  if (normalised.includes("operator insight")) {
    return "Operator insights";
  }
  if (normalised.includes("fleet") && normalised.includes("trend")) {
    return "Fleet trends";
  }
  if (normalised.includes("regional")) {
    return "Regional analysis";
  }
  if (normalised.includes("quarter") || normalised.includes("q1") || normalised.includes("q2")) {
    return "Quarterly report";
  }
  if (normalised.includes("annual")) {
    return "Annual report";
  }
  if (normalised.includes("weekly")) {
    return "Weekly report";
  }

  const upper = category.trim().toUpperCase();
  return upper.length > 24 ? `${upper.slice(0, 24)}…` : upper;
}

export function formatReportMonthYear(isoDate: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}

export type ReportCategoryIconKey =
  | "chart"
  | "database"
  | "truck"
  | "building"
  | "file"
  | "clock";

export function reportCategoryIconKey(category: string): ReportCategoryIconKey {
  const n = category.trim().toLowerCase();
  if (n.includes("market") || n.includes("outlook") || n.includes("trend")) {
    return "chart";
  }
  if (n.includes("operator") || n.includes("insight")) {
    return "database";
  }
  if (n.includes("fleet")) {
    return "truck";
  }
  if (n.includes("regional")) {
    return "building";
  }
  if (n.includes("weekly")) {
    return "clock";
  }
  return "file";
}
