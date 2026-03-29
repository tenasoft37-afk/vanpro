import { NextResponse } from "next/server";

const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001";

export const revalidate = 10;

export async function GET() {
  try {
    const res = await fetch(`${DASHBOARD_URL}/api/portfolio`, {
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch portfolio" },
      { status: 500 }
    );
  }
}
