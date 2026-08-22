"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["TAX & GOVERNMENT CHARGES"],
};

function calculate54EC(capitalGain, investedAmount, interestRate) {
    const maxExemption = 5000000; // ₹50 lakh cap
    const eligibleInvestment = Math.min(investedAmount, maxExemption);
    const taxExemptGain = Math.min(eligibleInvestment, capitalGain);
    const taxableGainAfter = Math.max(capitalGain - taxExemptGain, 0);
    const taxSaved = taxExemptGain * 0.125; // LTCG rate 12.5%
    const annualInterest = (eligibleInvestment * interestRate) / 100;
    const totalInterestOver5yr = annualInterest * 5;

    return { eligibleInvestment, taxExemptGain, taxableGainAfter, taxSaved, annualInterest, totalInterestOver5yr };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    capitalGain: { min: 100000, max: 10000000, step: 50000 },
    investedAmount: { min: 100000, max: 5000000, step: 50000 },
    interestRate: { min: 3, max: 8, step: 0.1 },
};

export default function Page() {
    const [capitalGain, setCapitalGain] = useState(2000000);
    const [investedAmount, setInvestedAmount] = useState(2000000);
    const [interestRate, setInterestRate] = useState(5.25);

    const { eligibleInvestment, taxExemptGain, taxableGainAfter, taxSaved, annualInterest, totalInterestOver5yr } = useMemo(() => {
        const cg = Number(capitalGain) || 0;
        const inv = Number(investedAmount) || 0;
        const r = Number(interestRate) || 0;
        return calculate54EC(cg, inv, r);
    }, [capitalGain, investedAmount, interestRate]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Bonds</p>
                <h1 style={{ textAlign: "center" }}>54EC Bonds (Capital Gains Tax Exemption) Calculator</h1>

                <FieldWithSlider label="Long-Term Capital Gain" prefix="₹" value={capitalGain} onChange={setCapitalGain} limits={LIMITS.capitalGain} />
                <FieldWithSlider label="Amount to Invest in 54EC Bonds" prefix="₹" value={investedAmount} onChange={setInvestedAmount} limits={LIMITS.investedAmount} />
                <FieldWithSlider label="Bond Interest Rate" suffix="%" value={interestRate} onChange={setInterestRate} limits={LIMITS.interestRate} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Eligible Investment (max ₹50L): ₹{formatCurrency(eligibleInvestment)}</div>
                        <div className="ig-item ig-result">Capital Gain Exempted: ₹{formatCurrency(taxExemptGain)}</div>
                        <div className="ig-item ig-result">Remaining Taxable Gain: ₹{formatCurrency(taxableGainAfter)}</div>
                        <div className="ig-item ig-result ig-result-total">Estimated Tax Saved: ₹{formatCurrency(taxSaved)}</div>
                        <div className="ig-item ig-result">Annual Bond Interest: ₹{formatCurrency(annualInterest)}</div>
                        <div className="ig-item ig-result">Total Interest over 5 Years: ₹{formatCurrency(totalInterestOver5yr)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    54EC bonds (REC/PFC/NHAI/IRFC) exempt LTCG from property sale up to ₹50 lakh, with a
                    5-year lock-in. Must invest within 6 months of the sale. Bond interest is taxable
                    as income. Tax saved assumes 12.5% LTCG rate — confirm applicable rate for your case.
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