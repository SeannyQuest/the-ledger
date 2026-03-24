import { NextRequest, NextResponse } from "next/server";
import zipData from "@/lib/data/zip-districts.json";

const zipDistricts = zipData as Record<
  string,
  { state_abbr: string; districts: number[] }
>;

export function GET(request: NextRequest) {
  const zip = request.nextUrl.searchParams.get("zip")?.trim();

  if (!zip || !/^\d{5}$/.test(zip)) {
    return NextResponse.json(
      { error: "Please enter a valid 5-digit ZIP code." },
      { status: 400 }
    );
  }

  const result = zipDistricts[zip];

  if (!result) {
    return NextResponse.json(
      { error: "ZIP code not found. Please check and try again." },
      { status: 404 }
    );
  }

  return NextResponse.json(result);
}
