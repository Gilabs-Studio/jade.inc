"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/src/lib/i18n";
import { useLocale } from "next-intl";
import { routing } from "@/src/lib/i18n/routing";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type Locale = (typeof routing.locales)[number];

const languages: Record<Locale, { code: Locale; label: string; flag: string }> = {
  en: { code: "en", label: "English", flag: "/icon/english-flag.svg" },
  id: { code: "id", label: "Bahasa Indonesia", flag: "/icon/indonesia-flag.svg" },
  tl: { code: "tl", label: "Tagalog", flag: "/icon/philippines-flag.svg" },
};

const LanguageSwitcher = () => {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const currentLanguage = languages[locale];

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 px-3 gap-2"
      >
        <Image
          src={currentLanguage.flag}
          alt={currentLanguage.label}
          width={20}
          height={15}
          className="w-5 h-auto rounded-sm"
        />
        <span className="text-xs hidden sm:inline">{currentLanguage.label}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-background border rounded-md shadow-lg z-50 overflow-hidden">
          {routing.locales.map((loc) => {
            const lang = languages[loc];
            const isActive = locale === loc;
            return (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-accent ${
                  isActive ? "bg-accent font-medium" : ""
                }`}
              >
                <Image
                  src={lang.flag}
                  alt={lang.label}
                  width={20}
                  height={15}
                  className="w-5 h-auto rounded-sm flex-shrink-0"
                />
                <span className="text-left">{lang.label}</span>
                {isActive && (
                  <svg
                    className="w-4 h-4 ml-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export { LanguageSwitcher };
