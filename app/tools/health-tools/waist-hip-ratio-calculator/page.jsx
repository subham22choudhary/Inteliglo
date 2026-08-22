"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["HEALTH"],
};

function calculateWHR(waistCm, hipCm, gender) {
    const ratio = waistCm / hipCm;

    let riskCategory;
    if (gender === "male") {
        if (ratio < 0.9) riskCategory = "Low Risk";
        else if (ratio < 1.0) riskCategory = "Moderate Risk";
        else riskCategory = "High Risk";
    } else {
        if (ratio < 0.8) riskCategory = "Low Risk";
        else if (ratio < 0.85) riskCategory = "Moderate Risk";
        else riskCategory = "High Risk";
    }

    return { ratio, riskCategory };
}

const LIMITS = {
    waist: { min: 40, max: 180, step: 0.5 },
    hip: { min: 40, max: 180, step: 0.5 },
};

export default function Page() {
    const [waistCm, setWaistCm] = useState(85);
    const [hipCm, setHipCm] = useState(95);
    const [gender, setGender] = useState("male");

    const { ratio, riskCategory } = useMemo(() => {
        const w = Number(waistCm) || 1;
        const h = Number(hipCm) || 1;
        return calculateWHR(w, h, gender);
    }, [waistCm, hipCm, gender]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Health</p>
                <h1 style={{ textAlign: "center" }}>Waist-to-Hip Ratio Calculator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Gender</p>
                    <div className="ig-list" style={{ display: "flex", gap: 8, gridTemplateColumns: "unset" }}>
                        <button className={`ig-item ig-metal-btn${gender === "male" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setGender("male")}>Male</button>
                        <button className={`ig-item ig-metal-btn${gender === "female" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setGender("female")}>Female</button>
                    </div>
                </div>

                <FieldWithSlider label="Waist Circumference" suffix="cm" value={waistCm} onChange={setWaistCm} limits={LIMITS.waist} />
                <FieldWithSlider label="Hip Circumference" suffix="cm" value={hipCm} onChange={setHipCm} limits={LIMITS.hip} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result ig-result-total">Waist-to-Hip Ratio: {ratio.toFixed(2)}</div>
                        <div className="ig-item ig-result">Health Risk Category: {riskCategory}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    WHR is used by WHO as an indicator of abdominal fat distribution and cardiovascular
                    risk. Measure waist at the narrowest point (usually above the belly button) and hip
                    at the widest point. Consult a doctor for a complete cardiovascular risk assessment.
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