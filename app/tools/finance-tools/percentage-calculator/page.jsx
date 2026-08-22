"use client";

import { useState, useMemo } from "react";

const MODES = [
    { key: "of", label: "X% of Y" },
    { key: "isWhatPercent", label: "X is what % of Y" },
    { key: "change", label: "% Increase/Decrease" },
];

function formatNumber(num) {
    if (!Number.isFinite(num)) return "—";
    return num.toLocaleString("en-IN", { maximumFractionDigits: 4 });
}

export default function Page() {
    const [mode, setMode] = useState("of");

    // Mode: X% of Y
    const [percentOf, setPercentOf] = useState(20);
    const [valueOf, setValueOf] = useState(500);

    // Mode: X is what % of Y
    const [partValue, setPartValue] = useState(50);
    const [wholeValue, setWholeValue] = useState(200);

    // Mode: % increase/decrease
    const [fromValue, setFromValue] = useState(100);
    const [toValue, setToValue] = useState(150);

    const resultOf = useMemo(() => {
        const p = Number(percentOf) || 0;
        const v = Number(valueOf) || 0;
        return (p * v) / 100;
    }, [percentOf, valueOf]);

    const resultIsWhatPercent = useMemo(() => {
        const part = Number(partValue) || 0;
        const whole = Number(wholeValue) || 0;
        if (whole === 0) return null;
        return (part / whole) * 100;
    }, [partValue, wholeValue]);

    const resultChange = useMemo(() => {
        const from = Number(fromValue) || 0;
        const to = Number(toValue) || 0;
        if (from === 0) return null;
        const diff = to - from;
        const pctChange = (diff / Math.abs(from)) * 100;
        return { diff, pctChange, isIncrease: diff >= 0 };
    }, [fromValue, toValue]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>Percentage Calculator</h1>

                <div className="ig-category">
                    <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                        {MODES.map((m) => (
                            <button
                                key={m.key}
                                className="ig-item"
                                style={mode === m.key ? {} : { background: "transparent", color: "#f5f5f0", border: "1px solid #333" }}
                                onClick={() => setMode(m.key)}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>
                </div>

                {mode === "of" && (
                    <>
                        <div className="ig-category">
                            <p className="ig-category-label">What is</p>
                            <div className="ig-field">
                                <input
                                    className="ig-input"
                                    type="number"
                                    value={percentOf}
                                    onChange={(e) => setPercentOf(e.target.value)}
                                />
                                <span className="ig-field-suffix">%</span>
                            </div>
                        </div>
                        <div className="ig-category">
                            <p className="ig-category-label">of</p>
                            <div className="ig-field">
                                <input
                                    className="ig-input"
                                    type="number"
                                    value={valueOf}
                                    onChange={(e) => setValueOf(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="ig-category">
                            <p className="ig-category-label">Result</p>
                            <div className="ig-list">
                                <div className="ig-item" style={{ cursor: "default" }}>
                                    {percentOf}% of {formatNumber(Number(valueOf) || 0)} = {formatNumber(resultOf)}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {mode === "isWhatPercent" && (
                    <>
                        <div className="ig-category">
                            <p className="ig-category-label">Value</p>
                            <div className="ig-field">
                                <input
                                    className="ig-input"
                                    type="number"
                                    value={partValue}
                                    onChange={(e) => setPartValue(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="ig-category">
                            <p className="ig-category-label">is what percent of</p>
                            <div className="ig-field">
                                <input
                                    className="ig-input"
                                    type="number"
                                    value={wholeValue}
                                    onChange={(e) => setWholeValue(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="ig-category">
                            <p className="ig-category-label">Result</p>
                            <div className="ig-list">
                                <div className="ig-item" style={{ cursor: "default" }}>
                                    {resultIsWhatPercent === null
                                        ? "Undefined (divide by zero)"
                                        : `${formatNumber(Number(partValue) || 0)} is ${formatNumber(resultIsWhatPercent)}% of ${formatNumber(Number(wholeValue) || 0)}`}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {mode === "change" && (
                    <>
                        <div className="ig-category">
                            <p className="ig-category-label">From</p>
                            <div className="ig-field">
                                <input
                                    className="ig-input"
                                    type="number"
                                    value={fromValue}
                                    onChange={(e) => setFromValue(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="ig-category">
                            <p className="ig-category-label">To</p>
                            <div className="ig-field">
                                <input
                                    className="ig-input"
                                    type="number"
                                    value={toValue}
                                    onChange={(e) => setToValue(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="ig-category">
                            <p className="ig-category-label">Result</p>
                            <div className="ig-list">
                                {resultChange === null ? (
                                    <div className="ig-item" style={{ cursor: "default" }}>
                                        Undefined (starting value is zero)
                                    </div>
                                ) : (
                                    <>
                                        <div className="ig-item" style={{ cursor: "default" }}>
                                            Difference: {resultChange.diff >= 0 ? "+" : ""}
                                            {formatNumber(resultChange.diff)}
                                        </div>
                                        <div className="ig-item" style={{ cursor: "default" }}>
                                            {resultChange.isIncrease ? "Increase" : "Decrease"}: {formatNumber(Math.abs(resultChange.pctChange))}%
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}