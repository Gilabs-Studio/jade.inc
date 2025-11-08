"use client";

import { useTranslations } from "next-intl";

const ContentSection = () => {
  const t = useTranslations("dronePilotService");

  const useCases = t.raw("content.useCases");
  const variousPurposes = t.raw("content.variousPurposes");
  const industries = t.raw("content.industries");
  const purposes = t.raw("content.purposes");
  const otherServices = t.raw("content.otherServices");

  return (
    <section className="py-32 bg-muted/30" id="content">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Description */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-roman">
              {t("content.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("content.description")}
            </p>
          </div>

          {/* Use Cases */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 font-roman">
              {t("content.useCasesTitle")}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {useCases.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-card border rounded-lg p-4 hover:border-primary/50 transition-colors"
                >
                  <p className="text-sm font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Various Purposes */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 font-roman">
              {t("content.variousPurposesTitle")}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {variousPurposes.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-card border rounded-lg p-4 hover:border-primary/50 transition-colors"
                >
                  <p className="text-sm font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 font-roman">
              {t("content.industriesTitle")}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {industries.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-card border rounded-lg p-4 hover:border-primary/50 transition-colors"
                >
                  <p className="text-sm font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Purposes */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 font-roman">
              {t("content.purposesTitle")}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {purposes.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-card border rounded-lg p-4 hover:border-primary/50 transition-colors"
                >
                  <p className="text-sm font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Other Services */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 font-roman">
              {t("content.otherServicesTitle")}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherServices.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-card border rounded-lg p-4 hover:border-primary/50 transition-colors"
                >
                  <p className="text-sm font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="bg-card border rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 font-roman">
              {t("content.specsTitle")}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-2">
                  {t("content.fleet.title")}
                </h4>
                <p className="text-muted-foreground">
                  {t("content.fleet.description")}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">
                  {t("content.videoQuality.title")}
                </h4>
                <p className="text-muted-foreground">
                  {t("content.videoQuality.description")}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">
                  {t("content.photoSize.title")}
                </h4>
                <p className="text-muted-foreground">
                  {t("content.photoSize.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ContentSection };

