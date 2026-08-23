"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState } from "react";

function beautifyHTML(input, { indentSize }) {
    const indent = " ".repeat(indentSize);
    const voidTags = new Set([
        "area", "base", "br", "col", "embed", "hr", "img", "input",
        "link", "meta", "param", "source", "track", "wbr",
    ]);
    const inlineTags = new Set([
        "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
        "em", "i", "kbd", "mark", "q", "s", "samp", "small", "span", "strong",
        "sub", "sup", "time", "u", "var",
    ]);

    // Protect raw blocks whose content shouldn't be reformatted.
    const protectedBlocks = [];
    let src = input.replace(
        /(<pre[\s\S]*?<\/pre>|<textarea[\s\S]*?<\/textarea>|<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>)/gi,
        (match) => {
            protectedBlocks.push(match);
            return `\u0000${protectedBlocks.length - 1}\u0000`;
        }
    );

    // Tokenize into tags, comments, doctype, and text.
    const tokens = [];
    const tokenRe = /<!--[\s\S]*?-->|<!doctype[^>]*>|<\/?[a-zA-Z][^<>]*>|[^<]+/gi;
    let m;
    while ((m = tokenRe.exec(src)) !== null) {
        tokens.push(m[0]);
    }

    let depth = 0;
    const lines = [];

    const tagName = (tok) => {
        const mm = tok.match(/^<\/?([a-zA-Z0-9-]+)/);
        return mm ? mm[1].toLowerCase() : "";
    };

    for (let raw of tokens) {
        const token = raw.trim();
        if (!token) continue;

        if (token.startsWith("<!--") || token.toLowerCase().startsWith("<!doctype")) {
            lines.push(indent.repeat(depth) + token);
            continue;
        }

        if (token.startsWith("</")) {
            depth = Math.max(0, depth - 1);
            lines.push(indent.repeat(depth) + token);
            continue;
        }

        if (token.startsWith("<")) {
            const name = tagName(token);
            const selfClosing = /\/>\s*$/.test(token) || voidTags.has(name);
            lines.push(indent.repeat(depth) + token);
            if (!selfClosing) depth++;
            continue;
        }

        // Plain text node: collapse whitespace, split into words wrapped at depth.
        const text = token.replace(/\s+/g, " ").trim();
        if (text) {
            lines.push(indent.repeat(depth) + text);
        }
    }

    let out = lines.join("\n");

    // Restore protected blocks, re-indented to their line's depth.
    out = out.replace(/^([ \t]*)\u0000(\d+)\u0000/gm, (_, pad, i) => {
        const block = protectedBlocks[Number(i)];
        const blockLines = block.split("\n");
        return blockLines
            .map((l, idx) => (idx === 0 ? pad + l : pad + l))
            .join("\n");
    });

    return out;
}

function beautifyCSS(input, { indentSize }) {
    const indent = " ".repeat(indentSize);
    let out = "";
    let depth = 0;
    let i = 0;
    const len = input.length;
    let buffer = "";

    const flushBuffer = (endChar) => {
        const text = buffer.trim();
        buffer = "";
        if (!text) return;
        if (endChar === "{") {
            out += indent.repeat(depth) + text + " {\n";
            depth++;
        } else if (endChar === ";") {
            out += indent.repeat(depth) + text + ";\n";
        }
    };

    while (i < len) {
        const ch = input[i];

        if (ch === "/" && input[i + 1] === "*") {
            const end = input.indexOf("*/", i + 2);
            const comment = end === -1 ? input.slice(i) : input.slice(i, end + 2);
            if (buffer.trim()) flushBuffer(";");
            out += indent.repeat(depth) + comment.trim() + "\n";
            i = end === -1 ? len : end + 2;
            continue;
        }

        if (ch === '"' || ch === "'") {
            const quote = ch;
            buffer += ch;
            i++;
            while (i < len && input[i] !== quote) {
                buffer += input[i];
                i++;
            }
            buffer += quote;
            i++;
            continue;
        }

        if (ch === "{") {
            flushBuffer("{");
            i++;
            continue;
        }

        if (ch === "}") {
            if (buffer.trim()) flushBuffer(";");
            depth = Math.max(0, depth - 1);
            out += indent.repeat(depth) + "}\n";
            i++;
            continue;
        }

        if (ch === ";") {
            flushBuffer(";");
            i++;
            continue;
        }

        if (/\s/.test(ch)) {
            if (buffer.length && !/\s$/.test(buffer)) buffer += " ";
            i++;
            continue;
        }

        buffer += ch;
        i++;
    }

    if (buffer.trim()) flushBuffer(";");

    return out.replace(/\n{2,}/g, "\n").trim() + "\n";
}

