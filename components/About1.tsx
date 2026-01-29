"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface About1Data {
  title: string;
  description: string;
  items: string[];
  image: string;
}

export default function About1() {
  const [about1Data, setAbout1Data] = useState<About1Data | null>(null);

  useEffect(() => {
    const fetchAbout1Data = async () => {
      try {
        const response = await fetch("/api/about1");
        if (!response.ok) throw new Error("Failed to fetch about1 data");
        const data = await response.json();
        setAbout1Data(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAbout1Data();
  }, []);

  // Split items into two columns
  const itemsPerColumn = about1Data?.items
    ? Math.ceil(about1Data.items.length / 2)
    : 0;
  const leftItems = about1Data?.items.slice(0, itemsPerColumn) || [];
  const rightItems = about1Data?.items.slice(itemsPerColumn) || [];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div>
            {/* Subtitle */}
            <p className="uppercase text-sky-500 font-extrabold tracking-widest mb-4">
              ABOUT US
            </p>

            {/* Title */}
            {about1Data && (
              <>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                  {about1Data.title}
                </h2>

                {/* Description */}
                <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                  {about1Data.description}
                </p>

                {/* items */}
                {about1Data.items.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <ul className="space-y-4 text-gray-600 text-sm">
                      {leftItems.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-yellow-400 font-bold">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <ul className="space-y-4 text-gray-600 text-sm">
                      {rightItems.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-yellow-400 font-bold">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Button */}
                <button className="inline-flex items-center justify-center rounded-full bg-sky-500 px-10 py-4 text-white font-semibold text-base transition-all duration-200 hover:bg-sky-600 hover:translate-y-[-2px] shadow-lg">
                  About Us
                </button>
              </>
            )}
          </div>

          {/* Right Image (Combined Image) */}
          {about1Data && (
            <div className="relative w-full max-w-md mx-auto lg:max-w-none lg:ml-auto lg:mr-8 lg:translate-x-8">
              <Image
                src={about1Data.image || "/about1.webp"}
                alt="About Consulting"
                width={520}
                height={640}
                className="w-full h-auto rounded-2xl "
              />
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
