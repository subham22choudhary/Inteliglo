"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateEducationLoan(principal, annualRate, months, moratoriumMonths, interestDuringMoratorium) {
    const monthlyRate = annualRate / 12 / 100;

    // During moratorium (course + grace period), simple interest accrues.
    // If "interestDuringMoratorium" is true, that accrued interest is added to principal (capitalized)
    // before regular EMI repayment begins — reflecting how most education loans work.
    let effectivePrincipal = principal;
    let moratoriumInterest = 0;

    if (moratoriumMonths > 0) {
        moratoriumInterest = principal * monthlyRate * moratoriumMonths;
        if (interestDuringMoratorium) {
            effectivePrincipal = principal; // interest paid separately, principal unchanged
        } else {
            effectivePrincipal = principal + moratoriumInterest; // capitalized into principal
        }
    }

    const emi =
        monthlyRate === 0
            ? effectivePrincipal / months
            : (effectivePrincipal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);

    const totalRepayment = emi * months + (interestDuringMoratorium ? moratoriumInterest : 0);
    const totalInterest = totalRepayment - principal;

    return { emi, totalRepayment, totalInterest, moratoriumInterest, effectivePrincipal };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    principal: { min: 50000, max: 6000000, step: 25000 },
    rate: { min: 7, max: 16, step: 0.1 },
    tenureYears: { min: 1, max: 15, step: 0.5 },
    moratoriumYears: { min: 0, max: 6, step: 0.5 },
};

export default function Page() {
    const [principal, setPrincipal] = useState(1000000);
    const [rate, setRate] = useState(10);
    const [tenureYears, setTenureYears] = useState(8);
    const [moratoriumYears, setMoratoriumYears] = useState(4); // course duration + 1 year grace, typical
    const [interestDuringMoratorium, setInterestDuringMoratorium] = useState(false);

    const months = Math.max(1, Math.round(Number(tenureYears) * 12) || 1);
    const moratoriumMonths = Math.max(0, Math.round(Number(moratoriumYears) * 12) || 0);

    const { emi, totalRepayment, totalInterest, moratoriumInterest } = useMemo(() => {
        const p = Number(principal) || 0;
        const r = Number(rate) || 0;
        return calculateEducationLoan(p, r, months, moratoriumMonths, interestDuringMoratorium);
    }, [principal, rate, months, moratoriumMonths, interestDuringMoratorium]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>Education Loan Calculator</h1>

                <FieldWithSlider label="Loan Amount" prefix="₹" value={principal} onChange={setPrincipal} limits={LIMITS.principal} />
                <FieldWithSlider label="Interest Rate" suffix="% p.a." value={rate} onChange={setRate} limits={LIMITS.rate} />
                <FieldWithSlider label="Repayment Tenure" suffix="years" value={tenureYears} onChange={setTenureYears} limits={LIMITS.tenureYears} />
                <FieldWithSlider label="Moratorium Period (course + grace)" suffix="years" value={moratoriumYears} onChange={setMoratoriumYears} limits={LIMITS.moratoriumYears} />

                <div className="ig-category">
                    <p className="ig-category-label">During Moratorium</p>
                    <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {[
                            { key: false, label: "Interest Capitalized (added to loan)" },
                            { key: true, label: "Interest Paid During Study" },
                        ].map((opt) => (
                            <button
                                key={String(opt.key)}
                                className="ig-item"
                                style={interestDuringMoratorium === opt.key ? {} : { background: "transparent", color: "#f5f5f0", border: "1px solid #333" }}
                                onClick={() => setInterestDuringMoratorium(opt.key)}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        {moratoriumMonths > 0 && (
                            <div className="ig-item" style={{ cursor: "default" }}>
                                Interest Accrued During Moratorium: ₹{formatCurrency(moratoriumInterest)}
                            </div>
                        )}
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Monthly EMI (after moratorium): ₹{formatCurrency(emi)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Total Interest Payable: ₹{formatCurrency(totalInterest)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Total Repayment: ₹{formatCurrency(totalRepayment)}
                        </div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Moratorium = course duration + typical grace period before EMI starts. Many lenders
                    capitalize (add to principal) any interest accrued during this period unless you choose
                    to pay it as simple interest during your studies. Actual terms vary by lender —
                    confirm with your bank/NBFC.
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