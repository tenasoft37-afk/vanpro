"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Quote } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

interface TestimonialCard {
    id?: string;
    comment: string;
    name: string;
    role: string;
    profilePic: string;
}

interface TestimonialData {
    id: string;
    title: string;
    description: string;
    cards: TestimonialCard[];
}

// Static fallback display while loading
const LOADING_PLACEHOLDER_COUNT = 2;

const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001";

export default function Testimonials() {
    const [data, setData] = useState<TestimonialData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/proxy/testmonials`)
            .then((res) => res.json())
            .then((json) => {
                if (json.success && json.data?.length > 0) {
                    setData(json.data[0]);
                }
            })
            .catch((err) => {
                console.warn("Could not fetch testimonials:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const cards: TestimonialCard[] = data?.cards?.length ? data.cards : [];
    const sectionTitle = data?.title || null;
    const sectionDesc = data?.description || null;

    return (
        <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">

                {/* LEFT CONTENT */}
                <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
                    <p className="text-sky-500 font-bold uppercase tracking-wider text-xs sm:text-sm">
                        TESTIMONIALS
                    </p>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                        {sectionTitle ? (
                            sectionTitle
                        ) : (
                            <>
                                We are Very <br />
                                Happy to Get Our <br />
                                Client&apos;s Reviews.
                            </>
                        )}
                    </h2>

                    <p className="text-slate-500 text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                        {sectionDesc || "Since 2015 Vanguard has supported re-structuring, re-branding, and openings across the Middle East, EU, Africa and beyond, offering consultancy, contracting, marketing and engineering-led solutions."}
                    </p>
                </div>

                {/* RIGHT SLIDER */}
                <div className="w-full">
                    {loading ? (
                        <div className="h-[280px] sm:h-[350px] md:h-[450px] space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="animate-pulse bg-slate-100 rounded-2xl h-[130px] sm:h-[170px]" />
                            ))}
                        </div>
                    ) : (
                        <Swiper
                            direction="vertical"
                            modules={[Pagination, Autoplay]}
                            pagination={{
                                clickable: true,
                                el: ".custom-pagination",
                            }}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            speed={800}
                            spaceBetween={30}
                            loop={cards.length > 1}
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                1024: { slidesPerView: 2 },
                            }}
                            className="h-[280px] sm:h-[350px] md:h-[450px] lg:h-[550px]"
                        >
                            {cards.map((item: TestimonialCard, index: number) => (
                                <SwiperSlide key={item.id || index}>
                                    <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.1)] border border-slate-100 h-full flex flex-col justify-between relative">

                                        <p className="text-slate-500 italic leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                                            {item.comment}
                                        </p>

                                        <div className="flex items-center gap-3 sm:gap-4 mt-auto">
                                            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0 bg-slate-100">
                                                {item.profilePic ? (
                                                    <Image
                                                        src={item.profilePic}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized={item.profilePic.startsWith("http")}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xl">
                                                        {item.name?.charAt(0) || "?"}
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <h4 className="font-bold text-slate-900 text-base sm:text-lg">
                                                    {item.name}
                                                </h4>
                                                <p className="text-xs sm:text-sm text-slate-500">
                                                    {item.role}
                                                </p>
                                            </div>
                                        </div>

                                        {/* QUOTE ICON */}
                                        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-yellow-400">
                                            <Quote size={36} fill="currentColor" className="rotate-180 sm:w-12 sm:h-12" />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}

                    {/* PAGINATION */}
                    <div className="custom-pagination flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6" />
                </div>
            </div>

            {/* PAGINATION STYLES */}
            <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background-color: #cbd5e1;
          opacity: 1;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        @media (min-width: 640px) {
          .custom-pagination .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
          }
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background-color: #538A3E;
          transform: scale(1.3);
        }
      `}</style>
        </section>
    );
}
