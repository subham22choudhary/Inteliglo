"use client";

import { useState } from "react";

export const meta = {
    tags: ["Developer Tools"],
};

function flattenObject(obj, prefix = "", result = {}) {
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (value !== null && typeof value === "object" && !Array.isArray(value)) {
            flattenObject(value, newKey, result);
        } else if (Array.isArray(value)) {
            result[newKey] = JSON.stringify(value);
        } else {
            result[newKey] = value;
        }
    });
    return result;
}

function csvEscape(value) {
    if (value === null || value === undefined) return "";
    const str = String(value);
    if (/[",\n]/.test(str)) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}

function jsonToCSV(input, delimiter) {
    const parsed = JSON.parse(input);
    const rows = Array.isArray(parsed) ? parsed : [parsed];

    if (rows.length === 0) {
        throw new Error("JSON array is empty — nothing to convert.");
    }

    const flatRows = rows.map((row) => {
        if (row !== null && typeof row === "object") {
            return flattenObject(row);
        }
        return { value: row };
    });

    // Collect the union of all keys across rows, preserving first-seen order
    const headerSet = [];
    flatRows.forEach((row) => {
        Object.keys(row).forEach((key) => {
            if (!headerSet.includes(key)) headerSet.push(key);
        });
    });

    const headerLine = headerSet.map((h) => csvEscape(h)).join(delimiter);
    const dataLines = flatRows.map((row) =>
        headerSet.map((key) => csvEscape(row[key])).join(delimiter)
    );

    return [headerLine, ...dataLines].join("\n");
}

export default function Page() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [delimiter, setDelimiter] = useState(",");
    const [status, setStatus] = useState("");
    const [statusType, setStatusType] = useState("info");

    const handleConvert = () => {
        if (!input.trim()) {
            setStatus("Nothing to convert.");
            setStatusType("info");
            return;
        }
        try {
            const csv = jsonToCSV(input, delimiter);
            setOutput(csv);
            setStatus("Converted successfully.");
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

    const handleDownload = () => {
        if (!output) {
            setStatus("Nothing to download.");
            setStatusType("info");
            return;
        }
        const blob = new Blob([output], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "data.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setStatus("Downloaded data.csv");
        setStatusType("success");
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
                <h1 style={{ textAlign: "center" }}>JSON to CSV</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Input — JSON</p>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='Paste a JSON array here... e.g. [{"name":"John","age":30},{"name":"Jane","age":25}]'
                        style={textareaStyle}
                    />
                </div>

                <div style={controlsStyle}>
                    <label style={labelStyle}>
                        Delimiter
                        <select
                            value={delimiter}
                            onChange={(e) => setDelimiter(e.target.value)}
                            style={selectStyle}
                        >
                            <option value=",">Comma (,)</option>
                            <option value=";">Semicolon (;)</option>
                            <option value={"\t"}>Tab</option>
                        </select>
                    </label>
                </div>

                <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <button className="ig-item" onClick={handleConvert}>Convert</button>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleCopy}>Copy</button>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleDownload}>Download CSV</button>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleClear}>Clear</button>
                </div>
                <p style={{ ...statusStyle, color: statusColor }}>{status}</p>

                <div className="ig-category" style={{ marginTop: 48 }}>
                    <p className="ig-category-label">Output — CSV</p>
                    <textarea
                        value={output}
                        readOnly
                        placeholder="Converted CSV will appear here..."
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