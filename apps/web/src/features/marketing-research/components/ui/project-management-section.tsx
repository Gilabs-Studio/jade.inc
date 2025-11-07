"use client";

import { useTranslations } from "next-intl";

const ProjectManagementSection = () => {
  const t = useTranslations("marketingResearch");
  const categories = t.raw("projectManagement.categories") as Array<{
    category: string;
    items: string[];
  }>;

  return (
    <section className="py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-roman">
            {t("projectManagement.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("projectManagement.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((category, idx) => (
            <div
              key={idx}
              className="group relative bg-card border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-primary/50"
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-4 font-roman text-primary">
                  {category.category}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <svg
                        className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { ProjectManagementSection };

