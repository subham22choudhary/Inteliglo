"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["TRANSPORT"],
};

// Approx per-km base fares by class (₹) — Mail/Express, simplified
const CLASS_RATES = {
    sleeper: { label: "Sleeper (SL)", baseRate: 0.5, minFare: 30 },
    ac3: { label: "AC 3-Tier (3A)", baseRate: 1.4, minFare: 250 },
    ac2: { label: "AC 2-Tier (2A)", baseRate: 2.0, minFare: 350 },
    ac1: { label: "AC First Class (1A)", baseRate: 3.4, minFare: 500 },
    cc: { label: "AC Chair Car (CC)", baseRate: 1.1, minFare: 150 },
};

function calculateFare(distanceKm, classKey) {
    const cls = CLASS_RATES[classKey];
    const baseFare = distanceKm * cls.baseRate;
    const reservationCharge = classKey === "sleeper" ? 20 : 40;
    const superfastCharge = distanceKm > 300 ? 45 : 30;
    const gst = classKey !== "sleeper" ? ((baseFare + reservationCharge + superfastCharge) * 5) / 100 : 0;
    const totalFare = Math.max(baseFare + reservationCharge + superfastCharge + gst, cls.minFare);

    return { baseFare, reservationCharge, superfastCharge, gst, totalFare };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    distanceKm: { min: 10, max: 3000, step: 10 },
};

export default function Page() {
    const [distanceKm, setDistanceKm] = useState(500);
    const [classKey, setClassKey] = useState("ac3");

    const { baseFare, reservationCharge, superfastCharge, gst, totalFare } = useMemo(() => {
        const d = Number(distanceKm) || 0;
        return calculateFare(d, classKey);
    }, [distanceKm, classKey]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Transport</p>
                <h1 style={{ textAlign: "center" }}>Train Fare Calculator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Class</p>
                    <select className="ig-input" style={{ width: "100%", padding: "10px 12px" }} value={classKey} onChange={(e) => setClassKey(e.target.value)}>
                        {Object.entries(CLASS_RATES).map(([key, c]) => (
                            <option key={key} value={key}>{c.label}</option>
                        ))}
                    </select>
                </div>

                <FieldWithSlider label="Distance" suffix="km" value={distanceKm} onChange={setDistanceKm} limits={LIMITS.distanceKm} />

                <div className="ig-category">
                    <p className="ig-category-label">Results (Estimate)</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Base Fare: ₹{formatCurrency(baseFare)}</div>
                        <div className="ig-item ig-result">Reservation Charge: ₹{formatCurrency(reservationCharge)}</div>
                        <div className="ig-item ig-result">Superfast Charge: ₹{formatCurrency(superfastCharge)}</div>
                        {gst > 0 && <div className="ig-item ig-result">GST: ₹{formatCurrency(gst)}</div>}
                        <div className="ig-item ig-result ig-result-total">Estimated Total Fare: ₹{formatCurrency(totalFare)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Rough estimate using approximate IRCTC per-km slabs — actual fares depend on the
                    specific train type (Rajdhani/Shatabdi/Duronto have different rates), route,
                    dynamic pricing (Tatkal), and quota. Check IRCTC for exact fares.
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