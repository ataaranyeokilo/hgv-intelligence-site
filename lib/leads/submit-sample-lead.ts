"use server";

import { createClient } from "@/lib/supabase/server";

export type SubmitSampleLeadResult = "success" | "exists" | "error";

const SOURCE = "sample_download";

export async function submitSampleLead(
  email: string,
): Promise<SubmitSampleLeadResult> {
  const supabase = await createClient();

  const { error } = await supabase.from("leads").insert({
    email: email.trim().toLowerCase(),
    source: SOURCE,
  });

  if (!error) return "success";
  if (error.code === "23505") return "exists";
  return "error";
}
