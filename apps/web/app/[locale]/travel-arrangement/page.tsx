import dynamic from "next/dynamic";
import { Header } from "@/src/features/landing/components/ui";
import { Footer } from "@/src/features/landing/components/ui";

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
      <section className="py-32 bg-muted/30" id="services">
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
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <ServicesSection />
      </main>
      <Footer />
    </>
  );
}


