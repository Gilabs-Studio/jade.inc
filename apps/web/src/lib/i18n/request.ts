import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "en" | "id")) {
    locale = routing.defaultLocale;
  }

  const messages =
    locale === "en"
      ? (await import("@/src/features/landing/messages/en.json")).default
      : (await import("@/src/features/landing/messages/id.json")).default;

  return {
    locale,
    messages,
  };
});
