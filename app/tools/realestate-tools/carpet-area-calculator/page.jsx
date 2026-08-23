"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateAreas(inputArea, inputType, loadingPercent) {
    const loading = loadingPercent / 100;
    let carpetArea, builtUpArea, superBuiltUpArea;

    if (inputType === "carpet") {
        carpetArea = inputArea;
        builtUpArea = carpetArea * (1 + loading);
        superBuiltUpArea = builtUpArea * 1.15; // approx common area addition
    } else if (inputType === "builtup") {
        builtUpArea = inputArea;
        carpetArea = builtUpArea / (1 + loading);
        superBuiltUpArea = builtUpArea * 1.15;
    } else {
        superBuiltUpArea = inputArea;
        builtUpArea = superBuiltUpArea / 1.15;
        carpetArea = builtUpArea / (1 + loading);
    }

    return { carpetArea, builtUpArea, superBuiltUpArea };
}

const LIMITS = {
    area: { min: 100, max: 10000, step: 10 },
    loading: { min: 10, max: 40, step: 1 },
};

export default function Page() {
    const [inputArea, setInputArea] = useState(1000);
    const [inputType, setInputType] = useState("superbuiltup");
    const [loadingPercent, setLoadingPercent] = useState(25);

    const { carpetArea, builtUpArea, superBuiltUpArea } = useMemo(() => {
        const a = Number(inputArea) || 0;
        const l = Number(loadingPercent) || 0;
        return calculateAreas(a, inputType, l);
    }, [inputArea, inputType, loadingPercent]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Real Estate" />
                <h1 style={{ textAlign: "center" }}>Carpet Area vs Built-up Area Converter</h1>

                <div className="ig-category">
                    <p className="ig-category-label">I Know My</p>
                    <div className="ig-list" style={{ display: "flex", gap: 8, gridTemplateColumns: "unset", flexWrap: "wrap" }}>
                        <button className={`ig-item ig-metal-btn${inputType === "carpet" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setInputType("carpet")}>Carpet Area</button>
                        <button className={`ig-item ig-metal-btn${inputType === "builtup" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setInputType("builtup")}>Built-up Area</button>
                        <button className={`ig-item ig-metal-btn${inputType === "superbuiltup" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setInputType("superbuiltup")}>Super Built-up Area</button>
                    </div>
                </div>

                <FieldWithSlider label="Area (sq. ft.)" suffix="sq. ft." value={inputArea} onChange={setInputArea} limits={LIMITS.area} />
                <FieldWithSlider label="Wall/Loading Factor" suffix="%" value={loadingPercent} onChange={setLoadingPercent} limits={LIMITS.loading} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Carpet Area: {carpetArea.toFixed(0)} sq. ft.</div>
                        <div className="ig-item ig-result">Built-up Area: {builtUpArea.toFixed(0)} sq. ft.</div>
                        <div className="ig-item ig-result ig-result-total">Super Built-up Area: {superBuiltUpArea.toFixed(0)} sq. ft.</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Carpet area = usable floor space. Built-up area = carpet + walls (loading ~10-25%).
                    Super built-up area = built-up + proportionate common areas (lobby, stairs, etc.),
                    typically ~15% more. Actual RERA-mandated carpet area disclosures are the most reliable figure.
                </p>
            </div>
        </div>
    );
}

function FieldWithSlider({ label, value, onChange, limits, prefix, suffix }) {
    const { min, max, step } = limits;
    const clamp = (v) => Math.min(max, Math.max(min, v));
    const handleNumberChange = (e) => onChange(e.target.value === "" ? "" : Number(e.target.value));
    const handleNumberBlur = () => onChange(clamp(Number(value) || min));
    const handleSliderChange = (e) => onChange(Number(e.target.value));
    const percent = ((clamp(Number(value) || min) - min) / (max - min)) * 100;

    return (
        <div className="ig-category">
            <p className="ig-category-label">{label}</p>
            <div className="ig-field">
                {prefix && <span className="ig-field-prefix">{prefix}</span>}
                <input className="ig-input" type="number" min={min} max={max} step={step} value={value} onChange={handleNumberChange} onBlur={handleNumberBlur} />
                {suffix && <span className="ig-field-suffix">{suffix}</span>}
            </div>
            <input className="ig-slider" type="range" min={min} max={max} step={step} value={clamp(Number(value) || min)} onChange={handleSliderChange} style={{ "--ig-slider-percent": `${percent}%` }} />
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