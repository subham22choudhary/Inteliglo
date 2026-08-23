"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateStepUpSIP(initialMonthlySIP, annualStepUpPercent, expectedReturn, years) {
    const monthlyRate = expectedReturn / 12 / 100;
    let balance = 0;
    let totalInvested = 0;
    let currentSIP = initialMonthlySIP;

    for (let y = 0; y < years; y++) {
        for (let m = 0; m < 12; m++) {
            balance += currentSIP;
            balance += balance * monthlyRate;
            totalInvested += currentSIP;
        }
        currentSIP += (currentSIP * annualStepUpPercent) / 100;
    }

    const wealthGained = balance - totalInvested;
    return { totalInvested, wealthGained, futureValue: balance };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    initialSIP: { min: 500, max: 200000, step: 500 },
    stepUp: { min: 0, max: 30, step: 1 },
    expectedReturn: { min: 5, max: 20, step: 0.5 },
    years: { min: 1, max: 40, step: 1 },
};

export default function Page() {
    const [initialMonthlySIP, setInitialMonthlySIP] = useState(10000);
    const [annualStepUpPercent, setAnnualStepUpPercent] = useState(10);
    const [expectedReturn, setExpectedReturn] = useState(12);
    const [years, setYears] = useState(15);

    const { totalInvested, wealthGained, futureValue } = useMemo(() => {
        const s = Number(initialMonthlySIP) || 0;
        const step = Number(annualStepUpPercent) || 0;
        const r = Number(expectedReturn) || 0;
        const y = Number(years) || 1;
        return calculateStepUpSIP(s, step, r, y);
    }, [initialMonthlySIP, annualStepUpPercent, expectedReturn, years]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>Step-up SIP Calculator</h1>

                <FieldWithSlider label="Initial Monthly SIP" prefix="₹" value={initialMonthlySIP} onChange={setInitialMonthlySIP} limits={LIMITS.initialSIP} />
                <FieldWithSlider label="Annual Step-up" suffix="%" value={annualStepUpPercent} onChange={setAnnualStepUpPercent} limits={LIMITS.stepUp} />
                <FieldWithSlider label="Expected Annual Return" suffix="%" value={expectedReturn} onChange={setExpectedReturn} limits={LIMITS.expectedReturn} />
                <FieldWithSlider label="Investment Period" suffix="years" value={years} onChange={setYears} limits={LIMITS.years} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Total Invested: ₹{formatCurrency(totalInvested)}</div>
                        <div className="ig-item ig-result">Wealth Gained: ₹{formatCurrency(wealthGained)}</div>
                        <div className="ig-item ig-result ig-result-total">Maturity Value: ₹{formatCurrency(futureValue)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Step-up SIP increases your monthly investment every year by a fixed percentage,
                    helping investments keep pace with rising income. Returns are market-linked and not guaranteed.
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