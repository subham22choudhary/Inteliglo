import fs from "fs";
import path from "path";
import Link from "next/link";
import OnlineUsersBadge from "./OnlineUsersBadge";

function formatLabel(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function getCategories() {
  const toolsDir = path.join(process.cwd(), "app", "tools");

  let categoryFolders = [];
  try {
    categoryFolders = fs
      .readdirSync(toolsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory());
  } catch {
    return [];
  }

  return categoryFolders
    .map((catDir) => {
      const catPath = path.join(toolsDir, catDir.name);
      const toolFolders = fs
        .readdirSync(catPath, { withFileTypes: true })
        .filter((d) => d.isDirectory());

      const tools = toolFolders.map((toolDir) => ({
        name: formatLabel(toolDir.name),
        path: `/tools/${catDir.name}/${toolDir.name}`,
      }));

      return {
        name: formatLabel(catDir.name),
        tools: tools.sort((a, b) => a.name.localeCompare(b.name)),
      };
    })
    .filter((cat) => cat.tools.length > 0);
}

// Yeh Server Component hai — HeroSection isko default export karega.
// Yahi crawling ka pura kaam hai, koi hardcoding nahi.
export default function HeroSection() {
  const categories = getCategories();

  return (
    <section className="ig">
      <div className="ig-inner">
        <div className="ig-top">
          <p className="ig-eyebrow">Inteliglo</p>
          <OnlineUsersBadge />
        </div>

        <h1>Tools</h1>

        {categories.map((category) => (
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
        .ig-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .ig-live { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #2fae5c; background: rgba(47,174,92,0.1); border: 1px solid rgba(47,174,92,0.25); padding: 4px 10px; border-radius: 999px; white-space: nowrap; }
        .ig-live-dot { width: 7px; height: 7px; border-radius: 50%; background: #2fae5c; animation: ig-pulse 2s infinite; }
        @keyframes ig-pulse { 0% { box-shadow: 0 0 0 0 rgba(47,174,92,0.5);} 70% { box-shadow: 0 0 0 6px rgba(47,174,92,0);} 100% { box-shadow: 0 0 0 0 rgba(47,174,92,0);} }
      `}</style>
    </section>
  );
}