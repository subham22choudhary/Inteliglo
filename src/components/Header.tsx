'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            background: scrolled
                ? 'rgba(3,11,18,0.88)'
                : 'rgba(3,11,18,0.72)',
            backdropFilter: 'blur(20px) saturate(1.6)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
            borderBottom: '1px solid rgba(0,212,255,0.18)',
            padding: '0 5vw',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'background 0.3s ease',
        }}>
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none' }}>
                <div style={{
                    fontFamily: 'var(--font-orbitron)',
                    fontWeight: 900,
                    fontSize: '1.3rem',
                    letterSpacing: '0.1em',
                    background: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}>
                    INTEL<span style={{ WebkitTextFillColor: '#00ff88' }}>IGLO</span>
                </div>
            </Link>

            {/* Nav — hidden on mobile */}
            <nav style={{
                display: 'flex',
                gap: '2.5rem',
                alignItems: 'center',
            }} className="hidden-mobile">
                {[
                    { label: 'Home', href: '#hero' },
                    { label: 'Services', href: '#services' },
                    { label: 'About', href: '#about' },
                    { label: 'Process', href: '#process' },
                    { label: 'Contact', href: '#contact' },
                ].map((item) => (
                    <a
                        key={item.href}
                        href={item.href}
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            fontWeight: 400,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--muted)',
                            textDecoration: 'none',
                            transition: 'color 0.25s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sky)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                    >
                        {item.label}
                    </a>
                ))}
            </nav>

            {/* CTA Button */}
            <a
                href="#contact"
                style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    background: 'transparent',
                    border: '1px solid var(--sky)',
                    color: 'var(--sky)',
                    padding: '0.5rem 1.2rem',
                    cursor: 'pointer',
                    clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'all 0.25s',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--sky)'
                    e.currentTarget.style.color = 'var(--bg)'
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--sky)'
                }}
            >
                Get Started
            </a>

            <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
        </header>
    )
}