"use client";

import { useTranslations } from "next-intl";
import Lottie from "lottie-react";
import { useRef, useState, useEffect } from "react";

interface ServiceItemProps {
  service: { title: string; description: string };
  animationData: any;
}

const ServiceItem = ({ service, animationData }: ServiceItemProps) => {
  const lottieRef = useRef<any>(null);

  return (
    <div
      className="group relative bg-card border rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:border-primary/50"
      onMouseEnter={() => {
        lottieRef.current?.play();
      }}
      onMouseLeave={() => {
        lottieRef.current?.stop();
      }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

      <div className="relative z-10">
        {animationData && (
          <div className="w-20 h-20 mb-6">
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              loop={false}
              autoplay={false}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}

        <h3 className="text-2xl font-bold mb-4 font-roman">{service.title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {service.description}
        </p>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const t = useTranslations("travelArrangement");
  const services = t.raw("services.items");

  const [animations, setAnimations] = useState<any[]>([]);

  useEffect(() => {
    const loadAnimations = async () => {
      try {
        // Try to load travel-related animations, fallback to empty if not available
        const animationPromises = [
          fetch("/icon/travel.json").then((res) => res.json()).catch(() => null),
          fetch("/icon/travel.json").then((res) => res.json()).catch(() => null),
          fetch("/icon/travel.json").then((res) => res.json()).catch(() => null),
          fetch("/icon/travel.json").then((res) => res.json()).catch(() => null),
          fetch("/icon/travel.json").then((res) => res.json()).catch(() => null),
        ];
        const loadedAnimations = await Promise.all(animationPromises);
        setAnimations(loadedAnimations);
      } catch (error) {
        // If animations fail to load, continue without them
        setAnimations([]);
      }
    };
    loadAnimations();
  }, []);

  return (
    <section className="py-32 bg-muted/30" id="services">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-roman">
            {t("services.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map(
            (
              service: { title: string; description: string },
              idx: number
            ) => (
              <ServiceItem
                key={idx}
                service={service}
                animationData={animations[idx]}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export { ServicesSection };


