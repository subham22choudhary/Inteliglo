"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

const FREQUENCIES = [
    { key: "1", label: "Annually", n: 1 },
    { key: "2", label: "Semi-Annually", n: 2 },
    { key: "4", label: "Quarterly", n: 4 },
    { key: "12", label: "Monthly", n: 12 },
    { key: "365", label: "Daily", n: 365 },
];

function calculateCompoundInterest(principal, annualRate, years, n) {
    const r = annualRate / 100;
    const yearly = [];

    for (let y = 1; y <= years; y++) {
        const amount = principal * Math.pow(1 + r / n, n * y);
        yearly.push({
            year: y,
            amount,
            interestEarned: amount - principal,
        });
    }

    const finalAmount = yearly.length > 0 ? yearly[yearly.length - 1].amount : principal;
    const totalInterest = finalAmount - principal;

    return { finalAmount, totalInterest, yearly };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    principal: { min: 1000, max: 10000000, step: 1000 },
    rate: { min: 1, max: 25, step: 0.1 },
    years: { min: 1, max: 40, step: 1 },
};

export default function Page() {
    const [principal, setPrincipal] = useState(100000);
    const [rate, setRate] = useState(8);
    const [years, setYears] = useState(10);
    const [frequency, setFrequency] = useState("12");
    const [showSchedule, setShowSchedule] = useState(false);

    const n = FREQUENCIES.find((f) => f.key === frequency)?.n ?? 12;
    const y = Math.max(1, Math.round(Number(years)) || 1);

    const { finalAmount, totalInterest, yearly } = useMemo(() => {
        const p = Number(principal) || 0;
        const r = Number(rate) || 0;
        return calculateCompoundInterest(p, r, y, n);
    }, [principal, rate, y, n]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>Compound Interest Calculator</h1>

                <FieldWithSlider
                    label="Principal Amount"
                    prefix="₹"
                    value={principal}
                    onChange={setPrincipal}
                    limits={LIMITS.principal}
                />

                <FieldWithSlider
                    label="Annual Interest Rate"
                    suffix="% p.a."
                    value={rate}
                    onChange={setRate}
                    limits={LIMITS.rate}
                />

                <FieldWithSlider
                    label="Time Period"
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
                            Principal Amount: ₹{formatCurrency(principal)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Total Interest Earned: ₹{formatCurrency(totalInterest)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Maturity Value: ₹{formatCurrency(finalAmount)}
                        </div>
                    </div>
                </div>

                <div className="ig-category">
                    <div className="ig-list" style={{ flexDirection: "row" }}>
                        <button className="ig-item" onClick={() => setShowSchedule((prev) => !prev)}>
                            {showSchedule ? "Hide" : "Show"} Yearly Growth
                        </button>
                    </div>
                </div>

                {showSchedule && (
                    <div className="ig-category">
                        <p className="ig-category-label">Year-by-Year Growth</p>
                        <div className="ig-table-wrap">
                            <table className="ig-table">
                                <thead>
                                    <tr>
                                        <th>Year</th>
                                        <th>Interest Earned (Total)</th>
                                        <th>Total Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {yearly.map((row) => (
                                        <tr key={row.year}>
                                            <td>{row.year}</td>
                                            <td>₹{formatCurrency(row.interestEarned)}</td>
                                            <td>₹{formatCurrency(row.amount)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
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

    const handleNumberBlur = () => {
        onChange(clamp(Number(value) || min));
    };

    const handleSliderChange = (e) => {
        onChange(Number(e.target.value));
    };

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