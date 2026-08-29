import { Noto_Serif_Devanagari, Cormorant_Garamond } from "next/font/google";

const devanagari = Noto_Serif_Devanagari({
    subsets: ["devanagari"],
    weight: ["500", "600"],
    variable: "--font-devanagari",
});

const display = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500"],
    style: ["italic", "normal"],
    variable: "--font-display",
});

const verses = [
    ["जय हनुमन्त सन्त हितकारी।", "सुन लीजै प्रभु अरज हमारी॥"],
    ["जन के काज विलम्ब न कीजै।", "आतुर दौरि महासुख दीजै॥"],
    ["जैसे कूदि सिन्धु वहि पारा।", "सुरसा बदन पैठि विस्तारा॥"],
    ["आगे जाय लंकिनी रोका।", "मारेहु लात गई सुरलोका॥"],
    ["जाय विभीषण को सुख दीन्हा।", "सीता निरखि परम पद लीन्हा॥"],
    ["बाग उजारि सिन्धु महँ बोरा।", "अति आतुर यम कातर तोरा॥"],
    ["अक्षय कुमार को मारि संहारा।", "लूम लपेटि लंक को जारा॥"],
    ["लाह समान लंक जरि गई।", "जय जय धुनि सुरपुर में भई॥"],
    ["अब विलम्ब केहि कारण स्वामी।", "कृपा करहु प्रभु अन्तर्यामी॥"],
    ["जय जय लक्ष्मण प्राण के दाता।", "आतुर होइ दुःख करहु निपाता॥"],
    ["जय गिरिधर जय जय सुख सागर।", "सुर समूह समरथ भट नागर॥"],
    ["ॐ हनु-हनु-हनु हनुमन्त हठीले।", "बैरिहिं मारु बज्र सम कीले॥"],
    ["गदा बज्र तै बैरिहिं मारौ।", "महाराज निज दास उबारौ॥"],
    ["सुन हुंकार हुंकार दै धावो।", "बज्र गदा हनि विलम्ब न लावो॥"],
    ["ॐ ह्रीं ह्रीं ह्रीं हनुमन्त कपीसा।", "ॐ हुं हुं हुं हनु अरि उर शीसा॥"],
    ["सत्य होहु हरि सत्य पाय कै।", "राम दूत धरु मारु धाय कै॥"],
    ["जय हनुमन्त अनन्त अगाधा।", "दुःख पावत जन केहि अपराधा॥"],
    ["पूजा जप तप नेम अचारा।", "नहि जानत है दास तुम्हारा॥"],
    ["वन उपवन जल-थल गृह माहीं।", "तुम्हरे बल हम डरपत नाहीं॥"],
    ["पाँय परौं कर जोरि मनावौं।", "अपने काज लागि गुण गावौं॥"],
    ["जय अंजनी कुमार बलवंता।", "शंकर स्वयं वीर हनुमंता॥"],
    ["बदन कराल दुर्जन कुल घालक।", "भूत पिशाच प्रेत उर शालक॥"],
    ["भूत प्रेत पिशाच निशाचर।", "अग्नि बैताल वीर मारी मर॥"],
    ["इन्हहिं मारु, तोहिं शपथ राम की।", "राखु नाथ मर्यादा नाम की॥"],
    ["जनकसुता पति दास कहावौ।", "ताकी शपथ विलम्ब न लावौ॥"],
    ["जय जय जय ध्वनि होत अकाशा।", "सुमिरत होत सुसाहु दुःख नाशा॥"],
    ["उठु उठु चलु तोहि राम दुहाई।", "पाँय परौं कर जोरि मनाई॥"],
    ["ॐ चं चं चं चं चपल चलन्ता।", "ॐ हनु हनु हनु हनु हनुमंता॥"],
    ["ॐ हं हं हांक देत कपि चंचल।", "ॐ सं सं सहम पराने खल दल॥"],
    ["अपने जन को कस न उबारौ।", "सुमिरत होत आनन्द हमारौ॥"],
    ["ताते विनती करौं पुकारि।", "हरहु सकल दुःख विपति हमारी॥"],
    ["ऐसौ बल प्रभाव प्रभु तोरा।", "कस न हरहु दुःख संकट मोरा॥"],
    ["हे बजरंग, बाण सम धावौ।", "मेटहु सकल दुःख दरस दिखावौ॥"],
    ["नेक विलम्ब न काज कर ऐहु।", "अवसर चूक अन्त पछतैहु॥"],
    ["जन की लाज जात ऐहि बारा।", "धावहु नेक पवन कुमार॥"],
    ["जयति जयति जय जय हनुमाना।", "जयति जयति गुण ज्ञान निधाना॥"],
    ["जयति जयति जय कपिराई।", "जयति जयति जय सुखदाई॥"],
    ["जयति जयति जय राम पियारे।", "जयति जयति जय सिया दुलारे॥"],
    ["जयति जयति मुद मंगलदाता।", "जयति जयति त्रिभुवन विख्याता॥"],
    ["एहि प्रकार गावहिं गुण शेषा।", "पावत पार नहीं लवलेषा॥"],
    ["राम रूप सब धाम समाना।", "देखत रहत सदा हर्षाना॥"],
    ["विधि शारदा सहित दिन राती।", "गावत कपि के गुण बहु भाँति॥"],
    ["तुम सम नहि जगत बलवाना।", "करि विचार देखउँ विधि नाना॥"],
    ["यह जिय जानि शरण तब आई।", "ताते विनय करौं चित लाई॥"],
    ["सुनि कपि आरत वचन हमारे।", "मेटहु सकल दुःख भ्रम भारी॥"],
    ["एहि प्रकार विनती कपि केरी।", "जो जन करै लहै सुख ढेरी॥"],
    ["याके पढ़त वीर हनुमाना।", "धावत बाण तुल्य बनवाना॥"],
    ["मेटत आए दुःख क्षण माहीं।", "दै दरसन रघुपति ढिग जाहीं॥"],
    ["पाठ करै बजरंग बाण की।", "हनुमत रक्षा करै प्राण की॥"],
    ["डींह, मूँह, नोहादिक नासै।", "परकृत यंत्र मंत्र नहि त्रासै॥"],
    ["भैरवादि सुर करै समताई।", "आयु मान धरै सेवकाई॥"],
    ["प्रण कर पाठ करें मन लाई।", "अल्प-मृत्यु ग्रह दोष नसाई॥"],
    ["आवृत्ति ग्यारह प्रति दिन जापै।", "ताकी छाँह काल नहि चापै॥"],
    ["दै गूगल की धूप हमेशा।", "करै पाठ तजि समै कलेषा॥"],
    ["यह बजरंग बाण जेहि मारे।", "ताहि कहौ फिर कौन उबारे॥"],
    ["शत्रु समूह समतै सब आपै।", "देखत ताहि सुरासुर काँपै॥"],
    ["तेज प्रताप बुद्धि अधिकाई।", "रहै सदा कपिराज सहाई॥"],
];

