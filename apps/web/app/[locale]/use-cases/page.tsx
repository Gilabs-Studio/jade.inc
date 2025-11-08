import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions - Use Cases & Success Stories | Jade Inc",
  description:
    "Discover how Jade Inc helps businesses with field research, marketing research, travel arrangement, and drone services. Explore our successful use cases and solutions across Indonesia, Philippines, and Singapore.",
  keywords: [
    "use cases",
    "solutions",
    "success stories",
    "field research solutions",
    "marketing research examples",
    "case studies",
    "Indonesia",
    "Philippines",
    "Singapore",
  ],
  openGraph: {
    title: "Solutions - Use Cases & Success Stories | Jade Inc",
    description:
      "Discover how Jade Inc helps businesses with field research, marketing research, travel arrangement, and drone services.",
    type: "website",
  },
};

// Lazy load components for better performance
const HeroSection = dynamic(
  () =>
    import("@/src/features/use-cases/components/ui").then(
      (mod) => ({ default: mod.HeroSection })
    ),
  {
    loading: () => (
      <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-16">
        <div className="container">
          <div className="max-w-5xl mx-auto text-center">
            <div className="h-16 w-96 bg-muted rounded-lg mx-auto mb-6 animate-pulse" />
            <div className="h-8 w-full max-w-3xl bg-muted rounded-lg mx-auto mb-12 animate-pulse" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-card border rounded-xl p-6 h-24 animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    ),
  }
);

const UseCasesGrid = dynamic(
  () =>
    import("@/src/features/use-cases/components/ui").then(
      (mod) => ({ default: mod.UseCasesGrid })
    ),
  {
    loading: () => (
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <div className="h-12 w-64 bg-muted rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-96 bg-muted rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="bg-card border rounded-2xl p-8 h-96 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    ),
  }
);

export default function UseCasesPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <UseCasesGrid />
    </main>
  );
}


