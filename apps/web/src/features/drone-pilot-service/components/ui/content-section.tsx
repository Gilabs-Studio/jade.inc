"use client";

import { useTranslations } from "next-intl";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useRef, useState, useEffect } from "react";
import type { LottieAnimationData } from "@/src/features/landing/types";

interface CategoryItem {
  title: string;
  description: string;
  icon: string;
  items: string[];
}

const CategoryCard = ({
  category,
  animationData,
}: {
  category: CategoryItem;
  animationData: LottieAnimationData | null;
}) => {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  return (
    <div
      className="group relative bg-card border border-border/50 rounded-3xl p-8 md:p-10 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-500"
      onMouseEnter={() => {
        if (lottieRef.current) {
          lottieRef.current.play();
        }
      }}
      onMouseLeave={() => {
        if (lottieRef.current) {
          lottieRef.current.stop();
        }
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent rounded-3xl transition-all duration-500" />
      
      <div className="relative z-10">
        {/* Icon */}
        <div className="h-20 w-20 mb-6 flex items-center justify-center">
          {animationData ? (
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              loop={false}
              autoplay={false}
              style={{ width: "100%", height: "100%" }}
            />
          ) : null}
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold mb-3 font-roman">
          {category.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground mb-6 leading-relaxed text-base md:text-lg">
          {category.description}
        </p>

        {/* Items List */}
        <ul className="space-y-3">
          {category.items.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-sm md:text-base"
            >
              <span className="text-primary mt-1.5 shrink-0">•</span>
              <span className="text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ContentSection = () => {
  const t = useTranslations("dronePilotService");
  const categories = t.raw("content.categories") as CategoryItem[];

  const [animations, setAnimations] = useState<(LottieAnimationData | null)[]>([]);

  useEffect(() => {
    const loadAnimations = async () => {
      const animationPromises = categories.map((category) => {
        if (category.icon) {
          return fetch(`/icon/${category.icon}`)
            .then((res) => res.json())
            .catch(() => null);
        }
        return null;
      });

      try {
        const loadedAnimations = await Promise.all(animationPromises);
        setAnimations(loadedAnimations);
      } catch {
        setAnimations([]);
      }
    };
    loadAnimations();
  }, [categories]);

  return (
    <div id="content">
      {/* Header Section */}
      <section className="py-24 md:py-32 lg:py-40 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-roman">
              {t("content.title")}
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("content.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, idx) => (
                <CategoryCard
                  key={category.title}
                  category={category}
                  animationData={animations[idx] ?? null}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="bg-card border border-border/50 rounded-3xl p-12 md:p-16 shadow-xl shadow-primary/5">
              <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center font-roman">
                {t("content.specsTitle")}
              </h3>
              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                <div className="text-center md:text-left">
                  <h4 className="text-xl md:text-2xl font-semibold mb-3 font-roman">
                    {t("content.fleet.title")}
                  </h4>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    {t("content.fleet.description")}
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-xl md:text-2xl font-semibold mb-3 font-roman">
                    {t("content.videoQuality.title")}
                  </h4>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    {t("content.videoQuality.description")}
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-xl md:text-2xl font-semibold mb-3 font-roman">
                    {t("content.photoSize.title")}
                  </h4>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    {t("content.photoSize.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl md:text-3xl font-semibold text-muted-foreground leading-relaxed font-roman">
              {t("content.closingStatement")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export { ContentSection };
