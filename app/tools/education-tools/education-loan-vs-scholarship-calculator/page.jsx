"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateComparison(totalCost, scholarshipAmount, loanRate, loanTenureYears) {
    const loanAmount = Math.max(totalCost - scholarshipAmount, 0);
    const monthlyRate = loanRate / 12 / 100;
    const months = loanTenureYears * 12;

    const emi =
        monthlyRate === 0
            ? loanAmount / months
            : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

    const totalRepayment = emi * months;
    const totalInterest = totalRepayment - loanAmount;
    const effectiveCostWithoutScholarship = totalCost;
    const effectiveCostWithScholarship = totalRepayment + scholarshipAmount - scholarshipAmount; // = totalRepayment
    const savingsFromScholarship = totalCost - totalRepayment > 0 ? 0 : 0;

    return { loanAmount, emi, totalRepayment, totalInterest };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    totalCost: { min: 100000, max: 10000000, step: 50000 },
    scholarshipAmount: { min: 0, max: 10000000, step: 25000 },
    loanRate: { min: 6, max: 15, step: 0.1 },
    loanTenure: { min: 1, max: 15, step: 1 },
};

export default function Page() {
    const [totalCost, setTotalCost] = useState(2000000);
    const [scholarshipAmount, setScholarshipAmount] = useState(500000);
    const [loanRate, setLoanRate] = useState(9.5);
    const [loanTenureYears, setLoanTenureYears] = useState(7);

    const { loanAmount, emi, totalRepayment, totalInterest } = useMemo(() => {
        const c = Number(totalCost) || 0;
        const s = Number(scholarshipAmount) || 0;
        const r = Number(loanRate) || 0;
        const t = Number(loanTenureYears) || 1;
        return calculateComparison(c, s, r, t);
    }, [totalCost, scholarshipAmount, loanRate, loanTenureYears]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Education" />
                <h1 style={{ textAlign: "center" }}>Education Loan vs Scholarship Calculator</h1>

                <FieldWithSlider label="Total Course Cost" prefix="₹" value={totalCost} onChange={setTotalCost} limits={LIMITS.totalCost} />
                <FieldWithSlider label="Scholarship / Grant Amount" prefix="₹" value={scholarshipAmount} onChange={setScholarshipAmount} limits={LIMITS.scholarshipAmount} />
                <FieldWithSlider label="Education Loan Interest Rate" suffix="%" value={loanRate} onChange={setLoanRate} limits={LIMITS.loanRate} />
                <FieldWithSlider label="Loan Repayment Tenure" suffix="years" value={loanTenureYears} onChange={setLoanTenureYears} limits={LIMITS.loanTenure} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Loan Amount Needed: ₹{formatCurrency(loanAmount)}</div>
                        <div className="ig-item ig-result">Monthly EMI: ₹{formatCurrency(emi)}</div>
                        <div className="ig-item ig-result">Total Interest Payable: ₹{formatCurrency(totalInterest)}</div>
                        <div className="ig-item ig-result ig-result-total">Total Repayment Amount: ₹{formatCurrency(totalRepayment)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Shows how much loan you'd need and repay after applying your scholarship/grant
                    amount. Education loan interest is tax-deductible under Section 80E (on interest,
                    no upper limit, for 8 years). Doesn't factor moratorium period interest accrual.
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