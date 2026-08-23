"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    val: { min: 0, max: 100000000, step: 10000 },
};

export default function Page() {
    const [cash, setCash] = useState(200000);
    const [investments, setInvestments] = useState(500000);
    const [realEstate, setRealEstate] = useState(3000000);
    const [otherAssets, setOtherAssets] = useState(100000);

    const [homeLoan, setHomeLoan] = useState(1500000);
    const [carLoan, setCarLoan] = useState(200000);
    const [creditCardDebt, setCreditCardDebt] = useState(20000);
    const [otherLiabilities, setOtherLiabilities] = useState(50000);

    const { totalAssets, totalLiabilities, netWorth } = useMemo(() => {
        const assets = Number(cash) + Number(investments) + Number(realEstate) + Number(otherAssets);
        const liabilities = Number(homeLoan) + Number(carLoan) + Number(creditCardDebt) + Number(otherLiabilities);
        return { totalAssets: assets, totalLiabilities: liabilities, netWorth: assets - liabilities };
    }, [cash, investments, realEstate, otherAssets, homeLoan, carLoan, creditCardDebt, otherLiabilities]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>Net Worth Calculator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Assets</p>
                </div>
                <FieldWithSlider label="Cash & Bank Balance" prefix="₹" value={cash} onChange={setCash} limits={LIMITS.val} />
                <FieldWithSlider label="Investments (Stocks, MF, FD, etc.)" prefix="₹" value={investments} onChange={setInvestments} limits={LIMITS.val} />
                <FieldWithSlider label="Real Estate Value" prefix="₹" value={realEstate} onChange={setRealEstate} limits={LIMITS.val} />
                <FieldWithSlider label="Other Assets (Gold, Vehicle, etc.)" prefix="₹" value={otherAssets} onChange={setOtherAssets} limits={LIMITS.val} />

                <div className="ig-category">
                    <p className="ig-category-label">Liabilities</p>
                </div>
                <FieldWithSlider label="Home Loan Outstanding" prefix="₹" value={homeLoan} onChange={setHomeLoan} limits={LIMITS.val} />
                <FieldWithSlider label="Car Loan Outstanding" prefix="₹" value={carLoan} onChange={setCarLoan} limits={LIMITS.val} />
                <FieldWithSlider label="Credit Card Debt" prefix="₹" value={creditCardDebt} onChange={setCreditCardDebt} limits={LIMITS.val} />
                <FieldWithSlider label="Other Liabilities" prefix="₹" value={otherLiabilities} onChange={setOtherLiabilities} limits={LIMITS.val} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Total Assets: ₹{formatCurrency(totalAssets)}</div>
                        <div className="ig-item ig-result">Total Liabilities: ₹{formatCurrency(totalLiabilities)}</div>
                        <div className="ig-item ig-result ig-result-total">Net Worth: ₹{formatCurrency(netWorth)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Net worth = Total assets − Total liabilities. Use current market values for
                    investments and real estate for the most accurate snapshot. Recalculate periodically to track progress.
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