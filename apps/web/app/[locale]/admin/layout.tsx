import { AdminLayout } from "@/src/features/admin/components/ui";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Jade Inc",
  description: "Admin dashboard",
};

export default async function AdminLayoutWrapper({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <AdminLayout>{children}</AdminLayout>
    </NextIntlClientProvider>
  );
}

