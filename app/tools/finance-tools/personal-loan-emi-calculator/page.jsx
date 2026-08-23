"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateLoan(principal, annualRate, months) {
    const monthlyRate = annualRate / 12 / 100;
    const emi =
        monthlyRate === 0
            ? principal / months
            : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);

    let balance = principal;
    const yearly = [];
    let yearPrincipal = 0;
    let yearInterest = 0;

    for (let m = 1; m <= months; m++) {
        const interestForMonth = balance * monthlyRate;
        const principalForMonth = emi - interestForMonth;
        balance = Math.max(0, balance - principalForMonth);
        yearPrincipal += principalForMonth;
        yearInterest += interestForMonth;

        if (m % 12 === 0 || m === months) {
            yearly.push({ year: Math.ceil(m / 12), principalPaid: yearPrincipal, interestPaid: yearInterest, balance });
            yearPrincipal = 0;
            yearInterest = 0;
        }
    }

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;
    return { emi, totalPayment, totalInterest, yearly };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    principal: { min: 10000, max: 4000000, step: 10000 },
    rate: { min: 9, max: 26, step: 0.1 },
    tenureYears: { min: 0.5, max: 7, step: 0.5 },
};

export default function Page() {
    const [principal, setPrincipal] = useState(300000);
    const [rate, setRate] = useState(13);
    const [tenureYears, setTenureYears] = useState(3);
    const [showSchedule, setShowSchedule] = useState(false);

    const months = Math.max(1, Math.round(Number(tenureYears) * 12) || 1);

    const { emi, totalPayment, totalInterest, yearly } = useMemo(() => {
        const p = Number(principal) || 0;
        const r = Number(rate) || 0;
        return calculateLoan(p, r, months);
    }, [principal, rate, months]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>Personal Loan EMI Calculator</h1>

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
                            {showSchedule ? "Hide" : "Show"} Yearly Breakdown
                        </button>
                    </div>
                </div>

                {showSchedule && (
                    <div className="ig-category">
                        <p className="ig-category-label">Amortization Schedule (Yearly)</p>
                        <div className="ig-table-wrap">
                            <table className="ig-table">
                                <thead>
                                    <tr><th>Year</th><th>Principal Paid</th><th>Interest Paid</th><th>Remaining Balance</th></tr>
                                </thead>
                                <tbody>
                                    {yearly.map((row) => (
                                        <tr key={row.year}>
                                            <td>{row.year}</td>
                                            <td>₹{formatCurrency(row.principalPaid)}</td>
                                            <td>₹{formatCurrency(row.interestPaid)}</td>
                                            <td>₹{formatCurrency(row.balance)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <p style={disclaimerStyle}>
                    Estimates only. Personal loan rates vary widely by lender and depend heavily on your
                    credit score and income — check with your bank or NBFC for exact offers.
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