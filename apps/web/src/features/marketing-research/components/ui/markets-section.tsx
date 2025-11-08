"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

interface LocationItem {
  title: string;
  description: string;
  icon: string;
}

const MarketsSection = () => {
  const t = useTranslations("marketingResearch");
  const locations = t.raw("markets.locations") as LocationItem[];

  return (
    <section className="py-32 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-roman">
            {t("markets.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("markets.description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto mb-16">
          {/* Map Section */}
          <div className="relative rounded-2xl overflow-hidden border shadow-lg bg-card">
            <div className="aspect-[4/3] relative">
              <Image
                src="/map.webp"
                alt="Service Locations Map"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Locations List */}
          <div className="space-y-6">
            {locations.map((location) => (
              <LocationCard key={location.title} location={location} index={0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface LocationCardProps {
  location: LocationItem;
  index: number;
}

const LocationCard = ({ location, index }: LocationCardProps) => {
  const getFlagPath = () => {
    const title = location.title.toLowerCase();
    if (title.includes("indonesia")) {
      return "/icon/indonesia-flag.svg";
    } else if (title.includes("singapore") || title.includes("singapura")) {
      return "/icon/singapore-flag.svg";
    } else if (title.includes("philippines") || title.includes("filipina")) {
      return "/icon/philippines-flag.svg";
    }
    return null;
  };

  const flagPath = getFlagPath();

  return (
    <div className="group relative bg-card border rounded-xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 hover:border-primary/50">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

      <div className="relative z-10 flex items-start gap-4">
        {flagPath && (
          <div className="shrink-0 w-16 h-16 flex items-center justify-center">
            <Image
              src={flagPath}
              alt={`${location.title} flag`}
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2 font-roman">{location.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{location.description}</p>
        </div>
      </div>
    </div>
  );
};

export { MarketsSection };

