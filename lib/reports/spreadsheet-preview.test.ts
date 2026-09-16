import assert from "node:assert/strict";
import { test } from "node:test";

import {
  isSensitiveHeader,
  parseSpreadsheetPreviewFromBuffer,
  parseSpreadsheetPreviewFromBytes,
  redactSpreadsheetPreview,
  SPREADSHEET_PREVIEW_ROW_LIMIT,
} from "./spreadsheet-preview";

test("isSensitiveHeader redacts identity columns and keeps licence type", () => {
  assert.equal(isSensitiveHeader("Company Name"), true);
  assert.equal(isSensitiveHeader("Address"), true);
  assert.equal(isSensitiveHeader("Licence Ref"), true);
  assert.equal(isSensitiveHeader("License Number"), true);
  assert.equal(isSensitiveHeader("Phone Number"), true);
  assert.equal(isSensitiveHeader("Licence Type"), false);
  assert.equal(isSensitiveHeader("Region"), false);
  assert.equal(isSensitiveHeader("Vehicles"), false);
  assert.equal(isSensitiveHeader("Section"), false);
});

test("redactSpreadsheetPreview never stores sensitive cell values", () => {
  const secretCompany = "ACME Haulage Ltd";
  const secretAddress = "12 Freight Lane, Birmingham";
  const preview = redactSpreadsheetPreview(
    [
      "Publication Date",
      "Region",
      "Licence Ref",
      "Licence Type",
      "Company Name",
      "Address",
      "Vehicles",
    ],
    [
      [
        "12 May 2026",
        "West Midlands",
        "OF1234567",
        "SN",
        secretCompany,
        secretAddress,
        "6",
      ],
    ],
  );

  assert.ok(preview);
  const serialized = JSON.stringify(preview);
  assert.equal(serialized.includes(secretCompany), false);
  assert.equal(serialized.includes(secretAddress), false);
  assert.equal(serialized.includes("OF1234567"), false);

  const companyColumn = preview.columns.find((column) => column.label === "Company Name");
  const addressColumn = preview.columns.find((column) => column.label === "Address");
  const licenceColumn = preview.columns.find((column) => column.label === "Licence Ref");
  const typeColumn = preview.columns.find((column) => column.label === "Licence Type");
  const regionColumn = preview.columns.find((column) => column.label === "Region");

  assert.equal(companyColumn?.redacted, true);
  assert.equal(addressColumn?.redacted, true);
  assert.equal(licenceColumn?.redacted, true);
  assert.equal(typeColumn?.redacted, false);
  assert.equal(regionColumn?.redacted, false);
  assert.equal(preview.rows[0][4], null);
  assert.equal(preview.rows[0][5], null);
  assert.equal(preview.rows[0][1], "West Midlands");
  assert.equal(preview.rows[0][3], "SN");
});

test("redactSpreadsheetPreview caps rows at 25", () => {
  const headers = ["Region", "Vehicles"];
  const dataRows = Array.from({ length: 40 }, (_, index) => [
    `Region ${index}`,
    String(index + 1),
  ]);
  const preview = redactSpreadsheetPreview(headers, dataRows);
  assert.ok(preview);
  assert.equal(preview.rows.length, SPREADSHEET_PREVIEW_ROW_LIMIT);
});

test("parseSpreadsheetPreviewFromBuffer redacts CSV identity columns", async () => {
  const csv = [
    "Company Name,Region,Address,Vehicles",
    "Secret Co,North West,1 Hidden Street,4",
    "Other Ltd,London,2 Hidden Street,8",
  ].join("\n");
  const preview = await parseSpreadsheetPreviewFromBuffer(
    Buffer.from(csv, "utf8"),
    "operators.csv",
  );
  assert.ok(preview);
  const serialized = JSON.stringify(preview);
  assert.equal(serialized.includes("Secret Co"), false);
  assert.equal(serialized.includes("Hidden Street"), false);
  assert.equal(preview.rows[0][1], "North West");
  assert.equal(preview.rows[0][3], "4");
});

test("parseSpreadsheetPreviewFromBytes accepts Uint8Array CSV", async () => {
  const csv = "Region,Vehicles\nNorth,4\n";
  const preview = await parseSpreadsheetPreviewFromBytes(
    new TextEncoder().encode(csv),
    "sample.csv",
  );
  assert.ok(preview);
  assert.equal(preview.rows[0][0], "North");
  assert.equal(preview.rows[0][1], "4");
});
