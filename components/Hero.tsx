"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface HeroData {
  Title1: string; // WE ARE INTIME
  Title2: string; // World Class Consulting Agency
  decrption: string;
  image1: string;
  image2: string;
}

export default function Hero() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch("/api/hero");
        if (!response.ok) throw new Error("Failed to fetch hero data");
        const data = await response.json();
        setHeroData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHeroData();
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-background-22.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {heroData && (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <div className="max-w-3xl">
              {/* Subtitle (Title1) */}
              <p
                className="uppercase text-sky-500 mb-4"
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                }}
              >
                {heroData.Title1}
              </p>

              {/* Main Title (Title2 ONLY) */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-8">
                {heroData.Title2}
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-500 leading-relaxed mb-10 max-w-xl">
                {heroData.decrption}
              </p>

              <button className="inline-flex items-center justify-center rounded-full bg-sky-500 px-10 py-4 text-white font-semibold transition-all hover:bg-sky-600 hover:-translate-y-0.5 shadow-lg">
                Our Services
              </button>
            </div>

            {/* Images */}
            <div className="relative w-full h-[350px] sm:h-[480px] lg:h-[560px] mt-12 lg:mt-0">
              <div className="absolute left-0 bottom-0 w-[220px] sm:w-[350px] lg:w-[420px] h-[165px] sm:h-[260px] lg:h-[320px] rounded-xl overflow-hidden shadow-2xl">
                <Image src={heroData.image1} alt="" fill className="object-cover" />
              </div>

              <div className="absolute right-0 lg:-right-16 top-0 lg:-top-6 w-[180px] sm:w-[280px] lg:w-[340px] h-[220px] sm:h-[350px] lg:h-[420px] rounded-xl overflow-hidden shadow-2xl">
                <Image src={heroData.image2} alt="" fill className="object-cover" />
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
