"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

// Approx APY contribution chart (age -> monthly contribution per ₹1000 pension)
const APY_TABLE = {
    18: { 1000: 42, 2000: 84, 3000: 126, 4000: 168, 5000: 210 },
    20: { 1000: 50, 2000: 100, 3000: 150, 4000: 198, 5000: 248 },
    25: { 1000: 76, 2000: 151, 3000: 226, 4000: 301, 5000: 376 },
    30: { 1000: 116, 2000: 231, 3000: 347, 4000: 462, 5000: 577 },
    35: { 1000: 181, 2000: 362, 3000: 543, 4000: 722, 5000: 902 },
    40: { 1000: 291, 2000: 582, 3000: 873, 4000: 1164, 5000: 1454 },
};

function getClosestAge(age) {
    const ages = Object.keys(APY_TABLE).map(Number);
    return ages.reduce((prev, curr) => (Math.abs(curr - age) < Math.abs(prev - age) ? curr : prev));
}

function getClosestPension(pension) {
    const options = [1000, 2000, 3000, 4000, 5000];
    return options.reduce((prev, curr) => (Math.abs(curr - pension) < Math.abs(prev - pension) ? curr : prev));
}

function calculateAPY(age, desiredPension) {
    const tableAge = getClosestAge(age);
    const tablePension = getClosestPension(desiredPension);
    const monthlyContribution = APY_TABLE[tableAge][tablePension];
    const yearsToContribute = 60 - age;
    const totalContribution = monthlyContribution * 12 * yearsToContribute;
    const corpusReturnedToNominee = tablePension === 1000 ? 170000 : tablePension === 2000 ? 340000 : tablePension === 3000 ? 510000 : tablePension === 4000 ? 680000 : 850000;

    return { monthlyContribution, yearsToContribute, totalContribution, corpusReturnedToNominee, tablePension };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    age: { min: 18, max: 40, step: 1 },
    pension: { min: 1000, max: 5000, step: 1000 },
};

export default function Page() {
    const [age, setAge] = useState(25);
    const [desiredPension, setDesiredPension] = useState(3000);

    const { monthlyContribution, yearsToContribute, totalContribution, corpusReturnedToNominee, tablePension } = useMemo(() => {
        const a = Number(age) || 18;
        const p = Number(desiredPension) || 1000;
        return calculateAPY(a, p);
    }, [age, desiredPension]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>APY (Atal Pension Yojana) Calculator</h1>

                <FieldWithSlider label="Current Age" suffix="years" value={age} onChange={setAge} limits={LIMITS.age} />
                <FieldWithSlider label="Desired Monthly Pension (at 60)" prefix="₹" value={desiredPension} onChange={setDesiredPension} limits={LIMITS.pension} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Nearest Pension Slab: ₹{formatCurrency(tablePension)}/month</div>
                        <div className="ig-item ig-result ig-result-total">Required Monthly Contribution: ₹{monthlyContribution}</div>
                        <div className="ig-item ig-result">Years of Contribution: {yearsToContribute}</div>
                        <div className="ig-item ig-result">Total Contribution till 60: ₹{formatCurrency(totalContribution)}</div>
                        <div className="ig-item ig-result">Corpus Returned to Nominee: ₹{formatCurrency(corpusReturnedToNominee)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Contribution amounts follow PFRDA's official APY chart (approximate slabs for age
                    18–40). Pension starts at age 60; after subscriber's death, spouse gets same pension,
                    then nominee gets the corpus. Govt co-contribution applies only to eligible accounts opened before Mar 2016.
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