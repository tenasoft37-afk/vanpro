"use client";

import { useState } from "react";

export default function Contact1() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setStatus("success");
                setForm({ name: "", email: "", subject: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="w-full py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative">

                {/* Decorative Dark Shape (Top Left) */}
                <div className="absolute -left-16 -top-12 w-48 h-64 bg-[#4D4C4C] rounded-3xl hidden md:block z-0" />

                {/* Main Banner Card */}
                <div className="relative z-10 w-full bg-[#5F9B43] rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-lg overflow-hidden">
                    <div
                        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: "radial-gradient(#3D3D3D 6px, transparent 6px)",
                            backgroundSize: "24px 24px",
                        }}
                    />
                    <div className="relative z-10 max-w-2xl text-white text-center md:text-left">
                        <p className="uppercase tracking-widest text-sm font-bold mb-4 opacity-90">CONTACT US</p>
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
                            Want to know more about us?
                        </h2>
                        <p className="text-white/90 text-lg font-medium leading-relaxed">
                            Lollamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                    <div className="relative z-10 mt-8 md:mt-0 flex-shrink-0">
                        <a 
                            href="#contact-form"
                            className="bg-[#3D3D3D] hover:bg-[#4D4C4C] text-white font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 shadow-md inline-block text-center"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>

                {/* ── Email Form ── */}
                <div id="contact-form" className="mt-16 relative z-10">
                    <div className="text-center mb-10">
                        <p className="uppercase tracking-widest text-sm font-bold text-[#5F9B43] mb-2">SEND A MESSAGE</p>
                        <h3 className="text-3xl font-extrabold text-gray-900">Get In Touch</h3>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                            Fill out the form below and our team will get back to you as soon as possible.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 md:p-12 max-w-3xl mx-auto"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5F9B43] focus:border-transparent transition"
                                />
                            </div>
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5F9B43] focus:border-transparent transition"
                                />
                            </div>
                        </div>

                        {/* Subject */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                required
                                value={form.subject}
                                onChange={handleChange}
                                placeholder="How can we help you?"
                                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5F9B43] focus:border-transparent transition"
                            />
                        </div>

                        {/* Message */}
                        <div className="mb-8">
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message</label>
                            <textarea
                                name="message"
                                required
                                rows={5}
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Tell us more about your project or inquiry..."
                                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5F9B43] focus:border-transparent transition resize-none"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="w-full bg-[#5F9B43] hover:bg-[#4e8234] disabled:opacity-60 text-white font-bold text-lg py-4 rounded-2xl transition-all duration-300 shadow-md"
                        >
                            {status === "sending" ? "Sending…" : "Send Message"}
                        </button>

                        {/* Feedback Messages */}
                        {status === "success" && (
                            <p className="mt-5 text-center text-[#5F9B43] font-semibold">
                                ✅ Message sent! We'll be in touch soon.
                            </p>
                        )}
                        {status === "error" && (
                            <p className="mt-5 text-center text-red-500 font-semibold">
                                ❌ Something went wrong. Please try again.
                            </p>
                        )}
                    </form>
                </div>

            </div>
        </section>
    );
}


