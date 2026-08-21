"use client";

import { useState, useMemo } from "react";

function calculateReducingBalance(principal, annualRate, months) {
    const monthlyRate = annualRate / 12 / 100;
    const emi =
        monthlyRate === 0
            ? principal / months
            : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);

    let balance = principal;
    const schedule = [];

    for (let m = 1; m <= months; m++) {
        const interestForMonth = balance * monthlyRate;
        let principalForMonth = emi - interestForMonth;
        if (principalForMonth > balance) principalForMonth = balance;
        balance -= principalForMonth;
        schedule.push({ month: m, interest: interestForMonth, principal: principalForMonth, balance: Math.max(0, balance) });
    }

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    return { emi, totalPayment, totalInterest, schedule };
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
    const [tenureYears, setTenureYears] = useState(3);
    const [showSchedule, setShowSchedule] = useState(false);

    const months = Math.max(1, Math.round(Number(tenureYears) * 12) || 1);

    const { emi, totalPayment, totalInterest, schedule } = useMemo(() => {
        const p = Number(principal) || 0;
        const r = Number(rate) || 0;
        return calculateReducingBalance(p, r, months);
    }, [principal, rate, months]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>Reducing Balance Loan Calculator</h1>

                <FieldWithSlider label="Loan Amount" prefix="₹" value={principal} onChange={setPrincipal} limits={LIMITS.principal} />
                <FieldWithSlider label="Interest Rate" suffix="% p.a." value={rate} onChange={setRate} limits={LIMITS.rate} />
                <FieldWithSlider label="Loan Tenure" suffix="years" value={tenureYears} onChange={setTenureYears} limits={LIMITS.tenureYears} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item" style={{ cursor: "default" }}>Monthly EMI: ₹{formatCurrency(emi)}</div>
                        <div className="ig-item" style={{ cursor: "default" }}>Total Interest: ₹{formatCurrency(totalInterest)}</div>
                        <div className="ig-item" style={{ cursor: "default" }}>Total Payment: ₹{formatCurrency(totalPayment)}</div>
                    </div>
                </div>

                <div className="ig-category">
                    <div className="ig-list" style={{ flexDirection: "row" }}>
                        <button className="ig-item" onClick={() => setShowSchedule((prev) => !prev)}>
                            {showSchedule ? "Hide" : "Show"} Month-by-Month Schedule
                        </button>
                    </div>
                </div>

                {showSchedule && (
                    <div className="ig-category">
                        <p className="ig-category-label">Monthly Amortization Schedule</p>
                        <div className="ig-table-wrap">
                            <table className="ig-table">
                                <thead>
                                    <tr><th>Month</th><th>Principal</th><th>Interest</th><th>Balance</th></tr>
                                </thead>
                                <tbody>
                                    {schedule.map((row) => (
                                        <tr key={row.month}>
                                            <td>{row.month}</td>
                                            <td>₹{formatCurrency(row.principal)}</td>
                                            <td>₹{formatCurrency(row.interest)}</td>
                                            <td>₹{formatCurrency(row.balance)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <p style={disclaimerStyle}>
                    Reducing balance (also called diminishing balance) charges interest only on the
                    outstanding principal each month — the method used by nearly all home, personal, and
                    business loans in India.
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