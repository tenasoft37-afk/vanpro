"use client";

import Image from "next/image";
import { DollarSign, BarChart3, Settings, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface About2Data {
  title: string;
  image: string;
}

export default function About2() {
  const [about2Data, setAbout2Data] = useState<About2Data | null>(null);

  useEffect(() => {
    const fetchAbout2Data = async () => {
      try {
        const response = await fetch("/api/about2");
        if (!response.ok) throw new Error("Failed to fetch about2 data");
        const data = await response.json();
        setAbout2Data(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAbout2Data();
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">

          {/* Left Image */}
          {about2Data && (
            <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[520px]">
              <Image
                src={about2Data.image || "/about2-image.webp"}
                alt="About Services"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>
          )}

          {/* Right Content */}
          <div className="text-center lg:text-left">
            <p className="text-sky-500 font-bold uppercase tracking-widest mb-3">
              Featured Services
            </p>
            {/* Title */}
            {about2Data && (
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-10 leading-tight">
                {about2Data.title}
              </h2>
            )}

            {/* Services */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">

              {/* Item */}
              <div className="flex flex-col items-center lg:items-start">
                <DollarSign className="w-12 h-12 text-sky-500 mb-4" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Online Monetizing
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                  Niore et dolore magna aliqu enim ad minim venia uis nost
                </p>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <BarChart3 className="w-12 h-12 text-sky-500 mb-4" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Online Analysis
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                  Niore et dolore magna aliqu enim ad minim venia uis nost
                </p>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <Settings className="w-12 h-12 text-sky-500 mb-4" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Web Designing
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                  Niore et dolore magna aliqu enim ad minim venia uis nost
                </p>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <TrendingUp className="w-12 h-12 text-sky-500 mb-4" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  SEO Marketing
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                  Niore et dolore magna aliqu enim ad minim venia uis nost
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
