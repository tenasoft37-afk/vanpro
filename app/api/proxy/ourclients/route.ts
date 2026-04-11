import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const revalidate = 10;

export async function GET() {
  try {
    const db = await getDb();
    const data = await db.collection("OurClients").find({}).sort({ _id: -1 }).toArray();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch ourclients" },
      { status: 500 }
    );
  }
}
