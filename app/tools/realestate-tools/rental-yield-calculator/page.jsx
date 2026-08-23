"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateRentalYield(propertyValue, monthlyRent, annualMaintenanceCost) {
    const annualRent = monthlyRent * 12;
    const grossYield = (annualRent / propertyValue) * 100;
    const netAnnualIncome = annualRent - annualMaintenanceCost;
    const netYield = (netAnnualIncome / propertyValue) * 100;

    return { annualRent, grossYield, netAnnualIncome, netYield };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    propertyValue: { min: 500000, max: 50000000, step: 100000 },
    monthlyRent: { min: 3000, max: 300000, step: 1000 },
    maintenanceCost: { min: 0, max: 500000, step: 5000 },
};

export default function Page() {
    const [propertyValue, setPropertyValue] = useState(6000000);
    const [monthlyRent, setMonthlyRent] = useState(20000);
    const [annualMaintenanceCost, setAnnualMaintenanceCost] = useState(30000);

    const { annualRent, grossYield, netAnnualIncome, netYield } = useMemo(() => {
        const p = Number(propertyValue) || 1;
        const r = Number(monthlyRent) || 0;
        const m = Number(annualMaintenanceCost) || 0;
        return calculateRentalYield(p, r, m);
    }, [propertyValue, monthlyRent, annualMaintenanceCost]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Real Estate" />
                <h1 style={{ textAlign: "center" }}>Rental Yield Calculator</h1>

                <FieldWithSlider label="Property Value" prefix="₹" value={propertyValue} onChange={setPropertyValue} limits={LIMITS.propertyValue} />
                <FieldWithSlider label="Monthly Rent" prefix="₹" value={monthlyRent} onChange={setMonthlyRent} limits={LIMITS.monthlyRent} />
                <FieldWithSlider label="Annual Maintenance & Other Costs" prefix="₹" value={annualMaintenanceCost} onChange={setAnnualMaintenanceCost} limits={LIMITS.maintenanceCost} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Annual Rent: ₹{formatCurrency(annualRent)}</div>
                        <div className="ig-item ig-result">Gross Rental Yield: {grossYield.toFixed(2)}%</div>
                        <div className="ig-item ig-result">Net Annual Income: ₹{formatCurrency(netAnnualIncome)}</div>
                        <div className="ig-item ig-result ig-result-total">Net Rental Yield: {netYield.toFixed(2)}%</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Gross yield = annual rent ÷ property value. Net yield subtracts maintenance,
                    property tax, and other holding costs. Indian residential rental yields typically
                    range 2–4% — much lower than most other asset classes, but property also offers capital appreciation.
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