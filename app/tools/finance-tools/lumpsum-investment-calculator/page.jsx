"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["MUTUAL FUNDS"],
};

function calculateLumpsum(principal, annualReturn, years) {
    const futureValue = principal * Math.pow(1 + annualReturn / 100, years);
    const wealthGained = futureValue - principal;
    return { futureValue, wealthGained };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    principal: { min: 1000, max: 50000000, step: 1000 },
    annualReturn: { min: 1, max: 25, step: 0.5 },
    years: { min: 1, max: 40, step: 1 },
};

export default function Page() {
    const [principal, setPrincipal] = useState(500000);
    const [annualReturn, setAnnualReturn] = useState(12);
    const [years, setYears] = useState(10);

    const { futureValue, wealthGained } = useMemo(() => {
        const p = Number(principal) || 0;
        const r = Number(annualReturn) || 0;
        const y = Number(years) || 1;
        return calculateLumpsum(p, r, y);
    }, [principal, annualReturn, years]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Mutual Funds</p>
                <h1 style={{ textAlign: "center" }}>Lumpsum Investment Calculator</h1>

                <FieldWithSlider label="Investment Amount" prefix="₹" value={principal} onChange={setPrincipal} limits={LIMITS.principal} />
                <FieldWithSlider label="Expected Annual Return" suffix="%" value={annualReturn} onChange={setAnnualReturn} limits={LIMITS.annualReturn} />
                <FieldWithSlider label="Investment Period" suffix="years" value={years} onChange={setYears} limits={LIMITS.years} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Invested Amount: ₹{formatCurrency(principal)}</div>
                        <div className="ig-item ig-result">Wealth Gained: ₹{formatCurrency(wealthGained)}</div>
                        <div className="ig-item ig-result ig-result-total">Maturity Value: ₹{formatCurrency(futureValue)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    A one-time investment compounded annually. Actual mutual fund returns fluctuate
                    year to year and are not guaranteed — this is a projection based on a constant assumed rate.
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