"use client";

import Image from "next/image";
import { Play, Globe, Users, TrendingUp, X } from "lucide-react";
import { useEffect, useState } from "react";

interface About4Data {
  title: string;
  description: string;
  video: string;
}

// Helper function to get YouTube embed URL
function getYouTubeEmbedUrl(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : url;
}

// Helper function to get Vimeo embed URL
function getVimeoEmbedUrl(url: string): string {
  const regExp = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
  const match = url.match(regExp);
  const videoId = match ? match[1] : null;
  return videoId ? `https://player.vimeo.com/video/${videoId}?autoplay=1` : url;
}

// Helper function to check if URL is YouTube or Vimeo
function isEmbeddableVideo(url: string): boolean {
  return /youtube|youtu\.be|vimeo/i.test(url);
}

export default function About4() {
  const [about4Data, setAbout4Data] = useState<About4Data | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const fetchAbout4Data = async () => {
      try {
        const response = await fetch("/api/about4");
        if (!response.ok) throw new Error("Failed to fetch about4 data");
        const data = await response.json();
        setAbout4Data(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAbout4Data();
  }, []);

  // Handle ESC key to close video
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVideoOpen) {
        setIsVideoOpen(false);
      }
    };

    if (isVideoOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isVideoOpen]);

  const handlePlayClick = () => {
    if (about4Data?.video) {
      setIsVideoOpen(true);
    }
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
  };

  const getVideoUrl = (): string => {
    if (!about4Data?.video) return "";
    const url = about4Data.video;
    
    if (isEmbeddableVideo(url)) {
      if (/youtube|youtu\.be/i.test(url)) {
        return getYouTubeEmbedUrl(url);
      } else if (/vimeo/i.test(url)) {
        return getVimeoEmbedUrl(url);
      }
    }
    return url;
  };

  return (
    <section className="relative w-full">

      {/* VIDEO SECTION */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24">
        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">

          {/* Background Image */}
          <Image
            src="/about4-image.webp"
            alt="Business Video"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-black/40 to-transparent" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <button
              onClick={handlePlayClick}
              className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center mb-8 
                         shadow-[0_0_30px_rgba(250,204,21,0.5)] transform transition duration-300 
                         hover:scale-110 hover:shadow-[0_0_50px_rgba(250,204,21,0.7)] group-hover:animate-pulse cursor-pointer"
              aria-label="Play video"
            >
              <Play className="text-white w-10 h-10 ml-1 fill-current" />
            </button>

            {about4Data && (
              <>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
                  {about4Data.title}
                </h2>

                <p className="text-gray-100 max-w-2xl text-lg md:text-xl leading-relaxed drop-shadow-md opacity-90">
                  {about4Data.description}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* VIDEO MODAL */}
      {isVideoOpen && about4Data?.video && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={handleCloseVideo}
        >
          <div 
            className="relative w-full max-w-6xl mx-4 aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseVideo}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm"
              aria-label="Close video"
            >
              <X className="text-white w-6 h-6" />
            </button>

            {/* Video Player */}
            {isEmbeddableVideo(about4Data.video) ? (
              <iframe
                src={getVideoUrl()}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video Player"
              />
            ) : (
              <video
                src={about4Data.video}
                controls
                autoPlay
                className="w-full h-full"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}

      {/* STATS SECTION */}
      <div className="relative z-0 -mt-24 pt-48 pb-24 bg-[#004E99]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-white text-center divide-y md:divide-y-0 md:divide-x divide-white/20">

            {/* Item 1 */}
            <div className="flex flex-col items-center pt-8 md:pt-0 group cursor-default">
              <Globe className="w-14 h-14 mb-6 text-yellow-400 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-5xl font-black mb-2 tracking-tighter">2+</h3>
              <p className="text-lg font-medium opacity-90 leading-tight">
                World Wide Business <br /> Automation
              </p>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col items-center pt-8 md:pt-0 group cursor-default">
              <Users className="w-14 h-14 mb-6 text-yellow-400 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-5xl font-black mb-2 tracking-tighter">1K</h3>
              <p className="text-lg font-medium opacity-90 leading-tight">
                World Wide Business <br /> Partners
              </p>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col items-center pt-8 md:pt-0 group cursor-default">
              <TrendingUp className="w-14 h-14 mb-6 text-yellow-400 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-5xl font-black mb-2 tracking-tighter">1%</h3>
              <p className="text-lg font-medium opacity-90 leading-tight">
                World Wide Business <br /> Profit
              </p>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
