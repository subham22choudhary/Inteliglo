"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["HEALTH"],
};

function calculateWaterIntake(weightKg, activityMinutes, climate) {
    const baseIntakeMl = weightKg * 35; // 35ml per kg body weight
    const exerciseAddOn = (activityMinutes / 30) * 350; // ~350ml per 30 min exercise
    const climateMultiplier = climate === "hot" ? 1.15 : climate === "cold" ? 0.95 : 1;

    const totalMl = (baseIntakeMl + exerciseAddOn) * climateMultiplier;
    const totalLitres = totalMl / 1000;
    const glasses = totalMl / 250; // 250ml per glass

    return { totalMl, totalLitres, glasses };
}

const LIMITS = {
    weight: { min: 20, max: 200, step: 0.5 },
    activityMinutes: { min: 0, max: 180, step: 5 },
};

export default function Page() {
    const [weightKg, setWeightKg] = useState(65);
    const [activityMinutes, setActivityMinutes] = useState(30);
    const [climate, setClimate] = useState("moderate");

    const { totalMl, totalLitres, glasses } = useMemo(() => {
        const w = Number(weightKg) || 0;
        const a = Number(activityMinutes) || 0;
        return calculateWaterIntake(w, a, climate);
    }, [weightKg, activityMinutes, climate]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Health</p>
                <h1 style={{ textAlign: "center" }}>Water Intake Calculator</h1>

                <FieldWithSlider label="Body Weight" suffix="kg" value={weightKg} onChange={setWeightKg} limits={LIMITS.weight} />
                <FieldWithSlider label="Daily Exercise Duration" suffix="minutes" value={activityMinutes} onChange={setActivityMinutes} limits={LIMITS.activityMinutes} />

                <div className="ig-category">
                    <p className="ig-category-label">Climate</p>
                    <div className="ig-list" style={{ display: "flex", gap: 8, gridTemplateColumns: "unset" }}>
                        <button className={`ig-item ig-metal-btn${climate === "cold" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setClimate("cold")}>Cold</button>
                        <button className={`ig-item ig-metal-btn${climate === "moderate" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setClimate("moderate")}>Moderate</button>
                        <button className={`ig-item ig-metal-btn${climate === "hot" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setClimate("hot")}>Hot / Humid</button>
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result ig-result-total">Daily Water Intake: {totalLitres.toFixed(2)} litres</div>
                        <div className="ig-item ig-result">≈ {glasses.toFixed(1)} glasses (250ml each)</div>
                        <div className="ig-item ig-result">{totalMl.toFixed(0)} ml total</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    General estimate based on body weight, activity, and climate. Actual needs vary with
                    health conditions, pregnancy, and diet (fruits/vegetables also contribute to hydration).
                    Consult a doctor if you have kidney or heart conditions before changing water intake.
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