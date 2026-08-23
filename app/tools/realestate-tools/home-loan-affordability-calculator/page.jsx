"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateAffordability(monthlyIncome, existingEMIs, interestRate, tenureYears, foirPercent) {
    const maxEMIAllowed = (monthlyIncome * foirPercent) / 100 - existingEMIs;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenureYears * 12;

    const maxLoanAmount =
        monthlyRate === 0
            ? maxEMIAllowed * months
            : (maxEMIAllowed * (Math.pow(1 + monthlyRate, months) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, months));

    return { maxEMIAllowed: Math.max(maxEMIAllowed, 0), maxLoanAmount: Math.max(maxLoanAmount, 0) };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    monthlyIncome: { min: 15000, max: 1000000, step: 5000 },
    existingEMIs: { min: 0, max: 500000, step: 1000 },
    interestRate: { min: 6, max: 14, step: 0.1 },
    tenureYears: { min: 5, max: 30, step: 1 },
    foirPercent: { min: 30, max: 60, step: 5 },
};

export default function Page() {
    const [monthlyIncome, setMonthlyIncome] = useState(80000);
    const [existingEMIs, setExistingEMIs] = useState(5000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [tenureYears, setTenureYears] = useState(20);
    const [foirPercent, setFoirPercent] = useState(50);

    const { maxEMIAllowed, maxLoanAmount } = useMemo(() => {
        const i = Number(monthlyIncome) || 0;
        const e = Number(existingEMIs) || 0;
        const r = Number(interestRate) || 0;
        const t = Number(tenureYears) || 1;
        const f = Number(foirPercent) || 40;
        return calculateAffordability(i, e, r, t, f);
    }, [monthlyIncome, existingEMIs, interestRate, tenureYears, foirPercent]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Real Estate" />
                <h1 style={{ textAlign: "center" }}>Home Loan Affordability Calculator</h1>

                <FieldWithSlider label="Monthly Income" prefix="₹" value={monthlyIncome} onChange={setMonthlyIncome} limits={LIMITS.monthlyIncome} />
                <FieldWithSlider label="Existing Monthly EMIs" prefix="₹" value={existingEMIs} onChange={setExistingEMIs} limits={LIMITS.existingEMIs} />
                <FieldWithSlider label="Interest Rate" suffix="%" value={interestRate} onChange={setInterestRate} limits={LIMITS.interestRate} />
                <FieldWithSlider label="Loan Tenure" suffix="years" value={tenureYears} onChange={setTenureYears} limits={LIMITS.tenureYears} />
                <FieldWithSlider label="Max EMI as % of Income (FOIR)" suffix="%" value={foirPercent} onChange={setFoirPercent} limits={LIMITS.foirPercent} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Maximum EMI You Can Afford: ₹{formatCurrency(maxEMIAllowed)}</div>
                        <div className="ig-item ig-result ig-result-total">Maximum Loan Eligibility: ₹{formatCurrency(maxLoanAmount)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Uses FOIR (Fixed Obligation to Income Ratio) — banks typically allow 40–50% of
                    income towards all EMIs combined. Actual eligibility also depends on credit score,
                    age, employment type, and lender-specific policies.
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