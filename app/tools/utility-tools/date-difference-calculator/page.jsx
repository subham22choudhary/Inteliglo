"use client";

import { useState, useMemo } from "react";

export const meta = {
    tags: ["UTILITY"],
};

function calculateDateDiff(startDateStr, endDateStr) {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

    const earlier = start < end ? start : end;
    const later = start < end ? end : start;

    let years = later.getFullYear() - earlier.getFullYear();
    let months = later.getMonth() - earlier.getMonth();
    let days = later.getDate() - earlier.getDate();

    if (days < 0) {
        months -= 1;
        const lastMonth = new Date(later.getFullYear(), later.getMonth(), 0);
        days += lastMonth.getDate();
    }
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    const totalDays = Math.floor((later - earlier) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const workingDays = estimateWorkingDays(earlier, later);

    return { years, months, days, totalDays, totalWeeks, workingDays };
}

function estimateWorkingDays(start, end) {
    let count = 0;
    const current = new Date(start);
    while (current <= end) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) count++;
        current.setDate(current.getDate() + 1);
    }
    return count;
}

export default function Page() {
    const [startDate, setStartDate] = useState("2025-01-01");
    const [endDate, setEndDate] = useState("2026-08-22");

    const result = useMemo(() => calculateDateDiff(startDate, endDate), [startDate, endDate]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>Date Difference Calculator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Start Date</p>
                    <input className="ig-input" type="date" style={{ width: "100%", padding: "10px 12px" }} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">End Date</p>
                    <input className="ig-input" type="date" style={{ width: "100%", padding: "10px 12px" }} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>

                {result ? (
                    <div className="ig-category">
                        <p className="ig-category-label">Results</p>
                        <div className="ig-list">
                            <div className="ig-item ig-result ig-result-total">{result.years} years, {result.months} months, {result.days} days</div>
                            <div className="ig-item ig-result">Total Days: {result.totalDays}</div>
                            <div className="ig-item ig-result">Total Weeks: {result.totalWeeks}</div>
                            <div className="ig-item ig-result">Approx. Working Days (Mon-Fri): {result.workingDays}</div>
                        </div>
                    </div>
                ) : (
                    <div className="ig-category">
                        <p className="ig-category-label">Results</p>
                        <div className="ig-list">
                            <div className="ig-item ig-result">Please enter valid dates.</div>
                        </div>
                    </div>
                )}

                <p style={disclaimerStyle}>
                    Working days calculation excludes only weekends (Saturday, Sunday) — it doesn't
                    account for public holidays, which vary by country/state.
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