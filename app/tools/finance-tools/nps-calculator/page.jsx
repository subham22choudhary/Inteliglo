"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["RETIREMENT"],
};

function calculateNPS(monthlyContribution, currentAge, retirementAge, expectedReturn, annuityPercent, annuityRate) {
    const months = (retirementAge - currentAge) * 12;
    const monthlyRate = expectedReturn / 12 / 100;
    const corpus =
        monthlyRate === 0
            ? monthlyContribution * months
            : monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);

    const investedAmount = monthlyContribution * months;
    const wealthGained = corpus - investedAmount;
    const annuityAmount = (corpus * annuityPercent) / 100;
    const lumpsumAmount = corpus - annuityAmount;
    const monthlyPension = (annuityAmount * (annuityRate / 100)) / 12;

    return { investedAmount, wealthGained, corpus, annuityAmount, lumpsumAmount, monthlyPension };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    monthlyContribution: { min: 500, max: 200000, step: 500 },
    currentAge: { min: 18, max: 59, step: 1 },
    retirementAge: { min: 60, max: 70, step: 1 },
    expectedReturn: { min: 5, max: 15, step: 0.5 },
    annuityPercent: { min: 40, max: 100, step: 5 },
    annuityRate: { min: 4, max: 10, step: 0.5 },
};

export default function Page() {
    const [monthlyContribution, setMonthlyContribution] = useState(5000);
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);
    const [expectedReturn, setExpectedReturn] = useState(10);
    const [annuityPercent, setAnnuityPercent] = useState(40);
    const [annuityRate, setAnnuityRate] = useState(6);

    const { investedAmount, wealthGained, corpus, annuityAmount, lumpsumAmount, monthlyPension } = useMemo(() => {
        const c = Number(monthlyContribution) || 0;
        const age1 = Number(currentAge) || 18;
        const age2 = Math.max(Number(retirementAge) || 60, age1 + 1);
        const r = Number(expectedReturn) || 0;
        const ap = Number(annuityPercent) || 40;
        const ar = Number(annuityRate) || 6;
        return calculateNPS(c, age1, age2, r, ap, ar);
    }, [monthlyContribution, currentAge, retirementAge, expectedReturn, annuityPercent, annuityRate]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Retirement</p>
                <h1 style={{ textAlign: "center" }}>NPS (National Pension System) Calculator</h1>

                <FieldWithSlider label="Monthly Contribution" prefix="₹" value={monthlyContribution} onChange={setMonthlyContribution} limits={LIMITS.monthlyContribution} />
                <FieldWithSlider label="Current Age" suffix="years" value={currentAge} onChange={setCurrentAge} limits={LIMITS.currentAge} />
                <FieldWithSlider label="Retirement Age" suffix="years" value={retirementAge} onChange={setRetirementAge} limits={LIMITS.retirementAge} />
                <FieldWithSlider label="Expected Annual Return" suffix="%" value={expectedReturn} onChange={setExpectedReturn} limits={LIMITS.expectedReturn} />
                <FieldWithSlider label="Annuity Purchase" suffix="% of corpus" value={annuityPercent} onChange={setAnnuityPercent} limits={LIMITS.annuityPercent} />
                <FieldWithSlider label="Expected Annuity Rate" suffix="%" value={annuityRate} onChange={setAnnuityRate} limits={LIMITS.annuityRate} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Invested Amount: ₹{formatCurrency(investedAmount)}</div>
                        <div className="ig-item ig-result">Wealth Gained: ₹{formatCurrency(wealthGained)}</div>
                        <div className="ig-item ig-result ig-result-total">Total Corpus at Retirement: ₹{formatCurrency(corpus)}</div>
                        <div className="ig-item ig-result">Lumpsum Withdrawal: ₹{formatCurrency(lumpsumAmount)}</div>
                        <div className="ig-item ig-result">Annuity Investment: ₹{formatCurrency(annuityAmount)}</div>
                        <div className="ig-item ig-result">Estimated Monthly Pension: ₹{formatCurrency(monthlyPension)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Estimates only. Actual NPS returns depend on market-linked fund performance,
                    scheme allocation (equity/corporate bonds/govt securities), and annuity provider rates at retirement.
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