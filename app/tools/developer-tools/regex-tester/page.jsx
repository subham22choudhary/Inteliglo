"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

const FLAG_OPTIONS = [
    { key: "g", label: "g — global" },
    { key: "i", label: "i — ignore case" },
    { key: "m", label: "m — multiline" },
    { key: "s", label: "s — dotAll" },
    { key: "u", label: "u — unicode" },
    { key: "y", label: "y — sticky" },
];

function escapeForDisplay(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default function Page() {
    const [pattern, setPattern] = useState("");
    const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false, u: false, y: false });
    const [testString, setTestString] = useState("");

    const activeFlags = Object.keys(flags)
        .filter((k) => flags[k])
        .join("");

    const { regex, error, matches } = useMemo(() => {
        if (!pattern) {
            return { regex: null, error: null, matches: [] };
        }
        try {
            const re = new RegExp(pattern, activeFlags);
            const found = [];

            if (flags.g || flags.y) {
                let match;
                let safety = 0;
                const clone = new RegExp(pattern, activeFlags.includes("g") ? activeFlags : activeFlags + "g");
                while ((match = clone.exec(testString)) !== null && safety < 5000) {
                    found.push(match);
                    safety++;
                    if (match[0] === "") clone.lastIndex++;
                }
            } else {
                const match = re.exec(testString);
                if (match) found.push(match);
            }

            return { regex: re, error: null, matches: found };
        } catch (e) {
            return { regex: null, error: e.message, matches: [] };
        }
    }, [pattern, activeFlags, testString, flags.g, flags.y]);

    const toggleFlag = (key) => {
        setFlags((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const highlightedHTML = useMemo(() => {
        if (!testString) return "";
        if (matches.length === 0) return escapeForDisplay(testString);

        let result = "";
        let lastIndex = 0;

        matches.forEach((match, idx) => {
            const start = match.index;
            const end = start + match[0].length;
            if (start < lastIndex) return; // overlapping, skip
            result += escapeForDisplay(testString.slice(lastIndex, start));
            const isEmpty = match[0].length === 0;
            result += `<mark data-match="${idx}" style="background:#4caf3d;color:#0a0a0a;border-radius:2px;padding:${isEmpty ? "0 2px" : "0"};">${isEmpty ? "|" : escapeForDisplay(match[0])
                }</mark>`;
            lastIndex = end;
        });

        result += escapeForDisplay(testString.slice(lastIndex));
        return result;
    }, [testString, matches]);

    const handleClear = () => {
        setPattern("");
        setTestString("");
    };

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Developer" />
                <h1 style={{ textAlign: "center" }}>Regex Tester</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Pattern</p>
                    <div style={patternRowStyle}>
                        <span style={slashStyle}>/</span>
                        <input
                            type="text"
                            value={pattern}
                            onChange={(e) => setPattern(e.target.value)}
                            placeholder="e.g. \b\w+@\w+\.\w+\b"
                            style={patternInputStyle}
                            spellCheck={false}
                        />
                        <span style={slashStyle}>/{activeFlags}</span>
                    </div>
                </div>

                <div style={flagsRowStyle}>
                    {FLAG_OPTIONS.map((f) => (
                        <label key={f.key} style={checkboxLabelStyle}>
                            <input
                                type="checkbox"
                                checked={flags[f.key]}
                                onChange={() => toggleFlag(f.key)}
                            />
                            {f.label}
                        </label>
                    ))}
                </div>

                {error && (
                    <p style={{ ...statusStyle, color: "#e05a4e", marginBottom: 20 }}>
                        Invalid regex: {error}
                    </p>
                )}

                <div className="ig-category" style={{ marginTop: 8 }}>
                    <p className="ig-category-label">Test String</p>
                    <textarea
                        value={testString}
                        onChange={(e) => setTestString(e.target.value)}
                        placeholder="Paste text here to test your pattern against..."
                        style={textareaStyle}
                    />
                </div>

                <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleClear}>Clear</button>
                </div>

                <div className="ig-category" style={{ marginTop: 40 }}>
                    <p className="ig-category-label">
                        Matches — {matches.length} found
                    </p>
                    <div
                        style={highlightBoxStyle}
                        dangerouslySetInnerHTML={{
                            __html: highlightedHTML || '<span style="color:#555;">Highlighted matches will appear here...</span>',
                        }}
                    />
                </div>

                {matches.length > 0 && (
                    <div className="ig-category" style={{ marginTop: 40 }}>
                        <p className="ig-category-label">Match Details</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {matches.map((match, idx) => (
                                <div key={idx} style={matchCardStyle}>
                                    <p style={matchTitleStyle}>
                                        Match {idx + 1} <span style={{ color: "#666" }}>at index {match.index}</span>
                                    </p>
                                    <p style={matchTextStyle}>
                                        <code style={codeStyle}>{JSON.stringify(match[0])}</code>
                                    </p>
                                    {match.length > 1 && (
                                        <div style={{ marginTop: 6 }}>
                                            {Array.from({ length: match.length - 1 }, (_, i) => i + 1).map((groupIdx) => (
                                                <p key={groupIdx} style={groupTextStyle}>
                                                    Group {groupIdx}:{" "}
                                                    <code style={codeStyle}>
                                                        {match[groupIdx] !== undefined ? JSON.stringify(match[groupIdx]) : "undefined"}
                                                    </code>
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                    {match.groups && Object.keys(match.groups).length > 0 && (
                                        <div style={{ marginTop: 6 }}>
                                            {Object.entries(match.groups).map(([name, val]) => (
                                                <p key={name} style={groupTextStyle}>
                                                    Named &lt;{name}&gt;:{" "}
                                                    <code style={codeStyle}>{val !== undefined ? JSON.stringify(val) : "undefined"}</code>
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const textareaStyle = {
    width: "100%",
    boxSizing: "border-box",
    minHeight: 200,
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

const patternRowStyle = {
    display: "flex",
    alignItems: "center",
    background: "#141414",
    border: "1px solid #262626",
    borderRadius: 2,
    padding: "0 14px",
};

const slashStyle = {
    fontFamily: "'Courier New', monospace",
    fontSize: 16,
    color: "#4caf3d",
    padding: "14px 0",
};

const patternInputStyle = {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#f5f5f0",
    fontFamily: "'Courier New', monospace",
    fontSize: 15,
    padding: "14px 10px",
};

const flagsRowStyle = {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
    margin: "16px 0 24px",
};

const checkboxLabelStyle = {
    fontSize: 12,
    letterSpacing: 1,
    color: "#a8a89c",
    display: "flex",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
    fontFamily: "Helvetica, Arial, sans-serif",
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
};

const highlightBoxStyle = {
    width: "100%",
    boxSizing: "border-box",
    minHeight: 120,
    background: "#141414",
    color: "#f5f5f0",
    border: "1px solid #262626",
    borderRadius: 2,
    padding: 18,
    fontFamily: "'Courier New', monospace",
    fontSize: 13,
    lineHeight: 1.8,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
};

const matchCardStyle = {
    background: "#141414",
    border: "1px solid #262626",
    borderRadius: 2,
    padding: "14px 18px",
};

const matchTitleStyle = {
    margin: "0 0 6px",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 12,
    letterSpacing: 1,
    color: "#4caf3d",
    fontWeight: "bold",
};

const matchTextStyle = {
    margin: 0,
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 13,
};

const groupTextStyle = {
    margin: "4px 0 0",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 12,
    color: "#a8a89c",
};

const codeStyle = {
    fontFamily: "'Courier New', monospace",
    color: "#c9a900",
    background: "#0a0a0a",
    padding: "2px 6px",
    borderRadius: 2,
};