"use client";

import { useState, useMemo } from "react";

const FREQUENCIES = [
    { key: "1", label: "Annually", n: 1 },
    { key: "4", label: "Quarterly", n: 4 },
    { key: "12", label: "Monthly", n: 12 },
];

function calculateFD(principal, annualRate, years, n) {
    const r = annualRate / 100;
    const maturityAmount = principal * Math.pow(1 + r / n, n * years);
    const interestEarned = maturityAmount - principal;
    return { maturityAmount, interestEarned };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    principal: { min: 1000, max: 10000000, step: 1000 },
    rate: { min: 1, max: 12, step: 0.05 },
    years: { min: 0.5, max: 10, step: 0.5 },
};

export default function Page() {
    const [principal, setPrincipal] = useState(100000);
    const [rate, setRate] = useState(7),
        [years, setYears] = useState(5),
        [frequency, setFrequency] = useState("4");

    const n = FREQUENCIES.find((f) => f.key === frequency)?.n ?? 4;

    const { maturityAmount, interestEarned } = useMemo(() => {
        const p = Number(principal) || 0;
        const r = Number(rate) || 0;
        const y = Number(years) || 0;
        return calculateFD(p, r, y, n);
    }, [principal, rate, years, n]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>FD Calculator</h1>

                <FieldWithSlider
                    label="Deposit Amount"
                    prefix="₹"
                    value={principal}
                    onChange={setPrincipal}
                    limits={LIMITS.principal}
                />

                <FieldWithSlider
                    label="Interest Rate"
                    suffix="% p.a."
                    value={rate}
                    onChange={setRate}
                    limits={LIMITS.rate}
                />

                <FieldWithSlider
                    label="Tenure"
                    suffix="years"
                    value={years}
                    onChange={setYears}
                    limits={LIMITS.years}
                />

                <div className="ig-category">
                    <p className="ig-category-label">Compounding Frequency</p>
                    <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {FREQUENCIES.map((f) => (
                            <button
                                key={f.key}
                                className="ig-item"
                                style={frequency === f.key ? {} : { background: "transparent", color: "#f5f5f0", border: "1px solid #333" }}
                                onClick={() => setFrequency(f.key)}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Deposit Amount: ₹{formatCurrency(principal)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Interest Earned: ₹{formatCurrency(interestEarned)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Maturity Value: ₹{formatCurrency(maturityAmount)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FieldWithSlider({ label, value, onChange, limits, prefix, suffix }) {
    const { min, max, step } = limits;
    const clamp = (v) => Math.min(max, Math.max(min, v));

    const handleNumberChange = (e) => {
        const raw = e.target.value;
        onChange(raw === "" ? "" : Number(raw));
    };
    const handleNumberBlur = () => onChange(clamp(Number(value) || min));
    const handleSliderChange = (e) => onChange(Number(e.target.value));
    const percent = ((clamp(Number(value) || min) - min) / (max - min)) * 100;

    return (
        <div className="ig-category">
            <p className="ig-category-label">{label}</p>
            <div className="ig-field">
                {prefix && <span className="ig-field-prefix">{prefix}</span>}
                <input
                    className="ig-input"
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={handleNumberChange}
                    onBlur={handleNumberBlur}
                />
                {suffix && <span className="ig-field-suffix">{suffix}</span>}
            </div>
            <input
                className="ig-slider"
                type="range"
                min={min}
                max={max}
                step={step}
                value={clamp(Number(value) || min)}
                onChange={handleSliderChange}
                style={{ "--ig-slider-percent": `${percent}%` }}
            />
        </div>
    );
}