export default function BajrangBaanPage() {
    return (
        <main className={`${devanagari.variable} ${display.variable} gp-page`}>
            <div className="gp-glow" aria-hidden />

            <svg aria-hidden viewBox="0 0 200 200" className="gp-motif gp-motif--top">
                <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
            <svg aria-hidden viewBox="0 0 200 200" className="gp-motif gp-motif--bottom">
                <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>

            <div className="gp-container">
                <div className="gp-mark">
                    <span className="gp-rule gp-rule--left" />
                    <span className="gp-om">ॐ</span>
                    <span className="gp-rule gp-rule--right" />
                </div>

                <p className="gp-eyebrow">श्री बजरंग बाण</p>
                <h1 className="gp-heading">बजरंग बाण</h1>

                <section className="gp-section">
                    <p className="gp-section-label">दोहा</p>
                    <div className="gp-doha">
                        <p className="gp-doha-line">निश्चय प्रेम प्रतीति ते, विनय करैं सन्मान।</p>
                        <p className="gp-doha-line">तेहि के कारज सकल शुभ, सिद्ध करैं हनुमान॥</p>
                    </div>
                </section>

                <section className="gp-section">
                    <p className="gp-section-label">पाठ</p>
                    <div className="gp-verses">
                        {verses.map((lines, i) => (
                            <p className="gp-verse" key={i}>
                                <span className="gp-verse-index">{i + 1}</span>
                                <span className="gp-verse-text">
                                    {lines[0]}
                                    <br />
                                    {lines[1]}
                                </span>
                            </p>
                        ))}
                    </div>
                </section>

                <section className="gp-section">
                    <p className="gp-section-label">दोहा</p>
                    <div className="gp-doha">
                        <p className="gp-doha-line">प्रेम प्रतीति हनुमत भजै। सदा धरैं उर ध्यान॥</p>
                        <p className="gp-doha-line">तेहि के कारज तुरत ही। सिद्ध करैं हनुमान॥</p>
                    </div>
                </section>

                <section className="gp-note">
                    <p className="gp-note-label">बजरंग बाण का महत्व</p>
                    <p className="gp-note-text">
                        बजरंग बाण भगवान हनुमान को समर्पित एक प्रसिद्ध स्तुति है।
                        श्रद्धा और भक्ति के साथ इसका पाठ किया जाता है।
                    </p>
                </section>

                <p className="gp-footer">॥ जय बजरंगबली ॥</p>
            </div>

            <style>{`
                .gp-page {
                    position: relative;
                    min-height: 100vh;
                    background: #1b120d;
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
                    max-width: 40rem;
                    margin: 0 auto;
                    padding: 6rem 1.5rem 5rem;
                }
                @media (min-width: 640px) {
                    .gp-container {
                        padding: 8rem 1.5rem 6rem;
                    }
                }

                .gp-mark {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }
                .gp-rule {
                    height: 1px;
                    width: 3rem;
                }
                .gp-rule--left {
                    background: linear-gradient(to right, transparent, rgba(217, 131, 36, 0.4));
                }
                .gp-rule--right {
                    background: linear-gradient(to left, transparent, rgba(217, 131, 36, 0.4));
                }
                .gp-om {
                    font-size: 1.5rem;
                    line-height: 1;
                    color: #e8a317;
                }

                .gp-eyebrow {
                    font-family: var(--font-display);
                    text-align: center;
                    font-size: 0.875rem;
                    font-style: italic;
                    letter-spacing: 0.3em;
                    color: rgba(201, 150, 44, 0.7);
                    margin: 0;
                }

                .gp-heading {
                    font-family: var(--font-devanagari);
                    text-align: center;
                    font-size: 2.5rem;
                    font-weight: 600;
                    color: #f5e6d3;
                    margin: 0.75rem 0 0;
                }
                @media (min-width: 640px) {
                    .gp-heading {
                        font-size: 3.25rem;
                    }
                }

                .gp-section {
                    margin-top: 3.5rem;
                }
                .gp-section-label {
                    font-family: var(--font-display);
                    text-align: center;
                    font-size: 0.75rem;
                    font-style: italic;
                    letter-spacing: 0.35em;
                    text-transform: uppercase;
                    color: rgba(217, 131, 36, 0.5);
                    margin: 0 0 1.5rem;
                }

                .gp-doha {
                    border-top: 1px solid rgba(217, 131, 36, 0.15);
                    border-bottom: 1px solid rgba(217, 131, 36, 0.15);
                    padding: 1.75rem 1rem;
                    text-align: center;
                }
                .gp-doha-line {
                    font-family: var(--font-devanagari);
                    font-size: 1.35rem;
                    line-height: 2;
                    color: #f2c572;
                    margin: 0;
                }

                .gp-verses {
                    display: flex;
                    flex-direction: column;
                }
                .gp-verse {
                    display: flex;
                    gap: 1.1rem;
                    padding: 1.1rem 0.25rem;
                    border-bottom: 1px solid rgba(217, 131, 36, 0.08);
                    margin: 0;
                }
                .gp-verse:last-child {
                    border-bottom: none;
                }
                .gp-verse-index {
                    flex-shrink: 0;
                    padding-top: 0.35rem;
                    font-family: var(--font-display);
                    font-size: 0.75rem;
                    font-variant-numeric: tabular-nums;
                    color: rgba(217, 131, 36, 0.4);
                }
                .gp-verse-text {
                    font-family: var(--font-devanagari);
                    font-size: 1.2rem;
                    line-height: 1.9;
                    color: #f5e6d3;
                }
                @media (min-width: 640px) {
                    .gp-verse-text {
                        font-size: 1.3rem;
                    }
                }

                .gp-note {
                    margin-top: 4rem;
                    padding-top: 2rem;
                    border-top: 1px solid rgba(217, 131, 36, 0.15);
                }
                .gp-note-label {
                    font-family: var(--font-devanagari);
                    font-size: 1.15rem;
                    font-weight: 600;
                    color: #f2c572;
                    margin: 0 0 0.75rem;
                }
                .gp-note-text {
                    font-family: var(--font-devanagari);
                    font-size: 1.05rem;
                    line-height: 1.9;
                    color: rgba(245, 230, 211, 0.75);
                    margin: 0;
                }

                .gp-footer {
                    font-family: var(--font-display);
                    text-align: center;
                    font-size: 0.75rem;
                    font-style: italic;
                    letter-spacing: 0.3em;
                    color: rgba(201, 150, 44, 0.35);
                    margin-top: 3.5rem;
                }
            `}</style>
        </main>
    );
}