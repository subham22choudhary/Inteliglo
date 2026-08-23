"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

const ACTIVITY_LEVELS = {
    sedentary: { label: "Sedentary (little/no exercise)", multiplier: 1.2 },
    light: { label: "Light (exercise 1-3 days/week)", multiplier: 1.375 },
    moderate: { label: "Moderate (exercise 3-5 days/week)", multiplier: 1.55 },
    active: { label: "Active (exercise 6-7 days/week)", multiplier: 1.725 },
    veryActive: { label: "Very Active (hard exercise + physical job)", multiplier: 1.9 },
};

function calculateBMR(weightKg, heightCm, age, gender) {
    // Mifflin-St Jeor formula
    const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
    return gender === "male" ? base + 5 : base - 161;
}

const LIMITS = {
    weight: { min: 20, max: 200, step: 0.5 },
    height: { min: 100, max: 220, step: 1 },
    age: { min: 10, max: 90, step: 1 },
};

export default function Page() {
    const [weightKg, setWeightKg] = useState(65);
    const [heightCm, setHeightCm] = useState(170);
    const [age, setAge] = useState(28);
    const [gender, setGender] = useState("male");
    const [activityLevel, setActivityLevel] = useState("moderate");

    const { bmr, tdee, mildCut, cut, mildBulk, bulk } = useMemo(() => {
        const w = Number(weightKg) || 1;
        const h = Number(heightCm) || 1;
        const a = Number(age) || 1;
        const bmrVal = calculateBMR(w, h, a, gender);
        const tdeeVal = bmrVal * ACTIVITY_LEVELS[activityLevel].multiplier;

        return {
            bmr: bmrVal,
            tdee: tdeeVal,
            mildCut: tdeeVal - 250,
            cut: tdeeVal - 500,
            mildBulk: tdeeVal + 250,
            bulk: tdeeVal + 500,
        };
    }, [weightKg, heightCm, age, gender, activityLevel]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Health" />
                <h1 style={{ textAlign: "center" }}>BMR / Calorie Calculator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Gender</p>
                    <div className="ig-list" style={{ display: "flex", gap: 8, gridTemplateColumns: "unset" }}>
                        <button className={`ig-item ig-metal-btn${gender === "male" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setGender("male")}>Male</button>
                        <button className={`ig-item ig-metal-btn${gender === "female" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setGender("female")}>Female</button>
                    </div>
                </div>

                <FieldWithSlider label="Weight" suffix="kg" value={weightKg} onChange={setWeightKg} limits={LIMITS.weight} />
                <FieldWithSlider label="Height" suffix="cm" value={heightCm} onChange={setHeightCm} limits={LIMITS.height} />
                <FieldWithSlider label="Age" suffix="years" value={age} onChange={setAge} limits={LIMITS.age} />

                <div className="ig-category">
                    <p className="ig-category-label">Activity Level</p>
                    <select className="ig-input" style={{ width: "100%", padding: "10px 12px" }} value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                        {Object.entries(ACTIVITY_LEVELS).map(([key, a]) => (
                            <option key={key} value={key}>{a.label}</option>
                        ))}
                    </select>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">BMR (Basal Metabolic Rate): {bmr.toFixed(0)} kcal/day</div>
                        <div className="ig-item ig-result ig-result-total">Maintenance (TDEE): {tdee.toFixed(0)} kcal/day</div>
                        <div className="ig-item ig-result">Mild Weight Loss: {mildCut.toFixed(0)} kcal/day</div>
                        <div className="ig-item ig-result">Weight Loss: {cut.toFixed(0)} kcal/day</div>
                        <div className="ig-item ig-result">Mild Weight Gain: {mildBulk.toFixed(0)} kcal/day</div>
                        <div className="ig-item ig-result">Weight Gain: {bulk.toFixed(0)} kcal/day</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Uses the Mifflin-St Jeor equation, considered one of the most accurate BMR formulas.
                    TDEE (Total Daily Energy Expenditure) estimates calories needed to maintain current
                    weight based on activity level. Individual needs vary — consult a nutritionist for personalized plans.
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