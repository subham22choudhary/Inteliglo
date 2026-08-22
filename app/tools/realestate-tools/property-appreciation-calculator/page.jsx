"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["REAL ESTATE"],
};

function calculateAppreciation(currentValue, appreciationRate, years) {
    const futureValue = currentValue * Math.pow(1 + appreciationRate / 100, years);
    const totalGain = futureValue - currentValue;
    const cagr = appreciationRate;

    return { futureValue, totalGain, cagr };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    currentValue: { min: 100000, max: 100000000, step: 100000 },
    appreciationRate: { min: 1, max: 15, step: 0.5 },
    years: { min: 1, max: 30, step: 1 },
};

export default function Page() {
    const [currentValue, setCurrentValue] = useState(5000000);
    const [appreciationRate, setAppreciationRate] = useState(6);
    const [years, setYears] = useState(10);

    const { futureValue, totalGain, cagr } = useMemo(() => {
        const v = Number(currentValue) || 0;
        const r = Number(appreciationRate) || 0;
        const y = Number(years) || 1;
        return calculateAppreciation(v, r, y);
    }, [currentValue, appreciationRate, years]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Real Estate</p>
                <h1 style={{ textAlign: "center" }}>Property Appreciation Calculator</h1>

                <FieldWithSlider label="Current Property Value" prefix="₹" value={currentValue} onChange={setCurrentValue} limits={LIMITS.currentValue} />
                <FieldWithSlider label="Expected Annual Appreciation" suffix="%" value={appreciationRate} onChange={setAppreciationRate} limits={LIMITS.appreciationRate} />
                <FieldWithSlider label="Time Period" suffix="years" value={years} onChange={setYears} limits={LIMITS.years} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Total Gain: ₹{formatCurrency(totalGain)}</div>
                        <div className="ig-item ig-result ig-result-total">Estimated Future Value: ₹{formatCurrency(futureValue)}</div>
                        <div className="ig-item ig-result">Assumed Annual Growth (CAGR): {cagr}%</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Real estate appreciation varies widely by location, infrastructure development,
                    and market cycles — this is a straight-line compounded projection, not a market forecast.
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