function beautifyJS(input, { indentSize }) {
    const indent = " ".repeat(indentSize);
    let depth = 0;
    let out = "";
    let i = 0;
    const len = input.length;
    let atLineStart = true;

    const writeIndent = () => {
        out += indent.repeat(depth);
        atLineStart = false;
    };

    while (i < len) {
        const ch = input[i];
        const next = input[i + 1];

        if (atLineStart && /[ \t]/.test(ch)) {
            i++;
            continue;
        }

        if (ch === "/" && next === "/") {
            if (atLineStart) writeIndent();
            while (i < len && input[i] !== "\n") {
                out += input[i];
                i++;
            }
            continue;
        }

        if (ch === "/" && next === "*") {
            if (atLineStart) writeIndent();
            const end = input.indexOf("*/", i + 2);
            const comment = end === -1 ? input.slice(i) : input.slice(i, end + 2);
            out += comment;
            i = end === -1 ? len : end + 2;
            continue;
        }

        if (ch === '"' || ch === "'" || ch === "`") {
            if (atLineStart) writeIndent();
            const quote = ch;
            out += ch;
            i++;
            while (i < len && input[i] !== quote) {
                if (input[i] === "\\") {
                    out += input[i] + (input[i + 1] || "");
                    i += 2;
                    continue;
                }
                out += input[i];
                i++;
            }
            out += quote;
            i++;
            continue;
        }

        if (ch === "\n") {
            out = out.replace(/[ \t]+$/, "");
            out += "\n";
            i++;
            atLineStart = true;
            continue;
        }

        if (ch === "{") {
            if (atLineStart) writeIndent();
            out = out.replace(/[ \t]+$/, "");
            out += " {\n";
            depth++;
            i++;
            atLineStart = true;
            continue;
        }

        if (ch === "}") {
            out = out.replace(/[ \t]*$/, "");
            if (!out.endsWith("\n")) out += "\n";
            depth = Math.max(0, depth - 1);
            out += indent.repeat(depth) + "}";
            i++;
            // peek: if next non-space char isn't ; or ) or , add newline
            let j = i;
            while (j < len && /[ \t]/.test(input[j])) j++;
            if (input[j] !== ";" && input[j] !== ")" && input[j] !== "," && input[j] !== "\n") {
                out += "\n";
                atLineStart = true;
            } else {
                atLineStart = false;
            }
            continue;
        }

        if (ch === ";") {
            out += ";";
            i++;
            if (input[i] !== "\n") {
                out += "\n";
                atLineStart = true;
            }
            continue;
        }

        if (atLineStart && ch !== " ") writeIndent();
        out += ch;
        i++;
    }

    return out
        .split("\n")
        .map((l) => l.replace(/[ \t]+$/, ""))
        .filter((l, idx, arr) => !(l === "" && arr[idx - 1] === ""))
        .join("\n")
        .trim() + "\n";
}

const LANGUAGES = {
    html: {
        label: "HTML",
        beautify: beautifyHTML,
        placeholder: "Beautified HTML will appear here…",
        sample:
            "<!doctype html><html><head><!-- page title --><title>Example</title></head><body><h1>Hello, world!</h1><p>This is a sample paragraph.</p></body></html>",
    },
    css: {
        label: "CSS",
        beautify: beautifyCSS,
        placeholder: "Beautified CSS will appear here…",
        sample:
            "/* base styles */body{margin:0;padding:0;font-family:sans-serif}.container{max-width:960px;margin:0 auto}",
    },
    js: {
        label: "JavaScript",
        beautify: beautifyJS,
        placeholder: "Beautified JavaScript will appear here…",
        sample:
            '// greet the user\nfunction greet(name){const message=`Hello, ${name}!`;console.log(message);return message;}\ngreet("world");',
    },
};

