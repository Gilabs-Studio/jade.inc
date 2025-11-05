"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/src/lib/i18n";
import { useLocale } from "next-intl";

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: "en" | "id") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-2 border rounded-lg p-1">
      <Button
        variant={locale === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => switchLocale("en")}
        className="h-8 px-3 text-xs"
      >
        EN
      </Button>
      <Button
        variant={locale === "id" ? "default" : "ghost"}
        size="sm"
        onClick={() => switchLocale("id")}
        className="h-8 px-3 text-xs"
      >
        ID
      </Button>
    </div>
  );
};

export { LanguageSwitcher };
