"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useEffect, useMemo } from "react";

function pad(n) {
    return String(n).padStart(2, "0");
}

function toLocalInputValue(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
        date.getHours()
    )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

function formatFull(date, utc) {
    const weekday = WEEKDAYS[utc ? date.getUTCDay() : date.getDay()];
    const day = utc ? date.getUTCDate() : date.getDate();
    const month = MONTHS[utc ? date.getUTCMonth() : date.getMonth()];
    const year = utc ? date.getUTCFullYear() : date.getFullYear();
    const h = utc ? date.getUTCHours() : date.getHours();
    const m = utc ? date.getUTCMinutes() : date.getMinutes();
    const s = utc ? date.getUTCSeconds() : date.getSeconds();
    return `${weekday}, ${month} ${day}, ${year} ${pad(h)}:${pad(m)}:${pad(s)}${utc ? " UTC" : ""}`;
}

function relativeFromNow(date) {
    const diffMs = date.getTime() - Date.now();
    const diffSec = Math.round(diffMs / 1000);
    const abs = Math.abs(diffSec);

    const units = [
        ["year", 31536000],
        ["month", 2592000],
        ["day", 86400],
        ["hour", 3600],
        ["minute", 60],
        ["second", 1],
    ];

    for (const [name, secs] of units) {
        if (abs >= secs || name === "second") {
            const value = Math.round(abs / secs);
            const plural = value === 1 ? "" : "s";
            return diffSec >= 0 ? `in ${value} ${name}${plural}` : `${value} ${name}${plural} ago`;
        }
    }
    return "just now";
}

export default function Page() {
    const [now, setNow] = useState(null);
    const [timestampInput, setTimestampInput] = useState("");
    const [unit, setUnit] = useState("seconds"); // seconds | milliseconds
    const [dateInput, setDateInput] = useState("");
    const [status, setStatus] = useState("");
    const [statusType, setStatusType] = useState("info");

    useEffect(() => {
        const current = new Date();
        setNow(current);
        setTimestampInput(String(Math.floor(current.getTime() / 1000)));
        setDateInput(toLocalInputValue(current));

        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const parsedFromTimestamp = useMemo(() => {
        if (timestampInput.trim() === "") return { date: null, error: null };
        const num = Number(timestampInput.trim());
        if (Number.isNaN(num)) return { date: null, error: "Not a valid number." };
        const ms = unit === "seconds" ? num * 1000 : num;
        const date = new Date(ms);
        if (Number.isNaN(date.getTime())) return { date: null, error: "Out of range." };
        return { date, error: null };
    }, [timestampInput, unit]);

    const parsedFromDate = useMemo(() => {
        if (!dateInput) return { date: null, error: null };
        const date = new Date(dateInput);
        if (Number.isNaN(date.getTime())) return { date: null, error: "Invalid date." };
        return { date, error: null };
    }, [dateInput]);

    const useCurrentTimestamp = () => {
        const current = new Date();
        setTimestampInput(String(unit === "seconds" ? Math.floor(current.getTime() / 1000) : current.getTime()));
    };

    const useCurrentDate = () => {
        setDateInput(toLocalInputValue(new Date()));
    };

    const handleCopy = async (text) => {
        if (!text) {
            setStatus("Nothing to copy.");
            setStatusType("info");
            return;
        }
        try {
            await navigator.clipboard.writeText(text);
            setStatus("Copied to clipboard.");
            setStatusType("success");
        } catch {
            setStatus("Copy failed — select and copy manually.");
            setStatusType("error");
        }
    };

    const statusColor =
        statusType === "error" ? "#e05a4e" : statusType === "success" ? "#4caf3d" : "#c9a900";

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Developer" />
                <h1 style={{ textAlign: "center" }}>Timestamp Converter</h1>

                {/* Live clock */}
                <div style={liveClockBox}>
                    <p style={liveClockLabel}>Current Unix Timestamp</p>
                    <p style={liveClockValue}>{now ? Math.floor(now.getTime() / 1000) : "—"}</p>
                    <p style={liveClockSub}>{now ? formatFull(now, false) : ""}</p>
                </div>

                {/* Timestamp -> Date */}
                <div className="ig-category" style={{ marginTop: 40 }}>
                    <p className="ig-category-label">Unix Timestamp → Date</p>

                    <div style={rowStyle}>
                        <input
                            type="text"
                            value={timestampInput}
                            onChange={(e) => setTimestampInput(e.target.value)}
                            placeholder="e.g. 1735689600"
                            style={inputStyle}
                            spellCheck={false}
                        />
                        <select value={unit} onChange={(e) => setUnit(e.target.value)} style={selectStyle}>
                            <option value="seconds">Seconds</option>
                            <option value="milliseconds">Milliseconds</option>
                        </select>
                    </div>

                    <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 14 }}>
                        <button className="ig-item" style={secondaryBtnStyle} onClick={useCurrentTimestamp}>
                            Use current time
                        </button>
                    </div>

                    {parsedFromTimestamp.error && (
                        <p style={{ ...statusStyle, color: "#e05a4e" }}>{parsedFromTimestamp.error}</p>
                    )}

                    {parsedFromTimestamp.date && (
                        <div style={resultBox}>
                            <ResultRow label="Local time" value={formatFull(parsedFromTimestamp.date, false)} onCopy={handleCopy} />
                            <ResultRow label="UTC time" value={formatFull(parsedFromTimestamp.date, true)} onCopy={handleCopy} />
                            <ResultRow label="ISO 8601" value={parsedFromTimestamp.date.toISOString()} onCopy={handleCopy} />
                            <ResultRow label="Relative" value={relativeFromNow(parsedFromTimestamp.date)} onCopy={handleCopy} />
                        </div>
                    )}
                </div>

                {/* Date -> Timestamp */}
                <div className="ig-category" style={{ marginTop: 48 }}>
                    <p className="ig-category-label">Date → Unix Timestamp</p>

                    <div style={rowStyle}>
                        <input
                            type="datetime-local"
                            step="1"
                            value={dateInput}
                            onChange={(e) => setDateInput(e.target.value)}
                            style={inputStyle}
                        />
                    </div>

                    <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 14 }}>
                        <button className="ig-item" style={secondaryBtnStyle} onClick={useCurrentDate}>
                            Use current time
                        </button>
                    </div>

                    {parsedFromDate.error && (
                        <p style={{ ...statusStyle, color: "#e05a4e" }}>{parsedFromDate.error}</p>
                    )}

                    {parsedFromDate.date && (
                        <div style={resultBox}>
                            <ResultRow
                                label="Timestamp (seconds)"
                                value={String(Math.floor(parsedFromDate.date.getTime() / 1000))}
                                onCopy={handleCopy}
                            />
                            <ResultRow
                                label="Timestamp (milliseconds)"
                                value={String(parsedFromDate.date.getTime())}
                                onCopy={handleCopy}
                            />
                            <ResultRow label="ISO 8601" value={parsedFromDate.date.toISOString()} onCopy={handleCopy} />
                            <ResultRow label="Relative" value={relativeFromNow(parsedFromDate.date)} onCopy={handleCopy} />
                        </div>
                    )}
                </div>

                <p style={{ ...statusStyle, color: statusColor, marginTop: 20 }}>{status}</p>
            </div>
        </div>
    );
}

