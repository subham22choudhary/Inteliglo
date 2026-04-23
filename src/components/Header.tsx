'use client'

import { useState, useEffect } from 'react'

const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Process', id: 'process' },
    { label: 'Contact', id: 'contact' },
]

export default function Header() {
    const [scrolled, setScrolled] = useState(false)

    // Scroll-aware background
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Tab visibility trick
    useEffect(() => {
        const originalTitle = 'Inteliglo Digital Intelligence Company'
        const handleVisibility = () => {
            if (document.hidden) {
                document.title = '👀 Try this Come back!'
            } else {
                document.title = 'Welcome Back! Inteliglo'
                setTimeout(() => {
                    document.title = originalTitle
                }, 3000)
            }
        }
        document.addEventListener('visibilitychange', handleVisibility)
        return () => document.removeEventListener('visibilitychange', handleVisibility)
    }, [])

    // Smooth scroll without adding # to URL
    const scrollTo = (e: React.MouseEvent, id: string) => {
        e.preventDefault()
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <header style={{
            position: 'fixed',
            top: 0, left: 0, right: 0,
            zIndex: 1000,
            background: scrolled ? 'rgba(3,11,18,0.88)' : 'rgba(3,11,18,0.72)',
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
            <div onClick={(e) => scrollTo(e as any, 'hero')} style={{ cursor: 'pointer' }}>
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
            </div>

            {/* Nav */}
            <nav className="intelignav" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                {navItems.map((item) => (
                    <a
                        key={item.id}
                        href="#"
                        onClick={(e) => scrollTo(e, item.id)}
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

            {/* CTA */}
            <a
                href="#"
                onClick={(e) => scrollTo(e, 'contact')}
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
          .intelignav { display: none !important; }
        }
      `}</style>
        </header>
    )
}