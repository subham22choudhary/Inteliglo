"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["UTILITY"],
};

// Simplified slab-based tariff (illustrative — actual varies wildly by state/discom)
const SLABS = [
    { upto: 100, rate: 3.5 },
    { upto: 200, rate: 5.0 },
    { upto: 400, rate: 6.5 },
    { upto: Infinity, rate: 8.0 },
];

function calculateBill(unitsConsumed, fixedCharge) {
    let remaining = unitsConsumed;
    let previousLimit = 0;
    let energyCharge = 0;
    const breakdown = [];

    for (const slab of SLABS) {
        if (remaining <= 0) break;
        const slabUnits = Math.min(remaining, slab.upto - previousLimit);
        const slabCharge = slabUnits * slab.rate;
        energyCharge += slabCharge;
        if (slabUnits > 0) {
            breakdown.push({ range: `${previousLimit + 1}-${previousLimit + slabUnits}`, units: slabUnits, rate: slab.rate, charge: slabCharge });
        }
        remaining -= slabUnits;
        previousLimit = slab.upto;
    }

    const subtotal = energyCharge + fixedCharge;
    const electricityDuty = subtotal * 0.05; // approx 5%
    const totalBill = subtotal + electricityDuty;

    return { energyCharge, breakdown, subtotal, electricityDuty, totalBill };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    units: { min: 10, max: 2000, step: 10 },
    fixedCharge: { min: 0, max: 500, step: 10 },
};

export default function Page() {
    const [unitsConsumed, setUnitsConsumed] = useState(250);
    const [fixedCharge, setFixedCharge] = useState(100);

    const { breakdown, subtotal, electricityDuty, totalBill } = useMemo(() => {
        const u = Number(unitsConsumed) || 0;
        const f = Number(fixedCharge) || 0;
        return calculateBill(u, f);
    }, [unitsConsumed, fixedCharge]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>Electricity Bill Calculator</h1>

                <FieldWithSlider label="Units Consumed" suffix="kWh" value={unitsConsumed} onChange={setUnitsConsumed} limits={LIMITS.units} />
                <FieldWithSlider label="Fixed/Meter Charge" prefix="₹" value={fixedCharge} onChange={setFixedCharge} limits={LIMITS.fixedCharge} />

                <div className="ig-category">
                    <p className="ig-category-label">Slab-wise Breakdown</p>
                    <div className="ig-list">
                        {breakdown.map((b) => (
                            <div className="ig-item ig-result" key={b.range}>
                                {b.range} units × ₹{b.rate}: ₹{formatCurrency(b.charge)}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Subtotal (Energy + Fixed): ₹{formatCurrency(subtotal)}</div>
                        <div className="ig-item ig-result">Electricity Duty (~5%): ₹{formatCurrency(electricityDuty)}</div>
                        <div className="ig-item ig-result ig-result-total">Estimated Total Bill: ₹{formatCurrency(totalBill)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Illustrative slab rates only — actual electricity tariffs vary significantly by
                    state, discom (BSES, TATA Power, MSEB, etc.), and connection type (domestic/commercial).
                    Check your local discom's official tariff card for accurate billing.
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