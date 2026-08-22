"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["BANK & POST OFFICE"],
};

function calculateSCSS(principal, annualRate) {
    const quarterlyPayout = (principal * annualRate) / 100 / 4;
    const annualPayout = quarterlyPayout * 4;
    const totalInterest5yr = annualPayout * 5;
    return { quarterlyPayout, annualPayout, totalInterest5yr };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    principal: { min: 1000, max: 3000000, step: 1000 },
    rate: { min: 5, max: 10, step: 0.1 },
};

export default function Page() {
    const [principal, setPrincipal] = useState(1500000);
    const [annualRate, setAnnualRate] = useState(8.2);

    const { quarterlyPayout, annualPayout, totalInterest5yr } = useMemo(() => {
        const p = Number(principal) || 0;
        const r = Number(annualRate) || 0;
        return calculateSCSS(p, r);
    }, [principal, annualRate]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Bank & Post Office</p>
                <h1 style={{ textAlign: "center" }}>SCSS (Senior Citizens Savings Scheme) Calculator</h1>

                <FieldWithSlider label="Deposit Amount" prefix="₹" value={principal} onChange={setPrincipal} limits={LIMITS.principal} />
                <FieldWithSlider label="Interest Rate (Annual)" suffix="%" value={annualRate} onChange={setAnnualRate} limits={LIMITS.rate} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Quarterly Payout: ₹{formatCurrency(quarterlyPayout)}</div>
                        <div className="ig-item ig-result">Annual Payout: ₹{formatCurrency(annualPayout)}</div>
                        <div className="ig-item ig-result ig-result-total">Total Interest over 5 Years: ₹{formatCurrency(totalInterest5yr)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    SCSS has a 5-year tenure (extendable by 3 years), max deposit limit of ₹30 lakh, and
                    pays interest quarterly. Available to individuals 60+ (55+ for retirees under VRS).
                    Interest is fully taxable.
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