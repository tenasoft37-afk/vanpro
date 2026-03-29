import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const revalidate = 10;

export async function GET() {
  try {
    const db = await getDb();

    // Fetch Testmonials and join TestmonialCard
    const data = await db.collection("Testmonials").aggregate([
      {
        $lookup: {
          from: "TestmonialCard",
          localField: "_id",
          foreignField: "testmonialId",
          as: "cards"
        }
      },
      { $sort: { _id: -1 } }
    ]).toArray();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch testmonials" },
      { status: 500 }
    );
  }
}