function ResultRow({ label, value, onCopy }) {
    return (
        <div style={resultRowStyle}>
            <div style={{ minWidth: 0 }}>
                <p style={resultLabelStyle}>{label}</p>
                <p style={resultValueStyle}>{value}</p>
            </div>
            <button style={copyIconBtn} onClick={() => onCopy(value)}>
                Copy
            </button>
        </div>
    );
}

const liveClockBox = {
    background: "#141414",
    border: "1px solid #262626",
    borderRadius: 2,
    padding: "24px 20px",
    textAlign: "center",
};

const liveClockLabel = {
    margin: "0 0 10px",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#4caf3d",
};

const liveClockValue = {
    margin: 0,
    fontFamily: "'Courier New', monospace",
    fontSize: 36,
    color: "#f5f5f0",
};

const liveClockSub = {
    margin: "8px 0 0",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 12,
    color: "#a8a89c",
};

const rowStyle = {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
};

const inputStyle = {
    flex: 1,
    minWidth: 200,
    background: "#141414",
    color: "#f5f5f0",
    border: "1px solid #262626",
    borderRadius: 2,
    padding: "14px 16px",
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    outline: "none",
};

const selectStyle = {
    background: "#141414",
    color: "#f5f5f0",
    border: "1px solid #262626",
    borderRadius: 2,
    padding: "0 14px",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 13,
};

const secondaryBtnStyle = {
    background: "transparent",
    color: "#f5f5f0",
    border: "1px solid #333",
};

const resultBox = {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
};

const resultRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    background: "#141414",
    border: "1px solid #262626",
    borderRadius: 2,
    padding: "12px 18px",
};

const resultLabelStyle = {
    margin: "0 0 4px",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#666",
};

const resultValueStyle = {
    margin: 0,
    fontFamily: "'Courier New', monospace",
    fontSize: 13,
    color: "#f5f5f0",
    overflow: "hidden",
    textOverflow: "ellipsis",
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

const statusStyle = {
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 12,
    letterSpacing: 1,
    minHeight: 16,
};