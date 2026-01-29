import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const revalidate = 10;

export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection("GetInTouch");

    // latest first (ObjectId is time-ordered)
    const footer = await collection.find({}).sort({ _id: -1 }).limit(1).next();

    if (!footer) {
      return NextResponse.json(
        { 
          locationTitle: "",
          locationDescription: "",
          phoneTitle: "",
          phoneDescription: "",
          emailTitle: "",
          emailDescription: "",
        }
      );
    }

    return NextResponse.json({
      locationTitle: footer.locationTitle ?? "",
      locationDescription: footer.locationDescription ?? "",
      phoneTitle: footer.phoneTitle ?? "",
      phoneDescription: footer.phoneDescription ?? "",
      emailTitle: footer.emailTitle ?? "",
      emailDescription: footer.emailDescription ?? "",
    });
  } catch (error) {
    console.error("Error fetching footer:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch footer",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
