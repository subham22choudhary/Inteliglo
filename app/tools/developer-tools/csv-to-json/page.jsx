"use client";

import { useState } from "react";

export const meta = {
  tags: ["Developer Tools"],
};

function parseCSVLine(line, delimiter) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const next = line[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === delimiter) {
        result.push(current);
        current = "";
      } else {
        current += char;
      }
    }
  }
  result.push(current);
  return result;
}

/**
 * Splits full CSV text into rows, respecting quoted fields that may contain
 * literal newlines (so a quoted multi-line value isn't split into extra rows).
 */
function splitCSVRows(text) {
  const rows = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      inQuotes = !inQuotes;
      current += char;
    } else if (char === "\n" && !inQuotes) {
      rows.push(current);
      current = "";
    } else if (char === "\r") {
      // skip, newline handled by \n
    } else {
      current += char;
    }
  }
  if (current.trim() !== "") rows.push(current);
  return rows;
}

function coerceValue(value) {
  const trimmed = value.trim();
  if (trimmed === "") return "";
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "null") return null;
  if (/^-?\d+(\.\d+)?$/.test(trimmed) && trimmed !== "" && !/^0\d/.test(trimmed)) {
    return Number(trimmed);
  }
  return value;
}

/**
 * Expands dot-notation keys (e.g. "user.name") back into nested objects.
 */
function unflattenObject(flat) {
  const result = {};
  Object.keys(flat).forEach((key) => {
    const parts = key.split(".");
    let node = result;
    parts.forEach((part, idx) => {
      if (idx === parts.length - 1) {
        node[part] = flat[key];
      } else {
        node[part] = node[part] || {};
        node = node[part];
      }
    });
  });
  return result;
}

function csvToJSON(input, delimiter, options) {
  const rows = splitCSVRows(input.trim());
  if (rows.length === 0) {
    throw new Error("No data found.");
  }

  const headers = parseCSVLine(rows[0], delimiter).map((h) => h.trim());
  const dataRows = rows.slice(1);

  const objects = dataRows.map((rowLine) => {
    const cells = parseCSVLine(rowLine, delimiter);
    const flat = {};
    headers.forEach((header, idx) => {
      const raw = cells[idx] !== undefined ? cells[idx] : "";
      flat[header] = options.typeCoercion ? coerceValue(raw) : raw;
    });
    return options.nestedKeys ? unflattenObject(flat) : flat;
  });

  return objects;
}

export default function Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [typeCoercion, setTypeCoercion] = useState(true);
  const [nestedKeys, setNestedKeys] = useState(false);
  const [indentSize, setIndentSize] = useState("2");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("info");

  const getIndent = () => (indentSize === "tab" ? "\t" : Number(indentSize));

  const handleConvert = () => {
    if (!input.trim()) {
      setStatus("Nothing to convert.");
      setStatusType("info");
      return;
    }
    try {
      const objects = csvToJSON(input, delimiter, { typeCoercion, nestedKeys });
      setOutput(JSON.stringify(objects, null, getIndent()));
      setStatus(`Converted successfully — ${objects.length} row${objects.length === 1 ? "" : "s"}.`);
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
    const blob = new Blob([output], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setStatus("Downloaded data.json");
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
        <h1 style={{ textAlign: "center" }}>CSV to JSON</h1>

        <div className="ig-category">
          <p className="ig-category-label">Input — CSV</p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"Paste your CSV here...\nname,age\nJohn,30\nJane,25"}
            style={textareaStyle}
          />
        </div>

        <div style={controlsStyle}>
          <label style={labelStyle}>
            Delimiter
            <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)} style={selectStyle}>
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value={"\t"}>Tab</option>
            </select>
          </label>

          <label style={labelStyle}>
            Indent
            <select value={indentSize} onChange={(e) => setIndentSize(e.target.value)} style={selectStyle}>
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
              <option value="tab">Tab</option>
            </select>
          </label>

          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              checked={typeCoercion}
              onChange={(e) => setTypeCoercion(e.target.checked)}
            />
            Auto-detect numbers/booleans
          </label>

          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              checked={nestedKeys}
              onChange={(e) => setNestedKeys(e.target.checked)}
            />
            Expand dotted keys (a.b → nested)
          </label>
        </div>

        <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <button className="ig-item" onClick={handleConvert}>Convert</button>
          <button className="ig-item" style={secondaryBtnStyle} onClick={handleCopy}>Copy</button>
          <button className="ig-item" style={secondaryBtnStyle} onClick={handleDownload}>Download JSON</button>
          <button className="ig-item" style={secondaryBtnStyle} onClick={handleClear}>Clear</button>
        </div>
        <p style={{ ...statusStyle, color: statusColor }}>{status}</p>

        <div className="ig-category" style={{ marginTop: 48 }}>
          <p className="ig-category-label">Output — JSON</p>
          <textarea
            value={output}
            readOnly
            placeholder="Converted JSON will appear here..."
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
  gap: 20,
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

const checkboxLabelStyle = {
  ...labelStyle,
  cursor: "pointer",
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