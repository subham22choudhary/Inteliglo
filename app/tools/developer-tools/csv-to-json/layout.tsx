import type { Metadata } from "next";

import { createToolMetadata } from "../../../lib/seo/metadata";
import { toolSEO } from "../../../lib/seo/tools";

import ToolSchema from "../../../components/seo/ToolSchema";
import BreadcrumbSchema from "../../../components/seo/BreadcrumbSchema";

const seo = toolSEO["csv-to-json"];

export const metadata: Metadata = createToolMetadata({
  title: seo.title,
  description: seo.description,
  keywords: [...seo.keywords],
  category: seo.category,
  path: seo.path,
});

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const url = `https://www.inteliglo.com${seo.path}`;

  return (
    <>
      <ToolSchema
        name={seo.name}
        description={seo.description}
        url={url}
        category={seo.applicationCategory}
      />

      <BreadcrumbSchema
        items={[
          {
            name: "Home",
            url: "https://www.inteliglo.com",
          },
          {
            name: "Tools",
            url: "https://www.inteliglo.com/tools",
          },
          {
            name: "Developer Tools",
            url: "https://www.inteliglo.com/tools/developer-tools",
          },
          {
            name: seo.name,
            url,
          },
        ]}
      />

      {children}
    </>
  );
}
