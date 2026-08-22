"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["TAX"],
};

const TDS_RATES = {
    salary: { label: "Salary", rate: null, threshold: 0, note: "As per applicable income slab" },
    interest: { label: "Interest on FD/RD (Bank)", rate: 10, threshold: 40000 },
    interestSenior: { label: "Interest on FD/RD (Senior Citizen)", rate: 10, threshold: 50000 },
    rent: { label: "Rent (Individual, >₹50k/month)", rate: 5, threshold: 600000 },
    professionalFees: { label: "Professional/Technical Fees", rate: 10, threshold: 30000 },
    commission: { label: "Commission/Brokerage", rate: 5, threshold: 15000 },
    contractPayment: { label: "Contractor Payment", rate: 1, threshold: 30000 },
};

function calculateTDS(paymentType, amount) {
    const config = TDS_RATES[paymentType];
    if (config.rate === null) return { applicable: false, tdsAmount: 0, netPayment: amount };

    const applicable = amount > config.threshold;
    const tdsAmount = applicable ? (amount * config.rate) / 100 : 0;
    const netPayment = amount - tdsAmount;

    return { applicable, tdsAmount, netPayment, rate: config.rate, threshold: config.threshold };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    amount: { min: 1000, max: 5000000, step: 1000 },
};

export default function Page() {
    const [paymentType, setPaymentType] = useState("interest");
    const [amount, setAmount] = useState(60000);

    const result = useMemo(() => {
        const a = Number(amount) || 0;
        return calculateTDS(paymentType, a);
    }, [paymentType, amount]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Tax</p>
                <h1 style={{ textAlign: "center" }}>TDS Calculator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Payment Type</p>
                    <select
                        className="ig-input"
                        style={{ width: "100%", padding: "10px 12px" }}
                        value={paymentType}
                        onChange={(e) => setPaymentType(e.target.value)}
                    >
                        {Object.entries(TDS_RATES).map(([key, cfg]) => (
                            <option key={key} value={key}>{cfg.label}</option>
                        ))}
                    </select>
                </div>

                <FieldWithSlider label="Payment / Income Amount" prefix="₹" value={amount} onChange={setAmount} limits={LIMITS.amount} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        {result.rate !== undefined ? (
                            <>
                                <div className="ig-item ig-result">TDS Threshold: ₹{formatCurrency(result.threshold)}</div>
                                <div className="ig-item ig-result">TDS Applicable: {result.applicable ? `Yes (${result.rate}%)` : "No (below threshold)"}</div>
                                <div className="ig-item ig-result">TDS Amount: ₹{formatCurrency(result.tdsAmount)}</div>
                                <div className="ig-item ig-result ig-result-total">Net Payment After TDS: ₹{formatCurrency(result.netPayment)}</div>
                            </>
                        ) : (
                            <div className="ig-item ig-result">Salary TDS depends on your total income tax slab — use the Income Tax Calculator for an accurate estimate.</div>
                        )}
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Rates shown are standard TDS rates under the Income Tax Act as commonly applicable
                    (subject to change via annual Finance Act). PAN must be furnished, else TDS may
                    apply at a higher rate (typically 20%). Consult a tax professional for specific cases.
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