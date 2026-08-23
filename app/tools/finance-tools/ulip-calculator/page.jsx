"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateULIP(annualPremium, allocationChargePercent, expectedReturn, years, mortalityChargePerYear) {
    const monthlyRate = expectedReturn / 12 / 100;
    let fundValue = 0;
    let totalPremiumPaid = 0;
    let totalCharges = 0;

    for (let y = 0; y < years; y++) {
        const allocCharge = (annualPremium * allocationChargePercent) / 100;
        const investedThisYear = annualPremium - allocCharge - mortalityChargePerYear;
        totalCharges += allocCharge + mortalityChargePerYear;
        totalPremiumPaid += annualPremium;

        for (let m = 0; m < 12; m++) {
            fundValue += investedThisYear / 12;
            fundValue += fundValue * monthlyRate;
        }
    }

    const wealthGained = fundValue - totalPremiumPaid + totalCharges;

    return { totalPremiumPaid, totalCharges, fundValue, wealthGained };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    annualPremium: { min: 10000, max: 1000000, step: 5000 },
    allocationCharge: { min: 0, max: 10, step: 0.5 },
    expectedReturn: { min: 4, max: 15, step: 0.5 },
    years: { min: 5, max: 30, step: 1 },
    mortalityCharge: { min: 500, max: 20000, step: 500 },
};

export default function Page() {
    const [annualPremium, setAnnualPremium] = useState(100000);
    const [allocationChargePercent, setAllocationChargePercent] = useState(3);
    const [expectedReturn, setExpectedReturn] = useState(10);
    const [years, setYears] = useState(15);
    const [mortalityChargePerYear, setMortalityChargePerYear] = useState(3000);

    const { totalPremiumPaid, totalCharges, fundValue, wealthGained } = useMemo(() => {
        const p = Number(annualPremium) || 0;
        const a = Number(allocationChargePercent) || 0;
        const r = Number(expectedReturn) || 0;
        const y = Number(years) || 1;
        const m = Number(mortalityChargePerYear) || 0;
        return calculateULIP(p, a, r, y, m);
    }, [annualPremium, allocationChargePercent, expectedReturn, years, mortalityChargePerYear]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>ULIP Calculator</h1>

                <FieldWithSlider label="Annual Premium" prefix="₹" value={annualPremium} onChange={setAnnualPremium} limits={LIMITS.annualPremium} />
                <FieldWithSlider label="Allocation Charge" suffix="% of premium" value={allocationChargePercent} onChange={setAllocationChargePercent} limits={LIMITS.allocationCharge} />
                <FieldWithSlider label="Mortality Charge (Annual)" prefix="₹" value={mortalityChargePerYear} onChange={setMortalityChargePerYear} limits={LIMITS.mortalityCharge} />
                <FieldWithSlider label="Expected Fund Return" suffix="%" value={expectedReturn} onChange={setExpectedReturn} limits={LIMITS.expectedReturn} />
                <FieldWithSlider label="Policy Term" suffix="years" value={years} onChange={setYears} limits={LIMITS.years} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Total Premium Paid: ₹{formatCurrency(totalPremiumPaid)}</div>
                        <div className="ig-item ig-result">Total Charges Deducted: ₹{formatCurrency(totalCharges)}</div>
                        <div className="ig-item ig-result">Net Wealth Gained: ₹{formatCurrency(wealthGained)}</div>
                        <div className="ig-item ig-result ig-result-total">Estimated Fund Value: ₹{formatCurrency(fundValue)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Simplified estimate. Actual ULIP returns depend on fund performance, and real
                    policies include additional charges (policy admin, fund management, surrender) not
                    modeled here. Compare charges across insurers before buying.
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