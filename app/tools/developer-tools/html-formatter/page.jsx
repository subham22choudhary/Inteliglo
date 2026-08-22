"use client";

import { useState } from "react";

export const meta = {
    tags: ["Developer Tools"],
};

const VOID_ELEMENTS = new Set([
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
]);

function formatHTML(html, indentUnit) {
    const tokens = html.match(/<!--[\s\S]*?-->|<!DOCTYPE[^>]*>|<\/?[^>]+>|[^<]+/gi) || [];
    let depth = 0;
    const out = [];

    tokens.forEach((rawToken) => {
        const token = rawToken.trim();
        if (!token) return;

        if (token.startsWith("<!--") || /^<!DOCTYPE/i.test(token)) {
            out.push(indentUnit.repeat(depth) + token);
            return;
        }
        if (token.startsWith("</")) {
            depth = Math.max(0, depth - 1);
            out.push(indentUnit.repeat(depth) + token);
            return;
        }
        if (token.startsWith("<")) {
            const tagNameMatch = token.match(/^<([a-zA-Z0-9-]+)/);
            const tagName = tagNameMatch ? tagNameMatch[1].toLowerCase() : "";
            const isSelfClosing = /\/>$/.test(token) || VOID_ELEMENTS.has(tagName);
            out.push(indentUnit.repeat(depth) + token);
            if (!isSelfClosing) depth++;
            return;
        }
        const text = token.replace(/\s+/g, " ").trim();
        if (text) out.push(indentUnit.repeat(depth) + text);
    });

    return out.join("\n");
}

/* ---------- CSS formatter ---------- */
function formatCSS(css, indentUnit) {
    let clean = css
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m) // keep comments as-is for now
        .replace(/\s+/g, " ")
        .trim();

    let depth = 0;
    let out = "";
    let i = 0;

    while (i < clean.length) {
        const char = clean[i];

        if (char === "/" && clean[i + 1] === "*") {
            const end = clean.indexOf("*/", i + 2);
            const comment = end === -1 ? clean.slice(i) : clean.slice(i, end + 2);
            out += indentUnit.repeat(depth) + comment.trim() + "\n";
            i += comment.length;
            continue;
        }

        if (char === "{") {
            out = out.replace(/[ \t]+$/, "");
            out += " {\n";
            depth++;
            i++;
            continue;
        }

        if (char === "}") {
            depth = Math.max(0, depth - 1);
            out = out.replace(/[ \t]+$/, "");
            out += indentUnit.repeat(depth) + "}\n";
            i++;
            // skip following space
            while (clean[i] === " ") i++;
            continue;
        }

        if (char === ";") {
            out = out.replace(/[ \t]+$/, "");
            out += ";\n";
            i++;
            while (clean[i] === " ") i++;
            continue;
        }

        // start of a new line (selector or declaration)
        if (out.endsWith("\n") || out === "") {
            out += indentUnit.repeat(depth);
        }

        out += char;
        i++;
    }

    return out
        .split("\n")
        .map((line) => line.replace(/\s+$/, ""))
        .filter((line, idx, arr) => !(line === "" && arr[idx - 1] === ""))
        .join("\n")
        .trim();
}

/* ---------- JS formatter (lightweight, bracket-based) ---------- */
function formatJS(js, indentUnit) {
    let result = "";
    let depth = 0;
    let inString = null;
    let inTemplate = false;
    let inLineComment = false;
    let inBlockComment = false;

    const src = js;
    let i = 0;

    while (i < src.length) {
        const char = src[i];
        const next = src[i + 1];

        if (inLineComment) {
            result += char;
            if (char === "\n") inLineComment = false;
            i++;
            continue;
        }
        if (inBlockComment) {
            result += char;
            if (char === "*" && next === "/") {
                result += next;
                i += 2;
                inBlockComment = false;
                continue;
            }
            i++;
            continue;
        }
        if (inString) {
            result += char;
            if (char === "\\") {
                result += next;
                i += 2;
                continue;
            }
            if (char === inString) inString = null;
            i++;
            continue;
        }

        if (char === "/" && next === "/") {
            inLineComment = true;
            result += char;
            i++;
            continue;
        }
        if (char === "/" && next === "*") {
            inBlockComment = true;
            result += char;
            i++;
            continue;
        }
        if (char === '"' || char === "'" || char === "`") {
            inString = char;
            result += char;
            i++;
            continue;
        }

        if (char === "{" || char === "(" || char === "[") {
            result = result.replace(/[ \t]+$/, "");
            result += char + "\n" + indentUnit.repeat(depth + 1);
            depth++;
            i++;
            // skip whitespace after
            while (/\s/.test(src[i]) && src[i] !== "\n") i++;
            continue;
        }

        if (char === "}" || char === ")" || char === "]") {
            depth = Math.max(0, depth - 1);
            result = result.replace(/[ \t]*$/, "");
            result = result.replace(/\n[ \t]*$/, "\n" + indentUnit.repeat(depth));
            result += char;
            i++;
            continue;
        }

        if (char === ";") {
            result += char + "\n" + indentUnit.repeat(depth);
            i++;
            while (/\s/.test(src[i]) && src[i] !== "\n") i++;
            continue;
        }

        if (char === "\n") {
            result = result.replace(/[ \t]+$/, "");
            result += "\n" + indentUnit.repeat(depth);
            i++;
            while (/\s/.test(src[i]) && src[i] !== "\n") i++;
            continue;
        }

        result += char;
        i++;
    }

    return result
        .split("\n")
        .map((line) => line.replace(/\s+$/, ""))
        .filter((line, idx, arr) => !(line.trim() === "" && arr[idx - 1] !== undefined && arr[idx - 1].trim() === ""))
        .join("\n")
        .trim();
}

