"use client";

import { useTranslations } from "next-intl";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useRef, useState, useEffect } from "react";
import type { LottieAnimationData } from "@/src/features/landing/types";

const HeroSection = () => {
  const t = useTranslations("marketingResearch");
  const [knowledgeIcon, setKnowledgeIcon] = useState<LottieAnimationData | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const response = await fetch("/icon/knowledge.json");
        const data = await response.json();
        setKnowledgeIcon(data);
      } catch {
        // Icon loading failed, continue without it
      }
    };
    loadIcon();
  }, []);

  useEffect(() => {
    if (knowledgeIcon && lottieRef.current) {
      // Play animation once on mount
      lottieRef.current.play();
    }
  }, [knowledgeIcon]);

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-16">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat opacity-5 -z-10"
        style={{
          backgroundImage: "url('/bg.webp')",
          backgroundPosition: "center -700px",
        }}
      />

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg0Y2MxNiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30 -z-10"
      />

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-roman">
            {t("hero.title")}
          </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            {t("hero.description")}
          </p>
            </div>

            {/* Icon */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-64 h-64 md:w-80 md:h-80">
                {knowledgeIcon ? (
                  <Lottie
                    lottieRef={lottieRef}
                    animationData={knowledgeIcon}
                    loop={true}
                    autoplay={true}
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <div className="w-full h-full bg-primary/10 rounded-2xl flex items-center justify-center">
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
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HeroSection };

