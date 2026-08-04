export const HERO_MOCK_BASE = {
  operatorLicences: 1248,
  operatorLicencesDelta: 18,
  weeklySignals: 7632,
  weeklySignalsDelta: 24,
  activeRegions: 32,
  totalRegions: 52,
  trendPercent: 18,
} as const;

export const HERO_TREND_MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
] as const;

/** Fixed SVG polyline points for 12-month trend (viewBox 0 0 200 40). */
export const HERO_TREND_LINE_POINTS =
  "0,32 18,27 36,23 54,21 72,24 90,26 108,22 126,18 144,14 162,10 180,7 200,5";
