const hexItems = [
    'AI', 'UI', 'SEO', 'UX', 'CRO', 'API',
    'CMS', 'ADS', 'CDN', 'SSL', 'PWA', 'CRM',
    'JS', 'CSS', 'SQL', 'CI', 'ML', 'SEM',
    'KPI', 'CTR', 'UGC', 'CDP', 'DNS', 'SLA',
    'NLP', 'VPN', 'WAF', 'IDP', 'EDR', 'SIEM',
    'ROI', 'LLM', 'RAG', 'ETL', 'SDK', 'RPA',
]

const activeItems = ['AI', 'SEO', 'CRO', 'ADS', 'SSL', 'CRM', 'JS', 'SQL', 'ML', 'CTR', 'CDP', 'SLA', 'NLP', 'WAF', 'SIEM', 'LLM', 'RAG', 'ETL']

const features = [
    { title: 'End-to-End Ownership', desc: 'We handle everything from strategy to execution, so you ship faster without context-switching across vendors.' },
    { title: 'AI-First Approach', desc: 'Every service is augmented with AI tools and automations, giving you enterprise leverage at startup speed.' },
    { title: 'Data-Driven Decisions', desc: 'Campaigns and builds anchored in real analytics, not guesswork. Every move is measurable.' },
    { title: 'Security by Design', desc: 'Cybersecurity isn\'t an afterthought. We embed it across your digital product ecosystem from day one.' },
    { title: 'Transparent Collaboration', desc: 'Dedicated Slack channel, weekly reports, and direct access to your team lead — always.' },
]

export default function About() {
    return (
        <section id="about" style={{
            padding: '120px 5vw',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6rem',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div className="grid-bg" />

            {/* Visual column */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Hex grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gap: 6,
                }}>
                    {hexItems.map((item) => {
                        const isActive = activeItems.includes(item)
                        return (
                            <div
                                key={item}
                                style={{
                                    aspectRatio: '1',
                                    border: `1px solid ${isActive ? 'rgba(0,255,136,0.4)' : 'rgba(0,212,255,0.12)'}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.5rem',
                                    color: isActive ? 'var(--green)' : 'rgba(0,212,255,0.2)',
                                    background: isActive ? 'rgba(0,255,136,0.06)' : 'transparent',
                                    animation: `flicker ${3 + Math.random() * 3}s ease-in-out infinite`,
                                    transition: 'all 0.3s',
                                    cursor: 'default',
                                }}
                            >
                                {item}
                            </div>
                        )
                    })}
                </div>

                {/* Terminal box */}
                <div style={{
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid rgba(0,212,255,0.18)',
                    padding: '2rem 1.5rem 1.5rem',
                    marginTop: '1.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    lineHeight: 2,
                    color: 'var(--green)',
                    position: 'relative',
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '0.5rem',
                        left: '0.8rem',
                        fontSize: '0.5rem',
                        color: 'rgba(255,255,255,0.3)',
                        letterSpacing: '0.3em',
                    }}>
                        ● ● ●
                    </div>
                    <span style={{ color: 'var(--muted)' }}>$</span>{' '}
                    <span style={{ color: 'var(--sky)' }}>inteliglo</span> --run full-stack-audit
                    <br />
                    <span style={{ color: 'var(--muted)' }}>▸ Scanning digital footprint...</span>
                    <br />
                    <span style={{ color: 'var(--muted)' }}>▸ Analyzing competitors...</span>
                    <br />
                    ▸ Growth vectors identified:{' '}
                    <span style={{ color: 'var(--sky)' }}>7</span>
                    <br />
                    ▸ Status:{' '}
                    <span style={{ color: 'var(--green)' }}>READY TO SCALE ✓</span>
                </div>
            </div>

            {/* Text column */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                    color: 'var(--green)',
                    marginBottom: '1rem',
                }}>
          // Who We Are
                </div>

                <h2 style={{
                    fontFamily: 'var(--font-orbitron)',
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    color: 'var(--white)',
                }}>
                    Built for{' '}
                    <span style={{
                        background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                        Ambitious Brands
                    </span>
                </h2>

                <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--muted)',
                    lineHeight: 1.75,
                    marginBottom: '2.5rem',
                }}>
                    Inteliglo is not a typical company. We&apos;re a technology-forward digital growth partner —
                    combining deep technical expertise with creative intelligence to help brands scale faster,
                    smarter, and more securely in a hyper-competitive digital landscape.
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {features.map((f) => (
                        <li key={f.title} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '1rem',
                            fontSize: '0.9rem',
                            color: 'var(--muted)',
                            lineHeight: 1.5,
                        }}>
                            <span style={{
                                color: 'var(--sky)',
                                fontSize: '0.8rem',
                                flexShrink: 0,
                                marginTop: '0.1rem',
                            }}>
                                ▸
                            </span>
                            <span>
                                <strong style={{ color: 'var(--white)', fontWeight: 500 }}>{f.title}</strong>{' '}
                                — {f.desc}
                            </span>
                        </li>
                    ))}
                </ul>

                <div style={{ marginTop: '2.5rem' }}>
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
                        }}
                    >
                        Start a Project
                    </a>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          #about {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
        </section>
    )
}