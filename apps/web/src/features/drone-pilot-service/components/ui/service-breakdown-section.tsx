"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const ServiceBreakdownSection = () => {
  const t = useTranslations("dronePilotService");
  const features = t.raw("serviceBreakdown.features") as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section className="py-20 md:py-28 lg:py-40 bg-background">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Section - Left */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/5 bg-card">
                <div className="aspect-[4/3] relative bg-muted">
                  <Image
                    src="/drone-mavic-2-pro.webp"
                    alt="DJI Mavic 2 Pro Drone"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* Content Section - Right */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-roman">
                  {t("serviceBreakdown.title")}
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                  {t("serviceBreakdown.description")}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-6">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-card border border-border/50 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent rounded-2xl transition-all duration-300" />
                    <div className="relative z-10">
                      <h3 className="text-xl md:text-2xl font-semibold mb-3 font-roman">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ServiceBreakdownSection };

