import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
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

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NS865D2R');`}
        </Script>

        {/* Google tag (gtag.js) - GA4 */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MWWL3B5EKW"
          strategy="afterInteractive"
        />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MWWL3B5EKW');`}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="clarity-script" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "u0dx9fa0am");`}
        </Script>
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NS865D2R"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}