"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateCGT(purchasePrice, salePrice, holdingMonths, assetType) {
    const gain = salePrice - purchasePrice;
    const isLongTerm = assetType === "equity" ? holdingMonths > 12 : holdingMonths > 24;

    let taxRate = 0;
    let exemption = 0;
    let taxableGain = gain;

    if (assetType === "equity") {
        if (isLongTerm) {
            taxRate = 12.5;
            exemption = 125000;
            taxableGain = Math.max(gain - exemption, 0);
        } else {
            taxRate = 20;
        }
    } else {
        // property / other assets
        taxRate = isLongTerm ? 12.5 : 30; // simplified slab assumption for STCG
    }

    const taxAmount = (taxableGain * taxRate) / 100;
    const netGain = gain - taxAmount;

    return { gain, isLongTerm, taxRate, taxableGain, taxAmount, netGain };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    purchasePrice: { min: 1000, max: 100000000, step: 1000 },
    salePrice: { min: 1000, max: 100000000, step: 1000 },
    holdingMonths: { min: 1, max: 360, step: 1 },
};

export default function Page() {
    const [assetType, setAssetType] = useState("equity");
    const [purchasePrice, setPurchasePrice] = useState(100000);
    const [salePrice, setSalePrice] = useState(150000);
    const [holdingMonths, setHoldingMonths] = useState(18);

    const { gain, isLongTerm, taxRate, taxableGain, taxAmount, netGain } = useMemo(() => {
        const p = Number(purchasePrice) || 0;
        const s = Number(salePrice) || 0;
        const h = Number(holdingMonths) || 1;
        return calculateCGT(p, s, h, assetType);
    }, [purchasePrice, salePrice, holdingMonths, assetType]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>Capital Gains Tax (CGT) Calculator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Asset Type</p>
                    <div className="ig-list" style={{ display: "flex", gap: 8, gridTemplateColumns: "unset" }}>
                        <button
                            className={`ig-item ig-metal-btn${assetType === "equity" ? " ig-metal-btn-active" : ""}`}
                            style={{ flex: 1 }}
                            onClick={() => setAssetType("equity")}
                        >
                            Equity / Mutual Fund
                        </button>
                        <button
                            className={`ig-item ig-metal-btn${assetType === "property" ? " ig-metal-btn-active" : ""}`}
                            style={{ flex: 1 }}
                            onClick={() => setAssetType("property")}
                        >
                            Property / Other
                        </button>
                    </div>
                </div>

                <FieldWithSlider label="Purchase Price" prefix="₹" value={purchasePrice} onChange={setPurchasePrice} limits={LIMITS.purchasePrice} />
                <FieldWithSlider label="Sale Price" prefix="₹" value={salePrice} onChange={setSalePrice} limits={LIMITS.salePrice} />
                <FieldWithSlider label="Holding Period" suffix="months" value={holdingMonths} onChange={setHoldingMonths} limits={LIMITS.holdingMonths} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Gain Type: {isLongTerm ? "Long-Term (LTCG)" : "Short-Term (STCG)"}</div>
                        <div className="ig-item ig-result">Total Gain: ₹{formatCurrency(gain)}</div>
                        <div className="ig-item ig-result">Applicable Tax Rate: {taxRate}%</div>
                        <div className="ig-item ig-result">Taxable Gain: ₹{formatCurrency(taxableGain)}</div>
                        <div className="ig-item ig-result">Tax Payable: ₹{formatCurrency(taxAmount)}</div>
                        <div className="ig-item ig-result ig-result-total">Net Gain After Tax: ₹{formatCurrency(netGain)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Simplified estimate based on current LTCG/STCG slabs (equity: 12.5% LTCG above ₹1.25L
                    exemption, 20% STCG; other assets: simplified slab assumption). Actual tax depends on
                    indexation benefits, income slab, and rules in effect at filing time. Consult a tax advisor.
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