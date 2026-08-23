"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

const STOP_WORDS = new Set([
    "a", "an", "the", "and", "or", "but", "is", "are", "was", "were", "in", "on",
    "at", "to", "for", "of", "with", "by", "from", "up", "about", "into", "over",
    "after", "as", "it", "this", "that", "be", "been", "being",
]);

function slugify(input, { separator, removeStopWords, removeNumbers, lowercase, maxLength }) {
    if (!input) return "";

    let str = input.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");

    if (lowercase) str = str.toLowerCase();
    if (removeNumbers) str = str.replace(/[0-9]+/g, "");

    let words = str
        .replace(/['']/g, "")
        .split(/[^a-zA-Z0-9]+/)
        .filter(Boolean);

    if (removeStopWords) {
        words = words.filter((w) => !STOP_WORDS.has(w.toLowerCase()));
    }

    let slug = words.join(separator);

    if (maxLength > 0 && slug.length > maxLength) {
        slug = slug.slice(0, maxLength);
        const lastSep = separator ? slug.lastIndexOf(separator) : -1;
        if (lastSep > 0) slug = slug.slice(0, lastSep);
    }

    return slug;
}

export default function Page() {
    const [input, setInput] = useState("");
    const [separator, setSeparator] = useState("-");
    const [removeStopWords, setRemoveStopWords] = useState(false);
    const [removeNumbers, setRemoveNumbers] = useState(false);
    const [lowercase, setLowercase] = useState(true);
    const [maxLength, setMaxLength] = useState(0);
    const [copied, setCopied] = useState(false);

    const slug = useMemo(() => {
        return slugify(input, { separator, removeStopWords, removeNumbers, lowercase, maxLength });
    }, [input, separator, removeStopWords, removeNumbers, lowercase, maxLength]);

    const handleCopy = async () => {
        if (!slug) return;
        try {
            await navigator.clipboard.writeText(slug);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // ignore
        }
    };

    const handleClear = () => setInput("");

    const handleReset = () => {
        setInput("");
        setSeparator("-");
        setRemoveStopWords(false);
        setRemoveNumbers(false);
        setLowercase(true);
        setMaxLength(0);
    };

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Developer" />
                <h1 style={{ textAlign: "center" }}>Slugify — URL Slug Generator</h1>

                {/* INPUT — highlighted */}
                <div className="ig-category">
                    <p className="ig-category-label">Input String</p>
                    <textarea
                        className="ig-input"
                        style={{
                            width: "100%",
                            padding: "16px",
                            fontSize: 18,
                            minHeight: 70,
                            resize: "vertical",
                            border: "2px solid #3b82f6",
                            borderRadius: 10,
                            boxShadow: "0 0 0 3px rgba(59,130,246,0.15)",
                            fontFamily: "inherit",
                        }}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g. How to Build a REST API in Node.js"
                        autoFocus
                    />
                </div>

                {/* OUTPUT — highlighted, directly below input, no scroll needed */}
                <div className="ig-category">
                    <p className="ig-category-label">Output — Clean URL Slug</p>
                    <div
                        style={{
                            width: "100%",
                            padding: "16px",
                            fontSize: 18,
                            fontFamily: "monospace",
                            fontWeight: 600,
                            minHeight: 24,
                            border: "2px solid #22c55e",
                            borderRadius: 10,
                            boxShadow: "0 0 0 3px rgba(34,197,94,0.15)",
                            background: "rgba(34,197,94,0.06)",
                            color: "#16a34a",
                            wordBreak: "break-all",
                        }}
                    >
                        {slug || "—"}
                    </div>
                </div>

                {/* COPY — right under output, always visible */}
                <button
                    className="ig-item ig-metal-btn"
                    style={{ width: "100%", padding: "14px", fontSize: 16, fontWeight: 700 }}
                    onClick={handleCopy}
                    disabled={!slug}
                >
                    {copied ? "Copied ✓" : "Copy Slug"}
                </button>

                {slug && (
                    <p style={{ fontSize: 12, color: "#888", marginTop: 8, fontFamily: "monospace" }}>
                        yoursite.com/{slug} · {slug.length} characters
                    </p>
                )}

                {/* OPTIONS — below input/output/copy */}
                <div className="ig-category" style={{ marginTop: 28 }}>
                    <p className="ig-category-label">Separator</p>
                    <div className="ig-list" style={{ display: "flex", gap: 8, gridTemplateColumns: "unset" }}>
                        <button className={`ig-item ig-metal-btn${separator === "-" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setSeparator("-")}>Dash (-)</button>
                        <button className={`ig-item ig-metal-btn${separator === "_" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setSeparator("_")}>Underscore (_)</button>
                        <button className={`ig-item ig-metal-btn${separator === "" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setSeparator("")}>None</button>
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Options</p>
                    <div className="ig-list" style={{ display: "flex", flexDirection: "column", gap: 10, gridTemplateColumns: "unset" }}>
                        <CheckboxRow label="Lowercase" checked={lowercase} onChange={setLowercase} />
                        <CheckboxRow label="Remove stop words (a, the, and, of...)" checked={removeStopWords} onChange={setRemoveStopWords} />
                        <CheckboxRow label="Remove numbers" checked={removeNumbers} onChange={setRemoveNumbers} />
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Max Length (0 = no limit)</p>
                    <div className="ig-field">
                        <input
                            className="ig-input"
                            type="number"
                            min={0}
                            max={200}
                            step={5}
                            value={maxLength}
                            onChange={(e) => setMaxLength(e.target.value === "" ? 0 : Number(e.target.value))}
                        />
                        <span className="ig-field-suffix">characters</span>
                    </div>
                </div>

                <div className="ig-category" style={{ display: "flex", gap: 10, gridTemplateColumns: "unset" }}>
                    <button className="ig-item ig-metal-btn" style={{ flex: 1 }} onClick={handleClear}>Clear</button>
                    <button className="ig-item ig-metal-btn" style={{ flex: 1 }} onClick={handleReset}>Reset</button>
                </div>

                <p style={disclaimerStyle}>
                    Strips accents/diacritics, converts to lowercase (optional), and replaces spaces/
                    special characters with your chosen separator — producing a clean, SEO-friendly URL
                    slug. Works entirely in your browser; nothing is sent to a server.
                </p>
            </div>
        </div>
    );
}

function CheckboxRow({ label, checked, onChange }) {
    return (
        <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "8px 0" }}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                style={{ width: 18, height: 18, cursor: "pointer" }}
            />
            <span>{label}</span>
        </label>
    );
}

const disclaimerStyle = {
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 11,
    color: "#666",
    lineHeight: 1.6,
    marginTop: 32,
    textAlign: "center",
};