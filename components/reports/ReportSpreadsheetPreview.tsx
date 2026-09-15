import { IconFile, IconLock } from "@/components/ui/icons";
import type { SpreadsheetPreview } from "@/lib/reports/spreadsheet-preview";

function RedactedCell() {
  return (
    <span
      className="block h-3 w-full max-w-[4.5rem] rounded-sm bg-neutral-300/80"
      aria-label="Redacted"
    />
  );
}

type ReportSpreadsheetPreviewProps = {
  preview: SpreadsheetPreview;
  fileLabel?: string;
};

export function ReportSpreadsheetPreview({
  preview,
  fileLabel = "Redacted sample",
}: ReportSpreadsheetPreviewProps) {
  return (
    <div className="relative overflow-hidden rounded-sm border border-neutral-200 bg-white">
      <p className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-medium text-neutral-600">
        <IconFile className="h-4 w-4 shrink-0 text-neutral-500" />
        {fileLabel}
      </p>
      <div className="max-h-[28rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-100">
                {preview.columns.map((column, columnIndex) => (
                  <th
                    key={`${column.key}-${columnIndex}`}
                    scope="col"
                    className="whitespace-nowrap px-3 py-2 font-semibold text-neutral-800"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preview.rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-neutral-100 even:bg-neutral-50/80"
                >
                  {preview.columns.map((column, columnIndex) => (
                    <td
                      key={`${column.key}-${columnIndex}`}
                      className="whitespace-nowrap px-3 py-2.5 text-neutral-700"
                    >
                      {column.redacted || row[columnIndex] == null ? (
                        <RedactedCell />
                      ) : (
                        row[columnIndex]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.55) 40%, rgba(255,255,255,0.96) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-4 pt-10 text-center">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-white">
          <IconLock className="h-4 w-4" />
        </span>
        <p className="mt-2 text-sm font-semibold text-neutral-900">
          Full file after email verification
        </p>
        <p className="mt-1 max-w-sm text-xs leading-relaxed text-neutral-600">
          Company names, addresses and licence numbers are hidden in this
          sample.
        </p>
      </div>
    </div>
  );
}
