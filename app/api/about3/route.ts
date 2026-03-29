import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const revalidate = 10;

export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection("Skills");

    // latest first (ObjectId is time-ordered)
    const about3 = await collection.find({}).sort({ _id: -1 }).limit(1).next();

    if (!about3) {
      return NextResponse.json(
        {
          title: "",
          description: "",
        }
      );
    }

    return NextResponse.json({
      title: about3.title ?? "",
      description: about3.description ?? "",
      items: about3.skills ?? [],
    });
  } catch (error) {
    console.error("Error fetching about3:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch about3",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
