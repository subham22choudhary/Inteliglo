"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState } from "react";

/** Encode a UTF-8 string to Base64 (handles emoji/non-Latin chars safely). */
function encodeBase64(str, urlSafe) {
    const utf8Bytes = new TextEncoder().encode(str);
    let binary = "";
    utf8Bytes.forEach((byte) => {
        binary += String.fromCharCode(byte);
    });
    let base64 = btoa(binary);
    if (urlSafe) {
        base64 = base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }
    return base64;
}

/** Decode a Base64 string back to a UTF-8 string. */
function decodeBase64(str) {
    let normalized = str.trim().replace(/-/g, "+").replace(/_/g, "/");
    const padding = normalized.length % 4;
    if (padding === 2) normalized += "==";
    else if (padding === 3) normalized += "=";
    else if (padding !== 0) throw new Error("Invalid Base64 string length.");

    const binary = atob(normalized);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
}

export default function Page() {
    const [mode, setMode] = useState("encode"); // encode | decode
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [urlSafe, setUrlSafe] = useState(false);
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
                setOutput(encodeBase64(input, urlSafe));
                setStatus("Encoded successfully.");
            } else {
                setOutput(decodeBase64(input));
                setStatus("Decoded successfully.");
            }
            setStatusType("success");
        } catch (e) {
            setOutput("");
            setStatus(
                mode === "decode"
                    ? "Invalid Base64 string — check for typos or missing characters."
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
                <ToolCategory category="Developer" />
                <h1 style={{ textAlign: "center" }}>Base64 Encoder / Decoder</h1>

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
                        Input — {mode === "encode" ? "Plain Text" : "Base64"}
                    </p>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={
                            mode === "encode"
                                ? "Type or paste text to encode..."
                                : "Paste Base64 string to decode..."
                        }
                        style={textareaStyle}
                    />
                </div>

                {mode === "encode" && (
                    <div style={controlsStyle}>
                        <label style={checkboxLabelStyle}>
                            <input
                                type="checkbox"
                                checked={urlSafe}
                                onChange={(e) => setUrlSafe(e.target.checked)}
                            />
                            URL-safe (replace +/ with -_, strip padding)
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
                        Output — {mode === "encode" ? "Base64" : "Plain Text"}
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

const checkboxLabelStyle = {
    fontSize: 12,
    letterSpacing: 1,
    color: "#a8a89c",
    display: "flex",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
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