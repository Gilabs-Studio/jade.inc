import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { HeroSection } from "@/src/features/landing/components/ui";
import { BlogSection } from "@/src/features/blog/components/ui";

export const metadata: Metadata = {
  title: "Jade Inc - Field Research & Coordination Services",
  description:
    "Coordination specialist for field research and arrangement in Indonesia, Philippines and Singapore. We support your business with marketing research, travel arrangement, and drone rental services.",
  keywords: [
    "field research",
    "marketing research",
    "coordination services",
    "Indonesia",
    "Philippines",
    "Singapore",
    "travel arrangement",
    "drone services",
  ],
  openGraph: {
    title: "Jade Inc - Field Research & Coordination Services",
    description:
      "Coordination specialist for field research and arrangement in Indonesia, Philippines and Singapore.",
    type: "website",
  },
};

// Lazy load below-the-fold components for instant FCP
// Each component is code-split and loaded on-demand
const ServicesSection = dynamic(
  () =>
    import("@/src/features/landing/components/ui").then(
      (mod) => ({ default: mod.ServicesSection })
    ),
  {
    loading: () => (
      <section className="py-32 bg-muted/30" id="services">
        <div className="container">
          <div className="text-center mb-16">
            <div className="h-12 w-64 bg-muted rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-96 bg-muted rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
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

const UseCasesSection = dynamic(
  () =>
    import("@/src/features/landing/components/ui").then(
      (mod) => ({ default: mod.UseCasesSection })
    ),
  {
    loading: () => (
      <section className="py-32" id="use-cases">
        <div className="container">
          <div className="text-center mb-16">
            <div className="h-12 w-64 bg-muted rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-96 bg-muted rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-card border rounded-xl p-6 h-96 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    ),
  }
);

const AboutSection = dynamic(
  () =>
    import("@/src/features/landing/components/ui").then(
      (mod) => ({ default: mod.AboutSection })
    ),
  {
    loading: () => (
      <section className="py-32" id="about">
        <div className="container">
          <div className="mb-14 grid gap-5 md:grid-cols-2">
            <div className="h-16 bg-muted rounded-lg animate-pulse" />
            <div className="h-6 bg-muted rounded-lg animate-pulse" />
          </div>
          <div className="grid gap-7 lg:grid-cols-3">
            <div className="h-[620px] bg-muted rounded-xl lg:col-span-2 animate-pulse" />
            <div className="space-y-7">
              <div className="h-64 bg-muted rounded-xl animate-pulse" />
              <div className="h-64 bg-muted rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    ),
  }
);

// BlogSection is client component; load immediately (above-the-fold enough) without dynamic skeleton for clarity.

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <UseCasesSection />
      <AboutSection />
      <BlogSection />
    </main>
  );
}
