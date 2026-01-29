import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const revalidate = 10;

export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection("FeaturedServices");

    // latest first (ObjectId is time-ordered)
    const about2 = await collection.find({}).sort({ _id: -1 }).limit(1).next();

    if (!about2) {
      return NextResponse.json(
        { 
          title: "",
          image: "",
        }
      );
    }

    return NextResponse.json({
      title: about2.title ?? "",
      image: about2.image ?? "",
    });
  } catch (error) {
    console.error("Error fetching about2:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch about2",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
