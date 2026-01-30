"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter, MapPin, Phone, Mail, ArrowRight, CircleDot } from "lucide-react"

interface FooterData {
    locationTitle: string;
    locationDescription: string;
    phoneTitle: string;
    phoneDescription: string;
    emailTitle: string;
    emailDescription: string;
}

function Footerdemo() {
    const [isDarkMode, setIsDarkMode] = React.useState(false)
    const [footerData, setFooterData] = React.useState<FooterData | null>(null)
    const [email, setEmail] = React.useState("")
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null)

    React.useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [isDarkMode])

    React.useEffect(() => {
        const fetchFooterData = async () => {
            try {
                const response = await fetch("/api/footer");
                if (!response.ok) throw new Error("Failed to fetch footer data");
                const data = await response.json();
                setFooterData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFooterData();
    }, [])

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

    return (
        <footer className="relative overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>

            <div className="container relative z-10 mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 md:px-8 lg:px-12">
                {/* Main Footer Content */}
                <div className="grid gap-8 sm:gap-10 lg:gap-12 grid-cols-1 lg:grid-cols-12">
                    {/* Brand & Newsletter Section */}
                    <div className="lg:col-span-4 space-y-6 lg:space-y-8">
                        {/* Logo/Brand */}
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/logo.png"
                                    alt="VanBusiness Logo"
                                    width={280}
                                    height={75}
                                    className="h-16 w-auto object-contain"
                                />
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
                                Empowering businesses with innovative solutions and strategic consulting to drive growth and success.
                            </p>
                        </div>

                        {/* Newsletter */}
                        <div className="space-y-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-800">Stay Updated</h3>
                            <p className="text-slate-600 text-sm">
                                Subscribe for insights and exclusive content.
                            </p>
                            <form onSubmit={handleSubmit} className="relative group">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isSubmitting}
                                    className="pr-14 h-12 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 transition-all disabled:opacity-50"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={isSubmitting}
                                    className="absolute right-1.5 top-1.5 h-9 w-9 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ArrowRight className="h-4 w-4" />
                                    <span className="sr-only">Subscribe</span>
                                </Button>
                                {message && (
                                    <p className={`mt-2 text-xs ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
                                        {message.text}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Quick Links & Services - Hidden on Mobile */}
                    <div className="hidden lg:grid lg:grid-cols-4 lg:col-span-4 lg:gap-0 lg:justify-items-start">
                        {/* Quick Links */}
                        <div className="lg:col-span-2 w-full">
                            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-slate-500 text-left">
                                Quick Links
                            </h3>
                            <nav className="space-y-3 flex flex-col items-start">
                                {['Home', 'About Us', 'Services', 'Portfolio', 'Contact'].map((link) => (
                                    <a
                                        key={link}
                                        href="#"
                                        className="group flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors duration-200"
                                    >
                                        <span className="h-1 w-1 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors" />
                                        <span className="text-sm">{link}</span>
                                    </a>
                                ))}
                            </nav>
                        </div>

                        {/* Services */}
                        <div className="lg:col-span-2 w-full">
                            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-slate-500 text-left">
                                Services
                            </h3>
                            <nav className="space-y-3 flex flex-col items-start">
                                {['Business Consulting', 'Project Management', 'Requirement Analysis', 'Business Audit', 'Business Marketing','Digital Marketing'].map((link) => {
                                    // Create URL-friendly ID from service name
                                    const serviceId = link.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                                    return (
                                        <a
                                            key={link}
                                            href={`/services#${serviceId}`}
                                            className="group flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors duration-200"
                                        >
                                            <span className="h-1 w-1 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors" />
                                            <span className="text-sm">{link}</span>
                                        </a>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Contact Info - Row on Mobile */}
                    <div className="lg:col-span-4 col-span-1">
                        <h3 className="mb-6 lg:mb-6 text-base lg:text-sm font-bold lg:font-semibold uppercase tracking-wider text-slate-800 lg:text-slate-500 text-center lg:text-left">
                            Get In Touch
                        </h3>
                        <address className="not-italic grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-8 lg:gap-4">
                            {footerData && (
                                <>
                                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3 lg:gap-4 group">
                                        <div className="flex-shrink-0 w-11 h-11 lg:w-10 lg:h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                            <MapPin className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div className="text-center lg:text-left">
                                            <p className="text-sm text-slate-800 font-bold lg:font-medium">{footerData.locationTitle}</p>
                                            <p className="text-xs sm:text-sm text-slate-600 whitespace-pre-line">{footerData.locationDescription}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3 lg:gap-4 group">
                                        <div className="flex-shrink-0 w-11 h-11 lg:w-10 lg:h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                            <Phone className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div className="text-center lg:text-left">
                                            <p className="text-sm text-slate-800 font-bold lg:font-medium">{footerData.phoneTitle}</p>
                                            <a href={`tel:${footerData.phoneDescription}`} className="text-xs sm:text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                                {footerData.phoneDescription}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3 lg:gap-4 group">
                                        <div className="flex-shrink-0 w-11 h-11 lg:w-10 lg:h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                            <Mail className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div className="text-center lg:text-left">
                                            <p className="text-sm text-slate-800 font-bold lg:font-medium">{footerData.emailTitle}</p>
                                            <a href={`mailto:${footerData.emailDescription}`} className="text-xs sm:text-sm text-slate-600 hover:text-blue-600 transition-colors break-all">
                                                {footerData.emailDescription}
                                            </a>
                                        </div>
                                    </div>
                                </>
                            )}
                        </address>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-8 sm:my-10 lg:my-12 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                {/* Bottom Section */}
                <div className="flex flex-col items-center justify-center gap-5 sm:gap-6">
                    {/* Social Links */}
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <span className="text-sm text-slate-500 mr-1 sm:mr-2 w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0">Follow us:</span>
                        <TooltipProvider>
                            <div className="flex gap-2">
                                {[
                                    { icon: Facebook, label: 'Facebook', color: 'hover:bg-blue-600' },
                                    { icon: Twitter, label: 'Twitter', color: 'hover:bg-sky-500' },
                                    { icon: Instagram, label: 'Instagram', color: 'hover:bg-pink-600' },
                                    { icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-blue-700' },
                                ].map(({ icon: Icon, label, color }) => (
                                    <Tooltip key={label}>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className={`w-10 h-10 rounded-xl bg-slate-100 text-slate-600 hover:text-white ${color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                                            >
                                                <Icon className="h-4 w-4" />
                                                <span className="sr-only">{label}</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-slate-800 border-slate-700 text-white">
                                            <p>Follow us on {label}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </div>
                        </TooltipProvider>
                    </div>

                    {/* Copyright */}
                    <p className="text-sm text-slate-500 text-center">
                        © 2026 VanGuard. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export { Footerdemo }
