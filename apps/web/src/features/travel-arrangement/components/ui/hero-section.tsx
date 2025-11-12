"use client";

import { useTranslations } from "next-intl";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useRef, useState, useEffect } from "react";
import type { LottieAnimationData } from "@/src/features/landing/types";

const HeroSection = () => {
  const t = useTranslations("travelArrangement");
  const [travelIcon, setTravelIcon] = useState<LottieAnimationData | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const response = await fetch("/ilustrations/travel.json");
        const data = await response.json();
        setTravelIcon(data);
      } catch {
        // Icon loading failed, continue without it
      }
    };
    loadIcon();
  }, []);

  useEffect(() => {
    if (travelIcon && lottieRef.current) {
      // Play animation once on mount
      lottieRef.current.play();
    }
  }, [travelIcon]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden -mt-16 pt-16">
      {/* Lottie Animation Background */}
      <div className="absolute inset-0 w-full h-full -z-10 opacity-50">
        {travelIcon ? (
          <Lottie
            lottieRef={lottieRef}
            animationData={travelIcon}
            loop={true}
            autoplay={true}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-32 h-32 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Gradient overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/70 -z-10" />
      
      {/* Additional overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 -z-10" />
      
      {/* Decorative gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent -z-10" />

      {/* Content */}
      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-roman drop-shadow-lg ">
            {t("hero.title")}
          </h1>

          <p className="text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            {t("hero.description")}
          </p>
        </div>
      </div>
    </section>
  );
};

export { HeroSection };


