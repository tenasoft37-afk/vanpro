"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
    CheckCircle2,
    Users,
    Building2,
    Award,
    TrendingUp,
    Briefcase,
} from "lucide-react";

const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001";

// Icon pool for Who We Serve points
const CLIENT_ICONS = [
    <Users key="u" className="w-4 h-4" />,
    <Building2 key="b" className="w-4 h-4" />,
    <Briefcase key="bf" className="w-4 h-4" />,
    <TrendingUp key="t" className="w-4 h-4" />,
    <Award key="a" className="w-4 h-4" />,
    <CheckCircle2 key="c" className="w-4 h-4" />,
];

// Icon pool for Why Choose Van points
const WHY_ICONS = [
    <Briefcase key="bf" className="w-4 h-4" />,
    <TrendingUp key="t" className="w-4 h-4" />,
    <Building2 key="b" className="w-4 h-4" />,
    <CheckCircle2 key="c" className="w-4 h-4" />,
    <Award key="a" className="w-4 h-4" />,
    <Users key="u" className="w-4 h-4" />,
];

interface WhoWeServeData {
    id: string;
    description: string;
    points: string[];
}

interface WhyChooseVanData {
    id: string;
    title: string;
    description: string;
    points: string[];
}

interface OurTrackRecordData {
    id: string;
    Title1: string;
    Title2: string;
    descrption: string;
    C1title: string;
    C1descrption: string;
    C2title: string;
    C2descrption: string;
    C3title: string;
    C3descrption: string;
}

