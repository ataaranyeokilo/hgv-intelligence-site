"use server";

import {
  submitDownloadLead,
  type SubmitDownloadLeadResult,
} from "@/lib/leads/submit-download-lead";

export type SubmitSampleLeadResult = SubmitDownloadLeadResult;

export async function submitSampleLead(
  email: string,
): Promise<SubmitSampleLeadResult> {
  return submitDownloadLead({
    email,
    source: "weekly_sample",
    emailSubject: "Verify your email — HGV Intelligence sample report",
  });
}
