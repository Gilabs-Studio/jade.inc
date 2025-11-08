import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel - Business Travel Arrangement Services | Jade Inc",
  description:
    "Professional travel arrangement services for business trips in Indonesia, Philippines, and Singapore. We handle flights, accommodations, transportation, and logistics for your field research and business needs.",
  keywords: [
    "travel arrangement",
    "business travel",
    "travel services",
    "corporate travel",
    "Indonesia travel",
    "Philippines travel",
    "Singapore travel",
    "travel coordination",
  ],
  openGraph: {
    title: "Travel - Business Travel Arrangement Services | Jade Inc",
    description:
      "Professional travel arrangement services for business trips in Indonesia, Philippines, and Singapore.",
    type: "website",
  },
};

// Lazy load components for better performance
const HeroSection = dynamic(
  () =>
    import("@/src/features/travel-arrangement/components/ui").then(
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

const ServicesSection = dynamic(
  () =>
    import("@/src/features/travel-arrangement/components/ui").then(
      (mod) => ({ default: mod.ServicesSection })
    ),
  {
    loading: () => (
      <section className="py-32" id="services">
        <div className="container">
          <div className="text-center mb-16">
            <div className="h-12 w-48 bg-muted rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-96 bg-muted rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5].map((i) => (
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

export default function TravelArrangementPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
    </main>
  );
}


