"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateIdealWeight(heightCm, gender) {
    const heightIn = heightCm / 2.54;
    const inchesOver5Feet = Math.max(heightIn - 60, 0);

    // Devine formula
    const devine = gender === "male" ? 50 + 2.3 * inchesOver5Feet : 45.5 + 2.3 * inchesOver5Feet;

    // Robinson formula
    const robinson = gender === "male" ? 52 + 1.9 * inchesOver5Feet : 49 + 1.7 * inchesOver5Feet;

    // Miller formula
    const miller = gender === "male" ? 56.2 + 1.41 * inchesOver5Feet : 53.1 + 1.36 * inchesOver5Feet;

    // Hamwi formula
    const hamwi = gender === "male" ? 48 + 2.7 * inchesOver5Feet : 45.5 + 2.2 * inchesOver5Feet;

    const average = (devine + robinson + miller + hamwi) / 4;

    return { devine, robinson, miller, hamwi, average };
}

const LIMITS = {
    height: { min: 130, max: 210, step: 1 },
};

export default function Page() {
    const [heightCm, setHeightCm] = useState(170);
    const [gender, setGender] = useState("male");

    const { devine, robinson, miller, hamwi, average } = useMemo(() => {
        const h = Number(heightCm) || 1;
        return calculateIdealWeight(h, gender);
    }, [heightCm, gender]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Health" />
                <h1 style={{ textAlign: "center" }}>Ideal Weight Calculator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Gender</p>
                    <div className="ig-list" style={{ display: "flex", gap: 8, gridTemplateColumns: "unset" }}>
                        <button className={`ig-item ig-metal-btn${gender === "male" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setGender("male")}>Male</button>
                        <button className={`ig-item ig-metal-btn${gender === "female" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setGender("female")}>Female</button>
                    </div>
                </div>

                <FieldWithSlider label="Height" suffix="cm" value={heightCm} onChange={setHeightCm} limits={LIMITS.height} />

                <div className="ig-category">
                    <p className="ig-category-label">Results (Different Formulas)</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result ig-result-total">Average Estimate: {average.toFixed(1)} kg</div>
                        <div className="ig-item ig-result">Devine Formula: {devine.toFixed(1)} kg</div>
                        <div className="ig-item ig-result">Robinson Formula: {robinson.toFixed(1)} kg</div>
                        <div className="ig-item ig-result">Miller Formula: {miller.toFixed(1)} kg</div>
                        <div className="ig-item ig-result">Hamwi Formula: {hamwi.toFixed(1)} kg</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Shows four commonly used formulas (Devine, Robinson, Miller, Hamwi), each with slightly
                    different assumptions. None account for muscle mass, bone density, or body frame — treat
                    the average as a rough reference point, not a strict target.
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