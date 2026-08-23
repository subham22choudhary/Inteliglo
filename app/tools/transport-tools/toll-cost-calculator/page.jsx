"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

const VEHICLE_MULTIPLIER = {
    car: { label: "Car / Jeep / Van", multiplier: 1 },
    lcv: { label: "Light Commercial Vehicle", multiplier: 1.6 },
    bus: { label: "Bus / Truck (2-axle)", multiplier: 3.3 },
    heavy: { label: "Heavy Vehicle (3+ axle)", multiplier: 5 },
};

function calculateToll(numberOfTolls, avgTollFee, vehicleType, isRoundTrip) {
    const multiplier = VEHICLE_MULTIPLIER[vehicleType].multiplier;
    const perTollCost = avgTollFee * multiplier;
    const oneWayCost = perTollCost * numberOfTolls;
    const totalCost = isRoundTrip ? oneWayCost * 2 : oneWayCost;

    return { perTollCost, oneWayCost, totalCost };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    numberOfTolls: { min: 1, max: 20, step: 1 },
    avgTollFee: { min: 20, max: 300, step: 5 },
};

export default function Page() {
    const [numberOfTolls, setNumberOfTolls] = useState(3);
    const [avgTollFee, setAvgTollFee] = useState(75);
    const [vehicleType, setVehicleType] = useState("car");
    const [isRoundTrip, setIsRoundTrip] = useState(true);

    const { perTollCost, oneWayCost, totalCost } = useMemo(() => {
        const n = Number(numberOfTolls) || 0;
        const f = Number(avgTollFee) || 0;
        return calculateToll(n, f, vehicleType, isRoundTrip);
    }, [numberOfTolls, avgTollFee, vehicleType, isRoundTrip]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Transport" />
                <h1 style={{ textAlign: "center" }}>Toll Cost Estimator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Vehicle Type</p>
                    <select className="ig-input" style={{ width: "100%", padding: "10px 12px" }} value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                        {Object.entries(VEHICLE_MULTIPLIER).map(([key, v]) => (
                            <option key={key} value={key}>{v.label}</option>
                        ))}
                    </select>
                </div>

                <FieldWithSlider label="Number of Toll Plazas on Route" value={numberOfTolls} onChange={setNumberOfTolls} limits={LIMITS.numberOfTolls} />
                <FieldWithSlider label="Average Toll Fee per Plaza (Car)" prefix="₹" value={avgTollFee} onChange={setAvgTollFee} limits={LIMITS.avgTollFee} />

                <div className="ig-category">
                    <p className="ig-category-label">Trip Type</p>
                    <div className="ig-list" style={{ display: "flex", gap: 8, gridTemplateColumns: "unset" }}>
                        <button className={`ig-item ig-metal-btn${!isRoundTrip ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setIsRoundTrip(false)}>One-Way</button>
                        <button className={`ig-item ig-metal-btn${isRoundTrip ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setIsRoundTrip(true)}>Round Trip</button>
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Cost per Toll Plaza: ₹{formatCurrency(perTollCost)}</div>
                        <div className="ig-item ig-result">One-Way Toll Cost: ₹{formatCurrency(oneWayCost)}</div>
                        <div className="ig-item ig-result ig-result-total">Total Toll Cost: ₹{formatCurrency(totalCost)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Estimate only — actual toll fees vary by specific plaza, vehicle category (NHAI
                    FASTag rates differ from state highway rates), and may include local/return-trip
                    discounts. Check the FASTag toll calculator on NHAI's site for exact route-based fees.
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