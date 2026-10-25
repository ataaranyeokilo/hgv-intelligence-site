/**
 * Answers shared by the quote form and the lead-finder quiz. `value` is what
 * the form saves; `label` is the friendlier wording shown in the quiz.
 */
export type QuoteOption = { value: string; label: string };

export const quoteSectors: readonly QuoteOption[] = [
  { value: "Fuel suppliers", label: "Fuel cards" },
  { value: "Commercial insurers", label: "Insurance" },
  { value: "Finance & leasing", label: "Vehicle finance or leasing" },
  { value: "Fleet service suppliers", label: "Fleet services and maintenance" },
  { value: "Transport recruiters", label: "Driver recruitment" },
  { value: "Other", label: "Something else" },
];

export const quoteRegions: readonly QuoteOption[] = [
  { value: "UK-wide", label: "The whole UK" },
  { value: "North of England", label: "North of England" },
  { value: "Midlands", label: "Midlands" },
  { value: "South of England", label: "South of England" },
  { value: "Scotland", label: "Scotland" },
  { value: "Wales", label: "Wales" },
  { value: "Northern Ireland", label: "Northern Ireland" },
  { value: "Specific regions — I will note below", label: "A few specific areas" },
];

export const quoteVolumes: readonly QuoteOption[] = [
  { value: "Exploring options", label: "Just exploring for now" },
  { value: "Under 50 new operators a week", label: "Up to 50 a week" },
  { value: "50–200 new operators a week", label: "50 to 200 a week" },
  { value: "200+ new operators a week", label: "More than 200 a week" },
];

/** The value if it is one of the options (e.g. from a URL), otherwise "". */
export function asQuoteOption(
  options: readonly QuoteOption[],
  value: string | undefined,
): string {
  const trimmed = value?.trim() ?? "";
  return options.some((option) => option.value === trimmed) ? trimmed : "";
}
