"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/src/lib/i18n";
import { Header } from "@/src/features/landing/components/ui";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const Footer = dynamic(
  () =>
    import("@/src/features/landing/components/ui").then(
      (mod) => ({ default: mod.Footer })
    ),
  {
    ssr: false,
  }
);

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error:", error);
  }, [error]);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat opacity-4 -z-10"
            style={{
              backgroundImage: "url('/bg.webp')",
              backgroundPosition: "center -700px",
            }}
          />

          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg0Y2MxNiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40 -z-10"
          />

          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 font-roman">
                  Something Went Wrong
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto">
                  We encountered an unexpected error. Please try again.
                </p>
                {error.digest && (
                  <p className="text-sm text-muted-foreground/70 mb-8">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>

              <div className="flex justify-center items-center gap-4">
                <Button size="lg" className="text-base px-8" onClick={reset}>
                  Try Again
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8" asChild>
                  <Link href="/">Go Home</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

