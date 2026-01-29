"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface NewsData {
    card1Title: string;
    card1Date: string;
    card1Descrption: string;
    card1Image: string;
    card2Title: string;
    card2Date: string;
    card2Descrption: string;
    card2Image: string;
    card3Title: string;
    card3Date: string;
    card3Descrption: string;
    card3Image: string;
}

type NewsCard = {
    title: string;
    date: string;
    description: string;
    image: string;
};

export default function Contact2() {
    const [newsData, setNewsData] = useState<NewsData | null>(null);
    const [selectedCard, setSelectedCard] = useState<NewsCard | null>(null);

    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                const response = await fetch("/api/news");
                if (!response.ok) throw new Error("Failed to fetch news data");
                const data = await response.json();
                setNewsData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNewsData();
    }, []);

    const newsCards: NewsCard[] = newsData
        ? [
              {
                  title: newsData.card1Title,
                  date: newsData.card1Date,
                  description: newsData.card1Descrption,
                  image: newsData.card1Image,
              },
              {
                  title: newsData.card2Title,
                  date: newsData.card2Date,
                  description: newsData.card2Descrption,
                  image: newsData.card2Image,
              },
              {
                  title: newsData.card3Title,
                  date: newsData.card3Date,
                  description: newsData.card3Descrption,
                  image: newsData.card3Image,
              },
          ]
        : [];

    const handleCardClick = (card: NewsCard) => {
        setSelectedCard(card);
    };

    const closeModal = () => {
        setSelectedCard(null);
    };

    return (
        <>
            <section className="w-full py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <p className="text-sky-500 font-bold uppercase tracking-widest text-sm mb-2">
                            BLOG
                        </p>
                        <h2 className="text-4xl font-extrabold text-gray-900">
                            Latest News
                        </h2>
                    </div>

                    {/* Blog Grid */}
                    {newsData && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {newsCards.map((post, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleCardClick(post)}
                                    className="group relative h-[320px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                                >
                                    {/* Background Image */}
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-sky-500/95 via-sky-500/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />

                                    {/* Content Overlay - Bottom */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                                        <p className="text-white/90 text-sm font-medium mb-3">
                                            {post.date}
                                        </p>
                                        <h3 className="text-white text-2xl font-bold leading-tight">
                                            {post.title}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Modal for Description */}
            {selectedCard && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                    onClick={closeModal}
                >
                    <div
                        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5 text-gray-700" />
                        </button>

                        {/* Image Section */}
                        <div className="relative w-full h-[300px] md:h-[400px]">
                            <Image
                                src={selectedCard.image}
                                alt={selectedCard.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>

                        {/* Content Section */}
                        <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-400px)]">
                            <p className="text-sky-500 font-semibold text-sm mb-3">
                                {selectedCard.date}
                            </p>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                                {selectedCard.title}
                            </h2>
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                                {selectedCard.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
