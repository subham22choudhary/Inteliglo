'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const services = [
    'Website Development',
    'Social Media Marketing',
    'SEO Services',
    'Paid Advertising (Meta / Google)',
    'Content Marketing',
    'Cybersecurity',
    'Graphic Design & Branding',
    'Analytics & Reporting',
    'Sales Channel Building',
    'AI Chatbot Development',
    'Migration Services',
    'Video Creation',
    'Email Marketing',
    'CRO — Conversion Rate Optimization',
    'Full-Stack Package',
]

type FormState = {
    full_name: string
    email: string
    phone: string
    service_interest: string
    message: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
    const [form, setForm] = useState<FormState>({
        full_name: '',
        email: '',
        phone: '',
        service_interest: '',
        message: '',
    })
    const [status, setStatus] = useState<Status>('idle')
    const [errorMsg, setErrorMsg] = useState('')

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async () => {
        if (!form.full_name || !form.email) {
            setErrorMsg('Please fill in your name and email.')
            return
        }

        setStatus('loading')
        setErrorMsg('')

        const { error } = await supabase.from('contact_submissions').insert([
            {
                full_name: form.full_name,
                email: form.email,
                phone: form.phone || null,
                service_interest: form.service_interest || null,
                message: form.message || null,
            },
        ])

        if (error) {
            setStatus('error')
            setErrorMsg('Something went wrong. Please try again.')
        } else {
            setStatus('success')
            setForm({ full_name: '', email: '', phone: '', service_interest: '', message: '' })
        }
    }

    const inputStyle: React.CSSProperties = {
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid rgba(0,212,255,0.15)',
        color: 'var(--white)',
        padding: '0.8rem 1rem',
        fontFamily: 'var(--font-syne), sans-serif',
        fontSize: '0.85rem',
        outline: 'none',
        transition: 'border-color 0.25s',
        width: '100%',
    }

    const labelStyle: React.CSSProperties = {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase' as const,
        color: 'var(--muted)',
        display: 'block',
        marginBottom: '0.5rem',
    }

    return (
        <section id="contact" style={{
            padding: '120px 5vw',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div className="grid-bg" />
            <div className="blob blob-sky" style={{ width: 500, height: 500, top: -100, right: -100 }} />
            <div className="blob blob-green" style={{ width: 500, height: 500, bottom: -100, left: -100 }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                    color: 'var(--green)',
                    marginBottom: '1rem',
                }}>
          // Get In Touch
                </div>

                <h2 style={{
                    fontFamily: 'var(--font-orbitron)',
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                    fontWeight: 700,
                    marginBottom: '3rem',
                    color: 'var(--white)',
                }}>
                    Ready to{' '}
                    <span style={{
                        background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                        Launch?
                    </span>
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '5rem',
                    alignItems: 'start',
                }}>
                    {/* Contact Info */}
                    <div>
                        <p style={{
                            fontSize: '0.95rem',
                            color: 'var(--muted)',
                            lineHeight: 1.75,
                            marginBottom: '3rem',
                        }}>
                            Tell us about your project. Whether you&apos;re starting from zero or scaling an existing brand,
                            Inteliglo has the team, tools, and track record to make it happen.
                        </p>

                        {/* Email */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem', marginBottom: '1.8rem' }}>
                            <div style={{
                                width: 44, height: 44, flexShrink: 0,
                                border: '1px solid rgba(0,212,255,0.18)',
                                background: 'rgba(0,212,255,0.06)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <polyline points="2,4 12,13 22,4" />
                                </svg>
                            </div>
                            <div>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block' }}>Email Us</span>
                                <span style={{ fontSize: '0.9rem', color: 'var(--white)' }}>hello@inteliglo.com</span>
                            </div>
                        </div>

                        {/* Phone */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem', marginBottom: '1.8rem' }}>
                            <div style={{
                                width: 44, height: 44, flexShrink: 0,
                                border: '1px solid rgba(0,212,255,0.18)',
                                background: 'rgba(0,212,255,0.06)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                                </svg>
                            </div>
                            <div>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block' }}>Call Us</span>
                                <span style={{ fontSize: '0.9rem', color: 'var(--white)' }}>+91 88606 86869</span>
                            </div>
                        </div>

                        {/* Location */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem', marginBottom: '1.8rem' }}>
                            <div style={{
                                width: 44, height: 44, flexShrink: 0,
                                border: '1px solid rgba(0,212,255,0.18)',
                                background: 'rgba(0,212,255,0.06)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                    <circle cx="12" cy="9" r="2.5" />
                                </svg>
                            </div>
                            <div>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block' }}>Find Us</span>
                                <span style={{ fontSize: '0.9rem', color: 'var(--white)' }}>India — Serving Clients Worldwide</span>
                            </div>
                        </div>

                        {/* Info box */}
                        <div style={{
                            marginTop: '2.5rem',
                            padding: '1.5rem',
                            border: '1px solid rgba(0,212,255,0.1)',
                            background: 'rgba(0,212,255,0.02)',
                        }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', lineHeight: 2 }}>
                                <span style={{ color: 'var(--sky)' }}>Response Time:</span> &lt; 24 hours<br />
                                <span style={{ color: 'var(--sky)' }}>Availability:</span> Mon – Sat, 9AM – 7PM IST<br />
                                <span style={{ color: 'var(--sky)' }}>Free Consultation:</span> 30-min discovery call
                            </div>
                        </div>
                    </div>

                    {/* Glass Form */}
                    <div style={{
                        background: 'rgba(0,212,255,0.06)',
                        border: '1px solid rgba(0,212,255,0.18)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        padding: '3rem 2.5rem',
                        position: 'relative',
                    }}>
                        {/* top accent line */}
                        <div style={{
                            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                            background: 'linear-gradient(90deg, #00d4ff, #00ff88)',
                        }} />

                        {/* Corner brackets */}
                        {[
                            { top: 12, left: 12, borderTop: '1px solid var(--sky)', borderLeft: '1px solid var(--sky)' },
                            { top: 12, right: 12, borderTop: '1px solid var(--sky)', borderRight: '1px solid var(--sky)' },
                            { bottom: 12, left: 12, borderBottom: '1px solid var(--sky)', borderLeft: '1px solid var(--sky)' },
                            { bottom: 12, right: 12, borderBottom: '1px solid var(--sky)', borderRight: '1px solid var(--sky)' },
                        ].map((style, i) => (
                            <div key={i} style={{
                                position: 'absolute',
                                width: 20, height: 20,
                                pointerEvents: 'none',
                                ...style,
                            }} />
                        ))}

                        <div style={{
                            fontFamily: 'var(--font-orbitron)',
                            fontSize: '0.75rem',
                            letterSpacing: '0.1em',
                            color: 'var(--sky)',
                            marginBottom: '1.8rem',
                        }}>
                            INITIATE CONTACT
                        </div>

                        {/* Row 1 */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
                            <div>
                                <label style={labelStyle}>Full Name *</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={form.full_name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@company.com"
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
                            <div>
                                <label style={labelStyle}>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="+91 XXXXX XXXXX"
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Service Interest</label>
                                <select
                                    name="service_interest"
                                    value={form.service_interest}
                                    onChange={handleChange}
                                    style={{ ...inputStyle, cursor: 'pointer' }}
                                >
                                    <option value="">Select a service</option>
                                    {services.map((s) => (
                                        <option key={s} value={s} style={{ background: '#061520' }}>{s}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Message */}
                        <div style={{ marginBottom: '1.2rem' }}>
                            <label style={labelStyle}>Tell Us About Your Project</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Describe your goals, current challenges, and timeline..."
                                style={{ ...inputStyle, height: 110, resize: 'none' }}
                            />
                        </div>

                        {/* Error message */}
                        {errorMsg && (
                            <div style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.7rem',
                                color: '#ff6b6b',
                                marginBottom: '1rem',
                            }}>
                                ⚠ {errorMsg}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            onClick={handleSubmit}
                            disabled={status === 'loading' || status === 'success'}
                            style={{
                                width: '100%',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.78rem',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                fontWeight: 700,
                                background: status === 'success'
                                    ? 'linear-gradient(135deg, #00ff88, #00bb66)'
                                    : 'linear-gradient(135deg, #00d4ff, #00ff88)',
                                color: 'var(--bg)',
                                border: 'none',
                                padding: '1rem',
                                cursor: status === 'loading' ? 'wait' : status === 'success' ? 'default' : 'pointer',
                                clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
                                transition: 'all 0.3s',
                                marginTop: '0.5rem',
                                opacity: status === 'loading' ? 0.7 : 1,
                            }}
                        >
                            {status === 'loading'
                                ? 'Transmitting...'
                                : status === 'success'
                                    ? '✓ Message Sent — We\'ll be in touch!'
                                    : 'Send Message →'}
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          #contact > div > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
        input::placeholder, textarea::placeholder { color: rgba(123,168,187,0.4); }
        input:focus, select:focus, textarea:focus {
          border-color: var(--sky) !important;
          box-shadow: 0 0 0 3px rgba(0,212,255,0.08);
        }
        select option { background: #061520; }
      `}</style>
        </section>
    )
}