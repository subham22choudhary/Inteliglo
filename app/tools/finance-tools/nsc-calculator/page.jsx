"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["BANK & POST OFFICE"],
};

function calculateNSC(principal, annualRate, years) {
    const maturityValue = principal * Math.pow(1 + annualRate / 100, years);
    const interestEarned = maturityValue - principal;
    return { interestEarned, maturityValue };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    principal: { min: 1000, max: 5000000, step: 1000 },
    rate: { min: 5, max: 10, step: 0.1 },
};

export default function Page() {
    const [principal, setPrincipal] = useState(100000);
    const [annualRate, setAnnualRate] = useState(7.7);
    const years = 5; // fixed NSC tenure

    const { interestEarned, maturityValue } = useMemo(() => {
        const p = Number(principal) || 0;
        const r = Number(annualRate) || 0;
        return calculateNSC(p, r, years);
    }, [principal, annualRate]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Bank & Post Office</p>
                <h1 style={{ textAlign: "center" }}>NSC (National Savings Certificate) Calculator</h1>

                <FieldWithSlider label="Investment Amount" prefix="₹" value={principal} onChange={setPrincipal} limits={LIMITS.principal} />
                <FieldWithSlider label="Interest Rate (Annual)" suffix="%" value={annualRate} onChange={setAnnualRate} limits={LIMITS.rate} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Tenure: 5 years (fixed)</div>
                        <div className="ig-item ig-result">Interest Earned: ₹{formatCurrency(interestEarned)}</div>
                        <div className="ig-item ig-result ig-result-total">Maturity Value: ₹{formatCurrency(maturityValue)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    NSC has a fixed 5-year lock-in with annual compounding. Interest is taxable but
                    reinvested interest (except the final year) qualifies for Section 80C deduction.
                    Confirm current rate at your post office before investing.
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