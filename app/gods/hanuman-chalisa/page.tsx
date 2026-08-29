"use client";

import Link from "next/link";
import { Noto_Serif_Devanagari, Cormorant_Garamond } from "next/font/google";

const devanagari = Noto_Serif_Devanagari({
    subsets: ["devanagari"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-devanagari",
});

const display = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    style: ["italic", "normal"],
    variable: "--font-display",
});

const godsPages = [
    {
        title: "Bajrang Baan",
        hindiTitle: "बजरंग बाण",
        slug: "bajrang-baan",
    },
    {
        title: "Gayatri Chalisa",
        hindiTitle: "गायत्री चालीसा",
        slug: "gayatri-chalisa",
    },
    {
        title: "Hanuman Chalisa",
        hindiTitle: "हनुमान चालीसा",
        slug: "hanuman-chalisa",
    },
];

const hanumanChalisa = {
    dohaStart: [
        "श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि।",
        "बरनऊँ रघुबर बिमल जसु जो दायकु फल चारि॥",
        "बुद्धिहीन तनु जानिके, सुमिरौं पवन-कुमार।",
        "बल बुधि विद्या देहु मोहिं, हरहु कलेस बिकार॥",
    ],

    chaupai: [
        "जय हनुमान ज्ञान गुन सागर।",
        "जय कपीस तिहुँ लोक उजागर॥",

        "राम दूत अतुलित बल धामा।",
        "अंजनि-पुत्र पवनसुत नामा॥",

        "महाबीर बिक्रम बजरंगी।",
        "कुमति निवार सुमति के संगी॥",

        "कंचन बरन बिराज सुबेसा।",
        "कानन कुंडल कुंचित केसा॥",

        "हाथ बज्र औ ध्वजा बिराजै।",
        "काँधे मूँज जनेऊ साजै॥",

        "शंकर सुवन केसरी नंदन।",
        "तेज प्रताप महा जग वंदन॥",

        "विद्यावान गुनी अति चातुर।",
        "राम काज करिबे को आतुर॥",

        "प्रभु चरित्र सुनिबे को रसिया।",
        "राम लखन सीता मन बसिया॥",

        "सूक्ष्म रूप धरि सियहिं दिखावा।",
        "बिकट रूप धरि लंक जरावा॥",

        "भीम रूप धरि असुर सँहारे।",
        "रामचंद्र के काज सँवारे॥",

        "लाय सजीवन लखन जियाए।",
        "श्रीरघुबीर हरषि उर लाए॥",

        "रघुपति कीन्ही बहुत बड़ाई।",
        "तुम मम प्रिय भरतहि सम भाई॥",

        "सहस बदन तुम्हरो जस गावैं।",
        "अस कहि श्रीपति कंठ लगावैं॥",

        "सनकादिक ब्रह्मादि मुनीसा।",
        "नारद सारद सहित अहीसा॥",

        "जम कुबेर दिगपाल जहाँ ते।",
        "कबि कोबिद कहि सके कहाँ ते॥",

        "तुम उपकार सुग्रीवहिं कीन्हा।",
        "राम मिलाय राज पद दीन्हा॥",

        "तुम्हरो मंत्र बिभीषण माना।",
        "लंकेश्वर भए सब जग जाना॥",

        "जुग सहस्र योजन पर भानू।",
        "लील्यो ताहि मधुर फल जानू॥",

        "प्रभु मुद्रिका मेलि मुख माहीं।",
        "जलधि लाँघि गए अचरज नाहीं॥",

        "दुर्गम काज जगत के जेते।",
        "सुगम अनुग्रह तुम्हरे तेते॥",

        "राम दुआरे तुम रखवारे।",
        "होत न आज्ञा बिनु पैसारे॥",

        "सब सुख लहै तुम्हारी सरना।",
        "तुम रक्षक काहू को डरना॥",

        "आपन तेज सम्हारो आपै।",
        "तीनों लोक हाँक तें काँपै॥",

        "भूत पिशाच निकट नहिं आवै।",
        "महाबीर जब नाम सुनावै॥",

        "नासै रोग हरै सब पीरा।",
        "जपत निरंतर हनुमत बीरा॥",

        "संकट तें हनुमान छुड़ावै।",
        "मन क्रम बचन ध्यान जो लावै॥",

        "सब पर राम तपस्वी राजा।",
        "तिन के काज सकल तुम साजा॥",

        "और मनोरथ जो कोई लावै।",
        "सोइ अमित जीवन फल पावै॥",

        "चारों जुग परताप तुम्हारा।",
        "है परसिद्ध जगत उजियारा॥",

        "साधु संत के तुम रखवारे।",
        "असुर निकंदन राम दुलारे॥",

        "अष्ट सिद्धि नौ निधि के दाता।",
        "अस बर दीन जानकी माता॥",

        "राम रसायन तुम्हरे पासा।",
        "सदा रहो रघुपति के दासा॥",

        "तुम्हरे भजन राम को पावै।",
        "जनम जनम के दुख बिसरावै॥",

        "अंत काल रघुवर पुर जाई।",
        "जहाँ जन्म हरि-भक्त कहाई॥",

        "और देवता चित्त न धरई।",
        "हनुमत सेइ सर्व सुख करई॥",

        "संकट कटै मिटै सब पीरा।",
        "जो सुमिरै हनुमत बलबीरा॥",

        "जय जय जय हनुमान गोसाईं।",
        "कृपा करहु गुरुदेव की नाईं॥",

        "जो सत बार पाठ कर कोई।",
        "छूटहि बंदि महा सुख होई॥",

        "जो यह पढ़ै हनुमान चालीसा।",
        "होय सिद्धि साखी गौरीसा॥",

        "तुलसीदास सदा हरि चेरा।",
        "कीजै नाथ हृदय महँ डेरा॥",
    ],

    dohaEnd: [
        "पवनतनय संकट हरन, मंगल मूरति रूप।",
        "राम लखन सीता सहित, हृदय बसहु सुर भूप॥",
    ],
};

