"use client";

import { useState } from "react";

export const meta = {
    tags: ["DEVELOPER TOOLS"],
};

const WORDS = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do",
    "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim",
    "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi",
    "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit",
    "voluptate", "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt",
    "mollit", "anim", "id", "est", "laborum", "at", "vero", "eos", "accusamus", "iusto", "odio",
    "dignissimos", "ducimus", "blanditiis", "praesentium", "voluptatum", "deleniti", "atque",
    "corrupti", "quos", "quas", "molestias", "excepturi", "sint", "occaecati", "cupiditate",
    "provident", "similique", "sunt", "culpa", "officia", "deserunt", "mollitia", "animi",
];

function randomWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function generateSentence(minWords = 6, maxWords = 14) {
    const len = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
    const words = Array.from({ length: len }, () => randomWord());
    let sentence = words.join(" ");
    sentence = capitalize(sentence);
    return sentence + ".";
}

function generateParagraph(sentenceCount = 5) {
    return Array.from({ length: sentenceCount }, () => generateSentence()).join(" ");
}

function generateOutput({ unit, count, startWithLorem }) {
    if (unit === "words") {
        const words = Array.from({ length: count }, () => randomWord());
        if (startWithLorem) {
            const prefix = ["lorem", "ipsum", "dolor", "sit", "amet"].slice(0, Math.min(5, count));
            for (let i = 0; i < prefix.length; i++) words[i] = prefix[i];
        }
        words[0] = capitalize(words[0]);
        return [words.join(" ") + "."];
    }

    if (unit === "sentences") {
        const sentences = Array.from({ length: count }, () => generateSentence());
        if (startWithLorem) {
            sentences[0] =
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
        }
        return sentences;
    }

    // paragraphs
    const paragraphs = Array.from({ length: count }, () => generateParagraph());
    if (startWithLorem) {
        paragraphs[0] =
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
            paragraphs[0];
    }
    return paragraphs;
}

export default function Page() {
    const [unit, setUnit] = useState("paragraphs");
    const [count, setCount] = useState(3);
    const [startWithLorem, setStartWithLorem] = useState(true);
    const [output, setOutput] = useState(() =>
        generateOutput({ unit: "paragraphs", count: 3, startWithLorem: true })
    );
    const [status, setStatus] = useState("");
    const [statusType, setStatusType] = useState("info");

    const handleGenerate = () => {
        const clamped = Math.min(50, Math.max(1, Number(count) || 1));
        setCount(clamped);
        setOutput(generateOutput({ unit, count: clamped, startWithLorem }));
        setStatus(`Generated ${clamped} ${unit}.`);
        setStatusType("success");
    };

    const joinedOutput = output.join(unit === "paragraphs" ? "\n\n" : "\n");

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

    const statusColor =
        statusType === "error" ? "#e05a4e" : statusType === "success" ? "#4caf3d" : "#c9a900";

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>Lorem Ipsum Generator</h1>

                <div style={controlsStyle}>
                    <label style={labelStyle}>
                        Count
                        <input
                            type="number"
                            min={1}
                            max={50}
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                            style={numberInputStyle}
                        />
                    </label>

                    <label style={labelStyle}>
                        Unit
                        <select
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            style={selectStyle}
                        >
                            <option value="words">Words</option>
                            <option value="sentences">Sentences</option>
                            <option value="paragraphs">Paragraphs</option>
                        </select>
                    </label>

                    <label style={checkboxLabelStyle}>
                        <input
                            type="checkbox"
                            checked={startWithLorem}
                            onChange={(e) => setStartWithLorem(e.target.checked)}
                        />
                        Start with "Lorem ipsum..."
                    </label>
                </div>

                <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <button className="ig-item" onClick={handleGenerate}>Generate</button>
                    <button className="ig-item" style={secondaryBtnStyle} onClick={handleCopyAll}>Copy All</button>
                </div>
                <p style={{ ...statusStyle, color: statusColor }}>{status}</p>

                <div className="ig-category" style={{ marginTop: 40 }}>
                    <p className="ig-category-label">
                        Generated {unit.charAt(0).toUpperCase() + unit.slice(1)}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {output.map((item, idx) => (
                            <div key={idx} style={itemRowStyle}>
                                <p style={itemTextStyle}>{item}</p>
                                <button style={copyIconBtn} onClick={() => handleCopyOne(item)}>
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

const selectStyle = {
    background: "#141414",
    color: "#f5f5f0",
    border: "1px solid #262626",
    borderRadius: 2,
    padding: "6px 10px",
    fontFamily: "Helvetica, Arial, sans-serif",
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

const itemRowStyle = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    background: "#141414",
    border: "1px solid #262626",
    borderRadius: 2,
    padding: "12px 18px",
};

const itemTextStyle = {
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 14,
    color: "#f5f5f0",
    lineHeight: 1.6,
    margin: 0,
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