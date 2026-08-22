"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["INVESTMENT & RETURNS"],
};

const PPF_RATE = 7.1; // current PPF interest rate (Government of India, revised quarterly)

function calculatePPF(yearlyInvestment, years, rate) {
    const r = rate / 100;
    let balance = 0;
    const yearly = [];

    for (let y = 1; y <= years; y++) {
        balance += yearlyInvestment;
        const interest = balance * r;
        balance += interest;
        yearly.push({ year: y, invested: yearlyInvestment * y, interest: balance - yearlyInvestment * y, balance });
    }

    const totalInvested = yearlyInvestment * years;
    const totalInterest = balance - totalInvested;

    return { maturityAmount: balance, totalInvested, totalInterest, yearly };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    yearlyInvestment: { min: 500, max: 150000, step: 500 },
    years: { min: 15, max: 50, step: 1 },
};

export default function Page() {
    const [yearlyInvestment, setYearlyInvestment] = useState(150000);
    const [years, setYears] = useState(15);
    const [showSchedule, setShowSchedule] = useState(false);

    const y = Math.max(1, Math.round(Number(years)) || 1);

    const { maturityAmount, totalInvested, totalInterest, yearly } = useMemo(() => {
        const amt = Math.min(150000, Number(yearlyInvestment) || 0); // PPF has an annual cap
        return calculatePPF(amt, y, PPF_RATE);
    }, [yearlyInvestment, y]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>PPF Calculator</h1>

                <FieldWithSlider
                    label="Yearly Investment (max ₹1,50,000)"
                    prefix="₹"
                    value={yearlyInvestment}
                    onChange={setYearlyInvestment}
                    limits={LIMITS.yearlyInvestment}
                />

                <FieldWithSlider
                    label="Investment Duration"
                    suffix="years"
                    value={years}
                    onChange={setYears}
                    limits={LIMITS.years}
                />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Total Invested: ₹{formatCurrency(totalInvested)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Total Interest Earned: ₹{formatCurrency(totalInterest)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Maturity Value: ₹{formatCurrency(maturityAmount)}
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
                                        <th>Total Invested</th>
                                        <th>Interest Earned</th>
                                        <th>Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {yearly.map((row) => (
                                        <tr key={row.year}>
                                            <td>{row.year}</td>
                                            <td>₹{formatCurrency(row.invested)}</td>
                                            <td>₹{formatCurrency(row.interest)}</td>
                                            <td>₹{formatCurrency(row.balance)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <p style={disclaimerStyle}>
                    Calculated at the current PPF interest rate of {PPF_RATE}% p.a. (set by the Government of
                    India and revised quarterly — verify the latest rate before relying on this). PPF has a
                    minimum lock-in of 15 years and a ₹1,50,000 annual investment cap.
                </p>
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

const disclaimerStyle = {
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 11,
    color: "#666",
    lineHeight: 1.6,
    marginTop: 32,
    textAlign: "center",
};