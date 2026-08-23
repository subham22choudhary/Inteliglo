"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateDueDate(lmpDateStr) {
    const lmpDate = new Date(lmpDateStr);
    if (isNaN(lmpDate.getTime())) return null;

    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280); // Naegele's rule: 280 days from LMP

    const today = new Date();
    const daysPregnant = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24));
    const weeksPregnant = Math.floor(daysPregnant / 7);
    const daysRemainder = daysPregnant % 7;

    const daysRemaining = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

    let trimester;
    if (weeksPregnant < 13) trimester = "First Trimester";
    else if (weeksPregnant < 27) trimester = "Second Trimester";
    else trimester = "Third Trimester";

    const conceptionDate = new Date(lmpDate);
    conceptionDate.setDate(conceptionDate.getDate() + 14);

    return { dueDate, weeksPregnant, daysRemainder, daysRemaining, trimester, conceptionDate, daysPregnant };
}

function formatDate(date) {
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function Page() {
    const [lmpDate, setLmpDate] = useState("");

    const result = useMemo(() => calculateDueDate(lmpDate), [lmpDate]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Health" />
                <h1 style={{ textAlign: "center" }}>Pregnancy Due Date Calculator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">First Day of Last Menstrual Period (LMP)</p>
                    <input
                        className="ig-input"
                        type="date"
                        style={{ width: "100%", padding: "10px 12px" }}
                        value={lmpDate}
                        onChange={(e) => setLmpDate(e.target.value)}
                        max={new Date().toISOString().split("T")[0]}
                    />
                </div>

                {result ? (
                    <div className="ig-category">
                        <p className="ig-category-label">Results</p>
                        <div className="ig-list">
                            <div className="ig-item ig-result ig-result-total">Estimated Due Date: {formatDate(result.dueDate)}</div>
                            <div className="ig-item ig-result">Current Progress: {result.weeksPregnant} weeks, {result.daysRemainder} days</div>
                            <div className="ig-item ig-result">Trimester: {result.trimester}</div>
                            <div className="ig-item ig-result">Estimated Conception Date: {formatDate(result.conceptionDate)}</div>
                            <div className="ig-item ig-result">{result.daysRemaining > 0 ? `${result.daysRemaining} days remaining` : "Due date has passed"}</div>
                        </div>
                    </div>
                ) : (
                    <div className="ig-category">
                        <p className="ig-category-label">Results</p>
                        <div className="ig-list">
                            <div className="ig-item ig-result">Select the first day of your last menstrual period to calculate.</div>
                        </div>
                    </div>
                )}

                <p style={disclaimerStyle}>
                    Uses Naegele's Rule (LMP + 280 days / 40 weeks), assuming a regular 28-day cycle.
                    Only about 5% of babies are born exactly on their due date — actual delivery can vary
                    by 1-2 weeks. Always confirm with an ultrasound and your doctor for accurate dating.
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