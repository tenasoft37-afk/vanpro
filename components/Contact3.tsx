"use client";

import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";
import { useEffect, useState } from "react";

interface BrandsData {
    images: string[];
}

export default function Contact3() {
    const [brandsData, setBrandsData] = useState<BrandsData | null>(null);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        const fetchBrandsData = async () => {
            try {
                const response = await fetch("/api/brands");
                if (!response.ok) throw new Error("Failed to fetch brands data");
                const data = await response.json();
                setBrandsData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBrandsData();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        try {
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to subscribe");
            }

            setMessage({ type: "success", text: "Thank you for subscribing!" });
            setEmail("");
        } catch (error) {
            setMessage({
                type: "error",
                text: error instanceof Error ? error.message : "Something went wrong. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // تكرار كافي لضمان حركة متواصلة
    const logos = brandsData?.images || [];
    const repeatedLogos = logos.length > 0 
        ? [...logos, ...logos, ...logos, ...logos]
        : [];
    return (
        <section className="relative w-full">
            {/* Background Split */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[#004b93]" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white" />

            <div className="relative max-w-7xl mx-auto px-6 py-12">
                <div className="bg-[#fbbf24] rounded-3xl p-8 md:p-16 flex flex-col shadow-lg text-center md:text-left">

                    <div className="flex flex-col md:flex-row items-center justify-between w-full mb-10">
                        {/* Text */}
                        <div className="w-full md:w-1/2 mb-8 md:mb-0">
                            <p className="uppercase tracking-widest text-xs md:text-sm font-bold text-white mb-2 ml-1">
                                GET UPDATES
                            </p>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                                Subscribe to our Newsletter
                            </h2>
                        </div>

                        {/* Form */}
                        <div className="w-full md:w-1/2 md:pl-10">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:overflow-hidden bg-transparent sm:bg-white rounded-lg sm:h-14">
                                    <input
                                        type="email"
                                        placeholder="Your mail address"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isSubmitting}
                                        className="w-full sm:flex-1 px-6 py-4 sm:py-0 text-gray-700 placeholder-gray-400 focus:outline-none h-14 sm:h-full rounded-lg sm:rounded-none bg-white disabled:opacity-50"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full sm:w-auto bg-[#00bfff] hover:bg-[#00a3d9] text-white font-bold px-8 py-4 sm:py-0 h-14 sm:h-full transition-colors duration-300 rounded-lg sm:rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? "Subscribing..." : "Subscribe"}
                                    </button>
                                </div>
                                {message && (
                                    <p className={`text-sm font-medium ${message.type === "success" ? "text-white" : "text-red-200"}`}>
                                        {message.text}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>

                </div>
            </div>

            {/* Logos Marquee */}
            {brandsData && repeatedLogos.length > 0 && (
                <div className="w-full pb-10">
                    <Marquee speed={110} pauseOnHover={false}>
                        {repeatedLogos.map((logo, index) => (
                            <div
                                key={index}
                                className="relative h-24 w-48 md:h-32 md:w-64 mx-6 flex items-center justify-center shrink-0"
                            >
                                <Image
                                    src={logo}
                                    alt={`Partner logo ${index + 1}`}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </Marquee>
                </div>
            )}
        </section>
    );
}
