import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const revalidate = 10;

export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection("Video");

    // latest first (ObjectId is time-ordered)
    const about4 = await collection.find({}).sort({ _id: -1 }).limit(1).next();

    if (!about4) {
      return NextResponse.json(
        { 
          title: "",
          description: "",
          video: "",
        }
      );
    }

    return NextResponse.json({
      title: about4.title ?? "",
      description: about4.description ?? "",
      video: about4.video ?? "",
    });
  } catch (error) {
    console.error("Error fetching about4:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch about4",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
