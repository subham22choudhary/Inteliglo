"use client";

import { useState } from "react";

function formatJSON(input, indentUnit) {
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed, null, indentUnit);
}

function minifyJSON(input) {
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed);
}

export default function Page() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [indentSize, setIndentSize] = useState("2");
    const [status, setStatus] = useState("");
    const [statusType, setStatusType] = useState("info"); // info | error | success

    const getIndent = () => (indentSize === "tab" ? "\t" : Number(indentSize));

    const handleFormat = () => {
        if (!input.trim()) {
            setStatus("Nothing to format.");
            setStatusType("info");
            return;
        }
        try {
            const formatted = formatJSON(input, getIndent());
            setOutput(formatted);
            setStatus("Valid JSON — formatted successfully.");
            setStatusType("success");
        } catch (e) {
            setOutput("");
            setStatus(`Invalid JSON: ${e.message}`);
            setStatusType("error");
        }
    };

    const handleMinify = () => {
        if (!input.trim()) {
            setStatus("Nothing to minify.");
            setStatusType("info");
            return;
        }
        try {
            const minified = minifyJSON(input);
            setOutput(minified);
            setStatus("Valid JSON — minified successfully.");
            setStatusType("success");
        } catch (e) {
            setOutput("");
            setStatus(`Invalid JSON: ${e.message}`);
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
        setStatus("");
        setStatusType("info");
    };

    const statusColor =
        statusType === "error" ? "#e05a4e" : statusType === "success" ? "#4caf3d" : "#c9a900";

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>JSON Formatter</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Input</p>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='Paste your JSON here... e.g. {"name":"John","age":30}'
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
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleMinify}>Minify</button>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleCopy}>Copy</button>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleClear}>Clear</button>
                </div>
                <p style={{ ...statusStyle, color: statusColor }}>{status}</p>

                <div className="ig-category" style={{ marginTop: 48 }}>
                    <p className="ig-category-label">Output</p>
                    <textarea
                        value={output}
                        readOnly
                        placeholder="Formatted JSON will appear here..."
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