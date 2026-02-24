"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface About3Data {
  title: string;
  description: string;
  items?: string[];
}

export default function About3() {
  const [animate, setAnimate] = useState(false);
  const [about3Data, setAbout3Data] = useState<About3Data | null>(null);

  useEffect(() => {
    setAnimate(true);
  }, []);

  useEffect(() => {
    const fetchAbout3Data = async () => {
      try {
        const response = await fetch("/api/about3");
        if (!response.ok) throw new Error("Failed to fetch about3 data");
        const data = await response.json();
        setAbout3Data(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAbout3Data();
  }, []);

  return (
    <section className="relative w-full py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>
            <p className="text-[#538A3E] font-bold uppercase tracking-widest mb-4">
              OUR SKILLS
            </p>

            {about3Data && (
              <>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                  {about3Data.title}
                </h2>

                <p className="text-gray-500 mb-10 max-w-xl whitespace-pre-line">
                  {about3Data.description}
                </p>
              </>
            )}

            {/* Mission / Goal List */}
            <div className="space-y-6">
              {about3Data?.items?.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl transition-all hover:bg-white hover:border-gray-200 border border-transparent">
                  <div className="w-7 h-7 rounded-full bg-[#538A3E] text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed whitespace-pre-line">
                    {item}
                  </p>
                </div>
              ))}

              {!about3Data?.items && (
                // Placeholder for when items are loading or not available
                <div className="p-4 bg-gray-50 rounded-xl animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              )}
            </div>

            <button className="mt-12 inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#538A3E] text-white font-semibold hover:bg-[#5F9B43] transition">
              Our Services
            </button>
          </div>

          {/* RIGHT IMAGE – SINGLE IMAGE ONLY */}
          <div className="relative w-full h-[520px] rounded-3xl overflow-hidden ">
            <Image
              src="/about3-image.webp"
              alt="Business Growth"
              fill
              className="object-cover"
              priority
            />
          </div>

        </div>
      </div>
    </section >
  );
}
