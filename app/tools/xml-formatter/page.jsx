"use client";

import { useState } from "react";

function stripXMLWhitespace(xml) {
    // Remove whitespace between tags, but preserve it inside text content where meaningful
    return xml.replace(/>\s+</g, "><").trim();
}

function formatXML(input, { indentSize, selfCloseEmpty }) {
    if (!input.trim()) return "";

    let xml = stripXMLWhitespace(input);
    const indent = " ".repeat(indentSize);

    // Tokenize into tags and text nodes
    const tokens = xml.match(/<!\[CDATA\[[\s\S]*?\]\]>|<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<[^>]+>|[^<]+/g) || [];

    let depth = 0;
    const lines = [];
    const voidLike = /\/>\s*$/;
    const closingTag = /^<\/\s*[^>]+>$/;
    const openingTag = /^<[^!?/][^>]*[^/]>$/;
    const declOrComment = /^<\?[\s\S]*?\?>$|^<!--[\s\S]*?-->$|^<!\[CDATA\[[\s\S]*?\]\]>$/;

    for (let raw of tokens) {
        const token = raw.trim();
        if (!token) continue;

        if (declOrComment.test(token)) {
            lines.push(indent.repeat(depth) + token);
            continue;
        }

        if (token.startsWith("<")) {
            if (closingTag.test(token)) {
                depth = Math.max(0, depth - 1);
                lines.push(indent.repeat(depth) + token);
                continue;
            }

            if (voidLike.test(token)) {
                lines.push(indent.repeat(depth) + token);
                continue;
            }

            if (openingTag.test(token)) {
                lines.push(indent.repeat(depth) + token);
                depth++;
                continue;
            }

            // Fallback for anything unmatched
            lines.push(indent.repeat(depth) + token);
            continue;
        }

        // Text node
        const text = token.trim();
        if (text) {
            lines.push(indent.repeat(depth) + text);
        }
    }

    let result = lines.join("\n");

    if (selfCloseEmpty) {
        result = result.replace(/<([a-zA-Z_][\w.-]*)([^>]*)>\s*<\/\1>/g, "<$1$2 />");
    }

    return result;
}

function minifyXML(input) {
    return stripXMLWhitespace(input).replace(/\s{2,}/g, " ");
}

function validateXML(input) {
    if (typeof window === "undefined" || !window.DOMParser) return { valid: true };
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(input, "application/xml");
        const errorNode = doc.querySelector("parsererror");
        if (errorNode) {
            return { valid: false, message: errorNode.textContent.split("\n")[0] };
        }
        return { valid: true };
    } catch {
        return { valid: true };
    }
}

export default function Page() {
    const [input, setInput] = useState(
        `<?xml version="1.0" encoding="UTF-8"?>\n<catalog><book id="bk101"><author>Gambardella, Matthew</author><title>XML Developer's Guide</title><price>44.95</price></book><book id="bk102"><author>Ralls, Kim</author><title>Midnight Rain</title><price>5.95</price></book></catalog>`
    );
    const [output, setOutput] = useState("");
    const [indentSize, setIndentSize] = useState(2);
    const [selfCloseEmpty, setSelfCloseEmpty] = useState(true);
    const [status, setStatus] = useState("");
    const [statusType, setStatusType] = useState("info");

    const handleFormat = () => {
        const check = validateXML(input);
        if (!check.valid) {
            setStatus(`Invalid XML — ${check.message || "check the syntax."}`);
            setStatusType("error");
            return;
        }
        try {
            const result = formatXML(input, { indentSize: Number(indentSize) || 2, selfCloseEmpty });
            setOutput(result);
            setStatus("Formatted successfully.");
            setStatusType("success");
        } catch {
            setStatus("Couldn't format that XML — check the syntax.");
            setStatusType("error");
        }
    };

    const handleMinify = () => {
        const check = validateXML(input);
        if (!check.valid) {
            setStatus(`Invalid XML — ${check.message || "check the syntax."}`);
            setStatusType("error");
            return;
        }
        const result = minifyXML(input);
        setOutput(result);
        const before = input.length;
        const after = result.length;
        const saved = before > 0 ? Math.round((1 - after / before) * 100) : 0;
        setStatus(`Minified: ${before} → ${after} chars (${saved}% smaller).`);
        setStatusType("success");
    };

    const handleCopy = async () => {
        if (!output) {
            setStatus("Nothing to copy.");
            setStatusType("info");
            return;
        }
        try {
            await navigator.clipboard.writeText(output);
            setStatus("Copied to clipboard.");
            setStatusType("success");
        } catch {
            setStatus("Copy failed — select and copy manually.");
            setStatusType("error");
        }
    };

    const handleClear = () => {
        setInput("");
        setOutput("");
        setStatus("Cleared.");
        setStatusType("info");
    };

    const statusColor =
        statusType === "error" ? "#e05a4e" : statusType === "success" ? "#4caf3d" : "#c9a900";

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 900, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>XML Formatter</h1>

                <div style={controlsStyle}>
                    <label style={labelStyle}>
                        Indent
                        <input
                            type="number"
                            min={1}
                            max={8}
                            value={indentSize}
                            onChange={(e) => setIndentSize(e.target.value)}
                            style={numberInputStyle}
                        />
                    </label>

                    <label style={checkboxLabelStyle}>
                        <input
                            type="checkbox"
                            checked={selfCloseEmpty}
                            onChange={(e) => setSelfCloseEmpty(e.target.checked)}
                        />
                        Self-close empty tags
                    </label>
                </div>

                <div style={gridStyle}>
                    <div>
                        <p className="ig-category-label">Input</p>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            style={textareaStyle}
                            spellCheck={false}
                            placeholder="Paste your XML here…"
                        />
                    </div>
                    <div>
                        <p className="ig-category-label">Output</p>
                        <textarea
                            value={output}
                            readOnly
                            style={{ ...textareaStyle, color: "#c9a900" }}
                            spellCheck={false}
                            placeholder="Formatted XML will appear here…"
                        />
                    </div>
                </div>

                <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 20 }}>
                    <button className="ig-item" onClick={handleFormat}>Format</button>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleMinify}>Minify</button>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleCopy}>Copy Output</button>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleClear}>Clear</button>
                </div>
                <p style={{ ...statusStyle, color: statusColor }}>{status}</p>
            </div>
        </div>
    );
}

const controlsStyle = {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
    margin: "0 0 24px",
    alignItems: "center",
    fontFamily: "Helvetica, Arial, sans-serif",
    justifyContent: "center",
};

const labelStyle = {
    fontSize: 12,
    letterSpacing: 1,
    color: "#a8a89c",
    display: "flex",
    alignItems: "center",
    gap: 8,
};

const checkboxLabelStyle = {
    ...labelStyle,
    cursor: "pointer",
};

const numberInputStyle = {
    width: 60,
    background: "#141414",
    color: "#f5f5f0",
    border: "1px solid #262626",
    borderRadius: 2,
    padding: "6px 10px",
    fontFamily: "'Courier New', monospace",
    fontSize: 13,
};

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
};

const textareaStyle = {
    width: "100%",
    minHeight: 280,
    background: "#141414",
    color: "#f5f5f0",
    border: "1px solid #262626",
    borderRadius: 2,
    padding: "12px 14px",
    fontFamily: "'Courier New', monospace",
    fontSize: 13,
    lineHeight: 1.5,
    resize: "vertical",
    boxSizing: "border-box",
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
    marginTop: 10,
    minHeight: 16,
};