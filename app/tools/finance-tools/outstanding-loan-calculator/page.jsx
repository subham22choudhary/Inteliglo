"use client";

import { useState, useMemo } from "react";

function calculateOutstanding(principal, annualRate, totalMonths, monthsPaid) {
    const monthlyRate = annualRate / 12 / 100;
    const emi =
        monthlyRate === 0
            ? principal / totalMonths
            : (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1);

    let balance = principal;
    let principalPaidSoFar = 0;
    let interestPaidSoFar = 0;

    const paidMonths = Math.min(monthsPaid, totalMonths);

    for (let m = 1; m <= paidMonths; m++) {
        const interestForMonth = balance * monthlyRate;
        let principalForMonth = emi - interestForMonth;
        if (principalForMonth > balance) principalForMonth = balance;
        balance -= principalForMonth;
        principalPaidSoFar += principalForMonth;
        interestPaidSoFar += interestForMonth;
    }

    return { emi, outstandingBalance: balance, principalPaidSoFar, interestPaidSoFar };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    principal: { min: 100000, max: 20000000, step: 50000 },
    rate: { min: 6, max: 20, step: 0.1 },
    tenureYears: { min: 1, max: 30, step: 1 },
};

export default function Page() {
    const [principal, setPrincipal] = useState(2000000);
    const [rate, setRate] = useState(9);
    const [tenureYears, setTenureYears] = useState(20);
    const [monthsPaidInput, setMonthsPaidInput] = useState(36);

    const totalMonths = Math.max(1, Math.round(Number(tenureYears) * 12) || 1);

    const { emi, outstandingBalance, principalPaidSoFar, interestPaidSoFar } = useMemo(() => {
        const p = Number(principal) || 0;
        const r = Number(rate) || 0;
        const paid = Math.max(0, Number(monthsPaidInput) || 0);
        return calculateOutstanding(p, r, totalMonths, paid);
    }, [principal, rate, totalMonths, monthsPaidInput]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>Outstanding Loan Calculator</h1>

                <FieldWithSlider label="Original Loan Amount" prefix="₹" value={principal} onChange={setPrincipal} limits={LIMITS.principal} />
                <FieldWithSlider label="Interest Rate" suffix="% p.a." value={rate} onChange={setRate} limits={LIMITS.rate} />
                <FieldWithSlider label="Original Tenure" suffix="years" value={tenureYears} onChange={setTenureYears} limits={LIMITS.tenureYears} />
                <FieldWithSlider
                    label="EMIs Already Paid"
                    suffix="months"
                    value={monthsPaidInput}
                    onChange={setMonthsPaidInput}
                    limits={{ min: 0, max: totalMonths, step: 1 }}
                />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item" style={{ cursor: "default" }}>Monthly EMI: ₹{formatCurrency(emi)}</div>
                        <div className="ig-item" style={{ cursor: "default" }}>Principal Paid So Far: ₹{formatCurrency(principalPaidSoFar)}</div>
                        <div className="ig-item" style={{ cursor: "default" }}>Interest Paid So Far: ₹{formatCurrency(interestPaidSoFar)}</div>
                        <div className="ig-item" style={{ cursor: "default" }}>Outstanding Balance: ₹{formatCurrency(outstandingBalance)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Estimates the current outstanding principal based on standard reducing-balance
                    amortization. For the exact figure, check your latest loan statement — small variations
                    in payment dates can cause minor differences.
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