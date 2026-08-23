"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

const GST_RATES = [
    { key: "5", label: "5%", rate: 5 },
    { key: "12", label: "12%", rate: 12 },
    { key: "18", label: "18%", rate: 18 },
    { key: "28", label: "28%", rate: 28 },
];

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

const LIMITS = { amount: { min: 0, max: 10000000, step: 100 } };

export default function Page() {
    const [mode, setMode] = useState("add"); // add | remove
    const [amount, setAmount] = useState(10000);
    const [gstRate, setGstRate] = useState("18");
    const [customRate, setCustomRate] = useState("");

    const rate = customRate !== "" ? Number(customRate) : Number(gstRate);

    const result = useMemo(() => {
        const amt = Number(amount) || 0;
        const r = Number(rate) || 0;

        if (mode === "add") {
            const gstAmount = (amt * r) / 100;
            const total = amt + gstAmount;
            const cgst = gstAmount / 2;
            const sgst = gstAmount / 2;
            return { baseAmount: amt, gstAmount, total, cgst, sgst };
        } else {
            const baseAmount = (amt * 100) / (100 + r);
            const gstAmount = amt - baseAmount;
            const cgst = gstAmount / 2;
            const sgst = gstAmount / 2;
            return { baseAmount, gstAmount, total: amt, cgst, sgst };
        }
    }, [amount, rate, mode]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Finance" />
                <h1 style={{ textAlign: "center" }}>GST Calculator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Calculation Type</p>
                    <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {[
                            { key: "add", label: "Add GST" },
                            { key: "remove", label: "Remove GST" },
                        ].map((m) => (
                            <button
                                key={m.key}
                                className="ig-item"
                                style={mode === m.key ? {} : { background: "transparent", color: "#f5f5f0", border: "1px solid #333" }}
                                onClick={() => setMode(m.key)}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>
                </div>

                <FieldWithSlider
                    label={mode === "add" ? "Amount (excluding GST)" : "Amount (including GST)"}
                    prefix="₹"
                    value={amount}
                    onChange={setAmount}
                    limits={LIMITS.amount}
                />

                <div className="ig-category">
                    <p className="ig-category-label">GST Rate</p>
                    <div className="ig-list" style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {GST_RATES.map((g) => (
                            <button
                                key={g.key}
                                className="ig-item"
                                style={
                                    gstRate === g.key && customRate === ""
                                        ? {}
                                        : { background: "transparent", color: "#f5f5f0", border: "1px solid #333" }
                                }
                                onClick={() => {
                                    setGstRate(g.key);
                                    setCustomRate("");
                                }}
                            >
                                {g.label}
                            </button>
                        ))}
                    </div>
                    <div className="ig-field" style={{ marginTop: 10, maxWidth: 200 }}>
                        <input
                            className="ig-input"
                            type="number"
                            min="0"
                            max="100"
                            placeholder="Custom rate"
                            value={customRate}
                            onChange={(e) => setCustomRate(e.target.value)}
                        />
                        <span className="ig-field-suffix">%</span>
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Base Amount: ₹{formatCurrency(result.baseAmount)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default" }}>
                            CGST ({(rate / 2).toFixed(2)}%): ₹{formatCurrency(result.cgst)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default" }}>
                            SGST ({(rate / 2).toFixed(2)}%): ₹{formatCurrency(result.sgst)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Total GST ({rate}%): ₹{formatCurrency(result.gstAmount)}
                        </div>
                        <div className="ig-item" style={{ cursor: "default" }}>
                            Total Amount: ₹{formatCurrency(result.total)}
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