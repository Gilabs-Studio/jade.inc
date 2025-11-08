"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import type { UseCase } from "@/src/features/marketing-research/types";

interface UseCaseCardProps {
  useCase: UseCase;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const UseCaseCard = ({ useCase, index, isExpanded, onToggle }: UseCaseCardProps) => {
  return (
    <article
      className={`group relative bg-card border rounded-2xl overflow-hidden transition-all duration-500 ${
        isExpanded
          ? "md:col-span-2 lg:col-span-2 shadow-2xl border-primary/50"
          : "hover:shadow-xl hover:border-primary/30"
      }`}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

      <div className="p-8 md:p-10">
        {/* Header with number badge */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-primary-foreground">
                {index + 1}
              </span>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary transition-colors font-roman">
                {useCase.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onToggle}
            className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center group/btn"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Content Grid */}
        <div
          className={`grid gap-6 transition-all duration-500 ${
            isExpanded
              ? "md:grid-cols-2 opacity-100 max-h-[2000px]"
              : "opacity-100 max-h-[500px]"
          }`}
        >
          {/* Left Column - Main Info */}
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
              <svg
                className="w-6 h-6 text-primary mt-0.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <div className="flex-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Client
                </p>
                <p className="text-base font-semibold">{useCase.client}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
              <svg
                className="w-6 h-6 text-primary mt-0.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <div className="flex-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Type
                </p>
                <p className="text-base font-semibold leading-relaxed">
                  {useCase.type}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-4">
            {useCase.location && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                <svg
                  className="w-6 h-6 text-primary mt-0.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    Location
                  </p>
                  <p className="text-base font-semibold">{useCase.location}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                <svg
                  className="w-6 h-6 text-primary mt-0.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    Size
                  </p>
                  <p className="text-base font-semibold truncate">
                    {useCase.size}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                <svg
                  className="w-6 h-6 text-primary mt-0.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    Period
                  </p>
                  <p className="text-base font-semibold truncate">
                    {useCase.period}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Challenge Section - Always visible but expandable */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <svg
              className="w-6 h-6 text-primary mt-0.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <div className="flex-1">
              <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">
                Challenge
              </p>
              <p className="text-base leading-relaxed">{useCase.challenge}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const UseCasesGrid = () => {
  const t = useTranslations("useCasesPage");
  const useCases = t.raw("useCases.items") as UseCase[];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-roman">
            {t("useCases.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("useCases.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {useCases.map((useCase, idx) => (
            <UseCaseCard
              key={useCase.title}
              useCase={useCase}
              index={idx}
              isExpanded={expandedIndex === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { UseCasesGrid };


