import type { ReportStatus } from "@/lib/reports/types";
import { statusLabel } from "@/lib/admin/preview";

const statusClass: Record<ReportStatus, string> = {
  draft: "border-neutral-200 bg-neutral-50 text-neutral-600",
  published: "border-blue-200 bg-blue-50 text-fleetSignal",
  archived: "border-neutral-200 bg-white text-neutral-500",
};

export function ReportStatusBadge({ status }: { status: ReportStatus }) {
  return (
    <span
      className={`inline-flex rounded-sm border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusClass[status]}`}
    >
      {statusLabel(status)}
    </span>
  );
}
