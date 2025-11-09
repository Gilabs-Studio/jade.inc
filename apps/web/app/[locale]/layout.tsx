import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/src/lib/i18n/routing";
import { ConditionalLayout } from "./conditional-layout";

export const metadata: Metadata = {
  title: "Jade Inc",
  description:
    "Coordination specialist for field research and arrangement in Indonesia, Philippines and Singapore. We support your business with marketing research, travel arrangement, and drone rental services.",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "id")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ConditionalLayout locale={locale}>
        {children}
      </ConditionalLayout>
    </NextIntlClientProvider>
  );
}
