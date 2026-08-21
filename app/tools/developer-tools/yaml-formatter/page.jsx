"use client";

import { useState } from "react";

// Lightweight YAML parser: handles nested mappings, sequences, and scalars
// (strings, numbers, booleans, null) with block-style indentation.
// Does not support flow style ({}/[]), anchors, or multi-line scalars.

function stripComment(line) {
    let inSingle = false;
    let inDouble = false;
    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === "'" && !inDouble) inSingle = !inSingle;
        else if (ch === '"' && !inSingle) inDouble = !inDouble;
        else if (ch === "#" && !inSingle && !inDouble) {
            if (i === 0 || line[i - 1] === " " || line[i - 1] === "\t") {
                return line.slice(0, i);
            }
        }
    }
    return line;
}

function parseScalar(raw) {
    const val = raw.trim();
    if (val === "" || val === "~" || val.toLowerCase() === "null") return null;
    if (val.toLowerCase() === "true") return true;
    if (val.toLowerCase() === "false") return false;
    if (/^-?\d+$/.test(val)) return parseInt(val, 10);
    if (/^-?\d+\.\d+$/.test(val)) return parseFloat(val);
    if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
    ) {
        return val.slice(1, -1);
    }
    return val;
}

function getIndent(line) {
    const match = line.match(/^(\s*)/);
    return match ? match[1].length : 0;
}

