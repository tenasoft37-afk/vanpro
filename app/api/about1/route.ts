import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const revalidate = 10;

export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection("AboutUs");

    // latest first (ObjectId is time-ordered)
    const about1 = await collection.find({}).sort({ _id: -1 }).limit(1).next();

    if (!about1) {
      return NextResponse.json(
        { 
          title: "",
          description: "",
          items: [],
          image: "",
        }
      );
    }

    return NextResponse.json({
      title: about1.title ?? "",
      description: about1.description ?? "",
      items: about1.items ?? [],
      image: about1.image ?? "",
    });
  } catch (error) {
    console.error("Error fetching about1:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch about1",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
