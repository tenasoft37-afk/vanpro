"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    // Only show transition if pathname actually changed
    if (prevPathnameRef.current !== pathname) {
      setIsTransitioning(true);
      setProgress(0);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 15;
        });
      }, 30);

      // Complete transition
      const timer = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsTransitioning(false);
          setProgress(0);
        }, 200);
      }, 400);

      prevPathnameRef.current = pathname;

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    }
  }, [pathname]);

  if (!isTransitioning) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none">
      {/* Top Progress Bar */}
      <div 
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-500 transition-all duration-300 ease-out shadow-lg"
        style={{ width: `${progress}%` }}
      ></div>
      
      {/* Subtle Fade Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] transition-opacity duration-300"></div>
    </div>
  );
}
