"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

const LTV_OPTIONS = [
    { key: "60", label: "60%" },
    { key: "75", label: "75% (RBI cap)" },
    { key: "80", label: "80%" },
];

const PURITY_OPTIONS = [
    { key: "24", label: "24K (99.9%)", purity: 99.9 },
    { key: "22", label: "22K (91.6%)", purity: 91.6 },
    { key: "18", label: "18K (75%)", purity: 75 },
];

function calculateGoldLoan(goldWeightGrams, goldRatePerGram, purity, ltvPercent, annualRate, months) {
    const purityFactor = purity / 100;
    const goldValue = goldWeightGrams * goldRatePerGram * purityFactor;
    const eligibleLoan = (goldValue * ltvPercent) / 100;

    const monthlyRate = annualRate / 12 / 100;
    const emi =
        monthlyRate === 0
            ? eligibleLoan / months
            : (eligibleLoan * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emi * months;
    const totalInterest = totalPayment - eligibleLoan;

    return { goldValue, eligibleLoan, emi, totalPayment, totalInterest };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    goldWeight: { min: 1, max: 500, step: 1 },
    goldRate: { min: 3000, max: 12000, step: 50 },
    rate: { min: 7, max: 18, step: 0.1 },
    tenureYears: { min: 0.25, max: 3, step: 0.25 },
};

export default function Page() {
    const [goldWeightGrams, setGoldWeightGrams] = useState(50);
    const [goldRatePerGram, setGoldRatePerGram] = useState(7000);
    const [purityKey, setPurityKey] = useState("22");
    const [ltv, setLtv] = useState("75");
    const [rate, setRate] = useState(10);
    const [tenureYears, setTenureYears] = useState(1);

    const purity = PURITY_OPTIONS.find((p) => p.key === purityKey)?.purity ?? 91.6;
    const months = Math.max(1, Math.round(Number(tenureYears) * 12) || 1);

    const { goldValue, eligibleLoan, emi, totalPayment, totalInterest } = useMemo(() => {
        const w = Number(goldWeightGrams) || 0;
        const r = Number(goldRatePerGram) || 0;
        const rt = Number(rate) || 0;
        return calculateGoldLoan(w, r, purity, Number(ltv), rt, months);
    }, [goldWeightGrams, goldRatePerGram, purity, ltv, rate, months]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>Gold Loan Calculator</h1>

                <FieldWithSlider label="Gold Weight" suffix="grams" value={goldWeightGrams} onChange={setGoldWeightGrams} limits={LIMITS.goldWeight} />
                <FieldWithSlider label="Gold Rate" prefix="₹" suffix="/gram" value={goldRatePerGram} onChange={setGoldRatePerGram} limits={LIMITS.goldRate} />

                <div className="ig-category">
                    <p className="ig-category-label">Gold Purity</p>
                    <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {PURITY_OPTIONS.map((p) => (
                            <button
                                key={p.key}
                                className="ig-item"
                                style={purityKey === p.key ? {} : { background: "transparent", color: "#f5f5f0", border: "1px solid #333" }}
                                onClick={() => setPurityKey(p.key)}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Loan-to-Value (LTV) Ratio</p>
                    <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {LTV_OPTIONS.map((l) => (
                            <button
                                key={l.key}
                                className="ig-item"
                                style={ltv === l.key ? {} : { background: "transparent", color: "#f5f5f0", border: "1px solid #333" }}
                                onClick={() => setLtv(l.key)}
                            >
                                {l.label}
                            </button>
                        ))}
                    </div>
                </div>

                <FieldWithSlider label="Interest Rate" suffix="% p.a." value={rate} onChange={setRate} limits={LIMITS.rate} />
                <FieldWithSlider label="Loan Tenure" suffix="years" value={tenureYears} onChange={setTenureYears} limits={LIMITS.tenureYears} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item" style={{ cursor: "default" }}>Gold Value: ₹{formatCurrency(goldValue)}</div>
                        <div className="ig-item" style={{ cursor: "default" }}>Eligible Loan Amount: ₹{formatCurrency(eligibleLoan)}</div>
                        <div className="ig-item" style={{ cursor: "default" }}>Monthly EMI: ₹{formatCurrency(emi)}</div>
                        <div className="ig-item" style={{ cursor: "default" }}>Total Interest: ₹{formatCurrency(totalInterest)}</div>
                        <div className="ig-item" style={{ cursor: "default" }}>Total Repayment: ₹{formatCurrency(totalPayment)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    RBI caps gold loan LTV at 75% of gold value for regulated lenders. Gold rates fluctuate
                    daily — check current rates with your lender. Estimates only.
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