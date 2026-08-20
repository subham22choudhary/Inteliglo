"use client";

import { useState, useMemo } from "react";

/**
 * Reverse EMI formula: given P, r, and EMI, solve for number of months n.
 * n = -log(1 - (P × r) / EMI) / log(1 + r)
 */
function calculateTenure(principal, annualRate, desiredEMI) {
    const monthlyRate = annualRate / 12 / 100;

    if (monthlyRate === 0) {
        if (desiredEMI <= 0) return { months: null, error: "EMI must be greater than zero." };
        const months = Math.ceil(principal / desiredEMI);
        return { months, error: null };
    }

    const minEMI = principal * monthlyRate; // interest-only payment; below this, loan never gets paid off
    if (desiredEMI <= minEMI) {
        return {
            months: null,
            error: `EMI must be greater than ₹${Math.ceil(minEMI).toLocaleString("en-IN")} (the interest-only amount) for the loan to ever be repaid.`,
        };
    }

    const months = Math.ceil(
        -Math.log(1 - (principal * monthlyRate) / desiredEMI) / Math.log(1 + monthlyRate)
    );

    return { months, error: null };
}

function calculateTotals(principal, annualRate, months, emi) {
    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;
    return { totalPayment, totalInterest };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    principal: { min: 10000, max: 10000000, step: 10000 },
    rate: { min: 1, max: 25, step: 0.1 },
    desiredEMI: { min: 500, max: 200000, step: 500 },
};

export default function Page() {
    const [principal, setPrincipal] = useState(500000);
    const [rate, setRate] = useState(10);
    const [desiredEMI, setDesiredEMI] = useState(12000);

    const { result, totals } = useMemo(() => {
        const p = Number(principal) || 0;
        const r = Number(rate) || 0;
        const emi = Number(desiredEMI) || 0;
        const res = calculateTenure(p, r, emi);
        const tot = res.months ? calculateTotals(p, r, res.months, emi) : null;
        return { result: res, totals: tot };
    }, [principal, rate, desiredEMI]);

    const years = result.months ? Math.floor(result.months / 12) : 0;
    const remMonths = result.months ? result.months % 12 : 0;

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>Loan Tenure Calculator</h1>

                <FieldWithSlider label="Loan Amount" prefix="₹" value={principal} onChange={setPrincipal} limits={LIMITS.principal} />
                <FieldWithSlider label="Interest Rate" suffix="% p.a." value={rate} onChange={setRate} limits={LIMITS.rate} />
                <FieldWithSlider label="Desired Monthly EMI" prefix="₹" value={desiredEMI} onChange={setDesiredEMI} limits={LIMITS.desiredEMI} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        {result.error ? (
                            <div className="ig-item" style={{ cursor: "default", background: "transparent", color: "#e05a4e", border: "1px solid #e05a4e" }}>
                                {result.error}
                            </div>
                        ) : (
                            <>
                                <div className="ig-item" style={{ cursor: "default" }}>
                                    Required Tenure: {result.months} months ({years} yr{years === 1 ? "" : "s"}
                                    {remMonths > 0 ? ` ${remMonths} mo` : ""})
                                </div>
                                <div className="ig-item" style={{ cursor: "default" }}>
                                    Total Interest: ₹{formatCurrency(totals.totalInterest)}
                                </div>
                                <div className="ig-item" style={{ cursor: "default" }}>
                                    Total Payment: ₹{formatCurrency(totals.totalPayment)}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Calculates how long it will take to repay a loan at a fixed EMI, instead of the usual
                    direction (tenure → EMI). Useful for figuring out "if I can only pay ₹X/month, how long
                    will this loan take?"
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