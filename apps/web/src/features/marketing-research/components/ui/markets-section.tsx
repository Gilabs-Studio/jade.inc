"use client";

import { useTranslations } from "next-intl";

const MarketsSection = () => {
  const t = useTranslations("marketingResearch");

  return (
    <section className="py-32">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-roman">
              {t("markets.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("markets.description")}
            </p>
          </div>

          <div className="bg-card border rounded-xl p-8 md:p-12 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-primary-foreground"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-roman">
                {t("markets.philippines.title")}
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t("markets.philippines.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { MarketsSection };

