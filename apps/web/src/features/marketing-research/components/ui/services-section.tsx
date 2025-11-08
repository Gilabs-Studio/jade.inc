"use client";

import { useTranslations } from "next-intl";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useRef, useState, useEffect } from "react";
import type { LottieAnimationData } from "@/src/features/landing/types";
import { Button } from "@/components/ui/button";
import { Link } from "@/src/lib/i18n";

interface ServiceItem {
  title: string;
  description?: string;
  icon?: string;
}

const ServiceCard = ({
  service,
  animationData,
}: {
  service: ServiceItem;
  animationData: LottieAnimationData | null;
}) => {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  return (
    <div
      className="group relative bg-card border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-primary/50"
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
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

      <div className="relative z-10">
        <div className="h-16 w-16 mb-4 flex items-center justify-center">
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

        <h3 className="text-lg font-semibold mb-2 font-roman leading-tight">
          {service.title}
        </h3>
        {service.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {service.description}
          </p>
        )}
      </div>
    </div>
  );
};

const CTACard = ({ text, description }: { text: string; description: string }) => {
  return (
    <div className="group relative bg-card border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-primary/50 h-full">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
      <div className="relative z-10">
        <div className="h-16 w-16 mb-4 flex items-center justify-center">
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
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2 font-roman leading-tight">
          {text}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>
        <Button asChild size="sm" className="w-full">
          <Link href="/contact">{text}</Link>
        </Button>
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
      const animationPromises = services.map((service) => {
        if (service.icon) {
          return fetch(`/icon/${service.icon}`)
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
  }, [services]);

  return (
    <section className="py-32 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-roman">
            {t("services.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.slice(0, 8).map((service, idx) => (
              <ServiceCard
                key={service.title}
                service={service}
                animationData={animations[idx] ?? null}
              />
            ))}
          </div>
          {services.length > 8 && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {services.slice(8, 11).map((service, idx) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  animationData={animations[idx + 8] ?? null}
                />
              ))}
              <CTACard
                text={t("services.cta.text")}
                description={t("services.cta.description")}
              />
            </div>
          )}
          {/* Mobile CTA */}
          <div className="lg:hidden mt-6">
            <CTACard
              text={t("services.cta.text")}
              description={t("services.cta.description")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { ServicesSection };

