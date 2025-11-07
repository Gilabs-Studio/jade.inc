"use client";

import { useTranslations } from "next-intl";

const OnlineSurveysSection = () => {
  const t = useTranslations("marketingResearch");
  const platforms = t.raw("onlineSurveys.platforms") as string[];

  return (
    <section className="py-32 bg-muted/30">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-roman">
              {t("onlineSurveys.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("onlineSurveys.description")}
            </p>
          </div>

          <div className="bg-card border rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {platforms.map((platform, idx) => (
                <div
                  key={idx}
                  className="group relative bg-muted/50 border rounded-lg p-4 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 text-center"
                >
                  <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
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

