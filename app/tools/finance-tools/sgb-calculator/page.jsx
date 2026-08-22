"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["BONDS"],
};

function calculateSGB(investmentAmount, currentGoldPrice, expectedGoldPrice, years, interestRate) {
    const units = investmentAmount / currentGoldPrice; // grams
    const annualInterest = (investmentAmount * interestRate) / 100;
    const totalInterest = annualInterest * years;
    const maturityValue = units * expectedGoldPrice;
    const totalReturns = maturityValue + totalInterest - investmentAmount;

    return { units, annualInterest, totalInterest, maturityValue, totalReturns };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    investmentAmount: { min: 1000, max: 5000000, step: 1000 },
    currentGoldPrice: { min: 3000, max: 15000, step: 100 },
    expectedGoldPrice: { min: 3000, max: 30000, step: 100 },
    years: { min: 1, max: 8, step: 1 },
    interestRate: { min: 1, max: 5, step: 0.1 },
};

export default function Page() {
    const [investmentAmount, setInvestmentAmount] = useState(100000);
    const [currentGoldPrice, setCurrentGoldPrice] = useState(7000);
    const [expectedGoldPrice, setExpectedGoldPrice] = useState(10000);
    const [years, setYears] = useState(8);
    const [interestRate, setInterestRate] = useState(2.5);

    const { units, annualInterest, totalInterest, maturityValue, totalReturns } = useMemo(() => {
        const inv = Number(investmentAmount) || 0;
        const cur = Number(currentGoldPrice) || 1;
        const exp = Number(expectedGoldPrice) || 0;
        const y = Number(years) || 1;
        const r = Number(interestRate) || 0;
        return calculateSGB(inv, cur, exp, y, r);
    }, [investmentAmount, currentGoldPrice, expectedGoldPrice, years, interestRate]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Bonds</p>
                <h1 style={{ textAlign: "center" }}>SGB (Sovereign Gold Bond) Calculator</h1>

                <FieldWithSlider label="Investment Amount" prefix="₹" value={investmentAmount} onChange={setInvestmentAmount} limits={LIMITS.investmentAmount} />
                <FieldWithSlider label="Current Gold Price" suffix="₹/gram" value={currentGoldPrice} onChange={setCurrentGoldPrice} limits={LIMITS.currentGoldPrice} />
                <FieldWithSlider label="Expected Gold Price at Maturity" suffix="₹/gram" value={expectedGoldPrice} onChange={setExpectedGoldPrice} limits={LIMITS.expectedGoldPrice} />
                <FieldWithSlider label="Holding Period" suffix="years" value={years} onChange={setYears} limits={LIMITS.years} />
                <FieldWithSlider label="Annual Interest Rate" suffix="%" value={interestRate} onChange={setInterestRate} limits={LIMITS.interestRate} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Gold Units Allotted: {units.toFixed(3)} g</div>
                        <div className="ig-item ig-result">Annual Interest: ₹{formatCurrency(annualInterest)}</div>
                        <div className="ig-item ig-result">Total Interest Earned: ₹{formatCurrency(totalInterest)}</div>
                        <div className="ig-item ig-result">Maturity Value (Gold): ₹{formatCurrency(maturityValue)}</div>
                        <div className="ig-item ig-result ig-result-total">Total Returns: ₹{formatCurrency(totalReturns)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Estimates only. SGB maturity value depends on RBI's published gold price at redemption.
                    Interest is paid semi-annually at a fixed rate; LTCG on maturity redemption is tax-exempt
                    for individuals per current rules.
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