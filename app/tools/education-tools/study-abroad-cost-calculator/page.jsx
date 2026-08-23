"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

const COUNTRY_DATA = {
    usa: { label: "USA", tuitionUSD: 35000, livingUSD: 15000, currencyRate: 83 },
    uk: { label: "United Kingdom", tuitionUSD: 25000, livingUSD: 13000, currencyRate: 83 },
    canada: { label: "Canada", tuitionUSD: 20000, livingUSD: 12000, currencyRate: 83 },
    australia: { label: "Australia", tuitionUSD: 22000, livingUSD: 14000, currencyRate: 83 },
    germany: { label: "Germany (Public Univ.)", tuitionUSD: 3000, livingUSD: 11000, currencyRate: 83 },
};

function calculateStudyAbroadCost(countryKey, years, otherOneTimeCostsINR) {
    const country = COUNTRY_DATA[countryKey];
    const tuitionPerYearINR = country.tuitionUSD * country.currencyRate;
    const livingPerYearINR = country.livingUSD * country.currencyRate;
    const totalTuition = tuitionPerYearINR * years;
    const totalLiving = livingPerYearINR * years;
    const totalCost = totalTuition + totalLiving + otherOneTimeCostsINR;

    return { tuitionPerYearINR, livingPerYearINR, totalTuition, totalLiving, totalCost };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    years: { min: 1, max: 5, step: 1 },
    otherCosts: { min: 0, max: 2000000, step: 25000 },
};

export default function Page() {
    const [countryKey, setCountryKey] = useState("usa");
    const [years, setYears] = useState(2);
    const [otherOneTimeCostsINR, setOtherOneTimeCostsINR] = useState(300000);

    const { tuitionPerYearINR, livingPerYearINR, totalTuition, totalLiving, totalCost } = useMemo(() => {
        const y = Number(years) || 1;
        const o = Number(otherOneTimeCostsINR) || 0;
        return calculateStudyAbroadCost(countryKey, y, o);
    }, [countryKey, years, otherOneTimeCostsINR]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Education" />
                <h1 style={{ textAlign: "center" }}>Study Abroad Cost Calculator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Destination</p>
                    <select className="ig-input" style={{ width: "100%", padding: "10px 12px" }} value={countryKey} onChange={(e) => setCountryKey(e.target.value)}>
                        {Object.entries(COUNTRY_DATA).map(([key, c]) => (
                            <option key={key} value={key}>{c.label}</option>
                        ))}
                    </select>
                </div>

                <FieldWithSlider label="Course Duration" suffix="years" value={years} onChange={setYears} limits={LIMITS.years} />
                <FieldWithSlider label="One-Time Costs (Visa, Flight, Insurance, etc.)" prefix="₹" value={otherOneTimeCostsINR} onChange={setOtherOneTimeCostsINR} limits={LIMITS.otherCosts} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Tuition per Year: ₹{formatCurrency(tuitionPerYearINR)}</div>
                        <div className="ig-item ig-result">Living Cost per Year: ₹{formatCurrency(livingPerYearINR)}</div>
                        <div className="ig-item ig-result">Total Tuition ({years} yrs): ₹{formatCurrency(totalTuition)}</div>
                        <div className="ig-item ig-result">Total Living Cost ({years} yrs): ₹{formatCurrency(totalLiving)}</div>
                        <div className="ig-item ig-result ig-result-total">Estimated Total Cost: ₹{formatCurrency(totalCost)}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Rough estimates using approximate average tuition/living costs and a static exchange
                    rate — actual costs vary hugely by specific university, city, and lifestyle. Currency
                    rates fluctuate. Use official university cost-of-attendance figures for accurate planning.
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