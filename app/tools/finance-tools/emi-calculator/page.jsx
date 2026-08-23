"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateEMI(principal, annualRate, months) {
    const monthlyRate = annualRate / 12 / 100;

    if (monthlyRate === 0) {
        const emi = principal / months;
        return { emi, totalPayment: principal, totalInterest: 0 };
    }

    const factor = Math.pow(1 + monthlyRate, months);
    const emi = (principal * monthlyRate * factor) / (factor - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    return { emi, totalPayment, totalInterest };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

const LIMITS = {
    principal: { min: 10000, max: 10000000, step: 10000 },
    rate: { min: 1, max: 25, step: 0.05 },
    tenureYears: { min: 0.5, max: 30, step: 0.5 },
};

export default function Page() {
    const [principal, setPrincipal] = useState(500000);
    const [rate, setRate] = useState(9.5);
    const [tenureYears, setTenureYears] = useState(5);

    const months = Math.max(1, Math.round(Number(tenureYears) * 12) || 1);

    const { emi, totalPayment, totalInterest } = useMemo(() => {
        const p = Number(principal) || 0;
        const r = Number(rate) || 0;
        return calculateEMI(p, r, months);
    }, [principal, rate, months]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>EMI Calculator</h1>

                <FieldWithSlider
                    label="Loan Amount"
                    prefix="₹"
                    value={principal}
                    onChange={setPrincipal}
                    limits={LIMITS.principal}
                />

                <FieldWithSlider
                    label="Interest Rate"
                    suffix="% p.a."
                    value={rate}
                    onChange={setRate}
                    limits={LIMITS.rate}
                />

                <FieldWithSlider
                    label="Loan Tenure"
                    suffix="years"
                    value={tenureYears}
                    onChange={setTenureYears}
                    limits={LIMITS.tenureYears}
                />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Monthly EMI: ₹{formatCurrency(emi)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Total Interest Payable: ₹{formatCurrency(totalInterest)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Total Payment (Principal + Interest): ₹{formatCurrency(totalPayment)}
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