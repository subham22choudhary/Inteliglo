"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["LOANS & EMIS"],
};

function calculateCreditCardEMI(outstandingAmount, monthlyRate, months) {
    const r = monthlyRate / 100;
    const emi = r === 0 ? outstandingAmount / months : (outstandingAmount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - outstandingAmount;

    return { emi, totalPayment, totalInterest };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    outstandingAmount: { min: 1000, max: 1000000, step: 1000 },
    monthlyRate: { min: 1, max: 4, step: 0.05 },
    months: { min: 1, max: 60, step: 1 },
};

export default function Page() {
    const [outstandingAmount, setOutstandingAmount] = useState(50000);
    const [monthlyRate, setMonthlyRate] = useState(3.5);
    const [months, setMonths] = useState(12);

    const { emi, totalPayment, totalInterest } = useMemo(() => {
        const a = Number(outstandingAmount) || 0;
        const r = Number(monthlyRate) || 0;
        const m = Number(months) || 1;
        return calculateCreditCardEMI(a, r, m);
    }, [outstandingAmount, monthlyRate, months]);

    const annualizedRate = (monthlyRate * 12).toFixed(1);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Loans & EMIs</p>
                <h1 style={{ textAlign: "center" }}>Credit Card EMI / Interest Calculator</h1>

                <FieldWithSlider label="Outstanding Amount" prefix="₹" value={outstandingAmount} onChange={setOutstandingAmount} limits={LIMITS.outstandingAmount} />
                <FieldWithSlider label="Monthly Interest Rate" suffix={`% (≈${annualizedRate}% annual)`} value={monthlyRate} onChange={setMonthlyRate} limits={LIMITS.monthlyRate} />
                <FieldWithSlider label="Conversion Tenure" suffix="months" value={months} onChange={setMonths} limits={LIMITS.months} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result ig-result-total">Monthly EMI: ₹{formatCurrency(emi)}</div>
                        <div className="ig-item ig-result">Total Payment: ₹{formatCurrency(totalPayment)}</div>
                        <div className="ig-item ig-result">Total Interest Charged: ₹{formatCurrency(totalInterest)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Credit card interest rates are typically 2–4% per month (24–48% annually) — much
                    higher than personal loans. Converting to EMI usually includes a one-time processing
                    fee not accounted for here. Confirm exact rate with your card issuer.
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