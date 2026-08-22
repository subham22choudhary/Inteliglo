"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["REAL ESTATE"],
};

function calculateRentVsBuy(propertyPrice, downPaymentPercent, loanRate, loanTenure, monthlyRent, rentIncreasePercent, propertyAppreciationPercent, investmentReturnPercent, years) {
    const downPayment = (propertyPrice * downPaymentPercent) / 100;
    const loanAmount = propertyPrice - downPayment;
    const monthlyRate = loanRate / 12 / 100;
    const totalMonths = loanTenure * 12;
    const emi =
        monthlyRate === 0
            ? loanAmount / totalMonths
            : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const monthsToConsider = years * 12;
    const totalEMIPaid = emi * Math.min(monthsToConsider, totalMonths);
    const buyingCost = downPayment + totalEMIPaid;
    const propertyValueAtEnd = propertyPrice * Math.pow(1 + propertyAppreciationPercent / 100, years);
    const netBuyingCost = buyingCost - propertyValueAtEnd;

    // renting: pay rent, invest the down payment + EMI-rent difference
    let rentPaid = 0;
    let currentRent = monthlyRent;
    let investedCorpus = downPayment; // invest what would've been the down payment
    const monthlyInvestReturn = investmentReturnPercent / 12 / 100;

    for (let y = 0; y < years; y++) {
        for (let m = 0; m < 12; m++) {
            rentPaid += currentRent;
            const monthlySavings = Math.max(emi - currentRent, 0);
            investedCorpus += monthlySavings;
            investedCorpus += investedCorpus * monthlyInvestReturn;
        }
        currentRent += (currentRent * rentIncreasePercent) / 100;
    }

    const netRentingCost = rentPaid - investedCorpus;

    return { emi, netBuyingCost, propertyValueAtEnd, rentPaid, investedCorpus, netRentingCost };
}

function formatCurrency(num) {
    return num.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
}

const LIMITS = {
    propertyPrice: { min: 500000, max: 50000000, step: 100000 },
    downPaymentPercent: { min: 10, max: 50, step: 5 },
    loanRate: { min: 6, max: 12, step: 0.1 },
    loanTenure: { min: 5, max: 30, step: 1 },
    monthlyRent: { min: 3000, max: 200000, step: 1000 },
    rentIncrease: { min: 0, max: 15, step: 1 },
    appreciation: { min: 0, max: 15, step: 1 },
    investmentReturn: { min: 4, max: 15, step: 0.5 },
    years: { min: 1, max: 30, step: 1 },
};

export default function Page() {
    const [propertyPrice, setPropertyPrice] = useState(6000000);
    const [downPaymentPercent, setDownPaymentPercent] = useState(20);
    const [loanRate, setLoanRate] = useState(8.5);
    const [loanTenure, setLoanTenure] = useState(20);
    const [monthlyRent, setMonthlyRent] = useState(20000);
    const [rentIncreasePercent, setRentIncreasePercent] = useState(5);
    const [propertyAppreciationPercent, setPropertyAppreciationPercent] = useState(5);
    const [investmentReturnPercent, setInvestmentReturnPercent] = useState(10);
    const [years, setYears] = useState(10);

    const { emi, netBuyingCost, propertyValueAtEnd, rentPaid, investedCorpus, netRentingCost } = useMemo(() => {
        return calculateRentVsBuy(
            Number(propertyPrice) || 0,
            Number(downPaymentPercent) || 10,
            Number(loanRate) || 0,
            Number(loanTenure) || 1,
            Number(monthlyRent) || 0,
            Number(rentIncreasePercent) || 0,
            Number(propertyAppreciationPercent) || 0,
            Number(investmentReturnPercent) || 0,
            Number(years) || 1
        );
    }, [propertyPrice, downPaymentPercent, loanRate, loanTenure, monthlyRent, rentIncreasePercent, propertyAppreciationPercent, investmentReturnPercent, years]);

    const better = netBuyingCost < netRentingCost ? "Buying" : "Renting";

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Real Estate</p>
                <h1 style={{ textAlign: "center" }}>Rent vs Buy Calculator</h1>

                <FieldWithSlider label="Property Price" prefix="₹" value={propertyPrice} onChange={setPropertyPrice} limits={LIMITS.propertyPrice} />
                <FieldWithSlider label="Down Payment" suffix="%" value={downPaymentPercent} onChange={setDownPaymentPercent} limits={LIMITS.downPaymentPercent} />
                <FieldWithSlider label="Home Loan Interest Rate" suffix="%" value={loanRate} onChange={setLoanRate} limits={LIMITS.loanRate} />
                <FieldWithSlider label="Loan Tenure" suffix="years" value={loanTenure} onChange={setLoanTenure} limits={LIMITS.loanTenure} />
                <FieldWithSlider label="Current Monthly Rent (equivalent property)" prefix="₹" value={monthlyRent} onChange={setMonthlyRent} limits={LIMITS.monthlyRent} />
                <FieldWithSlider label="Annual Rent Increase" suffix="%" value={rentIncreasePercent} onChange={setRentIncreasePercent} limits={LIMITS.rentIncrease} />
                <FieldWithSlider label="Property Appreciation" suffix="% per year" value={propertyAppreciationPercent} onChange={setPropertyAppreciationPercent} limits={LIMITS.appreciation} />
                <FieldWithSlider label="Alternative Investment Return" suffix="%" value={investmentReturnPercent} onChange={setInvestmentReturnPercent} limits={LIMITS.investmentReturn} />
                <FieldWithSlider label="Comparison Period" suffix="years" value={years} onChange={setYears} limits={LIMITS.years} />

                <div className="ig-category">
                    <p className="ig-category-label">If You Buy</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Monthly EMI: ₹{formatCurrency(emi)}</div>
                        <div className="ig-item ig-result">Property Value at End: ₹{formatCurrency(propertyValueAtEnd)}</div>
                        <div className="ig-item ig-result">Net Cost of Buying: ₹{formatCurrency(netBuyingCost)}</div>
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">If You Rent & Invest the Difference</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result">Total Rent Paid: ₹{formatCurrency(rentPaid)}</div>
                        <div className="ig-item ig-result">Investment Corpus Built: ₹{formatCurrency(investedCorpus)}</div>
                        <div className="ig-item ig-result">Net Cost of Renting: ₹{formatCurrency(netRentingCost)}</div>
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Verdict</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result ig-result-total">{better} works out better over {years} years</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Assumes rent-EMI difference (if renting is cheaper) gets invested at the given
                    return rate. Doesn't account for maintenance, property tax, or emotional/lifestyle
                    value of owning. A simplified model — consult a financial advisor for major decisions.
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