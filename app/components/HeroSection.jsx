"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

// If you already create a Supabase client elsewhere in your project
// (e.g. lib/supabase.js), import that instead of making a new one here.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

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
    tools: [
      { name: "Business Loan Calculator", path: "/tools/business-loan-calculator" },
      { name: "Car Loan EMI Calculator", path: "/tools/car-loan-emi-calculator" },
      { name: "Compound Interest Calculator", path: "/tools/compound-interest-calculator" },
      { name: "Education Loan Calculator", path: "/tools/education-loan-calculator" },
      { name: "EMI Calculator", path: "/tools/emi-calculator" },
      { name: "EMI vs Prepayment Calculator", path: "/tools/emi-vs-prepayment-calculator" },
      { name: "FD Calculator", path: "/tools/fd-calculator" },
      { name: "Gold Loan Calculator", path: "/tools/gold-loan-calculator" },
      { name: "GST Calculator", path: "/tools/gst-calculator" },
      { name: "Home Loan EMI Calculator", path: "/tools/home-loan-emi-calculator" },
      { name: "Income Tax Calculator", path: "/tools/income-tax-calculator" },
      { name: "Loan Calculator", path: "/tools/loan-calculator" },
      { name: "Loan Eligibility Calculator", path: "/tools/loan-eligibility-calculator" },
      { name: "Loan Interest Calculator", path: "/tools/loan-interest-calculator" },
      { name: "Loan Tenure Calculator", path: "/tools/loan-tenure-calculator" },
      { name: "Percentage Calculator", path: "/tools/percentage-calculator" },
      { name: "Personal Loan EMI Calculator", path: "/tools/personal-loan-emi-calculator" },
      { name: "PPF Calculator", path: "/tools/ppf-calculator" },
      { name: "Simple Interest Calculator", path: "/tools/simple-interest-calculator" },
      { name: "SIP Calculator", path: "/tools/sip-calculator" },
    ],
  },

  { name: "SEO Tools", tools: [] },
  { name: "AI Tools", tools: [] },
  { name: "PDF Tools", tools: [] },
  { name: "Image Tools", tools: [] },
  { name: "Text Tools", tools: [] },
  { name: "Student Tools", tools: [] },
];

function useLiveOnlineUsers() {
  const [count, setCount] = useState(null); // null = "still connecting"

  useEffect(() => {
    const sessionId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);

    const channel = supabase.channel("online-users", {
      config: { presence: { key: sessionId } },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        setCount(Object.keys(state).length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ online_at: new Date().toISOString() });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return count;
}

export default function InteligloHomepage() {
  const active = CATEGORIES.filter((c) => c.tools.length > 0);
  const onlineUsers = useLiveOnlineUsers();

  return (
    <section className="ig">
      <div className="ig-inner">
        <div className="ig-top">
          <p className="ig-eyebrow">Inteliglo</p>

          <div className="ig-live">
            <span className="ig-live-dot" aria-hidden="true" />
            {onlineUsers === null ? "…" : onlineUsers.toLocaleString()} online now
          </div>
        </div>

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
        .ig-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .ig-live {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #2fae5c;
          background: rgba(47, 174, 92, 0.1);
          border: 1px solid rgba(47, 174, 92, 0.25);
          padding: 4px 10px;
          border-radius: 999px;
          white-space: nowrap;
        }

        .ig-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #2fae5c;
          animation: ig-pulse 2s infinite;
        }

        @keyframes ig-pulse {
          0% { box-shadow: 0 0 0 0 rgba(47, 174, 92, 0.5); }
          70% { box-shadow: 0 0 0 6px rgba(47, 174, 92, 0); }
          100% { box-shadow: 0 0 0 0 rgba(47, 174, 92, 0); }
        }
      `}</style>
    </section>
  );
}