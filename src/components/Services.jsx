import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const GLASS = {
  background: 'rgba(255,255,255,0.03)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
};

function FeatureRow({ textLeft, title, description, visual }) {
  const rowRef  = useRef(null);
  const textRef = useRef(null);
  const visRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        scrollTrigger: { trigger: rowRef.current, start: 'top 78%', once: true },
        opacity: 0, x: textLeft ? -30 : 30, duration: 0.85, ease: 'power3.out',
      });
      gsap.from(visRef.current, {
        scrollTrigger: { trigger: rowRef.current, start: 'top 78%', once: true },
        opacity: 0, x: textLeft ? 30 : -30, duration: 0.85, ease: 'power3.out', delay: 0.18,
      });
    });
    return () => ctx.revert();
  }, [textLeft]);

  const TextBlock = () => (
    <div ref={textRef}>
      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 600,
        fontSize: 'var(--h3-size)',
        color: 'var(--text-primary)',
        letterSpacing: 'var(--h3-spacing)',
        lineHeight: 'var(--h3-line-height)',
        marginBottom: '1rem',
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 'var(--body-size)',
        color: 'var(--text-secondary)',
        lineHeight: 1.65,
      }}>
        {description}
      </p>
    </div>
  );

  const VisBlock = () => <div ref={visRef}>{visual}</div>;

  return (
    <div
      ref={rowRef}
      className="feature-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '45fr 55fr',
        gap: 'clamp(3rem, 5vw, 5rem)',
        alignItems: 'center',
        padding: 'clamp(56px, 7vh, 80px) 0',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {textLeft ? <><TextBlock /><VisBlock /></> : <><VisBlock /><TextBlock /></>}
    </div>
  );
}

/* ── Visuals ── */

function CustomDesignVisual() {
  return (
    <div style={{
      borderRadius: 12,
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
    }}>
      <img
        src="/Custom.png"
        alt="Custom website design"
        style={{ width: '100%', display: 'block', objectFit: 'cover' }}
      />
    </div>
  );
}

function ResponsiveVisual() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      {/* Desktop video */}
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 8, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Desktop</div>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', aspectRatio: '16/10', background: '#0a0a0a' }}>
          <video
            autoPlay loop muted playsInline preload="auto"
            ref={(el) => { if (el) el.play().catch(() => {}); }}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          >
            <source src="/desktop.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      {/* Phone video */}
      <div style={{ width: 120 }}>
        <div style={{ marginBottom: 8, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Mobile</div>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', aspectRatio: '9/16', background: '#0a0a0a' }}>
          <video
            autoPlay loop muted playsInline preload="auto"
            ref={(el) => { if (el) el.play().catch(() => {}); }}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          >
            <source src="/phone.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}

function GoogleResultVisual() {
  return (
    <div style={{ ...GLASS, padding: 28, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Search bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 8, padding: '10px 14px', marginBottom: 20,
      }}>
        <svg width="16" height="16" fill="none" stroke="var(--text-muted)" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>plumber brisbane</span>
      </div>
      {/* #1 — our client */}
      <div style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: 8, marginBottom: 8, borderLeft: '3px solid rgba(74,144,184,0.5)' }}>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>davesplumbing.com.au</div>
        <div style={{ fontSize: 15, color: '#4a9eff', fontWeight: 600, marginBottom: 4 }}>Dave's Plumbing — Brisbane's Trusted Plumber</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: 6 }}>
          Fast, reliable plumbing for Brisbane homes & businesses. Licensed, insured. Same-day...
        </div>
        <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#f59e0b', fontSize: 13 }}>★</span>)}
          <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 6 }}>4.9 · 127 reviews</span>
        </div>
      </div>
      {['Competitor Plumbing Co.', 'Another Plumber Pty Ltd'].map(name => (
        <div key={name} style={{ padding: '10px 16px', borderRadius: 8, marginBottom: 6, opacity: 0.28 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 3 }}>competitor.com.au</div>
          <div style={{ fontSize: 14, color: '#4a9eff' }}>{name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>Plumbing services Brisbane...</div>
        </div>
      ))}
    </div>
  );
}

