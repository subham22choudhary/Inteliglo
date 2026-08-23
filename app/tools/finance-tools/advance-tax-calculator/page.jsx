"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

const INSTALLMENTS = [
    { label: "By 15 June", cumulativePercent: 15, dueDate: "15 June" },
    { label: "By 15 September", cumulativePercent: 45, dueDate: "15 September" },
    { label: "By 15 December", cumulativePercent: 75, dueDate: "15 December" },
    { label: "By 15 March", cumulativePercent: 100, dueDate: "15 March" },
];

function calculateAdvanceTax(estimatedTaxLiability, tdsAlreadyDeducted) {
    const netTaxPayable = Math.max(estimatedTaxLiability - tdsAlreadyDeducted, 0);
    const isApplicable = netTaxPayable > 10000;

    let previousCumulative = 0;
    const schedule = INSTALLMENTS.map((inst) => {
        const cumulativeAmount = (netTaxPayable * inst.cumulativePercent) / 100;
        const installmentAmount = cumulativeAmount - previousCumulative;
        previousCumulative = cumulativeAmount;
        return { ...inst, installmentAmount, cumulativeAmount };
    });

    return { netTaxPayable, isApplicable, schedule };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    taxLiability: { min: 0, max: 5000000, step: 1000 },
    tdsDeducted: { min: 0, max: 5000000, step: 1000 },
};

export default function Page() {
    const [estimatedTaxLiability, setEstimatedTaxLiability] = useState(150000);
    const [tdsAlreadyDeducted, setTdsAlreadyDeducted] = useState(20000);

    const { netTaxPayable, isApplicable, schedule } = useMemo(() => {
        const t = Number(estimatedTaxLiability) || 0;
        const d = Number(tdsAlreadyDeducted) || 0;
        return calculateAdvanceTax(t, d);
    }, [estimatedTaxLiability, tdsAlreadyDeducted]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>Advance Tax Calculator</h1>

                <FieldWithSlider label="Estimated Total Tax Liability" prefix="₹" value={estimatedTaxLiability} onChange={setEstimatedTaxLiability} limits={LIMITS.taxLiability} />
                <FieldWithSlider label="TDS Already Deducted" prefix="₹" value={tdsAlreadyDeducted} onChange={setTdsAlreadyDeducted} limits={LIMITS.tdsDeducted} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result ig-result-total">Net Advance Tax Payable: ₹{formatCurrency(netTaxPayable)}</div>
                        <div className="ig-item ig-result">{isApplicable ? "Advance tax applicable (liability > ₹10,000)" : "Not applicable (liability ≤ ₹10,000)"}</div>
                    </div>
                </div>

                {isApplicable && (
                    <div className="ig-category">
                        <p className="ig-category-label">Payment Schedule</p>
                        <div className="ig-list">
                            {schedule.map((inst) => (
                                <div className="ig-item ig-result" key={inst.dueDate}>
                                    {inst.label} ({inst.cumulativePercent}% cumulative): ₹{formatCurrency(inst.installmentAmount)}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <p style={disclaimerStyle}>
                    Advance tax applies when net tax payable exceeds ₹10,000 in a financial year.
                    Schedule follows standard 15%/45%/75%/100% cumulative due dates. Missing installments
                    attracts interest under Sections 234B/234C. For presumptive taxation (44AD/44ADA), the full amount is due by 15 March.
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