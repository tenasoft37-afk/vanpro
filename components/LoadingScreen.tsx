"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  // Handle initial app load
  useEffect(() => {
    // Wait for page to be fully loaded
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          setIsVisible(false);
        }, 500);
      }, 800);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!isVisible && !isLoading) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-white via-sky-50/30 to-white transition-opacity duration-700 ease-in-out ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Logo with smooth animation */}
        <div className="relative w-80 h-28 transform transition-all duration-500">
          <Image
            src="/h5.png"
            alt="Loading"
            fill
            className="object-contain drop-shadow-lg"
            priority
          />
        </div>

        {/* Loading Spinner */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-sky-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-sky-500 rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-2 border-2 border-cyan-300 rounded-full border-r-transparent animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }}></div>
        </div>

        {/* Loading Text with dots animation */}
        <div className="flex items-center gap-2">
          <p className="text-gray-700 font-semibold text-lg">Loading</p>
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
            <span className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
            <span className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
          </div>
        </div>
      </div>
    </div>
  );
}