export default function GodsPage() {
    return (
        <main className={`${devanagari.variable} ${display.variable} gp-page`}>
            <div className="gp-glow" aria-hidden />

            <svg
                aria-hidden
                viewBox="0 0 200 200"
                className="gp-motif gp-motif--top"
            >
                <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                />
                <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                />
            </svg>

            <svg
                aria-hidden
                viewBox="0 0 200 200"
                className="gp-motif gp-motif--bottom"
            >
                <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                />
                <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                />
            </svg>

            <div className="gp-container">
                {/* Back */}
                <Link href="/gods" className="gp-back">
                    <span>←</span>
                    <span>Back to collection</span>
                </Link>

                {/* Header */}
                <div className="gp-mark">
                    <span className="gp-rule gp-rule--left" />
                    <span className="gp-om">ॐ</span>
                    <span className="gp-rule gp-rule--right" />
                </div>

                <p className="gp-eyebrow">श्री हनुमान चालीसा</p>

                <h1 className="gp-heading">हनुमान चालीसा</h1>

                <p className="gp-subtitle">
                    Hanuman Chalisa
                </p>

                {/* Main scripture */}
                <article className="gp-scripture">
                    {/* Opening Doha */}
                    <section className="gp-section">
                        <div className="gp-section-label">
                            <span />
                            <span>दोहा</span>
                            <span />
                        </div>

                        <div className="gp-doha">
                            {hanumanChalisa.dohaStart.map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </div>
                    </section>

                    {/* Chaupai */}
                    <section className="gp-section gp-chaupai-section">
                        <div className="gp-section-label">
                            <span />
                            <span>चौपाई</span>
                            <span />
                        </div>

                        <div className="gp-chaupai">
                            {hanumanChalisa.chaupai.map((line, index) => (
                                <p
                                    key={index}
                                    className={
                                        index % 2 === 0
                                            ? "gp-line gp-line--first"
                                            : "gp-line gp-line--second"
                                    }
                                >
                                    <span className="gp-line-number">
                                        {String(Math.floor(index / 2) + 1).padStart(
                                            2,
                                            "0"
                                        )}
                                    </span>

                                    <span>{line}</span>
                                </p>
                            ))}
                        </div>
                    </section>

                    {/* Closing Doha */}
                    <section className="gp-section gp-final-section">
                        <div className="gp-section-label">
                            <span />
                            <span>दोहा</span>
                            <span />
                        </div>

                        <div className="gp-doha">
                            {hanumanChalisa.dohaEnd.map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </div>
                    </section>
                </article>

                <div className="gp-divider">
                    <span>ॐ</span>
                </div>

                <p className="gp-footer">
                    ॥ शुभम् भवतु ॥
                </p>
            </div>

            <style>{`
                .gp-page {
                    position: relative;
                    min-height: 100vh;
                    background:
                        radial-gradient(
                            circle at 50% 0%,
                            rgba(232, 163, 23, 0.08),
                            transparent 35rem
                        ),
                        #1b120d;
                    overflow: hidden;
                }

                .gp-glow {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    width: 36rem;
                    height: 28rem;
                    transform: translate(-50%, -33%);
                    border-radius: 50%;
                    background: rgba(232, 163, 23, 0.08);
                    filter: blur(100px);
                    pointer-events: none;
                }

                .gp-motif {
                    position: absolute;
                    width: 10rem;
                    height: 10rem;
                    pointer-events: none;
                    color: rgba(217, 131, 36, 0.08);
                }

                .gp-motif--top {
                    top: -2.5rem;
                    left: -2.5rem;
                }

                .gp-motif--bottom {
                    bottom: -4rem;
                    right: -4rem;
                    width: 12rem;
                    height: 12rem;
                    color: rgba(217, 131, 36, 0.06);
                }

                .gp-container {
                    position: relative;
                    max-width: 48rem;
                    margin: 0 auto;
                    padding: 2rem 1.25rem 5rem;
                }

                @media (min-width: 640px) {
                    .gp-container {
                        padding: 3rem 1.5rem 7rem;
                    }
                }

                .gp-back {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: rgba(201, 150, 44, 0.6);
                    font-family: var(--font-display);
                    font-size: 0.9rem;
                    text-decoration: none;
                    transition:
                        color 0.2s ease,
                        transform 0.2s ease;
                }

                .gp-back:hover {
                    color: #f2c572;
                    transform: translateX(-0.2rem);
                }

                .gp-mark {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    margin: 3rem 0 1.75rem;
                }

                .gp-rule {
                    height: 1px;
                    width: 3rem;
                }

                .gp-rule--left {
                    background: linear-gradient(
                        to right,
                        transparent,
                        rgba(217, 131, 36, 0.4)
                    );
                }

                .gp-rule--right {
                    background: linear-gradient(
                        to left,
                        transparent,
                        rgba(217, 131, 36, 0.4)
                    );
                }

                .gp-om {
                    font-family: var(--font-devanagari);
                    font-size: 1.7rem;
                    line-height: 1;
                    color: #e8a317;
                }

                .gp-eyebrow {
                    font-family: var(--font-display);
                    text-align: center;
                    font-size: 0.9rem;
                    font-style: italic;
                    letter-spacing: 0.25em;
                    color: rgba(201, 150, 44, 0.7);
                    margin: 0;
                }

                .gp-heading {
                    font-family: var(--font-devanagari);
                    text-align: center;
                    font-size: 2.3rem;
                    font-weight: 600;
                    line-height: 1.35;
                    color: #f5e6d3;
                    margin: 0.6rem 0 0;
                }

                @media (min-width: 640px) {
                    .gp-heading {
                        font-size: 3rem;
                    }
                }

                .gp-subtitle {
                    font-family: var(--font-display);
                    text-align: center;
                    font-size: 1rem;
                    font-style: italic;
                    letter-spacing: 0.12em;
                    color: rgba(201, 150, 44, 0.45);
                    margin: 0.25rem 0 0;
                }

                .gp-scripture {
                    margin-top: 4rem;
                    padding: 2rem 1rem;
                    border-top: 1px solid rgba(217, 131, 36, 0.15);
                    border-bottom: 1px solid rgba(217, 131, 36, 0.15);
                }

                @media (min-width: 640px) {
                    .gp-scripture {
                        padding: 3rem 2rem;
                    }
                }

                .gp-section {
                    position: relative;
                }

                .gp-chaupai-section {
                    margin-top: 3.5rem;
                }

                .gp-final-section {
                    margin-top: 3.5rem;
                }

                .gp-section-label {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    margin-bottom: 1.75rem;
                    color: rgba(201, 150, 44, 0.65);
                    font-family: var(--font-devanagari);
                    font-size: 0.9rem;
                    letter-spacing: 0.12em;
                }

                .gp-section-label span:first-child,
                .gp-section-label span:last-child {
                    width: 2.5rem;
                    height: 1px;
                    background: rgba(217, 131, 36, 0.2);
                }

                .gp-doha {
                    text-align: center;
                    padding: 0.25rem 0;
                }

                .gp-doha p {
                    margin: 0.55rem 0;
                    font-family: var(--font-devanagari);
                    font-size: 1.15rem;
                    line-height: 2;
                    font-weight: 500;
                    color: #ead9c7;
                }

                @media (min-width: 640px) {
                    .gp-doha p {
                        font-size: 1.25rem;
                    }
                }

                .gp-chaupai {
                    border-top: 1px solid rgba(217, 131, 36, 0.08);
                }

                .gp-line {
                    position: relative;
                    display: grid;
                    grid-template-columns: 2rem 1fr;
                    align-items: baseline;
                    gap: 0.75rem;
                    margin: 0;
                    padding: 0.65rem 0;
                    font-family: var(--font-devanagari);
                    font-size: 1.08rem;
                    line-height: 1.9;
                    color: #ead9c7;
                }

                @media (min-width: 640px) {
                    .gp-line {
                        font-size: 1.18rem;
                    }
                }

                .gp-line--first {
                    padding-top: 1rem;
                }

                .gp-line--second {
                    padding-bottom: 1rem;
                }

                .gp-line-number {
                    font-family: var(--font-display);
                    font-size: 0.7rem;
                    color: rgba(217, 131, 36, 0.3);
                    text-align: right;
                    letter-spacing: 0.05em;
                }

                .gp-line:hover {
                    color: #f2c572;
                }

                .gp-divider {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    margin: 3rem 0 0;
                }

                .gp-divider::before,
                .gp-divider::after {
                    content: "";
                    display: block;
                    width: 4rem;
                    height: 1px;
                    background: rgba(217, 131, 36, 0.2);
                }

                .gp-divider span {
                    font-family: var(--font-devanagari);
                    font-size: 1rem;
                    color: rgba(232, 163, 23, 0.65);
                }

                .gp-footer {
                    font-family: var(--font-devanagari);
                    text-align: center;
                    font-size: 0.8rem;
                    letter-spacing: 0.2em;
                    color: rgba(201, 150, 44, 0.35);
                    margin-top: 1.5rem;
                }

                @media (max-width: 420px) {
                    .gp-scripture {
                        padding-left: 0.25rem;
                        padding-right: 0.25rem;
                    }

                    .gp-line {
                        grid-template-columns: 1.5rem 1fr;
                        gap: 0.5rem;
                        font-size: 1rem;
                    }

                    .gp-doha p {
                        font-size: 1.02rem;
                    }
                }
            `}</style>
        </main>
    );
}