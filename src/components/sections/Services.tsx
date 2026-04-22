'use client'

import { useState } from 'react'

const services = [
    { num: '01', name: 'Website Development', tag: 'Core Service', desc: 'Custom, responsive websites and web apps built with Next.js, React, and modern stacks. Fast, scalable, and SEO-ready from day one.' },
    { num: '02', name: 'Social Media Marketing', tag: 'Growth', desc: 'End-to-end management across Instagram, Facebook, LinkedIn, X, YouTube, and more. Strategy, content, scheduling, and growth analytics.' },
    { num: '03', name: 'SEO Services', tag: 'Visibility', desc: 'Technical SEO, on-page optimization, link building, and content strategy engineered to dominate search rankings and drive organic traffic.' },
    { num: '04', name: 'Paid Advertising', tag: 'Performance', desc: 'High-ROI Meta Ads and Google Ads campaigns with precise audience targeting, A/B testing, and full-funnel conversion optimization.' },
    { num: '05', name: 'Content Marketing', tag: 'Authority', desc: 'Authority-building content strategies — blogs, whitepapers, case studies, and multimedia — designed to attract, engage, and convert.' },
    { num: '06', name: 'Cybersecurity (AI Realm)', tag: 'Security', desc: 'Protecting AI-powered products and digital infrastructure with threat intelligence, vulnerability assessments, and real-time monitoring.' },
    { num: '07', name: 'Graphic Design & Branding', tag: 'Creative', desc: 'Brand identity systems, visual design, creatives, UI/UX design, and marketing collateral that make your brand unforgettable.' },
    { num: '08', name: 'Analytics & Reporting', tag: 'Intelligence', desc: 'Data-driven dashboards and intelligent reporting that turn raw numbers into clear strategic insights for faster decision-making.' },
    { num: '09', name: 'Sales Channel Building', tag: 'Revenue', desc: 'End-to-end e-commerce and sales infrastructure — from marketplace setup to CRM integration and automated sales pipelines.' },
    { num: '10', name: 'AI Chatbot Development', tag: 'AI', desc: 'Custom AI chatbots trained on your business data to automate support, qualify leads, and boost engagement 24/7.' },
    { num: '11', name: 'Migration Services', tag: 'Infrastructure', desc: 'Seamless platform migrations — CMS, e-commerce, cloud infrastructure — with zero downtime and full data integrity guaranteed.' },
    { num: '12', name: 'Video Creation', tag: 'Media', desc: 'Cinematic brand films, product demos, reels, explainers, and motion graphics that stop the scroll and tell your story compellingly.' },
    { num: '13', name: 'Email Marketing', tag: 'Retention', desc: 'Automated drip campaigns, newsletters, and lifecycle email sequences built to nurture leads and drive repeat conversions at scale.' },
    { num: '14', name: 'CRO — Conversion Rate Optimization', tag: 'Optimization', desc: 'Heatmaps, user session analysis, A/B testing, and UX improvements that systematically increase the percentage of visitors who convert.' },
]

function ServiceCard({ svc }: { svc: typeof services[0] }) {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: hovered ? 'rgba(0,212,255,0.04)' : 'var(--bg2)',
                padding: '2.2rem 2rem',
                border: '1px solid rgba(0,212,255,0.06)',
                position: 'relative',
                transition: 'all 0.35s ease',
                transform: hovered ? 'translateY(-2px)' : 'none',
                overflow: 'hidden',
                cursor: 'default',
            }}
        >
            {/* top border reveal */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: 2,
                background: 'linear-gradient(90deg, #00d4ff, #00ff88)',
                transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.4s ease',
            }} />

            <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: 'rgba(0,212,255,0.3)',
                marginBottom: '1.2rem',
            }}>
                {svc.num}
            </div>

            <div style={{
                fontFamily: 'var(--font-orbitron)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                color: 'var(--white)',
                marginBottom: '0.7rem',
            }}>
                {svc.name}
            </div>

            <div style={{
                fontSize: '0.82rem',
                color: 'var(--muted)',
                lineHeight: 1.65,
            }}>
                {svc.desc}
            </div>

            <div style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                color: 'var(--green)',
                border: '1px solid rgba(0,255,136,0.25)',
                padding: '0.25rem 0.6rem',
                marginTop: '1rem',
                textTransform: 'uppercase',
            }}>
                {svc.tag}
            </div>
        </div>
    )
}

export default function Services() {
    return (
        <section id="services" style={{
            padding: '120px 5vw',
            background: 'var(--bg2)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div className="grid-bg" style={{ opacity: 0.4 }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                    color: 'var(--green)',
                    marginBottom: '1rem',
                }}>
          // What We Do
                </div>

                <h2 style={{
                    fontFamily: 'var(--font-orbitron)',
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    color: 'var(--white)',
                }}>
                    Full-Spectrum{' '}
                    <span style={{
                        background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                        Digital Services
                    </span>
                </h2>

                <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--muted)',
                    maxWidth: 540,
                    lineHeight: 1.75,
                    marginBottom: '4rem',
                }}>
                    From pixel-perfect design to performance-driven campaigns and AI-powered security —
                    Inteliglo delivers every layer of your digital presence.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.5px',
                    background: 'rgba(0,212,255,0.08)',
                    border: '1px solid rgba(0,212,255,0.18)',
                }}>
                    {services.map((svc) => (
                        <ServiceCard key={svc.num} svc={svc} />
                    ))}
                </div>
            </div>
        </section>
    )
}