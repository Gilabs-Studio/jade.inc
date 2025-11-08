"use client";

import { useTranslations } from "next-intl";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useRef, useState, useEffect } from "react";
import type { LottieAnimationData } from "@/src/features/landing/types";

const OnlineSurveysSection = () => {
  const t = useTranslations("marketingResearch");
  const platforms = t.raw("onlineSurveys.platforms") as string[];
  const [responsiveIcon, setResponsiveIcon] = useState<LottieAnimationData | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const response = await fetch("/icon/responsive-design.json");
        const data = await response.json();
        setResponsiveIcon(data);
      } catch {
        // Icon loading failed, continue without it
      }
    };
    loadIcon();
  }, []);

  return (
    <section className="py-32">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24">
                {responsiveIcon ? (
                  <Lottie
                    lottieRef={lottieRef}
                    animationData={responsiveIcon}
                    loop={true}
                    autoplay={true}
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <div className="w-full h-full bg-primary/10 rounded-xl flex items-center justify-center rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-12 h-12 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-roman">
              {t("onlineSurveys.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("onlineSurveys.description")}
            </p>
          </div>

          <div className="bg-card border rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {platforms.map((platform, idx) => (
                <div
                  key={idx}
                  className="group relative bg-muted/50 border rounded-xl p-4 md:p-6 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 text-center hover:shadow-md"
                >
                  <div className="text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {platform}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { OnlineSurveysSection };

