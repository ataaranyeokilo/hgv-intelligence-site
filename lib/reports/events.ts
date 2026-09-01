"use server";

import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/env";

import type { ReportEventType } from "./types";

export async function recordReportEvent(
  reportId: string,
  eventType: ReportEventType,
): Promise<void> {
  if (!hasSupabaseEnv() || !reportId) {
    return;
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("report_events").insert({
      report_id: reportId,
      event_type: eventType,
    });

    if (error) {
      console.error("[recordReportEvent]", error.message);
    }
  } catch (cause) {
    console.error("[recordReportEvent] uncaught:", cause);
  }
}

export async function trackReportClick(reportId: string): Promise<void> {
  await recordReportEvent(reportId, "clicked");
}
