"use client";

const SERVICES = [
  "Website Development",
  "Graphic Design & Branding",
  "Video Creation",
  "Social Media Marketing",
  "Sales Channel Building",
  "AI Chatbot Development",
  "WhatsApp Marketing",
  "AI Automated Sales Team",
  "AI Customer Support",
  "AI Calling",
  "SEO Services",
  "Paid Advertising",
  "Content Marketing",
  "Cybersecurity",
  "Analytics & Reporting",
  "Migration Services",
  "Email Marketing",
  "Conversion Rate Optimization",
  "CAC & Retention Ops",
  "Real-Time P&L Calculation",
];

export default function InteligloOverview() {
  return (
    <section className="ig-section" aria-label="About Inteliglo">
      <div className="ig-bg-grid" aria-hidden="true" />
      <div className="ig-blob ig-blob--left" aria-hidden="true" />
      <div className="ig-blob ig-blob--right" aria-hidden="true" />

      {/* ── Two-column body ── */}
      <div className="ig-body">
        {/* LEFT — Brand */}
        <div className="ig-left">
          <p className="ig-eyebrow">// About</p>
          <h2 className="ig-brand">Inteliglo</h2>
          <p className="ig-tagline">Digital Intelligence Company</p>
          <p className="ig-desc">
            Inteliglo is a full-spectrum digital growth partner — combining deep
            technical expertise with creative intelligence. From pixel-perfect web
            development to AI-driven automation and enterprise-grade
            cybersecurity, every service is engineered to scale brands faster,
            smarter, and more securely in a hyper-competitive digital landscape.
          </p>
          <div className="ig-stats">
            {[
              { n: "150+", l: "Projects delivered" },
              { n: "50+", l: "Global clients" },
              { n: "3×", l: "Avg. ROI" },
            ].map((s) => (
              <div key={s.l} className="ig-stat">
                <div className="ig-stat-n">{s.n}</div>
                <div className="ig-stat-l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Services */}
        <div className="ig-right">
          <p className="ig-services-label">// Services</p>
          <ul className="ig-services-list">
            {SERVICES.map((name) => (
              <li key={name} className="ig-service-item">{name}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="ig-divider" aria-hidden="true">
        <span className="ig-div-line" />
        <span className="ig-div-dot" />
        <span className="ig-div-line" />
      </div>

      {/* ── CTA ── */}
      <div className="ig-cta">
        <p className="ig-cta-copy">
          Ready to scale your brand with AI-powered digital infrastructure?
        </p>
        <a
          href="https://marketing.inteliglo.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="ig-cta-link"
        >
          Visit Inteliglo →
        </a>
        <span className="ig-cta-url">marketing.inteliglo.com</span>
      </div>

      <style>{`

        body{        
          margin: 0; background: #000; color: #fff;
          }
        .ig-section {
          position: relative;
          background: #000;
          padding: 80px 32px 64px;
          overflow: hidden;
          font-family: 'Inter', 'Segoe UI', sans-serif;
        }

        /* grid bg */
        .ig-bg-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(0,200,120,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,120,0.035) 1px, transparent 1px);
          background-size: 44px 44px;
        }

        /* glow blobs */
        .ig-blob {
          position: absolute; border-radius: 50%;
          filter: blur(90px); pointer-events: none;
        }
        .ig-blob--left {
          width: 520px; height: 520px; top: -140px; left: -110px;
          background: radial-gradient(circle, rgba(0,190,110,0.17) 0%, transparent 68%);
        }
        .ig-blob--right {
          width: 440px; height: 440px; bottom: -80px; right: -60px;
          background: radial-gradient(circle, rgba(0,110,255,0.15) 0%, transparent 68%);
        }

        /* two-col layout */
        .ig-body {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: minmax(0,1fr) minmax(0,1fr);
          gap: 44px;
          max-width: 1040px;
          margin: 0 auto;
        }

        /* LEFT */
        .ig-left { display: flex; flex-direction: column; }

        .ig-eyebrow,
        .ig-services-label {
          font-family: 'Courier New', monospace;
          font-size: 11px; letter-spacing: 0.14em;
          color: #00c878; margin: 0 0 16px;
        }

        .ig-brand {
          font-size: clamp(2.4rem, 5vw, 3.2rem);
          font-weight: 800; letter-spacing: -0.04em; line-height: 1;
          background: linear-gradient(90deg, #00e896 0%, #00aaff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 16px;
        }

        .ig-tagline {
          font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.08em; text-transform: uppercase;
          margin: 0 0 18px;
        }

        .ig-desc {
          color: rgba(255,255,255,0.48);
          font-size: 13.5px; line-height: 1.78;
          margin: 0 0 32px;
        }

        .ig-stats {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 10px; margin-top: auto;
        }
        .ig-stat {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,200,120,0.12);
          border-radius: 10px; padding: 14px 10px; text-align: center;
        }
        .ig-stat-n {
          font-size: 1.5rem; font-weight: 800;
          background: linear-gradient(90deg, #00e896 0%, #00aaff 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; line-height: 1; margin-bottom: 4px;
        }
        .ig-stat-l { color: rgba(255,255,255,0.36); font-size: 11px; line-height: 1.3; }

        /* RIGHT */
        .ig-services-list {
          list-style: none; margin: 0; padding: 0;
          display: grid; grid-template-columns: 1fr 1fr;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 11px; overflow: hidden;
        }
        .ig-service-item {
          padding: 11px 14px;
          border-right: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          font-size: 12px; color: rgba(255,255,255,0.6);
          line-height: 1.35; transition: background 0.18s, color 0.18s;
        }
        .ig-service-item:hover {
          background: rgba(0,200,120,0.07);
          color: rgba(255,255,255,0.92);
        }
        .ig-service-item:nth-child(even) { border-right: none; }
        .ig-service-item:nth-last-child(-n+2) { border-bottom: none; }

        /* divider */
        .ig-divider {
          display: flex; align-items: center; gap: 12px;
          max-width: 1040px; margin: 52px auto 44px;
          position: relative; z-index: 1;
        }
        .ig-div-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,200,120,0.22), transparent);
        }
        .ig-div-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #00c878; box-shadow: 0 0 8px rgba(0,200,120,0.65);
        }

        /* CTA */
        .ig-cta {
          position: relative; z-index: 1;
          display: flex; flex-direction: column;
          align-items: center; gap: 12px;
        }
        .ig-cta-copy {
          color: rgba(255,255,255,0.42); font-size: 13px;
          text-align: center; margin: 0;
        }
        .ig-cta-link {
          display: inline-block;
          background: linear-gradient(90deg, #00c878 0%, #0077ff 100%);
          color: #000; font-size: 14px; font-weight: 700;
          padding: 13px 36px; border-radius: 7px;
          text-decoration: none; letter-spacing: 0.01em;
          transition: opacity 0.2s, transform 0.18s;
        }
        .ig-cta-link:hover { opacity: 0.88; transform: translateY(-2px); }
        .ig-cta-url {
          color: rgba(255,255,255,0.2);
          font-size: 11px; font-family: 'Courier New', monospace;
          letter-spacing: 0.04em;
        }

        /* responsive */
        @media (max-width: 700px) {
          .ig-body { grid-template-columns: 1fr; gap: 36px; }
          .ig-section { padding: 64px 20px 52px; }
        }
        @media (max-width: 480px) {
          .ig-stats { grid-template-columns: repeat(3,1fr); }
        }
      `}</style>
    </section>
  );
}