import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SITE_NAME } from "@/lib/brand";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const siteTitle = `${SITE_NAME} | Stay Ahead Of The Market`;
const siteDescription =
  "UK HGV industry reports and weekly operator lead data for fuel, insurance, finance, and fleet sales teams.";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: siteDescription,
  applicationName: SITE_NAME,
  // Link previews in WhatsApp, iMessage and social apps read these.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: siteTitle,
    description: siteDescription,
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
