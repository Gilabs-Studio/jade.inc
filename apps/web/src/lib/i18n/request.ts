import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

type Locale = "en" | "id" | "tl";

const importMessages = async (feature: string, locale: Locale) => {
  switch (locale) {
    case "en":
      return (await import(`@/src/features/${feature}/messages/en.json`))
        .default;
    case "id":
      return (await import(`@/src/features/${feature}/messages/id.json`))
        .default;
    case "tl":
      return (await import(`@/src/features/${feature}/messages/tl.json`))
        .default;
    default:
      return (await import(`@/src/features/${feature}/messages/en.json`))
        .default;
  }
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  const validLocale = locale as Locale;

  // Import messages from all features
  const [
    landingMessages,
    marketingResearchMessages,
    useCasesMessages,
    travelArrangementMessages,
    dronePilotServiceMessages,
  ] = await Promise.all([
    importMessages("landing", validLocale),
    importMessages("marketing-research", validLocale),
    importMessages("use-cases", validLocale),
    importMessages("travel-arrangement", validLocale),
    importMessages("drone-pilot-service", validLocale),
  ]);

  // Merge messages
  const messages = {
    ...landingMessages,
    marketingResearch: marketingResearchMessages,
    useCasesPage: useCasesMessages,
    travelArrangement: travelArrangementMessages,
    dronePilotService: dronePilotServiceMessages,
  };

  return {
    locale,
    messages,
  };
});
