import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const revalidate = 10;

export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection("Steps");

    // latest first (ObjectId is time-ordered)
    const services2 = await collection.find({}).sort({ _id: -1 }).limit(1).next();

    if (!services2) {
      return NextResponse.json(
        { 
          title: "",
          step1Title: "",
          step1Description: "",
          step1Image: "",
          step2Title: "",
          step2Description: "",
          step2Image: "",
          step3Title: "",
          step3Description: "",
          step3Image: "",
          step4Title: "",
          step4Description: "",
          step4Image: "",
          step5Title: "",
          step5Description: "",
          step5Image: "",
          step6Title: "",
          step6Description: "",
          step6Image: "",
        }
      );
    }

    return NextResponse.json({
      title: services2.title ?? "",
      step1Title: services2.step1Title ?? "",
      step1Description: services2.step1Description ?? "",
      step1Image: services2.step1Image ?? "",
      step2Title: services2.step2Title ?? "",
      step2Description: services2.step2Description ?? "",
      step2Image: services2.step2Image ?? "",
      step3Title: services2.step3Title ?? "",
      step3Description: services2.step3Description ?? "",
      step3Image: services2.step3Image ?? "",
      step4Title: services2.step4Title ?? "",
      step4Description: services2.step4Description ?? "",
      step4Image: services2.step4Image ?? "",
      step5Title: services2.step5Title ?? "",
      step5Description: services2.step5Description ?? "",
      step5Image: services2.step5Image ?? "",
      step6Title: services2.step6Title ?? "",
      step6Description: services2.step6Description ?? "",
      step6Image: services2.step6Image ?? "",
    });
  } catch (error) {
    console.error("Error fetching services2:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch services2",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
