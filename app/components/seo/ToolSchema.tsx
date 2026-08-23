interface ToolSchemaProps {
  name: string;
  description: string;
  url: string;
  category: string;
}

export default function ToolSchema({
  name,
  description,
  url,
  category,
}: ToolSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory: category,
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "Inteliglo",
      url: "https://www.inteliglo.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
