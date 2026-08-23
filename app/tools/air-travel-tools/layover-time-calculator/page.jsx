"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function calculateLayover(arrivalTime, departureTime) {
    const [ah, am] = arrivalTime.split(":").map(Number);
    const [dh, dm] = departureTime.split(":").map(Number);

    let arrivalMinutes = ah * 60 + am;
    let departureMinutes = dh * 60 + dm;

    if (departureMinutes < arrivalMinutes) {
        departureMinutes += 24 * 60; // next day
    }

    const layoverMinutes = departureMinutes - arrivalMinutes;
    const hours = Math.floor(layoverMinutes / 60);
    const minutes = layoverMinutes % 60;

    let verdict;
    if (layoverMinutes < 45) verdict = "⚠️ Very tight — risky for international connections";
    else if (layoverMinutes < 90) verdict = "Tight — rush through, especially with baggage/immigration";
    else if (layoverMinutes < 180) verdict = "Comfortable — enough buffer for most connections";
    else if (layoverMinutes < 360) verdict = "Long layover — time to relax at the airport";
    else verdict = "Very long layover — consider a short city visit if visa allows";

    return { hours, minutes, layoverMinutes, verdict };
}

export default function Page() {
    const [arrivalTime, setArrivalTime] = useState("14:30");
    const [departureTime, setDepartureTime] = useState("17:15");

    const { hours, minutes, verdict } = useMemo(() => {
        return calculateLayover(arrivalTime, departureTime);
    }, [arrivalTime, departureTime]);

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Air Travel" />
                <h1 style={{ textAlign: "center" }}>Layover Time Calculator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Arrival Time (Connecting Flight)</p>
                    <input className="ig-input" type="time" style={{ width: "100%", padding: "10px 12px" }} value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} />
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Departure Time (Next Flight)</p>
                    <input className="ig-input" type="time" style={{ width: "100%", padding: "10px 12px" }} value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} />
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>
                    <div className="ig-list">
                        <div className="ig-item ig-result ig-result-total">Layover Duration: {hours}h {minutes}m</div>
                        <div className="ig-item ig-result">{verdict}</div>
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    General guidance only. Actual minimum connection time (MCT) depends on the airport,
                    whether it's a domestic-domestic, domestic-international, or international-international
                    connection, and whether you need to re-check baggage or clear immigration/security again.
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