"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState } from "react";

function locateError(input, message) {
    const posMatch = message.match(/position (\d+)/);
    if (!posMatch) return null;

    const pos = Number(posMatch[1]);
    const upToError = input.slice(0, pos);
    const lines = upToError.split("\n");
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;

    return { pos, line, column };
}

function getSnippet(input, pos, radius = 30) {
    const start = Math.max(0, pos - radius);
    const end = Math.min(input.length, pos + radius);
    const before = input.slice(start, pos);
    const after = input.slice(pos, end);
    return {
        text: `${start > 0 ? "…" : ""}${before}${after}${end < input.length ? "…" : ""}`,
        caretOffset: (start > 0 ? 1 : 0) + before.length,
    };
}

function summarizeStructure(value, depth = 0) {
    if (Array.isArray(value)) {
        return { type: "array", count: value.length };
    }
    if (value !== null && typeof value === "object") {
        return { type: "object", count: Object.keys(value).length };
    }
    return { type: typeof value, count: null };
}

export default function Page() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState(null); // { valid, message, line, column, snippet, caretOffset, summary }

    const handleValidate = () => {
        if (!input.trim()) {
            setResult({ valid: null, message: "Nothing to validate." });
            return;
        }
        try {
            const parsed = JSON.parse(input);
            const summary = summarizeStructure(parsed);
            setResult({ valid: true, summary });
        } catch (e) {
            const location = locateError(input, e.message);
            let snippetData = null;
            if (location) {
                snippetData = getSnippet(input, location.pos);
            }
            setResult({
                valid: false,
                message: e.message,
                line: location?.line,
                column: location?.column,
                snippet: snippetData?.text,
                caretOffset: snippetData?.caretOffset,
            });
        }
    };

    const handleClear = () => {
        setInput("");
        setResult(null);
    };

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Developer" />
                <h1 style={{ textAlign: "center" }}>JSON Validator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Input</p>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='Paste your JSON here to check if it&apos;s valid...'
                        style={textareaStyle}
                    />
                </div>

                <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <button className="ig-item" onClick={handleValidate}>Validate</button>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleClear}>Clear</button>
                </div>

                {result && (
                    <div style={{ marginTop: 28 }}>
                        {result.valid === true && (
                            <div style={{ ...resultBox, borderColor: "#4caf3d" }}>
                                <p style={{ ...resultTitle, color: "#4caf3d" }}>✓ Valid JSON</p>
                                <p style={resultText}>
                                    Root type: <strong>{result.summary.type}</strong>
                                    {result.summary.count !== null && (
                                        <>
                                            {" "}— {result.summary.type === "array" ? "items" : "keys"}:{" "}
                                            <strong>{result.summary.count}</strong>
                                        </>
                                    )}
                                </p>
                            </div>
                        )}

                        {result.valid === false && (
                            <div style={{ ...resultBox, borderColor: "#e05a4e" }}>
                                <p style={{ ...resultTitle, color: "#e05a4e" }}>✕ Invalid JSON</p>
                                <p style={resultText}>{result.message}</p>
                                {result.line && (
                                    <p style={{ ...resultText, color: "#a8a89c" }}>
                                        Line {result.line}, Column {result.column}
                                    </p>
                                )}
                                {result.snippet && (
                                    <pre style={snippetStyle}>
                                        {result.snippet}
                                        {"\n"}
                                        {" ".repeat(result.caretOffset)}^
                                    </pre>
                                )}
                            </div>
                        )}

                        {result.valid === null && (
                            <div style={{ ...resultBox, borderColor: "#c9a900" }}>
                                <p style={{ ...resultTitle, color: "#c9a900" }}>{result.message}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

const textareaStyle = {
    width: "100%",
    boxSizing: "border-box",
    minHeight: 320,
    background: "#141414",
    color: "#f5f5f0",
    border: "1px solid #262626",
    borderRadius: 2,
    padding: 18,
    fontFamily: "'Courier New', monospace",
    fontSize: 13,
    lineHeight: 1.6,
    resize: "vertical",
    marginBottom: 22,
};

const secondaryBtnStyle = {
    background: "transparent",
    color: "#f5f5f0",
    border: "1px solid #333",
};

const resultBox = {
    border: "1px solid",
    borderRadius: 2,
    padding: 20,
    background: "#141414",
};

const resultTitle = {
    margin: "0 0 10px",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 14,
    letterSpacing: 1,
    fontWeight: "bold",
};

const resultText = {
    margin: "0 0 6px",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 13,
    color: "#f5f5f0",
    lineHeight: 1.6,
};

const snippetStyle = {
    marginTop: 12,
    padding: "12px 16px",
    background: "#0a0a0a",
    border: "1px solid #262626",
    borderRadius: 2,
    fontFamily: "'Courier New', monospace",
    fontSize: 13,
    color: "#e05a4e",
    overflowX: "auto",
    whiteSpace: "pre",
};