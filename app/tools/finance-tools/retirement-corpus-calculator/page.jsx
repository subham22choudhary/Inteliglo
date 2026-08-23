"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateRetirementCorpus(monthlyExpense, currentAge, retirementAge, lifeExpectancy, inflationRate, postRetirementReturn) {
    const yearsToRetirement = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;

    const expenseAtRetirement = monthlyExpense * Math.pow(1 + inflationRate / 100, yearsToRetirement);
    const annualExpenseAtRetirement = expenseAtRetirement * 12;

    const realReturn = ((1 + postRetirementReturn / 100) / (1 + inflationRate / 100) - 1) || 0.0001;
    const requiredCorpus =
        realReturn === 0
            ? annualExpenseAtRetirement * yearsInRetirement
            : (annualExpenseAtRetirement * (1 - Math.pow(1 + realReturn, -yearsInRetirement))) / realReturn;

    return { yearsToRetirement, yearsInRetirement, expenseAtRetirement, requiredCorpus };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    monthlyExpense: { min: 5000, max: 500000, step: 5000 },
    currentAge: { min: 18, max: 59, step: 1 },
    retirementAge: { min: 45, max: 70, step: 1 },
    lifeExpectancy: { min: 65, max: 100, step: 1 },
    inflationRate: { min: 3, max: 10, step: 0.5 },
    postRetirementReturn: { min: 3, max: 12, step: 0.5 },
};

export default function Page() {
    const [monthlyExpense, setMonthlyExpense] = useState(50000);
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);
    const [lifeExpectancy, setLifeExpectancy] = useState(85);
    const [inflationRate, setInflationRate] = useState(6);
    const [postRetirementReturn, setPostRetirementReturn] = useState(7);

    const { yearsToRetirement, yearsInRetirement, expenseAtRetirement, requiredCorpus } = useMemo(() => {
        const me = Number(monthlyExpense) || 0;
        const a1 = Number(currentAge) || 18;
        const a2 = Math.max(Number(retirementAge) || 60, a1 + 1);
        const a3 = Math.max(Number(lifeExpectancy) || 85, a2 + 1);
        const inf = Number(inflationRate) || 0;
        const ret = Number(postRetirementReturn) || 0;
        return calculateRetirementCorpus(me, a1, a2, a3, inf, ret);
    }, [monthlyExpense, currentAge, retirementAge, lifeExpectancy, inflationRate, postRetirementReturn]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>Retirement Corpus Calculator</h1>

                <FieldWithSlider label="Current Monthly Expense" prefix="₹" value={monthlyExpense} onChange={setMonthlyExpense} limits={LIMITS.monthlyExpense} />
                <FieldWithSlider label="Current Age" suffix="years" value={currentAge} onChange={setCurrentAge} limits={LIMITS.currentAge} />
                <FieldWithSlider label="Retirement Age" suffix="years" value={retirementAge} onChange={setRetirementAge} limits={LIMITS.retirementAge} />
                <FieldWithSlider label="Life Expectancy" suffix="years" value={lifeExpectancy} onChange={setLifeExpectancy} limits={LIMITS.lifeExpectancy} />
                <FieldWithSlider label="Expected Inflation" suffix="%" value={inflationRate} onChange={setInflationRate} limits={LIMITS.inflationRate} />
                <FieldWithSlider label="Post-Retirement Return" suffix="%" value={postRetirementReturn} onChange={setPostRetirementReturn} limits={LIMITS.postRetirementReturn} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Years to Retirement: {yearsToRetirement}</div>
                        <div className="ig-item ig-result">Years in Retirement: {yearsInRetirement}</div>
                        <div className="ig-item ig-result">Monthly Expense at Retirement: ₹{formatCurrency(expenseAtRetirement)}</div>
                        <div className="ig-item ig-result ig-result-total">Required Retirement Corpus: ₹{formatCurrency(requiredCorpus)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Uses inflation-adjusted expenses and real rate of return (post-retirement return
                    minus inflation) to estimate the corpus needed. Doesn't account for medical
                    emergencies, lifestyle changes, or other pension income you may have.
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