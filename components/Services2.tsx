"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
    UserPlus,
    FileText,
    Code2,
    FlaskConical,
    CheckCircle2,
    Rocket,
} from "lucide-react";

interface Services2Data {
    title: string;
    step1Title: string;
    step1Description: string;
    step1Image: string;
    step2Title: string;
    step2Description: string;
    step2Image: string;
    step3Title: string;
    step3Description: string;
    step3Image: string;
    step4Title: string;
    step4Description: string;
    step4Image: string;
    step5Title: string;
    step5Description: string;
    step5Image: string;
    step6Title: string;
    step6Description: string;
    step6Image: string;
}

const icons = [
    <UserPlus className="w-7 h-7 text-white" key="1" />,
    <FileText className="w-7 h-7 text-white" key="2" />,
    <Code2 className="w-7 h-7 text-white" key="3" />,
    <FlaskConical className="w-7 h-7 text-white" key="4" />,
    <CheckCircle2 className="w-7 h-7 text-white" key="5" />,
    <Rocket className="w-7 h-7 text-white" key="6" />,
];

export default function Services2() {
    const [services2Data, setServices2Data] = useState<Services2Data | null>(null);

    useEffect(() => {
        const fetchServices2Data = async () => {
            try {
                const response = await fetch("/api/services2");
                if (!response.ok) throw new Error("Failed to fetch services2 data");
                const data = await response.json();
                setServices2Data(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchServices2Data();
    }, []);

    // Build steps array from API data
    const steps = services2Data ? [
        {
            step: "STEP ONE",
            title: services2Data.step1Title,
            desc: services2Data.step1Description,
            icon: icons[0],
            image: services2Data.step1Image,
        },
        {
            step: "STEP TWO",
            title: services2Data.step2Title,
            desc: services2Data.step2Description,
            icon: icons[1],
            image: services2Data.step2Image,
        },
        {
            step: "STEP THREE",
            title: services2Data.step3Title,
            desc: services2Data.step3Description,
            icon: icons[2],
            image: services2Data.step3Image,
        },
        {
            step: "STEP FOUR",
            title: services2Data.step4Title,
            desc: services2Data.step4Description,
            icon: icons[3],
            image: services2Data.step4Image,
        },
        ...(services2Data.step5Title ? [{
            step: "STEP FIVE",
            title: services2Data.step5Title,
            desc: services2Data.step5Description,
            icon: icons[4],
            image: services2Data.step5Image,
        }] : []),
        ...(services2Data.step6Title ? [{
            step: "STEP SIX",
            title: services2Data.step6Title,
            desc: services2Data.step6Description,
            icon: icons[5],
            image: services2Data.step6Image,
        }] : []),
    ].filter(step => step.title && step.desc) : [];

    return (
        <section className="relative w-full py-28 overflow-hidden">

            {/* Background Image */}
            <Image
                src="/services2.png"
                alt="How it works background"
                fill
                className="object-cover"
                priority
            />



            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-sky-500 font-bold uppercase tracking-widest mb-3">
                        Steps
                    </p>
                    {services2Data && (
                        <h2 className="text-4xl font-extrabold text-gray-900">
                            {services2Data.title}
                        </h2>
                    )}
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {steps.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md px-8 py-10 flex gap-6"
                        >
                            {/* Icon */}
                            <div className="flex-shrink-0">
                                <div className="w-14 h-14 rounded-full bg-[#004E99] flex items-center justify-center">
                                    {item.icon}
                                </div>
                            </div>

                            {/* Text */}
                            <div>
                                <p className="text-sky-500 font-semibold text-sm mb-1">
                                    {item.step}
                                </p>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
