"use client";

import { useTranslations } from "next-intl";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useRef, useState, useEffect } from "react";
import type { TravelService, LottieAnimationData } from "@/src/features/travel-arrangement/types";

interface ServiceItemProps {
  service: TravelService;
  animationData: LottieAnimationData | null;
  className?: string;
}

const ServiceItem = ({ service, animationData, className = "" }: ServiceItemProps) => {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  return (
    <div
      className={`group relative bg-card border rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:border-primary/50 ${className}`}
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
  const services = t.raw("services.items") as TravelService[];

  const [animations, setAnimations] = useState<(LottieAnimationData | null)[]>([]);

  useEffect(() => {
    const loadAnimations = async () => {
      // Load specific icons for each service
      const animationPromises = [
        fetch("/icon/take-off.json").then((res) => res.json()).catch(() => null), // Transportations
        fetch("/icon/hotel-rating-building-stars.json").then((res) => res.json()).catch(() => null), // Accommodations
        fetch("/icon/ticket.json").then((res) => res.json()).catch(() => null), // Ticketing
        fetch("/icon/route.json").then((res) => res.json()).catch(() => null), // Itinerary
        fetch("/icon/food-delivery.json").then((res) => res.json()).catch(() => null), // FNB & More
      ];
      try {
        const loadedAnimations = await Promise.all(animationPromises);
        setAnimations(loadedAnimations);
      } catch {
        // If animations fail to load, continue without them
        setAnimations([]);
      }
    };
    loadAnimations();
  }, []);

  return (
    <section className="relative py-32 overflow-hidden" id="services">
      {/* Background webp fixed */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-fixed opacity-4 -z-10"
        style={{
          backgroundImage: "url('/bg.webp')",
          backgroundPosition: "center -700px",
        }}
      />

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg0Y2MxNiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40 -z-10"
      />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-roman">
            {t("services.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.slice(0, 3).map((service: TravelService, idx: number) => (
            <ServiceItem
              key={idx}
              service={service}
              animationData={animations[idx] ?? null}
            />
          ))}
          {services.length > 3 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col md:flex-row lg:justify-center lg:gap-8 gap-8">
              {services.slice(3).map((service: TravelService, idx: number) => (
                <div key={idx + 3} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] lg:max-w-sm">
                  <ServiceItem
                    service={service}
                    animationData={animations[idx + 3] ?? null}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export { ServicesSection };


