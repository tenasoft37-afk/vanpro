import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const revalidate = 10;

export async function GET() {
  try {
    const db = await getDb();
    const data = await db.collection("Contact").findOne({});
    return NextResponse.json({ success: true, data: data || null });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch contact banner" },
      { status: 500 }
    );
  }
}
