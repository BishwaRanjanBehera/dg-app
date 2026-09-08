import { NextResponse } from "next/server";
import { getDGData } from "@/lib/get-dg-data";

export async function GET() {
  const response = await getDGData();
  return NextResponse.json(response);
}
