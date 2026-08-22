"use client";

import { useState } from "react";

export const meta = {
    tags: ["Developer Tools"],
};

const KEYWORDS = [
    "SELECT", "FROM", "WHERE", "AND", "OR", "NOT", "IN", "EXISTS", "BETWEEN", "LIKE", "IS", "NULL",
    "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE", "CREATE", "TABLE", "ALTER", "DROP",
    "JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN", "OUTER JOIN", "CROSS JOIN",
    "ON", "AS", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "OFFSET", "UNION", "UNION ALL",
    "DISTINCT", "CASE", "WHEN", "THEN", "ELSE", "END", "ASC", "DESC", "PRIMARY KEY", "FOREIGN KEY",
    "REFERENCES", "DEFAULT", "CONSTRAINT", "INDEX", "VIEW", "WITH", "RETURNING",
];

const KEYWORD_PATTERN = KEYWORDS
    .slice()
    .sort((a, b) => b.length - a.length)
    .map((k) => k.replace(/\s+/g, "\\s+"))
    .join("|");

const BREAK_BEFORE = [
    "SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "OFFSET",
    "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE", "CREATE", "ALTER", "DROP",
    "JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN", "OUTER JOIN", "CROSS JOIN",
    "UNION", "UNION ALL", "WITH", "RETURNING",
];

function tokenizePreserveStrings(input) {
    // Split into segments, protecting string/quoted-identifier literals from transformation
    const parts = [];
    let i = 0;
    let buf = "";
    const len = input.length;
    while (i < len) {
        const ch = input[i];
        if (ch === "'" || ch === '"' || ch === "`") {
            if (buf) { parts.push({ text: buf, literal: false }); buf = ""; }
            const quote = ch;
            let lit = ch;
            i++;
            while (i < len && input[i] !== quote) {
                lit += input[i];
                i++;
            }
            lit += quote;
            i++;
            parts.push({ text: lit, literal: true });
            continue;
        }
        buf += ch;
        i++;
    }
    if (buf) parts.push({ text: buf, literal: false });
    return parts;
}

function formatSQL(input, { uppercase, indentSize }) {
    if (!input.trim()) return "";

    const indent = " ".repeat(indentSize);
    const kwRegex = new RegExp(`\\b(${KEYWORD_PATTERN})\\b`, "gi");

    // Apply keyword casing only outside of string literals
    const segments = tokenizePreserveStrings(input);
    let normalized = segments
        .map((seg) => {
            if (seg.literal) return seg.text;
            return seg.text.replace(kwRegex, (match) =>
                uppercase ? match.toUpperCase() : match.toLowerCase()
            );
        })
        .join("");

    // Collapse excess whitespace (outside literals) before line-breaking
    normalized = tokenizePreserveStrings(normalized)
        .map((seg) => (seg.literal ? seg.text : seg.text.replace(/[ \t\r\n]+/g, " ")))
        .join("")
        .trim();

    // Insert newlines before major clause keywords
    const breakPattern = new RegExp(
        `\\s*\\b(${BREAK_BEFORE.slice().sort((a, b) => b.length - a.length).map((k) => k.replace(/\s+/g, "\\s+")).join("|")})\\b`,
        "gi"
    );
    let withBreaks = tokenizePreserveStrings(normalized)
        .map((seg) => (seg.literal ? seg.text : seg.text.replace(breakPattern, (m, kw) => `\n${kw.toUpperCase() === kw ? kw : kw}`)))
        .join("");

    // Break AND/OR onto new indented lines within WHERE-like clauses, and commas in SELECT lists
    const lines = withBreaks.split("\n").map((line) => line.trim()).filter(Boolean);

    const output = [];
    for (const line of lines) {
        const firstWordMatch = line.match(/^([A-Za-z_]+(?:\s+[A-Za-z_]+)?)/);
        const clause = firstWordMatch ? firstWordMatch[1].toUpperCase() : "";

        if (clause === "SELECT") {
            const rest = line.slice(firstWordMatch[0].length).trim();
            output.push(clause);
            const cols = splitTopLevel(rest, ",");
            cols.forEach((col, idx) => {
                output.push(`${indent}${col.trim()}${idx < cols.length - 1 ? "," : ""}`);
            });
            continue;
        }

        if (clause === "WHERE" || clause === "HAVING" || clause === "ON") {
            const rest = line.slice(clause.length).trim();
            output.push(clause);
            const parts = splitTopLevel(rest, /\b(AND|OR)\b/i, true);
            parts.forEach((p) => output.push(`${indent}${p.trim()}`));
            continue;
        }

        if (clause === "GROUP BY" || clause === "ORDER BY") {
            const rest = line.slice(clause.length).trim();
            output.push(clause);
            const cols = splitTopLevel(rest, ",");
            cols.forEach((col, idx) => {
                output.push(`${indent}${col.trim()}${idx < cols.length - 1 ? "," : ""}`);
            });
            continue;
        }

        output.push(line);
    }

    return output.join("\n");
}

