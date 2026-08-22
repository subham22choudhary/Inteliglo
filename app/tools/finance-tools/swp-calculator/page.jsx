"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["MUTUAL FUNDS"],
};

function calculateSWP(totalInvestment, monthlyWithdrawal, annualReturn, years) {
    const monthlyRate = annualReturn / 12 / 100;
    const months = years * 12;
    let balance = totalInvestment;
    let totalWithdrawn = 0;

    for (let m = 0; m < months; m++) {
        balance = balance * (1 + monthlyRate) - monthlyWithdrawal;
        totalWithdrawn += monthlyWithdrawal;
        if (balance < 0) {
            balance = 0;
            break;
        }
    }

    const finalBalance = Math.max(balance, 0);
    return { totalWithdrawn, finalBalance };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    totalInvestment: { min: 10000, max: 20000000, step: 10000 },
    monthlyWithdrawal: { min: 500, max: 500000, step: 500 },
    annualReturn: { min: 1, max: 20, step: 0.5 },
    years: { min: 1, max: 40, step: 1 },
};

export default function Page() {
    const [totalInvestment, setTotalInvestment] = useState(1000000);
    const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(10000);
    const [annualReturn, setAnnualReturn] = useState(8);
    const [years, setYears] = useState(10);

    const { totalWithdrawn, finalBalance } = useMemo(() => {
        const inv = Number(totalInvestment) || 0;
        const w = Number(monthlyWithdrawal) || 0;
        const r = Number(annualReturn) || 0;
        const y = Number(years) || 1;
        return calculateSWP(inv, w, r, y);
    }, [totalInvestment, monthlyWithdrawal, annualReturn, years]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Mutual Funds</p>
                <h1 style={{ textAlign: "center" }}>SWP (Systematic Withdrawal Plan) Calculator</h1>

                <FieldWithSlider label="Total Investment" prefix="₹" value={totalInvestment} onChange={setTotalInvestment} limits={LIMITS.totalInvestment} />
                <FieldWithSlider label="Monthly Withdrawal" prefix="₹" value={monthlyWithdrawal} onChange={setMonthlyWithdrawal} limits={LIMITS.monthlyWithdrawal} />
                <FieldWithSlider label="Expected Annual Return" suffix="%" value={annualReturn} onChange={setAnnualReturn} limits={LIMITS.annualReturn} />
                <FieldWithSlider label="Withdrawal Period" suffix="years" value={years} onChange={setYears} limits={LIMITS.years} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Total Withdrawn: ₹{formatCurrency(totalWithdrawn)}</div>
                        <div className="ig-item ig-result ig-result-total">Remaining Balance: ₹{formatCurrency(finalBalance)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Estimates assume constant monthly returns, which is unrealistic — actual mutual
                    fund returns fluctuate. If balance reaches zero before the period ends, withdrawals stop early.
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