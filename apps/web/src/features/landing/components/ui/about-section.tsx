"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { CountUp } from "./count-up";

interface AboutSectionProps {
  mainImage?: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
}

const AboutSection = ({
  mainImage = {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    alt: "Team collaboration",
  },
  secondaryImage = {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    alt: "Office workspace",
  },
}: AboutSectionProps = {}) => {
  const t = useTranslations("about");

  return (
    <section className="py-32" id="about">
      <div className="container">
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-5xl font-semibold font-roman">{t("title")}</h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
        <div className="grid gap-7 lg:grid-cols-3">
          <img
            src={mainImage.src}
            alt={mainImage.alt}
            className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2"
          />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="bg-primary/10 flex flex-col justify-between gap-6 rounded-xl p-7 md:w-1/2 lg:w-auto border border-primary/20">
              <div className="flex items-center gap-3">
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
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-semibold">Jade Inc</p>
                  <p className="text-sm text-muted-foreground">Since 2016</p>
                </div>
              </div>
              <div>
                <p className="mb-2 text-lg font-semibold">
                  Trusted coordination specialist
                </p>
                <p className="text-muted-foreground">
                  Expert field management across Indonesia, Philippines and
                  Singapore
                </p>
              </div>
              <Button variant="outline" className="mr-auto" asChild>
                <a href="#contact">Contact Us</a>
              </Button>
            </div>
            <img
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              className="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto"
            />
          </div>
        </div>
        <div className="bg-muted relative overflow-hidden rounded-xl p-7 md:p-16 mt-14">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-3xl font-semibold md:text-4xl font-roman">
              {t("achievements.title")}
            </h2>
            <p className="text-muted-foreground max-w-xl">
              {t("achievements.description")}
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 text-center lg:grid-cols-4">
            {t.raw("achievements.items").map(
              (item: { label: string; value: string }, idx: number) => (
                <div className="flex flex-col gap-2" key={item.label + idx}>
                  <span className="text-4xl font-semibold md:text-5xl text-primary">
                    <CountUp value={item.value} duration={2000} delay={idx * 100} />
                  </span>
                  <p className="text-sm md:text-base">{item.label}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { AboutSection };
