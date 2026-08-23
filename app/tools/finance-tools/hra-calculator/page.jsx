"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateHRA(basicSalary, hraReceived, rentPaid, isMetro) {
    const annualBasic = basicSalary * 12;
    const annualHRA = hraReceived * 12;
    const annualRent = rentPaid * 12;

    const actualHRA = annualHRA;
    const rentMinus10PercentBasic = Math.max(annualRent - 0.1 * annualBasic, 0);
    const metroLimit = isMetro ? 0.5 * annualBasic : 0.4 * annualBasic;

    const exemptedHRA = Math.min(actualHRA, rentMinus10PercentBasic, metroLimit);
    const taxableHRA = actualHRA - exemptedHRA;

    return { actualHRA, rentMinus10PercentBasic, metroLimit, exemptedHRA, taxableHRA };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    basicSalary: { min: 5000, max: 500000, step: 1000 },
    hraReceived: { min: 0, max: 250000, step: 500 },
    rentPaid: { min: 0, max: 200000, step: 500 },
};

export default function Page() {
    const [basicSalary, setBasicSalary] = useState(40000);
    const [hraReceived, setHraReceived] = useState(16000);
    const [rentPaid, setRentPaid] = useState(18000);
    const [isMetro, setIsMetro] = useState(true);

    const { actualHRA, rentMinus10PercentBasic, metroLimit, exemptedHRA, taxableHRA } = useMemo(() => {
        const b = Number(basicSalary) || 0;
        const h = Number(hraReceived) || 0;
        const r = Number(rentPaid) || 0;
        return calculateHRA(b, h, r, isMetro);
    }, [basicSalary, hraReceived, rentPaid, isMetro]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>HRA (House Rent Allowance) Calculator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">City Type</p>
                    <div className="ig-list" style={{ display: "flex", gap: 8, gridTemplateColumns: "unset" }}>
                        <button className={`ig-item ig-metal-btn${isMetro ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setIsMetro(true)}>Metro (Delhi, Mumbai, Kolkata, Chennai)</button>
                        <button className={`ig-item ig-metal-btn${!isMetro ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setIsMetro(false)}>Non-Metro</button>
                    </div>
                </div>

                <FieldWithSlider label="Basic Salary (Monthly)" prefix="₹" value={basicSalary} onChange={setBasicSalary} limits={LIMITS.basicSalary} />
                <FieldWithSlider label="HRA Received (Monthly)" prefix="₹" value={hraReceived} onChange={setHraReceived} limits={LIMITS.hraReceived} />
                <FieldWithSlider label="Rent Paid (Monthly)" prefix="₹" value={rentPaid} onChange={setRentPaid} limits={LIMITS.rentPaid} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Actual HRA Received (Annual): ₹{formatCurrency(actualHRA)}</div>
                        <div className="ig-item ig-result">Rent Paid − 10% of Basic: ₹{formatCurrency(rentMinus10PercentBasic)}</div>
                        <div className="ig-item ig-result">{isMetro ? "50%" : "40%"} of Basic Salary: ₹{formatCurrency(metroLimit)}</div>
                        <div className="ig-item ig-result ig-result-total">Exempted HRA (min of above): ₹{formatCurrency(exemptedHRA)}</div>
                        <div className="ig-item ig-result">Taxable HRA: ₹{formatCurrency(taxableHRA)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    HRA exemption is available only under the old tax regime — the new regime doesn't
                    allow this deduction. Exemption is the minimum of: actual HRA received, rent paid
                    minus 10% of basic, or 50%/40% of basic (metro/non-metro).
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