import type { Metadata } from "next";

interface ToolMetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  category: string;
  path: string;
}

export function createToolMetadata({
  title,
  description,
  keywords = [],
  category,
  path,
}: ToolMetadataOptions): Metadata {
  const url = `https://www.inteliglo.com${path}`;

  return {
    title,
    description,
    keywords,
    category,
    alternates: { canonical: url },
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
      siteName: "Inteliglo",
      title,
      description,
      url,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
