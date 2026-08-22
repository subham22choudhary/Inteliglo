"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["INVESTMENT & RETURNS"],
};

function calculateSimpleInterest(principal, annualRate, years) {
    const interest = (principal * annualRate * years) / 100;
    const total = principal + interest;
    return { interest, total };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

const LIMITS = {
    principal: { min: 1000, max: 10000000, step: 1000 },
    rate: { min: 0.5, max: 30, step: 0.1 },
    years: { min: 0.5, max: 30, step: 0.5 },
};

export default function Page() {
    const [principal, setPrincipal] = useState(100000);
    const [rate, setRate] = useState(8);
    const [years, setYears] = useState(3);

    const { interest, total } = useMemo(() => {
        const p = Number(principal) || 0;
        const r = Number(rate) || 0;
        const y = Number(years) || 0;
        return calculateSimpleInterest(p, r, y);
    }, [principal, rate, years]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>Simple Interest Calculator</h1>

                <FieldWithSlider
                    label="Principal Amount"
                    prefix="₹"
                    value={principal}
                    onChange={setPrincipal}
                    limits={LIMITS.principal}
                />

                <FieldWithSlider
                    label="Annual Interest Rate"
                    suffix="% p.a."
                    value={rate}
                    onChange={setRate}
                    limits={LIMITS.rate}
                />

                <FieldWithSlider
                    label="Time Period"
                    suffix="years"
                    value={years}
                    onChange={setYears}
                    limits={LIMITS.years}
                />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Principal Amount: ₹{formatCurrency(principal)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Simple Interest: ₹{formatCurrency(interest)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Total Amount: ₹{formatCurrency(total)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FieldWithSlider({ label, value, onChange, limits, prefix, suffix }) {
    const { min, max, step } = limits;
    const clamp = (v) => Math.min(max, Math.max(min, v));

    const handleNumberChange = (e) => {
        const raw = e.target.value;
        onChange(raw === "" ? "" : Number(raw));
    };
    const handleNumberBlur = () => onChange(clamp(Number(value) || min));
    const handleSliderChange = (e) => onChange(Number(e.target.value));
    const percent = ((clamp(Number(value) || min) - min) / (max - min)) * 100;

    return (
        <div className="ig-category">
            <p className="ig-category-label">{label}</p>
            <div className="ig-field">
                {prefix && <span className="ig-field-prefix">{prefix}</span>}
                <input
                    className="ig-input"
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={handleNumberChange}
                    onBlur={handleNumberBlur}
                />
                {suffix && <span className="ig-field-suffix">{suffix}</span>}
            </div>
            <input
                className="ig-slider"
                type="range"
                min={min}
                max={max}
                step={step}
                value={clamp(Number(value) || min)}
                onChange={handleSliderChange}
                style={{ "--ig-slider-percent": `${percent}%` }}
            />
        </div>
    );
}