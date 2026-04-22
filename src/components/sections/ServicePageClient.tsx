'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { ServiceData } from '@/lib/servicesData'
import Contact from '@/components/sections/Contact'

export default function ServicePageClient({ service }: { service: ServiceData }) {
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    const scrollTo = (e: React.MouseEvent, id: string) => {
        e.preventDefault()
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 70 }}>

            {/* ── HERO ── */}
            <section style={{
                position: 'relative',
                overflow: 'hidden',
                padding: '100px 5vw 80px',
                borderBottom: '1px solid rgba(0,212,255,0.1)',
            }}>
                <div className="grid-bg" />
                <div className="blob blob-sky" style={{ width: 500, height: 500, top: -150, right: -100, opacity: 0.12 }} />
                <div className="blob blob-green" style={{ width: 400, height: 400, bottom: -100, left: -100, opacity: 0.1 }} />

                <div style={{ position: 'relative', zIndex: 1, maxWidth: 900 }}>
                    {/* Breadcrumb */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                        color: 'var(--muted)', marginBottom: '2rem',
                    }}>
                        <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--sky)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
                        >
                            Home
                        </Link>
                        <span style={{ opacity: 0.4 }}>›</span>
                        <Link href="/#services" style={{ color: 'var(--muted)', textDecoration: 'none' }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--sky)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
                        >
                            Services
                        </Link>
                        <span style={{ opacity: 0.4 }}>›</span>
                        <span style={{ color: 'var(--sky)' }}>{service.name}</span>
                    </div>

                    {/* Tag + Number */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                        <span style={{
                            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                            letterSpacing: '0.2em', textTransform: 'uppercase',
                            color: 'var(--green)', border: '1px solid rgba(0,255,136,0.3)',
                            padding: '0.25rem 0.8rem',
                        }}>
                            {service.tag}
                        </span>
                        <span style={{
                            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                            color: 'rgba(0,212,255,0.3)', letterSpacing: '0.2em',
                        }}>
                            {service.num} / 14
                        </span>
                    </div>

                    {/* Title */}
                    <h1 style={{
                        fontFamily: 'var(--font-orbitron)',
                        fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                        fontWeight: 900, lineHeight: 1.1,
                        color: 'var(--white)', marginBottom: '1rem',
                    }}>
                        {service.name}
                    </h1>

                    {/* Tagline */}
                    <p style={{
                        fontFamily: 'var(--font-orbitron)',
                        fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                        fontWeight: 400,
                        background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: '1.5rem',
                    }}>
                        {service.tagline}
                    </p>

                    {/* Short desc */}
                    <p style={{
                        fontSize: '1rem', color: 'var(--muted)',
                        lineHeight: 1.75, maxWidth: 650, marginBottom: '2.5rem',
                    }}>
                        {service.shortDesc}
                    </p>

                    {/* CTAs */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link href="/#contact" style={{
                            fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                            letterSpacing: '0.12em', textTransform: 'uppercase',
                            background: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
                            color: 'var(--bg)', padding: '0.9rem 2.2rem', fontWeight: 700,
                            clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                            textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s',
                        }}>
                            Get a Free Quote →
                        </Link>
                        <a href="#overview" onClick={e => scrollTo(e, 'svc-overview')} style={{
                            fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                            letterSpacing: '0.12em', textTransform: 'uppercase',
                            background: 'transparent', color: 'var(--white)',
                            border: '1px solid rgba(255,255,255,0.2)', padding: '0.9rem 2.2rem',
                            clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                            textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s',
                        }}>
                            Learn More ↓
                        </a>
                    </div>
                </div>

                {/* Results strip */}
                <div style={{
                    display: 'flex', gap: '0', flexWrap: 'wrap',
                    marginTop: '5rem',
                    borderTop: '1px solid rgba(0,212,255,0.1)',
                    paddingTop: '2.5rem',
                    position: 'relative', zIndex: 1,
                }}>
                    {service.results.map((r, i) => (
                        <div key={i} style={{
                            flex: '1 1 150px', textAlign: 'center',
                            padding: '1rem',
                            borderRight: i < service.results.length - 1 ? '1px solid rgba(0,212,255,0.1)' : 'none',
                        }}>
                            <span style={{
                                fontFamily: 'var(--font-orbitron)', fontSize: '2rem', fontWeight: 700,
                                background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text', display: 'block',
                            }}>
                                {r.num}
                            </span>
                            <span style={{
                                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                                letterSpacing: '0.18em', textTransform: 'uppercase',
                                color: 'var(--muted)', marginTop: '0.3rem', display: 'block',
                            }}>
                                {r.label}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── OVERVIEW ── */}
            <section id="svc-overview" style={{
                padding: '100px 5vw',
                background: 'var(--bg2)',
                position: 'relative', overflow: 'hidden',
            }}>
                <div className="grid-bg" style={{ opacity: 0.3 }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: 780 }}>
                    <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                        letterSpacing: '0.35em', textTransform: 'uppercase',
                        color: 'var(--green)', marginBottom: '1rem',
                    }}>
            // Overview
                    </div>
                    <h2 style={{
                        fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                        fontWeight: 700, color: 'var(--white)', marginBottom: '1.5rem',
                    }}>
                        What We Actually{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            Deliver
                        </span>
                    </h2>
                    <p style={{
                        fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.85,
                    }}>
                        {service.overview}
                    </p>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section style={{ padding: '100px 5vw', position: 'relative', overflow: 'hidden' }}>
                <div className="grid-bg" style={{ opacity: 0.25 }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                        letterSpacing: '0.35em', textTransform: 'uppercase',
                        color: 'var(--green)', marginBottom: '1rem',
                    }}>
            // What&apos;s Included
                    </div>
                    <h2 style={{
                        fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                        fontWeight: 700, color: 'var(--white)', marginBottom: '3.5rem',
                    }}>
                        Everything in{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            This Service
                        </span>
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '1px',
                        background: 'rgba(0,212,255,0.06)',
                        border: '1px solid rgba(0,212,255,0.12)',
                    }}>
                        {service.features.map((f, i) => (
                            <FeatureCard key={i} index={i} title={f.title} desc={f.desc} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PROCESS ── */}
            <section style={{
                padding: '100px 5vw',
                background: 'var(--bg2)',
                position: 'relative', overflow: 'hidden',
            }}>
                <div className="grid-bg" style={{ opacity: 0.25 }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                        letterSpacing: '0.35em', textTransform: 'uppercase',
                        color: 'var(--green)', marginBottom: '1rem',
                    }}>
            // How It Works
                    </div>
                    <h2 style={{
                        fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                        fontWeight: 700, color: 'var(--white)', marginBottom: '3.5rem',
                    }}>
                        Our{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            Process
                        </span>
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                        {service.process.map((p, i) => (
                            <ProcessStep key={i} step={p.step} title={p.title} desc={p.desc} isLast={i === service.process.length - 1} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TECH STACK (if present) ── */}
            {service.techStack && (
                <section style={{ padding: '80px 5vw', position: 'relative' }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{
                            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                            letterSpacing: '0.35em', textTransform: 'uppercase',
                            color: 'var(--green)', marginBottom: '2rem',
                        }}>
              // Tech Stack
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {service.techStack.map((tech) => (
                                <span key={tech} style={{
                                    fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                                    letterSpacing: '0.1em', textTransform: 'uppercase',
                                    color: 'var(--sky)', border: '1px solid rgba(0,212,255,0.2)',
                                    background: 'rgba(0,212,255,0.04)',
                                    padding: '0.5rem 1.1rem',
                                    transition: 'all 0.2s',
                                }}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── FAQs ── */}
            <section style={{
                padding: '100px 5vw',
                background: 'var(--bg2)',
                position: 'relative', overflow: 'hidden',
            }}>
                <div className="grid-bg" style={{ opacity: 0.25 }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: 780 }}>
                    <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                        letterSpacing: '0.35em', textTransform: 'uppercase',
                        color: 'var(--green)', marginBottom: '1rem',
                    }}>
            // FAQs
                    </div>
                    <h2 style={{
                        fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                        fontWeight: 700, color: 'var(--white)', marginBottom: '2.5rem',
                    }}>
                        Common{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            Questions
                        </span>
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(0,212,255,0.08)' }}>
                        {service.faqs.map((faq, i) => (
                            <div
                                key={i}
                                style={{
                                    background: openFaq === i ? 'rgba(0,212,255,0.05)' : 'var(--bg2)',
                                    borderLeft: openFaq === i ? '2px solid var(--sky)' : '2px solid transparent',
                                    transition: 'all 0.25s',
                                }}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    style={{
                                        width: '100%', textAlign: 'left',
                                        padding: '1.5rem 2rem',
                                        background: 'transparent', border: 'none', cursor: 'pointer',
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        gap: '1rem',
                                    }}
                                >
                                    <span style={{
                                        fontFamily: 'var(--font-orbitron)', fontSize: '0.82rem',
                                        fontWeight: 600, color: 'var(--white)', letterSpacing: '0.03em',
                                    }}>
                                        {faq.q}
                                    </span>
                                    <span style={{
                                        fontFamily: 'var(--font-mono)', fontSize: '1rem',
                                        color: 'var(--sky)', flexShrink: 0,
                                        transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                                        transition: 'transform 0.25s',
                                        display: 'inline-block',
                                    }}>
                                        +
                                    </span>
                                </button>
                                {openFaq === i && (
                                    <div style={{
                                        padding: '0 2rem 1.5rem',
                                        fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.75,
                                    }}>
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CONTACT ── */}
            <Contact />

        </div>
    )
}

// ── Sub-components ──

function FeatureCard({ index, title, desc }: { index: number; title: string; desc: string }) {
    const [hovered, setHovered] = useState(false)
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: hovered ? 'rgba(0,212,255,0.04)' : 'var(--bg)',
                padding: '2rem',
                position: 'relative',
                transition: 'all 0.3s',
                cursor: 'default',
                overflow: 'hidden',
            }}
        >
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, #00d4ff, #00ff88)',
                transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left', transition: 'transform 0.35s ease',
            }} />
            <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                color: 'rgba(0,212,255,0.25)', letterSpacing: '0.2em',
                marginBottom: '0.8rem',
            }}>
                {String(index + 1).padStart(2, '0')}
            </div>
            <div style={{
                fontFamily: 'var(--font-orbitron)', fontSize: '0.82rem',
                fontWeight: 600, color: 'var(--white)', marginBottom: '0.6rem',
                letterSpacing: '0.03em',
            }}>
                {title}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.65 }}>
                {desc}
            </div>
        </div>
    )
}