const TABS = [
    { id: "html", label: "HTML", placeholder: "Paste your HTML here...", formatter: formatHTML },
    { id: "css", label: "CSS", placeholder: "Paste your CSS here...", formatter: formatCSS },
    { id: "js", label: "JavaScript", placeholder: "Paste your JavaScript here...", formatter: formatJS },
];

export default function Page() {
    const [activeTab, setActiveTab] = useState("html");
    const [inputs, setInputs] = useState({ html: "", css: "", js: "" });
    const [outputs, setOutputs] = useState({ html: "", css: "", js: "" });
    const [indentSize, setIndentSize] = useState("2");
    const [status, setStatus] = useState("");

    const current = TABS.find((t) => t.id === activeTab);
    const getIndent = () => (indentSize === "tab" ? "\t" : " ".repeat(Number(indentSize)));

    const handleInputChange = (value) => {
        setInputs((prev) => ({ ...prev, [activeTab]: value }));
    };

    const handleFormat = () => {
        const value = inputs[activeTab];
        if (!value.trim()) {
            setStatus("Nothing to format.");
            return;
        }
        try {
            const formatted = current.formatter(value, getIndent());
            setOutputs((prev) => ({ ...prev, [activeTab]: formatted }));
            setStatus(`${current.label} formatted successfully.`);
        } catch {
            setStatus(`Error formatting ${current.label}.`);
        }
    };

    const handleCopy = async () => {
        const value = outputs[activeTab];
        if (!value) {
            setStatus("Nothing to copy.");
            return;
        }
        try {
            await navigator.clipboard.writeText(value);
            setStatus("Copied to clipboard.");
        } catch {
            setStatus("Copy failed — select and copy manually.");
        }
    };

    const handleClear = () => {
        setInputs((prev) => ({ ...prev, [activeTab]: "" }));
        setOutputs((prev) => ({ ...prev, [activeTab]: "" }));
        setStatus("");
    };

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>Code Formatter</h1>

                {/* Tabs */}
                <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginBottom: 32 }}>
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            className="ig-item"
                            style={
                                activeTab === tab.id
                                    ? {}
                                    : { background: "transparent", color: "#f5f5f0", border: "1px solid #333" }
                            }
                            onClick={() => {
                                setActiveTab(tab.id);
                                setStatus("");
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Input — {current.label}</p>
                    <textarea
                        value={inputs[activeTab]}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder={current.placeholder}
                        style={textareaStyle}
                    />
                </div>

                <div style={controlsStyle}>
                    <label style={labelStyle}>
                        Indent
                        <select
                            value={indentSize}
                            onChange={(e) => setIndentSize(e.target.value)}
                            style={selectStyle}
                        >
                            <option value="2">2 spaces</option>
                            <option value="4">4 spaces</option>
                            <option value="tab">Tab</option>
                        </select>
                    </label>
                </div>

                <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <button className="ig-item" onClick={handleFormat}>Format</button>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleCopy}>Copy</button>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleClear}>Clear</button>
                </div>
                <p style={statusStyle}>{status}</p>

                <div className="ig-category" style={{ marginTop: 48 }}>
                    <p className="ig-category-label">Output — {current.label}</p>
                    <textarea
                        value={outputs[activeTab]}
                        readOnly
                        placeholder="Formatted code will appear here..."
                        style={textareaStyle}
                    />
                </div>
            </div>
        </div>
    );
}

const textareaStyle = {
    width: "100%",
    boxSizing: "border-box",
    minHeight: 260,
    background: "#141414",
    color: "#f5f5f0",
    border: "1px solid #262626",
    borderRadius: 2,
    padding: 18,
    fontFamily: "'Courier New', monospace",
    fontSize: 13,
    lineHeight: 1.6,
    resize: "vertical",
};

const controlsStyle = {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    margin: "22px 0 8px",
    alignItems: "center",
    fontFamily: "Helvetica, Arial, sans-serif",
};

const labelStyle = {
    fontSize: 12,
    letterSpacing: 1,
    color: "#a8a89c",
    display: "flex",
    alignItems: "center",
    gap: 6,
};

const selectStyle = {
    background: "#141414",
    color: "#f5f5f0",
    border: "1px solid #262626",
    borderRadius: 2,
    padding: "6px 10px",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 12,
};

const secondaryBtnStyle = {
    background: "transparent",
    color: "#f5f5f0",
    border: "1px solid #333",
};

const statusStyle = {
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 12,
    letterSpacing: 1,
    color: "#c9a900",
    marginTop: 10,
    minHeight: 16,
};