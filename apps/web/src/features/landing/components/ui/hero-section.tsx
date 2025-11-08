"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/src/lib/i18n";
import { CountUp } from "./count-up";

const HeroSection = () => {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-no-repeat opacity-4 -z-10"
     style={{ backgroundImage: "url('/bg.webp')", backgroundPosition: "center -700px" }} />

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg0Y2MxNiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40 -z-10" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-roman">
            {t("title")}
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("description")}
          </p>

          <div className="flex justify-center items-center">
            <Button size="lg" className="text-base px-8" asChild>
              <Link href="#contact">{t("cta")}</Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                <CountUp value={3} duration={1500} />
              </div>
              <p className="text-muted-foreground">Countries</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                <CountUp value="9+" duration={1500} />
              </div>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                <CountUp value="500+" duration={2000} />
              </div>
              <p className="text-muted-foreground">Projects</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HeroSection };
