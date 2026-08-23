"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateEligibility(monthlyIncome, existingEMIs, foirPercent, annualRate, tenureMonths) {
    const maxAllowedEMI = Math.max(0, (monthlyIncome * foirPercent) / 100 - existingEMIs);
    const monthlyRate = annualRate / 12 / 100;

    let maxLoanAmount;
    if (monthlyRate === 0) {
        maxLoanAmount = maxAllowedEMI * tenureMonths;
    } else {
        const factor = Math.pow(1 + monthlyRate, tenureMonths);
        maxLoanAmount = (maxAllowedEMI * (factor - 1)) / (monthlyRate * factor);
    }

    return { maxAllowedEMI, maxLoanAmount };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    income: { min: 15000, max: 1000000, step: 5000 },
    existingEMIs: { min: 0, max: 200000, step: 1000 },
    foir: { min: 30, max: 70, step: 5 },
    rate: { min: 6, max: 20, step: 0.1 },
    tenureYears: { min: 1, max: 30, step: 1 },
};

export default function Page() {
    const [monthlyIncome, setMonthlyIncome] = useState(80000);
    const [existingEMIs, setExistingEMIs] = useState(10000);
    const [foirPercent, setFoirPercent] = useState(50);
    const [rate, setRate] = useState(9);
    const [tenureYears, setTenureYears] = useState(20);

    const tenureMonths = Math.max(1, Math.round(Number(tenureYears) * 12) || 1);

    const { maxAllowedEMI, maxLoanAmount } = useMemo(() => {
        const income = Number(monthlyIncome) || 0;
        const emis = Number(existingEMIs) || 0;
        const foir = Number(foirPercent) || 0;
        const r = Number(rate) || 0;
        return calculateEligibility(income, emis, foir, r, tenureMonths);
    }, [monthlyIncome, existingEMIs, foirPercent, rate, tenureMonths]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>Loan Eligibility Calculator</h1>

                <FieldWithSlider label="Net Monthly Income" prefix="₹" value={monthlyIncome} onChange={setMonthlyIncome} limits={LIMITS.income} />
                <FieldWithSlider label="Existing Monthly EMIs / Obligations" prefix="₹" value={existingEMIs} onChange={setExistingEMIs} limits={LIMITS.existingEMIs} />
                <FieldWithSlider label="FOIR (max % of income for EMIs)" suffix="%" value={foirPercent} onChange={setFoirPercent} limits={LIMITS.foir} />
                <FieldWithSlider label="Expected Interest Rate" suffix="% p.a." value={rate} onChange={setRate} limits={LIMITS.rate} />
                <FieldWithSlider label="Desired Tenure" suffix="years" value={tenureYears} onChange={setTenureYears} limits={LIMITS.tenureYears} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Maximum EMI You Can Afford: ₹{formatCurrency(maxAllowedEMI)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Estimated Loan Eligibility: ₹{formatCurrency(maxLoanAmount)}
                        </div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Based on FOIR (Fixed Obligation to Income Ratio) — a common bank underwriting method.
                    Most lenders cap total EMI obligations at 40–55% of net income. Actual eligibility also
                    depends on credit score, employment type, and lender-specific policy.
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