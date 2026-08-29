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

const gayatriChalisa = {
    dohaStart: [
        "ह्रीं श्रीं क्लीं मेधा प्रभा जीवन ज्योति प्रचण्ड।",
        "शांति क्रांति जागृति प्रगति रचना शक्ति अखण्ड॥",
        "जगत जननी मंगल करनी गायत्री सुख धाम।",
        "प्रणवों सावित्री स्वधा स्वाहा पूरन काम॥",
    ],

    chaupai: [
        "भूर्भुवः स्वः ॐ युति जननी।",
        "गायत्री तनु कलिमल दहनी॥",

        "अक्षर चौबिस परम पुनीता।",
        "इनमें बसें शास्त्र श्रुति गीता॥",

        "शाश्वत सतोगुणी स्वरूपा।",
        "सत्य सनातन सुधा अनूपा॥",

        "हंसारूढ़ श्वेतांबर धारी।",
        "स्वर्ण कांति शुचि गगन बिहारी॥",

        "पुस्तक पुष्प कमण्डल माला।",
        "शुभ्रवर्ण तनु नयन विशाला॥",

        "ध्यान धरत पुलकित हिय होई।",
        "सुख उपजत दुःख दुर्मति खोई॥",

        "कामधेनु तुम सुरतरु छाया।",
        "निराकार की अद्भुत माया॥",

        "तुम्हरी शरण गहै जो कोई।",
        "तरै सकल संकट सों सोई॥",

        "सरस्वती लक्ष्मी तुम काली।",
        "दिपै तुम्हारी ज्योति निराली॥",

        "तुम्हरी महिमा पार न पावै।",
        "जो शरद शतमुख गुण गावै॥",

        "चार वेद की मातु पुनीता।",
        "तुम ब्रह्माणी गौरी सीता॥",

        "महामंत्र जितने जग माहीं।",
        "कोऊ गायत्री सम नाहीं॥",

        "सुमिरत हिय में ज्ञान प्रकासै।",
        "आलस पाप अविद्या नासै॥",

        "सृष्टि बीज जग जननि भवानी।",
        "कालरात्रि वरदा कल्याणी॥",

        "ब्रह्मा विष्णु रुद्र सुर जेते।",
        "तुम सों पावें सुरता तेते॥",

        "तुम भक्तन की भक्ति तुम्हारे।",
        "जननि हीं पुत्र प्राण ते प्यारे॥",

        "महिमा अपरंपार तुम्हारी।",
        "जय जय जय त्रिपदा भय हारी॥",

        "पूरित सकल ज्ञान विज्ञाना।",
        "तुम सम अधिक न जग में आना॥",

        "तुमहीं जानि कछु रहै न शेषा।",
        "तुमहीं पाए कछु रहै न क्लेशा॥",

        "जानत तुम्हहीं तुम्हीं ह्वै जाई।",
        "पारस परसि कुधातु सुहाई॥",

        "तुम्हरी शक्ति दैसि ठाई।",
        "माता तुम सब ठौर समाई॥",

        "ग्रह नक्षत्र ब्रह्माण्ड घनेरे।",
        "सब गतिवान तुम्हारे प्रेरे॥",

        "सकल सृष्टि की प्राण विधाता।",
        "पालक पोषक नाशक त्राता॥",

        "मातेश्वरी दया व्रत धारी।",
        "तुम सन तरे पातकी भारी॥",

        "जापर कृपा तुम्हारी होई।",
        "तापर कृपा करें सब कोई॥",

        "मंदबुद्धि ते बुद्धि बल पावें।",
        "रोगी रोग रहित ह्वै जावें॥",

        "दारिद्र मिटै कटै सब पीरा।",
        "नाशै दुःख हरै भव भीरा॥",

        "ग्रह क्लेश चित चिंता भारी।",
        "नासै गायत्री भय हारी॥",

        "संतति हीन सुसंतति पावें।",
        "सुख संपत्ति युत मोद मनावें॥",

        "भूत पिशाच सब भय खावें।",
        "यम के दूत निकट नहिं आवें॥",

        "जो सधवा सुमिरें चित लाई।",
        "अक्षत सुहाग सदा सुखदाई॥",

        "घर वर सुख प्रद लहैं कुमारी।",
        "विधवा रहें सत्य व्रत धारी॥",

        "जयति जयति जगदंब भवानी।",
        "तुम सम और दयालु न दानी॥",

        "जो सद्गुरु सों दीक्षा पावें।",
        "सो साधन को सफल बनावें॥",

        "सुमिरन करें सुरुचि बड़भागी।",
        "लहैं मनोरथ गृहस्थ विरागी॥",

        "अष्ट सिद्धि नवनिधि की दाता।",
        "सब समर्थ गायत्री माता॥",

        "ऋषि मुनि यति तपस्वी योगी।",
        "आरत अरथी चिंतित भोगी॥",

        "जो जो शरण तुम्हारी आवें।",
        "सो सो मनवांछित फल पावें॥",

        "बल बुधि विद्या शील स्वभाऊ।",
        "धन वैभव यश तेज उछाऊ॥",

        "सकल बढ़ें उपजें सुख नाना।",
        "जो यह पाठ करै धरि ध्याना॥",
    ],

    dohaEnd: [
        "यह चालीसा भक्तियुत पाठ करें जो कोय।",
        "तापर कृपा प्रसन्नता गायत्री की होय॥",
    ],
};

export default function GayatriChalisaPage() {
    return (
        <main
            className={`${devanagari.variable} ${display.variable} gp-page`}
        >
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
                <Link href="/gods" className="gp-back">
                    <span>←</span>
                    <span>Back to collection</span>
                </Link>

                <div className="gp-mark">
                    <span className="gp-rule gp-rule--left" />
                    <span className="gp-om">ॐ</span>
                    <span className="gp-rule gp-rule--right" />
                </div>

                <p className="gp-eyebrow">श्री गायत्री चालीसा</p>

                <h1 className="gp-heading">गायत्री चालीसा</h1>

                <p className="gp-subtitle">
                    Gayatri Chalisa
                </p>

                <article className="gp-scripture">
                    {/* Opening Doha */}
                    <section className="gp-section">
                        <div className="gp-section-label">
                            <span />
                            <span>दोहा</span>
                            <span />
                        </div>

                        <div className="gp-doha">
                            {gayatriChalisa.dohaStart.map(
                                (line, index) => (
                                    <p key={index}>{line}</p>
                                )
                            )}
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
                            {gayatriChalisa.chaupai.map(
                                (line, index) => (
                                    <p
                                        key={index}
                                        className={
                                            index % 2 === 0
                                                ? "gp-line gp-line--first"
                                                : "gp-line gp-line--second"
                                        }
                                    >
                                        <span className="gp-line-number">
                                            {String(
                                                Math.floor(index / 2) + 1
                                            ).padStart(2, "0")}
                                        </span>

                                        <span>{line}</span>
                                    </p>
                                )
                            )}
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
                            {gayatriChalisa.dohaEnd.map(
                                (line, index) => (
                                    <p key={index}>{line}</p>
                                )
                            )}
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
                    transition: color 0.2s ease;
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