// Splits a string on a top-level delimiter (not inside parentheses), optionally keeping the delimiter as a prefix
function splitTopLevel(str, delimiter, keepDelimiterAsPrefix = false) {
    const result = [];
    let depth = 0;
    let current = "";
    const isRegexDelim = delimiter instanceof RegExp;

    let i = 0;
    while (i < str.length) {
        const ch = str[i];
        if (ch === "(") depth++;
        if (ch === ")") depth--;

        if (depth === 0) {
            if (!isRegexDelim && ch === delimiter) {
                result.push(current);
                current = "";
                i++;
                continue;
            }
            if (isRegexDelim) {
                const remainder = str.slice(i);
                const match = remainder.match(new RegExp(`^\\s*(${delimiter.source})\\b`, "i"));
                if (match) {
                    result.push(current);
                    current = keepDelimiterAsPrefix ? match[1].toUpperCase() + " " : "";
                    i += match[0].length;
                    continue;
                }
            }
        }

        current += ch;
        i++;
    }
    result.push(current);
    return result.filter((s) => s.trim().length > 0);
}

export default function Page() {
    const [input, setInput] = useState(
        "select id, name, email from users where status = 'active' and age > 18 order by name asc;"
    );
    const [output, setOutput] = useState("");
    const [uppercase, setUppercase] = useState(true);
    const [indentSize, setIndentSize] = useState(2);
    const [status, setStatus] = useState("");
    const [statusType, setStatusType] = useState("info");

    const handleFormat = () => {
        try {
            const result = formatSQL(input, { uppercase, indentSize: Number(indentSize) || 2 });
            setOutput(result);
            setStatus("Formatted successfully.");
            setStatusType("success");
        } catch {
            setStatus("Couldn't format that query — check the syntax.");
            setStatusType("error");
        }
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
                <h1 style={{ textAlign: "center" }}>SQL Formatter</h1>

                <div style={controlsStyle}>
                    <label style={checkboxLabelStyle}>
                        <input
                            type="checkbox"
                            checked={uppercase}
                            onChange={(e) => setUppercase(e.target.checked)}
                        />
                        Uppercase keywords
                    </label>

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
                </div>

                <div style={gridStyle}>
                    <div>
                        <p className="ig-category-label">Input</p>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            style={textareaStyle}
                            spellCheck={false}
                            placeholder="Paste your SQL query here…"
                        />
                    </div>
                    <div>
                        <p className="ig-category-label">Output</p>
                        <textarea
                            value={output}
                            readOnly
                            style={{ ...textareaStyle, color: "#c9a900" }}
                            spellCheck={false}
                            placeholder="Formatted SQL will appear here…"
                        />
                    </div>
                </div>

                <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 20 }}>
                    <button className="ig-item" onClick={handleFormat}>Format</button>
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