export const WEEKLY_SAMPLE_EMAIL_SUBJECT =
  "Verify your email — HGV Intelligence sample report";

export function intelligenceReportEmailSubject(title: string): string {
  return `Verify your email — ${title}`;
}
