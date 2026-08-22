"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["BONDS"],
};

function calculateFRSB(principal, currentRate, years) {
    const halfYearlyRate = currentRate / 200;
    const halfYearlyPayout = principal * halfYearlyRate;
    const annualPayout = halfYearlyPayout * 2;
    const totalInterestOverTerm = annualPayout * years;
    const maturityValue = principal + totalInterestOverTerm;

    return { halfYearlyPayout, annualPayout, totalInterestOverTerm, maturityValue };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    principal: { min: 1000, max: 10000000, step: 1000 },
    rate: { min: 5, max: 10, step: 0.1 },
    years: { min: 1, max: 7, step: 1 },
};

export default function Page() {
    const [principal, setPrincipal] = useState(100000);
    const [currentRate, setCurrentRate] = useState(8.05);
    const [years, setYears] = useState(7);

    const { halfYearlyPayout, annualPayout, totalInterestOverTerm, maturityValue } = useMemo(() => {
        const p = Number(principal) || 0;
        const r = Number(currentRate) || 0;
        const y = Number(years) || 1;
        return calculateFRSB(p, r, y);
    }, [principal, currentRate, years]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Bonds</p>
                <h1 style={{ textAlign: "center" }}>FRSB (Floating Rate Savings Bonds) Calculator</h1>

                <FieldWithSlider label="Investment Amount" prefix="₹" value={principal} onChange={setPrincipal} limits={LIMITS.principal} />
                <FieldWithSlider label="Current Interest Rate" suffix="%" value={currentRate} onChange={setCurrentRate} limits={LIMITS.rate} />
                <FieldWithSlider label="Tenure" suffix="years" value={years} onChange={setYears} limits={LIMITS.years} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Half-Yearly Payout: ₹{formatCurrency(halfYearlyPayout)}</div>
                        <div className="ig-item ig-result">Annual Payout: ₹{formatCurrency(annualPayout)}</div>
                        <div className="ig-item ig-result">Total Interest (at current rate): ₹{formatCurrency(totalInterestOverTerm)}</div>
                        <div className="ig-item ig-result ig-result-total">Est. Maturity Value: ₹{formatCurrency(maturityValue)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    FRSB has a fixed 7-year tenure with interest resetting every 6 months, linked to the
                    NSC rate + 0.35%. This estimate assumes the current rate stays constant — actual
                    payouts will vary as the floating rate changes. Interest is fully taxable.
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