export default function Services3() {
    const [whoWeServe, setWhoWeServe] = useState<WhoWeServeData | null>(null);
    const [whyChoose, setWhyChoose] = useState<WhyChooseVanData | null>(null);
    const [trackRecord, setTrackRecord] = useState<OurTrackRecordData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch(`/api/proxy/whoweserve`).then(r => r.json()).catch(() => null),
            fetch(`/api/proxy/whychoosevan`).then(r => r.json()).catch(() => null),
            fetch(`/api/proxy/ourtrackrecord`).then(r => r.json()).catch(() => null),
        ]).then(([wws, wcv, otr]) => {
            if (wws?.success && wws.data?.length > 0) setWhoWeServe(wws.data[0]);
            if (wcv?.success && wcv.data?.length > 0) setWhyChoose(wcv.data[0]);
            if (otr?.success && otr.data?.length > 0) setTrackRecord(otr.data[0]);
        }).finally(() => setLoading(false));
    }, []);

    const clientPoints = whoWeServe?.points ?? [];
    const whyPoints = whyChoose?.points ?? [];

    if (loading) {
        return (
            <section className="w-full bg-white">
                <div className="py-20 bg-gray-50">
                    <div className="max-w-5xl mx-auto px-5 sm:px-8 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-48 mb-4 mx-auto" />
                        <div className="flex flex-wrap gap-3 mt-6">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="h-10 bg-gray-100 rounded-full w-36" />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-5 sm:px-8 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-56 mb-4 mx-auto" />
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="h-24 bg-gray-100 rounded-2xl" />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full bg-white">

            {/* ── Who We Serve ── */}
            {(whoWeServe || clientPoints.length > 0) && (
                <div className="py-14 sm:py-20 bg-gray-50">
                    <div className="max-w-5xl mx-auto px-5 sm:px-8">
                        <div className="mb-8 sm:mb-12 sm:text-center">
                            <span className="text-[11px] font-bold tracking-[0.18em] text-[#538A3E] uppercase">
                                Our Clients
                            </span>
                            <h3 className="mt-1.5 text-[1.65rem] sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                                Who We Serve
                            </h3>
                            {whoWeServe?.description && (
                                <p className="mt-2 text-gray-500 text-sm sm:text-base sm:max-w-md sm:mx-auto">
                                    {whoWeServe.description}
                                </p>
                            )}
                        </div>

                        {clientPoints.length > 0 ? (
                            <div className="flex flex-wrap gap-2.5 sm:grid sm:grid-cols-3 md:grid-cols-5 sm:gap-3">
                                {clientPoints.map((point, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2.5 shadow-sm hover:border-[#538A3E] hover:shadow-md transition-all duration-200 cursor-default
                                                   sm:rounded-2xl sm:flex-col sm:items-start sm:px-5 sm:py-5 sm:gap-3"
                                    >
                                        <span className="flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 bg-[#538A3E]/10 rounded-full sm:rounded-xl flex items-center justify-center text-[#538A3E]">
                                            {CLIENT_ICONS[index % CLIENT_ICONS.length]}
                                        </span>
                                        <span className="text-[13px] sm:text-sm font-semibold text-gray-800 leading-tight">
                                            {point}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-400 text-sm">No clients added yet.</p>
                        )}
                    </div>
                </div>
            )}

            {/* ── Why Choose Vanguard ── */}
            {(whyChoose || whyPoints.length > 0) && (
                <div className="py-14 sm:py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-5 sm:px-8">
                        <div className="mb-8 sm:mb-12 sm:text-center">
                            <span className="text-[11px] font-bold tracking-[0.18em] text-[#538A3E] uppercase">
                                Our Strengths
                            </span>
                            <h3 className="mt-1.5 text-[1.65rem] sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                                {whyChoose?.title || "Why Choose Vanguard"}
                            </h3>
                            {whyChoose?.description && (
                                <p className="mt-2 text-gray-500 text-sm sm:text-base sm:max-w-md sm:mx-auto">
                                    {whyChoose.description}
                                </p>
                            )}
                        </div>

                        {whyPoints.length > 0 ? (
                            <div className="flex flex-col divide-y divide-gray-100 rounded-2xl border border-gray-100 overflow-hidden shadow-sm
                                            sm:divide-y-0 sm:border-0 sm:shadow-none sm:grid sm:grid-cols-2 md:grid-cols-5 sm:gap-3">
                                {whyPoints.map((point, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 bg-white px-5 py-4
                                                   sm:flex-col sm:items-start sm:gap-3 sm:rounded-2xl sm:border sm:border-gray-100 sm:shadow-sm sm:px-5 sm:py-5 sm:hover:border-[#538A3E]/50 sm:hover:shadow-md sm:transition-all sm:duration-200"
                                    >
                                        <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-[#538A3E] text-white sm:w-10 sm:h-10">
                                            {WHY_ICONS[index % WHY_ICONS.length]}
                                        </div>
                                        <div className="flex-1 sm:flex-none">
                                            <p className="text-[13px] sm:text-sm font-semibold text-gray-800 leading-snug">
                                                {point}
                                            </p>
                                        </div>
                                        <span className="ml-auto text-[11px] font-bold text-gray-300 sm:hidden">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-400 text-sm">No points added yet.</p>
                        )}
                    </div>
                </div>
            )}

            {/* ── Our Track Record ── */}
            {trackRecord && (
                <div className="py-14 sm:py-20 bg-[#538A3E]">
                    <div className="max-w-5xl mx-auto px-5 sm:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">

                            {/* Text */}
                            <div>
                                <span className="text-[11px] font-bold tracking-[0.18em] text-green-200 uppercase">
                                    {trackRecord.Title1}
                                </span>
                                <h3 className="mt-1.5 text-[1.65rem] sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                                    {trackRecord.Title2}
                                </h3>
                                <p className="text-sm sm:text-base text-green-100 leading-relaxed mb-8">
                                    {trackRecord.descrption}
                                </p>

                                {/* Stats cards */}
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { title: trackRecord.C1title, desc: trackRecord.C1descrption },
                                        { title: trackRecord.C2title, desc: trackRecord.C2descrption },
                                        { title: trackRecord.C3title, desc: trackRecord.C3descrption },
                                    ].map((card, i) => (
                                        <div key={i} className="bg-white/10 border border-white/20 rounded-xl py-3 px-2 text-center">
                                            <p className="text-xl font-bold text-white">{card.title}</p>
                                            <p className="text-[11px] text-green-200 mt-0.5">{card.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Image */}
                            <div className="relative w-full h-56 sm:h-72 md:h-96 rounded-2xl overflow-hidden shadow-xl mt-2 md:mt-0">
                                <Image
                                    src="/services3-stats.jpg"
                                    alt="Experience and Capability"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </section>
    );
}
