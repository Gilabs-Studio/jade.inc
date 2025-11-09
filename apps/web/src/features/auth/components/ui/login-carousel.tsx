"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface CarouselImage {
  id: string;
  image: string;
  title: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

const carouselData: CarouselImage[] = [
  {
    id: "1",
    image: "/bg.webp",
    title: "Revolutionize QA with Smarter Automation",
    quote: "Jade Inc has completely transformed our testing process. It's reliable, efficient, and ensures our releases are always top-notch.",
    author: "Michael Carter",
    role: "Software Engineer at DevCore",
    avatar: "MC",
  },
  {
    id: "2",
    image: "/bg.webp",
    title: "Streamline Your Development Workflow",
    quote: "The automation tools provided by Jade Inc have significantly reduced our testing time while improving quality. Highly recommended!",
    author: "Sarah Johnson",
    role: "QA Lead at TechCorp",
    avatar: "SJ",
  },
  {
    id: "3",
    image: "/bg.webp",
    title: "Elevate Your Quality Assurance",
    quote: "Working with Jade Inc has been a game-changer. Their solutions are intuitive, powerful, and have made our QA process seamless.",
    author: "David Chen",
    role: "Product Manager at InnovateLab",
    avatar: "DC",
  },
];

export function LoginCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselData.length);
    }, 5000); // Auto-play every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselData.length);
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Carousel Slides with Images */}
      <div className="relative h-full w-full">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselData.map((item) => (
            <div
              key={item.id}
              className="min-w-full flex-shrink-0 relative h-full"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority={item.id === carouselData[0].id}
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/90" />
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
                </div>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 h-full flex flex-col justify-center px-12 xl:px-20 2xl:px-24 py-16">
                <div className="max-w-2xl mx-auto w-full">
                  {/* Main Heading */}
                  <div className="space-y-6">
                    <h2 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-lg xl:text-xl 2xl:text-2xl text-white/90 leading-relaxed max-w-xl">
                      {item.quote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-6 pointer-events-none z-20">
        <button
          onClick={goToPrevious}
          className="pointer-events-auto p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/20 shadow-lg"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="pointer-events-auto p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/20 shadow-lg"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex justify-center gap-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "w-8 h-2 bg-white shadow-lg"
                : "w-2 h-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
