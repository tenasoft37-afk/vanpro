export default function Contact1() {
    return (
        <section className="w-full py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative">

                {/* Decorative Dark Blue Shape (Top Left) */}
                <div className="absolute -left-16 -top-12 w-48 h-64 bg-[#004b93] rounded-3xl hidden md:block z-0" />

                {/* Main Content Card */}
                <div className="relative z-10 w-full bg-[#1aa3e8] rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-lg overflow-hidden">

                    {/* Dotted Pattern Overlay */}
                    <div
                        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: "radial-gradient(#002f5f 6px, transparent 6px)",
                            backgroundSize: "24px 24px"
                        }}
                    />

                    {/* Left Text Content */}
                    <div className="relative z-10 max-w-2xl text-white text-center md:text-left">
                        <p className="uppercase tracking-widest text-sm font-bold mb-4 opacity-90">
                            CONTACT US
                        </p>

                        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
                            Want to know more about us?
                        </h2>

                        <p className="text-white/90 text-lg font-medium leading-relaxed">
                            Lollamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>

                    {/* Right Button */}
                    <div className="relative z-10 mt-8 md:mt-0 flex-shrink-0">
                        <button className="bg-[#004b93] hover:bg-[#003870] text-white font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 shadow-md">
                            Contact Us
                        </button>
                    </div>

                </div>

            </div>
        </section>
    );
}

