"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["PERSONAL FINANCE"],
};

function getDTIBand(dtiPercent) {
    if (dtiPercent <= 20) return { label: "Excellent", color: "#4caf3d" };
    if (dtiPercent <= 36) return { label: "Good", color: "#84cc16" };
    if (dtiPercent <= 43) return { label: "Manageable", color: "#c9a900" };
    if (dtiPercent <= 50) return { label: "High Risk", color: "#f59e0b" };
    return { label: "Very High Risk", color: "#e05a4e" };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    income: { min: 15000, max: 1000000, step: 5000 },
    debt: { min: 0, max: 500000, step: 1000 },
};

const DEBT_TYPES = [
    { key: "homeLoan", label: "Home Loan EMI" },
    { key: "carLoan", label: "Car Loan EMI" },
    { key: "personalLoan", label: "Personal Loan EMI" },
    { key: "creditCard", label: "Credit Card Min. Payment" },
    { key: "other", label: "Other EMIs / Debts" },
];

export default function Page() {
    const [monthlyIncome, setMonthlyIncome] = useState(80000);
    const [debts, setDebts] = useState({
        homeLoan: 20000,
        carLoan: 8000,
        personalLoan: 0,
        creditCard: 0,
        other: 0,
    });

    const totalDebt = useMemo(
        () => Object.values(debts).reduce((sum, v) => sum + (Number(v) || 0), 0),
        [debts]
    );

    const dtiPercent = useMemo(() => {
        const income = Number(monthlyIncome) || 0;
        if (income === 0) return 0;
        return (totalDebt / income) * 100;
    }, [totalDebt, monthlyIncome]);

    const band = getDTIBand(dtiPercent);
    const disposableIncome = (Number(monthlyIncome) || 0) - totalDebt;

    const handleDebtChange = (key, value) => {
        setDebts((prev) => ({ ...prev, [key]: value === "" ? "" : Number(value) }));
    };

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>Debt-to-Income Ratio Calculator</h1>

                <FieldWithSlider
                    label="Gross Monthly Income"
                    prefix="₹"
                    value={monthlyIncome}
                    onChange={setMonthlyIncome}
                    limits={LIMITS.income}
                />

                <div className="ig-category">
                    <p className="ig-category-label">Monthly Debt Payments</p>
                    {DEBT_TYPES.map((d) => (
                        <div key={d.key} style={{ marginBottom: 14 }}>
                            <p style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: 12, letterSpacing: 1, color: "#a8a89c", margin: "0 0 8px" }}>
                                {d.label}
                            </p>
                            <div className="ig-field">
                                <span className="ig-field-prefix">₹</span>
                                <input
                                    className="ig-input"
                                    type="number"
                                    min="0"
                                    value={debts[d.key]}
                                    onChange={(e) => handleDebtChange(d.key, e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Total Monthly Debt: ₹{formatCurrency(totalDebt)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Disposable Income: ₹{formatCurrency(disposableIncome)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default", background: band.color, color: "#0a0a0a" }}>
                            DTI Ratio: {dtiPercent.toFixed(1)}% — {band.label}
                        </div>
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">What the Ranges Mean</p>
                    <div className="ig-table-wrap">
                        <table className="ig-table">
                            <thead>
                                <tr><th>DTI Range</th><th>Rating</th><th>What It Means</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>≤ 20%</td><td>Excellent</td><td>Strong borrowing capacity, easy loan approvals</td></tr>
                                <tr><td>21–36%</td><td>Good</td><td>Healthy, most lenders comfortable</td></tr>
                                <tr><td>37–43%</td><td>Manageable</td><td>Near typical lender limits for new loans</td></tr>
                                <tr><td>44–50%</td><td>High Risk</td><td>New loan approval becomes difficult</td></tr>
                                <tr><td>&gt; 50%</td><td>Very High Risk</td><td>Financial stress; new credit unlikely</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Most lenders prefer a DTI below 36–43% before approving new loans. This is a general
                    guideline — exact thresholds vary by lender, loan type, and country.
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