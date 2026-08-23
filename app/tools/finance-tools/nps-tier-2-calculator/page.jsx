"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateNPSTier2(monthlyContribution, expectedReturn, years) {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = years * 12;
    const futureValue =
        monthlyRate === 0
            ? monthlyContribution * months
            : monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);

    const investedAmount = monthlyContribution * months;
    const wealthGained = futureValue - investedAmount;

    return { investedAmount, wealthGained, futureValue };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    monthlyContribution: { min: 250, max: 200000, step: 250 },
    expectedReturn: { min: 5, max: 15, step: 0.5 },
    years: { min: 1, max: 40, step: 1 },
};

export default function Page() {
    const [monthlyContribution, setMonthlyContribution] = useState(5000);
    const [expectedReturn, setExpectedReturn] = useState(10);
    const [years, setYears] = useState(15);

    const { investedAmount, wealthGained, futureValue } = useMemo(() => {
        const c = Number(monthlyContribution) || 0;
        const r = Number(expectedReturn) || 0;
        const y = Number(years) || 1;
        return calculateNPSTier2(c, r, y);
    }, [monthlyContribution, expectedReturn, years]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>NPS Tier 2 Calculator</h1>

                <FieldWithSlider label="Monthly Contribution" prefix="₹" value={monthlyContribution} onChange={setMonthlyContribution} limits={LIMITS.monthlyContribution} />
                <FieldWithSlider label="Expected Annual Return" suffix="%" value={expectedReturn} onChange={setExpectedReturn} limits={LIMITS.expectedReturn} />
                <FieldWithSlider label="Investment Period" suffix="years" value={years} onChange={setYears} limits={LIMITS.years} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Total Invested: ₹{formatCurrency(investedAmount)}</div>
                        <div className="ig-item ig-result">Wealth Gained: ₹{formatCurrency(wealthGained)}</div>
                        <div className="ig-item ig-result ig-result-total">Final Value: ₹{formatCurrency(futureValue)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    NPS Tier 2 is a voluntary, withdrawable savings account (no lock-in, unlike Tier 1)
                    with no tax benefit for most subscribers (except government employees under certain
                    conditions). Returns are market-linked, not guaranteed.
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