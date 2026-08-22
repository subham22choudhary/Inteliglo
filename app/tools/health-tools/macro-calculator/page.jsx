"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["HEALTH"],
};

const GOALS = {
    maintain: { label: "Maintain Weight", proteinPercent: 30, carbPercent: 40, fatPercent: 30 },
    lose: { label: "Lose Weight", proteinPercent: 40, carbPercent: 30, fatPercent: 30 },
    gain: { label: "Gain Muscle", proteinPercent: 30, carbPercent: 45, fatPercent: 25 },
};

function calculateMacros(dailyCalories, goal) {
    const config = GOALS[goal];
    const proteinCalories = (dailyCalories * config.proteinPercent) / 100;
    const carbCalories = (dailyCalories * config.carbPercent) / 100;
    const fatCalories = (dailyCalories * config.fatPercent) / 100;

    const proteinGrams = proteinCalories / 4;
    const carbGrams = carbCalories / 4;
    const fatGrams = fatCalories / 9;

    return { proteinGrams, carbGrams, fatGrams, proteinCalories, carbCalories, fatCalories, config };
}

const LIMITS = {
    calories: { min: 1000, max: 5000, step: 50 },
};

export default function Page() {
    const [dailyCalories, setDailyCalories] = useState(2200);
    const [goal, setGoal] = useState("maintain");

    const { proteinGrams, carbGrams, fatGrams, config } = useMemo(() => {
        const c = Number(dailyCalories) || 0;
        return calculateMacros(c, goal);
    }, [dailyCalories, goal]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Health</p>
                <h1 style={{ textAlign: "center" }}>Macro Calculator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Goal</p>
                    <div className="ig-list" style={{ display: "flex", gap: 8, gridTemplateColumns: "unset" }}>
                        {Object.entries(GOALS).map(([key, g]) => (
                            <button key={key} className={`ig-item ig-metal-btn${goal === key ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setGoal(key)}>
                                {g.label}
                            </button>
                        ))}
                    </div>
                </div>

                <FieldWithSlider label="Daily Calorie Target" suffix="kcal" value={dailyCalories} onChange={setDailyCalories} limits={LIMITS.calories} />

                <div className="ig-category">
                    <p className="ig-category-label">Macro Split ({config.proteinPercent}% / {config.carbPercent}% / {config.fatPercent}%)</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Protein: {proteinGrams.toFixed(0)}g ({config.proteinPercent}%)</div>
                        <div className="ig-item ig-result">Carbohydrates: {carbGrams.toFixed(0)}g ({config.carbPercent}%)</div>
                        <div className="ig-item ig-result ig-result-total">Fat: {fatGrams.toFixed(0)}g ({config.fatPercent}%)</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Uses standard macro splits based on your goal (protein: 4 kcal/g, carbs: 4 kcal/g,
                    fat: 9 kcal/g). Individual needs vary based on activity level, body composition, and
                    specific training goals — consider consulting a nutritionist for a personalized plan.
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