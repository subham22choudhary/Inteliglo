import fs from "fs";
import path from "path";
import Link from "next/link";
import OnlineUsersBadge from "./OnlineUsersBadge";
import { toolSEO } from "../lib/seo/tools";

function formatLabel(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function findToolFolders(dir, base = "") {
  let results = [];
  let entries;

  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    console.error("Error reading dir:", dir, err.message);
    return results;
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const fullPath = path.join(dir, entry.name);
    const relPath = base
      ? `${base}/${entry.name}`
      : entry.name;

    const pagePath = path.join(fullPath, "page.jsx");

    if (fs.existsSync(pagePath)) {
      results.push({
        pagePath,
        relPath,
      });
    } else {
      results = results.concat(
        findToolFolders(fullPath, relPath)
      );
    }
  }

  return results;
}

/**
 * Convert folder category into the same category used by SEO.
 *
 * Example:
 * air-travel-tools → Air Travel Tools
 * finance-tools    → Finance Tools
 * developer-tools  → Developer Tools
 */
const CATEGORY_NAMES = {
  "air-travel-tools": "Air Travel Tools",
  "developer-tools": "Developer Tools",
  "education-tools": "Education Tools",
  "finance-tools": "Finance Tools",
  "health-tools": "Health Tools",
  "real-estate-tools": "Real Estate Tools",
  "realestate-tools": "Real Estate Tools",
  "transport-tools": "Transport Tools",
  "utility-tools": "Utility Tools",
};

function getCategoryFromPath(relPath) {
  const categorySlug = relPath.split("/")[0];

  return (
    CATEGORY_NAMES[categorySlug] ||
    "Tools"
  );
}

function getTagsData() {
  const toolsDir = path.join(
    process.cwd(),
    "app",
    "tools"
  );

  const toolFolders = findToolFolders(toolsDir);

  const categoryMap = {};

  for (const { relPath } of toolFolders) {
    const slug = relPath.split("/").pop();

    /*
     * Get SEO information from the centralized
     * tools.ts file.
     */
    const seo = toolSEO[slug];

    /*
     * Category comes from tools.ts first.
     * If a tool is missing there, fall back
     * to its folder name.
     */
    const category =
      seo?.category ||
      getCategoryFromPath(relPath);

    /*
     * Tool name comes from SEO data first.
     * Otherwise generate it from the slug.
     */
    const name =
      seo?.name ||
      formatLabel(slug);

    /*
     * Use SEO path when available.
     * Otherwise generate the path from folder structure.
     */
    const toolPath =
      seo?.path ||
      `/tools/${relPath}`;

    if (!categoryMap[category]) {
      categoryMap[category] = [];
    }

    categoryMap[category].push({
      name,
      path: toolPath,
    });
  }

  return Object.entries(categoryMap)
    .map(([name, tools]) => ({
      name,
      tools: tools.sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
    }))
    .sort((a, b) =>
      a.name.localeCompare(b.name)
    );
}

export default function HeroSection() {
  const categories = getTagsData();

  if (categories.length === 0) {
    return (
      <section className="ig">
        <div className="ig-inner">
          <p>
            Koi tools nahi mile — check karo
            app/tools folder aur SEO configuration.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="ig">
      <div className="ig-inner">

        <div className="ig-top">
          <p className="ig-eyebrow">
            Inteliglo
          </p>

          <OnlineUsersBadge />
        </div>

        <h1>Tools</h1>

        {categories.map((category) => (
          <div
            className="ig-category"
            key={category.name}
          >
            <p className="ig-category-label">
              {category.name}
            </p>

            <div className="ig-list">
              {category.tools.map((tool) => (
                <Link
                  href={tool.path}
                  className="ig-item"
                  key={tool.path}
                >
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
          background: rgba(47,174,92,0.1);
          border: 1px solid rgba(47,174,92,0.25);
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
          0% {
            box-shadow:
              0 0 0 0 rgba(47,174,92,0.5);
          }

          70% {
            box-shadow:
              0 0 0 6px rgba(47,174,92,0);
          }

          100% {
            box-shadow:
              0 0 0 0 rgba(47,174,92,0);
          }
        }
      `}</style>
    </section>
  );
}