"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function convertCGPA(cgpa, multiplier) {
    const percentage = cgpa * multiplier;
    return { percentage: Math.min(percentage, 100) };
}

const LIMITS = {
    cgpa: { min: 0, max: 10, step: 0.01 },
    multiplier: { min: 8.5, max: 10, step: 0.1 },
};

export default function Page() {
    const [cgpa, setCgpa] = useState(8.5);
    const [multiplier, setMultiplier] = useState(9.5);

    const { percentage } = useMemo(() => {
        const c = Number(cgpa) || 0;
        const m = Number(multiplier) || 9.5;
        return convertCGPA(c, m);
    }, [cgpa, multiplier]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Education" />
                <h1 style={{ textAlign: "center" }}>CGPA to Percentage Converter</h1>

                <FieldWithSlider label="CGPA (out of 10)" value={cgpa} onChange={setCgpa} limits={LIMITS.cgpa} />
                <FieldWithSlider label="Multiplier (as per your board/university)" value={multiplier} onChange={setMultiplier} limits={LIMITS.multiplier} />

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result ig-result-total">Equivalent Percentage: {percentage.toFixed(2)}%</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Formula: CGPA × multiplier. CBSE commonly uses 9.5 as the multiplier, but this
                    varies by board/university (some use 9.5, others 10). Confirm the exact multiplier
                    with your institution before using this for official purposes.
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