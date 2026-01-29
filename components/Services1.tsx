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
    <Briefcase className="w-6 h-6 text-yellow-500" key="1" />,
    <ClipboardList className="w-6 h-6 text-yellow-500" key="2" />,
    <FileSearch className="w-6 h-6 text-yellow-500" key="3" />,
    <ShieldCheck className="w-6 h-6 text-yellow-500" key="4" />,
    <BarChart3 className="w-6 h-6 text-yellow-500" key="5" />,
    <Megaphone className="w-6 h-6 text-yellow-500" key="6" />,
];

export default function Services1() {
    const [services1Data, setServices1Data] = useState<Services1Data | null>(null);

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

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.filter(service => service.title && service.description).map((service, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                        >
                            {/* Image */}
                            <div className="relative h-52 w-full">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="relative px-6 pt-10 pb-8 text-center">
                                {/* Icon */}
                                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full shadow flex items-center justify-center">
                                    {service.icon}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {service.title}
                                </h3>

                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