function ProcessStep({ step, title, desc, isLast }: {
    step: string; title: string; desc: string; isLast: boolean
}) {
    const [hovered, setHovered] = useState(false)
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex', gap: '2rem', alignItems: 'flex-start',
                padding: '2rem 0',
                borderBottom: isLast ? 'none' : '1px solid rgba(0,212,255,0.07)',
                cursor: 'default',
            }}
        >
            {/* Number + line */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                    fontFamily: 'var(--font-orbitron)', fontSize: '0.65rem',
                    fontWeight: 700, letterSpacing: '0.15em',
                    color: hovered ? 'var(--bg)' : 'var(--sky)',
                    background: hovered ? 'var(--sky)' : 'transparent',
                    border: `1px solid ${hovered ? 'var(--sky)' : 'rgba(0,212,255,0.25)'}`,
                    width: 48, height: 48, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s',
                    boxShadow: hovered ? '0 0 20px rgba(0,212,255,0.3)' : 'none',
                }}>
                    {step}
                </div>
                {!isLast && (
                    <div style={{ width: 1, flex: 1, minHeight: 30, background: 'rgba(0,212,255,0.12)', marginTop: 8 }} />
                )}
            </div>
            {/* Content */}
            <div style={{ paddingTop: '0.6rem' }}>
                <div style={{
                    fontFamily: 'var(--font-orbitron)', fontSize: '0.9rem',
                    fontWeight: 600, color: 'var(--white)', marginBottom: '0.5rem',
                }}>
                    {title}
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                    {desc}
                </div>
            </div>
        </div>
    )
}