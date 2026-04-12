import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GLASS = {
  background: 'rgba(255,255,255,0.03)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
};

/* ── Step row (matches FeatureRow in Services) ── */

function StepRow({ textLeft, number, title, description, visual }) {
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
    <div ref={textRef} style={{ position: 'relative' }}>
      {/* Faded watermark number */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: -16,
        left: -8,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 800,
        fontSize: 80,
        color: 'rgba(255,255,255,0.06)',
        lineHeight: 1,
        letterSpacing: '-0.05em',
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        {number}
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
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
    </div>
  );

  const VisBlock = () => <div ref={visRef}>{visual}</div>;

  return (
    <div
      ref={rowRef}
      className="hiw-row"
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

function WeTalkVisual() {
  const msgs = [
    { from: 'luxcoda', text: 'Hey mate, saw your Google reviews — 45 five-stars and no website? Let\'s fix that.' },
    { from: 'client',  text: 'Yeah been meaning to sort that out' },
    { from: 'luxcoda', text: "I'll have a mock-up ready for you by tomorrow. No cost, no commitment." },
  ];

  return (
    <div style={{ ...GLASS, padding: 28, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        paddingBottom: 16, marginBottom: 18,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(200,160,82,0.15)',
          border: '1px solid rgba(200,160,82,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 700, color: '#c8a052',
        }}>L</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Luxcoda</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#22c55e', marginTop: 2 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            Online now
          </div>
        </div>
      </div>

      {/* Messages */}
      {msgs.map((m, i) => (
        <div key={i} style={{
          display: 'flex',
          justifyContent: m.from === 'client' ? 'flex-end' : 'flex-start',
          marginBottom: 10,
        }}>
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

function WeBuildVisual() {
  return (
    <div style={{ ...GLASS, padding: 28, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Terminal title bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        marginBottom: 20,
      }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,95,86,0.7)' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,189,68,0.7)' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(40,200,64,0.7)' }} />
        <span style={{ marginLeft: 8, fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>
          terminal
        </span>
      </div>

      {/* Terminal lines */}
      {[
        { label: '▸ Initialising project…',         done: true },
        { label: '▸ Designing layouts…',             done: true },
        { label: '▸ Wiring up Google SEO…',          done: true },
        { label: '▸ Optimising for mobile…',         done: true },
      ].map((line, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ color: '#22c55e', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>✓</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{line.label}</span>
        </div>
      ))}

      {/* Progress line */}
      <div style={{ marginTop: 4, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ color: '#c8a052', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>›</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>Building site…</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 19 }}>
          <div style={{ flex: 1, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            <div style={{ width: '80%', height: '100%', borderRadius: 99, background: 'linear-gradient(90deg, #c8a052, rgba(200,160,82,0.6))' }} />
          </div>
          <span style={{ fontSize: 12, color: '#c8a052', fontWeight: 600, flexShrink: 0 }}>80%</span>
        </div>
      </div>

      {/* ETA badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: 'rgba(200,160,82,0.08)',
        border: '1px solid rgba(200,160,82,0.2)',
        borderRadius: 6, padding: '6px 12px',
        fontSize: 12, color: '#c8a052',
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
        Live within 48 hours
      </div>
    </div>
  );
}

function YouGetCallsVisual() {
  return (
    <div style={{ ...GLASS, padding: 28, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Notification header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        paddingBottom: 16, marginBottom: 20,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'rgba(74,144,184,0.15)',
          border: '1px solid rgba(74,144,184,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A90B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.5 19.79 19.79 0 0 1 1.61 2.84 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 5.5 5.5l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 2, letterSpacing: '0.04em' }}>
            YOUR SITE · NOW
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>New lead from website</div>
        </div>
        <div style={{
          marginLeft: 'auto',
          width: 8, height: 8, borderRadius: '50%',
          background: '#22c55e',
          boxShadow: '0 0 8px rgba(34,197,94,0.6)',
        }} />
      </div>

      {/* Lead card */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12, padding: '16px 18px',
        marginBottom: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: 'var(--text-primary)',
          }}>J</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>John M.</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Springwood, QLD</div>
          </div>
        </div>
        {[
          { label: 'Job', value: 'Driveway pressure wash' },
          { label: 'Phone', value: '0412 XXX XXX' },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 13 }}>
            <span style={{ color: 'rgba(255,255,255,0.35)', minWidth: 48 }}>{label}</span>
            <span style={{ color: 'var(--text-secondary)' }}>{value}</span>
          </div>
        ))}
      </div>

      {/* CTA row */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button style={{
          flex: 1, padding: '10px 0', borderRadius: 8, border: 'none',
          background: '#4A90B8', color: '#fff', fontSize: 13, fontWeight: 600,
          cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          Call back
        </button>
        <button style={{
          flex: 1, padding: '10px 0', borderRadius: 8,
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
          color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500,
          cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          View details
        </button>
      </div>
    </div>
  );
}

/* ── Steps data ── */

const steps = [
  {
    textLeft: true,
    number: '01',
    title: 'We talk',
    description: 'A quick 10-minute call. We learn your trade, your area, and what makes you the best at what you do.',
    visual: <WeTalkVisual />,
  },
  {
    textLeft: false,
    number: '02',
    title: 'We build',
    description: 'Your site goes live within 48 hours. Custom designed, mobile ready, built to show up on Google.',
    visual: <WeBuildVisual />,
  },
  {
    textLeft: true,
    number: '03',
    title: 'You get calls',
    description: "Customers in your area find you, see your work, and pick up the phone. That's it.",
    visual: <YouGetCallsVisual />,
  },
];

/* ── Section ── */

export default function Portfolio() {
  const headRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true },
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" style={{
      padding: 'var(--section-padding) var(--content-padding)',
    }}>
      <div className="content-wrap">
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: 'var(--h2-size)',
            color: 'var(--text-primary)',
            letterSpacing: 'var(--h2-spacing)',
            lineHeight: 'var(--h2-line-height)',
            marginBottom: '0.75rem',
          }}>
            Here's how it works.
          </h2>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'var(--body-size)',
            color: 'var(--text-secondary)',
            maxWidth: 440,
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            No long process. No endless meetings. Just results.
          </p>
        </div>

        {steps.map(s => <StepRow key={s.number} {...s} />)}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .hiw-row {
            grid-template-columns: 1fr !important;
          }
          /* On mobile, always show text first then visual */
          .hiw-row > *:last-child { order: 2; }
          .hiw-row > *:first-child { order: 1; }
        }
      `}</style>
    </section>
  );
}
