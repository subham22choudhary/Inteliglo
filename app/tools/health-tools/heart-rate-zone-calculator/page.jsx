"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["HEALTH"],
};

const ZONES = [
    { name: "Zone 1 — Warm Up", min: 0.5, max: 0.6, desc: "Very light, recovery" },
    { name: "Zone 2 — Fat Burn", min: 0.6, max: 0.7, desc: "Light, improves endurance" },
    { name: "Zone 3 — Aerobic", min: 0.7, max: 0.8, desc: "Moderate, improves cardio fitness" },
    { name: "Zone 4 — Anaerobic", min: 0.8, max: 0.9, desc: "Hard, improves speed/performance" },
    { name: "Zone 5 — Max Effort", min: 0.9, max: 1.0, desc: "Maximum effort, short bursts only" },
];

function calculateZones(age, restingHR) {
    const maxHR = 220 - age;
    const hrReserve = maxHR - restingHR;

    const zones = ZONES.map((z) => ({
        ...z,
        minBPM: Math.round(restingHR + hrReserve * z.min),
        maxBPM: Math.round(restingHR + hrReserve * z.max),
    }));

    return { maxHR, zones };
}

const LIMITS = {
    age: { min: 10, max: 90, step: 1 },
    restingHR: { min: 40, max: 100, step: 1 },
};

export default function Page() {
    const [age, setAge] = useState(28);
    const [restingHR, setRestingHR] = useState(70);

    const { maxHR, zones } = useMemo(() => {
        const a = Number(age) || 1;
        const r = Number(restingHR) || 60;
        return calculateZones(a, r);
    }, [age, restingHR]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Health</p>
                <h1 style={{ textAlign: "center" }}>Heart Rate Zone Calculator</h1>

                <FieldWithSlider label="Age" suffix="years" value={age} onChange={setAge} limits={LIMITS.age} />
                <FieldWithSlider label="Resting Heart Rate" suffix="bpm" value={restingHR} onChange={setRestingHR} limits={LIMITS.restingHR} />

                <div className="ig-category">
                    <p className="ig-category-label">Max Heart Rate</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result ig-result-total">{maxHR} bpm (220 − age)</div>
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Training Zones (Karvonen Method)</p>
                    <div className="ig-list">
                        {zones.map((z) => (
                            <div className="ig-item ig-result" key={z.name}>
                                {z.name}: {z.minBPM}-{z.maxBPM} bpm — {z.desc}
                            </div>
                        ))}
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Uses the Karvonen method (accounts for resting heart rate, more accurate than simple
                    % of max HR). Max HR formula (220 − age) is a population average — individual max HR
                    can vary by ±10-15 bpm. Consult a doctor before starting intense exercise programs.
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