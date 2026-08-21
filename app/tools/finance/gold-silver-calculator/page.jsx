"use client";

import { useState, useMemo } from "react";

function calculateMetalPrice(pricePerGram, grams, gstPercent, makingChargePercent) {
    const metalValue = pricePerGram * grams;
    const makingCharge = (metalValue * makingChargePercent) / 100;
    const subtotal = metalValue + makingCharge;
    const gstAmount = (subtotal * gstPercent) / 100;
    const totalPayable = subtotal + gstAmount;

    return { metalValue, makingCharge, subtotal, gstAmount, totalPayable };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    pricePerGram: { min: 50, max: 500000, step: 10 },
    grams: { min: 0.5, max: 100000, step: 0.5 },
    gst: { min: 0, max: 18, step: 0.5 },
    makingCharge: { min: 0, max: 30, step: 0.5 },
};

export default function Page() {
    const [metal, setMetal] = useState("gold");
    const [pricePerGram, setPricePerGram] = useState(13000);
    const [grams, setGrams] = useState(10);
    const [gstPercent, setGstPercent] = useState(3);
    const [makingChargePercent, setMakingChargePercent] = useState(10);

    const { metalValue, makingCharge, subtotal, gstAmount, totalPayable } = useMemo(() => {
        const p = Number(pricePerGram) || 0;
        const g = Number(grams) || 0;
        const gst = Number(gstPercent) || 0;
        const making = Number(makingChargePercent) || 0;
        return calculateMetalPrice(p, g, gst, making);
    }, [pricePerGram, grams, gstPercent, makingChargePercent]);

    const handleMetalSwitch = (type) => {
        setMetal(type);
        setPricePerGram(type === "gold" ? 13000 : 150);
    };

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>Gold / Silver Price Calculator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Metal</p>
                    <div className="ig-list" style={{ display: "flex", gap: 8, gridTemplateColumns: "unset" }}>
                        <button
                            className={`ig-item ig-metal-btn${metal === "gold" ? " ig-metal-btn-active" : ""}`}
                            style={{ flex: 1 }}
                            onClick={() => handleMetalSwitch("gold")}
                        >
                            Gold
                        </button>
                        <button
                            className={`ig-item ig-metal-btn${metal === "silver" ? " ig-metal-btn-active" : ""}`}
                            style={{ flex: 1 }}
                            onClick={() => handleMetalSwitch("silver")}
                        >
                            Silver
                        </button>
                    </div>
                </div>

                <FieldWithSlider label="Price per Gram" prefix="₹" value={pricePerGram} onChange={setPricePerGram} limits={LIMITS.pricePerGram} />
                <FieldWithSlider label="Total Grams Required" suffix="g" value={grams} onChange={setGrams} limits={LIMITS.grams} />
                <FieldWithSlider label="GST" suffix="%" value={gstPercent} onChange={setGstPercent} limits={LIMITS.gst} />
                <FieldWithSlider label="Making Charge" suffix="% of metal value" value={makingChargePercent} onChange={setMakingChargePercent} limits={LIMITS.makingCharge} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Metal Value: ₹{formatCurrency(metalValue)}</div>
                        <div className="ig-item ig-result">Making Charge: ₹{formatCurrency(makingCharge)}</div>
                        <div className="ig-item ig-result">Subtotal: ₹{formatCurrency(subtotal)}</div>
                        <div className="ig-item ig-result">GST Amount: ₹{formatCurrency(gstAmount)}</div>
                        <div className="ig-item ig-result ig-result-total">Total Payable: ₹{formatCurrency(totalPayable)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Estimates only. Actual jewellery pricing may include additional charges such as
                    hallmarking fees, wastage charges, or stone/gem value not accounted for here.
                    Rates fluctuate daily — confirm current rates before purchase.
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