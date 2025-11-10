"use client";

import { Link, usePathname } from "@/src/lib/i18n";
import { LanguageSwitcher } from "./language-switcher";
import { TextRoll } from "@/components/ui/text-roll";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href.startsWith("#")) {
      // For hash links, check if we're on the home page
      return pathname === "/" || pathname === "";
    }
    // For regular paths, check exact match or starts with
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md overflow-visible">
      <nav className="container mx-auto px-2 h-15 flex items-center justify-between overflow-visible">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo_g.svg"
            alt="Jade Inc"
            width={120}
            height={20}
            className="h-5 w-auto"
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-6 overflow-visible h-full">
          <Link href="/marketing-research" className="group relative py-2 overflow-visible">
            <TextRoll
              className={cn(
                "text-sm font-medium transition-colors h-[15px] ",
                isActive("/marketing-research")
                  ? "text-primary"
                  : "group-hover:text-primary"
              )}
            >
              Services
            </TextRoll>
            {isActive("/marketing-research") && (
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </Link>
          <Link href="/use-cases" className="group relative py-3 overflow-visible">
            <TextRoll
              className={cn(
                "text-sm font-medium transition-colors h-[15px]",
                isActive("/use-cases")
                  ? "text-primary"
                  : "group-hover:text-primary"
              )}
            >
              Solutions
            </TextRoll>
            {isActive("/use-cases") && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </Link>
          <Link href="/travel-arrangement" className="group relative py-3 overflow-visible">
            <TextRoll
              className={cn(
                "text-sm font-medium transition-colors h-[15px]",
                isActive("/travel-arrangement")
                  ? "text-primary"
                  : "group-hover:text-primary"
              )}
            >
              Travel
            </TextRoll>
            {isActive("/travel-arrangement") && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </Link>
          <Link href="/drone-pilot-service" className="group relative py-3 overflow-visible">
            <TextRoll
              className={cn(
                "text-sm font-medium transition-colors h-[15px]",
                isActive("/drone-pilot-service")
                  ? "text-primary"
                  : "group-hover:text-primary"
              )}
            >
              Drones
            </TextRoll>
            {isActive("/drone-pilot-service") && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </Link>

          <Link href="/blog" className="group relative py-3 overflow-visible">
            <TextRoll
              className={cn(
                "text-sm font-medium transition-colors h-[15px]",
                isActive("/blog")
                  ? "text-primary"
                  : "group-hover:text-primary"
              )}
            >
              Blog
            </TextRoll>
            {isActive("/blog") && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </Link>
          <LanguageSwitcher />
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-thin">
          <div className="container px-4 py-4 flex flex-col gap-3">
            <Link
              href="/marketing-research"
              className={cn(
                "text-sm font-medium transition-colors py-2 px-3 rounded-lg",
                isActive("/marketing-research")
                  ? "text-primary bg-primary/10"
                  : "hover:text-primary hover:bg-muted"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/use-cases"
              className={cn(
                "text-sm font-medium transition-colors py-2 px-3 rounded-lg",
                isActive("/use-cases")
                  ? "text-primary bg-primary/10"
                  : "hover:text-primary hover:bg-muted"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Solutions
            </Link>
            <Link
              href="/travel-arrangement"
              className={cn(
                "text-sm font-medium transition-colors py-2 px-3 rounded-lg",
                isActive("/travel-arrangement")
                  ? "text-primary bg-primary/10"
                  : "hover:text-primary hover:bg-muted"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Travel
            </Link>
            <Link
              href="/drone-pilot-service"
              className={cn(
                "text-sm font-medium transition-colors py-2 px-3 rounded-lg",
                isActive("/drone-pilot-service")
                  ? "text-primary bg-primary/10"
                  : "hover:text-primary hover:bg-muted"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Drones
            </Link>
            <Link
              href="#contact"
              className={cn(
                "text-sm font-medium transition-colors py-2 px-3 rounded-lg",
                isActive("#contact")
                  ? "text-primary bg-primary/10"
                  : "hover:text-primary hover:bg-muted"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className={cn(
                "text-sm font-medium transition-colors py-2 px-3 rounded-lg",
                isActive("/blog")
                  ? "text-primary bg-primary/10"
                  : "hover:text-primary hover:bg-muted"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
};

export { Header };
