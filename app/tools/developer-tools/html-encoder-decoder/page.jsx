"use client";

import { useState } from "react";

/** Encode special HTML characters into named/numeric entities. */
function encodeHTML(str, mode) {
    const namedMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    };

    if (mode === "named") {
        return str.replace(/[&<>"']/g, (ch) => namedMap[ch]);
    }

    // "all" mode: convert every character to its numeric entity
    if (mode === "numeric-all") {
        return Array.from(str)
            .map((ch) => `&#${ch.codePointAt(0)};`)
            .join("");
    }

    // "numeric" mode: only the reserved HTML characters, as numeric entities
    const numericMap = {
        "&": "&#38;",
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
    };
    return str.replace(/[&<>"']/g, (ch) => numericMap[ch]);
}

/** Decode HTML entities (named + numeric decimal + numeric hex) back to plain text. */
function decodeHTML(str) {
    const namedEntities = {
        amp: "&",
        lt: "<",
        gt: ">",
        quot: '"',
        apos: "'",
        nbsp: "\u00A0",
        copy: "\u00A9",
        reg: "\u00AE",
        trade: "\u2122",
        hellip: "\u2026",
        mdash: "\u2014",
        ndash: "\u2013",
        lsquo: "\u2018",
        rsquo: "\u2019",
        ldquo: "\u201C",
        rdquo: "\u201D",
    };

    return str.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity) => {
        if (entity[0] === "#") {
            const isHex = entity[1] === "x" || entity[1] === "X";
            const codePoint = isHex ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
            if (Number.isNaN(codePoint)) return match;
            try {
                return String.fromCodePoint(codePoint);
            } catch {
                return match;
            }
        }
        return namedEntities[entity] !== undefined ? namedEntities[entity] : match;
    });
}

export default function Page() {
    const [mode, setMode] = useState("encode"); // encode | decode
    const [encodeMode, setEncodeMode] = useState("named"); // named | numeric | numeric-all
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [status, setStatus] = useState("");
    const [statusType, setStatusType] = useState("info");

    const handleProcess = () => {
        if (!input.trim()) {
            setStatus("Nothing to process.");
            setStatusType("info");
            return;
        }
        try {
            if (mode === "encode") {
                setOutput(encodeHTML(input, encodeMode));
                setStatus("Encoded successfully.");
            } else {
                setOutput(decodeHTML(input));
                setStatus("Decoded successfully.");
            }
            setStatusType("success");
        } catch (e) {
            setOutput("");
            setStatus(`Error: ${e.message}`);
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

    const handleSwap = () => {
        setMode((prev) => (prev === "encode" ? "decode" : "encode"));
        setInput(output);
        setOutput("");
        setStatus("");
        setStatusType("info");
    };

    const handleClear = () => {
        setInput("");
        setOutput("");
        setStatus("");
        setStatusType("info");
    };

    const statusColor =
        statusType === "error" ? "#e05a4e" : statusType === "success" ? "#4caf3d" : "#c9a900";

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>HTML Encoder / Decoder</h1>

                {/* Mode tabs */}
                <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginBottom: 32 }}>
                    {["encode", "decode"].map((m) => (
                        <button
                            key={m}
                            className="ig-item"
                            style={mode === m ? {} : secondaryBtnStyle}
                            onClick={() => {
                                setMode(m);
                                setStatus("");
                            }}
                        >
                            {m === "encode" ? "Encode" : "Decode"}
                        </button>
                    ))}
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">
                        Input — {mode === "encode" ? "Plain Text" : "HTML Entities"}
                    </p>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={
                            mode === "encode"
                                ? 'Type or paste text/HTML to encode... e.g. <div class="x">'
                                : "Paste HTML entities to decode... e.g. &lt;div&gt; &amp; &#39;text&#39;"
                        }
                        style={textareaStyle}
                    />
                </div>

                {mode === "encode" && (
                    <div style={controlsStyle}>
                        <label style={labelStyle}>
                            Encoding
                            <select
                                value={encodeMode}
                                onChange={(e) => setEncodeMode(e.target.value)}
                                style={selectStyle}
                            >
                                <option value="named">Named entities (&amp;lt; &amp;gt; &amp;amp;)</option>
                                <option value="numeric">Numeric — reserved chars only (&amp;#60;)</option>
                                <option value="numeric-all">Numeric — every character</option>
                            </select>
                        </label>
                    </div>
                )}

                <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <button className="ig-item" onClick={handleProcess}>
                        {mode === "encode" ? "Encode" : "Decode"}
                    </button>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleSwap}>
                        Swap ⇄
                    </button>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleCopy}>
                        Copy
                    </button>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleClear}>
                        Clear
                    </button>
                </div>
                <p style={{ ...statusStyle, color: statusColor }}>{status}</p>

                <div className="ig-category" style={{ marginTop: 48 }}>
                    <p className="ig-category-label">
                        Output — {mode === "encode" ? "HTML Entities" : "Plain Text"}
                    </p>
                    <textarea
                        value={output}
                        readOnly
                        placeholder="Result will appear here..."
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
    marginTop: 10,
    minHeight: 16,
};