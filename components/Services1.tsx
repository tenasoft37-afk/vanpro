"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
    Briefcase,
    ClipboardList,
    FileSearch,
    ShieldCheck,
    BarChart3,
    Megaphone,
} from "lucide-react";

type Service = {
    title: string;
    description: string;
    image: string;
    icon: React.ReactNode;
};

interface Services1Data {
    title: string;
    card1Title: string;
    card1Description: string;
    card1Image: string;
    card2Title: string;
    card2Description: string;
    card2Image: string;
    card3Title: string;
    card3Description: string;
    card3Image: string;
    card4Title: string;
    card4Description: string;
    card4Image: string;
    card5Title: string;
    card5Description: string;
    card5Image: string;
    card6Title: string;
    card6Description: string;
    card6Image: string;
}

const icons = [
    <Briefcase className="w-6 h-6 text-[#538A3E]" key="1" />,
    <ClipboardList className="w-6 h-6 text-[#538A3E]" key="2" />,
    <FileSearch className="w-6 h-6 text-[#538A3E]" key="3" />,
    <ShieldCheck className="w-6 h-6 text-[#538A3E]" key="4" />,
    <BarChart3 className="w-6 h-6 text-[#538A3E]" key="5" />,
    <Megaphone className="w-6 h-6 text-[#538A3E]" key="6" />,
];

export default function Services1() {
    const [services1Data, setServices1Data] = useState<Services1Data | null>(null);
    const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());

    useEffect(() => {
        const fetchServices1Data = async () => {
            try {
                const response = await fetch("/api/services1");
                if (!response.ok) throw new Error("Failed to fetch services1 data");
                const data = await response.json();
                setServices1Data(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchServices1Data();
    }, []);

    // Build services array from API data
    const services: Service[] = services1Data ? [
        {
            title: services1Data.card1Title,
            description: services1Data.card1Description,
            image: services1Data.card1Image,
            icon: icons[0],
        },
        {
            title: services1Data.card2Title,
            description: services1Data.card2Description,
            image: services1Data.card2Image,
            icon: icons[1],
        },
        {
            title: services1Data.card3Title,
            description: services1Data.card3Description,
            image: services1Data.card3Image,
            icon: icons[2],
        },
        {
            title: services1Data.card4Title,
            description: services1Data.card4Description,
            image: services1Data.card4Image,
            icon: icons[3],
        },
        {
            title: services1Data.card5Title,
            description: services1Data.card5Description,
            image: services1Data.card5Image,
            icon: icons[4],
        },
        {
            title: services1Data.card6Title,
            description: services1Data.card6Description,
            image: services1Data.card6Image,
            icon: icons[5],
        },
    ] : [];

    return (
        <section className="w-full py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-sky-500 font-bold uppercase tracking-widest mb-3">
                        Our Services
                    </p>
                    {services1Data && (
                        <h2 className="text-4xl font-extrabold text-gray-900">
                            {services1Data.title}
                        </h2>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.filter(service => service.title && service.description).map((service, index) => {
                        const serviceId = service.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                        return (
                            <div
                                key={index}
                                id={serviceId}
                                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden scroll-mt-24 border border-gray-100/50 hover:border-gray-200"
                            >
                                {/* Image with subtle zoom on hover */}
                                <div className="relative h-56 w-full overflow-hidden">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                                </div>

                                {/* Content */}
                                <div className="relative p-8 text-left">
                                    {/* Icon Container */}
                                    <div className="absolute -top-10 left-8 w-14 h-14 bg-white rounded-xl shadow-xl flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                                        <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center">
                                            {service.icon}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-4 pt-4">
                                        {service.title}
                                    </h3>

                                    <div className="relative">
                                        <p className={`text-sm text-gray-600 leading-relaxed whitespace-pre-line mb-6 ${expandedIndices.has(index) ? '' : 'line-clamp-4'}`}>
                                            {service.description}
                                        </p>

                                        <button
                                            onClick={() => {
                                                const newSet = new Set(expandedIndices);
                                                if (newSet.has(index)) newSet.delete(index);
                                                else newSet.add(index);
                                                setExpandedIndices(newSet);
                                            }}
                                            className="text-[#538A3E] text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all"
                                        >
                                            {expandedIndices.has(index) ? 'Show Less' : 'View Details'}
                                            <span className={`text-lg transition-transform ${expandedIndices.has(index) ? 'rotate-180' : ''}`}>↓</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
