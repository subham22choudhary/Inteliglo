"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

// Static approximate rates (relative to INR) — for reference only, not live rates
const CURRENCIES = {
    INR: { label: "Indian Rupee (₹)", rateToINR: 1 },
    USD: { label: "US Dollar ($)", rateToINR: 83 },
    EUR: { label: "Euro (€)", rateToINR: 90 },
    GBP: { label: "British Pound (£)", rateToINR: 105 },
    AED: { label: "UAE Dirham (AED)", rateToINR: 22.6 },
    SGD: { label: "Singapore Dollar (SGD)", rateToINR: 61 },
    THB: { label: "Thai Baht (THB)", rateToINR: 2.3 },
    JPY: { label: "Japanese Yen (¥)", rateToINR: 0.55 },
    AUD: { label: "Australian Dollar (AUD)", rateToINR: 54 },
};

function convertCurrency(amount, fromCurrency, toCurrency) {
    const amountInINR = amount * CURRENCIES[fromCurrency].rateToINR;
    const convertedAmount = amountInINR / CURRENCIES[toCurrency].rateToINR;
    return convertedAmount;
}

const LIMITS = {
    amount: { min: 1, max: 1000000, step: 1 },
};

export default function Page() {
    const [amount, setAmount] = useState(1000);
    const [fromCurrency, setFromCurrency] = useState("INR");
    const [toCurrency, setToCurrency] = useState("USD");

    const convertedAmount = useMemo(() => {
        const a = Number(amount) || 0;
        return convertCurrency(a, fromCurrency, toCurrency);
    }, [amount, fromCurrency, toCurrency]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Air Travel" />
                <h1 style={{ textAlign: "center" }}>Currency Converter</h1>

                <div className="ig-category">
                    <p className="ig-category-label">From</p>
                    <select className="ig-input" style={{ width: "100%", padding: "10px 12px" }} value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                        {Object.entries(CURRENCIES).map(([key, c]) => (
                            <option key={key} value={key}>{c.label}</option>
                        ))}
                    </select>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Amount</p>
                    <input className="ig-input" type="number" style={{ width: "100%", padding: "10px 12px" }} value={amount} onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))} />
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">To</p>
                    <select className="ig-input" style={{ width: "100%", padding: "10px 12px" }} value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                        {Object.entries(CURRENCIES).map(([key, c]) => (
                            <option key={key} value={key}>{c.label}</option>
                        ))}
                    </select>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Result</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result ig-result-total">
                            {amount || 0} {fromCurrency} = {convertedAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })} {toCurrency}
                        </div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Uses static approximate exchange rates for reference — NOT live market rates.
                    Actual forex rates fluctuate constantly and bank/card conversion rates typically
                    include a markup. Check live rates before traveling or transacting.
                </p>
            </div>
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