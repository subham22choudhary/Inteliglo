"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateRuleOf72(annualRate) {
    const yearsToDouble = 72 / annualRate;
    const preciseYears = Math.log(2) / Math.log(1 + annualRate / 100);
    return { yearsToDouble, preciseYears };
}

const LIMITS = {
    rate: { min: 1, max: 30, step: 0.5 },
};

export default function Page() {
    const [annualRate, setAnnualRate] = useState(12);

    const { yearsToDouble, preciseYears } = useMemo(() => {
        const r = Number(annualRate) || 1;
        return calculateRuleOf72(r);
    }, [annualRate]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>Rule of 72 Calculator</h1>

                <FieldWithSlider label="Expected Annual Return" suffix="%" value={annualRate} onChange={setAnnualRate} limits={LIMITS.rate} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result ig-result-total">Money Doubles in: {yearsToDouble.toFixed(1)} years (Rule of 72)</div>
                        <div className="ig-item ig-result">Precise (Compound) Doubling Time: {preciseYears.toFixed(1)} years</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    The Rule of 72 is a quick mental-math shortcut (72 ÷ interest rate) to estimate
                    doubling time. The precise compound-interest formula is shown alongside for comparison — it's more accurate at extreme rates.
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