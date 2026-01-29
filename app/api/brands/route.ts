import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const revalidate = 10;

export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection("Brands");

    // Get the latest brands (most recent first)
    const brands = await collection.find({}).sort({ _id: -1 }).limit(1).next();

    if (!brands) {
      return NextResponse.json({
        images: [],
      });
    }

    return NextResponse.json({
      images: brands.images ?? [],
    });
  } catch (error) {
    console.error("Error fetching brands:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch brands",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
