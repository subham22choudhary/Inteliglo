"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["DEVELOPER TOOLS", "UTILITY"],
};

function analyzeText(text) {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;

    const words = text.trim() === "" ? [] : text.trim().split(/\s+/);
    const wordCount = words.length;

    const sentences = text.trim() === "" ? [] : text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const sentenceCount = sentences.length;

    const paragraphs = text.trim() === "" ? [] : text.split(/\n+/).filter((p) => p.trim().length > 0);
    const paragraphCount = paragraphs.length;

    const avgWordLength = wordCount > 0 ? charactersNoSpaces / wordCount : 0;
    const avgWordsPerSentence = sentenceCount > 0 ? wordCount / sentenceCount : 0;

    // Reading time: ~200 wpm, Speaking time: ~130 wpm
    const readingTimeSec = (wordCount / 200) * 60;
    const speakingTimeSec = (wordCount / 130) * 60;

    return {
        characters,
        charactersNoSpaces,
        wordCount,
        sentenceCount,
        paragraphCount,
        avgWordLength,
        avgWordsPerSentence,
        readingTimeSec,
        speakingTimeSec,
    };
}

function formatTime(seconds) {
    if (seconds < 60) return `${Math.ceil(seconds)} sec`;
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return secs > 0 ? `${mins} min ${secs} sec` : `${mins} min`;
}

export default function Page() {
    const [text, setText] = useState("");
    const [copied, setCopied] = useState(false);

    const stats = useMemo(() => analyzeText(text), [text]);

    const handleCopy = async () => {
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // ignore
        }
    };

    const handleClear = () => setText("");

    const handleUppercase = () => setText(text.toUpperCase());
    const handleLowercase = () => setText(text.toLowerCase());
    const handleTitleCase = () => setText(text.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()));

    // Sentence case: capitalize first letter of each sentence, rest lowercase
    const handleSentenceCase = () =>
        setText(
            text
                .toLowerCase()
                .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
        );

    // aLtErNaTiNg cAsE: alternate lower/upper per character (ignoring spaces don't reset the alternation)
    const handleAlternatingCase = () =>
        setText(
            text
                .split("")
                .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
                .join("")
        );

    // InVeRsE cAsE: flip the case of every character
    const handleInverseCase = () =>
        setText(
            text
                .split("")
                .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
                .join("")
        );

    const handleTrimSpaces = () => setText(text.replace(/\s+/g, " ").trim());
    const handleRemoveLineBreaks = () => setText(text.replace(/\n+/g, " "));

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Developer Tools</p>
                <h1 style={{ textAlign: "center" }}>Word Counter & Text Analyzer</h1>

                {/* INPUT — highlighted */}
                <div className="ig-category">
                    <p className="ig-category-label">Paste or Type Your Text</p>
                    <textarea
                        className="ig-input"
                        style={{
                            width: "100%",
                            padding: "16px",
                            fontSize: 16,
                            minHeight: 220,
                            resize: "vertical",
                            border: "2px solid #3b82f6",
                            borderRadius: 10,
                            boxShadow: "0 0 0 3px rgba(59,130,246,0.15)",
                            fontFamily: "inherit",
                            lineHeight: 1.6,
                        }}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Start typing or paste your text here..."
                        autoFocus
                    />
                </div>

                {/* OUTPUT — key stats, highlighted, right below input */}
                <div className="ig-category">
                    <p className="ig-category-label">Quick Stats</p>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                            gap: 10,
                            padding: "16px",
                            border: "2px solid #22c55e",
                            borderRadius: 10,
                            boxShadow: "0 0 0 3px rgba(34,197,94,0.15)",
                            background: "rgba(34,197,94,0.06)",
                        }}
                    >
                        <StatBox label="Words" value={stats.wordCount} />
                        <StatBox label="Characters" value={stats.characters} />
                        <StatBox label="Characters (no spaces)" value={stats.charactersNoSpaces} />
                        <StatBox label="Sentences" value={stats.sentenceCount} />
                        <StatBox label="Paragraphs" value={stats.paragraphCount} />
                    </div>
                </div>

                {/* ACTIONS — directly below output */}
                <div className="ig-category" style={{ display: "flex", gap: 10, flexWrap: "wrap", gridTemplateColumns: "unset" }}>
                    <button className="ig-item ig-metal-btn" style={{ flex: 1, minWidth: 120 }} onClick={handleCopy} disabled={!text}>
                        {copied ? "Copied ✓" : "Copy Text"}
                    </button>
                    <button className="ig-item ig-metal-btn" style={{ flex: 1, minWidth: 120 }} onClick={handleClear}>Clear</button>
                </div>

                {/* TEXT TRANSFORM TOOLS */}
                <div className="ig-category" style={{ marginTop: 24 }}>
                    <p className="ig-category-label">Transform Text</p>
                    <div className="ig-list" style={{ display: "flex", gap: 8, flexWrap: "wrap", gridTemplateColumns: "unset" }}>
                        <button className="ig-item ig-metal-btn" style={{ flex: "1 1 130px" }} onClick={handleUppercase}>UPPERCASE</button>
                        <button className="ig-item ig-metal-btn" style={{ flex: "1 1 130px" }} onClick={handleLowercase}>lowercase</button>
                        <button className="ig-item ig-metal-btn" style={{ flex: "1 1 130px" }} onClick={handleTitleCase}>Title Case</button>
                        <button className="ig-item ig-metal-btn" style={{ flex: "1 1 130px" }} onClick={handleSentenceCase}>Sentence case</button>
                        <button className="ig-item ig-metal-btn" style={{ flex: "1 1 130px" }} onClick={handleAlternatingCase}>aLtErNaTiNg cAsE</button>
                        <button className="ig-item ig-metal-btn" style={{ flex: "1 1 130px" }} onClick={handleInverseCase}>InVeRsE cAsE</button>
                        <button className="ig-item ig-metal-btn" style={{ flex: "1 1 130px" }} onClick={handleTrimSpaces}>Trim Extra Spaces</button>
                        <button className="ig-item ig-metal-btn" style={{ flex: "1 1 130px" }} onClick={handleRemoveLineBreaks}>Remove Line Breaks</button>
                    </div>
                </div>

                {/* DETAILED STATS */}
                <div className="ig-category">
                    <p className="ig-category-label">Detailed Analysis</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Average Word Length: {stats.avgWordLength.toFixed(1)} characters</div>
                        <div className="ig-item ig-result">Average Words per Sentence: {stats.avgWordsPerSentence.toFixed(1)}</div>
                        <div className="ig-item ig-result">Estimated Reading Time: {formatTime(stats.readingTimeSec)}</div>
                        <div className="ig-item ig-result">Estimated Speaking Time: {formatTime(stats.speakingTimeSec)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Reading time assumes ~200 words/min (average adult silent reading speed); speaking
                    time assumes ~130 words/min (average speech pace). Everything runs in your browser —
                    nothing is uploaded or stored.
                </p>
            </div>
        </div>
    );
}

function StatBox({ label, value }) {
    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#16a34a", fontFamily: "monospace" }}>{value}</div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{label}</div>
        </div>
    );
}

const disclaimerStyle = {
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 11,
    color: "#666",
    lineHeight: 1.6,
    marginTop: 32,
    textAlign: "center",
};