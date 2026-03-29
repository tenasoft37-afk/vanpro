import { NextResponse } from "next/server";

const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001";

export async function GET() {
  try {
    const res = await fetch(`${DASHBOARD_URL}/api/testmonials`, {
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error fetching testimonials:", error);
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}
