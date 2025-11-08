import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drones - Professional Drone Pilot Services | Jade Inc",
  description:
    "Expert drone pilot services for aerial photography, surveying, mapping, and inspection in Indonesia, Philippines, and Singapore. Licensed pilots with professional-grade equipment for your business needs.",
  keywords: [
    "drone services",
    "drone pilot",
    "aerial photography",
    "drone surveying",
    "drone mapping",
    "aerial inspection",
    "Indonesia",
    "Philippines",
    "Singapore",
  ],
  openGraph: {
    title: "Drones - Professional Drone Pilot Services | Jade Inc",
    description:
      "Expert drone pilot services for aerial photography, surveying, mapping, and inspection in Indonesia, Philippines, and Singapore.",
    type: "website",
  },
};

// Lazy load components for better performance
const HeroSection = dynamic(
  () =>
    import("@/src/features/drone-pilot-service/components/ui").then(
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

const ServiceBreakdownSection = dynamic(
  () =>
    import("@/src/features/drone-pilot-service/components/ui").then(
      (mod) => ({ default: mod.ServiceBreakdownSection })
    ),
  {
    loading: () => (
      <section className="py-20 md:py-28 lg:py-40 bg-background">
        <div className="container">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative">
                <div className="aspect-[4/3] bg-muted rounded-3xl animate-pulse" />
              </div>
              <div className="space-y-6">
                <div className="h-16 w-3/4 bg-muted rounded-lg animate-pulse" />
                <div className="h-6 w-full bg-muted rounded-lg animate-pulse" />
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-card border rounded-2xl p-8 h-32 animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    ),
  }
);

const ContentSection = dynamic(
  () =>
    import("@/src/features/drone-pilot-service/components/ui").then(
      (mod) => ({ default: mod.ContentSection })
    ),
  {
    loading: () => (
      <section className="py-32 bg-muted/30" id="content">
        <div className="container">
          <div className="text-center mb-16">
            <div className="h-12 w-48 bg-muted rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-96 bg-muted rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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

export default function DronePilotServicePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServiceBreakdownSection />
      <ContentSection />
    </main>
  );
}

