import { NextResponse } from "next/server";

const SAMPLE_CSV = [
  "region,licence_type,fleet_size",
  "Midlands,Standard National,12",
  "North West,Standard International,8",
  "South East,Restricted,3",
].join("\n");

export function GET() {
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(SAMPLE_CSV, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="uk-hgv-sample.csv"',
      "Cache-Control": "no-store",
    },
  });
}
