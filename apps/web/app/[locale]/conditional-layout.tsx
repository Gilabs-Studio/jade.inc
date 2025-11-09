"use client";

import { usePathname } from "next/navigation";
import { Header, Footer } from "@/src/features/landing/components/ui";

interface ConditionalLayoutProps {
  children: React.ReactNode;
  locale: string;
}

export function ConditionalLayout({ children, locale }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isLoginOrAdmin = pathname?.includes('/login') || pathname?.includes('/admin');

  if (isLoginOrAdmin) {
    return (
      <div lang={locale} className="min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <div lang={locale} className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 pt-16">
        {children}
      </div>
      <Footer />
    </div>
  );
}

