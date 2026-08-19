"use client";

import Link from "next/link";

const CATEGORIES = [
  {
    name: "Developer Tools",
    tools: [
      { name: "Base64", path: "/tools/base64" },
      { name: "CSV to JSON", path: "/tools/csv-to-json" },
      { name: "HTML CSS JS Minify", path: "/tools/html-css-js-minify" },
      { name: "HTML Encoder Decoder", path: "/tools/html-encoder-decoder" },
      { name: "HTML Formatter", path: "/tools/html-formatter" },
      { name: "JSON Formatter", path: "/tools/json-formatter" },
      { name: "JSON to CSV", path: "/tools/json-to-csv" },
      { name: "JSON Validator", path: "/tools/json-validator" },
      { name: "Lorem Ipsum Generator", path: "/tools/lorem-ipsum-generator" },
      { name: "Password Generator", path: "/tools/password-generator" },
      { name: "Regex Tester", path: "/tools/regex-tester" },
      { name: "SQL Formatter", path: "/tools/sql-formatter" },
      { name: "Timestamp Converter", path: "/tools/timestamp-converter" },
      { name: "URL Encoder Decoder", path: "/tools/url-encoder-decoder" },
      { name: "UUID Generator", path: "/tools/uuid-generator" },
      { name: "XML Formatter", path: "/tools/xml-formatter" },
      { name: "YAML Formatter", path: "/tools/yaml-formatter" },
    ],
  },
  {
    name: "Finance Tools",
    tools: [],
  },
  {
    name: "SEO Tools",
    tools: [],
  },
  {
    name: "AI Tools",
    tools: [],
  },
  {
    name: "PDF Tools",
    tools: [],
  },
  {
    name: "Image Tools",
    tools: [],
  },
  {
    name: "Text Tools",
    tools: [],
  },
  {
    name: "Student Tools",
    tools: [],
  },
];

export default function InteligloHomepage() {
  const active = CATEGORIES.filter((c) => c.tools.length > 0);

  return (
    <section className="ig">
      <div className="ig-inner">
        <p className="ig-eyebrow">Inteliglo</p>
        <h1>Tools</h1>

        {active.map((category) => (
          <div className="ig-category" key={category.name}>
            <p className="ig-category-label">{category.name}</p>

            <div className="ig-list">
              {category.tools.map((tool) => (
                <Link href={tool.path} className="ig-item" key={tool.path}>
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`

          
      `}</style>
    </section>
  );
}