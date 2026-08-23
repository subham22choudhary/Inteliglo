"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateOvulation(lmpDateStr, cycleLength) {
    const lmpDate = new Date(lmpDateStr);
    if (isNaN(lmpDate.getTime())) return null;

    const ovulationDay = cycleLength - 14; // luteal phase is typically 14 days
    const ovulationDate = new Date(lmpDate);
    ovulationDate.setDate(ovulationDate.getDate() + ovulationDay);

    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 5);

    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(fertileEnd.getDate() + 1);

    const nextPeriod = new Date(lmpDate);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

    return { ovulationDate, fertileStart, fertileEnd, nextPeriod };
}

function formatDate(date) {
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

const LIMITS = {
    cycleLength: { min: 21, max: 35, step: 1 },
};

export default function Page() {
    const [lmpDate, setLmpDate] = useState("");
    const [cycleLength, setCycleLength] = useState(28);

    const result = useMemo(() => {
        const c = Number(cycleLength) || 28;
        return calculateOvulation(lmpDate, c);
    }, [lmpDate, cycleLength]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Health" />
                <h1 style={{ textAlign: "center" }}>Ovulation Calculator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">First Day of Last Period</p>
                    <input
                        className="ig-input"
                        type="date"
                        style={{ width: "100%", padding: "10px 12px" }}
                        value={lmpDate}
                        onChange={(e) => setLmpDate(e.target.value)}
                        max={new Date().toISOString().split("T")[0]}
                    />
                </div>

                <FieldWithSlider label="Average Cycle Length" suffix="days" value={cycleLength} onChange={setCycleLength} limits={LIMITS.cycleLength} />

                {result ? (
                    <div className="ig-category">
                        <p className="ig-category-label">Results</p>
                        <div className="ig-list">
                            <div className="ig-item ig-result ig-result-total">Estimated Ovulation Date: {formatDate(result.ovulationDate)}</div>
                            <div className="ig-item ig-result">Fertile Window: {formatDate(result.fertileStart)} – {formatDate(result.fertileEnd)}</div>
                            <div className="ig-item ig-result">Next Expected Period: {formatDate(result.nextPeriod)}</div>
                        </div>
                    </div>
                ) : (
                    <div className="ig-category">
                        <p className="ig-category-label">Results</p>
                        <div className="ig-list">
                            <div className="ig-item ig-result">Select the first day of your last period to calculate.</div>
                        </div>
                    </div>
                )}

                <p style={disclaimerStyle}>
                    Assumes a consistent cycle length and standard 14-day luteal phase — actual ovulation
                    timing varies, especially with irregular cycles. For accurate fertility tracking,
                    consider ovulation predictor kits (OPK) or consult a gynecologist.
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