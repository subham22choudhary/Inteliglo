"use client";

import { useState } from "react";

export const meta = {
    tags: ["Developer Tools"],
};

function generateUUIDv4() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    // Fallback for environments without crypto.randomUUID
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function generateNilUUID() {
    return "00000000-0000-0000-0000-000000000000";
}

function applyCase(uuid, uppercase) {
    return uppercase ? uuid.toUpperCase() : uuid.toLowerCase();
}

function applyHyphens(uuid, hyphens) {
    return hyphens ? uuid : uuid.replace(/-/g, "");
}

export default function Page() {
    const [count, setCount] = useState(5);
    const [uppercase, setUppercase] = useState(false);
    const [hyphens, setHyphens] = useState(true);
    const [uuids, setUuids] = useState(() =>
        Array.from({ length: 5 }, () => generateUUIDv4())
    );
    const [status, setStatus] = useState("");
    const [statusType, setStatusType] = useState("info");

    const handleGenerate = () => {
        const clamped = Math.min(100, Math.max(1, Number(count) || 1));
        setCount(clamped);
        setUuids(Array.from({ length: clamped }, () => generateUUIDv4()));
        setStatus(`Generated ${clamped} UUID${clamped === 1 ? "" : "s"}.`);
        setStatusType("success");
    };

    const formattedList = uuids.map((u) => applyHyphens(applyCase(u, uppercase), hyphens));
    const joinedOutput = formattedList.join("\n");

    const handleCopyAll = async () => {
        if (!joinedOutput) {
            setStatus("Nothing to copy.");
            setStatusType("info");
            return;
        }
        try {
            await navigator.clipboard.writeText(joinedOutput);
            setStatus("Copied all to clipboard.");
            setStatusType("success");
        } catch {
            setStatus("Copy failed — select and copy manually.");
            setStatusType("error");
        }
    };

    const handleCopyOne = async (value) => {
        try {
            await navigator.clipboard.writeText(value);
            setStatus("Copied to clipboard.");
            setStatusType("success");
        } catch {
            setStatus("Copy failed.");
            setStatusType("error");
        }
    };

    const handleNil = () => {
        setUuids([generateNilUUID()]);
        setCount(1);
        setStatus("Nil UUID generated.");
        setStatusType("success");
    };

    const statusColor =
        statusType === "error" ? "#e05a4e" : statusType === "success" ? "#4caf3d" : "#c9a900";

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>UUID Generator</h1>

                <div style={controlsStyle}>
                    <label style={labelStyle}>
                        Count
                        <input
                            type="number"
                            min={1}
                            max={100}
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                            style={numberInputStyle}
                        />
                    </label>

                    <label style={checkboxLabelStyle}>
                        <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />
                        Uppercase
                    </label>

                    <label style={checkboxLabelStyle}>
                        <input type="checkbox" checked={hyphens} onChange={(e) => setHyphens(e.target.checked)} />
                        Hyphens
                    </label>
                </div>

                <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <button className="ig-item" onClick={handleGenerate}>Generate</button>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleCopyAll}>Copy All</button>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleNil}>Nil UUID</button>
                </div>
                <p style={{ ...statusStyle, color: statusColor }}>{status}</p>

                <div className="ig-category" style={{ marginTop: 40 }}>
                    <p className="ig-category-label">Generated UUIDs (v4)</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {formattedList.map((uuid, idx) => (
                            <div key={idx} style={uuidRowStyle}>
                                <code style={uuidCodeStyle}>{uuid}</code>
                                <button style={copyIconBtn} onClick={() => handleCopyOne(uuid)}>
                                    Copy
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
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
    width: 70,
    background: "#141414",
    color: "#f5f5f0",
    border: "1px solid #262626",
    borderRadius: 2,
    padding: "6px 10px",
    fontFamily: "'Courier New', monospace",
    fontSize: 13,
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

const uuidRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    background: "#141414",
    border: "1px solid #262626",
    borderRadius: 2,
    padding: "12px 18px",
};

const uuidCodeStyle = {
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    color: "#f5f5f0",
    overflowX: "auto",
    whiteSpace: "nowrap",
};

const copyIconBtn = {
    flexShrink: 0,
    background: "transparent",
    color: "#c9a900",
    border: "1px solid #333",
    borderRadius: 2,
    padding: "8px 14px",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 11,
    letterSpacing: 1,
    cursor: "pointer",
};