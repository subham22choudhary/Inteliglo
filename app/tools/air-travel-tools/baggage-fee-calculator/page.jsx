"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["TRAVEL"],
};

// Approx excess baggage rates (₹ per kg) — domestic economy
const AIRLINE_RATES = {
    indigo: { label: "IndiGo", freeAllowance: 15, ratePerKg: 500 },
    airindia: { label: "Air India", freeAllowance: 25, ratePerKg: 550 },
    spicejet: { label: "SpiceJet", freeAllowance: 15, ratePerKg: 500 },
    akasa: { label: "Akasa Air", freeAllowance: 15, ratePerKg: 500 },
    vistara: { label: "Vistara", freeAllowance: 20, ratePerKg: 550 },
};

function calculateBaggageFee(totalWeightKg, airlineKey) {
    const airline = AIRLINE_RATES[airlineKey];
    const excessWeight = Math.max(totalWeightKg - airline.freeAllowance, 0);
    const excessFee = excessWeight * airline.ratePerKg;

    return { freeAllowance: airline.freeAllowance, excessWeight, excessFee };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    totalWeight: { min: 5, max: 60, step: 1 },
};

export default function Page() {
    const [totalWeightKg, setTotalWeightKg] = useState(20);
    const [airlineKey, setAirlineKey] = useState("indigo");

    const { freeAllowance, excessWeight, excessFee } = useMemo(() => {
        const w = Number(totalWeightKg) || 0;
        return calculateBaggageFee(w, airlineKey);
    }, [totalWeightKg, airlineKey]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Travel</p>
                <h1 style={{ textAlign: "center" }}>Flight Baggage Fee Calculator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Airline</p>
                    <select className="ig-input" style={{ width: "100%", padding: "10px 12px" }} value={airlineKey} onChange={(e) => setAirlineKey(e.target.value)}>
                        {Object.entries(AIRLINE_RATES).map(([key, a]) => (
                            <option key={key} value={key}>{a.label}</option>
                        ))}
                    </select>
                </div>

                <FieldWithSlider label="Total Check-in Baggage Weight" suffix="kg" value={totalWeightKg} onChange={setTotalWeightKg} limits={LIMITS.totalWeight} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Free Allowance: {freeAllowance} kg</div>
                        <div className="ig-item ig-result">Excess Weight: {excessWeight.toFixed(1)} kg</div>
                        <div className="ig-item ig-result ig-result-total">Estimated Excess Baggage Fee: ₹{formatCurrency(excessFee)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Estimate based on typical domestic economy free-baggage allowances and per-kg
                    excess rates, which vary by fare type (some fares include extra baggage) and
                    change periodically. Confirm exact allowance on your ticket or the airline's website.
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