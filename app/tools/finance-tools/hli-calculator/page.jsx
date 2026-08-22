"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["INSURANCE"],
};

function calculateHLI(annualIncome, existingLiabilities, dependentYears, monthlyExpenses, existingCover) {
    const incomeReplacementCover = annualIncome * 15; // 15x annual income (thumb rule)
    const expenseCover = monthlyExpenses * 12 * dependentYears;
    const totalRequiredCover = incomeReplacementCover + existingLiabilities + expenseCover;
    const additionalCoverNeeded = Math.max(totalRequiredCover - existingCover, 0);

    return { incomeReplacementCover, expenseCover, totalRequiredCover, additionalCoverNeeded };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    annualIncome: { min: 100000, max: 20000000, step: 50000 },
    existingLiabilities: { min: 0, max: 20000000, step: 50000 },
    dependentYears: { min: 1, max: 30, step: 1 },
    monthlyExpenses: { min: 5000, max: 500000, step: 5000 },
    existingCover: { min: 0, max: 20000000, step: 50000 },
};

export default function Page() {
    const [annualIncome, setAnnualIncome] = useState(1000000);
    const [existingLiabilities, setExistingLiabilities] = useState(2000000);
    const [dependentYears, setDependentYears] = useState(15);
    const [monthlyExpenses, setMonthlyExpenses] = useState(40000);
    const [existingCover, setExistingCover] = useState(1000000);

    const { incomeReplacementCover, expenseCover, totalRequiredCover, additionalCoverNeeded } = useMemo(() => {
        const inc = Number(annualIncome) || 0;
        const liab = Number(existingLiabilities) || 0;
        const dy = Number(dependentYears) || 1;
        const exp = Number(monthlyExpenses) || 0;
        const ec = Number(existingCover) || 0;
        return calculateHLI(inc, liab, dy, exp, ec);
    }, [annualIncome, existingLiabilities, dependentYears, monthlyExpenses, existingCover]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Insurance</p>
                <h1 style={{ textAlign: "center" }}>Life Insurance Cover Calculator</h1>

                <FieldWithSlider label="Annual Income" prefix="₹" value={annualIncome} onChange={setAnnualIncome} limits={LIMITS.annualIncome} />
                <FieldWithSlider label="Existing Liabilities (Loans)" prefix="₹" value={existingLiabilities} onChange={setExistingLiabilities} limits={LIMITS.existingLiabilities} />
                <FieldWithSlider label="Monthly Household Expenses" prefix="₹" value={monthlyExpenses} onChange={setMonthlyExpenses} limits={LIMITS.monthlyExpenses} />
                <FieldWithSlider label="Years Family Depends on You" suffix="years" value={dependentYears} onChange={setDependentYears} limits={LIMITS.dependentYears} />
                <FieldWithSlider label="Existing Life Cover" prefix="₹" value={existingCover} onChange={setExistingCover} limits={LIMITS.existingCover} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Income Replacement Need (15x): ₹{formatCurrency(incomeReplacementCover)}</div>
                        <div className="ig-item ig-result">Future Expense Cover Needed: ₹{formatCurrency(expenseCover)}</div>
                        <div className="ig-item ig-result">Total Cover Required: ₹{formatCurrency(totalRequiredCover)}</div>
                        <div className="ig-item ig-result ig-result-total">Additional Cover to Buy: ₹{formatCurrency(additionalCoverNeeded)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Uses the common "15x annual income" thumb rule plus outstanding liabilities and
                    future household expenses. Actual insurance needs vary by individual circumstances —
                    consider consulting a financial advisor for a detailed needs analysis.
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