"use client";

import { useTranslations } from "next-intl";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useRef, useState, useEffect } from "react";
import type { LottieAnimationData } from "@/src/features/landing/types";

interface ServiceItem {
  title: string;
  description?: string;
}

const SERVICE_ICONS = [
  "/icon/knowledge.json", // IDIs | FGDs | CLTs | Online Survey
  "/icon/family.json", // Ethnography | Inhomes | Immersions
  "/icon/responsive-design.json", // Shop-Alongs | Travel-Alongs | Diary | Tasks
];

const ServiceCard = ({
  service,
  animationData,
  index,
}: {
  service: ServiceItem;
  animationData: LottieAnimationData | null;
  index: number;
}) => {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  return (
    <div
      className="group relative bg-card border rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:border-primary/50"
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
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

      <div className="relative z-10">
        <div className="h-20 w-20 mb-6 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          {animationData ? (
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              loop={false}
              autoplay={false}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-10 h-10 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          )}
        </div>

        <h3 className="text-xl font-semibold mb-4 font-roman leading-tight">
          {service.title}
        </h3>
        {service.description && (
          <p className="text-muted-foreground leading-relaxed">{service.description}</p>
        )}
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const t = useTranslations("marketingResearch");
  const services = t.raw("services.items") as ServiceItem[];
  const [animations, setAnimations] = useState<(LottieAnimationData | null)[]>([]);

  useEffect(() => {
    const loadAnimations = async () => {
      const animationPromises = SERVICE_ICONS.map((iconPath) =>
        fetch(iconPath)
          .then((res) => res.json())
          .catch(() => null)
      );
      try {
        const loadedAnimations = await Promise.all(animationPromises);
        setAnimations(loadedAnimations);
      } catch {
        setAnimations([]);
      }
    };
    loadAnimations();
  }, []);

  return (
    <section className="py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-roman">
            {t("services.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              service={service}
              animationData={animations[idx] ?? null}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { ServicesSection };

