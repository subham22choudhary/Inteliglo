"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateBodyFat(gender, heightCm, neckCm, waistCm, hipCm) {
    let bodyFatPercent;

    if (gender === "male") {
        bodyFatPercent = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
    } else {
        bodyFatPercent = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
    }

    let category;
    if (gender === "male") {
        if (bodyFatPercent < 6) category = "Essential Fat";
        else if (bodyFatPercent < 14) category = "Athletic";
        else if (bodyFatPercent < 18) category = "Fitness";
        else if (bodyFatPercent < 25) category = "Average";
        else category = "Obese";
    } else {
        if (bodyFatPercent < 14) category = "Essential Fat";
        else if (bodyFatPercent < 21) category = "Athletic";
        else if (bodyFatPercent < 25) category = "Fitness";
        else if (bodyFatPercent < 32) category = "Average";
        else category = "Obese";
    }

    return { bodyFatPercent: Math.max(bodyFatPercent, 0), category };
}

const LIMITS = {
    height: { min: 100, max: 220, step: 1 },
    neck: { min: 20, max: 60, step: 0.5 },
    waist: { min: 40, max: 180, step: 0.5 },
    hip: { min: 40, max: 180, step: 0.5 },
};

export default function Page() {
    const [gender, setGender] = useState("male");
    const [heightCm, setHeightCm] = useState(170);
    const [neckCm, setNeckCm] = useState(38);
    const [waistCm, setWaistCm] = useState(85);
    const [hipCm, setHipCm] = useState(95);

    const { bodyFatPercent, category } = useMemo(() => {
        const h = Number(heightCm) || 1;
        const n = Number(neckCm) || 1;
        const w = Number(waistCm) || 1;
        const hip = Number(hipCm) || 1;
        return calculateBodyFat(gender, h, n, w, hip);
    }, [gender, heightCm, neckCm, waistCm, hipCm]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Health" />
                <h1 style={{ textAlign: "center" }}>Body Fat % Calculator (US Navy Method)</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Gender</p>
                    <div className="ig-list" style={{ display: "flex", gap: 8, gridTemplateColumns: "unset" }}>
                        <button className={`ig-item ig-metal-btn${gender === "male" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setGender("male")}>Male</button>
                        <button className={`ig-item ig-metal-btn${gender === "female" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setGender("female")}>Female</button>
                    </div>
                </div>

                <FieldWithSlider label="Height" suffix="cm" value={heightCm} onChange={setHeightCm} limits={LIMITS.height} />
                <FieldWithSlider label="Neck Circumference" suffix="cm" value={neckCm} onChange={setNeckCm} limits={LIMITS.neck} />
                <FieldWithSlider label="Waist Circumference" suffix="cm" value={waistCm} onChange={setWaistCm} limits={LIMITS.waist} />
                {gender === "female" && (
                    <FieldWithSlider label="Hip Circumference" suffix="cm" value={hipCm} onChange={setHipCm} limits={LIMITS.hip} />
                )}

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result ig-result-total">Body Fat: {bodyFatPercent.toFixed(1)}% — {category}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Uses the US Navy circumference method — reasonably accurate for most people but
                    less precise than DEXA scans or calipers. Measure waist at the narrowest point, neck
                    below the larynx, and hip at the widest point for best accuracy.
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