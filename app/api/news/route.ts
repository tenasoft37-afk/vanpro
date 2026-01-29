import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const revalidate = 10;

export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection("News");

    // Get the latest news (most recent first)
    const news = await collection.find({}).sort({ _id: -1 }).limit(1).next();

    if (!news) {
      return NextResponse.json(
        {
          card1Title: "",
          card1Date: "",
          card1Descrption: "",
          card1Image: "",
          card2Title: "",
          card2Date: "",
          card2Descrption: "",
          card2Image: "",
          card3Title: "",
          card3Date: "",
          card3Descrption: "",
          card3Image: "",
        }
      );
    }

    return NextResponse.json({
      card1Title: news.card1Title ?? "",
      card1Date: news.card1Date ?? "",
      card1Descrption: news.card1Descrption ?? "",
      card1Image: news.card1Image ?? "",
      card2Title: news.card2Title ?? "",
      card2Date: news.card2Date ?? "",
      card2Descrption: news.card2Descrption ?? "",
      card2Image: news.card2Image ?? "",
      card3Title: news.card3Title ?? "",
      card3Date: news.card3Date ?? "",
      card3Descrption: news.card3Descrption ?? "",
      card3Image: news.card3Image ?? "",
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch news",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
