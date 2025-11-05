import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jade Inc",
  description: "Marketing Research and Coordination Partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
