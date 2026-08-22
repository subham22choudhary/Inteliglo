"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["REAL ESTATE"],
};

// Approximate state-wise stamp duty rates (%) — varies by state, gender, and property type
const STATE_RATES = {
    maharashtra: { label: "Maharashtra", stampDuty: 6, registration: 1 },
    delhi: { label: "Delhi", stampDuty: 6, registration: 1 },
    karnataka: { label: "Karnataka", stampDuty: 5, registration: 1 },
    tamilnadu: { label: "Tamil Nadu", stampDuty: 7, registration: 1 },
    uttarpradesh: { label: "Uttar Pradesh", stampDuty: 7, registration: 1 },
    westbengal: { label: "West Bengal", stampDuty: 6, registration: 1 },
    gujarat: { label: "Gujarat", stampDuty: 4.9, registration: 1 },
    telangana: { label: "Telangana", stampDuty: 4, registration: 0.5 },
};

function calculateStampDuty(propertyValue, stateKey, isFemaleOwner) {
    const state = STATE_RATES[stateKey];
    const stampDutyPercent = isFemaleOwner ? Math.max(state.stampDuty - 1, 0) : state.stampDuty;
    const stampDutyAmount = (propertyValue * stampDutyPercent) / 100;
    const registrationAmount = (propertyValue * state.registration) / 100;
    const totalCharges = stampDutyAmount + registrationAmount;

    return { stampDutyPercent, stampDutyAmount, registrationAmount, totalCharges };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    propertyValue: { min: 100000, max: 100000000, step: 100000 },
};

export default function Page() {
    const [propertyValue, setPropertyValue] = useState(5000000);
    const [stateKey, setStateKey] = useState("maharashtra");
    const [isFemaleOwner, setIsFemaleOwner] = useState(false);

    const { stampDutyPercent, stampDutyAmount, registrationAmount, totalCharges } = useMemo(() => {
        const v = Number(propertyValue) || 0;
        return calculateStampDuty(v, stateKey, isFemaleOwner);
    }, [propertyValue, stateKey, isFemaleOwner]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Real Estate</p>
                <h1 style={{ textAlign: "center" }}>Stamp Duty & Registration Charges Calculator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">State</p>
                    <select className="ig-input" style={{ width: "100%", padding: "10px 12px" }} value={stateKey} onChange={(e) => setStateKey(e.target.value)}>
                        {Object.entries(STATE_RATES).map(([key, s]) => (
                            <option key={key} value={key}>{s.label}</option>
                        ))}
                    </select>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Owner Gender</p>
                    <div className="ig-list" style={{ display: "flex", gap: 8, gridTemplateColumns: "unset" }}>
                        <button className={`ig-item ig-metal-btn${!isFemaleOwner ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setIsFemaleOwner(false)}>Male / Joint</button>
                        <button className={`ig-item ig-metal-btn${isFemaleOwner ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setIsFemaleOwner(true)}>Female Sole Owner</button>
                    </div>
                </div>

                <FieldWithSlider label="Property Value" prefix="₹" value={propertyValue} onChange={setPropertyValue} limits={LIMITS.propertyValue} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Stamp Duty Rate: {stampDutyPercent}%</div>
                        <div className="ig-item ig-result">Stamp Duty Amount: ₹{formatCurrency(stampDutyAmount)}</div>
                        <div className="ig-item ig-result">Registration Charges: ₹{formatCurrency(registrationAmount)}</div>
                        <div className="ig-item ig-result ig-result-total">Total Charges: ₹{formatCurrency(totalCharges)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Rates are approximate and vary by state, municipal corporation, property type
                    (residential/commercial), and gender-based rebates. Rates change frequently — confirm
                    current rates with your state's registration department before transacting.
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