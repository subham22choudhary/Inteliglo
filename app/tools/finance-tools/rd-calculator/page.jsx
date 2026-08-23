"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateRD(monthlyDeposit, annualRate, months) {
    const i = annualRate / 400; // quarterly rate
    const n = months / 3; // number of quarters
    const quarterlyDeposit = monthlyDeposit * 3;
    const maturityValue = quarterlyDeposit * ((Math.pow(1 + i, n) - 1) / (1 - Math.pow(1 + i, -1 / 3)));
    const investedAmount = monthlyDeposit * months;
    const interestEarned = maturityValue - investedAmount;

    return { investedAmount, interestEarned, maturityValue };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    monthlyDeposit: { min: 100, max: 500000, step: 100 },
    rate: { min: 1, max: 15, step: 0.1 },
    months: { min: 3, max: 120, step: 3 },
};

export default function Page() {
    const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
    const [annualRate, setAnnualRate] = useState(6.5);
    const [months, setMonths] = useState(24);

    const { investedAmount, interestEarned, maturityValue } = useMemo(() => {
        const d = Number(monthlyDeposit) || 0;
        const r = Number(annualRate) || 0;
        const m = Number(months) || 1;
        return calculateRD(d, r, m);
    }, [monthlyDeposit, annualRate, months]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>RD (Recurring Deposit) Calculator</h1>

                <FieldWithSlider label="Monthly Deposit" prefix="₹" value={monthlyDeposit} onChange={setMonthlyDeposit} limits={LIMITS.monthlyDeposit} />
                <FieldWithSlider label="Interest Rate (Annual)" suffix="%" value={annualRate} onChange={setAnnualRate} limits={LIMITS.rate} />
                <FieldWithSlider label="Tenure" suffix="months" value={months} onChange={setMonths} limits={LIMITS.months} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Invested Amount: ₹{formatCurrency(investedAmount)}</div>
                        <div className="ig-item ig-result">Interest Earned: ₹{formatCurrency(interestEarned)}</div>
                        <div className="ig-item ig-result ig-result-total">Maturity Value: ₹{formatCurrency(maturityValue)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Estimates use standard quarterly-compounding RD formula. Actual bank/post office
                    rates and compounding methods may vary slightly. Confirm with your bank before investing.
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