"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateBusinessLoan(principal, annualRate, months, processingFeePercent) {
    const monthlyRate = annualRate / 12 / 100;
    const emi =
        monthlyRate === 0
            ? principal / months
            : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;
    const processingFee = (principal * processingFeePercent) / 100;
    const disbursedAmount = principal - processingFee;
    const effectiveCost = totalInterest + processingFee;

    return { emi, totalPayment, totalInterest, processingFee, disbursedAmount, effectiveCost };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    principal: { min: 100000, max: 20000000, step: 50000 },
    rate: { min: 8, max: 24, step: 0.1 },
    tenureYears: { min: 0.5, max: 10, step: 0.5 },
    processingFee: { min: 0, max: 5, step: 0.25 },
};

export default function Page() {
    const [principal, setPrincipal] = useState(2000000);
    const [rate, setRate] = useState(14);
    const [tenureYears, setTenureYears] = useState(4);
    const [processingFeePercent, setProcessingFeePercent] = useState(1.5);

    const months = Math.max(1, Math.round(Number(tenureYears) * 12) || 1);

    const { emi, totalPayment, totalInterest, processingFee, disbursedAmount, effectiveCost } = useMemo(() => {
        const p = Number(principal) || 0;
        const r = Number(rate) || 0;
        const fee = Number(processingFeePercent) || 0;
        return calculateBusinessLoan(p, r, months, fee);
    }, [principal, rate, months, processingFeePercent]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>Business Loan Calculator</h1>

                <FieldWithSlider label="Loan Amount" prefix="₹" value={principal} onChange={setPrincipal} limits={LIMITS.principal} />
                <FieldWithSlider label="Interest Rate" suffix="% p.a." value={rate} onChange={setRate} limits={LIMITS.rate} />
                <FieldWithSlider label="Loan Tenure" suffix="years" value={tenureYears} onChange={setTenureYears} limits={LIMITS.tenureYears} />
                <FieldWithSlider label="Processing Fee" suffix="% of loan" value={processingFeePercent} onChange={setProcessingFeePercent} limits={LIMITS.processingFee} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item" style={{ cursor: "default" }}>Monthly EMI: ₹{formatCurrency(emi)}</div>
                        <div className="ig-item" style={{ cursor: "default" }}>Processing Fee: ₹{formatCurrency(processingFee)}</div>
                        <div className="ig-item" style={{ cursor: "default" }}>Amount Disbursed: ₹{formatCurrency(disbursedAmount)}</div>
                        <div className="ig-item" style={{ cursor: "default" }}>Total Interest: ₹{formatCurrency(totalInterest)}</div>
                        <div className="ig-item" style={{ cursor: "default" }}>Total Repayment: ₹{formatCurrency(totalPayment)}</div>
                        <div className="ig-item" style={{ cursor: "default" }}>Effective Cost of Loan: ₹{formatCurrency(effectiveCost)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Estimates only. Business loan pricing depends on collateral, business vintage, turnover,
                    and lender policy — banks/NBFCs may also charge additional fees (GST on processing fee,
                    foreclosure charges) not included here.
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