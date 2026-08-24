"use client";

import ToolCategory from "@/app/components/seo/ToolCategory";
import { useState, useMemo } from "react";

function buildWhatsAppLink(countryCode, phoneNumber, message) {
    const digitsOnly = `${countryCode}${phoneNumber}`.replace(/\D/g, "");
    const encodedMessage = message ? encodeURIComponent(message) : "";
    const link = encodedMessage
        ? `https://wa.me/${digitsOnly}?text=${encodedMessage}`
        : `https://wa.me/${digitsOnly}`;

    return { digitsOnly, link };
}

export default function Page() {
    const [countryCode, setCountryCode] = useState("91");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [copied, setCopied] = useState(false);

    const { digitsOnly, link } = useMemo(
        () => buildWhatsAppLink(countryCode, phoneNumber, message),
        [countryCode, phoneNumber, message]
    );

    const isValid = digitsOnly.length >= 8;

    const handleCopy = async () => {
        if (!isValid) return;
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div className="ig">
            <div className="ig-inner" style={{ maxWidth: 820, textAlign: "left" }}>
                <ToolCategory category="Utility" />
                <h1 style={{ textAlign: "center" }}>WhatsApp Number Link Generator</h1>

                <div className="ig-category">
                    <p className="ig-category-label">Phone Number</p>
                    <div style={{ display: "flex", gap: 8 }}>
                        <div className="ig-field" style={{ maxWidth: 100 }}>
                            <span className="ig-field-prefix">+</span>
                            <input
                                className="ig-input"
                                type="text"
                                inputMode="numeric"
                                placeholder="91"
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value.replace(/\D/g, ""))}
                            />
                        </div>
                        <div className="ig-field" style={{ flex: 1 }}>
                            <input
                                className="ig-input"
                                type="text"
                                inputMode="numeric"
                                placeholder="98765 43210"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                            />
                        </div>
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Prefilled Message (optional)</p>
                    <div className="ig-field">
                        <textarea
                            className="ig-input"
                            style={{ resize: "vertical", minHeight: 80, width: "100%" }}
                            placeholder="Hi! I'd like to know more about..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                </div>

                <div className="ig-category">
                    <p className="ig-category-label">Results</p>

                    <div
                        style={{
                            border: "1px solid #2a2a2a",
                            borderRadius: 10,
                            padding: "16px 18px",
                            background: "#141414",
                        }}
                    >
                        <div
                            style={{
                                fontFamily: "monospace",
                                fontSize: 14,
                                color: isValid ? "#e5e5e5" : "#777",
                                wordBreak: "break-all",
                                lineHeight: 1.5,
                            }}
                        >
                            {isValid ? link : "Enter a valid phone number to generate a link"}
                        </div>

                        {isValid ? (
                            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                                <button
                                    onClick={handleCopy}
                                    style={{
                                        flex: 1,
                                        padding: "10px 16px",
                                        borderRadius: 8,
                                        border: "1px solid #333",
                                        background: copied ? "#1f2f1f" : "#1c1c1c",
                                        color: copied ? "#7cd97c" : "#e5e5e5",
                                        fontSize: 14,
                                        fontWeight: 500,
                                        cursor: "pointer",
                                        transition: "background 0.15s ease, color 0.15s ease",
                                    }}
                                >
                                    {copied ? "✓ Copied" : "Copy Link"}
                                </button>
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        flex: 1,
                                        padding: "10px 16px",
                                        borderRadius: 8,
                                        border: "none",
                                        background: "#25D366",
                                        color: "#0a0a0a",
                                        fontSize: 14,
                                        fontWeight: 600,
                                        textAlign: "center",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    Open in WhatsApp
                                </a>
                            </div>
                        ) : null}
                    </div>
                </div>

                <p style={disclaimerStyle}>
                    Enter the number with country code (no + or leading 0s needed) to generate a
                    direct wa.me link. Adding a message is optional — recipients can edit it before
                    sending. This tool doesn&apos;t store or send any data.
                </p>
            </div>
        </div >
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