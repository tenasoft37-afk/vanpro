import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const revalidate = 10;

export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection("OurServices");

    // latest first (ObjectId is time-ordered)
    const services1 = await collection.find({}).sort({ _id: -1 }).limit(1).next();

    if (!services1) {
      return NextResponse.json(
        { 
          title: "",
          card1Title: "",
          card1Description: "",
          card1Image: "",
          card2Title: "",
          card2Description: "",
          card2Image: "",
          card3Title: "",
          card3Description: "",
          card3Image: "",
          card4Title: "",
          card4Description: "",
          card4Image: "",
          card5Title: "",
          card5Description: "",
          card5Image: "",
          card6Title: "",
          card6Description: "",
          card6Image: "",
        }
      );
    }

    return NextResponse.json({
      title: services1.title ?? "",
      card1Title: services1.card1Title ?? "",
      card1Description: services1.card1Description ?? "",
      card1Image: services1.card1Image ?? "",
      card2Title: services1.card2Title ?? "",
      card2Description: services1.card2Description ?? "",
      card2Image: services1.card2Image ?? "",
      card3Title: services1.card3Title ?? "",
      card3Description: services1.card3Description ?? "",
      card3Image: services1.card3Image ?? "",
      card4Title: services1.card4Title ?? "",
      card4Description: services1.card4Description ?? "",
      card4Image: services1.card4Image ?? "",
      card5Title: services1.card5Title ?? "",
      card5Description: services1.card5Description ?? "",
      card5Image: services1.card5Image ?? "",
      card6Title: services1.card6Title ?? "",
      card6Description: services1.card6Description ?? "",
      card6Image: services1.card6Image ?? "",
    });
  } catch (error) {
    console.error("Error fetching services1:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch services1",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
