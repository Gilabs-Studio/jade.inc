import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Field Services - Marketing Research & Data Collection | Jade Inc",
  description:
    "Professional field services for marketing research, data collection, and market analysis in Indonesia, Philippines, and Singapore. Expert coordination and project management for your research needs.",
  keywords: [
    "field services",
    "marketing research",
    "data collection",
    "market research",
    "field research",
    "survey services",
    "Indonesia",
    "Philippines",
    "Singapore",
  ],
  openGraph: {
    title: "Field Services - Marketing Research & Data Collection | Jade Inc",
    description:
      "Professional field services for marketing research, data collection, and market analysis in Indonesia, Philippines, and Singapore.",
    type: "website",
  },
};

const HeroSection = dynamic(
  () =>
    import("@/src/features/marketing-research/components/ui").then(
      (mod) => ({ default: mod.HeroSection })
    ),
  {
    loading: () => (
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="h-16 w-96 bg-muted rounded-lg mx-auto mb-6 animate-pulse" />
            <div className="h-8 w-full max-w-3xl bg-muted rounded-lg mx-auto animate-pulse" />
          </div>
        </div>
      </section>
    ),
  }
);

const MarketsSection = dynamic(
  () =>
    import("@/src/features/marketing-research/components/ui").then(
      (mod) => ({ default: mod.MarketsSection })
    ),
  {
    loading: () => (
      <section className="py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="h-12 w-64 bg-muted rounded-lg mx-auto mb-16 animate-pulse" />
            <div className="bg-card border rounded-xl p-12 h-64 animate-pulse" />
          </div>
        </div>
      </section>
    ),
  }
);

const ServicesSection = dynamic(
  () =>
    import("@/src/features/marketing-research/components/ui").then(
      (mod) => ({ default: mod.ServicesSection })
    ),
  {
    loading: () => (
      <section className="py-32 bg-muted/30">
        <div className="container">
          <div className="h-12 w-48 bg-muted rounded-lg mx-auto mb-16 animate-pulse" />
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-card border rounded-xl p-8 h-64 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    ),
  }
);

const ProjectManagementSection = dynamic(
  () =>
    import("@/src/features/marketing-research/components/ui").then(
      (mod) => ({ default: mod.ProjectManagementSection })
    ),
  {
    loading: () => (
      <section className="py-32">
        <div className="container">
          <div className="h-12 w-64 bg-muted rounded-lg mx-auto mb-16 animate-pulse" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-card border rounded-xl p-6 h-64 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    ),
  }
);

const OnlineSurveysSection = dynamic(
  () =>
    import("@/src/features/marketing-research/components/ui").then(
      (mod) => ({ default: mod.OnlineSurveysSection })
    ),
  {
    loading: () => (
      <section className="py-32 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="h-12 w-48 bg-muted rounded-lg mx-auto mb-16 animate-pulse" />
            <div className="bg-card border rounded-xl p-12 h-64 animate-pulse" />
          </div>
        </div>
      </section>
    ),
  }
);

const SoutheastAsiaMapSection = dynamic(
  () =>
    import("@/src/features/marketing-research/components/ui").then(
      (mod) => ({ default: mod.SoutheastAsiaMap })
    ),
  {
    loading: () => (
      <section className="py-32">
        <div className="container">
          <div className="h-12 w-64 bg-muted rounded-lg mx-auto mb-16 animate-pulse" />
          <div className="h-6 w-96 bg-muted rounded-lg mx-auto mb-8 animate-pulse" />
          <div className="bg-card border rounded-xl p-12 h-96 animate-pulse max-w-5xl mx-auto" />
        </div>
      </section>
    ),
  }
);

export default function MarketingResearchPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <SoutheastAsiaMapSection />
      <MarketsSection />
      <ServicesSection />
      <ProjectManagementSection />
      <OnlineSurveysSection />
    </main>
  );
}