export default function Page() {
    const [lang, setLang] = useState("html");
    const [inputs, setInputs] = useState(() => {
        const initial = {};
        for (const key of Object.keys(LANGUAGES)) initial[key] = LANGUAGES[key].sample;
        return initial;
    });
    const [outputs, setOutputs] = useState({ html: "", css: "", js: "" });
    const [indentSize, setIndentSize] = useState(2);
    const [status, setStatus] = useState("");
    const [statusType, setStatusType] = useState("info");

    const current = LANGUAGES[lang];
    const input = inputs[lang];
    const output = outputs[lang];

    const setInput = (value) => {
        setInputs((prev) => ({ ...prev, [lang]: value }));
    };

    const handleBeautify = () => {
        let result;
        try {
            result = current.beautify(input, { indentSize });
        } catch (err) {
            setStatus("Couldn't format that input — check for unclosed tags/brackets.");
            setStatusType("error");
            return;
        }
        setOutputs((prev) => ({ ...prev, [lang]: result }));
        const beforeLines = input.split("\n").length;
        const afterLines = result.split("\n").length;
        setStatus(`Beautified ${current.label}: ${beforeLines} → ${afterLines} lines.`);
        setStatusType("success");
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
        setOutputs((prev) => ({ ...prev, [lang]: "" }));
        setStatus("Cleared.");
        setStatusType("info");
    };

    const handleTabChange = (key) => {
        setLang(key);
        setStatus("");
    };

    const statusColor =
        statusType === "error" ? "#e05a4e" : statusType === "success" ? "#4caf3d" : "#c9a900";

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 900, textAlign: "left" }}>
                <ToolCategory category="Developer" />
                <h1 style={{ textAlign: "center" }}>Beautify HTML / CSS / JS</h1>

                <div style={tabsStyle}>
                    {Object.entries(LANGUAGES).map(([key, meta]) => (
                        <button
                            key={key}
                            onClick={() => handleTabChange(key)}
                            style={key === lang ? tabActiveStyle : tabStyle}
                        >
                            {meta.label}
                        </button>
                    ))}
                </div>

                {lang === "js" && (
                    <p style={noteStyle}>
                        Note: this is a lightweight formatter (brace-based indentation) safe for strings,
                        template literals, and most code. For complex or minified production bundles, use a
                        dedicated formatter like Prettier.
                    </p>
                )}

                <div style={controlsStyle}>
                    <label style={checkboxLabelStyle}>
                        Indent size
                        <select
                            value={indentSize}
                            onChange={(e) => setIndentSize(Number(e.target.value))}
                            style={selectStyle}
                        >
                            <option value={2}>2 spaces</option>
                            <option value={4}>4 spaces</option>
                        </select>
                    </label>
                </div>

                <div style={gridStyle}>
                    <div>
                        <p className="ig-category-label">Input</p>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            style={textareaStyle}
                            spellCheck={false}
                        />
                    </div>
                    <div>
                        <p className="ig-category-label">Output</p>
                        <textarea
                            value={output}
                            readOnly
                            style={{ ...textareaStyle, color: "#c9a900" }}
                            spellCheck={false}
                            placeholder={current.placeholder}
                        />
                    </div>
                </div>

                <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 20 }}>
                    <button className="ig-item" onClick={handleBeautify}>Beautify</button>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleCopy}>Copy Output</button>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleClear}>Clear</button>
                </div>
                <p style={{ ...statusStyle, color: statusColor }}>{status}</p>
            </div>
        </div>
    );
}

const tabsStyle = {
    display: "flex",
    gap: 8,
    justifyContent: "center",
    marginBottom: 20,
};

const tabStyle = {
    background: "transparent",
    color: "#a8a89c",
    border: "1px solid #262626",
    borderRadius: 2,
    padding: "8px 18px",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 12,
    letterSpacing: 1,
    cursor: "pointer",
};

const tabActiveStyle = {
    ...tabStyle,
    background: "#141414",
    color: "#c9a900",
    border: "1px solid #c9a900",
};

const noteStyle = {
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 12,
    color: "#a8a89c",
    textAlign: "center",
    lineHeight: 1.6,
    marginBottom: 24,
};

const controlsStyle = {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
    margin: "0 0 24px",
    alignItems: "center",
    fontFamily: "Helvetica, Arial, sans-serif",
    justifyContent: "center",
};

const checkboxLabelStyle = {
    fontSize: 12,
    letterSpacing: 1,
    color: "#a8a89c",
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
};

const selectStyle = {
    background: "#141414",
    color: "#f5f5f0",
    border: "1px solid #262626",
    borderRadius: 2,
    padding: "4px 8px",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 12,
};

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
};

const textareaStyle = {
    width: "100%",
    minHeight: 280,
    background: "#141414",
    color: "#f5f5f0",
    border: "1px solid #262626",
    borderRadius: 2,
    padding: "12px 14px",
    fontFamily: "'Courier New', monospace",
    fontSize: 13,
    lineHeight: 1.5,
    resize: "vertical",
    boxSizing: "border-box",
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