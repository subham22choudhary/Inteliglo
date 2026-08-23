"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateInflation(currentAmount, inflationRate, years) {
    const futureValue = currentAmount * Math.pow(1 + inflationRate / 100, years);
    const purchasingPowerLoss = futureValue - currentAmount;
    const equivalentPurchasingPower = currentAmount / Math.pow(1 + inflationRate / 100, years);

    return { futureValue, purchasingPowerLoss, equivalentPurchasingPower };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    currentAmount: { min: 100, max: 100000000, step: 1000 },
    inflationRate: { min: 1, max: 15, step: 0.1 },
    years: { min: 1, max: 50, step: 1 },
};

export default function Page() {
    const [currentAmount, setCurrentAmount] = useState(100000);
    const [inflationRate, setInflationRate] = useState(6);
    const [years, setYears] = useState(10);

    const { futureValue, purchasingPowerLoss, equivalentPurchasingPower } = useMemo(() => {
        const a = Number(currentAmount) || 0;
        const r = Number(inflationRate) || 0;
        const y = Number(years) || 1;
        return calculateInflation(a, r, y);
    }, [currentAmount, inflationRate, years]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>Inflation Calculator</h1>

                <FieldWithSlider label="Current Amount" prefix="₹" value={currentAmount} onChange={setCurrentAmount} limits={LIMITS.currentAmount} />
                <FieldWithSlider label="Expected Inflation Rate" suffix="%" value={inflationRate} onChange={setInflationRate} limits={LIMITS.inflationRate} />
                <FieldWithSlider label="Time Period" suffix="years" value={years} onChange={setYears} limits={LIMITS.years} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result ig-result-total">Future Cost of Same Goods: ₹{formatCurrency(futureValue)}</div>
                        <div className="ig-item ig-result">Value Lost to Inflation: ₹{formatCurrency(purchasingPowerLoss)}</div>
                        <div className="ig-item ig-result">Today's Value of ₹{formatCurrency(currentAmount)} in {years} years: ₹{formatCurrency(equivalentPurchasingPower)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Estimates assume a constant inflation rate over the period, which rarely holds true
                    in reality. Actual inflation varies year to year based on economic conditions.
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