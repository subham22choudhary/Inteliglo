"use client";

import { useState, useMemo } from "react";

function calculateFlatRate(principal, annualRate, months) {
    const years = months / 12;
    const totalInterest = (principal * annualRate * years) / 100;
    const totalPayment = principal + totalInterest;
    const emi = totalPayment / months;
    return { totalInterest, totalPayment, emi };
}

function calculateReducingBalance(principal, annualRate, months) {
    const monthlyRate = annualRate / 12 / 100;
    const emi =
        monthlyRate === 0
            ? principal / months
            : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;
    return { totalInterest, totalPayment, emi };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    principal: { min: 10000, max: 10000000, step: 10000 },
    rate: { min: 1, max: 25, step: 0.1 },
    tenureYears: { min: 0.5, max: 20, step: 0.5 },
};

export default function Page() {
    const [principal, setPrincipal] = useState(500000);
    const [rate, setRate] = useState(10);
    const [tenureYears, setTenureYears] = useState(5);

    const months = Math.max(1, Math.round(Number(tenureYears) * 12) || 1);

    const { flat, reducing } = useMemo(() => {
        const p = Number(principal) || 0;
        const r = Number(rate) || 0;
        return {
            flat: calculateFlatRate(p, r, months),
            reducing: calculateReducingBalance(p, r, months),
        };
    }, [principal, rate, months]);

    const difference = flat.totalInterest - reducing.totalInterest;

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>Loan Interest Calculator</h1>

                <FieldWithSlider label="Loan Amount" prefix="₹" value={principal} onChange={setPrincipal} limits={LIMITS.principal} />
                <FieldWithSlider label="Interest Rate" suffix="% p.a." value={rate} onChange={setRate} limits={LIMITS.rate} />
                <FieldWithSlider label="Loan Tenure" suffix="years" value={tenureYears} onChange={setTenureYears} limits={LIMITS.tenureYears} />

                <div className="ig-category">
                    <p className="ig-category-label">Reducing Balance Method (most loans)</p>
                    <div className="ig-list">
                        <div className="ig-item" style={{ cursor: "default" }}>Monthly EMI: ₹{formatCurrency(reducing.emi)}</div>
                        <div className="ig-item" style={{ cursor: "default" }}>Total Interest: ₹{formatCurrency(reducing.totalInterest)}</div>
                        <div className="ig-item" style={{ cursor: "default" }}>Total Payment: ₹{formatCurrency(reducing.totalPayment)}</div>
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Flat Rate Method (some personal/vehicle loans)</p>
                    <div className="ig-list">
                        <div className="ig-item" style={{ cursor: "default" }}>Monthly EMI: ₹{formatCurrency(flat.emi)}</div>
                        <div className="ig-item" style={{ cursor: "default" }}>Total Interest: ₹{formatCurrency(flat.totalInterest)}</div>
                        <div className="ig-item" style={{ cursor: "default" }}>Total Payment: ₹{formatCurrency(flat.totalPayment)}</div>
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Difference</p>
                    <div className="ig-list">
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Flat rate costs ₹{formatCurrency(Math.abs(difference))} {difference >= 0 ? "more" : "less"} in interest than reducing balance
                        </div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Reducing balance charges interest only on the outstanding principal each month (used by
                    most home/personal loans). Flat rate charges interest on the full original principal for
                    the entire tenure — the same quoted rate is effectively much higher in flat rate loans.
                    Always check which method your lender uses.
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