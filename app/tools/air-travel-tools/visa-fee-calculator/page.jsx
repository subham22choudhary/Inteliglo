"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["TRAVEL"],
};

// Approximate visa fees for Indian passport holders (in INR) — reference only, changes frequently
const COUNTRY_VISA_FEES = {
    usa: { label: "USA (B1/B2 Tourist)", fee: 14500, processingDays: "60-90" },
    uk: { label: "United Kingdom (Standard Visitor)", fee: 10500, processingDays: "15-20" },
    schengen: { label: "Schengen (Short Stay)", fee: 7500, processingDays: "15" },
    uae: { label: "UAE (30-day Tourist)", fee: 7500, processingDays: "3-5" },
    thailand: { label: "Thailand (Tourist)", fee: 2000, processingDays: "3-5" },
    singapore: { label: "Singapore (Tourist)", fee: 2500, processingDays: "3-5" },
    australia: { label: "Australia (Visitor 600)", fee: 10000, processingDays: "20-30" },
    japan: { label: "Japan (Tourist)", fee: 0, processingDays: "5-7", note: "Fee waived for tourism" },
};

function calculateVisaFee(countryKey, numberOfApplicants) {
    const country = COUNTRY_VISA_FEES[countryKey];
    const totalFee = country.fee * numberOfApplicants;

    return { feePerPerson: country.fee, totalFee, processingDays: country.processingDays, note: country.note };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    numberOfApplicants: { min: 1, max: 10, step: 1 },
};

export default function Page() {
    const [countryKey, setCountryKey] = useState("schengen");
    const [numberOfApplicants, setNumberOfApplicants] = useState(1);

    const { feePerPerson, totalFee, processingDays, note } = useMemo(() => {
        const n = Number(numberOfApplicants) || 1;
        return calculateVisaFee(countryKey, n);
    }, [countryKey, numberOfApplicants]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Travel</p>
                <h1 style={{ textAlign: "center" }}>Visa Fee Calculator (for Indian Passport Holders)</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Destination</p>
                    <select className="ig-input" style={{ width: "100%", padding: "10px 12px" }} value={countryKey} onChange={(e) => setCountryKey(e.target.value)}>
                        {Object.entries(COUNTRY_VISA_FEES).map(([key, c]) => (
                            <option key={key} value={key}>{c.label}</option>
                        ))}
                    </select>
                </div>

                <FieldWithSlider label="Number of Applicants" value={numberOfApplicants} onChange={setNumberOfApplicants} limits={LIMITS.numberOfApplicants} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Visa Fee per Applicant: ₹{formatCurrency(feePerPerson)}</div>
                        <div className="ig-item ig-result ig-result-total">Total Visa Fee: ₹{formatCurrency(totalFee)}</div>
                        <div className="ig-item ig-result">Typical Processing Time: {processingDays} days</div>
                        {note && <div className="ig-item ig-result">{note}</div>}
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Approximate government visa fees only — doesn't include service/agent fees, VFS
                    charges, insurance, or biometric fees. Rates and processing times change frequently
                    and vary by visa category. Confirm exact fees on the official embassy/consulate website before applying.
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