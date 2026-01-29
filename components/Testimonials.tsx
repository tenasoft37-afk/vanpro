"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Quote } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
    {
        text: "Working with several WordPress themes and templates over the years, I can confidently say this is the best in every aspect. From design to code quality, everything is excellent.",
        name: "Mike Tyson",
        role: "Manager",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
    },
    {
        text: "This is one of the BEST THEMES I have ever worked with. The extra features are amazing and the customer support is extremely responsive and helpful.",
        name: "Selena Anderson",
        role: "Journalist",
        image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
    },
    {
        text: "The design quality, flexibility, and documentation are outstanding. I highly recommend this service for anyone looking for professional results.",
        name: "David Johnson",
        role: "Business Consultant",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    },
];

export default function Testimonials() {
    return (
        <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">

                {/* LEFT CONTENT */}
                <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
                    <p className="text-sky-500 font-bold uppercase tracking-wider text-xs sm:text-sm">
                        TESTIMONIALS
                    </p>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                        We are Very <br />
                        Happy to Get Our <br />
                        Client&rsquo;s Reviews.
                    </h2>

                    <p className="text-slate-500 text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                        We value the experimentation, the reformation of the message, and the
                        smart incentives. We offer a variety of services and solutions
                        Worldwide.
                    </p>
                </div>

                {/* RIGHT SLIDER */}
                <div className="w-full">
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
                        loop
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            1024: { slidesPerView: 2 },
                        }}
                        className="h-[280px] sm:h-[350px] md:h-[450px] lg:h-[550px]"
                    >
                        {testimonials.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.1)] border border-slate-100 h-full flex flex-col justify-between relative">

                                    <p className="text-slate-500 italic leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                                        {item.text}
                                    </p>

                                    <div className="flex items-center gap-3 sm:gap-4 mt-auto">
                                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
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
          background-color: #0ea5e9;
          transform: scale(1.3);
        }
      `}</style>
        </section>
    );
}
