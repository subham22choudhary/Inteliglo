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

// Extract `export const meta = {...}` block from page.jsx as plain text
// (no require/import — avoids "use client" / JSX execution issues)
function extractMeta(fileContent) {
  const match = fileContent.match(/export\s+const\s+meta\s*=\s*(\{[\s\S]*?\})\s*;/);
  if (!match) return null;

  try {
    // meta object is plain JS (strings/arrays), safe to eval in isolation
    // eslint-disable-next-line no-new-func
    const metaObj = new Function(`return ${match[1]}`)();
    return metaObj;
  } catch (err) {
    console.error("Failed to parse meta block:", err.message);
    return null;
  }
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
    const relPath = base ? `${base}/${entry.name}` : entry.name;
    const pagePath = path.join(fullPath, "page.jsx");

    if (fs.existsSync(pagePath)) {
      results.push({ pagePath, relPath });
    } else {
      // keep walking (for category subfolders like finance-tools/)
      results = results.concat(findToolFolders(fullPath, relPath));
    }
  }

  return results;
}

function getTagsData() {
  const toolsDir = path.join(process.cwd(), "app", "tools");
  const toolFolders = findToolFolders(toolsDir);

  const tagMap = {};

  for (const { pagePath, relPath } of toolFolders) {
    let meta = null;
    try {
      const content = fs.readFileSync(pagePath, "utf-8");
      meta = extractMeta(content);
    } catch (err) {
      console.error("Error reading page:", relPath, err.message);
    }

    const slug = relPath.split("/").pop();
    const name = meta?.name || formatLabel(slug);
    const tags = meta?.tags?.length ? meta.tags : ["Uncategorized"];
    const toolPath = `/tools/${relPath}`;

    for (const tag of tags) {
      if (!tagMap[tag]) tagMap[tag] = [];
      tagMap[tag].push({ name, path: toolPath });
    }
  }

  return Object.entries(tagMap)
    .map(([tag, tools]) => ({
      name: tag,
      tools: tools.sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default function HeroSection() {
  const categories = getTagsData();

  if (categories.length === 0) {
    return (
      <section className="ig">
        <div className="ig-inner">
          <p>Koi tools nahi mile — check karo page.jsx mein meta export hai ya nahi, aur terminal console error dekho.</p>
        </div>
      </section>
    );
  }

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