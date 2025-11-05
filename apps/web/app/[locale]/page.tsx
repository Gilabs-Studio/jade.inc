import {
  Header,
  HeroSection,
  ServicesSection,
  UseCasesSection,
  AboutSection,
  ContactSection,
  Footer,
} from "@/src/features/landing/components/ui";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <ServicesSection />
        <UseCasesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
