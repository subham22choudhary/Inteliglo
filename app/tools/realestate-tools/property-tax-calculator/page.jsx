"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["REAL ESTATE", "TAX"],
};

function calculatePropertyTax(builtUpArea, ratePerSqFt, ageFactor, usageMultiplier, occupancyMultiplier) {
    const baseValue = builtUpArea * ratePerSqFt;
    const annualValue = baseValue * ageFactor * usageMultiplier * occupancyMultiplier;
    const taxRate = 0.2; // approx 20% of annual value, varies by municipality
    const annualTax = annualValue * taxRate;

    return { baseValue, annualValue, annualTax };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    builtUpArea: { min: 200, max: 10000, step: 50 },
    ratePerSqFt: { min: 1, max: 50, step: 1 },
};

export default function Page() {
    const [builtUpArea, setBuiltUpArea] = useState(1200);
    const [ratePerSqFt, setRatePerSqFt] = useState(10);
    const [propertyAge, setPropertyAge] = useState("new");
    const [usage, setUsage] = useState("residential");
    const [occupancy, setOccupancy] = useState("selfoccupied");

    const ageFactor = propertyAge === "new" ? 1 : propertyAge === "medium" ? 0.9 : 0.8;
    const usageMultiplier = usage === "residential" ? 1 : 2;
    const occupancyMultiplier = occupancy === "selfoccupied" ? 1 : 1.5;

    const { baseValue, annualValue, annualTax } = useMemo(() => {
        const a = Number(builtUpArea) || 0;
        const r = Number(ratePerSqFt) || 0;
        return calculatePropertyTax(a, r, ageFactor, usageMultiplier, occupancyMultiplier);
    }, [builtUpArea, ratePerSqFt, ageFactor, usageMultiplier, occupancyMultiplier]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Real Estate</p>
                <h1 style={{ textAlign: "center" }}>Property Tax Calculator</h1>

                <FieldWithSlider label="Built-up Area" suffix="sq. ft." value={builtUpArea} onChange={setBuiltUpArea} limits={LIMITS.builtUpArea} />
                <FieldWithSlider label="Municipal Rate per Sq. Ft." prefix="₹" value={ratePerSqFt} onChange={setRatePerSqFt} limits={LIMITS.ratePerSqFt} />

                <div className="ig-category">
                    <p className="ig-category-label">Property Age</p>
                    <div className="ig-list" style={{ display: "flex", gap: 8, gridTemplateColumns: "unset" }}>
                        <button className={`ig-item ig-metal-btn${propertyAge === "new" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setPropertyAge("new")}>New (&lt;5 yrs)</button>
                        <button className={`ig-item ig-metal-btn${propertyAge === "medium" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setPropertyAge("medium")}>5–15 yrs</button>
                        <button className={`ig-item ig-metal-btn${propertyAge === "old" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setPropertyAge("old")}>15+ yrs</button>
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Usage</p>
                    <div className="ig-list" style={{ display: "flex", gap: 8, gridTemplateColumns: "unset" }}>
                        <button className={`ig-item ig-metal-btn${usage === "residential" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setUsage("residential")}>Residential</button>
                        <button className={`ig-item ig-metal-btn${usage === "commercial" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setUsage("commercial")}>Commercial</button>
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Occupancy</p>
                    <div className="ig-list" style={{ display: "flex", gap: 8, gridTemplateColumns: "unset" }}>
                        <button className={`ig-item ig-metal-btn${occupancy === "selfoccupied" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setOccupancy("selfoccupied")}>Self-Occupied</button>
                        <button className={`ig-item ig-metal-btn${occupancy === "rented" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setOccupancy("rented")}>Rented Out</button>
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Base Property Value: ₹{formatCurrency(baseValue)}</div>
                        <div className="ig-item ig-result">Annual Rateable Value: ₹{formatCurrency(annualValue)}</div>
                        <div className="ig-item ig-result ig-result-total">Estimated Annual Property Tax: ₹{formatCurrency(annualTax)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Highly simplified estimate — actual property tax calculation methods differ
                    significantly across municipal corporations (Unit Area, Capital Value, or Annual
                    Rental Value systems). Confirm the exact method and rate with your local municipal body.
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