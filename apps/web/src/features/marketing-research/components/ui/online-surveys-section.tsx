"use client";

import { useTranslations } from "next-intl";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useRef, useState, useEffect } from "react";
import type { LottieAnimationData } from "@/src/features/landing/types";

const OnlineSurveysSection = () => {
  const t = useTranslations("marketingResearch");
  const platforms = t.raw("onlineSurveys.platforms") as string[];
  const [surveyIcon, setSurveyIcon] = useState<LottieAnimationData | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const response = await fetch("/icon/online-survey.json");
        const data = await response.json();
        setSurveyIcon(data);
      } catch {
        // Icon loading failed, continue without it
      }
    };
    loadIcon();
  }, []);

  return (
    <section className="py-32 bg-muted/30">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20">
                {surveyIcon ? (
                  <Lottie
                    lottieRef={lottieRef}
                    animationData={surveyIcon}
                    loop={true}
                    autoplay={true}
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : null}
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-roman">
              {t("onlineSurveys.title")}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("onlineSurveys.description")}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {platforms.map((platform, idx) => (
              <div
                key={idx}
                className="group relative px-5 py-3 bg-card border rounded-full hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
              >
                <span className="text-sm md:text-base font-medium whitespace-nowrap">
                  {platform}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { OnlineSurveysSection };

