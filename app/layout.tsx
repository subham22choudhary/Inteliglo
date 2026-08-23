import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.inteliglo.com"),
  title: {
    default: "Inteliglo – Free Online Tools & Calculators",
    template: "%s | Inteliglo",
  },
  description:
    "Inteliglo provides free online calculators, developer tools, travel tools, converters, and productivity tools.",
  applicationName: "Inteliglo",
  authors: [{ name: "Inteliglo", url: "https://www.inteliglo.com" }],
  creator: "Inteliglo",
  publisher: "Inteliglo",
  keywords: [
    "online tools",
    "free online tools",
    "online calculators",
    "developer tools",
    "travel tools",
    "converters",
    "productivity tools",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.inteliglo.com",
    siteName: "Inteliglo",
    title: "Inteliglo – Free Online Tools & Calculators",
    description:
      "Free online calculators, developer tools, travel tools, converters, and productivity tools.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inteliglo – Free Online Tools & Calculators",
    description:
      "Free online calculators, developer tools, travel tools, converters, and productivity tools.",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&family=Syne:wght@800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
