"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface About3Data {
  title: string;
  description: string;
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
            <p className="text-sky-500 font-bold uppercase tracking-widest mb-4">
              OUR SKILLS
            </p>

            {about3Data && (
              <>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                  {about3Data.title}
                </h2>

                <p className="text-gray-500 mb-10 max-w-xl">
                  {about3Data.description}
                </p>
              </>
            )}

            {/* PROGRESS BARS */}
            <div className="space-y-8">

              {/* Web Design */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-900">
                    Web Design
                  </span>
                  <span className="font-semibold text-gray-900">
                    70%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-yellow-400 rounded-full transition-all duration-1000 ease-out ${animate ? "w-[70%]" : "w-0"
                      }`}
                  />
                </div>
              </div>

              {/* Mobile Application */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-900">
                    Mobile Application
                  </span>
                  <span className="font-semibold text-gray-900">
                    90%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-yellow-400 rounded-full transition-all duration-1000 delay-150 ease-out ${animate ? "w-[90%]" : "w-0"
                      }`}
                  />
                </div>
              </div>

              {/* Digital Marketing */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-900">
                    Digital Marketing
                  </span>
                  <span className="font-semibold text-gray-900">
                    60%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-yellow-400 rounded-full transition-all duration-1000 delay-300 ease-out ${animate ? "w-[60%]" : "w-0"
                      }`}
                  />
                </div>
              </div>

            </div>

            <button className="mt-12 inline-flex items-center justify-center px-8 py-4 rounded-full bg-sky-500 text-white font-semibold hover:bg-sky-600 transition">
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
    </section>
  );
}
