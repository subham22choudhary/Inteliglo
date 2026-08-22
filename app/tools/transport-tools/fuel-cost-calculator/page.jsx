"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["TRANSPORT"],
};

function calculateFuelCost(distanceKm, mileageKmPerLitre, fuelPricePerLitre) {
    const litresRequired = distanceKm / mileageKmPerLitre;
    const totalCost = litresRequired * fuelPricePerLitre;
    const costPerKm = totalCost / distanceKm;

    return { litresRequired, totalCost, costPerKm };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    distanceKm: { min: 1, max: 5000, step: 10 },
    mileage: { min: 5, max: 40, step: 1 },
    fuelPrice: { min: 60, max: 150, step: 1 },
};

export default function Page() {
    const [distanceKm, setDistanceKm] = useState(500);
    const [mileageKmPerLitre, setMileageKmPerLitre] = useState(15);
    const [fuelPricePerLitre, setFuelPricePerLitre] = useState(100);

    const { litresRequired, totalCost, costPerKm } = useMemo(() => {
        const d = Number(distanceKm) || 0;
        const m = Number(mileageKmPerLitre) || 1;
        const f = Number(fuelPricePerLitre) || 0;
        return calculateFuelCost(d, m, f);
    }, [distanceKm, mileageKmPerLitre, fuelPricePerLitre]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Transport</p>
                <h1 style={{ textAlign: "center" }}>Fuel Cost Calculator</h1>

                <FieldWithSlider label="Trip Distance" suffix="km" value={distanceKm} onChange={setDistanceKm} limits={LIMITS.distanceKm} />
                <FieldWithSlider label="Vehicle Mileage" suffix="km/litre" value={mileageKmPerLitre} onChange={setMileageKmPerLitre} limits={LIMITS.mileage} />
                <FieldWithSlider label="Fuel Price" prefix="₹" suffix="/litre" value={fuelPricePerLitre} onChange={setFuelPricePerLitre} limits={LIMITS.fuelPrice} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Fuel Required: {litresRequired.toFixed(2)} litres</div>
                        <div className="ig-item ig-result">Cost per Km: ₹{costPerKm.toFixed(2)}</div>
                        <div className="ig-item ig-result ig-result-total">Total Fuel Cost: ₹{formatCurrency(totalCost)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Uses your vehicle's rated mileage, which varies with driving conditions, load,
                    traffic, and AC usage. Real-world mileage is often 10-20% lower than claimed figures.
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