function parseYAML(text) {
    const rawLines = text.split("\n");
    const lines = [];
    for (const raw of rawLines) {
        const noComment = stripComment(raw).replace(/\s+$/, "");
        if (noComment.trim() === "" || noComment.trim() === "---") continue;
        lines.push({ indent: getIndent(noComment), content: noComment.trim() });
    }

    let pos = 0;

    function parseBlock(minIndent) {
        if (pos >= lines.length || lines[pos].indent < minIndent) return null;

        const blockIndent = lines[pos].indent;
        const isSequence = lines[pos].content.startsWith("- ") || lines[pos].content === "-";

        if (isSequence) {
            const arr = [];
            while (pos < lines.length && lines[pos].indent === blockIndent) {
                let content = lines[pos].content;
                if (!content.startsWith("-")) break;
                content = content.slice(1).trim();

                if (content === "") {
                    pos++;
                    const nested = parseBlock(blockIndent + 1);
                    arr.push(nested);
                    continue;
                }

                const colonIdx = findKeyColon(content);
                if (colonIdx !== -1) {
                    // Inline mapping start on the same line as the dash
                    const fakeLine = { indent: blockIndent + 2, content };
                    lines.splice(pos + 1, 0, fakeLine);
                    pos++;
                    const obj = parseBlock(blockIndent + 2);
                    arr.push(obj);
                    continue;
                }

                arr.push(parseScalar(content));
                pos++;
            }
            return arr;
        }

        const obj = {};
        while (pos < lines.length && lines[pos].indent === blockIndent) {
            const content = lines[pos].content;
            const colonIdx = findKeyColon(content);
            if (colonIdx === -1) {
                pos++;
                continue;
            }
            const key = content.slice(0, colonIdx).trim().replace(/^["']|["']$/g, "");
            const rest = content.slice(colonIdx + 1).trim();
            pos++;

            if (rest === "") {
                const next = pos < lines.length ? lines[pos] : null;
                if (next && next.indent > blockIndent) {
                    obj[key] = parseBlock(next.indent);
                } else {
                    obj[key] = null;
                }
            } else {
                obj[key] = parseScalar(rest);
            }
        }
        return obj;
    }

    function findKeyColon(content) {
        let inSingle = false;
        let inDouble = false;
        for (let i = 0; i < content.length; i++) {
            const ch = content[i];
            if (ch === "'" && !inDouble) inSingle = !inSingle;
            else if (ch === '"' && !inSingle) inDouble = !inDouble;
            else if (ch === ":" && !inSingle && !inDouble) {
                if (i + 1 === content.length || content[i + 1] === " ") return i;
            }
        }
        return -1;
    }

    if (lines.length === 0) return {};
    return parseBlock(lines[0].indent);
}

function needsQuoting(str) {
    if (str === "") return true;
    if (/^[\s]|[\s]$/.test(str)) return true;
    if (/^(true|false|null|~|yes|no)$/i.test(str)) return true;
    if (/^-?\d+(\.\d+)?$/.test(str)) return true;
    if (/[:#\[\]{}&*!|>'"%@`,]/.test(str)) return true;
    return false;
}

function serializeYAML(value, indentSize, depth = 0) {
    const pad = " ".repeat(indentSize * depth);

    if (value === null || value === undefined) return "null";

    if (Array.isArray(value)) {
        if (value.length === 0) return "[]";
        return value
            .map((item) => {
                if (item !== null && typeof item === "object") {
                    const nested = serializeYAML(item, indentSize, depth + 1);
                    const nestedLines = nested.split("\n");
                    const first = nestedLines[0];
                    const restLines = nestedLines.slice(1).join("\n");
                    return `${pad}- ${first}${restLines ? "\n" + restLines : ""}`;
                }
                return `${pad}- ${scalarToString(item)}`;
            })
            .join("\n");
    }

    if (typeof value === "object") {
        const keys = Object.keys(value);
        if (keys.length === 0) return "{}";
        return keys
            .map((key) => {
                const v = value[key];
                if (v !== null && typeof v === "object") {
                    const isEmptyArr = Array.isArray(v) && v.length === 0;
                    const isEmptyObj = !Array.isArray(v) && Object.keys(v).length === 0;
                    if (isEmptyArr) return `${pad}${key}: []`;
                    if (isEmptyObj) return `${pad}${key}: {}`;
                    const nested = serializeYAML(v, indentSize, depth + 1);
                    return `${pad}${key}:\n${nested}`;
                }
                return `${pad}${key}: ${scalarToString(v)}`;
            })
            .join("\n");
    }

    return `${pad}${scalarToString(value)}`;
}

function scalarToString(value) {
    if (value === null || value === undefined) return "null";
    if (typeof value === "boolean") return value ? "true" : "false";
    if (typeof value === "number") return String(value);
    const str = String(value);
    if (needsQuoting(str)) {
        return `"${str.replace(/"/g, '\\"')}"`;
    }
    return str;
}

function formatYAML(input, { indentSize }) {
    const parsed = parseYAML(input);
    return serializeYAML(parsed, indentSize, 0);
}

function yamlToJSON(input) {
    const parsed = parseYAML(input);
    return JSON.stringify(parsed, null, 2);
}

export default function Page() {
    const [input, setInput] = useState(
        `name: John Doe\nage: 32\nactive: true\naddress:\n  city: Springfield\n  zip: "12345"\nhobbies:\n  - reading\n  - hiking\n  - coding\nprojects:\n  - name: Website\n    status: done\n  - name: App\n    status: in progress`
    );
    const [output, setOutput] = useState("");
    const [indentSize, setIndentSize] = useState(2);
    const [status, setStatus] = useState("");
    const [statusType, setStatusType] = useState("info");

    const handleFormat = () => {
        try {
            const result = formatYAML(input, { indentSize: Number(indentSize) || 2 });
            setOutput(result);
            setStatus("Formatted successfully.");
            setStatusType("success");
        } catch {
            setStatus("Couldn't parse that YAML — check the indentation and syntax.");
            setStatusType("error");
        }
    };

    const handleToJSON = () => {
        try {
            const result = yamlToJSON(input);
            setOutput(result);
            setStatus("Converted to JSON.");
            setStatusType("success");
        } catch {
            setStatus("Couldn't parse that YAML — check the indentation and syntax.");
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
                <h1 style={{ textAlign: "center" }}>YAML Formatter</h1>
                <p style={noteStyle}>
                    Supports block-style mappings, sequences, and scalars. Flow style ({"{ }"}, [ ]),
                    anchors, and multi-line strings aren't supported.
                </p>

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
                </div>

                <div style={gridStyle}>
                    <div>
                        <p className="ig-category-label">Input</p>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            style={textareaStyle}
                            spellCheck={false}
                            placeholder="Paste your YAML here…"
                        />
                    </div>
                    <div>
                        <p className="ig-category-label">Output</p>
                        <textarea
                            value={output}
                            readOnly
                            style={{ ...textareaStyle, color: "#c9a900" }}
                            spellCheck={false}
                            placeholder="Formatted YAML will appear here…"
                        />
                    </div>
                </div>

                <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 20 }}>
                    <button className="ig-item" onClick={handleFormat}>Format</button>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleToJSON}>To JSON</button>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleCopy}>Copy Output</button>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleClear}>Clear</button>
                </div>
                <p style={{ ...statusStyle, color: statusColor }}>{status}</p>
            </div>
        </div>
    );
}

const noteStyle = {
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 12,
    color: "#a8a89c",
    textAlign: "center",
    lineHeight: 1.6,
    marginBottom: 24,
};

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