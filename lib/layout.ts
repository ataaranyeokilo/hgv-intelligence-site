export const pageContainerClass = "mx-auto max-w-6xl px-6";

export function categoryBadgeLabel(category: string): string {
  const upper = category.toUpperCase();
  if (upper.includes("ANNUAL")) return "ANNUAL";
  if (upper.includes("QUARTER") || upper.includes("Q1") || upper.includes("Q2"))
    return "QUARTERLY";
  return upper.slice(0, 12);
}
