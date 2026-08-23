"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateSSY(annualDeposit, girlAge, annualRate) {
    const depositYears = 15;
    const maturityAge = 21;
    const totalYears = maturityAge - girlAge;
    const monthlyRate = annualRate / 100;
    let balance = 0;
    let totalDeposit = 0;

    for (let y = 0; y < totalYears; y++) {
        if (y < depositYears) {
            balance += annualDeposit;
            totalDeposit += annualDeposit;
        }
        balance += balance * monthlyRate;
    }

    const interestEarned = balance - totalDeposit;
    return { totalDeposit, interestEarned, maturityValue: balance, totalYears };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    annualDeposit: { min: 250, max: 150000, step: 250 },
    girlAge: { min: 0, max: 10, step: 1 },
    rate: { min: 5, max: 10, step: 0.1 },
};

export default function Page() {
    const [annualDeposit, setAnnualDeposit] = useState(50000);
    const [girlAge, setGirlAge] = useState(2);
    const [annualRate, setAnnualRate] = useState(8.2);

    const { totalDeposit, interestEarned, maturityValue, totalYears } = useMemo(() => {
        const d = Number(annualDeposit) || 0;
        const a = Number(girlAge) || 0;
        const r = Number(annualRate) || 0;
        return calculateSSY(d, a, r);
    }, [annualDeposit, girlAge, annualRate]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>SSY (Sukanya Samriddhi Yojana) Calculator</h1>

                <FieldWithSlider label="Annual Deposit" prefix="₹" value={annualDeposit} onChange={setAnnualDeposit} limits={LIMITS.annualDeposit} />
                <FieldWithSlider label="Girl Child's Current Age" suffix="years" value={girlAge} onChange={setGirlAge} limits={LIMITS.girlAge} />
                <FieldWithSlider label="Interest Rate (Annual)" suffix="%" value={annualRate} onChange={setAnnualRate} limits={LIMITS.rate} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Deposits made for: 15 years</div>
                        <div className="ig-item ig-result">Matures in: {totalYears} years (at age 21)</div>
                        <div className="ig-item ig-result">Total Deposited: ₹{formatCurrency(totalDeposit)}</div>
                        <div className="ig-item ig-result">Interest Earned: ₹{formatCurrency(interestEarned)}</div>
                        <div className="ig-item ig-result ig-result-total">Maturity Value: ₹{formatCurrency(maturityValue)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Deposits allowed only for first 15 years; account matures when the girl turns 21
                    (or on marriage after 18). Interest compounds annually and is fully tax-exempt (EEE status).
                    Max annual deposit ₹1.5 lakh.
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