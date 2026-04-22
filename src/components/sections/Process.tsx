'use client'

import { useState } from 'react'

const steps = [
    {
        num: '01',
        title: 'Discovery & Audit',
        desc: 'Deep-dive into your business goals, existing digital assets, competitor landscape, and target audience to map the opportunity.',
    },
    {
        num: '02',
        title: 'Strategy & Roadmap',
        desc: 'We architect a custom digital growth roadmap with prioritized initiatives, KPIs, timelines, and technology stack recommendations.',
    },
    {
        num: '03',
        title: 'Design & Build',
        desc: 'Our engineers and designers move fast — prototyping, iterating, and delivering production-grade work with pixel-perfect precision.',
    },
    {
        num: '04',
        title: 'Launch & Amplify',
        desc: 'We deploy, test, and activate campaigns simultaneously — ensuring maximum impact from day one with real-time performance monitoring.',
    },
    {
        num: '05',
        title: 'Optimize & Scale',
        desc: 'Continuous data analysis, A/B testing, and iterative improvements compound your results month over month — building unstoppable momentum.',
    },
]

export default function Process() {
    const [hoveredStep, setHoveredStep] = useState<string | null>(null)

    return (
        <section id="process" style={{
            padding: '120px 5vw',
            background: 'var(--bg2)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div className="grid-bg" style={{ opacity: 0.3 }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                    color: 'var(--green)',
                    marginBottom: '1rem',
                }}>
          // How We Work
                </div>

                <h2 style={{
                    fontFamily: 'var(--font-orbitron)',
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    color: 'var(--white)',
                }}>
                    Our{' '}
                    <span style={{
                        background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                        Execution Protocol
                    </span>
                </h2>

                <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--muted)',
                    maxWidth: 540,
                    lineHeight: 1.75,
                    marginBottom: '4rem',
                }}>
                    A proven, systematic approach that takes you from brief to breakthrough — on time, every time.
                </p>

                {/* Steps */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 0,
                    position: 'relative',
                }}>
                    {/* connecting line */}
                    <div style={{
                        position: 'absolute',
                        top: 45,
                        left: 0,
                        right: 0,
                        height: 1,
                        background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.25), transparent)',
                        pointerEvents: 'none',
                    }} />

                    {steps.map((step) => (
                        <div
                            key={step.num}
                            onMouseEnter={() => setHoveredStep(step.num)}
                            onMouseLeave={() => setHoveredStep(null)}
                            style={{
                                padding: '0 2rem 2rem',
                                position: 'relative',
                                textAlign: 'center',
                                cursor: 'default',
                            }}
                        >
                            {/* number circle */}
                            <div style={{
                                fontFamily: 'var(--font-orbitron)',
                                fontSize: '0.6rem',
                                fontWeight: 700,
                                letterSpacing: '0.2em',
                                color: 'var(--sky)',
                                background: 'var(--bg2)',
                                border: `1px solid ${hoveredStep === step.num ? 'var(--sky)' : 'rgba(0,212,255,0.18)'}`,
                                width: 52,
                                height: 52,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                position: 'relative',
                                zIndex: 1,
                                transition: 'all 0.3s',
                                boxShadow: hoveredStep === step.num
                                    ? '0 0 20px rgba(0,212,255,0.3)'
                                    : 'none',
                            }}>
                                {step.num}
                            </div>

                            <div style={{
                                fontFamily: 'var(--font-orbitron)',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: 'var(--white)',
                                marginBottom: '0.7rem',
                                letterSpacing: '0.05em',
                            }}>
                                {step.title}
                            </div>

                            <div style={{
                                fontSize: '0.82rem',
                                color: 'var(--muted)',
                                lineHeight: 1.65,
                            }}>
                                {step.desc}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}