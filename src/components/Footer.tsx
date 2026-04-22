export default function Footer() {
    return (
        <footer style={{
            background: 'rgba(3,11,18,0.72)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(0,212,255,0.18)',
            padding: '3rem 5vw',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            gap: '2rem',
            position: 'relative',
            zIndex: 1,
        }}>
            {/* Left: Logo */}
            <div>
                <div style={{
                    fontFamily: 'var(--font-orbitron)',
                    fontWeight: 900,
                    fontSize: '1.1rem',
                    background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}>
                    INTELIGLO
                </div>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.58rem',
                    color: 'var(--muted)',
                    letterSpacing: '0.1em',
                    marginTop: '0.4rem',
                }}>
                    Digital Intelligence Agency
                </div>
            </div>

            {/* Center: Copyright */}
            <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--muted)',
                letterSpacing: '0.1em',
                textAlign: 'center',
            }}>
                © {new Date().getFullYear()} Inteliglo. All rights reserved.
                <br />
                <span style={{ color: 'rgba(0,212,255,0.3)', fontSize: '0.55rem' }}>
                    Crafted with precision &amp; purpose
                </span>
            </div>

            {/* Right: Tagline */}
            <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--muted)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textAlign: 'right',
            }}>
                Powered by
                <br />
                <span style={{ color: 'var(--sky)' }}>Inteliglo</span>
            </div>

            <style>{`
        @media (max-width: 700px) {
          footer {
            grid-template-columns: 1fr !important;
            text-align: center;
            justify-items: center;
          }
          footer > div:last-child {
            text-align: center !important;
          }
        }
      `}
            </style>
        </footer>
    )
}