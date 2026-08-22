"use client";

import { useState } from "react";

export const meta = {
    tags: ["Developer Tools"],
};

export default function Page() {
    const [mode, setMode] = useState("encode"); // encode | decode
    const [component, setComponent] = useState(true); // true = encodeURIComponent, false = encodeURI
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
                const result = component ? encodeURIComponent(input) : encodeURI(input);
                setOutput(result);
                setStatus("Encoded successfully.");
            } else {
                const result = component ? decodeURIComponent(input) : decodeURI(input);
                setOutput(result);
                setStatus("Decoded successfully.");
            }
            setStatusType("success");
        } catch (e) {
            setOutput("");
            setStatus(
                mode === "decode"
                    ? "Invalid encoded string — check for malformed % sequences."
                    : `Error: ${e.message}`
            );
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
                <h1 style={{ textAlign: "center" }}>URL Encoder / Decoder</h1>

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
                        Input — {mode === "encode" ? "Plain Text / URL" : "Encoded URL"}
                    </p>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={
                            mode === "encode"
                                ? "Type or paste text/URL to encode..."
                                : "Paste encoded URL to decode..."
                        }
                        style={textareaStyle}
                    />
                </div>

                <div style={controlsStyle}>
                    <label style={checkboxLabelStyle}>
                        <input
                            type="checkbox"
                            checked={component}
                            onChange={(e) => setComponent(e.target.checked)}
                        />
                        Component mode ({component ? "encodeURIComponent" : "encodeURI"})
                    </label>
                </div>
                <p style={hintStyle}>
                    {component
                        ? "Encodes everything including & ? = / — use this for individual query values or form data."
                        : "Preserves URL structure characters (: / ? & = #) — use this for encoding a full URL."}
                </p>

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
                        Output — {mode === "encode" ? "Encoded URL" : "Plain Text / URL"}
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
    margin: "22px 0 4px",
    alignItems: "center",
    fontFamily: "Helvetica, Arial, sans-serif",
};

const checkboxLabelStyle = {
    fontSize: 12,
    letterSpacing: 1,
    color: "#a8a89c",
    display: "flex",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
};

const hintStyle = {
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 11,
    color: "#666",
    margin: "0 0 20px",
    lineHeight: 1.5,
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