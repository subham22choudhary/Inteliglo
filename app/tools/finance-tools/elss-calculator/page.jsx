"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["TAX & GOVERNMENT CHARGES"],
};

function calculateELSS(monthlyInvestment, expectedReturn, years, taxSlabPercent) {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = years * 12;
    const futureValue =
        monthlyRate === 0
            ? monthlyInvestment * months
            : monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);

    const investedAmount = monthlyInvestment * months;
    const wealthGained = futureValue - investedAmount;
    const annualInvestment = monthlyInvestment * 12;
    const taxSaved = Math.min(annualInvestment, 150000) * (taxSlabPercent / 100) * years;

    return { investedAmount, wealthGained, futureValue, taxSaved };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    monthlyInvestment: { min: 500, max: 150000, step: 500 },
    expectedReturn: { min: 5, max: 20, step: 0.5 },
    years: { min: 3, max: 30, step: 1 },
    taxSlab: { min: 0, max: 30, step: 5 },
};

export default function Page() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(12500);
    const [expectedReturn, setExpectedReturn] = useState(12);
    const [years, setYears] = useState(10);
    const [taxSlabPercent, setTaxSlabPercent] = useState(30);

    const { investedAmount, wealthGained, futureValue, taxSaved } = useMemo(() => {
        const m = Number(monthlyInvestment) || 0;
        const r = Number(expectedReturn) || 0;
        const y = Number(years) || 1;
        const t = Number(taxSlabPercent) || 0;
        return calculateELSS(m, r, y, t);
    }, [monthlyInvestment, expectedReturn, years, taxSlabPercent]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Mutual Funds</p>
                <h1 style={{ textAlign: "center" }}>ELSS (Tax-Saving Mutual Fund) Calculator</h1>

                <FieldWithSlider label="Monthly Investment" prefix="₹" value={monthlyInvestment} onChange={setMonthlyInvestment} limits={LIMITS.monthlyInvestment} />
                <FieldWithSlider label="Expected Annual Return" suffix="%" value={expectedReturn} onChange={setExpectedReturn} limits={LIMITS.expectedReturn} />
                <FieldWithSlider label="Investment Period" suffix="years" value={years} onChange={setYears} limits={LIMITS.years} />
                <FieldWithSlider label="Your Tax Slab" suffix="%" value={taxSlabPercent} onChange={setTaxSlabPercent} limits={LIMITS.taxSlab} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Invested Amount: ₹{formatCurrency(investedAmount)}</div>
                        <div className="ig-item ig-result">Wealth Gained: ₹{formatCurrency(wealthGained)}</div>
                        <div className="ig-item ig-result ig-result-total">Maturity Value: ₹{formatCurrency(futureValue)}</div>
                        <div className="ig-item ig-result">Estimated Tax Saved (80C): ₹{formatCurrency(taxSaved)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    ELSS has a 3-year lock-in, the shortest among 80C options. Tax deduction capped at
                    ₹1.5 lakh/year under Section 80C. LTCG above ₹1.25 lakh/year taxed at 12.5% on redemption.
                    Returns are market-linked and not guaranteed.
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