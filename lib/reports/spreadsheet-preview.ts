export const SPREADSHEET_PREVIEW_ROW_LIMIT = 25;

export type SpreadsheetPreviewColumn = {
  key: string;
  label: string;
  redacted: boolean;
};

export type SpreadsheetPreview = {
  columns: SpreadsheetPreviewColumn[];
  rows: Array<Array<string | null>>;
};

const SENSITIVE_TOKENS = [
  "company",
  "name",
  "address",
  "licence",
  "license",
  "phone",
  "email",
  "contact",
] as const;

const SPREADSHEET_EXTENSIONS = new Set(["xlsx", "xls", "csv"]);

export function isSpreadsheetFileName(fileName: string): boolean {
  const extension = fileName.split(".").pop()?.toLowerCase() ?? "";
  return SPREADSHEET_EXTENSIONS.has(extension);
}

export function isSensitiveHeader(header: string): boolean {
  const normalized = header.toLowerCase().trim();
  if (!normalized) {
    return false;
  }
  if (/licen[cs]e\s*type/.test(normalized)) {
    return false;
  }
  return SENSITIVE_TOKENS.some((token) => normalized.includes(token));
}

function columnKey(label: string, index: number): string {
  const slug = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || `col-${index}`;
}

function cellToString(value: unknown): string {
  if (value == null) {
    return "";
  }
  return String(value).trim();
}

export function redactSpreadsheetPreview(
  headers: string[],
  dataRows: unknown[][],
): SpreadsheetPreview | null {
  const labels = headers.map((header) => header.trim()).filter(Boolean);
  if (labels.length === 0) {
    return null;
  }

  const columns: SpreadsheetPreviewColumn[] = labels.map((label, index) => ({
    key: columnKey(label, index),
    label,
    redacted: isSensitiveHeader(label),
  }));

  const rows = dataRows.slice(0, SPREADSHEET_PREVIEW_ROW_LIMIT).map((row) =>
    columns.map((column, index) => {
      if (column.redacted) {
        return null;
      }
      const value = cellToString(row[index]);
      return value || null;
    }),
  );

  return { columns, rows };
}

export function asSpreadsheetPreview(
  value: unknown,
): SpreadsheetPreview | null {
  if (!value || typeof value !== "object") {
    return null;
  }
  const preview = value as SpreadsheetPreview;
  if (!Array.isArray(preview.columns) || !Array.isArray(preview.rows)) {
    return null;
  }
  if (preview.columns.length === 0 || preview.rows.length === 0) {
    return null;
  }
  return preview;
}

function parseCsvText(text: string): string[][] {
  const rows: string[][] = [];
  let current = "";
  let row: string[] = [];
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(current);
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(current);
      current = "";
      if (row.some((cell) => cell.trim() !== "")) {
        rows.push(row);
      }
      row = [];
      continue;
    }

    current += char;
  }

  row.push(current);
  if (row.some((cell) => cell.trim() !== "")) {
    rows.push(row);
  }

  return rows;
}

async function parseWorkbookRows(
  buffer: Buffer,
): Promise<string[][] | null> {
  const XLSX = await import("xlsx");
  const workbook = XLSX.read(buffer, {
    type: "buffer",
    sheetRows: SPREADSHEET_PREVIEW_ROW_LIMIT + 1,
    dense: true,
  });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    return null;
  }
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) {
    return null;
  }
  return XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: "",
    raw: false,
  }) as string[][];
}

export async function parseSpreadsheetPreviewFromBuffer(
  buffer: Buffer,
  fileName: string,
): Promise<SpreadsheetPreview | null> {
  if (!isSpreadsheetFileName(fileName)) {
    return null;
  }

  const extension = fileName.split(".").pop()?.toLowerCase() ?? "";
  let table: string[][] | null = null;

  try {
    if (extension === "csv") {
      table = parseCsvText(buffer.toString("utf8"));
    } else {
      table = await parseWorkbookRows(buffer);
    }
  } catch (cause) {
    console.error("[spreadsheet-preview] parse failed:", cause);
    return null;
  }

  if (!table || table.length < 2) {
    return null;
  }

  const [headers, ...dataRows] = table;
  return redactSpreadsheetPreview(
    headers.map((header) => cellToString(header)),
    dataRows,
  );
}
