const stats = [
    { num: '150+', label: 'Projects Delivered' },
    { num: '50+', label: 'Global Clients' },
    { num: '14', label: 'Core Services' },
    { num: '3×', label: 'Avg. ROI Delivered' },
]

export default function Hero() {
    return (
        <section id="hero" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '120px 5vw 80px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Grid bg */}
            <div className="grid-bg" />

            {/* Glow blobs */}
            <div className="blob blob-sky" style={{ width: 600, height: 600, top: -150, left: -150 }} />
            <div className="blob blob-green" style={{ width: 600, height: 600, bottom: -100, right: -200 }} />

            {/* Scan line */}
            <div className="scan-line" />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto' }}>
                {/* Eyebrow */}
                <div className="anim-fadeup" style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'var(--sky)',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.8rem',
                }}>
                    <span style={{ width: 40, height: 1, background: 'var(--sky)', opacity: 0.6, display: 'inline-block' }} />
                    Digital Intelligence Redefined
                    <span style={{ width: 40, height: 1, background: 'var(--sky)', opacity: 0.6, display: 'inline-block' }} />
                </div>

                {/* Title */}
                <h1 className="anim-fadeup anim-delay-1" style={{
                    fontFamily: 'var(--font-orbitron)',
                    fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                    fontWeight: 900,
                    lineHeight: 1.08,
                    marginBottom: '1.5rem',
                }}>
                    <span style={{ color: 'var(--white)', display: 'block' }}>We Build Digital</span>
                    <span style={{
                        display: 'block',
                        background: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 70%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                        Ecosystems That Dominate
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="anim-fadeup anim-delay-2" style={{
                    fontSize: '1.05rem',
                    fontWeight: 300,
                    color: 'var(--muted)',
                    maxWidth: 600,
                    margin: '0 auto 3rem',
                    lineHeight: 1.7,
                }}>
                    Inteliglo is a full-spectrum digital company powering brands with cutting-edge
                    web development, AI-driven marketing, and enterprise-grade cybersecurity — all under one roof.
                </p>

                {/* Buttons */}
                <div className="anim-fadeup anim-delay-3" style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                }}>
                    <a
                        href="#services"
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.78rem',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            background: 'transparent',
                            color: 'var(--white)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            padding: '0.9rem 2.5rem',
                            cursor: 'pointer',
                            clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                            textDecoration: 'none',
                            display: 'inline-block',
                            transition: 'all 0.3s',
                        }}
                    >
                        Explore Services
                    </a>
                    <a
                        href="#contact"
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.78rem',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            background: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
                            color: 'var(--bg)',
                            border: 'none',
                            padding: '0.9rem 2.5rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                            textDecoration: 'none',
                            display: 'inline-block',
                            transition: 'all 0.3s',
                        }}
                    >
                        One month Free Trail
                    </a>
                </div>

                {/* Stats */}
                <div className="anim-fadeup anim-delay-3" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '4rem',
                    flexWrap: 'wrap',
                    marginTop: '5rem',
                    paddingTop: '3rem',
                    borderTop: '1px solid rgba(0,212,255,0.1)',
                }}>
                    {stats.map((s) => (
                        <div key={s.label} style={{ textAlign: 'center' }}>
                            <span style={{
                                fontFamily: 'var(--font-orbitron)',
                                fontSize: '2.2rem',
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                display: 'block',
                            }}>
                                {s.num}
                            </span>
                            <div style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.65rem',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'var(--muted)',
                                marginTop: '0.3rem',
                            }}>
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}