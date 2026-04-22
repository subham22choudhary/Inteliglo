const items = [
    'Website Development', 'SEO Optimization', 'Meta & Google Ads',
    'Cybersecurity', 'AI Chatbots', 'Social Media Marketing',
    'Content Strategy', 'Graphic Design', 'Video Creation', 'Email Marketing',
]

export default function MarqueeBand() {
    const doubled = [...items, ...items]

    return (
        <div style={{
            background: 'rgba(0,212,255,0.05)',
            borderTop: '1px solid rgba(0,212,255,0.1)',
            borderBottom: '1px solid rgba(0,212,255,0.1)',
            padding: '0.7rem 0',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        }}>
            <div style={{
                display: 'inline-flex',
                animation: 'marquee 22s linear infinite',
                gap: '3rem',
            }}>
                {doubled.map((item, i) => (
                    <span key={i} style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: i % 2 === 0 ? 'rgba(0,212,255,0.5)' : 'rgba(0,255,136,0.6)',
                    }}>
                        {i % 2 === 0 ? item : '◆'}
                    </span>
                ))}
            </div>
        </div>
    )
}