function LighthouseVisual() {
  const scores = [
    { label: 'Performance',    value: 99 },
    { label: 'Accessibility',  value: 100 },
    { label: 'Best Practices', value: 98 },
    { label: 'SEO',            value: 100 },
  ];
  const green = '#0cce6b';
  const R = 34, C = 2 * Math.PI * R;

  const audits = [
    { label: 'First Contentful Paint',   value: '0.8s' },
    { label: 'Speed Index',               value: '1.2s' },
    { label: 'Largest Contentful Paint',  value: '1.1s' },
  ];

  return (
    <div style={{ ...GLASS, padding: '24px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#4285F4"/>
          <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="white">G</text>
        </svg>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '-0.01em' }}>
          Lighthouse Report
        </span>
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'space-around', marginBottom: 22 }}>
        {scores.map(({ label, value }) => {
          const offset = C - (value / 100) * C;
          return (
            <div key={label} style={{ textAlign: 'center' }}>
              <svg width="82" height="82" viewBox="0 0 84 84">
                <circle cx="42" cy="42" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
                <circle cx="42" cy="42" r={R} fill="none" stroke={green} strokeWidth="7"
                  strokeDasharray={C} strokeDashoffset={offset}
                  strokeLinecap="round" transform="rotate(-90 42 42)"
                  style={{ animation: 'arcDraw 1.2s ease-out forwards', '--arc-total': C, '--arc-offset': offset }}
                />
                <text x="42" y="42" textAnchor="middle" dominantBaseline="central" fill={green} fontSize="19" fontWeight="700" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{value}</text>
              </svg>
              <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4, fontWeight: 500, lineHeight: 1.3 }}>{label}</p>
            </div>
          );
        })}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {audits.map(a => (
          <div key={a.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: green, fontSize: 11, fontWeight: 700 }}>✓</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', flex: 1 }}>{a.label}</span>
            <span style={{ fontSize: 11, color: green, fontWeight: 600 }}>{a.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatVisual() {
  const msgs = [
    { from: 'client', text: 'Hey, can we add a booking page to the site?' },
    { from: 'luxcoda', text: "Absolutely. I'll have a draft up tonight. Any specific fields you need on the form?" },
    { from: 'client', text: 'Just name, phone, and preferred date works.' },
    { from: 'luxcoda', text: 'Done. ✓  Live by tomorrow morning.' },
  ];
  return (
    <div style={{ ...GLASS, padding: 28, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 16, marginBottom: 18 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: '#ffffff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, color: '#0a0a0a',
        }}>L</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Luxcoda Support</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#22c55e', marginTop: 2 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            Online now
          </div>
        </div>
      </div>
      {msgs.map((m, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: m.from === 'client' ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
          <div style={{
            background: m.from === 'client' ? '#ffffff' : 'rgba(255,255,255,0.06)',
            color: m.from === 'client' ? '#0a0a0a' : 'var(--text-secondary)',
            border: m.from === 'client' ? 'none' : '1px solid rgba(255,255,255,0.08)',
            borderRadius: m.from === 'client' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
            padding: '10px 14px', fontSize: 13, lineHeight: 1.5, maxWidth: '80%',
          }}>
            {m.text}
          </div>
        </div>
      ))}
    </div>
  );
}

const features = [
  {
    textLeft: true,
    title: 'Custom Design',
    description: 'No templates. Every site is designed from scratch to match your business, your customers, and your trade.',
    visual: <CustomDesignVisual />,
  },
  {
    textLeft: false,
    title: 'Works on Every Device',
    description: "Same site. Perfect on a laptop, tablet, or phone. Because 80% of your customers are searching on mobile.",
    visual: <ResponsiveVisual />,
  },
  {
    textLeft: true,
    title: 'Shows Up on Google',
    description: 'SEO done right from day one. Your site is built to rank so customers find you when they search.',
    visual: <GoogleResultVisual />,
  },
  {
    textLeft: false,
    title: 'Fast & Reliable',
    description: 'No slow loading, no downtime. A fast site means more customers stay on the page — and more calls.',
    visual: <LighthouseVisual />,
  },
  {
    textLeft: true,
    title: 'Ongoing Support',
    description: "We don't disappear after launch. Need a change? Got a question? We respond fast — like a teammate, not a vendor.",
    visual: <ChatVisual />,
  },
];

export default function Services() {
  return (
    <section style={{
      background: 'var(--bg-primary)',
      padding: 'var(--section-padding) var(--content-padding)',
    }}>
      <div className="content-wrap">
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: 'var(--h2-size)',
            color: 'var(--text-primary)',
            letterSpacing: 'var(--h2-spacing)',
            lineHeight: 'var(--h2-line-height)',
            marginBottom: '0.75rem',
          }}>
            Everything your business needs online.
          </h2>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'var(--body-size)',
            color: 'var(--text-secondary)',
            maxWidth: 500,
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            No templates. No jargon. Just a website that works as hard as you do.
          </p>
        </div>

        {features.map(f => <FeatureRow key={f.title} {...f} />)}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .feature-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
