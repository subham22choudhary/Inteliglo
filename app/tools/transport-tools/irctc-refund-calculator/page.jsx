"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["TRANSPORT"],
};

const CLASS_FLAT_CHARGES = {
    sleeper: { label: "Sleeper (SL)", flat: 120 },
    ac3: { label: "AC 3-Tier (3A)", flat: 200 },
    ac2: { label: "AC 2-Tier (2A)", flat: 200 },
    ac1: { label: "AC First Class (1A)", flat: 240 },
    cc: { label: "AC Chair Car (CC)", flat: 120 },
    second: { label: "Second Sitting (2S)", flat: 60 },
};

function calculateRefund(fareAmount, classKey, hoursBeforeDeparture, ticketStatus) {
    const flatCharge = CLASS_FLAT_CHARGES[classKey].flat;

    let cancellationCharge;
    let note;

    if (ticketStatus === "waitlisted") {
        cancellationCharge = 0;
        note = "Fully refunded automatically (waitlisted tickets don't get confirmed)";
    } else if (hoursBeforeDeparture >= 48) {
        cancellationCharge = flatCharge;
        note = "Flat cancellation charge (more than 48 hrs before departure)";
    } else if (hoursBeforeDeparture >= 12) {
        cancellationCharge = Math.max(fareAmount * 0.25, flatCharge);
        note = "25% of fare (12–48 hrs before departure)";
    } else if (hoursBeforeDeparture >= 4) {
        cancellationCharge = Math.max(fareAmount * 0.5, flatCharge);
        note = "50% of fare (4–12 hrs before departure)";
    } else {
        cancellationCharge = fareAmount;
        note = "No refund (less than 4 hrs before departure)";
    }

    const refundAmount = Math.max(fareAmount - cancellationCharge, 0);
    return { cancellationCharge, refundAmount, note };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    fareAmount: { min: 100, max: 10000, step: 50 },
    hoursBeforeDeparture: { min: 0, max: 168, step: 1 },
};

export default function Page() {
    const [fareAmount, setFareAmount] = useState(1500);
    const [classKey, setClassKey] = useState("ac3");
    const [hoursBeforeDeparture, setHoursBeforeDeparture] = useState(30);
    const [ticketStatus, setTicketStatus] = useState("confirmed");

    const { cancellationCharge, refundAmount, note } = useMemo(() => {
        const f = Number(fareAmount) || 0;
        const h = Number(hoursBeforeDeparture) || 0;
        return calculateRefund(f, classKey, h, ticketStatus);
    }, [fareAmount, classKey, hoursBeforeDeparture, ticketStatus]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Transport</p>
                <h1 style={{ textAlign: "center" }}>IRCTC Refund / Cancellation Calculator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Ticket Status</p>
                    <div className="ig-list" style={{ display: "flex", gap: 8, gridTemplateColumns: "unset" }}>
                        <button className={`ig-item ig-metal-btn${ticketStatus === "confirmed" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setTicketStatus("confirmed")}>Confirmed</button>
                        <button className={`ig-item ig-metal-btn${ticketStatus === "waitlisted" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setTicketStatus("waitlisted")}>Waitlisted</button>
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Class</p>
                    <select className="ig-input" style={{ width: "100%", padding: "10px 12px" }} value={classKey} onChange={(e) => setClassKey(e.target.value)}>
                        {Object.entries(CLASS_FLAT_CHARGES).map(([key, c]) => (
                            <option key={key} value={key}>{c.label}</option>
                        ))}
                    </select>
                </div>

                <FieldWithSlider label="Ticket Fare" prefix="₹" value={fareAmount} onChange={setFareAmount} limits={LIMITS.fareAmount} />
                <FieldWithSlider label="Hours Before Departure You're Cancelling" suffix="hrs" value={hoursBeforeDeparture} onChange={setHoursBeforeDeparture} limits={LIMITS.hoursBeforeDeparture} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">{note}</div>
                        <div className="ig-item ig-result">Cancellation Charge: ₹{formatCurrency(cancellationCharge)}</div>
                        <div className="ig-item ig-result ig-result-total">Refund Amount: ₹{formatCurrency(refundAmount)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Based on standard IRCTC cancellation rules for confirmed tickets. Tatkal tickets
                    have different (stricter) rules — typically no refund for confirmed Tatkal tickets
                    except in specific cases like train cancellation. Confirm exact rules on IRCTC.
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