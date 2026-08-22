"use client";

import { useState, useMemo, useRef, useEffect } from "react";

export const meta = {
    tags: ["UTILITY"],
};

function calculateAge(birthDateStr) {
    const birthDate = new Date(birthDateStr);
    const today = new Date();

    if (isNaN(birthDate.getTime()) || birthDate > today) return null;

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

    let workingDays = 0;
    const current = new Date(earlier);
    while (current <= later) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) workingDays++;
        current.setDate(current.getDate() + 1);
    }

    return { years, months, days, totalDays, totalWeeks, workingDays };
}

const today = new Date().toISOString().split("T")[0];

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function toISO(y, m, d) {
    const mm = String(m + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    return `${y}-${mm}-${dd}`;
}

function parseISO(str) {
    if (!str) return null;
    const [y, m, d] = str.split("-").map(Number);
    if (!y || !m || !d) return null;
    return { y, m: m - 1, d };
}

/* Custom dark, stylish date picker — replaces the native <input type="date">
   so year navigation is a single dropdown jump instead of a slow spinner. */
function DateField({ label, value, onChange, max }) {
    const [open, setOpen] = useState(false);
    const parsed = parseISO(value) || parseISO(today);
    const [viewYear, setViewYear] = useState(parsed.y);
    const [viewMonth, setViewMonth] = useState(parsed.m);
    const wrapRef = useRef(null);

    useEffect(() => {
        const p = parseISO(value);
        if (p) {
            setViewYear(p.y);
            setViewMonth(p.m);
        }
    }, [value]);

    useEffect(() => {
        function onClickOutside(e) {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
        }
        if (open) document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, [open]);

    const maxParsed = max ? parseISO(max) : null;
    const maxDate = maxParsed ? new Date(maxParsed.y, maxParsed.m, maxParsed.d) : null;

    const currentYear = new Date().getFullYear();
    const yearRange = [];
    for (let y = currentYear + 10; y >= currentYear - 120; y--) yearRange.push(y);

    const firstOfMonth = new Date(viewYear, viewMonth, 1);
    const startWeekday = firstOfMonth.getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    const selected = parseISO(value);
    const isSelected = (d) =>
        selected && selected.y === viewYear && selected.m === viewMonth && d === selected.d;
    const isDisabled = (d) => maxDate && new Date(viewYear, viewMonth, d) > maxDate;
    const isToday = (d) => {
        const t = new Date();
        return t.getFullYear() === viewYear && t.getMonth() === viewMonth && d === t.getDate();
    };

    const displayLabel = selected
        ? `${MONTH_NAMES[selected.m].slice(0, 3)} ${selected.d}, ${selected.y}`
        : "Select date";

    const dark = {
        bg: "#0b1120",
        panel: "#131b2e",
        border: "#2a3550",
        accent: "#6366f1",
        accentSoft: "rgba(99,102,241,0.18)",
        text: "#e5e9f5",
        subtext: "#8a93ac",
    };

    return (
        <div className="ig-category" ref={wrapRef} style={{ position: "relative" }}>
            <p className="ig-category-label">{label}</p>
            <div
                onClick={() => setOpen((o) => !o)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    width: "100%",
                    padding: "14px 16px",
                    border: `1px solid ${open ? dark.accent : dark.border}`,
                    borderRadius: 10,
                    boxShadow: open ? `0 0 0 3px ${dark.accentSoft}` : "0 1px 2px rgba(0,0,0,0.3)",
                    background: dark.bg,
                    cursor: "pointer",
                    transition: "border-color .15s, box-shadow .15s",
                }}
            >
                <span style={{ fontSize: 18, lineHeight: 1 }}>📅</span>
                <span
                    style={{
                        flex: 1,
                        fontSize: 16,
                        fontWeight: 600,
                        color: selected ? dark.text : dark.subtext,
                        fontFamily: "inherit",
                        letterSpacing: 0.2,
                    }}
                >
                    {displayLabel}
                </span>
                <span style={{ color: dark.subtext, fontSize: 12, transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" }}>
                    ▾
                </span>
            </div>

            {open && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        marginTop: 8,
                        width: 320,
                        maxWidth: "90vw",
                        background: dark.panel,
                        border: `1px solid ${dark.border}`,
                        borderRadius: 14,
                        boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
                        padding: 14,
                        zIndex: 50,
                    }}
                >
                    {/* Fast month/year jump — no more spinner scrolling */}
                    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                        <select
                            value={viewMonth}
                            onChange={(e) => setViewMonth(Number(e.target.value))}
                            style={{
                                flex: 1.4,
                                background: dark.bg,
                                color: dark.text,
                                border: `1px solid ${dark.border}`,
                                borderRadius: 8,
                                padding: "8px 6px",
                                fontSize: 14,
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                        >
                            {MONTH_NAMES.map((m, i) => (
                                <option key={m} value={i} style={{ background: dark.panel }}>
                                    {m}
                                </option>
                            ))}
                        </select>
                        <select
                            value={viewYear}
                            onChange={(e) => setViewYear(Number(e.target.value))}
                            style={{
                                flex: 1,
                                background: dark.bg,
                                color: dark.text,
                                border: `1px solid ${dark.border}`,
                                borderRadius: 8,
                                padding: "8px 6px",
                                fontSize: 14,
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                        >
                            {yearRange.map((y) => (
                                <option key={y} value={y} style={{ background: dark.panel }}>
                                    {y}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 4 }}>
                        {WEEKDAYS.map((w, i) => (
                            <div key={i} style={{ textAlign: "center", fontSize: 11, color: dark.subtext, fontWeight: 700, padding: "4px 0" }}>
                                {w}
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
                        {cells.map((d, i) => {
                            if (d === null) return <div key={i} />;
                            const disabled = isDisabled(d);
                            const sel = isSelected(d);
                            const isTod = isToday(d);
                            return (
                                <button
                                    key={i}
                                    disabled={disabled}
                                    onClick={() => {
                                        onChange(toISO(viewYear, viewMonth, d));
                                        setOpen(false);
                                    }}
                                    style={{
                                        aspectRatio: "1",
                                        border: sel ? `1px solid ${dark.accent}` : "1px solid transparent",
                                        borderRadius: 8,
                                        background: sel ? dark.accentSoft : "transparent",
                                        color: disabled ? "#4a5270" : sel ? "#c7d2fe" : dark.text,
                                        fontSize: 13,
                                        fontWeight: sel ? 700 : isTod ? 700 : 500,
                                        cursor: disabled ? "not-allowed" : "pointer",
                                        position: "relative",
                                    }}
                                >
                                    {d}
                                    {isTod && !sel && (
                                        <span
                                            style={{
                                                position: "absolute",
                                                bottom: 3,
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                width: 4,
                                                height: 4,
                                                borderRadius: "50%",
                                                background: dark.accent,
                                            }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => {
                            const t = new Date();
                            const iso = toISO(t.getFullYear(), t.getMonth(), t.getDate());
                            if (!maxDate || t <= maxDate) {
                                onChange(iso);
                                setOpen(false);
                            } else {
                                setViewYear(t.getFullYear());
                                setViewMonth(t.getMonth());
                            }
                        }}
                        style={{
                            marginTop: 12,
                            width: "100%",
                            padding: "8px 0",
                            background: "transparent",
                            border: `1px solid ${dark.border}`,
                            borderRadius: 8,
                            color: dark.accent,
                            fontSize: 13,
                            fontWeight: 700,
                            cursor: "pointer",
                        }}
                    >
                        Today
                    </button>
                </div>
            )}
        </div>
    );
}

export default function Page() {
    const [mode, setMode] = useState("age"); // "age" | "diff"

    const [birthDate, setBirthDate] = useState("2000-01-01");
    const ageResult = useMemo(() => calculateAge(birthDate), [birthDate]);

    const [startDate, setStartDate] = useState("2025-01-01");
    const [endDate, setEndDate] = useState(today);
    const diffResult = useMemo(() => calculateDateDiff(startDate, endDate), [startDate, endDate]);

    const highlightedOutputStyle = {
        padding: "16px",
        fontSize: 18,
        fontWeight: 700,
        border: "2px solid #22c55e",
        borderRadius: 10,
        boxShadow: "0 0 0 3px rgba(34,197,94,0.15)",
        background: "rgba(34,197,94,0.06)",
        color: "#16a34a",
    };

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <p className="ig-eyebrow" style={{ textAlign: "center" }}>Utility</p>
                <h1 style={{ textAlign: "center" }}>Age & Date Difference Calculator</h1>

                {/* MODE TOGGLE */}
                <div className="ig-category">
                    <div className="ig-list" style={{ display: "flex", gap: 8, gridTemplateColumns: "unset" }}>
                        <button className={`ig-item ig-metal-btn${mode === "age" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setMode("age")}>
                            Calculate Age
                        </button>
                        <button className={`ig-item ig-metal-btn${mode === "diff" ? " ig-metal-btn-active" : ""}`} style={{ flex: 1 }} onClick={() => setMode("diff")}>
                            Difference Between 2 Dates
                        </button>
                    </div>
                </div>

                {mode === "age" ? (
                    <>
                        <DateField label="Date of Birth" value={birthDate} onChange={setBirthDate} max={today} />

                        <div className="ig-category">
                            <p className="ig-category-label">Your Age</p>
                            {ageResult ? (
                                <div style={highlightedOutputStyle}>
                                    {ageResult.years} years, {ageResult.months} months, {ageResult.days} days
                                </div>
                            ) : (
                                <div style={highlightedOutputStyle}>Enter a valid date of birth</div>
                            )}
                        </div>

                        {ageResult && (
                            <div className="ig-category">
                                <p className="ig-category-label">More Details</p>
                                <div className="ig-list">
                                    <div className="ig-item ig-result">Total Months: {ageResult.totalMonths}</div>
                                    <div className="ig-item ig-result">Total Weeks: {ageResult.totalWeeks}</div>
                                    <div className="ig-item ig-result">Total Days: {ageResult.totalDays}</div>
                                    <div className="ig-item ig-result">Days to Next Birthday: {ageResult.daysToNextBirthday}</div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <DateField label="Start Date" value={startDate} onChange={setStartDate} />
                        <DateField label="End Date" value={endDate} onChange={setEndDate} />

                        <div className="ig-category">
                            <p className="ig-category-label">Difference</p>
                            {diffResult ? (
                                <div style={highlightedOutputStyle}>
                                    {diffResult.years} years, {diffResult.months} months, {diffResult.days} days
                                </div>
                            ) : (
                                <div style={highlightedOutputStyle}>Enter valid dates</div>
                            )}
                        </div>

                        {diffResult && (
                            <div className="ig-category">
                                <p className="ig-category-label">More Details</p>
                                <div className="ig-list">
                                    <div className="ig-item ig-result">Total Days: {diffResult.totalDays}</div>
                                    <div className="ig-item ig-result">Total Weeks: {diffResult.totalWeeks}</div>
                                    <div className="ig-item ig-result">Approx. Working Days (Mon–Fri): {diffResult.workingDays}</div>
                                </div>
                            </div>
                        )}
                    </>
                )}

                <p style={disclaimerStyle}>
                    Age is calculated based on today's date. Working days exclude only weekends
                    (Saturday, Sunday) — public holidays aren't accounted for, as they vary by country/state.
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