"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateSIP(monthlyInvestment, annualRate, years) {
    const months = Math.max(1, Math.round(years * 12) || 1);
    const monthlyRate = annualRate / 12 / 100;

    let futureValue;
    if (monthlyRate === 0) {
        futureValue = monthlyInvestment * months;
    } else {
        futureValue =
            monthlyInvestment *
            ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
            (1 + monthlyRate);
    }

    const totalInvested = monthlyInvestment * months;
    const totalGains = futureValue - totalInvested;

    return { futureValue, totalInvested, totalGains };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

const LIMITS = {
    monthlyInvestment: { min: 500, max: 200000, step: 500 },
    rate: { min: 1, max: 30, step: 0.1 },
    years: { min: 1, max: 40, step: 1 },
};

export default function Page() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);

    const { futureValue, totalInvested, totalGains } = useMemo(() => {
        const m = Number(monthlyInvestment) || 0;
        const r = Number(rate) || 0;
        const y = Number(years) || 0;
        return calculateSIP(m, r, y);
    }, [monthlyInvestment, rate, years]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>SIP Calculator</h1>

                <FieldWithSlider
                    label="Monthly Investment"
                    prefix="₹"
                    value={monthlyInvestment}
                    onChange={setMonthlyInvestment}
                    limits={LIMITS.monthlyInvestment}
                />

                <FieldWithSlider
                    label="Expected Return Rate"
                    suffix="% p.a."
                    value={rate}
                    onChange={setRate}
                    limits={LIMITS.rate}
                />

                <FieldWithSlider
                    label="Investment Duration"
                    suffix="years"
                    value={years}
                    onChange={setYears}
                    limits={LIMITS.years}
                />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Invested Amount: ₹{formatCurrency(totalInvested)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Estimated Gains: ₹{formatCurrency(totalGains)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Total Value: ₹{formatCurrency(futureValue)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FieldWithSlider({ label, value, onChange, limits, prefix, suffix }) {
    const { min, max, step } = limits;

    const clamp = (v) => Math.min(max, Math.max(min, v));

    const handleNumberChange = (e) => {
        const raw = e.target.value;
        onChange(raw === "" ? "" : Number(raw));
    };

    const handleNumberBlur = () => {
        onChange(clamp(Number(value) || min));
    };

    const handleSliderChange = (e) => {
        onChange(Number(e.target.value));
    };

    const percent = ((clamp(Number(value) || min) - min) / (max - min)) * 100;

    return (
        <div className="ig-category">
            <p className="ig-category-label">{label}</p>

            <div className="ig-field">
                {prefix && <span className="ig-field-prefix">{prefix}</span>}
                <input
                    className="ig-input"
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={handleNumberChange}
                    onBlur={handleNumberBlur}
                />
                {suffix && <span className="ig-field-suffix">{suffix}</span>}
            </div>

            <input
                className="ig-slider"
                type="range"
                min={min}
                max={max}
                step={step}
                value={clamp(Number(value) || min)}
                onChange={handleSliderChange}
                style={{ "--ig-slider-percent": `${percent}%` }}
            />
        </div>
    );
}