import { IconFile } from "@/components/ui/icons";

const columns = [
  { key: "company", label: "Company Name", redacted: true },
  { key: "phone", label: "Phone Number", redacted: false },
  { key: "licence", label: "Licence Number", redacted: true },
  { key: "type", label: "Operator Type", redacted: true },
  { key: "registered", label: "Date Registered", redacted: false },
  { key: "vehicles", label: "Vehicle Count", redacted: false },
  { key: "postcode", label: "Postcode", redacted: false },
] as const;

const visibleRows = [
  {
    registered: "12 May 2026",
    vehicles: "6",
    postcode: "S9 1XX",
    phone: "07XXX XXXXXX",
  },
  {
    registered: "11 May 2026",
    vehicles: "3",
    postcode: "M1 2AB",
    phone: "07XXX XXXXXX",
  },
  {
    registered: "10 May 2026",
    vehicles: "12",
    postcode: "B4 7ET",
    phone: "07XXX XXXXXX",
  },
  {
    registered: "9 May 2026",
    vehicles: "5",
    postcode: "LS1 4DY",
    phone: "07XXX XXXXXX",
  },
  {
    registered: "8 May 2026",
    vehicles: "8",
    postcode: "CF10 1EP",
    phone: "07XXX XXXXXX",
  },
];

function RedactedCell() {
  return (
    <span className="block h-3 w-full max-w-[4.5rem] rounded-sm bg-neutral-300/80 blur-[2px]" />
  );
}

type WeeklySampleSpreadsheetPreviewProps = {
  className?: string;
};

export function WeeklySampleSpreadsheetPreview({
  className = "",
}: WeeklySampleSpreadsheetPreviewProps) {
  return (
    <div
      className={`overflow-hidden rounded-sm border border-neutral-200 bg-white ${className}`.trim()}
    >
      <p className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-medium text-neutral-600">
        <IconFile className="h-4 w-4 shrink-0 text-neutral-500" />
        Weekly HGV Operator Leads – Sample (Redacted)
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-100">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className="whitespace-nowrap px-3 py-2 font-semibold text-neutral-800"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-neutral-100 even:bg-neutral-50/80"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="whitespace-nowrap px-3 py-2.5 text-neutral-700"
                  >
                    {col.redacted ? (
                      <RedactedCell />
                    ) : (
                      row[col.key as keyof typeof row]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
