"use client";

import { Link } from "@/src/lib/i18n";
import { LanguageSwitcher } from "./language-switcher";
import { TextRoll } from "./text-roll";
import { useState } from "react";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
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

        <div className="hidden md:flex items-center gap-6">
          <Link href="/marketing-research" className="group">
            <TextRoll className="text-sm font-medium group-hover:text-primary transition-colors">
              Services
            </TextRoll>
          </Link>
          <Link href="/use-cases" className="group">
            <TextRoll className="text-sm font-medium group-hover:text-primary transition-colors">
              Solutions
            </TextRoll>
          </Link>
          <Link href="/travel-arrangement" className="group">
            <TextRoll className="text-sm font-medium group-hover:text-primary transition-colors">
              Travel
            </TextRoll>
          </Link>
          <Link href="/drone-pilot-service" className="group">
            <TextRoll className="text-sm font-medium group-hover:text-primary transition-colors">
              Drones
            </TextRoll>
          </Link>
          <Link href="#contact" className="group">
            <TextRoll className="text-sm font-medium group-hover:text-primary transition-colors">
              Contact
            </TextRoll>
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
        <div className="md:hidden bg-background">
          <div className="container px-4 py-4 flex flex-col gap-4">
            <Link
              href="/marketing-research"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/use-cases"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Solutions
            </Link>
            <Link
              href="/travel-arrangement"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Travel
            </Link>
            <Link
              href="/drone-pilot-service"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Drones
            </Link>
            <Link
              href="#services"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
};

export { Header };
