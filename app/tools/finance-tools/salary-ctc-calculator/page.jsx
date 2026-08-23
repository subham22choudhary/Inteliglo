"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateSalary(ctc, basicPercent, hraPercent, employerPFPercent, otherDeductionsMonthly) {
    const annualCTC = ctc;
    const basic = (annualCTC * basicPercent) / 100;
    const hra = (basic * hraPercent) / 100;
    const employerPF = (basic * employerPFPercent) / 100;
    const employeePF = employerPF; // typically equal
    const grossSalary = annualCTC - employerPF;
    const specialAllowance = grossSalary - basic - hra;
    const annualDeductions = otherDeductionsMonthly * 12;
    const takeHomeAnnual = grossSalary - employeePF - annualDeductions;
    const takeHomeMonthly = takeHomeAnnual / 12;

    return { basic, hra, employerPF, employeePF, specialAllowance, grossSalary, takeHomeAnnual, takeHomeMonthly };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    ctc: { min: 200000, max: 10000000, step: 10000 },
    basicPercent: { min: 30, max: 60, step: 1 },
    hraPercent: { min: 0, max: 50, step: 1 },
    pfPercent: { min: 0, max: 12, step: 0.5 },
    otherDeductions: { min: 0, max: 50000, step: 500 },
};

export default function Page() {
    const [ctc, setCtc] = useState(1200000);
    const [basicPercent, setBasicPercent] = useState(40);
    const [hraPercent, setHraPercent] = useState(50);
    const [employerPFPercent, setEmployerPFPercent] = useState(12);
    const [otherDeductionsMonthly, setOtherDeductionsMonthly] = useState(2000);

    const { basic, hra, employerPF, employeePF, specialAllowance, grossSalary, takeHomeAnnual, takeHomeMonthly } = useMemo(() => {
        const c = Number(ctc) || 0;
        const bp = Number(basicPercent) || 0;
        const hp = Number(hraPercent) || 0;
        const pf = Number(employerPFPercent) || 0;
        const od = Number(otherDeductionsMonthly) || 0;
        return calculateSalary(c, bp, hp, pf, od);
    }, [ctc, basicPercent, hraPercent, employerPFPercent, otherDeductionsMonthly]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>Salary / CTC Calculator (In-Hand Breakup)</h1>

                <FieldWithSlider label="Annual CTC" prefix="₹" value={ctc} onChange={setCtc} limits={LIMITS.ctc} />
                <FieldWithSlider label="Basic Salary" suffix="% of CTC" value={basicPercent} onChange={setBasicPercent} limits={LIMITS.basicPercent} />
                <FieldWithSlider label="HRA" suffix="% of Basic" value={hraPercent} onChange={setHraPercent} limits={LIMITS.hraPercent} />
                <FieldWithSlider label="Employer PF Contribution" suffix="% of Basic" value={employerPFPercent} onChange={setEmployerPFPercent} limits={LIMITS.pfPercent} />
                <FieldWithSlider label="Other Monthly Deductions (Tax, Insurance, etc.)" prefix="₹" value={otherDeductionsMonthly} onChange={setOtherDeductionsMonthly} limits={LIMITS.otherDeductions} />

                <div className="ig-category">
                    <p className="ig-category-label">Annual Breakup</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Basic Salary: ₹{formatCurrency(basic)}</div>
                        <div className="ig-item ig-result">HRA: ₹{formatCurrency(hra)}</div>
                        <div className="ig-item ig-result">Special Allowance: ₹{formatCurrency(specialAllowance)}</div>
                        <div className="ig-item ig-result">Employer PF: ₹{formatCurrency(employerPF)}</div>
                        <div className="ig-item ig-result">Employee PF Deduction: ₹{formatCurrency(employeePF)}</div>
                        <div className="ig-item ig-result">Gross Salary: ₹{formatCurrency(grossSalary)}</div>
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Take-Home</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Annual Take-Home: ₹{formatCurrency(takeHomeAnnual)}</div>
                        <div className="ig-item ig-result ig-result-total">Monthly Take-Home: ₹{formatCurrency(takeHomeMonthly)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Simplified estimate — actual salary structure varies by company (bonus, LTA,
                    conveyance, medical allowance, etc.). Income tax not deducted here; use an income
                    tax calculator separately for exact TDS.
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