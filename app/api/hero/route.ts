import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const revalidate = 10;

export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection("Hero");

    // latest first (ObjectId is time-ordered)
    const hero = await collection.find({}).sort({ _id: -1 }).limit(1).next();

    if (!hero) {
      return NextResponse.json(
        { 
          Title1: "",
          Title2: "",
          decrption: "",
          image1: "",
          image2: "",
        }
      );
    }

    return NextResponse.json({
      Title1: hero.Title1 ?? "",
      Title2: hero.Title2 ?? "",
      decrption: hero.decrption ?? "",
      image1: hero.image1 ?? "",
      image2: hero.image2 ?? "",
    });
  } catch (error) {
    console.error("Error fetching hero:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch hero",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
