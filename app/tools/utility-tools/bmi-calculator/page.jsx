"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["UTILITY", "HEALTH"],
};

function calculateBMI(weightKg, heightCm) {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);

    let category;
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal weight";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";

    const healthyMinWeight = 18.5 * heightM * heightM;
    const healthyMaxWeight = 24.9 * heightM * heightM;

    return { bmi, category, healthyMinWeight, healthyMaxWeight };
}

const LIMITS = {
    weight: { min: 20, max: 200, step: 0.5 },
    height: { min: 100, max: 220, step: 1 },
};

export default function Page() {
    const [weightKg, setWeightKg] = useState(70);
    const [heightCm, setHeightCm] = useState(170);

    const { bmi, category, healthyMinWeight, healthyMaxWeight } = useMemo(() => {
        const w = Number(weightKg) || 1;
        const h = Number(heightCm) || 1;
        return calculateBMI(w, h);
    }, [weightKg, heightCm]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>BMI Calculator</h1>

                <FieldWithSlider label="Weight" suffix="kg" value={weightKg} onChange={setWeightKg} limits={LIMITS.weight} />
                <FieldWithSlider label="Height" suffix="cm" value={heightCm} onChange={setHeightCm} limits={LIMITS.height} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result ig-result-total">Your BMI: {bmi.toFixed(1)} — {category}</div>
                        <div className="ig-item ig-result">Healthy Weight Range: {healthyMinWeight.toFixed(1)}–{healthyMaxWeight.toFixed(1)} kg</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    BMI is a general screening tool and doesn't account for muscle mass, bone density,
                    age, or sex — athletes and muscular individuals often show a higher BMI despite low
                    body fat. Consult a healthcare provider for a complete health assessment.
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