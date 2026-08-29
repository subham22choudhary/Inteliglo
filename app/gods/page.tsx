import Link from "next/link";
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

const godsPages = [
    {
        title: "Hanuman Chalisa",
        hindiTitle: "हनुमान चालीसा",
        slug: "hanuman-chalisa",
    },
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

];

export default function GodsPage() {
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

                <p className="gp-eyebrow">a small collection of</p>
                <h1 className="gp-heading">स्तोत्र और चालीसा</h1>

                <div className="gp-list">
                    {godsPages.map((item, i) => (
                        <Link key={item.slug} href={`/gods/${item.slug}`} className="gp-row">
                            <span className="gp-row__bar" aria-hidden />
                            <div className="gp-row__main">
                                <span className="gp-row__index">{String(i + 1).padStart(2, "0")}</span>
                                <div>
                                    <h2 className="gp-row__hindi">{item.hindiTitle}</h2>
                                    <p className="gp-row__title">{item.title}</p>
                                </div>
                            </div>
                            <span className="gp-row__arrow" aria-hidden>
                                →
                            </span>
                        </Link>
                    ))}
                </div>

                <p className="gp-footer">॥ शुभम् भवतु ॥</p>
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
                    max-width: 42rem;
                    margin: 0 auto;
                    padding: 6rem 1.5rem;
                }
                @media (min-width: 640px) {
                    .gp-container {
                        padding: 8rem 1.5rem;
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
                    letter-spacing: 0.35em;
                    color: rgba(201, 150, 44, 0.7);
                    margin: 0;
                }

                .gp-heading {
                    font-family: var(--font-devanagari);
                    text-align: center;
                    font-size: 2.25rem;
                    font-weight: 600;
                    color: #f5e6d3;
                    margin: 0.75rem 0 0;
                }
                @media (min-width: 640px) {
                    .gp-heading {
                        font-size: 3rem;
                    }
                }

                .gp-list {
                    margin-top: 4rem;
                    border-top: 1px solid rgba(217, 131, 36, 0.15);
                }

                .gp-row {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1.5rem;
                    padding: 1.75rem 0.5rem;
                    border-bottom: 1px solid rgba(217, 131, 36, 0.15);
                    text-decoration: none;
                    transition: background 0.2s ease;
                }
                @media (min-width: 640px) {
                    .gp-row {
                        padding: 1.75rem 1rem;
                    }
                }
                .gp-row:hover {
                    background: linear-gradient(to right, rgba(217, 131, 36, 0.07), transparent);
                }

                .gp-row__bar {
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: 0;
                    background: #e8a317;
                    transition: width 0.3s ease;
                }
                .gp-row:hover .gp-row__bar {
                    width: 3px;
                }

                .gp-row__main {
                    display: flex;
                    align-items: baseline;
                    gap: 1.25rem;
                }

                .gp-row__index {
                    width: 1.25rem;
                    flex-shrink: 0;
                    font-size: 0.75rem;
                    font-variant-numeric: tabular-nums;
                    color: rgba(217, 131, 36, 0.4);
                }

                .gp-row__hindi {
                    font-family: var(--font-devanagari);
                    font-size: 1.5rem;
                    font-weight: 500;
                    color: #f5e6d3;
                    margin: 0;
                    transition: color 0.2s ease;
                }
                @media (min-width: 640px) {
                    .gp-row__hindi {
                        font-size: 1.7rem;
                    }
                }
                .gp-row:hover .gp-row__hindi {
                    color: #f2c572;
                }

                .gp-row__title {
                    font-family: var(--font-display);
                    font-size: 0.95rem;
                    font-style: italic;
                    letter-spacing: 0.02em;
                    color: rgba(201, 150, 44, 0.55);
                    margin: 0.25rem 0 0;
                }

                .gp-row__arrow {
                    flex-shrink: 0;
                    color: rgba(217, 131, 36, 0.3);
                    transition: transform 0.2s ease, color 0.2s ease;
                }
                .gp-row:hover .gp-row__arrow {
                    transform: translateX(0.25rem);
                    color: #f2c572;
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