"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useRef, useEffect } from "react";

// Prettier standalone is ESM + async-loaded on demand (keeps initial bundle light)
let prettierCore = null;
let prettierPlugins = null;

async function loadPrettier() {
    if (!prettierCore) {
        const [core, babel, estree, html, postcss] = await Promise.all([
            import("prettier/standalone"),
            import("prettier/plugins/babel"),
            import("prettier/plugins/estree"),
            import("prettier/plugins/html"),
            import("prettier/plugins/postcss"),
        ]);

        prettierCore = core;
        prettierPlugins = {
            babel: babel.default,
            estree: estree.default,
            html: html.default,
            postcss: postcss.default,
        };
    }

    return { prettierCore, prettierPlugins };
}

async function formatCode(input, language, indentSize) {
    if (!input.trim()) return "";

    const { prettierCore, prettierPlugins } = await loadPrettier();

    const parserMap = {
        html: "html",
        css: "css",
        javascript: "babel",
    };

    const pluginsMap = {
        html: [prettierPlugins.html],
        css: [prettierPlugins.postcss],
        javascript: [prettierPlugins.babel, prettierPlugins.estree],
    };

    const result = await prettierCore.format(input, {
        parser: parserMap[language],
        plugins: pluginsMap[language],
        tabWidth: indentSize,
        useTabs: false,
        semi: true,
        singleQuote: false,
    });

    return result;
}

const examples = {
    html: `<div class="container"><h1>Hello World</h1><p>This is an example.</p><button>Click Me</button></div>`,
    css: `.container{display:flex;align-items:center;justify-content:center;padding:20px;background:#111;color:#fff}.container h1{font-size:32px;margin:0 0 10px}`,
    javascript: `function greet(name){const message="Hello, "+name;console.log(message);return message;}greet("World");`,
};

const languages = [
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "javascript", label: "JavaScript" },
];

const indents = [
    { value: "2", label: "2 Spaces" },
    { value: "4", label: "4 Spaces" },
    { value: "8", label: "8 Spaces" },
];

