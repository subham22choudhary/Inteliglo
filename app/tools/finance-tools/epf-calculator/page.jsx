"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateEPF(basicSalary, employeeContributionPercent, employerContributionPercent, currentAge, retirementAge, annualIncrement, interestRate) {
    const monthlyRate = interestRate / 12 / 100;
    let balance = 0;
    let totalEmployeeContribution = 0;
    let totalEmployerContribution = 0;
    let salary = basicSalary;

    const years = retirementAge - currentAge;

    for (let y = 0; y < years; y++) {
        for (let m = 0; m < 12; m++) {
            const empContribution = (salary * employeeContributionPercent) / 100;
            const erContribution = (salary * employerContributionPercent) / 100;
            balance += empContribution + erContribution;
            balance += balance * monthlyRate;
            totalEmployeeContribution += empContribution;
            totalEmployerContribution += erContribution;
        }
        salary += (salary * annualIncrement) / 100;
    }

    const totalContribution = totalEmployeeContribution + totalEmployerContribution;
    const interestEarned = balance - totalContribution;

    return { totalEmployeeContribution, totalEmployerContribution, totalContribution, interestEarned, balance };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    basicSalary: { min: 5000, max: 500000, step: 1000 },
    currentAge: { min: 18, max: 58, step: 1 },
    retirementAge: { min: 58, max: 60, step: 1 },
    annualIncrement: { min: 0, max: 20, step: 0.5 },
    interestRate: { min: 5, max: 12, step: 0.1 },
};

export default function Page() {
    const [basicSalary, setBasicSalary] = useState(30000);
    const [currentAge, setCurrentAge] = useState(28);
    const [retirementAge, setRetirementAge] = useState(58);
    const [annualIncrement, setAnnualIncrement] = useState(5);
    const [interestRate, setInterestRate] = useState(8.25);

    const employeeContributionPercent = 12;
    const employerContributionPercent = 3.67; // remaining 8.33% goes to EPS

    const { totalEmployeeContribution, totalEmployerContribution, totalContribution, interestEarned, balance } = useMemo(() => {
        const s = Number(basicSalary) || 0;
        const age1 = Number(currentAge) || 18;
        const age2 = Math.max(Number(retirementAge) || 58, age1 + 1);
        const inc = Number(annualIncrement) || 0;
        const r = Number(interestRate) || 0;
        return calculateEPF(s, employeeContributionPercent, employerContributionPercent, age1, age2, inc, r);
    }, [basicSalary, currentAge, retirementAge, annualIncrement, interestRate]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>EPF (Employees' Provident Fund) Calculator</h1>

                <FieldWithSlider label="Basic Salary + DA (Monthly)" prefix="₹" value={basicSalary} onChange={setBasicSalary} limits={LIMITS.basicSalary} />
                <FieldWithSlider label="Current Age" suffix="years" value={currentAge} onChange={setCurrentAge} limits={LIMITS.currentAge} />
                <FieldWithSlider label="Retirement Age" suffix="years" value={retirementAge} onChange={setRetirementAge} limits={LIMITS.retirementAge} />
                <FieldWithSlider label="Annual Salary Increment" suffix="%" value={annualIncrement} onChange={setAnnualIncrement} limits={LIMITS.annualIncrement} />
                <FieldWithSlider label="EPF Interest Rate" suffix="%" value={interestRate} onChange={setInterestRate} limits={LIMITS.interestRate} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Employee Contribution: ₹{formatCurrency(totalEmployeeContribution)}</div>
                        <div className="ig-item ig-result">Employer Contribution: ₹{formatCurrency(totalEmployerContribution)}</div>
                        <div className="ig-item ig-result">Total Contribution: ₹{formatCurrency(totalContribution)}</div>
                        <div className="ig-item ig-result">Interest Earned: ₹{formatCurrency(interestEarned)}</div>
                        <div className="ig-item ig-result ig-result-total">Maturity Balance: ₹{formatCurrency(balance)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Estimates use 12% employee contribution and 3.67% employer contribution to EPF
                    (remaining 8.33% of employer share goes to EPS, not included here). Actual EPFO
                    interest rate is declared annually and may differ.
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