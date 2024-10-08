import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import KakaoInit from "@/components/common/KakaoInit";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "ABNB | Marketplace for Airbnb & Real Estate Rentals",
  description:
    "Discover the best Airbnb and real estate rentals. Explore properties, buy memberships, and manage listings easily with our marketplace SaaS app.",
  keywords:
    "Airbnb, real estate, rentals, marketplace, properties, memberships, buy, sell, SaaS",
  authors: [{ name: "ABNB" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "ABNB | Marketplace for Airbnb & Real Estate Rentals",
    description:
      "Discover the best Airbnb and real estate rentals. Explore properties, buy memberships, and manage listings easily with our marketplace SaaS app.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ABNB | Marketplace for Airbnb & Real Estate Rentals",
    description:
      "Discover the best Airbnb and real estate rentals. Explore properties, buy memberships, and manage listings easily with our marketplace SaaS app.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <html lang="en">
        <head>
          <KakaoInit />
        </head>
        <body className={`${poppins.variable} relative`}>
          {/* <CustomCursor /> */}
          {children}
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
