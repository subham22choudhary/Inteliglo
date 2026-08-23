"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

/* New Regime slabs (FY 2025-26 / AY 2026-27) */
const NEW_REGIME_SLABS = [
    { upto: 400000, rate: 0 },
    { upto: 800000, rate: 5 },
    { upto: 1200000, rate: 10 },
    { upto: 1600000, rate: 15 },
    { upto: 2000000, rate: 20 },
    { upto: 2400000, rate: 25 },
    { upto: Infinity, rate: 30 },
];
const NEW_REGIME_STANDARD_DEDUCTION = 75000;
const NEW_REGIME_REBATE_LIMIT = 1200000; // taxable income up to which rebate makes tax nil

/* Old Regime slabs (below 60 years) */
const OLD_REGIME_SLABS = [
    { upto: 250000, rate: 0 },
    { upto: 500000, rate: 5 },
    { upto: 1000000, rate: 20 },
    { upto: Infinity, rate: 30 },
];
const OLD_REGIME_STANDARD_DEDUCTION = 50000;
const OLD_REGIME_REBATE_LIMIT = 500000;

const CESS_RATE = 4;

function calculateSlabTax(taxableIncome, slabs) {
    let tax = 0;
    let previousLimit = 0;
    const breakdown = [];

    for (const slab of slabs) {
        if (taxableIncome <= previousLimit) break;
        const slabAmount = Math.min(taxableIncome, slab.upto) - previousLimit;
        const slabTax = (slabAmount * slab.rate) / 100;
        if (slabAmount > 0) {
            breakdown.push({ range: [previousLimit, Math.min(taxableIncome, slab.upto)], rate: slab.rate, tax: slabTax });
        }
        tax += slabTax;
        previousLimit = slab.upto;
    }

    return { tax, breakdown };
}

function calculateTax(grossIncome, deductions, regime) {
    const standardDeduction = regime === "new" ? NEW_REGIME_STANDARD_DEDUCTION : OLD_REGIME_STANDARD_DEDUCTION;
    const otherDeductions = regime === "old" ? deductions : 0; // 80C etc. only apply in old regime
    const rebateLimit = regime === "new" ? NEW_REGIME_REBATE_LIMIT : OLD_REGIME_REBATE_LIMIT;
    const slabs = regime === "new" ? NEW_REGIME_SLABS : OLD_REGIME_SLABS;

    const taxableIncome = Math.max(0, grossIncome - standardDeduction - otherDeductions);
    const { tax: slabTax, breakdown } = calculateSlabTax(taxableIncome, slabs);

    const rebateApplies = taxableIncome <= rebateLimit;
    const taxAfterRebate = rebateApplies ? 0 : slabTax;

    const cess = (taxAfterRebate * CESS_RATE) / 100;
    const totalTax = taxAfterRebate + cess;

    return {
        taxableIncome,
        slabTax,
        rebateApplies,
        taxAfterRebate,
        cess,
        totalTax,
        breakdown,
        takeHome: grossIncome - totalTax,
    };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    income: { min: 200000, max: 10000000, step: 10000 },
    deductions: { min: 0, max: 500000, step: 5000 },
};

export default function Page() {
    const [regime, setRegime] = useState("new");
    const [grossIncome, setGrossIncome] = useState(1200000);
    const [deductions, setDeductions] = useState(150000);

    const result = useMemo(() => {
        const income = Number(grossIncome) || 0;
        const ded = Number(deductions) || 0;
        return calculateTax(income, ded, regime);
    }, [grossIncome, deductions, regime]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>Income Tax Calculator</h1>

                {/* Regime tabs */}
                <div className="ig-category">
                    <p className="ig-category-label">Tax Regime</p>
                    <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {[
                            { key: "new", label: "New Regime" },
                            { key: "old", label: "Old Regime" },
                        ].map((r) => (
                            <button
                                key={r.key}
                                className="ig-item"
                                style={regime === r.key ? {} : { background: "transparent", color: "#f5f5f0", border: "1px solid #333" }}
                                onClick={() => setRegime(r.key)}
                            >
                                {r.label}
                            </button>
                        ))}
                    </div>
                </div>

                <FieldWithSlider
                    label="Gross Annual Income"
                    prefix="₹"
                    value={grossIncome}
                    onChange={setGrossIncome}
                    limits={LIMITS.income}
                />

                {regime === "old" && (
                    <FieldWithSlider
                        label="Deductions (80C, 80D, HRA, etc.)"
                        prefix="₹"
                        value={deductions}
                        onChange={setDeductions}
                        limits={LIMITS.deductions}
                    />
                )}

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Taxable Income: ₹{formatCurrency(result.taxableIncome)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default" }}>
                            {result.rebateApplies
                                ? "Tax Rebate Applied — No Tax Payable"
                                : `Income Tax (before cess): ₹${formatCurrency(result.taxAfterRebate)}`}
                        </div>
                        {!result.rebateApplies && (
                            <div className="ig-item" style={{ cursor: "default" }}>
                                Health &amp; Education Cess (4%): ₹{formatCurrency(result.cess)}
                            </div>
                        )}
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Total Tax Payable: ₹{formatCurrency(result.totalTax)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Net Take-Home: ₹{formatCurrency(result.takeHome)}
                        </div>
                    </div>
                </div>

                {result.breakdown.length > 0 && (
                    <div className="ig-category">
                        <p className="ig-category-label">Slab-wise Breakdown</p>
                        <div className="ig-table-wrap">
                            <table className="ig-table">
                                <thead>
                                    <tr>
                                        <th>Income Range</th>
                                        <th>Rate</th>
                                        <th>Tax</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.breakdown.map((row, idx) => (
                                        <tr key={idx}>
                                            <td>
                                                ₹{formatCurrency(row.range[0])} – ₹{formatCurrency(row.range[1])}
                                            </td>
                                            <td>{row.rate}%</td>
                                            <td>₹{formatCurrency(row.tax)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <p style={disclaimerStyle}>
                    Based on FY 2025-26 slabs for individuals below 60 years. Excludes surcharge for income
                    above ₹50L, and other exemptions/deductions not listed here. For informational purposes
                    only — consult a tax professional for filing.
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

const disclaimerStyle = {
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 11,
    color: "#666",
    lineHeight: 1.6,
    marginTop: 32,
    textAlign: "center",
};