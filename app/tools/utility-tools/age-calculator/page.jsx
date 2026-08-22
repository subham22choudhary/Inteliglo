"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["UTILITY"],
};

function calculateAge(birthDateStr) {
    const birthDate = new Date(birthDateStr);
    const today = new Date();

    if (isNaN(birthDate.getTime()) || birthDate > today) {
        return null;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months -= 1;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);
    const daysToNextBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays, totalWeeks, totalMonths, daysToNextBirthday };
}

export default function Page() {
    const [birthDate, setBirthDate] = useState("2000-01-01");

    const result = useMemo(() => calculateAge(birthDate), [birthDate]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>Age Calculator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Date of Birth</p>
                    <input className="ig-input" type="date" style={{ width: "100%", padding: "10px 12px" }} value={birthDate} onChange={(e) => setBirthDate(e.target.value)} max={new Date().toISOString().split("T")[0]} />
                </div>

                {result ? (
                    <div className="ig-category">
                        <p className="ig-category-label">Results</p>
                        <div className="ig-list">
                            <div className="ig-item ig-result ig-result-total">Age: {result.years} years, {result.months} months, {result.days} days</div>
                            <div className="ig-item ig-result">Total Months: {result.totalMonths}</div>
                            <div className="ig-item ig-result">Total Weeks: {result.totalWeeks}</div>
                            <div className="ig-item ig-result">Total Days: {result.totalDays}</div>
                            <div className="ig-item ig-result">Days to Next Birthday: {result.daysToNextBirthday}</div>
                        </div>
                    </div>
                ) : (
                    <div className="ig-category">
                        <p className="ig-category-label">Results</p>
                        <div className="ig-list">
                            <div className="ig-item ig-result">Please enter a valid date of birth (not in the future).</div>
                        </div>
                    </div>
                )}

                <p style={disclaimerStyle}>
                    Calculates exact age based on today's date, including months, days, and weeks
                    since birth. Useful for eligibility checks, form filling, or curiosity.
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