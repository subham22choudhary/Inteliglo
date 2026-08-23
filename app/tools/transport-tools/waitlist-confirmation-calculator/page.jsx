"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateProbability(currentWLPosition, quotaType, daysBeforeJourney, trainPopularity) {
    // Heuristic model — not official IRCTC data, just a rough estimate based on common patterns
    let baseConfirmationRate;
    if (quotaType === "general") baseConfirmationRate = 0.7;
    else if (quotaType === "tatkal") baseConfirmationRate = 0.4;
    else baseConfirmationRate = 0.55; // premium tatkal / other

    const popularityFactor = trainPopularity === "high" ? 0.7 : trainPopularity === "medium" ? 1 : 1.3;
    const positionFactor = Math.max(1 - currentWLPosition / 100, 0.05);
    const timeFactor = Math.min(1 + daysBeforeJourney / 60, 1.5);

    let probability = baseConfirmationRate * popularityFactor * positionFactor * timeFactor * 100;
    probability = Math.min(Math.max(probability, 2), 97);

    let verdict;
    if (probability >= 75) verdict = "High chance of confirmation";
    else if (probability >= 45) verdict = "Moderate chance — keep checking";
    else verdict = "Low chance — consider alternate options";

    return { probability, verdict };
}

const LIMITS = {
    wlPosition: { min: 1, max: 300, step: 1 },
    daysBeforeJourney: { min: 0, max: 60, step: 1 },
};

export default function Page() {
    const [currentWLPosition, setCurrentWLPosition] = useState(25);
    const [quotaType, setQuotaType] = useState("general");
    const [daysBeforeJourney, setDaysBeforeJourney] = useState(10);
    const [trainPopularity, setTrainPopularity] = useState("medium");

    const { probability, verdict } = useMemo(() => {
        const p = Number(currentWLPosition) || 1;
        const d = Number(daysBeforeJourney) || 0;
        return calculateProbability(p, quotaType, d, trainPopularity);
    }, [currentWLPosition, quotaType, daysBeforeJourney, trainPopularity]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Transport" />
                <h1 style={{ textAlign: "center" }}>Waiting List Confirmation Probability</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Quota Type</p>
                    <div className="ig-list" style={{ display: "flex", gap: 8, gridTemplateColumns: "unset" }}>
                        <button className={`ig-item ig-metal-btn${quotaType === "general" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setQuotaType("general")}>General</button>
                        <button className={`ig-item ig-metal-btn${quotaType === "tatkal" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setQuotaType("tatkal")}>Tatkal</button>
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Train Popularity / Route Demand</p>
                    <div className="ig-list" style={{ display: "flex", gap: 8, gridTemplateColumns: "unset" }}>
                        <button className={`ig-item ig-metal-btn${trainPopularity === "low" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setTrainPopularity("low")}>Low</button>
                        <button className={`ig-item ig-metal-btn${trainPopularity === "medium" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setTrainPopularity("medium")}>Medium</button>
                        <button className={`ig-item ig-metal-btn${trainPopularity === "high" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setTrainPopularity("high")}>High (festival/holiday route)</button>
                    </div>
                </div>

                <FieldWithSlider label="Current Waiting List Position" value={currentWLPosition} onChange={setCurrentWLPosition} limits={LIMITS.wlPosition} />
                <FieldWithSlider label="Days Before Journey" suffix="days" value={daysBeforeJourney} onChange={setDaysBeforeJourney} limits={LIMITS.daysBeforeJourney} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result ig-result-total">Estimated Confirmation Probability: {probability.toFixed(0)}%</div>
                        <div className="ig-item ig-result">{verdict}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    This is a rough heuristic estimate, NOT based on official IRCTC/Railways data or
                    algorithms. Actual confirmation depends on real-time cancellations, RAC movement,
                    and quota-specific factors that vary train to train. Use IRCTC's official prediction feature for accurate estimates.
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