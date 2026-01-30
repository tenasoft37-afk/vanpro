"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface FeaturesData {
  Title: string;
  descrption: string;
  card1Title: string;
  card1Descrption: string;
  card1Image: string;
  card2Title: string;
  card2Descrption: string;
  card2Image: string;
  card3Title: string;
  card3Descrption: string;
  card3Image: string;
}

export default function FeaturesHome() {
  const [featuresData, setFeaturesData] = useState<FeaturesData | null>(null);

  useEffect(() => {
    const fetchFeaturesData = async () => {
      try {
        const response = await fetch("/api/features");
        if (!response.ok) throw new Error("Failed to fetch features data");
        const data = await response.json();
        setFeaturesData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFeaturesData();
  }, []);

  const cards = featuresData
    ? [
        {
          number: "01",
          title: featuresData.card1Title,
          description: featuresData.card1Descrption,
          image: featuresData.card1Image,
        },
        {
          number: "02",
          title: featuresData.card2Title,
          description: featuresData.card2Descrption,
          image: featuresData.card2Image,
        },
        {
          number: "03",
          title: featuresData.card3Title,
          description: featuresData.card3Descrption,
          image: featuresData.card3Image,
        },
      ]
    : [];

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/features-home-background.png"
          alt="Features Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {featuresData && (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
          {/* Top Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Left */}
            <div>
              <p className="uppercase text-sky-400 font-extrabold tracking-widest mb-4">
                FEATURES
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                {featuresData.Title}
              </h2>
            </div>

            {/* Right */}
            <div className="flex items-center">
              <p className="text-base md:text-lg text-white/80 max-w-xl">
                {featuresData.descrption}
              </p>
            </div>
          </div>

          {/* Features Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {cards.map((card, index) => (
              <div key={index}>
                <span className="text-yellow-400 font-extrabold text-lg">
                  {card.number}
                </span>
                <h3 className={`text-xl font-bold mt-3 mb-2 ${index === 2 ? 'text-black md:text-white' : 'text-white'}`}>
                  {card.title}
                </h3>
                <p className={`text-sm mb-6 max-w-sm ${index === 2 ? 'text-black md:text-white/70' : 'text-white/70'}`}>
                  {card.description}
                </p>
                <div className="relative w-full h-[220px] rounded-xl overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
