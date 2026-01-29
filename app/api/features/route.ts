import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const revalidate = 10;

export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection("Features");

    // Get the latest features (most recent first)
    const features = await collection.find({}).sort({ _id: -1 }).limit(1).next();

    if (!features) {
      return NextResponse.json(
        {
          Title: "",
          descrption: "",
          card1Title: "",
          card1Descrption: "",
          card1Image: "",
          card2Title: "",
          card2Descrption: "",
          card2Image: "",
          card3Title: "",
          card3Descrption: "",
          card3Image: "",
        }
      );
    }

    return NextResponse.json({
      Title: features.Title ?? "",
      descrption: features.descrption ?? "",
      card1Title: features.card1Title ?? "",
      card1Descrption: features.card1Descrption ?? "",
      card1Image: features.card1Image ?? "",
      card2Title: features.card2Title ?? "",
      card2Descrption: features.card2Descrption ?? "",
      card2Image: features.card2Image ?? "",
      card3Title: features.card3Title ?? "",
      card3Descrption: features.card3Descrption ?? "",
      card3Image: features.card3Image ?? "",
    });
  } catch (error) {
    console.error("Error fetching features:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch features",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