function CustomSelect({ value, options, onChange, width = 130 }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const current = options.find((o) => o.value === value);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} style={{ position: "relative", width }}>
            <button
                onClick={() => setOpen((o) => !o)}
                style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "linear-gradient(180deg, #1a1a1a, #151515)",
                    border: "1px solid #2e2e2e",
                    borderRadius: 8,
                    padding: "8px 10px 8px 13px",
                    color: "#e8e8e8",
                    fontSize: 12.5,
                    fontWeight: 500,
                    cursor: "pointer",
                    boxShadow: open
                        ? "0 0 0 1px #3d3d3d, 0 4px 14px rgba(0,0,0,0.35)"
                        : "0 1px 2px rgba(0,0,0,0.2)",
                    transition: "box-shadow .15s ease, border-color .15s ease",
                }}
            >
                <span>{current?.label}</span>
                <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    style={{
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform .15s ease",
                        opacity: 0.6,
                        marginLeft: 8,
                        flexShrink: 0,
                    }}
                >
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {open ? (
                <div
                    style={{
                        position: "absolute",
                        top: "calc(100% + 6px)",
                        left: 0,
                        right: 0,
                        background: "#181818",
                        border: "1px solid #2e2e2e",
                        borderRadius: 8,
                        overflow: "hidden",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                        zIndex: 30,
                    }}
                >
                    {options.map((o) => (
                        <div
                            key={o.value}
                            onClick={() => {
                                onChange(o.value);
                                setOpen(false);
                            }}
                            style={{
                                padding: "9px 13px",
                                fontSize: 12.5,
                                color: o.value === value ? "#fff" : "#aaa",
                                background: o.value === value ? "#262626" : "transparent",
                                fontWeight: o.value === value ? 600 : 400,
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                                if (o.value !== value) e.currentTarget.style.background = "#202020";
                            }}
                            onMouseLeave={(e) => {
                                if (o.value !== value) e.currentTarget.style.background = "transparent";
                            }}
                        >
                            {o.label}
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export default function Page() {
    const [language, setLanguage] = useState("html");
    const [indentSize, setIndentSize] = useState("2");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFormat = async () => {
        setError("");
        setCopied(false);

        if (!input.trim()) {
            setOutput("");
            setError("Please enter some code first.");
            return;
        }

        setLoading(true);

        try {
            const formatted = await formatCode(input, language, Number(indentSize));
            setOutput(formatted);
        } catch (err) {
            setOutput("");
            setError(
                err?.message
                    ? `Unable to format: ${err.message.split("\n")[0]}`
                    : "Unable to format this code. Please check your syntax."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        if (!output) return;
        try {
            await navigator.clipboard.writeText(output);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    const handleClear = () => {
        setInput("");
        setOutput("");
        setError("");
        setCopied(false);
    };

    const handleExample = () => {
        setInput(examples[language]);
        setOutput("");
        setError("");
    };

    return (
        <div className="ig formatter-page">
            <div
                className="ig-inner"
                style={{
                    maxWidth: 1400,
                    height: "calc(100vh - 40px)",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >
                {/* Header */}
                <div style={{ flexShrink: 0, textAlign: "center", marginBottom: 16 }}>
                    <ToolCategory category="Developer" />
                    <h1 style={{ margin: "8px 0 6px" }}>HTML CSS JS Formatter</h1>
                    <p style={{ color: "#888", fontSize: 13, margin: 0 }}>
                        Format and beautify your HTML, CSS, and JavaScript code instantly.
                    </p>
                </div>

                {/* Toolbar */}
                <div
                    style={{
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        padding: 10,
                        border: "1px solid #262626",
                        background: "linear-gradient(180deg, #131313, #0e0e0e)",
                        borderRadius: 12,
                        marginBottom: 12,
                        boxShadow: "0 1px 0 rgba(255,255,255,0.03) inset, 0 8px 20px rgba(0,0,0,0.25)",
                    }}
                >
                    {/* Language pills */}
                    <div
                        style={{
                            display: "flex",
                            gap: 4,
                            background: "#161616",
                            padding: 4,
                            borderRadius: 9,
                            border: "1px solid #232323",
                        }}
                    >
                        {languages.map(({ value, label }) => (
                            <button
                                key={value}
                                onClick={() => {
                                    setLanguage(value);
                                    setOutput("");
                                    setError("");
                                }}
                                style={{
                                    border: "none",
                                    borderRadius: 7,
                                    padding: "7px 15px",
                                    background: language === value
                                        ? "linear-gradient(180deg, #333, #262626)"
                                        : "transparent",
                                    color: language === value ? "#fff" : "#888",
                                    fontSize: 12,
                                    fontWeight: language === value ? 600 : 400,
                                    cursor: "pointer",
                                    boxShadow: language === value ? "0 1px 3px rgba(0,0,0,0.4)" : "none",
                                    transition: "all .15s ease",
                                }}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Right controls */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <CustomSelect value={indentSize} options={indents} onChange={setIndentSize} width={112} />

                        <button onClick={handleExample} style={secondaryButton}>Example</button>
                        <button onClick={handleClear} style={secondaryButton}>Clear</button>
                        <button
                            onClick={handleFormat}
                            disabled={loading}
                            style={{
                                ...primaryButton,
                                opacity: loading ? 0.6 : 1,
                                cursor: loading ? "default" : "pointer",
                            }}
                        >
                            {loading ? "Formatting..." : "Format Code"}
                        </button>
                    </div>
                </div>

                {/* Error */}
                {error ? (
                    <div
                        style={{
                            flexShrink: 0,
                            padding: "9px 12px",
                            borderRadius: 8,
                            border: "1px solid #482727",
                            background: "#211515",
                            color: "#ff8f8f",
                            fontSize: 12,
                            marginBottom: 10,
                        }}
                    >
                        {error}
                    </div>
                ) : null}

                {/* Editors */}
                <div
                    className="formatter-editors"
                    style={{
                        flex: 1,
                        minHeight: 0,
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                    }}
                >
                    {/* Input */}
                    <div style={editorPanel}>
                        <div style={editorHeader}>
                            <span>INPUT</span>
                            <span style={languageBadge}>
                                {language === "javascript" ? "JS" : language.toUpperCase()}
                            </span>
                        </div>

                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={`Paste your ${language} code here...`}
                            spellCheck={false}
                            style={textareaStyle}
                        />

                        <div style={editorFooter}>{input.length} characters</div>
                    </div>

                    {/* Output */}
                    <div style={editorPanel}>
                        <div style={editorHeader}>
                            <span>OUTPUT</span>
                            <button
                                onClick={handleCopy}
                                disabled={!output}
                                style={{
                                    ...copyButton,
                                    opacity: output ? 1 : 0.4,
                                    cursor: output ? "pointer" : "default",
                                    color: copied ? "#7cd97c" : "#aaa",
                                    borderColor: copied ? "#2e5a2e" : "#303030",
                                }}
                            >
                                {copied ? "✓ Copied" : "Copy"}
                            </button>
                        </div>

                        <textarea
                            value={output}
                            readOnly
                            placeholder="Formatted code will appear here..."
                            spellCheck={false}
                            style={{ ...textareaStyle, color: output ? "#e5e5e5" : "#555" }}
                        />

                        <div style={editorFooter}>{output.length} characters</div>
                    </div>
                </div>

                {/* Footer */}
                <p
                    style={{
                        flexShrink: 0,
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontSize: 10,
                        color: "#555",
                        lineHeight: 1.5,
                        margin: "10px 0 0",
                        textAlign: "center",
                    }}
                >
                    Your code is processed locally in your browser and is not uploaded or stored.
                </p>
            </div>

            <style jsx>{`
                @media (max-width: 800px) {
                    .formatter-page {
                        overflow: auto !important;
                    }
                    .formatter-page > div {
                        height: auto !important;
                        min-height: calc(100vh - 40px);
                    }
                    .formatter-editors {
                        grid-template-columns: 1fr !important;
                        min-height: 700px !important;
                    }
                    .formatter-editors > div {
                        min-height: 340px;
                    }
                }
            `}</style>
        </div>
    );
}

const editorPanel = {
    minWidth: 0,
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    border: "1px solid #262626",
    borderRadius: 12,
    overflow: "hidden",
    background: "linear-gradient(180deg, #111, #0d0d0d)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
};

const editorHeader = {
    flexShrink: 0,
    height: 42,
    padding: "0 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #262626",
    background: "#141414",
    color: "#888",
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.08em",
};

const editorFooter = {
    flexShrink: 0,
    padding: "7px 12px",
    borderTop: "1px solid #262626",
    background: "#121212",
    color: "#555",
    fontSize: 10,
};

const languageBadge = {
    padding: "3px 7px",
    borderRadius: 5,
    background: "#222",
    color: "#888",
    fontSize: 9,
};

const textareaStyle = {
    flex: 1,
    minHeight: 0,
    width: "100%",
    border: "none",
    outline: "none",
    resize: "none",
    background: "transparent",
    color: "#e5e5e5",
    padding: 16,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: 13,
    lineHeight: 1.65,
    tabSize: 2,
};

const primaryButton = {
    padding: "8px 16px",
    border: "1px solid #444",
    borderRadius: 8,
    background: "linear-gradient(180deg, #f2f2f2, #dcdcdc)",
    color: "#111",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
};

const secondaryButton = {
    padding: "8px 13px",
    border: "1px solid #2e2e2e",
    borderRadius: 8,
    background: "linear-gradient(180deg, #1a1a1a, #151515)",
    color: "#aaa",
    fontSize: 12,
    cursor: "pointer",
};

const copyButton = {
    padding: "5px 10px",
    border: "1px solid #303030",
    borderRadius: 6,
    background: "#1c1c1c",
    fontSize: 10,
    fontWeight: 500,
};