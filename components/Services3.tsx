"use client";

import Image from "next/image";
import {
    CheckCircle2,
    Users,
    Building2,
    Award,
    TrendingUp,
    Briefcase,
} from "lucide-react";

const whyChooseItems = [
    {
        title: "Strong expertise in tenders and procurement",
        icon: <Briefcase className="w-6 h-6" />,
    },
    {
        title: "Competitive and optimized pricing",
        icon: <TrendingUp className="w-6 h-6" />,
    },
    {
        title: "Reliable supplier network (local & international)",
        icon: <Building2 className="w-6 h-6" />,
    },
    {
        title: "Fast and efficient delivery",
        icon: <CheckCircle2 className="w-6 h-6" />,
    },
    {
        title: "Flexible solutions tailored to each client",
        icon: <Award className="w-6 h-6" />,
    },
];

const clientsServed = [
    {
        name: "NGOs & Humanitarian Organizations",
        icon: <Users className="w-7 h-7" />,
    },
    {
        name: "Banks & Financial Institutions",
        icon: <Building2 className="w-7 h-7" />,
    },
    {
        name: "Law Firms & Accounting Offices",
        icon: <Briefcase className="w-7 h-7" />,
    },
    {
        name: "Corporate Headquarters",
        icon: <Building2 className="w-7 h-7" />,
    },
    {
        name: "Large Enterprises",
        icon: <TrendingUp className="w-7 h-7" />,
    },
];

export default function Services3() {
    return (
        <section className="w-full bg-white">
            {/* Who We Serve Section */}
            <div className="py-16 sm:py-20 md:py-28 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                            Who We Serve
                        </h3>
                        <p className="text-gray-600 mt-2 text-sm sm:text-base">
                            Trusted by leading organizations worldwide
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-5">
                        {clientsServed.map((client, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg p-6 sm:p-7 text-center border border-gray-200 hover:border-[#538A3E] hover:shadow-md transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#538A3E]/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-[#538A3E] group-hover:bg-[#538A3E] group-hover:text-white transition-all duration-300">
                                    {client.icon}
                                </div>
                                <p className="font-semibold text-gray-900 text-sm leading-snug">
                                    {client.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Choose Vanguard Section */}
            <div className="py-16 sm:py-20 md:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                            Why Choose Vanguard
                        </h3>
                        <p className="text-gray-600 mt-2 text-sm sm:text-base">
                            Excellence in every aspect of our service
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-5">
                        {whyChooseItems.map((item, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 sm:p-7 border border-gray-100 hover:border-[#538A3E] hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#538A3E] rounded-lg flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </div>
                                <p className="font-semibold text-gray-900 text-sm leading-snug">
                                    {item.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Experience & Capability Section */}
            <div className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-[#538A3E] to-[#3d6624]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                        {/* Left Content */}
                        <div>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                                Experience & Capability
                            </h3>
                            <p className="text-sm sm:text-base text-sky-50 leading-relaxed mb-4 sm:mb-6">
                                With operations and sourcing experience across multiple regions, Vanguard has built a solid reputation for reliability, efficiency, and professionalism.
                            </p>
                            <p className="text-sm sm:text-base text-sky-100 leading-relaxed">
                                We are committed to delivering solutions that meet the highest standards required by NGOs and corporate clients.
                            </p>
                        </div>

                        {/* Right Image */}
                        <div className="relative w-full h-64 sm:h-80 md:h-96">
                            <Image
                                src="/services3-stats.jpg"
                                alt="Experience and Capability"
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
