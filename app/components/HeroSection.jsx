"use client";

import { useEffect, useRef, useState } from "react";

// ── Particle canvas ──────────────────────────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W, H;

    const PARTICLE_COUNT = 120;
    const particles = [];

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * 1920,
        y: Math.random() * 1080,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.6 + 0.1,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 210, 255, ${0.08 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 210, 255, ${p.alpha})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.7,
      }}
    />
  );
}

// ── Animated counter ─────────────────────────────────────────────────────────
function Counter({ end, suffix = "", duration = 2000 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        function step(now) {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setVal(Math.round(ease * end));
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ── Typing effect ─────────────────────────────────────────────────────────────
const WORDS = ["workflows", "pipelines", "automations", "integrations", "deployments"];

function TypingWord() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = WORDS[wordIdx];
    let timeout;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIdx]);

  return (
    <span style={{ color: "#63d2ff", position: "relative" }}>
      {displayed}
      <span
        style={{
          display: "inline-block",
          width: "2px",
          height: "0.9em",
          background: "#63d2ff",
          marginLeft: "3px",
          verticalAlign: "middle",
          animation: "blink 1s step-end infinite",
        }}
      />
    </span>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ value, suffix, label, delay }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(99,210,255,0.12)",
        borderRadius: "16px",
        padding: "28px 24px",
        textAlign: "center",
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
      }}
      className="stat-card"
    >
      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "clamp(28px, 4vw, 42px)",
          fontWeight: 700,
          color: "#fff",
          margin: 0,
          letterSpacing: "-1px",
        }}
      >
        <Counter end={value} suffix={suffix} />
      </p>
      <p
        style={{
          fontSize: "13px",
          color: "rgba(255,255,255,0.4)",
          margin: "8px 0 0",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontFamily: "monospace",
        }}
      >
        {label}
      </p>
    </div>
  );
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <>
      <style>{`

        body {
            margin: 0;
        }
            
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800&display=swap');

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes scan {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        .hero-section * { box-sizing: border-box; margin: 0; padding: 0; }

        .fade-up { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .fade-in { animation: fadeIn 0.8s ease both; }
        .stat-card { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }

        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #63d2ff;
          color: #050d1a;
          border: none;
          border-radius: 10px;
          padding: 14px 28px;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Space Mono', monospace;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 0 0 rgba(99,210,255,0);
          text-decoration: none;
        }
        .cta-primary:hover {
          background: #90deff;
          transform: translateY(-1px);
          box-shadow: 0 0 32px rgba(99,210,255,0.35);
        }
        .cta-primary:active { transform: translateY(0); }

        .cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 10px;
          padding: 14px 28px;
          font-size: 15px;
          font-family: 'Space Mono', monospace;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          text-decoration: none;
        }
        .cta-secondary:hover {
          border-color: rgba(99,210,255,0.4);
          color: #63d2ff;
          background: rgba(99,210,255,0.05);
        }

        .badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(99,210,255,0.08);
          border: 1px solid rgba(99,210,255,0.2);
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 12px;
          font-family: 'Space Mono', monospace;
          color: #63d2ff;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .pulse-dot {
          width: 7px;
          height: 7px;
          background: #63d2ff;
          border-radius: 50%;
          position: relative;
        }
        .pulse-dot::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #63d2ff;
          animation: pulse-ring 1.4s ease-out infinite;
        }

        .grid-line-h {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(99,210,255,0.06) 30%, rgba(99,210,255,0.06) 70%, transparent 100%);
        }
        .grid-line-v {
          position: absolute;
          top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(180deg, transparent 0%, rgba(99,210,255,0.06) 30%, rgba(99,210,255,0.06) 70%, transparent 100%);
        }

        .scan-line {
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(99,210,255,0.15), transparent);
          animation: scan 8s linear infinite;
          pointer-events: none;
        }
      `}</style>

      <section
        className="hero-section"
        style={{
          position: "relative",
          minHeight: "100vh",
          background: "#050d1a",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 24px",
        }}
      >
        {/* Background grid lines */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {[20, 40, 60, 80].map((p) => (
            <div key={p} className="grid-line-h" style={{ top: `${p}%` }} />
          ))}
          {[15, 30, 50, 70, 85].map((p) => (
            <div key={p} className="grid-line-v" style={{ left: `${p}%` }} />
          ))}
          <div className="scan-line" />
        </div>

        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "900px",
            height: "600px",
            background:
              "radial-gradient(ellipse at center, rgba(99,210,255,0.06) 0%, rgba(5,13,26,0) 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Particle field */}
        <ParticleField />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "900px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {/* Badge */}
          <div
            className="fade-in"
            style={{ animationDelay: "0ms", display: "inline-block", marginBottom: "32px" }}
          >
            <span className="badge-pill">
              <span className="pulse-dot" />
              Now in public beta
            </span>
          </div>

          {/* Headline */}
          <h1
            className="fade-up"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(42px, 7vw, 88px)",
              fontWeight: 800,
              lineHeight: 1.0,
              color: "#fff",
              letterSpacing: "-2px",
              marginBottom: "20px",
              animationDelay: "80ms",
            }}
          >
            Orchestrate your
            <br />
            <TypingWord />
          </h1>

          {/* Subheadline */}
          <p
            className="fade-up"
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "clamp(16px, 2.2vw, 20px)",
              color: "rgba(255,255,255,0.45)",
              maxWidth: "580px",
              margin: "0 auto 48px",
              lineHeight: 1.7,
              animationDelay: "180ms",
            }}
          >
            One unified platform to build, monitor, and scale every operation
            across your stack — with zero vendor lock-in.
          </p>


        </div>

        {/* Corner accents */}
        <svg
          style={{ position: "absolute", top: 24, left: 24, opacity: 0.25 }}
          width="48" height="48" viewBox="0 0 48 48" fill="none"
        >
          <path d="M2 24V2h22" stroke="#63d2ff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <svg
          style={{ position: "absolute", top: 24, right: 24, opacity: 0.25 }}
          width="48" height="48" viewBox="0 0 48 48" fill="none"
        >
          <path d="M46 24V2H24" stroke="#63d2ff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <svg
          style={{ position: "absolute", bottom: 24, left: 24, opacity: 0.25 }}
          width="48" height="48" viewBox="0 0 48 48" fill="none"
        >
          <path d="M2 24v22h22" stroke="#63d2ff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <svg
          style={{ position: "absolute", bottom: 24, right: 24, opacity: 0.25 }}
          width="48" height="48" viewBox="0 0 48 48" fill="none"
        >
          <path d="M46 24v22H24" stroke="#63d2ff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </section>
    </>
  );
}
