import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "en" | "id")) {
    locale = routing.defaultLocale;
  }

  // Import messages from all features
  const landingMessages =
    locale === "en"
      ? (await import("@/src/features/landing/messages/en.json")).default
      : (await import("@/src/features/landing/messages/id.json")).default;

  const marketingResearchMessages =
    locale === "en"
      ? (await import("@/src/features/marketing-research/messages/en.json"))
          .default
      : (await import("@/src/features/marketing-research/messages/id.json"))
          .default;

  const useCasesMessages =
    locale === "en"
      ? (await import("@/src/features/use-cases/messages/en.json")).default
      : (await import("@/src/features/use-cases/messages/id.json")).default;

  const travelArrangementMessages =
    locale === "en"
      ? (await import("@/src/features/travel-arrangement/messages/en.json"))
          .default
      : (await import("@/src/features/travel-arrangement/messages/id.json"))
          .default;

  // Merge messages
  const messages = {
    ...landingMessages,
    marketingResearch: marketingResearchMessages,
    useCasesPage: useCasesMessages,
    travelArrangement: travelArrangementMessages,
  };

  return {
    locale,
    messages,
  };
});
