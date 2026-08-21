"use client";

import { useState } from "react";

function minifyHTML(input, { stripComments, collapseWhitespace }) {
    let out = input;

    if (stripComments) {
        out = out.replace(/<!--[\s\S]*?-->/g, "");
    }

    const protectedBlocks = [];
    out = out.replace(
        /(<pre[\s\S]*?<\/pre>|<textarea[\s\S]*?<\/textarea>|<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>)/gi,
        (match) => {
            protectedBlocks.push(match);
            return `__PROTECTED_BLOCK_${protectedBlocks.length - 1}__`;
        }
    );

    if (collapseWhitespace) {
        out = out.replace(/>\s+</g, "><");
        out = out.replace(/[ \t\r\n]+/g, " ");
        out = out.trim();
    }

    out = out.replace(/__PROTECTED_BLOCK_(\d+)__/g, (_, i) => protectedBlocks[Number(i)]);

    return out;
}

function minifyCSS(input, { stripComments, collapseWhitespace }) {
    let out = input;

    if (stripComments) {
        out = out.replace(/\/\*[\s\S]*?\*\//g, "");
    }

    if (collapseWhitespace) {
        out = out.replace(/[\r\n\t]+/g, " ");
        out = out.replace(/\s+/g, " ");
        out = out.replace(/\s*([{}:;,>~+])\s*/g, "$1");
        out = out.replace(/;}/g, "}");
        out = out.replace(/^\s+|\s+$/g, "");
    }

    return out;
}

function minifyJS(input, { stripComments, collapseWhitespace }) {
    let out = "";
    let i = 0;
    const len = input.length;

    while (i < len) {
        const ch = input[i];
        const next = input[i + 1];

        if (stripComments && ch === "/" && next === "/") {
            while (i < len && input[i] !== "\n") i++;
            continue;
        }

        if (stripComments && ch === "/" && next === "*") {
            i += 2;
            while (i < len && !(input[i] === "*" && input[i + 1] === "/")) i++;
            i += 2;
            continue;
        }

        if (ch === '"' || ch === "'") {
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

        if (ch === "`") {
            out += ch;
            i++;
            while (i < len && input[i] !== "`") {
                if (input[i] === "\\") {
                    out += input[i] + (input[i + 1] || "");
                    i += 2;
                    continue;
                }
                out += input[i];
                i++;
            }
            out += "`";
            i++;
            continue;
        }

        out += ch;
        i++;
    }

    if (collapseWhitespace) {
        out = out.replace(/[ \t]+/g, " ");
        out = out
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.length > 0)
            .join("\n");
        out = out.replace(/\s*([{};,:()=+\-*/<>!&|?])\s*/g, (match, symbol) => symbol);
        out = out.replace(/\n+/g, "\n");
    }

    return out.trim();
}

const LANGUAGES = {
    html: {
        label: "HTML",
        minify: minifyHTML,
        placeholder: "Minified HTML will appear here…",
        sample:
            "<!doctype html>\n<html>\n  <head>\n    <!-- page title -->\n    <title>Example</title>\n  </head>\n  <body>\n    <h1>Hello, world!</h1>\n    <p>This is a sample paragraph.</p>\n  </body>\n</html>",
    },
    css: {
        label: "CSS",
        minify: minifyCSS,
        placeholder: "Minified CSS will appear here…",
        sample:
            "/* base styles */\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: sans-serif;\n}\n\n.container {\n  max-width: 960px;\n  margin: 0 auto;\n}",
    },
    js: {
        label: "JavaScript",
        minify: minifyJS,
        placeholder: "Minified JavaScript will appear here…",
        sample:
            '// greet the user\nfunction greet(name) {\n  const message = `Hello, ${name}!`;\n  console.log(message);\n  return message;\n}\n\ngreet("world");',
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
    const [stripComments, setStripComments] = useState(true);
    const [collapseWhitespace, setCollapseWhitespace] = useState(true);
    const [status, setStatus] = useState("");
    const [statusType, setStatusType] = useState("info");

    const current = LANGUAGES[lang];
    const input = inputs[lang];
    const output = outputs[lang];

    const setInput = (value) => {
        setInputs((prev) => ({ ...prev, [lang]: value }));
    };

    const handleMinify = () => {
        const result = current.minify(input, { stripComments, collapseWhitespace });
        setOutputs((prev) => ({ ...prev, [lang]: result }));
        const before = input.length;
        const after = result.length;
        const saved = before > 0 ? Math.round((1 - after / before) * 100) : 0;
        setStatus(`Minified ${current.label}: ${before} → ${after} chars (${saved}% smaller).`);
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
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>Minify HTML / CSS / JS</h1>

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
                        Note: this is a lightweight minifier (comment stripping + whitespace collapsing) safe
                        for strings, template literals, and most code. For production builds, use a dedicated
                        bundler/minifier like esbuild or Terser.
                    </p>
                )}

                <div style={controlsStyle}>
                    <label style={checkboxLabelStyle}>
                        <input
                            type="checkbox"
                            checked={stripComments}
                            onChange={(e) => setStripComments(e.target.checked)}
                        />
                        Strip comments
                    </label>
                    <label style={checkboxLabelStyle}>
                        <input
                            type="checkbox"
                            checked={collapseWhitespace}
                            onChange={(e) => setCollapseWhitespace(e.target.checked)}
                        />
                        Collapse whitespace
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
                    <button className="ig-item" onClick={handleMinify}>Minify</button>
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