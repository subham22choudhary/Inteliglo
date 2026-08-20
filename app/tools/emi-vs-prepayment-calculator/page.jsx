"use client";

import { useState, useMemo } from "react";

/**
 * Simulates month-by-month amortization, applying an optional prepayment
 * (one-time at a specific month, or recurring every month) that reduces principal directly.
 * Returns months taken to close the loan and total interest paid.
 */
function simulateLoan(principal, annualRate, months, prepaymentType, prepaymentAmount, prepaymentMonth) {
    const monthlyRate = annualRate / 12 / 100;
    const emi =
        monthlyRate === 0
            ? principal / months
            : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);

    let balance = principal;
    let totalInterest = 0;
    let monthsTaken = 0;
    const maxIterations = 1200; // 100 years safety cap

    for (let m = 1; m <= maxIterations; m++) {
        if (balance <= 0) break;

        const interestForMonth = balance * monthlyRate;
        let principalForMonth = emi - interestForMonth;

        if (principalForMonth > balance) principalForMonth = balance;

        balance -= principalForMonth;
        totalInterest += interestForMonth;
        monthsTaken = m;

        // apply prepayment
        if (prepaymentType === "recurring" && prepaymentAmount > 0 && balance > 0) {
            const applied = Math.min(prepaymentAmount, balance);
            balance -= applied;
        } else if (prepaymentType === "onetime" && m === prepaymentMonth && prepaymentAmount > 0 && balance > 0) {
            const applied = Math.min(prepaymentAmount, balance);
            balance -= applied;
        }
    }

    const totalPayment = principal + totalInterest;

    return { monthsTaken, totalInterest, totalPayment, emi };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    principal: { min: 100000, max: 20000000, step: 50000 },
    rate: { min: 6, max: 20, step: 0.1 },
    tenureYears: { min: 1, max: 30, step: 1 },
    prepaymentAmount: { min: 0, max: 2000000, step: 5000 },
    prepaymentMonth: { min: 1, max: 360, step: 1 },
};

export default function Page() {
    const [principal, setPrincipal] = useState(2000000);
    const [rate, setRate] = useState(9);
    const [tenureYears, setTenureYears] = useState(15);
    const [prepaymentType, setPrepaymentType] = useState("onetime"); // none | onetime | recurring
    const [prepaymentAmount, setPrepaymentAmount] = useState(200000);
    const [prepaymentMonth, setPrepaymentMonth] = useState(24);

    const originalMonths = Math.max(1, Math.round(Number(tenureYears) * 12) || 1);

    const { withoutPrepay, withPrepay } = useMemo(() => {
        const p = Number(principal) || 0;
        const r = Number(rate) || 0;
        const amt = Number(prepaymentAmount) || 0;
        const pm = Math.min(originalMonths, Math.max(1, Number(prepaymentMonth) || 1));

        const base = simulateLoan(p, r, originalMonths, "none", 0, 0);
        const withPre =
            prepaymentType === "none"
                ? base
                : simulateLoan(p, r, originalMonths, prepaymentType, amt, pm);

        return { withoutPrepay: base, withPrepay: withPre };
    }, [principal, rate, originalMonths, prepaymentType, prepaymentAmount, prepaymentMonth]);

    const monthsSaved = withoutPrepay.monthsTaken - withPrepay.monthsTaken;
    const interestSaved = withoutPrepay.totalInterest - withPrepay.totalInterest;

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>EMI vs Prepayment Calculator</h1>

                <FieldWithSlider label="Loan Amount" prefix="₹" value={principal} onChange={setPrincipal} limits={LIMITS.principal} />
                <FieldWithSlider label="Interest Rate" suffix="% p.a." value={rate} onChange={setRate} limits={LIMITS.rate} />
                <FieldWithSlider label="Original Tenure" suffix="years" value={tenureYears} onChange={setTenureYears} limits={LIMITS.tenureYears} />

                <div className="ig-category">
                    <p className="ig-category-label">Prepayment Type</p>
                    <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {[
                            { key: "none", label: "No Prepayment" },
                            { key: "onetime", label: "One-Time Lump Sum" },
                            { key: "recurring", label: "Extra Every Month" },
                        ].map((t) => (
                            <button
                                key={t.key}
                                className="ig-item"
                                style={prepaymentType === t.key ? {} : { background: "transparent", color: "#f5f5f0", border: "1px solid #333" }}
                                onClick={() => setPrepaymentType(t.key)}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                {prepaymentType !== "none" && (
                    <>
                        <FieldWithSlider
                            label={prepaymentType === "onetime" ? "Lump Sum Amount" : "Extra Amount per Month"}
                            prefix="₹"
                            value={prepaymentAmount}
                            onChange={setPrepaymentAmount}
                            limits={LIMITS.prepaymentAmount}
                        />
                        {prepaymentType === "onetime" && (
                            <FieldWithSlider
                                label="Prepayment at Month #"
                                value={prepaymentMonth}
                                onChange={setPrepaymentMonth}
                                limits={{ min: 1, max: originalMonths, step: 1 }}
                            />
                        )}
                    </>
                )}

                <div className="ig-category">
                    <p className="ig-category-label">Without Prepayment</p>
                    <div className="ig-list">
                        <div className="ig-item" style={{ cursor: "default" }}>Monthly EMI: ₹{formatCurrency(withoutPrepay.emi)}</div>
                        <div className="ig-item" style={{ cursor: "default" }}>Loan Closes In: {withoutPrepay.monthsTaken} months</div>
                        <div className="ig-item" style={{ cursor: "default" }}>Total Interest: ₹{formatCurrency(withoutPrepay.totalInterest)}</div>
                    </div>
                </div>

                {prepaymentType !== "none" && (
                    <>
                        <div className="ig-category">
                            <p className="ig-category-label">With Prepayment</p>
                            <div className="ig-list">
                                <div className="ig-item" style={{ cursor: "default" }}>Monthly EMI: ₹{formatCurrency(withPrepay.emi)}</div>
                                <div className="ig-item" style={{ cursor: "default" }}>Loan Closes In: {withPrepay.monthsTaken} months</div>
                                <div className="ig-item" style={{ cursor: "default" }}>Total Interest: ₹{formatCurrency(withPrepay.totalInterest)}</div>
                            </div>
                        </div>

                        <div className="ig-category">
                            <p className="ig-category-label">You Save</p>
                            <div className="ig-list">
                                <div className="ig-item" style={{ cursor: "default" }}>
                                    {monthsSaved} months earlier ({(monthsSaved / 12).toFixed(1)} years)
                                </div>
                                <div className="ig-item" style={{ cursor: "default" }}>
                                    ₹{formatCurrency(interestSaved)} in interest
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <p style={disclaimerStyle}>
                    Assumes EMI amount stays the same after prepayment (tenure shortens instead of EMI
                    reducing) — the most common option lenders offer. Some lenders may instead reduce your
                    EMI and keep tenure the same; check with your lender which option applies.
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