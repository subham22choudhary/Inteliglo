'use client'

import { useState } from 'react'
import Link from 'next/link'

const services = [
    { num: '01', name: 'Website Development',              tag: 'Core Service', slug: 'website-development',           desc: 'Custom, responsive websites and web apps built with Next.js, React, and modern stacks. Fast, scalable, and SEO-ready from day one.' },
    { num: '02', name: 'Graphic Design & Branding',        tag: 'Creative',     slug: 'graphic-design-branding',        desc: 'Brand identity systems, visual design, creatives, UI/UX design, and marketing collateral that make your brand unforgettable.' },
    { num: '03', name: 'Video Creation',                   tag: 'Media',        slug: 'video-creation',                 desc: 'Cinematic brand films, product demos, reels, explainers, and motion graphics that stop the scroll and tell your story.' },
    { num: '04', name: 'Social Media Marketing',           tag: 'Growth',       slug: 'social-media-marketing',         desc: 'End-to-end management across Instagram, Facebook, LinkedIn, X, YouTube, and more. Strategy, content, scheduling, and growth analytics.' },
    { num: '05', name: 'Sales Channel Building',           tag: 'Revenue',      slug: 'sales-channel-building',         desc: 'End-to-end e-commerce and sales infrastructure — from marketplace setup to CRM integration and automated sales pipelines.' },
    { num: '06', name: 'AI Chatbot Development',           tag: 'AI',           slug: 'ai-chatbot-development',         desc: 'Custom AI chatbots trained on your business data to automate support, qualify leads, and boost engagement 24/7.' },
    { num: '07', name: 'WhatsApp Marketing',               tag: 'Engagement',   slug: 'whatsapp-marketing',             desc: '98% open rate campaigns, automated drip sequences, and conversational marketing on the channel your audience actually reads.' },
    { num: '08', name: 'AI Automated Sales Team',          tag: 'AI Sales',     slug: 'ai-automated-sales-team',        desc: 'AI agents that prospect, qualify, follow up, and close — with zero human dependency and a proven 25% conversion rate.' },
    { num: '09', name: 'AI Automated Customer Support',    tag: 'AI Support',   slug: 'ai-automated-customer-support',  desc: 'AI that resolves 85% of support tickets instantly — zero wait time, zero human agents required, 24/7 across all channels.' },
    { num: '10', name: 'AI Calling',                       tag: 'Voice AI',     slug: 'ai-calling',                     desc: 'AI voice agents that make and receive calls for sales, support, reminders, and follow-ups — indistinguishable from a human rep.' },
    { num: '11', name: 'SEO Services',                     tag: 'Visibility',   slug: 'seo-services',                   desc: 'Technical SEO, on-page optimization, link building, and content strategy engineered to dominate search rankings.' },
    { num: '12', name: 'Paid Advertising',                 tag: 'Performance',  slug: 'paid-advertising',               desc: 'High-ROI Meta Ads and Google Ads campaigns with precise audience targeting, A/B testing, and full-funnel conversion optimization.' },
    { num: '13', name: 'Content Marketing',                tag: 'Authority',    slug: 'content-marketing',              desc: 'Blogs, whitepapers, case studies, and multimedia designed to attract, engage, and convert at every stage of the funnel.' },
    { num: '14', name: 'Cybersecurity',                    tag: 'Security',     slug: 'cybersecurity',                  desc: 'Protecting AI-powered products and digital infrastructure with threat intelligence, pen testing, and real-time monitoring.' },
    { num: '15', name: 'Analytics & Reporting',            tag: 'Intelligence', slug: 'analytics-reporting',            desc: 'Data-driven dashboards and intelligent reporting that turn raw numbers into clear strategic insights for faster decision-making.' },
    { num: '16', name: 'Migration Services',               tag: 'Infrastructure',slug: 'migration-services',            desc: 'Seamless platform migrations — CMS, e-commerce, cloud infrastructure — with zero downtime and full data integrity guaranteed.' },
    { num: '17', name: 'Email Marketing',                  tag: 'Retention',    slug: 'email-marketing',                desc: 'Automated drip campaigns, newsletters, and lifecycle email sequences built to nurture leads and drive repeat conversions.' },
    { num: '18', name: 'Conversion Rate Optimization',     tag: 'Optimization', slug: 'conversion-rate-optimization',   desc: 'Heatmaps, user session analysis, A/B testing, and UX improvements that systematically increase your conversion rate.' },
    { num: '19', name: 'Optimizing CAC & Retention',       tag: 'Growth Ops',   slug: 'cac-customer-retention',         desc: 'Slash your Customer Acquisition Cost and maximize Lifetime Value through data-driven retention engineering and churn prevention.' },
    { num: '20', name: 'Real-Time P&L Calculation',        tag: 'Finance Ops',  slug: 'realtime-pnl-calculation',       desc: 'Live P&L dashboards factoring in total ad spend and operational costs — single source of financial truth, updated in real time.' },
]

function ServiceCard({ svc }: { svc: typeof services[0] }) {
    const [hovered, setHovered] = useState(false)

    return (
        <Link
            href={`/services/${svc.slug}`}
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
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'block',
            }}
        >
            {/* top border reveal */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, #00d4ff, #00ff88)',
                transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.4s ease',
            }} />

            <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                letterSpacing: '0.2em', color: 'rgba(0,212,255,0.3)', marginBottom: '1.2rem',
            }}>
                {svc.num}
            </div>

            <div style={{
                fontFamily: 'var(--font-orbitron)', fontSize: '0.85rem',
                fontWeight: 600, letterSpacing: '0.05em',
                color: hovered ? 'var(--sky)' : 'var(--white)',
                marginBottom: '0.7rem',
                transition: 'color 0.25s',
            }}>
                {svc.name}
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.65 }}>
                {svc.desc}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.2rem' }}>
                <div style={{
                    display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                    letterSpacing: '0.1em', color: 'var(--green)',
                    border: '1px solid rgba(0,255,136,0.25)', padding: '0.25rem 0.6rem',
                    textTransform: 'uppercase',
                }}>
                    {svc.tag}
                </div>
                <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                    color: hovered ? 'var(--sky)' : 'rgba(0,212,255,0.25)',
                    transition: 'all 0.25s',
                    transform: hovered ? 'translateX(4px)' : 'none',
                    display: 'inline-block',
                }}>
                    →
                </span>
            </div>
        </Link>
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
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                    letterSpacing: '0.35em', textTransform: 'uppercase',
                    color: 'var(--green)', marginBottom: '1rem',
                }}>
                    // What We Do
                </div>

                <h2 style={{
                    fontFamily: 'var(--font-orbitron)',
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                    fontWeight: 700, marginBottom: '1rem', color: 'var(--white)',
                }}>
                    Full-Spectrum{' '}
                    <span style={{
                        background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                        Digital Services
                    </span>
                </h2>

                <p style={{
                    fontSize: '0.95rem', color: 'var(--muted)',
                    maxWidth: 540, lineHeight: 1.75, marginBottom: '4rem',
                }}>
                    From pixel-perfect design to AI-powered automation and real-time financial intelligence —
                    Inteliglo delivers every layer of your digital operation. Click any service to learn more.
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
